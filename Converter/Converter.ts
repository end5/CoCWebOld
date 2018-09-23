import { readdir, PathLike, stat, writeFileSync, readFileSync, renameSync } from 'fs';

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

walk('Converter/Test', (file) => fix(file), (err) => console.error(err));
// walk('Game/Scenes', (file) => fix(file, true), (err) => console.error(err));

function fix(file: string, overwrite?: boolean) {
    if (file.endsWith('.as')) {
        console.log('Fixing ' + file);

        const data = readFileSync(file, 'utf-8');
        const newValue = fixText(data);
        const newFile = file.replace('.as', '.ts');
        if (overwrite)
            renameSync(file, newFile);
        writeFileSync(newFile, newValue, 'utf-8');
    }
}

function trimLeft(strings: TemplateStringsArray, ...values: any[]) {
    return strings.reduce((prev, curr, index) => prev + curr.trimLeft() + (values[index] || ''), '');
}

function escRegex(str: string): RegExp {
    return new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
}

function combineStrRegex(str: string, regex: RegExp): RegExp {
    return new RegExp(new RegExp(str).source + regex.source, 'g');
}

function fixText(text: string): string {
    const lines = text.split('\n');

    let removeCurlyBraceOpen = 0;
    let removeCurlyBraceClose = 0;
    let timeAwareClass = false;
    let monster = false;
    let className: string;
    const flags: Set<string> = new Set();
    const scenes: Set<string> = new Set();
    let index = 0;
    while (index < lines.length) {
        // Remove - package ...
        if (lines[index].trimLeft().startsWith('package')) {
            if (!lines[index].includes('{'))
                removeCurlyBraceOpen++;
            removeCurlyBraceClose++;
            lines.splice(index, 1);
            continue;
        }

        // Remove - if package ... then {
        if (removeCurlyBraceOpen > 0 && lines[index].trimLeft().startsWith('{')) {
            lines.splice(index, 1);
            removeCurlyBraceOpen--;
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

            if (/public class [\w\d_ ]+ extends Monster/.test(lines[index]))
                monster = true;

            if (/public class [\w\d_ ]+ implements TimeAwareInterface/.test(lines[index])) {
                lines[index] = lines[index].replace('public class', 'export class');
                lines[index] = lines[index].replace('TimeAwareInterface', 'ITimeAware');
                timeAwareClass = true;
            }
            else {
                if (!lines[index].includes('{'))
                    removeCurlyBraceOpen++;
                removeCurlyBraceClose++;
                lines.splice(index, 1);
                continue;
            }
        }

        if (timeAwareClass && lines[index].trimLeft().startsWith('//End of Interface Implementation')) {
            lines.splice(index, 1, '}');
            timeAwareClass = false;
        }

        if (lines[index].trimLeft().startsWith('//Implementation of ITimeAware')) {
            lines.splice(index, 0);
            continue;
        }

        if (lines[index].trimLeft().startsWith('trace '))
            lines[index] = lines[index].replace('trace ', '// trace ');

        if (lines[index].trimLeft().startsWith('override '))
            lines[index] = lines[index].replace('override ', '');

        if (lines[index].trimLeft().startsWith('internal '))
            lines[index] = lines[index].replace('internal ', 'private ');

        if (lines[index].trimLeft().startsWith('public function ' + className + 'Scene'))
            lines[index] = lines[index].replace('public function ' + className + 'Scene', 'public constructor');

        if (lines[index].trimLeft().startsWith('public function ' + className)) {
            if (monster) {
                lines.splice(index, 0, `export class ${className} extends Character {`);
                index++;
            }

            lines[index] = lines[index].replace('public function ' + className, 'public constructor');

            if (monster) {
                while (!lines[index].includes('{'))
                    index++;
                index++;
                lines.splice(index, 0, `super(CharacterType.${className});`);
                index++;
                monster = false;

                let tempIndex = index;
                while (!lines[tempIndex].includes('}'))
                    tempIndex++;
                lines[tempIndex] = lines[tempIndex] + '}';
            }
        }

        function fixNextScene(line: string): string {
            return line.replace(
                /function ([ \w]+)\s*\((?:([^)]+))?\)(?:(:\s*\w+))?/,
                (match, p1, p2, p3) => {
                    let str = `function ${p1}`;
                    // Function returns nothing
                    if (p3 === undefined || /:\s*void/.test(p3)) {
                        scenes.add(p1.trimLeft());
                        str += '(player: Character';
                        if (p2 === undefined)
                            str += ')';
                        else
                            str += `, ${p2})`;
                        str += ': NextScreenChoices';
                    }
                    else {
                        if (p2 === undefined)
                            str += `()${p3}`;
                        else
                            str += `(${p2})${p3}`;
                    }
                    return str;
                }
            );
        }

        if (lines[index].trimLeft().startsWith('public function')) {
            lines[index] = fixNextScene(lines[index]);
            lines[index] = lines[index].replace('public function', 'export function');
        }

        if (lines[index].trimLeft().startsWith('protected function')) {
            lines[index] = fixNextScene(lines[index]);
            lines[index] = lines[index].replace('protected function', 'function');
        }

        if (lines[index].trimLeft().startsWith('private function')) {
            lines[index] = fixNextScene(lines[index]);
            lines[index] = lines[index].replace('private function', 'function');
        }

        if (lines[index].trimLeft().startsWith('public var'))
            lines[index] = lines[index].replace('public var', 'public');

        if (lines[index].trimLeft().startsWith('private var'))
            lines[index] = lines[index].replace('private var', 'private');

        index++;
    }

    text = lines.join('\n');

    index = text.length - 1;
    while (removeCurlyBraceClose > 0) {
        if (text[index] === '}') {
            text = text.slice(0, index) + text.substr(index + 1);
            removeCurlyBraceClose--;
        }
        index--;
    }

    for (const scene of scenes) {
        text = text.replace(new RegExp(/(\w*)([ \t]*)/.source + scene + /\((?:([^;]+))?\)/.source, 'g'),
            (match, p1, p2, p3) => {
                if (p1 !== 'function' && !p1.includes('.')) {
                    // console.log(`scene ${scene}\n\tp1 ${p1}\n\tp2 ${p2}\n\tp3 ${p3}\n`);
                    if (p3 !== undefined)
                        return p1 + p2 + 'return ' + scene + '(player, ' + p3 + ')';
                    else
                        return p1 + p2 + 'return ' + scene + '(player)';
                }
                else
                    return match;
            }
        );
    }

    text = text.replace('extends NPCAwareContent ', '');
    text = text.replace('extends BaseContent ', '');
    text = text.replace('TimeAwareInterface', 'ITimeAware');

    text = text.replace(/:\s*Function/g, ': ClickFunction');
    text = text.replace(/:\s*Boolean/g, ': boolean');
    text = text.replace(/:\s*Number/g, ': number');
    text = text.replace(/:\s*int/g, ': number');
    text = text.replace(/:\s*String/g, ': string');
    text = text.replace(/:\s*void/g, '');
    text = text.replace(/null/g, 'undefined');

    if (/flags\[kFLAGS\.([^\]]+)\]/g.test(text)) {
        text = text.replace(/flags\[kFLAGS\.([^\]]+)\]/g, (match, p1) => {
            flags.add(p1);
            return `${className}Flags.${p1}`;
        });
    }

    if (flags.size > 0) {
        let flagText = `export const ${className}Flags = {\n`;
        for (const flag of flags.values()) {
            flagText += `${flag}: 0,\n`;
        }
        flagText += '};\n';
        flagText += `User.flags.set(FlagType.${className}, ${className}Flags);\n`;

        text = flagText + text;
    }
    // flagText += 'const player = User.char;';

    text = text.replace(/rand\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `randInt(${p1})`);
    text = text.replace(escRegex('camp.'), '');
    text = text.replace(escRegex('Appearance.'), '');
    text = text.replace(escRegex('game.'), '');
    text = text.replace(escRegex('kGAMECLASS.'), '');
    text = text.replace(escRegex('CoC.'), '');
    text = text.replace(escRegex('kFLAGS.'), `${className}Flags.`);
    // Unused - whitney
    // Manual - monk
    // Manual - sand
    // Manual - giacomo

    text = text.replace(escRegex('model.time.hours'), 'Time.hour');
    text = text.replace(escRegex('model.time.day'), 'Time.day');

    text = text.replace(escRegex('gameOver()'), 'return gameOverMenu()');
    text = text.replace(escRegex('cockNoun('), 'nounCock(');

    // Classes
    text = fixUtils(text);
    text = fixItems(text);
    text = fixBreastRowClass(text);
    text = fixAssClass(text);
    text = fixVaginaClass(text);
    text = fixCockClass(text);
    text = fixCreatureClass(text, 'player');
    text = fixCreatureClass(text, 'monster');
    text = fixCreatureClass(text, 'this');
    text = fixCharacterClass(text);
    text = fixPlayerClass(text);
    text = fixMonsterClass(text);
    text = fixBaseContent(text, className);

    // Enums
    text = text.replace(escRegex('StatusAffects.'), 'StatusEffectType.');
    text = text.replace(escRegex('PerkLib.'), 'PerkType.');
    text = text.replace(escRegex('CockTypesEnum.'), 'CockType.');
    text = text.replace(escRegex('PregnancyStore.PREGNANCY_'), 'PregnancyType.');
    text = text.replace(escRegex('PregnancyStore.INCUBATION_'), 'IncubationTime.');
    text = text.replace(escRegex('GENDER_'), 'Gender.');
    text = text.replace(escRegex('SKIN_TYPE_'), 'SkinType.');
    text = text.replace(escRegex('HAIR_'), 'HairType.');
    text = text.replace(escRegex('FACE_'), 'FaceType.');
    text = text.replace(escRegex('TONGUE_'), 'TongueType.');
    text = text.replace(escRegex('TONUGE_'), 'TongueType.');
    text = text.replace(escRegex('EYES_'), 'EyeType.');
    text = text.replace(escRegex('EARS_'), 'EarType.');
    text = text.replace(escRegex('HORNS_'), 'HornType.');
    text = text.replace(escRegex('ANTENNAE_'), 'AntennaeType.');
    text = text.replace(escRegex('ARM_TYPE_'), 'ArmType.');
    text = text.replace(escRegex('TAIL_TYPE_'), 'TailType.');
    text = text.replace(escRegex('BREAST_CUP_'), 'BreastCup.');
    text = text.replace(escRegex('WING_TYPE_'), 'WingType.');
    text = text.replace(escRegex('LOWER_BODY_TYPE_'), 'LegType.');
    text = text.replace(escRegex('PIERCING_TYPE_'), 'PiercingType.');
    text = text.replace(escRegex('VAGINA_TYPE_'), 'VaginaType.');
    text = text.replace(escRegex('VAGINA_WETNESS_'), 'VaginaWetness.');
    text = text.replace(escRegex('VAGINA_LOOSENESS_'), 'VaginaLooseness.');
    text = text.replace(escRegex('ANAL_WETNESS_'), 'ButtWetness.');
    text = text.replace(escRegex('ANAL_LOOSENESS_'), 'ButtLooseness.');
    text = text.replace(escRegex('HIP_RATING_'), 'HipRating.');
    text = text.replace(escRegex('BUTT_RATING_'), 'ButtRating.');

    // Inventory
    text = text.replace(
        /inventory\.takeItem\(\s*((?:[^,(]|\([^)]*\))+),\s*((?:[^,(]|\([^)]*\))+)\)/g,
        (match, p1, p2) => {
            const type = p1.split('Name')[0];
            return `return player.inventory.items.createAdd(player, ItemType.${type}, ${p1}, ${p2})`;
        }
    );
    text = text.replace(escRegex('inventory.hasItemInStorage'), 'player.inventory.items.has');
    text = text.replace(escRegex('inventory.consumeItemInStorage'), 'player.inventory.items.consumeItem');

    // Special post cases
    text = text.replace(/player\.stats\.lus=/g, (match, p1) => `player.stats.lustNoResist${p1}`);
    text = text.replace(/player\.stats\.lus([^t])/g, (match, p1) => `player.stats.lust${p1}`);
    text = text.replace(/player\.stats\.sen([^s])/g, (match, p1) => `player.stats.sens${p1}`);
    text = text.replace(escRegex('player.butt'), 'player.body.butt');
    text = text.replace(escRegex('clearOutput()'), 'CView.clear()');
    text = text.replace(escRegex('export function timeChange'), 'public timeChange');
    text = text.replace(escRegex('export function timeChangeLarge'), 'public timeChangeLarge');
    text = text.replace(/player\.body\.\w+\.get\(([^\d](?:[^,(]|\([^)]*\))*?)\)/g, '$1');

    return text;
}

