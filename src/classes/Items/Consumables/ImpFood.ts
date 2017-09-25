import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class ImpFood extends Consumable {
    public constructor() {
        super("ImpFood", "ImpFood", "a parcel of imp food", 0, "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        if (player.lowerBody.cockSpot.count() > 0) {
            MainScreen.text("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.", false);
            if (player.lowerBody.cockSpot.list[0].cockLength < 12) {
                temp = player.increaseCock(0, Utils.rand(2) + 2);
                MainScreen.text("\n\n", false);
                player.lengthChange(temp, 1);
            }
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(30 + player.tou / 3, true);
            dynStats("lus", 3, "cor", 1);
            //Shrinkage!
            if (Utils.rand(2) == 0 && player.tallness > 42) {
                MainScreen.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!\n", false);
                player.tallness -= 1 + Utils.rand(3);
            }
            //Red skin!
            if (Utils.rand(30) == 0 && player.skinTone != "red") {
                if (player.skinType == SKIN.FUR) MainScreen.text("\n\nUnderneath your fur, your skin ", false);
                else MainScreen.text("\n\nYour " + player.skinDesc + " ", false);
                if (Utils.rand(2) == 0) player.skinTone = "red";
                else player.skinTone = "orange";
                MainScreen.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".", false);
            }
            return;
        }
        else {
            MainScreen.text("The food tastes... corrupt, for lack of a better word.\n", false);
            HPChange(20 + player.tou / 3, true);
            dynStats("lus", 3, "cor", 1);
        }
        //Red skin!
        if (Utils.rand(30) == 0 && player.skinTone != "red") {
            if (player.skinType == SKIN.FUR) MainScreen.text("\n\nUnderneath your fur, your skin ", false);
            else MainScreen.text("\n\nYour " + player.skinDesc + " ", false);
            if (Utils.rand(2) == 0) player.skinTone = "red";
            else player.skinTone = "orange";
            MainScreen.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".", false);
        }

        //Shrinkage!
        if (Utils.rand(2) == 0 && player.tallness > 42) {
            MainScreen.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!", false);
            player.tallness -= 1 + Utils.rand(3);
        }
    }
}