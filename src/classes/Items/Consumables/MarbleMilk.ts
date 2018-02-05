import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Game from '../../Game/Game';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class MarbleMilk extends Consumable {
    public constructor() {
        super(ConsumableName.MarbleMilk, new ItemDesc("M. Milk", "a clear bottle of milk from Marble", "A clear bottle of milk from Marble's breasts. It smells delicious."));
    }

    public use(player: Player) {
        player.slimeFeed();
        // Bottle of Marble's milk - item
        // Description: "A clear bottle of milk from Marble's breasts. �It smells delicious.  "
        DisplayText().clear();
        // Text for when the player uses the bottle:
        // [before the player is addicted, Addiction < 30]
        if (player.statusAffects.get(StatusAffectType.Marble).value2 < 30 && player.statusAffects.get(StatusAffectType.MarblesMilk).value3 === 0) DisplayText("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n");
        // [before the player is addicted, Addiction < 50]
        else if (player.statusAffects.get(StatusAffectType.MarblesMilk).value3 <= 0) DisplayText("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n");
        else if (player.statusAffects.get(StatusAffectType.MarblesMilk).value3 > 0) {
            // [player is completely addicted]
            if (player.perks.has(PerkType.MarblesMilk)) DisplayText("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n");
            else {
                // [player is no longer addicted]
                if (player.perks.has(PerkType.MarbleResistant)) DisplayText("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n");
                // [player is addicted]
                else DisplayText("You gulp down the bottle's contents; you really needed that.\n\n");
            }
        }
        // Increases addiction by 5, up to a max of 50 before the player becomes addicted, no max after the player is addicted.
        Game.sceneManager.marbleScene.marbleStatusChange(0, 5);
        // Does not apply the 'Marble's Milk' effect
        // Purge withdrawl
        if (player.statusAffects.has(StatusAffectType.MarbleWithdrawl)) {
            player.statusAffects.remove(StatusAffectType.MarbleWithdrawl);
            player.stats.tou += 5;
            player.stats.int += 5;
            DisplayText("You no longer feel the symptoms of withdrawal.\n\n");
        }
        // Heals the player 70-100 health
        StatModifier.displayCharacterHPChange(player, 70 + Utils.rand(31));
        // Restores a portion of fatigue (once implemented)
        player.stats.fatigue -= 25;
        // If the player is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the player is under the effect of 'Marble's Milk'.
        if (player.statusAffects.has(StatusAffectType.BottledMilk)) {
            player.statusAffects.get(StatusAffectType.BottledMilk).value1 = (6 + Utils.rand(6));
        }
        else player.statusAffects.add(StatusAffectType.BottledMilk, 12, 0, 0, 0);
    }
}
