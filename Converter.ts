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

        // Classes
        lines[index] = fixCreatureClass(lines[index]);
        lines[index] = fixBreastRowClass(lines[index]);
        lines[index] = fixAssClass(lines[index]);
        lines[index] = fixVaginaClass(lines[index]);
        lines[index] = fixCockClass(lines[index]);


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

function fixBreastRowClass(line: string): string {
    line = line.replace(/breastRows\[([^\]]+)\]\.nipplesPerBreast/, (match, p1) => `chest.get(${p1}).nipples.count`);
    line = line.replace(/breastRows\[([^\]]+)\]\.fuckable/, (match, p1) => `chest.get(${p1}).nipples.fuckable`);
    line = line.replace(/breastRows\[([^\]]+)\]\.breasts/, (match, p1) => `chest.get(${p1}).count`);
    line = line.replace(/breastRows\[([^\]]+)\]\.breastRating/, (match, p1) => `chest.get(${p1}).rating`);
    line = line.replace(/breastRows\[([^\]]+)\]\.lactationMultiplier/, (match, p1) => `chest.get(${p1}).lactationMultiplier`);
    line = line.replace(/breastRows\[([^\]]+)\]\.milkFullness/, (match, p1) => `chest.get(${p1}).milkFullness`);
    line = line.replace(/breastRows\[([^\]]+)\]\.fullness/, (match, p1) => `chest.get(${p1}).fullness`);
    return line;
}

function fixAssClass(line: string): string {
    line = line.replace('ass.analWetness', `butt.wetness`);
    line = line.replace('ass.analLooseness', `butt.looseness`);
    return line;
}

function fixVaginaClass(line: string): string {
    line = line.replace(/vaginas\[([^\]]+)\]\.vaginalWetness/, (match, p1) => `vaginas.get(${p1}).wetness`);
    line = line.replace(/vaginas\[([^\]]+)\]\.vaginalLooseness/, (match, p1) => `vaginas.get(${p1}).looseness`);
    line = line.replace(/vaginas\[([^\]]+)\]\.virgin/, (match, p1) => `vaginas.get(${p1}).virgin`);
    return line;
}

function fixCockClass(line: string): string {
    line = line.replace(/cocks\[([^\]]+)\]\.cockLength/, (match, p1) => `cocks.get(${p1}).length`);
    line = line.replace(/cocks\[([^\]]+)\]\.cockThickness/, (match, p1) => `cocks.get(${p1}).thickness`);
    line = line.replace(/cocks\[([^\]]+)\]\.cockType/, (match, p1) => `cocks.get(${p1}).type`);
    line = line.replace(/cocks\[([^\]]+)\]\.knotMultiplier/, (match, p1) => `cocks.get(${p1}).knotMultiplier`);
    return line;
}

function fixCharacterClass(line: string): string {
    line = line.replace('player.femininity', 'player.body.feminity');
    line = line.replace('player.beardLength', 'player.body.beard.length');
    line = line.replace('player.beardStyle', 'player.body.beard.style');
    line = line.replace('player.thickness', 'player.body.thickness');
    line = line.replace('player.tone', 'player.body.tone');
    // Manual - pregnancyType
    // Manual - pregnancyIncubation
    // Manual - buttPregnancyType
    // Manual - buttPregnancyIncubation
    line = line.replace('player.keyItems', 'player.inventory.keyItems');
    line = line.replace('player.faceDesc', 'describeFace(player)');
    line = line.replace(/player\.modFem\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `modFem(player, ${p1}, ${p2})`);
    line = line.replace(/player\.modFem\(([^,]+)\)/, (match, p1) => `modFem(player, ${p1})`);
    line = line.replace(/player\.modThickness\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `modThickness(player, ${p1}, ${p2})`);
    line = line.replace(/player\.modThickness\(([^,]+)\)/, (match, p1) => `modThickness(player, ${p1})`);
    line = line.replace(/player\.modTone\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `modTone(player, ${p1}, ${p2})`);
    line = line.replace(/player\.modTone\(([^,]+)\)/, (match, p1) => `modTone(player, ${p1})`);
    // OK - fixFemininity
    line = line.replace('player.hasBeard', 'player.body.beard.length > 0');
    line = line.replace('player.beard', 'describeBeard(player)');
    line = line.replace('player.skin()', 'describeSkin(player)');
    line = line.replace(/player\.skin\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `describeSkin(player, ${p1}, ${p2})`);
    line = line.replace(/player\.skin\(([^,]+)\)/, (match, p1) => `describeSkin(player, ${p1})`);
    line = line.replace('player.hasMuzzle()', 'player.body.face.hasMuzzle()');
    line = line.replace('player.face()', 'describeFaceLight(player)');
    // OK - hasLongTail
    line = line.replace('player.isPregnant()', 'player.pregnancy.womb.isPregnant()');
    line = line.replace('player.isButtPregnant()', 'player.pregnancy.butt.isPregnant()');
    return line;
}

