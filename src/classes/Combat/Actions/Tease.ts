import { CockType } from '../Body/Cock';
import { Gender } from '../Body/Creature';
import { TailType } from '../Body/LowerBody';
import BallsDescriptor from '../Descriptors/BallsDescriptor';
import BreastDescriptor from '../Descriptors/BreastDescriptor';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import GenderDescriptor from '../Descriptors/GenderDescriptor';
import HeadDescriptor from '../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import MainScreen from '../display/MainScreen';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import Monster from '../Monster';
import Player from '../Player';
import RaceScore from '../RaceScore';
import Utils from '../Utilities/Utils';

const enum TeaseType {
    ButtShake,                  //0 butt shake
    BreastJiggle,               //1 breast jiggle
    PussyFlash,                 //2 pussy flash
    CockFlash,                  //3 cock flash
    //==BIMBO STUFF===
    BimboButtShake,             //4 butt shake
    BimboBreastJiggle,          //5 breast jiggle
    BimboPussyFlash,            //6 pussy flash
    BimboSpecial,               //7 special Adjatha-crafted bend over bimbo times
    //==BRO STUFF=====
    BroPecDance,                //8 Pec Dance
    BroHeroicPose,              //9 Heroic Pose
    BroBulgyGroinThrust,        //10 Bulgy groin thrust
    BroShowOffDick,             //11 Show off dick
    //==EXTRAS========
    CatFlexibility,             //12 Cat flexibility.
    Pregnant,                   //13 Pregnant
    BroodMother,                //14 Brood Mother
    Nipplecunts,                //15 Nipplecunts
    AnalGape,                   //16 Anal gape
    BeeAbdomen,                 //17 Bee abdomen tease
    DogTease,                   //18 DOG TEASE
    MaxFemininity,              //19 Maximum Femininity:
    MaxManliness,               //20 Maximum MAN:
    PerfectAndrogyny,           //21 Perfect Androgyny:
    SpirderSilk,                //22 SPOIDAH SILK
    Rut,                        //23 RUT
    Poledance,                  //24 Poledance - req's staff! - Req's gender!  Req's TITS!
    TallTease,                  //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
    Smartness,                  //26 SMART PEEPS! 70+ int, arouse spell!
    Feeder,                     //27 - FEEDER
    ClothesFemaleTeacher,       //28 FEMALE TEACHER COSTUME TEASE
    ClothesMaleTeacher,         //29 Male Teacher Outfit Tease
    ClothesNagaFetish,          //30 Naga Fetish Clothes
    ClothesCentaurHarness,      //31 Centaur harness clothes
    ClothesGenderlessServant,   //32 Genderless servant clothes
    ClothesCrotchRevealing,     //33 Crotch Revealing Clothes (herm only?)
    ClothesMaid,                //34 Maid Costume (female only):
    ClothesServantBoy,          //35 Servant Boy Clothes (male only)
    ClothesBondagePatient,      //36 Bondage Patient Clothes 
    Kitsune1,                   //37 Kitsune Tease
    Kitsune2,                   //38 Kitsune Tease
    Kitsune3,                   //39 Kitsune Tease
    Kitsune4,                   //40 Kitsune Tease
    KitsuneGendered,            //41 Kitsune Gendered Tease
    Urta,                       //42 Urta teases
    Cowgirl,                    //43 Cowgirl teases
    ClothesBikiniMail,          //44 Bikini Mail Tease

    MaxTeaseTypes,              // Max Tease Types - Used for choices array init
}

export default class Tease {
    private determineBaseDamage(player: Player): number {
        let damage: number = 6 + Utils.rand(3);
        if (player.perks.has("SensualLover"))
            damage += 2;
        if (player.perks.has("Seduction"))
            damage += 5;
        //+ slutty armor bonus
        if (player.perks.has("SluttySeduction"))
            damage += player.perks.get("SluttySeduction").value1;
        damage += player.stats.level;
        damage += player.teaseLevel * 2;
        return damage;
    }

    private determineBaseChance(player: Player): number {
        let chance: number = 0;
        chance = 60;
        //5% chance for each tease level.
        chance += player.teaseLevel * 5;
        //10% for seduction perk
        if (player.perks.has("Seduction")) chance += 10;
        //10% for sexy armor types
        if (player.perks.has("SluttySeduction")) chance += 10;
        //10% for bimbo shits
        if (player.perks.has("BimboBody")) {
            chance += 10;
        }
        if (player.perks.has("BroBody")) {
            chance += 10;
        }
        if (player.perks.has("FutaForm")) {
            chance += 10;
        }
        //2 & 2 for seductive valentines!
        if (player.perks.has("SensualLover")) {
            chance += 2;
        }
        if (player.perks.has("ChiReflowLust"))
            chance += UmasShop.NEEDLEWORK_LUST_TEASE_MULTI;
        return chance;
    }

