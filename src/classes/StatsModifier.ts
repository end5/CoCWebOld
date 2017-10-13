import Stats from './Body/Stats';
import Character from './Character';
import Flags, { FlagEnum } from './Game/Flags';

export default class StatsModifier {
    private body: Character;
    private stats: Stats;

    public constructor(character: Character, charStats: Stats) {
        this.body = character;
        this.stats = charStats;
    }

    public get str(): number {
        return this.stats.str;
    }

    public set str(value: number) {
        this.stats.str = value;
    }

    public forceStr(value: number) {
        this.stats.forceStr(value);
    }

    public get tou(): number {
        return this.stats.tou;
    }

    public set tou(value: number) {
        this.stats.tou = value;
    }

    public forceTou(value: number) {
        this.stats.forceTou(value);
    }

    public get spe(): number {
        return this.stats.spe;
    }

    public set spe(value: number) {
        this.stats.spe = value;
    }

    public forceSpe(value: number) {
        this.stats.forceSpe(value);
    }

    public get int(): number {
        return this.stats.int;
    }

    public set int(value: number) {
        this.stats.int = value;
    }

    public intChange(value: number, bimbo: boolean = false) {
        this.stats.bimboIntReduction = bimbo;
        this.stats.int = value;
        this.stats.bimboIntReduction = false;
    }

    public forceInt(value: number) {
        this.stats.forceInt(value);
    }

    public get lib(): number {
        return this.stats.lib;
    }

    public set lib(value: number) {
        this.stats.lib = value;
    }

    public libChange(value: number, bimbo: boolean = false) {
        this.stats.bimboIntReduction = bimbo;
        this.stats.lib = value;
        this.stats.bimboIntReduction = false;
    }

    public forceLib(value: number) {
        this.stats.forceLib(value);
    }

    public get sens(): number {
        return this.stats.sens;
    }

    public set sens(value: number) {
        this.stats.sens = value;
    }

    public forceSens(value: number) {
        this.stats.forceSens(value);
    }

    public get cor(): number {
        return this.stats.cor;
    }

    public set cor(value: number) {
        this.stats.cor = value;
    }

    public forceCor(value: number) {
        this.stats.forceCor(value);
    }

    public get fatigue(): number {
        return this.stats.fatigue;
    }

    public set fatigue(value: number) {
        this.stats.fatigue = value;
    }

    public forceFatigue(value: number) {
        this.stats.forceFatigue(value);
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

    public HPChange(value: number, source: Character = null): number {
        const oldHP = this.stats.HP;
        this.stats.HP = value;
        if (source) {
            if (value < 0) {
                //Isabella gets mad
                if (source.short == "Isabella") {
                    Flags.list[FlagEnum.ISABELLA_AFFECTION]--;
                    //Keep in bounds
                    if (Flags.list[FlagEnum.ISABELLA_AFFECTION] < 0)
                        Flags.list[FlagEnum.ISABELLA_AFFECTION] = 0;
                }
                //Interrupt gigaflare if necessary.
                if (source.statusAffects.has("Gigafire"))
                    source.statusAffects.get("Gigafire").value1 += value;
            }
        }
        return this.stats.HP - oldHP;
    }

    public forceHP(value: number) {
        this.stats.HP = value;
    }

    public maxHP(): number {
        return this.stats.maxHP();
    }

    public get lust(): number {
        return this.stats.lust;
    }

    public set lust(value: number) {
        this.stats.lust = value;
    }

    public lustChange(value: number, lustResisted: boolean = true) {
        this.stats.lustResisted = lustResisted;
        this.stats.lib = value;
        this.stats.lustResisted = true;
    }

    public forceLust(value: number) {
        this.stats.forceLust(value);
    }

    public minLust(value: number) {
        return this.stats.minLust;
    }

    public lustPercent(value: number) {
        return this.stats.lustPercent();
    }

    public set lustVuln(value: number) {
        this.stats.lustVuln = value;
    }

    public get lustVuln(): number {
        return this.stats.lustVuln;
    }
}