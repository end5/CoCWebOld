export default class EffectDescription {
    public readonly key: string;
    public readonly name: string;
    private readonly desc: string;
    public readonly longDesc: string;
    constructor(key: string, name: string, desc: string, longDesc: string = null) {
        this.key = key;
        this.name = name;
        this.desc = desc || this.name;
        this.longDesc = longDesc || this.desc;
    }

    public description(): string {
        return this.desc;
    }
}
