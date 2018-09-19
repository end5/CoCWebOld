import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { HairType } from '../../Body/Hair';
import { Character } from '../../Character/Character';
import { User } from '../../User';
import { ItemDesc } from '../ItemDesc';
import { describeHair } from '../../Descriptors/HairDescriptor';
import { ReptilumFlags } from './Reptilum';

export const HairExtensionSerumFlags = {
    INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED: 0,
    INCREASED_HAIR_GROWTH_TIME_REMAINING: 0,
};

User.flags.set('HairExtensionSerum', HairExtensionSerumFlags);

export class HairExtensionSerum extends Consumable {
    public constructor() {
        super(ConsumableName.HairExtensionSerum, new ItemDesc("ExtSerm", "a bottle of hair extension serum", "This is a bottle of foamy pink liquid, purported by the label to increase the speed at which the user's hair grows."));
    }

    public canUse(character: Character): boolean {
        if (HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED <= 2) return true;
        DisplayText("<b>No way!</b>  Your head itches like mad from using the rest of these, and you will NOT use another.\n");
        return false;
    }

    public use(character: Character) {
        DisplayText("You open the bottle of hair extension serum and follow the directions carefully, massaging it into your scalp and being careful to keep it from getting on any other skin.  You wash off your hands with lakewater just to be sure.");
        if (HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING <= 0) {
            DisplayText("\n\nThe tingling on your head lets you know that it's working!");
            HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING = 7;
            HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED = 1;
        }
        else if (HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED === 1) {
            DisplayText("\n\nThe tingling intensifies, nearly making you feel like tiny invisible faeries are massaging your scalp.");
            HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED++;
        }
        else if (HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED === 2) {
            DisplayText("\n\nThe tingling on your scalp is intolerable!  It's like your head is a swarm of angry ants, though you could swear your hair is growing so fast that you can feel it weighing you down more and more!");
            HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED++;
        }
        if (ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD > 0 && character.body.hair.type !== HairType.ANEMONE) {
            ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = 0;
            DisplayText("\n\n<b>Somehow you know that your " + describeHair(character) + " is growing again.</b>");
        }
        if (HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING < 7)
            HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING = 7;
    }
}
