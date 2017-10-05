import MainScreen from '../../display/MainScreen';
import BreastModifier from '../../Modifiers/BreastModifiers';
import Creature from '../Creature';

export default class GenericPregnancyChanges {
    //Increase lactation!
    public static lactationIncrease(creature: Creature) {
        const mostBreastsPerRow: number = creature.upperBody.chest.NumOfBreastsLargest[0].breasts;
        const largestBreastRating: number = creature.upperBody.chest.BreastRatingLargest[0].breastRating;
        const largestLactationMultiplier: number = creature.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier;
        if (largestBreastRating >= 3 && mostBreastsPerRow > 1 && largestLactationMultiplier >= 1 && largestLactationMultiplier < 2) {
            MainScreen.text("\nYour breasts feel swollen with all the extra milk they're accumulating.\n", false);
            creature.boostLactation(.5);
        }
        if (largestBreastRating >= 3 && mostBreastsPerRow > 1 && largestLactationMultiplier > 0 && largestLactationMultiplier < 1) {
            MainScreen.text("\nDrops of breastmilk escape your nipples as your body prepares for the coming birth.\n", false);
            creature.boostLactation(.5);
        }
        //Lactate if large && not lactating
        if (largestBreastRating >= 3 && mostBreastsPerRow > 1 && largestLactationMultiplier == 0) {
            MainScreen.text("\n<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.\n", false);
            creature.boostLactation(1);
        }
        //Enlarge if too small for lactation
        if (largestBreastRating == 2 && mostBreastsPerRow > 1) {
            MainScreen.text("\n<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.\n", false);
            BreastModifier.growTopBreastRow(creature, 1, 1, false);
        }
        //Enlarge if really small!
        if (largestBreastRating == 1 && mostBreastsPerRow > 1) {
            MainScreen.text("\n<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.\n", false);
            BreastModifier.growTopBreastRow(creature, 1, 1, false);
        }
    }
}