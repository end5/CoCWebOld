import Utils from "../../internals/Utils";
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

export default class BreastRow {
    public breasts: number = 2;
    public nipplesPerBreast: number = 1;
    public breastRating: number = 0;
    public lactationMultiplier: number = 0;
    //Fullness used for lactation....if 75 or greater warning bells start going off!
    //If it reaches 100 it reduces lactation multiplier.
    public milkFullness: number = 0;
    public fullness: number = 0;
    public fuckable: boolean = false;

    public nippleLength: number = .25;
    public nipplesPierced: number = 0;
    public nipplesPiercedShort: string = "";
    public nipplesPiercedLong: string = "";


    public validate(): string {
        let error: string = "";
        error += Utils.validateNonNegativeNumberFields(this, "BreastRowClass.validate", [
            "breasts", "nipplesPerBreast", "breastRating", "lactationMultiplier",
            "milkFullness", "fullness"
        ]);
        return error;
    }
}