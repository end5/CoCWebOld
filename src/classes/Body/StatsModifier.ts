import Creature from './Creature';
import Stats from './Stats';
import Tail from './Tail';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';

export default class StatsModifier {
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
        if (this.body.perks.has(PerkType.ChiReflowSpeed)) {
            if (this.stats.str > UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP) {
                this.stats.str = UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP;
            }
        }

        this.stats.str += value;

        if (this.body.perks.has(PerkType.Strong) && value >= 0)
            this.stats.str += value * this.body.perks.get(PerkType.Strong).value1;
    }

    public get tou(): number {
        return this.stats.tou;
    }

    public set tou(value: number) {
        value -= this.stats.tou;
        this.stats.tou += value;

        // Add HP for toughness change.
        this.HP += value * 2;

        if (this.body.perks.has(PerkType.Tough) && value >= 0)
            this.stats.tou += value * this.body.perks.get(PerkType.Tough).value1;
    }

    public get spe(): number {
        return this.stats.spe;
    }

    public set spe(value: number) {
        value -= this.stats.spe;
        if (this.body.perks.has(PerkType.ChiReflowSpeed) && value < 0)
            value *= UmasShop.NEEDLEWORK_SPEED_SPEED_MULTI;
        if (this.body.perks.has(PerkType.ChiReflowDefense)) {
            if (this.stats.spe > UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP) {
                this.stats.spe = UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP;
            }
        }

        this.stats.spe += value;

        if (this.body.perks.has(PerkType.Fast) && value >= 0)
            this.stats.spe += value * this.body.perks.get(PerkType.Fast).value1;
    }

    public get int(): number {
        return this.stats.int;
    }

    public set int(value: number) {
        value -= this.stats.int;
        this.intChange(value);
    }

    public set intBimbo(value: number) {
        value -= this.stats.int;
        this.intChange(value, true);
    }

    private intChange(value: number, bimboIntReduction: boolean = false) {
        if (!bimboIntReduction)
            if (this.body.perks.has(PerkType.FutaFaculties) || this.body.perks.has(PerkType.BimboBrains) || this.body.perks.has(PerkType.BroBrains)) {
                if (value > 0)
                    value /= 2;
                if (value < 0)
                    value *= 2;
            }

        this.stats.int += value;

        if (this.body.perks.has(PerkType.Smart) && value >= 0)
            this.stats.int += value * this.body.perks.get(PerkType.Smart).value1;
    }

    public get lib(): number {
        return this.stats.lib;
    }

    public set lib(value: number) {
        value -= this.stats.lib;
        this.libChange(value);
    }

    public set libBimbo(value: number) {
        value -= this.stats.lib;
        this.libChange(value, true);
    }

    private libChange(value: number, bimboIntReduction: boolean = false) {
        if (!bimboIntReduction)
            if (this.body.perks.has(PerkType.FutaForm) || this.body.perks.has(PerkType.BimboBody) || this.body.perks.has(PerkType.BroBody)) {
                if (value > 0)
                    value *= 2;
                if (value < 0)
                    value /= 2;
            }
        if (this.body.perks.has(PerkType.ChiReflowLust) && value > 0)
            value *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;
        if (value > 0 && this.body.perks.has(PerkType.PurityBlessing))
            value *= 0.75;

        this.stats.lib += value;

        if (this.body.perks.has(PerkType.Lusty) && value >= 0)
            this.stats.lib += value * this.body.perks.get(PerkType.Lusty).value1;
        if (this.stats.lib < 50 && this.body.perks.has(PerkType.LustyMaidensArmor))
            this.stats.lib = 50;
        else if (this.stats.lib < 15 && this.body.gender > 0)
            this.stats.lib = 15;
        else if (this.stats.lib < 10 && this.body.gender === 0)
            this.stats.lib = 10;
        if (this.stats.lib < this.minLust() * 2 / 3)
            this.stats.lib = this.minLust() * 2 / 3;
    }

    public get sens(): number {
        return this.stats.sens;
    }

    public set sens(value: number) {
        value -= this.stats.sens;
        if (this.body.perks.has(PerkType.ChiReflowLust) && value > 0)
            value *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;

        if (this.stats.sens > 50 && value > 0) value /= 2;
        if (this.stats.sens > 75 && value > 0) value /= 2;
        if (this.stats.sens > 90 && value > 0) value /= 2;
        if (this.stats.sens > 50 && value < 0) value *= 2;
        if (this.stats.sens > 75 && value < 0) value *= 2;
        if (this.stats.sens > 90 && value < 0) value *= 2;

        this.stats.sens += value;

        if (this.body.perks.has(PerkType.Sensitive) && value >= 0)
            this.stats.sens += value * this.body.perks.get(PerkType.Sensitive).value1;
    }

    public get cor(): number {
        return this.stats.cor;
    }

    public set cor(value: number) {
        value -= this.stats.cor;
        if (value > 0 && this.body.perks.has(PerkType.PurityBlessing))
            value *= 0.5;
        if (value > 0 && this.body.perks.has(PerkType.PureAndLoving))
            value *= 0.75;

        this.stats.cor += value;
        if (this.stats.cor < 0)
            this.stats.cor = 0;
    }

    public clearCor() {
        this.stats.cor = 0;
    }

    public get fatigue(): number {
        return this.stats.fatigue;
    }

    public set fatigue(value: number) {
        value -= this.stats.fatigue;
        if (this.stats.fatigue >= 100 && value > 0) return;
        if (this.stats.fatigue <= 0 && value < 0) return;
        // Fatigue restoration buffs!
        if (value < 0) {
            let multi: number = 1;

            if (this.body.perks.has(PerkType.HistorySlacker))
                multi += 0.2;
            if (this.body.perks.has(PerkType.ControlledBreath) && this.cor < 30)
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
        // Blood mages use HP for spells
        if (this.body.perks.has(PerkType.BloodMage)) {
            this.stats.HP -= value;
        }
    }

    public get HP(): number {
        return this.stats.HP;
    }

    public set HP(value: number) {
        this.stats.HP = value;
        if (this.stats.HP < 0)
            this.stats.HP = 0;
    }

    public maxHP(): number {
        let max: number = 0;
        max += Math.floor(this.stats.tou * 2 + 50);
        if (this.body.perks.has(PerkType.Tank))
            max += 50;
        if (this.body.perks.has(PerkType.Tank2))
            max += Math.round(this.body.stats.tou);
        if (this.body.perks.has(PerkType.ChiReflowDefense))
            max += UmasShop.NEEDLEWORK_DEFENSE_EXTRAstats.HP;
        if (this.body.stats.level <= 20)
            max += this.body.stats.level * 15;
        else
            max += 20 * 15;
        max = Math.round(max);
        if (max > 999)
            max = 999;
        return max + this.bonusHP;
    }

    public get bonusHP(): number {
        return this.stats.bonusHP;
    }

    public set bonusHP(value: number) {
        this.stats.bonusHP = value;
    }

    public get lust(): number {
        return this.stats.lust;
    }

    public set lust(value: number) {
        value -= this.stats.lust;
        this.lustChange(value, true);
    }

    public set lustNoResist(value: number) {
        value -= this.stats.lust;
        this.lustChange(value, false);
    }

    private lustChange(value: number, lustResisted: boolean = true) {
        if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] === 1 && value > 0 && lustResisted)
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
        if (this.body.statusAffects.has(StatusAffectType.Infested))
            if (this.stats.lust < 50)
                this.stats.lust = 50;
    }

    public minLust(): number {
        let min: number = 0;
        // Bimbo body boosts minimum lust by 40
        if (this.body.statusAffects.has(StatusAffectType.BimboChampagne) || this.body.perks.has(PerkType.BimboBody) || this.body.perks.has(PerkType.BroBody) || this.body.perks.has(PerkType.FutaForm)) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 40;
        }
        // Omnibus' Gift
        if (this.body.perks.has(PerkType.OmnibusGift)) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 35;
        }
        // Nymph perk raises to 30
        if (this.body.perks.has(PerkType.Nymphomania)) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 15;
            else min += 30;
        }
        // Oh noes anemone!
        if (this.body.statusAffects.has(StatusAffectType.AnemoneArousal)) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 30;
        }
        // Hot blooded perk raises min lust!
        if (this.body.perks.has(PerkType.HotBlooded)) {
            if (min > 0)
                min += this.body.perks.get(PerkType.HotBlooded).value1 / 2;
            else
                min += this.body.perks.get(PerkType.HotBlooded).value1;
        }
        if (this.body.perks.has(PerkType.LuststickAdapted)) {
            if (min < 50) min += 10;
            else min += 5;
        }
        // Add points for Crimstone
        min += this.body.perks.get(PerkType.PiercedCrimstone).value1;
        min += this.body.perks.get(PerkType.PentUp).value1;
        // Harpy Lipstick status forces minimum lust to be at least 50.
        if (min < 50 && this.body.statusAffects.has(StatusAffectType.LustStick)) min = 50;
        // SHOULDRA BOOSTS
        // +20
        if (Flags.list[FlagEnum.SHOULDRA_SLEEP_TIMER] <= -168) {
            min += 20;
            if (Flags.list[FlagEnum.SHOULDRA_SLEEP_TIMER] <= -216)
                min += 30;
        }
        // SPOIDAH BOOSTS
        for (const oviTail of this.body.torso.tails.filter(Tail.HasOvipositor)) {
            if (oviTail.ovipositor.eggs >= 20) {
                min += 10;
                if (oviTail.ovipositor.eggs >= 40)
                    min += 10;
            }
        }
        if (min < 30 && this.body.perks.has(PerkType.LustyMaidensArmor))
            min = 30;
        return min;
    }

    public lustPercent(): number {
        let lust: number = 100;
        // 2.5% lust resistance per level - max 75.
        if (this.stats.level < 21)
            lust -= (this.stats.level - 1) * 3;
        else lust = 40;

        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // ADDITIVE REDUCTIONS
        // THESE ARE FLAT BONUSES WITH LITTLE TO NO DOWNSIDE
        // TOTAL IS LIMITED TO 75%!
        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // Corrupted Libido reduces lust gain by 10%!
        if (this.body.perks.has(PerkType.CorruptedLibido))
            lust -= 10;
        // Acclimation reduces by 15%
        if (this.body.perks.has(PerkType.Acclimation))
            lust -= 15;
        // Purity blessing reduces lust gain
        if (this.body.perks.has(PerkType.PurityBlessing))
            lust -= 5;
        // Resistance = 10%
        if (this.body.perks.has(PerkType.Resistance))
            lust -= 10;
        if (this.body.perks.has(PerkType.ChiReflowLust))
            lust -= UmasShop.NEEDLEWORK_LUST_LUST_RESIST;

        if (lust < 25) lust = 25;
        if (this.body.statusAffects.has(StatusAffectType.BlackCatBeer)) {
            if (lust >= 80) lust = 100;
            else lust += 20;
        }
        lust += Math.round(this.body.perks.get(PerkType.PentUp).value1 / 2);
        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // MULTIPLICATIVE REDUCTIONS
        // THESE PERKS ALSO RAISE MINIMUM LUST OR HAVE OTHER
        // DRAWBACKS TO JUSTIFY IT.
        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // Bimbo body slows lust gains!
        if ((this.body.statusAffects.has(StatusAffectType.BimboChampagne) || this.body.perks.has(PerkType.BimboBody)) && lust > 0)
            lust *= .75;
        if (this.body.perks.has(PerkType.BroBody) && lust > 0)
            lust *= .75;
        if (this.body.perks.has(PerkType.FutaForm) && lust > 0)
            lust *= .75;
        // Omnibus' Gift reduces lust gain by 15%
        if (this.body.perks.has(PerkType.OmnibusGift))
            lust *= .85;
        // Luststick reduces lust gain by 10% to match increased min lust
        if (this.body.perks.has(PerkType.LuststickAdapted))
            lust *= 0.9;
        if (this.body.statusAffects.has(StatusAffectType.Berzerking))
            lust *= .6;
        if (this.body.perks.has(PerkType.PureAndLoving))
            lust *= 0.95;

        // Lust mods from Uma's content -- Given the short duration and the gem cost, I think them being multiplicative is justified.
        // Changing them to an additive bonus should be pretty simple (check the static values in UmasShop.as)
        if (this.body.statusAffects.has(StatusAffectType.UmasMassage)) {
            const UmasMassageStatusAffect = this.body.statusAffects.get(StatusAffectType.UmasMassage);
            if (UmasMassageStatusAffect.value1 === UmasShop.MASSAGE_RELIEF || UmasMassageStatusAffect.value1 === UmasShop.MASSAGE_LUST) {
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