function fixUtils(text: string): string {
    text = text.replace(escRegex('num2Text'), 'numToCardinalText');
    text = text.replace(escRegex('Num2Text'), 'numToCardinalCapText');
    text = text.replace(escRegex('num2Text2'), 'numToOrdinalText');
    return text;
}

function fixItems(text: string): string {
    // public const ([^:]+):[\w\s=\(".,\n\-\'?\):{}\\<>\/!+]+;
    // Weapons
    const weapons = [
        ['weapons.B_SWORD', 'WeaponName.BeautifulSword'],
        ['weapons.CLAYMOR', 'WeaponName.LargeClaymore'],
        ['weapons.DRGNSHL', 'WeaponName.DragonShellShield'],
        ['weapons.E_STAFF', 'WeaponName.EldritchStaff'],
        ['weapons.URTAHLB', 'WeaponName.UrtaHalberd'],
        ['weapons.H_GAUNT', 'WeaponName.HookedGauntlet'],
        ['weapons.JRAPIER', 'WeaponName.JeweledRapier'],
        ['weapons.KATANA ', 'WeaponName.Katana'],
        ['weapons.L__AXE', 'WeaponName.LargeAxe'],
        ['weapons.L_DAGGR', 'WeaponName.AphroDagger'],
        ['weapons.L_HAMMR', 'WeaponName.LargeHammer'],
        ['weapons.PIPE   ', 'WeaponName.Pipe'],
        ['weapons.RIDINGC', 'WeaponName.RidingCrop'],
        ['weapons.RRAPIER', 'WeaponName.RaphaelsRapier'],
        ['weapons.S_BLADE', 'WeaponName.Spellblade'],
        ['weapons.S_GAUNT', 'WeaponName.SpikedGauntlet'],
        ['weapons.SPEAR  ', 'WeaponName.Spear'],
        ['weapons.SUCWHIP', 'WeaponName.SuccubiWhip'],
        ['weapons.W_STAFF', 'WeaponName.WizardsStaff'],
        ['weapons.WARHAMR', 'WeaponName.HugeWarhammer'],
        ['weapons.WHIP   ', 'WeaponName.Whip'],
    ];
    // Armor
    // Manual - COMFORTABLE_UNDERCLOTHES
    const armors = [
        ['armors.ADVCLTH', 'GreenClothes'],
        ['armors.B_DRESS', 'LongDress'],
        ['armors.BEEARMR', 'BeeArmor'],
        ['armors.BIMBOSK', 'BimboSkirt'],
        ['armors.BONSTRP', 'BondageStraps'],
        ['armors.C_CLOTH', 'ComfortClothes'],
        ['armors.CHBIKNI', 'ChainmailBikini'],
        ['armors.CLSSYCL', 'SuitClothes'],
        ['armors.FULLCHN', 'FullChainmail'],
        ['armors.FULLPLT', 'FullPlatemail'],
        ['armors.FURLOIN', 'FurLoincloth'],
        ['armors.GELARMR', 'ArmorName.GelArmor'],
        ['armors.GOOARMR', 'ArmorName.GooArmor'],
        ['armors.I_CORST', 'ArmorName.InquisitorsCorset'],
        ['armors.I_ROBES', 'ArmorName.InquisitorsRobes'],
        ['armors.INDECST', 'ArmorName.IndecentSteelArmor'],
        ['armors.LEATHRA', 'ArmorName.LeatherArmor'],
        ['armors.URTALTA', 'ArmorName.LeatherArmorSegments'],
        ['armors.LMARMOR', 'ArmorName.LustyMaidensArmor'],
        ['armors.LTHRPNT', 'ArmorName.TightLeatherPants'],
        ['armors.LTHRROB', 'ArmorName.LeatherRobes'],
        ['armors.M_ROBES', 'ArmorName.ModestRobes'],
        ['armors.NURSECL', 'ArmorName.NurseOutfit'],
        ['armors.OVERALL', 'ArmorName.Overalls'],
        ['armors.R_BDYST', 'ArmorName.RedBodysuit'],
        ['armors.RBBRCLT', 'ArmorName.RubberFetishClothes'],
        ['armors.S_SWMWR', 'ArmorName.SluttySwimwear'],
        ['armors.SCALEML', 'ArmorName.Scalemail'],
        ['armors.SEDUCTA', 'ArmorName.SeductiveArmor'],
        ['armors.SS_ROBE', 'ArmorName.SpidersilkRobes'],
        ['armors.SSARMOR', 'ArmorName.SpidersilkArmor'],
        ['armors.T_BSUIT', 'ArmorName.SemiTransBodysuit'],
        ['armors.TUBETOP', 'ArmorName.TubeTop'],
        ['armors.W_ROBES', 'ArmorName.WizardRobes'],
    ];
    // Useables
    const useables = [
        ['useables.B_CHITN', 'MaterialName.BlackChitin'],
        ['useables.GLDSTAT', 'MaterialName.GoldenStatue'],
        ['useables.GREENGL', 'MaterialName.GreenGel'],
        ['useables.T_SSILK', 'MaterialName.ToughSpiderSilk'],
    ];

    // Consumables
    const consumables = [
        ['consumables.AUBURND', 'ConsumableName.HairDyeAuburn'],
        ['consumables.B__BOOK', 'ConsumableName.BlackSpellbook'],
        ['consumables.B_GOSSR', 'ConsumableName.BlackGossamer'],
        ['consumables.BC_BEER', 'ConsumableName.BlackCatBeer'],
        ['consumables.BEEHONY', 'ConsumableName.BeeHoney'],
        ['consumables.BIMBOCH', 'ConsumableName.BimboChampagne'],
        ['consumables.BIMBOLQ', 'ConsumableName.BimboLiqueur'],
        ['consumables.BLACK_D', 'ConsumableName.HairDyeBlack'],
        ['consumables.BLACKEG', 'ConsumableName.EggBlack'],
        ['consumables.BLACKPP', 'ConsumableName.CaninePepperBlack'],
        ['consumables.BLOND_D', 'ConsumableName.HairDyeBlonde'],
        ['consumables.BLUEDYE', 'ConsumableName.HairDyeDarkBlue'],
        ['consumables.BLUEEGG', 'ConsumableName.EggBlue'],
        ['consumables.BROBREW', 'ConsumableName.BroBrew'],
        ['consumables.BROWN_D', 'ConsumableName.HairDyeBrown'],
        ['consumables.BROWNEG', 'ConsumableName.EggBrown'],
        ['consumables.BULBYPP', 'ConsumableName.CaninePepperBulbous'],
        ['consumables.CANINEP', 'ConsumableName.CaninePepper'],
        ['consumables.CCUPCAK', 'ConsumableName.GiantChocolateCupcake'],
        ['consumables.CERUL_P', 'ConsumableName.CeruleanPotion'],
        ['consumables.COAL___', 'ConsumableName.Coal'],
        ['consumables.DBLPEPP', 'ConsumableName.CaninePepperDouble'],
        ['consumables.DEBIMBO', 'ConsumableName.DeBimbo'],
        ['consumables.DRGNEGG', 'ConsumableName.DragonEgg'],
        ['consumables.DRYTENT', 'ConsumableName.ShriveledTentacle'],
        ['consumables.ECTOPLS', 'ConsumableName.Ectoplasm'],
        ['consumables.EQUINUM', 'ConsumableName.Equinum'],
        ['consumables.EXTSERM', 'ConsumableName.HairExtensionSerum'],
        ['consumables.F_DRAFT', 'ConsumableName.LustDraftEnhanced'],
        ['consumables.FISHFIL', 'ConsumableName.FishFillet'],
        ['consumables.FOXBERY', 'ConsumableName.FoxBerry'],
        ['consumables.FRRTFRT', 'ConsumableName.FerretFruit'],
        ['consumables.FOXJEWL', 'ConsumableName.FoxJewel'],
        ['consumables.GLDSEED', 'ConsumableName.GoldenSeed'],
        ['consumables.GODMEAD', 'ConsumableName.GodsMead'],
        ['consumables.GOB_ALE', 'ConsumableName.GoblinAle'],
        ['consumables.GRAYDYE', 'ConsumableName.HairDyeGray'],
        ['consumables.GREEN_D', 'ConsumableName.HairDyeGreen'],
        ['consumables.GROPLUS', 'ConsumableName.GroPlus'],
        ['consumables.HUMMUS_', 'ConsumableName.Hummus'],
        ['consumables.IMPFOOD', 'ConsumableName.ImpFood'],
        ['consumables.INCUBID', 'ConsumableName.IncubusDraft'],
        ['consumables.IZYMILK', 'ConsumableName.IsabellaMilk'],
        ['consumables.KANGAFT', 'ConsumableName.KangaFruit'],
        ['consumables.KITGIFT', 'ConsumableName.KitsuneGift'],
        ['consumables.KNOTTYP', 'ConsumableName.CaninePepperKnotty'],
        ['consumables.L_DRAFT', 'ConsumableName.LustDraft'],
        ['consumables.L_BLKEG', 'ConsumableName.LargeEggBlack'],
        ['consumables.L_BLUEG', 'ConsumableName.LargeEggBlue'],
        ['consumables.L_BRNEG', 'ConsumableName.LargeEggBrown'],
        ['consumables.L_PNKEG', 'ConsumableName.LargeEggPink'],
        ['consumables.L_PRPEG', 'ConsumableName.LargeEggPurple'],
        ['consumables.L_WHTEG', 'ConsumableName.LargeEggWhite'],
        ['consumables.LABOVA_', 'ConsumableName.LaBova'],
        ['consumables.LACTAID', 'ConsumableName.Lactaid'],
        ['consumables.LARGEPP', 'ConsumableName.CaninePepperLarge'],
        ['consumables.LUSTSTK', 'ConsumableName.LustStick'],
        ['consumables.M__MILK', 'ConsumableName.MarbleMilk'],
        ['consumables.MAGSEED', 'ConsumableName.GoldenSeedEnhanced'],
        ['consumables.MGHTYVG', 'ConsumableName.KangaFruitEnhanced'],
        ['consumables.MOUSECO', 'ConsumableName.MouseCocoa'],
        ['consumables.MINOBLO', 'ConsumableName.MinotaurBlood'],
        ['consumables.MINOCUM', 'ConsumableName.MinotaurCum'],
        ['consumables.MYSTJWL', 'ConsumableName.FoxJewelEnhanced'],
        ['consumables.NUMBROX', 'ConsumableName.NumbRock'],
        ['consumables.NPNKEGG', 'ConsumableName.NeonPinkEgg'],
        ['consumables.ORANGDY', 'ConsumableName.HairDyeBrightOrange'],
        ['consumables.OVIELIX', 'ConsumableName.OvipositionElixir'],
        ['consumables.P_DRAFT', 'ConsumableName.IncubusDraftPure'],
        ['consumables.P_LBOVA', 'ConsumableName.LaBovaPure'],
        ['consumables.P_PEARL', 'ConsumableName.PurePearl'],
        ['consumables.P_S_MLK', 'ConsumableName.SuccubiMilkPure'],
        ['consumables.P_WHSKY', 'ConsumableName.PhoukaWhiskey'],
        ['consumables.PEPPWHT', 'ConsumableName.PeppermintWhite'],
        ['consumables.PINKDYE', 'ConsumableName.HairDyeNeonPink'],
        ['consumables.PINKEGG', 'ConsumableName.EggPink'],
        ['consumables.PRFRUIT', 'ConsumableName.PurpleFruit'],
        ['consumables.PROBOVA', 'ConsumableName.LaBovaEnhanced'],
        ['consumables.PSDELIT', 'ConsumableName.SuccubisDelightPure'],
        ['consumables.PURHONY', 'ConsumableName.BeeHoneyPure'],
        ['consumables.PURPDYE', 'ConsumableName.HairDyePurple'],
        ['consumables.PURPEAC', 'ConsumableName.PurityPeach'],
        ['consumables.PURPLEG', 'ConsumableName.EggPurple'],
        ['consumables.RED_DYE', 'ConsumableName.HairDyeRed'],
        ['consumables.REPTLUM', 'ConsumableName.Reptilum'],
        ['consumables.REDUCTO', 'ConsumableName.Reducto'],
        ['consumables.RINGFIG', 'ConsumableName.RingtailFig'],
        ['consumables.RIZZART', 'ConsumableName.RizzaRoot'],
        ['consumables.S_DREAM', 'ConsumableName.SuccubisDream'],
        ['consumables.S_GOSSR', 'ConsumableName.SweetGossamer'],
        ['consumables.SDELITE', 'ConsumableName.SuccubisDelight'],
        ['consumables.SENSDRF', 'ConsumableName.SensitivityDraft'],
        ['consumables.SHARK_T', 'ConsumableName.SharkTooth'],
        ['consumables.SHEEPMK', 'ConsumableName.SheepMilk'],
        ['consumables.SMART_T', 'ConsumableName.ScholarsTea'],
        ['consumables.SNAKOIL', 'ConsumableName.SnakeOil'],
        ['consumables.SPHONEY', 'ConsumableName.BeeHoneySpecial'],
        ['consumables.SUCMILK', 'ConsumableName.SuccubiMilk'],
        ['consumables.TRAPOIL', 'ConsumableName.TrapOil'],
        ['consumables.TSCROLL', 'ConsumableName.TatteredScroll'],
        ['consumables.TSTOOTH', 'ConsumableName.SharkToothEnhanced'],
        ['consumables.VITAL_T', 'ConsumableName.VitalityTincture'],
        ['consumables.VIXVIGR', 'ConsumableName.FoxBerryEnhanced'],
        ['consumables.W__BOOK', 'ConsumableName.WhiteSpellbook'],
        ['consumables.W_FRUIT', 'ConsumableName.WhiskerFruit'],
        ['consumables.W_STICK', 'ConsumableName.WingStick'],
        ['consumables.WETCLTH', 'ConsumableName.WetCloth'],
        ['consumables.WHITEDY', 'ConsumableName.HairDyeWhite'],
        ['consumables.WHITEEG', 'ConsumableName.EggWhite'],
        ['consumables.PRNPKR', 'ConsumableName.PrincessPucker'],
        ['consumables.HRBCNT', 'ConsumableName.HerbalContraceptive'],
        // Manual - LARGE_EGGS
        // Manual - SMALL_EGGS
    ];

    for (const type of [weapons, armors, useables, consumables])
        for (const item of type)
            text = text.replace(escRegex(item[0]), item[1]);

    return text;
}

