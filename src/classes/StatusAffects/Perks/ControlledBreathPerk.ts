import kGAMECLASS from "../Game/Game"
import PerkDesc from "./PerkDesc"
import Perk from "./Perk"

export default class ControlledBreathPerk extends PerkDesc {
    public desc(params: Perk = null): string {
        if (Game.player.stats.cor >= 30) return "<b>DISABLED</b> - Corruption too high!";
        else return super.desc(params);
    }

    public constructor() {
        super("Controlled Breath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%");
    }
}
