import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';

export class HerbalContraceptive extends Consumable {
    public constructor() {
        super(ConsumableName.HerbalContraceptive, new ItemDesc("HrblCnt", "a bundle of verdant green leaves", "A small bundle of verdant green leaves."));
    }

    public use(character: Character) {
        DisplayText().clear();

        // Placeholder, sue me
        DisplayText("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        character.effects.add(StatusEffectType.Contraceptives, 1, 48, 0, 0);
    }
}
