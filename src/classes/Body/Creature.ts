import BreastRow from './BreastRow';
import { LegType } from './Legs';
import PregnancyManager from './Pregnancy/PregnancyManager';
import Skin from './Skin';
import Stats from './Stats';
import StatsModifier from './StatsModifier';
import Torso from './Torso';
import Vagina from './Vagina';
import { WingType } from './Wings';
import PerkList from '../Effects/PerkList';
import { PerkType } from '../Effects/PerkType';
import StatusAffectFactory from '../Effects/StatusAffectFactory';
import StatusAffectList from '../Effects/StatusAffectList';
import { StatusAffectType } from '../Effects/StatusAffectType';
import ISerializable from '../Utilities/ISerializable';

export enum Gender {
    NONE, MALE, FEMALE, HERM
}

export default class Creature implements ISerializable<Creature> {
    // Appearance Variables
    public gender: Gender = Gender.NONE;
    public tallness: number = 0;

    public skin: Skin = new Skin();

    // Used for hip ratings
    public thickness: number = 0;

    // Body tone i.e. Lithe, stocky, etc
    public tone: number = 0;
    private fem: number = 50;

    // Fertility is a % out of 100.
    public fertility: number = 10;
    public cumMultiplier: number = 1;
    public hoursSinceCum: number = 0;

    public torso: Torso = new Torso();
    public pregnancy: PregnancyManager = new PregnancyManager(this);

    protected baseStats: Stats = new Stats();
    public stats: StatsModifier = new StatsModifier(this, this.baseStats);
    public statusAffects: StatusAffectList = new StatusAffectList();
    public perks: PerkList = new PerkList();

    public get femininity(): number {
        if (this.statusAffects.has(StatusAffectType.UmasMassage)) {
            const statAffect = this.statusAffects.get(StatusAffectType.UmasMassage);
            if (statAffect.value1 === UmasShop.MASSAGE_MODELLING_BONUS)
                this.fem += statAffect.value2;
        }

        if (this.fem > 100)
            this.fem = 100;

        return this.fem;
    }

    public set femininity(value: number) {
        if (value > 100)
            value = 100;
        else if (value < 0)
            value = 0;

        this.femininity = value;
    }

    public vaginalCapacity(): number {
        if (this.torso.vaginas.count > 0) {
            let bonus: number = 0;
            // Centaurs = +50 capacity
            if (this.torso.hips.legs.type === LegType.CENTAUR)
                bonus = 50;
            // Naga = +20 capacity
            else if (this.torso.hips.legs.type === LegType.NAGA)
                bonus = 20;
            // Wet pussy provides 20 point boost
            if (this.perks.has(PerkType.WetPussy))
                bonus += 20;
            if (this.perks.has(PerkType.HistorySlut))
                bonus += 20;
            if (this.perks.has(PerkType.OneTrackMind))
                bonus += 10;
            if (this.perks.has(PerkType.Cornucopia))
                bonus += 30;
            if (this.perks.has(PerkType.FerasBoonWideOpen))
                bonus += 25;
            if (this.perks.has(PerkType.FerasBoonMilkingTwat))
                bonus += 40;

            const loosestVagina = this.torso.vaginas.sort(Vagina.LoosenessMost)[0];
            const wettestVagina = this.torso.vaginas.sort(Vagina.WetnessMost)[0];

            return (bonus + this.statusAffects.get(StatusAffectType.BonusVCapacity).value1 + 8 * loosestVagina.looseness * loosestVagina.looseness) *
                (1 + wettestVagina.wetness / 10);
        }
        return 0;
    }

    public analCapacity(): number {
        let bonus: number = 0;
        // Centaurs = +30 capacity
        if (this.torso.hips.legs.type === LegType.CENTAUR)
            bonus = 30;
        if (this.perks.has(PerkType.HistorySlut))
            bonus += 20;
        if (this.perks.has(PerkType.Cornucopia))
            bonus += 30;
        if (this.perks.has(PerkType.OneTrackMind))
            bonus += 10;
        if (this.torso.butt.wetness > 0)
            bonus += 15;
        return ((bonus + this.statusAffects.get(StatusAffectType.BonusVCapacity).value1 + 6 * this.torso.butt.looseness * this.torso.butt.looseness) * (1 + this.torso.butt.wetness / 10));
    }

