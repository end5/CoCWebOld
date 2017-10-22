import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class SheepMilk extends Consumable {
    public constructor() {
        super("SheepMk", "SheepMk", "a bottle of sheep milk", SheepMilk.DefaultValue, "This bottle of sheep milk is said to have corruption-fighting properties.  It may be useful.");
    }

    public use(player: Player) {
        MainScreen.text("You gulp the bottle's contents, and its sweet taste immediately invigorates you, making you feel calm and concentrated", true);
        //-30 fatigue, -2 libido, -10 lust]
        player.stats.fatigue -= 30;
        player.stats.lib += -.25;
        player.stats.lust += -10;
        player.stats.cor += -0.5;
    }
}