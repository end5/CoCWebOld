import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";
import Game from "../../Game/Game";

export default class CleansingPalmPerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
        if (Game.player.stats.cor >= 10) return "<b>DISABLED</b> - Corruption too high!";
        else return super.desc(params);
    }

    public constructor() {
        super("Cleansing Palm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.", false, true);
    }
}
