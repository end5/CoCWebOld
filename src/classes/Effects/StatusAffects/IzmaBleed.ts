import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class IzmaBleed extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
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
        else {
            //Countdown to heal
            character.statusAffects.get("IzmaBleed").value1 -= 1;
            //Heal wounds
            if (character.statusAffects.get("IzmaBleed").value1 <= 0) {
                character.statusAffects.remove("IzmaBleed");
                return "The wounds you left on " + character.desc.a + character.desc.short + " stop bleeding so profusely.\n\n";
            }
            //Deal damage if still wounded.
            else {
                let hpLoss: number = enemy.combat.loseHP(character.stats.maxHP() * (3 + Utils.rand(4)) / 100, null);
                if (character.desc.plural) return character.desc.capitalA + character.desc.short + " bleed profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")\n\n";
                else return character.desc.capitalA + character.desc.short + " bleeds profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")\n\n";
            }
        }
    }
}
