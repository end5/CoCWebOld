import { SaveInterface } from '../SaveInterface';

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

export default class BreastRow implements SaveInterface {
    public breasts: number;
    public nipplesPerBreast: number;
    public breastRating: number;
    public lactationMultiplier: number;
    //Fullness used for lactation....if 75 or greater warning bells start going off!
    //If it reaches 100 it reduces lactation multiplier.
    public milkFullness: number;
    public fullness: number;
    public fuckable: boolean;

    public nippleLength: number;
    public nipplesPierced: number;
    public nipplesPiercedShort: string;
    public nipplesPiercedLong: string;

    public constructor(breastCup: BreastCup = BreastCup.C) {
        this.breasts = 2;
        this.nipplesPerBreast = 1;
        this.breastRating = breastCup;
        this.lactationMultiplier = 0;
        //Fullness used for lactation....if 75 or greater warning bells start going off!
        //If it reaches 100 it reduces lactation multiplier.
        this.milkFullness = 0;
        this.fullness = 0;
        this.fuckable = false;

        this.nippleLength = .25;
        this.nipplesPierced = 0;
        this.nipplesPiercedShort = "";
        this.nipplesPiercedLong = "";

    }

    saveKey: string = "BreastRow";
    save(): object {
        return {
            "breasts": this.breasts,
            "nipplesPerBreast": this.nipplesPerBreast,
            "breastRating": this.breastRating,
            "lactationMultiplier": this.lactationMultiplier,
            "milkFullness": this.milkFullness,
            "fullness": this.fullness,
            "fuckable": this.fuckable,
            "nippleLength": this.nippleLength,
            "nipplesPierced": this.nipplesPierced,
            "nipplesPiercedShort": this.nipplesPiercedShort,
            "nipplesPiercedLong": this.nipplesPiercedLong
        };
    }
    load(saveObject: object) {
        this.breasts = saveObject["breasts"];
        this.nipplesPerBreast = saveObject["nipplesPerBreast"];
        this.breastRating = saveObject["breastRating"];
        this.lactationMultiplier = saveObject["lactationMultiplier"];
        this.milkFullness = saveObject["milkFullness"];
        this.fullness = saveObject["fullness"];
        this.fuckable = saveObject["fuckable"];
        this.nippleLength = saveObject["nippleLength"];
        this.nipplesPierced = saveObject["nipplesPierced"];
        this.nipplesPiercedShort = saveObject["nipplesPiercedShort"];
        this.nipplesPiercedLong = saveObject["nipplesPiercedLong"];
    }
}