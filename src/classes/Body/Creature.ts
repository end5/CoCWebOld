import UpperBody, { WingType } from "./UpperBody";
import LowerBody, { LowerBodyType } from "./LowerBody";
import Stats from "./Stats";
import ComponentList from "../Utilities/ComponentList";
import Utils from "../Utilities/Utils";
import BreastRow from "./BreastRow";
import Vagina, { VaginaLooseness } from "./Vagina";
import { PregnancyType } from "./Pregnancy";
import Butt, { ButtLooseness } from "./Butt";
import Cock from "./Cock";
import { SaveInterface } from "../SaveInterface";
import MainScreen from "../display/MainScreen";
import StatusAffect from "../Effects/StatusAffect";
import CockDescriptor from "../Descriptors/CockDescriptor";
import PregnancyManager from "./PregnancyManager";

export enum Gender {
    NONE, MALE, FEMALE, HERM
}

export enum SkinType {
    PLAIN, FUR, SCALES, GOO, UNDEFINED
}

export default class Creature implements SaveInterface {
    //Appearance Variables
    public gender: Gender = Gender.NONE;
    public tallness: number = 0;

    public skinType: SkinType = SkinType.PLAIN;
    public skinTone: string = "albino";
    public skinDesc: string = "skin";
    public skinAdj: string = "";

    //Used for hip ratings
    public thickness: number;

    //Body tone i.e. Lithe, stocky, etc
    public tone: number;
    private _femininity: number;

    //Fertility is a % out of 100.
    public fertility: number = 10;
    public cumMultiplier: number = 1;
    public hoursSinceCum: number = 0;

    public upperBody: UpperBody;
    public lowerBody: LowerBody;

    public pregnancy: PregnancyManager;

    public stats: Stats;
    public statusAffects: ComponentList<StatusAffect>;
    public get perks(): ComponentList<StatusAffect> {
        return this.statusAffects;
    }

    public constructor() {
        this.gender = Gender.NONE;
        this.tallness = 0;
        this.skinType = SkinType.PLAIN;
        this.skinTone = "albino";
        this.skinDesc = "skin";
        this.skinAdj = "";

        this._femininity = 50;
        this.tone = 0;
        this.thickness = 0;

        this.fertility = 10;
        this.cumMultiplier = 1;
        this.hoursSinceCum = 0;

        this.upperBody = new UpperBody();
        this.lowerBody = new LowerBody();

        this.pregnancy = new PregnancyManager();

        this.stats = new Stats(this);
        this.statusAffects = new ComponentList<StatusAffect>();
    }

    public get femininity(): number {
        if (this.statusAffects.has("UmasMassage")) {
            let statAffect: StatusAffect = this.statusAffects.get("UmasMassage");
            if (statAffect.value1 == UmasShop.MASSAGE_MODELLING_BONUS)
                this._femininity += statAffect.value2;
        }

        if (this._femininity > 100)
            this._femininity = 100;

        return this._femininity;
    }

    public set femininity(value: number) {
        if (value > 100)
            value = 100;
        else if (value < 0)
            value = 0;

        this.femininity = value;
    }


    public orgasm(): void {
        this.stats.lustResisted = false;
        this.stats.lust = 0;
        this.hoursSinceCum = 0;
        let gildedCockSocks: number = this.lowerBody.cockSpot.cockSocks("gilded").length;
        if (gildedCockSocks > 0) {

            let randomCock: Cock = Utils.randomChoice(this.lowerBody.cockSpot.listLargestCockArea);
            let bonusGems: number = Utils.rand(randomCock.cockThickness) + gildedCockSocks;
            MainScreen.text("\n\nFeeling some minor discomfort in your " + CockDescriptor.describeCock(this, randomCock) + " you slip it out of your [armor] and examine it. <b>With a little exploratory rubbing and massaging, you manage to squeeze out " + bonusGems + " gems from its cum slit.</b>\n\n");
            this.stats.gems += bonusGems;
        }
    }