    // Calculate bonus virility rating!
    // anywhere from 5% to 100% of normal cum effectiveness thru herbs!
    public virilityQ(): number {
        if (this.torso.cocks.count > 0) {
            let percent: number = 0.01;
            if (this.cumQ() >= 250)
                percent += 0.01;
            if (this.cumQ() >= 800)
                percent += 0.01;
            if (this.cumQ() >= 1600)
                percent += 0.02;
            if (this.perks.has(PerkType.BroBody))
                percent += 0.05;
            if (this.perks.has(PerkType.MaraesGiftStud))
                percent += 0.15;
            if (this.perks.has(PerkType.FerasBoonAlpha))
                percent += 0.10;
            if (this.perks.has(PerkType.ElvenBounty) && this.perks.get(PerkType.ElvenBounty).value1 > 0)
                percent += 0.05;
            if (this.perks.has(PerkType.FertilityPlus))
                percent += 0.03;
            if (this.perks.has(PerkType.PiercedFertite))
                percent += 0.03;
            if (this.perks.has(PerkType.OneTrackMind))
                percent += 0.03;
            if (this.perks.has(PerkType.MagicalVirility))
                percent += 0.05;
            // Messy Orgasms?
            if (this.perks.has(PerkType.MessyOrgasms))
                percent += 0.03;
            if (percent > 1)
                percent = 1;
            return percent;
        }
        return 0;
    }

