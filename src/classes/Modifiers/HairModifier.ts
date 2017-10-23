import Creature from '../Body/Creature';
import HeadDescriptor from '../Descriptors/HeadDescriptor';
import MainScreen from '../display/MainScreen';

export default class HairModifier {
    public static displayGrowHair(creature: Creature, amount: number = .1): boolean {
        //Grow hair!
        const hairLength: number = creature.upperBody.head.hairLength;
        creature.upperBody.head.hairLength += amount;
        if (creature.upperBody.head.hairLength > 0 && hairLength == 0) {
            MainScreen.text("\n<b>You are no longer bald.  You now have " + HeadDescriptor.describeHair(creature) + " coating your head.\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 1 && hairLength < 1) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 3 && hairLength < 3) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 6 && hairLength < 6) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 10 && hairLength < 10) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 16 && hairLength < 16) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 26 && hairLength < 26) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 40 && hairLength < 40) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 40 && creature.upperBody.head.hairLength >= creature.tallness && hairLength < creature.tallness) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        return false;
    }
}