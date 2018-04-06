import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import PlayerFlags from '../../Character/Player/PlayerFlags';
import User from '../../User';
import CombatEffect from '../CombatEffect';

export class QueenBind extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            if ((User.flags.get("Player") as PlayerFlags).FETISH >= 2)
                enemy.stats.lust += 3;
            DisplayText("You're utterly restrained by the Harpy Queen's magical ropes!");
            DisplayText("\n\n");
        }
    }
}
