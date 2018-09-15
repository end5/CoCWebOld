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

function regex(str: string): RegExp {
    return new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
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
            if (!lines[index].includes('{'))
                packageStr = true;
            lines.splice(index, 1);
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
            lines[index] = lines[index].replace('public class', 'export class');
        }

        // Remove - override
        if (lines[index].trimLeft().startsWith('override '))
            lines[index] = lines[index].replace('override ', '');

        if (lines[index].trimLeft().startsWith('public function ' + className + 'Scene'))
            lines[index] = lines[index].replace('public function ' + className + 'Scene', 'public constructor');

        if (lines[index].trimLeft().startsWith('public function'))
            lines[index] = lines[index].replace('public function', 'export function');

        if (lines[index].trimLeft().startsWith('private function'))
            lines[index] = lines[index].replace('private function', 'function');

        if (lines[index].trimLeft().startsWith('public var'))
            lines[index] = lines[index].replace('public var', 'public');

        if (lines[index].trimLeft().startsWith('private var'))
            lines[index] = lines[index].replace('private var', 'private');

        lines[index] = lines[index].replace('extends NPCAwareContent ', '');
        lines[index] = lines[index].replace('extends BaseContent ', '');
        lines[index] = lines[index].replace('TimeAwareInterface', 'ITimeAware');

        lines[index] = lines[index].replace(/: ?Function/g, ': () => void');
        lines[index] = lines[index].replace(/: ?Boolean/g, ': boolean');
        lines[index] = lines[index].replace(/: ?Number/g, ': number');
        lines[index] = lines[index].replace(/: ?int/g, ': number');
        lines[index] = lines[index].replace(/: ?String/g, ': string');
        lines[index] = lines[index].replace(/: ?void/g, '');
        lines[index] = lines[index].replace(/null/g, 'undefined');

        if (/flags\[kFLAGS\.([^\]]+)\]/.test(lines[index])) {
            lines[index] = lines[index].replace(/flags\[kFLAGS\.([^\]]+)\]/g, (match, p1) => {
                flags.add(p1);
                return `${className}Flags.${p1}`;
            });
        }

        lines[index] = lines[index].replace(regex('camp.'), '');
        lines[index] = lines[index].replace(regex('Appearance.'), '');
        lines[index] = lines[index].replace(regex('game.'), '');
        lines[index] = lines[index].replace(regex('kGAMECLASS.'), '');
        lines[index] = lines[index].replace(regex('kFLAGS.'), `${className}Flags.`);
        // Unused - whitney
        // Manual - monk
        // Manual - sand
        // Manual - giacomo

        lines[index] = lines[index].replace(regex('model.time.hours'), 'Time.hour');
        lines[index] = lines[index].replace(regex('model.time.day'), 'Time.day');

        // Classes
        lines[index] = fixItems(lines[index]);
        lines[index] = fixBreastRowClass(lines[index]);
        lines[index] = fixAssClass(lines[index]);
        lines[index] = fixVaginaClass(lines[index]);
        lines[index] = fixCockClass(lines[index]);
        lines[index] = fixCreatureClass(lines[index]);
        lines[index] = fixCharacterClass(lines[index]);
        lines[index] = fixPlayerClass(lines[index]);
        lines[index] = fixMonsterClass(lines[index]);
        lines[index] = fixBaseContent(lines[index], className);

        // Enums
        lines[index] = lines[index].replace(regex('StatusAffects.'), 'EffectType.');
        lines[index] = lines[index].replace(regex('PerkLib.'), 'PerkType.');
        lines[index] = lines[index].replace(regex('CockTypesEnum.'), 'CockType.');
        lines[index] = lines[index].replace(regex('PregnancyStore.PREGNANCY_'), 'PregnancyType.');
        lines[index] = lines[index].replace(regex('PregnancyStore.INCUBATION_'), 'IncubationTime.');
        lines[index] = lines[index].replace(regex('GENDER_'), 'Gender.');
        lines[index] = lines[index].replace(regex('SKIN_TYPE_'), 'SkinType.');
        lines[index] = lines[index].replace(regex('HAIR_'), 'HairType.');
        lines[index] = lines[index].replace(regex('FACE_'), 'FaceType.');
        lines[index] = lines[index].replace(regex('TONGUE_'), 'TongueType.');
        lines[index] = lines[index].replace(regex('EYES_'), 'EyeType.');
        lines[index] = lines[index].replace(regex('EARS_'), 'EarType.');
        lines[index] = lines[index].replace(regex('HORNS_'), 'HornType.');
        lines[index] = lines[index].replace(regex('ANTENNAE_'), 'AntennaeType.');
        lines[index] = lines[index].replace(regex('ARM_TYPE_'), 'ArmType.');
        lines[index] = lines[index].replace(regex('TAIL_TYPE_'), 'TailType.');
        lines[index] = lines[index].replace(regex('BREAST_CUP_'), 'BreastCup.');
        lines[index] = lines[index].replace(regex('WING_TYPE_'), 'WingType.');
        lines[index] = lines[index].replace(regex('LOWER_BODY_TYPE_'), 'LegType.');
        lines[index] = lines[index].replace(regex('PIERCING_TYPE_'), 'PiercingType.');
        lines[index] = lines[index].replace(regex('VAGINA_TYPE_'), 'VaginaType.');
        lines[index] = lines[index].replace(regex('VAGINA_WETNESS_'), 'VaginaWetness.');
        lines[index] = lines[index].replace(regex('VAGINA_LOOSENESS_'), 'VaginaLooseness.');
        lines[index] = lines[index].replace(regex('ANAL_WETNESS_'), 'AnalWetness.');
        lines[index] = lines[index].replace(regex('ANAL_LOOSENESS_'), 'AnalLooseness.');
        lines[index] = lines[index].replace(regex('HIP_RATING_'), 'HipRating.');
        lines[index] = lines[index].replace(regex('BUTT_RATING_'), 'ButtRating.');

        // Special post cases
        lines[index] = lines[index].replace(/player\.stats\.lus([^t])/g, (match, p1) => `player.stats.lust${p1}`);
        lines[index] = lines[index].replace(/player\.stats\.sen([^t])/g, (match, p1) => `player.stats.sens${p1}`);
        lines[index] = lines[index].replace(regex('player.butt'), 'player.body.butt');
        lines[index] = lines[index].replace(/DisplayText\(([^\n]+), false\)/g, (match, p1) => `DisplayText(${p1})`);
        if (/DisplayText\([^\n]+, true\)/g.test(lines[index])) {
            lines[index] = lines[index].replace(/DisplayText\(([^\n]+), true\)/g, (match, p1) => `DisplayText(${p1})`);
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
        lines[index] = lines[index].replace('clearOutput()', 'DisplayText().clear()');
        lines[index] = lines[index].replace('export function timeChange', 'public timeChange');
        lines[index] = lines[index].replace('export function timeChangeLarge', 'public timeChangeLarge');

        index++;
    }

    lines.unshift('const player = User.char;');
    lines.unshift(`User.flags.set(FlagType.${className}, ${className}Flags);`);
    if (flags.size > 0) {
        lines.unshift('};');
        for (const flag of flags.values()) {
            lines.unshift(`${flag}: 0,`);
        }
        lines.unshift(`export const ${className}Flags = {`);
    }

    return lines.join('\n');
}

