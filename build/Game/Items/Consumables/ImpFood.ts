import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { SkinType } from '../../Body/Skin';
import Character from '../../Character/Character';
import * as CockModifier from '../../Modifiers/CockModifier';
import * as StatModifier from '../../Modifiers/StatModifier';
import ItemDesc from '../ItemDesc';

export default class ImpFood extends Consumable {
    public constructor() {
        super(ConsumableName.ImpFood, new ItemDesc("ImpFood", "a parcel of imp food", "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious."));
    }

    public use(character: Character) {
        DisplayText().clear();
        if (character.torso.cocks.count > 0) {
            DisplayText("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.");
            if (character.torso.cocks.get(0).length < 12) {
                const growthAmount = CockModifier.growCock(character, character.torso.cocks.get(0), randInt(2) + 2);
                DisplayText("\n\n");
                CockModifier.displayLengthChange(character, growthAmount, 1);
            }
            DisplayText("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayCharacterHPChange(character, 30 + character.stats.tou / 3);
            character.stats.lust += 3;
            character.stats.cor += 1;
            // Shrinkage!
            if (randInt(2) === 0 && character.tallness > 42) {
                DisplayText("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!\n");
                character.tallness -= 1 + randInt(3);
            }
            // Red skin!
            if (randInt(30) === 0 && character.skin.tone !== "red") {
                if (character.skin.type === SkinType.FUR) DisplayText("\n\nUnderneath your fur, your skin ");
                else DisplayText("\n\nYour " + character.skin.desc + " ");
                if (randInt(2) === 0) character.skin.tone = "red";
                else character.skin.tone = "orange";
                DisplayText("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + character.skin.tone + ".");
            }
            return;
        }
        else {
            DisplayText("The food tastes... corrupt, for lack of a better word.\n");
            StatModifier.displayCharacterHPChange(character, 20 + character.stats.tou / 3);
            character.stats.lust += 3;
            character.stats.cor += 1;
        }
        // Red skin!
        if (randInt(30) === 0 && character.skin.tone !== "red") {
            if (character.skin.type === SkinType.FUR) DisplayText("\n\nUnderneath your fur, your skin ");
            else DisplayText("\n\nYour " + character.skin.desc + " ");
            if (randInt(2) === 0) character.skin.tone = "red";
            else character.skin.tone = "orange";
            DisplayText("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + character.skin.tone + ".");
        }

        // Shrinkage!
        if (randInt(2) === 0 && character.tallness > 42) {
            DisplayText("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!");
            character.tallness -= 1 + randInt(3);
        }
    }
}
