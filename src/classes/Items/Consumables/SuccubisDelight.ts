import Consumable from './Consumable';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SuccubisDelight extends Consumable {
    public readonly tainted: boolean;
    public constructor(tainted: boolean) {
        if (tainted)
            super("SDelite", new ItemDesc("Sucb.Delite", "a bottle of 'Succubi's Delight'", "This precious fluid is often given to men a succubus intends to play with for a long time."));
        else
            super("PSDelit", new ItemDesc("PSDelit", "an untainted bottle of \"Succubi's Delight\"", "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption."), 20);
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
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        //Generic drinking text
        DisplayText.clear();
        DisplayText.text("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.");
        //low corruption thoughts
        if (player.stats.cor < 33) DisplayText.text("  This stuff is gross, why are you drinking it?");
        //high corruption
        if (player.stats.cor >= 66) DisplayText.text("  You lick your lips, marvelling at how thick and sticky it is.");
        //Corruption increase
        if (player.stats.cor < 50 || Utils.rand(2)) {
            DisplayText.text("\n\nThe drink makes you feel... dirty.");
            let corruptChange: number = 1;
            //Corrupts the uncorrupted faster
            if (player.stats.cor < 50) corruptChange++;
            if (player.stats.cor < 40) corruptChange++;
            if (player.stats.cor < 30) corruptChange++;
            //Corrupts the very corrupt slower
            if (player.stats.cor >= 90) corruptChange = .5;
            if (this.tainted) player.stats.cor += corruptChange;
            changes++;
        }
        //Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (Utils.rand(1.5) == 0 && changes < changeLimit && player.lowerBody.balls > 0) {
            player.lowerBody.ballSize++;
            //They grow slower as they get bigger...
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
            //Texts
            if (player.lowerBody.ballSize <= 2) DisplayText.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, player) + " have grown larger than a human's.");
            if (player.lowerBody.ballSize > 2) DisplayText.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(player) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, player) + " have enlarged again.");
            player.stats.lib += 1;
            player.stats.lust += 3;
        }
        //Boost cum multiplier
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.cockSpot.count() > 0) {
            if (player.cumMultiplier < 6 && Utils.rand(2) == 0 && changes < changeLimit) {
                //Temp is the max it can be raised to
                let cumMultiplerMax: number = 3;
                //Lots of cum raises cum multiplier cap to 6 instead of 3
                if (player.perks.has(PerkType.MessyOrgasms)) cumMultiplerMax = 6;
                if (cumMultiplerMax < player.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .4 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0) DisplayText.text("\n\nYou feel a churning inside your body as something inside you changes.");
                    if (player.lowerBody.balls > 0) DisplayText.text("\n\nYou feel a churning in your " + BallsDescriptor.describeBalls(true, true, player) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                    if (crit > 1) DisplayText.text("  A bit of milky pre dribbles from your " + CockDescriptor.describeMultiCockShort(player) + ", pushed out by the change.");
                    player.stats.lib += 1;
                }
                changes++;
            }
        }
        //Fail-safe
        if (changes == 0) {
            DisplayText.text("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.");
            player.hoursSinceCum += 100;
            changes++;
        }
        if (player.lowerBody.balls > 0 && Utils.rand(3) == 0) {
            DisplayText.text(player.modFem(12, 3));
        }
    }
}