import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";
import Game from "../../Game/Game";

export default class ControlledBreathPerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
        if (Game.player.stats.cor >= 30) return "<b>DISABLED</b> - Corruption too high!";
        else return super.desc(params);
    }

    public constructor() {
        super("Controlled Breath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%");
    }
}
