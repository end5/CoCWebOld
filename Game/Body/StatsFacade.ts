﻿import { Creature } from './Creature';
import { Stats } from './Stats';
import { User } from '../User';
import { Gender } from './GenderIdentity';

export class StatsFacade {
    private body: Creature;
    private stats: Stats;

    public constructor(body: Creature, baseStats: Stats) {
        this.body = body;
        this.stats = baseStats;
    }

    public get str(): number {
        return this.stats.str.value;
    }

    public set str(value: number) {
        value -= this.str;
        this.stats.str.value += value;
    }

    public get tou(): number {
        return this.stats.tou.value;
    }

    public set tou(value: number) {
        value -= this.stats.tou.value;
        this.stats.tou.value += value;

        // Add HP for toughness change.
        this.HP += value * 2;
    }

    public get spe(): number {
        return this.stats.spe.value;
    }

    public set spe(value: number) {
        value -= this.stats.spe.value;
        this.stats.spe.value += value;
    }

    public get int(): number {
        return this.stats.int.value;
    }

    public set int(value: number) {
        value -= this.stats.int.value;
        this.intChange(value);
    }

    public set intBimbo(value: number) {
        value -= this.stats.int.value;
        this.intChange(value, true);
    }

    private intChange(value: number, _bimboIntReduction: boolean = false) {
        this.stats.int.value += value;
    }

    public get lib(): number {
        return this.stats.lib.value;
    }

    public set lib(value: number) {
        value -= this.stats.lib.value;
        this.libChange(value);
    }

    public set libBimbo(value: number) {
        value -= this.stats.lib.value;
        this.libChange(value, true);
    }

    private libChange(value: number, _bimboIntReduction: boolean = false) {
        this.stats.lib.value += value;

        if (this.stats.lib.value < 15 && this.body.gender > 0)
            this.stats.lib.value = 15;
        else if (this.stats.lib.value < 10 && this.body.gender === Gender.NONE)
            this.stats.lib.value = 10;
        if (this.stats.lib.value < this.minLust() * 2 / 3)
            this.stats.lib.value = this.minLust() * 2 / 3;
    }

    public get sens(): number {
        return this.stats.sens.value;
    }

    public set sens(value: number) {
        value -= this.stats.sens.value;

        if (this.stats.sens.value > 50 && value > 0) value /= 2;
        if (this.stats.sens.value > 75 && value > 0) value /= 2;
        if (this.stats.sens.value > 90 && value > 0) value /= 2;
        if (this.stats.sens.value > 50 && value < 0) value *= 2;
        if (this.stats.sens.value > 75 && value < 0) value *= 2;
        if (this.stats.sens.value > 90 && value < 0) value *= 2;

        this.stats.sens.value += value;
    }

    public get cor(): number {
        return this.stats.cor.value;
    }

    public set cor(value: number) {
        value -= this.stats.cor.value;

        this.stats.cor.value += value;
    }

    public clearCor() {
        this.stats.cor.value = 0;
    }

    public get fatigue(): number {
        return this.stats.fatigue.value;
    }

    public set fatigue(value: number) {
        value -= this.stats.fatigue.value;
        this.stats.fatigue.value += value;
    }

    public fatiguePhysical(value: number) {
        this.stats.fatigue.value = value;
    }

    public fatigueMagic(value: number) {
        this.stats.fatigue.value = value;
    }

    public get HP(): number {
        return this.stats.HP.value;
    }

    public set HP(value: number) {
        this.stats.HP.value = value;
    }

    public maxHP(): number {
        let max: number = 0;
        max += Math.floor(this.stats.tou.value * 2 + 50);
        if (this.body.stats.level <= 20)
            max += this.body.stats.level * 15;
        else
            max += 20 * 15;
        max = Math.round(max);
        if (max > 999)
            max = 999;
        this.stats.HP.max = max;
        return max + this.bonusHP;
    }

    public get bonusHP(): number {
        return this.stats.bonusHP;
    }

    public set bonusHP(value: number) {
        this.stats.bonusHP = value;
    }

    public get lust(): number {
        return this.stats.lust.value;
    }

    public set lust(value: number) {
        value -= this.stats.lust.value;
        this.lustChange(value, true);
    }

    public set lustNoResist(value: number) {
        value -= this.stats.lust.value;
        this.lustChange(value, false);
    }

    private lustChange(value: number, lustResisted: boolean = true) {
        if (User.settings.easyMode && value > 0 && lustResisted)
            value /= 2;
        if (value > 0 && lustResisted)
            value *= this.lustPercent() / 100;

        this.stats.lust.value += value;
    }

    public minLust(): number {
        return this.stats.lust.min;
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
