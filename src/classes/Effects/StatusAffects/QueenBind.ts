import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import Flags, { FlagEnum } from '../../Game/Flags';
import StatusAffect from '../StatusAffect';

export class QueenBind extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            if (Flags.list[FlagEnum.PC_FETISH] >= 2)
                enemy.stats.lust += 3;
            return "You're utterly restrained by the Harpy Queen's magical ropes!\n\n";
        }
    }
}
