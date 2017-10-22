import Creature from './Creature';
import Stats from './Stats';
import Character from '../Character/Character';
import Flags, { FlagEnum } from '../Game/Flags';
import { SaveInterface } from '../SaveInterface';

export default class CreatureStatsWrapper {
    private body: Creature;
    private stats: Stats;

    public constructor(body: Creature, baseStats: Stats) {
        this.body = body;
        this.stats = baseStats;
    }

    public get str(): number {
        return this.stats.str;
    }

    public set str(value: number) {
        value -= this.str;
        if (this.body.perks.has("ChiReflowSpeed")) {
            if (this.stats.str > UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP) {
                this.stats.str = UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP;
            }
        }

        this.stats.str += value;

        if (this.body.perks.has("Strong") && value >= 0)
            this.stats.str += value * this.body.perks.get("Strong").value1;
    }

    public get tou(): number {
        return this.stats.tou;
    }

    public set tou(value: number) {
        value -= this.stats.tou;
        this.stats.tou += value;

        //Add HP for toughness change.
        this.HP += value * 2;

        if (this.body.perks.has("Tough") && value >= 0)
            this.stats.tou += value * this.body.perks.get("Tough").value1;
    }

    public get spe(): number {
        return this.stats.spe;
    }

    public set spe(value: number) {
        value -= this.stats.spe;
        if (this.body.perks.has("ChiReflowSpeed") && value < 0)
            value *= UmasShop.NEEDLEWORK_SPEED_SPEED_MULTI;
        if (this.body.perks.has("ChiReflowDefense")) {
            if (this.stats.spe > UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP) {
                this.stats.spe = UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP;
            }
        }

        this.stats.spe += value;

        if (this.body.perks.has("Fast") && value >= 0)
            this.stats.spe += value * this.body.perks.get("Fast").value1;
    }

    public get int(): number {
        return this.stats.int;
    }

    public intChange(value: number, bimboIntReduction: boolean = false) {
        value -= this.stats.int;
        if (!bimboIntReduction)
            if (this.body.perks.has("FutaFaculties") || this.body.perks.has("BimboBrains") || this.body.perks.has("BroBrains")) {
                if (value > 0)
                    value /= 2;
                if (value < 0)
                    value *= 2;
            }

        this.stats.int += value;

        if (this.body.perks.has("Smart") && value >= 0)
            this.stats.int += value * this.body.perks.get("Smart").value1;
    }

    public get lib(): number {
        return this.stats.lib;
    }

    public set lib(value: number) {
        this.libChange(value);
    }

    public libChange(value: number, bimboIntReduction: boolean = false) {
        value -= this.stats.lib;
        if (!bimboIntReduction)
            if (this.body.perks.has("FutaForm") || this.body.perks.has("BimboBody") || this.body.perks.has("BroBody")) {
                if (value > 0)
                    value *= 2;
                if (value < 0)
                    value /= 2;
            }
        if (this.body.perks.has("ChiReflowLust") && value > 0)
            value *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;
        if (value > 0 && this.body.perks.has("PurityBlessing"))
            value *= 0.75;

        this.stats.lib += value;

        if (this.body.perks.has("Lusty") && value >= 0)
            this.stats.lib += value * this.body.perks.get("Lusty").value1;
        if (this.stats.lib < 50 && this.body.perks.has("lusty maiden's armor"))
            this.stats.lib = 50;
        else if (this.stats.lib < 15 && this.body.gender > 0)
            this.stats.lib = 15;
        else if (this.stats.lib < 10 && this.body.gender == 0)
            this.stats.lib = 10;
        if (this.stats.lib < this.minLust() * 2 / 3)
            this.stats.lib = this.minLust() * 2 / 3;
    }

    public get sens(): number {
        return this.stats.sens;
    }

    public set sens(value: number) {
        value -= this.stats.sens;
        if (this.body.perks.has("ChiReflowLust") && value > 0)
            value *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;

        if (this.stats.sens > 50 && value > 0) value /= 2;
        if (this.stats.sens > 75 && value > 0) value /= 2;
        if (this.stats.sens > 90 && value > 0) value /= 2;
        if (this.stats.sens > 50 && value < 0) value *= 2;
        if (this.stats.sens > 75 && value < 0) value *= 2;
        if (this.stats.sens > 90 && value < 0) value *= 2;

        this.stats.sens += value;

        if (this.body.perks.has("Sensitive") && value >= 0)
            this.stats.sens += value * this.body.perks.get("Sensitive").value1;
    }

