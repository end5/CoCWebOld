import Consumable from './Consumable';
import { SkinType } from '../../Body/Creature';
import DisplayText from '../../display/DisplayText';
import CockModifier from '../../Modifiers/CockModifier';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class ImpFood extends Consumable {
    public constructor() {
        super("ImpFood", new ItemDesc("ImpFood", "a parcel of imp food", "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious."));
    }

    public use(player: Player) {
        DisplayText.clear();
        if (player.lowerBody.cockSpot.count() > 0) {
            DisplayText.text("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.");
            if (player.lowerBody.cockSpot.get(0).cockLength < 12) {
                let growthAmount = CockModifier.growCock(player, player.lowerBody.cockSpot.get(0), Utils.rand(2) + 2);
                DisplayText.text("\n\n");
                CockModifier.displayLengthChange(player, growthAmount, 1);
            }
            DisplayText.text("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayPlayerHPChange(player, 30 + player.stats.tou / 3);
            player.stats.lust += 3;
            player.stats.cor += 1;
            //Shrinkage!
            if (Utils.rand(2) == 0 && player.tallness > 42) {
                DisplayText.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!\n");
                player.tallness -= 1 + Utils.rand(3);
            }
            //Red skin!
            if (Utils.rand(30) == 0 && player.skinTone != "red") {
                if (player.skinType == SkinType.FUR) DisplayText.text("\n\nUnderneath your fur, your skin ");
                else DisplayText.text("\n\nYour " + player.skinDesc + " ");
                if (Utils.rand(2) == 0) player.skinTone = "red";
                else player.skinTone = "orange";
                DisplayText.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".");
            }
            return;
        }
        else {
            DisplayText.text("The food tastes... corrupt, for lack of a better word.\n");
            StatModifier.displayPlayerHPChange(player, 20 + player.stats.tou / 3);
            player.stats.lust += 3;
            player.stats.cor += 1;
        }
        //Red skin!
        if (Utils.rand(30) == 0 && player.skinTone != "red") {
            if (player.skinType == SkinType.FUR) DisplayText.text("\n\nUnderneath your fur, your skin ");
            else DisplayText.text("\n\nYour " + player.skinDesc + " ");
            if (Utils.rand(2) == 0) player.skinTone = "red";
            else player.skinTone = "orange";
            DisplayText.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".");
        }

        //Shrinkage!
        if (Utils.rand(2) == 0 && player.tallness > 42) {
            DisplayText.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!");
            player.tallness -= 1 + Utils.rand(3);
        }
    }
}