    // TODO: Fix this function
    public boostLactation(boostAmt: number): number {
        if (!this.upperBody.chest.hasBreasts)
            return 0;
        let breasts: BreastRow;
        let changes: number = 0;
        let temp2: number = 0;
        //Prevent lactation decrease if lactating.
        if (boostAmt >= 0) {
            if (this.statusAffects.has("LactationReduction"))
                this.statusAffects.get("LactationReduction").value1 = 0;
            if (this.statusAffects.has("LactationReduc0"))
                this.statusAffects.remove("LactationReduc0");
            if (this.statusAffects.has("LactationReduc1"))
                this.statusAffects.remove("LactationReduc1");
            if (this.statusAffects.has("LactationReduc2"))
                this.statusAffects.remove("LactationReduc2");
            if (this.statusAffects.has("LactationReduc3"))
                this.statusAffects.remove("LactationReduc3");
        }
        if (boostAmt > 0) {
            while (boostAmt > 0) {
                breasts = this.upperBody.chest.BreastRatingLargest[0];
                boostAmt -= .1;
                temp2 = .1;
                if (breasts.lactationMultiplier > 1.5)
                    temp2 /= 2;
                if (breasts.lactationMultiplier > 2.5)
                    temp2 /= 2;
                if (breasts.lactationMultiplier > 3)
                    temp2 /= 2;
                changes += temp2;
                breasts.lactationMultiplier += temp2;
            }
        }
        else {
            while (boostAmt < 0) {
                if (boostAmt > -.1) {
                    breasts = this.upperBody.chest.LactationMultipierSmallest[0];
                    //trace(biggestLactation());
                    breasts.lactationMultiplier += boostAmt;
                    if (breasts.lactationMultiplier < 0)
                        breasts.lactationMultiplier = 0;
                    boostAmt = 0;
                }
                else {
                    boostAmt += .1;
                    breasts = this.upperBody.chest.LactationMultipierSmallest[0];
                    temp2 = boostAmt;
                    changes += temp2;
                    breasts.lactationMultiplier += temp2;
                    if (breasts.lactationMultiplier < 0)
                        breasts.lactationMultiplier = 0;
                }
            }
        }
        return changes;
    }

    public vaginaChangeNoDisplay(vaginaArea: number): boolean {
        if (!this.lowerBody.vaginaSpot.hasVagina)
            return false;
        let stretched: boolean = false;
        let loosestVagina = this.lowerBody.vaginaSpot.LoosenessMost[0];
        if (this.perks.has("FerasBoonMilkingTwat") || loosestVagina.vaginalLooseness <= VaginaLooseness.NORMAL) {
            //cArea > capacity = autostreeeeetch.
            if (vaginaArea >= this.vaginalCapacity()) {
                if (loosestVagina.vaginalLooseness >= VaginaLooseness.LEVEL_CLOWN_CAR)
                    loosestVagina.vaginalLooseness++;
                stretched = true;
            }
            //If within top 10% of capacity, 50% stretch
            else if (vaginaArea >= .9 * this.vaginalCapacity() && Utils.chance(50)) {
                loosestVagina.vaginalLooseness++;
                stretched = true;
            }
            //if within 75th to 90th percentile, 25% stretch
            else if (vaginaArea >= .75 * this.vaginalCapacity() && Utils.chance(25)) {
                loosestVagina.vaginalLooseness++;
                stretched = true;
            }
        }
        //If virgin
        if (this.lowerBody.vaginaSpot.Virgin.length > 0) {
            this.lowerBody.vaginaSpot.Virgin[0].virgin = false;
        }
        //Delay anti-stretching
        if (vaginaArea >= .5 * this.vaginalCapacity()) {
            //Cunt Stretched used to determine how long since last enlargement
            if (!this.statusAffects.has("CuntStretched"))
                this.statusAffects.add(new StatusAffect("CuntStretched", 0, 0, 0, 0));
            //Reset the timer on it to 0 when restretched.
            else
                this.statusAffects.get("CuntStretched").value1 = 0;
        }
        if (stretched) {
            console.trace("CUNT STRETCHED TO " + (loosestVagina.vaginalLooseness) + ".");
        }
        return stretched;
    }


    public vaginalCapacity(): number {
        if (!this.lowerBody.vaginaSpot.hasVagina)
            return 0;
        let total: number;
        let bonus: number = 0;
        let loosestVagina = this.lowerBody.vaginaSpot.LoosenessMost[0];
        let wettestVagina = this.lowerBody.vaginaSpot.WetnessMost[0];
        //Centaurs = +50 capacity
        if (this.lowerBody.type == LowerBodyType.CENTAUR)
            bonus = 50;
        //Naga = +20 capacity
        else if (this.lowerBody.type == LowerBodyType.NAGA)
            bonus = 20;

        //Wet pussy provides 20 ponumber boost
        if (this.perks.has("WetPussy"))
            bonus += 20;
        if (this.perks.has("HistorySlut"))
            bonus += 20;
        if (this.perks.has("OneTrackMind"))
            bonus += 10;
        if (this.perks.has("Cornucopia"))
            bonus += 30;
        if (this.perks.has("FerasBoonWideOpen"))
            bonus += 25;
        if (this.perks.has("FerasBoonMilkingTwat"))
            bonus += 40;
        total = (bonus + this.statusAffects.get("BonusVCapacity").value1 + 8 * loosestVagina.vaginalLooseness * loosestVagina.vaginalLooseness) *
            (1 + wettestVagina.vaginalWetness / 10);
        return total;
    }

