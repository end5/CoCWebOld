import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { HairType } from '../../Body/Hair';
import { Character } from '../../Character/Character';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { Desc } from '../../Descriptors/Descriptors';
import { User } from '../../User';
import { ItemDesc } from '../ItemDesc';

export class HairExtensionSerum extends Consumable {
    public constructor() {
        super(ConsumableName.HairExtensionSerum, new ItemDesc("ExtSerm", "a bottle of hair extension serum", "This is a bottle of foamy pink liquid, purported by the label to increase the speed at which the user's hair grows."));
    }

    public canUse(character: Character): boolean {
        if ((User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED <= 2) return true;
        DisplayText("<b>No way!</b>  Your head itches like mad from using the rest of these, and you will NOT use another.\n");
        return false;
    }

    public use(character: Character) {
        DisplayText("You open the bottle of hair extension serum and follow the directions carefully, massaging it into your scalp and being careful to keep it from getting on any other skin.  You wash off your hands with lakewater just to be sure.");
        if ((User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_TIME_REMAINING <= 0) {
            DisplayText("\n\nThe tingling on your head lets you know that it's working!");
            (User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_TIME_REMAINING = 7;
            (User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED = 1;
        }
        else if ((User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED === 1) {
            DisplayText("\n\nThe tingling intensifies, nearly making you feel like tiny invisible faeries are massaging your scalp.");
            (User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED++;
        }
        else if ((User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED === 2) {
            DisplayText("\n\nThe tingling on your scalp is intolerable!  It's like your head is a swarm of angry ants, though you could swear your hair is growing so fast that you can feel it weighing you down more and more!");
            (User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED++;
        }
        if ((User.flags.get("Player") as PlayerFlags).HAIR_GROWTH_STOPPED_BECAUSE_LIZARD > 0 && character.torso.neck.head.hair.type !== HairType.ANEMONE) {
            (User.flags.get("Player") as PlayerFlags).HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = 0;
            DisplayText("\n\n<b>Somehow you know that your " + Desc.Head.describeHair(character) + " is growing again.</b>");
        }
        if ((User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_TIME_REMAINING < 7)
            (User.flags.get("Player") as PlayerFlags).INCREASED_HAIR_GROWTH_TIME_REMAINING = 7;
    }
}