    public get cor(): number {
        return this.stats.cor;
    }

    public set cor(value: number) {
        value -= this.stats.cor;
        if (value > 0 && this.body.perks.has("PurityBlessing"))
            value *= 0.5;
        if (value > 0 && this.body.perks.has("PureAndLoving"))
            value *= 0.75;

        this.stats.cor += value;
    }

    public get fatigue(): number {
        return this.stats.fatigue;
    }

    public set fatigue(value: number) {
        value -= this.stats.fatigue;
        if (this.stats.fatigue >= 100 && value > 0) return;
        if (this.stats.fatigue <= 0 && value < 0) return;
        //Fatigue restoration buffs!
        if (value < 0) {
            let multi: number = 1;

            if (this.body.perks.has("HistorySlacker"))
                multi += 0.2;
            if (this.body.perks.has("ControlledBreath") && this.cor < 30)
                multi += 0.1;

            value *= multi;
        }
        this.stats.fatigue += value;
        if (this.stats.fatigue > 100) this.stats.fatigue = 100;
        if (this.stats.fatigue < 0) this.stats.fatigue = 0;
    }

    public fatiguePhysical(value: number) {
        this.stats.fatigue = value;
    }

    public fatigueMagic(value: number) {
        this.stats.fatigue = value;
        //Blood mages use HP for spells
        if (this.body.perks.has("BloodMage")) {
            this.stats.HP -= value;
        }
    }

    public get HP(): number {
        return this.stats.HP;
    }

    public set HP(value: number) {
        value -= this.stats.HP;

        if (value > 0) {
            //Increase by 20%!
            if (this.body.perks.has("HistoryHealer"))
                value *= 1.2;
        }
        if (value < 0) {
            if (Flags.list[FlagEnum.MINOTAUR_CUM_REALLY_ADDICTED_STATE] > 0) {
                this.stats.lust += value / 2;
            }
        }

        this.stats.HP += value;

        if (this.stats.HP > this.maxHP())
            this.stats.HP = this.maxHP();
        if (this.stats.HP < 0)
            this.stats.HP = 0;
    }

    public maxHP(): number {
        let max: number = 0;
        max += Math.floor(this.stats.tou * 2 + 50);
        if (this.body.perks.has("Tank"))
            max += 50;
        if (this.body.perks.has("Tank2"))
            max += Math.round(this.stats.tou);
        if (this.body.perks.has("ChiReflowDefense"))
            max += UmasShop.NEEDLEWORK_DEFENSE_EXTRAstats.HP;
        if (this.stats.level <= 20)
            max += this.stats.level * 15;
        else
            max += 20 * 15;
        max = Math.round(max);
        if (max > 999)
            max = 999;
        return max;
    }

    public get lust(): number {
        return this.stats.lust;
    }

    public set lust(value: number) {
        this.lustChange(value);
    }

    public lustChange(value: number, lustResisted: boolean = true) {
        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1 && value > 0 && lustResisted)
            value /= 2;
        if (value > 0 && lustResisted)
            value *= this.lustPercent() / 100;

        this.stats.lust += value;

