import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { SkinType } from '../../Body/Skin';
import DisplayText from '../../display/DisplayText';
import CockModifier from '../../Modifiers/CockModifier';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class ImpFood extends Consumable {
    public constructor() {
        super(ConsumableName.ImpFood, new ItemDesc("ImpFood", "a parcel of imp food", "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious."));
    }

    public use(player: Player) {
        DisplayText().clear();
        if (player.torso.cocks.count > 0) {
            DisplayText("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.");
            if (player.torso.cocks.get(0).length < 12) {
                const growthAmount = CockModifier.growCock(player, player.torso.cocks.get(0), Utils.rand(2) + 2);
                DisplayText("\n\n");
                CockModifier.displayLengthChange(player, growthAmount, 1);
            }
            DisplayText("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayCharacterHPChange(player, 30 + player.stats.tou / 3);
            player.stats.lust += 3;
            player.stats.cor += 1;
            // Shrinkage!
            if (Utils.rand(2) === 0 && player.tallness > 42) {
                DisplayText("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!\n");
                player.tallness -= 1 + Utils.rand(3);
            }
            // Red skin!
            if (Utils.rand(30) === 0 && player.skin.tone !== "red") {
                if (player.skin.type === SkinType.FUR) DisplayText("\n\nUnderneath your fur, your skin ");
                else DisplayText("\n\nYour " + player.skin.desc + " ");
                if (Utils.rand(2) === 0) player.skin.tone = "red";
                else player.skin.tone = "orange";
                DisplayText("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skin.tone + ".");
            }
            return;
        }
        else {
            DisplayText("The food tastes... corrupt, for lack of a better word.\n");
            StatModifier.displayCharacterHPChange(player, 20 + player.stats.tou / 3);
            player.stats.lust += 3;
            player.stats.cor += 1;
        }
        // Red skin!
        if (Utils.rand(30) === 0 && player.skin.tone !== "red") {
            if (player.skin.type === SkinType.FUR) DisplayText("\n\nUnderneath your fur, your skin ");
            else DisplayText("\n\nYour " + player.skin.desc + " ");
            if (Utils.rand(2) === 0) player.skin.tone = "red";
            else player.skin.tone = "orange";
            DisplayText("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skin.tone + ".");
        }

        // Shrinkage!
        if (Utils.rand(2) === 0 && player.tallness > 42) {
            DisplayText("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!");
            player.tallness -= 1 + Utils.rand(3);
        }
    }
}
