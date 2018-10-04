import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { CView } from '../../../Engine/Display/ContentView';

export class QueenBind extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            if (PlayerFlags.FETISH >= 2)
                enemy.stats.lust += 3;
            CView.text("You're utterly restrained by the Harpy Queen's magical ropes!");
            CView.text("\n\n");
        }
    }
}
