import Menu from './Menu';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { Gender } from '../../Body/GenderIdentity';
import { AntennaeType } from '../../Body/Head';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BodyDescriptor from '../../Descriptors/BodyDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import FaceDescriptor from '../../Descriptors/FaceDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import HipDescriptor from '../../Descriptors/HipDescriptor';
import LegDescriptor from '../../Descriptors/LegDescriptor';
import SkinDescriptor from '../../Descriptors/SkinDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import CockSockName from '../../Items/Misc/CockSockName';
import { PiercingType } from '../../Items/Misc/Piercing';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import DisplayText from '../DisplayText';

export default class PlayerAppearanceMenu implements Menu {
    public display(player: Player) {
        this.heightRace(player);
        DisplayText("\n\n");
        this.face(player);
        DisplayText("\n\n");
        this.eyes(player);
        DisplayText("\n\n");
        this.hair(player);
        DisplayText("\n\n");
        this.tongue(player);
        DisplayText("\n\n");
        this.horns(player);
        DisplayText("\n\n");
        this.wings(player);
        DisplayText("\n\n");
        this.hips(player);
        DisplayText("\n\n");
        this.butt(player);
        DisplayText("\n\n");
        this.tail(player);
        DisplayText("\n\n");
        this.lowerBody(player);
        DisplayText("\n\n");
        this.pregnancy(player);
        DisplayText("\n\n");
        this.neck(player);
        DisplayText("\n\n");
        this.chest(player);
        DisplayText("\n\n");
        this.lowerBodySex(player);
        DisplayText("\n\n");
        this.cocks(player);
        DisplayText("\n\n");
        this.balls(player);
        DisplayText("\n\n");
        this.vaginas(player);
        DisplayText("\n\n");
        this.noReproductiveOrgans(player);
        DisplayText("\n\n");
        this.butthole(player);
        DisplayText("\n\n");
        this.piercing(player);
        DisplayText("\n\n");
        this.gems(player);
    }

