import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import CombatEffect from '../CombatEffect';

export class QueenBind extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            if (Flags.list[FlagEnum.PC_FETISH] >= 2)
                enemy.stats.lust += 3;
            DisplayText("You're utterly restrained by the Harpy Queen's magical ropes!");
            DisplayText("\n\n");
        }
    }
}
