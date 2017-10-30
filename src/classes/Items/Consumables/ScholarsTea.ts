import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import BodyModifier from '../../Modifiers/BodyModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class ScholarsTea extends Consumable {
    public constructor() {
        super("Smart T", new ItemDesc("Scholars T.", "a cup of scholar's tea", "This powerful brew supposedly has mind-strengthening effects."), 0);
    }

    public use(player: Player) {
        player.slimeFeed();
        MainScreen.text("Following the merchant's instructions, you steep and drink the tea. Its sharp taste fires up your palate and in moments, you find yourself more alert and insightful. As your mind wanders, a creative, if somewhat sordid, story comes to mind. It is a shame that you do not have writing implements as you feel you could make a coin or two off what you have conceived. The strange seller was not lying about the power of the tea.", true);
        if (Utils.rand(3) == 0)
            MainScreen.text(BodyModifier.displayModTone(player, 15, 1), false);
        player.stats.int = 2.5 + Utils.rand(5);
    }
}