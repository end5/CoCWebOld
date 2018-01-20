import { FaceType } from '../../Body/Face';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import { WingType } from '../../Body/Wings';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';

export default class GenericTransforms {
    public static demonChanges(player: Player): void {
        // Change tail if already horned.
        if (player.torso.tails.filterType(TailType.DEMONIC).length < 0 && player.torso.neck.head.horns.amount > 0) {
            if (player.torso.tails.count === 0) {
                DisplayText("\n\n");
                if (player.torso.tails.filterType(TailType.SPIDER_ABDOMEN).length >= 1 || player.torso.tails.filterType(TailType.BEE_ABDOMEN).length >= 1)
                    DisplayText("You feel a tingling in your insectile abdomen as it stretches, narrowing, the exoskeleton flaking off as it transforms into a flexible demon-tail, complete with a round spaded tip.  ");
                else
                    DisplayText("You feel a tingling in your tail.  You are amazed to discover it has shifted into a flexible demon-tail, complete with a round spaded tip.  ");
                DisplayText("<b>Your tail is now demonic in appearance.</b>");
            }
            else
                DisplayText("\n\nA pain builds in your backside... growing more and more pronounced.  The pressure suddenly disappears with a loud ripping and tearing noise.  <b>You realize you now have a demon tail</b>... complete with a cute little spade.");
            player.stats.cor += 4;
            const newTail = new Tail();
            newTail.type = TailType.DEMONIC;
            player.torso.tails.add(newTail);
        }
        // grow horns!
        if (player.torso.neck.head.horns.amount === 0 || (Utils.rand(player.torso.neck.head.horns.amount + 3) === 0)) {
            if (player.torso.neck.head.horns.amount < 12 && (player.torso.neck.head.horns.type === HornType.NONE || player.torso.neck.head.horns.type === HornType.DEMON)) {
                DisplayText("\n\n");
                if (player.torso.neck.head.horns.amount === 0) {
                    DisplayText("A small pair of demon horns.amount erupts from your forehead.  They actually look kind of cute.  <b>You have horns!</b>");
                }
                else DisplayText("Another pair of demon horns, larger than the last, forms behind the first row.");
                if (player.torso.neck.head.horns.type === HornType.NONE) player.torso.neck.head.horns.type = HornType.DEMON;
                player.torso.neck.head.horns.amount++;
                player.torso.neck.head.horns.amount++;
                player.stats.cor += 3;
            }
            // Text for shifting horns
            else if (player.torso.neck.head.horns.type > HornType.DEMON) {
                DisplayText("\n\n");
                DisplayText("Your horns.amount shift, shrinking into two small demonic-looking horns.");
                player.torso.neck.head.horns.amount = 2;
                player.torso.neck.head.horns.type = HornType.DEMON;
                player.stats.cor += 3;
            }
        }
        // Nipples Turn Back:
        if (player.statusAffects.has(StatusAffectType.BlackNipples) && Utils.rand(3) === 0) {
            DisplayText("\n\nSomething invisible brushes against your " + BreastDescriptor.describeNipple(player, player.torso.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            player.statusAffects.remove(StatusAffectType.BlackNipples);
        }
        // remove fur
        if ((player.torso.neck.head.face.type !== FaceType.HUMAN || player.skin.type !== SkinType.PLAIN) && Utils.rand(3) === 0) {
            // Remove face before fur!
            if (player.torso.neck.head.face.type !== FaceType.HUMAN) {
                DisplayText("\n\n");
                DisplayText("Your visage twists painfully, returning to a more normal human shape, albeit with flawless skin.  <b>Your face is human again!</b>");
                player.torso.neck.head.face.type = FaceType.HUMAN;
            }
            // De-fur
            else if (player.skin.type !== SkinType.PLAIN) {
                DisplayText("\n\n");
                if (player.skin.type === SkinType.FUR) DisplayText("Your skin suddenly feels itchy as your fur begins falling out in clumps, <b>revealing inhumanly smooth skin</b> underneath.");
                if (player.skin.type === SkinType.SCALES) DisplayText("Your scales begin to itch as they begin falling out in droves, <b>revealing your inhumanly smooth " + player.skin.tone + " skin</b> underneath.");
                player.skin.type = SkinType.PLAIN;
                player.skin.desc = "skin";
            }
        }
        // Demon tongue
        if (player.torso.neck.head.face.tongue.type === TongueType.SNAKE && Utils.rand(3) === 0) {
            DisplayText("\n\nYour snake-like tongue tingles, thickening in your mouth until it feels more like your old human tongue, at least for the first few inches.  It bunches up inside you, and when you open up your mouth to release it, roughly two feet of tongue dangles out.  You find it easy to move and control, as natural as walking.  <b>You now have a long demon-tongue.</b>");
            player.torso.neck.head.face.tongue.type = TongueType.DEMONIC;
        }
        // foot changes - requires furless
        if (player.skin.type === SkinType.PLAIN && Utils.rand(4) === 0) {
            // Males/genderless get clawed feet
            if (player.gender <= 1) {
                if (player.torso.hips.legs.type !== LegType.DEMONIC_CLAWS) {
                    DisplayText("\n\n");
                    DisplayText("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LowerBodyDescriptor.describeFeet(player) + ". Something hard breaks through your sole from the inside out as your toes splinter and curve cruelly. The pain slowly diminishes and your eyes look along a human leg that splinters at the foot into a claw with sharp black nails. When you relax, your feet grip the ground easily. <b>Your feet are now formed into demonic claws.</b>");
                    player.torso.hips.legs.type = LegType.DEMONIC_CLAWS;
                }
            }
            // Females/futa get high heels
            else if (player.torso.hips.legs.type !== LegType.DEMONIC_HIGH_HEELS) {
                DisplayText("\n\n");
                DisplayText("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LowerBodyDescriptor.describeFeet(player) + ". Something hard breaks through your sole from the inside out. The pain slowly diminishes and your eyes look along a human leg to a thin and sharp horn protruding from the heel. When you relax, your feet are pointing down and their old posture is only possible with an enormous effort. <b>Your feet are now formed into demonic high-heels.</b> Tentatively you stand up and try to take a few steps. To your surprise you feel as if you were born with this and stride vigorously forward, hips swaying.");
                player.torso.hips.legs.type = LegType.DEMONIC_HIGH_HEELS;
            }
        }
        // Grow demon wings
        if (player.torso.wings.type !== WingType.BAT_LIKE_LARGE && Utils.rand(8) === 0 && player.stats.cor >= 50) {
            // grow smalls to large
            if (player.torso.wings.type === WingType.BAT_LIKE_TINY && player.stats.cor >= 75) {
                DisplayText("\n\n");
                DisplayText("Your small demonic wings stretch and grow, tingling with the pleasure of being attached to such a tainted body.  You stretch over your shoulder to stroke them as they unfurl, turning into full-sized demon-wings.  <b>Your demonic wings have grown!</b>");
                player.torso.wings.type = WingType.BAT_LIKE_LARGE;
                player.torso.wings.desc = "large, bat-like";
            }
            else if (player.torso.wings.type === WingType.SHARK_FIN) {
                DisplayText("\n\n");
                DisplayText("The muscles around your shoulders bunch up uncomfortably, changing to support the new bat-like wings growing from your back.  You twist your head as far as you can for a look and realize your fin has changed into ");
                DisplayText("small ");
                player.torso.wings.type = WingType.BAT_LIKE_TINY;
                player.torso.wings.desc = "tiny, bat-like";
                DisplayText("bat-like demon-wings!");
            }
            else if (player.torso.wings.type === WingType.BEE_LIKE_SMALL || player.torso.wings.type === WingType.BEE_LIKE_LARGE) {
                DisplayText("\n\n");
                DisplayText("The muscles around your shoulders bunch up uncomfortably, changing to support your wings as you feel their weight increasing.  You twist your head as far as you can for a look and realize they've changed into ");
                if (player.torso.wings.type === WingType.BEE_LIKE_SMALL) {
                    DisplayText("small ");
                    player.torso.wings.type = WingType.BAT_LIKE_TINY;
                    player.torso.wings.desc = "tiny, bat-like";
                }
                else {
                    DisplayText("large ");
                    player.torso.wings.type = WingType.BAT_LIKE_LARGE;
                    player.torso.wings.desc = "large, bat-like";
                }
                DisplayText("<b>bat-like demon-wings!</b>");
            }
            // No wings
            else if (player.torso.wings.type === WingType.NONE) {
                DisplayText("\n\n");
                DisplayText("A knot of pain forms in your shoulders as they tense up.  With a surprising force, a pair of small demonic wings sprout from your back, ripping a pair of holes in the back of your " + player.inventory.equipment.armor.displayName + ".  <b>You now have tiny demonic wings</b>.");
                player.torso.wings.type = WingType.BAT_LIKE_TINY;
                player.torso.wings.desc = "tiny, bat-like";
            }
        }
    }
}
