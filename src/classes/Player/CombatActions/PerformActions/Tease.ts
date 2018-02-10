import BreastRow from '../../../Body/BreastRow';
import Cock, { CockType } from '../../../Body/Cock';
import { Gender } from '../../../Body/GenderIdentity';
import Tail, { TailType } from '../../../Body/Tail';
import Vagina from '../../../Body/Vagina';
import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import CombatAction from '../../../Combat/Actions/CombatAction';
import BallsDescriptor from '../../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../../Descriptors/CockDescriptor';
import GenderDescriptor from '../../../Descriptors/GenderDescriptor';
import HeadDescriptor from '../../../Descriptors/HeadDescriptor';
import HipDescriptor from '../../../Descriptors/HipDescriptor';
import LegDescriptor from '../../../Descriptors/LegDescriptor';
import SkinDescriptor from '../../../Descriptors/SkinDescriptor';
import VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import DisplayText from '../../../display/DisplayText';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../../Game/Flags';
import Game from '../../../Game/Game';
import RaceScore from '../../../RaceScore';
import { Utils } from '../../../Utilities/Utils';

const enum TeaseType {
    ButtShake,                  // 0 butt shake
    BreastJiggle,               // 1 breast jiggle
    PussyFlash,                 // 2 pussy flash
    CockFlash,                  // 3 cock flash
    // ==BIMBO STUFF===
    BimboButtShake,             // 4 butt shake
    BimboBreastJiggle,          // 5 breast jiggle
    BimboPussyFlash,            // 6 pussy flash
    BimboSpecial,               // 7 special Adjatha-crafted bend over bimbo times
    // ==BRO STUFF=====
    BroPecDance,                // 8 Pec Dance
    BroHeroicPose,              // 9 Heroic Pose
    BroBulgyGroinThrust,        // 10 Bulgy groin thrust
    BroShowOffDick,             // 11 Show off dick
    // ==EXTRAS========
    CatFlexibility,             // 12 Cat flexibility.
    Pregnant,                   // 13 Pregnant
    BroodMother,                // 14 Brood Mother
    Nipplecunts,                // 15 Nipplecunts
    AnalGape,                   // 16 Anal gape
    BeeAbdomen,                 // 17 Bee abdomen tease
    DogTease,                   // 18 DOG TEASE
    MaxFemininity,              // 19 Maximum Femininity:
    MaxManliness,               // 20 Maximum MAN:
    PerfectAndrogyny,           // 21 Perfect Androgyny:
    SpirderSilk,                // 22 SPOIDAH SILK
    Rut,                        // 23 RUT
    Poledance,                  // 24 Poledance - req's staff! - Req's gender!  Req's TITS!
    TallTease,                  // 25 Tall Tease! - Reqs 2+ feet & PC Cunt!
    Smartness,                  // 26 SMART PEEPS! 70+ int, arouse spell!
    Feeder,                     // 27 - FEEDER
    ClothesFemaleTeacher,       // 28 FEMALE TEACHER COSTUME TEASE
    ClothesMaleTeacher,         // 29 Male Teacher Outfit Tease
    ClothesNagaFetish,          // 30 Naga Fetish Clothes
    ClothesCentaurHarness,      // 31 Centaur harness clothes
    ClothesGenderlessServant,   // 32 Genderless servant clothes
    ClothesCrotchRevealing,     // 33 Crotch Revealing Clothes (herm only?)
    ClothesMaid,                // 34 Maid Costume (female only):
    ClothesServantBoy,          // 35 Servant Boy Clothes (male only)
    ClothesBondagePatient,      // 36 Bondage Patient Clothes 
    Kitsune1,                   // 37 Kitsune Tease
    Kitsune2,                   // 38 Kitsune Tease
    Kitsune3,                   // 39 Kitsune Tease
    Kitsune4,                   // 40 Kitsune Tease
    KitsuneGendered,            // 41 Kitsune Gendered Tease
    Urta,                       // 42 Urta teases
    Cowgirl,                    // 43 Cowgirl teases
    ClothesBikiniMail,          // 44 Bikini Mail Tease

    MaxTeaseTypes,              // Max Tease Types - Used for choices array init
}

