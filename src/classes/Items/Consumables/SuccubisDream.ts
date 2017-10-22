import Consumable from './Consumable';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class SuccubisDream extends Consumable {
    public constructor() {
        super("S.Dream", "S.Dream", "a bottle of 'Succubus' Dream'", SuccubisDream.DefaultValue, "This precious fluid is often given to men a succubus intends to play with for a long time, though this batch has been enhanced by Lumi to have even greater potency.");
    }

    public use(player: Player) {
        player.slimeFeed();
        let changes: number = 0;
        let crit: number = 1;
        //Determine crit multiplier (x2 or x3)
        crit += Utils.rand(2) + 1;
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
            let corruptionChange: number = 1;
            //Corrupts the uncorrupted faster
            if (player.stats.cor < 50) corruptionChange++;
            if (player.stats.cor < 40) corruptionChange++;
            if (player.stats.cor < 30) corruptionChange++;
            //Corrupts the very corrupt slower
            if (player.stats.cor >= 90) corruptionChange = .5;
            player.stats.cor += corruptionChange + 2;
            changes++;
        }
        //NEW BALLZ
        if (player.lowerBody.balls < 4) {
            if (player.lowerBody.balls > 0) {
                player.lowerBody.balls = 4;
                MainScreen.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + player.inventory.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have four balls.</b>", false);
            }
            if (player.lowerBody.balls == 0) {
                player.lowerBody.balls = 2;
                MainScreen.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + player.inventory.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have balls!</b>", false);
                player.lowerBody.ballSize = 1;
            }
            changes++;
        }
        //Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (Utils.rand(1.5) == 0 && changes < changeLimit && player.lowerBody.balls > 0 && player.lowerBody.cockSpot.count() > 0) {
            player.lowerBody.ballSize++;
            //They grow slower as they get bigger...
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
            //Texts
            if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, player) + " have grown larger than a human's.", false);
            if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(player) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, player) + " have enlarged again.", false);
            player.stats.lib += 1;
            player.stats.lust += 3;
        }
        //Boost cum multiplier
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.cockSpot.count() > 0) {
            if (player.cumMultiplier < 6 && Utils.rand(2) == 0 && changes < changeLimit) {
                //Temp is the max it can be raised to
                let maxCumMultiplier: number = 3;
                //Lots of cum raises cum multiplier cap to 6 instead of 3
                if (player.perks.has("MessyOrgasms")) maxCumMultiplier = 6;
                if (maxCumMultiplier < player.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .4 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your body as something inside you changes.", false);
                    if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + BallsDescriptor.describeBalls(true, true, player) + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
                    if (crit > 1) MainScreen.text("  A bit of milky pre dribbles from your " + CockDescriptor.describeMultiCockShort(player) + ", pushed out by the change.", false);
                    player.stats.lib += 1;
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
            MainScreen.text(player.modFem(12, 5), false);
        }
    }
}