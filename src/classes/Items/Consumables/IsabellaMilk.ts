import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class IsabellaMilk extends Consumable {
    public constructor() {
        super(ConsumableName.IsabellaMilk, new ItemDesc("IzyMilk", "a bottle of Isabella's milk", "This is a bottle of Isabella's milk.  Isabella seems fairly certain it will invigorate you."));
    }

    public use(player: Player) {
        DisplayText().clear();
        DisplayText("You swallow down the bottle of Isabella's milk.");
        if (player.stats.fatigue > 0) DisplayText("  You feel much less tired! (-33 fatigue)");
        player.stats.fatigue -= 33;
    }
}