        if (this.stats.lust < 0)
            this.stats.lust = 0;
        if (this.stats.lust > 99)
            this.stats.lust = 100;
        if (this.stats.lust < this.minLust())
            this.stats.lust = this.minLust();
        if (this.body.statusAffects.has("Infested"))
            if (this.stats.lust < 50)
                this.stats.lust = 50;
    }

    public minLust(): number {
        let min: number = 0;
        //Bimbo body boosts minimum lust by 40
        if (this.body.statusAffects.has("BimboChampagne") || this.body.perks.has("BimboBody") || this.body.perks.has("BroBody") || this.body.perks.has("FutaForm")) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 40;
        }
        //Omnibus' Gift
        if (this.body.perks.has("OmnibusGift")) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 35;
        }
        //Nymph perk raises to 30
        if (this.body.perks.has("Nymphomania")) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 15;
            else min += 30;
        }
        //Oh noes anemone!
        if (this.body.statusAffects.has("AnemoneArousal")) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 30;
        }
        //Hot blooded perk raises min lust!
        if (this.body.perks.has("HotBlooded")) {
            if (min > 0)
                min += this.body.perks.get("HotBlooded").value1 / 2;
            else
                min += this.body.perks.get("HotBlooded").value1;
        }
        if (this.body.perks.has("LuststickAdapted")) {
            if (min < 50) min += 10;
            else min += 5;
        }
        //Add points for Crimstone
        min += this.body.perks.get("PiercedCrimstone").value1;
        min += this.body.perks.get("PentUp").value1;
        //Harpy Lipstick status forces minimum lust to be at least 50.
        if (min < 50 && this.body.statusAffects.has("Luststick")) min = 50;
        //SHOULDRA BOOSTS
        //+20
        if (Flags.list[FlagEnum.SHOULDRA_SLEEP_TIMER] <= -168) {
            min += 20;
            if (Flags.list[FlagEnum.SHOULDRA_SLEEP_TIMER] <= -216)
                min += 30;
        }
        //SPOIDAH BOOSTS
        if (this.body.lowerBody.hasOvipositor() && this.body.lowerBody.ovipositor.eggs >= 20) {
            min += 10;
            if (this.body.lowerBody.ovipositor.eggs >= 40)
                min += 10;
        }
        if (min < 30 && this.body.perks.has("lusty maiden's armor"))
            min = 30;
        return min;
    }

    public lustPercent(): number {
        let lust: number = 100;
        //2.5% lust resistance per level - max 75.
        if (this.stats.level < 21)
            lust -= (this.stats.level - 1) * 3;
        else lust = 40;

        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //ADDITIVE REDUCTIONS
        //THESE ARE FLAT BONUSES WITH LITTLE TO NO DOWNSIDE
        //TOTAL IS LIMITED TO 75%!
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //Corrupted Libido reduces lust gain by 10%!
        if (this.body.perks.has("CorruptedLibido"))
            lust -= 10;
        //Acclimation reduces by 15%
        if (this.body.perks.has("Acclimation"))
            lust -= 15;
        //Purity blessing reduces lust gain
        if (this.body.perks.has("PurityBlessing"))
            lust -= 5;
        //Resistance = 10%
        if (this.body.perks.has("Resistance"))
            lust -= 10;
        if (this.body.perks.has("ChiReflowLust"))
            lust -= UmasShop.NEEDLEWORK_LUST_LUST_RESIST;

        if (lust < 25) lust = 25;
        if (this.body.statusAffects.has("BlackCatBeer")) {
            if (lust >= 80) lust = 100;
            else lust += 20;
        }
        lust += Math.round(this.body.perks.get("PentUp").value1 / 2);
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //MULTIPLICATIVE REDUCTIONS
        //THESE PERKS ALSO RAISE MINIMUM LUST OR HAVE OTHER
        //DRAWBACKS TO JUSTIFY IT.
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //Bimbo body slows lust gains!
        if ((this.body.statusAffects.has("BimboChampagne") || this.body.statusAffects.has("BimboBody")) && lust > 0)
            lust *= .75;
        if (this.body.statusAffects.has("BroBody") && lust > 0)
            lust *= .75;
        if (this.body.statusAffects.has("FutaForm") && lust > 0)
            lust *= .75;
        //Omnibus' Gift reduces lust gain by 15%
        if (this.body.statusAffects.has("OmnibusGift"))
            lust *= .85;
        //Luststick reduces lust gain by 10% to match increased min lust
        if (this.body.statusAffects.has("LuststickAdapted"))
            lust *= 0.9;
        if (this.body.statusAffects.has("Berzerking"))
            lust *= .6;
        if (this.body.statusAffects.has("PureAndLoving"))
            lust *= 0.95;

        // Lust mods from Uma's content -- Given the short duration and the gem cost, I think them being multiplicative is justified.
        // Changing them to an additive bonus should be pretty simple (check the static values in UmasShop.as)
        if (this.body.statusAffects.has("UmasMassage")) {
            let UmasMassageStatusAffect = this.body.statusAffects.get("UmasMassage");
            if (UmasMassageStatusAffect.value1 == UmasShop.MASSAGE_RELIEF || UmasMassageStatusAffect.value1 == UmasShop.MASSAGE_LUST) {
                lust *= UmasMassageStatusAffect.value2;
            }
        }

        lust = Math.round(lust);
        return lust;
    }

    public set lustVuln(value: number) {
        this.stats.lustVuln = value;
    }

    public get lustVuln(): number {
        return this.stats.lustVuln;
    }

    public set XP(value: number) {
        this.stats.XP = value;
    }

    public get XP(): number {
        return this.stats.XP;
    }

    public set level(value: number) {
        this.stats.level = value;
    }

    public get level(): number {
        return this.stats.level;
    }
    
    public set additionalXP(value: number) {
        this.stats.additionalXP = value;
    }

    public get additionalXP(): number {
        return this.stats.additionalXP;
    }
}