import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class PurePearl extends Consumable {
    public constructor() {
        super("P.Pearl", new ItemDesc("P.Pearl", "a pure pearl"), 1000);
    }

    public use(player: Player) {
        MainScreen.text("You cram the pearl in your mouth and swallow it like a giant pill with some difficulty.  Surprisingly there is no discomfort, only a cool calming sensation that springs up from your core.", true);
        player.stats.lib += -5;
        player.stats.lust += -25;
        player.stats.cor += -10;
        if (!player.perks.has("PurityBlessing"))
            player.perks.add(new Perk("PurityBlessing", 0, 0, 0, 0));
    }
}