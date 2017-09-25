import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class GodsMead extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        MainScreen.text("You take a hearty swig of mead, savoring the honeyed taste on your tongue.  Emboldened by the first drink, you chug the remainder of the horn's contents in no time flat.  You wipe your lips, satisfied, and let off a small belch as you toss the empty horn aside.");

        //Libido: No desc., always increases.
        //Corruption: No desc., always decreases.
        dynStats("lib", 1, "cor", -1);
        //Health/HP(Large increase; always occurs):
        MainScreen.text("\n\nYou feel suddenly invigorated by the potent beverage, like you could take on a whole horde of barbarians or giants and come out victorious!");
        HPChange(Math.round(player.maxHP() * .33), false);
        if (Utils.rand(3) == 0) {
            MainScreen.text("\n\nThe alcohol fills your limbs with vigor, making you feel like you could take on the world with just your fists!");
            if (silly()) MainScreen.text("  Maybe you should run around shirtless, drink, and fight!  Saxton Hale would be proud.");
            dynStats("str", 1);
        }
        //Tough:
        else {
            MainScreen.text("\n\nYou thump your chest and grin - your foes will have a harder time taking you down while you're fortified by liquid courage.");
            dynStats("tou", 1);
        }
        //Grow Beard [ONLY if PC has a masculine face & a dick.)( -- Why? Bearded ladies are also a fetish [That's just nasty.] (I want a lady beard)): A sudden tingling runs along your chin. You rub it with your hand, and find a thin layer of bristles covering your lower face. You now sport a fine [player.HairColor] beard!
        //[If player already has beard] A sudden tingling runs along your chin. You stroke your beard proudly as it slowly grows in length and lustre.
        //Grow hair: Your scalp is beset by pins and needles as your hair grows out, stopping after it reaches [medium/long] length.}
    }
}