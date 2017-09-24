import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";
import Cock, { CockType } from "../../Body/Cock";
import CockDescriptor from "../../Descriptors/CockDescriptor";
import CockModifier from "../../Modifiers/CockModifiers";
import Flags, { FlagEnum } from "../../Game/Flags";
import BreastModifier from "../../Modifiers/BreastModifiers";
import CockChangeDescriptor from "../../Descriptors/ChangeDescriptor/CockChangeDescriptor";
import { TailType, LowerBodyType } from "../../Body/LowerBody";
import { HornType } from "../../Body/Head";
import BreastDescriptor from "../../Descriptors/BreastDescriptor";
import { FaceType, TongueType } from "../../Body/Face";
import { SkinType } from "../../Body/Body";
import LowerBodyDescriptor from "../../Descriptors/LowerBodyDescriptor";
import { WingType } from "../../Body/UpperBody";

export default class IncubusDraft extends Consumable {
    public readonly tainted: boolean;
    public constructor(tainted: boolean) {
        super("IncubiD", "IncubiD", "an Incubi draft", 0, "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass.");
        this.tainted = tainted;
    }

    public use(player: Player) {
        player.slimeFeed();
        let changeAmount: number = Utils.rand(100);
        if (player.perks.has("HistoryAlchemist"))
            changeAmount += 10;
        MainScreen.text("The draft is slick and sticky, ", true);
        if (player.stats.cor <= 33)
            MainScreen.text("just swallowing it makes you feel unclean.", false);
        if (player.stats.cor > 33 && player.stats.cor <= 66)
            MainScreen.text("reminding you of something you just can't place.", false);
        if (player.stats.cor > 66)
            MainScreen.text("deliciously sinful in all the right ways.", false);
        if (player.stats.cor >= 90)
            MainScreen.text("  You're sure it must be distilled from the cum of an incubus.", false);
        //Lowlevel changes
        if (changeAmount < 50)
            this.lowLevelChanges(player);
        //Mid-level changes
        if (changeAmount >= 50 && changeAmount < 93)
            this.midLevelChanges(player);
        //High level change
        if (changeAmount >= 93)
            this.highLevelChanges(player);
        //Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && this.tainted)
            this.demonChanges(player);
        player.updateGender();
        if (Utils.rand(4) == 0 && this.tainted)
            MainScreen.text(player.modFem(5, 2), false);
        if (Utils.rand(4) == 0 && this.tainted)
            MainScreen.text(player.modThickness(30, 2), false);
    }

    private lowLevelChanges(player: Player) {
        let cockCount: number = player.lowerBody.cockSpot.count();
        let selectedCock: Cock;
        let cockGrowth: number;
        if (cockCount == 1) {
            cockGrowth= 0;
            selectedCock = player.lowerBody.cockSpot.list[0];
            if (selectedCock.cockType != CockType.DEMON)
                MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " becomes shockingly hard.  It turns a shiny inhuman purple and spasms, dribbling hot demon-like cum as it begins to grow.", false);
            else
                MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " becomes shockingly hard.  It dribbles hot demon-like cum as it begins to grow.", false);
            if (Utils.rand(4) == 0)
                cockGrowth = CockModifier.growCock(player, selectedCock, 3);
            else
                cockGrowth = CockModifier.growCock(player, selectedCock, 3);

            player.stats.int += 1;
            player.stats.lib += 2;
            player.stats.sens += 1;
            player.stats.lust += 5 + cockGrowth * 3;
            player.stats.cor += this.tainted ? 1 : 0;