function fixItems(line: string): string {
    // public const ([^:]+):[\w\s=\(".,\n\-\'?\):{}\\<>\/!+]+;
    // Weapons
    line = line.replace(regex('weapons.B_SWORD'), 'WeaponName.BeautifulSword');
    line = line.replace(regex('weapons.CLAYMOR'), 'WeaponName.LargeClaymore');
    line = line.replace(regex('weapons.DRGNSHL'), 'WeaponName.DragonShellShield');
    line = line.replace(regex('weapons.E_STAFF'), 'WeaponName.EldritchStaff');
    line = line.replace(regex('weapons.URTAHLB'), 'WeaponName.UrtaHalberd');
    line = line.replace(regex('weapons.H_GAUNT'), 'WeaponName.HookedGauntlet');
    line = line.replace(regex('weapons.JRAPIER'), 'WeaponName.JeweledRapier');
    line = line.replace(regex('weapons.KATANA '), 'WeaponName.Katana');
    line = line.replace(regex('weapons.L__AXE' ), 'WeaponName.LargeAxe');
    line = line.replace(regex('weapons.L_DAGGR'), 'WeaponName.AphroDagger');
    line = line.replace(regex('weapons.L_HAMMR'), 'WeaponName.LargeHammer');
    line = line.replace(regex('weapons.PIPE   '), 'WeaponName.Pipe');
    line = line.replace(regex('weapons.RIDINGC'), 'WeaponName.RidingCrop');
    line = line.replace(regex('weapons.RRAPIER'), 'WeaponName.RaphaelsRapier');
    line = line.replace(regex('weapons.S_BLADE'), 'WeaponName.Spellblade');
    line = line.replace(regex('weapons.S_GAUNT'), 'WeaponName.SpikedGauntlet');
    line = line.replace(regex('weapons.SPEAR  '), 'WeaponName.Spear');
    line = line.replace(regex('weapons.SUCWHIP'), 'WeaponName.SuccubiWhip');
    line = line.replace(regex('weapons.W_STAFF'), 'WeaponName.WizardsStaff');
    line = line.replace(regex('weapons.WARHAMR'), 'WeaponName.HugeWarhammer');
    line = line.replace(regex('weapons.WHIP   '), 'WeaponName.Whip');

    // Armor
    // Manual - COMFORTABLE_UNDERCLOTHES
    line = line.replace(regex('armors.ADVCLTH'), 'GreenClothes');
    line = line.replace(regex('armors.B_DRESS'), 'LongDress');
    line = line.replace(regex('armors.BEEARMR'), 'BeeArmor');
    line = line.replace(regex('armors.BIMBOSK'), 'BimboSkirt');
    line = line.replace(regex('armors.BONSTRP'), 'BondageStraps');
    line = line.replace(regex('armors.C_CLOTH'), 'ComfortClothes');
    line = line.replace(regex('armors.CHBIKNI'), 'ChainmailBikini');
    line = line.replace(regex('armors.CLSSYCL'), 'SuitClothes');
    line = line.replace(regex('armors.FULLCHN'), 'FullChainmail');
    line = line.replace(regex('armors.FULLPLT'), 'FullPlatemail');
    line = line.replace(regex('armors.FURLOIN'), 'FurLoincloth');
    line = line.replace(regex('armors.GELARMR'), 'ArmorName.GelArmor');
    line = line.replace(regex('armors.GOOARMR'), 'ArmorName.GooArmor');
    line = line.replace(regex('armors.I_CORST'), 'ArmorName.InquisitorsCorset');
    line = line.replace(regex('armors.I_ROBES'), 'ArmorName.InquisitorsRobes');
    line = line.replace(regex('armors.INDECST'), 'ArmorName.IndecentSteelArmor');
    line = line.replace(regex('armors.LEATHRA'), 'ArmorName.LeatherArmor');
    line = line.replace(regex('armors.URTALTA'), 'ArmorName.LeatherArmorSegments');
    line = line.replace(regex('armors.LMARMOR'), 'ArmorName.LustyMaidensArmor');
    line = line.replace(regex('armors.LTHRPNT'), 'ArmorName.TightLeatherPants');
    line = line.replace(regex('armors.LTHRROB'), 'ArmorName.LeatherRobes');
    line = line.replace(regex('armors.M_ROBES'), 'ArmorName.ModestRobes');
    line = line.replace(regex('armors.NURSECL'), 'ArmorName.NurseOutfit');
    line = line.replace(regex('armors.OVERALL'), 'ArmorName.Overalls');
    line = line.replace(regex('armors.R_BDYST'), 'ArmorName.RedBodysuit');
    line = line.replace(regex('armors.RBBRCLT'), 'ArmorName.RubberFetishClothes');
    line = line.replace(regex('armors.S_SWMWR'), 'ArmorName.SluttySwimwear');
    line = line.replace(regex('armors.SCALEML'), 'ArmorName.Scalemail');
    line = line.replace(regex('armors.SEDUCTA'), 'ArmorName.SeductiveArmor');
    line = line.replace(regex('armors.SS_ROBE'), 'ArmorName.SpidersilkRobes');
    line = line.replace(regex('armors.SSARMOR'), 'ArmorName.SpidersilkArmor');
    line = line.replace(regex('armors.T_BSUIT'), 'ArmorName.SemiTransBodysuit');
    line = line.replace(regex('armors.TUBETOP'), 'ArmorName.TubeTop');
    line = line.replace(regex('armors.W_ROBES'), 'ArmorName.WizardRobes');

    // Useables
    line = line.replace(regex('useables.B_CHITN'), 'MaterialName.BlackChitin');
    line = line.replace(regex('useables.GLDSTAT'), 'MaterialName.GoldenStatue');
    line = line.replace(regex('useables.GREENGL'), 'MaterialName.GreenGel');
    line = line.replace(regex('useables.T_SSILK'), 'MaterialName.ToughSpiderSilk');

    // Consumables
    line = line.replace(regex('consumables.AUBURND'), 'ConsumableName.HairDyeAuburn');
    line = line.replace(regex('consumables.B__BOOK'), 'ConsumableName.BlackSpellbook');
    line = line.replace(regex('consumables.B_GOSSR'), 'ConsumableName.BlackGossamer');
    line = line.replace(regex('consumables.BC_BEER'), 'ConsumableName.BlackCatBeer');
    line = line.replace(regex('consumables.BEEHONY'), 'ConsumableName.BeeHoney');
    line = line.replace(regex('consumables.BIMBOCH'), 'ConsumableName.BimboChampagne');
    line = line.replace(regex('consumables.BIMBOLQ'), 'ConsumableName.BimboLiqueur');
    line = line.replace(regex('consumables.BLACK_D'), 'ConsumableName.HairDyeBlack');
    line = line.replace(regex('consumables.BLACKEG'), 'ConsumableName.EggBlack');
    line = line.replace(regex('consumables.BLACKPP'), 'ConsumableName.CaninePepperBlack');
    line = line.replace(regex('consumables.BLOND_D'), 'ConsumableName.HairDyeBlonde');
    line = line.replace(regex('consumables.BLUEDYE'), 'ConsumableName.HairDyeDarkBlue');
    line = line.replace(regex('consumables.BLUEEGG'), 'ConsumableName.EggBlue');
    line = line.replace(regex('consumables.BROBREW'), 'ConsumableName.BroBrew');
    line = line.replace(regex('consumables.BROWN_D'), 'ConsumableName.HairDyeBrown');
    line = line.replace(regex('consumables.BROWNEG'), 'ConsumableName.EggBrown');
    line = line.replace(regex('consumables.BULBYPP'), 'ConsumableName.CaninePepperBulbous');
    line = line.replace(regex('consumables.CANINEP'), 'ConsumableName.CaninePepper');
    line = line.replace(regex('consumables.CCUPCAK'), 'ConsumableName.GiantChocolateCupcake');
    line = line.replace(regex('consumables.CERUL_P'), 'ConsumableName.CeruleanPotion');
    line = line.replace(regex('consumables.COAL___'), 'ConsumableName.Coal');
    line = line.replace(regex('consumables.DBLPEPP'), 'ConsumableName.CaninePepperDouble');
    line = line.replace(regex('consumables.DEBIMBO'), 'ConsumableName.DeBimbo');
    line = line.replace(regex('consumables.DRGNEGG'), 'ConsumableName.DragonEgg');
    line = line.replace(regex('consumables.DRYTENT'), 'ConsumableName.ShriveledTentacle');
    line = line.replace(regex('consumables.ECTOPLS'), 'ConsumableName.Ectoplasm');
    line = line.replace(regex('consumables.EQUINUM'), 'ConsumableName.Equinum');
    line = line.replace(regex('consumables.EXTSERM'), 'ConsumableName.HairExtensionSerum');
    line = line.replace(regex('consumables.F_DRAFT'), 'ConsumableName.LustDraftEnhanced');
    line = line.replace(regex('consumables.FISHFIL'), 'ConsumableName.FishFillet');
    line = line.replace(regex('consumables.FOXBERY'), 'ConsumableName.FoxBerry');
    line = line.replace(regex('consumables.FRRTFRT'), 'ConsumableName.FerretFruit');
    line = line.replace(regex('consumables.FOXJEWL'), 'ConsumableName.FoxJewel');
    line = line.replace(regex('consumables.GLDSEED'), 'ConsumableName.GoldenSeed');
    line = line.replace(regex('consumables.GODMEAD'), 'ConsumableName.GodsMead');
    line = line.replace(regex('consumables.GOB_ALE'), 'ConsumableName.GoblinAle');
    line = line.replace(regex('consumables.GRAYDYE'), 'ConsumableName.HairDyeGray');
    line = line.replace(regex('consumables.GREEN_D'), 'ConsumableName.HairDyeGreen');
    line = line.replace(regex('consumables.GROPLUS'), 'ConsumableName.GroPlus');
    line = line.replace(regex('consumables.HUMMUS_'), 'ConsumableName.Hummus');
    line = line.replace(regex('consumables.IMPFOOD'), 'ConsumableName.ImpFood');
    line = line.replace(regex('consumables.INCUBID'), 'ConsumableName.IncubusDraft');
    line = line.replace(regex('consumables.IZYMILK'), 'ConsumableName.IsabellaMilk');
    line = line.replace(regex('consumables.KANGAFT'), 'ConsumableName.KangaFruit');
    line = line.replace(regex('consumables.KITGIFT'), 'ConsumableName.KitsuneGift');
    line = line.replace(regex('consumables.KNOTTYP'), 'ConsumableName.CaninePepperKnotty');
    line = line.replace(regex('consumables.L_DRAFT'), 'ConsumableName.LustDraft');
    line = line.replace(regex('consumables.L_BLKEG'), 'ConsumableName.LargeEggBlack');
    line = line.replace(regex('consumables.L_BLUEG'), 'ConsumableName.LargeEggBlue');
    line = line.replace(regex('consumables.L_BRNEG'), 'ConsumableName.LargeEggBrown');
    line = line.replace(regex('consumables.L_PNKEG'), 'ConsumableName.LargeEggPink');
    line = line.replace(regex('consumables.L_PRPEG'), 'ConsumableName.LargeEggPurple');
    line = line.replace(regex('consumables.L_WHTEG'), 'ConsumableName.LargeEggWhite');
    line = line.replace(regex('consumables.LABOVA_'), 'ConsumableName.LaBova');
    line = line.replace(regex('consumables.LACTAID'), 'ConsumableName.Lactaid');
    line = line.replace(regex('consumables.LARGEPP'), 'ConsumableName.CaninePepperLarge');
    line = line.replace(regex('consumables.LUSTSTK'), 'ConsumableName.LustStick');
    line = line.replace(regex('consumables.M__MILK'), 'ConsumableName.MarbleMilk');
    line = line.replace(regex('consumables.MAGSEED'), 'ConsumableName.GoldenSeedEnhanced');
    line = line.replace(regex('consumables.MGHTYVG'), 'ConsumableName.KangaFruitEnhanced');
    line = line.replace(regex('consumables.MOUSECO'), 'ConsumableName.MouseCocoa');
    line = line.replace(regex('consumables.MINOBLO'), 'ConsumableName.MinotaurBlood');
    line = line.replace(regex('consumables.MINOCUM'), 'ConsumableName.MinotaurCum');
    line = line.replace(regex('consumables.MYSTJWL'), 'ConsumableName.FoxJewelEnhanced');
    line = line.replace(regex('consumables.NUMBROX'), 'ConsumableName.NumbRock');
    line = line.replace(regex('consumables.NPNKEGG'), 'ConsumableName.NeonPinkEgg');
    line = line.replace(regex('consumables.ORANGDY'), 'ConsumableName.HairDyeBrightOrange');
    line = line.replace(regex('consumables.OVIELIX'), 'ConsumableName.OvipositionElixir');
    line = line.replace(regex('consumables.P_DRAFT'), 'ConsumableName.IncubusDraftPure');
    line = line.replace(regex('consumables.P_LBOVA'), 'ConsumableName.LaBovaPure');
    line = line.replace(regex('consumables.P_PEARL'), 'ConsumableName.PurePearl');
    line = line.replace(regex('consumables.P_S_MLK'), 'ConsumableName.SuccubiMilkPure');
    line = line.replace(regex('consumables.P_WHSKY'), 'ConsumableName.PhoukaWhiskey');
    line = line.replace(regex('consumables.PEPPWHT'), 'ConsumableName.PeppermintWhite');
    line = line.replace(regex('consumables.PINKDYE'), 'ConsumableName.HairDyeNeonPink');
    line = line.replace(regex('consumables.PINKEGG'), 'ConsumableName.EggPink');
    line = line.replace(regex('consumables.PRFRUIT'), 'ConsumableName.PurpleFruit');
    line = line.replace(regex('consumables.PROBOVA'), 'ConsumableName.LaBovaEnhanced');
    line = line.replace(regex('consumables.PSDELIT'), 'ConsumableName.SuccubisDelightPure');
    line = line.replace(regex('consumables.PURHONY'), 'ConsumableName.BeeHoneyPure');
    line = line.replace(regex('consumables.PURPDYE'), 'ConsumableName.HairDyePurple');
    line = line.replace(regex('consumables.PURPEAC'), 'ConsumableName.PurityPeach');
    line = line.replace(regex('consumables.PURPLEG'), 'ConsumableName.EggPurple');
    line = line.replace(regex('consumables.RED_DYE'), 'ConsumableName.HairDyeRed');
    line = line.replace(regex('consumables.REPTLUM'), 'ConsumableName.Reptilum');
    line = line.replace(regex('consumables.REDUCTO'), 'ConsumableName.Reducto');
    line = line.replace(regex('consumables.RINGFIG'), 'ConsumableName.RingtailFig');
    line = line.replace(regex('consumables.RIZZART'), 'ConsumableName.RizzaRoot');
    line = line.replace(regex('consumables.S_DREAM'), 'ConsumableName.SuccubisDream');
    line = line.replace(regex('consumables.S_GOSSR'), 'ConsumableName.SweetGossamer');
    line = line.replace(regex('consumables.SDELITE'), 'ConsumableName.SuccubisDelight');
    line = line.replace(regex('consumables.SENSDRF'), 'ConsumableName.SensitivityDraft');
    line = line.replace(regex('consumables.SHARK_T'), 'ConsumableName.SharkTooth');
    line = line.replace(regex('consumables.SHEEPMK'), 'ConsumableName.SheepMilk');
    line = line.replace(regex('consumables.SMART_T'), 'ConsumableName.ScholarsTea');
    line = line.replace(regex('consumables.SNAKOIL'), 'ConsumableName.SnakeOil');
    line = line.replace(regex('consumables.SPHONEY'), 'ConsumableName.BeeHoneySpecial');
    line = line.replace(regex('consumables.SUCMILK'), 'ConsumableName.SuccubiMilk');
    line = line.replace(regex('consumables.TRAPOIL'), 'ConsumableName.TrapOil');
    line = line.replace(regex('consumables.TSCROLL'), 'ConsumableName.TatteredScroll');
    line = line.replace(regex('consumables.TSTOOTH'), 'ConsumableName.SharkToothEnhanced');
    line = line.replace(regex('consumables.VITAL_T'), 'ConsumableName.VitalityTincture');
    line = line.replace(regex('consumables.VIXVIGR'), 'ConsumableName.FoxBerryEnhanced');
    line = line.replace(regex('consumables.W__BOOK'), 'ConsumableName.WhiteSpellbook');
    line = line.replace(regex('consumables.W_FRUIT'), 'ConsumableName.WhiskerFruit');
    line = line.replace(regex('consumables.W_STICK'), 'ConsumableName.WingStick');
    line = line.replace(regex('consumables.WETCLTH'), 'ConsumableName.WetCloth');
    line = line.replace(regex('consumables.WHITEDY'), 'ConsumableName.HairDyeWhite');
    line = line.replace(regex('consumables.WHITEEG'), 'ConsumableName.EggWhite');
    line = line.replace(regex('consumables.PRNPKR'), 'ConsumableName.PrincessPucker');
    line = line.replace(regex('consumables.HRBCNT'), 'ConsumableName.HerbalContraceptive');
    // Manual - LARGE_EGGS
    // Manual - SMALL_EGGS
    return line;
}

