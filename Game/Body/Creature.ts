import { BreastRow } from './BreastRow';
import { Gender, GenderIdentity } from './GenderIdentity';
import { LegType } from './Legs';
import { PregnancyManager } from './Pregnancy/PregnancyManager';
import { Skin } from './Skin';
import { Stats } from './Stats';
import { StatsModifier } from './StatsModifier';
import { Torso } from './Torso';
import { Vagina } from './Vagina';
import { WingType } from './Wings';
import { DictionarySerializer } from '../../Engine/Utilities/DictionarySerializer';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { PerkDict } from '../Effects/PerkDict';
import { StatusAffectDict } from '../Effects/StatusAffectDict';

export class Creature implements ISerializable<Creature> {
    // Appearance Variables
    public genderManager: GenderIdentity = new GenderIdentity(this);
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
    public statusAffects: StatusAffectDict = new StatusAffectDict();
    public perks: PerkDict = new PerkDict();

    public get gender(): Gender {
        return this.genderManager.gender;
    }

    public set gender(gender: Gender) {
        this.genderManager.gender = gender;
    }

    public get femininity(): number {
        if (this.fem > 100)
            this.fem = 100;

        return this.fem;
    }

    public set femininity(value: number) {
        if (value > 100)
            value = 100;
        else if (value < 0)
            value = 0;

        this.fem = value;
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
            const loosestVagina = this.torso.vaginas.sort(Vagina.LoosenessMost)[0];
            const wettestVagina = this.torso.vaginas.sort(Vagina.WetnessMost)[0];

            return (bonus + 8 * loosestVagina.looseness * loosestVagina.looseness) *
                (1 + wettestVagina.wetness / 10);
        }
        return 0;
    }

    public analCapacity(): number {
        let bonus: number = 0;
        // Centaurs = +30 capacity
        if (this.torso.hips.legs.type === LegType.CENTAUR)
            bonus = 30;
        if (this.torso.butt.wetness > 0)
            bonus += 15;
        return ((bonus + 6 * this.torso.butt.looseness * this.torso.butt.looseness) * (1 + this.torso.butt.wetness / 10));
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
            const lustCoefficient: number = (this.stats.lust + 50) / 10;
            // Pilgrim's bounty maxxes lust coefficient
            if (this.torso.balls.quantity === 0)
                quantity = Math.floor(1.25 * 2 * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
            else
                quantity = Math.floor(this.torso.balls.size * this.torso.balls.quantity * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
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
        total = chest.sort(BreastRow.BreastRatingLargest)[0].rating * 10 * chest.reduce(BreastRow.AverageLactation, 0);
        return total;
    }

    public isLactating(): boolean {
        return this.lactationQ() > 0 ? true : false;
    }

    // PC can fly?
    public canFly(): boolean {
        // web also makes false!
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

    public canGoIntoHeat() {
        return this.torso.vaginas.count > 0 && !this.pregnancy.womb.isPregnant();
    }

    public canGoIntoRut(): boolean {
        return this.torso.cocks.count > 0;
    }

    public totalFertility(): number {
        return this.fertility;
    }

    public serialize(): object | undefined {
        return {
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
            statusAffects: DictionarySerializer.serialize(this.statusAffects),
            perks: DictionarySerializer.serialize(this.perks),
        };
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
