import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import BodyModifier from '../../Modifiers/BodyModifier';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SuccubisDream extends Consumable {
    public constructor() {
        super(ConsumableName.SuccubisDream, new ItemDesc("S.Dream", "a bottle of 'Succubus' Dream'", "This precious fluid is often given to men a succubus intends to play with for a long time, though this batch has been enhanced by Lumi to have even greater potency."));
    }

    public use(character: Character) {
        character.slimeFeed();
        let changes: number = 0;
        let crit: number = 1;
        // Determine crit multiplier (x2 or x3)
        crit += Utils.rand(2) + 1;
        let changeLimit: number = 1;
        // Chances to up the max number of changes
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Generic drinking text
        DisplayText().clear();
        DisplayText("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.");
        // low corruption thoughts
        if (character.stats.cor < 33) DisplayText("  This stuff is gross, why are you drinking it?");
        // high corruption
        if (character.stats.cor >= 66) DisplayText("  You lick your lips, marvelling at how thick and sticky it is.");
        // Corruption increase
        if (character.stats.cor < 50 || Utils.rand(2)) {
            DisplayText("\n\nThe drink makes you feel... dirty.");
            let corruptionChange: number = 1;
            // Corrupts the uncorrupted faster
            if (character.stats.cor < 50) corruptionChange++;
            if (character.stats.cor < 40) corruptionChange++;
            if (character.stats.cor < 30) corruptionChange++;
            // Corrupts the very corrupt slower
            if (character.stats.cor >= 90) corruptionChange = .5;
            character.stats.cor += corruptionChange + 2;
            changes++;
        }
        // NEW BALLZ
        if (character.torso.balls.quantity < 4) {
            if (character.torso.balls.quantity > 0) {
                character.torso.balls.quantity = 4;
                DisplayText("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + character.inventory.equipment.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have four balls.</b>");
            }
            if (character.torso.balls.quantity === 0) {
                character.torso.balls.quantity = 2;
                DisplayText("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + character.inventory.equipment.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have balls!</b>");
                character.torso.balls.size = 1;
            }
            changes++;
        }
        // Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (Utils.rand(1.5) === 0 && changes < changeLimit && character.torso.balls.quantity > 0 && character.torso.cocks.count > 0) {
            character.torso.balls.size++;
            // They grow slower as they get bigger...
            if (character.torso.balls.size > 10) character.torso.balls.size -= .5;
            // Texts
            if (character.torso.balls.size <= 2) DisplayText("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, character) + " have grown larger than a human's.");
            if (character.torso.balls.size > 2) DisplayText("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(character) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, character) + " have enlarged again.");
            character.stats.lib += 1;
            character.stats.lust += 3;
        }
        // Boost cum multiplier
        if (changes < changeLimit && Utils.rand(2) === 0 && character.torso.cocks.count > 0) {
            if (character.cumMultiplier < 6 && Utils.rand(2) === 0 && changes < changeLimit) {
                // Temp is the max it can be raised to
                let maxCumMultiplier: number = 3;
                // Lots of cum raises cum multiplier cap to 6 instead of 3
                if (character.perks.has(PerkType.MessyOrgasms)) maxCumMultiplier = 6;
                if (maxCumMultiplier < character.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    character.cumMultiplier += .4 * crit;
                    // Flavor text
                    if (character.torso.balls.quantity === 0) DisplayText("\n\nYou feel a churning inside your body as something inside you changes.");
                    if (character.torso.balls.quantity > 0) DisplayText("\n\nYou feel a churning in your " + BallsDescriptor.describeBalls(true, true, character) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                    if (crit > 1) DisplayText("  A bit of milky pre dribbles from your " + CockDescriptor.describeMultiCockShort(character) + ", pushed out by the change.");
                    character.stats.lib += 1;
                }
                changes++;
            }
        }
        // Fail-safe
        if (changes === 0) {
            DisplayText("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.");
            character.hoursSinceCum += 100;
            changes++;
        }
        if (character.torso.balls.quantity > 0 && Utils.rand(3) === 0) {
            DisplayText(BodyModifier.displayModFem(character, 12, 5));
        }
    }
}
