import Stats from './BaseStats';

export default abstract class StatsModifier {
    protected stats: Stats | StatsModifier;
    public constructor(stats: Stats | StatsModifier) {
        this.stats = stats;
    }
    abstract get str(): number;
    abstract strChange(value: number);
    abstract get tou(): number;
    abstract set tou(value: number);
    abstract get spe(): number;
    abstract set spe(value: number);
    abstract get int(): number;
    abstract set int(value: number);
    abstract get lib(): number;
    abstract set lib(value: number);
    abstract get sens(): number;
    abstract set sens(value: number);
    abstract get cor(): number;
    abstract set cor(value: number);
    abstract get fatigue(): number;
    abstract set fatigue(value: number);
    abstract get HP(): number;
    abstract set HP(value: number);
    abstract get lust(): number;
    abstract set lust(value: number);
    abstract get lustVuln(): number;
    abstract set lustVuln(value: number);
}