import kGAMECLASS from "../Game/Game"
import PerkDesc from "./PerkDesc"
import Perk from "./Perk"

export default class EnlightenedPerk extends PerkDesc {
    public desc(params: Perk = null): string {
			if (Game.player.stats.cor >= 10) return "<b>DISABLED</b> - Corruption too high!";
			else return super.desc(params);
    }

    public constructor() {
        super("Enlightened", "Enlightened", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
    }
}