function fixBaseContent(line: string, className: string): string {
    line = line.replace(/getGame\(\)\.?/g, '');
    // Unknown - cheatTime
    // OK - isHalloween
    // OK - isValentine
    // OK - isHolidays
    // OK - isThanksgiving
    line = line.replace(regex('showStats'), 'MainScreen.stats.show()');
    line = line.replace(regex('statScreenRefresh();'), '');
    line = line.replace(regex('cleanupAfterCombat()'), 'return { next: returnToCampUseOneHour }');
    line = line.replace(regex('cleanupAfterCombat'), 'returnToCampUseOneHour');
    // Manual - combatRoundOver
    // Manual - enemyAI
    line = line.replace(/spriteSelect\(\d+\)/g, `DisplaySprite(SpriteName.${className})`);
    line = line.replace(regex('hideStats()'), '');
    line = line.replace(regex('hideUpDown()'), '');
    line = line.replace(regex('createCallBackFunction'), 'partial');
    line = line.replace(regex('createCallBackFunction2'), 'partial');
    line = line.replace(regex('startCombat('), 'CombatManager.beginBattle(player, ');
    // Manual - startCombatImmediate
    // Unused - rawOutputText
    line = line.replace(/outputText\(/g, 'DisplayText(');
    // Special - clearOutput
    line = line.replace(/doNext\(([^;]+)\)/g, (match, p1) => `return { next: ${p1} }`);
    line = line.replace(regex('menu();'), '');
    line = line.replace(regex('hideMenus()'), 'MainScreen.hideTopButtons()');
    line = line.replace(
        /choices\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^\)]+)\)/g,
        (match, text1, choice1, text2, choice2, text3, choice3, text4, choice4, text5, choice5, text6, choice6, text7, choice7, text8, choice8, text9, choice9, text10, choice10) =>
            trimLeft`return {
                choices: [
                    [${text1}, ${choice1}],
                    [${text2}, ${choice2}],
                    [${text3}, ${choice3}],
                    [${text4}, ${choice4}],
                    [${text5}, ${choice5}],
                    [${text6}, ${choice6}],
                    [${text7}, ${choice7}],
                    [${text8}, ${choice8}],
                    [${text9}, ${choice9}],
                    [${text10}, ${choice10}],
                ]
            };`
    );
    line = line.replace(
        /simpleChoices\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^\)]+)\)/g,
        (match, text1, choice1, text2, choice2, text3, choice3, text4, choice4, text5, choice5) =>
            trimLeft`return {
                choices: [
                    [${text1}, ${choice1}],
                    [${text2}, ${choice2}],
                    [${text3}, ${choice3}],
                    [${text4}, ${choice4}],
                    [${text5}, ${choice5}],
                ]
            };`
    );
    line = line.replace(/doYesNo\((\w+), ?([^\)]+)\)/g, (match, choice1, choice2) => `return { yes: ${choice1}, no: ${choice2} };`
    );
    // Unknown - addButton
    // Unused - hasButton
    line = line.replace(regex('sackDescript()'), 'describeSack(player)');
    // Manual - cockClit
    // Unused - sheathDesc
    line = line.replace(regex('chestDesc()'), 'describeChest(player)');
    line = line.replace(regex('allChestDesc()'), 'describeEntireChest(player)');
    line = line.replace(regex('allBreastsDescript()'), 'describeAllBreasts(player)');
    line = line.replace(regex('sMultiCockDesc()'), 'describeOneOfYourCocks(player)');
    line = line.replace(regex('SMultiCockDesc()'), 'describeOneOfYourCocksCap(player)');
    line = line.replace(regex('oMultiCockDesc()'), 'describeEachOfYourCocks(player)');
    line = line.replace(regex('OMultiCockDesc()'), 'describeEachOfYourCocksCap(player)');
    line = line.replace(regex('tongueDescript()'), 'describeTongue(player)');
    line = line.replace(regex('ballsDescriptLight()'), 'describeBalls(true, true, player)');
    line = line.replace(regex('ballsDescriptLight(true)'), 'describeBalls(true, true, player)');
    line = line.replace(regex('ballsDescriptLight(false)'), 'describeBalls(false, true, player)');
    line = line.replace(regex('ballDescript()'), 'describeBalls(false, false, player)');
    line = line.replace(regex('ballsDescript()'), 'describeBalls(false, true, player, true)');
    line = line.replace(regex('simpleBallsDescript()'), 'describeBalls(false, true, player)');
    line = line.replace(regex('assholeDescript()'), 'describeButthole(player)');
    line = line.replace(regex('eAssholeDescript()'), 'describeButthole(monster)');
    line = line.replace(regex('hipDescript()'), 'describeHips(player)');
    line = line.replace(regex('assDescript()'), 'describeButt(player)');
    line = line.replace(regex('buttDescript()'), 'describeButt(player)');
    line = line.replace(regex('assholeOrPussy()'), 'assholeOrPussy(player)');
    line = line.replace(/nippleDescript\(([^\)]+)\)/g, (match, p1) => `describeNipple(player, player.body.chest.get(${p1}))`);
    line = line.replace(regex('cockDescript()'), 'describeCock(player, player.body.cocks.get(0))');
    line = line.replace(/cockDescript\((\w+)\)/g, (match, p1) => `describeCock(player, player.body.cocks.get(${p1}))`);
    line = line.replace(regex('multiCockDescript()'), 'describeCocks(player)');
    line = line.replace(regex('multiCockDescriptLight()'), 'describeCocksLight(player)');
    line = line.replace(/breastDescript\(([^\)]+)\)/g, (match, p1) => `describeBreastRow(player.body.chest.get(${p1}))`);
    line = line.replace(/breastSize\(([^\)]+)\)/g, (match, p1) => `describeBreastRowRating(${p1})`);
    line = line.replace(regex('biggestBreastSizeDescript()'), 'describeBiggestBreastRow(player)');
    line = line.replace(regex('hairDescript()'), 'describeHair(player)');
    line = line.replace(regex('hairOrFur()'), 'hairOrFur(player)');
    line = line.replace(regex('clitDescript()'), 'describeClit(player)');
    line = line.replace(regex('vaginaDescript()'), 'describeVagina(player, player.body.vaginas.get(0))');
    line = line.replace(/vaginaDescript\(([^\)]+)\)/g, (match, p1) => `describeVagina(player, player.body.vaginas.get(${p1}))`);
    line = line.replace(regex('allVaginaDescript()'), 'describeEveryVagina(player)');
    line = line.replace(
        /dynStats\("(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^\)]+)\)/g,
        (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14) =>
            trimLeft`player.stats.${p1} += ${p2};
            player.stats.${p3} += ${p4};
            player.stats.${p5} += ${p6};
            player.stats.${p7} += ${p8};
            player.stats.${p9} += ${p10};
            player.stats.${p11} += ${p12};
            player.stats.${p13} += ${p14}`
    );
    line = line.replace(
        /dynStats\("(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^\)]+)\)/g,
        (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) =>
            trimLeft`player.stats.${p1} += ${p2};
            player.stats.${p3} += ${p4};
            player.stats.${p5} += ${p6};
            player.stats.${p7} += ${p8};
            player.stats.${p9} += ${p10};
            player.stats.${p11} += ${p12}`
    );
    line = line.replace(
        /dynStats\("(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^\)]+)\)/g,
        (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) =>
            trimLeft`player.stats.${p1} += ${p2};
            player.stats.${p3} += ${p4};
            player.stats.${p5} += ${p6};
            player.stats.${p7} += ${p8};
            player.stats.${p9} += ${p10}`
    );
    line = line.replace(
        /dynStats\("(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^\)]+)\)/g,
        (match, p1, p2, p3, p4, p5, p6, p7, p8) =>
            trimLeft`player.stats.${p1} += ${p2};
            player.stats.${p3} += ${p4};
            player.stats.${p5} += ${p6};
            player.stats.${p7} += ${p8}`
    );
    line = line.replace(
        /dynStats\("(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^\)]+)\)/g,
        (match, p1, p2, p3, p4, p5, p6) =>
            trimLeft`player.stats.${p1} += ${p2};
            player.stats.${p3} += ${p4};
            player.stats.${p5} += ${p6}`
    );
    line = line.replace(
        /dynStats\("(\w+)\+?", ?([^,]+), ?"(\w+)\+?", ?([^\)]+)\)/g,
        (match, p1, p2, p3, p4) =>
            trimLeft`player.stats.${p1} += ${p2};
            player.stats.${p3} += ${p4}`
    );
    line = line.replace(
        /dynStats\("(\w+)\+?", ?([^\)]+)\)/g,
        (match, p1, p2) => `player.stats.${p1} += ${p2}`
    );
    line = line.replace(regex('silly()'), 'User.settings.silly()');
    line = line.replace(
        /HPChange\(([^,]+), ?([^\)]+)\)/g,
        (match, p1, p2) =>
            p2 === 'true' || p2 !== 'false' ?
                `displayCharacterHPChange(player, ${p1})` :
                `player.stats.HP += ${p1}`
    );
    line = line.replace(
        /fatigue\(([^,]+), ?([^\)]+)\)/,
        (match, p1, p2) =>
            p2 === '1' ? `player.stats.fatigueMagical(${p1})` :
                (p2 === '2' ? `player.stats.fatiguePhysical(${p1})` :
                    `player.stats.fatigue += ${p1}`)
    );
    line = line.replace(/fatigue\(([^\)]+)\)/, (match, p1) => `player.stats.fatigue += ${p1}`);
    line = line.replace(regex('playerMenu'), 'playerMenu');
    line = line.replace(regex('showStatDown'), '');
    line = line.replace(regex('showStatUp'), '');
    return line;
}

