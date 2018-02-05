import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class HerbalContraceptive extends Consumable {
    public constructor() {
        super(ConsumableName.HerbalContraceptive, new ItemDesc("HrblCnt", "a bundle of verdant green leaves", "A small bundle of verdant green leaves."));
    }

    public use(player: Player) {
        DisplayText().clear();

        // Placeholder, sue me
        DisplayText("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        player.statusAffects.add(StatusAffectType.Contraceptives, 1, 48, 0, 0);
    }
}
