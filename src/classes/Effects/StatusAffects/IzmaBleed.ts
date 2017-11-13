import Character from '../../Character/Character';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class IzmaBleed extends StatusAffect {
    public update(character: Character): string {
        if (character.statusAffects.get("IzmaBleed").value1 <= 0) {
            character.statusAffects.remove("IzmaBleed");
            return "<b>You sigh with relief; your bleeding has slowed considerably.</b>\n\n";
        }
        //Bleed effect:
        else {
            let bleed: number = (2 + Utils.rand(4)) / 100;
            bleed *= character.combat.HP;
            bleed = character.combat.loseHP(bleed, null);
            return "<b>You gasp and wince in pain, feeling fresh blood pump from your wounds. (" + bleed + ")</b>\n\n";
        }
    }
}