function fixCreatureClass(line: string): string {
    line = line.replace('player.short', 'player.desc.name');
    line = line.replace('player.a', 'player.desc.a');
    line = line.replace('player.capitalA', 'player.desc.capitalA');

    line = line.replace('player.weaponName', 'player.inventory.equipment.weapon.displayName');
    line = line.replace('player.weaponVerb', 'player.inventory.equipment.weapon.verb');
    line = line.replace('player.weaponAttack', 'player.inventory.equipment.weapon.attack');
    // Unknown - weaponPerk
    line = line.replace('player.weaponValue', 'player.inventory.equipment.weapon.attack');

    line = line.replace('player.armorName', 'player.inventory.equipment.armor.displayName');
    line = line.replace('player.armorVerb', 'player.inventory.equipment.armor.verb');
    line = line.replace('player.armorDef', 'player.inventory.equipment.armor.defense');
    // Unknown - armorPerk
    line = line.replace('player.armorValue', 'player.inventory.equipment.armor.attack');

    line = line.replace('player.str', 'player.stats.str');
    line = line.replace('player.tou', 'player.stats.tou');
    line = line.replace('player.spe', 'player.stats.spe');
    line = line.replace('player.inte', 'player.stats.int');
    line = line.replace('player.lib', 'player.stats.lib');
    line = line.replace('player.sens', 'player.stats.sens');
    line = line.replace('player.cor', 'player.stats.cor');
    line = line.replace('player.fatigue', 'player.stats.fatigue');

    line = line.replace('player.HP', 'player.stats.HP');
    line = line.replace('player.lust', 'player.stats.lust');

    line = line.replace('player.XP', 'player.stats.XP');
    line = line.replace('player.level', 'player.stats.level');
    line = line.replace('player.gems', 'player.inventory.gems');
    line = line.replace('player.additionalXP', 'player.stats.additionalXP');

    // OK - gender
    line = line.replace('player.tallness', 'player.body.tallness');

    line = line.replace('player.hairType', 'player.body.hair.type');
    line = line.replace('player.hairColor', 'player.body.hair.color');
    line = line.replace('player.hairLength', 'player.body.hair.length');

    line = line.replace('player.skinType', 'player.body.skin.type');
    line = line.replace('player.skinTone', 'player.body.skin.tone');
    line = line.replace('player.skinDesc', 'player.body.skin.desc');
    line = line.replace('player.skinAdj', 'player.body.skin.adj');

    line = line.replace('player.faceType', 'player.body.face.type');

    line = line.replace('player.earType', 'player.body.ear.type');
    line = line.replace('player.earValue', 'player.body.ear.value');

    line = line.replace('player.hornType', 'player.body.horn.type');
    line = line.replace('player.horns', 'player.body.horn.count');

    line = line.replace('player.wingType', 'player.body.wing.type');
    line = line.replace('player.wingDesc', 'player.body.wing.desc');

    line = line.replace('player.lowerBody', 'player.body.legs.type');

    line = line.replace('player.tailType', 'player.body.tail.type');
    line = line.replace('player.tailVenom', 'player.body.tail.venom');
    line = line.replace('player.tailRecharge', 'player.body.tail.recharge');

    line = line.replace('player.hipRating', 'player.body.hips.rating');
    line = line.replace('player.buttRating', 'player.body.butt.rating');

    // Manual - nipplesPierced
    // Manual - nipplesPShort
    // Manual - nipplesPLong
    line = line.replace('player.lipPierced', 'player.inventory.equipment.piercings.lip.isEquiped()');
    line = line.replace('player.lipPShort', 'player.inventory.equipment.piercings.lip.item.shortDesc');
    line = line.replace('player.lipPLong', 'player.inventory.equipment.piercings.lip.item.longDesc');
    line = line.replace('player.tonguePierced', 'player.inventory.equipment.piercings.tongue.isEquipped()');
    line = line.replace('player.tonguePShort', 'player.inventory.equipment.piercings.tongue.item.shortDesc');
    line = line.replace('player.tonguePLong', 'player.inventory.equipment.piercings.tongue.item.longDesc');
    line = line.replace('player.eyebrowPierced', 'player.inventory.equipment.piercings.eyebrow.isEquipped()');
    line = line.replace('player.eyebrowPShort', 'player.inventory.equipment.piercings.eyebrow.item.shortDesc');
    line = line.replace('player.eyebrowPLong', 'player.inventory.equipment.piercings.eyebrow.item.longDesc');
    line = line.replace('player.earsPierced', 'player.inventory.equipment.piercings.isEquipped()');
    line = line.replace('player.earsPShort', 'player.inventory.equipment.piercings.item.shortDesc');
    line = line.replace('player.earsPLong', 'player.inventory.equipment.piercings.item.longDesc');
    line = line.replace('player.nosePierced', 'player.inventory.equipment.piercings.isEquipped()');
    line = line.replace('player.nosePShort', 'player.inventory.equipment.piercings.item.shortDesc');
    line = line.replace('player.nosePLong', 'player.inventory.equipment.piercings.item.longDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.labiaPierced/, 'player.inventory.equipment.piercings.labia.isEquipped()');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.labiaPShort/, 'player.inventory.equipment.piercings.labia.item.shortDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.labiaPLong/, 'player.inventory.equipment.piercings.labia.item.longDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.clitPierced/, 'player.inventory.equipment.piercings.clit.isEquipped()');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.clitPShort/, 'player.inventory.equipment.piercings.clit.item.shortDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.clitPLong/, 'player.inventory.equipment.piercings.clit.item.longDesc');
    line = line.replace(/player\.cocks\[([^\]]+)\]\.isPierced/, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).isEquipped()`);
    line = line.replace(/player\.cocks\[([^\]]+)\]\.pShortDesc/, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).item.shortDesc`);
    line = line.replace(/player\.cocks\[([^\]]+)\]\.pLongDesc/, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).item.longDesc`);

    line = line.replace('player.antennae', 'player.body.antennae.type');
    line = line.replace('player.eyeType', 'player.body.eyes.type');
    line = line.replace('player.tongueType', 'player.body.tongue.type');
    line = line.replace('player.armType', 'player.body.arms.type');
    line = line.replace('player.gills', 'player.body.gills');
    line = line.replace('player.cocks', 'player.body.cocks');
    line = line.replace('player.balls', 'player.body.balls.count');
    // OK - cumMultiplier
    line = line.replace('player.ballSize', 'player.body.balls.size');
    // OK - hoursSinceCum
    line = line.replace('player.vaginas', 'player.body.vaginas');
    line = line.replace('player.fertility', 'player.body.fertility');
    line = line.replace('player.clitLength', 'player.body.clit.length');
    // Manual - nippleLength
    line = line.replace('player.breastRows', 'player.body.chest');
    line = line.replace('player.ass', 'player.body.butt');
    // Unused - perk()
    // Unused - perks()
    line = line.replace('player.numPerks', 'player.perks.length');
    line = line.replace('player.statusAffects', 'player.effects');

    // OK - orgasm()
    line = line.replace('player.createPerk', 'player.perks.add');
    line = line.replace('player.removePerk', 'player.perks.remove');
    line = line.replace(/player\.findPerk\((\w+)\) >= 0/, (match, p1) => `player.perks.has(${p1})`);
    line = line.replace(/player\.findPerk\((\w+)\) < 0/, (match, p1) => `!player.perks.has(${p1})`);
    // Unused - perkDuplicated
    // Unused - removePerks
    line = line.replace(/player\.addPerkValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.perks.get(${p1}).value${p2} += ${p3}`);
    line = line.replace(/player\.setPerkValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.perks.get(${p1}).value${p2} = ${p3}`);
    line = line.replace(/player\.perkv([1-4])\((\w+)\)/, (match, p1, p2) => `player.perks.get(${p2}).value${p1}`);

    line = line.replace('player.createStatusAffect', 'player.effects.add');
    line = line.replace('player.removeStatusAffect', 'player.effects.remove');
    line = line.replace(/player\.findStatusAffect\((\w+)\) >= 0/, (match, p1) => `player.effects.has(${p1})`);
    line = line.replace(/player\.findStatusAffect\((\w+)\) < 0/, (match, p1) => `!player.effects.has(${p1})`);
    line = line.replace(/player\.changeStatusAffectValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.effects.get(${p1}).value${p2} = ${p3}`);
    line = line.replace(/player\.addStatusAffectValue\((\w+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.effects.get(${p1}).value${p2} += ${p3}`);
    line = line.replace(/player\.statusAffect\(([\w\d]+)\)/, (match, p1) => `player.effects.get(${p1})`);
    line = line.replace(/player\.statusAffectv([1-4])\((\w+)\)/, (match, p1, p2) => `player.effects.get(${p2}).value${p1}`);
    // Unused - removeStatuses
    line = line.replace('player.biggestTitSize()', 'player.body.chest.sort(BreastRow.LargestRating)[0].rating');
    line = line.replace(/player\.cockArea\(([\w\d]+)\)/, (match, p1) => `player.body.cocks.get(${p1}).area`);
    line = line.replace('player.biggestCockLength()', 'player.body.cocks.sort(Cock.Largest)[0].length');
    line = line.replace('player.biggestCockArea()', 'player.body.cocks.sort(Cock.Largest)[0].area');
    line = line.replace('player.biggestCockArea2()', 'player.body.cocks.sort(Cock.Largest)[1].area');
    line = line.replace('player.cocks[player.longestCock()]', 'player.body.cocks.sort(Cock.Longest)[0]');
    line = line.replace('player.longestCock()', 'player.body.cocks.sort(Cock.Longest)[0]');
    line = line.replace('player.longestCockLength()', 'player.body.cocks.sort(Cock.Longest)[0].length');
    line = line.replace('player.longestHorseCockLength()', 'player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).sort(Cock.Longest)[0].length');
    // Unknown - twoDickRadarSpecial()
    line = line.replace('player.totalCockThickness()', 'player.body.cocks.reduce(Cock.TotalThickness, 0)');
    line = line.replace('player.cocks[player.thickestCock()]', 'player.body.cocks.sort(Cock.Thickest)[0]');
    line = line.replace('player.thickestCock()', 'player.body.cocks.sort(Cock.Thickest)[0]');
    line = line.replace('player.thickestCockThickness()', 'player.body.cocks.sort(Cock.Thickest)[0].thickness');
    line = line.replace('player.cocks[player.thinnestCockIndex()]', 'player.body.cocks.sort(Cock.Thinnest)[0]');
    line = line.replace('player.thinnestCockIndex()', 'player.body.cocks.sort(Cock.Thinnest)[0]');
    line = line.replace('player.cocks[player.smallestCockIndex()]', 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace('player.smallestCockIndex()', 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace('player.smallestCockLength()', 'player.body.cocks.sort(Cock.Smallest)[0].length');
    line = line.replace('player.cocks[player.shortestCockIndex()]', 'player.body.cocks.sort(Cock.Shortest)[0]');
    line = line.replace('player.shortestCockIndex()', 'player.body.cocks.sort(Cock.Shortest)[0]');
    line = line.replace('player.shortestCockLength()', 'player.body.cocks.sort(Cock.Shortest)[0].length');
    line = line.replace(
        /player\.cockThatFits\(([\w\d]+), ?("area"|"length")\)/,
        (match, p1, p2) =>
            p2 === "area" ?
                `player.body.cocks.find(Cock.CockThatFits(${p1}))` :
                `player.body.cocks.find(Cock.CockThatFitsLength(${p1}))`
    );
    line = line.replace(/player\.cockThatFits2\(([\w\d]+)\)/, (match, p1, p2) => `player.body.cocks.find(Cock.CockThatFits(${p1}))`);
    line = line.replace('player.smallestCockArea()', 'player.body.cocks.sort(Cock.Smallest)[0].area');
    line = line.replace('player.cocks[player.smallestCock()]', 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace('player.smallestCock()', 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace('player.cocks[player.biggestCockIndex()]', 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace('player.biggestCockIndex()', 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace('player.cocks[player.biggestCockIndex2()]', 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace('player.biggestCockIndex2()', 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace('player.cocks[player.smallestCockIndex2()]', 'player.body.cocks.sort(Cock.Smallest)[1]');
    line = line.replace('player.smallestCockIndex2()', 'player.body.cocks.sort(Cock.Smallest)[1]');
    line = line.replace('player.cocks[player.biggestCockIndex3()]', 'player.body.cocks.sort(Cock.Largest)[2]');
    line = line.replace('player.biggestCockIndex3()', 'player.body.cocks.sort(Cock.Largest)[2]');
    line = line.replace('player.cockDescript()', 'describeCock(player, player.body.cocks.get(0)');
    line = line.replace(/player\.cockDescript\((\w+)\)/, (match, p1) => `describeCock(player, ${p1})`);
    line = line.replace('player.cockAdjective()', 'describeCockAdj(player, player.body.cocks.get(0)');
    line = line.replace(/player\.cockAdjective\((\w+)\)/, (match, p1) => `describeCockAdj(player, ${p1})`);
    line = line.replace('player.wetness()', 'player.body.vaginas.get(0).wetness');
    // Manual - vaginaType()
    line = line.replace('player.looseness()', 'player.body.vaginas.get(0).looseness');
    line = line.replace('player.looseness(true)', 'player.body.vaginas.get(0).looseness');
    line = line.replace('player.looseness(false)', 'player.body.butt.looseness');
    // OK - vaginalCapacity()
    // OK - analCapacity()
    line = line.replace('player.hasFuckableNipples()', 'player.body.chest.find(BreastRow.FuckableNipples)');
    line = line.replace('!player.hasBreasts()', 'player.body.chest.length <= 0');
    line = line.replace('player.hasBreasts()', 'player.body.chest.length > 0');
    // Unused - hasNipples()
    // OK - lactationSpeed()
    line = line.replace('player.dogScore()', 'dogRaceScore(player)');
    line = line.replace('player.foxScore()', 'foxRaceScore(player)');
    line = line.replace('player.biggestLactation()', 'player.body.chest.sort(BreastRow.LargestLacation)[0].lactationMultiplier');
    // OK - milked()
    line = line.replace(/player\.boostLactation\(([^\(]+)\)/, (match, p1) => `boostLactation(player, ${p1})`);
    line = line.replace('player.averageLactation()', 'player.body.chest.reduce(BreastRow.AverageLactation, 0)');
    // OK - virilityQ()
    // OK - cumQ()
    line = line.replace(/player\.countCocksOfType\(\)/, (match, p1) => `player.body.cocks.filter(Cock.FilterType(${p1})).length`);
    line = line.replace('player.anemoneCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.ANEMONE)).length');
    line = line.replace('player.catCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.CAT)).length');
    line = line.replace('player.demonCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DEMON)).length');
    line = line.replace('player.displacerCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DISPLACER)).length');
    line = line.replace('player.dogCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DOG)).length');
    line = line.replace('player.dragonCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.DRAGON)).length');
    line = line.replace('player.foxCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.FOX)).length');
    line = line.replace('player.horseCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length');
    line = line.replace('player.kangaCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.KANGAROO)).length');
    line = line.replace('player.lizardCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.LIZARD)).length');
    line = line.replace('player.tentacleCocks()', 'player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length');
    // Unused - findFirstCockType()
    // Unused - addHorseCock()
    line = line.replace('player.cockTotal()', 'player.body.cocks.length');
    line = line.replace('player.totalCocks()', 'player.body.cocks.length');
    line = line.replace('!player.hasCock()', 'player.body.cocks.length <= 0');
    line = line.replace('player.hasCock()', 'player.body.cocks.length > 0');
    // Manual - hasSockRoom()
    // Manual - hasSock()
    // Manual - countCockSocks()
    // OK - canAutoFellate()
    // OK - canFly()
    line = line.replace('!player.hasVagina()', 'player.body.vaginas.length <= 0');
    line = line.replace('player.hasVagina()', 'player.body.vaginas.length > 0');
    line = line.replace('player.hasVirginVagina()', 'player.body.vaginas.find(Vaginas.Virgin)');
    // Manual - genderText
    line = line.replace('player.manWoman()', 'manWoman(player)');
    line = line.replace('player.manWoman(true)', 'manWoman(player, true)');
    line = line.replace('player.manWoman(false)', 'manWoman(player, false)');
    line = line.replace('player.guyGirl()', 'guyGirl(player)');
    line = line.replace('player.guyGirl(true)', 'guyGirl(player, true)');
    line = line.replace('player.guyGirl(false)', 'guyGirl(player, false)');
    line = line.replace(/player\.mfn\(([^,]+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `mfn(player, ${p1}, ${p2}, ${p3})`);
    line = line.replace(/player\.mf\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `mf(player, ${p1}, ${p2})`);
    line = line.replace('player.boyGirl()', 'boyGirl(player)');
    line = line.replace('player.boyGirl(true)', 'boyGirl(player, true)');
    line = line.replace('player.boyGirl(false)', 'boyGirl(player, false)');
    line = line.replace('player.heShe()', 'heShe(player)');
    line = line.replace('player.heShe(true)', 'heShe(player, true)');
    line = line.replace('player.heShe(false)', 'heShe(player, false)');
    line = line.replace('player.himHer()', 'himHer(player)');
    line = line.replace('player.himHer(true)', 'himHer(player, true)');
    line = line.replace('player.himHer(false)', 'himHer(player, false)');
    line = line.replace('player.maleFemale()', 'maleFemale(player)');
    line = line.replace('player.maleFemale(true)', 'maleFemale(player, true)');
    line = line.replace('player.maleFemale(false)', 'maleFemale(player, false)');
    line = line.replace('player.hisHer()', 'hisHer(player)');
    line = line.replace('player.hisHer(true)', 'hisHer(player, true)');
    line = line.replace('player.hisHer(false)', 'hisHer(player, false)');
    line = line.replace('player.sirMadam()', 'sirMadam(player)');
    line = line.replace('player.sirMadam(true)', 'sirMadam(player, true)');
    line = line.replace('player.sirMadam(false)', 'sirMadam(player, false)');
    line = line.replace(/player\.createCock\(([^,]+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.body.cocks.add(new Cock(${p1}, ${p2}, ${p3}))`);
    line = line.replace(/player\.createCock\(([^,]+), ?([^,]+)\)/, (match, p1, p2) => `player.body.cocks.add(new Cock(${p1}, ${p2}))`);
    line = line.replace(/player\.createCock\(([^\)]+)\)/, (match, p1) => `player.body.cocks.add(new Cock(${p1}))`);
    line = line.replace('player.createCock()', 'player.body.cocks.add(new Cock())');
    line = line.replace(/player\.createVagina\(([^,]+), ?([^,]+), ?([^,]+)\)/, (match, p1, p2, p3) => `player.body.vaginas.add(new Vagina(${p2}, ${p3}, ${p1}))`);
    // Manual - createVagina(virgin, vaginalWetness)
    // Manual - createVagina(virgin)
    line = line.replace('player.createVagina()', 'player.body.vaginas.add(new Vagina())');
    // Manual - createBreastRow(size, nipplesPerBreast)
    line = line.replace(/player\.createBreastRow\(([^,]+)\)/, (match, p1) => `player.body.chest.add(new BreastRow(${p1}))`);
    line = line.replace('player.createBreastRow()', 'player.body.chest.add(new BreastRow())');
    // Remove - genderCheck
    line = line.replace('player.genderCheck();', '');
    line = line.replace(
        /player\.removeCock\(([^,]+), ?([^,]+)\)/,
        (match, p1, p2) => p2 === 1 ?
            `player.body.cocks.remove(${p1})` :
            trimLeft`for (let cockIndex = 0; cockIndex < ${p2}; cockIndex++)
                player.body.cocks.remove(${p1} + cockIndex)`
    );
    line = line.replace(
        /player\.removeVagina\(([^,]+), ?([^,]+)\)/,
        (match, p1, p2) => p2 === 1 ?
            `player.body.vaginas.remove(${p1})` :
            trimLeft`for (let vagIndex = 0; vagIndex < ${p2}; vagIndex++)
                player.body.vaginas.remove(${p1} + vagIndex)`
    );
    line = line.replace(/player\.removeVagina\(([^,]+)\)/, (match, p1) => `player.body.vaginas.remove(${p1})`);
    line = line.replace('player.removeVagina()', 'player.body.vaginas.remove(0)');
    line = line.replace(
        /player\.removeBreastRow\(([^,]+), ?([^,]+)\)/,
        (match, p1, p2) => p2 === 1 ?
            `player.body.chest.remove(${p1})` :
            trimLeft`for (let breastRowIndex = 0; breastRowIndex < ${p2}; breastRowIndex++)
                player.body.chest.remove(${p1} + breastRowIndex)`
    );
    // Remove - fixFuckingCockTypesEnum
    line = line.replace(/player\.buttChangeNoDisplay\(([^,]+)\)/, (match, p1) => `stretchButt(player, ${p1})`);
    line = line.replace(/player\.cuntChangeNoDisplay\(([^,]+)\)/, (match, p1) => `stretchVagina(player, ${p1})`);
    line = line.replace('player.inHeat()', 'player.effects.has(Effect.Heat)');
    line = line.replace('player.inRut()', 'player.effects.has(Effect.Rut)');
    // OK - bonusFertility
    // OK - totalFertility
    line = line.replace('player.isBiped()', 'player.body.legs.isBiped()');
    line = line.replace('player.isNaga()', 'player.body.legs.isNaga()');
    line = line.replace('player.isTaur()', 'player.body.legs.isTaur()');
    line = line.replace('player.isDrider()', 'player.body.legs.isDrider()');
    line = line.replace('player.isGoo()', 'player.body.legs.isGoo()');
    line = line.replace('player.legs()', 'describeLegs(player)');
    line = line.replace('player.skinFurScales()', 'skinFurScales(player)');
    line = line.replace('player.leg()', 'describeLeg(player)');
    line = line.replace('player.feet()', 'describeFeet(player)');
    line = line.replace('player.foot()', 'describeFoot(player)');
    // Manual - canOvipositSpider
    // Manual - canOvipositBee
    line = line.replace('player.canOviposit()', 'player.pregnancy.ovipositor.canOviposit()');
    line = line.replace('player.eggs()', 'player.pregnancy.ovipositor.eggs');
    // Unused - addEggs
    line = line.replace('player.dumpEggs()', 'player.pregnancy.ovipositor.dumpEggs()');
    line = line.replace('player.dumpEggs()', 'player.pregnancy.ovipositor.dumpEggs()');
    // Unused - setEggs
    line = line.replace('player.fertilizedEggs()', 'player.pregnancy.ovipositor.fertilizedEggs');
    line = line.replace('player.fertilizeEggs()', 'player.pregnancy.ovipositor.fertilizeEggs()');
    line = line.replace(/player\.breastCup\(([^,]+)\)/, (match, p1) => `breastCup(player.body.chest.get(${p1}))`);
    line = line.replace('player.bRows()', 'player.body.chest.length');
    line = line.replace('player.totalBreasts()', 'player.body.chest.reduce(BreastRow.TotalBreasts, 0)');
    line = line.replace('player.totalNipples()', 'player.body.chest.reduce(BreastRow.TotalNipples, 0)');
    line = line.replace('player.smallestTitSize()', 'player.body.chest.sort(BreastRow.Smallest)[0].rating');
    line = line.replace('player.smallestTitRow()', 'player.body.chest.sort(BreastRow.Smallest)[0]');
    line = line.replace('player.biggestTitRow()', 'player.body.chest.sort(BreastRow.Biggest)[0]');
    line = line.replace('player.averageBreastSize()', 'player.body.chest.reduce(BreastRow.AverageSize, 0)');
    line = line.replace('player.averageCockThickness()', 'player.body.cocks.reduce(Cock.AverageThickness, 0)');
    line = line.replace('player.averageNippleLength()', 'player.body.chest.reduce(BreastRow.AverageNippleLength, 0)');
    line = line.replace('player.averageVaginalLooseness()', 'player.body.vaginas.reduce(Vagina.AverageLooseness, 0)');
    line = line.replace('player.averageVaginalWetness()', 'player.body.vaginas.reduce(Vagina.AverageWetness, 0)');
    line = line.replace('player.averageCockLength()', 'player.body.cock.reduce(Cock.AverageLength, 0)');
    line = line.replace('player.canTitFuck()', 'player.body.chest.find(BreastRow.Fuckable)');
    line = line.replace('player.mostBreastsPerRow()', 'player.body.chest.sort(BreastRow.MostBreastsCount)[0].count');
    line = line.replace('player.averageNipplesPerBreast()', 'player.body.chest.reduce(BreastRow.AverageNipplesPerBreast, 0)');
    line = line.replace('player.allBreastsDescript()', 'describeAllBreasts(player)');
    line = line.replace('player.sMultiCockDesc()', 'describeOneOfYourCocks(player)');
    line = line.replace('player.SMultiCockDesc()', 'describeOneOfYourCocksCap(player)');
    line = line.replace('player.oMultiCockDesc()', 'describeEachOfYourCocks(player)');
    line = line.replace('player.OMultiCockDesc()', 'describeEachOfYourCocksCap(player)');
    line = line.replace('player.cockMultiLDescriptionShort()', 'describeCocksShort(player)');
    line = line.replace('player.hasSheath()', 'player.body.cocks.find(Cock.Sheathed)');
    line = line.replace('player.sheathDescription()', 'describeSheath(player)');
    line = line.replace('player.vaginaDescript()', 'describeVagina(player, player.body.vagina.get(0))');
    line = line.replace(/player\.vaginaDescript\(([^,]+)\)/, (match, p1) => `describeVagina(player, player.body.vagina.get(${p1}))`);
    line = line.replace(/player\.nippleDescript\(([^,]+)\)/, (match, p1) => `describeNipple(player, player.body.chest.get(${p1}))`);
    line = line.replace('player.chestDesc()', 'describeChest(player.body.chest)');
    line = line.replace('player.allChestDesc()', 'describeEntireChest(player.body.chest)');
    line = line.replace('player.clitDescript()', 'describeClit(player.body.clit)');
    line = line.replace('player.cockHead()', 'describeCockHead(player.body.cocks.get(0))');
    line = line.replace(/player\.cockHead\(([^,]+)\)/, (match, p1) => `describeCockHead(player.body.cocks.get(${p1}))`);
    line = line.replace('player.cockDescriptShort()', 'describeCockShort(player.body.cocks.get(0))');
    line = line.replace(/player\.cockDescriptShort\(([^,]+)\)/, (match, p1) => `describeCockShort(player.body.cocks.get(${p1}))`);
    line = line.replace('player.assholeOrPussy()', 'assholeOrPussy(player)');
    line = line.replace('player.multiCockDescriptLight()', 'describeCocksLight(player)');
    line = line.replace('player.multiCockDescript()', 'describeCocks(player)');
    line = line.replace('player.ballsDescriptLight()', 'describeBallsLight(player)');
    line = line.replace('player.ballsDescriptLight(true)', 'describeBallsLight(player, true)');
    line = line.replace('player.ballsDescriptLight(false)', 'describeBallsLight(player, false)');
    line = line.replace('player.sackDescript()', 'describeBallsack(player)');
    line = line.replace(/player\.breastDescript\(([^,]+)\)/, (match, p1) => `describeBreastRow(player.body.chest.get(${p1}))`);
    line = line.replace(/player\.breastSize\(([^,]+)\)/, (match, p1) => `describeBreastRowRating(${p1})`);
    return line;
}