    public analCapacity(): number {
        let bonus: number = 0;
        //Centaurs = +30 capacity
        if (this.lowerBody.type == LowerBodyType.CENTAUR)
            bonus = 30;
        if (this.perks.has("HistorySlut"))
            bonus += 20;
        if (this.perks.has("Cornucopia"))
            bonus += 30;
        if (this.perks.has("OneTrackMind"))
            bonus += 10;
        if (this.lowerBody.butt.analWetness > 0)
            bonus += 15;
        return ((bonus + this.statusAffects.get("BonusVCapacity").value1 + 6 * this.lowerBody.butt.analLooseness * this.lowerBody.butt.analLooseness) * (1 + this.lowerBody.butt.analWetness / 10));
    }


    public milked(): void {
        this.statusAffects.has("LactationReduction")
        if (this.statusAffects.has("LactationReduction"))
            this.statusAffects.get("LactationReduction").value1 = 0;
        if (this.statusAffects.has("LactationReduc0"))
            this.statusAffects.remove("LactationReduc0");
        if (this.statusAffects.has("LactationReduc1"))
            this.statusAffects.remove("LactationReduc1");
        if (this.statusAffects.has("LactationReduc2"))
            this.statusAffects.remove("LactationReduc2");
        if (this.statusAffects.has("LactationReduc3"))
            this.statusAffects.remove("LactationReduc3");
        if (this.statusAffects.has("Feeder")) {
            //You've now been milked, reset the timer for that
            this.statusAffects.get("Feeder").value1 = 1;
            this.statusAffects.get("Feeder").value2 = 0;
        }
    }

    //Calculate bonus virility rating!
    //anywhere from 5% to 100% of normal cum effectiveness thru herbs!
    public virilityQ(): number {
        if (!this.lowerBody.cockSpot.hasCock())
            return 0;
        let percent: number = 0.01;
        if (this.cumQ() >= 250)
            percent += 0.01;
        if (this.cumQ() >= 800)
            percent += 0.01;
        if (this.cumQ() >= 1600)
            percent += 0.02;
        if (this.perks.has("BroBody"))
            percent += 0.05;
        if (this.perks.has("MaraesGiftStud"))
            percent += 0.15;
        if (this.perks.has("FerasBoonAlpha"))
            percent += 0.10;
        if (this.perks.has("ElvenBounty") && this.perks.get("ElvenBounty").value1 > 0)
            percent += 0.05;
        if (this.perks.has("FertilityPlus"))
            percent += 0.03;
        if (this.perks.has("PiercedFertite"))
            percent += 0.03;
        if (this.perks.has("OneTrackMind"))
            percent += 0.03;
        if (this.perks.has("MagicalVirility"))
            percent += 0.05;
        //Messy Orgasms?
        if (this.perks.has("MessyOrgasms"))
            percent += 0.03;
        if (percent > 1)
            percent = 1;
        return percent;
    }

