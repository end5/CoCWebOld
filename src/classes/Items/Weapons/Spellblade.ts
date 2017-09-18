import Weapon from "./Weapon";
import Player from "../../Player";
import Perk from "../../Effects/Perk";

export default class Spellblade extends Weapon {

    public constructor() {
        super("S.Blade", "S.Blade", "inscribed spellblade", "a spellblade", "slash", 8, 500, "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle.", "Wizard's Focus");
    }

    public equip(player: Player): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        player.perks.add(new Perk("WizardsFocus", 0.5, 0, 0, 0));
        return this;
    }

    public unequip(player: Player): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        return this;
    }

}
