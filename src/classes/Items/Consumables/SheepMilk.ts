import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class SheepMilk extends Consumable {
    public constructor() {
        super(ConsumableName.SheepMilk, new ItemDesc("SheepMk", "a bottle of sheep milk", "This bottle of sheep milk is said to have corruption-fighting properties.  It may be useful."));
    }

    public use(player: Player) {
        DisplayText().clear();
        DisplayText("You gulp the bottle's contents, and its sweet taste immediately invigorates you, making you feel calm and concentrated");
        // -30 fatigue, -2 libido, -10 lust]
        player.stats.fatigue -= 30;
        player.stats.lib += -.25;
        player.stats.lust += -10;
        player.stats.cor += -0.5;
    }
}