    //Calculate cum return
    public cumQ(): number {
        if (!this.lowerBody.cockSpot.hasCock())
            return 0;
        let quantity: number = 0;
        //Base value is ballsize*ballQ*cumefficiency by a factor of 2.
        //Other things that affect it: 
        //lust - 50% = normal output.  0 = half output. 100 = +50% output.
        //trace("CUM ESTIMATE: " + number(1.25*2*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(no balls), " + number(ballSize*balls*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(withballs)");
        let lustCoefficient: number = (this.stats.lust + 50) / 10;
        //Pilgrim's bounty maxxes lust coefficient
        if (this.perks.has("PilgrimsBounty"))
            lustCoefficient = 150 / 10;
        if (this.lowerBody.balls == 0)
            quantity = Math.floor(1.25 * 2 * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
        else
            quantity = Math.floor(this.lowerBody.ballSize * this.lowerBody.balls * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
        if (this.perks.has("BroBody"))
            quantity *= 1.3;
        if (this.perks.has("FertilityPlus"))
            quantity *= 1.5;
        if (this.perks.has("MessyOrgasms"))
            quantity *= 1.5;
        if (this.perks.has("OneTrackMind"))
            quantity *= 1.1;
        if (this.perks.has("MaraesGiftStud"))
            quantity += 350;
        if (this.perks.has("FerasBoonAlpha"))
            quantity += 200;
        if (this.perks.has("MagicalVirility"))
            quantity += 200;
        if (this.perks.has("FerasBoonSeeder"))
            quantity += 1000;
        //if(hasPerk("Elven Bounty") >= 0) quantity += 250;;
        quantity += this.perks.get("ElvenBounty").value1;
        if (this.perks.has("BroBody"))
            quantity += 200;
        quantity += this.statusAffects.get("Rut").value1;
        quantity *= (1 + (2 * this.perks.get("PiercedFertite").value1) / 100);
        //trace("Final Cum Volume: " + number(quantity) + "mLs.");
        //if (quantity < 0) trace("SOMETHING HORRIBLY WRONG WITH CUM CALCULATIONS");
        if (quantity < 2)
            quantity = 2;
        return quantity;
    }

    public lactationQ(): number {
        let chest = this.upperBody.chest;
        if (chest.LactationMultipierLargest[0].lactationMultiplier < 1)
            return 0;
        //(Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
        //(Small – 0.01 mLs – Size 1 + 1 Multi)
        //(Large – 0.8 - Size 10 + 4 Multi)
        //(HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
        let total: number;
        if (!this.statusAffects.has("LactationEndurance"))
            this.statusAffects.add(new StatusAffect("LactationEndurance", 1, 0, 0, 0));
        total = chest.BreastRatingLargest[0].breastRating * 10 * chest.averageLactation() * this.statusAffects.get("LactationEndurance").value1 * chest.countBreasts();
        if (this.statusAffects.get("LactationReduction").value1 >= 48)
            total = total * 1.5;
        return total;
    }

    public isLactating(): boolean {
        return this.lactationQ() > 0 ? true : false;
    }



    //PC can fly?
    public canFly(): boolean {
        //web also makes false!
        if (this.statusAffects.has("Web"))
            return false;
        switch (this.upperBody.wingType) {
            case WingType.BAT_LIKE_LARGE:
            case WingType.BEE_LIKE_LARGE:
            case WingType.DRACONIC_LARGE:
            case WingType.FEATHERED_LARGE:
            case WingType.GIANT_DRAGONFLY:
                return true;
            default:
                return false;
        }
    }

    public updateGender(): void {
        if (this.lowerBody.cockSpot.hasCock && this.lowerBody.vaginaSpot.hasVagina)
            this.gender = Gender.HERM;
        else if (this.lowerBody.cockSpot.hasCock)
            this.gender = Gender.MALE;
        else if (this.lowerBody.vaginaSpot.hasVagina)
            this.gender = Gender.FEMALE;
        else
            this.gender = Gender.NONE;
    }


    public buttChangeNoDisplay(buttArea: number): boolean {
        let stretched: boolean = false;
        //cArea > capacity = autostreeeeetch half the time.
        if (buttArea >= this.analCapacity() && Utils.chance(50)) {
            if (this.lowerBody.butt.analLooseness < ButtLooseness.GAPING)
                this.lowerBody.butt.analLooseness++;
            stretched = true;
            //Reset butt stretchin recovery time
            if (this.statusAffects.has("ButtStretched"))
                this.statusAffects.get("ButtStretched").value1 = 0;
        }
        //If within top 10% of capacity, 25% stretch
        if (buttArea < this.analCapacity() && buttArea >= .9 * this.analCapacity() && Utils.chance(25)) {
            this.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //if within 75th to 90th percentile, 10% stretch
        if (buttArea < .9 * this.analCapacity() && buttArea >= .75 * this.analCapacity() && Utils.chance(10)) {
            this.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //Anti-virgin
        if (this.lowerBody.butt.analLooseness == ButtLooseness.VIRGIN) {
            this.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //Delay un-stretching
        if (buttArea >= .5 * this.analCapacity()) {
            //Butt Stretched used to determine how long since last enlargement
            if (!this.statusAffects.has("ButtStretched"))
                this.statusAffects.add(new StatusAffect("ButtStretched", 0, 0, 0, 0));
            //Reset the timer on it to 0 when restretched.
            else
                this.statusAffects.get("ButtStretched").value1 = 0;
        }
        if (stretched) {
            console.trace("BUTT STRETCHED TO " + (this.lowerBody.butt.analLooseness) + ".");
        }
        return stretched;
    }


    public get inHeat(): boolean {
        return this.statusAffects.has("Heat");
    }

    public get inRut(): boolean {
        return this.statusAffects.has("Rut");
    }

    public canGoIntoHeat() {
        return this.lowerBody.vaginaSpot.hasVagina() && this.pregnancy.canKnockUp();
    }

    public canGoIntoRut(): boolean {
        return this.lowerBody.cockSpot.hasCock();
    }

    public goIntoHeat(intensity: number = 1) {
        if (this.inHeat) {
            let statusAffectHeat: StatusAffect = this.statusAffects.get("Heat");
            statusAffectHeat.value1 += 5 * intensity;
            statusAffectHeat.value2 += 5 * intensity;
            statusAffectHeat.value3 += 48 * intensity;
            this.stats.bimboIntReduction = true;
            this.stats.lib += 5 * intensity;
        }
        //Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
        else {
            this.statusAffects.add(new StatusAffect("Heat", 10 * intensity, 15 * intensity, 48 * intensity, 0));
            this.stats.bimboIntReduction = true;
            this.stats.lib += 15 * intensity;
        }
    }

    public goIntoRut(intensity: number = 1) {
        //Has rut, intensify it!
        if (this.inRut) {
            let statusAffectRut: StatusAffect = this.statusAffects.get("Rut");
            statusAffectRut.value1 = 100 * intensity;
            statusAffectRut.value2 = 5 * intensity;
            statusAffectRut.value3 = 48 * intensity;
            this.stats.bimboIntReduction = true;
            this.stats.lib += 5 * intensity;
        }
        else {
            //v1 - bonus cum production
            //v2 - bonus this.stats.libido
            //v3 - time remaining!
            this.statusAffects.add(new StatusAffect("Rut", 150 * intensity, 5 * intensity, 100 * intensity, 0));
            this.stats.bimboIntReduction = true;
            this.stats.lib += 5 * intensity;
        }
    }

    public get bonusFertility(): number {
        let counter: number = 0;
        if (this.inHeat)
            counter += this.statusAffects.get("Heat").value1;
        if (this.perks.has("FertilityPlus"))
            counter += 15;
        if (this.perks.has("MaraesGiftFertility"))
            counter += 50;
        if (this.perks.has("FerasBoonBreedingBitch"))
            counter += 30;
        if (this.perks.has("MagicalFertility"))
            counter += 10;
        counter += this.perks.get("ElvenBounty").value2;
        counter += this.perks.get("PiercedFertite").value1;
        return counter;
    }

    public totalFertility(): number {
        return (this.bonusFertility + this.fertility);
    }


    public skinFurScales(): string {
        let skinzilla: string = "";
        //Adjectives first!
        if (this.skinAdj != "")
            skinzilla += this.skinAdj + ", ";
        //Fur handled a little differently since it uses
        //haircolor
        skinzilla += this.skinType == SkinType.FUR ? this.upperBody.head.hairColor + " " : this.skinTone + " ";
        skinzilla += this.skinDesc;
        return skinzilla;
    }

    saveKey: string = "Body";
    save(): object {
        let saveObject: object = {};
        saveObject["gender"] = this.gender;
        saveObject["tallness"] = this.tallness;
        saveObject["skinType"] = this.skinType;
        saveObject["skinTone"] = this.skinTone;
        saveObject["skinDesc"] = this.skinDesc;
        saveObject["skinAdj"] = this.skinAdj;

        saveObject["femininity"] = this._femininity;
        saveObject["tone"] = this.tone;
        saveObject["thickness"] = this.thickness;

        saveObject["_femininity"] = this.fertility;
        saveObject["cumMultiplier"] = this.cumMultiplier;
        saveObject["hoursSinceCum"] = this.hoursSinceCum;

        saveObject[this.upperBody.saveKey] = this.upperBody.save();
        saveObject[this.lowerBody.saveKey] = this.lowerBody.save();

        saveObject[this.stats.saveKey] = this.stats.save();
        saveObject[this.statusAffects.saveKey] = this.statusAffects.save();

        return saveObject;
    }

    load(saveObject: object) {
        this.gender = saveObject["gender"];
        this.tallness = saveObject["tallness"];
        this.skinType = saveObject["skinType"];
        this.skinTone = saveObject["skinTone"];
        this.skinDesc = saveObject["skinDesc"];
        this.skinAdj = saveObject["skinAdj"];

        this._femininity = saveObject["_femininity"];
        this.tone = saveObject["tone"];
        this.thickness = saveObject["thickness"];

        this.fertility = saveObject["fertility"];
        this.cumMultiplier = saveObject["cumMultiplier"];
        this.hoursSinceCum = saveObject["hoursSinceCum"];

        this.upperBody.load(saveObject[this.upperBody.saveKey]);
        this.lowerBody.load(saveObject[this.lowerBody.saveKey]);

        this.stats.load(saveObject[this.stats.saveKey]);
        this.statusAffects.load(saveObject[this.statusAffects.saveKey]);

        return saveObject;
    }

}