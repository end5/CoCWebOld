import { SkinType } from '../../Body/Creature';
import { FaceType, TongueType } from '../../Body/Face';
import { HornType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { WingType } from '../../Body/UpperBody';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class GenericTransforms {
    public static demonChanges(player: Player): void {
        //Change tail if already horned.
        if (player.lowerBody.tailType != TailType.DEMONIC && player.upperBody.head.horns > 0) {
            if (player.lowerBody.tailType != TailType.NONE) {
                MainScreen.text("\n\n", false);
                if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN || player.lowerBody.tailType == TailType.BEE_ABDOMEN)
                    MainScreen.text("You feel a tingling in your insectile abdomen as it stretches, narrowing, the exoskeleton flaking off as it transforms into a flexible demon-tail, complete with a round spaded tip.  ", false);
                else
                    MainScreen.text("You feel a tingling in your tail.  You are amazed to discover it has shifted into a flexible demon-tail, complete with a round spaded tip.  ", false);
                MainScreen.text("<b>Your tail is now demonic in appearance.</b>", false);
            }
            else
                MainScreen.text("\n\nA pain builds in your backside... growing more and more pronounced.  The pressure suddenly disappears with a loud ripping and tearing noise.  <b>You realize you now have a demon tail</b>... complete with a cute little spade.", false);
            player.stats.cor += 4;
            player.lowerBody.tailType = TailType.DEMONIC;
        }
        //grow horns!
        if (player.upperBody.head.horns == 0 || (Utils.rand(player.upperBody.head.horns + 3) == 0)) {
            if (player.upperBody.head.horns < 12 && (player.upperBody.head.hornType == HornType.NONE || player.upperBody.head.hornType == HornType.DEMON)) {
                MainScreen.text("\n\n", false);
                if (player.upperBody.head.horns == 0) {
                    MainScreen.text("A small pair of demon horns erupts from your forehead.  They actually look kind of cute.  <b>You have horns!</b>", false);
                }
                else MainScreen.text("Another pair of demon horns, larger than the last, forms behind the first row.", false);
                if (player.upperBody.head.hornType == HornType.NONE) player.upperBody.head.hornType = HornType.DEMON;
                player.upperBody.head.horns++;
                player.upperBody.head.horns++;
                player.stats.cor += 3;
            }
            //Text for shifting horns
            else if (player.upperBody.head.hornType > HornType.DEMON) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Your horns shift, shrinking into two small demonic-looking horns.", false);
                player.upperBody.head.horns = 2;
                player.upperBody.head.hornType = HornType.DEMON;
                player.stats.cor += 3;
            }
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            player.statusAffects.remove("BlackNipples");
        }
        //remove fur
        if ((player.upperBody.head.face.faceType != FaceType.HUMAN || player.skinType != SkinType.PLAIN) && Utils.rand(3) == 0) {
            //Remove face before fur!
            if (player.upperBody.head.face.faceType != FaceType.HUMAN) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Your visage twists painfully, returning to a more normal human shape, albeit with flawless skin.  <b>Your face is human again!</b>", false);
                player.upperBody.head.face.faceType = FaceType.HUMAN;
            }
            //De-fur
            else if (player.skinType != SkinType.PLAIN) {
                MainScreen.text("\n\n", false);
                if (player.skinType == SkinType.FUR) MainScreen.text("Your skin suddenly feels itchy as your fur begins falling out in clumps, <b>revealing inhumanly smooth skin</b> underneath.", false);
                if (player.skinType == SkinType.SCALES) MainScreen.text("Your scales begin to itch as they begin falling out in droves, <b>revealing your inhumanly smooth " + player.skinTone + " skin</b> underneath.", false);
                player.skinType = SkinType.PLAIN;
                player.skinDesc = "skin";
            }
        }
        //Demon tongue
        if (player.upperBody.head.face.tongueType == TongueType.SNAKE && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour snake-like tongue tingles, thickening in your mouth until it feels more like your old human tongue, at least for the first few inches.  It bunches up inside you, and when you open up your mouth to release it, roughly two feet of tongue dangles out.  You find it easy to move and control, as natural as walking.  <b>You now have a long demon-tongue.</b>", false);
            player.upperBody.head.face.tongueType = TongueType.DEMONIC;
        }
        //foot changes - requires furless
        if (player.skinType == SkinType.PLAIN && Utils.rand(4) == 0) {
            //Males/genderless get clawed feet
            if (player.gender <= 1) {
                if (player.lowerBody.type != LowerBodyType.DEMONIC_CLAWS) {
                    MainScreen.text("\n\n", false);
                    MainScreen.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LowerBodyDescriptor.describeFeet(player) + ". Something hard breaks through your sole from the inside out as your toes splinter and curve cruelly. The pain slowly diminishes and your eyes look along a human leg that splinters at the foot into a claw with sharp black nails. When you relax, your feet grip the ground easily. <b>Your feet are now formed into demonic claws.</b>", false);
                    player.lowerBody.type = LowerBodyType.DEMONIC_CLAWS;
                }
            }
            //Females/futa get high heels
            else if (player.lowerBody.type != LowerBodyType.DEMONIC_HIGH_HEELS) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LowerBodyDescriptor.describeFeet(player) + ". Something hard breaks through your sole from the inside out. The pain slowly diminishes and your eyes look along a human leg to a thin and sharp horn protruding from the heel. When you relax, your feet are pointing down and their old posture is only possible with an enormous effort. <b>Your feet are now formed into demonic high-heels.</b> Tentatively you stand up and try to take a few steps. To your surprise you feel as if you were born with this and stride vigorously forward, hips swaying.", false);
                player.lowerBody.type = LowerBodyType.DEMONIC_HIGH_HEELS;
            }
        }
        //Grow demon wings
        if (player.upperBody.wingType != WingType.BAT_LIKE_LARGE && Utils.rand(8) == 0 && player.stats.cor >= 50) {
            //grow smalls to large
            if (player.upperBody.wingType == WingType.BAT_LIKE_TINY && player.stats.cor >= 75) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Your small demonic wings stretch and grow, tingling with the pleasure of being attached to such a tainted body.  You stretch over your shoulder to stroke them as they unfurl, turning into full-sized demon-wings.  <b>Your demonic wings have grown!</b>", false);
                player.upperBody.wingType = WingType.BAT_LIKE_LARGE;
                player.upperBody.wingDesc = "large, bat-like";
            }
            else if (player.upperBody.wingType == WingType.SHARK_FIN) {
                MainScreen.text("\n\n", false);
                MainScreen.text("The muscles around your shoulders bunch up uncomfortably, changing to support the new bat-like wings growing from your back.  You twist your head as far as you can for a look and realize your fin has changed into ", false);
                MainScreen.text("small ", false);
                player.upperBody.wingType = WingType.BAT_LIKE_TINY;
                player.upperBody.wingDesc = "tiny, bat-like";
                MainScreen.text("bat-like demon-wings!", false);
            }
            else if (player.upperBody.wingType == WingType.BEE_LIKE_SMALL || player.upperBody.wingType == WingType.BEE_LIKE_LARGE) {
                MainScreen.text("\n\n", false);
                MainScreen.text("The muscles around your shoulders bunch up uncomfortably, changing to support your wings as you feel their weight increasing.  You twist your head as far as you can for a look and realize they've changed into ", false);
                if (player.upperBody.wingType == WingType.BEE_LIKE_SMALL) {
                    MainScreen.text("small ", false);
                    player.upperBody.wingType = WingType.BAT_LIKE_TINY;
                    player.upperBody.wingDesc = "tiny, bat-like";
                }
                else {
                    MainScreen.text("large ", false);
                    player.upperBody.wingType = WingType.BAT_LIKE_LARGE;
                    player.upperBody.wingDesc = "large, bat-like";
                }
                MainScreen.text("<b>bat-like demon-wings!</b>", false);
            }
            //No wings
            else if (player.upperBody.wingType == WingType.NONE) {
                MainScreen.text("\n\n", false);
                MainScreen.text("A knot of pain forms in your shoulders as they tense up.  With a surprising force, a pair of small demonic wings sprout from your back, ripping a pair of holes in the back of your " + player.inventory.armorSlot.equipment.displayName + ".  <b>You now have tiny demonic wings</b>.", false);
                player.upperBody.wingType = WingType.BAT_LIKE_TINY;
                player.upperBody.wingDesc = "tiny, bat-like";
            }
        }
    }
}