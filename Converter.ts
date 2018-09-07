import { readFile, writeFile, readdir, PathLike, stat, Stats, rename, writeFileSync, readFileSync } from 'fs';

function walk(dir: PathLike, modify: (file: string) => void, done: (err: NodeJS.ErrnoException, res?: string[]) => void) {
    let results: string[] = [];
    readdir(dir, (err, list) => {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(undefined, results);
            file = dir + '/' + file;
            stat(file, (err, stats) => {
                if (stats && stats.isDirectory()) {
                    walk(file, modify, (err, res) => {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    modify(file);
                    next();
                }
            });
        })();
    });
}

// walk('./Game/Scenes', fixFile, (err, res) => console.log(res));
// walk('test.as', fix, (err, res) => console.log(res));
fix('test.as');

function fix(file: string) {
    const data = readFileSync(file, 'utf-8');

    const newValue = fixText(data);

    writeFileSync(file.replace('.as', '.ts'), newValue, 'utf-8');
}

function trimLeft(strings: TemplateStringsArray, ...values: any[]) {
    return strings.reduce((prev, curr, index) => prev + curr.trimLeft() + (values[index] || ''), '');
}

function fixText(text: string): string {
    const lines = text.split('\n');

    let packageStr = false;
    let className: string;
    const flags: Set<string> = new Set();

    let index = 0;
    while (index < lines.length) {
        // Remove - package ...
        if (lines[index].trimLeft().startsWith('package')) {
            lines.splice(index, 1);
            if (!lines[index].includes('{'))
                packageStr = true;
            continue;
        }

        // Remove - if package ... then {
        if (packageStr && lines[index].trimLeft().startsWith('{')) {
            lines.splice(index, 1);
            packageStr = false;
            continue;
        }

        // Remove - import ...
        if (lines[index].trimLeft().startsWith('import')) {
            lines.splice(index, 1);
            continue;
        }

        if (lines[index].trimLeft().startsWith('public class')) {
            className = lines[index].match(/public class ([\w\d_]+)/)[1];
            if (className.endsWith('Scene'))
                className = className.substr(0, className.length - 5);
        }

        // Remove - override
        if (lines[index].trimLeft().startsWith('override ')) lines[index] = lines[index].replace('override ', '');

        if (lines[index].trimLeft().startsWith('public function ' + className)) lines[index] = lines[index].replace('public function ' + className, 'public constructor');

        if (lines[index].trimLeft().startsWith('public function')) lines[index] = lines[index].replace('public function', 'export function');

        if (lines[index].trimLeft().startsWith('private function')) lines[index] = lines[index].replace('private function', 'function');

        lines[index] = lines[index].replace(':Boolean', ': boolean');
        lines[index] = lines[index].replace(': Boolean', ': boolean');

        lines[index] = lines[index].replace(':Number', ': number');
        lines[index] = lines[index].replace(': Number', ': number');

        lines[index] = lines[index].replace(':int', ': number');
        lines[index] = lines[index].replace(': int', ': number');

        lines[index] = lines[index].replace(':String', ': string');
        lines[index] = lines[index].replace(': String', ': string');

        lines[index] = lines[index].replace('outputText(', 'DisplayText(');

        lines[index] = lines[index].replace(/DisplayText\(([^\n]+), false\)/, (match, p1) => `DisplayText(${p1})`);

        if (/DisplayText\([^\n]+, true\)/.test(lines[index])) {
            lines[index] = lines[index].replace(/DisplayText\(([^\n]+), true\)/, (match, p1) => `DisplayText(${p1})`);
            lines.splice(index, 0, 'DisplayText().clear();');
            index++;
        }

        if (lines[index].trimLeft().startsWith('DisplayText("")')) {
            lines.splice(index, 1);
            continue;
        }

        if (lines[index].trimLeft().startsWith('DisplayText(images')) {
            lines[index] = lines[index].replace(/DisplayText\(images\.showImage\(\"([^\"]+)\"\)\)/g, (match, p1) => `DisplayImage("${p1}")`);
        }

        if (/flags\[kFLAGS\.([^\]]+)\]/.test(lines[index])) {
            lines[index] = lines[index].replace(/flags\[kFLAGS\.([^\]]+)\]/g, (match, p1) => {
                flags.add(p1);
                return `${className}Flags.${p1}`;
            });

        }

        if (lines[index].trimLeft().startsWith('spriteSelect')) {
            lines.splice(index, 1, `DisplaySprite(SpriteName.${className});`);
        }

        // Remove - clearOutput
        if (lines[index].trimLeft().startsWith('clearOutput')) {
            lines.splice(index, 1);
            continue;
        }

        lines[index] = lines[index].replace('game.dynStats', 'dynStats');

        lines[index] = lines[index].replace(
            /dynStats\("(\w+)", ?([^,]+)\)/,
            (match, p1, p2) => `player.${p1} += ${p2}`
        );
        lines[index] = lines[index].replace(
            /dynStats\("(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+)\)/,
            (match, p1, p2, p3, p4) =>
                trimLeft`player.${p1} += ${p2};
                player.${p3} += ${p4}`
        );
        lines[index] = lines[index].replace(
            /dynStats\("(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+)\)/,
            (match, p1, p2, p3, p4, p5, p6) =>
                trimLeft`player.${p1} += ${p2};
                player.${p3} += ${p4};
                player.${p5} += ${p6}`
        );
        lines[index] = lines[index].replace(
            /dynStats\("(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+)\)/,
            (match, p1, p2, p3, p4, p5, p6, p7, p8) =>
                trimLeft`player.${p1} += ${p2};
                player.${p3} += ${p4};
                player.${p5} += ${p6};
                player.${p7} += ${p8}`
        );
        lines[index] = lines[index].replace(
            /dynStats\("(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+)\)/,
            (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) =>
                trimLeft`player.${p1} += ${p2};
                player.${p3} += ${p4};
                player.${p5} += ${p6};
                player.${p7} += ${p8};
                player.${p9} += ${p10}`
        );
        lines[index] = lines[index].replace(
            /dynStats\("(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+)\)/,
            (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) =>
                trimLeft`player.${p1} += ${p2};
                player.${p3} += ${p4};
                player.${p5} += ${p6};
                player.${p7} += ${p8};
                player.${p9} += ${p10};
                player.${p11} += ${p12}`
        );
        lines[index] = lines[index].replace(
            /dynStats\("(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+)\)/,
            (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14) =>
                trimLeft`player.${p1} += ${p2};
                player.${p3} += ${p4};
                player.${p5} += ${p6};
                player.${p7} += ${p8};
                player.${p9} += ${p10};
                player.${p11} += ${p12};
                player.${p13} += ${p14}`
        );

        // player things

        lines[index] = lines[index].replace('game.player', 'player');

        // Creature class

        lines[index] = lines[index].replace('player.short', 'player.desc.name');
        lines[index] = lines[index].replace('player.a', 'player.desc.a');
        lines[index] = lines[index].replace('player.capitalA', 'player.desc.capitalA');

        lines[index] = lines[index].replace('player.weaponName', 'player.inventory.equipment.weapon.displayName');
        lines[index] = lines[index].replace('player.weaponVerb', 'player.inventory.equipment.weapon.verb');
        lines[index] = lines[index].replace('player.weaponAttack', 'player.inventory.equipment.weapon.attack');
        // Unknown - weaponPerk
        lines[index] = lines[index].replace('player.weaponValue', 'player.inventory.equipment.weapon.attack');

        lines[index] = lines[index].replace('player.armorName', 'player.inventory.equipment.armor.displayName');
        lines[index] = lines[index].replace('player.armorVerb', 'player.inventory.equipment.armor.verb');
        lines[index] = lines[index].replace('player.armorDef', 'player.inventory.equipment.armor.defense');
        // Unknown - armorPerk
        lines[index] = lines[index].replace('player.armorValue', 'player.inventory.equipment.armor.attack');

        lines[index] = lines[index].replace('player.str', 'player.stats.str');
        lines[index] = lines[index].replace('player.tou', 'player.stats.tou');
        lines[index] = lines[index].replace('player.spe', 'player.stats.spe');
        lines[index] = lines[index].replace('player.inte', 'player.stats.int');
        lines[index] = lines[index].replace('player.lib', 'player.stats.lib');
        lines[index] = lines[index].replace('player.sens', 'player.stats.sens');
        lines[index] = lines[index].replace('player.cor', 'player.stats.cor');
        lines[index] = lines[index].replace('player.fatigue', 'player.stats.fatigue');

        lines[index] = lines[index].replace('player.HP', 'player.stats.HP');
        lines[index] = lines[index].replace('player.lust', 'player.stats.lust');

        lines[index] = lines[index].replace('player.XP', 'player.stats.XP');
        lines[index] = lines[index].replace('player.level', 'player.stats.level');
        lines[index] = lines[index].replace('player.gems', 'player.inventory.gems');
        lines[index] = lines[index].replace('player.additionalXP', 'player.stats.additionalXP');

        // OK - gender
        lines[index] = lines[index].replace('player.tallness', 'player.body.tallness');

        lines[index] = lines[index].replace('player.hairType', 'player.body.hair.type');
        lines[index] = lines[index].replace('player.hairColor', 'player.body.hair.color');
        lines[index] = lines[index].replace('player.hairLength', 'player.body.hair.length');

        lines[index] = lines[index].replace('player.skinType', 'player.body.skin.type');
        lines[index] = lines[index].replace('player.skinTone', 'player.body.skin.tone');
        lines[index] = lines[index].replace('player.skinDesc', 'player.body.skin.desc');
        lines[index] = lines[index].replace('player.skinAdj', 'player.body.skin.adj');

        lines[index] = lines[index].replace('player.faceType', 'player.body.face.type');

        lines[index] = lines[index].replace('player.earType', 'player.body.ear.type');
        lines[index] = lines[index].replace('player.earValue', 'player.body.ear.value');

        lines[index] = lines[index].replace('player.hornType', 'player.body.horn.type');
        lines[index] = lines[index].replace('player.horns', 'player.body.horn.count');

        lines[index] = lines[index].replace('player.wingType', 'player.body.wing.type');
        lines[index] = lines[index].replace('player.wingDesc', 'player.body.wing.desc');

        lines[index] = lines[index].replace('player.lowerBody', 'player.body.legs.type');

        lines[index] = lines[index].replace('player.tailType', 'player.body.tail.type');
        lines[index] = lines[index].replace('player.tailVenom', 'player.body.tail.venom');
        lines[index] = lines[index].replace('player.tailRecharge', 'player.body.tail.recharge');

        lines[index] = lines[index].replace('player.hipRating', 'player.body.hips.rating');
        lines[index] = lines[index].replace('player.buttRating', 'player.body.butt.rating');

        // Manual - nipplesPierced
        // Manual - nipplesPShort
        // Manual - nipplesPLong
        lines[index] = lines[index].replace('player.lipPierced', 'player.inventory.equipment.piercings.lip.isEquiped()');
        lines[index] = lines[index].replace('player.lipPShort', 'player.inventory.equipment.piercings.lip.item.shortDesc');
        lines[index] = lines[index].replace('player.lipPLong', 'player.inventory.equipment.piercings.lip.item.longDesc');
        lines[index] = lines[index].replace('player.tonguePierced', 'player.inventory.equipment.piercings.tongue.isEquipped()');
        lines[index] = lines[index].replace('player.tonguePShort', 'player.inventory.equipment.piercings.tongue.item.shortDesc');
        lines[index] = lines[index].replace('player.tonguePLong', 'player.inventory.equipment.piercings.tongue.item.longDesc');
        lines[index] = lines[index].replace('player.eyebrowPierced', 'player.inventory.equipment.piercings.eyebrow.isEquipped()');
        lines[index] = lines[index].replace('player.eyebrowPShort', 'player.inventory.equipment.piercings.eyebrow.item.shortDesc');
        lines[index] = lines[index].replace('player.eyebrowPLong', 'player.inventory.equipment.piercings.eyebrow.item.longDesc');
        lines[index] = lines[index].replace('player.earsPierced', 'player.inventory.equipment.piercings.isEquipped()');
        lines[index] = lines[index].replace('player.earsPShort', 'player.inventory.equipment.piercings.item.shortDesc');
        lines[index] = lines[index].replace('player.earsPLong', 'player.inventory.equipment.piercings.item.longDesc');
        lines[index] = lines[index].replace('player.nosePierced', 'player.inventory.equipment.piercings.isEquipped()');
        lines[index] = lines[index].replace('player.nosePShort', 'player.inventory.equipment.piercings.item.shortDesc');
        lines[index] = lines[index].replace('player.nosePLong', 'player.inventory.equipment.piercings.item.longDesc');
        lines[index] = lines[index].replace(/player\.vaginas\[([^\]]+)\]\.labiaPierced/, 'player.inventory.equipment.piercings.labia.isEquipped()');
        lines[index] = lines[index].replace(/player\.vaginas\[([^\]]+)\]\.labiaPShort/, 'player.inventory.equipment.piercings.labia.item.shortDesc');
        lines[index] = lines[index].replace(/player\.vaginas\[([^\]]+)\]\.labiaPLong/, 'player.inventory.equipment.piercings.labia.item.longDesc');
        lines[index] = lines[index].replace(/player\.vaginas\[([^\]]+)\]\.clitPierced/, 'player.inventory.equipment.piercings.clit.isEquipped()');
        lines[index] = lines[index].replace(/player\.vaginas\[([^\]]+)\]\.clitPShort/, 'player.inventory.equipment.piercings.clit.item.shortDesc');
        lines[index] = lines[index].replace(/player\.vaginas\[([^\]]+)\]\.clitPLong/, 'player.inventory.equipment.piercings.clit.item.longDesc');
        lines[index] = lines[index].replace(/player\.cocks\[([^\]]+)\]\.isPierced/, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).isEquipped()`);
        lines[index] = lines[index].replace(/player\.cocks\[([^\]]+)\]\.pShortDesc/, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).item.shortDesc`);
        lines[index] = lines[index].replace(/player\.cocks\[([^\]]+)\]\.pLongDesc/, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).item.longDesc`);

        lines[index] = lines[index].replace('player.antennae', 'player.body.antennae.type');
        lines[index] = lines[index].replace('player.eyeType', 'player.body.eyes.type');
        lines[index] = lines[index].replace('player.tongueType', 'player.body.tongue.type');
        lines[index] = lines[index].replace('player.armType', 'player.body.arms.type');
        lines[index] = lines[index].replace('player.gills', 'player.body.gills');
        lines[index] = lines[index].replace('player.cocks', 'player.body.cocks');
        lines[index] = lines[index].replace('player.balls', 'player.body.balls.count');
        // OK - cumMultiplier
        lines[index] = lines[index].replace('player.ballSize', 'player.body.balls.size');
        // OK - hoursSinceCum
        lines[index] = lines[index].replace('player.vaginas', 'player.body.vaginas');
        lines[index] = lines[index].replace('player.fertility', 'player.body.fertility');
        lines[index] = lines[index].replace('player.clitLength', 'player.body.clit.length');
        // Manual - nippleLength
        lines[index] = lines[index].replace('player.breastRows', 'player.body.chest');
        lines[index] = lines[index].replace('player.ass', 'player.body.butt');
        // Unused - perk()
        // Unused - perks()
        lines[index] = lines[index].replace('player.numPerks', 'player.perks.length');
        lines[index] = lines[index].replace('player.statusAffects', 'player.effects');

        // OK - orgasm()
        lines[index] = lines[index].replace('player.createPerk', 'player.perks.add');
        lines[index] = lines[index].replace('player.removePerk', 'player.perks.remove');
        lines[index] = lines[index].replace(/player.findPerk\((\w+)\) >= 0/, (match, p1) => `player.perks.has(${p1})`);
        lines[index] = lines[index].replace(/player.findPerk\((\w+)\) < 0/, (match, p1) => `!player.perks.has(${p1})`);
        // Unused - perkDuplicated
        // Unused - removePerks
        lines[index] = lines[index].replace(/player.addPerkValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.perks.get(${p1}).value${p2} += ${p3}`);
        lines[index] = lines[index].replace(/player.setPerkValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.perks.get(${p1}).value${p2} = ${p3}`);
        lines[index] = lines[index].replace(/player.perkv([1-4])\((\w+)\)/, (match, p1, p2) => `player.perks.get(${p2}).value${p1}`);

        lines[index] = lines[index].replace('player.createStatusAffect', 'player.effects.add');
        lines[index] = lines[index].replace('player.removeStatusAffect', 'player.effects.remove');
        lines[index] = lines[index].replace(/player.findStatusAffect\((\w+)\) >= 0/, (match, p1) => `player.effects.has(${p1})`);
        lines[index] = lines[index].replace(/player.findStatusAffect\((\w+)\) < 0/, (match, p1) => `!player.effects.has(${p1})`);
        lines[index] = lines[index].replace(/player.changeStatusAffectValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.effects.get(${p1}).value${p2} = ${p3}`);
        lines[index] = lines[index].replace(/player.addStatusAffectValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.effects.get(${p1}).value${p2} += ${p3}`);
        lines[index] = lines[index].replace(/player.statusAffect\(([\w\d]+)\)/, (match, p1) => `player.effects.get(${p1})`);
        lines[index] = lines[index].replace(/player.statusAffectv([1-4])\((\w+)\)/, (match, p1, p2) => `player.effects.get(${p2}).value${p1}`);
        // Unused - removeStatuses
        lines[index] = lines[index].replace('player.biggestTitSize()', 'player.body.chest.sort(BreastRow.LargestRating)[0].rating');
        lines[index] = lines[index].replace(/player.cockArea\(([\w\d]+)\)/, (match, p1) => `player.body.cocks.get(${p1}).area`);
        lines[index] = lines[index].replace('player.biggestCockLength()', 'player.body.cocks.sort(Cock.Largest)[0].length');
        lines[index] = lines[index].replace('player.biggestCockArea()', 'player.body.cocks.sort(Cock.Largest)[0].area');
        lines[index] = lines[index].replace('player.biggestCockArea2()', 'player.body.cocks.sort(Cock.Largest)[1].area');
        lines[index] = lines[index].replace('player.cocks[player.longestCock()]', 'player.body.cocks.sort(Cock.Longest)[0]');
        lines[index] = lines[index].replace('player.longestCock()', 'player.body.cocks.sort(Cock.Longest)[0]');
        lines[index] = lines[index].replace('player.longestCockLength()', 'player.body.cocks.sort(Cock.Longest)[0].length');
        lines[index] = lines[index].replace('player.longestHorseCockLength()', 'player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).sort(Cock.Longest)[0].length');
        // Unknown - twoDickRadarSpecial()
        lines[index] = lines[index].replace('player.totalCockThickness()', 'player.body.cocks.reduce(Cock.TotalThickness, 0)');
        lines[index] = lines[index].replace('player.cocks[player.thickestCock()]', 'player.body.cocks.sort(Cock.Thickest)[0]');
        lines[index] = lines[index].replace('player.thickestCock()', 'player.body.cocks.sort(Cock.Thickest)[0]');
        lines[index] = lines[index].replace('player.thickestCockThickness()', 'player.body.cocks.sort(Cock.Thickest)[0].thickness');
        lines[index] = lines[index].replace('player.cocks[player.thinnestCockIndex()]', 'player.body.cocks.sort(Cock.Thinnest)[0]');
        lines[index] = lines[index].replace('player.thinnestCockIndex()', 'player.body.cocks.sort(Cock.Thinnest)[0]');
        lines[index] = lines[index].replace('player.cocks[player.smallestCockIndex()]', 'player.body.cocks.sort(Cock.Smallest)[0]');
        lines[index] = lines[index].replace('player.smallestCockIndex()', 'player.body.cocks.sort(Cock.Smallest)[0]');
        lines[index] = lines[index].replace('player.smallestCockLength()', 'player.body.cocks.sort(Cock.Smallest)[0].length');
        lines[index] = lines[index].replace('player.cocks[player.shortestCockIndex()]', 'player.body.cocks.sort(Cock.Shortest)[0]');
        lines[index] = lines[index].replace('player.shortestCockIndex()', 'player.body.cocks.sort(Cock.Shortest)[0]');
        lines[index] = lines[index].replace('player.shortestCockLength()', 'player.body.cocks.sort(Cock.Shortest)[0].length');
        lines[index] = lines[index].replace(
            /player\.cockThatFits\(([\w\d]+), ?("area"|"length")\)/,
            (match, p1, p2) =>
                p2 === "area" ?
                    `player.body.cocks.find(Cock.CockThatFits(${p1}))` :
                    `player.body.cocks.find(Cock.CockThatFitsLength(${p1}))`
        );
        lines[index] = lines[index].replace(/player\.cockThatFits2\(([\w\d]+)\)/, (match, p1, p2) => `player.body.cocks.find(Cock.CockThatFits(${p1}))`);
        lines[index] = lines[index].replace('player.smallestCockArea()', 'player.body.cocks.sort(Cock.Smallest)[0].area');
        lines[index] = lines[index].replace('player.cocks[player.smallestCock()]', 'player.body.cocks.sort(Cock.Smallest)[0]');
        lines[index] = lines[index].replace('player.smallestCock()', 'player.body.cocks.sort(Cock.Smallest)[0]');
        lines[index] = lines[index].replace('player.cocks[player.biggestCockIndex()]', 'player.body.cocks.sort(Cock.Largest)[0]');
        lines[index] = lines[index].replace('player.biggestCockIndex()', 'player.body.cocks.sort(Cock.Largest)[0]');
        lines[index] = lines[index].replace('player.cocks[player.biggestCockIndex2()]', 'player.body.cocks.sort(Cock.Largest)[0]');
        lines[index] = lines[index].replace('player.biggestCockIndex2()', 'player.body.cocks.sort(Cock.Largest)[0]');
        lines[index] = lines[index].replace('player.cocks[player.smallestCockIndex2()]', 'player.body.cocks.sort(Cock.Smallest)[1]');
        lines[index] = lines[index].replace('player.smallestCockIndex2()', 'player.body.cocks.sort(Cock.Smallest)[1]');
        lines[index] = lines[index].replace('player.cocks[player.biggestCockIndex3()]', 'player.body.cocks.sort(Cock.Largest)[2]');
        lines[index] = lines[index].replace('player.biggestCockIndex3()', 'player.body.cocks.sort(Cock.Largest)[2]');
        lines[index] = lines[index].replace('player.cockDescript()', 'describeCock(player, player.body.cocks.get(0)');
        lines[index] = lines[index].replace(/player\.cockDescript\((\w+)\)/, (match, p1) => `describeCock(player, ${p1})`);
        lines[index] = lines[index].replace('player.cockAdjective()', 'describeCockAdj(player, player.body.cocks.get(0)');
        lines[index] = lines[index].replace(/player\.cockAdjective\((\w+)\)/, (match, p1) => `describeCockAdj(player, ${p1})`);
        lines[index] = lines[index].replace('player.wetness()', 'player.body.vaginas.get(0).wetness');
        // Manual - vaginaType()
        lines[index] = lines[index].replace('player.looseness()', 'player.body.vaginas.get(0).looseness');
        lines[index] = lines[index].replace('player.looseness(true)', 'player.body.vaginas.get(0).looseness');
        lines[index] = lines[index].replace('player.looseness(false)', 'player.body.butt.looseness');
        // OK - vaginalCapacity()
        // OK - analCapacity()
        lines[index] = lines[index].replace('player.hasFuckableNipples()', 'player.body.chest.find(BreastRow.FuckableNipples)');
        lines[index] = lines[index].replace('!player.hasBreasts()', 'player.body.chest.length <= 0');
        lines[index] = lines[index].replace('player.hasBreasts()', 'player.body.chest.length > 0');
        // Unused - hasNipples()
        // OK - lactationSpeed()
        lines[index] = lines[index].replace('player.dogScore()', 'dogRaceScore(player)');
        lines[index] = lines[index].replace('player.foxScore()', 'foxRaceScore(player)');
        lines[index] = lines[index].replace('player.biggestLactation()', 'player.body.chest.sort(BreastRow.LargestLacation)[0].lactationMultiplier');
        // OK - milked()
        lines[index] = lines[index].replace(/player\.boostLactation\(([^\(]+)\)/, (match, p1) => `boostLactation(player, ${p1})`);
        lines[index] = lines[index].replace('player.averageLactation()', 'player.body.chest.reduce(BreastRow.AverageLactation, 0)');
        // OK - virilityQ()
        // OK - cumQ()
        lines[index] = lines[index].replace(/player\.countCocksOfType\(\)/, (match, p1) => `player.body.cocks.filter(Cock.FilterType(${p1})).length`);
        lines[index] = lines[index].replace('player.anemoneCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.ANEMONE)).length');
        lines[index] = lines[index].replace('player.catCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.CAT)).length');
        lines[index] = lines[index].replace('player.demonCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DEMON)).length');
        lines[index] = lines[index].replace('player.displacerCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DISPLACER)).length');
        lines[index] = lines[index].replace('player.dogCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DOG)).length');
        lines[index] = lines[index].replace('player.dragonCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DRAGON)).length');
        lines[index] = lines[index].replace('player.foxCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.FOX)).length');
        lines[index] = lines[index].replace('player.horseCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length');
        lines[index] = lines[index].replace('player.kangaCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.KANGAROO)).length');
        lines[index] = lines[index].replace('player.lizardCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.LIZARD)).length');
        lines[index] = lines[index].replace('player.tentacleCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length');
        // Unused - findFirstCockType()
        // Unused - addHorseCock()
        lines[index] = lines[index].replace('player.cockTotal()', 'player.body.cocks.length');
        lines[index] = lines[index].replace('player.totalCocks()', 'player.body.cocks.length');
        lines[index] = lines[index].replace('!player.hasCock()', 'player.body.cocks.length <= 0');
        lines[index] = lines[index].replace('player.hasCock()', 'player.body.cocks.length > 0');
        // Manual - hasSockRoom()
        // Manual - hasSock()
        // Manual - countCockSocks()
        // OK - canAutoFellate()
        // OK - canFly()
        lines[index] = lines[index].replace('!player.hasVagina()', 'player.body.vaginas.length <= 0');
        lines[index] = lines[index].replace('player.hasVagina()', 'player.body.vaginas.length > 0');
        lines[index] = lines[index].replace('player.hasVirginVagina()', 'player.body.vaginas.find(Vaginas.Virgin)');
        // Manual - genderText
        lines[index] = lines[index].replace('player.manWoman()', 'manWoman(player)');
        lines[index] = lines[index].replace('player.manWoman(true)', 'manWoman(player, true)');
        lines[index] = lines[index].replace('player.manWoman(false)', 'manWoman(player, false)');
        lines[index] = lines[index].replace('player.guyGirl()', 'guyGirl(player)');
        lines[index] = lines[index].replace('player.guyGirl(true)', 'guyGirl(player, true)');
        lines[index] = lines[index].replace('player.guyGirl(false)', 'guyGirl(player, false)');
        lines[index] = lines[index].replace(/player\.mfn\(([^,]+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `mfn(player, ${p1}, ${p2}, ${p3})`);
        lines[index] = lines[index].replace(/player\.mf\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `mf(player, ${p1}, ${p2})`);
        lines[index] = lines[index].replace('player.boyGirl()', 'boyGirl(player)');
        lines[index] = lines[index].replace('player.boyGirl(true)', 'boyGirl(player, true)');
        lines[index] = lines[index].replace('player.boyGirl(false)', 'boyGirl(player, false)');
        lines[index] = lines[index].replace('player.heShe()', 'heShe(player)');
        lines[index] = lines[index].replace('player.heShe(true)', 'heShe(player, true)');
        lines[index] = lines[index].replace('player.heShe(false)', 'heShe(player, false)');
        lines[index] = lines[index].replace('player.himHer()', 'himHer(player)');
        lines[index] = lines[index].replace('player.himHer(true)', 'himHer(player, true)');
        lines[index] = lines[index].replace('player.himHer(false)', 'himHer(player, false)');
        lines[index] = lines[index].replace('player.maleFemale()', 'maleFemale(player)');
        lines[index] = lines[index].replace('player.maleFemale(true)', 'maleFemale(player, true)');
        lines[index] = lines[index].replace('player.maleFemale(false)', 'maleFemale(player, false)');
        lines[index] = lines[index].replace('player.hisHer()', 'hisHer(player)');
        lines[index] = lines[index].replace('player.hisHer(true)', 'hisHer(player, true)');
        lines[index] = lines[index].replace('player.hisHer(false)', 'hisHer(player, false)');
        lines[index] = lines[index].replace('player.sirMadam()', 'sirMadam(player)');
        lines[index] = lines[index].replace('player.sirMadam(true)', 'sirMadam(player, true)');
        lines[index] = lines[index].replace('player.sirMadam(false)', 'sirMadam(player, false)');
        lines[index] = lines[index].replace(/player\.createCock\(([^,]+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.body.cocks.add(new Cock(${p1}, ${p2}, ${p3}))`);
        lines[index] = lines[index].replace(/player\.createCock\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `player.body.cocks.add(new Cock(${p1}, ${p2}))`);
        lines[index] = lines[index].replace(/player\.createCock\(([^\)]+)\)/, (match, p1) => `player.body.cocks.add(new Cock(${p1}))`);
        lines[index] = lines[index].replace('player.createCock()', 'player.body.cocks.add(new Cock())');
        lines[index] = lines[index].replace(/player\.createVagina\(([^,]+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.body.vaginas.add(new Vagina(${p2}, ${p3}, ${p1}))`);
        // Manual - createVagina(virgin, vaginalWetness)
        // Manual - createVagina(virgin)
        lines[index] = lines[index].replace('player.createVagina()', 'player.body.vaginas.add(new Vagina())');
        // Manual - createBreastRow(size, nipplesPerBreast)
        lines[index] = lines[index].replace(/player\.createBreastRow\(([^,]+)\)/, (match, p1) => `player.body.chest.add(new BreastRow(${p1}))`);
        lines[index] = lines[index].replace('player.createBreastRow()', 'player.body.chest.add(new BreastRow())');
        // Remove - genderCheck
        lines[index] = lines[index].replace('player.genderCheck();', '');
        lines[index] = lines[index].replace(
            /player\.removeCock\(([^,]+), ?([^,]+)\)/,
            (match, p1, p2) => p2 === 1 ?
                `player.body.cocks.remove(${p1})` :
                trimLeft`for (let cockIndex = 0; cockIndex < ${p2}; cockIndex++)
                player.body.cocks.remove(${p1} + cockIndex)`
        );
        lines[index] = lines[index].replace(
            /player\.removeVagina\(([^,]+), ?([^,]+)\)/,
            (match, p1, p2) => p2 === 1 ?
                `player.body.vaginas.remove(${p1})` :
                trimLeft`for (let vagIndex = 0; vagIndex < ${p2}; vagIndex++)
                player.body.vaginas.remove(${p1} + vagIndex)`
        );
        lines[index] = lines[index].replace(/player\.removeVagina\(([^,]+)\)/, (match, p1) => `player.body.vaginas.remove(${p1})`);
        lines[index] = lines[index].replace('player.removeVagina()', 'player.body.vaginas.remove(0)');
        lines[index] = lines[index].replace(
            /player\.removeBreastRow\(([^,]+), ?([^,]+)\)/,
            (match, p1, p2) => p2 === 1 ?
                `player.body.chest.remove(${p1})` :
                trimLeft`for (let breastRowIndex = 0; breastRowIndex < ${p2}; breastRowIndex++)
                player.body.chest.remove(${p1} + breastRowIndex)`
        );
        // Remove - fixFuckingCockTypesEnum
        

        // BreastRow Class

        lines[index] = lines[index].replace(/breastRows\[([^\]]+)\]\.nipplesPerBreast/, (match, p1) => `chest.get(${p1}).nipples.count`);
        lines[index] = lines[index].replace(/breastRows\[([^\]]+)\]\.fuckable/, (match, p1) => `chest.get(${p1}).nipples.fuckable`);
        lines[index] = lines[index].replace(/breastRows\[([^\]]+)\]\.breasts/, (match, p1) => `chest.get(${p1}).count`);
        lines[index] = lines[index].replace(/breastRows\[([^\]]+)\]\.breastRating/, (match, p1) => `chest.get(${p1}).rating`);
        lines[index] = lines[index].replace(/breastRows\[([^\]]+)\]\.lactationMultiplier/, (match, p1) => `chest.get(${p1}).lactationMultiplier`);
        lines[index] = lines[index].replace(/breastRows\[([^\]]+)\]\.milkFullness/, (match, p1) => `chest.get(${p1}).milkFullness`);
        lines[index] = lines[index].replace(/breastRows\[([^\]]+)\]\.fullness/, (match, p1) => `chest.get(${p1}).fullness`);
        lines[index] = lines[index].replace('player.breastRows', `player.body.chest`);

        // Ass Class

        lines[index] = lines[index].replace('ass.analWetness', `butt.wetness`);
        lines[index] = lines[index].replace('ass.analLooseness', `butt.looseness`);
        lines[index] = lines[index].replace('player.ass', `player.body.butt`);

        // Vagina Class

        lines[index] = lines[index].replace(/vaginas\[([^\]]+)\]\.vaginalWetness/, (match, p1) => `vaginas.get(${p1}).wetness`);
        lines[index] = lines[index].replace(/vaginas\[([^\]]+)\]\.vaginalLooseness/, (match, p1) => `vaginas.get(${p1}).looseness`);
        lines[index] = lines[index].replace(/vaginas\[([^\]]+)\]\.virgin/, (match, p1) => `vaginas.get(${p1}).virgin`);
        lines[index] = lines[index].replace('player.vaginas', `player.body.vaginas`);

        // Cock Class

        lines[index] = lines[index].replace(/cocks\[([^\]]+)\]\.cockLength/, (match, p1) => `cocks.get(${p1}).length`);
        lines[index] = lines[index].replace(/cocks\[([^\]]+)\]\.cockThickness/, (match, p1) => `cocks.get(${p1}).thickness`);
        lines[index] = lines[index].replace(/cocks\[([^\]]+)\]\.cockType/, (match, p1) => `cocks.get(${p1}).type`);
        lines[index] = lines[index].replace(/cocks\[([^\]]+)\]\.knotMultiplier/, (match, p1) => `cocks.get(${p1}).knotMultiplier`);
        lines[index] = lines[index].replace('player.cocks', `player.body.cocks`);

        // Character Class

        lines[index] = lines[index].replace('player.thickness', 'player.body.thickness');
        lines[index] = lines[index].replace('player.tone', 'player.body.tone');
        lines[index] = lines[index].replace('player.fem', 'player.body.fem');
        lines[index] = lines[index].replace('player.fertility', 'player.body.fertility');


        lines[index] = lines[index].replace('!player.hasVagina()', 'player.body.vaginas.length <= 0');
        lines[index] = lines[index].replace('player.hasVagina()', 'player.body.vaginas.length > 0');
        lines[index] = lines[index].replace('!player.hasCock()', 'player.body.cocks.length <= 0');
        lines[index] = lines[index].replace('player.hasCock()', 'player.body.cocks.length > 0');

        lines[index] = lines[index].replace('player.isNaga()', 'player.body.legs.isNaga()');

        lines[index] = lines[index].replace('player.exploredForest', 'exploreFlags.FOREST');
        lines[index] = lines[index].replace('player.exploredDesert', 'exploreFlags.DESERT');
        lines[index] = lines[index].replace('player.exploredMountain', 'exploreFlags.MOUNTAIN');
        lines[index] = lines[index].replace('player.exploredLake', 'exploreFlags.LAKE');
        lines[index] = lines[index].replace('player.explored', 'exploreFlags.BEYOND_CAMP');

        //

        lines[index] = lines[index].replace('cleanupAfterCombat()', 'return { next: returnToCampUseOneHour }');
        lines[index] = lines[index].replace(/doNext\(([^;]+)\)/, (match, p1) => `return { next: ${p1} }`);

        lines[index] = lines[index].replace(
            /(?:kGAMECLASS\.)?simpleChoices\("(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+), ?"(\w+)", ?([^,]+)\)/,
            (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) =>
                trimLeft`return { choices: [
                [${p1}, ${p2}],
                [${p3}, ${p4}],
                [${p5}, ${p6}],
                [${p7}, ${p8}],
                [${p9}, ${p10}],
                ]}`
        );

        index++;
    }

    lines.unshift(`User.flags.set(FlagType.${className}, ${className}Flags);`);
    if (flags.size > 0) {
        lines.unshift('}');
        for (const flag of flags.values()) {
            lines.unshift(`${flag}: 0,`);
        }
        lines.unshift(`export const ${className}Flags = {`);
    }

    return lines.join('\n');
}