function fixBaseContent(text: string, className: string): string {
    text = text.replace(/getGame\(\)\.?/g, '');
    // Unknown - cheatTime
    // OK - isHalloween
    // OK - isValentine
    // OK - isHolidays
    // OK - isThanksgiving
    text = text.replace(escRegex('showStats'), 'MainScreen.stats.show()');
    text = text.replace(escRegex('statScreenRefresh();'), '');
    text = text.replace(escRegex('cleanupAfterCombat()'), 'return { next: returnToCampUseOneHour }');
    text = text.replace(escRegex('cleanupAfterCombat'), 'returnToCampUseOneHour');
    // Manual - combatRoundOver
    // Manual - enemyAI
    text = text.replace(/spriteSelect\((\d+)\);/g, (match, p1) => `CView.sprite(SpriteName.${className}); // ${p1}`);
    text = text.replace(escRegex('hideStats()'), '');
    text = text.replace(escRegex('hideUpDown()'), '');
    text = text.replace(escRegex('createCallBackFunction'), 'partial');
    text = text.replace(escRegex('createCallBackFunction2'), 'partial');
    text = text.replace(escRegex('startCombat('), 'return CombatManager.beginBattle(player, ');
    // Manual - startCombatImmediate
    // Unused - rawOutputText
    text = text.replace(
        /outputText\(((?:[^(]|\([^)]*\))+?)(?:,\s*(\w+))?\);/g,
        (match, p1, p2) => {
            let fixed = '';
            if (p1.startsWith('images')) {
                return p1.replace(/images\.showImage\(\"([^\"]+)\"\)/, 'CView.image("$1");');
            }
            if (p2 === 'true') {
                fixed += '.clear()';
            }
            if (p1 !== '""') {
                fixed += `.text(${p1})`;
            }
            if (p1 === '""') {
                return '';
            }
            return fixed ? `CView${fixed};` : '';
        }
    );

    // Special - clearOutput
    text = text.replace(/doNext\(([^;]+?)\);/g, 'return { next: $1 };');
    text = text.replace(escRegex('menu();'), '');
    text = text.replace(escRegex('hideMenus()'), 'MainScreen.hideTopButtons()');
    text = text.replace(
        /(?:choices|simpleChoices)\(([^;]+)\);/g,
        (match, p1) =>
            trimLeft`
            return {
                choices: [
                    ${p1.replace(/\s*((?:[^,(]|\([^)]*\))+),\s*((?:[^,(]|\([^)]*\))+),?/g, '\t\t[$1, $2],\n')}
                ]
            };`
    );
    text = text.replace(/doYesNo\(\s*((?:[^,(]|\([^)]*\))+),\s*((?:[^(]|\([^)]*\))+?)\);/g, (match, choice1, choice2) => `return { yes: ${choice1}, no: ${choice2} };`
    );
    // Unknown - addButton
    // Unused - hasButton
    text = text.replace(escRegex('sackDescript()'), 'describeSack(player)');
    // Manual - cockClit
    // Unused - sheathDesc
    text = text.replace(escRegex('chestDesc()'), 'describeChest(player)');
    text = text.replace(escRegex('allChestDesc()'), 'describeEntireChest(player)');
    text = text.replace(escRegex('allBreastsDescript()'), 'describeAllBreasts(player)');
    text = text.replace(escRegex('sMultiCockDesc()'), 'describeOneOfYourCocks(player)');
    text = text.replace(escRegex('SMultiCockDesc()'), 'describeOneOfYourCocks(player, true)');
    text = text.replace(escRegex('oMultiCockDesc()'), 'describeEachOfYourCocks(player)');
    text = text.replace(escRegex('OMultiCockDesc()'), 'describeEachOfYourCocks(player, true)');
    text = text.replace(escRegex('tongueDescript()'), 'describeTongue(player)');
    text = text.replace(escRegex('ballsDescriptLight()'), 'describeBalls(true, true, player)');
    text = text.replace(escRegex('ballsDescriptLight(true)'), 'describeBalls(true, true, player)');
    text = text.replace(escRegex('ballsDescriptLight(false)'), 'describeBalls(false, true, player)');
    text = text.replace(escRegex('ballDescript()'), 'describeBalls(false, false, player)');
    text = text.replace(escRegex('ballsDescript()'), 'describeBalls(false, true, player, true)');
    text = text.replace(escRegex('simpleBallsDescript()'), 'describeBalls(false, true, player)');
    text = text.replace(escRegex('assholeDescript()'), 'describeButthole(player.body.butt)');
    text = text.replace(escRegex('eAssholeDescript()'), 'describeButthole(monster.body.butt)');
    text = text.replace(escRegex('hipDescript()'), 'describeHips(player)');
    text = text.replace(escRegex('assDescript()'), 'describeButt(player)');
    text = text.replace(escRegex('buttDescript()'), 'describeButt(player)');
    text = text.replace(escRegex('assholeOrPussy()'), 'assholeOrPussy(player)');
    text = text.replace(/nippleDescript\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `describeNipple(player, player.body.chest.get(${p1}))`);
    text = text.replace(escRegex('cockDescript()'), 'describeCock(player, player.body.cocks.get(0))');
    text = text.replace(/cockDescript\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `describeCock(player, player.body.cocks.get(${p1}))`);
    text = text.replace(escRegex('multiCockDescript()'), 'describeCocks(player)');
    text = text.replace(escRegex('multiCockDescriptLight()'), 'describeCocksLight(player)');
    text = text.replace(/breastDescript\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `describeBreastRow(player.body.chest.get(${p1}))`);
    text = text.replace(/breastSize\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `describeBreastRowRating(${p1})`);
    text = text.replace(escRegex('biggestBreastSizeDescript()'), 'describeBiggestBreastRow(player)');
    text = text.replace(escRegex('hairDescript()'), 'describeHair(player)');
    text = text.replace(escRegex('hairOrFur()'), 'hairOrFur(player)');
    text = text.replace(escRegex('clitDescript()'), 'describeClit(player)');
    text = text.replace(escRegex('vaginaDescript()'), 'describeVagina(player, player.body.vaginas.get(0))');
    text = text.replace(/vaginaDescript\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `describeVagina(player, player.body.vaginas.get(${p1}))`);
    text = text.replace(escRegex('allVaginaDescript()'), 'describeEveryVagina(player)');
    text = text.replace(
        /dynStats\(([^;]+)\);/g,
        (match, p1) =>
            trimLeft`${p1.replace(
                /\s*"((?:[^,(]|\([^)]*\))+)",\s*((?:[^,(]|\([^)]*\))+),?/g,
                (valueMatch, expr, val) => {
                    if (expr.endsWith('='))
                        return `player.stats.${expr.substr(0, expr.length - 1)} = ${val};\n`;
                    else if (expr.endsWith('+'))
                        return `player.stats.${expr.substr(0, expr.length - 1)} += ${val};\n`;
                    else
                        return `player.stats.${expr} += ${val};\n`;
                }
            )}`
    );
    text = text.replace(escRegex('silly()'), 'User.settings.silly()');
    text = text.replace(
        /HPChange\(((?:[^,(]|\([^)]*\))+),\s*((?:[^(]|\([^)]*\))+?)\)/g,
        (match, p1, p2) =>
            p2 === 'true' || p2 !== 'false' ?
                `displayCharacterHPChange(player, ${p1})` :
                `player.stats.HP += ${p1}`
    );
    text = text.replace(
        /fatigue\(((?:[^,(]|\([^)]*\))+?)(?:,\s*((?:[^(]|\([^)]*\))+?))?\)/g,
        (match, p1, p2) =>
            p2 === '1' ? `player.stats.fatigueMagical(${p1})` :
                (p2 === '2' ? `player.stats.fatiguePhysical(${p1})` :
                    `player.stats.fatigue += ${p1}`)
    );
    text = text.replace(escRegex('playerMenu'), 'campMenu');
    text = text.replace(escRegex('showStatDown'), '');
    text = text.replace(escRegex('showStatUp'), '');
    return text;
}

function fixBreastRowClass(text: string): string {
    text = text.replace(/breastRows\[([^\]]+)\]\.nipplesPerBreast/g, (match, p1) => `breastRows.get(${p1}).nipples.count`);
    text = text.replace(/breastRows\[([^\]]+)\]\.fuckable/g, (match, p1) => `breastRows.get(${p1}).nipples.fuckable`);
    text = text.replace(/breastRows\[([^\]]+)\]\.breasts/g, (match, p1) => `breastRows.get(${p1}).count`);
    text = text.replace(/breastRows\[([^\]]+)\]\.breastRating/g, (match, p1) => `breastRows.get(${p1}).rating`);
    text = text.replace(/breastRows\[([^\]]+)\]\.lactationMultiplier/g, (match, p1) => `breastRows.get(${p1}).lactationMultiplier`);
    text = text.replace(/breastRows\[([^\]]+)\]\.milkFullness/g, (match, p1) => `breastRows.get(${p1}).milkFullness`);
    text = text.replace(/breastRows\[([^\]]+)\]\.fullness/g, (match, p1) => `breastRows.get(${p1}).fullness`);
    return text;
}

