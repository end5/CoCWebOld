import { ArmorName } from './ArmorName';
import { ArmorWithPerk } from './ArmorWithPerk';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { BreastRow } from '../../Body/BreastRow';
import { Cock } from '../../Body/Cock';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkFactory } from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import { ItemDesc } from '../ItemDesc';

export class SluttySwimwear extends ArmorWithPerk {
    public constructor() {
        super(ArmorName.SluttySwimwear, new ItemDesc("S.Swmwr", "a skimpy black bikini", "An impossibly skimpy black bikini. You feel dirty just looking at it... and a little aroused, actually."), "slutty swimwear", 0, 6, "Light", PerkFactory.create(PerkType.SluttySeduction, 6, 0, 0, 0), "", true);
    }

    public useText(character: Character): void {
        character.stats.lust += 5;
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1)
            DisplayText("You feel rather stupid putting the top part on like this, but you're willing to bear with it. It could certainly be good for distracting.  ");
        else {
            DisplayText("The bikini top clings tightly to your bustline, sending a shiver of pleasure through your body. It serves to turn you on quite nicely.  ");
            character.stats.lust += 5;
        }
        if (character.torso.cocks.count <= 0) {
            DisplayText("The thong moves over your smooth groin, clinging onto your buttocks nicely.  ");
            if (character.torso.balls.quantity > 0) {
                if (character.torso.balls.size > 5)
                    DisplayText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + Desc.Balls.describeBalls(true, true, character) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
                else
                    DisplayText("However, your testicles do serve as an area of discomfort, stretching the material and bulging out the sides slightly.  ");
            }
        }
        else {
            if (character.torso.cocks.count === 1) {
                DisplayText("You grunt in discomfort, your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " flopping free from the thong's confines. The tight material rubbing against your dick does manage to turn you on slightly.  ");
            }
            else {
                DisplayText("You grunt in discomfort, your " + Desc.Cock.describeMultiCockShort(character) + " flopping free from the thong's confines. The tight material rubbing against your dicks does manage to turn you on slightly.  ");
            }
            character.stats.lust += 5;
            if (character.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 20)
                DisplayText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " has popped out of the top, completely exposed.  Maybe if you shrunk your male parts down a little...");
            // If dick is 7+ inches OR balls are apple-sized]
            else if (character.torso.balls.size > 5)
                DisplayText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + Desc.Balls.describeBalls(true, true, character) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
        }
        DisplayText("\n\n");
    }
}
