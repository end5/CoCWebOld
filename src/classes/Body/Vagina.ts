import Clit from './Clit';
import Labia from './Labia';
import SerializeInterface from '../SerializeInterface';
import { FilterOption, SortOption } from '../Utilities/list';
import Utils from '../Utilities/Utils';

export enum VaginaType {
    HUMAN, BLACK_SAND_TRAP
}

export enum VaginaWetness {
    DRY, NORMAL, WET, SLICK, DROOLING, SLAVERING
}

export enum VaginaLooseness {
    TIGHT, NORMAL, LOOSE, GAPING, GAPING_WIDE, LEVEL_CLOWN_CAR
}

export default class Vagina implements SerializeInterface {
    public type: VaginaType = VaginaType.HUMAN;
    public virgin: boolean = true;

    public wetness: VaginaWetness = VaginaWetness.NORMAL;
    public looseness: VaginaLooseness = VaginaLooseness.TIGHT;

    //Used during sex to determine how full it currently is.  For multi-dick sex.
    public fullness: number = 0;
    public labia: Labia = new Labia();
    public clit: Clit = new Clit();

    public static readonly LoosenessMost: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return a.looseness - b.looseness;
    };

    public static readonly LoosenessLeast: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return b.looseness - a.looseness;
    };

    public static readonly WetnessMost: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return a.wetness - b.wetness;
    };

    public static readonly WetnessLeast: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return b.wetness - a.wetness;
    };

    public static readonly Virgin: FilterOption<Vagina> = (a: Vagina) => {
        if (a.virgin)
            return a;
    };

    public static readonly NotVirgin: FilterOption<Vagina> = (a: Vagina) => {
        if (!a.virgin)
            return a;
    };

    public wetnessFactor(): number {
        if (this.wetness == VaginaWetness.DRY) return 1.25;
        if (this.wetness == VaginaWetness.NORMAL) return 1;
        if (this.wetness == VaginaWetness.WET) return 0.8;
        if (this.wetness == VaginaWetness.SLICK) return 0.7;
        if (this.wetness == VaginaWetness.DROOLING) return 0.6;
        if (this.wetness == VaginaWetness.SLAVERING) return 0.5;
        return .5;
    }

    public capacity(): number {
        if (this.looseness == VaginaLooseness.TIGHT) return 8;
        if (this.looseness == VaginaLooseness.NORMAL) return 16;
        if (this.looseness == VaginaLooseness.LOOSE) return 24;
        if (this.looseness == VaginaLooseness.GAPING) return 36;
        if (this.looseness == VaginaLooseness.GAPING_WIDE) return 56;
        if (this.looseness == VaginaLooseness.LEVEL_CLOWN_CAR) return 100;
        return 10000;
    }

    public serialize(): string {
        return JSON.stringify({
            vaginaType: this.type,
            virgin: this.virgin,
            vaginalWetness: this.wetness,
            vaginalLooseness: this.looseness,
            fullness: this.fullness,
            labia: this.labia.serialize(),
            clit: this.clit.serialize()
        });
    }

    public deserialize(saveObject: Vagina) {
        this.type = saveObject.type;
        this.virgin = saveObject.virgin;
        this.wetness = saveObject.wetness;
        this.looseness = saveObject.looseness;
        this.fullness = saveObject.fullness;
        this.labia.deserialize(saveObject.labia);
        this.clit.deserialize(saveObject.clit);
}
}
