import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import BodyModifier from '../../Modifiers/BodyModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SuccubisDream extends Consumable {
    public constructor() {
        super(ConsumableName.SuccubisDream, new ItemDesc("S.Dream", "a bottle of 'Succubus' Dream'", "This precious fluid is often given to men a succubus intends to play with for a long time, though this batch has been enhanced by Lumi to have even greater potency."));
    }

    public use(player: Player) {
        player.slimeFeed();
        let changes: number = 0;
        let crit: number = 1;
        // Determine crit multiplier (x2 or x3)
        crit += Utils.rand(2) + 1;
        let changeLimit: number = 1;
        // Chances to up the max number of changes
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Generic drinking text
        DisplayText().clear();
        DisplayText("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.");
        // low corruption thoughts
        if (player.stats.cor < 33) DisplayText("  This stuff is gross, why are you drinking it?");
        // high corruption
        if (player.stats.cor >= 66) DisplayText("  You lick your lips, marvelling at how thick and sticky it is.");
        // Corruption increase
        if (player.stats.cor < 50 || Utils.rand(2)) {
            DisplayText("\n\nThe drink makes you feel... dirty.");
            let corruptionChange: number = 1;
            // Corrupts the uncorrupted faster
            if (player.stats.cor < 50) corruptionChange++;
            if (player.stats.cor < 40) corruptionChange++;
            if (player.stats.cor < 30) corruptionChange++;
            // Corrupts the very corrupt slower
            if (player.stats.cor >= 90) corruptionChange = .5;
            player.stats.cor += corruptionChange + 2;
            changes++;
        }
        // NEW BALLZ
        if (player.torso.balls.quantity < 4) {
            if (player.torso.balls.quantity > 0) {
                player.torso.balls.quantity = 4;
                DisplayText("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + player.inventory.equipment.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have four balls.</b>");
            }
            if (player.torso.balls.quantity === 0) {
                player.torso.balls.quantity = 2;
                DisplayText("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + player.inventory.equipment.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have balls!</b>");
                player.torso.balls.size = 1;
            }
            changes++;
        }
        // Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (Utils.rand(1.5) === 0 && changes < changeLimit && player.torso.balls.quantity > 0 && player.torso.cocks.count > 0) {
            player.torso.balls.size++;
            // They grow slower as they get bigger...
            if (player.torso.balls.size > 10) player.torso.balls.size -= .5;
            // Texts
            if (player.torso.balls.size <= 2) DisplayText("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, player) + " have grown larger than a human's.");
            if (player.torso.balls.size > 2) DisplayText("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(player) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, player) + " have enlarged again.");
            player.stats.lib += 1;
            player.stats.lust += 3;
        }
        // Boost cum multiplier
        if (changes < changeLimit && Utils.rand(2) === 0 && player.torso.cocks.count > 0) {
            if (player.cumMultiplier < 6 && Utils.rand(2) === 0 && changes < changeLimit) {
                // Temp is the max it can be raised to
                let maxCumMultiplier: number = 3;
                // Lots of cum raises cum multiplier cap to 6 instead of 3
                if (player.perks.has(PerkType.MessyOrgasms)) maxCumMultiplier = 6;
                if (maxCumMultiplier < player.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .4 * crit;
                    // Flavor text
                    if (player.torso.balls.quantity === 0) DisplayText("\n\nYou feel a churning inside your body as something inside you changes.");
                    if (player.torso.balls.quantity > 0) DisplayText("\n\nYou feel a churning in your " + BallsDescriptor.describeBalls(true, true, player) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                    if (crit > 1) DisplayText("  A bit of milky pre dribbles from your " + CockDescriptor.describeMultiCockShort(player) + ", pushed out by the change.");
                    player.stats.lib += 1;
                }
                changes++;
            }
        }
        // Fail-safe
        if (changes === 0) {
            DisplayText("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.");
            player.hoursSinceCum += 100;
            changes++;
        }
        if (player.torso.balls.quantity > 0 && Utils.rand(3) === 0) {
            DisplayText(BodyModifier.displayModFem(player, 12, 5));
        }
    }
}