            if (cockGrowth < .5)
                MainScreen.text("  It stops almost as soon as it starts, growing only a tiny bit longer.", false);
            if (cockGrowth >= .5 && cockGrowth < 1)
                MainScreen.text("  It grows slowly, stopping after roughly half an inch of growth.", false);
            if (cockGrowth >= 1 && cockGrowth <= 2)
                MainScreen.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.", false);
            if (cockGrowth > 2)
                MainScreen.text("  You smile and idly stroke your lengthening " + CockDescriptor.describeCock(player, selectedCock) + " as a few more inches sprout.", false);
            if (selectedCock.cockType != CockType.DEMON)
                MainScreen.text("  With the transformation complete, your " + CockDescriptor.describeCock(player, selectedCock) + " returns to its normal coloration.", false);
            else
                MainScreen.text("  With the transformation complete, your " + CockDescriptor.describeCock(player, selectedCock) + " throbs in an almost happy way as it goes flaccid once more.", false);
        }
        if (cockCount > 1) {
            selectedCock = player.lowerBody.cockSpot.shortestCocks[0];
            cockGrowth = 0;
            if (Utils.rand(4) == 0)
                cockGrowth = CockModifier.growCock(player, selectedCock, 3);
            else
                cockGrowth = CockModifier.growCock(player, selectedCock, 1);

            player.stats.int += 1;
            player.stats.lib += 2;
            player.stats.sens += 1;
            player.stats.lust += 5 + cockGrowth * 3;
            player.stats.cor += this.tainted ? 1 : 0;

            if (player.lowerBody.cockSpot.count() == 2)
                MainScreen.text("\n\nBoth of your " + CockDescriptor.describeMultiCockShort(player) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor.describeCock(player, selectedCock) + " begins to grow.", false);
            else
                MainScreen.text("\n\nAll of your " + CockDescriptor.describeMultiCockShort(player) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor.describeCock(player, selectedCock) + " begins to grow.", false);

            if (cockGrowth < .5)
                MainScreen.text("  It stops almost as soon as it starts, growing only a tiny bit longer.", false);
            if (cockGrowth >= .5 && cockGrowth < 1)
                MainScreen.text("  It grows slowly, stopping after roughly half an inch of growth.", false);
            if (cockGrowth >= 1 && cockGrowth <= 2)
                MainScreen.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.", false);
            if (cockGrowth > 2)
                MainScreen.text("  You smile and idly stroke your lengthening " + CockDescriptor.describeCock(player, selectedCock) + " as a few more inches sprout.", false);
            MainScreen.text("  With the transformation complete, your " + CockDescriptor.describeMultiCockShort(player) + " return to their normal coloration.", false);
        }
        //NO CAWKS?
        if (cockCount == 0) {
            selectedCock = new Cock();
            selectedCock.cockLength = Utils.rand(3) + 4;
            selectedCock.cockThickness = 1;
            player.lowerBody.cockSpot.add(selectedCock);

            MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
            MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor.describeCock(player, selectedCock) + " fades to a more normal " + player.skinTone + " tone.", false);

            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 1 : 0;
        }
        //TIT CHANGE 25% chance of shrinkage
        if (Utils.rand(4) == 0) {
            if (!Flags.get(FlagEnum.HYPER_HAPPY)) {
                BreastModifier.shrinkTits(player);
            }
        }
    }

    private midLevelChanges(player: Player) {
        let cockCount: number = player.lowerBody.cockSpot.count();
        let selectedCock: Cock;
        let cockGrowth: number;
        let cockThickness: number;
        if (cockCount > 1) {
            MainScreen.text("\n\nYour cocks fill to full-size... and begin growing obscenely.  ", false);
            for (let index: number = 0; index < cockCount; index++) {
                selectedCock = player.lowerBody.cockSpot.list[index];
                cockGrowth = CockModifier.growCock(player, selectedCock, Utils.rand(3) + 2);
                cockThickness = CockModifier.thickenCock(selectedCock, 1);
                if (cockThickness < .1)
                    selectedCock.cockThickness += .05;
            }
            CockChangeDescriptor.lengthChange(player, cockGrowth, cockCount);

            //Display the degree of thickness change.
            if (cockThickness >= 1) {
                if (cockCount == 1) MainScreen.text("\n\nYour cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                else MainScreen.text("\n\nYour cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
            }
            if (cockThickness <= .5) {
                if (cockCount > 1) MainScreen.text("\n\nYour cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                else MainScreen.text("\n\nYour cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
            }
            if (cockThickness > .5 && cockGrowth < 1) {
                if (cockCount == 1) MainScreen.text("\n\nYour cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                if (cockCount > 1) MainScreen.text("\n\nYour cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
            }
            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount == 1) {
            MainScreen.text("\n\nYour cock fills to its normal size and begins growing... ", false);
            selectedCock = player.lowerBody.cockSpot.list[0];
            cockThickness = CockModifier.thickenCock(selectedCock, 1);
            cockGrowth = CockModifier.growCock(player, selectedCock, Utils.rand(3) + 2);
            CockChangeDescriptor.lengthChange(player, cockGrowth, cockCount);
            //Display the degree of thickness change.
            if (cockThickness >= 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                else MainScreen.text("  Your cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
            }
            if (cockThickness <= .5) {
                if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                else MainScreen.text("  Your cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
            }
            if (cockThickness > .5 && cockGrowth < 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
            }
            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount == 0) {
            selectedCock = new Cock();
            selectedCock.cockLength = Utils.rand(3) + 4;
            selectedCock.cockThickness = 1;
            player.lowerBody.cockSpot.add(selectedCock);

            MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
            MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor.describeCock(player, selectedCock) + " fades to a more normal " + player.skinTone + " tone.", false);

            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 3 : 0;
        }
        //Shrink breasts a more
        //TIT CHANGE 50% chance of shrinkage
        if (Utils.rand(2) == 0) {
            if (!Flags.get(FlagEnum.HYPER_HAPPY)) {
                BreastModifier.shrinkTits(player);
            }
        }
    }

    private highLevelChanges(player: Player) {
        if (player.lowerBody.cockSpot.count() < 10) {
            if (Utils.rand(10) < Math.floor(player.stats.cor / 25)) {
                MainScreen.text("\n\n", false);
                this.growDemonCock(player, Utils.rand(2) + 2);
                player.stats.lib += 3;
                player.stats.sens += 5;
                player.stats.lust += 10;
                player.stats.cor += this.tainted ? 5 : 0;
            }
            else {
                this.growDemonCock(player, 1);
            }
        }
        if (!Flags.get(FlagEnum.HYPER_HAPPY)) {
            BreastModifier.shrinkTits(player);
            BreastModifier.shrinkTits(player);
        }
    }

    public growDemonCock(player: Player, growCocks: number): void {
        let numOfCockGrown: number = 0;
        let cock: Cock;
        while (growCocks > 0) {
            cock = new Cock();
            console.trace("COCK LENGTH: " + cock.cockLength);
            cock.cockLength = Utils.rand(3) + 4;
            cock.cockThickness = .75;
            console.trace("COCK LENGTH: " + cock.cockLength);
            player.lowerBody.cockSpot.add(cock);
            growCocks--;
            numOfCockGrown++;
        }
        MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
        if (numOfCockGrown == 1)
            MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  In time it fades to a more normal coloration and human-like texture.  ", false);
        else 
            MainScreen.text("The skin bulges obscenely, darkening and splitting around " + Utils.numToCardinalText(numOfCockGrown) + " of your new dicks.  For an instant they turn a demonic purple and dribble in thick spasms of scalding demon-cum.  After, they return to a more humanoid coloration.  ", false);
        if (numOfCockGrown > 4)
            MainScreen.text("Your tender bundle of new cocks feels deliciously sensitive, and you cannot stop yourself from wrapping your hands around the slick demonic bundle and pleasuring them.\n\nNearly an hour later, you finally pull your slick body away from the puddle you left on the ground.  When you look back, you notice it has already been devoured by the hungry earth.", false);
        player.orgasm();
    }

    public demonChanges(player: Player): void {
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
            MainScreen.text("\n\nSomething invisible brushes against your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.list[0]) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
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
                    MainScreen.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LowerBodyDescriptor.describeFeet(player.lowerBody) + ". Something hard breaks through your sole from the inside out as your toes splinter and curve cruelly. The pain slowly diminishes and your eyes look along a human leg that splinters at the foot into a claw with sharp black nails. When you relax, your feet grip the ground easily. <b>Your feet are now formed into demonic claws.</b>", false);
                    player.lowerBody.type = LowerBodyType.DEMONIC_CLAWS;
                }
            }
            //Females/futa get high heels
            else if (player.lowerBody.type != LowerBodyType.DEMONIC_HIGH_HEELS) {
                MainScreen.text("\n\n", false);
                MainScreen.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LowerBodyDescriptor.describeFeet(player.lowerBody) + ". Something hard breaks through your sole from the inside out. The pain slowly diminishes and your eyes look along a human leg to a thin and sharp horn protruding from the heel. When you relax, your feet are pointing down and their old posture is only possible with an enormous effort. <b>Your feet are now formed into demonic high-heels.</b> Tentatively you stand up and try to take a few steps. To your surprise you feel as if you were born with this and stride vigorously forward, hips swaying.", false);
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
                MainScreen.text("A knot of pain forms in your shoulders as they tense up.  With a surprising force, a pair of small demonic wings sprout from your back, ripping a pair of holes in the back of your " + player.inventory.armor.displayName + ".  <b>You now have tiny demonic wings</b>.", false);
                player.upperBody.wingType = WingType.BAT_LIKE_TINY;
                player.upperBody.wingDesc = "tiny, bat-like";
            }

        }
    }

}