    private heightRace(player: Player) {
        // Determine race type:
        const race: string = BodyDescriptor.describeRace(player);
        // Discuss race
        DisplayText().clear();
        if (race !== "human") DisplayText("You began your journey as a human, but gave that up as you explored the dangers of this realm.  ");
        // Height and race.
        DisplayText("You are a " + Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall " + race + ", with " + BodyDescriptor.describeBody(player) + ".");
        if (player.inventory.equipment.armor.displayName === "comfortable clothes")
            DisplayText("  You are currently wearing " + player.inventory.equipment.armor.displayName + " and using your " + player.inventory.equipment.weapon.displayname + " as a weapon.").bold();
        else DisplayText("  You are currently wearing your " + player.inventory.equipment.armor.displayName + " and using your " + player.inventory.equipment.weapon.displayname + " as a weapon.").bold();
    }

    private face(player: Player) {
        if (player.torso.neck.head.face.type === FaceType.HUMAN || player.torso.neck.head.face.type === FaceType.SHARK_TEETH || player.torso.neck.head.face.type === FaceType.BUNNY || player.torso.neck.head.face.type === FaceType.SPIDER_FANGS || player.torso.neck.head.face.type === FaceType.FERRET_MASK) {
            if (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO)
                DisplayText("  Your face is human in shape and structure, with " + SkinDescriptor.skin(player) + ".");
            if (player.skin.type === SkinType.FUR)
                DisplayText("  Under your " + SkinDescriptor.skinFurScales(player) + " you have a human-shaped head with " + SkinDescriptor.skin(player, true) + ".");
            if (player.skin.type === SkinType.SCALES)
                DisplayText("  Your face is fairly human in shape, but is covered in " + SkinDescriptor.skin(player) + ".");
            if (player.torso.neck.head.face.type === FaceType.SHARK_TEETH)
                DisplayText("  A set of razor-sharp, retractable shark-teeth fill your mouth and gives your visage a slightly angular appearance.");
            else if (player.torso.neck.head.face.type === FaceType.BUNNY)
                DisplayText("  The constant twitches of your nose and the length of your incisors gives your visage a hint of bunny-like cuteness.");
            else if (player.torso.neck.head.face.type === FaceType.SPIDER_FANGS)
                DisplayText("  A set of retractable, needle-like fangs sit in place of your canines and are ready to dispense their venom.");
            else if (player.torso.neck.head.face.type === FaceType.FERRET_MASK)
                DisplayText("  The [skinFurScales] around your eyes is significantly darker than the rest of your face, giving you a cute little ferret mask.");
        }
        else if (player.torso.neck.head.face.type === FaceType.FERRET) {
            if (player.skin.type === SkinType.PLAIN)
                DisplayText("  Your face is an adorable cross between human and ferret features, complete with a wet nose and whiskers.  The only oddity is your lack of fur, leaving only [skin] visible on your ferret-like face.");
            else
                DisplayText("  Your face is coated in " + player.torso.neck.head.hair.color + " fur with [skin] underneath, an adorable cross between human and ferret features.  It is complete with a wet nose and whiskers.");
        }
        else if (player.torso.neck.head.face.type === FaceType.RACCOON_MASK) {
            // appearance for skinheads
            if (player.skin.type !== SkinType.FUR && player.skin.type !== SkinType.SCALES) {
                DisplayText("  Your face is human in shape and structure, with " + SkinDescriptor.skin(player));
                if ((player.skin.tone === "ebony" || player.skin.tone === "black") && (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO))
                    DisplayText(", though with your dusky hue, the black raccoon mask you sport isn't properly visible.");
                else DisplayText(", though it is decorated with a sly-looking raccoon mask over your eyes.");
            }
            // appearance furscales
            else {
                // (black/midnight furscales)
                if (((player.torso.neck.head.hair.color === "black" || player.torso.neck.head.hair.color === "midnight") && (player.skin.type === SkinType.FUR || player.skin.type === SkinType.SCALES)))
                    DisplayText("  Under your " + SkinDescriptor.skinFurScales(player) + " hides a black raccoon mask, barely visible due to your inky hue, and");
                else DisplayText("  Your " + SkinDescriptor.skinFurScales(player) + " are decorated with a sly-looking raccoon mask, and under them");
                DisplayText(" you have a human-shaped head with " + SkinDescriptor.skin(player, true) + ".");
            }
        }
        else if (player.torso.neck.head.face.type === FaceType.RACCOON) {
            DisplayText("  You have a triangular raccoon face, replete with sensitive whiskers and a little black nose; a mask shades the space around your eyes, set apart from your " + SkinDescriptor.skinFurScales(player) + " by a band of white.");
            // (if skin)
            if (player.skin.type === SkinType.PLAIN)
                DisplayText("  It looks a bit strange with only the skin and no fur.");
            else if (player.skin.type === SkinType.SCALES)
                DisplayText("  The presence of said scales gives your visage an eerie look, more reptile than mammal.");
        }
        else if (player.torso.neck.head.face.type === FaceType.FOX) {
            DisplayText("  You have a tapered, shrewd-looking vulpine face with a speckling of downward-curved whiskers just behind the nose.");
            if (player.skin.type === SkinType.PLAIN)
                DisplayText("  Oddly enough, there's no fur on your animalistic muzzle, just " + SkinDescriptor.skinFurScales(player) + ".");
            else if (player.skin.type === SkinType.FUR)
                DisplayText("  A coat of " + SkinDescriptor.skinFurScales(player) + " decorates your muzzle.");
            else if (player.skin.type === SkinType.SCALES)
                DisplayText("  Strangely, " + SkinDescriptor.skinFurScales(player) + " adorn every inch of your animalistic visage.");
        }
        else if (player.torso.neck.head.face.type === FaceType.BUCKTEETH) {
            // appearance
            DisplayText("  Your face is generally human in shape and structure, with " + SkinDescriptor.skin(player));
            if (player.skin.type === SkinType.FUR || player.skin.type === SkinType.SCALES)
                DisplayText(" under your " + SkinDescriptor.skinFurScales(player));
            DisplayText(" and mousey buckteeth.");
        }
        else if (player.torso.neck.head.face.type === FaceType.MOUSE) {
            // appearance
            DisplayText("  You have a snubby, tapered mouse's face, with whiskers, a little pink nose, and ");
            if (player.skin.type !== SkinType.FUR && player.skin.type !== SkinType.SCALES)
                DisplayText(SkinDescriptor.skin(player));
            else DisplayText(SkinDescriptor.skin(player) + " under your " + SkinDescriptor.skinFurScales(player));
            DisplayText(".  Two large incisors complete it.");
        }
        // Naga
        if (player.torso.neck.head.face.type === FaceType.SNAKE_FANGS) {
            if (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO)
                DisplayText("  You have a fairly normal face, with " + SkinDescriptor.skin(player) + ".  The only oddity is your pair of dripping fangs which often hang over your lower lip.");
            if (player.skin.type === SkinType.FUR)
                DisplayText("  Under your " + SkinDescriptor.skinFurScales(player) + " you have a human-shaped head with " + SkinDescriptor.skin(player, true) + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.");
            if (player.skin.type === SkinType.SCALES)
                DisplayText("  Your face is fairly human in shape, but is covered in " + SkinDescriptor.skinFurScales(player) + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.");
        }
        // horse-face
        if (player.torso.neck.head.face.type === FaceType.HORSE) {
            if (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO)
                DisplayText("  Your face is equine in shape and structure.  The odd visage is hairless and covered with " + SkinDescriptor.skinFurScales(player) + ".");
            if (player.skin.type === SkinType.FUR)
                DisplayText("  Your face is almost entirely equine in appearance, even having " + SkinDescriptor.skinFurScales(player) + ".  Underneath the fur, you believe you have " + SkinDescriptor.skin(player, true) + ".");
            if (player.skin.type === SkinType.SCALES)
                DisplayText("  You have the face and head structure of a horse, overlaid with glittering " + SkinDescriptor.skinFurScales(player) + ".");
        }
        // dog-face
        if (player.torso.neck.head.face.type === FaceType.DOG) {
            if (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO)
                DisplayText("  You have a dog-like face, complete with a wet nose.  The odd visage is hairless and covered with " + SkinDescriptor.skinFurScales(player) + ".");
            if (player.skin.type === SkinType.FUR)
                DisplayText("  You have a dog's face, complete with wet nose and panting tongue.  You've got " + SkinDescriptor.skinFurScales(player) + ", hiding your " + SkinDescriptor.skin(player, true) + " underneath your furry visage.");
            if (player.skin.type === SkinType.SCALES)
                DisplayText("  You have the facial structure of a dog, wet nose and all, but overlaid with glittering " + SkinDescriptor.skinFurScales(player) + ".");
        }
        // cat-face
        if (player.torso.neck.head.face.type === FaceType.CAT) {
            if (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO)
                DisplayText("  You have a cat-like face, complete with a cute, moist nose and whiskers.  The " + SkinDescriptor.skin(player) + " that is revealed by your lack of fur looks quite unusual on so feline a face.");
            if (player.skin.type === SkinType.FUR)
                DisplayText("  You have a cat-like face, complete with moist nose and whiskers.  Your " + player.skin.desc + " is " + player.torso.neck.head.hair.color + ", hiding your " + SkinDescriptor.skin(player, true) + " underneath.");
            if (player.skin.type === SkinType.SCALES)
                DisplayText("  Your facial structure blends humanoid features with those of a cat.  A moist nose and whiskers are included, but overlaid with glittering " + SkinDescriptor.skinFurScales(player) + ".");
            if (player.torso.neck.head.face.eyes.type !== EyeType.BLACK_EYES_SAND_TRAP)
                DisplayText("  Of course, no feline face would be complete without vertically slit eyes.");
        }
        // Minotaaaauuuur-face
        if (player.torso.neck.head.face.type === FaceType.COW_MINOTAUR) {
            if (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO)
                DisplayText("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Despite your lack of fur elsewhere, your visage does have a short layer of " + player.torso.neck.head.hair.color + " fuzz.");
            if (player.skin.type === SkinType.FUR)
                DisplayText("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Your " + SkinDescriptor.skinFurScales(player) + " thickens noticably on your head, looking shaggy and more than a little monstrous once laid over your visage.");
            if (player.skin.type === SkinType.SCALES)
                DisplayText("  Your face resembles a minotaur's, though strangely it is covered in shimmering scales, right up to the flat cow-like nose that protrudes from your face.");
        }
        // Lizard-face
        if (player.torso.neck.head.face.type === FaceType.LIZARD) {
            if (player.skin.type === SkinType.PLAIN || player.skin.type === SkinType.GOO)
                DisplayText("  You have a face resembling that of a lizard, and with your toothy maw, you have quite a fearsome visage.  The reptilian visage does look a little odd with just " + SkinDescriptor.skin(player) + ".");
            if (player.skin.type === SkinType.FUR)
                DisplayText("  You have a face resembling that of a lizard.  Between the toothy maw, pointed snout, and the layer of " + SkinDescriptor.skinFurScales(player) + " covering your face, you have quite the fearsome visage.");
            if (player.skin.type === SkinType.SCALES)
                DisplayText("  Your face is that of a lizard, complete with a toothy maw and pointed snout.  Reflective " + SkinDescriptor.skinFurScales(player) + " complete the look, making you look quite fearsome.");
        }
        if (player.torso.neck.head.face.type === FaceType.DRAGON) {
            DisplayText("  Your face is a narrow, reptilian muzzle.  It looks like a predatory lizard's, at first glance, but with an unusual array of spikes along the under-jaw.  It gives you a regal but fierce visage.  Opening your mouth reveals several rows of dagger-like sharp teeth.  The fearsome visage is decorated by " + SkinDescriptor.skinFurScales(player) + ".");
        }
        if (player.torso.neck.head.face.type === FaceType.KANGAROO) {
            DisplayText("  Your face is ");
            if (player.skin.type === SkinType.PLAIN)
                DisplayText("bald");
            else DisplayText("covered with " + SkinDescriptor.skinFurScales(player));
            DisplayText(" and shaped like that of a kangaroo, somewhat rabbit-like except for the extreme length of your odd visage.");
        }
        // M/F stuff!
        DisplayText("  It has " + FaceDescriptor.describeFace(player) + ".");
    }

    private eyes(player: Player) {
        if (player.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES)
            DisplayText("  In addition to your primary two eyes, you have a second, smaller pair on your forehead.");
        else if (player.torso.neck.head.face.eyes.type === EyeType.BLACK_EYES_SAND_TRAP)
            DisplayText("  Your eyes are solid spheres of inky, alien darkness.");
    }

    private hair(player: Player) {
        // if bald
        if (player.torso.neck.head.hair.length === 0) {
            if (player.skin.type === SkinType.FUR)
                DisplayText("  You have no hair, only a thin layer of fur atop of your head.  ");
            else DisplayText("  You are totally bald, showing only shiny " + player.skin.tone + " " + player.skin.desc + " where your hair should be.");
            if (player.torso.neck.head.ears.type === EarType.HORSE)
                DisplayText("  A pair of horse-like ears rise up from the top of your head.");
            else if (player.torso.neck.head.ears.type === EarType.FERRET)
                DisplayText("  A pair of small, rounded ferret ears sit on top of your head.");
            else if (player.torso.neck.head.ears.type === EarType.DOG)
                DisplayText("  A pair of dog ears protrude from your skull, flopping down adorably.");
            else if (player.torso.neck.head.ears.type === EarType.COW)
                DisplayText("  A pair of round, floppy cow ears protrude from the sides of your skull.");
            else if (player.torso.neck.head.ears.type === EarType.ELFIN)
                DisplayText("  A pair of large pointy ears stick out from your skull.");
            else if (player.torso.neck.head.ears.type === EarType.CAT)
                DisplayText("  A pair of cute, fuzzy cat ears have sprouted from the top of your head.");
            else if (player.torso.neck.head.ears.type === EarType.LIZARD)
                DisplayText("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.");
            else if (player.torso.neck.head.ears.type === EarType.BUNNY)
                DisplayText("  A pair of floppy rabbit ears stick up from the top of your head, flopping around as you walk.");
            else if (player.torso.neck.head.ears.type === EarType.FOX)
                DisplayText("  A pair of large, adept fox ears sit high on your head, always listening.");
            else if (player.torso.neck.head.ears.type === EarType.DRAGON)
                DisplayText("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.");
            else if (player.torso.neck.head.ears.type === EarType.RACCOON)
                DisplayText("  A pair of vaguely egg-shaped, furry raccoon ears adorns your head.");
            else if (player.torso.neck.head.ears.type === EarType.MOUSE)
                DisplayText("  A pair of large, dish-shaped mouse ears tops your head.");
            if (player.torso.neck.head.antennae === AntennaeType.BEE)
                DisplayText("  Floppy antennae also appear on your skull, bouncing and swaying in the breeze.");
        }
        // not bald
        else {
            if (player.torso.neck.head.ears.type === EarType.HUMAN)
                DisplayText("  Your " + HeadDescriptor.describeHair(player) + " looks good on you, accentuating your features well.");
            else if (player.torso.neck.head.ears.type === EarType.FERRET)
                DisplayText("  A pair of small, rounded ferret ears burst through the top of your " + HeadDescriptor.describeHair(player) + ".");
            else if (player.torso.neck.head.ears.type === EarType.HORSE)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " on your head parts around a pair of very horse-like ears that grow up from your head.");
            else if (player.torso.neck.head.ears.type === EarType.DOG)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " on your head is overlapped by a pair of pointed dog ears.");
            else if (player.torso.neck.head.ears.type === EarType.COW)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of rounded cow ears that stick out sideways.");
            else if (player.torso.neck.head.ears.type === EarType.ELFIN)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of cute pointed ears, bigger than your old human ones.");
            else if (player.torso.neck.head.ears.type === EarType.CAT)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of cute, fuzzy cat ears, sprouting from atop your head and pivoting towards any sudden noises.");
            else if (player.torso.neck.head.ears.type === EarType.LIZARD)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " atop your head makes it nigh-impossible to notice the two small rounded openings that are your ears.");
            else if (player.torso.neck.head.ears.type === EarType.BUNNY)
                DisplayText("  A pair of floppy rabbit ears stick up out of your " + HeadDescriptor.describeHair(player) + ", bouncing around as you walk.");
            else if (player.torso.neck.head.ears.type === EarType.KANGAROO)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of long, furred kangaroo ears that stick out at an angle.");
            else if (player.torso.neck.head.ears.type === EarType.FOX)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of large, adept fox ears that always seem to be listening.");
            else if (player.torso.neck.head.ears.type === EarType.DRAGON)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.");
            else if (player.torso.neck.head.ears.type === EarType.RACCOON)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " on your head parts around a pair of egg-shaped, furry raccoon ears.");
            else if (player.torso.neck.head.ears.type === EarType.MOUSE)
                DisplayText("  The " + HeadDescriptor.describeHair(player) + " atop your head is funneled between and around a pair of large, dish-shaped mouse ears that stick up prominently.");
            if (player.torso.neck.head.antennae === AntennaeType.BEE) {
                if (player.torso.neck.head.ears.type === EarType.BUNNY)
                    DisplayText("  Limp antennae also grow from just behind your hairline, waving and swaying in the breeze with your ears.");
                else DisplayText("  Floppy antennae also grow from just behind your hairline, bouncing and swaying in the breeze.");
            }
        }
    }

    private tongue(player: Player) {
        if (player.torso.neck.head.face.tongue.type === TongueType.SNAKE)
            DisplayText("  A snake-like tongue occasionally flits between your lips, tasting the air.");
        else if (player.torso.neck.head.face.tongue.type === TongueType.DEMONIC)
            DisplayText("  A slowly undulating tongue occasionally slips from between your lips.  It hangs nearly two feet long when you let the whole thing slide out, though you can retract it to appear normal.");
        else if (player.torso.neck.head.face.tongue.type === TongueType.DRACONIC)
            DisplayText("  Your mouth contains a thick, fleshy tongue that, if you so desire, can telescope to a distance of about four feet.  It has sufficient manual dexterity that you can use it almost like a third arm.");
    }

    private horns(player: Player) {
        // Demonic horns
        if (player.torso.neck.head.horns.type === HornType.DEMON) {
            if (player.torso.neck.head.horns.amount === 2)
                DisplayText("  A small pair of pointed horns has broken through the " + player.skin.desc + " on your forehead, proclaiming some demonic taint to any who see them.");
            if (player.torso.neck.head.horns.amount === 4)
                DisplayText("  A quartet of prominent horns has broken through your " + player.skin.desc + ".  The back pair are longer, and curve back along your head.  The front pair protrude forward demonically.");
            if (player.torso.neck.head.horns.amount === 6)
                DisplayText("  Six horns have sprouted through your " + player.skin.desc + ", the back two pairs curve backwards over your head and down towards your neck, while the front two horns stand almost eight inches long upwards and a little forward.");
            if (player.torso.neck.head.horns.amount >= 8)
                DisplayText("  A large number of thick demonic horns sprout through your " + player.skin.desc + ", each pair sprouting behind the ones before.  The front jut forwards nearly ten inches while the rest curve back over your head, some of the points ending just below your ears.  You estimate you have a total of " + Utils.numToCardinalText(player.torso.neck.head.horns.amount) + " horns.");
        }
        // Minotaur horns
        if (player.torso.neck.head.horns.type === HornType.COW_MINOTAUR) {
            if (player.torso.neck.head.horns.amount < 3)
                DisplayText("  Two tiny horn-like nubs protrude from your forehead, resembling the horns of the young livestock kept by your village.");
            if (player.torso.neck.head.horns.amount >= 3 && player.torso.neck.head.horns.amount < 6)
                DisplayText("  Two moderately sized horns grow from your forehead, similar in size to those on a young bovine.");
            if (player.torso.neck.head.horns.amount >= 6 && player.torso.neck.head.horns.amount < 12)
                DisplayText("  Two large horns sprout from your forehead, curving forwards like those of a bull.");
            if (player.torso.neck.head.horns.amount >= 12 && player.torso.neck.head.horns.amount < 20)
                DisplayText("  Two very large and dangerous looking horns sprout from your head, curving forward and over a foot long.  They have dangerous looking points.");
            if (player.torso.neck.head.horns.amount >= 20)
                DisplayText("  Two huge horns erupt from your forehead, curving outward at first, then forwards.  The weight of them is heavy, and they end in dangerous looking points.");
        }
        // Lizard horns
        if (player.torso.neck.head.horns.type === HornType.DRACONIC_X2) {
            DisplayText("  A pair of " + Utils.numToCardinalText(player.torso.neck.head.horns.amount) + " inch horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.");
        }
        // Super lizard horns
        if (player.torso.neck.head.horns.type === HornType.DRACONIC_X4_12_INCH_LONG)
            DisplayText("  Two pairs of horns, roughly a foot long, sprout from the sides of your head.  They sweep back and give you a fearsome look, almost like the dragons from your village's legends.");
        // Antlers!
        if (player.torso.neck.head.horns.type === HornType.ANTLERS) {
            if (player.torso.neck.head.horns.amount > 0)
                DisplayText("  Two antlers, forking into " + Utils.numToCardinalText(player.torso.neck.head.horns.amount) + " points, have sprouted from the top of your head, forming a spiky, regal crown of bone.");
        }
        // BODY PG HERE
        DisplayText("You have a humanoid shape with the usual torso, arms, hands, and fingers.");
    }

    private wings(player: Player) {
        if (player.torso.wings.type === WingType.BEE_LIKE_SMALL)
            DisplayText("  A pair of tiny-yet-beautiful bee-wings sprout from your back, too small to allow you to fly.");
        if (player.torso.wings.type === WingType.BEE_LIKE_LARGE)
            DisplayText("  A pair of large bee-wings sprout from your back, reflecting the light through their clear membranes beautifully.  They flap quickly, allowing you to easily hover in place or fly.");
        if (player.torso.wings.type === WingType.BAT_LIKE_TINY)
            DisplayText("  A pair of tiny bat-like demon-wings sprout from your back, flapping cutely, but otherwise being of little use.");
        if (player.torso.wings.type === WingType.BAT_LIKE_LARGE)
            DisplayText("  A pair of large bat-like demon-wings fold behind your shoulders.  With a muscle-twitch, you can extend them, and use them to soar gracefully through the air.");
        if (player.torso.wings.type === WingType.SHARK_FIN)
            DisplayText("  A large shark-like fin has sprouted between your shoulder blades.  With it you have far more control over swimming underwater.");
        if (player.torso.wings.type === WingType.FEATHERED_LARGE)
            DisplayText("  A pair of large, feathery wings sprout from your back.  Though you usually keep the " + player.torso.neck.head.hair.color + "-colored wings folded close, they can unfurl to allow you to soar as gracefully as a harpy.");
        if (player.torso.wings.type === WingType.DRACONIC_SMALL)
            DisplayText("  Small, vestigial wings sprout from your shoulders.  They might look like bat's wings, but the membranes are covered in fine, delicate scales.");
        else if (player.torso.wings.type === WingType.DRACONIC_LARGE)
            DisplayText("  Magnificent wings sprout from your shoulders.  When unfurled they stretch further than your arm span, and a single beat of them is all you need to set out toward the sky.  They look a bit like bat's wings, but the membranes are covered in fine, delicate scales and a wicked talon juts from the end of each bone.");
        else if (player.torso.wings.type === WingType.GIANT_DRAGONFLY)
            DisplayText("  Giant dragonfly wings hang from your shoulders.  At a whim, you could twist them into a whirring rhythm fast enough to lift you off the ground and allow you to fly.");

        // Wing arms
        if (player.torso.arms.type === ArmType.HARPY)
            DisplayText("  Feathers hang off your arms from shoulder to wrist, giving them a slightly wing-like look.");
        else if (player.torso.arms.type === ArmType.SPIDER)
            DisplayText("  Shining black exoskeleton  covers your arms from the biceps down, resembling a pair of long black gloves from a distance.");
    }

    private hips(player: Player) {
        if (player.torso.hips.legs.type === LegType.PONY)
            DisplayText("  From the waist down you have an incredibly cute and cartoonish parody of a horse's body, with all four legs ending in flat, rounded feet.");
        else if (player.torso.hips.legs.isTaur())
            DisplayText("  From the waist down you have the body of a horse, with all four legs capped by hooves.");
        // Hip info only displays if you aren't a centaur.
        if (!player.torso.hips.legs.isTaur()) {
            if (player.thickness > 70) {
                DisplayText("  You have " + HipDescriptor.describeHips(player));
                if (player.torso.hips.rating < 6) {
                    if (player.tone < 65)
                        DisplayText(" buried under a noticeable muffin-top, and");
                    else DisplayText(" that blend into your pillar-like waist, and");
                }
                if (player.torso.hips.rating >= 6 && player.torso.hips.rating < 10)
                    DisplayText(" that blend into the rest of your thick form, and");
                if (player.torso.hips.rating >= 10 && player.torso.hips.rating < 15)
                    DisplayText(" that would be much more noticeable if you weren't so wide-bodied, and");
                if (player.torso.hips.rating >= 15 && player.torso.hips.rating < 20)
                    DisplayText(" that sway and emphasize your thick, curvy shape, and");
                if (player.torso.hips.rating >= 20)
                    DisplayText(" that sway hypnotically on your extra-curvy frame, and");
            }
            else if (player.thickness < 30) {
                DisplayText("  You have " + HipDescriptor.describeHips(player));
                if (player.torso.hips.rating < 6)
                    DisplayText(" that match your trim, lithe body, and");
                if (player.torso.hips.rating >= 6 && player.torso.hips.rating < 10)
                    DisplayText(" that sway to and fro, emphasized by your trim body, and");
                if (player.torso.hips.rating >= 10 && player.torso.hips.rating < 15)
                    DisplayText(" that swell out under your trim waistline, and");
                if (player.torso.hips.rating >= 15 && player.torso.hips.rating < 20)
                    DisplayText(", emphasized by your narrow waist, and");
                if (player.torso.hips.rating >= 20)
                    DisplayText(" that swell disproportionately wide on your lithe frame, and");
            }
            // STANDARD
            else {
                DisplayText("  You have " + HipDescriptor.describeHips(player));
                if (player.torso.hips.rating < 6)
                    DisplayText(", and");
                if (player.femininity > 50) {
                    if (player.torso.hips.rating >= 6 && player.torso.hips.rating < 10)
                        DisplayText(" that draw the attention of those around you, and");
                    if (player.torso.hips.rating >= 10 && player.torso.hips.rating < 15)
                        DisplayText(" that make you walk with a sexy, swinging gait, and");
                    if (player.torso.hips.rating >= 15 && player.torso.hips.rating < 20)
                        DisplayText(" that make it look like you've birthed many children, and");
                    if (player.torso.hips.rating >= 20)
                        DisplayText(" that make you look more like an animal waiting to be bred than any kind of human, and");
                }
                else {
                    if (player.torso.hips.rating >= 6 && player.torso.hips.rating < 10)
                        DisplayText(" that give you a graceful stride, and");
                    if (player.torso.hips.rating >= 10 && player.torso.hips.rating < 15)
                        DisplayText(" that add a little feminine swing to your gait, and");
                    if (player.torso.hips.rating >= 15 && player.torso.hips.rating < 20)
                        DisplayText(" that force you to sway and wiggle as you move, and");
                    if (player.torso.hips.rating >= 20) {
                        DisplayText(" that give your ");
                        if (player.torso.balls.quantity > 0)
                            DisplayText("balls plenty of room to breathe");
                        else if (player.torso.cocks.count > 0)
                            DisplayText(CockDescriptor.describeMultiCock(player) + " plenty of room to swing");
                        else if (player.torso.vaginas.count > 0)
                            DisplayText(VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " a nice, wide berth");
                        else DisplayText("vacant groin plenty of room");
                        DisplayText(", and");
                    }
                }
            }
        }
    }

    private butt(player: Player) {
        if (player.torso.hips.legs.isTaur()) {
            // FATBUTT
            if (player.tone < 65) {
                DisplayText("  Your " + ButtDescriptor.describeButt(player));
                if (player.torso.butt.rating < 4)
                    DisplayText(" is lean, from what you can see of it.");
                if (player.torso.butt.rating >= 4 && player.torso.butt.rating < 6)
                    DisplayText(" looks fairly average.");
                if (player.torso.butt.rating >= 6 && player.torso.butt.rating < 10)
                    DisplayText(" is fairly plump and healthy.");
                if (player.torso.butt.rating >= 10 && player.torso.butt.rating < 15)
                    DisplayText(" jiggles a bit as you trot around.");
                if (player.torso.butt.rating >= 15 && player.torso.butt.rating < 20)
                    DisplayText(" jiggles and wobbles as you trot about.");
                if (player.torso.butt.rating >= 20)
                    DisplayText(" is obscenely large, bordering freakish, even for a horse.");
            }
            // GIRL LOOK AT DAT BOOTY
            else {
                DisplayText("  Your " + ButtDescriptor.describeButt(player));
                if (player.torso.butt.rating < 4)
                    DisplayText(" is barely noticable, showing off the muscles of your haunches.");
                if (player.torso.butt.rating >= 4 && player.torso.butt.rating < 6)
                    DisplayText(" matches your toned equine frame quite well.");
                if (player.torso.butt.rating >= 6 && player.torso.butt.rating < 10)
                    DisplayText(" gives hints of just how much muscle you could put into a kick.");
                if (player.torso.butt.rating >= 10 && player.torso.butt.rating < 15)
                    DisplayText(" surges with muscle whenever you trot about.");
                if (player.torso.butt.rating >= 15 && player.torso.butt.rating < 20)
                    DisplayText(" flexes its considerable mass as you move.");
                if (player.torso.butt.rating >= 20)
                    DisplayText(" is stacked with layers of muscle, huge even for a horse.");
            }
        }
        // Non-horse PCs
        else {
            // TUBBY ASS
            if (player.tone < 60) {
                DisplayText(" your " + ButtDescriptor.describeButt(player));
                if (player.torso.butt.rating < 4)
                    DisplayText(" looks great under your gear.");
                if (player.torso.butt.rating >= 4 && player.torso.butt.rating < 6)
                    DisplayText(" has the barest amount of sexy jiggle.");
                if (player.torso.butt.rating >= 6 && player.torso.butt.rating < 10)
                    DisplayText(" fills out your clothing nicely.");
                if (player.torso.butt.rating >= 10 && player.torso.butt.rating < 15)
                    DisplayText(" wobbles enticingly with every step.");
                if (player.torso.butt.rating >= 15 && player.torso.butt.rating < 20)
                    DisplayText(" wobbles like a bowl full of jello as you walk.");
                if (player.torso.butt.rating >= 20)
                    DisplayText(" is obscenely large, bordering freakish, and makes it difficult to run.");
            }
            // FITBUTT
            else {
                DisplayText(" your " + ButtDescriptor.describeButt(player));
                if (player.torso.butt.rating < 4)
                    DisplayText(" molds closely against your form.");
                if (player.torso.butt.rating >= 4 && player.torso.butt.rating < 6)
                    DisplayText(" contracts with every motion, displaying the detailed curves of its lean musculature.");
                if (player.torso.butt.rating >= 6 && player.torso.butt.rating < 10)
                    DisplayText(" fills out your clothing nicely.");
                if (player.torso.butt.rating >= 10 && player.torso.butt.rating < 15)
                    DisplayText(" stretches your gear, flexing it with each step.");
                if (player.torso.butt.rating >= 15 && player.torso.butt.rating < 20)
                    DisplayText(" threatens to bust out from under your kit each time you clench it.");
                if (player.torso.butt.rating >= 20)
                    DisplayText(" is marvelously large, but completely stacked with muscle.");
            }
        }
    }

    private tail(player: Player) {
        if (player.torso.tails.reduce(Tail.HasType(TailType.HORSE), false))
            DisplayText("  A long " + player.torso.neck.head.hair.color + " horsetail hangs from your " + ButtDescriptor.describeButt(player) + ", smooth and shiny.");
        if (player.torso.tails.reduce(Tail.HasType(TailType.FERRET), false))
            DisplayText("  A long ferret tail sprouts from above your [butt].  It is thin, tapered, and covered in shaggy " + player.torso.neck.head.hair.color + " fur.");
        if (player.torso.tails.reduce(Tail.HasType(TailType.DOG), false))
            DisplayText("  A fuzzy " + player.torso.neck.head.hair.color + " dogtail sprouts just above your " + ButtDescriptor.describeButt(player) + ", wagging to and fro whenever you are happy.");
        if (player.torso.tails.reduce(Tail.HasType(TailType.DEMONIC), false))
            DisplayText("  A narrow tail ending in a spaded tip curls down from your " + ButtDescriptor.describeButt(player) + ", wrapping around your " + LegDescriptor.describeLeg(player) + " sensually at every opportunity.");
        if (player.torso.tails.reduce(Tail.HasType(TailType.COW), false))
            DisplayText("  A long cowtail with a puffy tip swishes back and forth as if swatting at flies.");
        if (player.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false)) {
            DisplayText("  A large, spherical spider-abdomen has grown out from your backside, covered in shiny black chitin.  Though it's heavy and bobs with every motion, it doesn't seem to slow you down.");
            const spiderButt = player.torso.tails.filter(Tail.Type(TailType.SPIDER_ABDOMEN)).sort(Tail.VenomMost)[0];
            if (spiderButt.vemon > 50 && spiderButt.vemon < 80)
                DisplayText("  Your bulging arachnid posterior feels fairly full of webbing.");
            if (spiderButt.vemon >= 80 && spiderButt.vemon < 100)
                DisplayText("  Your arachnid rear bulges and feels very full of webbing.");
            if (spiderButt.vemon === 100)
                DisplayText("  Your swollen spider-butt is distended with the sheer amount of webbing it's holding.");
        }
        if (player.torso.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
            const beeButt = player.torso.tails.filter(Tail.Type(TailType.BEE_ABDOMEN)).sort(Tail.VenomMost)[0];
            DisplayText("  A large insectile bee-abdomen dangles from just above your backside, bobbing with its own weight as you shift.  It is covered in hard chitin with black and yellow stripes, and tipped with a dagger-like stinger.");
            if (beeButt.vemon > 50 && beeButt.vemon < 80)
                DisplayText("  A single drop of poison hangs from your exposed stinger.");
            if (beeButt.vemon >= 80 && beeButt.vemon < 100)
                DisplayText("  Poisonous bee venom coats your stinger completely.");
            if (beeButt.vemon === 100)
                DisplayText("  Venom drips from your poisoned stinger regularly.");
        }
        if (player.torso.tails.reduce(Tail.HasType(TailType.SHARK), false)) {
            DisplayText("  A long shark-tail trails down from your backside, swaying to and fro while giving you a dangerous air.");
        }
        if (player.torso.tails.reduce(Tail.HasType(TailType.CAT), false)) {
            DisplayText("  A soft " + player.torso.neck.head.hair.color + " cat-tail sprouts just above your " + ButtDescriptor.describeButt(player) + ", curling and twisting with every step to maintain perfect balance.");
        }
        if (player.torso.tails.reduce(Tail.HasType(TailType.LIZARD), false)) {
            DisplayText("  A tapered tail hangs down from just above your " + ButtDescriptor.describeButt(player) + ".  It sways back and forth, assisting you with keeping your balance.");
        }
        if (player.torso.tails.reduce(Tail.HasType(TailType.BUNNY), false))
            DisplayText("  A short, soft bunny tail sprouts just above your " + ButtDescriptor.describeButt(player) + ", twitching constantly whenever you don't think about it.");
        else if (player.torso.tails.reduce(Tail.HasType(TailType.HARPY), false))
            DisplayText("  A tail of feathers fans out from just above your " + ButtDescriptor.describeButt(player) + ", twitching instinctively to help guide you if you were to take flight.");
        else if (player.torso.tails.reduce(Tail.HasType(TailType.KANGAROO), false)) {
            DisplayText("  A conical, ");
            if (player.skin.type === SkinType.GOO)
                DisplayText("gooey, " + player.skin.tone);
            else DisplayText("furry, " + player.torso.neck.head.hair.color);
            DisplayText(", tail extends from your " + ButtDescriptor.describeButt(player) + ", bouncing up and down as you move and helping to counterbalance you.");
        }
        else if (player.torso.tails.reduce(Tail.HasType(TailType.FOX), false)) {
            if (player.torso.tails.count === 1)
                DisplayText("  A swishing " + player.torso.neck.head.hair.color + " fox's brush extends from your " + ButtDescriptor.describeButt(player) + ", curling around your body - the soft fur feels lovely.");
            else DisplayText("  " + Utils.numToCardinalCapText(player.torso.tails.count) + " swishing " + player.torso.neck.head.hair.color + " fox's tails extend from your " + ButtDescriptor.describeButt(player) + ", curling around your body - the soft fur feels lovely.");
        }
        else if (player.torso.tails.reduce(Tail.HasType(TailType.DRACONIC), false)) {
            DisplayText("  A thin, scaly, prehensile reptilian tail, almost as long as you are tall, swings behind you like a living bullwhip.  Its tip menaces with spikes of bone, meant to deliver painful blows.");
        }
        // appearance
        else if (player.torso.tails.reduce(Tail.HasType(TailType.RACCOON), false)) {
            DisplayText("  A black-and-" + player.torso.neck.head.hair.color + "-ringed raccoon tail waves behind you.");
        }
        else if (player.torso.tails.reduce(Tail.HasType(TailType.MOUSE), false)) {
            // appearance
            DisplayText("  A naked, " + player.skin.tone + " mouse tail pokes from your butt, dragging on the ground and twitching occasionally.");
        }
    }

    private lowerBody(player: Player) {
        if (player.torso.hips.legs.type === LegType.HUMAN)
            DisplayText("  Two normal human legs grow down from your waist, ending in normal human feet.");
        else if (player.torso.hips.legs.type === LegType.FERRET) DisplayText("  Two furry, digitigrade legs form below your [hips].  The fur is thinner on the feet, and your toes are tipped with claws.");
        else if (player.torso.hips.legs.type === LegType.HOOFED)
            DisplayText("  Your legs are muscled and jointed oddly, covered in fur, and end in a pair of bestial hooves.");
        else if (player.torso.hips.legs.type === LegType.DOG)
            DisplayText("  Two digitigrade legs grow downwards from your waist, ending in dog-like hind-paws.");
        else if (player.torso.hips.legs.type === LegType.NAGA)
            DisplayText("  Below your waist your flesh is fused together into a very long snake-like tail.");
        // Horse body is placed higher for readability purposes
        else if (player.torso.hips.legs.type === LegType.DEMONIC_HIGH_HEELS)
            DisplayText("  Your perfect lissome legs end in mostly human feet, apart from the horn protruding straight down from the heel that forces you to walk with a sexy, swaying gait.");
        else if (player.torso.hips.legs.type === LegType.DEMONIC_CLAWS)
            DisplayText("  Your lithe legs are capped with flexible clawed feet.  Sharp black nails grow where once you had toe-nails, giving you fantastic grip.");
        else if (player.torso.hips.legs.type === LegType.BEE)
            DisplayText("  Your legs are covered in a shimmering insectile carapace up to mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.  A bit of downy yellow and black fur fuzzes your upper thighs, just like a bee.");
        else if (player.torso.hips.legs.type === LegType.GOO)
            DisplayText("  In place of legs you have a shifting amorphous blob.  Thankfully it's quite easy to propel yourself around on.  The lowest portions of your " + player.inventory.equipment.armor.displayName + " float around inside you, bringing you no discomfort.");
        else if (player.torso.hips.legs.type === LegType.CAT)
            DisplayText("  Two digitigrade legs grow downwards from your waist, ending in soft, padded cat-paws.");
        else if (player.torso.hips.legs.type === LegType.LIZARD)
            DisplayText("  Two digitigrade legs grow down from your " + HipDescriptor.describeHips(player) + ", ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.");
        else if (player.torso.hips.legs.type === LegType.BUNNY)
            DisplayText("  Your legs thicken below the waist as they turn into soft-furred rabbit-like legs.  You even have large bunny feet that make hopping around a little easier than walking.");
        else if (player.torso.hips.legs.type === LegType.HARPY)
            DisplayText("  Your legs are covered with " + player.torso.neck.head.hair.color + " plumage.  Thankfully the thick, powerful thighs are perfect for launching you into the air, and your feet remain mostly human, even if they are two-toed and tipped with talons.");
        else if (player.torso.hips.legs.type === LegType.KANGAROO)
            DisplayText("  Your furry legs have short thighs and long calves, with even longer feet ending in prominently-nailed toes.");
        else if (player.torso.hips.legs.type === LegType.CHITINOUS_SPIDER_LEGS)
            DisplayText("  Your legs are covered in a reflective black, insectile carapace up to your mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.");
        else if (player.torso.hips.legs.type === LegType.DRIDER_LOWER_BODY)
            DisplayText("  Where your legs would normally start you have grown the body of a spider, with eight spindly legs that sprout from its sides.");
        else if (player.torso.hips.legs.type === LegType.FOX)
            DisplayText("  Your legs are crooked into high knees with hocks and long feet, like those of a fox; cute bulbous toes decorate the ends.");
        else if (player.torso.hips.legs.type === LegType.DRAGON)
            DisplayText("  Two human-like legs grow down from your " + HipDescriptor.describeHips(player) + ", sheathed in scales and ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.");
        else if (player.torso.hips.legs.type === LegType.RACCOON)
            DisplayText("  Your legs, though covered in fur, are humanlike.  Long feet on the ends bear equally long toes, and the pads on the bottoms are quite sensitive to the touch.");
        if (player.perks.has(PerkType.Incorporeality))
            DisplayText("  Of course, your " + LegDescriptor.describeLegs(player) + " are partially transparent due to their ghostly nature.");

        DisplayText("\n");
        if (player.statusAffects.has(StatusAffectType.GooStuffed)) {
            DisplayText("Your gravid-looking belly is absolutely stuffed full of goo. There's no way you can get pregnant like this, but at the same time, you look like some fat-bellied breeder.");
        }
    }

    private pregnancy(player: Player) {
        // Pregnancy Shiiiiiitz
        const womb = player.pregnancy.womb;
        const buttWomb = player.pregnancy.buttWomb;
        if (buttWomb.isPregnantWith(PregnancyType.FROG_GIRL) || buttWomb.isPregnantWith(PregnancyType.SATYR)) {
            if (womb.isPregnantWith(PregnancyType.OVIELIXIR_EGGS)) {
                // Compute size
                const eggAmount = player.statusAffects.get(StatusAffectType.Eggs).value3 + player.statusAffects.get(StatusAffectType.Eggs).value2 * 10;
                const pregnancy = womb.pregnancy;
                if (pregnancy.incubation <= 50 && pregnancy.incubation > 20) {
                    DisplayText("Your swollen pregnant belly is as large as a ").bold();
                    if (eggAmount < 10)
                        DisplayText("basketball.").bold();
                    if (eggAmount >= 10 && eggAmount < 20)
                        DisplayText("watermelon.").bold();
                    if (eggAmount >= 20)
                        DisplayText("beach ball.").bold();
                }
                if (pregnancy.incubation <= 20) {
                    DisplayText("Your swollen pregnant belly is as large as a ").bold();
                    if (eggAmount < 10)
                        DisplayText("watermelon.").bold();
                    if (eggAmount >= 10 && eggAmount < 20)
                        DisplayText("beach ball.").bold();
                    if (eggAmount >= 20)
                        DisplayText("large medicine ball.").bold();
                }
            }
            // Satur preggos - only shows if bigger than regular pregnancy or not pregnancy
            else if (buttWomb.isPregnantWith(PregnancyType.SATYR) && womb.isPregnant() && buttWomb.pregnancy.incubation > womb.pregnancy.incubation) {
                if (buttWomb.pregnancy.incubation < 125 && buttWomb.pregnancy.incubation >= 75) {
                    DisplayText("You've got the begginings of a small pot-belly.").bold();
                }
                else if (buttWomb.pregnancy.incubation >= 50) {
                    DisplayText("The unmistakable bulge of pregnancy is visible in your tummy, yet it feels odd inside you - wrong somehow.").bold();
                }
                else if (buttWomb.pregnancy.incubation >= 30) {
                    DisplayText("Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.").bold();
                }
                else { // Surely Benoit and Cotton deserve their place in this list
                    DisplayText("\n");
                    if (womb.isPregnantWith(PregnancyType.IZMA) || womb.isPregnantWith(PregnancyType.MOUSE) || womb.isPregnantWith(PregnancyType.AMILY) || womb.isPregnantWith(PregnancyType.EMBER) || womb.isPregnantWith(PregnancyType.BENOIT) || womb.isPregnantWith(PregnancyType.COTTON) || womb.isPregnantWith(PregnancyType.URTA))
                        DisplayText("Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.").bold();
                    else if (womb.isPregnantWith(PregnancyType.MARBLE))
                        DisplayText("Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.").bold();
                    else
                        DisplayText("Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.").bold();
                }
            }
            // URTA PREG
            else if (womb.isPregnantWith(PregnancyType.URTA)) {
                const incubation = womb.pregnancy.incubation;
                if (incubation <= 432 && incubation > 360) {
                    DisplayText("Your belly is larger than it used to be.").bold();
                }
                if (incubation <= 360 && incubation > 288) {
                    DisplayText("Your belly is more noticably distended.   You're pretty sure it's Urta's.").bold();
                }
                if (incubation <= 288 && incubation > 216) {
                    DisplayText("The unmistakable bulge of pregnancy is visible in your tummy, and the baby within is kicking nowadays.").bold();
                }
                if (incubation <= 216 && incubation > 144) {
                    DisplayText("Your belly is large and very obviously pregnant to anyone who looks at you.  It's gotten heavy enough to be a pain to carry around all the.bold() time.");
                }
                if (incubation <= 144 && incubation > 72) {
                    DisplayText("It would be impossible to conceal your growing pregnancy from anyone who glanced your way.  It's large and round, frequently moving.").bold();
                }
                if (incubation <= 72 && incubation > 48) {
                    DisplayText("Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.").bold();
                }
                if (incubation <= 48) {
                    DisplayText("Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.").bold();
                }
            }
            else if (buttWomb.isPregnantWith(PregnancyType.FROG_GIRL)) {
                if (buttWomb.pregnancy.incubation >= 8)
                    DisplayText("Your stomach is so full of frog eggs that you look about to birth at any moment, your belly wobbling and shaking with every step you take,.bold() packed with frog ovum.");
                else
                    DisplayText("You're stuffed so full with eggs that your belly looks obscenely distended, huge and weighted with the gargantuan eggs crowding your gut..bold() They make your gait a waddle and your gravid tummy wobble obscenely.");
            }
            else if (womb.isPregnantWith(PregnancyType.FAERIE)) { // Belly size remains constant throughout the pregnancy
                const incubation = womb.pregnancy.incubation;
                DisplayText("Your belly remains swollen like a watermelon. ").bold();
                if (incubation <= 100)
                    DisplayText("It's full of liquid, though unlike a normal pregnancy the passenger you’re carrying is tiny.").bold();
                else if (incubation <= 140)
                    DisplayText("It feels like it’s full of thick syrup or jelly.").bold();
                else DisplayText("It still feels like there’s a solid ball inside your womb.").bold();
            }
            else if (womb.isPregnant()) {
                const pregnancy = womb.pregnancy;
                const incubation = womb.pregnancy.incubation;
                if (incubation <= 336 && incubation > 280) {
                    DisplayText("Your belly is larger than it used to be.").bold();
                }
                if (incubation <= 280 && incubation > 216) {
                    DisplayText("Your belly is more noticably distended.   You are probably pregnant.").bold();
                }
                if (incubation <= 216 && incubation > 180) {
                    DisplayText("The unmistakable bulge of pregnancy is visible in your tummy.").bold();
                }
                if (incubation <= 180 && incubation > 120) {
                    DisplayText("Your belly is very obviously pregnant to anyone who looks at you.").bold();
                }
                if (incubation <= 120 && incubation > 72) {
                    DisplayText("It would be impossible to conceal your growing pregnancy from anyone who glanced your way.").bold();
                }
                if (incubation <= 72 && incubation > 48) {
                    DisplayText("Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.").bold();
                }
                if (incubation <= 48) { // Surely Benoit and Cotton deserve their place in this list
                    DisplayText("\n");
                    if (pregnancy.type === PregnancyType.IZMA || pregnancy.type === PregnancyType.MOUSE || pregnancy.type === PregnancyType.AMILY || pregnancy.type === PregnancyType.EMBER || pregnancy.type === PregnancyType.BENOIT || pregnancy.type === PregnancyType.COTTON || pregnancy.type === PregnancyType.URTA)
                        DisplayText("Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.").bold();
                    else if (pregnancy.type === PregnancyType.MARBLE)
                        DisplayText("Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.").bold();
                    else
                        DisplayText("Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.").bold();
                }
            }
        }
    }

    private neck(player: Player) {
        if (player.torso.neck.gills)
            DisplayText("A pair of feathery gills are growing out just below your neck, spreading out horizontally and draping down your chest.  They allow you to stay in the water for quite a long time.  ");
    }

    private chest(player: Player) {
        const chest = player.torso.chest;
        if (chest.count === 1) {
            const firstRow = chest.get(0);
            DisplayText("You have " + Utils.numToCardinalText(2) + " " + BreastDescriptor.describeBreastRow(firstRow) + ", each supporting ");
            if (firstRow.nipples.count === 1)
                DisplayText(Utils.numToCardinalText(firstRow.nipples.count) + " " + firstRow.nipples.length + "-inch " + BreastDescriptor.describeNipple(player, firstRow) + ".");
            else
                DisplayText(Utils.numToCardinalText(firstRow.nipples.count) + " " + firstRow.nipples.length + "-inch " + BreastDescriptor.describeNipple(player, firstRow) + "s.");
            if (firstRow.milkFullness > 75)
                DisplayText("  Your " + BreastDescriptor.describeBreastRow(firstRow) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.");
            if (firstRow.rating >= 1)
                DisplayText("  You could easily fill a " + BreastDescriptor.breastCup(firstRow.rating) + " bra.");
        }
        else {
            DisplayText("You have " + Utils.numToCardinalText(chest.count) + " rows of breasts, the topmost pair starting at your chest.");
            for (let rowIndex = 0; rowIndex < chest.count; rowIndex++) {
                const breastRow = chest.get(rowIndex);
                if (rowIndex === 0)
                    DisplayText("--Your uppermost rack houses ");
                if (rowIndex === 1)
                    DisplayText("--The second row holds ");
                if (rowIndex === 2)
                    DisplayText("--Your third row of breasts contains ");
                if (rowIndex === 3)
                    DisplayText("--Your fourth set of tits cradles ");
                if (rowIndex === 4)
                    DisplayText("--Your fifth and final mammory grouping swells with ");
                DisplayText(Utils.numToCardinalText(2) + " " + BreastDescriptor.describeBreastRow(breastRow) + " with ");
                if (breastRow.nipples.count === 1)
                    DisplayText(Utils.numToCardinalText(breastRow.nipples.count) + " " + chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length + "-inch " + BreastDescriptor.describeNipple(player, breastRow) + " each.");
                else
                    DisplayText(Utils.numToCardinalText(breastRow.nipples.count) + " " + chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length + "-inch " + BreastDescriptor.describeNipple(player, breastRow) + "s each.");
                if (breastRow.rating >= 1)
                    DisplayText("  They could easily fill a " + BreastDescriptor.breastCup(breastRow.rating) + " bra.");
                if (breastRow.milkFullness > 75)
                    DisplayText("  Your " + BreastDescriptor.describeBreastRow(breastRow) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.");
            }
        }
    }

    private lowerBodySex(player: Player) {
        // Crotchial stuff - mention snake
        if (player.torso.hips.legs.type === LegType.NAGA && player.gender > 0) {
            DisplayText("Your sex");
            if (player.gender === 3 || player.torso.cocks.count > 1)
                DisplayText("es are ");
            else DisplayText(" is ");
            DisplayText("concealed within a cavity in your tail when not in use, though when the need arises, you can part your concealing slit and reveal your true self.");
        }
    }

    private cocks(player: Player) {
        // Cock stuff!
        const cocks = player.torso.cocks;
        if (cocks.count === 1) {
            const firstCock = cocks.get(0);
            if (player.torso.hips.legs.type === LegType.CENTAUR)
                DisplayText("Ever since becoming a centaur, your equipment has shifted to lie between your rear legs, like a horse.");
            DisplayText("Your " + CockDescriptor.describeCock(player, firstCock) + " is " + firstCock.length + " inches long and ");
            if (Math.round(10 * firstCock.thickness) / 10 < 2) {
                if (Math.round(10 * firstCock.thickness) / 10 === 1)
                    DisplayText(firstCock.thickness + " inch thick.");
                else
                    DisplayText(Math.round(10 * firstCock.thickness) / 10 + " inches thick.");
            }
            else
                DisplayText(Utils.numToCardinalText(Math.round(10 * firstCock.thickness) / 10) + " inches wide.");
            // Horsecock flavor
            if (firstCock.type === CockType.HORSE) {
                DisplayText("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your shaft flares proudly, just like a horse's.");
            }
            // dog cock flavor
            if (firstCock.type === CockType.DOG || firstCock.type === CockType.FOX) {
                if (firstCock.knotMultiplier >= 1.8)
                    DisplayText("  The obscenely swollen lump of flesh near the base of your " + CockDescriptor.describeCock(player, firstCock) + " looks almost too big for your cock.");
                else if (firstCock.knotMultiplier >= 1.4)
                    DisplayText("  A large bulge of flesh nestles just above the bottom of your " + CockDescriptor.describeCock(player, firstCock) + ", to ensure it stays where it belongs during mating.");
                else if (firstCock.knotMultiplier > 1)
                    DisplayText("  A small knot of thicker flesh is near the base of your " + CockDescriptor.describeCock(player, firstCock) + ", ready to expand to help you lodge it inside a female.");
                // List thickness
                DisplayText("  The knot is " + Math.round(firstCock.thickness * firstCock.knotMultiplier * 10) / 10 + " inches wide when at full size.");
            }
            // Demon cock flavor
            if (firstCock.type === CockType.DEMON) {
                DisplayText("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.");
            }
            // Tentacle cock flavor
            if (firstCock.type === CockType.TENTACLE) {
                DisplayText("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.");
            }
            // Cat cock flavor
            if (firstCock.type === CockType.CAT) {
                DisplayText("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.");
            }
            // Snake cock flavor
            if (firstCock.type === CockType.LIZARD) {
                DisplayText("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.");
            }
            // Anemone cock flavor
            if (firstCock.type === CockType.ANEMONE) {
                DisplayText("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.");
            }
            // Kangawang flavor
            if (firstCock.type === CockType.KANGAROO) {
                DisplayText("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.");
            }
            // Draconic Cawk Flava flav
            if (firstCock.type === CockType.DRAGON) {
                DisplayText("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
            }
            if (firstCock.type === CockType.BEE) {
                DisplayText("  It's a long, smooth black shaft that's rigid to the touch.  Its base is ringed with a layer of four inch long soft bee hair.  The tip has a much finer layer of short yellow hairs.  The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.");
            }
            // Worm flavor
            if (player.statusAffects.has(StatusAffectType.Infested))
                DisplayText("  Every now and again a slimy worm coated in spunk slips partway out of your " + CockDescriptor.describeCock(player, firstCock) + ", tasting the air like a snake's tongue.");
            if (player.inventory.equipment.cockSocks.get(0).isEquipped())
                this.sockDescript(player.inventory.equipment.cockSocks.get(0).item.name as CockSockName, firstCock.type);
        }
        if (cocks.count > 1) {
            if (player.torso.hips.legs.type === LegType.CENTAUR)
                DisplayText("Where a horse's penis would usually be located, you have instead grown " + CockDescriptor.describeMultiCock(player) + "!");
            else
                DisplayText("Where a penis would normally be located, you have instead grown " + CockDescriptor.describeMultiCock(player) + "!");

            for (let cockIndex = 0; cockIndex < cocks.count; cockIndex++) {
                const curCock = cocks.get(cockIndex);
                switch (Utils.rand(4)) {
                    case 0: {
                        if (cockIndex === 0)
                            DisplayText("--Your first ");
                        else
                            DisplayText("--Your next ");
                        DisplayText(CockDescriptor.describeCock(player, curCock) + " is " + curCock.length + " inches long and ");
                        if (curCock.thickness === 1)
                            DisplayText("one inch wide.");
                        else if (Math.floor(curCock.thickness) >= 2)
                            DisplayText(Utils.numToCardinalText(Utils.round(curCock.thickness)) + " inches wide.");
                        else
                            DisplayText(Utils.round(curCock.thickness) + " inches wide.");
                    }
                    case 1: {
                        DisplayText("--One of your ");
                        DisplayText(CockDescriptor.describeCock(player, curCock) + "s is " + Math.round(10 * curCock.length) / 10 + " inches long and ");
                        if (curCock.thickness === 1)
                            DisplayText("one inch thick.");
                        else if (Math.floor(curCock.thickness) >= 2)
                            DisplayText(Utils.numToCardinalText(Utils.round(curCock.thickness)) + " inches thick.");
                        else
                            DisplayText(Utils.round(curCock.thickness) + " inches thick.");
                    }
                    case 2: {
                        if (cockIndex > 0)
                            DisplayText("--Another of your ");
                        else
                            DisplayText("--One of your ");
                        DisplayText(CockDescriptor.describeCock(player, curCock) + "s is " + Math.round(10 * curCock.length) / 10 + " inches long and ");
                        if (curCock.thickness === 1)
                            DisplayText("one inch thick.");
                        else if (Math.floor(curCock.thickness) >= 2)
                            DisplayText(Utils.numToCardinalText(Utils.round(curCock.thickness)) + " inches thick.");
                        else
                            DisplayText(Utils.round(curCock.thickness) + " inches thick.");
                    }
                    case 3: {
                        if (cockIndex > 0)
                            DisplayText("--Your next ");
                        else
                            DisplayText("--Your first ");
                        DisplayText(CockDescriptor.describeCock(player, curCock) + " is " + Math.round(10 * curCock.length) / 10 + " inches long and ");
                        if (curCock.thickness === 1)
                            DisplayText("one inch in diameter.");
                        else if (Math.floor(curCock.thickness) >= 2)
                            DisplayText(Utils.numToCardinalText(Math.round(curCock.thickness * 10) / 10) + " inches in diameter.");
                        else
                            DisplayText(Math.round(curCock.thickness * 10) / 10 + " inches in diameter.");
                    }
                }
                // horse cock flavor
                if (curCock.type === CockType.HORSE) {
                    DisplayText("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your " + CockDescriptor.describeCock(player, curCock) + " flares proudly, just like a horse's.");
                }
                // dog cock flavor
                if ((curCock.type === CockType.DOG) || (curCock.type === CockType.FOX)) {
                    DisplayText("  It is shiny, pointed, and covered in veins, just like a large ");
                    if (curCock.type === CockType.DOG)
                        DisplayText("dog's cock.");
                    else
                        DisplayText("fox's cock.");

                    if (curCock.knotMultiplier >= 1.8)
                        DisplayText("  The obscenely swollen lump of flesh near the base of your " + CockDescriptor.describeCock(player, curCock) + " looks almost comically mismatched for your " + CockDescriptor.describeCock(player, curCock) + ".");
                    else if (curCock.knotMultiplier >= 1.4)
                        DisplayText("  A large bulge of flesh nestles just above the bottom of your " + CockDescriptor.describeCock(player, curCock) + ", to ensure it stays where it belongs during mating.");
                    else if (curCock.knotMultiplier > 1)
                        DisplayText("  A small knot of thicker flesh is near the base of your " + CockDescriptor.describeCock(player, curCock) + ", ready to expand to help you lodge your " + CockDescriptor.describeCock(player, curCock) + " inside a female.");
                    // List knot thickness
                    DisplayText("  The knot is " + Math.floor(curCock.thickness * curCock.knotMultiplier * 10) / 10 + " inches thick when at full size.");
                }
                // Demon cock flavor
                if (curCock.type === CockType.DEMON) {
                    DisplayText("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.");
                }
                // Tentacle cock flavor
                if (curCock.type === CockType.TENTACLE) {
                    DisplayText("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.");
                }
                // Cat cock flavor
                if (curCock.type === CockType.CAT) {
                    DisplayText("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.");
                }
                // Snake cock flavor
                if (curCock.type === CockType.LIZARD) {
                    DisplayText("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.");
                }
                // Anemone cock flavor
                if (curCock.type === CockType.ANEMONE) {
                    DisplayText("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.");
                }
                // Kangwang flavor
                if (curCock.type === CockType.KANGAROO) {
                    DisplayText("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.");
                }
                // Draconic Cawk Flava flav
                if (curCock.type === CockType.DRAGON) {
                    DisplayText("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
                }
            }
            // Worm flavor
            if (player.statusAffects.has(StatusAffectType.Infested))
                DisplayText("Every now and again slimy worms coated in spunk slip partway out of your " + CockDescriptor.describeMultiCockShort(player) + ", tasting the air like tongues of snakes.");
        }
    }

    private balls(player: Player) {
        if (player.torso.balls.quantity > 0) {
            if (player.statusAffects.has(StatusAffectType.Uniball)) {
                if (player.skin.type !== SkinType.GOO)
                    DisplayText("Your [sack] clings tightly to your groin, holding " + BallsDescriptor.describeBalls(false, true, player, true) + " snugly against you.");
                else if (player.skin.type === SkinType.GOO)
                    DisplayText("Your [sack] clings tightly to your groin, dripping and holding " + BallsDescriptor.describeBalls(false, true, player, true) + " snugly against you.");
            }
            else if (player.torso.cocks.count === 0) {
                if (player.skin.type === SkinType.PLAIN)
                    DisplayText("A " + BallsDescriptor.describeSack(player) + " with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily under where a penis would normally grow.");
                if (player.skin.type === SkinType.FUR)
                    DisplayText("A fuzzy " + BallsDescriptor.describeSack(player) + " filled with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings low under where a penis would normally grow.");
                if (player.skin.type === SkinType.SCALES)
                    DisplayText("A scaley " + BallsDescriptor.describeSack(player) + " hugs your " + BallsDescriptor.describeBalls(false, true, player, true) + " tightly against your body.");
                if (player.skin.type === SkinType.GOO)
                    DisplayText("An oozing, semi-solid sack with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily under where a penis would normally grow.");
            }
            else {
                if (player.skin.type === SkinType.PLAIN)
                    DisplayText("A " + BallsDescriptor.describeSack(player) + " with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily beneath your " + CockDescriptor.describeMultiCockShort(player) + ".");
                if (player.skin.type === SkinType.FUR)
                    DisplayText("A fuzzy " + BallsDescriptor.describeSack(player) + " filled with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings low under your " + CockDescriptor.describeMultiCockShort(player) + ".");
                if (player.skin.type === SkinType.SCALES)
                    DisplayText("A scaley " + BallsDescriptor.describeSack(player) + " hugs your " + BallsDescriptor.describeBalls(false, true, player, true) + " tightly against your body.");
                if (player.skin.type === SkinType.GOO)
                    DisplayText("An oozing, semi-solid sack with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily beneath your " + CockDescriptor.describeMultiCockShort(player) + ".");
            }
            DisplayText("  You estimate each of them to be about " + Utils.numToCardinalText(Math.round(player.torso.balls.size)) + " ");
            if (Math.round(player.torso.balls.size) === 1)
                DisplayText("inch");
            else DisplayText("inches");
            DisplayText(" across.");
        }
    }

    private vaginas(player: Player) {
        const vaginas = player.torso.vaginas;
        if (vaginas.count > 0) {
            const firstVagina = vaginas.get(0);
            if (player.gender === Gender.FEMALE && player.torso.hips.legs.type === LegType.CENTAUR)
                DisplayText("Ever since becoming a centaur, your womanly parts have shifted to lie between your rear legs, in a rather equine fashion.");
            DisplayText("\n");
            if (vaginas.count === 1)
                DisplayText("You have a " + VaginaDescriptor.describeVagina(player, firstVagina) + ", with a " + player.torso.clit.length + "-inch clit");
            if (firstVagina.virgin)
                DisplayText(" and an intact hymen");
            DisplayText(".  ");
            if (vaginas.count > 1)
                DisplayText("You have " + vaginas.count + " " + VaginaDescriptor.describeVagina(player, firstVagina) + "s, with " + player.torso.clit.length + "-inch clits each.  ");
            if (player.stats.lib < 50 && player.stats.lust < 50) { // not particularly horny
                // Wetness
                if (firstVagina.wetness >= VaginaWetness.WET && firstVagina.wetness < VaginaWetness.DROOLING)
                    DisplayText("Moisture gleams in ");
                if (firstVagina.wetness >= VaginaWetness.DROOLING) {
                    DisplayText("Occasional beads of lubricant drip from ");
                }
                // Different description based on vag looseness
                if (firstVagina.wetness >= VaginaWetness.WET) {
                    if (firstVagina.looseness < VaginaLooseness.LOOSE)
                        DisplayText("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ". ");
                    if (firstVagina.looseness >= VaginaLooseness.LOOSE && firstVagina.looseness < VaginaLooseness.GAPING_WIDE)
                        DisplayText("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ", its lips slightly parted. ");
                    if (firstVagina.looseness >= VaginaLooseness.GAPING_WIDE)
                        DisplayText("the massive hole that is your " + VaginaDescriptor.describeVagina(player, firstVagina) + ".  ");
                }
            }
            if ((player.stats.lib >= 50 || player.stats.lust >= 50) && (player.stats.lib < 80 && player.stats.lust < 80)) { // kinda horny
                // Wetness
                if (firstVagina.wetness < VaginaWetness.WET)
                    DisplayText("Moisture gleams in ");
                if (firstVagina.wetness >= VaginaWetness.WET && firstVagina.wetness < VaginaWetness.DROOLING) {
                    DisplayText("Occasional beads of lubricant drip from ");
                }
                if (firstVagina.wetness >= VaginaWetness.DROOLING) {
                    DisplayText("Thin streams of lubricant occasionally dribble from ");
                }
                // Different description based on vag looseness
                if (firstVagina.looseness < VaginaLooseness.LOOSE)
                    DisplayText("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ". ");
                if (firstVagina.looseness >= VaginaLooseness.LOOSE && firstVagina.looseness < VaginaLooseness.GAPING_WIDE)
                    DisplayText("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ", its lips slightly parted. ");
                if (firstVagina.looseness >= VaginaLooseness.GAPING_WIDE)
                    DisplayText("the massive hole that is your " + VaginaDescriptor.describeVagina(player, firstVagina) + ".  ");
            }
            if ((player.stats.lib > 80 || player.stats.lust > 80)) { // WTF horny!
                // Wetness
                if (firstVagina.wetness < VaginaWetness.WET) {
                    DisplayText("Occasional beads of lubricant drip from ");
                }
                if (firstVagina.wetness >= VaginaWetness.WET && firstVagina.wetness < VaginaWetness.DROOLING) {
                    DisplayText("Thin streams of lubricant occasionally dribble from ");
                }
                if (firstVagina.wetness >= VaginaWetness.DROOLING) {
                    DisplayText("Thick streams of lubricant drool constantly from ");
                }
                // Different description based on vag looseness
                if (firstVagina.looseness < VaginaLooseness.LOOSE)
                    DisplayText("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ". ");
                if (firstVagina.looseness >= VaginaLooseness.LOOSE && firstVagina.looseness < VaginaLooseness.GAPING_WIDE)
                    DisplayText("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ", its lips slightly parted. ");
                if (firstVagina.looseness >= VaginaLooseness.GAPING_WIDE)
                    DisplayText("the massive hole that is your cunt.  ");
            }
        }

    }

    private noReproductiveOrgans(player: Player) {
        if (player.torso.cocks.count === 0 && player.torso.vaginas.count === 0) {
            DisplayText("You have a curious lack of any sexual endowments.");
        }
    }

    private butthole(player: Player) {
        if (player.torso.butt) {
            DisplayText("You have one " + ButtDescriptor.describeButthole(player.torso.butt) + ", placed between your butt-cheeks where it belongs.");
        }
    }

    private piercing(player: Player) {
        const piercings = player.inventory.equipment.piercings;
        if (piercings.eyebrow.isEquipped())
            DisplayText("A solitary " + piercings.eyebrow.item.shortDesc + " adorns your eyebrow, looking very stylish.");
        if (piercings.ears.isEquipped())
            DisplayText("Your ears are pierced with " + piercings.ears.item.shortDesc + ".");
        if (piercings.nose.isEquipped())
            DisplayText("A " + piercings.nose.item.shortDesc + " dangles from your nose.");
        if (piercings.lip.isEquipped())
            DisplayText("Shining on your lip, a " + piercings.lip.item.shortDesc + " is plainly visible.");
        if (piercings.tongue.isEquipped())
            DisplayText("Though not visible, you can plainly feel your " + piercings.tongue.item.shortDesc + " secured in your tongue.");
        const firstNipplePiercing = piercings.nipples.get(0);
        if (firstNipplePiercing.isEquipped()) {
            if (firstNipplePiercing.item.name === PiercingType.Ladder)
                DisplayText("Your " + BreastDescriptor.describeNipple(player, player.torso.chest.get(0)) + "s ache and tingle with every step, as your heavy " + firstNipplePiercing.item.shortDesc + " swings back and forth.");
            else
                DisplayText("Your " + BreastDescriptor.describeNipple(player, player.torso.chest.get(0)) + "s are pierced with " + firstNipplePiercing.item.shortDesc + ".");
        }
        if (piercings.cocks.get(0).isEquipped()) {
            DisplayText("Looking positively perverse, a " + piercings.nipples.get(0).item.shortDesc + " adorns your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ".");
        }
        if (Flags.list[FlagEnum.HAVE_CERAPH_PIERCING])
            DisplayText("A magical, ruby-studded bar pierces your belly button, allowing you to summon Ceraph on a whim.");
        const firstVagina = player.torso.vaginas.get(0);
        if (piercings.labia.isEquipped())
            DisplayText("Your " + VaginaDescriptor.describeVagina(player, firstVagina) + " glitters with the " + piercings.labia.item.shortDesc + " hanging from your lips.");
        if (piercings.clit.isEquipped())
            DisplayText("Impossible to ignore, your " + VaginaDescriptor.describeClit(player) + " glitters with its " + piercings.clit.item.shortDesc + ".");
    }

    private gems(player: Player) {
        if (player.inventory.gems === 0)
            DisplayText("Your money-purse is devoid of any currency.");
        if (player.inventory.gems > 1)
            DisplayText("You have " + player.inventory.gems + " shining gems, collected in your travels.");
        if (player.inventory.gems === 1)
            DisplayText("You have " + player.inventory.gems + " shining gem, collected in your travels.");
    }

    private sockDescript(cockSockName: CockSockName, cockType: CockType) {
        DisplayText("  ");
        if (cockSockName === CockSockName.Wool)
            DisplayText("It's covered by a wooly white cock-sock, keeping it snug and warm despite how cold it might get.");
        else if (cockSockName === CockSockName.Alabaster)
            DisplayText("It's covered by a white, lacey cock-sock, snugly wrapping around it like a bridal dress around a bride.");
        else if (cockSockName === CockSockName.Cockring)
            DisplayText("It's covered by a black latex cock-sock with two attached metal rings, keeping your cock just a little harder and [balls] aching for release.");
        else if (cockSockName === CockSockName.Viridian)
            DisplayText("It's covered by a lacey dark green cock-sock accented with red rose-like patterns.  Just wearing it makes your body, especially your cock, tingle.");
        else if (cockSockName === CockSockName.Scarlet)
            DisplayText("It's covered by a lacey red cock-sock that clings tightly to your member.  Just wearing it makes your cock throb, as if it yearns to be larger...");
        else if (cockSockName === CockSockName.Cobalt)
            DisplayText("It's covered by a lacey blue cock-sock that clings tightly to your member... really tightly.  It's so tight it's almost uncomfortable, and you wonder if any growth might be inhibited.");
        else if (cockSockName === CockSockName.Gilded)
            DisplayText("It's covered by a metallic gold cock-sock that clings tightly to you, its surface covered in glittering gems.  Despite the warmth of your body, the cock-sock remains cool.");
        else if (cockSockName === CockSockName.Purple) {
            DisplayText("It's covered by a lacey purple cock-sock");
            if (cockType !== CockType.DISPLACER)
                DisplayText(" that fits somewhat awkwardly on your member");
            else
                DisplayText(" that fits your coeurl cock perfectly");
            DisplayText(".  Just wearing it makes you feel stronger and more powerful.");
        }
    }
}
