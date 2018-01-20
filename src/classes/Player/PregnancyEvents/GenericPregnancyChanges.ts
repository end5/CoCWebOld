import BreastRow from '../../Body/BreastRow';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import BreastModifier from '../../Modifiers/BreastModifier';

export default class GenericPregnancyChanges {
    // Increase lactation!
    public static lactationIncrease(character: Character) {
        const largestBreastRating: number = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating;
        const largestLactationMultiplier: number = character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier;
        if (largestBreastRating >= 3 && largestLactationMultiplier >= 1 && largestLactationMultiplier < 2) {
            DisplayText("\nYour breasts feel swollen with all the extra milk they're accumulating.\n");
            BreastModifier.boostLactation(character, .5);
        }
        if (largestBreastRating >= 3 && largestLactationMultiplier > 0 && largestLactationMultiplier < 1) {
            DisplayText("\nDrops of breastmilk escape your nipples as your body prepares for the coming birth.\n");
            BreastModifier.boostLactation(character, .5);
        }
        // Lactate if large && not lactating
        if (largestBreastRating >= 3 && largestLactationMultiplier === 0) {
            DisplayText("\nYou realize your breasts feel full, and occasionally lactate").bold();
            DisplayText(".  It must be due to the pregnancy.\n");
            BreastModifier.boostLactation(character, 1);
        }
        // Enlarge if too small for lactation
        if (largestBreastRating === 2) {
            DisplayText("\nYour breasts have swollen to C-cups,").bold();
            DisplayText(" in light of your coming pregnancy.\n");
            BreastModifier.growTopBreastRow(character, 1, 1, false);
        }
        // Enlarge if really small!
        if (largestBreastRating === 1) {
            DisplayText("\nYour breasts have grown to B-cups,").bold();
            DisplayText(" likely due to the hormonal changes of your pregnancy.\n");
            BreastModifier.growTopBreastRow(character, 1, 1, false);
        }
    }
}
