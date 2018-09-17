import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { Mod } from '../../Modifiers/Modifiers';
import { Scenes } from '../../Scenes/Scenes';
import { ItemDesc } from '../ItemDesc';

export class MarbleMilk extends Consumable {
    public constructor() {
        super(ConsumableName.MarbleMilk, new ItemDesc("M. Milk", "a clear bottle of milk from Marble", "A clear bottle of milk from Marble's breasts. It smells delicious."));
    }

    public use(character: Character) {
        character.slimeFeed();
        // Bottle of Marble's milk - item
        // Description: "A clear bottle of milk from Marble's breasts. �It smells delicious.  "
        DisplayText().clear();
        // Text for when the character uses the bottle:
        // [before the character is addicted, Addiction < 30]
        if (character.statusAffects.get(StatusAffectType.Marble).value2 < 30 && character.statusAffects.get(StatusAffectType.MarblesMilk).value3 === 0) DisplayText("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n");
        // [before the character is addicted, Addiction < 50]
        else if (character.statusAffects.get(StatusAffectType.MarblesMilk).value3 <= 0) DisplayText("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n");
        else if (character.statusAffects.get(StatusAffectType.MarblesMilk).value3 > 0) {
            // [character is completely addicted]
            if (character.perks.has(PerkType.MarblesMilk)) DisplayText("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n");
            else {
                // [character is no longer addicted]
                if (character.perks.has(PerkType.MarbleResistant)) DisplayText("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n");
                // [character is addicted]
                else DisplayText("You gulp down the bottle's contents; you really needed that.\n\n");
            }
        }
        // Increases addiction by 5, up to a max of 50 before the character becomes addicted, no max after the character is addicted.
        // Scenes.marbleScene.marbleStatusChange(0, 5);
        // Does not apply the 'Marble's Milk' effect
        // Purge withdrawl
        if (character.statusAffects.has(StatusAffectType.MarbleWithdrawl)) {
            character.statusAffects.remove(StatusAffectType.MarbleWithdrawl);
            character.stats.tou += 5;
            character.stats.int += 5;
            DisplayText("You no longer feel the symptoms of withdrawal.\n\n");
        }
        // Heals the character 70-100 health
        Mod.Stat.displayCharacterHPChange(character, 70 + randInt(31));
        // Restores a portion of fatigue (once implemented)
        character.stats.fatigue -= 25;
        // If the character is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the character is under the effect of 'Marble's Milk'.
        if (character.statusAffects.has(StatusAffectType.BottledMilk)) {
            character.statusAffects.get(StatusAffectType.BottledMilk).value1 = (6 + randInt(6));
        }
        else character.statusAffects.add(StatusAffectType.BottledMilk, 12, 0, 0, 0);
    }
}
