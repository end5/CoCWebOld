import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class PrincessPucker extends Consumable {
    public constructor() {
        super(ConsumableName.PrincessPucker, new ItemDesc("PrnsPkr", "a vial of pinkish fluid", "A vial filled with a viscous pink liquid."));
    }

    public use(character: Character) {
        DisplayText().clear();

        DisplayText("You uncork the bottle, and sniff it experimentally.  The fluid is slightly pink, full of flecks of gold, and smelling vaguely of raspberries.  Princess Gwynn said it was drinkable.\n\n");

        DisplayText("You down the bottle, hiccuping a bit at the syrupy-sweet raspberry flavor.  Immediately following the sweet is a bite of sour, like sharp lime.  You pucker your lips, and feel your head clear a bit from the intensity of flavor.  You wonder what Gwynn makes this out of.\n\n");

        DisplayText("Echoing the sensation in your head is an answering tingle in your body.  The sudden shock of citrusy sour has left you slightly less inclined to fuck, a little more focused on your priorities.\n\n");

        if (Utils.rand(2) === 0) {
            character.stats.lust -= 20;
            character.stats.lib -= 2;
            // dynStats("lus-", 20, "lib-", 2);
        }
        else {
            character.stats.lust -= 20;
            character.stats.sens -= 2;
            // dynStats("lus-", 20, "sen-", 2);
        }

        if (character.torso.neck.head.hair.color !== "pink") {
            if (Utils.rand(5) === 0) {
                DisplayText("A slight tingle across your scalp draws your attention to your hair.  It seems your " + character.torso.neck.head.hair.color + " is rapidly gaining a distinctly pink hue, growing in from the roots!\n\n");
                character.torso.neck.head.hair.color = "pink";
            }
        }
    }
}
