import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Character } from '../../Character/Character';
import { Mod } from '../../Modifiers/Modifiers';
import { ItemDesc } from '../ItemDesc';
import { describeNipple } from '../../Descriptors/BreastDescriptor';

export class Lactaid extends Consumable {
    public constructor() {
        super(ConsumableName.Lactaid, new ItemDesc("Lactaid", "a pink bottle labelled \"Lactaid\"", "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction."));
    }

    public use(character: Character) {
        character.slimeFeed();
        DisplayText().clear();
        DisplayText("You gulp down the bottle of lactaid, easily swallowing the creamy liquid.");
        // Bump up size!
        if (character.body.chest.reduce(BreastRow.AverageSize, 0) < 8) {
            DisplayText("\n\n");
            if (character.body.chest.length === 1)
                Mod.Breast.growSmallestBreastRow(character, (1 + randInt(5)), 1, true);
            else Mod.Breast.growSmallestBreastRow(character, 1 + randInt(2), character.body.chest.length, true);
        }
        // Character doesn't lactate
        if (character.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 1) {
            DisplayText("\n\n");
            DisplayText("You feel your " + describeNipple(character, character.body.chest.get(0)) + "s become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>");
            for (let index = 0; index < character.body.chest.length; index++) {
                character.body.chest.get(index).lactationMultiplier += 2;
            }
        }
        // Boost lactation
        else {
            DisplayText("\n\n");
            DisplayText("Milk leaks from your " + describeNipple(character, character.body.chest.get(0)) + "s in thick streams.  You're lactating even more!");
            for (let index = 0; index < character.body.chest.length; index++) {
                character.body.chest.get(index).lactationMultiplier += 1 + randInt(10) / 10;
            }
        }
        character.stats.lust += 10;
        if (randInt(3) === 0) {
            DisplayText(Mod.Body.displayModFem(character, 95, 1));
        }
    }
}
