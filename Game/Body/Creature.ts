import { BreastRow } from './BreastRow';
import { Gender, GenderIdentity } from './GenderIdentity';
import { LegType } from './Legs';
import { PregnancyManager } from './Pregnancy/PregnancyManager';
import { Stats } from './Stats';
import { StatsModifier } from './StatsModifier';
import { Body } from './Body';
import { Vagina } from './Vagina';
import { WingType } from './Wings';
import { DictionarySerializer } from '../../Engine/Utilities/DictionarySerializer';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { PerkDict } from '../Effects/PerkDict';
import { StatusEffectDict } from '../Effects/StatusEffectDict';

export class Creature implements ISerializable<Creature> {
    // Appearance Variables
    public genderManager: GenderIdentity = new GenderIdentity(this);
    public hoursSinceCum: number = 0;

    public body: Body = new Body();
    public pregnancy: PregnancyManager = new PregnancyManager(this);

    protected baseStats: Stats = new Stats();
    public stats: StatsModifier = new StatsModifier(this, this.baseStats);
    public statusAffects: StatusEffectDict = new StatusEffectDict();
    public perks: PerkDict = new PerkDict();

    public get gender(): Gender {
        return this.genderManager.gender;
    }

    public get genderPref(): Gender {
        return this.genderManager.preference;
    }

    public set genderPref(gender: Gender) {
        this.genderManager.preference = gender;
    }

    public vaginalCapacity(): number {
        if (this.body.vaginas.count > 0) {
            let bonus: number = 0;
            // Centaurs = +50 capacity
            if (this.body.legs.type === LegType.CENTAUR)
                bonus = 50;
            // Naga = +20 capacity
            else if (this.body.legs.type === LegType.NAGA)
                bonus = 20;
            const loosestVagina = this.body.vaginas.sort(Vagina.LoosenessMost)[0];
            const wettestVagina = this.body.vaginas.sort(Vagina.WetnessMost)[0];

            return (bonus + 8 * loosestVagina.looseness * loosestVagina.looseness) *
                (1 + wettestVagina.wetness / 10);
        }
        return 0;
    }

    public analCapacity(): number {
        let bonus: number = 0;
        // Centaurs = +30 capacity
        if (this.body.legs.type === LegType.CENTAUR)
            bonus = 30;
        if (this.body.butt.wetness > 0)
            bonus += 15;
        return ((bonus + 6 * this.body.butt.looseness * this.body.butt.looseness) * (1 + this.body.butt.wetness / 10));
    }

    // Calculate bonus virility rating!
    // anywhere from 5% to 100% of normal cum effectiveness thru herbs!
    public virilityQ(): number {
        if (this.body.cocks.count > 0) {
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
        if (this.body.cocks.count > 0) {
            let quantity: number = 0;
            // Base value is ballsize * ballQ * cumefficiency by a factor of 2.
            // Other things that affect it:
            // lust - 50% = normal output.  0 = half output. 100 = +50% output.
            const lustCoefficient: number = (this.stats.lust + 50) / 10;
            // Pilgrim's bounty maxxes lust coefficient
            if (this.body.balls.count === 0)
                quantity = Math.floor(1.25 * 2 * this.body.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
            else
                quantity = Math.floor(this.body.balls.size * this.body.balls.count * this.body.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
            if (quantity < 2)
                quantity = 2;
            return quantity;
        }
        return 0;
    }

    public lactationQ(): number {
        const chest = this.body.chest;
        if (chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 1)
            return 0;
        // (Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
        // (Small – 0.01 mLs – Size 1 + 1 Multi)
        // (Large – 0.8 - Size 10 + 4 Multi)
        // (HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
        let total: number;
        total = chest.sort(BreastRow.Largest)[0].rating * 10 * chest.reduce(BreastRow.AverageLactation, 0);
        return total;
    }

    public isLactating(): boolean {
        return this.lactationQ() > 0 ? true : false;
    }

    // PC can fly?
    public canFly(): boolean {
        // web also makes false!
        switch (this.body.wings.type) {
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

    public canGoIntoHeat() {
        return this.body.vaginas.count > 0 && !this.pregnancy.womb.isPregnant();
    }

    public canGoIntoRut(): boolean {
        return this.body.cocks.count > 0;
    }

    public totalFertility(): number {
        return this.body.fertility;
    }

    public serialize(): object | undefined {
        return {
            genderPref: this.genderPref,
            hoursSinceCum: this.hoursSinceCum,
            torso: this.body.serialize(),
            pregnancy: this.pregnancy.serialize(),
            baseStats: this.baseStats.serialize(),
            statusAffects: DictionarySerializer.serialize(this.statusAffects),
            perks: DictionarySerializer.serialize(this.perks),
        };
    }

    public deserialize(saveObject: Creature) {
        this.genderPref = saveObject.genderPref;
        this.hoursSinceCum = saveObject.hoursSinceCum;
        this.body.deserialize(saveObject.body);
        this.pregnancy.deserialize(saveObject.pregnancy);
        this.baseStats.deserialize(saveObject.baseStats);
        this.statusAffects.deserialize(saveObject.statusAffects);
        this.perks.deserialize(saveObject.perks);
    }
}
