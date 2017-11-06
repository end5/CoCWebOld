import BreastRow from './BreastRow';
import Butt, { ButtLooseness } from './Butt';
import Cock from './Cock';
import CreatureStatsWrapper from './CreatureStatsWrapper';
import LowerBody, { LowerBodyType } from './LowerBody';
import { PregnancyType } from './Pregnancy/Pregnancy';
import PregnancyManager from './Pregnancy/PregnancyManager';
import Stats from './Stats';
import UpperBody, { WingType } from './UpperBody';
import Vagina, { VaginaLooseness } from './Vagina';
import CockDescriptor from '../Descriptors/CockDescriptor';
import MainScreen from '../display/MainScreen';
import Perk from '../Effects/Perk';
import StatusAffect from '../Effects/StatusAffect';
import { SerializeInterface } from '../SerializeInterface';
import ComponentList from '../Utilities/ComponentList';
import Utils from '../Utilities/Utils';

export enum Gender {
    NONE, MALE, FEMALE, HERM
}

export enum SkinType {
    PLAIN, FUR, SCALES, GOO, UNDEFINED
}

export default class Creature implements SerializeInterface {
    //Appearance Variables
    public gender: Gender;
    public tallness: number;

    public skinType: SkinType;
    public skinTone: string;
    public skinDesc: string;
    public skinAdj: string;

    //Used for hip ratings
    public thickness: number;

    //Body tone i.e. Lithe, stocky, etc
    public tone: number;
    private _femininity: number;

    //Fertility is a % out of 100.
    public fertility: number;
    public cumMultiplier: number;
    public hoursSinceCum: number;

    public upperBody: UpperBody;
    public lowerBody: LowerBody;

    public pregnancy: PregnancyManager;

    private baseStats: Stats;
    public stats: CreatureStatsWrapper;
    public statusAffects: ComponentList<StatusAffect>;
    public perks: ComponentList<Perk>;

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

        this.pregnancy = new PregnancyManager(this);

        this.baseStats = new Stats();
        this.stats = new CreatureStatsWrapper(this, this.baseStats);
        this.statusAffects = new ComponentList<StatusAffect>();
        this.perks = new ComponentList<Perk>();
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
            this.stats.libBimbo += 5 * intensity;
        }
        //Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
        else {
            this.statusAffects.add(new StatusAffect("Heat", 10 * intensity, 15 * intensity, 48 * intensity, 0));
            this.stats.libBimbo += 15 * intensity;
        }
    }

    public goIntoRut(intensity: number = 1) {
        //Has rut, intensify it!
        if (this.inRut) {
            let statusAffectRut: StatusAffect = this.statusAffects.get("Rut");
            statusAffectRut.value1 = 100 * intensity;
            statusAffectRut.value2 = 5 * intensity;
            statusAffectRut.value3 = 48 * intensity;
            this.stats.libBimbo += 5 * intensity;
        }
        else {
            //v1 - bonus cum production
            //v2 - bonus this.stats.libido
            //v3 - time remaining!
            this.statusAffects.add(new StatusAffect("Rut", 150 * intensity, 5 * intensity, 100 * intensity, 0));
            this.stats.libBimbo += 5 * intensity;
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

    serialize(): string {
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

        saveObject["upperBody"] = this.upperBody.serialize();
        saveObject["lowerBody"] = this.lowerBody.serialize();

        saveObject["baseStats"] = this.baseStats.serialize();
        saveObject["statusAffects"] = this.statusAffects.serialize();
        saveObject["perks"] = this.perks.serialize();
        
        return JSON.stringify(saveObject);
    }

    deserialize(saveObject: object) {
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

        this.upperBody.deserialize(saveObject["upperBody"]);
        this.lowerBody.deserialize(saveObject["lowerBody"]);

        this.baseStats.deserialize(saveObject["baseStats"]);
        this.statusAffects.deserialize(saveObject["statusAffects"]);
        this.perks.deserialize(saveObject["perks"]);
        
        this.stats = new CreatureStatsWrapper(this, this.baseStats);
    }

}