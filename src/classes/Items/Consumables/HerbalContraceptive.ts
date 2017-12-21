import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import StatusAffect from '../../Effects/StatusAffect';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class HerbalContraceptive extends Consumable {
    public constructor() {
        super(ConsumableName.HerbalContraceptive, new ItemDesc("HrblCnt", "a bundle of verdant green leaves", "A small bundle of verdant green leaves."));
    }

    public use(player: Player) {
        DisplayText.clear();
        
        // Placeholder, sue me
        DisplayText.text("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Contraceptives, 1, 48, 0, 0));
    }
}