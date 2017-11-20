import Weapon from './Weapon';
import Character from '../../Character/Character';
import Perk from '../../Effects/Perk';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class Spellblade extends Weapon {
    public constructor() {
        super("S.Blade", new ItemDesc("S.Blade", "a spellblade", "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle."), "inscribed spellblade", "slash", 8, 500, "Wizard's Focus");
    }

    public equip(character: Character): void {
        while (character.perks.has(PerkType.WizardsFocus))
            character.perks.remove(PerkType.WizardsFocus);
        character.perks.add(PerkFactory.create(PerkType.WizardsFocus, 0.5, 0, 0, 0));
    }

    public unequip(character: Character): void {
        while (character.perks.has(PerkType.WizardsFocus))
            character.perks.remove(PerkType.WizardsFocus);
    }

    equipText(): void { }
    unequipText(): void { }
    use(player: Player) { }
}
