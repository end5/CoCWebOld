import Weapon from './Weapon';
import Character from '../../Character/Character';
import Perk from '../../Effects/Perk';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class WizardsStaff extends Weapon {
    public constructor() {
        super("W.Staff", new ItemDesc("W. Staff", "a wizard's staff", "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use. (ATK: 3)"), "wizard's staff", "smack", 3, 350, "Wizard's Focus");
    }

    public equip(character: Character): void {
        while (character.perks.has(PerkType.WizardsFocus))
            character.perks.remove(PerkType.WizardsFocus);
        character.perks.add(PerkFactory.create(PerkType.WizardsFocus, 0.4, 0, 0, 0));
    }

    public unequip(character: Character): void {
        while (character.perks.has(PerkType.WizardsFocus))
            character.perks.remove(PerkType.WizardsFocus);
    }

    equipText(): void { }
    unequipText(): void { }
    use(player: Player) { }
}
