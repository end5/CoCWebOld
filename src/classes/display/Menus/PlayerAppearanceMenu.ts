import MainScreen from '../display/MainScreen';

export default class PlayerAppearanceMenu {
    public static display(): void {
        //Determine race type:
        let race: string = player.race();
        //Discuss race
        MainScreen.text("", true);
        if (race != "human") MainScreen.text("You began your journey as a human, but gave that up as you explored the dangers of this realm.  ", false);
        //Height and race.
        MainScreen.text("You are a " + Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall " + race + ", with " + player.bodyType() + ".", false);
        if (player.inventory.armor.displayName == "comfortable clothes")
            MainScreen.text("  <b>You are currently wearing " + player.inventory.armor.displayName + " and using your " + player.weaponName + " as a weapon.</b>", false);
        else MainScreen.text("  <b>You are currently wearing your " + player.inventory.armor.displayName + " and using your " + player.weaponName + " as a weapon.</b>", false);
        //Face
        if (player.upperBody.head.face.faceType == Face.HUMAN || player.upperBody.head.face.faceType == Face.SHARK_TEETH || player.upperBody.head.face.faceType == Face.BUNNY || player.upperBody.head.face.faceType == Face.SPIDER_FANGS || player.upperBody.head.face.faceType == Face.FERRET_MASK) {
            if (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO)
                MainScreen.text("  Your face is human in shape and structure, with " + player.skin() + ".", false);
            if (player.skinType == Skin.FUR)
                MainScreen.text("  Under your " + player.skinFurScales() + " you have a human-shaped head with " + player.skin(true, false) + ".", false);
            if (player.skinType == Skin.SCALES)
                MainScreen.text("  Your face is fairly human in shape, but is covered in " + player.skin() + ".", false);
            if (player.upperBody.head.face.faceType == Face.SHARK_TEETH)
                MainScreen.text("  A set of razor-sharp, retractable shark-teeth fill your mouth and gives your visage a slightly angular appearance.", false);
            else if (player.upperBody.head.face.faceType == Face.BUNNY)
                MainScreen.text("  The constant twitches of your nose and the length of your incisors gives your visage a hint of bunny-like cuteness.", false);
            else if (player.upperBody.head.face.faceType == Face.SPIDER_FANGS)
                MainScreen.text("  A set of retractable, needle-like fangs sit in place of your canines and are ready to dispense their venom.", false);
            else if (player.upperBody.head.face.faceType == Face.FERRET_MASK)
                MainScreen.text("  The [skinFurScales] around your eyes is significantly darker than the rest of your face, giving you a cute little ferret mask.", false);
        }
        else if (player.upperBody.head.face.faceType == Face.FERRET) {
            if (player.skinType == Skin.PLAIN) MainScreen.text("  Your face is an adorable cross between human and ferret features, complete with a wet nose and whiskers.  The only oddity is your lack of fur, leaving only [skin] visible on your ferret-like face.", false);
            else MainScreen.text("  Your face is coated in " + player.upperBody.head.hairColor + " fur with [skin] underneath, an adorable cross between human and ferret features.  It is complete with a wet nose and whiskers.");
        }
        else if (player.upperBody.head.face.faceType == Face.RACCOON_MASK) {
            //appearance for skinheads
            if (player.skinType != Skin.FUR && player.skinType != Skin.SCALES) {
                MainScreen.text("  Your face is human in shape and structure, with " + player.skin());
                if ((player.skinTone == "ebony" || player.skinTone == "black") && (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO))
                    MainScreen.text(", though with your dusky hue, the black raccoon mask you sport isn't properly visible.");
                else MainScreen.text(", though it is decorated with a sly-looking raccoon mask over your eyes.");
            }
            //appearance furscales
            else {
                //(black/midnight furscales)
                if (((player.upperBody.head.hairColor == "black" || player.upperBody.head.hairColor == "midnight") && (player.skinType == Skin.FUR || player.skinType == Skin.SCALES)))
                    MainScreen.text("  Under your " + player.skinFurScales() + " hides a black raccoon mask, barely visible due to your inky hue, and");
                else MainScreen.text("  Your " + player.skinFurScales() + " are decorated with a sly-looking raccoon mask, and under them");
                MainScreen.text(" you have a human-shaped head with " + player.skin(true, false) + ".");
            }
        }
        else if (player.upperBody.head.face.faceType == Face.RACCOON) {
            MainScreen.text("  You have a triangular raccoon face, replete with sensitive whiskers and a little black nose; a mask shades the space around your eyes, set apart from your " + player.skinFurScales() + " by a band of white.");
            //(if skin)
            if (player.skinType == Skin.PLAIN)
                MainScreen.text("  It looks a bit strange with only the skin and no fur.");
            else if (player.skinType == Skin.SCALES)
                MainScreen.text("  The presence of said scales gives your visage an eerie look, more reptile than mammal.");
        }
        else if (player.upperBody.head.face.faceType == Face.FOX) {
            MainScreen.text("  You have a tapered, shrewd-looking vulpine face with a speckling of downward-curved whiskers just behind the nose.");
            if (player.skinType == Skin.PLAIN)
                MainScreen.text("  Oddly enough, there's no fur on your animalistic muzzle, just " + player.skinFurScales() + ".");
            else if (player.skinType == Skin.FUR)
                MainScreen.text("  A coat of " + player.skinFurScales() + " decorates your muzzle.");
            else if (player.skinType == Skin.SCALES)
                MainScreen.text("  Strangely, " + player.skinFurScales() + " adorn every inch of your animalistic visage.");
        }
        else if (player.upperBody.head.face.faceType == Face.BUCKTEETH) {
            //appearance
            MainScreen.text("  Your face is generally human in shape and structure, with " + player.skin());
            if (player.skinType == Skin.FUR || player.skinType == Skin.SCALES)
                MainScreen.text(" under your " + player.skinFurScales());
            MainScreen.text(" and mousey buckteeth.");
        }
        else if (player.upperBody.head.face.faceType == Face.MOUSE) {
            //appearance
            MainScreen.text("  You have a snubby, tapered mouse's face, with whiskers, a little pink nose, and ");
            if (player.skinType != Skin.FUR && player.skinType != Skin.SCALES)
                MainScreen.text(player.skin());
            else MainScreen.text(player.skin() + " under your " + player.skinFurScales());
            MainScreen.text(".  Two large incisors complete it.");
        }
        //Naga
        if (player.upperBody.head.face.faceType == Face.SNAKE_FANGS) {
            if (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO)
                MainScreen.text("  You have a fairly normal face, with " + player.skin() + ".  The only oddity is your pair of dripping fangs which often hang over your lower lip.", false);
            if (player.skinType == Skin.FUR)
                MainScreen.text("  Under your " + player.skinFurScales() + " you have a human-shaped head with " + player.skin(true, false) + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.", false);
            if (player.skinType == Skin.SCALES)
                MainScreen.text("  Your face is fairly human in shape, but is covered in " + player.skinFurScales() + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.", false);
        }
        //horse-face
        if (player.upperBody.head.face.faceType == Face.HORSE) {
            if (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO)
                MainScreen.text("  Your face is equine in shape and structure.  The odd visage is hairless and covered with " + player.skinFurScales() + ".", false);
            if (player.skinType == Skin.FUR)
                MainScreen.text("  Your face is almost entirely equine in appearance, even having " + player.skinFurScales() + ".  Underneath the fur, you believe you have " + player.skin(true, false) + ".", false);
            if (player.skinType == Skin.SCALES)
                MainScreen.text("  You have the face and head structure of a horse, overlaid with glittering " + player.skinFurScales() + ".", false);
        }
        //dog-face
        if (player.upperBody.head.face.faceType == Face.DOG) {
            if (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO)
                MainScreen.text("  You have a dog-like face, complete with a wet nose.  The odd visage is hairless and covered with " + player.skinFurScales() + ".", false);
            if (player.skinType == Skin.FUR)
                MainScreen.text("  You have a dog's face, complete with wet nose and panting tongue.  You've got " + player.skinFurScales() + ", hiding your " + player.skin(true, false) + " underneath your furry visage.", false);
            if (player.skinType == Skin.SCALES)
                MainScreen.text("  You have the facial structure of a dog, wet nose and all, but overlaid with glittering " + player.skinFurScales() + ".", false);
        }
        //cat-face
        if (player.upperBody.head.face.faceType == Face.CAT) {
            if (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO)
                MainScreen.text("  You have a cat-like face, complete with a cute, moist nose and whiskers.  The " + player.skin() + " that is revealed by your lack of fur looks quite unusual on so feline a face.", false);
            if (player.skinType == Skin.FUR)
                MainScreen.text("  You have a cat-like face, complete with moist nose and whiskers.  Your " + player.skinDesc + " is " + player.upperBody.head.hairColor + ", hiding your " + player.skin(true, false) + " underneath.", false);
            if (player.skinType == Skin.SCALES)
                MainScreen.text("  Your facial structure blends humanoid features with those of a cat.  A moist nose and whiskers are included, but overlaid with glittering " + player.skinFurScales() + ".", false);
            if (player.upperBody.head.face.eyeType != Eyes.BLACK_EYES_SAND_TRAP)
                MainScreen.text("  Of course, no feline face would be complete without vertically slit eyes.");
        }
        //Minotaaaauuuur-face
        if (player.upperBody.head.face.faceType == Face.COW_MINOTAUR) {
            if (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO)
                MainScreen.text("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Despite your lack of fur elsewhere, your visage does have a short layer of " + player.upperBody.head.hairColor + " fuzz.", false);
            if (player.skinType == Skin.FUR)
                MainScreen.text("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Your " + player.skinFurScales() + " thickens noticably on your head, looking shaggy and more than a little monstrous once laid over your visage.", false);
            if (player.skinType == Skin.SCALES)
                MainScreen.text("  Your face resembles a minotaur's, though strangely it is covered in shimmering scales, right up to the flat cow-like nose that protrudes from your face.", false);
        }
        //Lizard-face
        if (player.upperBody.head.face.faceType == Face.LIZARD) {
            if (player.skinType == Skin.PLAIN || player.skinType == Skin.GOO)
                MainScreen.text("  You have a face resembling that of a lizard, and with your toothy maw, you have quite a fearsome visage.  The reptilian visage does look a little odd with just " + player.skin() + ".", false);
            if (player.skinType == Skin.FUR)
                MainScreen.text("  You have a face resembling that of a lizard.  Between the toothy maw, pointed snout, and the layer of " + player.skinFurScales() + " covering your face, you have quite the fearsome visage.", false);
            if (player.skinType == Skin.SCALES)
                MainScreen.text("  Your face is that of a lizard, complete with a toothy maw and pointed snout.  Reflective " + player.skinFurScales() + " complete the look, making you look quite fearsome.", false);
        }
        if (player.upperBody.head.face.faceType == Face.DRAGON) {
            MainScreen.text("  Your face is a narrow, reptilian muzzle.  It looks like a predatory lizard's, at first glance, but with an unusual array of spikes along the under-jaw.  It gives you a regal but fierce visage.  Opening your mouth reveals several rows of dagger-like sharp teeth.  The fearsome visage is decorated by " + player.skinFurScales() + ".");
        }
        if (player.upperBody.head.face.faceType == Face.KANGAROO) {
            MainScreen.text("  Your face is ", false);
            if (player.skinType == Skin.PLAIN)
                MainScreen.text("bald", false);
            else MainScreen.text("covered with " + player.skinFurScales(), false);
            MainScreen.text(" and shaped like that of a kangaroo, somewhat rabbit-like except for the extreme length of your odd visage.", false);
        }
        //M/F stuff!
        MainScreen.text("  It has " + player.faceDesc() + ".", false);
        //Eyes
        if (player.upperBody.head.face.eyeType == Eyes.FOUR_SPIDER_EYES)
            MainScreen.text("  In addition to your primary two eyes, you have a second, smaller pair on your forehead.", false);
        else if (player.upperBody.head.face.eyeType == Eyes.BLACK_EYES_SAND_TRAP)
            MainScreen.text("  Your eyes are solid spheres of inky, alien darkness.");

        //Hair
        //if bald
        if (player.upperBody.head.hairLength == 0) {
            if (player.skinType == Skin.FUR)
                MainScreen.text("  You have no hair, only a thin layer of fur atop of your head.  ", false);
            else MainScreen.text("  You are totally bald, showing only shiny " + player.skinTone + " " + player.skinDesc + " where your hair should be.", false);
            if (player.upperBody.head.earType == Ears.HORSE)
                MainScreen.text("  A pair of horse-like ears rise up from the top of your head.", false);
            else if (player.upperBody.head.earType == Ears.FERRET)
                MainScreen.text("  A pair of small, rounded ferret ears sit on top of your head.", false);
            else if (player.upperBody.head.earType == Ears.DOG)
                MainScreen.text("  A pair of dog ears protrude from your skull, flopping down adorably.", false);
            else if (player.upperBody.head.earType == Ears.COW)
                MainScreen.text("  A pair of round, floppy cow ears protrude from the sides of your skull.", false);
            else if (player.upperBody.head.earType == Ears.ELFIN)
                MainScreen.text("  A pair of large pointy ears stick out from your skull.", false);
            else if (player.upperBody.head.earType == Ears.CAT)
                MainScreen.text("  A pair of cute, fuzzy cat ears have sprouted from the top of your head.", false);
            else if (player.upperBody.head.earType == Ears.LIZARD)
                MainScreen.text("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.", false);
            else if (player.upperBody.head.earType == Ears.BUNNY)
                MainScreen.text("  A pair of floppy rabbit ears stick up from the top of your head, flopping around as you walk.", false);
            else if (player.upperBody.head.earType == Ears.FOX)
                MainScreen.text("  A pair of large, adept fox ears sit high on your head, always listening.");
            else if (player.upperBody.head.earType == Ears.DRAGON)
                MainScreen.text("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.", false);
            else if (player.upperBody.head.earType == Ears.RACCOON)
                MainScreen.text("  A pair of vaguely egg-shaped, furry raccoon ears adorns your head.");
            else if (player.upperBody.head.earType == Ears.MOUSE)
                MainScreen.text("  A pair of large, dish-shaped mouse ears tops your head.");
            if (player.upperBody.head.antennae == Antennae.BEE)
                MainScreen.text("  Floppy antennae also appear on your skull, bouncing and swaying in the breeze.", false);
        }
        //not bald
        else {
            if (player.upperBody.head.earType == Ears.HUMAN)
                MainScreen.text("  Your " + HeadDescriptor.describeHair(player) + " looks good on you, accentuating your features well.", false);
            else if (player.upperBody.head.earType == Ears.FERRET)
                MainScreen.text("  A pair of small, rounded ferret ears burst through the top of your " + HeadDescriptor.describeHair(player) + ".", false);
            else if (player.upperBody.head.earType == Ears.HORSE)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " on your head parts around a pair of very horse-like ears that grow up from your head.", false);
            else if (player.upperBody.head.earType == Ears.DOG)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " on your head is overlapped by a pair of pointed dog ears.", false);
            else if (player.upperBody.head.earType == Ears.COW)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of rounded cow ears that stick out sideways.", false);
            else if (player.upperBody.head.earType == Ears.ELFIN)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of cute pointed ears, bigger than your old human ones.", false);
            else if (player.upperBody.head.earType == Ears.CAT)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " on your head is parted by a pair of cute, fuzzy cat ears, sprouting from atop your head and pivoting towards any sudden noises.", false);
            else if (player.upperBody.head.earType == Ears.LIZARD)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " atop your head makes it nigh-impossible to notice the two small rounded openings that are your ears.", false);
            else if (player.upperBody.head.earType == Ears.BUNNY)
                MainScreen.text("  A pair of floppy rabbit ears stick up out of your " + HeadDescriptor.describeHair(player) + ", bouncing around as you walk.", false);
            else if (player.upperBody.head.earType == Ears.KANGAROO)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of long, furred kangaroo ears that stick out at an angle.", false);
            else if (player.upperBody.head.earType == Ears.FOX)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of large, adept fox ears that always seem to be listening.");
            else if (player.upperBody.head.earType == Ears.DRAGON)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is parted by a pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.", false);
            else if (player.upperBody.head.earType == Ears.RACCOON)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " on your head parts around a pair of egg-shaped, furry raccoon ears.");
            else if (player.upperBody.head.earType == Ears.MOUSE)
                MainScreen.text("  The " + HeadDescriptor.describeHair(player) + " atop your head is funneled between and around a pair of large, dish-shaped mouse ears that stick up prominently.");
            if (player.upperBody.head.antennae == Antennae.BEE) {
                if (player.upperBody.head.earType == Ears.BUNNY)
                    MainScreen.text("  Limp antennae also grow from just behind your hairline, waving and swaying in the breeze with your ears.", false);
                else MainScreen.text("  Floppy antennae also grow from just behind your hairline, bouncing and swaying in the breeze.", false);
            }
        }
        //Tongue
        if (player.upperBody.head.face.tongueType == Tongue.SNAKE)
            MainScreen.text("  A snake-like tongue occasionally flits between your lips, tasting the air.", false);
        else if (player.upperBody.head.face.tongueType == Tongue.DEMONIC)
            MainScreen.text("  A slowly undulating tongue occasionally slips from between your lips.  It hangs nearly two feet long when you let the whole thing slide out, though you can retract it to appear normal.", false);
        else if (player.upperBody.head.face.tongueType == Tongue.DRACONIC)
            MainScreen.text("  Your mouth contains a thick, fleshy tongue that, if you so desire, can telescope to a distance of about four feet.  It has sufficient manual dexterity that you can use it almost like a third arm.");

        //Horns
        //Demonic horns
        if (player.upperBody.head.hornType == Horns.DEMON) {
            if (player.upperBody.head.horns == 2)
                MainScreen.text("  A small pair of pointed horns has broken through the " + player.skinDesc + " on your forehead, proclaiming some demonic taint to any who see them.", false);
            if (player.upperBody.head.horns == 4)
                MainScreen.text("  A quartet of prominent horns has broken through your " + player.skinDesc + ".  The back pair are longer, and curve back along your head.  The front pair protrude forward demonically.", false);
            if (player.upperBody.head.horns == 6)
                MainScreen.text("  Six horns have sprouted through your " + player.skinDesc + ", the back two pairs curve backwards over your head and down towards your neck, while the front two horns stand almost eight inches long upwards and a little forward.", false);
            if (player.upperBody.head.horns >= 8)
                MainScreen.text("  A large number of thick demonic horns sprout through your " + player.skinDesc + ", each pair sprouting behind the ones before.  The front jut forwards nearly ten inches while the rest curve back over your head, some of the points ending just below your ears.  You estimate you have a total of " + Utils.numToCardinalText(player.upperBody.head.horns) + " horns.", false);
        }
        //Minotaur horns
        if (player.upperBody.head.hornType == Horns.COW_MINOTAUR) {
            if (player.upperBody.head.horns < 3)
                MainScreen.text("  Two tiny horn-like nubs protrude from your forehead, resembling the horns of the young livestock kept by your village.", false);
            if (player.upperBody.head.horns >= 3 && player.upperBody.head.horns < 6)
                MainScreen.text("  Two moderately sized horns grow from your forehead, similar in size to those on a young bovine.", false);
            if (player.upperBody.head.horns >= 6 && player.upperBody.head.horns < 12)
                MainScreen.text("  Two large horns sprout from your forehead, curving forwards like those of a bull.", false);
            if (player.upperBody.head.horns >= 12 && player.upperBody.head.horns < 20)
                MainScreen.text("  Two very large and dangerous looking horns sprout from your head, curving forward and over a foot long.  They have dangerous looking points.", false);
            if (player.upperBody.head.horns >= 20)
                MainScreen.text("  Two huge horns erupt from your forehead, curving outward at first, then forwards.  The weight of them is heavy, and they end in dangerous looking points.", false);
        }
        //Lizard horns
        if (player.upperBody.head.hornType == Horns.DRACONIC_X2) {
            MainScreen.text("  A pair of " + Utils.numToCardinalText(player.upperBody.head.horns) + " inch horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.", false);
        }
        //Super lizard horns
        if (player.upperBody.head.hornType == Horns.DRACONIC_X4_12_INCH_LONG)
            MainScreen.text("  Two pairs of horns, roughly a foot long, sprout from the sides of your head.  They sweep back and give you a fearsome look, almost like the dragons from your village's legends.", false);
        //Antlers!
        if (player.upperBody.head.hornType == Horns.ANTLERS) {
            if (player.upperBody.head.horns > 0)
                MainScreen.text("  Two antlers, forking into " + Utils.numToCardinalText(player.upperBody.head.horns) + " points, have sprouted from the top of your head, forming a spiky, regal crown of bone.");
        }
        //BODY PG HERE
        MainScreen.text("\n\nYou have a humanoid shape with the usual torso, arms, hands, and fingers.", false);
        //WINGS!
        if (player.upperBody.wingType == Wings.BEE_LIKE_SMALL)
            MainScreen.text("  A pair of tiny-yet-beautiful bee-wings sprout from your back, too small to allow you to fly.", false);
        if (player.upperBody.wingType == Wings.BEE_LIKE_LARGE)
            MainScreen.text("  A pair of large bee-wings sprout from your back, reflecting the light through their clear membranes beautifully.  They flap quickly, allowing you to easily hover in place or fly.", false);
        if (player.upperBody.wingType == Wings.BAT_LIKE_TINY)
            MainScreen.text("  A pair of tiny bat-like demon-wings sprout from your back, flapping cutely, but otherwise being of little use.", false);
        if (player.upperBody.wingType == Wings.BAT_LIKE_LARGE)
            MainScreen.text("  A pair of large bat-like demon-wings fold behind your shoulders.  With a muscle-twitch, you can extend them, and use them to soar gracefully through the air.", false);
        if (player.upperBody.wingType == Wings.SHARK_FIN)
            MainScreen.text("  A large shark-like fin has sprouted between your shoulder blades.  With it you have far more control over swimming underwater.", false);
        if (player.upperBody.wingType == Wings.FEATHERED_LARGE)
            MainScreen.text("  A pair of large, feathery wings sprout from your back.  Though you usually keep the " + player.upperBody.head.hairColor + "-colored wings folded close, they can unfurl to allow you to soar as gracefully as a harpy.", false);
        if (player.upperBody.wingType == Wings.DRACONIC_SMALL)
            MainScreen.text("  Small, vestigial wings sprout from your shoulders.  They might look like bat's wings, but the membranes are covered in fine, delicate scales.");
        else if (player.upperBody.wingType == Wings.DRACONIC_LARGE)
            MainScreen.text("  Magnificent wings sprout from your shoulders.  When unfurled they stretch further than your arm span, and a single beat of them is all you need to set out toward the sky.  They look a bit like bat's wings, but the membranes are covered in fine, delicate scales and a wicked talon juts from the end of each bone.");
        else if (player.upperBody.wingType == Wings.GIANT_DRAGONFLY)
            MainScreen.text("  Giant dragonfly wings hang from your shoulders.  At a whim, you could twist them into a whirring rhythm fast enough to lift you off the ground and allow you to fly.");

        //Wing arms
        if (player.upperBody.armType == Arm.HARPY)
            MainScreen.text("  Feathers hang off your arms from shoulder to wrist, giving them a slightly wing-like look.", false);
        else if (player.upperBody.armType == Arm.SPIDER)
            MainScreen.text("  Shining black exoskeleton  covers your arms from the biceps down, resembling a pair of long black gloves from a distance.", false);
        //Done with head bits. Move on to body stuff
        //Horse lowerbody, other lowerbody texts appear lower
        if (player.lowerBody == LowerBody.PONY)
            MainScreen.text("  From the waist down you have an incredibly cute and cartoonish parody of a horse's body, with all four legs ending in flat, rounded feet.", false);
        else if (player.lowerBody.isTaur())
            MainScreen.text("  From the waist down you have the body of a horse, with all four legs capped by hooves.", false);
        //Hip info only displays if you aren't a centaur. 
        if (!player.lowerBody.isTaur()) {
            if (player.thickness > 70) {
                MainScreen.text("  You have " + LowerBodyDescriptor.describeHips(player), false);
                if (player.lowerBody.hipRating < 6) {
                    if (player.tone < 65)
                        MainScreen.text(" buried under a noticeable muffin-top, and", false);
                    else MainScreen.text(" that blend into your pillar-like waist, and", false);
                }
                if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                    MainScreen.text(" that blend into the rest of your thick form, and", false);
                if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                    MainScreen.text(" that would be much more noticeable if you weren't so wide-bodied, and", false);
                if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                    MainScreen.text(" that sway and emphasize your thick, curvy shape, and", false);
                if (player.lowerBody.hipRating >= 20)
                    MainScreen.text(" that sway hypnotically on your extra-curvy frame, and", false);
            }
            else if (player.thickness < 30) {
                MainScreen.text("  You have " + LowerBodyDescriptor.describeHips(player), false);
                if (player.lowerBody.hipRating < 6)
                    MainScreen.text(" that match your trim, lithe body, and", false);
                if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                    MainScreen.text(" that sway to and fro, emphasized by your trim body, and", false);
                if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                    MainScreen.text(" that swell out under your trim waistline, and", false);
                if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                    MainScreen.text(", emphasized by your narrow waist, and", false);
                if (player.lowerBody.hipRating >= 20)
                    MainScreen.text(" that swell disproportionately wide on your lithe frame, and", false);
            }
            //STANDARD
            else {
                MainScreen.text("  You have " + LowerBodyDescriptor.describeHips(player), false);
                if (player.lowerBody.hipRating < 6)
                    MainScreen.text(", and", false);
                if (player.femininity > 50) {
                    if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                        MainScreen.text(" that draw the attention of those around you, and", false);
                    if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                        MainScreen.text(" that make you walk with a sexy, swinging gait, and", false);
                    if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                        MainScreen.text(" that make it look like you've birthed many children, and", false);
                    if (player.lowerBody.hipRating >= 20)
                        MainScreen.text(" that make you look more like an animal waiting to be bred than any kind of human, and", false);
                }
                else {
                    if (player.lowerBody.hipRating >= 6 && player.lowerBody.hipRating < 10)
                        MainScreen.text(" that give you a graceful stride, and", false);
                    if (player.lowerBody.hipRating >= 10 && player.lowerBody.hipRating < 15)
                        MainScreen.text(" that add a little feminine swing to your gait, and", false);
                    if (player.lowerBody.hipRating >= 15 && player.lowerBody.hipRating < 20)
                        MainScreen.text(" that force you to sway and wiggle as you move, and", false);
                    if (player.lowerBody.hipRating >= 20) {
                        MainScreen.text(" that give your ", false);
                        if (player.lowerBody.balls > 0)
                            MainScreen.text("balls plenty of room to breathe", false);
                        else if (player.lowerBody.cockSpot.hasCock())
                            MainScreen.text(player.CockDescriptor.describeMultiCock(player) + " plenty of room to swing", false);
                        else if (player.lowerBody.vaginaSpot.hasVagina())
                            MainScreen.text(            VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " a nice, wide berth", false);
                        else MainScreen.text("vacant groin plenty of room", false);
                        MainScreen.text(", and", false);
                    }
                }
            }
        }
        //ASS
        //Horse version
        if (player.lowerBody.isTaur()) {
            //FATBUTT
            if (player.tone < 65) {
                MainScreen.text("  Your " + ButtDescriptor.describeButt(player), false);
                if (player.lowerBody.butt.buttRating < 4)
                    MainScreen.text(" is lean, from what you can see of it.", false);
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    MainScreen.text(" looks fairly average.", false);
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    MainScreen.text(" is fairly plump and healthy.", false);
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    MainScreen.text(" jiggles a bit as you trot around.", false);
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    MainScreen.text(" jiggles and wobbles as you trot about.", false);
                if (player.lowerBody.butt.buttRating >= 20)
                    MainScreen.text(" is obscenely large, bordering freakish, even for a horse.", false);
            }
            //GIRL LOOK AT DAT BOOTY
            else {
                MainScreen.text("  Your " + ButtDescriptor.describeButt(player), false);
                if (player.lowerBody.butt.buttRating < 4)
                    MainScreen.text(" is barely noticable, showing off the muscles of your haunches.", false);
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    MainScreen.text(" matches your toned equine frame quite well.", false);
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    MainScreen.text(" gives hints of just how much muscle you could put into a kick.", false);
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    MainScreen.text(" surges with muscle whenever you trot about.", false);
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    MainScreen.text(" flexes its considerable mass as you move.", false);
                if (player.lowerBody.butt.buttRating >= 20)
                    MainScreen.text(" is stacked with layers of muscle, huge even for a horse.", false);
            }
        }
        //Non-horse PCs
        else {
            //TUBBY ASS
            if (player.tone < 60) {
                MainScreen.text(" your " + ButtDescriptor.describeButt(player), false);
                if (player.lowerBody.butt.buttRating < 4)
                    MainScreen.text(" looks great under your gear.", false);
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    MainScreen.text(" has the barest amount of sexy jiggle.", false);
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    MainScreen.text(" fills out your clothing nicely.", false);
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    MainScreen.text(" wobbles enticingly with every step.", false);
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    MainScreen.text(" wobbles like a bowl full of jello as you walk.", false);
                if (player.lowerBody.butt.buttRating >= 20)
                    MainScreen.text(" is obscenely large, bordering freakish, and makes it difficult to run.", false);
            }
            //FITBUTT
            else {
                MainScreen.text(" your " + ButtDescriptor.describeButt(player), false);
                if (player.lowerBody.butt.buttRating < 4)
                    MainScreen.text(" molds closely against your form.", false);
                if (player.lowerBody.butt.buttRating >= 4 && player.lowerBody.butt.buttRating < 6)
                    MainScreen.text(" contracts with every motion, displaying the detailed curves of its lean musculature.", false);
                if (player.lowerBody.butt.buttRating >= 6 && player.lowerBody.butt.buttRating < 10)
                    MainScreen.text(" fills out your clothing nicely.", false);
                if (player.lowerBody.butt.buttRating >= 10 && player.lowerBody.butt.buttRating < 15)
                    MainScreen.text(" stretches your gear, flexing it with each step.", false);
                if (player.lowerBody.butt.buttRating >= 15 && player.lowerBody.butt.buttRating < 20)
                    MainScreen.text(" threatens to bust out from under your kit each time you clench it.", false);
                if (player.lowerBody.butt.buttRating >= 20)
                    MainScreen.text(" is marvelously large, but completely stacked with muscle.", false);
            }
        }
        //TAILS
        if (player.lowerBody.tailType == Tail.Horse)
            MainScreen.text("  A long " + player.upperBody.head.hairColor + " horsetail hangs from your " + ButtDescriptor.describeButt(player) + ", smooth and shiny.", false);
        if (player.lowerBody.tailType == Tail.Ferret)
            MainScreen.text("  A long ferret tail sprouts from above your [butt].  It is thin, tapered, and covered in shaggy " + player.upperBody.head.hairColor + " fur.", false);
        if (player.lowerBody.tailType == Tail.Dog)
            MainScreen.text("  A fuzzy " + player.upperBody.head.hairColor + " dogtail sprouts just above your " + ButtDescriptor.describeButt(player) + ", wagging to and fro whenever you are happy.", false);
        if (player.lowerBody.tailType == Tail.Demonic)
            MainScreen.text("  A narrow tail ending in a spaded tip curls down from your " + ButtDescriptor.describeButt(player) + ", wrapping around your " + LowerBodyDescriptor.describeLeg(player) + " sensually at every opportunity.", false);
        if (player.lowerBody.tailType == Tail.Cow)
            MainScreen.text("  A long cowtail with a puffy tip swishes back and forth as if swatting at flies.", false);
        if (player.lowerBody.tailType == Tail.SpiderAbdomen) {
            MainScreen.text("  A large, spherical spider-abdomen has grown out from your backside, covered in shiny black chitin.  Though it's heavy and bobs with every motion, it doesn't seem to slow you down.", false);
            if (player.lowerBody.tailVenom > 50 && player.lowerBody.tailVenom < 80)
                MainScreen.text("  Your bulging arachnid posterior feels fairly full of webbing.", false);
            if (player.lowerBody.tailVenom >= 80 && player.lowerBody.tailVenom < 100)
                MainScreen.text("  Your arachnid rear bulges and feels very full of webbing.", false);
            if (player.lowerBody.tailVenom == 100)
                MainScreen.text("  Your swollen spider-butt is distended with the sheer amount of webbing it's holding.", false);
        }
        if (player.lowerBody.tailType == Tail.BeeAbdomen) {
            MainScreen.text("  A large insectile bee-abdomen dangles from just above your backside, bobbing with its own weight as you shift.  It is covered in hard chitin with black and yellow stripes, and tipped with a dagger-like stinger.", false);
            if (player.lowerBody.tailVenom > 50 && player.lowerBody.tailVenom < 80)
                MainScreen.text("  A single drop of poison hangs from your exposed stinger.", false);
            if (player.lowerBody.tailVenom >= 80 && player.lowerBody.tailVenom < 100)
                MainScreen.text("  Poisonous bee venom coats your stinger completely.", false);
            if (player.lowerBody.tailVenom == 100)
                MainScreen.text("  Venom drips from your poisoned stinger regularly.", false);
        }
        if (player.lowerBody.tailType == Tail.Shark) {
            MainScreen.text("  A long shark-tail trails down from your backside, swaying to and fro while giving you a dangerous air.", false);
        }
        if (player.lowerBody.tailType == Tail.Cat) {
            MainScreen.text("  A soft " + player.upperBody.head.hairColor + " cat-tail sprouts just above your " + ButtDescriptor.describeButt(player) + ", curling and twisting with every step to maintain perfect balance.", false);
        }
        if (player.lowerBody.tailType == Tail.Lizard) {
            MainScreen.text("  A tapered tail hangs down from just above your " + ButtDescriptor.describeButt(player) + ".  It sways back and forth, assisting you with keeping your balance.", false);
        }
        if (player.lowerBody.tailType == Tail.Rabbit)
            MainScreen.text("  A short, soft bunny tail sprouts just above your " + ButtDescriptor.describeButt(player) + ", twitching constantly whenever you don't think about it.", false);
        else if (player.lowerBody.tailType == Tail.Harpy)
            MainScreen.text("  A tail of feathers fans out from just above your " + ButtDescriptor.describeButt(player) + ", twitching instinctively to help guide you if you were to take flight.", false);
        else if (player.lowerBody.tailType == Tail.Kangaroo) {
            MainScreen.text("  A conical, ", false);
            if (player.skinType == Skin.GOO)
                MainScreen.text("gooey, " + player.skinTone, false);
            else MainScreen.text("furry, " + player.upperBody.head.hairColor, false);
            MainScreen.text(", tail extends from your " + ButtDescriptor.describeButt(player) + ", bouncing up and down as you move and helping to counterbalance you.", false);
        }
        else if (player.lowerBody.tailType == Tail.Fox) {
            if (player.lowerBody.tailVenom == 1)
                MainScreen.text("  A swishing " + player.upperBody.head.hairColor + " fox's brush extends from your " + ButtDescriptor.describeButt(player) + ", curling around your body - the soft fur feels lovely.");
            else MainScreen.text("  " + Utils.numToCardinalCapText(player.lowerBody.tailVenom) + " swishing " + player.upperBody.head.hairColor + " fox's tails extend from your " + ButtDescriptor.describeButt(player) + ", curling around your body - the soft fur feels lovely.");
        }
        else if (player.lowerBody.tailType == Tail.Draconic) {
            MainScreen.text("  A thin, scaly, prehensile reptilian tail, almost as long as you are tall, swings behind you like a living bullwhip.  Its tip menaces with spikes of bone, meant to deliver painful blows.");
        }
        //appearance
        else if (player.lowerBody.tailType == Tail.Raccoon) {
            MainScreen.text("  A black-and-" + player.upperBody.head.hairColor + "-ringed raccoon tail waves behind you.");
        }
        else if (player.lowerBody.tailType == Tail.Mouse) {
            //appearance
            MainScreen.text("  A naked, " + player.skinTone + " mouse tail pokes from your butt, dragging on the ground and twitching occasionally.");
        }
        //LOWERBODY SPECIAL
        if (player.lowerBody == LowerBody.HUMAN)
            MainScreen.text("  Two normal human legs grow down from your waist, ending in normal human feet.", false);
        else if (player.lowerBody == LowerBody.FERRET) MainScreen.text("  Two furry, digitigrade legs form below your [hips].  The fur is thinner on the feet, and your toes are tipped with claws.", false);
        else if (player.lowerBody == LowerBody.HOOFED)
            MainScreen.text("  Your legs are muscled and jointed oddly, covered in fur, and end in a pair of bestial hooves.", false);
        else if (player.lowerBody == LowerBody.DOG)
            MainScreen.text("  Two digitigrade legs grow downwards from your waist, ending in dog-like hind-paws.", false);
        else if (player.lowerBody == LowerBody.NAGA)
            MainScreen.text("  Below your waist your flesh is fused together into a very long snake-like tail.", false);
        //Horse body is placed higher for readability purposes
        else if (player.lowerBody == LowerBody.DEMONIC_HIGH_HEELS)
            MainScreen.text("  Your perfect lissome legs end in mostly human feet, apart from the horn protruding straight down from the heel that forces you to walk with a sexy, swaying gait.", false);
        else if (player.lowerBody == LowerBody.DEMONIC_CLAWS)
            MainScreen.text("  Your lithe legs are capped with flexible clawed feet.  Sharp black nails grow where once you had toe-nails, giving you fantastic grip.", false);
        else if (player.lowerBody == LowerBody.BEE)
            MainScreen.text("  Your legs are covered in a shimmering insectile carapace up to mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.  A bit of downy yellow and black fur fuzzes your upper thighs, just like a bee.", false);
        else if (player.lowerBody == LowerBody.GOO)
            MainScreen.text("  In place of legs you have a shifting amorphous blob.  Thankfully it's quite easy to propel yourself around on.  The lowest portions of your " + player.inventory.armor.displayName + " float around inside you, bringing you no discomfort.", false);
        else if (player.lowerBody == LowerBody.CAT)
            MainScreen.text("  Two digitigrade legs grow downwards from your waist, ending in soft, padded cat-paws.", false);
        else if (player.lowerBody == LowerBody.LIZARD)
            MainScreen.text("  Two digitigrade legs grow down from your " + LowerBodyDescriptor.describeHips(player) + ", ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.", false);
        else if (player.lowerBody == LowerBody.BUNNY)
            MainScreen.text("  Your legs thicken below the waist as they turn into soft-furred rabbit-like legs.  You even have large bunny feet that make hopping around a little easier than walking.", false);
        else if (player.lowerBody == LowerBody.HARPY)
            MainScreen.text("  Your legs are covered with " + player.upperBody.head.hairColor + " plumage.  Thankfully the thick, powerful thighs are perfect for launching you into the air, and your feet remain mostly human, even if they are two-toed and tipped with talons.", false);
        else if (player.lowerBody == LowerBody.KANGAROO)
            MainScreen.text("  Your furry legs have short thighs and long calves, with even longer feet ending in prominently-nailed toes.", false);
        else if (player.lowerBody == LowerBody.CHITINOUS_SPIDER_LEGS)
            MainScreen.text("  Your legs are covered in a reflective black, insectile carapace up to your mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.", false);
        else if (player.lowerBody == LowerBody.DRIDER_LOWER_BODY)
            MainScreen.text("  Where your legs would normally start you have grown the body of a spider, with eight spindly legs that sprout from its sides.", false);
        else if (player.lowerBody == LowerBody.FOX)
            MainScreen.text("  Your legs are crooked into high knees with hocks and long feet, like those of a fox; cute bulbous toes decorate the ends.");
        else if (player.lowerBody == LowerBody.DRAGON)
            MainScreen.text("  Two human-like legs grow down from your " + LowerBodyDescriptor.describeHips(player) + ", sheathed in scales and ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.", false);
        else if (player.lowerBody == LowerBody.RACCOON)
            MainScreen.text("  Your legs, though covered in fur, are humanlike.  Long feet on the ends bear equally long toes, and the pads on the bottoms are quite sensitive to the touch.");
        if (player.perks.has("Incorporeality"))
            MainScreen.text("  Of course, your " + LowerBodyDescriptor.describeLegs(player) + " are partially transparent due to their ghostly nature.", false);

        MainScreen.text("\n", false);
        if (player.statusAffects.has("GooStuffed")) {
            MainScreen.text("\n<b>Your gravid-looking belly is absolutely stuffed full of goo. There's no way you can get pregnant like this, but at the same time, you look like some fat-bellied breeder.</b>\n");
        }
        //Pregnancy Shiiiiiitz
        if ((player.buttPregnancyType == PregnancyType.FROG_GIRL) || (player.buttPregnancyType == PregnancyType.SATYR) || player.isPregnant()) {
            if (player.pregnancyType == PregnancyType.OVIELIXIR_EGGS) {
                MainScreen.text("<b>", false);
                //Compute size
                temp = player.statusAffects.get("$1").value3 + player.statusAffects.get("Eggs").value2 * 10;
                if (player.pregnancyIncubation <= 50 && player.pregnancyIncubation > 20) {
                    MainScreen.text("Your swollen pregnant belly is as large as a ", false);
                    if (temp < 10)
                        MainScreen.text("basketball.", false);
                    if (temp >= 10 && temp < 20)
                        MainScreen.text("watermelon.", false);
                    if (temp >= 20)
                        MainScreen.text("beach ball.", false);
                }
                if (player.pregnancyIncubation <= 20) {
                    MainScreen.text("Your swollen pregnant belly is as large as a ", false);
                    if (temp < 10)
                        MainScreen.text("watermelon.", false);
                    if (temp >= 10 && temp < 20)
                        MainScreen.text("beach ball.", false);
                    if (temp >= 20)
                        MainScreen.text("large medicine ball.", false);
                }
                MainScreen.text("</b>", false);
                temp = 0;
            }
            //Satur preggos - only shows if bigger than regular pregnancy or not pregnancy
            else if (player.buttPregnancyType == PregnancyType.SATYR && player.buttPregnancyIncubation > player.pregnancyIncubation) {
                if (player.buttPregnancyIncubation < 125 && player.buttPregnancyIncubation >= 75) {
                    MainScreen.text("<b>You've got the begginings of a small pot-belly.</b>", false);
                }
                else if (player.buttPregnancyIncubation >= 50) {
                    MainScreen.text("<b>The unmistakable bulge of pregnancy is visible in your tummy, yet it feels odd inside you - wrong somehow.</b>", false);
                }
                else if (player.buttPregnancyIncubation >= 30) {
                    MainScreen.text("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
                }
                else { //Surely Benoit and Cotton deserve their place in this list
                    if (player.pregnancyType == PregnancyType.IZMA || player.pregnancyType == PregnancyType.MOUSE || player.pregnancyType == PregnancyType.AMILY || player.pregnancyType == PregnancyType.EMBER || player.pregnancyType == PregnancyType.BENOIT || player.pregnancyType == PregnancyType.COTTON || player.pregnancyType == PregnancyType.URTA)
                        MainScreen.text("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                    else if (player.pregnancyType != PregnancyType.MARBLE)
                        MainScreen.text("\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>", false);
                    else MainScreen.text("\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>", false);
                }
            }
            //URTA PREG
            else if (player.pregnancyType == PregnancyType.URTA) {
                if (player.pregnancyIncubation <= 432 && player.pregnancyIncubation > 360) {
                    MainScreen.text("<b>Your belly is larger than it used to be.</b>\n", false);
                }
                if (player.pregnancyIncubation <= 360 && player.pregnancyIncubation > 288) {
                    MainScreen.text("<b>Your belly is more noticably distended.   You're pretty sure it's Urta's.</b>", false);
                }
                if (player.pregnancyIncubation <= 288 && player.pregnancyIncubation > 216) {
                    MainScreen.text("<b>The unmistakable bulge of pregnancy is visible in your tummy, and the baby within is kicking nowadays.</b>", false);
                }
                if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 144) {
                    MainScreen.text("<b>Your belly is large and very obviously pregnant to anyone who looks at you.  It's gotten heavy enough to be a pain to carry around all the time.</b>", false);
                }
                if (player.pregnancyIncubation <= 144 && player.pregnancyIncubation > 72) {
                    MainScreen.text("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.  It's large and round, frequently moving.</b>", false);
                }
                if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48) {
                    MainScreen.text("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
                }
                if (player.pregnancyIncubation <= 48) {
                    MainScreen.text("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                }
            }
            else if (player.buttPregnancyType == PregnancyType.FROG_GIRL) {
                if (player.buttPregnancyIncubation >= 8)
                    MainScreen.text("<b>Your stomach is so full of frog eggs that you look about to birth at any moment, your belly wobbling and shaking with every step you take, packed with frog ovum.</b>");
                else MainScreen.text("<b>You're stuffed so full with eggs that your belly looks obscenely distended, huge and weighted with the gargantuan eggs crowding your gut. They make your gait a waddle and your gravid tummy wobble obscenely.</b>");
            }
            else if (player.pregnancyType == PregnancyType.FAERIE) { //Belly size remains constant throughout the pregnancy
                MainScreen.text("<b>Your belly remains swollen like a watermelon. ");
                if (player.pregnancyIncubation <= 100)
                    MainScreen.text("It's full of liquid, though unlike a normal pregnancy the passenger you’re carrying is tiny.</b>");
                else if (player.pregnancyIncubation <= 140)
                    MainScreen.text("It feels like it’s full of thick syrup or jelly.</b>");
                else MainScreen.text("It still feels like there’s a solid ball inside your womb.</b>");
            }
            else {
                if (player.pregnancyIncubation <= 336 && player.pregnancyIncubation > 280) {
                    MainScreen.text("<b>Your belly is larger than it used to be.</b>", false);
                }
                if (player.pregnancyIncubation <= 280 && player.pregnancyIncubation > 216) {
                    MainScreen.text("<b>Your belly is more noticably distended.   You are probably pregnant.</b>", false);
                }
                if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 180) {
                    MainScreen.text("<b>The unmistakable bulge of pregnancy is visible in your tummy.</b>", false);
                }
                if (player.pregnancyIncubation <= 180 && player.pregnancyIncubation > 120) {
                    MainScreen.text("<b>Your belly is very obviously pregnant to anyone who looks at you.</b>", false);
                }
                if (player.pregnancyIncubation <= 120 && player.pregnancyIncubation > 72) {
                    MainScreen.text("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.</b>", false);
                }
                if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48) {
                    MainScreen.text("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
                }
                if (player.pregnancyIncubation <= 48) { //Surely Benoit and Cotton deserve their place in this list
                    if (player.pregnancyType == PregnancyType.IZMA || player.pregnancyType == PregnancyType.MOUSE || player.pregnancyType == PregnancyType.AMILY || player.pregnancyType == PregnancyType.EMBER || player.pregnancyType == PregnancyType.BENOIT || player.pregnancyType == PregnancyType.COTTON || player.pregnancyType == PregnancyType.URTA)
                        MainScreen.text("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                    else if (player.pregnancyType != PregnancyType.MARBLE)
                        MainScreen.text("\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>", false);
                    else MainScreen.text("\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>", false);
                }
            }
            MainScreen.text("\n", false);
        }
        MainScreen.text("\n", false);
        if (player.upperBody.gills)
            MainScreen.text("A pair of feathery gills are growing out just below your neck, spreading out horizontally and draping down your chest.  They allow you to stay in the water for quite a long time.  ", false);
        //Chesticles..I mean bewbz.
        if (player.upperBody.chest.count() == 1) {
            MainScreen.text("You have " + Utils.numToCardinalText(player.upperBody.chest.get(temp).breasts) + " " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(temp)) + ", each supporting ", false);
            if (player.upperBody.chest.get(0).nipplesPerBreast == 1)
                MainScreen.text(Utils.numToCardinalText(player.upperBody.chest.get(temp).nipplesPerBreast) + " " + player.upperBody.chest.BreastRatingLargest[0].nippleLength + "-inch " + BreastDescriptor.describeNipple(temp) + ".", false);
            else MainScreen.text(Utils.numToCardinalText(player.upperBody.chest.get(temp).nipplesPerBreast) + " " + player.upperBody.chest.BreastRatingLargest[0].nippleLength + "-inch " + BreastDescriptor.describeNipple(temp) + "s.", false);
            if (player.upperBody.chest.get(0).milkFullness > 75)
                MainScreen.text("  Your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(temp)) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.", false);
            if (player.upperBody.chest.get(0).breastRating >= 1)
                MainScreen.text("  You could easily fill a " + BreastDescriptor.breastCup(player.upperBody.chest.get(temp)) + " bra.", false);
            //Done with tits.  Move on.
            MainScreen.text("\n", false);
        }
        //many rows
        else {
            MainScreen.text("You have " + Utils.numToCardinalText(player.upperBody.chest.count()) + " rows of breasts, the topmost pair starting at your chest.\n", false);
            while (temp < player.upperBody.chest.count()) {
                if (temp == 0)
                    MainScreen.text("--Your uppermost rack houses ", false);
                if (temp == 1)
                    MainScreen.text("\n--The second row holds ", false);
                if (temp == 2)
                    MainScreen.text("\n--Your third row of breasts contains ", false);
                if (temp == 3)
                    MainScreen.text("\n--Your fourth set of tits cradles ", false);
                if (temp == 4)
                    MainScreen.text("\n--Your fifth and final mammory grouping swells with ", false);
                MainScreen.text(Utils.numToCardinalText(player.upperBody.chest.get(temp).breasts) + " " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(temp)) + " with ", false);
                if (player.upperBody.chest.get(temp).nipplesPerBreast == 1)
                    MainScreen.text(Utils.numToCardinalText(player.upperBody.chest.get(temp).nipplesPerBreast) + " " + player.upperBody.chest.BreastRatingLargest[0].nippleLength + "-inch " + BreastDescriptor.describeNipple(temp) + " each.", false);
                else MainScreen.text(Utils.numToCardinalText(player.upperBody.chest.get(temp).nipplesPerBreast) + " " + player.upperBody.chest.BreastRatingLargest[0].nippleLength + "-inch " + BreastDescriptor.describeNipple(temp) + "s each.", false);
                if (player.upperBody.chest.get(temp).breastRating >= 1)
                    MainScreen.text("  They could easily fill a " + BreastDescriptor.breastCup(player.upperBody.chest.get(temp)) + " bra.", false);
                if (player.upperBody.chest.get(temp).milkFullness > 75)
                    MainScreen.text("  Your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(temp)) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.", false);
                temp++;
            }
            //Done with tits.  Move on.
            MainScreen.text("\n", false);
        }
        //Crotchial stuff - mention snake
        if (player.lowerBody == LowerBody.NAGA && player.gender > 0) {
            MainScreen.text("\nYour sex", false);
            if (player.gender == 3 || player.lowerBody.cockSpot.count() > 1)
                MainScreen.text("es are ", false);
            else MainScreen.text(" is ", false);
            MainScreen.text("concealed within a cavity in your tail when not in use, though when the need arises, you can part your concealing slit and reveal your true self.\n", false);
        }
        //Cock stuff!
        temp = 0;
        if (player.lowerBody.cockSpot.count() == 1) {
            if (player.lowerBody == LowerBody.CENTAUR)
                MainScreen.text("\nEver since becoming a centaur, your equipment has shifted to lie between your rear legs, like a horse.", false);
            MainScreen.text("\nYour " + player.CockDescriptor.describeCock(player, temp) + " is " + player.lowerBody.cockSpot.get(temp).cockLength + " inches long and ", false);
            if (Math.round(10 * player.lowerBody.cockSpot.get(temp).cockThickness) / 10 < 2) {
                if (Math.round(10 * player.lowerBody.cockSpot.get(temp).cockThickness) / 10 == 1)
                    MainScreen.text(player.lowerBody.cockSpot.get(temp).cockThickness + " inch thick.", false);
                else
                    MainScreen.text(Math.round(10 * player.lowerBody.cockSpot.get(temp).cockThickness) / 10 + " inches thick.", false);
            }
            else
                MainScreen.text(Utils.numToCardinalText(Math.round(10 * player.lowerBody.cockSpot.get(temp).cockThickness) / 10) + " inches wide.", false);
            //Horsecock flavor
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.HORSE) {
                MainScreen.text("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your shaft flares proudly, just like a horse's.", false);
            }
            //dog cock flavor
            if (((player.lowerBody.cockSpot.get(temp).cockType == Cock.DOG) || (player.lowerBody.cockSpot.get(temp).cockType == Cock.FOX)) || (player.lowerBody.cockSpot.get(temp).cockType == Cock.FOX)) {
                if (player.lowerBody.cockSpot.get(temp).knotMultiplier >= 1.8)
                    MainScreen.text("  The obscenely swollen lump of flesh near the base of your " + player.CockDescriptor.describeCock(player, temp) + " looks almost too big for your cock.", false);
                else if (player.lowerBody.cockSpot.get(temp).knotMultiplier >= 1.4)
                    MainScreen.text("  A large bulge of flesh nestles just above the bottom of your " + player.CockDescriptor.describeCock(player, temp) + ", to ensure it stays where it belongs during mating.", false);
                else if (player.lowerBody.cockSpot.get(temp).knotMultiplier > 1)
                    MainScreen.text("  A small knot of thicker flesh is near the base of your " + player.CockDescriptor.describeCock(player, temp) + ", ready to expand to help you lodge it inside a female.", false);
                //List thickness
                MainScreen.text("  The knot is " + Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * player.lowerBody.cockSpot.get(temp).knotMultiplier * 10) / 10 + " inches wide when at full size.", false);
            }
            //Demon cock flavor
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.DEMON) {
                MainScreen.text("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.", false);
            }
            //Tentacle cock flavor
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.TENTACLE) {
                MainScreen.text("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.", false);
            }
            //Cat cock flavor
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.CAT) {
                MainScreen.text("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.", false);
            }
            //Snake cock flavor
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.LIZARD) {
                MainScreen.text("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.", false);
            }
            //Anemone cock flavor
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.ANEMONE) {
                MainScreen.text("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.", false);
            }
            //Kangawang flavor
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.KANGAROO) {
                MainScreen.text("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.", false);
            }
            //Draconic Cawk Flava flav
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.DRAGON) {
                MainScreen.text("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
            }
            if (player.lowerBody.cockSpot.get(temp).cockType == Cock.BEE) {
                MainScreen.text("  It's a long, smooth black shaft that's rigid to the touch.  Its base is ringed with a layer of four inch long soft bee hair.  The tip has a much finer layer of short yellow hairs.  The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.");
            }
            //Worm flavor
            if (player.statusAffects.has("Infested"))
                MainScreen.text("  Every now and again a slimy worm coated in spunk slips partway out of your " + player.CockDescriptor.describeCock(player, 0) + ", tasting the air like a snake's tongue.", false);
            if (player.lowerBody.cockSpot.get(temp).sock)
                PlayerAppearanceMenu.sockDescript(temp);
            //DONE WITH COCKS, moving on!
            MainScreen.text("\n", false);
        }
        if (player.lowerBody.cockSpot.count() > 1) {
            temp = 0;
            rando = Utils.rand(4);
            if (player.lowerBody == LowerBody.CENTAUR)
                MainScreen.text("\nWhere a horse's penis would usually be located, you have instead grown " + player.CockDescriptor.describeMultiCock(player) + "!\n", false);
            else MainScreen.text("\nWhere a penis would normally be located, you have instead grown " + player.CockDescriptor.describeMultiCock(player) + "!\n", false);
            while (temp < player.lowerBody.cockSpot.count()) {

                //middle cock description
                if (rando == 0) {
                    if (temp == 0) MainScreen.text("--Your first ", false);
                    else MainScreen.text("--Your next ", false);
                    MainScreen.text(player.CockDescriptor.describeCock(player, temp), false);
                    MainScreen.text(" is ", false);
                    MainScreen.text(player.lowerBody.cockSpot.get(temp).cockLength + " inches long and ", false);
                    if (Math.floor(player.lowerBody.cockSpot.get(temp).cockThickness) >= 2)
                        MainScreen.text(Utils.numToCardinalText(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10) + " inches wide.", false);
                    else {
                        if (player.lowerBody.cockSpot.get(temp).cockThickness == 1)
                            MainScreen.text("one inch wide.", false);
                        else MainScreen.text(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10 + " inches wide.", false);
                    }
                }
                if (rando == 1) {
                    MainScreen.text("--One of your ", false);
                    MainScreen.text(player.CockDescriptor.describeCock(player, temp) + "s is " + Math.round(10 * player.lowerBody.cockSpot.get(temp).cockLength) / 10 + " inches long and ", false);
                    if (Math.floor(player.lowerBody.cockSpot.get(temp).cockThickness) >= 2)
                        MainScreen.text(Utils.numToCardinalText(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10) + " inches thick.", false);
                    else {
                        if (player.lowerBody.cockSpot.get(temp).cockThickness == 1)
                            MainScreen.text("one inch thick.", false);
                        else MainScreen.text(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10 + " inches thick.", false);
                    }
                }
                if (rando == 2) {
                    if (temp > 0)
                        MainScreen.text("--Another of your ", false);
                    else MainScreen.text("--One of your ", false);
                    MainScreen.text(player.CockDescriptor.describeCock(player, temp) + "s is " + Math.round(10 * player.lowerBody.cockSpot.get(temp).cockLength) / 10 + " inches long and ", false);
                    if (Math.floor(player.lowerBody.cockSpot.get(temp).cockThickness) >= 2)
                        MainScreen.text(Utils.numToCardinalText(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10) + " inches thick.", false);
                    else {
                        if (player.lowerBody.cockSpot.get(temp).cockThickness == 1)
                            MainScreen.text("one inch thick.", false);
                        else MainScreen.text(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10 + " inches thick.", false);
                    }
                }
                if (rando == 3) {
                    if (temp > 0)
                        MainScreen.text("--Your next ", false);
                    else MainScreen.text("--Your first ", false);
                    MainScreen.text(player.CockDescriptor.describeCock(player, temp) + " is " + Math.round(10 * player.lowerBody.cockSpot.get(temp).cockLength) / 10 + " inches long and ", false);
                    if (Math.floor(player.lowerBody.cockSpot.get(temp).cockThickness) >= 2)
                        MainScreen.text(Utils.numToCardinalText(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10) + " inches in diameter.", false);
                    else {
                        if (Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10 == 1)
                            MainScreen.text("one inch in diameter.", false);
                        else MainScreen.text(Math.round(player.lowerBody.cockSpot.get(temp).cockThickness * 10) / 10 + " inches in diameter.", false);
                    }
                }
                //horse cock flavor
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.HORSE) {
                    MainScreen.text("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your " + player.CockDescriptor.describeCock(player, temp) + " flares proudly, just like a horse's.", false);
                }
                //dog cock flavor
                if ((player.lowerBody.cockSpot.get(temp).cockType == Cock.DOG) || (player.lowerBody.cockSpot.get(temp).cockType == Cock.FOX)) {
                    MainScreen.text("  It is shiny, pointed, and covered in veins, just like a large ");
                    if (player.lowerBody.cockSpot.get(temp).cockType == Cock.DOG)
                        MainScreen.text("dog's cock.");
                    else
                        MainScreen.text("fox's cock.");

                    if (player.lowerBody.cockSpot.get(temp).knotMultiplier >= 1.8)
                        MainScreen.text("  The obscenely swollen lump of flesh near the base of your " + player.CockDescriptor.describeCock(player, temp) + " looks almost comically mismatched for your " + player.CockDescriptor.describeCock(player, temp) + ".", false);
                    else if (player.lowerBody.cockSpot.get(temp).knotMultiplier >= 1.4)
                        MainScreen.text("  A large bulge of flesh nestles just above the bottom of your " + player.CockDescriptor.describeCock(player, temp) + ", to ensure it stays where it belongs during mating.", false);
                    else if (player.lowerBody.cockSpot.get(temp).knotMultiplier > 1)
                        MainScreen.text("  A small knot of thicker flesh is near the base of your " + player.CockDescriptor.describeCock(player, temp) + ", ready to expand to help you lodge your " + player.CockDescriptor.describeCock(player, temp) + " inside a female.", false);
                    //List knot thickness
                    MainScreen.text("  The knot is " + Math.floor(player.lowerBody.cockSpot.get(temp).cockThickness * player.lowerBody.cockSpot.get(temp).knotMultiplier * 10) / 10 + " inches thick when at full size.", false);
                }
                //Demon cock flavor
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.DEMON) {
                    MainScreen.text("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.", false);
                }
                //Tentacle cock flavor
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.TENTACLE) {
                    MainScreen.text("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.", false);
                }
                //Cat cock flavor
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.CAT) {
                    MainScreen.text("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.", false);
                }
                //Snake cock flavor
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.LIZARD) {
                    MainScreen.text("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.", false);
                }
                //Anemone cock flavor
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.ANEMONE) {
                    MainScreen.text("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.", false);
                }
                //Kangwang flavor
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.KANGAROO) {
                    MainScreen.text("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.", false);
                }
                //Draconic Cawk Flava flav
                if (player.lowerBody.cockSpot.get(temp).cockType == Cock.DRAGON) {
                    MainScreen.text("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
                }
                if (player.lowerBody.cockSpot.get(temp).sock != "" && player.lowerBody.cockSpot.get(temp).sock != null)	// I dunno what was happening, but it looks like .sock is null, as it doesn't exist. I guess this is probably more left over from some of the restucturing.
                {																		// Anyways, check against null values, and stuff works again.
                    throw new Error("Found a sock description (WTF even is a sock?)", player.lowerBody.cockSpot.get(temp).sock);
                    PlayerAppearanceMenu.sockDescript(temp);
                }
                temp++;
                rando++;
                MainScreen.text("\n", false);
                if (rando > 3) rando = 0;
            }
            //Worm flavor
            if (player.statusAffects.has("Infested"))
                MainScreen.text("Every now and again slimy worms coated in spunk slip partway out of your " + player.CockDescriptor.describeMultiCockShort(player) + ", tasting the air like tongues of snakes.\n", false);
            //DONE WITH COCKS, moving on!
        }
        //Of Balls and Sacks!
        if (player.lowerBody.balls > 0) {
            if (player.statusAffects.has("Uniball")) {
                if (player.skinType != Skin.GOO)
                    MainScreen.text("Your [sack] clings tightly to your groin, holding " + BallsDescriptor.describeBalls(false, true, player, true) + " snugly against you.");
                else if (player.skinType == Skin.GOO)
                    MainScreen.text("Your [sack] clings tightly to your groin, dripping and holding " + BallsDescriptor.describeBalls(false, true, player, true) + " snugly against you.");
            }
            else if (player.lowerBody.cockSpot.count() == 0) {
                if (player.skinType == Skin.PLAIN)
                    MainScreen.text("A " + BallsDescriptor.describeSack(player) + " with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily under where a penis would normally grow.", false);
                if (player.skinType == Skin.FUR)
                    MainScreen.text("A fuzzy " + BallsDescriptor.describeSack(player) + " filled with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings low under where a penis would normally grow.", false);
                if (player.skinType == Skin.SCALES)
                    MainScreen.text("A scaley " + BallsDescriptor.describeSack(player) + " hugs your " + BallsDescriptor.describeBalls(false, true, player, true) + " tightly against your body.", false);
                if (player.skinType == Skin.GOO)
                    MainScreen.text("An oozing, semi-solid sack with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily under where a penis would normally grow.", false);
            }
            else {
                if (player.skinType == Skin.PLAIN)
                    MainScreen.text("A " + BallsDescriptor.describeSack(player) + " with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily beneath your " + player.CockDescriptor.describeMultiCockShort(player) + ".", false);
                if (player.skinType == Skin.FUR)
                    MainScreen.text("A fuzzy " + BallsDescriptor.describeSack(player) + " filled with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings low under your " + player.CockDescriptor.describeMultiCockShort(player) + ".", false);
                if (player.skinType == Skin.SCALES)
                    MainScreen.text("A scaley " + BallsDescriptor.describeSack(player) + " hugs your " + BallsDescriptor.describeBalls(false, true, player, true) + " tightly against your body.", false);
                if (player.skinType == Skin.GOO)
                    MainScreen.text("An oozing, semi-solid sack with " + BallsDescriptor.describeBalls(false, true, player, true) + " swings heavily beneath your " + player.CockDescriptor.describeMultiCockShort(player) + ".", false);
            }
            MainScreen.text("  You estimate each of them to be about " + Utils.numToCardinalText(Math.round(player.lowerBody.ballSize)) + " ", false);
            if (Math.round(player.lowerBody.ballSize) == 1)
                MainScreen.text("inch", false);
            else MainScreen.text("inches", false);
            MainScreen.text(" across.\n", false);
        }
        //VAGOOZ
        if (player.lowerBody.vaginaSpot.count() > 0) {
            if (player.gender == 2 && player.lowerBody == LowerBody.CENTAUR)
                MainScreen.text("\nEver since becoming a centaur, your womanly parts have shifted to lie between your rear legs, in a rather equine fashion.", false);
            MainScreen.text("\n", false);
            if (player.lowerBody.vaginaSpot.count() == 1)
                MainScreen.text("You have a " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", with a " + player.lowerBody.vaginaSpot.get(0).clitLength + "-inch clit", false);
            if (player.lowerBody.vaginaSpot.get(0).virgin)
                MainScreen.text(" and an intact hymen", false);
            MainScreen.text(".  ", false);
            if (player.lowerBody.vaginaSpot.count() > 1)
                MainScreen.text("You have " + player.lowerBody.vaginaSpot.count() + " " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s, with " + player.lowerBody.vaginaSpot.get(0).clitLength + "-inch clits each.  ", false);
            if (player.stats.lib < 50 && player.stats.lust < 50) //not particularly horny

            {
                //Wetness
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.WET && player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.DROOLING)
                    MainScreen.text("Moisture gleams in ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.DROOLING) {
                    MainScreen.text("Occasional beads of ", false);
                    MainScreen.text("lubricant drip from ", false);
                }
                //Different description based on vag looseness
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.WET) {
                    if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.LOOSE)
                        MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ". ", false);
                    if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= VaginaLooseness.LOOSE && player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.GAPING_WIDE)
                        MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", its lips slightly parted. ", false);
                    if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= VaginaLooseness.GAPING_WIDE)
                        MainScreen.text("the massive hole that is your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  ", false);
                }
            }
            if ((player.stats.lib >= 50 || player.stats.lust >= 50) && (player.stats.lib < 80 && player.stats.lust < 80)) //kinda horny

            {
                //Wetness
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.WET)
                    MainScreen.text("Moisture gleams in ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.WET && player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.DROOLING) {
                    MainScreen.text("Occasional beads of ", false);
                    MainScreen.text("lubricant drip from ", false);
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.DROOLING) {
                    MainScreen.text("Thin streams of ", false);
                    MainScreen.text("lubricant occasionally dribble from ", false);
                }
                //Different description based on vag looseness
                if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.LOOSE)
                    MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ". ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= VaginaLooseness.LOOSE && player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.GAPING_WIDE)
                    MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", its lips slightly parted. ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= VaginaLooseness.GAPING_WIDE)
                    MainScreen.text("the massive hole that is your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  ", false);
            }
            if ((player.stats.lib > 80 || player.stats.lust > 80)) //WTF horny!

            {
                //Wetness
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.WET) {
                    MainScreen.text("Occasional beads of ", false);
                    MainScreen.text("lubricant drip from ", false);
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.WET && player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.DROOLING) {
                    MainScreen.text("Thin streams of ", false);
                    MainScreen.text("lubricant occasionally dribble from ", false);
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.DROOLING) {
                    MainScreen.text("Thick streams of ", false);
                    MainScreen.text("lubricant drool constantly from ", false);
                }
                //Different description based on vag looseness
                if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.LOOSE)
                    MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ". ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= VaginaLooseness.LOOSE && player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.GAPING_WIDE)
                    MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", its lips slightly parted. ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= VaginaLooseness.GAPING_WIDE)
                    MainScreen.text("the massive hole that is your cunt.  ", false);
            }
            //Line Drop for next descript!
            MainScreen.text("\n", false);
        }
        //Genderless lovun'
        if (player.lowerBody.cockSpot.count() == 0 && player.lowerBody.vaginaSpot.count() == 0)
            MainScreen.text("\nYou have a curious lack of any sexual endowments.\n", false);


        //BUNGHOLIO
        if (player.lowerBody.butt) {
            MainScreen.text("\n", false);
            MainScreen.text("You have one " + ButtDescriptor.describeButthole(player) + ", placed between your butt-cheeks where it belongs.\n", false);
        }
        //Piercings!
        if (player.eyebrowPierced > 0)
            MainScreen.text("\nA solitary " + player.eyebrowPShort + " adorns your eyebrow, looking very stylish.", false);
        if (player.earsPierced > 0)
            MainScreen.text("\nYour ears are pierced with " + player.earsPShort + ".", false);
        if (player.nosePierced > 0)
            MainScreen.text("\nA " + player.nosePShort + " dangles from your nose.", false);
        if (player.lipPierced > 0)
            MainScreen.text("\nShining on your lip, a " + player.lipPShort + " is plainly visible.", false);
        if (player.tonguePierced > 0)
            MainScreen.text("\nThough not visible, you can plainly feel your " + player.tonguePShort + " secured in your tongue.", false);
        if (player.nipplesPierced == 3)
            MainScreen.text("\nYour " + BreastDescriptor.describeNipple(0) + "s ache and tingle with every step, as your heavy " + player.nipplesPShort + " swings back and forth.", false);
        else if (player.nipplesPierced > 0)
            MainScreen.text("\nYour " + BreastDescriptor.describeNipple(0) + "s are pierced with " + player.nipplesPShort + ".", false);
        if (player.lowerBody.cockSpot.count() > 0) {
            if (player.lowerBody.cockSpot.get(0).pierced > 0) {
                MainScreen.text("\nLooking positively perverse, a " + player.lowerBody.cockSpot.get(0).pShortDesc + " adorns your " + player.CockDescriptor.describeCock(player, 0) + ".", false);
            }
        }
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00286] == 1)
            MainScreen.text("\nA magical, ruby-studded bar pierces your belly button, allowing you to summon Ceraph on a whim.", false);
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            if (player.lowerBody.vaginaSpot.get(0).labiaPierced > 0)
                MainScreen.text("\nYour " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " glitters with the " + player.lowerBody.vaginaSpot.get(0).labiaPShort + " hanging from your lips.", false);
            if (player.lowerBody.vaginaSpot.get(0).clitPierced > 0)
                MainScreen.text("\nImpossible to ignore, your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " glitters with its " + player.lowerBody.vaginaSpot.get(0).clitPShort + ".", false);
        }
        //MONEY!
        if (player.stats.gems == 0)
            MainScreen.text("\n\n<b>Your money-purse is devoid of any currency.", false);
        if (player.stats.gems > 1)
            MainScreen.text("\n\n<b>You have " + player.stats.gems + " shining gems, collected in your travels.", false);
        if (player.stats.gems == 1)
            MainScreen.text("\n\n<b>You have " + player.stats.gems + " shining gem, collected in your travels.", false);
        mainView.setOutputText(currentText);
        //MainScreen.hideButtons();
        //addButton(0,"Next",camp);
        flushOutputTextToGUI();
    }

    public static sockDescript(index: number): void {
        MainScreen.text("  ");
        if (player.lowerBody.cockSpot.get(index).sock == "wool")
            MainScreen.text("It's covered by a wooly white cock-sock, keeping it snug and warm despite how cold it might get.");
        else if (player.lowerBody.cockSpot.get(index).sock == "alabaster")
            MainScreen.text("It's covered by a white, lacey cock-sock, snugly wrapping around it like a bridal dress around a bride.");
        else if (player.lowerBody.cockSpot.get(index).sock == "cockring")
            MainScreen.text("It's covered by a black latex cock-sock with two attached metal rings, keeping your cock just a little harder and [balls] aching for release.");
        else if (player.lowerBody.cockSpot.get(index).sock == "viridian")
            MainScreen.text("It's covered by a lacey dark green cock-sock accented with red rose-like patterns.  Just wearing it makes your body, especially your cock, tingle.");
        else if (player.lowerBody.cockSpot.get(index).sock == "scarlet")
            MainScreen.text("It's covered by a lacey red cock-sock that clings tightly to your member.  Just wearing it makes your cock throb, as if it yearns to be larger...");
        else if (player.lowerBody.cockSpot.get(index).sock == "cobalt")
            MainScreen.text("It's covered by a lacey blue cock-sock that clings tightly to your member... really tightly.  It's so tight it's almost uncomfortable, and you wonder if any growth might be inhibited.");
        else if (player.lowerBody.cockSpot.get(index).sock == "gilded")
            MainScreen.text("It's covered by a metallic gold cock-sock that clings tightly to you, its surface covered in glittering gems.  Despite the warmth of your body, the cock-sock remains cool.");
        else if (player.lowerBody.cockSpot.get(index).sock == "amaranthine") {
            MainScreen.text("It's covered by a lacey purple cock-sock");
            if (player.lowerBody.cockSpot.get(index).cockType != CockType.DISPLACER)
                MainScreen.text(" that fits somewhat awkwardly on your member");
            else
                MainScreen.text(" that fits your coeurl cock perfectly");
            MainScreen.text(".  Just wearing it makes you feel stronger and more powerful.");
        }
        else MainScreen.text("<b>Yo, this is an error.</b>");
    }

}