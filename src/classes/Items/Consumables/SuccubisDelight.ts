import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class SuccubisDelight extends Consumable {
    public readonly tainted: boolean;
    public constructor(tainted: boolean) {
        super("SDelite", "Sucb.Delite", "a bottle of 'Succubi's Delight'", 0, "This precious fluid is often given to men a succubus intends to play with for a long time.");
    }

    public use(player: Player) {
        player.slimeFeed();
        let changes: number = 0;
        let crit: number = 1;
        //Determine crit multiplier (x2 or x3)
        if (Utils.rand(4) == 0) crit += Utils.rand(2) + 1;
        let changeLimit: number = 1;
        //Chances to up the max number of changes
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Generic drinking text
        MainScreen.text("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.", true);
        //low corruption thoughts
        if (player.stats.cor < 33) MainScreen.text("  This stuff is gross, why are you drinking it?", false);
        //high corruption
        if (player.stats.cor >= 66) MainScreen.text("  You lick your lips, marvelling at how thick and sticky it is.", false);
        //Corruption increase
        if (player.stats.cor < 50 || Utils.rand(2)) {
            MainScreen.text("\n\nThe drink makes you feel... dirty.", false);
            temp = 1;
            //Corrupts the uncorrupted faster
            if (player.stats.cor < 50) temp++;
            if (player.stats.cor < 40) temp++;
            if (player.stats.cor < 30) temp++;
            //Corrupts the very corrupt slower
            if (player.stats.cor >= 90) temp = .5;
            if (tainted) dynStats("cor", temp);
            else dynStats("cor", 0);
            changes++;
        }
        //Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (Utils.rand(1.5) == 0 && changes < changeLimit && player.lowerBody.balls > 0) {
            player.lowerBody.ballSize++;
            //They grow slower as they get bigger...
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
            //Texts
            if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + simpleBallsDescript() + " have grown larger than a human's.", false);
            if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + sackDescript() + ".  Walking becomes difficult as you discover your " + simpleBallsDescript() + " have enlarged again.", false);
            dynStats("lib", 1, "lus", 3);
        }
        //Boost cum multiplier
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.cockSpot.count() > 0) {
            if (player.cumMultiplier < 6 && Utils.rand(2) == 0 && changes < changeLimit) {
                //Temp is the max it can be raised to
                temp = 3;
                //Lots of cum raises cum multiplier cap to 6 instead of 3
                if (player.perks.has("MessyOrgasms")) temp = 6;
                if (temp < player.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .4 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your body as something inside you changes.", false);
                    if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + ballsDescriptLight() + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
                    if (crit > 1) MainScreen.text("  A bit of milky pre dribbles from your " + multiCockDescriptLight() + ", pushed out by the change.", false);
                    dynStats("lib", 1);
                }
                changes++;
            }
        }
        //Fail-safe
        if (changes == 0) {
            MainScreen.text("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.", false);
            player.hoursSinceCum += 100;
            changes++;
        }
        if (player.lowerBody.balls > 0 && Utils.rand(3) == 0) {
            MainScreen.text(player.modFem(12, 3), false);
        }
    }
}