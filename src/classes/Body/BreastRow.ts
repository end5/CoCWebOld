import Nipple from './Nipple';
import SerializeInterface from '../SerializeInterface';
import { FilterOption, ReduceOption, SortOption } from '../Utilities/list';
import SerializableList from '../Utilities/SerializableList';

export enum BreastCup {
    FLAT, A, B, C, D, DD, DD_BIG, E, E_BIG, EE, EE_BIG, F, F_BIG, FF, FF_BIG,
    G, G_BIG, GG, GG_BIG, H, H_BIG, HH, HH_BIG, HHH, I, I_BIG, II, II_BIG,
    J, J_BIG, JJ, JJ_BIG, K, K_BIG, KK, KK_BIG, L, L_BIG, LL, LL_BIG,
    M, M_BIG, MM, MM_BIG, MMM, MMM_LARGE, N, N_LARGE, NN, NN_LARGE,
    O, O_LARGE, OO, OO_LARGE, P, P_LARGE, PP, PP_LARGE, Q, Q_LARGE, QQ, QQ_LARGE,
    R, R_LARGE, RR, RR_LARGE, S, S_LARGE, SS, SS_LARGE, T, T_LARGE, TT, TT_LARGE,
    U, U_LARGE, UU, UU_LARGE, V, V_LARGE, VV, VV_LARGE, W, W_LARGE, WW, WW_LARGE,
    X, X_LARGE, XX, XX_LARGE, Y, Y_LARGE, YY, YY_LARGE, Z, Z_LARGE, ZZ, ZZ_LARGE, ZZZ, ZZZ_LARGE
}

export default class BreastRow implements SerializeInterface {
    public static readonly BreastRatingLargest: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.rating - b.rating;
    }

    public static readonly BreastRatingSmallest: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.rating - a.rating;
    }

    public static readonly LactationMultipierLargest: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.lactationMultiplier - b.lactationMultiplier;
    }

    public static readonly LactationMultipierSmallest: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.lactationMultiplier - a.lactationMultiplier;
    }

    public static readonly MilkFullnessMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.milkFullness - b.milkFullness;
    }

    public static readonly MilkFullnessLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.milkFullness - a.milkFullness;
    }

    public static readonly FullnessMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.fullness - b.fullness;
    }

    public static readonly FullnessLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.fullness - a.fullness;
    }

    public static readonly NipplesPerBreastMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.nipples.count - b.nipples.count;
    }

    public static readonly NipplesPerBreastLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.nipples.count - a.nipples.count;
    }

    public static readonly HasNipples: FilterOption<BreastRow> = (a: BreastRow) => {
        if (a.nipples.count > 0)
            return a;
    }

    public static readonly FemaleBreasts: FilterOption<BreastRow> = (a: BreastRow) => {
        if (a.rating >= 1)
            return a;
    }

    public static readonly CanTitFuck: FilterOption<BreastRow> = (a: BreastRow) => {
        if (a.rating > 3)
            return a;
    }

    public static readonly Fuckable: FilterOption<BreastRow> = (a: BreastRow) => {
        if (a.nipples.filter(Nipple.Fuckable).length > 0)
            return a;
    }

    public static readonly NotFuckable: FilterOption<BreastRow> = (a: BreastRow) => {
        if (a.nipples.filter(Nipple.NotFuckable).length > 0)
            return a;
    }

    public static readonly PiercedNipples: FilterOption<BreastRow> = (a: BreastRow) => {
        if (a.nipples.filter(Nipple.PiercedNipples).length > 0)
            return a;
    }

    public static readonly NotPiercedNipples: FilterOption<BreastRow> = (a: BreastRow) => {
        if (a.nipples.filter(Nipple.NotPiercedNipples).length > 0)
            return a;
    }

    public static readonly AverageRating: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow, index: number, array: BreastRow[]) => {
        if (index >= array.length - 1)
            return (previousValue + currentValue.rating) / index;
        return previousValue + currentValue.rating;
    }

    public static readonly AverageLactation: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow, index: number, array: BreastRow[]) => {
        if (index >= array.length - 1)
            return (previousValue + currentValue.lactationMultiplier) / index;
        return previousValue + currentValue.lactationMultiplier;
    }

    public static readonly AverageNipplesPerBreast: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow, index: number, array: BreastRow[]) => {
        if (index >= array.length - 1)
            return (previousValue + currentValue.nipples.count) / index;
        return previousValue + currentValue.nipples.count;
    }

    public rating: number = BreastCup.C;
    public lactationMultiplier: number = 0;
    // Fullness used for lactation....if 75 or greater warning bells start going off!
    // If it reaches 100 it reduces lactation multiplier.
    public milkFullness: number = 0;
    public fullness: number = 0;

    public readonly nipples: SerializableList<Nipple> = new SerializableList(Nipple);

    public serialize(): string {
        return JSON.stringify({
            rating: this.rating,
            lactationMultiplier: this.lactationMultiplier,
            milkFullness: this.milkFullness,
            fullness: this.fullness,
            nipples: this.nipples.serialize(),
        });
    }

    public deserialize(saveObject: BreastRow) {
        this.rating = saveObject.rating;
        this.lactationMultiplier = saveObject.lactationMultiplier;
        this.milkFullness = saveObject.milkFullness;
        this.fullness = saveObject.fullness;
        this.nipples.deserialize(saveObject.nipples);
    }
}