function fixAssClass(text: string): string {
    text = text.replace(escRegex('ass.analWetness'), `ass.wetness`);
    text = text.replace(escRegex('ass.analLooseness'), `ass.looseness`);
    return text;
}

function fixVaginaClass(text: string): string {
    text = text.replace(/vaginas\[([^\]]+)\]\.vaginalWetness/g, (match, p1) => `vaginas.get(${p1}).wetness`);
    text = text.replace(/vaginas\[([^\]]+)\]\.vaginalLooseness/g, (match, p1) => `vaginas.get(${p1}).looseness`);
    text = text.replace(/vaginas\[([^\]]+)\]\.virgin/g, (match, p1) => `vaginas.get(${p1}).virgin`);
    return text;
}

function fixCockClass(text: string): string {
    text = text.replace(/cocks\[([^\]]+)\]\.cockLength/g, (match, p1) => `cocks.get(${p1}).length`);
    text = text.replace(/cocks\[([^\]]+)\]\.cockThickness/g, (match, p1) => `cocks.get(${p1}).thickness`);
    text = text.replace(/cocks\[([^\]]+)\]\.cockType/g, (match, p1) => `cocks.get(${p1}).type`);
    text = text.replace(/cocks\[([^\]]+)\]\.knotMultiplier/g, (match, p1) => `cocks.get(${p1}).knotMultiplier`);
    return text;
}

function fixMonsterClass(text: string): string {
    text = text.replace(escRegex('monster.bonusHP'), 'monster.stats.bonusHP');
    text = text.replace(escRegex('this.bonusHP'), 'this.baseStats.bonusHP');
    text = text.replace(escRegex('monster.long'), 'monster.desc.long');
    text = text.replace(escRegex('monster.plural'), 'monster.desc.plural');
    text = text.replace(escRegex('monster.lustVuln'), 'monster.stats.lustVuln');
    text = text.replace(/monster\.[pP]rnoun1/g, 'monster.desc.subjectivePronoun');
    text = text.replace(/monster\.[pP]rnoun2/g, 'monster.desc.objectivePronoun');
    text = text.replace(/monster\.[pP]rnoun3/g, 'monster.desc.possessivePronoun');
    text = text.replace(escRegex('monster.drop'), 'monster.combat.rewards.drop');
    text = text.replace(escRegex('monster.eMaxHP'), 'monster.desc.long');
    text = text.replace(escRegex('monster.addHP'), 'monster.combat.gainHP');
    text = text.replace(escRegex('monster.HPRatio'), 'monster.combat.HPRatio');
    text = text.replace(escRegex('monster.eBaseDamage'), 'monster.combat.weaponAttack');
    // Unused - calcDamage
    text = text.replace(escRegex('monster.eBaseDamage'), 'monster.combat.weaponAttack');
    // Manual - eOneAttack
    // Manual - eAttack
    // Manual - outputAttack
    // Manual - doAI
    // Manual - defeated
    // Manual - won
    // Manual - onDefeated
    // Manual - onWon
    // Manual - onPcRunAttempt
    // Manual - defeated_
    // Manual - won_
    // Manual - teased
    // Manual - dropLoot
    // Manual - combatRoundUpdate
    // Manual - handleAwardItemText
    // Manual - handleAwardText
    // Manual - handleCombatLossText

    text = text.replace(
        /initStrTouSpeInte\(((?:[^,(]|\([^)]*\))+),\s*((?:[^,(]|\([^)]*\))+),\s*((?:[^,(]|\([^)]*\))+),\s*((?:[^(]|\([^)]*\))+?)\);/g,
        (match, str, tou, spe, int) =>
            trimLeft`this.baseStats.str = ${str};
                this.baseStats.tou = ${tou};
                this.baseStats.spe = ${spe};
                this.baseStats.int = ${int};`
    );
    text = text.replace(
        /initLibSensCor\(((?:[^,(]|\([^)]*\))+),\s*((?:[^,(]|\([^)]*\))+),\s*((?:[^(]|\([^)]*\))+?)\);/g,
        (match, lib, sens, cor) =>
            trimLeft`this.baseStats.lib = ${lib};
                this.baseStats.sens = ${sens};
                this.baseStats.cor = ${cor};`
    );
    text = text.replace(/createBreastRow\(([^)\n]+)\)/g, (match, p1) => `this.body.chest.add(new BreastRow(${p1}))`);
    text = text.replace(escRegex('createBreastRow()'), 'this.body.chest.add(new BreastRow())');

    return text;
}

function fixPlayerClass(text: string): string {
    // Manual - slotName
    // Manual - autoSave
    text = text.replace(escRegex('player.lustVuln'), 'player.stats.lustVuln');
    text = text.replace(escRegex('player.teaseLevel'), 'player.stats.teaseLevel');
    text = text.replace(escRegex('player.teaseXP'), 'player.stats.teaseXP');
    text = text.replace(escRegex('player.perkPoints'), 'player.stats.perkPoints');
    text = text.replace(escRegex('player.explored'), 'ExplorationFlags.BEYOND_CAMP');
    text = text.replace(escRegex('player.exploredForest'), 'ExplorationFlags.FOREST');
    text = text.replace(escRegex('player.exploredDesert'), 'ExplorationFlags.DESERT');
    text = text.replace(escRegex('player.exploredMountain'), 'ExplorationFlags.MOUNTAIN');
    text = text.replace(escRegex('player.exploredLake'), 'ExplorationFlags.LAKE');
    // Unused - pregnancyUpdate
    // Manual - itemSlot[1-5]
    text = text.replace(escRegex('player.modArmorName'), 'player.inventory.equipment.modifiedArmorDesc');
    // Unused - armorBaseDef
    // Unused - weaponBaseAttack
    text = text.replace(escRegex('player.armor'), 'player.inventory.equipment.armor');
    text = text.replace(/player\.setArmor\(([^)\n]+)\)/g, (match, p1) => `player.inventory.equipment.equippedArmorSlot.equip(${p1})`);
    // Unused - setArmorHiddenField
    text = text.replace(escRegex('player.weapon'), 'player.inventory.equipment.weapon');
    text = text.replace(/player\.setWeapon\(([^)\n]+)\)/g, (match, p1) => `player.inventory.equipment.equippedWeaponSlot.equip(${p1})`);
    // Unused - setWeaponHiddenField
    // Unused - reduceDamage
    // Manual - takeDamage
    // Unused - speedDodge
    text = text.replace(escRegex('player.bodyType()'), 'describeBody(player)');
    text = text.replace(escRegex('player.race()'), 'describeRace(player)');
    text = text.replace(escRegex('player.demonScore()'), 'demonRaceScore(player)');
    text = text.replace(escRegex('player.humanScore()'), 'humanRaceScore(player)');
    text = text.replace(escRegex('player.minoScore()'), 'minotaurRaceScore(player)');
    // Unused - minotaurScore
    text = text.replace(escRegex('player.cowScore()'), 'cowRaceScore(player)');
    text = text.replace(escRegex('player.sandTrapScore()'), 'sandTrapRaceScore(player)');
    text = text.replace(escRegex('player.beeScore()'), 'beeRaceScore(player)');
    text = text.replace(escRegex('player.ferretScore()'), 'ferretRaceScore(player)');
    text = text.replace(escRegex('player.mouseScore()'), 'mouseRaceScore(player)');
    text = text.replace(escRegex('player.raccoonScore()'), 'raccoonRaceScore(player)');
    text = text.replace(escRegex('player.catScore()'), 'catRaceScore(player)');
    text = text.replace(escRegex('player.lizardScore()'), 'lizardRaceScore(player)');
    text = text.replace(escRegex('player.spiderScore()'), 'spiderRaceScore(player)');
    text = text.replace(escRegex('player.horseScore()'), 'horseRaceScore(player)');
    text = text.replace(escRegex('player.kitsuneScore()'), 'kitsuneRaceScore(player)');
    text = text.replace(escRegex('player.dragonScore()'), 'dragonRaceScore(player)');
    text = text.replace(escRegex('player.goblinScore()'), 'goblinRaceScore(player)');
    text = text.replace(escRegex('player.gooScore()'), 'gooRaceScore(player)');
    text = text.replace(escRegex('player.nagaScore()'), 'nagaRaceScore(player)');
    text = text.replace(escRegex('player.bunnyScore()'), 'bunnyRaceScore(player)');
    text = text.replace(escRegex('player.harpyScore()'), 'harpyRaceScore(player)');
    text = text.replace(escRegex('player.kangaScore()'), 'kangarooRaceScore(player)');
    text = text.replace(escRegex('player.sharkScore()'), 'sharkRaceScore(player)');
    text = text.replace(escRegex('player.mutantScore()'), 'mutantRaceScore(player)');
    // OK - lactationQ
    // OK - isLactating
    text = text.replace(/player\.cuntChange\(([^,\n]+),\s*([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2, p3, p4) => `displayStretchVagina(player, ${p1}, ${p2}, ${p3}, ${p4})`);
    text = text.replace(/player\.cuntChange\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2, p3) => `displayStretchVagina(player, ${p1}, ${p2}, ${p3})`);
    text = text.replace(/player\.cuntChange\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `displayStretchVagina(player, ${p1}, ${p2})`);
    text = text.replace(/player\.buttChange\(([^,\n]+),\s*([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2, p3, p4) => `displayStretchButt(player, ${p1}, ${p2}, ${p3}, ${p4})`);
    text = text.replace(/player\.buttChange\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2, p3) => `displayStretchButt(player, ${p1}, ${p2}, ${p3})`);
    text = text.replace(/player\.buttChange\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `displayStretchButt(player, ${p1}, ${p2})`);
    text = text.replace(escRegex('player.buttChangeDisplay()'), 'stretchButtText(player)');
    // OK - slimeFeed
    // OK - minoCumAddiction
    text = text.replace(escRegex('player.hasSpells'), 'player.combat.hasSpells');
    text = text.replace(escRegex('player.spellCount'), 'player.combat.spellCount');
    text = text.replace(escRegex('player.hairDescript()'), 'describeHair(player)');
    text = text.replace(escRegex('player.shrinkTits()'), 'shrinkTits(player)');
    text = text.replace(escRegex('player.shrinkTits(true)'), 'shrinkTits(player, true)');
    text = text.replace(
        /player\.growTits\(([^,\n]+),\s*([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g,
        (match, p1, p2, p3, p4) => {
            switch (p4) {
                case '1': return `growSmallestBreastRow(player, ${p1}, ${p2}, ${p3})`;
                case '2': return `growTopBreastRowDownwards(player, ${p1}, ${p2}, ${p3})`;
                case '3': return `growTopBreastRow(player, ${p1}, ${p2}, ${p3})`;
            }
        });
    text = text.replace(escRegex('player.minLust'), 'player.stats.minLust');
    text = text.replace(escRegex('player.minotaurAddicted'), 'minotaurAddicted');
    text = text.replace(escRegex('player.minotaurNeed'), 'minotaurNeed');
    text = text.replace(escRegex('player.clearStatuses(true);'), '');
    text = text.replace(escRegex('player.clearStatuses(false);'), '');
    text = text.replace(escRegex('player.consumeItem'), 'player.inventory.items.consumeItem');
    // Unused - getLowestSlot
    text = text.replace(escRegex('player.hasItem'), 'player.inventory.items.has');
    text = text.replace(/player\.itemCount\(([^)\n]+)\)/g, (match, p1) => `player.inventory.items.filter(Inventory.FilterName(${p1})).reduce(Inventory.TotalQuantity, 0)`);
    // Unused - roomInExistingStack
    text = text.replace(/player\.roomInExistingStack\(([^)\n]+)\)/g, (match, p1) => `player.inventory.items.filter(Inventory.FilterName(${p1})).length`);
    // Unsed - itemSlot
    // Unsed - emptySlot
    text = text.replace(escRegex('player.destroyItems'), 'player.inventory.items.consumeItem');
    text = text.replace(/player\.lengthChange\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `displayLengthChange(player, ${p1}, ${p2})`);
    text = text.replace(/player\.killCocks\(([^)\n]+)\)/g, (match, p1) => `displayKillCocks(player, ${p1})`);
    // OK - modCumMultiplier
    text = text.replace(/player\.increaseCock\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `growCock(player, ${p1}, ${p2})`);
    text = text.replace(/player\.increaseEachCock\(([^)\n]+)\)/g, (match, p1) => `growEachCock(player, ${p1})`);
    text = text.replace(escRegex('player.goIntoHeat(false)'), 'player.canGoIntoHeat()');
    text = text.replace(/player\.goIntoHeat\(true,\s*([^)\n]+)\)/g, (match, p1, p2) => `displayGoIntoHeat(player, ${p1})`);
    text = text.replace(escRegex('player.goIntoRut(false)'), 'player.canGoIntoRut()');
    text = text.replace(/player\.goIntoRut\(true,\s*([^)\n]+)\)/g, (match, p1, p2) => `displayGoIntoRut(player, ${p1})`);

    return text;
}

