import Character from '../Character/Character';
import LibraryEntry from '../Utilities/LibraryEntry';

export default class EffectDescription extends LibraryEntry {
    public readonly name: string;
    private readonly desc: string;
    public readonly longDesc: string;
    constructor(objectKey: string, name: string, desc: string, longDesc: string = null) {
        super(objectKey);
        this.name = name;
        this.desc = desc || this.name;
        this.longDesc = longDesc || this.desc;
    }

    public description(): string {
        return this.desc;
    }
}

