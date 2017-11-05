import Weapon from './Weapon';
import Character from '../../Character/Character';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class Spellblade extends Weapon {
    public constructor() {
        super("S.Blade", new ItemDesc("S.Blade", "a spellblade", "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle."), "inscribed spellblade", "slash", 8, 500, "Wizard's Focus");
    }

    public equip(character: Character): void {
        while (character.perks.has("WizardsFocus"))
            character.perks.remove("WizardsFocus");
        character.perks.add(new Perk("WizardsFocus", 0.5, 0, 0, 0));
    }

    public unequip(character: Character): void {
        while (character.perks.has("WizardsFocus"))
            character.perks.remove("WizardsFocus");
    }

    equipText(): void { }
    unequipText(): void { }
    use(player: Player) { }
}