export default class Tease implements CombatAction {
    public name: string = "Tease";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Tease ? true : false;
    }
    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    private determineBaseDamage(character: Character): number {
        let damage: number = 6 + Utils.rand(3);
        if (character.perks.has(PerkType.SensualLover))
            damage += 2;
        if (character.perks.has(PerkType.Seduction))
            damage += 5;
        // + slutty armor bonus
        if (character.perks.has(PerkType.SluttySeduction))
            damage += character.perks.get(PerkType.SluttySeduction).value1;
        damage += character.stats.level;
        damage += character.teaseLevel * 2;
        return damage;
    }

    private determineBaseChance(character: Character): number {
        let chance: number = 0;
        chance = 60;
        // 5% chance for each tease level.
        chance += character.teaseLevel * 5;
        // 10% for seduction perk
        if (character.perks.has(PerkType.Seduction)) chance += 10;
        // 10% for sexy armor types
        if (character.perks.has(PerkType.SluttySeduction)) chance += 10;
        // 10% for bimbo shits
        if (character.perks.has(PerkType.BimboBody)) {
            chance += 10;
        }
        if (character.perks.has(PerkType.BroBody)) {
            chance += 10;
        }
        if (character.perks.has(PerkType.FutaForm)) {
            chance += 10;
        }
        // 2 & 2 for seductive valentines!
        if (character.perks.has(PerkType.SensualLover)) {
            chance += 2;
        }
        if (character.perks.has(PerkType.ChiReflowLust))
            chance += UmasShop.NEEDLEWORK_LUST_TEASE_MULTI;
        return chance;
    }

    private determineTeaseChoice(character: Character, monster: Character, bimbo: boolean, bro: boolean, futa: boolean) {
        const buttRating = character.torso.butt.rating;
        const largestBreastRating = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating;
        const hasVagina = character.torso.vaginas.count > 0;
        const vaginalWetness = character.torso.vaginas.get(0).wetness;
        const vaginalCapacity = character.vaginalCapacity();
        const cockCount = character.torso.cocks.count;
        const largestCockArea = character.torso.cocks.sort(Cock.LargestCockArea)[0].area;
        const choices: number[] = [];
        choices.length = TeaseType.MaxTeaseTypes;
        for (let index: number = 0; index < TeaseType.MaxTeaseTypes; index++)
            choices[index] = 0;

        if ((futa || bimbo) && character.gender === Gender.HERM) {
            // Once chance of butt.
            choices[TeaseType.BimboButtShake]++;
            // Big butts get more butt
            if (buttRating >= 7) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 10) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 14) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 20) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 25) choices[TeaseType.BimboButtShake]++;
            // Breast jiggle!
            if (largestBreastRating >= 2) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 4) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 8) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 15) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 30) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 50) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 75) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 100) choices[TeaseType.BimboBreastJiggle]++;
            // Pussy Flash!
            if (hasVagina) {
                choices[TeaseType.PussyFlash]++;
                if (vaginalWetness >= 3) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalWetness >= 5) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalCapacity >= 30) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalCapacity >= 60) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalCapacity >= 75) choices[TeaseType.BimboPussyFlash]++;
            }
            // Adj special!
            if (hasVagina && character.torso.butt.rating >= 8 && character.torso.hips.rating >= 6 && largestBreastRating >= 4) {
                choices[TeaseType.BimboSpecial] += 4;
            }
            // Cock flash!
            if (futa && character.torso.cocks.count > 0) {
                choices[TeaseType.BroBulgyGroinThrust]++;
                choices[TeaseType.BroShowOffDick]++;
                if (cockCount > 1) choices[TeaseType.BroBulgyGroinThrust]++;
                if (cockCount >= 2) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 10) choices[TeaseType.BroBulgyGroinThrust]++;
                if (largestCockArea >= 25) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 50) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 75) choices[TeaseType.BroBulgyGroinThrust]++;
                if (largestCockArea >= 100) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 300) choices[TeaseType.BroBulgyGroinThrust]++;
            }
        }
        else if (bro) {
            // 8 Pec Dance
            if (largestBreastRating < 1 && character.tone >= 60) {
                choices[TeaseType.BroPecDance]++;
                if (character.tone >= 70) choices[TeaseType.BroPecDance]++;
                if (character.tone >= 80) choices[TeaseType.BroPecDance]++;
                if (character.tone >= 90) choices[TeaseType.BroPecDance]++;
                if (character.tone === 100) choices[TeaseType.BroPecDance]++;
            }
            // 9 Heroic Pose
            if (character.tone >= 60 && character.stats.str >= 50) {
                choices[TeaseType.BroHeroicPose]++;
                if (character.tone >= 80) choices[TeaseType.BroHeroicPose]++;
                if (character.stats.str >= 70) choices[TeaseType.BroHeroicPose]++;
                if (character.tone >= 90) choices[TeaseType.BroHeroicPose]++;
                if (character.stats.str >= 80) choices[TeaseType.BroHeroicPose]++;
            }
            // Cock flash!
            if (character.torso.cocks.count > 0) {
                choices[TeaseType.BroBulgyGroinThrust]++;
                choices[TeaseType.BroShowOffDick]++;
                if (cockCount > 1) choices[TeaseType.BroBulgyGroinThrust]++;
                if (cockCount >= 2) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 10) choices[TeaseType.BroBulgyGroinThrust]++;
                if (largestCockArea >= 25) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 50) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 75) choices[TeaseType.BroBulgyGroinThrust]++;
                if (largestCockArea >= 100) choices[TeaseType.BroShowOffDick]++;
                if (largestCockArea >= 300) choices[TeaseType.BroBulgyGroinThrust]++;
            }
        }
        // VANILLA FOLKS
        else {
            // Once chance of butt.
            choices[TeaseType.ButtShake]++;
            // Big butts get more butt
            if (character.torso.butt.rating >= 7) choices[TeaseType.ButtShake]++;
            if (character.torso.butt.rating >= 10) choices[TeaseType.ButtShake]++;
            if (character.torso.butt.rating >= 14) choices[TeaseType.ButtShake]++;
            if (character.torso.butt.rating >= 20) choices[TeaseType.ButtShake]++;
            if (character.torso.butt.rating >= 25) choices[TeaseType.ButtShake]++;
            // Breast jiggle!
            if (largestBreastRating >= 2) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 4) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 8) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 15) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 30) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 50) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 75) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 100) choices[TeaseType.BreastJiggle]++;
            // Pussy Flash!
            if (hasVagina) {
                choices[TeaseType.PussyFlash]++;
                if (vaginalWetness >= 3) choices[TeaseType.PussyFlash]++;
                if (vaginalWetness >= 5) choices[TeaseType.PussyFlash]++;
                if (vaginalCapacity >= 30) choices[TeaseType.PussyFlash]++;
                if (vaginalCapacity >= 60) choices[TeaseType.PussyFlash]++;
                if (vaginalCapacity >= 75) choices[TeaseType.PussyFlash]++;
            }
            // Cock flash!
            if (character.torso.cocks.count > 0) {
                choices[TeaseType.CockFlash]++;
                if (cockCount > 1) choices[TeaseType.CockFlash]++;
                if (cockCount >= 2) choices[TeaseType.CockFlash]++;
                if (largestCockArea >= 10) choices[TeaseType.CockFlash]++;
                if (largestCockArea >= 25) choices[TeaseType.CockFlash]++;
                if (largestCockArea >= 50) choices[TeaseType.CockFlash]++;
                if (largestCockArea >= 75) choices[TeaseType.CockFlash]++;
                if (largestCockArea >= 100) choices[TeaseType.CockFlash]++;
                if (largestCockArea >= 300) choices[TeaseType.CockFlash]++;
            }
        }
        // ==EXTRAS========
        // 12 Cat flexibility.
        if (character.perks.has(PerkType.Flexibility) && character.torso.hips.legs.isBiped() && hasVagina) {
            choices[TeaseType.CatFlexibility] += 2;
            if (vaginalWetness >= 3) choices[TeaseType.CatFlexibility]++;
            if (vaginalWetness >= 5) choices[TeaseType.CatFlexibility]++;
            if (vaginalCapacity >= 30) choices[TeaseType.CatFlexibility]++;
        }
        // 13 Pregnant
        // if (character.pregnancyIncubation <= 216 && character.pregnancyIncubation > 0) {
        if (character.pregnancy.womb.isPregnant() || character.pregnancy.buttWomb.isPregnant()) {
            choices[TeaseType.Pregnant]++;
            const vagIncubationTime: number = character.pregnancy.womb.isPregnant() ? character.pregnancy.womb.pregnancy.incubation : 0;
            const buttIncubationTime: number = character.pregnancy.buttWomb.isPregnant() ? character.pregnancy.buttWomb.pregnancy.incubation : 0;
            const incubationTime: number = vagIncubationTime < buttIncubationTime ? vagIncubationTime : buttIncubationTime;
            if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 180) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 120) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 100) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 50) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
        }
        // 14 Brood Mother
        if (monster.torso.cocks.count > 0 && hasVagina && character.perks.has(PerkType.BroodMother) && !character.pregnancy.womb.isPregnant() && !character.pregnancy.buttWomb.isPregnant()) {
            choices[TeaseType.BroodMother] += 3;
            if (character.inHeat) choices[TeaseType.BroodMother] += 7;
        }
        // 15 Nipplecunts
        if (character.torso.chest.filter(BreastRow.FuckableNipples).length > 0) {
            choices[TeaseType.Nipplecunts] += 2;
            if (hasVagina) choices[TeaseType.Nipplecunts] += 3;
            if (vaginalWetness >= 3) choices[TeaseType.Nipplecunts]++;
            if (vaginalWetness >= 5) choices[TeaseType.Nipplecunts]++;
            if (largestBreastRating >= 3) choices[TeaseType.Nipplecunts]++;
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length >= 3) choices[TeaseType.Nipplecunts]++;
        }
        // 16 Anal gape
        if (character.torso.butt.looseness >= 4) {
            choices[TeaseType.AnalGape]++;
            if (character.torso.butt.looseness >= 5) choices[TeaseType.AnalGape]++;
        }
        // 17 Bee abdomen tease
        if (character.torso.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
            choices[TeaseType.BeeAbdomen] += 2;
        }
        // 18 DOG TEASE
        if (RaceScore.dogScore(character) >= 4 && hasVagina && character.torso.hips.legs.isBiped()) {
            choices[TeaseType.DogTease] += 2;
        }
        // 19 Maximum Femininity:
        if (character.femininity >= 100) {
            choices[TeaseType.MaxFemininity] += 3;
        }
        // 20 Maximum MAN:
        if (character.femininity <= 0) {
            choices[TeaseType.MaxManliness] += 3;
        }
        // 21 Perfect Androgyny:
        if (character.femininity === 50) {
            choices[TeaseType.PerfectAndrogyny] += 3;
        }
        // 22 SPOIDAH SILK
        if (character.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false)) {
            choices[TeaseType.SpirderSilk] += 3;
            if (RaceScore.spiderScore(character) >= 4) {
                choices[TeaseType.SpirderSilk] += 3;
            }
        }
        // 23 RUT
        if (character.inRut && monster.torso.vaginas.count > 0 && character.torso.cocks.count > 0) {
            choices[TeaseType.Rut] += 5;
        }
        // 24 Poledance - req's staff! - Req's gender!  Req's TITS!
        if (character.inventory.equipment.weapon.displayname === "wizard's staff" && largestBreastRating >= 1 && character.gender > 0) {
            choices[TeaseType.Poledance] += 5;
        }
        // 25 Tall Tease! - Reqs 2+ feet & PC Cunt!
        if (character.tallness - monster.tallness >= 24 && largestBreastRating >= 4) {
            choices[TeaseType.TallTease] += 5;
        }
        // 26 SMART PEEPS! 70+ int, arouse spell!
        if (character.stats.int >= 70 && character.statusAffects.has(StatusAffectType.KnowsArouse)) {
            choices[TeaseType.Smartness] += 3;
        }
        // 27 FEEDER
        if (character.perks.has(PerkType.Feeder) && largestBreastRating >= 4) {
            choices[TeaseType.Feeder] += 3;
            if (largestBreastRating >= 10) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 15) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 25) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 40) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 60) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 80) choices[TeaseType.Feeder]++;
        }
        // 28 FEMALE TEACHER COSTUME TEASE
        if (character.inventory.equipment.armor.displayName === "backless female teacher's clothes" && character.gender === 2) {
            choices[TeaseType.ClothesFemaleTeacher] += 4;
        }
        // 29 Male Teacher Outfit Tease
        if (character.inventory.equipment.armor.displayName === "formal vest, tie, and crotchless pants" && character.gender === 1) {
            choices[TeaseType.ClothesMaleTeacher] += 4;
        }
        // 30 Naga Fetish Clothes
        if (character.inventory.equipment.armor.displayName === "headdress, necklaces, and many body-chains") {
            choices[TeaseType.ClothesNagaFetish] += 4;
        }
        // 31 Centaur harness clothes
        if (character.inventory.equipment.armor.displayName === "bridle bit and saddle set") {
            choices[TeaseType.ClothesCentaurHarness] += 4;
        }
        // 32 Genderless servant clothes
        if (character.inventory.equipment.armor.displayName === "servant's clothes" && character.gender === 0) {
            choices[TeaseType.ClothesGenderlessServant] += 4;
        }
        // 33 Crotch Revealing Clothes (herm only?)
        if (character.inventory.equipment.armor.displayName === "crotch-revealing clothes" && character.gender === 3) {
            choices[TeaseType.ClothesCrotchRevealing] += 4;
        }
        // 34 Maid Costume (female only):
        if (character.inventory.equipment.armor.displayName === "maid's clothes" && hasVagina) {
            choices[TeaseType.ClothesMaid] += 4;
        }
        // 35 Servant Boy Clothes (male only)
        if (character.inventory.equipment.armor.displayName === "cute servant's clothes" && character.torso.cocks.count > 0) {
            choices[TeaseType.ClothesServantBoy] += 4;
        }
        // 36 Bondage Patient Clothes
        if (character.inventory.equipment.armor.displayName === "bondage patient clothes") {
            choices[TeaseType.ClothesBondagePatient] += 4;
        }
        // 37 Kitsune Tease
        // 38 Kitsune Tease
        // 39 Kitsune Tease
        // 40 Kitsune Tease
        if (RaceScore.kitsuneScore(character) >= 2 && character.torso.tails.reduce(Tail.HasType(TailType.FOX), false)) {
            choices[TeaseType.Kitsune1] += 4;
            choices[TeaseType.Kitsune2] += 4;
            choices[TeaseType.Kitsune3] += 4;
            choices[TeaseType.Kitsune4] += 4;
        }
        // 41 Kitsune Gendered Tease
        if (RaceScore.kitsuneScore(character) >= 2 && character.torso.tails.reduce(Tail.HasType(TailType.FOX), false)) {
            choices[TeaseType.KitsuneGendered] += 4;
        }
        // 42 Urta teases!
        if (urtaQuest.isUrta()) {
            choices[TeaseType.Urta] += 9;
        }
        // 43 - special mino + cowgirls
        if (character.torso.vaginas.count > 0 && character.lactationQ() >= 500 && largestBreastRating >= 6 && RaceScore.cowScore(character) >= 3 && character.torso.tails.reduce(Tail.HasType(TailType.COW), false)) {
            choices[TeaseType.Cowgirl] += 9;
        }
        // 44 - Bikini Mail Teases!
        if (character.torso.vaginas.count > 0 && largestBreastRating >= 4 && character.inventory.equipment.armor.displayName === "lusty maiden's armor") {
            choices[TeaseType.ClothesBikiniMail] += 15;
        }
        return this.selectChoice(choices);
    }

    private selectChoice(list: number[]): number {
        const randomChoice: number = Utils.rand(list.reduce((sum: number, value: number) => {
            return sum + value;
        }, 0));
        let counter = 0;
        for (let index = 0; index < list.length; index++) {
            if (counter + list[index] >= randomChoice)
                return index;
            counter += list[index];
        }
    }

    public use(character: Character, monster: Character): void {
        DisplayText().clear();
        // You cant tease a blind guy!
        if (monster.statusAffects.has(StatusAffectType.Blind)) {
            DisplayText("You do your best to tease " + monster.desc.a + monster.desc.short + " with your body.  It doesn't work - you blinded " + monster.desc.objectivePronoun + ", remember?\n\n");
            return;
        }
        if (character.statusAffects.has(StatusAffectType.Sealed) && character.statusAffects.get(StatusAffectType.Sealed).value2 === 1) {
            DisplayText("You do your best to tease " + monster.desc.a + monster.desc.short + " with your body.  Your artless twirls have no effect, as <b>your ability to tease is sealed.</b>\n\n");
            return;
        }
        if (monster.desc.short === "Sirius, a naga hypnotist") {
            DisplayText("He is too focused on your eyes to pay any attention to your teasing moves, <b>looks like you'll have to beat him up.</b>\n\n");
            return;
        }
        if (monster.stats.lustVuln === 0) {
            DisplayText().clear();
            DisplayText("You try to tease " + monster.desc.a + monster.desc.short + " with your body, but it doesn't have any effect on " + monster.desc.objectivePronoun + ".\n\n");
            return;
        }
        if (monster.desc.short === "worms") {
            DisplayText().clear();
            DisplayText("Thinking to take advantage of its humanoid form, you wave your cock and slap your ass in a rather lewd manner. However, the creature fails to react to your suggestive actions.\n\n");
            return;
        }
        fatigueRecovery();
        let bimbo: boolean = character.perks.has(PerkType.BimboBody) ? true : false;
        const bro: boolean = character.perks.has(PerkType.BroBody) ? true : false;
        const futa: boolean = character.perks.has(PerkType.FutaForm) ? true : false;
        let chance: number = this.determineBaseChance(character);
        let damage: number = this.determineBaseDamage(character);
        // 10% for bimbo shits
        if (bimbo || bro || futa) {
            damage += 5;
            bimbo = true;
        }

        // Tags used for bonus damage and chance later on
        let breasts: boolean = false;
        let penis: boolean = false;
        const balls: boolean = false;
        let vagina: boolean = false;
        let anus: boolean = false;
        let ass: boolean = false;
        // If auto = true, set up bonuses using above flags
        let auto: boolean = true;
        // =======================================================
        //    CHOOSE YOUR TEASE AND DISPLAY IT!
        // =======================================================
        let choice: TeaseType = this.determineTeaseChoice(character, monster, bimbo, bro, futa);
        if (monster.desc.short.indexOf("minotaur") !== -1) {
            if (character.torso.vaginas.count > 0 && character.lactationQ() >= 500 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 6 && RaceScore.cowScore(character) >= 3 && character.torso.tails.reduce(Tail.HasType(TailType.COW), false))
                choice = TeaseType.Cowgirl;
        }
        // Lets do zis!
        switch (choice) {
            // 0 butt shake
            case TeaseType.ButtShake:
                // Display
                DisplayText("You slap your " + ButtDescriptor.describeButt(character));
                if (character.torso.butt.rating >= 10 && character.tone < 60) DisplayText(", making it jiggle delightfully.");
                else DisplayText(".");
                // Mod success
                ass = true;
                break;
            // 1 BREAST JIGGLIN'
            case TeaseType.BreastJiggle:
                // Single breast row
                if (character.torso.chest.count === 1) {
                    // 50+ breastsize% success rate
                    DisplayText("Your lift your top, exposing your " + BreastDescriptor.describeBreastRow(character.torso.chest.get(0)) + " to " + monster.desc.a + monster.desc.short + ".  You shake them from side to side enticingly.");
                    if (character.stats.lust >= 50) DisplayText("  Your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s seem to demand " + monster.desc.possessivePronoun + " attention.");
                }
                // Multirow
                if (character.torso.chest.count > 1) {
                    // 50 + 10% per breastRow + breastSize%
                    DisplayText("You lift your top, freeing your rows of " + BreastDescriptor.describeBreastRow(character.torso.chest.get(0)) + " to jiggle freely.  You shake them from side to side enticingly");
                    if (character.stats.lust >= 50) DisplayText(", your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s painfully visible.");
                    else DisplayText(".");
                    chance++;
                }
                breasts = true;
                break;
            // 2 PUSSAH FLASHIN'
            case TeaseType.PussyFlash:
                if (character.torso.hips.legs.isTaur()) {
                    DisplayText("You gallop toward your unsuspecting enemy, dodging their defenses and knocking them to the ground.  Before they can recover, you slam your massive centaur ass down upon them, stopping just short of using crushing force to pin them underneath you.  In this position, your opponent's face is buried right in your girthy horsecunt.  You grind your cunt into " + monster.desc.possessivePronoun + " face for a moment before standing.  When you do, you're gratified to see your enemy covered in your lubricant and smelling powerfully of horsecunt.");
                    chance += 2;
                    damage += 4;
                }
                else {
                    DisplayText("You open your " + character.inventory.equipment.armor.displayName + ", revealing your ");
                    if (character.torso.cocks.count > 0) {
                        chance++;
                        damage++;
                        if (character.torso.cocks.count === 1) DisplayText(CockDescriptor.describeCock(character, character.torso.cocks.get(0)));
                        if (character.torso.cocks.count > 1) DisplayText(CockDescriptor.describeMultiCockShort(character));
                        DisplayText(" and ");
                        if (character.perks.has(PerkType.BulgeArmor)) {
                            damage += 5;
                        }
                        penis = true;
                    }
                    DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)));
                    DisplayText(".");
                }
                vagina = true;
                break;
            // 3 cock flash
            case TeaseType.CockFlash:
                if (character.torso.hips.legs.isTaur() && character.torso.cocks.filter(Cock.Type(CockType.HORSE)).length > 0) {
                    DisplayText("You let out a bestial whinny and stomp your hooves at your enemy.  They prepare for an attack, but instead you kick your front hooves off the ground, revealing the hefty horsecock hanging beneath your belly.  You let it flop around, quickly getting rigid and to its full erect length.  You buck your hips as if you were fucking a mare in heat, letting your opponent know just what's in store for them if they surrender to pleasure...");
                    if (character.perks.has(PerkType.BulgeArmor)) damage += 5;
                }
                else {
                    DisplayText("You open your " + character.inventory.equipment.armor.displayName + ", revealing your ");
                    if (character.torso.cocks.count === 1) DisplayText(CockDescriptor.describeCock(character, character.torso.cocks.get(0)));
                    if (character.torso.cocks.count > 1) DisplayText(CockDescriptor.describeMultiCockShort(character));
                    if (character.torso.vaginas.count > 0) DisplayText(" and ");
                    // Bulgy bonus!
                    if (character.perks.has(PerkType.BulgeArmor)) {
                        damage += 5;
                        chance++;
                    }
                    if (character.torso.vaginas.count > 0) {
                        DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)));
                        vagina = true;
                    }
                    DisplayText(".");
                }
                penis = true;
                break;
            // BIMBO
            // 4 butt shake
            case TeaseType.BimboButtShake:
                DisplayText("You turn away and bounce your " + ButtDescriptor.describeButt(character) + " up and down hypnotically");
                // Big butts = extra text + higher success
                if (character.torso.butt.rating >= 10) {
                    DisplayText(", making it jiggle delightfully.  " + monster.desc.capitalA + monster.desc.short + " even gets a few glimpses of the " + ButtDescriptor.describeButthole(character) + " between your cheeks.");
                    chance += 3;
                }
                // Small butts = less damage, still high success
                else {
                    DisplayText(", letting " + monster.desc.a + monster.desc.short + " get a good look at your " + ButtDescriptor.describeButthole(character) + " and " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ".");
                    chance += 1;
                    vagina = true;
                }
                ass = true;
                anus = true;
                break;
            // 5 breast jiggle
            case TeaseType.BimboBreastJiggle:
                DisplayText("You lean forward, letting the well-rounded curves of your " + BreastDescriptor.describeAllBreasts(character) + " show to " + monster.desc.a + monster.desc.short + ".");
                DisplayText("  You cup them in your palms and lewdly bounce them, putting on a show and giggling the entire time.  An inch at a time, your " + character.inventory.equipment.armor.displayName + " starts to come down, dropping tantalizingly slowly until your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s pop free.");
                if (character.stats.lust >= 50) {
                    if (character.torso.chest.filter(BreastRow.FuckableNipples).length > 0) {
                        chance++;
                        DisplayText("  Clear slime leaks from them, making it quite clear that they're more than just nipples.");
                    }
                    else DisplayText("  Your hard nipples seem to demand " + monster.desc.possessivePronoun + " attention.");
                    chance += 1;
                    damage += 2;
                }
                // Damage boosts!
                breasts = true;
                break;
            // 6 pussy flash
            case TeaseType.BimboPussyFlash:
                if (character.perks.has(PerkType.BimboBrains) || character.perks.has(PerkType.FutaFaculties)) {
                    DisplayText("You coyly open your " + character.inventory.equipment.armor.displayName + " and giggle, \"<i>Is this, like, what you wanted to see?</i>\"  ");
                }
                else {
                    DisplayText("You coyly open your " + character.inventory.equipment.armor.displayName + " and purr, \"<i>Does the thought of a hot, ");
                    if (futa) DisplayText("futanari ");
                    else if (character.perks.has(PerkType.BimboBody)) DisplayText("bimbo ");
                    else DisplayText("sexy ");
                    DisplayText("body turn you on?</i>\"  ");
                }
                if (monster.desc.plural)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "' gazes are riveted on your groin as you run your fingers up and down your folds seductively.");
                else
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s gaze is riveted on your groin as you run your fingers up and down your folds seductively.");
                if (character.torso.clit.length > 3) DisplayText("  You smile as your " + VaginaDescriptor.describeClit(character, character.torso.vaginas.get(0)) + " swells out from the folds and stands proudly, begging to be touched.");
                else DisplayText("  You smile and pull apart your lower-lips to expose your " + VaginaDescriptor.describeClit(character, character.torso.vaginas.get(0)) + ", giving the perfect view.");
                if (character.torso.cocks.count > 0) DisplayText("  Meanwhile, " + CockDescriptor.describeMultiCockSimpleOne(character) + " bobs back and forth with your gyrating hips, adding to the display.");
                // BONUSES!
                if (character.torso.cocks.count > 0) {
                    if (character.perks.has(PerkType.BulgeArmor)) damage += 5;
                    penis = true;
                }
                vagina = true;
                break;
            // 7 special Adjatha-crafted bend over bimbo times
            case TeaseType.BimboSpecial:
                DisplayText("The glinting of light catches your eye and you whip around to inspect the glittering object, turning your back on " + monster.desc.a + monster.desc.short + ".  Locking your knees, you bend waaaaay over, " + BreastDescriptor.describeChest(character) + " swinging in the open air while your " + ButtDescriptor.describeButt(character) + " juts out at the " + monster.desc.a + monster.desc.short + ".  Your plump cheeks and " + HipDescriptor.describeHips(character) + " form a jiggling heart-shape as you eagerly rub your thighs together.\n\n");
                DisplayText("The clear, warm fluid of your happy excitement trickles down from your loins, polishing your " + SkinDescriptor.skin(character) + " to a glossy, inviting shine.  Retrieving the useless, though shiny, bauble, you hold your pose for just a moment longer, a sly little smile playing across your lips as you wiggle your cheeks one more time before straightening up and turning back around.");
                vagina = true;
                chance++;
                damage += 2;
                break;
            // ==BRO STUFF=====
            // 8 Pec Dance
            case TeaseType.BroPecDance:
                DisplayText("You place your hands on your hips and flex repeatedly, skillfully making your pecs alternatively bounce in a muscular dance.  ");
                if (character.perks.has(PerkType.BroBrains)) DisplayText("Damn, " + monster.desc.a + monster.desc.short + " has got to love this!");
                else DisplayText(monster.desc.capitalA + monster.desc.short + " will probably enjoy the show, but you feel a bit silly doing this.");
                chance += (character.tone - 75) / 5;
                damage += (character.tone - 70) / 5;
                auto = false;
                break;
            // 9 Heroic Pose
            case TeaseType.BroHeroicPose:
                DisplayText("You lift your arms and flex your incredibly muscular arms while flashing your most disarming smile.  ");
                if (character.perks.has(PerkType.BroBrains)) DisplayText(monster.desc.capitalA + monster.desc.short + " can't resist such a heroic pose!");
                else DisplayText("At least the physical changes to your body are proving useful!");
                chance += (character.tone - 75) / 5;
                damage += (character.tone - 70) / 5;
                auto = false;
                break;
            // 10 Bulgy groin thrust
            case TeaseType.BroBulgyGroinThrust:
                DisplayText("You lean back and pump your hips at " + monster.desc.a + monster.desc.short + " in an incredibly vulgar display.  The bulging, barely-contained outline of your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " presses hard into your gear.  ");
                if (character.perks.has(PerkType.BroBrains)) DisplayText("No way could " + monster.desc.subjectivePronoun + " resist your huge cock!");
                else DisplayText("This is so crude, but at the same time, you know it'll likely be effective.");
                DisplayText("  You go on like that, humping the air for your foe");
                DisplayText("'s");
                DisplayText(" benefit, trying to entice them with your man-meat.");
                if (character.perks.has(PerkType.BulgeArmor)) damage += 5;
                penis = true;
                break;
            // 11 Show off dick
            case TeaseType.BroShowOffDick:
                if (Game.silly() && Utils.rand(2) === 0) DisplayText("You strike a herculean pose and flex, whispering, \"<i>Do you even lift?</i>\" to " + monster.desc.a + monster.desc.short + ".");
                else {
                    DisplayText("You open your " + character.inventory.equipment.armor.displayName + " just enough to let your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " and " + BallsDescriptor.describeBalls(true, true, character) + " dangle free.  A shiny rope of pre-cum dangles from your cock, showing that your reproductive system is every bit as fit as the rest of you.  ");
                    if (character.perks.has(PerkType.BroBrains)) DisplayText("Bitches love a cum-leaking cock.");
                    else DisplayText("You've got to admit, you look pretty good down there.");
                }
                if (character.perks.has(PerkType.BulgeArmor)) damage += 5;
                penis = true;
                break;
            // ==EXTRAS========
            // 12 Cat flexibility.
            case TeaseType.CatFlexibility:
                // CAT TEASE MOTHERFUCK (requires flexibility and legs [maybe can't do it with armor?])
                DisplayText("Reaching down, you grab an ankle and pull it backwards, looping it up and over to touch the foot to your " + HeadDescriptor.describeHair(character) + ".  You bring the leg out to the side, showing off your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " through your " + character.inventory.equipment.armor.displayName + ".  The combination of the lack of discomfort on your face and the ease of which you're able to pose shows " + monster.desc.a + monster.desc.short + " how good of a time they're in for with you.");
                vagina = true;
                if (character.thickness < 33) chance++;
                else if (character.thickness >= 66) chance--;
                damage += (character.thickness - 50) / 10;
                break;
            // 13 Pregnant
            case TeaseType.Pregnant:
                // PREG
                DisplayText("You lean back, feigning a swoon while pressing a hand on the small of your back.  The pose juts your huge, pregnant belly forward and makes the shiny spherical stomach look even bigger.  With a teasing groan, you rub the protruding tummy gently, biting your lip gently as you stare at " + monster.desc.a + monster.desc.short + " through heavily lidded eyes.  \"<i>All of this estrogen is making me frisky,</i>\" you moan, stroking hand gradually shifting to the southern hemisphere of your big baby-bump.");
                // if lactating
                if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1) {
                    DisplayText("  Your other hand moves to expose your " + BreastDescriptor.describeChest(character) + ", cupping and squeezing a stream of milk to leak down the front of your " + character.inventory.equipment.armor.displayName + ".  \"<i>Help a mommy out.</i>\"\n\n");
                    chance += 2;
                    damage += 4;
                }
                const largestIncubation = character.pregnancy.womb.pregnancy.incubation;
                if (largestIncubation < 100) {
                    chance++;
                    damage += 2;
                }
                if (largestIncubation < 50) {
                    chance++;
                    damage += 2;
                }
                break;
            // 14 Brood Mother
            case TeaseType.BroodMother:
                if (Utils.rand(2) === 0) DisplayText("You tear open your " + character.inventory.equipment.armor.displayName + " and slip a few fingers into your well-used birth canal, giving your opponent a good look at what they're missing.  \"<i>C'mon stud,</i>\" you say, voice dripping with lust and desire, \"<i>Come to mama " + character.desc.short + " and fuck my pussy 'til your baby batter just POURS out.  I want your children inside of me, I want your spawn crawling out of this cunt and begging for my milk.  Come on, FUCK ME PREGNANT!</i>\"");
                else DisplayText("You wiggle your " + HipDescriptor.describeHips(character) + " at your enemy, giving them a long, tantalizing look at the hips that have passed so very many offspring.  \"<i>Oh, like what you see, bad boy?  Well why don't you just come on over and stuff that cock inside me?  Give me your seed, and I'll give you suuuuch beautiful offspring.  Oh?  Does that turn you on?  It does!  Come on, just let loose and fuck me full of your babies!</i>\"");
                chance += 2;
                damage += 4;
                if (character.inHeat) {
                    chance += 2;
                    damage += 4;
                }
                vagina = true;
                break;
            // 15 Nipplecunts
            case TeaseType.Nipplecunts:
                // Req's tits & Pussy
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1 && character.torso.vaginas.count > 0 && Utils.rand(2) === 0) {
                    DisplayText("Closing your eyes, you lean forward and slip a hand under your " + character.inventory.equipment.armor.displayName + ".  You let out the slightest of gasps as your fingers find your drooling honeypot, warm tips poking, one after another between your engorged lips.  When you withdraw your hand, your fingers have been soaked in the dripping passion of your cunny, translucent beads rolling down to wet your palm.  With your other hand, you pull down the top of your " + character.inventory.equipment.armor.displayName + " and bare your " + BreastDescriptor.describeChest(character) + " to " + monster.desc.a + monster.desc.short + ".\n\n");
                    DisplayText("Drawing your lust-slick hand to your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s, the yielding flesh of your cunt-like nipples parts before the teasing digits.  Using your own girl cum as added lubrication, you pump your fingers in and out of your nipples, moaning as you add progressively more digits until only your thumb remains to stroke the inflamed flesh of your over-stimulated chest.  Your throat releases the faintest squeak of your near-orgasmic delight and you pant, withdrawing your hands and readjusting your armor.\n\n");
                    DisplayText("Despite how quiet you were, it's clear that every lewd, desperate noise you made was heard by " + monster.desc.a + monster.desc.short + ".");
                    chance += 2;
                    damage += 4;
                }
                else if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1 && Utils.rand(2) === 0) {
                    DisplayText("You yank off the top of your " + character.inventory.equipment.armor.displayName + ", revealing your " + BreastDescriptor.describeChest(character) + " and the gaping nipplecunts on each.  With a lusty smirk, you slip a pair of fingers into the nipples of your " + BreastDescriptor.describeChest(character) + ", pulling the nipplecunt lips wide, revealing the lengthy, tight passage within.  You fingerfuck your nipplecunts, giving your enemy a good show before pulling your armor back on, leaving the tantalizing image of your gaping titpussies to linger in your foe's mind.");
                    chance += 1;
                    damage += 2;
                }
                else DisplayText("You remove the front of your " + character.inventory.equipment.armor.displayName + " exposing your " + BreastDescriptor.describeChest(character) + ".  Using both of your hands, you thrust two fingers into your nipple cunts, milky girl cum soaking your hands and fingers.  \"<i>Wouldn't you like to try out these holes too?</i>\"");
                breasts = true;
                break;
            // 16 Anal gape
            case TeaseType.AnalGape:
                DisplayText("You quickly strip out of your " + character.inventory.equipment.armor.displayName + " and turn around, giving your " + ButtDescriptor.describeButt(character) + " a hard slap and showing your enemy the real prize: your " + ButtDescriptor.describeButthole(character) + ".  With a smirk, you easily plunge your hand inside, burying yourself up to the wrist inside your anus.  You give yourself a quick fisting, watching the enemy over your shoulder while you moan lustily, sure to give them a good show.  You withdraw your hand and give your ass another sexy spank before readying for combat again.");
                anus = true;
                ass = true;
                break;
            // 17 Bee abdomen tease
            case TeaseType.BeeAbdomen:
                DisplayText("You swing around, shedding the " + character.inventory.equipment.armor.displayName + " around your waist to expose your " + ButtDescriptor.describeButt(character) + " to " + monster.desc.a + monster.desc.short + ".  Taking up your oversized bee abdomen in both hands, you heft the thing and wave it about teasingly.  Drops of venom drip to and fro, a few coming dangerously close to " + monster.desc.objectivePronoun + ".  \"<i>Maybe if you behave well enough, I'll even drop a few eggs into your belly,</i>\" you say softly, dropping the abdomen back to dangle above your butt and redressing.");
                ass = true;
                chance += .5;
                damage += .5;
                break;
            // 18 DOG TEASE
            case TeaseType.DogTease:
                DisplayText("You sit down like a dog, your [legs] are spread apart, showing your ");
                if (character.torso.vaginas.count > 0) DisplayText("parted cunt-lips");
                else DisplayText("puckered asshole, hanging, erect maleness,");
                DisplayText(" and your hands on the ground in front of you.  You pant heavily with your tongue out and promise, \"<i>I'll be a good little bitch for you</i>.\"");
                vagina = true;
                chance += 1;
                damage += 2;
                break;
            // 19 MAX FEM TEASE - SYMPHONIE
            case TeaseType.MaxFemininity:
                DisplayText("You make sure to capture your foe's attention, then slowly and methodically allow your tongue to slide along your lush, full lips.  The glistening moisture that remains on their plump beauty speaks of deep lust and deeper throats.  Batting your long lashes a few times, you pucker them into a playful blown kiss, punctuating the act with a small moan. Your gorgeous feminine features hint at exciting, passionate moments together, able to excite others with just your face alone.");
                chance += 2;
                damage += 4;
                break;
            // 20 MAX MASC TEASE
            case TeaseType.MaxManliness:
                DisplayText("As your foe regards you, you recognize their attention is fixated on your upper body.  Thrusting your strong jaw forward you show off your chiseled chin, handsome features marking you as a flawless specimen.  Rolling your broad shoulders, you nod your head at your enemy.  The strong, commanding presence you give off could melt the heart of an icy nun.  Your perfect masculinity speaks to your confidence, allowing you to excite others with just your face alone.");
                chance += 2;
                damage += 4;
                break;
            // 21 MAX ADROGYN
            case TeaseType.PerfectAndrogyny:
                DisplayText("You reach up and run your hands down your delicate, androgynous features.  With the power of a man but the delicacy of a woman, looking into your eyes invites an air of enticing mystery.  You blow a brief kiss to your enemy while at the same time radiating a sexually exciting confidence.  No one could identify your gender by looking at your features, and the burning curiosity they encourage could excite others with just your face alone.");
                damage -= 3;
                break;
            // 22 SPOIDAH SILK
            case TeaseType.SpirderSilk:
                DisplayText("Reaching back, you milk some wet silk from your spider-y abdomen and present it to " + monster.desc.a + monster.desc.short + ", molding the sticky substance as " + monster.desc.subjectivePronoun + " looks on curiously.  Within moments, you hold up a silken heart scuplture, and with a wink, you toss it at " + monster.desc.objectivePronoun + ". It sticks to " + monster.desc.possessivePronoun + " body, the sensation causing " + monster.desc.objectivePronoun + " to hastily slap the heart off.  " + GenderDescriptor.mf(monster, "He", "She") + " returns " + monster.desc.possessivePronoun + " gaze to you to find you turned around, " + ButtDescriptor.describeButt(character) + " bared and abdomen bouncing lazily.  \"<i>I wonder what would happen if I webbed up your hole after I dropped some eggs inside?</i>\" you hiss mischievously.  " + GenderDescriptor.mf(monster, "He", "She") + " gulps.");
                ass = true;
                break;
            // 23 RUT TEASE
            case TeaseType.Rut:
                if (character.torso.cocks.filter(Cock.Type(CockType.HORSE)).length > 0 && character.torso.cocks.filter(Cock.Type(CockType.HORSE)).sort(Cock.LongestCocks)[0].length >= 12) {
                    DisplayText("You whip out your massive horsecock, and are immediately surrounded by a massive, heady musk.  Your enemy swoons, nearly falling to her knees under your oderous assault.  Grinning, you grab her shoulders and force her to her knees.  Before she can defend herself, you slam your horsecock onto her head, running it up and down on her face, her nose acting like a sexy bump in an onahole.  You fuck her face -- literally -- for a moment before throwing her back and sheathing your cock.");
                }
                else {
                    DisplayText("Panting with your unstoppable lust for the delicious, impregnable cunt before you, you yank off your " + character.inventory.equipment.armor.displayName + " with strength born of your inhuman rut, and quickly wave your fully erect cock at your enemy.  She flashes with lust, quickly feeling the heady effect of your man-musk.  You rush up, taking advantage of her aroused state and grab her shoulders.  ");
                    DisplayText("Before she can react, you push her down until she's level with your cock, and start to spin it in a circle, slapping her right in the face with your musky man-meat.  Her eyes swim, trying to follow your meatspin as you swat her in the face with your cock!  Satisfied, you release her and prepare to fight!");
                }
                penis = true;
                break;
            // 24 STAFF POLEDANCE
            case TeaseType.Poledance:
                DisplayText("You run your tongue across your lips as you plant your staff into the ground.  Before your enemy can react, you spin onto the long, wooden shaft, using it like an impromptu pole.  You lean back against the planted staff, giving your enemy a good look at your body.  You stretch backwards like a cat, nearly touching your fingertips to the ground beneath you, now holding onto the staff with only one leg.  You pull yourself upright and give your " + ButtDescriptor.describeButt(character) + " a little slap and your " + BreastDescriptor.describeChest(character) + " a wiggle before pulling open your " + character.inventory.equipment.armor.displayName + " and sliding the pole between your tits.  You drop down to a low crouch, only just covering your genitals with your hand as you shake your " + ButtDescriptor.describeButt(character) + " playfully.  You give the enemy a little smirk as you slip your " + character.inventory.equipment.armor.displayName + " back on and pick up your staff.");
                ass = true;
                breasts = true;
                break;
            // TALL WOMAN TEASE
            case TeaseType.TallTease:
                DisplayText("You move close to your enemy, handily stepping over " + monster.desc.possessivePronoun + " defensive strike before leaning right down in " + monster.desc.possessivePronoun + " face, giving " + monster.desc.objectivePronoun + " a good long view at your cleavage.  \"<i>Hey, there, little " + GenderDescriptor.mf(monster, "guy", "girl") + ",</i>\" you smile.  Before " + monster.desc.subjectivePronoun + " can react, you grab " + monster.desc.objectivePronoun + " and smoosh " + monster.desc.possessivePronoun + " face into your " + BreastDescriptor.describeAllBreasts(character) + ", nearly choking " + monster.desc.objectivePronoun + " in the canyon of your cleavage.  " + GenderDescriptor.mf(monster, "He", "She") + " struggles for a moment.  You give " + monster.desc.objectivePronoun + " a little kiss on the head and step back, ready for combat.");
                breasts = true;
                chance += 2;
                damage += 4;
                break;
            // Magic Tease
            case TeaseType.Smartness:
                DisplayText("Seeing a lull in the battle, you plant your " + character.inventory.equipment.weapon.displayname + " on the ground and let your magic flow through you.  You summon a trickle of magic into a thick, slowly growing black ball of lust.  You wave the ball in front of you, making a little dance and striptease out of the affair as you slowly saturate the area with latent sexual magics.");
                chance++;
                damage += 2;
                break;
            // Feeder
            case TeaseType.Feeder:
                DisplayText("You present your swollen breasts full of milk to " + monster.desc.a + monster.desc.short + " and say \"<i>Wouldn't you just love to lie back in my arms and enjoy what I have to offer you?</i>\"");
                breasts = true;
                chance++;
                damage++;
                break;
            // 28 FEMALE TEACHER COSTUME TEASE
            case TeaseType.ClothesFemaleTeacher:
                DisplayText("You turn to the side and give " + monster.desc.a + monster.desc.short + " a full view of your body.  You ask them if they're in need of a private lesson in lovemaking after class.");
                ass = true;
                break;
            // 29 Male Teacher Outfit Tease
            case TeaseType.ClothesMaleTeacher:
                DisplayText("You play with the strings on your outfit a bit and ask " + monster.desc.a + monster.desc.short + " just how much do they want to see their teacher pull them off?");
                chance++;
                damage += 3;
                break;
            // 30 Naga Fetish Clothes
            case TeaseType.ClothesNagaFetish:
                DisplayText("You sway your body back and forth, and do an erotic dance for " + monster.desc.a + monster.desc.short + ".");
                chance += 2;
                damage += 4;
                break;
            // 31 Centaur harness clothes
            case TeaseType.ClothesCentaurHarness:
                DisplayText("You rear back, and declare that, \"<i>This horse is ready to ride, all night long!</i>\"");
                chance += 2;
                damage += 4;
                break;
            // 32 Genderless servant clothes
            case TeaseType.ClothesGenderlessServant:
                DisplayText("You turn your back to your foe, and flip up your butt flap for a moment.   Your " + ButtDescriptor.describeButt(character) + " really is all you have to offer downstairs.");
                ass = true;
                chance++;
                damage += 2;
                break;
            // 33 Crotch Revealing Clothes (herm only?)
            case TeaseType.ClothesCrotchRevealing:
                DisplayText("You do a series of poses to accentuate what you've got on display with your crotch revealing clothes, while asking if your " + GenderDescriptor.mf(character, "master", "mistress") + " is looking to sample what is on display.");
                chance += 2;
                damage += 4;
                break;
            // 34 Maid Costume (female only)
            case TeaseType.ClothesMaid:
                DisplayText("You give a rather explicit curtsey towards " + monster.desc.a + monster.desc.short + " and ask them if your " + GenderDescriptor.mf(character, "master", "mistress") + " is interested in other services today.");
                chance++;
                damage += 2;
                breasts = true;
                break;
            // 35 Servant Boy Clothes (male only)
            case TeaseType.ClothesServantBoy:
                DisplayText("You brush aside your crotch flap for a moment, then ask " + monster.desc.a + monster.desc.short + " if, " + GenderDescriptor.mf(character, "Master", "Mistress") + " would like you to use your " + CockDescriptor.describeMultiCockShort(character) + " on them?");
                penis = true;
                chance++;
                damage += 2;
                break;
            // 36 Bondage Patient Clothes (done):
            case TeaseType.ClothesBondagePatient:
                DisplayText("You pull back one of the straps on your bondage cloths and let it snap back.  \"<i>I need some medical care, feeling up for it?</i>\" you tease.");
                damage += 2;
                chance++;
                break;
            default:
                DisplayText("You shimmy and shake sensually. (An error occurred.)");
                break;
            case TeaseType.Kitsune1:
                DisplayText("You purse your lips coyly, narrowing your eyes mischievously and beckoning to " + monster.desc.a + monster.desc.short + " with a burning come-hither glare.  Sauntering forward, you pop your hip to the side and strike a coquettish pose, running " + ((character.torso.tails.count > 1) ? "one of your tails" : "your tail") + " up and down " + monster.desc.possessivePronoun + " body sensually.");
                chance += 6;
                damage += 3;
                break;
            case TeaseType.Kitsune2:
                DisplayText("You wet your lips, narrowing your eyes into a smoldering, hungry gaze.  Licking the tip of your index finger, you trail it slowly and sensually down the front of your " + character.inventory.equipment.armor.displayName + ", following the line of your " + BreastDescriptor.describeChest(character) + " teasingly.  You hook your thumbs into your top and shimmy it downward at an agonizingly slow pace.  The very instant that your [nipples] pop free, your tail crosses in front, obscuring " + monster.desc.a + monster.desc.short + "'s view.");
                breasts = true;
                chance++;
                damage++;
                break;
            case TeaseType.Kitsune3:
                DisplayText("Leaning forward, you bow down low, raising a hand up to your lips and blowing " + monster.desc.a + monster.desc.short + " a kiss.  You stand straight, wiggling your " + HipDescriptor.describeHips(character) + " back and forth seductively while trailing your fingers down your front slowly, pouting demurely.  The tip of ");
                if (character.torso.tails.count === 1) DisplayText("your");
                else DisplayText("a");
                DisplayText(" bushy tail curls up around your " + LegDescriptor.describeLeg(character) + ", uncoiling with a whipping motion that makes an audible crack in the air.");
                ass = true;
                chance++;
                damage += 1;
                break;
            case TeaseType.Kitsune4:
                DisplayText("Turning around, you stare demurely over your shoulder at " + monster.desc.a + monster.desc.short + ", batting your eyelashes amorously.");
                if (character.torso.tails.count === 1) DisplayText("  Your tail twists and whips about, sliding around your " + LowerBodyDescriptor.describeHips(character) + " in a slow arc and framing your rear nicely as you slowly lift your " + character.inventory.equipment.armor.displayName + ".");
                else DisplayText("  Your tails fan out, twisting and whipping sensually, sliding up and down your " + LowerBodyDescriptor.describeLegs(character) + " and framing your rear nicely as you slowly lift your " + character.inventory.equipment.armor.displayName + ".");
                DisplayText("  As your [butt] comes into view, you brush your tail" + ((character.torso.tails.count > 1) ? "s" : "") + " across it, partially obscuring the view in a tantalizingly teasing display.");
                ass = true;
                anus = true;
                chance++;
                damage += 2;
                break;
            case TeaseType.KitsuneGendered:
                DisplayText("Smirking coyly, you sway from side to side, running your tongue along your upper teeth seductively.  You hook your thumbs into your " + character.inventory.equipment.armor.displayName + " and pull them away to partially reveal ");
                if (character.torso.cocks.count > 0) DisplayText(CockDescriptor.describeMultiCockSimpleOne(character));
                if (character.gender === 3) DisplayText(" and ");
                if (character.gender >= 2) DisplayText("your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)));
                DisplayText(".  Your bushy tail" + ((character.torso.tails.count > 1) ? "s" : "") + " cross" + ((character.torso.tails.count > 1) ? "" : "es") + " in front, wrapping around your genitals and obscuring the view teasingly.");
                vagina = true;
                penis = true;
                damage += 2;
                chance++;
                break;
            case TeaseType.Urta:
                // Tease #1:
                if (Utils.rand(2) === 0) {
                    DisplayText("You lift your skirt and flash your king-sized stallionhood, already unsheathing itself and drooling pre, at your opponent.  \"<i>Come on, then; I got plenty of girlcock for you if that's what you want!</i>\" you cry.");
                    penis = true;
                    damage += 3;
                    chance--;
                }
                // Tease #2:
                else {
                    DisplayText("You turn partially around and then bend over, swaying your tail from side to side in your most flirtatious manner and wiggling your hips seductively, your skirt fluttering with the motions.  \"<i>Come on then, what are you waiting for?  This is a fine piece of ass here,</i>\" you grin, spanking yourself with an audible slap.");
                    ass = true;
                    chance += 2;
                    damage += 3;
                }
                break;
            case TeaseType.Cowgirl:
                const cows: number = Utils.rand(7);
                if (cows === 0) {
                    DisplayText("You tuck your hands under your chin and use your arms to squeeze your massive, heavy breasts together.  Milk squirts from your erect nipples, filling the air with a rich, sweet scent.");
                    breasts = true;
                    chance += 2;
                    damage++;
                }
                else if (cows === 1) {
                    DisplayText("Moaning, you bend forward, your full breasts nearly touching the ground as you sway your [hips] from side to side.  Looking up from under heavily-lidded eyes, you part your lips and lick them, letting out a low, lustful \"<i>Mooooo...</i>\"");
                    breasts = true;
                    chance += 2;
                    damage += 2;
                }
                else if (cows === 2) {
                    DisplayText("You tuck a finger to your lips, blinking innocently, then flick your tail, wafting the scent of your ");
                    if (character.torso.vaginas.get(0).wetness >= 3) DisplayText("dripping ");
                    DisplayText("sex through the air.");
                    vagina = true;
                    chance++;
                    damage++;
                }
                else if (cows === 3) {
                    DisplayText("You heft your breasts, fingers splayed across your [nipples] as you SQUEEZE.  Milk runs in rivulets over your hands and down the massive curves of your breasts, soaking your front with sweet, sticky milk.");
                    breasts = true;
                    chance += 3;
                    damage++;
                }
                else if (cows === 4) {
                    DisplayText("You lift a massive breast to your mouth, suckling loudly at yourself, finally letting go of your nipple with a POP and a loud, satisfied gasp, milk running down your chin.");
                    breasts = true;
                    chance++;
                    damage += 3;
                }
                else if (cows === 5) {
                    DisplayText("You crouch low, letting your breasts dangle in front of you.  Each hand caresses one in turn as you slowly milk yourself onto your thighs, splashing white, creamy milk over your hips and sex.");
                    vagina = true;
                    breasts = true;
                    chance++;
                }
                else {
                    DisplayText("You lift a breast to your mouth, taking a deep draught of your own milk, then tilt your head back.  With a low moan, you let it run down your front, winding a path between your breasts until it drips sweetly from your crotch.");
                    vagina = true;
                    breasts = true;
                    damage += 2;
                }
                if (monster.desc.short.indexOf("minotaur") !== -1) {
                    damage += 6;
                    chance += 3;
                }
                break;
            // lusty maiden's armor teases
            case TeaseType.ClothesBikiniMail:
                const maiden: number = Utils.rand(5);
                damage += 5;
                chance += 3;
                if (maiden === 0) {
                    DisplayText("Confidently sauntering forward, you thrust your chest out with your back arched in order to enhance your [chest].  You slowly begin to shake your torso back and forth, slapping your chain-clad breasts against each other again and again.  One of your hands finds its way to one of the pillowy expanses and grabs hold, fingers sinking into the soft tit through the fine, mail covering.  You stop your shaking to trace a finger down through the exposed center of your cleavage, asking, \"<i>Don't you just want to snuggle inside?</i>\"");
                    breasts = true;
                }
                else if (maiden === 1) {
                    DisplayText("You skip up to " + monster.desc.a + monster.desc.short + " and spin around to rub your barely-covered butt up against " + monster.desc.objectivePronoun + ".  Before " + monster.desc.subjectivePronoun + " can react, you're slowly bouncing your [butt] up and down against " + monster.desc.possessivePronoun + " groin.  When " + monster.desc.subjectivePronoun + " reaches down, you grab " + monster.desc.possessivePronoun + " hand and press it up, under your skirt, right against the steamy seal on your sex.  The simmering heat of your overwhelming lust burns hot enough for " + monster.desc.objectivePronoun + " to feel even through the contoured leather, and you let " + monster.desc.objectivePronoun + " trace the inside of your [leg] for a moment before moving away, laughing playfully.");
                    ass = true;
                    vagina = true;
                }
                else if (maiden === 2) {
                    DisplayText("You flip up the barely-modest chain you call a skirt and expose your g-string to " + monster.desc.a + monster.desc.short + ".  Slowly swaying your [hips], you press a finger down on the creased crotch plate and exaggerate a lascivious moan into a throaty purr of enticing, sexual bliss.  Your eyes meet " + monster.desc.possessivePronoun + ", and you throatily whisper, \"<i>");
                    if (character.torso.vaginas.filter(Vagina.NotVirgin).length === 0) DisplayText("Think you can handle a virgin's infinite lust?");
                    else DisplayText("Think you have what it takes to satisfy this perfect pussy?");
                    DisplayText("</i>\"");
                    vagina = true;
                    damage += 3;
                }
                else if (maiden === 3) {
                    DisplayText("You seductively wiggle your way up to " + monster.desc.a + monster.desc.short + ", and before " + monster.desc.subjectivePronoun + " can react to your salacious advance, you snap a [leg] up in what would be a vicious kick, if you weren't simply raising it to rest your [foot] on " + monster.desc.possessivePronoun + " shoulder.  With your thighs so perfectly spready, your skirt is lifted, and " + monster.desc.a + monster.desc.short + " is given a perfect view of your thong-enhanced cameltoe and the moisture that beads at the edges of your not-so-modest covering.");
                    vagina = true;
                }
                else {
                    DisplayText("Bending over, you lift your [butt] high in the air.  Most of your barely-covered tush is exposed, but the hem of your chainmail skirt still protects some of your anal modesty.  That doesn't last long.  You start shaking your [butt] up, down, back, and forth to an unheard rhythm, flipping the pointless covering out of the way so that " + monster.desc.a + monster.desc.short + " can gaze upon your curvy behind in it all its splendid detail.  A part of you hopes that " + monster.desc.subjectivePronoun + " takes in the intricate filigree on the back of your thong, though to " + monster.desc.objectivePronoun + " it looks like a bunch of glittering arrows on an alabaster background, all pointing squarely at your [asshole].");
                    ass = true;
                    chance += 2;
                }
                break;
        }
        // ===========================
        // BUILD BONUSES IF APPLICABLE
        // ===========================
        let bonusChance: number = 0;
        let bonusDamage: number = 0;
        if (auto) {
            // TIT BONUSES
            if (breasts) {
                if (character.torso.chest.count > 1) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.count > 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.count > 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 2) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 3) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 25) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.chest.filter(BreastRow.FuckableNipples).length > 0) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (character.torso.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) > 1) {
                    bonusChance++;
                    bonusDamage += 2;
                }
            }
            // PUSSY BONUSES
            if (vagina) {
                if (character.torso.vaginas.count > 0 && character.torso.vaginas.get(0).wetness >= 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.vaginas.count > 0 && character.torso.vaginas.get(0).wetness >= 3) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.vaginas.count > 0 && character.torso.vaginas.get(0).wetness >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.vaginas.count > 0 && character.torso.vaginas.get(0).wetness >= 5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.clit.length > 1.5) {
                    bonusChance += .5;
                    bonusDamage++;
                }
                if (character.torso.clit.length > 3.5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.clit.length > 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.clit.length > 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            // Penis bonuses!
            if (penis) {
                if (character.torso.cocks.count > 1) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (character.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 15) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 60) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 150) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 300) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 1000) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.balls.quantity > 0) {
                    if (character.torso.balls.quantity > 2) {
                        bonusChance += 1;
                        bonusDamage += 2;
                    }
                    if (character.torso.balls.size > 3) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (character.torso.balls.size > 7) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (character.torso.balls.size > 12) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                }
                if (character.torso.cocks.sort(Cock.LargestCockArea)[0].area < 8) {
                    bonusChance--;
                    bonusDamage -= 2;
                    if (character.torso.cocks.sort(Cock.LargestCockArea)[0].area < 5) {
                        bonusChance--;
                        bonusDamage -= 2;
                    }
                }
            }
            if (ass) {
                if (character.torso.butt.rating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.butt.rating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.butt.rating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.butt.rating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.butt.rating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.hips.rating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.hips.rating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.hips.rating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.hips.rating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.hips.rating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            if (anus) {
                if (character.torso.butt.looseness === 0) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
                if (character.torso.butt.wetness > 0) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (character.analCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.analCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.analCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.analCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.butt.looseness === 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.torso.butt.looseness === 5) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
            }
            // Trim it down!
            if (bonusChance > 5) bonusChance = 5;
            if (bonusDamage > 10) bonusDamage = 10;
        }
        // Land the hit!
        if (Utils.rand(100) <= chance + Utils.rand(bonusChance)) {
            // NERF TEASE DAMAGE
            damage *= .7;
            bonusDamage *= .7;
            if (character.perks.has(PerkType.HistoryWhore)) {
                damage *= 1.15;
                bonusDamage *= 1.15;
            }
            if (character.perks.has(PerkType.ChiReflowLust)) damage *= UmasShop.NEEDLEWORK_LUST_TEASE_DAMAGE_MULTI;
            if (monster.desc.plural) damage *= 1.3;
            damage = (damage + Utils.rand(bonusDamage)) * monster.stats.lustVuln;

            if (monster.charType === CharacterType.JeanClaude) (monster as JeanClaude).handleTease(damage, true);
            else if (monster.charType === CharacterType.Doppleganger && !monster.statusAffects.has(StatusAffectType.Stunned)) (monster as Doppleganger).mirrorTease(damage, true);
            else monster.teased(damage);

            if (Flags.list[FlagEnum.PC_FETISH] >= 1 && !urtaQuest.isUrta()) {
                if (character.stats.lust < 75) DisplayText("\nFlaunting your body in such a way gets you a little hot and bothered.");
                else DisplayText("\nIf you keep exposing yourself you're going to get too horny to fight back.  This exhibitionism fetish makes it hard to resist just stripping naked and giving up.");
                character.stats.lust += 2 + Utils.rand(3);
            }

            // Similar to fetish check, only add XP if the character IS the character...
            if (!urtaQuest.isUrta()) teaseXP(1);
        }
        // Nuttin honey
        else {
            if (!urtaQuest.isUrta()) teaseXP(5);

            if (monster.charType === CharacterType.JeanClaude) (monster as JeanClaude).handleTease(0, false);
            else if (monster.charType === CharacterType.Doppleganger) (monster as Doppleganger).mirrorTease(0, false);
            else DisplayText("\n" + monster.desc.capitalA + monster.desc.short + " seems unimpressed.");
        }
        DisplayText("\n\n");
    }
}
