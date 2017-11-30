import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import CombatEffect from '../CombatEffect';

export class Bound extends CombatEffect {
    public update(character: Character) {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2 && character.inventory.armorSlot.equipment.displayName == "barely-decent bondage straps") {
            character.stats.lust += 3;
            DisplayText.text("The feel of tight leather completely immobilizing you turns you on more and more.  Would it be so bad to just wait and let her play with you like this?");
            DisplayText.newParagraph();
        }
    }
}