    // Calculate cum return
    public cumQ(): number {
        if (this.torso.cocks.count > 0) {
            let quantity: number = 0;
            // Base value is ballsize * ballQ * cumefficiency by a factor of 2.
            // Other things that affect it:
            // lust - 50% = normal output.  0 = half output. 100 = +50% output.
            let lustCoefficient: number = (this.stats.lust + 50) / 10;
            // Pilgrim's bounty maxxes lust coefficient
            if (this.perks.has(PerkType.PilgrimsBounty))
                lustCoefficient = 150 / 10;
            if (this.torso.balls.quantity === 0)
                quantity = Math.floor(1.25 * 2 * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
            else
                quantity = Math.floor(this.torso.balls.size * this.torso.balls.quantity * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
            if (this.perks.has(PerkType.BroBody))
                quantity *= 1.3;
            if (this.perks.has(PerkType.FertilityPlus))
                quantity *= 1.5;
            if (this.perks.has(PerkType.MessyOrgasms))
                quantity *= 1.5;
            if (this.perks.has(PerkType.OneTrackMind))
                quantity *= 1.1;
            if (this.perks.has(PerkType.MaraesGiftStud))
                quantity += 350;
            if (this.perks.has(PerkType.FerasBoonAlpha))
                quantity += 200;
            if (this.perks.has(PerkType.MagicalVirility))
                quantity += 200;
            if (this.perks.has(PerkType.FerasBoonSeeder))
                quantity += 1000;
            quantity += this.perks.get(PerkType.ElvenBounty).value1;
            if (this.perks.has(PerkType.BroBody))
                quantity += 200;
            quantity += this.statusAffects.get(StatusAffectType.Rut).value1;
            quantity *= (1 + (2 * this.perks.get(PerkType.PiercedFertite).value1) / 100);
            if (quantity < 2)
                quantity = 2;
            return quantity;
        }
        return 0;
    }

    public lactationQ(): number {
        const chest = this.torso.chest;
        if (chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 1)
            return 0;
        // (Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
        // (Small – 0.01 mLs – Size 1 + 1 Multi)
        // (Large – 0.8 - Size 10 + 4 Multi)
        // (HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
        let total: number;
        if (!this.statusAffects.has(StatusAffectType.LactationEndurance))
            this.statusAffects.add(StatusAffectType.LactationEndurance, 1, 0, 0, 0);
        total = chest.sort(BreastRow.BreastRatingLargest)[0].rating * 10 * chest.reduce(BreastRow.AverageLactation, 0) * this.statusAffects.get(StatusAffectType.LactationEndurance).value1 * chest.countBreasts();
        if (this.statusAffects.get(StatusAffectType.LactationReduction).value1 >= 48)
            total = total * 1.5;
        return total;
    }

    public isLactating(): boolean {
        return this.lactationQ() > 0 ? true : false;
    }

    // PC can fly?
    public canFly(): boolean {
        // web also makes false!
        if (this.statusAffects.has(StatusAffectType.Web))
            return false;
        switch (this.torso.wings.type) {
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

    public updateGender() {
        if (this.torso.cocks.count > 0 && this.torso.vaginas.count > 0)
            this.gender = Gender.HERM;
        else if (this.torso.cocks.count > 0)
            this.gender = Gender.MALE;
        else if (this.torso.vaginas.count > 0)
            this.gender = Gender.FEMALE;
        else
            this.gender = Gender.NONE;
    }

    public get inHeat(): boolean {
        return this.statusAffects.has(StatusAffectType.Heat);
    }

    public get inRut(): boolean {
        return this.statusAffects.has(StatusAffectType.Rut);
    }

    public canGoIntoHeat() {
        return this.torso.vaginas.count > 0 && !this.pregnancy.womb.isPregnant();
    }

    public canGoIntoRut(): boolean {
        return this.torso.cocks.count > 0;
    }

    public goIntoHeat(intensity: number = 1) {
        if (this.inHeat) {
            const statusAffectHeat = this.statusAffects.get(StatusAffectType.Heat);
            statusAffectHeat.value1 += 5 * intensity;
            statusAffectHeat.value2 += 5 * intensity;
            statusAffectHeat.value3 += 48 * intensity;
            this.stats.libBimbo += 5 * intensity;
        }
        // Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
        else {
            this.statusAffects.add(StatusAffectType.Heat, 10 * intensity, 15 * intensity, 48 * intensity, 0);
            this.stats.libBimbo += 15 * intensity;
        }
    }

    public goIntoRut(intensity: number = 1) {
        // Has rut, intensify it!
        if (this.inRut) {
            const statusAffectRut = this.statusAffects.get(StatusAffectType.Rut);
            statusAffectRut.value1 = 100 * intensity;
            statusAffectRut.value2 = 5 * intensity;
            statusAffectRut.value3 = 48 * intensity;
            this.stats.libBimbo += 5 * intensity;
        }
        else {
            // v1 - bonus cum production
            // v2 - bonus this.stats.libido
            // v3 - time remaining!
            this.statusAffects.add(StatusAffectType.Rut, 150 * intensity, 5 * intensity, 100 * intensity, 0);
            this.stats.libBimbo += 5 * intensity;
        }
    }

    public get bonusFertility(): number {
        let counter = 0;
        if (this.inHeat)
            counter += this.statusAffects.get(StatusAffectType.Heat).value1;
        if (this.perks.has(PerkType.FertilityPlus))
            counter += 15;
        if (this.perks.has(PerkType.MaraesGiftFertility))
            counter += 50;
        if (this.perks.has(PerkType.FerasBoonBreedingBitch))
            counter += 30;
        if (this.perks.has(PerkType.MagicalFertility))
            counter += 10;
        counter += this.perks.get(PerkType.ElvenBounty).value2;
        counter += this.perks.get(PerkType.PiercedFertite).value1;
        return counter;
    }

    public totalFertility(): number {
        return this.statusAffects.has(StatusAffectType.Contraceptives) ? 0 : (this.bonusFertility + this.fertility);
    }

    public serialize(): string {
        return JSON.stringify({
            gender: this.gender,
            tallness: this.tallness,
            skin: this.skin.serialize(),
            thickness: this.thickness,
            tone: this.tone,
            fem: this.fem,
            fertility: this.fertility,
            cumMultiplier: this.cumMultiplier,
            hoursSinceCum: this.hoursSinceCum,
            torso: this.torso.serialize(),
            pregnancy: this.pregnancy.serialize(),
            baseStats: this.baseStats.serialize(),
            statusAffects: this.statusAffects.serialize(),
            perks: this.perks.serialize(),
        });
    }

    public deserialize(saveObject: Creature) {
        this.gender = saveObject.gender;
        this.tallness = saveObject.tallness;
        this.skin.deserialize(saveObject.skin);
        this.thickness = saveObject.thickness;
        this.tone = saveObject.tone;
        this.fem = saveObject.fem;
        this.fertility = saveObject.fertility;
        this.cumMultiplier = saveObject.cumMultiplier;
        this.hoursSinceCum = saveObject.hoursSinceCum;
        this.torso.deserialize(saveObject.torso);
        this.pregnancy.deserialize(saveObject.pregnancy);
        this.baseStats.deserialize(saveObject.baseStats);
        this.statusAffects.deserialize(saveObject.statusAffects);
        this.perks.deserialize(saveObject.perks);
    }
}
