﻿import {
    assDescript,
    assholeDescript,
    ballsDescript,
    breastDescript,
    buttDescript,
    clitDescript,
    hairDescript,
    hipDescript,
    nippleDescript,
    num2Text,
    Num2Text,
    sackDescript,
    vaginaDescript
    } from './descriptors';
import { flushOutputTextToGUI, outputText } from './engineCore';
import { CockTypesEnum } from '../classes/classes/CockTypesEnum';
import { kFLAGS } from '../classes/classes/GlobalFlags/kFLAGS';
import { kGAMECLASS } from '../classes/classes/GlobalFlags/kGAMECLASS';
import { PerkLib } from '../classes/classes/PerkLib';
import { Player } from '../classes/classes/Player';
import { PregnancyStore } from '../classes/classes/PregnancyStore';
import { StatusAffects } from '../classes/classes/StatusAffects';
import { rand } from '../Engine/Utilities/SMath';
import { trace } from '../wrappers/output';
import {

    GENDER_NONE,
    GENDER_MALE,
    GENDER_FEMALE,
    GENDER_HERM,
    SKIN_TYPE_PLAIN,
    SKIN_TYPE_FUR,
    SKIN_TYPE_SCALES,
    SKIN_TYPE_GOO,
    SKIN_TYPE_UNDEFINED,
    HAIR_NORMAL,
    HAIR_FEATHER,
    HAIR_GHOST,
    HAIR_GOO,
    HAIR_ANEMONE,
    FACE_HUMAN,
    FACE_HORSE,
    FACE_DOG,
    FACE_COW_MINOTAUR,
    FACE_SHARK_TEETH,
    FACE_SNAKE_FANGS,
    FACE_CAT,
    FACE_LIZARD,
    FACE_BUNNY,
    FACE_KANGAROO,
    FACE_SPIDER_FANGS,
    FACE_FOX,
    FACE_DRAGON,
    FACE_RACCOON_MASK,
    FACE_RACCOON,
    FACE_BUCKTEETH,
    FACE_MOUSE,
    FACE_FERRET_MASK,
    FACE_FERRET,
    TONUGE_HUMAN,
    TONUGE_SNAKE,
    TONUGE_DEMONIC,
    TONUGE_DRACONIC,
    EYES_HUMAN,
    EYES_FOUR_SPIDER_EYES,
    EYES_BLACK_EYES_SAND_TRAP,
    EARS_HUMAN,
    EARS_HORSE,
    EARS_DOG,
    EARS_COW,
    EARS_ELFIN,
    EARS_CAT,
    EARS_LIZARD,
    EARS_BUNNY,
    EARS_KANGAROO,
    EARS_FOX,
    EARS_DRAGON,
    EARS_RACCOON,
    EARS_MOUSE,
    EARS_FERRET,
    HORNS_NONE,
    HORNS_DEMON,
    HORNS_COW_MINOTAUR,
    HORNS_DRACONIC_X2,
    HORNS_DRACONIC_X4_12_INCH_LONG,
    HORNS_ANTLERS,
    ANTENNAE_NONE,
    ANTENNAE_BEE,
    ARM_TYPE_HUMAN,
    ARM_TYPE_HARPY,
    ARM_TYPE_SPIDER,
    TAIL_TYPE_NONE,
    TAIL_TYPE_HORSE,
    TAIL_TYPE_DOG,
    TAIL_TYPE_DEMONIC,
    TAIL_TYPE_COW,
    TAIL_TYPE_SPIDER_ADBOMEN,
    TAIL_TYPE_BEE_ABDOMEN,
    TAIL_TYPE_SHARK,
    TAIL_TYPE_CAT,
    TAIL_TYPE_LIZARD,
    TAIL_TYPE_RABBIT,
    TAIL_TYPE_HARPY,
    TAIL_TYPE_KANGAROO,
    TAIL_TYPE_FOX,
    TAIL_TYPE_DRACONIC,
    TAIL_TYPE_RACCOON,
    TAIL_TYPE_MOUSE,
    TAIL_TYPE_FERRET,
    BREAST_CUP_FLAT,
    BREAST_CUP_A,
    BREAST_CUP_B,
    BREAST_CUP_C,
    BREAST_CUP_D,
    BREAST_CUP_DD,
    BREAST_CUP_DD_BIG,
    BREAST_CUP_E,
    BREAST_CUP_E_BIG,
    BREAST_CUP_EE,
    BREAST_CUP_EE_BIG,
    BREAST_CUP_F,
    BREAST_CUP_F_BIG,
    BREAST_CUP_FF,
    BREAST_CUP_FF_BIG,
    BREAST_CUP_G,
    BREAST_CUP_G_BIG,
    BREAST_CUP_GG,
    BREAST_CUP_GG_BIG,
    BREAST_CUP_H,
    BREAST_CUP_H_BIG,
    BREAST_CUP_HH,
    BREAST_CUP_HH_BIG,
    BREAST_CUP_HHH,
    BREAST_CUP_I,
    BREAST_CUP_I_BIG,
    BREAST_CUP_II,
    BREAST_CUP_II_BIG,
    BREAST_CUP_J,
    BREAST_CUP_J_BIG,
    BREAST_CUP_JJ,
    BREAST_CUP_JJ_BIG,
    BREAST_CUP_K,
    BREAST_CUP_K_BIG,
    BREAST_CUP_KK,
    BREAST_CUP_KK_BIG,
    BREAST_CUP_L,
    BREAST_CUP_L_BIG,
    BREAST_CUP_LL,
    BREAST_CUP_LL_BIG,
    BREAST_CUP_M,
    BREAST_CUP_M_BIG,
    BREAST_CUP_MM,
    BREAST_CUP_MM_BIG,
    BREAST_CUP_MMM,
    BREAST_CUP_MMM_LARGE,
    BREAST_CUP_N,
    BREAST_CUP_N_LARGE,
    BREAST_CUP_NN,
    BREAST_CUP_NN_LARGE,
    BREAST_CUP_O,
    BREAST_CUP_O_LARGE,
    BREAST_CUP_OO,
    BREAST_CUP_OO_LARGE,
    BREAST_CUP_P,
    BREAST_CUP_P_LARGE,
    BREAST_CUP_PP,
    BREAST_CUP_PP_LARGE,
    BREAST_CUP_Q,
    BREAST_CUP_Q_LARGE,
    BREAST_CUP_QQ,
    BREAST_CUP_QQ_LARGE,
    BREAST_CUP_R,
    BREAST_CUP_R_LARGE,
    BREAST_CUP_RR,
    BREAST_CUP_RR_LARGE,
    BREAST_CUP_S,
    BREAST_CUP_S_LARGE,
    BREAST_CUP_SS,
    BREAST_CUP_SS_LARGE,
    BREAST_CUP_T,
    BREAST_CUP_T_LARGE,
    BREAST_CUP_TT,
    BREAST_CUP_TT_LARGE,
    BREAST_CUP_U,
    BREAST_CUP_U_LARGE,
    BREAST_CUP_UU,
    BREAST_CUP_UU_LARGE,
    BREAST_CUP_V,
    BREAST_CUP_V_LARGE,
    BREAST_CUP_VV,
    BREAST_CUP_VV_LARGE,
    BREAST_CUP_W,
    BREAST_CUP_W_LARGE,
    BREAST_CUP_WW,
    BREAST_CUP_WW_LARGE,
    BREAST_CUP_X,
    BREAST_CUP_X_LARGE,
    BREAST_CUP_XX,
    BREAST_CUP_XX_LARGE,
    BREAST_CUP_Y,
    BREAST_CUP_Y_LARGE,
    BREAST_CUP_YY,
    BREAST_CUP_YY_LARGE,
    BREAST_CUP_Z,
    BREAST_CUP_Z_LARGE,
    BREAST_CUP_ZZ,
    BREAST_CUP_ZZ_LARGE,
    BREAST_CUP_ZZZ,
    BREAST_CUP_ZZZ_LARGE,
    WING_TYPE_NONE,
    WING_TYPE_BEE_LIKE_SMALL,
    WING_TYPE_BEE_LIKE_LARGE,
    WING_TYPE_HARPY,
    WING_TYPE_IMP,
    WING_TYPE_BAT_LIKE_TINY,
    WING_TYPE_BAT_LIKE_LARGE,
    WING_TYPE_SHARK_FIN,
    WING_TYPE_FEATHERED_LARGE,
    WING_TYPE_DRACONIC_SMALL,
    WING_TYPE_DRACONIC_LARGE,
    WING_TYPE_GIANT_DRAGONFLY,
    LOWER_BODY_TYPE_HUMAN,
    LOWER_BODY_TYPE_HOOFED,
    LOWER_BODY_TYPE_DOG,
    LOWER_BODY_TYPE_NAGA,
    LOWER_BODY_TYPE_CENTAUR,
    LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS,
    LOWER_BODY_TYPE_DEMONIC_CLAWS,
    LOWER_BODY_TYPE_BEE,
    LOWER_BODY_TYPE_GOO,
    LOWER_BODY_TYPE_CAT,
    LOWER_BODY_TYPE_LIZARD,
    LOWER_BODY_TYPE_PONY,
    LOWER_BODY_TYPE_BUNNY,
    LOWER_BODY_TYPE_HARPY,
    LOWER_BODY_TYPE_KANGAROO,
    LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS,
    LOWER_BODY_TYPE_DRIDER_LOWER_BODY,
    LOWER_BODY_TYPE_FOX,
    LOWER_BODY_TYPE_DRAGON,
    LOWER_BODY_TYPE_RACCOON,
    LOWER_BODY_FERRET,
    PIERCING_TYPE_NONE,
    PIERCING_TYPE_STUD,
    PIERCING_TYPE_RING,
    PIERCING_TYPE_LADDER,
    PIERCING_TYPE_HOOP,
    PIERCING_TYPE_CHAIN,
    VAGINA_TYPE_HUMAN,
    VAGINA_TYPE_BLACK_SAND_TRAP,
    VAGINA_WETNESS_DRY,
    VAGINA_WETNESS_NORMAL,
    VAGINA_WETNESS_WET,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_DROOLING,
    VAGINA_WETNESS_SLAVERING,
    VAGINA_LOOSENESS_TIGHT,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_LOOSENESS_LEVEL_CLOWN_CAR,
    ANAL_WETNESS_DRY,
    ANAL_WETNESS_NORMAL,
    ANAL_WETNESS_MOIST,
    ANAL_WETNESS_SLIMY,
    ANAL_WETNESS_DROOLING,
    ANAL_WETNESS_SLIME_DROOLING,
    ANAL_LOOSENESS_VIRGIN,
    ANAL_LOOSENESS_TIGHT,
    ANAL_LOOSENESS_NORMAL,
    ANAL_LOOSENESS_LOOSE,
    ANAL_LOOSENESS_STRETCHED,
    ANAL_LOOSENESS_GAPING,
    HIP_RATING_BOYISH,
    HIP_RATING_SLENDER,
    HIP_RATING_AVERAGE,
    HIP_RATING_AMPLE,
    HIP_RATING_CURVY,
    HIP_RATING_FERTILE,
    HIP_RATING_INHUMANLY_WIDE,
    BUTT_RATING_BUTTLESS,
    BUTT_RATING_TIGHT,
    BUTT_RATING_AVERAGE,
    BUTT_RATING_NOTICEABLE,
    BUTT_RATING_LARGE,
    BUTT_RATING_JIGGLY,
    BUTT_RATING_EXPANSIVE,
    BUTT_RATING_HUGE,
    BUTT_RATING_INCONCEIVABLY_BIG,

} from './appearanceDefs';