function fixCharacterClass(text: string): string {
    text = text.replace(escRegex('player.femininity'), 'player.body.feminity');
    text = text.replace(escRegex('player.beardLength'), 'player.body.beard.length');
    text = text.replace(escRegex('player.beardStyle'), 'player.body.beard.style');
    text = text.replace(escRegex('player.thickness'), 'player.body.thickness');
    text = text.replace(escRegex('player.tone'), 'player.body.tone');
    // Manual - pregnancyType
    // Manual - pregnancyIncubation
    // Manual - buttPregnancyType
    // Manual - buttPregnancyIncubation
    text = text.replace(escRegex('player.keyItems'), 'player.inventory.keyItems');
    text = text.replace(escRegex('player.faceDesc()'), 'describeFace(player)');
    text = text.replace(/player\.modFem\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `modFem(player, ${p1}, ${p2})`);
    text = text.replace(/player\.modFem\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `modFem(player, ${p1})`);
    text = text.replace(/player\.modThickness\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `modThickness(player, ${p1}, ${p2})`);
    text = text.replace(/player\.modThickness\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `modThickness(player, ${p1})`);
    text = text.replace(/player\.modTone\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `modTone(player, ${p1}, ${p2})`);
    text = text.replace(/player\.modTone\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `modTone(player, ${p1})`);
    // OK - fixFemininity
    text = text.replace(escRegex('player.hasBeard'), 'player.body.beard.length > 0');
    text = text.replace(escRegex('player.beard()'), 'describeBeard(player)');
    text = text.replace(escRegex('player.skin()'), 'describeSkin(player)');
    text = text.replace(/player\.skin\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `describeSkin(player, ${p1}, ${p2})`);
    text = text.replace(/player\.skin\(((?:[^(]|\([^)]*\))+?)\)/g, (match, p1) => `describeSkin(player, ${p1})`);
    text = text.replace(escRegex('player.hasMuzzle()'), 'player.body.face.hasMuzzle()');
    text = text.replace(escRegex('player.face()'), 'describeFaceShort(player)');
    // OK - hasLongTail
    text = text.replace(escRegex('player.isPregnant()'), 'player.pregnancy.womb.isPregnant()');
    text = text.replace(escRegex('player.isButtPregnant()'), 'player.pregnancy.buttWomb.isPregnant()');

    text = text.replace(/player\.knockUp\(([^,\n]+),\s*([^,\n]+),\s*([^,\n]+),\s*1\)/g, (match, p1, p2, p3) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}), ${p3}, true)`);
    text = text.replace(/player\.knockUp\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2, p3) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}), ${p3})`);
    text = text.replace(/player\.knockUp\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}))`);
    text = text.replace(/player\.knockUpForce\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}), 0, true)`);

    text = text.replace(/player\.buttKnockUp\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+),\s*1\)/g, (match, p1, p2, p3) => `player.pregnancy.buttWomb.knockUp(new Pregnancy(${p1}, ${p2}), ${p3}, true)`);
    text = text.replace(/player\.buttKnockUp\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2, p3) => `player.pregnancy.buttWomb.knockUp(new Pregnancy(${p1}, ${p2}), ${p3})`);
    text = text.replace(/player\.buttKnockUp\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `player.pregnancy.buttWomb.knockUp(new Pregnancy(${p1}, ${p2}))`);
    text = text.replace(/player\.buttKnockUpForce\(([^,\n]+),\s*([^)\n]+)\)/g, (match, p1, p2) => `player.pregnancy.buttWomb.knockUp(new Pregnancy(${p1}, ${p2}), 0, true)`);
    // Remove - pregnancyAdvance
    // Remove - pregnancyUpdate

    text = text.replace(escRegex('player.createKeyItem'), 'player.inventory.keyItems.add');
    text = text.replace(/player\.removeKeyItem\((".+")\)/g, (match, p1) => `player.inventory.keyItems.remove(${p1})`);
    // Manual - addKeyValue
    text = text.replace(/player\.keyItemv([1-4])\((\w+)\)/g, (match, p1, p2) => `player.inventory.keyItems.get(${p2}).value${p1}`);
    // Unused - removeKeyItems
    text = text.replace(
        /player\.hasKeyItem\(("(?:[^"]|\\")+")\)(?:\s*([!><=]+)\s*([-\d]+))?/g,
        (match, p1, compOp, compVal) => {
            if (compOp && compOp.match(/<=?|==/) && +compVal <= 0)
                return `!player.inventory.keyItems.has(${p1})`;
            return `player.inventory.keyItems.has(${p1})`;
        });

    // Unknown - viridianChange
    text = text.replace(escRegex('player.hasKnot()'), 'player.body.cocks.get(0).hasKnot()');
    text = text.replace(/player\.hasKnot\(([^)\n]+)\)/g, (match, p1) => `player.body.cocks.get(${p1}).hasKnot()`);
    text = text.replace(escRegex('player.maxHP()'), 'player.stats.maxHP');
    text = text.replace(escRegex('player.buttDescript()'), 'describeButt(player)');

    return text;
}

