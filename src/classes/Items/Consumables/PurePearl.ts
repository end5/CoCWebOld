import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class PurePearl extends Consumable {
    public constructor() {
        super(ConsumableName.PurePearl, new ItemDesc("P.Pearl", "a pure pearl"), 1000);
    }

    public use(player: Player) {
        DisplayText().clear();
        DisplayText("You cram the pearl in your mouth and swallow it like a giant pill with some difficulty.  Surprisingly there is no discomfort, only a cool calming sensation that springs up from your core.");
        player.stats.lib += -5;
        player.stats.lust += -25;
        player.stats.cor += -10;
        if (!player.perks.has(PerkType.PurityBlessing))
            player.perks.add(PerkType.PurityBlessing, 0, 0, 0, 0);
    }
}