export function playerAppearance(e: MouseEvent = null, player: Player): void {
    var funcs = new Array();
    var args = new Array();
    //Temp vars
    var temp: number = 0;
    var rando: number = 0;
    //Determine race type:
    var race: string = "human";

    race = player.race();
    //Discuss race
    outputText("", true);
    if (race != "human") outputText("You began your journey as a human, but gave that up as you explored the dangers of this realm.  ", false);
    //Height and race.
    outputText("You are a " + Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall " + race + ", with " + player.bodyType() + ".", false);
    if (player.armorName == "comfortable clothes")
        outputText("  <b>You are currently wearing " + player.armorName + " and using your " + player.weaponName + " as a weapon.</b>", false);
    else outputText("  <b>You are currently wearing your " + player.armorName + " and using your " + player.weaponName + " as a weapon.</b>", false);
    //Face
    if (player.faceType == FACE_HUMAN || player.faceType == FACE_SHARK_TEETH || player.faceType == FACE_BUNNY || player.faceType == FACE_SPIDER_FANGS || player.faceType == FACE_FERRET_MASK) {
        if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
            outputText("  Your face is human in shape and structure, with " + player.skin() + ".", false);
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  Under your " + player.skinFurScales() + " you have a human-shaped head with " + player.skin(true, false) + ".", false);
        if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  Your face is fairly human in shape, but is covered in " + player.skin() + ".", false);
        if (player.faceType == FACE_SHARK_TEETH)
            outputText("  A set of razor-sharp, retractable shark-teeth fill your mouth and gives your visage a slightly angular appearance.", false);
        else if (player.faceType == FACE_BUNNY)
            outputText("  The constant twitches of your nose and the length of your incisors gives your visage a hint of bunny-like cuteness.", false);
        else if (player.faceType == FACE_SPIDER_FANGS)
            outputText("  A set of retractable, needle-like fangs sit in place of your canines and are ready to dispense their venom.", false);
        else if (player.faceType == FACE_FERRET_MASK)
            outputText("  The [skinFurScales] around your eyes is significantly darker than the rest of your face, giving you a cute little ferret mask.", false);
    }
    else if (player.faceType == FACE_FERRET) {
        if (player.skinType == SKIN_TYPE_PLAIN) outputText("  Your face is an adorable cross between human and ferret features, complete with a wet nose and whiskers.  The only oddity is your lack of fur, leaving only [skin] visible on your ferret-like face.", false);
        else outputText("  Your face is coated in " + player.hairColor + " fur with [skin] underneath, an adorable cross between human and ferret features.  It is complete with a wet nose and whiskers.");
    }
    else if (player.faceType == FACE_RACCOON_MASK) {
        //appearance for skinheads
        if (player.skinType != SKIN_TYPE_FUR && player.skinType != SKIN_TYPE_SCALES) {
            outputText("  Your face is human in shape and structure, with " + player.skin());
            if ((player.skinTone == "ebony" || player.skinTone == "black") && (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO))
                outputText(", though with your dusky hue, the black raccoon mask you sport isn't properly visible.");
            else outputText(", though it is decorated with a sly-looking raccoon mask over your eyes.");
        }
        //appearance furscales
        else {
            //(black/midnight furscales)
            if (((player.hairColor == "black" || player.hairColor == "midnight") && (player.skinType == SKIN_TYPE_FUR || player.skinType == SKIN_TYPE_SCALES)))
                outputText("  Under your " + player.skinFurScales() + " hides a black raccoon mask, barely visible due to your inky hue, and");
            else outputText("  Your " + player.skinFurScales() + " are decorated with a sly-looking raccoon mask, and under them");
            outputText(" you have a human-shaped head with " + player.skin(true, false) + ".");
        }
    }
    else if (player.faceType == FACE_RACCOON) {
        outputText("  You have a triangular raccoon face, replete with sensitive whiskers and a little black nose; a mask shades the space around your eyes, set apart from your " + player.skinFurScales() + " by a band of white.");
        //(if skin)
        if (player.skinType == SKIN_TYPE_PLAIN)
            outputText("  It looks a bit strange with only the skin and no fur.");
        else if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  The presence of said scales gives your visage an eerie look, more reptile than mammal.");
    }
    else if (player.faceType == FACE_FOX) {
        outputText("  You have a tapered, shrewd-looking vulpine face with a speckling of downward-curved whiskers just behind the nose.");
        if (player.skinType == SKIN_TYPE_PLAIN)
            outputText("  Oddly enough, there's no fur on your animalistic muzzle, just " + player.skinFurScales() + ".");
        else if (player.skinType == SKIN_TYPE_FUR)
            outputText("  A coat of " + player.skinFurScales() + " decorates your muzzle.");
        else if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  Strangely, " + player.skinFurScales() + " adorn every inch of your animalistic visage.");
    }
    else if (player.faceType == FACE_BUCKTEETH) {
        //appearance
        outputText("  Your face is generally human in shape and structure, with " + player.skin());
        if (player.skinType == SKIN_TYPE_FUR || player.skinType == SKIN_TYPE_SCALES)
            outputText(" under your " + player.skinFurScales());
        outputText(" and mousey buckteeth.");
    }
    else if (player.faceType == FACE_MOUSE) {
        //appearance
        outputText("  You have a snubby, tapered mouse's face, with whiskers, a little pink nose, and ");
        if (player.skinType != SKIN_TYPE_FUR && player.skinType != SKIN_TYPE_SCALES)
            outputText(player.skin());
        else outputText(player.skin() + " under your " + player.skinFurScales());
        outputText(".  Two large incisors complete it.");
    }
    //Naga
    if (player.faceType == FACE_SNAKE_FANGS) {
        if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
            outputText("  You have a fairly normal face, with " + player.skin() + ".  The only oddity is your pair of dripping fangs which often hang over your lower lip.", false);
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  Under your " + player.skinFurScales() + " you have a human-shaped head with " + player.skin(true, false) + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.", false);
        if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  Your face is fairly human in shape, but is covered in " + player.skinFurScales() + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.", false);
    }
    //horse-face
    if (player.faceType == FACE_HORSE) {
        if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
            outputText("  Your face is equine in shape and structure.  The odd visage is hairless and covered with " + player.skinFurScales() + ".", false);
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  Your face is almost entirely equine in appearance, even having " + player.skinFurScales() + ".  Underneath the fur, you believe you have " + player.skin(true, false) + ".", false);
        if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  You have the face and head structure of a horse, overlaid with glittering " + player.skinFurScales() + ".", false);
    }
    //dog-face
    if (player.faceType == FACE_DOG) {
        if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
            outputText("  You have a dog-like face, complete with a wet nose.  The odd visage is hairless and covered with " + player.skinFurScales() + ".", false);
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  You have a dog's face, complete with wet nose and panting tongue.  You've got " + player.skinFurScales() + ", hiding your " + player.skin(true, false) + " underneath your furry visage.", false);
        if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  You have the facial structure of a dog, wet nose and all, but overlaid with glittering " + player.skinFurScales() + ".", false);
    }
    //cat-face
    if (player.faceType == FACE_CAT) {
        if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
            outputText("  You have a cat-like face, complete with a cute, moist nose and whiskers.  The " + player.skin() + " that is revealed by your lack of fur looks quite unusual on so feline a face.", false);
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  You have a cat-like face, complete with moist nose and whiskers.  Your " + player.skinDesc + " is " + player.hairColor + ", hiding your " + player.skin(true, false) + " underneath.", false);
        if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  Your facial structure blends humanoid features with those of a cat.  A moist nose and whiskers are included, but overlaid with glittering " + player.skinFurScales() + ".", false);
        if (player.eyeType != EYES_BLACK_EYES_SAND_TRAP)
            outputText("  Of course, no feline face would be complete without vertically slit eyes.");
    }
    //Minotaaaauuuur-face
    if (player.faceType == FACE_COW_MINOTAUR) {
        if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
            outputText("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Despite your lack of fur elsewhere, your visage does have a short layer of " + player.hairColor + " fuzz.", false);
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Your " + player.skinFurScales() + " thickens noticably on your head, looking shaggy and more than a little monstrous once laid over your visage.", false);
        if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  Your face resembles a minotaur's, though strangely it is covered in shimmering scales, right up to the flat cow-like nose that protrudes from your face.", false);
    }
    //Lizard-face
    if (player.faceType == FACE_LIZARD) {
        if (player.skinType == SKIN_TYPE_PLAIN || player.skinType == SKIN_TYPE_GOO)
            outputText("  You have a face resembling that of a lizard, and with your toothy maw, you have quite a fearsome visage.  The reptilian visage does look a little odd with just " + player.skin() + ".", false);
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  You have a face resembling that of a lizard.  Between the toothy maw, pointed snout, and the layer of " + player.skinFurScales() + " covering your face, you have quite the fearsome visage.", false);
        if (player.skinType == SKIN_TYPE_SCALES)
            outputText("  Your face is that of a lizard, complete with a toothy maw and pointed snout.  Reflective " + player.skinFurScales() + " complete the look, making you look quite fearsome.", false);
    }
    if (player.faceType == FACE_DRAGON) {
        outputText("  Your face is a narrow, reptilian muzzle.  It looks like a predatory lizard's, at first glance, but with an unusual array of spikes along the under-jaw.  It gives you a regal but fierce visage.  Opening your mouth reveals several rows of dagger-like sharp teeth.  The fearsome visage is decorated by " + player.skinFurScales() + ".");
    }
    if (player.faceType == FACE_KANGAROO) {
        outputText("  Your face is ", false);
        if (player.skinType == SKIN_TYPE_PLAIN)
            outputText("bald", false);
        else outputText("covered with " + player.skinFurScales(), false);
        outputText(" and shaped like that of a kangaroo, somewhat rabbit-like except for the extreme length of your odd visage.", false);
    }
    //M/F stuff!
    outputText("  It has " + player.faceDesc() + ".", false);
    //Eyes
    if (player.eyeType == EYES_FOUR_SPIDER_EYES)
        outputText("  In addition to your primary two eyes, you have a second, smaller pair on your forehead.", false);
    else if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP)
        outputText("  Your eyes are solid spheres of inky, alien darkness.");

    //Hair
    //if bald
    if (player.hairLength == 0) {
        if (player.skinType == SKIN_TYPE_FUR)
            outputText("  You have no hair, only a thin layer of fur atop of your head.  ", false);
        else outputText("  You are totally bald, showing only shiny " + player.skinTone + " " + player.skinDesc + " where your hair should be.", false);
        if (player.earType == EARS_HORSE)
            outputText("  A pair of horse-like ears rise up from the top of your head.", false);
        else if (player.earType == EARS_FERRET)
            outputText("  A pair of small, rounded ferret ears sit on top of your head.", false);
        else if (player.earType == EARS_DOG)
            outputText("  A pair of dog ears protrude from your skull, flopping down adorably.", false);
        else if (player.earType == EARS_COW)
            outputText("  A pair of round, floppy cow ears protrude from the sides of your skull.", false);
        else if (player.earType == EARS_ELFIN)
            outputText("  A pair of large pointy ears stick out from your skull.", false);
        else if (player.earType == EARS_CAT)
            outputText("  A pair of cute, fuzzy cat ears have sprouted from the top of your head.", false);
        else if (player.earType == EARS_LIZARD)
            outputText("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.", false);
        else if (player.earType == EARS_BUNNY)
            outputText("  A pair of floppy rabbit ears stick up from the top of your head, flopping around as you walk.", false);
        else if (player.earType == EARS_FOX)
            outputText("  A pair of large, adept fox ears sit high on your head, always listening.");
        else if (player.earType == EARS_DRAGON)
            outputText("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.", false);
        else if (player.earType == EARS_RACCOON)
            outputText("  A pair of vaguely egg-shaped, furry raccoon ears adorns your head.");
        else if (player.earType == EARS_MOUSE)
            outputText("  A pair of large, dish-shaped mouse ears tops your head.");
        if (player.antennae == ANTENNAE_BEE)
            outputText("  Floppy antennae also appear on your skull, bouncing and swaying in the breeze.", false);
    }
    //not bald
    else {
        if (player.earType == EARS_HUMAN)
            outputText("  Your " + hairDescript() + " looks good on you, accentuating your features well.", false);
        else if (player.earType == EARS_FERRET)
            outputText("  A pair of small, rounded ferret ears burst through the top of your " + hairDescript() + ".", false);
        else if (player.earType == EARS_HORSE)
            outputText("  The " + hairDescript() + " on your head parts around a pair of very horse-like ears that grow up from your head.", false);
        else if (player.earType == EARS_DOG)
            outputText("  The " + hairDescript() + " on your head is overlapped by a pair of pointed dog ears.", false);
        else if (player.earType == EARS_COW)
            outputText("  The " + hairDescript() + " on your head is parted by a pair of rounded cow ears that stick out sideways.", false);
        else if (player.earType == EARS_ELFIN)
            outputText("  The " + hairDescript() + " on your head is parted by a pair of cute pointed ears, bigger than your old human ones.", false);
        else if (player.earType == EARS_CAT)
            outputText("  The " + hairDescript() + " on your head is parted by a pair of cute, fuzzy cat ears, sprouting from atop your head and pivoting towards any sudden noises.", false);
        else if (player.earType == EARS_LIZARD)
            outputText("  The " + hairDescript() + " atop your head makes it nigh-impossible to notice the two small rounded openings that are your ears.", false);
        else if (player.earType == EARS_BUNNY)
            outputText("  A pair of floppy rabbit ears stick up out of your " + hairDescript() + ", bouncing around as you walk.", false);
        else if (player.earType == EARS_KANGAROO)
            outputText("  The " + hairDescript() + " atop your head is parted by a pair of long, furred kangaroo ears that stick out at an angle.", false);
        else if (player.earType == EARS_FOX)
            outputText("  The " + hairDescript() + " atop your head is parted by a pair of large, adept fox ears that always seem to be listening.");
        else if (player.earType == EARS_DRAGON)
            outputText("  The " + hairDescript() + " atop your head is parted by a pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.", false);
        else if (player.earType == EARS_RACCOON)
            outputText("  The " + hairDescript() + " on your head parts around a pair of egg-shaped, furry raccoon ears.");
        else if (player.earType == EARS_MOUSE)
            outputText("  The " + hairDescript() + " atop your head is funneled between and around a pair of large, dish-shaped mouse ears that stick up prominently.");
        if (player.antennae == ANTENNAE_BEE) {
            if (player.earType == EARS_BUNNY)
                outputText("  Limp antennae also grow from just behind your hairline, waving and swaying in the breeze with your ears.", false);
            else outputText("  Floppy antennae also grow from just behind your hairline, bouncing and swaying in the breeze.", false);
        }
    }
    //Tongue
    if (player.tongueType == TONUGE_SNAKE)
        outputText("  A snake-like tongue occasionally flits between your lips, tasting the air.", false);
    else if (player.tongueType == TONUGE_DEMONIC)
        outputText("  A slowly undulating tongue occasionally slips from between your lips.  It hangs nearly two feet long when you let the whole thing slide out, though you can retract it to appear normal.", false);
    else if (player.tongueType == TONUGE_DRACONIC)
        outputText("  Your mouth contains a thick, fleshy tongue that, if you so desire, can telescope to a distance of about four feet.  It has sufficient manual dexterity that you can use it almost like a third arm.");

    //Horns
    //Demonic horns
    if (player.hornType == HORNS_DEMON) {
        if (player.horns == 2)
            outputText("  A small pair of pointed horns has broken through the " + player.skinDesc + " on your forehead, proclaiming some demonic taint to any who see them.", false);
        if (player.horns == 4)
            outputText("  A quartet of prominent horns has broken through your " + player.skinDesc + ".  The back pair are longer, and curve back along your head.  The front pair protrude forward demonically.", false);
        if (player.horns == 6)
            outputText("  Six horns have sprouted through your " + player.skinDesc + ", the back two pairs curve backwards over your head and down towards your neck, while the front two horns stand almost eight inches long upwards and a little forward.", false);
        if (player.horns >= 8)
            outputText("  A large number of thick demonic horns sprout through your " + player.skinDesc + ", each pair sprouting behind the ones before.  The front jut forwards nearly ten inches while the rest curve back over your head, some of the points ending just below your ears.  You estimate you have a total of " + num2Text(player.horns) + " horns.", false);
    }
    //Minotaur horns
    if (player.hornType == HORNS_COW_MINOTAUR) {
        if (player.horns < 3)
            outputText("  Two tiny horn-like nubs protrude from your forehead, resembling the horns of the young livestock kept by your village.", false);
        if (player.horns >= 3 && player.horns < 6)
            outputText("  Two moderately sized horns grow from your forehead, similar in size to those on a young bovine.", false);
        if (player.horns >= 6 && player.horns < 12)
            outputText("  Two large horns sprout from your forehead, curving forwards like those of a bull.", false);
        if (player.horns >= 12 && player.horns < 20)
            outputText("  Two very large and dangerous looking horns sprout from your head, curving forward and over a foot long.  They have dangerous looking points.", false);
        if (player.horns >= 20)
            outputText("  Two huge horns erupt from your forehead, curving outward at first, then forwards.  The weight of them is heavy, and they end in dangerous looking points.", false);
    }
    //Lizard horns
    if (player.hornType == HORNS_DRACONIC_X2) {
        outputText("  A pair of " + num2Text(Math.floor(player.horns)) + " inch horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.", false);
    }
    //Super lizard horns
    if (player.hornType == HORNS_DRACONIC_X4_12_INCH_LONG)
        outputText("  Two pairs of horns, roughly a foot long, sprout from the sides of your head.  They sweep back and give you a fearsome look, almost like the dragons from your village's legends.", false);
    //Antlers!
    if (player.hornType == HORNS_ANTLERS) {
        if (player.horns > 0)
            outputText("  Two antlers, forking into " + num2Text(player.horns) + " points, have sprouted from the top of your head, forming a spiky, regal crown of bone.");
    }
    //BODY PG HERE
    outputText("\n\nYou have a humanoid shape with the usual torso, arms, hands, and fingers.", false);
    //WINGS!
    if (player.wingType == WING_TYPE_BEE_LIKE_SMALL)
        outputText("  A pair of tiny-yet-beautiful bee-wings sprout from your back, too small to allow you to fly.", false);
    if (player.wingType == WING_TYPE_BEE_LIKE_LARGE)
        outputText("  A pair of large bee-wings sprout from your back, reflecting the light through their clear membranes beautifully.  They flap quickly, allowing you to easily hover in place or fly.", false);
    if (player.wingType == WING_TYPE_BAT_LIKE_TINY)
        outputText("  A pair of tiny bat-like demon-wings sprout from your back, flapping cutely, but otherwise being of little use.", false);
    if (player.wingType == WING_TYPE_BAT_LIKE_LARGE)
        outputText("  A pair of large bat-like demon-wings fold behind your shoulders.  With a muscle-twitch, you can extend them, and use them to soar gracefully through the air.", false);
    if (player.wingType == WING_TYPE_SHARK_FIN)
        outputText("  A large shark-like fin has sprouted between your shoulder blades.  With it you have far more control over swimming underwater.", false);
    if (player.wingType == WING_TYPE_FEATHERED_LARGE)
        outputText("  A pair of large, feathery wings sprout from your back.  Though you usually keep the " + player.hairColor + "-colored wings folded close, they can unfurl to allow you to soar as gracefully as a harpy.", false);
    if (player.wingType == WING_TYPE_DRACONIC_SMALL)
        outputText("  Small, vestigial wings sprout from your shoulders.  They might look like bat's wings, but the membranes are covered in fine, delicate scales.");
    else if (player.wingType == WING_TYPE_DRACONIC_LARGE)
        outputText("  Magnificent wings sprout from your shoulders.  When unfurled they stretch further than your arm span, and a single beat of them is all you need to set out toward the sky.  They look a bit like bat's wings, but the membranes are covered in fine, delicate scales and a wicked talon juts from the end of each bone.");
    else if (player.wingType == WING_TYPE_GIANT_DRAGONFLY)
        outputText("  Giant dragonfly wings hang from your shoulders.  At a whim, you could twist them into a whirring rhythm fast enough to lift you off the ground and allow you to fly.");

    //Wing arms
    if (player.armType == ARM_TYPE_HARPY)
        outputText("  Feathers hang off your arms from shoulder to wrist, giving them a slightly wing-like look.", false);
    else if (player.armType == ARM_TYPE_SPIDER)
        outputText("  Shining black exoskeleton  covers your arms from the biceps down, resembling a pair of long black gloves from a distance.", false);
    //Done with head bits. Move on to body stuff
    //Horse lowerbody, other lowerbody texts appear lower
    if (player.lowerBody == LOWER_BODY_TYPE_PONY)
        outputText("  From the waist down you have an incredibly cute and cartoonish parody of a horse's body, with all four legs ending in flat, rounded feet.", false);
    else if (player.isTaur())
        outputText("  From the waist down you have the body of a horse, with all four legs capped by hooves.", false);
    //Hip info only displays if you aren't a centaur. 
    if (!player.isTaur()) {
        if (player.thickness > 70) {
            outputText("  You have " + hipDescript(), false);
            if (player.hipRating < 6) {
                if (player.tone < 65)
                    outputText(" buried under a noticeable muffin-top, and", false);
                else outputText(" that blend into your pillar-like waist, and", false);
            }
            if (player.hipRating >= 6 && player.hipRating < 10)
                outputText(" that blend into the rest of your thick form, and", false);
            if (player.hipRating >= 10 && player.hipRating < 15)
                outputText(" that would be much more noticeable if you weren't so wide-bodied, and", false);
            if (player.hipRating >= 15 && player.hipRating < 20)
                outputText(" that sway and emphasize your thick, curvy shape, and", false);
            if (player.hipRating >= 20)
                outputText(" that sway hypnotically on your extra-curvy frame, and", false);
        }
        else if (player.thickness < 30) {
            outputText("  You have " + hipDescript(), false);
            if (player.hipRating < 6)
                outputText(" that match your trim, lithe body, and", false);
            if (player.hipRating >= 6 && player.hipRating < 10)
                outputText(" that sway to and fro, emphasized by your trim body, and", false);
            if (player.hipRating >= 10 && player.hipRating < 15)
                outputText(" that swell out under your trim waistline, and", false);
            if (player.hipRating >= 15 && player.hipRating < 20)
                outputText(", emphasized by your narrow waist, and", false);
            if (player.hipRating >= 20)
                outputText(" that swell disproportionately wide on your lithe frame, and", false);
        }
        //STANDARD
        else {
            outputText("  You have " + hipDescript(), false);
            if (player.hipRating < 6)
                outputText(", and", false);
            if (player.femininity > 50) {
                if (player.hipRating >= 6 && player.hipRating < 10)
                    outputText(" that draw the attention of those around you, and", false);
                if (player.hipRating >= 10 && player.hipRating < 15)
                    outputText(" that make you walk with a sexy, swinging gait, and", false);
                if (player.hipRating >= 15 && player.hipRating < 20)
                    outputText(" that make it look like you've birthed many children, and", false);
                if (player.hipRating >= 20)
                    outputText(" that make you look more like an animal waiting to be bred than any kind of human, and", false);
            }
            else {
                if (player.hipRating >= 6 && player.hipRating < 10)
                    outputText(" that give you a graceful stride, and", false);
                if (player.hipRating >= 10 && player.hipRating < 15)
                    outputText(" that add a little feminine swing to your gait, and", false);
                if (player.hipRating >= 15 && player.hipRating < 20)
                    outputText(" that force you to sway and wiggle as you move, and", false);
                if (player.hipRating >= 20) {
                    outputText(" that give your ", false);
                    if (player.balls > 0)
                        outputText("balls plenty of room to breathe", false);
                    else if (player.hasCock())
                        outputText(player.multiCockDescript() + " plenty of room to swing", false);
                    else if (player.hasVagina())
                        outputText(vaginaDescript() + " a nice, wide berth", false);
                    else outputText("vacant groin plenty of room", false);
                    outputText(", and", false);
                }
            }
        }
    }
    //ASS
    //Horse version
    if (player.isTaur()) {
        //FATBUTT
        if (player.tone < 65) {
            outputText("  Your " + buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" is lean, from what you can see of it.", false);
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" looks fairly average.", false);
            if (player.buttRating >= 6 && player.buttRating < 10)
                outputText(" is fairly plump and healthy.", false);
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" jiggles a bit as you trot around.", false);
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" jiggles and wobbles as you trot about.", false);
            if (player.buttRating >= 20)
                outputText(" is obscenely large, bordering freakish, even for a horse.", false);
        }
        //GIRL LOOK AT DAT BOOTY
        else {
            outputText("  Your " + buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" is barely noticable, showing off the muscles of your haunches.", false);
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" matches your toned equine frame quite well.", false);
            if (player.buttRating >= 6 && player.buttRating < 10)
                outputText(" gives hints of just how much muscle you could put into a kick.", false);
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" surges with muscle whenever you trot about.", false);
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" flexes its considerable mass as you move.", false);
            if (player.buttRating >= 20)
                outputText(" is stacked with layers of muscle, huge even for a horse.", false);
        }
    }
    //Non-horse PCs
    else {
        //TUBBY ASS
        if (player.tone < 60) {
            outputText(" your " + buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" looks great under your gear.", false);
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" has the barest amount of sexy jiggle.", false);
            if (player.buttRating >= 6 && player.buttRating < 10)
                outputText(" fills out your clothing nicely.", false);
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" wobbles enticingly with every step.", false);
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" wobbles like a bowl full of jello as you walk.", false);
            if (player.buttRating >= 20)
                outputText(" is obscenely large, bordering freakish, and makes it difficult to run.", false);
        }
        //FITBUTT
        else {
            outputText(" your " + buttDescript(), false);
            if (player.buttRating < 4)
                outputText(" molds closely against your form.", false);
            if (player.buttRating >= 4 && player.buttRating < 6)
                outputText(" contracts with every motion, displaying the detailed curves of its lean musculature.", false);
            if (player.buttRating >= 6 && player.buttRating < 10)
                outputText(" fills out your clothing nicely.", false);
            if (player.buttRating >= 10 && player.buttRating < 15)
                outputText(" stretches your gear, flexing it with each step.", false);
            if (player.buttRating >= 15 && player.buttRating < 20)
                outputText(" threatens to bust out from under your kit each time you clench it.", false);
            if (player.buttRating >= 20)
                outputText(" is marvelously large, but completely stacked with muscle.", false);
        }
    }
    //TAILS
    if (player.tailType == TAIL_TYPE_HORSE)
        outputText("  A long " + player.hairColor + " horsetail hangs from your " + buttDescript() + ", smooth and shiny.", false);
    if (player.tailType == TAIL_TYPE_FERRET)
        outputText("  A long ferret tail sprouts from above your [butt].  It is thin, tapered, and covered in shaggy " + player.hairColor + " fur.", false);
    if (player.tailType == TAIL_TYPE_DOG)
        outputText("  A fuzzy " + player.hairColor + " dogtail sprouts just above your " + buttDescript() + ", wagging to and fro whenever you are happy.", false);
    if (player.tailType == TAIL_TYPE_DEMONIC)
        outputText("  A narrow tail ending in a spaded tip curls down from your " + buttDescript() + ", wrapping around your " + player.leg() + " sensually at every opportunity.", false);
    if (player.tailType == TAIL_TYPE_COW)
        outputText("  A long cowtail with a puffy tip swishes back and forth as if swatting at flies.", false);
    if (player.tailType == TAIL_TYPE_SPIDER_ADBOMEN) {
        outputText("  A large, spherical spider-abdomen has grown out from your backside, covered in shiny black chitin.  Though it's heavy and bobs with every motion, it doesn't seem to slow you down.", false);
        if (player.tailVenom > 50 && player.tailVenom < 80)
            outputText("  Your bulging arachnid posterior feels fairly full of webbing.", false);
        if (player.tailVenom >= 80 && player.tailVenom < 100)
            outputText("  Your arachnid rear bulges and feels very full of webbing.", false);
        if (player.tailVenom == 100)
            outputText("  Your swollen spider-butt is distended with the sheer amount of webbing it's holding.", false);
    }
    if (player.tailType == TAIL_TYPE_BEE_ABDOMEN) {
        outputText("  A large insectile bee-abdomen dangles from just above your backside, bobbing with its own weight as you shift.  It is covered in hard chitin with black and yellow stripes, and tipped with a dagger-like stinger.", false);
        if (player.tailVenom > 50 && player.tailVenom < 80)
            outputText("  A single drop of poison hangs from your exposed stinger.", false);
        if (player.tailVenom >= 80 && player.tailVenom < 100)
            outputText("  Poisonous bee venom coats your stinger completely.", false);
        if (player.tailVenom == 100)
            outputText("  Venom drips from your poisoned stinger regularly.", false);
    }
    if (player.tailType == TAIL_TYPE_SHARK) {
        outputText("  A long shark-tail trails down from your backside, swaying to and fro while giving you a dangerous air.", false);
    }
    if (player.tailType == TAIL_TYPE_CAT) {
        outputText("  A soft " + player.hairColor + " cat-tail sprouts just above your " + buttDescript() + ", curling and twisting with every step to maintain perfect balance.", false);
    }
    if (player.tailType == TAIL_TYPE_LIZARD) {
        outputText("  A tapered tail hangs down from just above your " + assDescript() + ".  It sways back and forth, assisting you with keeping your balance.", false);
    }
    if (player.tailType == TAIL_TYPE_RABBIT)
        outputText("  A short, soft bunny tail sprouts just above your " + assDescript() + ", twitching constantly whenever you don't think about it.", false);
    else if (player.tailType == TAIL_TYPE_HARPY)
        outputText("  A tail of feathers fans out from just above your " + assDescript() + ", twitching instinctively to help guide you if you were to take flight.", false);
    else if (player.tailType == TAIL_TYPE_KANGAROO) {
        outputText("  A conical, ", false);
        if (player.skinType == SKIN_TYPE_GOO)
            outputText("gooey, " + player.skinTone, false);
        else outputText("furry, " + player.hairColor, false);
        outputText(", tail extends from your " + assDescript() + ", bouncing up and down as you move and helping to counterbalance you.", false);
    }
    else if (player.tailType == TAIL_TYPE_FOX) {
        if (player.tailVenom == 1)
            outputText("  A swishing " + player.hairColor + " fox's brush extends from your " + assDescript() + ", curling around your body - the soft fur feels lovely.");
        else outputText("  " + Num2Text(player.tailVenom) + " swishing " + player.hairColor + " fox's tails extend from your " + assDescript() + ", curling around your body - the soft fur feels lovely.");
    }
    else if (player.tailType == TAIL_TYPE_DRACONIC) {
        outputText("  A thin, scaly, prehensile reptilian tail, almost as long as you are tall, swings behind you like a living bullwhip.  Its tip menaces with spikes of bone, meant to deliver painful blows.");
    }
    //appearance
    else if (player.tailType == TAIL_TYPE_RACCOON) {
        outputText("  A black-and-" + player.hairColor + "-ringed raccoon tail waves behind you.");
    }
    else if (player.tailType == TAIL_TYPE_MOUSE) {
        //appearance
        outputText("  A naked, " + player.skinTone + " mouse tail pokes from your butt, dragging on the ground and twitching occasionally.");
    }
    //LOWERBODY SPECIAL
    if (player.lowerBody == LOWER_BODY_TYPE_HUMAN)
        outputText("  Two normal human legs grow down from your waist, ending in normal human feet.", false);
    else if (player.lowerBody == LOWER_BODY_FERRET) outputText("  Two furry, digitigrade legs form below your [hips].  The fur is thinner on the feet, and your toes are tipped with claws.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_HOOFED)
        outputText("  Your legs are muscled and jointed oddly, covered in fur, and end in a pair of bestial hooves.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_DOG)
        outputText("  Two digitigrade legs grow downwards from your waist, ending in dog-like hind-paws.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_NAGA)
        outputText("  Below your waist your flesh is fused together into a very long snake-like tail.", false);
    //Horse body is placed higher for readability purposes
    else if (player.lowerBody == LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS)
        outputText("  Your perfect lissome legs end in mostly human feet, apart from the horn protruding straight down from the heel that forces you to walk with a sexy, swaying gait.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_DEMONIC_CLAWS)
        outputText("  Your lithe legs are capped with flexible clawed feet.  Sharp black nails grow where once you had toe-nails, giving you fantastic grip.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_BEE)
        outputText("  Your legs are covered in a shimmering insectile carapace up to mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.  A bit of downy yellow and black fur fuzzes your upper thighs, just like a bee.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_GOO)
        outputText("  In place of legs you have a shifting amorphous blob.  Thankfully it's quite easy to propel yourself around on.  The lowest portions of your " + player.armorName + " float around inside you, bringing you no discomfort.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_CAT)
        outputText("  Two digitigrade legs grow downwards from your waist, ending in soft, padded cat-paws.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_LIZARD)
        outputText("  Two digitigrade legs grow down from your " + hipDescript() + ", ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_BUNNY)
        outputText("  Your legs thicken below the waist as they turn into soft-furred rabbit-like legs.  You even have large bunny feet that make hopping around a little easier than walking.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_HARPY)
        outputText("  Your legs are covered with " + player.hairColor + " plumage.  Thankfully the thick, powerful thighs are perfect for launching you into the air, and your feet remain mostly human, even if they are two-toed and tipped with talons.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_KANGAROO)
        outputText("  Your furry legs have short thighs and long calves, with even longer feet ending in prominently-nailed toes.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS)
        outputText("  Your legs are covered in a reflective black, insectile carapace up to your mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_DRIDER_LOWER_BODY)
        outputText("  Where your legs would normally start you have grown the body of a spider, with eight spindly legs that sprout from its sides.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_FOX)
        outputText("  Your legs are crooked into high knees with hocks and long feet, like those of a fox; cute bulbous toes decorate the ends.");
    else if (player.lowerBody == LOWER_BODY_TYPE_DRAGON)
        outputText("  Two human-like legs grow down from your " + hipDescript() + ", sheathed in scales and ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.", false);
    else if (player.lowerBody == LOWER_BODY_TYPE_RACCOON)
        outputText("  Your legs, though covered in fur, are humanlike.  Long feet on the ends bear equally long toes, and the pads on the bottoms are quite sensitive to the touch.");
    if (player.findPerk(PerkLib.Incorporeality) >= 0)
        outputText("  Of course, your " + player.legs() + " are partially transparent due to their ghostly nature.", false);

    outputText("\n", false);
    if (player.findStatusAffect(StatusAffects.GooStuffed) >= 0) {
        outputText("\n<b>Your gravid-looking belly is absolutely stuffed full of goo. There's no way you can get pregnant like this, but at the same time, you look like some fat-bellied breeder.</b>\n");
    }
    //Pregnancy Shiiiiiitz
    if ((player.buttPregnancyType == PregnancyStore.PREGNANCY_FROG_GIRL) || (player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR) || player.isPregnant()) {
        if (player.pregnancyType == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS) {
            outputText("<b>", false);
            //Compute size
            temp = player.statusAffectv3(StatusAffects.Eggs) + player.statusAffectv2(StatusAffects.Eggs) * 10;
            if (player.pregnancyIncubation <= 50 && player.pregnancyIncubation > 20) {
                outputText("Your swollen pregnant belly is as large as a ", false);
                if (temp < 10)
                    outputText("basketball.", false);
                if (temp >= 10 && temp < 20)
                    outputText("watermelon.", false);
                if (temp >= 20)
                    outputText("beach ball.", false);
            }
            if (player.pregnancyIncubation <= 20) {
                outputText("Your swollen pregnant belly is as large as a ", false);
                if (temp < 10)
                    outputText("watermelon.", false);
                if (temp >= 10 && temp < 20)
                    outputText("beach ball.", false);
                if (temp >= 20)
                    outputText("large medicine ball.", false);
            }
            outputText("</b>", false);
            temp = 0;
        }
        //Satur preggos - only shows if bigger than regular pregnancy or not pregnancy
        else if (player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR && player.buttPregnancyIncubation > player.pregnancyIncubation) {
            if (player.buttPregnancyIncubation < 125 && player.buttPregnancyIncubation >= 75) {
                outputText("<b>You've got the begginings of a small pot-belly.</b>", false);
            }
            else if (player.buttPregnancyIncubation >= 50) {
                outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy, yet it feels odd inside you - wrong somehow.</b>", false);
            }
            else if (player.buttPregnancyIncubation >= 30) {
                outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
            }
            else { //Surely Benoit and Cotton deserve their place in this list
                if (player.pregnancyType == PregnancyStore.PREGNANCY_IZMA || player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE || player.pregnancyType == PregnancyStore.PREGNANCY_AMILY || player.pregnancyType == PregnancyStore.PREGNANCY_EMBER || player.pregnancyType == PregnancyStore.PREGNANCY_BENOIT || player.pregnancyType == PregnancyStore.PREGNANCY_COTTON || player.pregnancyType == PregnancyStore.PREGNANCY_URTA)
                    outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                else if (player.pregnancyType != PregnancyStore.PREGNANCY_MARBLE)
                    outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>", false);
                else outputText("\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>", false);
            }
        }
        //URTA PREG
        else if (player.pregnancyType == PregnancyStore.PREGNANCY_URTA) {
            if (player.pregnancyIncubation <= 432 && player.pregnancyIncubation > 360) {
                outputText("<b>Your belly is larger than it used to be.</b>\n", false);
            }
            if (player.pregnancyIncubation <= 360 && player.pregnancyIncubation > 288) {
                outputText("<b>Your belly is more noticably distended.   You're pretty sure it's Urta's.</b>", false);
            }
            if (player.pregnancyIncubation <= 288 && player.pregnancyIncubation > 216) {
                outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy, and the baby within is kicking nowadays.</b>", false);
            }
            if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 144) {
                outputText("<b>Your belly is large and very obviously pregnant to anyone who looks at you.  It's gotten heavy enough to be a pain to carry around all the time.</b>", false);
            }
            if (player.pregnancyIncubation <= 144 && player.pregnancyIncubation > 72) {
                outputText("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.  It's large and round, frequently moving.</b>", false);
            }
            if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48) {
                outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
            }
            if (player.pregnancyIncubation <= 48) {
                outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
            }
        }
        else if (player.buttPregnancyType == PregnancyStore.PREGNANCY_FROG_GIRL) {
            if (player.buttPregnancyIncubation >= 8)
                outputText("<b>Your stomach is so full of frog eggs that you look about to birth at any moment, your belly wobbling and shaking with every step you take, packed with frog ovum.</b>");
            else outputText("<b>You're stuffed so full with eggs that your belly looks obscenely distended, huge and weighted with the gargantuan eggs crowding your gut. They make your gait a waddle and your gravid tummy wobble obscenely.</b>");
        }
        else if (player.pregnancyType == PregnancyStore.PREGNANCY_FAERIE) { //Belly size remains constant throughout the pregnancy
            outputText("<b>Your belly remains swollen like a watermelon. ");
            if (player.pregnancyIncubation <= 100)
                outputText("It's full of liquid, though unlike a normal pregnancy the passenger you’re carrying is tiny.</b>");
            else if (player.pregnancyIncubation <= 140)
                outputText("It feels like it’s full of thick syrup or jelly.</b>");
            else outputText("It still feels like there’s a solid ball inside your womb.</b>");
        }
        else {
            if (player.pregnancyIncubation <= 336 && player.pregnancyIncubation > 280) {
                outputText("<b>Your belly is larger than it used to be.</b>", false);
            }
            if (player.pregnancyIncubation <= 280 && player.pregnancyIncubation > 216) {
                outputText("<b>Your belly is more noticably distended.   You are probably pregnant.</b>", false);
            }
            if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 180) {
                outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy.</b>", false);
            }
            if (player.pregnancyIncubation <= 180 && player.pregnancyIncubation > 120) {
                outputText("<b>Your belly is very obviously pregnant to anyone who looks at you.</b>", false);
            }
            if (player.pregnancyIncubation <= 120 && player.pregnancyIncubation > 72) {
                outputText("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.</b>", false);
            }
            if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48) {
                outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
            }
            if (player.pregnancyIncubation <= 48) { //Surely Benoit and Cotton deserve their place in this list
                if (player.pregnancyType == PregnancyStore.PREGNANCY_IZMA || player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE || player.pregnancyType == PregnancyStore.PREGNANCY_AMILY || player.pregnancyType == PregnancyStore.PREGNANCY_EMBER || player.pregnancyType == PregnancyStore.PREGNANCY_BENOIT || player.pregnancyType == PregnancyStore.PREGNANCY_COTTON || player.pregnancyType == PregnancyStore.PREGNANCY_URTA)
                    outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                else if (player.pregnancyType != PregnancyStore.PREGNANCY_MARBLE)
                    outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>", false);
                else outputText("\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>", false);
            }
        }
        outputText("\n", false);
    }
    outputText("\n", false);
    if (player.gills)
        outputText("A pair of feathery gills are growing out just below your neck, spreading out horizontally and draping down your chest.  They allow you to stay in the water for quite a long time.  ", false);
    //Chesticles..I mean bewbz.
    if (player.breastRows.length == 1) {
        outputText("You have " + num2Text(player.breastRows[temp].breasts) + " " + breastDescript(temp) + ", each supporting ", false);
        if (player.breastRows[0].nipplesPerBreast == 1)
            outputText(num2Text(player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(player.nippleLength * 10) / 10 + "-inch " + nippleDescript(temp) + ".", false);
        else outputText(num2Text(player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(player.nippleLength * 10) / 10 + "-inch " + nippleDescript(temp) + "s.", false);
        if (player.breastRows[0].milkFullness > 75)
            outputText("  Your " + breastDescript(temp) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.", false);
        if (player.breastRows[0].breastRating >= 1)
            outputText("  You could easily fill a " + player.breastCup(temp) + " bra.", false);
        //Done with tits.  Move on.
        outputText("\n", false);
    }
    //many rows
    else {
        outputText("You have " + num2Text(player.breastRows.length) + " rows of breasts, the topmost pair starting at your chest.\n", false);
        while (temp < player.breastRows.length) {
            if (temp == 0)
                outputText("--Your uppermost rack houses ", false);
            if (temp == 1)
                outputText("\n--The second row holds ", false);
            if (temp == 2)
                outputText("\n--Your third row of breasts contains ", false);
            if (temp == 3)
                outputText("\n--Your fourth set of tits cradles ", false);
            if (temp == 4)
                outputText("\n--Your fifth and final mammory grouping swells with ", false);
            outputText(num2Text(player.breastRows[temp].breasts) + " " + breastDescript(temp) + " with ", false);
            if (player.breastRows[temp].nipplesPerBreast == 1)
                outputText(num2Text(player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(player.nippleLength * 10) / 10 + "-inch " + nippleDescript(temp) + " each.", false);
            else outputText(num2Text(player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(player.nippleLength * 10) / 10 + "-inch " + nippleDescript(temp) + "s each.", false);
            if (player.breastRows[temp].breastRating >= 1)
                outputText("  They could easily fill a " + player.breastCup(temp) + " bra.", false);
            if (player.breastRows[temp].milkFullness > 75)
                outputText("  Your " + breastDescript(temp) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.", false);
            temp++;
        }
        //Done with tits.  Move on.
        outputText("\n", false);
    }
    //Crotchial stuff - mention snake
    if (player.lowerBody == LOWER_BODY_TYPE_NAGA && player.gender > 0) {
        outputText("\nYour sex", false);
        if (player.gender == 3 || player.totalCocks() > 1)
            outputText("es are ", false);
        else outputText(" is ", false);
        outputText("concealed within a cavity in your tail when not in use, though when the need arises, you can part your concealing slit and reveal your true self.\n", false);
    }
    //Cock stuff!
    temp = 0;
    if (player.cocks.length == 1) {
        if (player.lowerBody == LOWER_BODY_TYPE_CENTAUR)
            outputText("\nEver since becoming a centaur, your equipment has shifted to lie between your rear legs, like a horse.", false);
        outputText("\nYour " + player.cockDescript(temp) + " is " + Math.floor(10 * player.cocks[temp].cockLength) / 10 + " inches long and ", false);
        if (Math.round(10 * player.cocks[temp].cockThickness) / 10 < 2) {
            if (Math.round(10 * player.cocks[temp].cockThickness) / 10 == 1)
                outputText(Math.floor(10 * player.cocks[temp].cockThickness) / 10 + " inch thick.", false);
            else outputText(Math.round(10 * player.cocks[temp].cockThickness) / 10 + " inches thick.", false);
        }
        else outputText(num2Text(Math.round(10 * player.cocks[temp].cockThickness) / 10) + " inches wide.", false);
        //Horsecock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.HORSE) {
            outputText("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your shaft flares proudly, just like a horse's.", false);
        }
        //dog cock flavor
        if (((player.cocks[temp].cockType == CockTypesEnum.DOG) || (player.cocks[temp].cockType == CockTypesEnum.FOX)) || (player.cocks[temp].cockType == CockTypesEnum.FOX)) {
            if (player.cocks[temp].knotMultiplier >= 1.8)
                outputText("  The obscenely swollen lump of flesh near the base of your " + player.cockDescript(temp) + " looks almost too big for your cock.", false);
            else if (player.cocks[temp].knotMultiplier >= 1.4)
                outputText("  A large bulge of flesh nestles just above the bottom of your " + player.cockDescript(temp) + ", to ensure it stays where it belongs during mating.", false);
            else if (player.cocks[temp].knotMultiplier > 1)
                outputText("  A small knot of thicker flesh is near the base of your " + player.cockDescript(temp) + ", ready to expand to help you lodge it inside a female.", false);
            //List thickness
            outputText("  The knot is " + Math.round(player.cocks[temp].cockThickness * player.cocks[temp].knotMultiplier * 10) / 10 + " inches wide when at full size.", false);
        }
        //Demon cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.DEMON) {
            outputText("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.", false);
        }
        //Tentacle cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.TENTACLE) {
            outputText("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.", false);
        }
        //Cat cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.CAT) {
            outputText("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.", false);
        }
        //Snake cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.LIZARD) {
            outputText("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.", false);
        }
        //Anemone cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.ANEMONE) {
            outputText("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.", false);
        }
        //Kangawang flavor
        if (player.cocks[temp].cockType == CockTypesEnum.KANGAROO) {
            outputText("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.", false);
        }
        //Draconic Cawk Flava flav
        if (player.cocks[temp].cockType == CockTypesEnum.DRAGON) {
            outputText("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
        }
        if (player.cocks[temp].cockType == CockTypesEnum.BEE) {
            outputText("  It's a long, smooth black shaft that's rigid to the touch.  Its base is ringed with a layer of four inch long soft bee hair.  The tip has a much finer layer of short yellow hairs.  The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.");
        }
        //Worm flavor
        if (player.findStatusAffect(StatusAffects.Infested) >= 0)
            outputText("  Every now and again a slimy worm coated in spunk slips partway out of your " + player.cockDescript(0) + ", tasting the air like a snake's tongue.", false);
        if (player.cocks[temp].sock)
            sockDescript(temp);
        //DONE WITH COCKS, moving on!
        outputText("\n", false);
    }
    if (player.cocks.length > 1) {
        temp = 0;
        rando = rand(4);
        if (player.lowerBody == LOWER_BODY_TYPE_CENTAUR)
            outputText("\nWhere a horse's penis would usually be located, you have instead grown " + player.multiCockDescript() + "!\n", false);
        else outputText("\nWhere a penis would normally be located, you have instead grown " + player.multiCockDescript() + "!\n", false);
        while (temp < player.cocks.length) {

            //middle cock description
            if (rando == 0) {
                if (temp == 0) outputText("--Your first ", false);
                else outputText("--Your next ", false);
                outputText(player.cockDescript(temp), false);
                outputText(" is ", false);
                outputText(Math.floor(10 * player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10) / 10) + " inches wide.", false);
                else {
                    if (player.cocks[temp].cockThickness == 1)
                        outputText("one inch wide.", false);
                    else outputText(Math.round(player.cocks[temp].cockThickness * 10) / 10 + " inches wide.", false);
                }
            }
            if (rando == 1) {
                outputText("--One of your ", false);
                outputText(player.cockDescript(temp) + "s is " + Math.round(10 * player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10) / 10) + " inches thick.", false);
                else {
                    if (player.cocks[temp].cockThickness == 1)
                        outputText("one inch thick.", false);
                    else outputText(Math.round(player.cocks[temp].cockThickness * 10) / 10 + " inches thick.", false);
                }
            }
            if (rando == 2) {
                if (temp > 0)
                    outputText("--Another of your ", false);
                else outputText("--One of your ", false);
                outputText(player.cockDescript(temp) + "s is " + Math.round(10 * player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10) / 10) + " inches thick.", false);
                else {
                    if (player.cocks[temp].cockThickness == 1)
                        outputText("one inch thick.", false);
                    else outputText(Math.round(player.cocks[temp].cockThickness * 10) / 10 + " inches thick.", false);
                }
            }
            if (rando == 3) {
                if (temp > 0)
                    outputText("--Your next ", false);
                else outputText("--Your first ", false);
                outputText(player.cockDescript(temp) + " is " + Math.round(10 * player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    outputText(num2Text(Math.round(player.cocks[temp].cockThickness * 10) / 10) + " inches in diameter.", false);
                else {
                    if (Math.round(player.cocks[temp].cockThickness * 10) / 10 == 1)
                        outputText("one inch in diameter.", false);
                    else outputText(Math.round(player.cocks[temp].cockThickness * 10) / 10 + " inches in diameter.", false);
                }
            }
            //horse cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.HORSE) {
                outputText("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your " + player.cockDescript(temp) + " flares proudly, just like a horse's.", false);
            }
            //dog cock flavor
            if ((player.cocks[temp].cockType == CockTypesEnum.DOG) || (player.cocks[temp].cockType == CockTypesEnum.FOX)) {
                outputText("  It is shiny, pointed, and covered in veins, just like a large ");
                if (player.cocks[temp].cockType == CockTypesEnum.DOG)
                    outputText("dog's cock.");
                else
                    outputText("fox's cock.");

                if (player.cocks[temp].knotMultiplier >= 1.8)
                    outputText("  The obscenely swollen lump of flesh near the base of your " + player.cockDescript(temp) + " looks almost comically mismatched for your " + player.cockDescript(temp) + ".", false);
                else if (player.cocks[temp].knotMultiplier >= 1.4)
                    outputText("  A large bulge of flesh nestles just above the bottom of your " + player.cockDescript(temp) + ", to ensure it stays where it belongs during mating.", false);
                else if (player.cocks[temp].knotMultiplier > 1)
                    outputText("  A small knot of thicker flesh is near the base of your " + player.cockDescript(temp) + ", ready to expand to help you lodge your " + player.cockDescript(temp) + " inside a female.", false);
                //List knot thickness
                outputText("  The knot is " + Math.floor(player.cocks[temp].cockThickness * player.cocks[temp].knotMultiplier * 10) / 10 + " inches thick when at full size.", false);
            }
            //Demon cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.DEMON) {
                outputText("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.", false);
            }
            //Tentacle cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.TENTACLE) {
                outputText("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.", false);
            }
            //Cat cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.CAT) {
                outputText("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.", false);
            }
            //Snake cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.LIZARD) {
                outputText("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.", false);
            }
            //Anemone cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.ANEMONE) {
                outputText("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.", false);
            }
            //Kangwang flavor
            if (player.cocks[temp].cockType == CockTypesEnum.KANGAROO) {
                outputText("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.", false);
            }
            //Draconic Cawk Flava flav
            if (player.cocks[temp].cockType == CockTypesEnum.DRAGON) {
                outputText("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
            }
            if (player.cocks[temp].sock != "" && player.cocks[temp].sock != null)	// I dunno what was happening, but it looks like .sock is null, as it doesn't exist. I guess this is probably more left over from some of the restucturing.
            {																		// Anyways, check against null values, and stuff works again.
                trace("Found a sock description (WTF even is a sock?)", player.cocks[temp].sock);
                sockDescript(temp);
            }
            temp++;
            rando++;
            outputText("\n", false);
            if (rando > 3) rando = 0;
        }
        //Worm flavor
        if (player.findStatusAffect(StatusAffects.Infested) >= 0)
            outputText("Every now and again slimy worms coated in spunk slip partway out of your " + player.multiCockDescriptLight() + ", tasting the air like tongues of snakes.\n", false);
        //DONE WITH COCKS, moving on!
    }
    //Of Balls and Sacks!
    if (player.balls > 0) {
        if (player.findStatusAffect(StatusAffects.Uniball) >= 0) {
            if (player.skinType != SKIN_TYPE_GOO)
                outputText("Your [sack] clings tightly to your groin, holding " + ballsDescript() + " snugly against you.");
            else if (player.skinType == SKIN_TYPE_GOO)
                outputText("Your [sack] clings tightly to your groin, dripping and holding " + ballsDescript() + " snugly against you.");
        }
        else if (player.cockTotal() == 0) {
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText("A " + sackDescript() + " with " + ballsDescript() + " swings heavily under where a penis would normally grow.", false);
            if (player.skinType == SKIN_TYPE_FUR)
                outputText("A fuzzy " + sackDescript() + " filled with " + ballsDescript() + " swings low under where a penis would normally grow.", false);
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText("A scaley " + sackDescript() + " hugs your " + ballsDescript() + " tightly against your body.", false);
            if (player.skinType == SKIN_TYPE_GOO)
                outputText("An oozing, semi-solid sack with " + ballsDescript() + " swings heavily under where a penis would normally grow.", false);
        }
        else {
            if (player.skinType == SKIN_TYPE_PLAIN)
                outputText("A " + sackDescript() + " with " + ballsDescript() + " swings heavily beneath your " + player.multiCockDescriptLight() + ".", false);
            if (player.skinType == SKIN_TYPE_FUR)
                outputText("A fuzzy " + sackDescript() + " filled with " + ballsDescript() + " swings low under your " + player.multiCockDescriptLight() + ".", false);
            if (player.skinType == SKIN_TYPE_SCALES)
                outputText("A scaley " + sackDescript() + " hugs your " + ballsDescript() + " tightly against your body.", false);
            if (player.skinType == SKIN_TYPE_GOO)
                outputText("An oozing, semi-solid sack with " + ballsDescript() + " swings heavily beneath your " + player.multiCockDescriptLight() + ".", false);
        }
        outputText("  You estimate each of them to be about " + num2Text(Math.round(player.ballSize)) + " ", false);
        if (Math.round(player.ballSize) == 1)
            outputText("inch", false);
        else outputText("inches", false);
        outputText(" across.\n", false);
    }
    //VAGOOZ
    if (player.vaginas.length > 0) {
        if (player.gender == 2 && player.lowerBody == LOWER_BODY_TYPE_CENTAUR)
            outputText("\nEver since becoming a centaur, your womanly parts have shifted to lie between your rear legs, in a rather equine fashion.", false);
        outputText("\n", false);
        if (player.vaginas.length == 1)
            outputText("You have a " + vaginaDescript(0) + ", with a " + Math.floor(player.clitLength * 10) / 10 + "-inch clit", false);
        if (player.vaginas[0].virgin)
            outputText(" and an intact hymen", false);
        outputText(".  ", false);
        if (player.vaginas.length > 1)
            outputText("You have " + player.vaginas.length + " " + vaginaDescript(0) + "s, with " + Math.floor(player.clitLength * 10) / 10 + "-inch clits each.  ", false);
        if (player.lib < 50 && player.lust < 50) //not particularly horny

        {
            //Wetness
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET && player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
                outputText("Moisture gleams in ", false);
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_DROOLING) {
                outputText("Occasional beads of ", false);
                outputText("lubricant drip from ", false);
            }
            //Different description based on vag looseness
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET) {
                if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE)
                    outputText("your " + vaginaDescript(0) + ". ", false);
                if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_LOOSE && player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_GAPING_WIDE)
                    outputText("your " + vaginaDescript(0) + ", its lips slightly parted. ", false);
                if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_GAPING_WIDE)
                    outputText("the massive hole that is your " + vaginaDescript(0) + ".  ", false);
            }
        }
        if ((player.lib >= 50 || player.lust >= 50) && (player.lib < 80 && player.lust < 80)) //kinda horny

        {
            //Wetness
            if (player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET)
                outputText("Moisture gleams in ", false);
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET && player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING) {
                outputText("Occasional beads of ", false);
                outputText("lubricant drip from ", false);
            }
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_DROOLING) {
                outputText("Thin streams of ", false);
                outputText("lubricant occasionally dribble from ", false);
            }
            //Different description based on vag looseness
            if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE)
                outputText("your " + vaginaDescript(0) + ". ", false);
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_LOOSE && player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("your " + vaginaDescript(0) + ", its lips slightly parted. ", false);
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("the massive hole that is your " + vaginaDescript(0) + ".  ", false);
        }
        if ((player.lib > 80 || player.lust > 80)) //WTF horny!

        {
            //Wetness
            if (player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET) {
                outputText("Occasional beads of ", false);
                outputText("lubricant drip from ", false);
            }
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET && player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING) {
                outputText("Thin streams of ", false);
                outputText("lubricant occasionally dribble from ", false);
            }
            if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_DROOLING) {
                outputText("Thick streams of ", false);
                outputText("lubricant drool constantly from ", false);
            }
            //Different description based on vag looseness
            if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE)
                outputText("your " + vaginaDescript(0) + ". ", false);
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_LOOSE && player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("your " + vaginaDescript(0) + ", its lips slightly parted. ", false);
            if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_GAPING_WIDE)
                outputText("the massive hole that is your cunt.  ", false);
        }
        //Line Drop for next descript!
        outputText("\n", false);
    }
    //Genderless lovun'
    if (player.cockTotal() == 0 && player.vaginas.length == 0)
        outputText("\nYou have a curious lack of any sexual endowments.\n", false);


    //BUNGHOLIO
    if (player.ass) {
        outputText("\n", false);
        outputText("You have one " + assholeDescript() + ", placed between your butt-cheeks where it belongs.\n", false);
    }
    //Piercings!
    if (player.eyebrowPierced > 0)
        outputText("\nA solitary " + player.eyebrowPShort + " adorns your eyebrow, looking very stylish.", false);
    if (player.earsPierced > 0)
        outputText("\nYour ears are pierced with " + player.earsPShort + ".", false);
    if (player.nosePierced > 0)
        outputText("\nA " + player.nosePShort + " dangles from your nose.", false);
    if (player.lipPierced > 0)
        outputText("\nShining on your lip, a " + player.lipPShort + " is plainly visible.", false);
    if (player.tonguePierced > 0)
        outputText("\nThough not visible, you can plainly feel your " + player.tonguePShort + " secured in your tongue.", false);
    if (player.nipplesPierced == 3)
        outputText("\nYour " + nippleDescript(0) + "s ache and tingle with every step, as your heavy " + player.nipplesPShort + " swings back and forth.", false);
    else if (player.nipplesPierced > 0)
        outputText("\nYour " + nippleDescript(0) + "s are pierced with " + player.nipplesPShort + ".", false);
    if (player.totalCocks() > 0) {
        if (player.cocks[0].pierced > 0) {
            outputText("\nLooking positively perverse, a " + player.cocks[0].pShortDesc + " adorns your " + player.cockDescript(0) + ".", false);
        }
    }
    if (kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00286] == 1)
        outputText("\nA magical, ruby-studded bar pierces your belly button, allowing you to summon Ceraph on a whim.", false);
    if (player.hasVagina()) {
        if (player.vaginas[0].labiaPierced > 0)
            outputText("\nYour " + vaginaDescript(0) + " glitters with the " + player.vaginas[0].labiaPShort + " hanging from your lips.", false);
        if (player.vaginas[0].clitPierced > 0)
            outputText("\nImpossible to ignore, your " + clitDescript() + " glitters with its " + player.vaginas[0].clitPShort + ".", false);
    }
    //MONEY!
    if (player.gems == 0)
        outputText("\n\n<b>Your money-purse is devoid of any currency.", false);
    if (player.gems > 1)
        outputText("\n\n<b>You have " + player.gems + " shining gems, collected in your travels.", false);
    if (player.gems == 1)
        outputText("\n\n<b>You have " + player.gems + " shining gem, collected in your travels.", false);
    kGAMECLASS.mainView.setOutputText(kGAMECLASS.currentText);
    //menu();
    //addButton(0,"Next",camp);
    flushOutputTextToGUI();
}