    private determineTeaseChoice(player: Player, monster: Monster, bimbo: boolean, bro: boolean, futa: boolean) {
        const buttRating = player.lowerBody.butt.buttRating;
        const largestBreastRating = player.upperBody.chest.BreastRatingLargest[0].breastRating;
        const hasVagina = player.lowerBody.vaginaSpot.hasVagina();
        const vaginalWetness = player.lowerBody.vaginaSpot.get(0).vaginalWetness;
        const vaginalCapacity = player.vaginalCapacity();
        const cockCount = player.lowerBody.cockSpot.count();
        const largestCockArea = player.lowerBody.cockSpot.listLargestCockArea[0].cockArea();
        let choices: number[] = [];
        choices.length = TeaseType.MaxTeaseTypes;
        for (let index: number = 0; index < TeaseType.MaxTeaseTypes; index++)
            choices[index] = 0;

        if ((futa || bimbo) && player.gender == Gender.HERM) {
            //Once chance of butt.
            choices[TeaseType.BimboButtShake]++;
            //Big butts get more butt
            if (buttRating >= 7) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 10) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 14) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 20) choices[TeaseType.BimboButtShake]++;
            if (buttRating >= 25) choices[TeaseType.BimboButtShake]++;
            //Breast jiggle!
            if (largestBreastRating >= 2) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 4) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 8) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 15) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 30) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 50) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 75) choices[TeaseType.BimboBreastJiggle]++;
            if (largestBreastRating >= 100) choices[TeaseType.BimboBreastJiggle]++;
            //Pussy Flash!
            if (hasVagina) {
                choices[TeaseType.PussyFlash]++;
                if (vaginalWetness >= 3) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalWetness >= 5) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalCapacity >= 30) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalCapacity >= 60) choices[TeaseType.BimboPussyFlash]++;
                if (vaginalCapacity >= 75) choices[TeaseType.BimboPussyFlash]++;
            }
            //Adj special!
            if (hasVagina && player.lowerBody.butt.buttRating >= 8 && player.lowerBody.hipRating >= 6 && largestBreastRating >= 4) {
                choices[TeaseType.BimboSpecial] += 4;
            }
            //Cock flash!
            if (futa && player.lowerBody.cockSpot.hasCock()) {
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
            //8 Pec Dance
            if (largestBreastRating < 1 && player.tone >= 60) {
                choices[TeaseType.BroPecDance]++;
                if (player.tone >= 70) choices[TeaseType.BroPecDance]++;
                if (player.tone >= 80) choices[TeaseType.BroPecDance]++;
                if (player.tone >= 90) choices[TeaseType.BroPecDance]++;
                if (player.tone == 100) choices[TeaseType.BroPecDance]++;
            }
            //9 Heroic Pose
            if (player.tone >= 60 && player.stats.str >= 50) {
                choices[TeaseType.BroHeroicPose]++;
                if (player.tone >= 80) choices[TeaseType.BroHeroicPose]++;
                if (player.stats.str >= 70) choices[TeaseType.BroHeroicPose]++;
                if (player.tone >= 90) choices[TeaseType.BroHeroicPose]++;
                if (player.stats.str >= 80) choices[TeaseType.BroHeroicPose]++;
            }
            //Cock flash!
            if (player.lowerBody.cockSpot.hasCock()) {
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
        //VANILLA FOLKS
        else {
            //Once chance of butt.
            choices[TeaseType.ButtShake]++;
            //Big butts get more butt
            if (player.lowerBody.butt.buttRating >= 7) choices[TeaseType.ButtShake]++;
            if (player.lowerBody.butt.buttRating >= 10) choices[TeaseType.ButtShake]++;
            if (player.lowerBody.butt.buttRating >= 14) choices[TeaseType.ButtShake]++;
            if (player.lowerBody.butt.buttRating >= 20) choices[TeaseType.ButtShake]++;
            if (player.lowerBody.butt.buttRating >= 25) choices[TeaseType.ButtShake]++;
            //Breast jiggle!
            if (largestBreastRating >= 2) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 4) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 8) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 15) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 30) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 50) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 75) choices[TeaseType.BreastJiggle]++;
            if (largestBreastRating >= 100) choices[TeaseType.BreastJiggle]++;
            //Pussy Flash!
            if (hasVagina) {
                choices[TeaseType.PussyFlash]++;
                if (vaginalWetness >= 3) choices[TeaseType.PussyFlash]++;
                if (vaginalWetness >= 5) choices[TeaseType.PussyFlash]++;
                if (vaginalCapacity >= 30) choices[TeaseType.PussyFlash]++;
                if (vaginalCapacity >= 60) choices[TeaseType.PussyFlash]++;
                if (vaginalCapacity >= 75) choices[TeaseType.PussyFlash]++;
            }
            //Cock flash!
            if (player.lowerBody.cockSpot.hasCock()) {
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
        //==EXTRAS========
        //12 Cat flexibility.
        if (player.perks.has("Flexibility") && player.lowerBody.isBiped() && hasVagina) {
            choices[TeaseType.CatFlexibility] += 2;
            if (vaginalWetness >= 3) choices[TeaseType.CatFlexibility]++;
            if (vaginalWetness >= 5) choices[TeaseType.CatFlexibility]++;
            if (vaginalCapacity >= 30) choices[TeaseType.CatFlexibility]++;
        }
        //13 Pregnant
        //if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 0) {
        if (player.pregnancy.isPregnant() || player.pregnancy.isButtPregnant()) {
            choices[TeaseType.Pregnant]++;
            const vagIncubationTime: number = player.pregnancy.listLargestIncubationTime[0].incubation;
            const buttIncubationTime: number = player.pregnancy.buttPregnancy.incubation;
            const incubationTime: number = vagIncubationTime < buttIncubationTime ? vagIncubationTime : buttIncubationTime;
            if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 180) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 120) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 100) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 50) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
            if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
        }
        //14 Brood Mother
        if (monster.lowerBody.cockSpot.hasCock() && hasVagina && player.perks.has("BroodMother") && !player.pregnancy.isPregnant() && !player.pregnancy.isButtPregnant()) {
            choices[TeaseType.BroodMother] += 3;
            if (player.inHeat) choices[TeaseType.BroodMother] += 7;
        }
        //15 Nipplecunts
        if (player.upperBody.chest.hasFuckableNipples()) {
            choices[TeaseType.Nipplecunts] += 2;
            if (hasVagina) choices[TeaseType.Nipplecunts] += 3;
            if (vaginalWetness >= 3) choices[TeaseType.Nipplecunts]++;
            if (vaginalWetness >= 5) choices[TeaseType.Nipplecunts]++;
            if (largestBreastRating >= 3) choices[TeaseType.Nipplecunts]++;
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength >= 3) choices[TeaseType.Nipplecunts]++;
        }
        //16 Anal gape
        if (player.lowerBody.butt.analLooseness >= 4) {
            choices[TeaseType.AnalGape]++;
            if (player.lowerBody.butt.analLooseness >= 5) choices[TeaseType.AnalGape]++;
        }
        //17 Bee abdomen tease
        if (player.lowerBody.tailType == TailType.BEE_ABDOMEN) {
            choices[TeaseType.BeeAbdomen] += 2;
        }
        //18 DOG TEASE
        if (RaceScore.dogScore(player) >= 4 && hasVagina && player.lowerBody.isBiped()) {
            choices[TeaseType.DogTease] += 2;
        }
        //19 Maximum Femininity:
        if (player.femininity >= 100) {
            choices[TeaseType.MaxFemininity] += 3;
        }
        //20 Maximum MAN:
        if (player.femininity <= 0) {
            choices[TeaseType.MaxManliness] += 3;
        }
        //21 Perfect Androgyny:
        if (player.femininity == 50) {
            choices[TeaseType.PerfectAndrogyny] += 3;
        }
        //22 SPOIDAH SILK
        if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN) {
            choices[TeaseType.SpirderSilk] += 3;
            if (RaceScore.spiderScore(player) >= 4) {
                choices[TeaseType.SpirderSilk] += 3;
            }
        }
        //23 RUT
        if (player.inRut && monster.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.cockSpot.hasCock()) {
            choices[TeaseType.Rut] += 5;
        }
        //24 Poledance - req's staff! - Req's gender!  Req's TITS!
        if (player.inventory.weapon.displayname == "wizard's staff" && largestBreastRating >= 1 && player.gender > 0) {
            choices[TeaseType.Poledance] += 5;
        }
        //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
        if (player.tallness - monster.tallness >= 24 && largestBreastRating >= 4) {
            choices[TeaseType.TallTease] += 5;
        }
        //26 SMART PEEPS! 70+ int, arouse spell!
        if (player.stats.int >= 70 && player.statusAffects.has("KnowsArouse")) {
            choices[TeaseType.Smartness] += 3;
        }
        //27 FEEDER
        if (player.perks.has("Feeder") && largestBreastRating >= 4) {
            choices[TeaseType.Feeder] += 3;
            if (largestBreastRating >= 10) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 15) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 25) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 40) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 60) choices[TeaseType.Feeder]++;
            if (largestBreastRating >= 80) choices[TeaseType.Feeder]++;
        }
        //28 FEMALE TEACHER COSTUME TEASE
        if (player.inventory.armor.displayName == "backless female teacher's clothes" && player.gender == 2) {
            choices[TeaseType.ClothesFemaleTeacher] += 4;
        }
        //29 Male Teacher Outfit Tease
        if (player.inventory.armor.displayName == "formal vest, tie, and crotchless pants" && player.gender == 1) {
            choices[TeaseType.ClothesMaleTeacher] += 4;
        }
        //30 Naga Fetish Clothes
        if (player.inventory.armor.displayName == "headdress, necklaces, and many body-chains") {
            choices[TeaseType.ClothesNagaFetish] += 4;
        }
        //31 Centaur harness clothes
        if (player.inventory.armor.displayName == "bridle bit and saddle set") {
            choices[TeaseType.ClothesCentaurHarness] += 4;
        }
        //32 Genderless servant clothes
        if (player.inventory.armor.displayName == "servant's clothes" && player.gender == 0) {
            choices[TeaseType.ClothesGenderlessServant] += 4;
        }
        //33 Crotch Revealing Clothes (herm only?)
        if (player.inventory.armor.displayName == "crotch-revealing clothes" && player.gender == 3) {
            choices[TeaseType.ClothesCrotchRevealing] += 4;
        }
        //34 Maid Costume (female only):
        if (player.inventory.armor.displayName == "maid's clothes" && hasVagina) {
            choices[TeaseType.ClothesMaid] += 4;
        }
        //35 Servant Boy Clothes (male only)
        if (player.inventory.armor.displayName == "cute servant's clothes" && player.lowerBody.cockSpot.hasCock()) {
            choices[TeaseType.ClothesServantBoy] += 4;
        }
        //36 Bondage Patient Clothes 
        if (player.inventory.armor.displayName == "bondage patient clothes") {
            choices[TeaseType.ClothesBondagePatient] += 4;
        }
        //37 Kitsune Tease
        //38 Kitsune Tease
        //39 Kitsune Tease
        //40 Kitsune Tease
        if (RaceScore.kitsuneScore(player) >= 2 && player.lowerBody.tailType == TailType.FOX) {
            choices[TeaseType.Kitsune1] += 4;
            choices[TeaseType.Kitsune2] += 4;
            choices[TeaseType.Kitsune3] += 4;
            choices[TeaseType.Kitsune4] += 4;
        }
        //41 Kitsune Gendered Tease
        if (RaceScore.kitsuneScore(player) >= 2 && player.lowerBody.tailType == TailType.FOX) {
            choices[TeaseType.KitsuneGendered] += 4;
        }
        //42 Urta teases!
        if (urtaQuest.isUrta()) {
            choices[TeaseType.Urta] += 9;
        }
        //43 - special mino + cowgirls
        if (player.lowerBody.vaginaSpot.hasVagina() && player.lactationQ() >= 500 && largestBreastRating >= 6 && RaceScore.cowScore(player) >= 3 && player.lowerBody.tailType == TailType.COW) {
            choices[TeaseType.Cowgirl] += 9;
        }
        //44 - Bikini Mail Teases!
        if (player.lowerBody.vaginaSpot.hasVagina() && largestBreastRating >= 4 && player.inventory.armor.displayName == "lusty maiden's armor") {
            choices[TeaseType.ClothesBikiniMail] += 15;
        }
        return this.selectChoice(choices);
    }

    private selectChoice(list: number[]): number {
        let randomChoice: number = Utils.rand(list.reduce((sum: number, value: number) => {
            return sum + value;
        }, 0));
        let counter = 0;
        for (let index = 0; index < list.length; index++){
            if (counter + list[index] >= randomChoice)
                return index;
            counter += list[index];
        }
    }

    public use(player: Player, monster: Monster, justText: boolean = false) {
        if (!justText) MainScreen.text("", true);
        //You cant tease a blind guy!
        if (monster.statusAffects.has("Blind")) {
            MainScreen.text("You do your best to tease " + monster.a + monster.short + " with your body.  It doesn't work - you blinded " + monster.pronoun2 + ", remember?\n\n", true);
            return;
        }
        if (player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 1) {
            MainScreen.text("You do your best to tease " + monster.a + monster.short + " with your body.  Your artless twirls have no effect, as <b>your ability to tease is sealed.</b>\n\n", true);
            return;
        }
        if (monster.short == "Sirius, a naga hypnotist") {
            MainScreen.text("He is too focused on your eyes to pay any attention to your teasing moves, <b>looks like you'll have to beat him up.</b>\n\n");
            return;
        }
        fatigueRecovery();
        let bimbo: boolean = player.perks.has("BimboBody") ? true : false;
        let bro: boolean = player.perks.has("BroBody") ? true : false;
        let futa: boolean = player.perks.has("FutaForm") ? true : false;
        let chance: number = this.determineBaseChance(player);
        let damage: number = this.determineBaseDamage(player);
        //10% for bimbo shits
        if (bimbo || bro || futa) {
            damage += 5;
            bimbo = true;
        }

        //Tags used for bonus damage and chance later on
        let breasts: boolean = false;
        let penis: boolean = false;
        let balls: boolean = false;
        let vagina: boolean = false;
        let anus: boolean = false;
        let ass: boolean = false;
        //If auto = true, set up bonuses using above flags
        let auto: boolean = true;
        //=======================================================
        //    CHOOSE YOUR TEASE AND DISPLAY IT!
        //=======================================================
        let choice: TeaseType = this.determineTeaseChoice(player, monster, bimbo, bro, futa);
        if (monster.short.indexOf("minotaur") != -1) {
            if (player.lowerBody.vaginaSpot.hasVagina() && player.lactationQ() >= 500 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && RaceScore.cowScore(player) >= 3 && player.lowerBody.tailType == TailType.COW)
            choice = TeaseType.Cowgirl;
        }
        //Lets do zis!
        switch (choice) {
            //0 butt shake
            case TeaseType.ButtShake:
                //Display
                MainScreen.text("You slap your " + ButtDescriptor.describeButt(player), false);
                if (player.lowerBody.butt.buttRating >= 10 && player.tone < 60) MainScreen.text(", making it jiggle delightfully.", false);
                else MainScreen.text(".", false);
                //Mod success
                ass = true;
                break;
            //1 BREAST JIGGLIN'
            case TeaseType.BreastJiggle:
                //Single breast row
                if (player.upperBody.chest.count() == 1) {
                    //50+ breastsize% success rate
                    MainScreen.text("Your lift your top, exposing your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " to " + monster.a + monster.short + ".  You shake them from side to side enticingly.", false);
                    if (player.stats.lust >= 50) MainScreen.text("  Your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s seem to demand " + monster.pronoun3 + " attention.", false);
                }
                //Multirow
                if (player.upperBody.chest.count() > 1) {
                    //50 + 10% per breastRow + breastSize%
                    MainScreen.text("You lift your top, freeing your rows of " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " to jiggle freely.  You shake them from side to side enticingly", false);
                    if (player.stats.lust >= 50) MainScreen.text(", your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s painfully visible.", false);
                    else MainScreen.text(".", false);
                    chance++;
                }
                breasts = true;
                break;
            //2 PUSSAH FLASHIN'
            case TeaseType.PussyFlash:
                if (player.lowerBody.isTaur()) {
                    MainScreen.text("You gallop toward your unsuspecting enemy, dodging their defenses and knocking them to the ground.  Before they can recover, you slam your massive centaur ass down upon them, stopping just short of using crushing force to pin them underneath you.  In this position, your opponent's face is buried right in your girthy horsecunt.  You grind your cunt into " + monster.pronoun3 + " face for a moment before standing.  When you do, you're gratified to see your enemy covered in your lubricant and smelling powerfully of horsecunt.", false);
                    chance += 2;
                    damage += 4;
                }
                else {
                    MainScreen.text("You open your " + player.inventory.armor.displayName + ", revealing your ", false);
                    if (player.lowerBody.cockSpot.count() > 0) {
                        chance++;
                        damage++;
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)), false);
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text(CockDescriptor.describeMultiCockShort(player), false);
                        MainScreen.text(" and ", false);
                        if (player.perks.has("BulgeArmor")) {
                            damage += 5;
                        }
                        penis = true;
                    }
                    MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)), false);
                    MainScreen.text(".", false);
                }
                vagina = true;
                break;
            //3 cock flash
            case TeaseType.CockFlash:
                if (player.lowerBody.isTaur() && player.lowerBody.cockSpot.countType(CockType.HORSE) > 0) {
                    MainScreen.text("You let out a bestial whinny and stomp your hooves at your enemy.  They prepare for an attack, but instead you kick your front hooves off the ground, revealing the hefty horsecock hanging beneath your belly.  You let it flop around, quickly getting rigid and to its full erect length.  You buck your hips as if you were fucking a mare in heat, letting your opponent know just what's in store for them if they surrender to pleasure...", false);
                    if (player.perks.has("BulgeArmor")) damage += 5;
                }
                else {
                    MainScreen.text("You open your " + player.inventory.armor.displayName + ", revealing your ", false);
                    if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)), false);
                    if (player.lowerBody.cockSpot.count() > 1) MainScreen.text(CockDescriptor.describeMultiCockShort(player), false);
                    if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ", false);
                    //Bulgy bonus!
                    if (player.perks.has("BulgeArmor")) {
                        damage += 5;
                        chance++;
                    }
                    if (player.lowerBody.vaginaSpot.count() > 0) {
                        MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)), false);
                        vagina = true;
                    }
                    MainScreen.text(".", false);
                }
                penis = true;
                break;
            //BIMBO
            //4 butt shake
            case TeaseType.BimboButtShake:
                MainScreen.text("You turn away and bounce your " + ButtDescriptor.describeButt(player) + " up and down hypnotically", false);
                //Big butts = extra text + higher success
                if (player.lowerBody.butt.buttRating >= 10) {
                    MainScreen.text(", making it jiggle delightfully.  " + monster.capitalA + monster.short + " even gets a few glimpses of the " + ButtDescriptor.describeButthole(player) + " between your cheeks.", false);
                    chance += 3;
                }
                //Small butts = less damage, still high success
                else {
                    MainScreen.text(", letting " + monster.a + monster.short + " get a good look at your " + ButtDescriptor.describeButthole(player) + " and " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".", false);
                    chance += 1;
                    vagina = true;
                }
                ass = true;
                anus = true;
                break;
            //5 breast jiggle
            case TeaseType.BimboBreastJiggle:
                MainScreen.text("You lean forward, letting the well-rounded curves of your " + BreastDescriptor.describeAllBreasts(player) + " show to " + monster.a + monster.short + ".", false);
                MainScreen.text("  You cup them in your palms and lewdly bounce them, putting on a show and giggling the entire time.  An inch at a time, your " + player.inventory.armor.displayName + " starts to come down, dropping tantalizingly slowly until your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s pop free.", false);
                if (player.stats.lust >= 50) {
                    if (player.upperBody.chest.hasFuckableNipples()) {
                        chance++;
                        MainScreen.text("  Clear slime leaks from them, making it quite clear that they're more than just nipples.", false);
                    }
                    else MainScreen.text("  Your hard nipples seem to demand " + monster.pronoun3 + " attention.", false);
                    chance += 1;
                    damage += 2;
                }
                //Damage boosts!
                breasts = true;
                break;
            //6 pussy flash
            case TeaseType.BimboPussyFlash:
                if (player.perks.has("BimboBrains") || player.perks.has("FutaFaculties")) {
                    MainScreen.text("You coyly open your " + player.inventory.armor.displayName + " and giggle, \"<i>Is this, like, what you wanted to see?</i>\"  ", false);
                }
                else {
                    MainScreen.text("You coyly open your " + player.inventory.armor.displayName + " and purr, \"<i>Does the thought of a hot, ", false);
                    if (futa) MainScreen.text("futanari ", false);
                    else if (player.perks.has("BimboBody")) MainScreen.text("bimbo ", false);
                    else MainScreen.text("sexy ");
                    MainScreen.text("body turn you on?</i>\"  ", false);
                }
                // No monster plural
                //if (monster.plural) MainScreen.text(monster.capitalA + monster.short + "' gazes are riveted on your groin as you run your fingers up and down your folds seductively.", false);
                //else
                MainScreen.text(monster.capitalA + monster.short + "'s gaze is riveted on your groin as you run your fingers up and down your folds seductively.", false);
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 3) MainScreen.text("  You smile as your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " swells out from the folds and stands proudly, begging to be touched.", false);
                else MainScreen.text("  You smile and pull apart your lower-lips to expose your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + ", giving the perfect view.", false);
                if (player.lowerBody.cockSpot.count() > 0) MainScreen.text("  Meanwhile, " + CockDescriptor.describeMultiCockSimpleOne(player) + " bobs back and forth with your gyrating hips, adding to the display.", false);
                //BONUSES!
                if (player.lowerBody.cockSpot.hasCock()) {
                    if (player.perks.has("BulgeArmor")) damage += 5;
                    penis = true;
                }
                vagina = true;
                break;
            //7 special Adjatha-crafted bend over bimbo times
            case TeaseType.BimboSpecial:
                MainScreen.text("The glinting of light catches your eye and you whip around to inspect the glittering object, turning your back on " + monster.a + monster.short + ".  Locking your knees, you bend waaaaay over, " + BreastDescriptor.describeChest(player) + " swinging in the open air while your " + ButtDescriptor.describeButt(player) + " juts out at the " + monster.a + monster.short + ".  Your plump cheeks and " + LowerBodyDescriptor.describeHips(player) + " form a jiggling heart-shape as you eagerly rub your thighs together.\n\n", false);
                MainScreen.text("The clear, warm fluid of your happy excitement trickles down from your loins, polishing your " + player.skin() + " to a glossy, inviting shine.  Retrieving the useless, though shiny, bauble, you hold your pose for just a moment longer, a sly little smile playing across your lips as you wiggle your cheeks one more time before straightening up and turning back around.", false);
                vagina = true;
                chance++;
                damage += 2;
                break;
            //==BRO STUFF=====
            //8 Pec Dance
            case TeaseType.BroPecDance:
                MainScreen.text("You place your hands on your hips and flex repeatedly, skillfully making your pecs alternatively bounce in a muscular dance.  ", false);
                if (player.perks.has("BroBrains")) MainScreen.text("Damn, " + monster.a + monster.short + " has got to love this!", false);
                else MainScreen.text(monster.capitalA + monster.short + " will probably enjoy the show, but you feel a bit silly doing this.", false);
                chance += (player.tone - 75) / 5;
                damage += (player.tone - 70) / 5;
                auto = false;
                break;
            //9 Heroic Pose
            case TeaseType.BroHeroicPose:
                MainScreen.text("You lift your arms and flex your incredibly muscular arms while flashing your most disarming smile.  ", false);
                if (player.perks.has("BroBrains")) MainScreen.text(monster.capitalA + monster.short + " can't resist such a heroic pose!", false);
                else MainScreen.text("At least the physical changes to your body are proving useful!", false);
                chance += (player.tone - 75) / 5;
                damage += (player.tone - 70) / 5;
                auto = false;
                break;
            //10 Bulgy groin thrust
            case TeaseType.BroBulgyGroinThrust:
                MainScreen.text("You lean back and pump your hips at " + monster.a + monster.short + " in an incredibly vulgar display.  The bulging, barely-contained outline of your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " presses hard into your gear.  ", false);
                if (player.perks.has("BroBrains")) MainScreen.text("No way could " + monster.pronoun1 + " resist your huge cock!", false);
                else MainScreen.text("This is so crude, but at the same time, you know it'll likely be effective.", false);
                MainScreen.text("  You go on like that, humping the air for your foe", false);
                MainScreen.text("'s", false);
                MainScreen.text(" benefit, trying to entice them with your man-meat.", false);
                if (player.perks.has("BulgeArmor")) damage += 5;
                penis = true;
                break;
            //11 Show off dick
            case TeaseType.BroShowOffDick:
                if (Game.silly() && Utils.rand(2) == 0) MainScreen.text("You strike a herculean pose and flex, whispering, \"<i>Do you even lift?</i>\" to " + monster.a + monster.short + ".", false);
                else {
                    MainScreen.text("You open your " + player.inventory.armor.displayName + " just enough to let your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " and " + BallsDescriptor.describeBalls(true, true, player) + " dangle free.  A shiny rope of pre-cum dangles from your cock, showing that your reproductive system is every bit as fit as the rest of you.  ", false);
                    if (player.perks.has("BroBrains")) MainScreen.text("Bitches love a cum-leaking cock.", false);
                    else MainScreen.text("You've got to admit, you look pretty good down there.", false);
                }
                if (player.perks.has("BulgeArmor")) damage += 5;
                penis = true;
                break;
            //==EXTRAS========
            //12 Cat flexibility.
            case TeaseType.CatFlexibility:
                //CAT TEASE MOTHERFUCK (requires flexibility and legs [maybe can't do it with armor?])
                MainScreen.text("Reaching down, you grab an ankle and pull it backwards, looping it up and over to touch the foot to your " + HeadDescriptor.describeHair(player) + ".  You bring the leg out to the side, showing off your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " through your " + player.inventory.armor.displayName + ".  The combination of the lack of discomfort on your face and the ease of which you're able to pose shows " + monster.a + monster.short + " how good of a time they're in for with you.", false);
                vagina = true;
                if (player.thickness < 33) chance++;
                else if (player.thickness >= 66) chance--;
                damage += (player.thickness - 50) / 10;
                break;
            //13 Pregnant
            case TeaseType.Pregnant:
                //PREG
                MainScreen.text("You lean back, feigning a swoon while pressing a hand on the small of your back.  The pose juts your huge, pregnant belly forward and makes the shiny spherical stomach look even bigger.  With a teasing groan, you rub the protruding tummy gently, biting your lip gently as you stare at " + monster.a + monster.short + " through heavily lidded eyes.  \"<i>All of this estrogen is making me frisky,</i>\" you moan, stroking hand gradually shifting to the southern hemisphere of your big baby-bump.", false);
                //if lactating] 
                if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1) {
                    MainScreen.text("  Your other hand moves to expose your " + BreastDescriptor.describeChest(player) + ", cupping and squeezing a stream of milk to leak down the front of your " + player.inventory.armor.displayName + ".  \"<i>Help a mommy out.</i>\"\n\n", false);
                    chance += 2;
                    damage += 4;
                }
                if (player.pregnancyIncubation < 100) {
                    chance++;
                    damage += 2;
                }
                if (player.pregnancyIncubation < 50) {
                    chance++;
                    damage += 2;
                }
                break;
            //14 Brood Mother
            case TeaseType.BroodMother:
                if (Utils.rand(2) == 0) MainScreen.text("You tear open your " + player.inventory.armor.displayName + " and slip a few fingers into your well-used birth canal, giving your opponent a good look at what they're missing.  \"<i>C'mon stud,</i>\" you say, voice dripping with lust and desire, \"<i>Come to mama " + player.short + " and fuck my pussy 'til your baby batter just POURS out.  I want your children inside of me, I want your spawn crawling out of this cunt and begging for my milk.  Come on, FUCK ME PREGNANT!</i>\"", false);
                else MainScreen.text("You wiggle your " + LowerBodyDescriptor.describeHips(player) + " at your enemy, giving them a long, tantalizing look at the hips that have passed so very many offspring.  \"<i>Oh, like what you see, bad boy?  Well why don't you just come on over and stuff that cock inside me?  Give me your seed, and I'll give you suuuuch beautiful offspring.  Oh?  Does that turn you on?  It does!  Come on, just let loose and fuck me full of your babies!</i>\"", false);
                chance += 2;
                damage += 4;
                if (player.inHeat) {
                    chance += 2;
                    damage += 4;
                }
                vagina = true;
                break;
            //15 Nipplecunts
            case TeaseType.Nipplecunts:
                //Req's tits & Pussy
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1 && player.lowerBody.vaginaSpot.hasVagina() && Utils.rand(2) == 0) {
                    MainScreen.text("Closing your eyes, you lean forward and slip a hand under your " + player.inventory.armor.displayName + ".  You let out the slightest of gasps as your fingers find your drooling honeypot, warm tips poking, one after another between your engorged lips.  When you withdraw your hand, your fingers have been soaked in the dripping passion of your cunny, translucent beads rolling down to wet your palm.  With your other hand, you pull down the top of your " + player.inventory.armor.displayName + " and bare your " + BreastDescriptor.describeChest(player) + " to " + monster.a + monster.short + ".\n\n", false);
                    MainScreen.text("Drawing your lust-slick hand to your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s, the yielding flesh of your cunt-like nipples parts before the teasing digits.  Using your own girl cum as added lubrication, you pump your fingers in and out of your nipples, moaning as you add progressively more digits until only your thumb remains to stroke the inflamed flesh of your over-stimulated chest.  Your throat releases the faintest squeak of your near-orgasmic delight and you pant, withdrawing your hands and readjusting your armor.\n\n", false);
                    MainScreen.text("Despite how quiet you were, it's clear that every lewd, desperate noise you made was heard by " + monster.a + monster.short + ".", false);
                    chance += 2;
                    damage += 4;
                }
                else if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1 && Utils.rand(2) == 0) {
                    MainScreen.text("You yank off the top of your " + player.inventory.armor.displayName + ", revealing your " + BreastDescriptor.describeChest(player) + " and the gaping nipplecunts on each.  With a lusty smirk, you slip a pair of fingers into the nipples of your " + BreastDescriptor.describeChest(player) + ", pulling the nipplecunt lips wide, revealing the lengthy, tight passage within.  You fingerfuck your nipplecunts, giving your enemy a good show before pulling your armor back on, leaving the tantalizing image of your gaping titpussies to linger in your foe's mind.", false);
                    chance += 1;
                    damage += 2;
                }
                else MainScreen.text("You remove the front of your " + player.inventory.armor.displayName + " exposing your " + BreastDescriptor.describeChest(player) + ".  Using both of your hands, you thrust two fingers into your nipple cunts, milky girl cum soaking your hands and fingers.  \"<i>Wouldn't you like to try out these holes too?</i>\"", false);
                breasts = true;
                break;
            //16 Anal gape
            case TeaseType.AnalGape:
                MainScreen.text("You quickly strip out of your " + player.inventory.armor.displayName + " and turn around, giving your " + ButtDescriptor.describeButt(player) + " a hard slap and showing your enemy the real prize: your " + ButtDescriptor.describeButthole(player) + ".  With a smirk, you easily plunge your hand inside, burying yourself up to the wrist inside your anus.  You give yourself a quick fisting, watching the enemy over your shoulder while you moan lustily, sure to give them a good show.  You withdraw your hand and give your ass another sexy spank before readying for combat again.", false);
                anus = true;
                ass = true;
                break;
            //17 Bee abdomen tease
            case TeaseType.BeeAbdomen:
                MainScreen.text("You swing around, shedding the " + player.inventory.armor.displayName + " around your waist to expose your " + ButtDescriptor.describeButt(player) + " to " + monster.a + monster.short + ".  Taking up your oversized bee abdomen in both hands, you heft the thing and wave it about teasingly.  Drops of venom drip to and fro, a few coming dangerously close to " + monster.pronoun2 + ".  \"<i>Maybe if you behave well enough, I'll even drop a few eggs into your belly,</i>\" you say softly, dropping the abdomen back to dangle above your butt and redressing.", false);
                ass = true;
                chance += .5;
                damage += .5;
                break;
            //18 DOG TEASE
            case TeaseType.DogTease:
                MainScreen.text("You sit down like a dog, your [legs] are spread apart, showing your ", false);
                if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("parted cunt-lips", false);
                else MainScreen.text("puckered asshole, hanging, erect maleness,", false);
                MainScreen.text(" and your hands on the ground in front of you.  You pant heavily with your tongue out and promise, \"<i>I'll be a good little bitch for you</i>.\"", false);
                vagina = true;
                chance += 1;
                damage += 2;
                break;
            //19 MAX FEM TEASE - SYMPHONIE
            case TeaseType.MaxFemininity:
                MainScreen.text("You make sure to capture your foe's attention, then slowly and methodically allow your tongue to slide along your lush, full lips.  The glistening moisture that remains on their plump beauty speaks of deep lust and deeper throats.  Batting your long lashes a few times, you pucker them into a playful blown kiss, punctuating the act with a small moan. Your gorgeous feminine features hint at exciting, passionate moments together, able to excite others with just your face alone.", false);
                chance += 2;
                damage += 4;
                break;
            //20 MAX MASC TEASE
            case TeaseType.MaxManliness:
                MainScreen.text("As your foe regards you, you recognize their attention is fixated on your upper body.  Thrusting your strong jaw forward you show off your chiseled chin, handsome features marking you as a flawless specimen.  Rolling your broad shoulders, you nod your head at your enemy.  The strong, commanding presence you give off could melt the heart of an icy nun.  Your perfect masculinity speaks to your confidence, allowing you to excite others with just your face alone.", false);
                chance += 2;
                damage += 4;
                break;
            //21 MAX ADROGYN
            case TeaseType.PerfectAndrogyny:
                MainScreen.text("You reach up and run your hands down your delicate, androgynous features.  With the power of a man but the delicacy of a woman, looking into your eyes invites an air of enticing mystery.  You blow a brief kiss to your enemy while at the same time radiating a sexually exciting confidence.  No one could identify your gender by looking at your features, and the burning curiosity they encourage could excite others with just your face alone.", false);
                damage -= 3;
                break;
            //22 SPOIDAH SILK
            case TeaseType.SpirderSilk:
                MainScreen.text("Reaching back, you milk some wet silk from your spider-y abdomen and present it to " + monster.a + monster.short + ", molding the sticky substance as " + monster.pronoun1 + " looks on curiously.  Within moments, you hold up a silken heart scuplture, and with a wink, you toss it at " + monster.pronoun2 + ". It sticks to " + monster.pronoun3 + " body, the sensation causing " + monster.pronoun2 + " to hastily slap the heart off.  " + monster.mf("He", "She") + " returns " + monster.pronoun3 + " gaze to you to find you turned around, " + ButtDescriptor.describeButt(player) + " bared and abdomen bouncing lazily.  \"<i>I wonder what would happen if I webbed up your hole after I dropped some eggs inside?</i>\" you hiss mischievously.  " + monster.mf("He", "She") + " gulps.", false);
                ass = true;
                break;
            //23 RUT TEASE
            case TeaseType.Rut:
                if (player.lowerBody.cockSpot.countType(CockType.HORSE) > 0 && player.longestHorseCockLength() >= 12) {
                    MainScreen.text("You whip out your massive horsecock, and are immediately surrounded by a massive, heady musk.  Your enemy swoons, nearly falling to her knees under your oderous assault.  Grinning, you grab her shoulders and force her to her knees.  Before she can defend herself, you slam your horsecock onto her head, running it up and down on her face, her nose acting like a sexy bump in an onahole.  You fuck her face -- literally -- for a moment before throwing her back and sheathing your cock.", false);
                }
                else {
                    MainScreen.text("Panting with your unstoppable lust for the delicious, impregnable cunt before you, you yank off your " + player.inventory.armor.displayName + " with strength born of your inhuman rut, and quickly wave your fully erect cock at your enemy.  She flashes with lust, quickly feeling the heady effect of your man-musk.  You rush up, taking advantage of her aroused state and grab her shoulders.  ", false);
                    MainScreen.text("Before she can react, you push her down until she's level with your cock, and start to spin it in a circle, slapping her right in the face with your musky man-meat.  Her eyes swim, trying to follow your meatspin as you swat her in the face with your cock!  Satisfied, you release her and prepare to fight!", false);
                }
                penis = true;
                break;
            //24 STAFF POLEDANCE
            case TeaseType.Poledance:
                MainScreen.text("You run your tongue across your lips as you plant your staff into the ground.  Before your enemy can react, you spin onto the long, wooden shaft, using it like an impromptu pole.  You lean back against the planted staff, giving your enemy a good look at your body.  You stretch backwards like a cat, nearly touching your fingertips to the ground beneath you, now holding onto the staff with only one leg.  You pull yourself upright and give your " + ButtDescriptor.describeButt(player) + " a little slap and your " + BreastDescriptor.describeChest(player) + " a wiggle before pulling open your " + player.inventory.armor.displayName + " and sliding the pole between your tits.  You drop down to a low crouch, only just covering your genitals with your hand as you shake your " + ButtDescriptor.describeButt(player) + " playfully.  You give the enemy a little smirk as you slip your " + player.inventory.armor.displayName + " back on and pick up your staff.", false);
                ass = true;
                breasts = true;
                break;
            //TALL WOMAN TEASE
            case TeaseType.TallTease:
                MainScreen.text("You move close to your enemy, handily stepping over " + monster.pronoun3 + " defensive strike before leaning right down in " + monster.pronoun3 + " face, giving " + monster.pronoun2 + " a good long view at your cleavage.  \"<i>Hey, there, little " + GenderDescriptor.mf(monster, "guy", "girl") + ",</i>\" you smile.  Before " + monster.pronoun1 + " can react, you grab " + monster.pronoun2 + " and smoosh " + monster.pronoun3 + " face into your " + BreastDescriptor.describeAllBreasts(player) + ", nearly choking " + monster.pronoun2 + " in the canyon of your cleavage.  " + GenderDescriptor.mf(monster, "He", "She") + " struggles for a moment.  You give " + monster.pronoun2 + " a little kiss on the head and step back, ready for combat.", false);
                breasts = true;
                chance += 2;
                damage += 4;
                break;
            //Magic Tease
            case TeaseType.Smartness:
                MainScreen.text("Seeing a lull in the battle, you plant your " + player.inventory.weapon.displayname + " on the ground and let your magic flow through you.  You summon a trickle of magic into a thick, slowly growing black ball of lust.  You wave the ball in front of you, making a little dance and striptease out of the affair as you slowly saturate the area with latent sexual magics.", false);
                chance++;
                damage += 2;
                break;
            //Feeder
            case TeaseType.Feeder:
                MainScreen.text("You present your swollen breasts full of milk to " + monster.a + monster.short + " and say \"<i>Wouldn't you just love to lie back in my arms and enjoy what I have to offer you?</i>\"", false);
                breasts = true;
                chance++;
                damage++;
                break;
            //28 FEMALE TEACHER COSTUME TEASE
            case TeaseType.ClothesFemaleTeacher:
                MainScreen.text("You turn to the side and give " + monster.a + monster.short + " a full view of your body.  You ask them if they're in need of a private lesson in lovemaking after class.", false);
                ass = true;
                break;
            //29 Male Teacher Outfit Tease
            case TeaseType.ClothesMaleTeacher:
                MainScreen.text("You play with the strings on your outfit a bit and ask " + monster.a + monster.short + " just how much do they want to see their teacher pull them off?", false);
                chance++;
                damage += 3;
                break;
            //30 Naga Fetish Clothes
            case TeaseType.ClothesNagaFetish:
                MainScreen.text("You sway your body back and forth, and do an erotic dance for " + monster.a + monster.short + ".", false);
                chance += 2;
                damage += 4;
                break;
            //31 Centaur harness clothes
            case TeaseType.ClothesCentaurHarness:
                MainScreen.text("You rear back, and declare that, \"<i>This horse is ready to ride, all night long!</i>\"", false);
                chance += 2;
                damage += 4;
                break;
            //32 Genderless servant clothes
            case TeaseType.ClothesGenderlessServant:
                MainScreen.text("You turn your back to your foe, and flip up your butt flap for a moment.   Your " + ButtDescriptor.describeButt(player) + " really is all you have to offer downstairs.", false);
                ass = true;
                chance++;
                damage += 2;
                break;
            //33 Crotch Revealing Clothes (herm only?)
            case TeaseType.ClothesCrotchRevealing:
                MainScreen.text("You do a series of poses to accentuate what you've got on display with your crotch revealing clothes, while asking if your " + GenderDescriptor.mf(player, "master", "mistress") + " is looking to sample what is on display.", false);
                chance += 2;
                damage += 4;
                break;
            //34 Maid Costume (female only)
            case TeaseType.ClothesMaid:
                MainScreen.text("You give a rather explicit curtsey towards " + monster.a + monster.short + " and ask them if your " + GenderDescriptor.mf(player, "master", "mistress") + " is interested in other services today.", false);
                chance++;
                damage += 2;
                breasts = true;
                break;
            //35 Servant Boy Clothes (male only)
            case TeaseType.ClothesServantBoy:
                MainScreen.text("You brush aside your crotch flap for a moment, then ask " + monster.a + monster.short + " if, " + GenderDescriptor.mf(player, "Master", "Mistress") + " would like you to use your " + CockDescriptor.describeMultiCockShort(player) + " on them?", false);
                penis = true;
                chance++;
                damage += 2;
                break;
            //36 Bondage Patient Clothes (done):
            case TeaseType.ClothesBondagePatient:
                MainScreen.text("You pull back one of the straps on your bondage cloths and let it snap back.  \"<i>I need some medical care, feeling up for it?</i>\" you tease.", false);
                damage += 2;
                chance++;
                break;
            default:
                MainScreen.text("You shimmy and shake sensually. (An error occurred.)", false);
                break;
            case TeaseType.Kitsune1:
                MainScreen.text("You purse your lips coyly, narrowing your eyes mischievously and beckoning to " + monster.a + monster.short + " with a burning come-hither glare.  Sauntering forward, you pop your hip to the side and strike a coquettish pose, running " + ((player.lowerBody.tailVenom > 1) ? "one of your tails" : "your tail") + " up and down " + monster.pronoun3 + " body sensually.");
                chance += 6;
                damage += 3;
                break;
            case TeaseType.Kitsune2:
                MainScreen.text("You wet your lips, narrowing your eyes into a smoldering, hungry gaze.  Licking the tip of your index finger, you trail it slowly and sensually down the front of your " + player.inventory.armor.displayName + ", following the line of your " + BreastDescriptor.describeChest(player) + " teasingly.  You hook your thumbs into your top and shimmy it downward at an agonizingly slow pace.  The very instant that your [nipples] pop free, your tail crosses in front, obscuring " + monster.a + monster.short + "'s view.");
                breasts = true;
                chance++;
                damage++;
                break;
            case TeaseType.Kitsune3:
                MainScreen.text("Leaning forward, you bow down low, raising a hand up to your lips and blowing " + monster.a + monster.short + " a kiss.  You stand straight, wiggling your " + LowerBodyDescriptor.describeHips(player) + " back and forth seductively while trailing your fingers down your front slowly, pouting demurely.  The tip of ");
                if (player.lowerBody.tailVenom == 1) MainScreen.text("your");
                else MainScreen.text("a");
                MainScreen.text(" bushy tail curls up around your " + LowerBodyDescriptor.describeLeg(player) + ", uncoiling with a whipping motion that makes an audible crack in the air.");
                ass = true;
                chance++;
                damage += 1;
                break;
            case TeaseType.Kitsune4:
                MainScreen.text("Turning around, you stare demurely over your shoulder at " + monster.a + monster.short + ", batting your eyelashes amorously.");
                if (player.lowerBody.tailVenom == 1) MainScreen.text("  Your tail twists and whips about, sliding around your " + LowerBodyDescriptor.describeHips(player) + " in a slow arc and framing your rear nicely as you slowly lift your " + player.inventory.armor.displayName + ".");
                else MainScreen.text("  Your tails fan out, twisting and whipping sensually, sliding up and down your " + LowerBodyDescriptor.describeLegs(player) + " and framing your rear nicely as you slowly lift your " + player.inventory.armor.displayName + ".");
                MainScreen.text("  As your [butt] comes into view, you brush your tail" + ((player.lowerBody.tailVenom > 1) ? "s" : "") + " across it, partially obscuring the view in a tantalizingly teasing display.");
                ass = true;
                anus = true;
                chance++;
                damage += 2;
                break;
            case TeaseType.KitsuneGendered:
                MainScreen.text("Smirking coyly, you sway from side to side, running your tongue along your upper teeth seductively.  You hook your thumbs into your " + player.inventory.armor.displayName + " and pull them away to partially reveal ");
                if (player.lowerBody.cockSpot.count() > 0) MainScreen.text(CockDescriptor.describeMultiCockSimpleOne(player));
                if (player.gender == 3) MainScreen.text(" and ");
                if (player.gender >= 2) MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
                MainScreen.text(".  Your bushy tail" + ((player.lowerBody.tailVenom > 1) ? "s" : "") + " cross" + ((player.lowerBody.tailVenom > 1) ? "" : "es") + " in front, wrapping around your genitals and obscuring the view teasingly.");
                vagina = true;
                penis = true;
                damage += 2;
                chance++;
                break;
            case TeaseType.Urta:
                //Tease #1:
                if (Utils.rand(2) == 0) {
                    MainScreen.text("You lift your skirt and flash your king-sized stallionhood, already unsheathing itself and drooling pre, at your opponent.  \"<i>Come on, then; I got plenty of girlcock for you if that's what you want!</i>\" you cry.");
                    penis = true;
                    damage += 3;
                    chance--;
                }
                //Tease #2:
                else {
                    MainScreen.text("You turn partially around and then bend over, swaying your tail from side to side in your most flirtatious manner and wiggling your hips seductively, your skirt fluttering with the motions.  \"<i>Come on then, what are you waiting for?  This is a fine piece of ass here,</i>\" you grin, spanking yourself with an audible slap.");
                    ass = true;
                    chance += 2;
                    damage += 3;
                }
                break;
            case TeaseType.Cowgirl:
                let cows: number = Utils.rand(7);
                if (cows == 0) {
                    MainScreen.text("You tuck your hands under your chin and use your arms to squeeze your massive, heavy breasts together.  Milk squirts from your erect nipples, filling the air with a rich, sweet scent.");
                    breasts = true;
                    chance += 2;
                    damage++;
                }
                else if (cows == 1) {
                    MainScreen.text("Moaning, you bend forward, your full breasts nearly touching the ground as you sway your [hips] from side to side.  Looking up from under heavily-lidded eyes, you part your lips and lick them, letting out a low, lustful \"<i>Mooooo...</i>\"");
                    breasts = true;
                    chance += 2;
                    damage += 2;
                }
                else if (cows == 2) {
                    MainScreen.text("You tuck a finger to your lips, blinking innocently, then flick your tail, wafting the scent of your ");
                    if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) MainScreen.text("dripping ");
                    MainScreen.text("sex through the air.");
                    vagina = true;
                    chance++;
                    damage++;
                }
                else if (cows == 3) {
                    MainScreen.text("You heft your breasts, fingers splayed across your [nipples] as you SQUEEZE.  Milk runs in rivulets over your hands and down the massive curves of your breasts, soaking your front with sweet, sticky milk.");
                    breasts = true;
                    chance += 3;
                    damage++;
                }
                else if (cows == 4) {
                    MainScreen.text("You lift a massive breast to your mouth, suckling loudly at yourself, finally letting go of your nipple with a POP and a loud, satisfied gasp, milk running down your chin.");
                    breasts = true;
                    chance++;
                    damage += 3;
                }
                else if (cows == 5) {
                    MainScreen.text("You crouch low, letting your breasts dangle in front of you.  Each hand caresses one in turn as you slowly milk yourself onto your thighs, splashing white, creamy milk over your hips and sex.");
                    vagina = true;
                    breasts = true;
                    chance++;
                }
                else {
                    MainScreen.text("You lift a breast to your mouth, taking a deep draught of your own milk, then tilt your head back.  With a low moan, you let it run down your front, winding a path between your breasts until it drips sweetly from your crotch.");
                    vagina = true;
                    breasts = true;
                    damage += 2;
                }
                if (monster.short.indexOf("minotaur") != -1) {
                    damage += 6;
                    chance += 3;
                }
                break;
            //lusty maiden's armor teases
            case TeaseType.ClothesBikiniMail:
                let maiden: number = Utils.rand(5);
                damage += 5;
                chance += 3;
                if (maiden == 0) {
                    MainScreen.text("Confidently sauntering forward, you thrust your chest out with your back arched in order to enhance your [chest].  You slowly begin to shake your torso back and forth, slapping your chain-clad breasts against each other again and again.  One of your hands finds its way to one of the pillowy expanses and grabs hold, fingers sinking into the soft tit through the fine, mail covering.  You stop your shaking to trace a finger down through the exposed center of your cleavage, asking, \"<i>Don't you just want to snuggle inside?</i>\"");
                    breasts = true;
                }
                else if (maiden == 1) {
                    MainScreen.text("You skip up to " + monster.a + monster.short + " and spin around to rub your barely-covered butt up against " + monster.pronoun2 + ".  Before " + monster.pronoun1 + " can react, you're slowly bouncing your [butt] up and down against " + monster.pronoun3 + " groin.  When " + monster.pronoun1 + " reaches down, you grab " + monster.pronoun3 + " hand and press it up, under your skirt, right against the steamy seal on your sex.  The simmering heat of your overwhelming lust burns hot enough for " + monster.pronoun2 + " to feel even through the contoured leather, and you let " + monster.pronoun2 + " trace the inside of your [leg] for a moment before moving away, laughing playfully.");
                    ass = true;
                    vagina = true;
                }
                else if (maiden == 2) {
                    MainScreen.text("You flip up the barely-modest chain you call a skirt and expose your g-string to " + monster.a + monster.short + ".  Slowly swaying your [hips], you press a finger down on the creased crotch plate and exaggerate a lascivious moan into a throaty purr of enticing, sexual bliss.  Your eyes meet " + monster.pronoun3 + ", and you throatily whisper, \"<i>");
                    if (player.lowerBody.vaginaSpot.isVirgin()) MainScreen.text("Think you can handle a virgin's infinite lust?");
                    else MainScreen.text("Think you have what it takes to satisfy this perfect pussy?");
                    MainScreen.text("</i>\"");
                    vagina = true;
                    damage += 3;
                }
                else if (maiden == 3) {
                    MainScreen.text("You seductively wiggle your way up to " + monster.a + monster.short + ", and before " + monster.pronoun1 + " can react to your salacious advance, you snap a [leg] up in what would be a vicious kick, if you weren't simply raising it to rest your [foot] on " + monster.pronoun3 + " shoulder.  With your thighs so perfectly spready, your skirt is lifted, and " + monster.a + monster.short + " is given a perfect view of your thong-enhanced cameltoe and the moisture that beads at the edges of your not-so-modest covering.");
                    vagina = true;
                }
                else {
                    MainScreen.text("Bending over, you lift your [butt] high in the air.  Most of your barely-covered tush is exposed, but the hem of your chainmail skirt still protects some of your anal modesty.  That doesn't last long.  You start shaking your [butt] up, down, back, and forth to an unheard rhythm, flipping the pointless covering out of the way so that " + monster.a + monster.short + " can gaze upon your curvy behind in it all its splendid detail.  A part of you hopes that " + monster.pronoun1 + " takes in the intricate filigree on the back of your thong, though to " + monster.pronoun2 + " it looks like a bunch of glittering arrows on an alabaster background, all pointing squarely at your [asshole].");
                    ass = true;
                    chance += 2;
                }
                break;
        }
        //===========================
        //BUILD BONUSES IF APPLICABLE
        //===========================	
        let bonusChance: number = 0;
        let bonusDamage: number = 0;
        if (auto) {
            //TIT BONUSES
            if (breasts) {
                if (player.upperBody.chest.count() > 1) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.count() > 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.count() > 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 2) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 3) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 25) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.hasFuckableNipples()) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (player.upperBody.chest.averageNipplesPerBreast() > 1) {
                    bonusChance++;
                    bonusDamage += 2;
                }
            }
            //PUSSY BONUSES
            if (vagina) {
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 1.5) {
                    bonusChance += .5;
                    bonusDamage++;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 3.5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            //Penis bonuses!
            if (penis) {
                if (player.lowerBody.cockSpot.count() > 1) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() >= 15) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() >= 60) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 150) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 300) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 1000) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.balls > 0) {
                    if (player.lowerBody.balls > 2) {
                        bonusChance += 1;
                        bonusDamage += 2;
                    }
                    if (player.lowerBody.ballSize > 3) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (player.lowerBody.ballSize > 7) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (player.lowerBody.ballSize > 12) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                }
                if (player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() < 8) {
                    bonusChance--;
                    bonusDamage -= 2;
                    if (player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() < 5) {
                        bonusChance--;
                        bonusDamage -= 2;
                    }
                }
            }
            if (ass) {
                if (player.lowerBody.butt.buttRating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            if (anus) {
                if (player.lowerBody.butt.analLooseness == 0) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
                if (player.lowerBody.butt.analWetness > 0) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (player.analCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.analCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.analCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.analCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.analLooseness == 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.analLooseness == 5) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
            }
            //Trim it down!
            if (bonusChance > 5) bonusChance = 5;
            if (bonusDamage > 10) bonusDamage = 10;
        }
        //Land the hit!
        if (Utils.rand(100) <= chance + Utils.rand(bonusChance)) {
            //NERF TEASE DAMAGE
            damage *= .7;
            bonusDamage *= .7;
            if (player.perks.has("HistoryWhore")) {
                damage *= 1.15;
                bonusDamage *= 1.15;
            }
            if (player.perks.has("ChiReflowLust")) damage *= UmasShop.NEEDLEWORK_LUST_TEASE_DAMAGE_MULTI;
            // No plural monster
            //if (monster.plural) damage *= 1.3;
            damage = (damage + Utils.rand(bonusDamage)) * monster.lustVuln;

            if (monster instanceof JeanClaude) (monster as JeanClaude).handleTease(damage, true);
            else if (monster instanceof Doppleganger && !monster.statusAffects.has("Stunned")) (monster as Doppleganger).mirrorTease(damage, true);
            else if (!justText) monster.teased(damage);

            if (Flags.list[FlagEnum.PC_FETISH] >= 1 && !urtaQuest.isUrta()) {
                if (player.stats.lust < 75) MainScreen.text("\nFlaunting your body in such a way gets you a little hot and bothered.", false);
                else MainScreen.text("\nIf you keep exposing yourself you're going to get too horny to fight back.  This exhibitionism fetish makes it hard to resist just stripping naked and giving up.", false);
                if (!justText) player.stats.lust += 2 + Utils.rand(3);
            }

            // Similar to fetish check, only add XP if the player IS the player...
            if (!justText && !urtaQuest.isUrta()) teaseXP(1);
        }
        //Nuttin honey
        else {
            if (!justText && !urtaQuest.isUrta()) teaseXP(5);

            if (monster instanceof JeanClaude) (monster as JeanClaude).handleTease(0, false);
            else if (monster instanceof Doppleganger) (monster as Doppleganger).mirrorTease(0, false);
            else if (!justText) MainScreen.text("\n" + monster.capitalA + monster.short + " seems unimpressed.", false);
        }
        MainScreen.text("\n\n", false);

    }
}