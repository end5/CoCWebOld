import Consumable from './Consumable';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class PurityPeach extends Consumable {
    public constructor() {
        super("PurPeac", new ItemDesc("PurPeac", "a pure peach", "This is a peach from Minerva's spring, yellowy-orange with red stripes all over it."), 10);
    }

    public use(player: Player) {
        DisplayText.clear();
        DisplayText.text("You bite into the sweet, juicy peach, feeling a sensation of energy sweeping through your limbs and your mind.  You feel revitalized, refreshed, and somehow cleansed.");
        player.stats.fatigue -= 15;
        player.stats.HP += Math.round(player.stats.maxHP() * 0.25);
    }
}