function fixCreatureClass(text: string, name: string): string {
    text = text.replace(combineStrRegex(name, /\.short([^\w])/g), (match, p1) => `${name}.desc.name${p1}`);
    text = text.replace(combineStrRegex(name, /\.a([^\w])/g), (match, p1) => `${name}.desc.a${p1}`);
    text = text.replace(escRegex(`${name}.capitalA`), `${name}.desc.capitalA`);

    text = text.replace(escRegex(`${name}.weaponName`), `${name}.inventory.equipment.weapon.displayName`);
    text = text.replace(escRegex(`${name}.weaponVerb`), `${name}.inventory.equipment.weapon.verb`);
    // This is for the calcuated attack, not weapon attack
    // Manual - assignment
    text = text.replace(escRegex(`${name}.weaponAttack`), `${name}.combat.stats.weaponAttack`);
    // Unknown - weaponPerk
    text = text.replace(escRegex(`${name}.weaponValue`), `${name}.inventory.equipment.weapon.value`);

    text = text.replace(escRegex(`${name}.armorName`), `${name}.inventory.equipment.armor.displayName`);
    text = text.replace(escRegex(`${name}.armorVerb`), `${name}.inventory.equipment.armor.verb`);
    // This is for the calcuated defense, not armor defense
    // Manual - assignment
    text = text.replace(escRegex(`${name}.armorDef`), `${name}.combat.stats.defense`);
    // Unknown - armorPerk
    text = text.replace(escRegex(`${name}.armorValue`), `${name}.inventory.equipment.armor.value`);

    text = text.replace(escRegex(`${name}.str`), `${name}.stats.str`);
    text = text.replace(escRegex(`${name}.tou`), `${name}.stats.tou`);
    text = text.replace(escRegex(`${name}.spe`), `${name}.stats.spe`);
    text = text.replace(escRegex(`${name}.inte`), `${name}.stats.int`);
    text = text.replace(escRegex(`${name}.lib`), `${name}.stats.lib`);
    text = text.replace(escRegex(`${name}.sens`), `${name}.stats.sens`);
    text = text.replace(escRegex(`${name}.cor`), `${name}.stats.cor`);
    text = text.replace(escRegex(`${name}.fatigue`), `${name}.stats.fatigue`);

    text = text.replace(escRegex(`${name}.HP`), `${name}.stats.HP`);
    text = text.replace(escRegex(`${name}.lust`), `${name}.stats.lust`);

    text = text.replace(escRegex(`${name}.XP`), `${name}.stats.XP`);
    text = text.replace(escRegex(`${name}.level`), `${name}.stats.level`);
    text = text.replace(escRegex(`${name}.gems`), `${name}.inventory.gems`);
    text = text.replace(escRegex(`${name}.additionalXP`), `${name}.stats.additionalXP`);

    // OK - gender
    text = text.replace(escRegex(`${name}.tallness`), `${name}.body.tallness`);

    text = text.replace(escRegex(`${name}.hairType`), `${name}.body.hair.type`);
    text = text.replace(escRegex(`${name}.hairColor`), `${name}.body.hair.color`);
    text = text.replace(escRegex(`${name}.hairLength`), `${name}.body.hair.length`);

    text = text.replace(escRegex(`${name}.skinType`), `${name}.body.skin.type`);
    text = text.replace(escRegex(`${name}.skinTone`), `${name}.body.skin.tone`);
    text = text.replace(escRegex(`${name}.skinDesc`), `${name}.body.skin.desc`);
    text = text.replace(escRegex(`${name}.skinAdj`), `${name}.body.skin.adj`);

    text = text.replace(escRegex(`${name}.faceType`), `${name}.body.face.type`);

    text = text.replace(escRegex(`${name}.earType`), `${name}.body.ear.type`);
    text = text.replace(escRegex(`${name}.earValue`), `${name}.body.ear.value`);

    text = text.replace(escRegex(`${name}.hornType`), `${name}.body.horns.type`);
    text = text.replace(escRegex(`${name}.horns`), `${name}.body.horns.count`);

    text = text.replace(escRegex(`${name}.wingType`), `${name}.body.wings.type`);
    text = text.replace(escRegex(`${name}.wingDesc`), `${name}.body.wings.desc`);

    text = text.replace(escRegex(`${name}.lowerBody`), `${name}.body.legs.type`);

    text = text.replace(escRegex(`${name}.tailType`), `${name}.body.tail.type`);
    text = text.replace(escRegex(`${name}.tailVenom`), `${name}.body.tail.venom`);
    text = text.replace(escRegex(`${name}.tailRecharge`), `${name}.body.tail.recharge`);

    text = text.replace(escRegex(`${name}.hipRating`), `${name}.body.hips.rating`);
    text = text.replace(escRegex(`${name}.buttRating`), `${name}.body.butt.rating`);

    // Manual - nipplesPierced
    // Manual - nipplesPShort
    // Manual - nipplesPLong
    text = text.replace(escRegex(`${name}.lipPierced`), `${name}.inventory.equipment.piercings.lip.isEquiped()`);
    text = text.replace(escRegex(`${name}.lipPShort`), `${name}.inventory.equipment.piercings.lip.item.shortDesc`);
    text = text.replace(escRegex(`${name}.lipPLong`), `${name}.inventory.equipment.piercings.lip.item.longDesc`);
    text = text.replace(escRegex(`${name}.tonguePierced`), `${name}.inventory.equipment.piercings.tongue.isEquipped()`);
    text = text.replace(escRegex(`${name}.tonguePShort`), `${name}.inventory.equipment.piercings.tongue.item.shortDesc`);
    text = text.replace(escRegex(`${name}.tonguePLong`), `${name}.inventory.equipment.piercings.tongue.item.longDesc`);
    text = text.replace(escRegex(`${name}.eyebrowPierced`), `${name}.inventory.equipment.piercings.eyebrow.isEquipped()`);
    text = text.replace(escRegex(`${name}.eyebrowPShort`), `${name}.inventory.equipment.piercings.eyebrow.item.shortDesc`);
    text = text.replace(escRegex(`${name}.eyebrowPLong`), `${name}.inventory.equipment.piercings.eyebrow.item.longDesc`);
    text = text.replace(escRegex(`${name}.earsPierced`), `${name}.inventory.equipment.piercings.isEquipped()`);
    text = text.replace(escRegex(`${name}.earsPShort`), `${name}.inventory.equipment.piercings.item.shortDesc`);
    text = text.replace(escRegex(`${name}.earsPLong`), `${name}.inventory.equipment.piercings.item.longDesc`);
    text = text.replace(escRegex(`${name}.nosePierced`), `${name}.inventory.equipment.piercings.isEquipped()`);
    text = text.replace(escRegex(`${name}.nosePShort`), `${name}.inventory.equipment.piercings.item.shortDesc`);
    text = text.replace(escRegex(`${name}.nosePLong`), `${name}.inventory.equipment.piercings.item.longDesc`);
    text = text.replace(combineStrRegex(name, /\.vaginas\[([^\]]+)\]\.labiaPierced/g), `${name}.inventory.equipment.piercings.labia.isEquipped()`);
    text = text.replace(combineStrRegex(name, /\.vaginas\[([^\]]+)\]\.labiaPShort/g), `${name}.inventory.equipment.piercings.labia.item.shortDesc`);
    text = text.replace(combineStrRegex(name, /\.vaginas\[([^\]]+)\]\.labiaPLong/g), `${name}.inventory.equipment.piercings.labia.item.longDesc`);
    text = text.replace(combineStrRegex(name, /\.vaginas\[([^\]]+)\]\.clitPierced/g), `${name}.inventory.equipment.piercings.clit.isEquipped()`);
    text = text.replace(combineStrRegex(name, /\.vaginas\[([^\]]+)\]\.clitPShort/g), `${name}.inventory.equipment.piercings.clit.item.shortDesc`);
    text = text.replace(combineStrRegex(name, /\.vaginas\[([^\]]+)\]\.clitPLong/g), `${name}.inventory.equipment.piercings.clit.item.longDesc`);
    text = text.replace(combineStrRegex(name, /\.cocks\[([^\]]+)\]\.isPierced/g), (match, p1) => `${name}.inventory.equipment.piercings.cocks.get(${p1}).isEquipped()`);
    text = text.replace(combineStrRegex(name, /\.cocks\[([^\]]+)\]\.pShortDesc/g), (match, p1) => `${name}.inventory.equipment.piercings.cocks.get(${p1}).item.shortDesc`);
    text = text.replace(combineStrRegex(name, /\.cocks\[([^\]]+)\]\.pLongDesc/g), (match, p1) => `${name}.inventory.equipment.piercings.cocks.get(${p1}).item.longDesc`);

    text = text.replace(escRegex(`${name}.antennae`), `${name}.body.antennae.type`);
    text = text.replace(escRegex(`${name}.eyeType`), `${name}.body.eyes.type`);
    text = text.replace(escRegex(`${name}.tongueType`), `${name}.body.tongue.type`);
    text = text.replace(escRegex(`${name}.armType`), `${name}.body.arms.type`);
    text = text.replace(escRegex(`${name}.gills`), `${name}.body.gills`);
    text = text.replace(escRegex(`${name}.cocks`), `${name}.body.cocks`);
    text = text.replace(escRegex(`${name}.balls`), `${name}.body.balls.count`);
    text = text.replace(escRegex(`${name}.cumMultiplier`), `${name}.body.cumMultiplier`);
    text = text.replace(escRegex(`${name}.ballSize`), `${name}.body.balls.size`);
    // OK - hoursSinceCum
    text = text.replace(escRegex(`${name}.vaginas`), `${name}.body.vaginas`);
    text = text.replace(escRegex(`${name}.fertility`), `${name}.body.fertility`);
    text = text.replace(escRegex(`${name}.clitLength`), `${name}.body.clit.length`);
    // Manual - nippleLength
    text = text.replace(escRegex(`${name}.breastRows`), `${name}.body.chest`);
    text = text.replace(combineStrRegex(name, /\.ass([^\w])/g), (match, p1) => `${name}.body.butt${p1}`);
    // Unused - perk()
    // Unused - perks()
    text = text.replace(escRegex(`${name}.numPerks`), `${name}.perks.length`);
    text = text.replace(escRegex(`${name}.statusAffects`), `${name}.effects`);

    // OK - orgasm()
    text = text.replace(escRegex(`${name}.createPerk`), `${name}.perks.add`);
    text = text.replace(escRegex(`${name}.removePerk`), `${name}.perks.remove`);
    text = text.replace(combineStrRegex(name, /\.findPerk\(([\w.]+)\) ?>= ?0/g), (match, p1) => `${name}.perks.has(${p1})`);
    text = text.replace(combineStrRegex(name, /\.findPerk\(([\w.]+)\) ?< ?0/g), (match, p1) => `!${name}.perks.has(${p1})`);
    // Unused - perkDuplicated
    // Unused - removePerks
    text = text.replace(combineStrRegex(name, /\.addPerkValue\(([\w.]+),\s*([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2, p3) => `${name}.perks.get(${p1}).value${p2} += ${p3}`);
    text = text.replace(combineStrRegex(name, /\.setPerkValue\(([\w.]+),\s*([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2, p3) => `${name}.perks.get(${p1}).value${p2} = ${p3}`);
    text = text.replace(combineStrRegex(name, /\.perkv([1-4])\(([\w.]+)\)/g), (match, p1, p2) => `${name}.perks.get(${p2}).value${p1}`);

    text = text.replace(escRegex(`${name}.createStatusAffect`), `${name}.effects.add`);
    text = text.replace(escRegex(`${name}.removeStatusAffect`), `${name}.effects.remove`);
    text = text.replace(combineStrRegex(name, /\.findStatusAffect\(([\w.]+)\) ?>= ?0/g), (match, p1) => `${name}.effects.has(${p1})`);
    text = text.replace(combineStrRegex(name, /\.findStatusAffect\(([\w.]+)\) ?< ?0/g), (match, p1) => `!${name}.effects.has(${p1})`);
    text = text.replace(combineStrRegex(name, /\.changeStatusValue\(([\w.]+),\s*([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2, p3) => `${name}.effects.get(${p1}).value${p2} = ${p3}`);
    text = text.replace(combineStrRegex(name, /\.addStatusValue\(([\w.]+),\s*([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2, p3) => `${name}.effects.get(${p1}).value${p2} += ${p3}`);
    text = text.replace(combineStrRegex(name, /\.statusAffect\(([\w\d]+)\)/g), (match, p1) => `${name}.effects.get(${p1})`);
    text = text.replace(combineStrRegex(name, /\.statusAffectv([1-4])\(([\w.]+)\)/g), (match, p1, p2) => `${name}.effects.get(${p2}).value${p1}`);
    // Unused - removeStatuses
    text = text.replace(escRegex(`${name}.biggestTitSize()`), `${name}.body.chest.sort(BreastRow.Largest)[0].rating`);
    text = text.replace(combineStrRegex(name, /\.cockArea\(([\w\d]+)\)/g), (match, p1) => `${name}.body.cocks.get(${p1}).area`);
    text = text.replace(escRegex(`${name}.biggestCockLength()`), `${name}.body.cocks.sort(Cock.Largest)[0].length`);
    text = text.replace(escRegex(`${name}.biggestCockArea()`), `${name}.body.cocks.sort(Cock.Largest)[0].area`);
    text = text.replace(escRegex(`${name}.biggestCockArea2()`), `${name}.body.cocks.sort(Cock.Largest)[1].area`);
    text = text.replace(escRegex(`${name}.cocks[${name}.longestCock()]`), `${name}.body.cocks.sort(Cock.Longest)[0]`);
    text = text.replace(escRegex(`${name}.longestCock()`), `${name}.body.cocks.sort(Cock.Longest)[0]`);
    text = text.replace(escRegex(`${name}.longestCockLength()`), `${name}.body.cocks.sort(Cock.Longest)[0].length`);
    text = text.replace(escRegex(`${name}.longestHorseCockLength()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.HORSE)).sort(Cock.Longest)[0].length`);
    // Unknown - twoDickRadarSpecial()
    text = text.replace(escRegex(`${name}.totalCockThickness()`), `${name}.body.cocks.reduce(Cock.TotalThickness, 0)`);
    text = text.replace(escRegex(`${name}.cocks[${name}.thickestCock()]`), `${name}.body.cocks.sort(Cock.Thickest)[0]`);
    text = text.replace(escRegex(`${name}.thickestCock()`), `${name}.body.cocks.sort(Cock.Thickest)[0]`);
    text = text.replace(escRegex(`${name}.thickestCockThickness()`), `${name}.body.cocks.sort(Cock.Thickest)[0].thickness`);
    text = text.replace(escRegex(`${name}.cocks[${name}.thinnestCockIndex()]`), `${name}.body.cocks.sort(Cock.Thinnest)[0]`);
    text = text.replace(escRegex(`${name}.thinnestCockIndex()`), `${name}.body.cocks.sort(Cock.Thinnest)[0]`);
    text = text.replace(escRegex(`${name}.cocks[${name}.smallestCockIndex()]`), `${name}.body.cocks.sort(Cock.Smallest)[0]`);
    text = text.replace(escRegex(`${name}.smallestCockIndex()`), `${name}.body.cocks.sort(Cock.Smallest)[0]`);
    text = text.replace(escRegex(`${name}.smallestCockLength()`), `${name}.body.cocks.sort(Cock.Smallest)[0].length`);
    text = text.replace(escRegex(`${name}.cocks[${name}.shortestCockIndex()]`), `${name}.body.cocks.sort(Cock.Shortest)[0]`);
    text = text.replace(escRegex(`${name}.shortestCockIndex()`), `${name}.body.cocks.sort(Cock.Shortest)[0]`);
    text = text.replace(escRegex(`${name}.shortestCockLength()`), `${name}.body.cocks.sort(Cock.Shortest)[0].length`);
    text = text.replace(
        combineStrRegex(name, /\.cockThatFits(2?)\(((?:[^(]|\([^)]*\))+?)(?:,\s*("area"|"length"))?\)(?:\s*([!><=]+)\s*([-\d]+))?/g),
        (match, second, arg1, arg2, compOp, compVal) => {
            let str = '';
            if (compOp && compOp.match(/<=?|==/) && +compVal <= 0)
                str += '!';

            if (second)
                str += name + '.body.cocks.filter(Cock.CocksThatFit';
            else
                str += name + '.body.cocks.find(Cock.CockThatFits';

            if (arg2 === "length")
                str += 'Length';

            str += '(' + arg1 + '))';

            if (second)
                str += '[1]';

            return str;
        }
    );
    text = text.replace(escRegex(`${name}.smallestCockArea()`), `${name}.body.cocks.sort(Cock.Smallest)[0].area`);
    text = text.replace(escRegex(`${name}.cocks[${name}.smallestCock()]`), `${name}.body.cocks.sort(Cock.Smallest)[0]`);
    text = text.replace(escRegex(`${name}.smallestCock()`), `${name}.body.cocks.sort(Cock.Smallest)[0]`);
    text = text.replace(escRegex(`${name}.cocks[${name}.biggestCockIndex()]`), `${name}.body.cocks.sort(Cock.Largest)[0]`);
    text = text.replace(escRegex(`${name}.biggestCockIndex()`), `${name}.body.cocks.sort(Cock.Largest)[0]`);
    text = text.replace(escRegex(`${name}.cocks[${name}.biggestCockIndex2()]`), `${name}.body.cocks.sort(Cock.Largest)[1]`);
    text = text.replace(escRegex(`${name}.biggestCockIndex2()`), `${name}.body.cocks.sort(Cock.Largest)[1]`);
    text = text.replace(escRegex(`${name}.cocks[${name}.smallestCockIndex2()]`), `${name}.body.cocks.sort(Cock.Smallest)[1]`);
    text = text.replace(escRegex(`${name}.smallestCockIndex2()`), `${name}.body.cocks.sort(Cock.Smallest)[1]`);
    text = text.replace(escRegex(`${name}.cocks[${name}.biggestCockIndex3()]`), `${name}.body.cocks.sort(Cock.Largest)[2]`);
    text = text.replace(escRegex(`${name}.biggestCockIndex3()`), `${name}.body.cocks.sort(Cock.Largest)[2]`);
    text = text.replace(escRegex(`${name}.cockDescript()`), `describeCock(${name}, ${name}.body.cocks.get(0))`);
    text = text.replace(combineStrRegex(name, /\.cockDescript\((\d+)\)/g), (match, p1) => `describeCock(${name}, ${name}.body.cocks.get(${p1}))`);
    text = text.replace(combineStrRegex(name, /\.cockDescript\((\w+)\)/g), (match, p1) => `describeCock(${name}, ${p1})`);
    text = text.replace(escRegex(`${name}.cockAdjective()`), `describeCockAdj(${name}, ${name}.body.cocks.get(0)`);
    text = text.replace(combineStrRegex(name, /\.cockAdjective\((\w+)\)/g), (match, p1) => `describeCockAdj(${name}, ${p1})`);
    text = text.replace(escRegex(`${name}.wetness()`), `${name}.body.vaginas.get(0).wetness`);
    // Manual - vaginaType()
    text = text.replace(escRegex(`${name}.looseness()`), `${name}.body.vaginas.get(0).looseness`);
    text = text.replace(escRegex(`${name}.looseness(true)`), `${name}.body.vaginas.get(0).looseness`);
    text = text.replace(escRegex(`${name}.looseness(false)`), `${name}.body.butt.looseness`);
    // OK - vaginalCapacity()
    // OK - analCapacity()
    text = text.replace(escRegex(`${name}.hasFuckableNipples()`), `${name}.body.chest.find(BreastRow.FuckableNipples)`);
    text = text.replace(escRegex(`!${name}.hasBreasts()`), `${name}.body.chest.length <= 0`);
    text = text.replace(escRegex(`${name}.hasBreasts()`), `${name}.body.chest.length > 0`);
    // Unused - hasNipples()
    // OK - lactationSpeed()
    text = text.replace(escRegex(`${name}.dogScore()`), `dogRaceScore(${name})`);
    text = text.replace(escRegex(`${name}.foxScore()`), `foxRaceScore(${name})`);
    text = text.replace(escRegex(`${name}.biggestLactation()`), `${name}.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier`);
    // OK - milked()
    text = text.replace(combineStrRegex(name, /\.boostLactation\(([^\(]+)\)/g), (match, p1) => `boostLactation(${name}, ${p1})`);
    text = text.replace(escRegex(`${name}.averageLactation()`), `${name}.body.chest.reduce(BreastRow.AverageLactation, 0)`);
    // OK - virilityQ()
    // OK - cumQ()
    text = text.replace(combineStrRegex(name, /\.countCocksOfType\(([^)\n]+)\)/g), (match, p1) => `${name}.body.cocks.filter(Cock.FilterType(${p1})).length`);
    text = text.replace(escRegex(`${name}.anemoneCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.ANEMONE)).length`);
    text = text.replace(escRegex(`${name}.catCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.CAT)).length`);
    text = text.replace(escRegex(`${name}.demonCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.DEMON)).length`);
    text = text.replace(escRegex(`${name}.displacerCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.DISPLACER)).length`);
    text = text.replace(escRegex(`${name}.dogCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.DOG)).length`);
    text = text.replace(escRegex(`${name}.dragonCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.DRAGON)).length`);
    text = text.replace(escRegex(`${name}.foxCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.FOX)).length`);
    text = text.replace(escRegex(`${name}.horseCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length`);
    text = text.replace(escRegex(`${name}.kangaCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.KANGAROO)).length`);
    text = text.replace(escRegex(`${name}.lizardCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.LIZARD)).length`);
    text = text.replace(escRegex(`${name}.tentacleCocks()`), `${name}.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length`);
    // Unused - findFirstCockType()
    // Unused - addHorseCock()
    text = text.replace(escRegex(`${name}.cockTotal()`), `${name}.body.cocks.length`);
    text = text.replace(escRegex(`${name}.totalCocks()`), `${name}.body.cocks.length`);
    text = text.replace(escRegex(`!${name}.hasCock()`), `${name}.body.cocks.length <= 0`);
    text = text.replace(escRegex(`${name}.hasCock()`), `${name}.body.cocks.length > 0`);
    // Manual - hasSockRoom()
    // Manual - hasSock()
    // Manual - countCockSocks()
    // OK - canAutoFellate()
    // OK - canFly()
    text = text.replace(escRegex(`!${name}.hasVagina()`), `${name}.body.vaginas.length <= 0`);
    text = text.replace(escRegex(`${name}.hasVagina()`), `${name}.body.vaginas.length > 0`);
    text = text.replace(escRegex(`${name}.hasVirginVagina()`), `${name}.body.vaginas.find(Vagina.Virgin)`);
    // Manual - genderText
    text = text.replace(escRegex(`${name}.manWoman()`), `manWoman(${name})`);
    text = text.replace(escRegex(`${name}.manWoman(true)`), `manWoman(${name}, true)`);
    text = text.replace(escRegex(`${name}.manWoman(false)`), `manWoman(${name}, false)`);
    text = text.replace(escRegex(`${name}.guyGirl()`), `guyGirl(${name})`);
    text = text.replace(escRegex(`${name}.guyGirl(true)`), `guyGirl(${name}, true)`);
    text = text.replace(escRegex(`${name}.guyGirl(false)`), `guyGirl(${name}, false)`);
    text = text.replace(combineStrRegex(name, /\.mfn\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2, p3) => `mfn(${name}, ${p1}, ${p2}, ${p3})`);
    text = text.replace(combineStrRegex(name, /\.mf\(([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2) => `mf(${name}, ${p1}, ${p2})`);
    text = text.replace(escRegex(`${name}.boyGirl()`), `boyGirl(${name})`);
    text = text.replace(escRegex(`${name}.boyGirl(true)`), `boyGirl(${name}, true)`);
    text = text.replace(escRegex(`${name}.boyGirl(false)`), `boyGirl(${name}, false)`);
    text = text.replace(escRegex(`${name}.heShe()`), `heShe(${name})`);
    text = text.replace(escRegex(`${name}.heShe(true)`), `heShe(${name}, true)`);
    text = text.replace(escRegex(`${name}.heShe(false)`), `heShe(${name}, false)`);
    text = text.replace(escRegex(`${name}.himHer()`), `himHer(${name})`);
    text = text.replace(escRegex(`${name}.himHer(true)`), `himHer(${name}, true)`);
    text = text.replace(escRegex(`${name}.himHer(false)`), `himHer(${name}, false)`);
    text = text.replace(escRegex(`${name}.maleFemale()`), `maleFemale(${name})`);
    text = text.replace(escRegex(`${name}.maleFemale(true)`), `maleFemale(${name}, true)`);
    text = text.replace(escRegex(`${name}.maleFemale(false)`), `maleFemale(${name}, false)`);
    text = text.replace(escRegex(`${name}.hisHer()`), `hisHer(${name})`);
    text = text.replace(escRegex(`${name}.hisHer(true)`), `hisHer(${name}, true)`);
    text = text.replace(escRegex(`${name}.hisHer(false)`), `hisHer(${name}, false)`);
    text = text.replace(escRegex(`${name}.sirMadam()`), `sirMadam(${name})`);
    text = text.replace(escRegex(`${name}.sirMadam(true)`), `sirMadam(${name}, true)`);
    text = text.replace(escRegex(`${name}.sirMadam(false)`), `sirMadam(${name}, false)`);
    text = text.replace(combineStrRegex(name, /\.createCock\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2, p3) => `${name}.body.cocks.add(new Cock(${p1}, ${p2}, ${p3}))`);
    text = text.replace(combineStrRegex(name, /\.createCock\(([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2) => `${name}.body.cocks.add(new Cock(${p1}, ${p2}))`);
    text = text.replace(combineStrRegex(name, /\.createCock\(([^)\n]+)\)/g), (match, p1) => `${name}.body.cocks.add(new Cock(${p1}))`);
    text = text.replace(escRegex(`${name}.createCock()`), `${name}.body.cocks.add(new Cock())`);
    text = text.replace(combineStrRegex(name, /\.createVagina\(([^,\n]+),\s*([^,\n]+),\s*([^)\n]+)\)/g), (match, p1, p2, p3) => `${name}.body.vaginas.add(new Vagina(${p2}, ${p3}, ${p1}))`);
    // Manual - createVagina(virgin, vaginalWetness)
    // Manual - createVagina(virgin)
    text = text.replace(escRegex(`${name}.createVagina()`), `${name}.body.vaginas.add(new Vagina())`);
    // Manual - createBreastRow(size, nipplesPerBreast)
    text = text.replace(combineStrRegex(name, /\.createBreastRow\(([^)\n]+)\)/g), (match, p1) => `${name}.body.chest.add(new BreastRow(${p1}))`);
    text = text.replace(escRegex(`${name}.createBreastRow()`), `${name}.body.chest.add(new BreastRow())`);
    // Remove - genderCheck
    text = text.replace(escRegex(`${name}.genderCheck();`), '');
    text = text.replace(
        combineStrRegex(name, /\.removeCock\(([^,\n]+),\s*([^)\n]+)\)/g),
        (match, p1, p2) => p2 === 1 ?
            `${name}.body.cocks.remove(${p1})` :
            trimLeft`for (let cockIndex = 0; cockIndex < ${p2}; cockIndex++)
            ${name}.body.cocks.remove(${p1} + cockIndex)`
    );
    text = text.replace(
        combineStrRegex(name, /\.removeVagina\(([^,\n]+),\s*([^)\n]+)\)/g),
        (match, p1, p2) => p2 === 1 ?
            `${name}.body.vaginas.remove(${p1})` :
            trimLeft`for (let vagIndex = 0; vagIndex < ${p2}; vagIndex++)
            ${name}.body.vaginas.remove(${p1} + vagIndex)`
    );
    text = text.replace(combineStrRegex(name, /\.removeVagina\(([^)\n]+)\)/g), (match, p1) => `${name}.body.vaginas.remove(${p1})`);
    text = text.replace(escRegex(`${name}.removeVagina()`), `${name}.body.vaginas.remove(0)`);
    text = text.replace(
        combineStrRegex(name, /\.removeBreastRow\(([^,\n]+),\s*([^)\n]+)\)/g),
        (match, p1, p2) => p2 === 1 ?
            `${name}.body.chest.remove(${p1})` :
            trimLeft`for (let breastRowIndex = 0; breastRowIndex < ${p2}; breastRowIndex++)
            ${name}.body.chest.remove(${p1} + breastRowIndex)`
    );
    // Remove - fixFuckingCockTypesEnum
    text = text.replace(combineStrRegex(name, /\.buttChangeNoDisplay\(([^)\n]+)\)/g), (match, p1) => `stretchButt(${name}, ${p1})`);
    text = text.replace(combineStrRegex(name, /\.cuntChangeNoDisplay\(([^)\n]+)\)/g), (match, p1) => `stretchVagina(${name}, ${p1})`);
    text = text.replace(escRegex(`${name}.inHeat()`), `${name}.effects.has(Effect.Heat)`);
    text = text.replace(escRegex(`${name}.inRut()`), `${name}.effects.has(Effect.Rut)`);
    // OK - bonusFertility
    // OK - totalFertility
    text = text.replace(escRegex(`${name}.isBiped()`), `${name}.body.legs.isBiped()`);
    text = text.replace(escRegex(`${name}.isNaga()`), `${name}.body.legs.isNaga()`);
    text = text.replace(escRegex(`${name}.isTaur()`), `${name}.body.legs.isTaur()`);
    text = text.replace(escRegex(`${name}.isDrider()`), `${name}.body.legs.isDrider()`);
    text = text.replace(escRegex(`${name}.isGoo()`), `${name}.body.legs.isGoo()`);
    text = text.replace(escRegex(`${name}.legs()`), `describeLegs(${name})`);
    text = text.replace(escRegex(`${name}.skinFurScales()`), `skinFurScales(${name})`);
    text = text.replace(escRegex(`${name}.leg()`), `describeLeg(${name})`);
    text = text.replace(escRegex(`${name}.feet()`), `describeFeet(${name})`);
    text = text.replace(escRegex(`${name}.foot()`), `describeFoot(${name})`);
    // Manual - canOvipositSpider
    // Manual - canOvipositBee
    text = text.replace(escRegex(`${name}.canOviposit()`), `${name}.pregnancy.ovipositor.canOviposit()`);
    text = text.replace(escRegex(`${name}.eggs()`), `${name}.pregnancy.ovipositor.eggs`);
    // Unused - addEggs
    text = text.replace(escRegex(`${name}.dumpEggs()`), `${name}.pregnancy.ovipositor.dumpEggs()`);
    text = text.replace(escRegex(`${name}.dumpEggs()`), `${name}.pregnancy.ovipositor.dumpEggs()`);
    // Unused - setEggs
    text = text.replace(escRegex(`${name}.fertilizedEggs()`), `${name}.pregnancy.ovipositor.fertilizedEggs`);
    text = text.replace(escRegex(`${name}.fertilizeEggs()`), `${name}.pregnancy.ovipositor.fertilizeEggs()`);
    text = text.replace(combineStrRegex(name, /\.breastCup\(([^)\n]+)\)/g), (match, p1) => `breastCup(${name}.body.chest.get(${p1}))`);
    text = text.replace(escRegex(`${name}.bRows()`), `${name}.body.chest.length`);
    text = text.replace(escRegex(`${name}.totalBreasts()`), `${name}.body.chest.reduce(BreastRow.TotalBreasts, 0)`);
    text = text.replace(escRegex(`${name}.totalNipples()`), `${name}.body.chest.reduce(BreastRow.TotalNipples, 0)`);
    text = text.replace(escRegex(`${name}.smallestTitSize()`), `${name}.body.chest.sort(BreastRow.Smallest)[0].rating`);
    text = text.replace(escRegex(`${name}.smallestTitRow()`), `${name}.body.chest.sort(BreastRow.Smallest)[0]`);
    text = text.replace(escRegex(`${name}.biggestTitRow()`), `${name}.body.chest.sort(BreastRow.Biggest)[0]`);
    text = text.replace(escRegex(`${name}.averageBreastSize()`), `${name}.body.chest.reduce(BreastRow.AverageSize, 0)`);
    text = text.replace(escRegex(`${name}.averageCockThickness()`), `${name}.body.cocks.reduce(Cock.AverageThickness, 0)`);
    text = text.replace(escRegex(`${name}.averageNippleLength()`), `${name}.body.chest.reduce(BreastRow.AverageNippleLength, 0)`);
    text = text.replace(escRegex(`${name}.averageVaginalLooseness()`), `${name}.body.vaginas.reduce(Vagina.AverageLooseness, 0)`);
    text = text.replace(escRegex(`${name}.averageVaginalWetness()`), `${name}.body.vaginas.reduce(Vagina.AverageWetness, 0)`);
    text = text.replace(escRegex(`${name}.averageCockLength()`), `${name}.body.cock.reduce(Cock.AverageLength, 0)`);
    text = text.replace(escRegex(`${name}.canTitFuck()`), `${name}.body.chest.find(BreastRow.Fuckable)`);
    text = text.replace(escRegex(`${name}.mostBreastsPerRow()`), `${name}.body.chest.sort(BreastRow.MostBreastsCount)[0].length`);
    text = text.replace(escRegex(`${name}.averageNipplesPerBreast()`), `${name}.body.chest.reduce(BreastRow.AverageNipplesPerBreast, 0)`);
    text = text.replace(escRegex(`${name}.allBreastsDescript()`), `describeAllBreasts(${name})`);
    text = text.replace(escRegex(`${name}.sMultiCockDesc()`), `describeOneOfYourCocks(${name})`);
    text = text.replace(escRegex(`${name}.SMultiCockDesc()`), `describeOneOfYourCocksCap(${name})`);
    text = text.replace(escRegex(`${name}.oMultiCockDesc()`), `describeEachOfYourCocks(${name})`);
    text = text.replace(escRegex(`${name}.OMultiCockDesc()`), `describeEachOfYourCocksCap(${name})`);
    text = text.replace(escRegex(`${name}.cockMultiLDescriptionShort()`), `describeCocksShort(${name})`);
    text = text.replace(escRegex(`${name}.hasSheath()`), `${name}.body.cocks.find(Cock.HasSheath)`);
    text = text.replace(escRegex(`${name}.sheathDescription()`), `describeSheath(${name})`);
    text = text.replace(escRegex(`${name}.vaginaDescript()`), `describeVagina(${name}, ${name}.body.vaginas.get(0))`);
    text = text.replace(combineStrRegex(name, /\.vaginaDescript\(([^)\n]+)\)/g), (match, p1) => `describeVagina(${name}, ${name}.body.vaginas.get(${p1}))`);
    text = text.replace(combineStrRegex(name, /\.nippleDescript\(([^)\n]+)\)/g), (match, p1) => `describeNipple(${name}, ${name}.body.chest.get(${p1}))`);
    text = text.replace(escRegex(`${name}.chestDesc()`), `describeChest(${name})`);
    text = text.replace(escRegex(`${name}.allChestDesc()`), `describeEntireChest(${name})`);
    text = text.replace(escRegex(`${name}.clitDescript()`), `describeClit(${name})`);
    text = text.replace(escRegex(`${name}.cockHead()`), `describeCockHead(${name}.body.cocks.get(0))`);
    text = text.replace(combineStrRegex(name, /\.cockHead\(([^)\n]+)\)/g), (match, p1) => `describeCockHead(${name}.body.cocks.get(${p1}))`);
    text = text.replace(escRegex(`${name}.cockDescriptShort()`), `describeCockShort(${name}.body.cocks.get(0))`);
    text = text.replace(combineStrRegex(name, /\.cockDescriptShort\(([^)\n]+)\)/g), (match, p1) => `describeCockShort(${name}.body.cocks.get(${p1}))`);
    text = text.replace(escRegex(`${name}.assholeOrPussy()`), `assholeOrPussy(${name})`);
    text = text.replace(escRegex(`${name}.multiCockDescriptLight()`), `describeCocksLight(${name})`);
    text = text.replace(escRegex(`${name}.multiCockDescript()`), `describeCocks(${name})`);
    text = text.replace(escRegex(`${name}.ballsDescriptLight()`), `describeBalls(true, true, ${name})`);
    text = text.replace(escRegex(`${name}.ballsDescriptLight(true)`), `describeBalls(true, true, ${name})`);
    text = text.replace(escRegex(`${name}.ballsDescriptLight(false)`), `describeBalls(false, true, ${name})`);
    text = text.replace(escRegex(`${name}.sackDescript()`), `describeBallsack(${name})`);
    text = text.replace(combineStrRegex(name, /\.breastDescript\(([^)\n]+)\)/g), (match, p1) => `describeBreastRow(${name}.body.chest.get(${p1}))`);
    text = text.replace(combineStrRegex(name, /\.breastSize\(([^)\n]+)\)/g), (match, p1) => `describeBreastRowRating(${p1})`);
    return text;
}
