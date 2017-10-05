import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import { Gender } from "../../Body/Body";
import Flags, { FlagEnum } from "../../Game/Flags";
import StatusAffect from "../../Effects/StatusAffect";

export default class CeruleanPotion extends Consumable {
    public constructor() {
        super("Cerul P", "Cerulean P.", "a cerulean-tinted potion", CeruleanPotion.DefaultValue, "This is a mysterious bottle filled with a sky-blue liquid that sloshes gently inside.  Supposedly it will make you irresistible, though to what or who you cannot say.");
    }

    public use(player: Player) {
        player.slimeFeed();
        //Repeat genderless encounters
        if (player.gender == Gender.NONE && Flags.list[FlagEnum.CERULEAN_POTION_NEUTER_ATTEMPTED] > 0) {
            MainScreen.text("You take another sip of the Cerulean Potion.  You find it soothing and become very excited about the possibility of another visit from the succubus.", true);
        }
        else if (player.gender == Gender.HERM && Flags.list[FlagEnum.CERULEAN_POTION_HERM_USED] > 0) {
            MainScreen.text("With anticipation, you chug down another bottle of the Cerulean Potion. A warm sensation radiates out from your stomach as you feel the potion course through your body.", true);
        }
        //All else
        else {
            MainScreen.text("The liquid tastes rather bland and goes down easily. ", true);
            //Special repeat texts
            if (player.statusAffects.has("RepeatSuccubi"))
                MainScreen.text("You look forwards to tonight's encounter.", false);
            //First timer huh?
            else MainScreen.text("You do not notice any real effects.  Did the merchant con you?", false);
        }
        if (player.statusAffects.has("SuccubiNight"))
            if (player.statusAffects.get("SuccubiNight").value1 < 3)
                player.statusAffects.get("SuccubiNight").value1 = 1;
            else
                player.statusAffects.add(new StatusAffect("SuccubiNight", 1, 0, 0, 0));
    }
}
