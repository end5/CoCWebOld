import { EarType } from '../../Body/Head';
import { TailType } from '../../Body/LowerBody';
import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';

export default class PlayerRun {
    public use(player: Player, monster: Character, success: boolean) {
        //ANEMONE OVERRULES NORMAL RUN
        if (monster.desc.short == "anemone") {
            //Autosuccess - less than 60 lust
            if (player.stats.lust < 60) {
                MainScreen.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                return;
            }
            //Speed dependent
            else {
                //Success
                if (success) {
                    MainScreen.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                    return;
                }
                //Run failed:
                else {
                    MainScreen.text("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + player.inventory.armorSlot.equipment.displayName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.", false);
                    //(gain lust, temp lose spd/str)
                    <Anemone>monster.applyVenom((4 + player.stats.sens / 20));
                    return;
                }
            }
        }
        //Ember is SPUCIAL
        if (monster.desc.short == "Ember") {
            //GET AWAY
            if (success) {
                if (player.perks.has("Runner")) MainScreen.text("Using your skill at running, y");
                else MainScreen.text("Y");
                MainScreen.text("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                MainScreen.text("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
            }
            //Fail: 
            else {
                MainScreen.text("Despite some impressive jinking, " + emberScene.emberMF("he", "she") + " catches you, tackling you to the ground.\n\n");
            }
            return;
        }
        //SUCCESSFUL FLEE
        if (success) {
            //Fliers flee!
            if (player.canFly()) MainScreen.text(monster.desc.capitalA + monster.desc.short + " can't catch you.", false);
            //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has("Runner")) {
                MainScreen.text("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + monster.desc.subjectivePronoun + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + monster.desc.objectivePronoun + " behind with your clumsy, jerky, short-range flight.");
            }
            //Non-fliers flee
            else MainScreen.text(monster.desc.capitalA + monster.desc.short + " rapidly disappears into the shifting landscape behind you.", false);
            if (monster.desc.short == "Izma") {
                MainScreen.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            return;
        }
        //Runner perk chance
        else if (success) {
            MainScreen.text("Thanks to your talent for running, you manage to escape.", false);
            if (monster.desc.short == "Izma") {
                MainScreen.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            return;
        }
        //FAIL FLEE
        else {
            if (monster.desc.short == "Holli") {
                <Holli>monster.escapeFailWithHolli();
                return;
            }
            //Flyers get special failure message.
            if (player.canFly()) {
                if (monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + " manage to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!", false);
                else MainScreen.text(monster.desc.capitalA + monster.desc.short + " manages to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!", false);
            }
            //fail
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has("Runner")) MainScreen.text("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            //Nonflyer messages
            else {
                //Huge balls messages
                if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 24) {
                    if (player.lowerBody.ballSize < 48) MainScreen.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " swinging ponderously beneath you, getting away is far harder than it should be.  ", false);
                    else MainScreen.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " dragging along the ground, getting away is far harder than it should be.  ", false);
                }
                //FATASS BODY MESSAGES
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 || player.lowerBody.butt.buttRating >= 20 || player.lowerBody.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 && player.upperBody.chest.BreastRatingLargest[0].breastRating < 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            MainScreen.text("Your " + LowerBodyDescriptor.describeHips(player) + " forces your gait to lurch slightly side to side, which causes the fat of your " + player.skinTone + " ", false);
                            if (player.lowerBody.butt.buttRating >= 20) MainScreen.text(ButtDescriptor.describeButt(player) + " and ", false);
                            MainScreen.text(BreastDescriptor.describeChest(player) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " and " + BreastDescriptor.describeChest(player) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " jiggle and wobble side to side like the " + player.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.", false);
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground while your " + LowerBodyDescriptor.describeHips(player) + " swing side to side ", false);
                            if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("causing the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble heavily, ", false);
                            MainScreen.text("forcing your body off balance and preventing you from moving quick enough to get escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground while the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground, preventing you from moving quick enough to get escape.", false);
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (player.lowerBody.hipRating >= 20) {
                        MainScreen.text("Your " + LowerBodyDescriptor.describeHips(player) + " swing heavily from side to side ", false);
                        if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("causing your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble obscenely ", false);
                        MainScreen.text("and forcing your body into an awkward gait that slows you down, preventing you from escaping.", false);
                    }
                    //JUST DA BOOTAH
                    else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles so heavily that you're unable to move quick enough to escape.", false);
                }
                //NORMAL RUN FAIL MESSAGES
                else if (monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + " stay hot on your heels, denying you a chance at escape!", false);
                else MainScreen.text(monster.desc.capitalA + monster.desc.short + " stays hot on your heels, denying you a chance at escape!", false);
            }
        }
    }
}