function fixBreastRowClass(line: string): string {
    line = line.replace(/breastRows\[([^\]]+)\]\.nipplesPerBreast/g, (match, p1) => `chest.get(${p1}).nipples.amount`);
    line = line.replace(/breastRows\[([^\]]+)\]\.fuckable/g, (match, p1) => `chest.get(${p1}).nipples.fuckable`);
    line = line.replace(/breastRows\[([^\]]+)\]\.breasts/g, (match, p1) => `chest.get(${p1}).amount`);
    line = line.replace(/breastRows\[([^\]]+)\]\.breastRating/g, (match, p1) => `chest.get(${p1}).rating`);
    line = line.replace(/breastRows\[([^\]]+)\]\.lactationMultiplier/g, (match, p1) => `chest.get(${p1}).lactationMultiplier`);
    line = line.replace(/breastRows\[([^\]]+)\]\.milkFullness/g, (match, p1) => `chest.get(${p1}).milkFullness`);
    line = line.replace(/breastRows\[([^\]]+)\]\.fullness/g, (match, p1) => `chest.get(${p1}).fullness`);
    return line;
}

function fixAssClass(line: string): string {
    line = line.replace(regex('ass.analWetness'), `butt.wetness`);
    line = line.replace(regex('ass.analLooseness'), `butt.looseness`);
    return line;
}

function fixVaginaClass(line: string): string {
    line = line.replace(/vaginas\[([^\]]+)\]\.vaginalWetness/g, (match, p1) => `vaginas.get(${p1}).wetness`);
    line = line.replace(/vaginas\[([^\]]+)\]\.vaginalLooseness/g, (match, p1) => `vaginas.get(${p1}).looseness`);
    line = line.replace(/vaginas\[([^\]]+)\]\.virgin/g, (match, p1) => `vaginas.get(${p1}).virgin`);
    return line;
}

function fixCockClass(line: string): string {
    line = line.replace(/cocks\[([^\]]+)\]\.cockLength/g, (match, p1) => `cocks.get(${p1}).length`);
    line = line.replace(/cocks\[([^\]]+)\]\.cockThickness/g, (match, p1) => `cocks.get(${p1}).thickness`);
    line = line.replace(/cocks\[([^\]]+)\]\.cockType/g, (match, p1) => `cocks.get(${p1}).type`);
    line = line.replace(/cocks\[([^\]]+)\]\.knotMultiplier/g, (match, p1) => `cocks.get(${p1}).knotMultiplier`);
    return line;
}

function fixMonsterClass(line: string): string {
    return line;
}

