import Consumable from './Consumable';
import { HairType } from '../../Body/Head';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class HairExtensionSerum extends Consumable {

    public constructor() {
        super("ExtSerm", new ItemDesc("ExtSerm", "a bottle of hair extension serum", "This is a bottle of foamy pink liquid, purported by the label to increase the speed at which the user's hair grows."));
    }

    public canUse(player: Player): boolean {
        if (Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] <= 2) return true;
        MainScreen.text("<b>No way!</b>  Your head itches like mad from using the rest of these, and you will NOT use another.\n");
        return false;
    }

    public use(player: Player) {
        MainScreen.text("You open the bottle of hair extension serum and follow the directions carefully, massaging it into your scalp and being careful to keep it from getting on any other skin.  You wash off your hands with lakewater just to be sure.");
        if (Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING] <= 0) {
            MainScreen.text("\n\nThe tingling on your head lets you know that it's working!");
            Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING] = 7;
            Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] = 1;
        }
        else if (Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] == 1) {
            MainScreen.text("\n\nThe tingling intensifies, nearly making you feel like tiny invisible faeries are massaging your scalp.");
            Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED]++;
        }
        else if (Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] == 2) {
            MainScreen.text("\n\nThe tingling on your scalp is intolerable!  It's like your head is a swarm of angry ants, though you could swear your hair is growing so fast that you can feel it weighing you down more and more!");
            Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED]++;
        }
        if (Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] > 0 && player.upperBody.head.hairType != HairType.ANEMONE) {
            Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
            MainScreen.text("\n\n<b>Somehow you know that your " + HeadDescriptor.describeHair(player) + " is growing again.</b>");
        }
        if (Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING] < 7) Flags.list[FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING] = 7;
        return (false);
    }
}

