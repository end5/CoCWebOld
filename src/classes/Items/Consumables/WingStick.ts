import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Game from "../../Game/Game";
import Utils from "../../Utilities/Utils";

export default class WingStick extends Consumable {
		
	public constructor() {
		super("W.Stick", "Wingstick", "a wingstick", 16, "A tri-bladed throwing weapon.  Though good for only a single use, it's guaranteed to do high damage if it hits.  (Cost: 16) (DMG: 40-100)");
	}
		
	public canUse(player: Player): boolean {
		if (Game.inCombat) return true;
		MainScreen.text("There's no one to throw it at!");
		return false;
	}
		
	public use(player: Player) {
		MainScreen.clearText();
		MainScreen.text("You toss a wingstick at your foe!  It flies straight and true, almost as if it has a mind of its own as it arcs towards " + Game.monster.a + Game.monster.short + "!\n");
		if (Game.monster.stats.spe - 80 > Utils.rand(100) + 1) { //1% dodge for each point of speed over 80
			MainScreen.text("Somehow " + Game.monster.a + Game.monster.short + "'");
			if (!Game.monster.plural) MainScreen.text("s");
			MainScreen.text(" incredible speed allows " + Game.monster.pronoun2 + " to avoid the spinning blades!  The deadly device shatters when it impacts something in the distance.");
		}
		else { //Not dodged
			let damage:number = 40 + Utils.rand(61);
			MainScreen.text(Game.monster.capitalA + Game.monster.short + " is hit with the wingstick!  It breaks apart as it lacerates " + Game.monster.pronoun2 + ". (" + damage + ")");
			Game.monster.stats.HP -= damage;
            if (Game.monster.stats.HP < 0) Game.monster.stats.HP = 0;
		}
		return(false);
	}
}
