export default class HairChangeDescriptor {

    public growHair(amount: number = .1): boolean {
        //Grow hair!
        temp = player.upperBody.head.hairLength;
        player.upperBody.head.hairLength += amount;
        if (player.upperBody.head.hairLength > 0 && temp == 0) {
            MainScreen.text("\n<b>You are no longer bald.  You now have " + HeadDescriptor.describeHair(player) + " coating your head.\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 1 && temp < 1) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 3 && temp < 3) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 6 && temp < 6) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 10 && temp < 10) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 16 && temp < 16) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 26 && temp < 26) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 40 && temp < 40) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        else if (player.upperBody.head.hairLength >= 40 && player.upperBody.head.hairLength >= player.tallness && temp < player.tallness) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(player) + ".\n</b>", false);
            return true;
        }
        return false;
    }

}