function fixPlayerClass(line: string): string {
    // Manual - slotName
    // Manual - autoSave
    line = line.replace(regex('player.lustVuln'), 'player.stats.lustVuln');
    line = line.replace(regex('player.teaseLevel'), 'player.stats.teaseLevel');
    line = line.replace(regex('player.teaseXP'), 'player.stats.teaseXP');
    line = line.replace(regex('player.perkPoints'), 'player.stats.perkPoints');
    line = line.replace(regex('player.explored'), 'exploreFlags.BEYOND_CAMP');
    line = line.replace(regex('player.exploredForest'), 'exploreFlags.FOREST');
    line = line.replace(regex('player.exploredDesert'), 'exploreFlags.DESERT');
    line = line.replace(regex('player.exploredMountain'), 'exploreFlags.MOUNTAIN');
    line = line.replace(regex('player.exploredLake'), 'exploreFlags.LAKE');
    // Unused - pregnancyUpdate
    // Manual - itemSlot[1-5]
    line = line.replace(regex('player.modArmorName'), 'player.inventory.equipment.modifiedArmorDesc');
    // Unused - armorBaseDef
    // Unused - weaponBaseAttack
    line = line.replace(regex('player.armor'), 'player.inventory.equipment.armor');
    line = line.replace(/player\.setArmor\(([^\)]+)\)/g, (match, p1) => `player.inventory.equipment.equippedArmorSlot.equip(${p1})`);
    // Unused - setArmorHiddenField
    line = line.replace(regex('player.weapon'), 'player.inventory.equipment.weapon');
    line = line.replace(/player\.setWeapon\(([^\)]+)\)/g, (match, p1) => `player.inventory.equipment.equippedWeaponSlot.equip(${p1})`);
    // Unused - setWeaponHiddenField
    // Unused - reduceDamage
    // Manual - takeDamage
    // Unused - speedDodge
    line = line.replace(regex('player.bodyType()'), 'describeBody(player)');
    line = line.replace(regex('player.race()'), 'describeRace(player)');
    line = line.replace(regex('player.demonScore()'), 'demonRaceScore(player)');
    line = line.replace(regex('player.humanScore()'), 'humanRaceScore(player)');
    line = line.replace(regex('player.minoScore()'), 'minotaurRaceScore(player)');
    // Unused - minotaurScore
    line = line.replace(regex('player.cowScore()'), 'cowRaceScore(player)');
    line = line.replace(regex('player.sandTrapScore()'), 'sandTrapRaceScore(player)');
    line = line.replace(regex('player.beeScore()'), 'beeRaceScore(player)');
    line = line.replace(regex('player.ferretScore()'), 'ferretRaceScore(player)');
    line = line.replace(regex('player.mouseScore()'), 'mouseRaceScore(player)');
    line = line.replace(regex('player.raccoonScore()'), 'raccoonRaceScore(player)');
    line = line.replace(regex('player.catScore()'), 'catRaceScore(player)');
    line = line.replace(regex('player.lizardScore()'), 'lizardRaceScore(player)');
    line = line.replace(regex('player.spiderScore()'), 'spiderRaceScore(player)');
    line = line.replace(regex('player.horseScore()'), 'horseRaceScore(player)');
    line = line.replace(regex('player.kitsuneScore()'), 'kitsuneRaceScore(player)');
    line = line.replace(regex('player.dragonScore()'), 'dragonRaceScore(player)');
    line = line.replace(regex('player.goblinScore()'), 'goblinRaceScore(player)');
    line = line.replace(regex('player.gooScore()'), 'gooRaceScore(player)');
    line = line.replace(regex('player.nagaScore()'), 'nagaRaceScore(player)');
    line = line.replace(regex('player.bunnyScore()'), 'bunnyRaceScore(player)');
    line = line.replace(regex('player.harpyScore()'), 'harpyRaceScore(player)');
    line = line.replace(regex('player.kangaScore()'), 'kangarooRaceScore(player)');
    line = line.replace(regex('player.sharkScore()'), 'sharkRaceScore(player)');
    line = line.replace(regex('player.mutantScore()'), 'mutantRaceScore(player)');
    // OK - lactationQ
    // OK - isLactating
    line = line.replace(/player\.cuntChange\(([^,]+), ?([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3, p4) => `displayStretchVagina(player, ${p1}, ${p2}, ${p3}, ${p4})`);
    line = line.replace(/player\.cuntChange\(([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `displayStretchVagina(player, ${p1}, ${p2}, ${p3})`);
    line = line.replace(/player\.cuntChange\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `displayStretchVagina(player, ${p1}, ${p2})`);
    line = line.replace(/player\.buttChange\(([^,]+), ?([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3, p4) => `displayStretchButt(player, ${p1}, ${p2}, ${p3}, ${p4})`);
    line = line.replace(/player\.buttChange\(([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `displayStretchButt(player, ${p1}, ${p2}, ${p3})`);
    line = line.replace(/player\.buttChange\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `displayStretchButt(player, ${p1}, ${p2})`);
    line = line.replace(regex('player.buttChangeDisplay()'), 'stretchButtText(player)');
    // OK - slimeFeed
    // OK - minoCumAddiction
    line = line.replace(regex('player.hasSpells'), 'player.combat.hasSpells');
    line = line.replace(regex('player.spellCount'), 'player.combat.spellCount');
    line = line.replace(regex('player.hairDescript()'), 'describeHair(player)');
    line = line.replace(regex('player.shrinkTits()'), 'shrinkTits(player)');
    line = line.replace(regex('player.shrinkTits(true)'), 'shrinkTits(player, true)');
    line = line.replace(
        /player\.growTits\(([^,]+), ?([^,]+), ?([^,]+), ?([^\)]+)\)/g,
        (match, p1, p2, p3, p4) => {
            switch (p4) {
                case 1: return `growSmallestBreastRow(player, ${p1}, ${p2}, ${p3})`;
                case 2: return `growTopBreastRowDownwards(player, ${p1}, ${p2}, ${p3})`;
                case 3: return `growTopBreastRow(player, ${p1}, ${p2}, ${p3})`;
            }
        });
    line = line.replace(regex('player.minLust'), 'player.stats.minLust');
    line = line.replace(regex('player.minotaurAddicted'), 'minotaurAddicted');
    line = line.replace(regex('player.minotaurNeed'), 'minotaurNeed');
    // Remove - clearStatuses
    line = line.replace(regex('player.consumeItem'), 'player.inventory.items.consumeItem');
    // Unused - getLowestSlot
    line = line.replace(regex('player.hasItem'), 'player.inventory.items.has');
    line = line.replace(/player\.itemCount\(([^\)]+)\)/g, (match, p1) => `player.inventory.items.filter(Inventory.FilterName(${p1})).reduce(Inventory.TotalQuantity, 0)`);
    // Unused - roomInExistingStack
    line = line.replace(/player\.roomInExistingStack\(([^\)]+)\)/g, (match, p1) => `player.inventory.items.filter(Inventory.FilterName(${p1})).length`);
    // Unsed - itemSlot
    // Unsed - emptySlot
    line = line.replace(regex('player.destroyItems'), 'player.inventory.items.consumeItem');
    line = line.replace(/player\.lengthChange\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `displayLengthChange(player, ${p1}, ${p2})`);
    line = line.replace(/player\.killCocks\(([^\)]+)\)/, (match, p1) => `displayKillCocks(player, ${p1})`);
    // OK - modCumMultiplier
    line = line.replace(/player\.increaseCock\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `growCock(player, ${p1}, ${p2})`);
    line = line.replace(/player\.increaseEachCock\(([^\)]+)\)/g, (match, p1) => `growEachCock(player, ${p1})`);
    line = line.replace(regex('player.goIntoHeat(false)'), 'player.canGoIntoHeat()');
    line = line.replace(/player\.goIntoHeat\(true, ?([^\)]+)\)/g, (match, p1, p2) => `displayGoIntoHeat(player, ${p1})`);
    line = line.replace(regex('player.goIntoRut(false)'), 'player.canGoIntoRut()');
    line = line.replace(/player\.goIntoRut\(true, ?([^\)]+)\)/g, (match, p1, p2) => `displayGoIntoRut(player, ${p1})`);

    return line;
}

function fixCharacterClass(line: string): string {
    line = line.replace(regex('player.femininity'), 'player.body.feminity');
    line = line.replace(regex('player.beardLength'), 'player.body.beard.length');
    line = line.replace(regex('player.beardStyle'), 'player.body.beard.style');
    line = line.replace(regex('player.thickness'), 'player.body.thickness');
    line = line.replace(regex('player.tone'), 'player.body.tone');
    // Manual - pregnancyType
    // Manual - pregnancyIncubation
    // Manual - buttPregnancyType
    // Manual - buttPregnancyIncubation
    line = line.replace(regex('player.keyItems'), 'player.inventory.keyItems');
    line = line.replace(regex('player.faceDesc()'), 'describeFace(player)');
    line = line.replace(/player\.modFem\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `modFem(player, ${p1}, ${p2})`);
    line = line.replace(/player\.modFem\(([^\)]+)\)/g, (match, p1) => `modFem(player, ${p1})`);
    line = line.replace(/player\.modThickness\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `modThickness(player, ${p1}, ${p2})`);
    line = line.replace(/player\.modThickness\(([^\)]+)\)/g, (match, p1) => `modThickness(player, ${p1})`);
    line = line.replace(/player\.modTone\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `modTone(player, ${p1}, ${p2})`);
    line = line.replace(/player\.modTone\(([^\)]+)\)/g, (match, p1) => `modTone(player, ${p1})`);
    // OK - fixFemininity
    line = line.replace(regex('player.hasBeard'), 'player.body.beard.length > 0');
    line = line.replace(regex('player.beard()'), 'describeBeard(player)');
    line = line.replace(regex('player.skin()'), 'describeSkin(player)');
    line = line.replace(/player\.skin\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `describeSkin(player, ${p1}, ${p2})`);
    line = line.replace(/player\.skin\(([^\)]+)\)/g, (match, p1) => `describeSkin(player, ${p1})`);
    line = line.replace(regex('player.hasMuzzle()'), 'player.body.face.hasMuzzle()');
    line = line.replace(regex('player.face()'), 'describeFaceShort(player)');
    // OK - hasLongTail
    line = line.replace(regex('player.isPregnant()'), 'player.pregnancy.womb.isPregnant()');
    line = line.replace(regex('player.isButtPregnant()'), 'player.pregnancy.butt.isPregnant()');

    line = line.replace(/player\.knockUp\(([^,]+), ?([^,]+), ?([^,]+), ?1\)/g, (match, p1, p2, p3) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}), ${p3}, true)`);
    line = line.replace(/player\.knockUp\(([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}), ${p3})`);
    line = line.replace(/player\.knockUp\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}))`);
    line = line.replace(/player\.knockUpForce\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `player.pregnancy.womb.knockUp(new Pregnancy(${p1}, ${p2}), 0, true)`);

    line = line.replace(/player\.buttKnockUp\(([^,]+), ?([^,]+), ?([^\)]+), ?1\)/g, (match, p1, p2, p3) => `player.pregnancy.butt.knockUp(new Pregnancy(${p1}, ${p2}), ${p3}, true)`);
    line = line.replace(/player\.buttKnockUp\(([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.pregnancy.butt.knockUp(new Pregnancy(${p1}, ${p2}), ${p3})`);
    line = line.replace(/player\.buttKnockUp\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `player.pregnancy.butt.knockUp(new Pregnancy(${p1}, ${p2}))`);
    line = line.replace(/player\.buttKnockUpForce\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `player.pregnancy.butt.knockUp(new Pregnancy(${p1}, ${p2}), 0, true)`);
    // Remove - pregnancyAdvance
    // Remove - pregnancyUpdate

    line = line.replace(regex('player.createKeyItem'), 'player.inventory.keyItems.add');
    line = line.replace(/player\.removeKeyItem\((".+")\)/g, (match, p1) => `player.inventory.keyItems.remove(${p1})`);
    // Manual - addKeyValue
    line = line.replace(/player\.keyItemv([1-4])\((\w+)\)/g, (match, p1, p2) => `player.inventory.keyItems.get(${p2}).value${p1}`);
    // Unused - removeKeyItems
    line = line.replace(/player\.hasKeyItem\((["\w]+)\) ?< ?0/g, (match, p1) => `player.inventory.keyItems.has(${p1})`);
    line = line.replace(/player\.hasKeyItem\((["\w]+)\) ?>= ?1/g, (match, p1) => `!player.inventory.keyItems.has(${p1})`);

    // Unknown - viridianChange
    line = line.replace(regex('player.hasKnot()'), 'player.body.cocks.get(0).hasKnot()');
    line = line.replace(/player\.hasKnot\(([^\)]+)\)/g, (match, p1) => `player.body.cocks.get(${p1}).hasKnot()`);
    line = line.replace(regex('player.maxHP()'), 'player.stats.maxHP');
    line = line.replace(regex('player.buttDescript()'), 'describeButt(player)');

    return line;
}

function fixCreatureClass(line: string): string {
    line = line.replace(regex('player.short'), 'player.desc.name');
    line = line.replace(/player\.a([^\w])/, (match, p1) => `player.desc.a${p1}`);
    line = line.replace(regex('player.capitalA'), 'player.desc.capitalA');

    line = line.replace(regex('player.weaponName'), 'player.inventory.equipment.weapon.displayName');
    line = line.replace(regex('player.weaponVerb'), 'player.inventory.equipment.weapon.verb');
    // This is for the calcuated attack, not weapon attack
    // Manual - assignment
    line = line.replace(regex('player.weaponAttack'), 'player.combat.stats.weaponAttack');
    // Unknown - weaponPerk
    line = line.replace(regex('player.weaponValue'), 'player.inventory.equipment.weapon.value');

    line = line.replace(regex('player.armorName'), 'player.inventory.equipment.armor.displayName');
    line = line.replace(regex('player.armorVerb'), 'player.inventory.equipment.armor.verb');
    // This is for the calcuated defense, not armor defense
    // Manual - assignment
    line = line.replace(regex('player.armorDef'), 'player.combat.stats.defense');
    // Unknown - armorPerk
    line = line.replace(regex('player.armorValue'), 'player.inventory.equipment.armor.value');

    line = line.replace(regex('player.str'), 'player.stats.str');
    line = line.replace(regex('player.tou'), 'player.stats.tou');
    line = line.replace(regex('player.spe'), 'player.stats.spe');
    line = line.replace(regex('player.inte'), 'player.stats.int');
    line = line.replace(regex('player.lib'), 'player.stats.lib');
    line = line.replace(regex('player.sens'), 'player.stats.sens');
    line = line.replace(regex('player.cor'), 'player.stats.cor');
    line = line.replace(regex('player.fatigue'), 'player.stats.fatigue');

    line = line.replace(regex('player.HP'), 'player.stats.HP');
    line = line.replace(regex('player.lust'), 'player.stats.lust');

    line = line.replace(regex('player.XP'), 'player.stats.XP');
    line = line.replace(regex('player.level'), 'player.stats.level');
    line = line.replace(regex('player.gems'), 'player.inventory.gems');
    line = line.replace(regex('player.additionalXP'), 'player.stats.additionalXP');

    // OK - gender
    line = line.replace(regex('player.tallness'), 'player.body.tallness');

    line = line.replace(regex('player.hairType'), 'player.body.hair.type');
    line = line.replace(regex('player.hairColor'), 'player.body.hair.color');
    line = line.replace(regex('player.hairLength'), 'player.body.hair.length');

    line = line.replace(regex('player.skinType'), 'player.body.skin.type');
    line = line.replace(regex('player.skinTone'), 'player.body.skin.tone');
    line = line.replace(regex('player.skinDesc'), 'player.body.skin.desc');
    line = line.replace(regex('player.skinAdj'), 'player.body.skin.adj');

    line = line.replace(regex('player.faceType'), 'player.body.face.type');

    line = line.replace(regex('player.earType'), 'player.body.ear.type');
    line = line.replace(regex('player.earValue'), 'player.body.ear.value');

    line = line.replace(regex('player.hornType'), 'player.body.horn.type');
    line = line.replace(regex('player.horns'), 'player.body.horn.amount');

    line = line.replace(regex('player.wingType'), 'player.body.wing.type');
    line = line.replace(regex('player.wingDesc'), 'player.body.wing.desc');

    line = line.replace(regex('player.lowerBody'), 'player.body.legs.type');

    line = line.replace(regex('player.tailType'), 'player.body.tail.type');
    line = line.replace(regex('player.tailVenom'), 'player.body.tail.venom');
    line = line.replace(regex('player.tailRecharge'), 'player.body.tail.recharge');

    line = line.replace(regex('player.hipRating'), 'player.body.hips.rating');
    line = line.replace(regex('player.buttRating'), 'player.body.butt.rating');

    // Manual - nipplesPierced
    // Manual - nipplesPShort
    // Manual - nipplesPLong
    line = line.replace(regex('player.lipPierced'), 'player.inventory.equipment.piercings.lip.isEquiped()');
    line = line.replace(regex('player.lipPShort'), 'player.inventory.equipment.piercings.lip.item.shortDesc');
    line = line.replace(regex('player.lipPLong'), 'player.inventory.equipment.piercings.lip.item.longDesc');
    line = line.replace(regex('player.tonguePierced'), 'player.inventory.equipment.piercings.tongue.isEquipped()');
    line = line.replace(regex('player.tonguePShort'), 'player.inventory.equipment.piercings.tongue.item.shortDesc');
    line = line.replace(regex('player.tonguePLong'), 'player.inventory.equipment.piercings.tongue.item.longDesc');
    line = line.replace(regex('player.eyebrowPierced'), 'player.inventory.equipment.piercings.eyebrow.isEquipped()');
    line = line.replace(regex('player.eyebrowPShort'), 'player.inventory.equipment.piercings.eyebrow.item.shortDesc');
    line = line.replace(regex('player.eyebrowPLong'), 'player.inventory.equipment.piercings.eyebrow.item.longDesc');
    line = line.replace(regex('player.earsPierced'), 'player.inventory.equipment.piercings.isEquipped()');
    line = line.replace(regex('player.earsPShort'), 'player.inventory.equipment.piercings.item.shortDesc');
    line = line.replace(regex('player.earsPLong'), 'player.inventory.equipment.piercings.item.longDesc');
    line = line.replace(regex('player.nosePierced'), 'player.inventory.equipment.piercings.isEquipped()');
    line = line.replace(regex('player.nosePShort'), 'player.inventory.equipment.piercings.item.shortDesc');
    line = line.replace(regex('player.nosePLong'), 'player.inventory.equipment.piercings.item.longDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.labiaPierced/g, 'player.inventory.equipment.piercings.labia.isEquipped()');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.labiaPShort/g, 'player.inventory.equipment.piercings.labia.item.shortDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.labiaPLong/g, 'player.inventory.equipment.piercings.labia.item.longDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.clitPierced/g, 'player.inventory.equipment.piercings.clit.isEquipped()');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.clitPShort/g, 'player.inventory.equipment.piercings.clit.item.shortDesc');
    line = line.replace(/player\.vaginas\[([^\]]+)\]\.clitPLong/g, 'player.inventory.equipment.piercings.clit.item.longDesc');
    line = line.replace(/player\.cocks\[([^\]]+)\]\.isPierced/g, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).isEquipped()`);
    line = line.replace(/player\.cocks\[([^\]]+)\]\.pShortDesc/g, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).item.shortDesc`);
    line = line.replace(/player\.cocks\[([^\]]+)\]\.pLongDesc/g, (match, p1) => `player.inventory.equipment.piercings.cocks.get(${p1}).item.longDesc`);

    line = line.replace(regex('player.antennae'), 'player.body.antennae.type');
    line = line.replace(regex('player.eyeType'), 'player.body.eyes.type');
    line = line.replace(regex('player.tongueType'), 'player.body.tongue.type');
    line = line.replace(regex('player.armType'), 'player.body.arms.type');
    line = line.replace(regex('player.gills'), 'player.body.gills');
    line = line.replace(regex('player.cocks'), 'player.body.cocks');
    line = line.replace(regex('player.balls'), 'player.body.balls.amount');
    // OK - cumMultiplier
    line = line.replace(regex('player.ballSize'), 'player.body.balls.size');
    // OK - hoursSinceCum
    line = line.replace(regex('player.vaginas'), 'player.body.vaginas');
    line = line.replace(regex('player.fertility'), 'player.body.fertility');
    line = line.replace(regex('player.clitLength'), 'player.body.clit.length');
    // Manual - nippleLength
    line = line.replace(regex('player.breastRows'), 'player.body.chest');
    line = line.replace(regex('player.ass'), 'player.body.butt');
    // Unused - perk()
    // Unused - perks()
    line = line.replace(regex('player.numPerks'), 'player.perks.length');
    line = line.replace(regex('player.statusAffects'), 'player.effects');

    // OK - orgasm()
    line = line.replace(regex('player.createPerk'), 'player.perks.add');
    line = line.replace(regex('player.removePerk'), 'player.perks.remove');
    line = line.replace(/player\.findPerk\(([\w.]+)\) ?>= ?0/g, (match, p1) => `player.perks.has(${p1})`);
    line = line.replace(/player\.findPerk\(([\w.]+)\) ?< ?0/g, (match, p1) => `!player.perks.has(${p1})`);
    // Unused - perkDuplicated
    // Unused - removePerks
    line = line.replace(/player\.addPerkValue\(([\w.]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.perks.get(${p1}).value${p2} += ${p3}`);
    line = line.replace(/player\.setPerkValue\(([\w.]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.perks.get(${p1}).value${p2} = ${p3}`);
    line = line.replace(/player\.perkv([1-4])\(([\w.]+)\)/g, (match, p1, p2) => `player.perks.get(${p2}).value${p1}`);

    line = line.replace(regex('player.createStatusAffect'), 'player.effects.add');
    line = line.replace(regex('player.removeStatusAffect'), 'player.effects.remove');
    line = line.replace(/player\.findStatusAffect\(([\w.]+)\) ?>= ?0/g, (match, p1) => `player.effects.has(${p1})`);
    line = line.replace(/player\.findStatusAffect\(([\w.]+)\) ?< ?0/g, (match, p1) => `!player.effects.has(${p1})`);
    line = line.replace(/player\.changeStatusAffectValue\(([\w.]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.effects.get(${p1}).value${p2} = ${p3}`);
    line = line.replace(/player\.addStatusAffectValue\(([\w.]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.effects.get(${p1}).value${p2} += ${p3}`);
    line = line.replace(/player\.statusAffect\(([\w\d]+)\)/g, (match, p1) => `player.effects.get(${p1})`);
    line = line.replace(/player\.statusAffectv([1-4])\(([\w.]+)\)/g, (match, p1, p2) => `player.effects.get(${p2}).value${p1}`);
    // Unused - removeStatuses
    line = line.replace(regex('player.biggestTitSize()'), 'player.body.chest.sort(BreastRow.LargestRating)[0].rating');
    line = line.replace(/player\.cockArea\(([\w\d]+)\)/g, (match, p1) => `player.body.cocks.get(${p1}).area`);
    line = line.replace(regex('player.biggestCockLength()'), 'player.body.cocks.sort(Cock.Largest)[0].length');
    line = line.replace(regex('player.biggestCockArea()'), 'player.body.cocks.sort(Cock.Largest)[0].area');
    line = line.replace(regex('player.biggestCockArea2()'), 'player.body.cocks.sort(Cock.Largest)[1].area');
    line = line.replace(regex('player.cocks[player.longestCock()]'), 'player.body.cocks.sort(Cock.Longest)[0]');
    line = line.replace(regex('player.longestCock()'), 'player.body.cocks.sort(Cock.Longest)[0]');
    line = line.replace(regex('player.longestCockLength()'), 'player.body.cocks.sort(Cock.Longest)[0].length');
    line = line.replace(regex('player.longestHorseCockLength()'), 'player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).sort(Cock.Longest)[0].length');
    // Unknown - twoDickRadarSpecial()
    line = line.replace(regex('player.totalCockThickness()'), 'player.body.cocks.reduce(Cock.TotalThickness, 0)');
    line = line.replace(regex('player.cocks[player.thickestCock()]'), 'player.body.cocks.sort(Cock.Thickest)[0]');
    line = line.replace(regex('player.thickestCock()'), 'player.body.cocks.sort(Cock.Thickest)[0]');
    line = line.replace(regex('player.thickestCockThickness()'), 'player.body.cocks.sort(Cock.Thickest)[0].thickness');
    line = line.replace(regex('player.cocks[player.thinnestCockIndex()]'), 'player.body.cocks.sort(Cock.Thinnest)[0]');
    line = line.replace(regex('player.thinnestCockIndex()'), 'player.body.cocks.sort(Cock.Thinnest)[0]');
    line = line.replace(regex('player.cocks[player.smallestCockIndex()]'), 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace(regex('player.smallestCockIndex()'), 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace(regex('player.smallestCockLength()'), 'player.body.cocks.sort(Cock.Smallest)[0].length');
    line = line.replace(regex('player.cocks[player.shortestCockIndex()]'), 'player.body.cocks.sort(Cock.Shortest)[0]');
    line = line.replace(regex('player.shortestCockIndex()'), 'player.body.cocks.sort(Cock.Shortest)[0]');
    line = line.replace(regex('player.shortestCockLength()'), 'player.body.cocks.sort(Cock.Shortest)[0].length');
    line = line.replace(
        /player\.cockThatFits\(([\w\d]+), ?("area"|"length")\)([ ><=\d]+)/g,
        (match, p1, p2, p3) =>
            p2 === "area" ?
                `${/ ?< ?\d/.test(p3) ? '!' : ''}player.body.cocks.find(Cock.CockThatFits(${p1}))` :
                `${/ ?< ?\d/.test(p3) ? '!' : ''}player.body.cocks.find(Cock.CockThatFitsLength(${p1}))`
    );
    line = line.replace(
        /player\.cockThatFits\(([\w\d]+)\)([ ><=\d]+)/g,
        (match, p1, p2) =>
            `${/ ?< ?\d/.test(p2) ? '!' : ''}player.body.cocks.find(Cock.CockThatFits(${p1}))`
    );
    line = line.replace(
        /player\.cockThatFits\((monster\.\w+\(\))\)([ ><=\d]+)/g,
        (match, p1, p2) =>
            `${/ ?< ?\d/.test(p2) ? '!' : ''}player.body.cocks.find(Cock.CockThatFits(${p1}))`
    );
    line = line.replace(
        /player\.cockThatFits2\(([\w\d]+)\)([ ><=\d]+)/g,
        (match, p1, p2) =>
            `${/ ?< ?\d/.test(p2) ? '!' : ''}player.body.cocks.find(Cock.CockThatFits(${p1}))`
    );
    line = line.replace(regex('player.smallestCockArea()'), 'player.body.cocks.sort(Cock.Smallest)[0].area');
    line = line.replace(regex('player.cocks[player.smallestCock()]'), 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace(regex('player.smallestCock()'), 'player.body.cocks.sort(Cock.Smallest)[0]');
    line = line.replace(regex('player.cocks[player.biggestCockIndex()]'), 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace(regex('player.biggestCockIndex()'), 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace(regex('player.cocks[player.biggestCockIndex2()]'), 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace(regex('player.biggestCockIndex2()'), 'player.body.cocks.sort(Cock.Largest)[0]');
    line = line.replace(regex('player.cocks[player.smallestCockIndex2()]'), 'player.body.cocks.sort(Cock.Smallest)[1]');
    line = line.replace(regex('player.smallestCockIndex2()'), 'player.body.cocks.sort(Cock.Smallest)[1]');
    line = line.replace(regex('player.cocks[player.biggestCockIndex3()]'), 'player.body.cocks.sort(Cock.Largest)[2]');
    line = line.replace(regex('player.biggestCockIndex3()'), 'player.body.cocks.sort(Cock.Largest)[2]');
    line = line.replace(regex('player.cockDescript()'), 'describeCock(player, player.body.cocks.get(0)');
    line = line.replace(/player\.cockDescript\((\w+)\)/g, (match, p1) => `describeCock(player, ${p1})`);
    line = line.replace(regex('player.cockAdjective()'), 'describeCockAdj(player, player.body.cocks.get(0)');
    line = line.replace(/player\.cockAdjective\((\w+)\)/g, (match, p1) => `describeCockAdj(player, ${p1})`);
    line = line.replace(regex('player.wetness()'), 'player.body.vaginas.get(0).wetness');
    // Manual - vaginaType()
    line = line.replace(regex('player.looseness()'), 'player.body.vaginas.get(0).looseness');
    line = line.replace(regex('player.looseness(true)'), 'player.body.vaginas.get(0).looseness');
    line = line.replace(regex('player.looseness(false)'), 'player.body.butt.looseness');
    // OK - vaginalCapacity()
    // OK - analCapacity()
    line = line.replace(regex('player.hasFuckableNipples()'), 'player.body.chest.find(BreastRow.FuckableNipples)');
    line = line.replace(regex('!player.hasBreasts()'), 'player.body.chest.length <= 0');
    line = line.replace(regex('player.hasBreasts()'), 'player.body.chest.length > 0');
    // Unused - hasNipples()
    // OK - lactationSpeed()
    line = line.replace(regex('player.dogScore()'), 'dogRaceScore(player)');
    line = line.replace(regex('player.foxScore()'), 'foxRaceScore(player)');
    line = line.replace(regex('player.biggestLactation()'), 'player.body.chest.sort(BreastRow.LargestLacation)[0].lactationMultiplier');
    // OK - milked()
    line = line.replace(/player\.boostLactation\(([^\(]+)\)/g, (match, p1) => `boostLactation(player, ${p1})`);
    line = line.replace(regex('player.averageLactation()'), 'player.body.chest.reduce(BreastRow.AverageLactation, 0)');
    // OK - virilityQ()
    // OK - cumQ()
    line = line.replace(/player\.countCocksOfType\(([^\)]+)\)/g, (match, p1) => `player.body.cocks.filter(Cock.FilterType(${p1})).length`);
    line = line.replace(regex('player.anemoneCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.ANEMONE)).length');
    line = line.replace(regex('player.catCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.CAT)).length');
    line = line.replace(regex('player.demonCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.DEMON)).length');
    line = line.replace(regex('player.displacerCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.DISPLACER)).length');
    line = line.replace(regex('player.dogCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.DOG)).length');
    line = line.replace(regex('player.dragonCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.DRAGON)).length');
    line = line.replace(regex('player.foxCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.FOX)).length');
    line = line.replace(regex('player.horseCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length');
    line = line.replace(regex('player.kangaCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.KANGAROO)).length');
    line = line.replace(regex('player.lizardCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.LIZARD)).length');
    line = line.replace(regex('player.tentacleCocks()'), 'player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length');
    // Unused - findFirstCockType()
    // Unused - addHorseCock()
    line = line.replace(regex('player.cockTotal()'), 'player.body.cocks.length');
    line = line.replace(regex('player.totalCocks()'), 'player.body.cocks.length');
    line = line.replace(regex('!player.hasCock()'), 'player.body.cocks.length <= 0');
    line = line.replace(regex('player.hasCock()'), 'player.body.cocks.length > 0');
    // Manual - hasSockRoom()
    // Manual - hasSock()
    // Manual - countCockSocks()
    // OK - canAutoFellate()
    // OK - canFly()
    line = line.replace(regex('!player.hasVagina()'), 'player.body.vaginas.length <= 0');
    line = line.replace(regex('player.hasVagina()'), 'player.body.vaginas.length > 0');
    line = line.replace(regex('player.hasVirginVagina()'), 'player.body.vaginas.find(Vagina.Virgin)');
    // Manual - genderText
    line = line.replace(regex('player.manWoman()'), 'manWoman(player)');
    line = line.replace(regex('player.manWoman(true)'), 'manWoman(player, true)');
    line = line.replace(regex('player.manWoman(false)'), 'manWoman(player, false)');
    line = line.replace(regex('player.guyGirl()'), 'guyGirl(player)');
    line = line.replace(regex('player.guyGirl(true)'), 'guyGirl(player, true)');
    line = line.replace(regex('player.guyGirl(false)'), 'guyGirl(player, false)');
    line = line.replace(/player\.mfn\(([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `mfn(player, ${p1}, ${p2}, ${p3})`);
    line = line.replace(/player\.mf\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `mf(player, ${p1}, ${p2})`);
    line = line.replace(regex('player.boyGirl()'), 'boyGirl(player)');
    line = line.replace(regex('player.boyGirl(true)'), 'boyGirl(player, true)');
    line = line.replace(regex('player.boyGirl(false)'), 'boyGirl(player, false)');
    line = line.replace(regex('player.heShe()'), 'heShe(player)');
    line = line.replace(regex('player.heShe(true)'), 'heShe(player, true)');
    line = line.replace(regex('player.heShe(false)'), 'heShe(player, false)');
    line = line.replace(regex('player.himHer()'), 'himHer(player)');
    line = line.replace(regex('player.himHer(true)'), 'himHer(player, true)');
    line = line.replace(regex('player.himHer(false)'), 'himHer(player, false)');
    line = line.replace(regex('player.maleFemale()'), 'maleFemale(player)');
    line = line.replace(regex('player.maleFemale(true)'), 'maleFemale(player, true)');
    line = line.replace(regex('player.maleFemale(false)'), 'maleFemale(player, false)');
    line = line.replace(regex('player.hisHer()'), 'hisHer(player)');
    line = line.replace(regex('player.hisHer(true)'), 'hisHer(player, true)');
    line = line.replace(regex('player.hisHer(false)'), 'hisHer(player, false)');
    line = line.replace(regex('player.sirMadam()'), 'sirMadam(player)');
    line = line.replace(regex('player.sirMadam(true)'), 'sirMadam(player, true)');
    line = line.replace(regex('player.sirMadam(false)'), 'sirMadam(player, false)');
    line = line.replace(/player\.createCock\(([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.body.cocks.add(new Cock(${p1}, ${p2}, ${p3}))`);
    line = line.replace(/player\.createCock\(([^,]+), ?([^\)]+)\)/g, (match, p1, p2) => `player.body.cocks.add(new Cock(${p1}, ${p2}))`);
    line = line.replace(/player\.createCock\(([^\)]+)\)/g, (match, p1) => `player.body.cocks.add(new Cock(${p1}))`);
    line = line.replace(regex('player.createCock()'), 'player.body.cocks.add(new Cock())');
    line = line.replace(/player\.createVagina\(([^,]+), ?([^,]+), ?([^\)]+)\)/g, (match, p1, p2, p3) => `player.body.vaginas.add(new Vagina(${p2}, ${p3}, ${p1}))`);
    // Manual - createVagina(virgin, vaginalWetness)
    // Manual - createVagina(virgin)
    line = line.replace(regex('player.createVagina()'), 'player.body.vaginas.add(new Vagina())');
    // Manual - createBreastRow(size, nipplesPerBreast)
    line = line.replace(/player\.createBreastRow\(([^\)]+)\)/g, (match, p1) => `player.body.chest.add(new BreastRow(${p1}))`);
    line = line.replace(regex('player.createBreastRow()'), 'player.body.chest.add(new BreastRow())');
    // Remove - genderCheck
    line = line.replace(regex('player.genderCheck();'), '');
    line = line.replace(
        /player\.removeCock\(([^,]+), ?([^\)]+)\)/g,
        (match, p1, p2) => p2 === 1 ?
            `player.body.cocks.remove(${p1})` :
            trimLeft`for (let cockIndex = 0; cockIndex < ${p2}; cockIndex++)
                player.body.cocks.remove(${p1} + cockIndex)`
    );
    line = line.replace(
        /player\.removeVagina\(([^,]+), ?([^\)]+)\)/g,
        (match, p1, p2) => p2 === 1 ?
            `player.body.vaginas.remove(${p1})` :
            trimLeft`for (let vagIndex = 0; vagIndex < ${p2}; vagIndex++)
                player.body.vaginas.remove(${p1} + vagIndex)`
    );
    line = line.replace(/player\.removeVagina\(([^\)]+)\)/g, (match, p1) => `player.body.vaginas.remove(${p1})`);
    line = line.replace(regex('player.removeVagina()'), 'player.body.vaginas.remove(0)');
    line = line.replace(
        /player\.removeBreastRow\(([^,]+), ?([^\)]+)\)/g,
        (match, p1, p2) => p2 === 1 ?
            `player.body.chest.remove(${p1})` :
            trimLeft`for (let breastRowIndex = 0; breastRowIndex < ${p2}; breastRowIndex++)
                player.body.chest.remove(${p1} + breastRowIndex)`
    );
    // Remove - fixFuckingCockTypesEnum
    line = line.replace(/player\.buttChangeNoDisplay\(([^\)]+)\)/g, (match, p1) => `stretchButt(player, ${p1})`);
    line = line.replace(/player\.cuntChangeNoDisplay\(([^\)]+)\)/g, (match, p1) => `stretchVagina(player, ${p1})`);
    line = line.replace(regex('player.inHeat()'), 'player.effects.has(Effect.Heat)');
    line = line.replace(regex('player.inRut()'), 'player.effects.has(Effect.Rut)');
    // OK - bonusFertility
    // OK - totalFertility
    line = line.replace(regex('player.isBiped()'), 'player.body.legs.isBiped()');
    line = line.replace(regex('player.isNaga()'), 'player.body.legs.isNaga()');
    line = line.replace(regex('player.isTaur()'), 'player.body.legs.isTaur()');
    line = line.replace(regex('player.isDrider()'), 'player.body.legs.isDrider()');
    line = line.replace(regex('player.isGoo()'), 'player.body.legs.isGoo()');
    line = line.replace(regex('player.legs()'), 'describeLegs(player)');
    line = line.replace(regex('player.skinFurScales()'), 'skinFurScales(player)');
    line = line.replace(regex('player.leg()'), 'describeLeg(player)');
    line = line.replace(regex('player.feet()'), 'describeFeet(player)');
    line = line.replace(regex('player.foot()'), 'describeFoot(player)');
    // Manual - canOvipositSpider
    // Manual - canOvipositBee
    line = line.replace(regex('player.canOviposit()'), 'player.pregnancy.ovipositor.canOviposit()');
    line = line.replace(regex('player.eggs()'), 'player.pregnancy.ovipositor.eggs');
    // Unused - addEggs
    line = line.replace(regex('player.dumpEggs()'), 'player.pregnancy.ovipositor.dumpEggs()');
    line = line.replace(regex('player.dumpEggs()'), 'player.pregnancy.ovipositor.dumpEggs()');
    // Unused - setEggs
    line = line.replace(regex('player.fertilizedEggs()'), 'player.pregnancy.ovipositor.fertilizedEggs');
    line = line.replace(regex('player.fertilizeEggs()'), 'player.pregnancy.ovipositor.fertilizeEggs()');
    line = line.replace(/player\.breastCup\(([^\)]+)\)/g, (match, p1) => `breastCup(player.body.chest.get(${p1}))`);
    line = line.replace(regex('player.bRows()'), 'player.body.chest.length');
    line = line.replace(regex('player.totalBreasts()'), 'player.body.chest.reduce(BreastRow.TotalBreasts, 0)');
    line = line.replace(regex('player.totalNipples()'), 'player.body.chest.reduce(BreastRow.TotalNipples, 0)');
    line = line.replace(regex('player.smallestTitSize()'), 'player.body.chest.sort(BreastRow.Smallest)[0].rating');
    line = line.replace(regex('player.smallestTitRow()'), 'player.body.chest.sort(BreastRow.Smallest)[0]');
    line = line.replace(regex('player.biggestTitRow()'), 'player.body.chest.sort(BreastRow.Biggest)[0]');
    line = line.replace(regex('player.averageBreastSize()'), 'player.body.chest.reduce(BreastRow.AverageSize, 0)');
    line = line.replace(regex('player.averageCockThickness()'), 'player.body.cocks.reduce(Cock.AverageThickness, 0)');
    line = line.replace(regex('player.averageNippleLength()'), 'player.body.chest.reduce(BreastRow.AverageNippleLength, 0)');
    line = line.replace(regex('player.averageVaginalLooseness()'), 'player.body.vaginas.reduce(Vagina.AverageLooseness, 0)');
    line = line.replace(regex('player.averageVaginalWetness()'), 'player.body.vaginas.reduce(Vagina.AverageWetness, 0)');
    line = line.replace(regex('player.averageCockLength()'), 'player.body.cock.reduce(Cock.AverageLength, 0)');
    line = line.replace(regex('player.canTitFuck()'), 'player.body.chest.find(BreastRow.Fuckable)');
    line = line.replace(regex('player.mostBreastsPerRow()'), 'player.body.chest.sort(BreastRow.MostBreastsCount)[0].length');
    line = line.replace(regex('player.averageNipplesPerBreast()'), 'player.body.chest.reduce(BreastRow.AverageNipplesPerBreast, 0)');
    line = line.replace(regex('player.allBreastsDescript()'), 'describeAllBreasts(player)');
    line = line.replace(regex('player.sMultiCockDesc()'), 'describeOneOfYourCocks(player)');
    line = line.replace(regex('player.SMultiCockDesc()'), 'describeOneOfYourCocksCap(player)');
    line = line.replace(regex('player.oMultiCockDesc()'), 'describeEachOfYourCocks(player)');
    line = line.replace(regex('player.OMultiCockDesc()'), 'describeEachOfYourCocksCap(player)');
    line = line.replace(regex('player.cockMultiLDescriptionShort()'), 'describeCocksShort(player)');
    line = line.replace(regex('player.hasSheath()'), 'player.body.cocks.find(Cock.Sheathed)');
    line = line.replace(regex('player.sheathDescription()'), 'describeSheath(player)');
    line = line.replace(regex('player.vaginaDescript()'), 'describeVagina(player, player.body.vagina.get(0))');
    line = line.replace(/player\.vaginaDescript\(([^\)]+)\)/g, (match, p1) => `describeVagina(player, player.body.vagina.get(${p1}))`);
    line = line.replace(/player\.nippleDescript\(([^\)]+)\)/g, (match, p1) => `describeNipple(player, player.body.chest.get(${p1}))`);
    line = line.replace(regex('player.chestDesc()'), 'describeChest(player)');
    line = line.replace(regex('player.allChestDesc()'), 'describeEntireChest(player)');
    line = line.replace(regex('player.clitDescript()'), 'describeClit(player.body.clit)');
    line = line.replace(regex('player.cockHead()'), 'describeCockHead(player.body.cocks.get(0))');
    line = line.replace(/player\.cockHead\(([^\)]+)\)/g, (match, p1) => `describeCockHead(player.body.cocks.get(${p1}))`);
    line = line.replace(regex('player.cockDescriptShort()'), 'describeCockShort(player.body.cocks.get(0))');
    line = line.replace(/player\.cockDescriptShort\(([^\)]+)\)/g, (match, p1) => `describeCockShort(player.body.cocks.get(${p1}))`);
    line = line.replace(regex('player.assholeOrPussy()'), 'assholeOrPussy(player)');
    line = line.replace(regex('player.multiCockDescriptLight()'), 'describeCocksLight(player)');
    line = line.replace(regex('player.multiCockDescript()'), 'describeCocks(player)');
    line = line.replace(regex('player.ballsDescriptLight()'), 'describeBalls(true, true, player)');
    line = line.replace(regex('player.ballsDescriptLight(true)'), 'describeBalls(true, true, player)');
    line = line.replace(regex('player.ballsDescriptLight(false)'), 'describeBalls(false, true, player)');
    line = line.replace(regex('player.sackDescript()'), 'describeBallsack(player)');
    line = line.replace(/player\.breastDescript\(([^\)]+)\)/g, (match, p1) => `describeBreastRow(player.body.chest.get(${p1}))`);
    line = line.replace(/player\.breastSize\(([^\)]+)\)/g, (match, p1) => `describeBreastRowRating(${p1})`);
    return line;
}