export function sockDescript(index: number): void {
    outputText("  ");
    if (kGAMECLASS.player.cocks[index].sock == "wool")
        outputText("It's covered by a wooly white cock-sock, keeping it snug and warm despite how cold it might get.");
    else if (kGAMECLASS.player.cocks[index].sock == "alabaster")
        outputText("It's covered by a white, lacey cock-sock, snugly wrapping around it like a bridal dress around a bride.");
    else if (kGAMECLASS.player.cocks[index].sock == "cockring")
        outputText("It's covered by a black latex cock-sock with two attached metal rings, keeping your cock just a little harder and [balls] aching for release.");
    else if (kGAMECLASS.player.cocks[index].sock == "viridian")
        outputText("It's covered by a lacey dark green cock-sock accented with red rose-like patterns.  Just wearing it makes your body, especially your cock, tingle.");
    else if (kGAMECLASS.player.cocks[index].sock == "scarlet")
        outputText("It's covered by a lacey red cock-sock that clings tightly to your member.  Just wearing it makes your cock throb, as if it yearns to be larger...");
    else if (kGAMECLASS.player.cocks[index].sock == "cobalt")
        outputText("It's covered by a lacey blue cock-sock that clings tightly to your member... really tightly.  It's so tight it's almost uncomfortable, and you wonder if any growth might be inhibited.");
    else if (kGAMECLASS.player.cocks[index].sock == "gilded")
        outputText("It's covered by a metallic gold cock-sock that clings tightly to you, its surface covered in glittering gems.  Despite the warmth of your body, the cock-sock remains cool.");
    else if (kGAMECLASS.player.cocks[index].sock == "amaranthine") {
        outputText("It's covered by a lacey purple cock-sock");
        if (kGAMECLASS.player.cocks[index].cockType != CockTypesEnum.DISPLACER)
            outputText(" that fits somewhat awkwardly on your member");
        else
            outputText(" that fits your coeurl cock perfectly");
        outputText(".  Just wearing it makes you feel stronger and more powerful.");
    }
    else outputText("<b>Yo, this is an error.</b>");
}
