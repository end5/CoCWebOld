import Consumable from "./Consumable";
import Player from "../../Player";
import Flags, { FlagEnum } from "../../Game/Flags";
import { HairType } from "../../Modules/HeadModule";

export default class HairExtensionSerum extends Consumable {

    public constructor() {
        super("ExtSerm", "ExtSerm", "a bottle of hair extension serum", 6, "This is a bottle of foamy pink liquid, purported by the label to increase the speed at which the user's hair grows.");
    }

    public canUse(player: Player): boolean {
        if (Flags.get(FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED) <= 2) return true;
        Render.text("<b>No way!</b>  Your head itches like mad from using the rest of these, and you will NOT use another.\n");
        return false;
    }

    public use(player: Player) {
        Render.text("You open the bottle of hair extension serum and follow the directions carefully, massaging it into your scalp and being careful to keep it from getting on any other skin.  You wash off your hands with lakewater just to be sure.");
        if (Flags.get(FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING) <= 0) {
            Render.text("\n\nThe tingling on your head lets you know that it's working!");
            Flags.set(FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING, 7);
            Flags.set(FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED, 1);
        }
        else if (Flags.get(FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED) == 1) {
            Render.text("\n\nThe tingling intensifies, nearly making you feel like tiny invisible faeries are massaging your scalp.");
            Flags.increase(FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED);
        }
        else if (Flags.get(FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED) == 2) {
            Render.text("\n\nThe tingling on your scalp is intolerable!  It's like your head is a swarm of angry ants, though you could swear your hair is growing so fast that you can feel it weighing you down more and more!");
            Flags.increase(FlagEnum.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED);
        }
        if (Flags.get(FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD) > 0 && player.upperBody.head.hairType != HairType.ANEMONE) {
            Flags.set(FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD, 0);
            Render.text("\n\n<b>Somehow you know that your " + player.hairDescript() + " is growing again.</b>");
        }
        if (Flags.get(FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING) < 7) Flags.set(FlagEnum.INCREASED_HAIR_GROWTH_TIME_REMAINING, 7);
        return (false);
    }
}

