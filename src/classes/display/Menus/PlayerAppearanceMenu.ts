import Menu from './Menu';
import Cock, { CockType } from '../../Body/Cock';
import { Gender, SkinType } from '../../Body/Creature';
import Face, { EyeType, FaceType, TongueType } from '../../Body/Face';
import { AntennaeType, EarType, HornType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { ArmType, WingType } from '../../Body/UpperBody';
import { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BodyDescriptor from '../../Descriptors/BodyDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import FaceDescriptor from '../../Descriptors/FaceDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import SkinDescriptor from '../../Descriptors/SkinDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import DisplayText from '../DisplayText';

export default class PlayerAppearanceMenu implements Menu {
    public display(player: Player) {
        this.heightRace(player);
        DisplayText.newParagraph();
        this.face(player);
        DisplayText.newParagraph();
        this.eyes(player);
        DisplayText.newParagraph();
        this.hair(player);
        DisplayText.newParagraph();
        this.tongue(player);
        DisplayText.newParagraph();
        this.horns(player);
        DisplayText.newParagraph();
        this.wings(player);
        DisplayText.newParagraph();
        this.hips(player);
        DisplayText.newParagraph();
        this.butt(player);
        DisplayText.newParagraph();
        this.tail(player);
        DisplayText.newParagraph();
        this.lowerBody(player);
        DisplayText.newParagraph();
        this.pregnancy(player);
        DisplayText.newParagraph();
        this.neck(player);
        DisplayText.newParagraph();
        this.chest(player);
        DisplayText.newParagraph();
        this.lowerBodySex(player);
        DisplayText.newParagraph();
        this.cocks(player);
        DisplayText.newParagraph();
        this.balls(player);
        DisplayText.newParagraph();
        this.vaginas(player);
        DisplayText.newParagraph();
        this.noReproductiveOrgans(player);
        DisplayText.newParagraph();
        this.butthole(player);
        DisplayText.newParagraph();
        this.piercing(player);
        DisplayText.newParagraph();
        this.gems(player);
    }

    private heightRace(player: Player) {
        //Determine race type:
        let race: string = BodyDescriptor.describeRace(player);
        //Discuss race
        DisplayText.clear();
        if (race != "human") DisplayText.text("You began your journey as a human, but gave that up as you explored the dangers of this realm.  ");
        //Height and race.
        DisplayText.text("You are a " + Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall " + race + ", with " + BodyDescriptor.describeBody(player) + ".");
        if (player.inventory.armorSlot.equipment.displayName == "comfortable clothes")
            DisplayText.bold("  You are currently wearing " + player.inventory.armorSlot.equipment.displayName + " and using your " + player.inventory.weaponSlot.equipment.displayname + " as a weapon.");
        else DisplayText.bold("  You are currently wearing your " + player.inventory.armorSlot.equipment.displayName + " and using your " + player.inventory.weaponSlot.equipment.displayname + " as a weapon.");
    }
    
    private face(player: Player) {
        if (player.upperBody.head.face.faceType == (FaceType.HUMAN || FaceType.SHARK_TEETH || FaceType.BUNNY || FaceType.SPIDER_FANGS || FaceType.FERRET_MASK)) {
            if (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO)
                DisplayText.text("  Your face is human in shape and structure, with " + SkinDescriptor.skin(player) + ".");
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  Under your " + SkinDescriptor.skinFurScales(player) + " you have a human-shaped head with " + SkinDescriptor.skin(player, true) + ".");
            if (player.skinType == SkinType.SCALES)
                DisplayText.text("  Your face is fairly human in shape, but is covered in " + SkinDescriptor.skin(player) + ".");
            if (player.upperBody.head.face.faceType == FaceType.SHARK_TEETH)
                DisplayText.text("  A set of razor-sharp, retractable shark-teeth fill your mouth and gives your visage a slightly angular appearance.");
            else if (player.upperBody.head.face.faceType == FaceType.BUNNY)
                DisplayText.text("  The constant twitches of your nose and the length of your incisors gives your visage a hint of bunny-like cuteness.");
            else if (player.upperBody.head.face.faceType == FaceType.SPIDER_FANGS)
                DisplayText.text("  A set of retractable, needle-like fangs sit in place of your canines and are ready to dispense their venom.");
            else if (player.upperBody.head.face.faceType == FaceType.FERRET_MASK)
                DisplayText.text("  The [skinFurScales] around your eyes is significantly darker than the rest of your face, giving you a cute little ferret mask.");
        }
        else if (player.upperBody.head.face.faceType == FaceType.FERRET) {
            if (player.skinType == SkinType.PLAIN)
                DisplayText.text("  Your face is an adorable cross between human and ferret features, complete with a wet nose and whiskers.  The only oddity is your lack of fur, leaving only [skin] visible on your ferret-like face.");
            else
                DisplayText.text("  Your face is coated in " + player.upperBody.head.hairColor + " fur with [skin] underneath, an adorable cross between human and ferret features.  It is complete with a wet nose and whiskers.");
        }
        else if (player.upperBody.head.face.faceType == FaceType.RACCOON_MASK) {
            //appearance for skinheads
            if (player.skinType != SkinType.FUR && player.skinType != SkinType.SCALES) {
                DisplayText.text("  Your face is human in shape and structure, with " + SkinDescriptor.skin(player));
                if ((player.skinTone == "ebony" || player.skinTone == "black") && (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO))
                    DisplayText.text(", though with your dusky hue, the black raccoon mask you sport isn't properly visible.");
                else DisplayText.text(", though it is decorated with a sly-looking raccoon mask over your eyes.");
            }
            //appearance furscales
            else {
                //(black/midnight furscales)
                if (((player.upperBody.head.hairColor == "black" || player.upperBody.head.hairColor == "midnight") && (player.skinType == SkinType.FUR || player.skinType == SkinType.SCALES)))
                    DisplayText.text("  Under your " + SkinDescriptor.skinFurScales(player) + " hides a black raccoon mask, barely visible due to your inky hue, and");
                else DisplayText.text("  Your " + SkinDescriptor.skinFurScales(player) + " are decorated with a sly-looking raccoon mask, and under them");
                DisplayText.text(" you have a human-shaped head with " + SkinDescriptor.skin(player, true) + ".");
            }
        }
        else if (player.upperBody.head.face.faceType == FaceType.RACCOON) {
            DisplayText.text("  You have a triangular raccoon face, replete with sensitive whiskers and a little black nose; a mask shades the space around your eyes, set apart from your " + SkinDescriptor.skinFurScales(player) + " by a band of white.");
            //(if skin)
            if (player.skinType == SkinType.PLAIN)
                DisplayText.text("  It looks a bit strange with only the skin and no fur.");
            else if (player.skinType == SkinType.SCALES)
                DisplayText.text("  The presence of said scales gives your visage an eerie look, more reptile than mammal.");
        }
        else if (player.upperBody.head.face.faceType == FaceType.FOX) {
            DisplayText.text("  You have a tapered, shrewd-looking vulpine face with a speckling of downward-curved whiskers just behind the nose.");
            if (player.skinType == SkinType.PLAIN)
                DisplayText.text("  Oddly enough, there's no fur on your animalistic muzzle, just " + SkinDescriptor.skinFurScales(player) + ".");
            else if (player.skinType == SkinType.FUR)
                DisplayText.text("  A coat of " + SkinDescriptor.skinFurScales(player) + " decorates your muzzle.");
            else if (player.skinType == SkinType.SCALES)
                DisplayText.text("  Strangely, " + SkinDescriptor.skinFurScales(player) + " adorn every inch of your animalistic visage.");
        }
        else if (player.upperBody.head.face.faceType == FaceType.BUCKTEETH) {
            //appearance
            DisplayText.text("  Your face is generally human in shape and structure, with " + SkinDescriptor.skin(player));
            if (player.skinType == SkinType.FUR || player.skinType == SkinType.SCALES)
                DisplayText.text(" under your " + SkinDescriptor.skinFurScales(player));
            DisplayText.text(" and mousey buckteeth.");
        }
        else if (player.upperBody.head.face.faceType == FaceType.MOUSE) {
            //appearance
            DisplayText.text("  You have a snubby, tapered mouse's face, with whiskers, a little pink nose, and ");
            if (player.skinType != SkinType.FUR && player.skinType != SkinType.SCALES)
                DisplayText.text(SkinDescriptor.skin(player));
            else DisplayText.text(SkinDescriptor.skin(player) + " under your " + SkinDescriptor.skinFurScales(player));
            DisplayText.text(".  Two large incisors complete it.");
        }
        //Naga
        if (player.upperBody.head.face.faceType == FaceType.SNAKE_FANGS) {
            if (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO)
                DisplayText.text("  You have a fairly normal face, with " + SkinDescriptor.skin(player) + ".  The only oddity is your pair of dripping fangs which often hang over your lower lip.");
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  Under your " + SkinDescriptor.skinFurScales(player) + " you have a human-shaped head with " + SkinDescriptor.skin(player, true) + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.");
            if (player.skinType == SkinType.SCALES)
                DisplayText.text("  Your face is fairly human in shape, but is covered in " + SkinDescriptor.skinFurScales(player) + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.");
        }
        //horse-face
        if (player.upperBody.head.face.faceType == FaceType.HORSE) {
            if (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO)
                DisplayText.text("  Your face is equine in shape and structure.  The odd visage is hairless and covered with " + SkinDescriptor.skinFurScales(player) + ".");
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  Your face is almost entirely equine in appearance, even having " + SkinDescriptor.skinFurScales(player) + ".  Underneath the fur, you believe you have " + SkinDescriptor.skin(player, true) + ".");
            if (player.skinType == SkinType.SCALES)
                DisplayText.text("  You have the face and head structure of a horse, overlaid with glittering " + SkinDescriptor.skinFurScales(player) + ".");
        }
        //dog-face
        if (player.upperBody.head.face.faceType == FaceType.DOG) {
            if (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO)
                DisplayText.text("  You have a dog-like face, complete with a wet nose.  The odd visage is hairless and covered with " + SkinDescriptor.skinFurScales(player) + ".");
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  You have a dog's face, complete with wet nose and panting tongue.  You've got " + SkinDescriptor.skinFurScales(player) + ", hiding your " + SkinDescriptor.skin(player, true) + " underneath your furry visage.");
            if (player.skinType == SkinType.SCALES)
                DisplayText.text("  You have the facial structure of a dog, wet nose and all, but overlaid with glittering " + SkinDescriptor.skinFurScales(player) + ".");
        }
        //cat-face
        if (player.upperBody.head.face.faceType == FaceType.CAT) {
            if (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO)
                DisplayText.text("  You have a cat-like face, complete with a cute, moist nose and whiskers.  The " + SkinDescriptor.skin(player) + " that is revealed by your lack of fur looks quite unusual on so feline a face.");
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  You have a cat-like face, complete with moist nose and whiskers.  Your " + player.skinDesc + " is " + player.upperBody.head.hairColor + ", hiding your " + SkinDescriptor.skin(player, true) + " underneath.");
            if (player.skinType == SkinType.SCALES)
                DisplayText.text("  Your facial structure blends humanoid features with those of a cat.  A moist nose and whiskers are included, but overlaid with glittering " + SkinDescriptor.skinFurScales(player) + ".");
            if (player.upperBody.head.face.eyeType != EyeType.BLACK_EYES_SAND_TRAP)
                DisplayText.text("  Of course, no feline face would be complete without vertically slit eyes.");
        }
        //Minotaaaauuuur-face
        if (player.upperBody.head.face.faceType == FaceType.COW_MINOTAUR) {
            if (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO)
                DisplayText.text("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Despite your lack of fur elsewhere, your visage does have a short layer of " + player.upperBody.head.hairColor + " fuzz.");
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Your " + SkinDescriptor.skinFurScales(player) + " thickens noticably on your head, looking shaggy and more than a little monstrous once laid over your visage.");
            if (player.skinType == SkinType.SCALES)
                DisplayText.text("  Your face resembles a minotaur's, though strangely it is covered in shimmering scales, right up to the flat cow-like nose that protrudes from your face.");
        }
        //Lizard-face
        if (player.upperBody.head.face.faceType == FaceType.LIZARD) {
            if (player.skinType == SkinType.PLAIN || player.skinType == SkinType.GOO)
                DisplayText.text("  You have a face resembling that of a lizard, and with your toothy maw, you have quite a fearsome visage.  The reptilian visage does look a little odd with just " + SkinDescriptor.skin(player) + ".");
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  You have a face resembling that of a lizard.  Between the toothy maw, pointed snout, and the layer of " + SkinDescriptor.skinFurScales(player) + " covering your face, you have quite the fearsome visage.");
            if (player.skinType == SkinType.SCALES)
                DisplayText.text("  Your face is that of a lizard, complete with a toothy maw and pointed snout.  Reflective " + SkinDescriptor.skinFurScales(player) + " complete the look, making you look quite fearsome.");
        }
        if (player.upperBody.head.face.faceType == FaceType.DRAGON) {
            DisplayText.text("  Your face is a narrow, reptilian muzzle.  It looks like a predatory lizard's, at first glance, but with an unusual array of spikes along the under-jaw.  It gives you a regal but fierce visage.  Opening your mouth reveals several rows of dagger-like sharp teeth.  The fearsome visage is decorated by " + SkinDescriptor.skinFurScales(player) + ".");
        }
        if (player.upperBody.head.face.faceType == FaceType.KANGAROO) {
            DisplayText.text("  Your face is ");
            if (player.skinType == SkinType.PLAIN)
                DisplayText.text("bald");
            else DisplayText.text("covered with " + SkinDescriptor.skinFurScales(player));
            DisplayText.text(" and shaped like that of a kangaroo, somewhat rabbit-like except for the extreme length of your odd visage.");
        }
        //M/F stuff!
        DisplayText.text("  It has " + FaceDescriptor.describeFace(player) + ".");
    }

    private eyes(player: Player) {
        if (player.upperBody.head.face.eyeType == EyeType.FOUR_SPIDER_EYES)
            DisplayText.text("  In addition to your primary two eyes, you have a second, smaller pair on your forehead.");
        else if (player.upperBody.head.face.eyeType == EyeType.BLACK_EYES_SAND_TRAP)
            DisplayText.text("  Your eyes are solid spheres of inky, alien darkness.");
    }

    private hair(player: Player) {
        //if bald
        if (player.upperBody.head.hairLength == 0) {
            if (player.skinType == SkinType.FUR)
                DisplayText.text("  You have no hair, only a thin layer of fur atop of your head.  ");
            else DisplayText.text("  You are totally bald, showing only shiny " + player.skinTone + " " + player.skinDesc + " where your hair should be.");
            if (player.upperBody.head.earType == EarType.HORSE)
                DisplayText.text("  A pair of horse-like ears rise up from the top of your head.");
            else if (player.upperBody.head.earType == EarType.FERRET)
                DisplayText.text("  A pair of small, rounded ferret ears sit on top of your head.");
            else if (player.upperBody.head.earType == EarType.DOG)
                DisplayText.text("  A pair of dog ears protrude from your skull, flopping down adorably.");
            else if (player.upperBody.head.earType == EarType.COW)
                DisplayText.text("  A pair of round, floppy cow ears protrude from the sides of your skull.");
            else if (player.upperBody.head.earType == EarType.ELFIN)
                DisplayText.text("  A pair of large pointy ears stick out from your skull.");
            else if (player.upperBody.head.earType == EarType.CAT)
                DisplayText.text("  A pair of cute, fuzzy cat ears have sprouted from the top of your head.");
            else if (player.upperBody.head.earType == EarType.LIZARD)
                DisplayText.text("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.");
            else if (player.upperBody.head.earType == EarType.BUNNY)
                DisplayText.text("  A pair of floppy rabbit ears stick up from the top of your head, flopping around as you walk.");
            else if (player.upperBody.head.earType == EarType.FOX)
                DisplayText.text("  A pair of large, adept fox ears sit high on your head, always listening.");
            else if (player.upperBody.head.earType == EarType.DRAGON)
                DisplayText.text("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.");
            else if (player.upperBody.head.earType == EarType.RACCOON)
                DisplayText.text("  A pair of vaguely egg-shaped, furry raccoon ears adorns your head.");
            else if (player.upperBody.head.earType == EarType.MOUSE)
                DisplayText.text("  A pair of large, dish-shaped mouse ears tops your head.");
            if (player.upperBody.head.antennae == AntennaeType.BEE)
                DisplayText.text("  Floppy antennae also appear on your skull, bouncing and swaying in the breeze.");
        }
        //not bald
        else {
            if (player.upperBody.head.earType == EarType.HUMAN)
                DisplayText.text("  Your " + HeadDescriptor.describeHair(player) + " looks good on you, accentuating your features well.");
            else if (player.upperBody.head.earType == EarType.FERRET)
                DisplayText.text("  A pair of small, rounded ferret ears burst through the top of your " + HeadDescriptor.describeHair(player) + ".");
            else if (player.upperBody.head.earType == EarType.HORSE)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " on your head parts around a pair of very horse-like ears that grow up from your head.");
            else if (player.upperBody.head.earType == EarType.DOG)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " on your head is overlapped by a pair of pointed dog ears.");
            else if (player.upperBody.head.earType == EarType.COW)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of rounded cow ears that stick out sideways.");
            else if (player.upperBody.head.earType == EarType.ELFIN)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of cute pointed ears, bigger than your old human ones.");
            else if (player.upperBody.head.earType == EarType.CAT)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of cute, fuzzy cat ears, sprouting from atop your head and pivoting towards any sudden noises.");
            else if (player.upperBody.head.earType == EarType.LIZARD)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " atop your head makes it nigh-impossible to notice the two small rounded openings that are your ears.");
            else if (player.upperBody.head.earType == EarType.BUNNY)
                DisplayText.text("  A pair of floppy rabbit ears stick up out of your " + HeadDescriptor.describeHair(player) + ", bouncing around as you walk.");
            else if (player.upperBody.head.earType == EarType.KANGAROO)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of long, furred kangaroo ears that stick out at an angle.");
            else if (player.upperBody.head.earType == EarType.FOX)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of large, adept fox ears that always seem to be listening.");
            else if (player.upperBody.head.earType == EarType.DRAGON)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.");
            else if (player.upperBody.head.earType == EarType.RACCOON)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " on your head parts around a pair of egg-shaped, furry raccoon ears.");
            else if (player.upperBody.head.earType == EarType.MOUSE)
                DisplayText.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is funneled between and around a pair of large, dish-shaped mouse ears that stick up prominently.");
            if (player.upperBody.head.antennae == AntennaeType.BEE) {
                if (player.upperBody.head.earType == EarType.BUNNY)
                    DisplayText.text("  Limp antennae also grow from just behind your hairline, waving and swaying in the breeze with your ears.");
                else DisplayText.text("  Floppy antennae also grow from just behind your hairline, bouncing and swaying in the breeze.");
            }
        }
    }

    private tongue(player: Player) {
        if (player.upperBody.head.face.tongueType == TongueType.SNAKE)
            DisplayText.text("  A snake-like tongue occasionally flits between your lips, tasting the air.");
        else if (player.upperBody.head.face.tongueType == TongueType.DEMONIC)
            DisplayText.text("  A slowly undulating tongue occasionally slips from between your lips.  It hangs nearly two feet long when you let the whole thing slide out, though you can retract it to appear normal.");
        else if (player.upperBody.head.face.tongueType == TongueType.DRACONIC)
            DisplayText.text("  Your mouth contains a thick, fleshy tongue that, if you so desire, can telescope to a distance of about four feet.  It has sufficient manual dexterity that you can use it almost like a third arm.");
    }

    private horns(player: Player) {
        //Demonic horns
        if (player.upperBody.head.hornType == HornType.DEMON) {
            if (player.upperBody.head.horns == 2)
                DisplayText.text("  A small pair of pointed horns has broken through the " + player.skinDesc + " on your forehead, proclaiming some demonic taint to any who see them.");
            if (player.upperBody.head.horns == 4)
                DisplayText.text("  A quartet of prominent horns has broken through your " + player.skinDesc + ".  The back pair are longer, and curve back along your head.  The front pair protrude forward demonically.");
            if (player.upperBody.head.horns == 6)
                DisplayText.text("  Six horns have sprouted through your " + player.skinDesc + ", the back two pairs curve backwards over your head and down towards your neck, while the front two horns stand almost eight inches long upwards and a little forward.");
            if (player.upperBody.head.horns >= 8)
                DisplayText.text("  A large number of thick demonic horns sprout through your " + player.skinDesc + ", each pair sprouting behind the ones before.  The front jut forwards nearly ten inches while the rest curve back over your head, some of the points ending just below your ears.  You estimate you have a total of " + Utils.numToCardinalText(player.upperBody.head.horns) + " horns.");
        }
        //Minotaur horns
        if (player.upperBody.head.hornType == HornType.COW_MINOTAUR) {
            if (player.upperBody.head.horns < 3)
                DisplayText.text("  Two tiny horn-like nubs protrude from your forehead, resembling the horns of the young livestock kept by your village.");
            if (player.upperBody.head.horns >= 3 && player.upperBody.head.horns < 6)
                DisplayText.text("  Two moderately sized horns grow from your forehead, similar in size to those on a young bovine.");
            if (player.upperBody.head.horns >= 6 && player.upperBody.head.horns < 12)
                DisplayText.text("  Two large horns sprout from your forehead, curving forwards like those of a bull.");
            if (player.upperBody.head.horns >= 12 && player.upperBody.head.horns < 20)
                DisplayText.text("  Two very large and dangerous looking horns sprout from your head, curving forward and over a foot long.  They have dangerous looking points.");
            if (player.upperBody.head.horns >= 20)
                DisplayText.text("  Two huge horns erupt from your forehead, curving outward at first, then forwards.  The weight of them is heavy, and they end in dangerous looking points.");
        }
        //Lizard horns
        if (player.upperBody.head.hornType == HornType.DRACONIC_X2) {
            DisplayText.text("  A pair of " + Utils.numToCardinalText(player.upperBody.head.horns) + " inch horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.");
        }
        //Super lizard horns
        if (player.upperBody.head.hornType == HornType.DRACONIC_X4_12_INCH_LONG)
            DisplayText.text("  Two pairs of horns, roughly a foot long, sprout from the sides of your head.  They sweep back and give you a fearsome look, almost like the dragons from your village's legends.");
        //Antlers!
        if (player.upperBody.head.hornType == HornType.ANTLERS) {
            if (player.upperBody.head.horns > 0)
                DisplayText.text("  Two antlers, forking into " + Utils.numToCardinalText(player.upperBody.head.horns) + " points, have sprouted from the top of your head, forming a spiky, regal crown of bone.");
        }
        //BODY PG HERE
        DisplayText.text("You have a humanoid shape with the usual torso, arms, hands, and fingers.");
    }

    private wings(player: Player) {
        if (player.upperBody.wingType == WingType.BEE_LIKE_SMALL)
            DisplayText.text("  A pair of tiny-yet-beautiful bee-wings sprout from your back, too small to allow you to fly.");
        if (player.upperBody.wingType == WingType.BEE_LIKE_LARGE)
            DisplayText.text("  A pair of large bee-wings sprout from your back, reflecting the light through their clear membranes beautifully.  They flap quickly, allowing you to easily hover in place or fly.");
        if (player.upperBody.wingType == WingType.BAT_LIKE_TINY)
            DisplayText.text("  A pair of tiny bat-like demon-wings sprout from your back, flapping cutely, but otherwise being of little use.");
        if (player.upperBody.wingType == WingType.BAT_LIKE_LARGE)
            DisplayText.text("  A pair of large bat-like demon-wings fold behind your shoulders.  With a muscle-twitch, you can extend them, and use them to soar gracefully through the air.");
        if (player.upperBody.wingType == WingType.SHARK_FIN)
            DisplayText.text("  A large shark-like fin has sprouted between your shoulder blades.  With it you have far more control over swimming underwater.");
        if (player.upperBody.wingType == WingType.FEATHERED_LARGE)
            DisplayText.text("  A pair of large, feathery wings sprout from your back.  Though you usually keep the " + player.upperBody.head.hairColor + "-colored wings folded close, they can unfurl to allow you to soar as gracefully as a harpy.");
        if (player.upperBody.wingType == WingType.DRACONIC_SMALL)
            DisplayText.text("  Small, vestigial wings sprout from your shoulders.  They might look like bat's wings, but the membranes are covered in fine, delicate scales.");
        else if (player.upperBody.wingType == WingType.DRACONIC_LARGE)
            DisplayText.text("  Magnificent wings sprout from your shoulders.  When unfurled they stretch further than your arm span, and a single beat of them is all you need to set out toward the sky.  They look a bit like bat's wings, but the membranes are covered in fine, delicate scales and a wicked talon juts from the end of each bone.");
        else if (player.upperBody.wingType == WingType.GIANT_DRAGONFLY)
            DisplayText.text("  Giant dragonfly wings hang from your shoulders.  At a whim, you could twist them into a whirring rhythm fast enough to lift you off the ground and allow you to fly.");

        //Wing arms
        if (player.upperBody.armType == ArmType.HARPY)
            DisplayText.text("  Feathers hang off your arms from shoulder to wrist, giving them a slightly wing-like look.");
        else if (player.upperBody.armType == ArmType.SPIDER)
            DisplayText.text("  Shining black exoskeleton  covers your arms from the biceps down, resembling a pair of long black gloves from a distance.");
    }

    private hips(player: Player) {
        if (player.lowerBody.type == LowerBodyType.PONY)
            DisplayText.text("  From the waist down you have an incredibly cute and cartoonish parody of a horse's body, with all four legs ending in flat, rounded feet.");
        else if (player.lowerBody.isTaur())
            DisplayText.text("  From the waist down you have the body of a horse, with all four legs capped by hooves.");
        //Hip info only displays if you aren't a centaur. 
        if (!player.lowerBody.isTaur()) {
            if (player.thickness > 70) {
                DisplayText.text("  You have " + LowerBodyDescriptor.describeHips(player));
                if (player.lowerBody.hipRating < 6) {
                    if (player.tone < 65)
                        DisplayText.text(" buried under a noticeable muffin-top, and");
                    else DisplayText.text(" that blend into your pillar-like waist, and");
                }
                if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                    DisplayText.text(" that blend into the rest of your thick form, and");
                if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                    DisplayText.text(" that would be much more noticeable if you weren't so wide-bodied, and");
                if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                    DisplayText.text(" that sway and emphasize your thick, curvy shape, and");
                if (player.lowerBody.hipRating >= 20)
                    DisplayText.text(" that sway hypnotically on your extra-curvy frame, and");
            }
            else if (player.thickness < 30) {
                DisplayText.text("  You have " + LowerBodyDescriptor.describeHips(player));
                if (player.lowerBody.hipRating < 6)
                    DisplayText.text(" that match your trim, lithe body, and");
                if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                    DisplayText.text(" that sway to and fro, emphasized by your trim body, and");
                if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                    DisplayText.text(" that swell out under your trim waistline, and");
                if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                    DisplayText.text(", emphasized by your narrow waist, and");
                if (player.lowerBody.hipRating >= 20)
                    DisplayText.text(" that swell disproportionately wide on your lithe frame, and");
            }
            //STANDARD
            else {
                DisplayText.text("  You have " + LowerBodyDescriptor.describeHips(player));
                if (player.lowerBody.hipRating < 6)
                    DisplayText.text(", and");
                if (player.femininity > 50) {
                    if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                        DisplayText.text(" that draw the attention of those around you, and");
                    if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                        DisplayText.text(" that make you walk with a sexy, swinging gait, and");
                    if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                        DisplayText.text(" that make it look like you've birthed many children, and");
                    if (player.lowerBody.hipRating >= 20)
                        DisplayText.text(" that make you look more like an animal waiting to be bred than any kind of human, and");
                }
                else {
                    if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                        DisplayText.text(" that give you a graceful stride, and");
                    if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                        DisplayText.text(" that add a little feminine swing to your gait, and");
                    if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                        DisplayText.text(" that force you to sway and wiggle as you move, and");
                    if (player.lowerBody.hipRating >= 20) {
                        DisplayText.text(" that give your ");
                        if (player.lowerBody.balls > 0)
                            DisplayText.text("balls plenty of room to breathe");
                        else if (player.lowerBody.cockSpot.hasCock())
                            DisplayText.text(CockDescriptor.describeMultiCock(player) + " plenty of room to swing");
                        else if (player.lowerBody.vaginaSpot.hasVagina())
                            DisplayText.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " a nice, wide berth");
                        else DisplayText.text("vacant groin plenty of room");
                        DisplayText.text(", and");
                    }
                }
            }
        }
    }

    private butt(player: Player) {
        if (player.lowerBody.isTaur()) {
            //FATBUTT
            if (player.tone < 65) {
                DisplayText.text("  Your " + ButtDescriptor.describeButt(player));
                if (player.lowerBody.butt.buttRating < 4)
                    DisplayText.text(" is lean, from what you can see of it.");
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    DisplayText.text(" looks fairly average.");
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    DisplayText.text(" is fairly plump and healthy.");
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    DisplayText.text(" jiggles a bit as you trot around.");
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    DisplayText.text(" jiggles and wobbles as you trot about.");
                if (player.lowerBody.butt.buttRating >= 20)
                    DisplayText.text(" is obscenely large, bordering freakish, even for a horse.");
            }
            //GIRL LOOK AT DAT BOOTY
            else {
                DisplayText.text("  Your " + ButtDescriptor.describeButt(player));
                if (player.lowerBody.butt.buttRating < 4)
                    DisplayText.text(" is barely noticable, showing off the muscles of your haunches.");
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    DisplayText.text(" matches your toned equine frame quite well.");
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    DisplayText.text(" gives hints of just how much muscle you could put into a kick.");
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    DisplayText.text(" surges with muscle whenever you trot about.");
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    DisplayText.text(" flexes its considerable mass as you move.");
                if (player.lowerBody.butt.buttRating >= 20)
                    DisplayText.text(" is stacked with layers of muscle, huge even for a horse.");
            }
        }
        //Non-horse PCs
        else {
            //TUBBY ASS
            if (player.tone < 60) {
                DisplayText.text(" your " + ButtDescriptor.describeButt(player));
                if (player.lowerBody.butt.buttRating < 4)
                    DisplayText.text(" looks great under your gear.");
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    DisplayText.text(" has the barest amount of sexy jiggle.");
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    DisplayText.text(" fills out your clothing nicely.");
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    DisplayText.text(" wobbles enticingly with every step.");
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    DisplayText.text(" wobbles like a bowl full of jello as you walk.");
                if (player.lowerBody.butt.buttRating >= 20)
                    DisplayText.text(" is obscenely large, bordering freakish, and makes it difficult to run.");
            }
            //FITBUTT
            else {
                DisplayText.text(" your " + ButtDescriptor.describeButt(player));
                if (player.lowerBody.butt.buttRating < 4)
                    DisplayText.text(" molds closely against your form.");
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    DisplayText.text(" contracts with every motion, displaying the detailed curves of its lean musculature.");
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    DisplayText.text(" fills out your clothing nicely.");
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    DisplayText.text(" stretches your gear, flexing it with each step.");
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    DisplayText.text(" threatens to bust out from under your kit each time you clench it.");
                if (player.lowerBody.butt.buttRating >= 20)
                    DisplayText.text(" is marvelously large, but completely stacked with muscle.");
            }
        }
    }

    private tail(player: Player) {
        if (player.lowerBody.tailType == TailType.HORSE)
            DisplayText.text("  A long " + player.upperBody.head.hairColor + " horsetail hangs from your " + ButtDescriptor.describeButt(player) + ", smooth and shiny.");
        if (player.lowerBody.tailType == TailType.FERRET)
            DisplayText.text("  A long ferret tail sprouts from above your [butt].  It is thin, tapered, and covered in shaggy " + player.upperBody.head.hairColor + " fur.");
        if (player.lowerBody.tailType == TailType.DOG)
            DisplayText.text("  A fuzzy " + player.upperBody.head.hairColor + " dogtail sprouts just above your " + ButtDescriptor.describeButt(player) + ", wagging to and fro whenever you are happy.");
        if (player.lowerBody.tailType == TailType.DEMONIC)
            DisplayText.text("  A narrow tail ending in a spaded tip curls down from your " + ButtDescriptor.describeButt(player) + ", wrapping around your " + LowerBodyDescriptor.describeLeg(player) + " sensually at every opportunity.");
        if (player.lowerBody.tailType == TailType.COW)
            DisplayText.text("  A long cowtail with a puffy tip swishes back and forth as if swatting at flies.");
        if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN) {
            DisplayText.text("  A large, spherical spider-abdomen has grown out from your backside, covered in shiny black chitin.  Though it's heavy and bobs with every motion, it doesn't seem to slow you down.");
            if (player.lowerBody.tailVenom > 50 && player.lowerBody.tailVenom < 80)
                DisplayText.text("  Your bulging arachnid posterior feels fairly full of webbing.");
            if (player.lowerBody.tailVenom >= 80 && player.lowerBody.tailVenom < 100)
                DisplayText.text("  Your arachnid rear bulges and feels very full of webbing.");
            if (player.lowerBody.tailVenom == 100)
                DisplayText.text("  Your swollen spider-butt is distended with the sheer amount of webbing it's holding.");
        }
        if (player.lowerBody.tailType == TailType.BEE_ABDOMEN) {
            DisplayText.text("  A large insectile bee-abdomen dangles from just above your backside, bobbing with its own weight as you shift.  It is covered in hard chitin with black and yellow stripes, and tipped with a dagger-like stinger.");
            if (player.lowerBody.tailVenom > 50 && player.lowerBody.tailVenom < 80)
                DisplayText.text("  A single drop of poison hangs from your exposed stinger.");
            if (player.lowerBody.tailVenom >= 80 && player.lowerBody.tailVenom < 100)
                DisplayText.text("  Poisonous bee venom coats your stinger completely.");
            if (player.lowerBody.tailVenom == 100)
                DisplayText.text("  Venom drips from your poisoned stinger regularly.");
        }
        if (player.lowerBody.tailType == TailType.SHARK) {
            DisplayText.text("  A long shark-tail trails down from your backside, swaying to and fro while giving you a dangerous air.");
        }
        if (player.lowerBody.tailType == TailType.CAT) {
            DisplayText.text("  A soft " + player.upperBody.head.hairColor + " cat-tail sprouts just above your " + ButtDescriptor.describeButt(player) + ", curling and twisting with every step to maintain perfect balance.");
        }
        if (player.lowerBody.tailType == TailType.LIZARD) {
            DisplayText.text("  A tapered tail hangs down from just above your " + ButtDescriptor.describeButt(player) + ".  It sways back and forth, assisting you with keeping your balance.");
        }
        if (player.lowerBody.tailType == TailType.BUNNY)
            DisplayText.text("  A short, soft bunny tail sprouts just above your " + ButtDescriptor.describeButt(player) + ", twitching constantly whenever you don't think about it.");
        else if (player.lowerBody.tailType == TailType.HARPY)
            DisplayText.text("  A tail of feathers fans out from just above your " + ButtDescriptor.describeButt(player) + ", twitching instinctively to help guide you if you were to take flight.");
        else if (player.lowerBody.tailType == TailType.KANGAROO) {
            DisplayText.text("  A conical, ");
            if (player.skinType == SkinType.GOO)
                DisplayText.text("gooey, " + player.skinTone);
            else DisplayText.text("furry, " + player.upperBody.head.hairColor);
            DisplayText.text(", tail extends from your " + ButtDescriptor.describeButt(player) + ", bouncing up and down as you move and helping to counterbalance you.");
        }
        else if (player.lowerBody.tailType == TailType.FOX) {
            if (player.lowerBody.tailVenom == 1)
                DisplayText.text("  A swishing " + player.upperBody.head.hairColor + " fox's brush extends from your " + ButtDescriptor.describeButt(player) + ", curling around your body - the soft fur feels lovely.");
            else DisplayText.text("  " + Utils.numToCardinalCapText(player.lowerBody.tailVenom) + " swishing " + player.upperBody.head.hairColor + " fox's tails extend from your " + ButtDescriptor.describeButt(player) + ", curling around your body - the soft fur feels lovely.");
        }
        else if (player.lowerBody.tailType == TailType.DRACONIC) {
            DisplayText.text("  A thin, scaly, prehensile reptilian tail, almost as long as you are tall, swings behind you like a living bullwhip.  Its tip menaces with spikes of bone, meant to deliver painful blows.");
        }
        //appearance
        else if (player.lowerBody.tailType == TailType.RACCOON) {
            DisplayText.text("  A black-and-" + player.upperBody.head.hairColor + "-ringed raccoon tail waves behind you.");
        }
        else if (player.lowerBody.tailType == TailType.MOUSE) {
            //appearance
            DisplayText.text("  A naked, " + player.skinTone + " mouse tail pokes from your butt, dragging on the ground and twitching occasionally.");
        }
    }

    private lowerBody(player: Player) {
        if (player.lowerBody.type == LowerBodyType.HUMAN)
            DisplayText.text("  Two normal human legs grow down from your waist, ending in normal human feet.");
        else if (player.lowerBody.type == LowerBodyType.FERRET) DisplayText.text("  Two furry, digitigrade legs form below your [hips].  The fur is thinner on the feet, and your toes are tipped with claws.");
        else if (player.lowerBody.type == LowerBodyType.HOOFED)
            DisplayText.text("  Your legs are muscled and jointed oddly, covered in fur, and end in a pair of bestial hooves.");
        else if (player.lowerBody.type == LowerBodyType.DOG)
            DisplayText.text("  Two digitigrade legs grow downwards from your waist, ending in dog-like hind-paws.");
        else if (player.lowerBody.type == LowerBodyType.NAGA)
            DisplayText.text("  Below your waist your flesh is fused together into a very long snake-like tail.");
        //Horse body is placed higher for readability purposes
        else if (player.lowerBody.type == LowerBodyType.DEMONIC_HIGH_HEELS)
            DisplayText.text("  Your perfect lissome legs end in mostly human feet, apart from the horn protruding straight down from the heel that forces you to walk with a sexy, swaying gait.");
        else if (player.lowerBody.type == LowerBodyType.DEMONIC_CLAWS)
            DisplayText.text("  Your lithe legs are capped with flexible clawed feet.  Sharp black nails grow where once you had toe-nails, giving you fantastic grip.");
        else if (player.lowerBody.type == LowerBodyType.BEE)
            DisplayText.text("  Your legs are covered in a shimmering insectile carapace up to mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.  A bit of downy yellow and black fur fuzzes your upper thighs, just like a bee.");
        else if (player.lowerBody.type == LowerBodyType.GOO)
            DisplayText.text("  In place of legs you have a shifting amorphous blob.  Thankfully it's quite easy to propel yourself around on.  The lowest portions of your " + player.inventory.armorSlot.equipment.displayName + " float around inside you, bringing you no discomfort.");
        else if (player.lowerBody.type == LowerBodyType.CAT)
            DisplayText.text("  Two digitigrade legs grow downwards from your waist, ending in soft, padded cat-paws.");
        else if (player.lowerBody.type == LowerBodyType.LIZARD)
            DisplayText.text("  Two digitigrade legs grow down from your " + LowerBodyDescriptor.describeHips(player) + ", ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.");
        else if (player.lowerBody.type == LowerBodyType.BUNNY)
            DisplayText.text("  Your legs thicken below the waist as they turn into soft-furred rabbit-like legs.  You even have large bunny feet that make hopping around a little easier than walking.");
        else if (player.lowerBody.type == LowerBodyType.HARPY)
            DisplayText.text("  Your legs are covered with " + player.upperBody.head.hairColor + " plumage.  Thankfully the thick, powerful thighs are perfect for launching you into the air, and your feet remain mostly human, even if they are two-toed and tipped with talons.");
        else if (player.lowerBody.type == LowerBodyType.KANGAROO)
            DisplayText.text("  Your furry legs have short thighs and long calves, with even longer feet ending in prominently-nailed toes.");
        else if (player.lowerBody.type == LowerBodyType.CHITINOUS_SPIDER_LEGS)
            DisplayText.text("  Your legs are covered in a reflective black, insectile carapace up to your mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.");
        else if (player.lowerBody.type == LowerBodyType.DRIDER_LOWER_BODY)
            DisplayText.text("  Where your legs would normally start you have grown the body of a spider, with eight spindly legs that sprout from its sides.");
        else if (player.lowerBody.type == LowerBodyType.FOX)
            DisplayText.text("  Your legs are crooked into high knees with hocks and long feet, like those of a fox; cute bulbous toes decorate the ends.");
        else if (player.lowerBody.type == LowerBodyType.DRAGON)
            DisplayText.text("  Two human-like legs grow down from your " + LowerBodyDescriptor.describeHips(player) + ", sheathed in scales and ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.");
        else if (player.lowerBody.type == LowerBodyType.RACCOON)
            DisplayText.text("  Your legs, though covered in fur, are humanlike.  Long feet on the ends bear equally long toes, and the pads on the bottoms are quite sensitive to the touch.");
        if (player.perks.has(PerkType.Incorporeality))
            DisplayText.text("  Of course, your " + LowerBodyDescriptor.describeLegs(player) + " are partially transparent due to their ghostly nature.");

        DisplayText.newline();
        if (player.statusAffects.has(StatusAffectType.GooStuffed)) {
            DisplayText.text("Your gravid-looking belly is absolutely stuffed full of goo. There's no way you can get pregnant like this, but at the same time, you look like some fat-bellied breeder.");
        }
    }

    private pregnancy(player: Player) {
        const pregManager = player.pregnancy;
        const largestIncubationTime = pregManager.listLargestIncubationTime[0].incubation;
        //Pregnancy Shiiiiiitz
        if (pregManager.isButtPregnantWith(PregnancyType.FROG_GIRL) || pregManager.isButtPregnantWith(PregnancyType.SATYR)) {
            if (pregManager.isPregnantWith(PregnancyType.OVIELIXIR_EGGS)) {
                //Compute size
                const eggAmount = player.statusAffects.get(StatusAffectType.Eggs).value3 + player.statusAffects.get(StatusAffectType.Eggs).value2 * 10;
                const pregnancy = pregManager.getPregnancy(PregnancyType.OVIELIXIR_EGGS);
                if (pregnancy.incubation <= 50 && pregnancy.incubation > 20) {
                    DisplayText.bold("Your swollen pregnant belly is as large as a ");
                    if (eggAmount < 10)
                        DisplayText.bold("basketball.");
                    if (eggAmount >= 10 && eggAmount < 20)
                        DisplayText.bold("watermelon.");
                    if (eggAmount >= 20)
                        DisplayText.bold("beach ball.");
                }
                if (pregnancy.incubation <= 20) {
                    DisplayText.bold("Your swollen pregnant belly is as large as a ");
                    if (eggAmount < 10)
                        DisplayText.bold("watermelon.");
                    if (eggAmount >= 10 && eggAmount < 20)
                        DisplayText.bold("beach ball.");
                    if (eggAmount >= 20)
                        DisplayText.bold("large medicine ball.");
                }
            }
            //Satur preggos - only shows if bigger than regular pregnancy or not pregnancy
            else if (pregManager.isButtPregnantWith(PregnancyType.SATYR) && pregManager.buttPregnancy.incubation > largestIncubationTime) {
                if (pregManager.buttPregnancy.incubation < 125 && pregManager.buttPregnancy.incubation >= 75) {
                    DisplayText.bold("You've got the begginings of a small pot-belly.");
                }
                else if (pregManager.buttPregnancy.incubation >= 50) {
                    DisplayText.bold("The unmistakable bulge of pregnancy is visible in your tummy, yet it feels odd inside you - wrong somehow.");
                }
                else if (pregManager.buttPregnancy.incubation >= 30) {
                    DisplayText.bold("Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.");
                }
                else { //Surely Benoit and Cotton deserve their place in this list
                    DisplayText.newline();
                    if (pregManager.isPregnantWith(PregnancyType.IZMA) || pregManager.isPregnantWith(PregnancyType.MOUSE) || pregManager.isPregnantWith(PregnancyType.AMILY) || pregManager.isPregnantWith(PregnancyType.EMBER) || pregManager.isPregnantWith(PregnancyType.BENOIT) || pregManager.isPregnantWith(PregnancyType.COTTON) || pregManager.isPregnantWith(PregnancyType.URTA))
                        DisplayText.bold("Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.");
                    else if (pregManager.isPregnantWith(PregnancyType.MARBLE))
                        DisplayText.bold("Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.");
                    else
                        DisplayText.bold("Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.");
                }
            }
            //URTA PREG
            else if (pregManager.isPregnantWith(PregnancyType.URTA)) {
                const incubation = pregManager.getPregnancy(PregnancyType.URTA).incubation;
                if (incubation <= 432 && incubation > 360) {
                    DisplayText.bold("Your belly is larger than it used to be.");
                }
                if (incubation <= 360 && incubation > 288) {
                    DisplayText.bold("Your belly is more noticably distended.   You're pretty sure it's Urta's.");
                }
                if (incubation <= 288 && incubation > 216) {
                    DisplayText.bold("The unmistakable bulge of pregnancy is visible in your tummy, and the baby within is kicking nowadays.");
                }
                if (incubation <= 216 && incubation > 144) {
                    DisplayText.bold("Your belly is large and very obviously pregnant to anyone who looks at you.  It's gotten heavy enough to be a pain to carry around all the time.");
                }
                if (incubation <= 144 && incubation > 72) {
                    DisplayText.bold("It would be impossible to conceal your growing pregnancy from anyone who glanced your way.  It's large and round, frequently moving.");
                }
                if (incubation <= 72 && incubation > 48) {
                    DisplayText.bold("Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.");
                }
                if (incubation <= 48) {
                    DisplayText.bold("Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.");
                }
            }
            else if (pregManager.isButtPregnantWith(PregnancyType.FROG_GIRL)) {
                if (pregManager.buttPregnancy.incubation >= 8)
                    DisplayText.bold("Your stomach is so full of frog eggs that you look about to birth at any moment, your belly wobbling and shaking with every step you take, packed with frog ovum.");
                else
                    DisplayText.bold("You're stuffed so full with eggs that your belly looks obscenely distended, huge and weighted with the gargantuan eggs crowding your gut. They make your gait a waddle and your gravid tummy wobble obscenely.");
            }
            else if (pregManager.isPregnantWith(PregnancyType.FAERIE)) { //Belly size remains constant throughout the pregnancy
                const incubation = pregManager.getPregnancy(PregnancyType.URTA).incubation;
                DisplayText.bold("Your belly remains swollen like a watermelon. ");
                if (incubation <= 100)
                    DisplayText.bold("It's full of liquid, though unlike a normal pregnancy the passenger you’re carrying is tiny.");
                else if (incubation <= 140)
                    DisplayText.bold("It feels like it’s full of thick syrup or jelly.");
                else DisplayText.bold("It still feels like there’s a solid ball inside your womb.");
            }
            else if (pregManager.isPregnant()) {
                const pregnancy = pregManager.listLargestIncubationTime[0];
                const incubation = pregnancy.incubation;
                if (incubation <= 336 && incubation > 280) {
                    DisplayText.bold("Your belly is larger than it used to be.");
                }
                if (incubation <= 280 && incubation > 216) {
                    DisplayText.bold("Your belly is more noticably distended.   You are probably pregnant.");
                }
                if (incubation <= 216 && incubation > 180) {
                    DisplayText.bold("The unmistakable bulge of pregnancy is visible in your tummy.");
                }
                if (incubation <= 180 && incubation > 120) {
                    DisplayText.bold("Your belly is very obviously pregnant to anyone who looks at you.");
                }
                if (incubation <= 120 && incubation > 72) {
                    DisplayText.bold("It would be impossible to conceal your growing pregnancy from anyone who glanced your way.");
                }
                if (incubation <= 72 && incubation > 48) {
                    DisplayText.bold("Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.");
                }
                if (incubation <= 48) { //Surely Benoit and Cotton deserve their place in this list
                    DisplayText.newline();
                    if (pregnancy.type == PregnancyType.IZMA || pregnancy.type == PregnancyType.MOUSE || pregnancy.type == PregnancyType.AMILY || pregnancy.type == PregnancyType.EMBER || pregnancy.type == PregnancyType.BENOIT || pregnancy.type == PregnancyType.COTTON || pregnancy.type == PregnancyType.URTA)
                        DisplayText.bold("Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.");
                    else if (pregnancy.type == PregnancyType.MARBLE)
                        DisplayText.bold("Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.");
                    else
                        DisplayText.bold("Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.");
                }
            }
        }
    }

    private neck(player: Player) {
        if (player.upperBody.gills)
            DisplayText.text("A pair of feathery gills are growing out just below your neck, spreading out horizontally and draping down your chest.  They allow you to stay in the water for quite a long time.  ");
    }

    private chest(player: Player) {
        const chest = player.upperBody.chest;
        if (chest.count() == 1) {
            const firstRow = chest.get(0);
            DisplayText.text("You have " + Utils.numToCardinalText(firstRow.breasts) + " " + BreastDescriptor.describeBreastRow(firstRow) + ", each supporting ");
            if (firstRow.nipplesPerBreast == 1)
                DisplayText.text(Utils.numToCardinalText(firstRow.nipplesPerBreast) + " " + firstRow.nippleLength + "-inch " + BreastDescriptor.describeNipple(player, firstRow) + ".");
            else
                DisplayText.text(Utils.numToCardinalText(firstRow.nipplesPerBreast) + " " + firstRow.nippleLength + "-inch " + BreastDescriptor.describeNipple(player, firstRow) + "s.");
            if (firstRow.milkFullness > 75)
                DisplayText.text("  Your " + BreastDescriptor.describeBreastRow(firstRow) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.");
            if (firstRow.breastRating >= 1)
                DisplayText.text("  You could easily fill a " + BreastDescriptor.breastCup(firstRow.breastRating) + " bra.");
        }
        else {
            DisplayText.text("You have " + Utils.numToCardinalText(chest.count()) + " rows of breasts, the topmost pair starting at your chest.");
            for (let rowIndex = 0; rowIndex < chest.count(); rowIndex++) {
                const breastRow = chest.get(rowIndex);
                if (rowIndex == 0)
                    DisplayText.text("--Your uppermost rack houses ");
                if (rowIndex == 1)
                    DisplayText.text("--The second row holds ");
                if (rowIndex == 2)
                    DisplayText.text("--Your third row of breasts contains ");
                if (rowIndex == 3)
                    DisplayText.text("--Your fourth set of tits cradles ");
                if (rowIndex == 4)
                    DisplayText.text("--Your fifth and final mammory grouping swells with ");
                DisplayText.text(Utils.numToCardinalText(breastRow.breasts) + " " + BreastDescriptor.describeBreastRow(breastRow) + " with ");
                if (breastRow.nipplesPerBreast == 1)
                    DisplayText.text(Utils.numToCardinalText(breastRow.nipplesPerBreast) + " " + chest.BreastRatingLargest[0].nippleLength + "-inch " + BreastDescriptor.describeNipple(player, breastRow) + " each.");
                else
                    DisplayText.text(Utils.numToCardinalText(breastRow.nipplesPerBreast) + " " + chest.BreastRatingLargest[0].nippleLength + "-inch " + BreastDescriptor.describeNipple(player, breastRow) + "s each.");
                if (breastRow.breastRating >= 1)
                    DisplayText.text("  They could easily fill a " + BreastDescriptor.breastCup(breastRow.breastRating) + " bra.");
                if (breastRow.milkFullness > 75)
                    DisplayText.text("  Your " + BreastDescriptor.describeBreastRow(breastRow) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.");
            }
        }
    }

    private lowerBodySex(player: Player) {
        //Crotchial stuff - mention snake
        if (player.lowerBody.type == LowerBodyType.NAGA && player.gender > 0) {
            DisplayText.text("Your sex");
            if (player.gender == 3 || player.lowerBody.cockSpot.count() > 1)
                DisplayText.text("es are ");
            else DisplayText.text(" is ");
            DisplayText.text("concealed within a cavity in your tail when not in use, though when the need arises, you can part your concealing slit and reveal your true self.");
        }
    }

    private cocks(player: Player) {
        //Cock stuff!
        const cocks = player.lowerBody.cockSpot;
        if (cocks.count() == 1) {
            const firstCock = cocks.get(0);
            if (player.lowerBody.type == LowerBodyType.CENTAUR)
                DisplayText.text("Ever since becoming a centaur, your equipment has shifted to lie between your rear legs, like a horse.");
            DisplayText.text("Your " + CockDescriptor.describeCock(player, firstCock) + " is " + firstCock.cockLength + " inches long and ");
            if (Math.round(10 * firstCock.cockThickness) / 10 < 2) {
                if (Math.round(10 * firstCock.cockThickness) / 10 == 1)
                    DisplayText.text(firstCock.cockThickness + " inch thick.");
                else
                    DisplayText.text(Math.round(10 * firstCock.cockThickness) / 10 + " inches thick.");
            }
            else
                DisplayText.text(Utils.numToCardinalText(Math.round(10 * firstCock.cockThickness) / 10) + " inches wide.");
            //Horsecock flavor
            if (firstCock.cockType == CockType.HORSE) {
                DisplayText.text("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your shaft flares proudly, just like a horse's.");
            }
            //dog cock flavor
            if (firstCock.cockType == CockType.DOG || firstCock.cockType == CockType.FOX) {
                if (firstCock.knotMultiplier >= 1.8)
                    DisplayText.text("  The obscenely swollen lump of flesh near the base of your " + CockDescriptor.describeCock(player, firstCock) + " looks almost too big for your cock.");
                else if (firstCock.knotMultiplier >= 1.4)
                    DisplayText.text("  A large bulge of flesh nestles just above the bottom of your " + CockDescriptor.describeCock(player, firstCock) + ", to ensure it stays where it belongs during mating.");
                else if (firstCock.knotMultiplier > 1)
                    DisplayText.text("  A small knot of thicker flesh is near the base of your " + CockDescriptor.describeCock(player, firstCock) + ", ready to expand to help you lodge it inside a female.");
                //List thickness
                DisplayText.text("  The knot is " + Math.round(firstCock.cockThickness * firstCock.knotMultiplier * 10) / 10 + " inches wide when at full size.");
            }
            //Demon cock flavor
            if (firstCock.cockType == CockType.DEMON) {
                DisplayText.text("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.");
            }
            //Tentacle cock flavor
            if (firstCock.cockType == CockType.TENTACLE) {
                DisplayText.text("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.");
            }
            //Cat cock flavor
            if (firstCock.cockType == CockType.CAT) {
                DisplayText.text("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.");
            }
            //Snake cock flavor
            if (firstCock.cockType == CockType.LIZARD) {
                DisplayText.text("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.");
            }
            //Anemone cock flavor
            if (firstCock.cockType == CockType.ANEMONE) {
                DisplayText.text("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.");
            }
            //Kangawang flavor
            if (firstCock.cockType == CockType.KANGAROO) {
                DisplayText.text("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.");
            }
            //Draconic Cawk Flava flav
            if (firstCock.cockType == CockType.DRAGON) {
                DisplayText.text("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
            }
            if (firstCock.cockType == CockType.BEE) {
                DisplayText.text("  It's a long, smooth black shaft that's rigid to the touch.  Its base is ringed with a layer of four inch long soft bee hair.  The tip has a much finer layer of short yellow hairs.  The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.");
            }
            //Worm flavor
            if (player.statusAffects.has(StatusAffectType.Infested))
                DisplayText.text("  Every now and again a slimy worm coated in spunk slips partway out of your " + CockDescriptor.describeCock(player, firstCock) + ", tasting the air like a snake's tongue.");
            if (firstCock.sock)
                this.sockDescript(firstCock);
        }
        if (cocks.count() > 1) {
            if (player.lowerBody.type == LowerBodyType.CENTAUR)
                DisplayText.text("Where a horse's penis would usually be located, you have instead grown " + CockDescriptor.describeMultiCock(player) + "!");
            else
                DisplayText.text("Where a penis would normally be located, you have instead grown " + CockDescriptor.describeMultiCock(player) + "!");

            for (let cockIndex = 0; cockIndex < cocks.count(); cockIndex++) {
                const curCock = cocks.get(cockIndex);
                switch (Utils.rand(4)) {
                    case 0: {
                        if (cockIndex == 0)
                            DisplayText.text("--Your first ");
                        else
                            DisplayText.text("--Your next ");
                        DisplayText.text(CockDescriptor.describeCock(player, curCock) + " is " + curCock.cockLength + " inches long and ");
                        if (curCock.cockThickness == 1)
                            DisplayText.text("one inch wide.");
                        else if (Math.floor(curCock.cockThickness) >= 2)
                            DisplayText.text(Utils.numToCardinalText(Utils.round(curCock.cockThickness)) + " inches wide.");
                        else
                            DisplayText.text(Utils.round(curCock.cockThickness) + " inches wide.");
                    }
                    case 1: {
                        DisplayText.text("--One of your ");
                        DisplayText.text(CockDescriptor.describeCock(player, curCock) + "s is " + Math.round(10 * curCock.cockLength) / 10 + " inches long and ");
                        if (curCock.cockThickness == 1)
                            DisplayText.text("one inch thick.");
                        else if (Math.floor(curCock.cockThickness) >= 2)
                            DisplayText.text(Utils.numToCardinalText(Utils.round(curCock.cockThickness)) + " inches thick.");
                        else
                            DisplayText.text(Utils.round(curCock.cockThickness) + " inches thick.");
                    }
                    case 2: {
                        if (cockIndex > 0)
                            DisplayText.text("--Another of your ");
                        else
                            DisplayText.text("--One of your ");
                        DisplayText.text(CockDescriptor.describeCock(player, curCock) + "s is " + Math.round(10 * curCock.cockLength) / 10 + " inches long and ");
                        if (curCock.cockThickness == 1)
                            DisplayText.text("one inch thick.");
                        else if (Math.floor(curCock.cockThickness) >= 2)
                            DisplayText.text(Utils.numToCardinalText(Utils.round(curCock.cockThickness)) + " inches thick.");
                        else
                            DisplayText.text(Utils.round(curCock.cockThickness) + " inches thick.");
                    }
                    case 3: {
                        if (cockIndex > 0)
                            DisplayText.text("--Your next ");
                        else
                            DisplayText.text("--Your first ");
                        DisplayText.text(CockDescriptor.describeCock(player, curCock) + " is " + Math.round(10 * curCock.cockLength) / 10 + " inches long and ");
                        if (curCock.cockThickness == 1)
                            DisplayText.text("one inch in diameter.");
                        else if (Math.floor(curCock.cockThickness) >= 2)
                            DisplayText.text(Utils.numToCardinalText(Math.round(curCock.cockThickness * 10) / 10) + " inches in diameter.");
                        else
                            DisplayText.text(Math.round(curCock.cockThickness * 10) / 10 + " inches in diameter.");
                    }
                }
                //horse cock flavor
                if (curCock.cockType == CockType.HORSE) {
                    DisplayText.text("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your " + CockDescriptor.describeCock(player, curCock) + " flares proudly, just like a horse's.");
                }
                //dog cock flavor
                if ((curCock.cockType == CockType.DOG) || (curCock.cockType == CockType.FOX)) {
                    DisplayText.text("  It is shiny, pointed, and covered in veins, just like a large ");
                    if (curCock.cockType == CockType.DOG)
                        DisplayText.text("dog's cock.");
                    else
                        DisplayText.text("fox's cock.");

                    if (curCock.knotMultiplier >= 1.8)
                        DisplayText.text("  The obscenely swollen lump of flesh near the base of your " + CockDescriptor.describeCock(player, curCock) + " looks almost comically mismatched for your " + CockDescriptor.describeCock(player, curCock) + ".");
                    else if (curCock.knotMultiplier >= 1.4)
                        DisplayText.text("  A large bulge of flesh nestles just above the bottom of your " + CockDescriptor.describeCock(player, curCock) + ", to ensure it stays where it belongs during mating.");
                    else if (curCock.knotMultiplier > 1)
                        DisplayText.text("  A small knot of thicker flesh is near the base of your " + CockDescriptor.describeCock(player, curCock) + ", ready to expand to help you lodge your " + CockDescriptor.describeCock(player, curCock) + " inside a female.");
                    //List knot thickness
                    DisplayText.text("  The knot is " + Math.floor(curCock.cockThickness * curCock.knotMultiplier * 10) / 10 + " inches thick when at full size.");
                }
                //Demon cock flavor
                if (curCock.cockType == CockType.DEMON) {
                    DisplayText.text("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.");
                }
                //Tentacle cock flavor
                if (curCock.cockType == CockType.TENTACLE) {
                    DisplayText.text("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.");
                }
                //Cat cock flavor
                if (curCock.cockType == CockType.CAT) {
                    DisplayText.text("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.");
                }
                //Snake cock flavor
                if (curCock.cockType == CockType.LIZARD) {
                    DisplayText.text("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.");
                }
                //Anemone cock flavor
                if (curCock.cockType == CockType.ANEMONE) {
                    DisplayText.text("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.");
                }
                //Kangwang flavor
                if (curCock.cockType == CockType.KANGAROO) {
                    DisplayText.text("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.");
                }
                //Draconic Cawk Flava flav
                if (curCock.cockType == CockType.DRAGON) {
                    DisplayText.text("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
                }
            }
            //Worm flavor
            if (player.statusAffects.has(StatusAffectType.Infested))
                DisplayText.text("Every now and again slimy worms coated in spunk slip partway out of your " + CockDescriptor.describeMultiCockShort(player) + ", tasting the air like tongues of snakes.");
        }
    }

    private balls(player: Player) {
        if (player.lowerBody.balls > 0) {
            if (player.statusAffects.has(StatusAffectType.Uniball)) {
                if (player.skinType != SkinType.GOO)
                    DisplayText.text("Your [sack] clings tightly to your groin, holding " + BallsDescriptor.describeBalls(false, true, player, true) + " snugly against you.");
                else if (player.skinType == SkinType.GOO)
                    DisplayText.text("Your [sack] clings tightly to your groin, dripping and holding " + BallsDescriptor.describeBalls(false, true, player, true) + " snugly against you.");
            }
            else if (player.lowerBody.cockSpot.count() == 0) {
                if (player.skinType == SkinType.PLAIN)
                    DisplayText.text("A " + BallsDescriptor.describeSack(player) + " with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily under where a penis would normally grow.");
                if (player.skinType == SkinType.FUR)
                    DisplayText.text("A fuzzy " + BallsDescriptor.describeSack(player) + " filled with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings low under where a penis would normally grow.");
                if (player.skinType == SkinType.SCALES)
                    DisplayText.text("A scaley " + BallsDescriptor.describeSack(player) + " hugs your " + BallsDescriptor.describeBalls(false, true, player, true) + " tightly against your body.");
                if (player.skinType == SkinType.GOO)
                    DisplayText.text("An oozing, semi-solid sack with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily under where a penis would normally grow.");
            }
            else {
                if (player.skinType == SkinType.PLAIN)
                    DisplayText.text("A " + BallsDescriptor.describeSack(player) + " with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily beneath your " + CockDescriptor.describeMultiCockShort(player) + ".");
                if (player.skinType == SkinType.FUR)
                    DisplayText.text("A fuzzy " + BallsDescriptor.describeSack(player) + " filled with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings low under your " + CockDescriptor.describeMultiCockShort(player) + ".");
                if (player.skinType == SkinType.SCALES)
                    DisplayText.text("A scaley " + BallsDescriptor.describeSack(player) + " hugs your " + BallsDescriptor.describeBalls(false, true, player, true) + " tightly against your body.");
                if (player.skinType == SkinType.GOO)
                    DisplayText.text("An oozing, semi-solid sack with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily beneath your " + CockDescriptor.describeMultiCockShort(player) + ".");
            }
            DisplayText.text("  You estimate each of them to be about " + Utils.numToCardinalText(Math.round(player.lowerBody.ballSize)) + " ");
            if (Math.round(player.lowerBody.ballSize) == 1)
                DisplayText.text("inch");
            else DisplayText.text("inches");
            DisplayText.text(" across.");
        }
    }

    private vaginas(player: Player) {
        const vaginas = player.lowerBody.vaginaSpot;
        if (vaginas.count() > 0) {
            const firstVagina = vaginas.get(0);
            if (player.gender == Gender.FEMALE && player.lowerBody.type == LowerBodyType.CENTAUR)
                DisplayText.text("Ever since becoming a centaur, your womanly parts have shifted to lie between your rear legs, in a rather equine fashion.");
            DisplayText.newline();
            if (vaginas.count() == 1)
                DisplayText.text("You have a " + VaginaDescriptor.describeVagina(player, firstVagina) + ", with a " + firstVagina.clitLength + "-inch clit");
            if (firstVagina.virgin)
                DisplayText.text(" and an intact hymen");
            DisplayText.text(".  ");
            if (vaginas.count() > 1)
                DisplayText.text("You have " + vaginas.count() + " " + VaginaDescriptor.describeVagina(player, firstVagina) + "s, with " + firstVagina.clitLength + "-inch clits each.  ");
            if (player.stats.lib < 50 && player.stats.lust < 50) { //not particularly horny
                //Wetness
                if (firstVagina.vaginalWetness >= VaginaWetness.WET && firstVagina.vaginalWetness < VaginaWetness.DROOLING)
                    DisplayText.text("Moisture gleams in ");
                if (firstVagina.vaginalWetness >= VaginaWetness.DROOLING) {
                    DisplayText.text("Occasional beads of lubricant drip from ");
                }
                //Different description based on vag looseness
                if (firstVagina.vaginalWetness >= VaginaWetness.WET) {
                    if (firstVagina.vaginalLooseness < VaginaLooseness.LOOSE)
                        DisplayText.text("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ". ");
                    if (firstVagina.vaginalLooseness >= VaginaLooseness.LOOSE && firstVagina.vaginalLooseness < VaginaLooseness.GAPING_WIDE)
                        DisplayText.text("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ", its lips slightly parted. ");
                    if (firstVagina.vaginalLooseness >= VaginaLooseness.GAPING_WIDE)
                        DisplayText.text("the massive hole that is your " + VaginaDescriptor.describeVagina(player, firstVagina) + ".  ");
                }
            }
            if ((player.stats.lib >= 50 || player.stats.lust >= 50) && (player.stats.lib < 80 && player.stats.lust < 80)) { //kinda horny
                //Wetness
                if (firstVagina.vaginalWetness < VaginaWetness.WET)
                    DisplayText.text("Moisture gleams in ");
                if (firstVagina.vaginalWetness >= VaginaWetness.WET && firstVagina.vaginalWetness < VaginaWetness.DROOLING) {
                    DisplayText.text("Occasional beads of lubricant drip from ");
                }
                if (firstVagina.vaginalWetness >= VaginaWetness.DROOLING) {
                    DisplayText.text("Thin streams of lubricant occasionally dribble from ");
                }
                //Different description based on vag looseness
                if (firstVagina.vaginalLooseness < VaginaLooseness.LOOSE)
                    DisplayText.text("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ". ");
                if (firstVagina.vaginalLooseness >= VaginaLooseness.LOOSE && firstVagina.vaginalLooseness < VaginaLooseness.GAPING_WIDE)
                    DisplayText.text("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ", its lips slightly parted. ");
                if (firstVagina.vaginalLooseness >= VaginaLooseness.GAPING_WIDE)
                    DisplayText.text("the massive hole that is your " + VaginaDescriptor.describeVagina(player, firstVagina) + ".  ");
            }
            if ((player.stats.lib > 80 || player.stats.lust > 80)) { //WTF horny!
                //Wetness
                if (firstVagina.vaginalWetness < VaginaWetness.WET) {
                    DisplayText.text("Occasional beads of lubricant drip from ");
                }
                if (firstVagina.vaginalWetness >= VaginaWetness.WET && firstVagina.vaginalWetness < VaginaWetness.DROOLING) {
                    DisplayText.text("Thin streams of lubricant occasionally dribble from ");
                }
                if (firstVagina.vaginalWetness >= VaginaWetness.DROOLING) {
                    DisplayText.text("Thick streams of lubricant drool constantly from ");
                }
                //Different description based on vag looseness
                if (firstVagina.vaginalLooseness < VaginaLooseness.LOOSE)
                    DisplayText.text("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ". ");
                if (firstVagina.vaginalLooseness >= VaginaLooseness.LOOSE && firstVagina.vaginalLooseness < VaginaLooseness.GAPING_WIDE)
                    DisplayText.text("your " + VaginaDescriptor.describeVagina(player, firstVagina) + ", its lips slightly parted. ");
                if (firstVagina.vaginalLooseness >= VaginaLooseness.GAPING_WIDE)
                    DisplayText.text("the massive hole that is your cunt.  ");
            }
        }

    }

    private noReproductiveOrgans(player: Player) {
        if (player.lowerBody.cockSpot.count() == 0 && player.lowerBody.vaginaSpot.count() == 0) {
            DisplayText.text("You have a curious lack of any sexual endowments.");
        }
    }

    private butthole(player: Player) {
        if (player.lowerBody.butt) {
            DisplayText.text("You have one " + ButtDescriptor.describeButthole(player) + ", placed between your butt-cheeks where it belongs.");
        }
    }

    private piercing(player: Player) {
        const face = player.upperBody.head.face;
        const ears = player.upperBody.head;
        const piercedBreasts = player.upperBody.chest.PiercedNipples;
        const piercedCocks = player.lowerBody.cockSpot.listPiercedCocks;
        if (face.eyebrowPierced > 0)
            DisplayText.text("A solitary " + face.eyebrowPShort + " adorns your eyebrow, looking very stylish.");
        if (ears.earsPierced > 0)
            DisplayText.text("Your ears are pierced with " + ears.earsPShort + ".");
        if (face.nosePierced > 0)
            DisplayText.text("A " + face.nosePShort + " dangles from your nose.");
        if (face.lipPierced > 0)
            DisplayText.text("Shining on your lip, a " + face.lipPShort + " is plainly visible.");
        if (face.tonguePierced > 0)
            DisplayText.text("Though not visible, you can plainly feel your " + face.tonguePShort + " secured in your tongue.");
        if (piercedBreasts.length == 3)
            DisplayText.text("Your " + BreastDescriptor.describeNipple(player, piercedBreasts[0]) + "s ache and tingle with every step, as your heavy " + piercedBreasts[0].nipplesPiercedShort + " swings back and forth.");
        else if (piercedBreasts.length > 0)
            DisplayText.text("Your " + BreastDescriptor.describeNipple(player, piercedBreasts[0]) + "s are pierced with " + piercedBreasts[0].nipplesPiercedShort + ".");
        if (piercedCocks.length > 0) {
            DisplayText.text("Looking positively perverse, a " + piercedCocks[0].piercedShortDesc + " adorns your " + CockDescriptor.describeCock(player, piercedCocks[0]) + ".");
        }
        if (Flags.list[FlagEnum.HAVE_CERAPH_PIERCING])
            DisplayText.text("A magical, ruby-studded bar pierces your belly button, allowing you to summon Ceraph on a whim.");
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            const firstVagina = player.lowerBody.vaginaSpot.get(0);
            if (firstVagina.labiaPierced > 0)
                DisplayText.text("Your " + VaginaDescriptor.describeVagina(player, firstVagina) + " glitters with the " + firstVagina.labiaPShort + " hanging from your lips.");
            if (firstVagina.clitPierced > 0)
                DisplayText.text("Impossible to ignore, your " + VaginaDescriptor.describeClit(player, firstVagina) + " glitters with its " + firstVagina.clitPShort + ".");
        }
    }

    private gems(player: Player) {
        if (player.inventory.gems == 0)
            DisplayText.text("Your money-purse is devoid of any currency.");
        if (player.inventory.gems > 1)
            DisplayText.text("You have " + player.inventory.gems + " shining gems, collected in your travels.");
        if (player.inventory.gems == 1)
            DisplayText.text("You have " + player.inventory.gems + " shining gem, collected in your travels.");
    }

    private sockDescript(cock: Cock) {
        DisplayText.text("  ");
        if (cock.sock == "wool")
            DisplayText.text("It's covered by a wooly white cock-sock, keeping it snug and warm despite how cold it might get.");
        else if (cock.sock == "alabaster")
            DisplayText.text("It's covered by a white, lacey cock-sock, snugly wrapping around it like a bridal dress around a bride.");
        else if (cock.sock == "cockring")
            DisplayText.text("It's covered by a black latex cock-sock with two attached metal rings, keeping your cock just a little harder and [balls] aching for release.");
        else if (cock.sock == "viridian")
            DisplayText.text("It's covered by a lacey dark green cock-sock accented with red rose-like patterns.  Just wearing it makes your body, especially your cock, tingle.");
        else if (cock.sock == "scarlet")
            DisplayText.text("It's covered by a lacey red cock-sock that clings tightly to your member.  Just wearing it makes your cock throb, as if it yearns to be larger...");
        else if (cock.sock == "cobalt")
            DisplayText.text("It's covered by a lacey blue cock-sock that clings tightly to your member... really tightly.  It's so tight it's almost uncomfortable, and you wonder if any growth might be inhibited.");
        else if (cock.sock == "gilded")
            DisplayText.text("It's covered by a metallic gold cock-sock that clings tightly to you, its surface covered in glittering gems.  Despite the warmth of your body, the cock-sock remains cool.");
        else if (cock.sock == "amaranthine") {
            DisplayText.text("It's covered by a lacey purple cock-sock");
            if (cock.cockType != CockType.DISPLACER)
                DisplayText.text(" that fits somewhat awkwardly on your member");
            else
                DisplayText.text(" that fits your coeurl cock perfectly");
            DisplayText.text(".  Just wearing it makes you feel stronger and more powerful.");
        }
    }
}