import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import ItemDesc from '../ItemDesc';

export default class HerbalContraceptive extends Consumable {
    public constructor() {
        super(ConsumableName.HerbalContraceptive, new ItemDesc("HrblCnt", "a bundle of verdant green leaves", "A small bundle of verdant green leaves."));
    }

    public use(character: Character) {
        DisplayText().clear();

        // Placeholder, sue me
        DisplayText("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        character.statusAffects.add(StatusAffectType.Contraceptives, 1, 48, 0, 0);
    }
}
