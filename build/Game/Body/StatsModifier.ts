import { Creature } from './Creature';
import { Stats } from './Stats';
import { Tail } from './Tail';
import { Settings } from '../Settings';
import { User } from '../User';

export class StatsModifier {
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
        this.stats.str += value;
    }

    public get tou(): number {
        return this.stats.tou;
    }

    public set tou(value: number) {
        value -= this.stats.tou;
        this.stats.tou += value;

        // Add HP for toughness change.
        this.HP += value * 2;
    }

    public get spe(): number {
        return this.stats.spe;
    }

    public set spe(value: number) {
        value -= this.stats.spe;
        this.stats.spe += value;
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
        this.stats.int += value;
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
        this.stats.lib += value;

        if (this.stats.lib < 15 && this.body.gender > 0)
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

        if (this.stats.sens > 50 && value > 0) value /= 2;
        if (this.stats.sens > 75 && value > 0) value /= 2;
        if (this.stats.sens > 90 && value > 0) value /= 2;
        if (this.stats.sens > 50 && value < 0) value *= 2;
        if (this.stats.sens > 75 && value < 0) value *= 2;
        if (this.stats.sens > 90 && value < 0) value *= 2;

        this.stats.sens += value;
    }

    public get cor(): number {
        return this.stats.cor;
    }

    public set cor(value: number) {
        value -= this.stats.cor;

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
        this.stats.fatigue += value;
        if (this.stats.fatigue > 100) this.stats.fatigue = 100;
        if (this.stats.fatigue < 0) this.stats.fatigue = 0;
    }

    public fatiguePhysical(value: number) {
        this.stats.fatigue = value;
    }

    public fatigueMagic(value: number) {
        this.stats.fatigue = value;
    }

    public get HP(): number {
        return this.stats.HP;
    }

    public set HP(value: number) {
        this.stats.HP = value;
        if (this.stats.HP < 0)
            this.stats.HP = 0;
        if (this.stats.HP > this.maxHP())
            this.stats.HP = this.maxHP();
    }

    public maxHP(): number {
        let max: number = 0;
        max += Math.floor(this.stats.tou * 2 + 50);
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
        if (User.settings.easyMode && value > 0 && lustResisted)
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
    }

    public minLust(): number {
        return this.stats.minLust;
    }

    public lustPercent(): number {
        let lust: number = 100;
        // 2.5% lust resistance per level - max 75.
        if (this.stats.level < 21)
            lust -= (this.stats.level - 1) * 3;
        else lust = 40;

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

    public set perkPoints(value: number) {
        this.stats.perkPoints = value;
    }

    public get perkPoints(): number {
        return this.stats.perkPoints;
    }

    public set teaseLevel(value: number) {
        this.stats.teaseLevel = value;
    }

    public get teaseLevel(): number {
        return this.stats.teaseLevel;
    }

    public set teaseXP(value: number) {
        this.stats.teaseLevel = value;
    }

    public get teaseXP(): number {
        return this.stats.teaseLevel;
    }
}
