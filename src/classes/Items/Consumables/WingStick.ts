import Consumable from "./Consumable";
import Player from "../../Player";

export default class WingStick extends Consumable {
		
	public constructor() {
		super("W.Stick", "Wingstick", "a wingstick", 16, "A tri-bladed throwing weapon.  Though good for only a single use, it's guaranteed to do high damage if it hits.  (Cost: 16) (DMG: 40-100)");
	}
		
	public canUse(player: Player): boolean {
		if (game.inCombat) return true;
		Render.text("There's no one to throw it at!");
		return false;
	}
		
	public use(player: Player) {
		clearOutput();
		Render.text("You toss a wingstick at your foe!  It flies straight and true, almost as if it has a mind of its own as it arcs towards " + game.monster.a + game.monster.short + "!\n");
		if (game.monster.spe - 80 > Utils.rand(100) + 1) { //1% dodge for each point of speed over 80
			Render.text("Somehow " + game.monster.a + game.monster.short + "'");
			if (!game.monster.plural) Render.text("s");
			Render.text(" incredible speed allows " + game.monster.pronoun2 + " to avoid the spinning blades!  The deadly device shatters when it impacts something in the distance.");
		}
		else { //Not dodged
			let damage:number = 40 + Utils.rand(61);
			Render.text(game.monster.capitalA + game.monster.short + " is hit with the wingstick!  It breaks apart as it lacerates " + game.monster.pronoun2 + ". (" + damage + ")");
			game.monster.HP -= damage;
			if (game.monster.HP < 0) game.monster.HP = 0;
		}
		return(false);
	}
}
