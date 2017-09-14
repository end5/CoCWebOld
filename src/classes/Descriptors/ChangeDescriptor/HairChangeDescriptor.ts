export default class HairChangeDescriptor {

    public growHair(amount: number = .1): boolean {
        //Grow hair!
        temp = player.hairLength;
        player.hairLength += amount;
        if (player.hairLength > 0 && temp == 0) {
            MainScreen.text("\n<b>You are no longer bald.  You now have " + hairDescript() + " coating your head.\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 1 && temp < 1) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 3 && temp < 3) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 6 && temp < 6) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 10 && temp < 10) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 16 && temp < 16) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 26 && temp < 26) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 40 && temp < 40) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (player.hairLength >= 40 && player.hairLength >= player.tallness && temp < player.tallness) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
            return true;
        }
        return false;
    }

}