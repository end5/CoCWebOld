import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class GoldenSeed extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        //'type' refers to the variety of seed.
        //0 == standard.
        //1 == enhanced - increase change limit and no pre-reqs for TF
        let changes: number = 0;
        let changeLimit: number = 1;
        if (type == 1) changeLimit += 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Generic eating text:
        MainScreen.text("", true);
        MainScreen.text("You pop the nut into your mouth, chewing the delicious treat and swallowing it quickly.  No wonder harpies love these things so much!", false);
        //****************
        //Stats:
        //****************
        //-Speed increase to 100.
        if (player.stats.spe < 100 && Utils.rand(3) == 0) {
            changes++;
            if (player.stats.spe >= 75) MainScreen.text("\n\nA familiar chill runs down your spine. Your muscles feel like well oiled machinery, ready to snap into action with lightning speed.", false);
            else MainScreen.text("\n\nA chill runs through your spine, leaving you feeling like your reflexes are quicker and your body faster.", false);
            //Speed gains diminish as it rises.
            if (player.stats.spe < 40) dynStats("spe", .5);
            if (player.stats.spe < 75) dynStats("spe", .5);
            dynStats("spe", .5);
        }
        //-Toughness decrease to 50
        if (player.tou > 50 && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            if (Utils.rand(2) == 0) MainScreen.text("\n\nA nice, slow warmth rolls from your gut out to your limbs, flowing through them before dissipating entirely. As it leaves, you note that your body feels softer and less resilient.", false);
            else MainScreen.text("\n\nYou feel somewhat lighter, but consequently more fragile.  Perhaps your bones have changed to be more harpy-like in structure?", false);
            dynStats("tou", -1);
        }
        //antianemone corollary:
        if (changes < changeLimit && player.upperBody.head.hairType == 4 && Utils.rand(2) == 0) {
            //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            MainScreen.text("\n\nAs you down the seed, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels soft and fluffy, almost feathery; you watch as it dissolves into many thin, feathery stUtils.Utils.rands.  <b>Your hair is now like that of a harpy!</b>", false);
            player.upperBody.head.hairType = 1;
            changes++;
        }
        //-Strength increase to 70
        if (player.str < 70 && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            //(low str)
            if (player.str < 40) MainScreen.text("\n\nShivering, you feel a feverish sensation that reminds you of the last time you got sick. Thankfully, it passes swiftly, leaving slightly enhanced strength in its wake.", false);
            //(hi str � 50+)
            else MainScreen.text("\n\nHeat builds in your muscles, their already-potent mass shifting slightly as they gain even more strength.", false);
            //Faster until 40 str.
            if (player.str < 40) dynStats("str", .5);
            dynStats("str", .5);
        }
        //-Libido increase to 90
        if ((player.stats.lib < 90 || Utils.rand(3) == 0) && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            if (player.stats.lib < 90) dynStats("lib", 1);
            //(sub 40 lib)
            if (player.stats.lib < 40) {
                MainScreen.text("\n\nA passing flush colors your " + player.face() + " for a second as you daydream about sex. You blink it away, realizing the item seems to have affected your libido.", false);
                if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" The moistness of your " + vaginaDescript() + " seems to agree.", false);
                else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(" The hardness of " + sMultiCockDesc() + " seems to agree.", false);
                dynStats("lus", 5);
            }
            //(sub 75 lib)
            else if (player.stats.lib < 75) MainScreen.text("\n\nHeat, blessed heat, works through you from head to groin, leaving you to shudder and fantasize about the sex you could be having right now.\n\n", false);
            //(hi lib)
            else if (player.stats.lib < 90) MainScreen.text("\n\nSexual need courses through you, flushing your skin with a reddish hue while you pant and daydream of the wondrous sex you should be having right now.\n\n", false);
            //(90+)
            else MainScreen.text("\n\nYou groan, something about the seed rubbing your libido in just the right way to make you horny. Panting heavily, you sigh and fantasize about the sex you could be having.\n\n", false);
            //(fork to fantasy)
            if (player.stats.lib >= 40) {
                dynStats("lus", (player.stats.lib / 5 + 10));
                //(herm � either or!)
                //Cocks!
                if (player.lowerBody.cockSpot.hasCock() && (player.gender != 3 || Utils.rand(2) == 0)) {
                    //(male 1)
                    if (Utils.rand(2) == 0) {
                        MainScreen.text("In your fantasy you're winging through the sky, " + sMultiCockDesc() + " already hard and drizzling with male moisture while you circle an attractive harpy's nest. Her plumage is as blue as the sky, her eyes the shining teal of the sea, and legs splayed in a way that shows you how ready she is to be bred. You fold your wings and dive, wind whipping through your " + hairDescript() + " as she grows larger and larger. With a hard, body-slapping impact you land on top of her, plunging your hard, ready maleness into her hungry box. ", false);
                        if (player.lowerBody.cockSpot.count() > 1) {
                            MainScreen.text("The extra penis", false);
                            if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("es rub ", false);
                            else MainScreen.text("rubs ", false);
                            MainScreen.text("the skin over her taut, empty belly, drooling your need atop her.  ", false);
                            MainScreen.text("You jolt from the vision unexpectedly, finding your " + sMultiCockDesc() + " is as hard as it was in the dream. The inside of your " + player.armorName + " is quite messy from all the pre-cum you've drooled. Perhaps you can find a harpy nearby to lie with.", false);
                        }
                    }
                    //(male 2)
                    else {
                        MainScreen.text("In your fantasy you're lying back in the nest your harem built for you, stroking your dick and watching the sexy bird-girl spread her thighs to deposit another egg onto the pile. The lewd moans do nothing to sate your need, and you beckon for another submissive harpy to approach. She does, her thick thighs swaying to show her understanding of your needs. The bird-woman crawls into your lap, sinking down atop your shaft to snuggle it with her molten heat. She begins kissing you, smearing your mouth with her drugged lipstick until you release the first of many loads. You sigh, riding the bliss, secure in the knowledge that this 'wife' won't let up until she's gravid with another egg. Then it'll be her sister-wife's turn. The tightness of " + sMultiCockDesc() + " inside your " + player.armorName + " rouses you from the dream, reminding you that you're just standing there, leaking your need into your gear.", false);
                    }
                }
                //Cunts!
                else if (player.lowerBody.vaginaSpot.hasVagina()) {
                    //(female 1)
                    if (Utils.rand(2) == 0) {
                        MainScreen.text("In your fantasy you're a happy harpy mother, your womb stretched by the sizable egg it contains. The surging hormones in your body arouse you again, and you turn to the father of your children, planting a wet kiss on his slobbering, lipstick-gilt cock. The poor adventurer writhes, hips pumping futilely in the air. He's been much more agreeable since you started keeping his cock coated with your kisses. You mount the needy boy, fantasizing about that first time when you found him near the portal, in the ruins of your old camp. The feeling of your stiff nipples ", false);
                        if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text("and pussy leaking over ", false);
                        else if (player.biggestLactation() >= 1.5) MainScreen.text("dripping milk inside ", false);
                        else MainScreen.text("rubbing inside ", false);
                        MainScreen.text("your " + player.armorName + " shocks you from the dream, leaving you with nothing but the moistness of your loins for company. Maybe next year you'll find the mate of your dreams?", false);
                    }
                    //(female 2)
                    else {
                        MainScreen.text("In your fantasy you're sprawled on your back, thick thighs splayed wide while you're taken by a virile male. The poor stud was wandering the desert all alone, following some map, but soon you had his bright red rod sliding between your butt-cheeks, the pointed tip releasing runnels of submission to lubricate your loins. You let him mount your pussy before you grabbed him with your powerful thighs and took off. He panicked at first, but the extra blood flow just made him bigger. He soon forgot his fear and focused on the primal needs of all males � mating with a gorgeous harpy. You look back at him and wink, feeling his knot build inside you. Your aching, tender " + nippleDescript(0) + "s pull you out of the fantasy as they rub inside your " + player.armorName + ". Maybe once your quest is over you'll be able to find a shy, fertile male to mold into the perfect cum-pump.", false);
                    }
                }
            }
        }
        //****************
        //   Sexual:
        //****************
        //-Grow a cunt (guaranteed if no gender)
        if (player.gender == 0 || (!player.lowerBody.vaginaSpot.hasVagina() && changes < changeLimit && Utils.rand(3) == 0)) {
            changes++;
            //(balls)
            if (player.lowerBody.balls > 0) MainScreen.text("\n\nAn itch starts behind your " + ballsDescriptLight() + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + sackDescript() + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>", false);
            //(dick)
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("\n\nAn itch starts on your groin, just below your " + multiCockDescriptLight() + ". You pull your manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>", false);
            //(neither)
            else MainScreen.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.armorName + " to discover your bUtils.Utils.rand new vagina, complete with pussy lips and a tiny clit.</b>", false);
            player.createVagina();
            player.lowerBody.vaginaSpot.list[0].clitLength = .25;
            dynStats("sen", 10);
            player.genderCheck();
        }
        //-Remove extra breast rows
        if (changes < changeLimit && player.upperBody.chest.count() > 1 && Utils.rand(3) == 0 && !Flags.get(FlagEnum.HYPER_HAPPY)) {
            changes++;
            MainScreen.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + breastDescript(player.upperBody.chest.count() - 1) + " shrink down, disappearing completely into your ", false);
            if (player.upperBody.chest.count() >= 3) MainScreen.text("abdomen", false);
            else MainScreen.text("chest", false);
            MainScreen.text(". The " + nippleDescript(player.upperBody.chest.count() - 1) + "s even fade until nothing but ", false);
            if (player.skinType == SKIN.FUR) MainScreen.text(player.hairColor + " " + player.skinDesc, false);
            else MainScreen.text(player.skinTone + " " + player.skinDesc, false);
            MainScreen.text(" remains. <b>You've lost a row of breasts!</b>", false);
            dynStats("sen", -5);
            player.removeBreastRow(player.upperBody.chest.count() - 1, 1);
        }
        //-Shrink tits if above DDs.
        //Cannot happen at same time as row removal
        else if (changes < changeLimit && player.upperBody.chest.count() == 1 && Utils.rand(3) == 0 && player.upperBody.chest.list[0].breastRating >= 7 && !Flags.get(FlagEnum.HYPER_HAPPY)) {
            changes++;
            //(Use standard breast shrinking mechanism if breasts are under 'h')
            if (player.upperBody.chest.list[0].breastRating < 19) {
                player.shrinkTits();
            }
            //(H+)
            else {
                player.upperBody.chest.list[0].breastRating -= (4 + Utils.rand(4));
                MainScreen.text("\n\nYour chest pinches tight, wobbling dangerously for a second before the huge swell of your bust begins to shrink into itself. The weighty mounds jiggle slightly as they shed cup sizes like old, discarded coats, not stopping until they're " + player.breastCup(0) + "s.", false);
            }
        }
        //-Grow tits to a B-cup if below.
        if (changes < changeLimit && player.upperBody.chest.list[0].breastRating < 2 && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text("\n\nYour chest starts to tingle, the " + player.skinDesc + " warming under your " + player.armorName + ". Reaching inside to feel the tender flesh, you're quite surprised when it puffs into your fingers, growing larger and larger until it settles into a pair of B-cup breasts.", false);
            if (player.upperBody.chest.list[0].breastRating < 1) MainScreen.text("  <b>You have breasts now!</b>", false);
            player.upperBody.chest.list[0].breastRating = 2;
        }
        //****************
        //General Appearance:
        //****************
        //-Femininity to 85
        if (player.femininity < 85 && changes < changeLimit && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text(player.modFem(85, 3 + Utils.rand(5)), false);
        }
        //-Skin color change � tan, olive, dark, light
        if ((player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "dark" && player.skinTone != "light") && changes < changeLimit && Utils.rand(5) == 0) {
            changes++;
            MainScreen.text("\n\nIt takes a while for you to notice, but <b>", false);
            if (player.skinType == SKIN.FUR) MainScreen.text("the skin under your " + player.hairColor + " " + player.skinDesc, false);
            else MainScreen.text("your " + player.skinDesc, false);
            MainScreen.text(" has changed to become ", false);
            temp = Utils.rand(4);
            if (temp == 0) player.skinTone = "tan";
            else if (temp == 1) player.skinTone = "olive";
            else if (temp == 2) player.skinTone = "dark";
            else if (temp == 3) player.skinTone = "light";
            MainScreen.text(player.skinTone + " colored.</b>", false);
        }
        //-Grow hips out if narrow.
        if (player.lowerBody.hipRating < 10 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour gait shifts slightly to accommodate your widening " + hipDescript() + ". The change is subtle, but they're definitely broader.", false);
            player.lowerBody.hipRating++;
            changes++;
        }
        //-Narrow hips if crazy wide
        if (player.lowerBody.hipRating >= 15 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour gait shifts inward, your " + hipDescript() + " narrowing significantly. They remain quite thick, but they're not as absurdly wide as before.", false);
            player.lowerBody.hipRating--;
            changes++;
        }
        //-Big booty
        if (player.lowerBody.butt.buttRating < 8 && changes < changeLimit && Utils.rand(3) == 0) {
            player.lowerBody.butt.buttRating++;
            changes++;
            MainScreen.text("\n\nA slight jiggle works through your rear, but instead of stopping it starts again. You can actually feel your " + player.armorName + " being filled out by the growing cheeks. When it stops, you find yourself the proud owner of a " + buttDescript() + ".", false);
        }
        //-Narrow booty if crazy huge.
        if (player.lowerBody.butt.buttRating >= 14 && changes < changeLimit && Utils.rand(4) == 0) {
            changes++;
            player.lowerBody.butt.buttRating--;
            MainScreen.text("\n\nA feeling of tightness starts in your " + buttDescript() + ", increasing gradually. The sensation grows and grows, but as it does your center of balance shifts. You reach back to feel yourself, and sure enough your massive booty is shrinking into a more manageable size.", false);
        }
        //-Body thickness to 25ish
        if (player.thickness > 25 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text(player.modThickness(25, 3 + Utils.rand(4)), false);
            changes++;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //****************
        //Harpy Appearance:
        //****************
        //-Harpy legs
        if (player.lowerBody != LOWER_BODY.HARPY && changes < changeLimit && (type == 1 || player.tailType == TAIL.HARPY) && Utils.rand(4) == 0) {
            //(biped/taur)
            if (!player.isGoo()) MainScreen.text("\n\nYour " + player.legs() + " creak ominously a split-second before they go weak and drop you on the ground. They go completely limp, twisting and reshaping before your eyes in ways that make you wince. Your lower body eventually stops, but the form it's settled on is quite thick in the thighs. Even your " + player.feet() + " have changed.  ", false);
            //goo
            else MainScreen.text("\n\nYour gooey undercarriage loses some of its viscosity, dumping you into the puddle that was once your legs. As you watch, the fluid pulls together into a pair of distinctly leg-like shapes, solidifying into a distinctly un-gooey form. You've even regained a pair of feet!  ", false);
            player.lowerBody = LOWER_BODY.HARPY;
            changes++;
            //(cont)
            MainScreen.text("While humanoid in shape, they have two large, taloned toes on the front and a single claw protruding from the heel. The entire ensemble is coated in " + player.hairColor + " feathers from ankle to hip, reminding you of the bird-women of the mountains. <b>You now have harpy legs!</b>", false);
        }
        //-Feathery Tail
        if (player.tailType != TAIL.HARPY && changes < changeLimit && (type == 1 || player.upperBody.wingType == WING.FEATHERED_LARGE) && Utils.rand(4) == 0) {
            //(tail)
            if (player.tailType > TAIL.NONE) MainScreen.text("\n\nYour tail shortens, folding into the crack of your " + buttDescript() + " before it disappears. A moment later, a fan of feathers erupts in its place, fluffing up and down instinctively every time the breeze shifts. <b>You have a feathery harpy tail!</b>", false);
            //(no tail)
            else MainScreen.text("\n\nA tingling tickles the base of your spine, making you squirm in place. A moment later, it fades, but a fan of feathers erupts from your " + player.skinDesc + " in its place. The new tail fluffs up and down instinctively with every shift of the breeze. <b>You have a feathery harpy tail!</b>", false);
            player.tailType = TAIL.HARPY;
            changes++;
        }
        //-Propah Wings
        if (player.upperBody.wingType == WING.NONE && changes < changeLimit && (type == 1 || player.armType == ARM.HARPY) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nPain lances through your back, the muscles knotting oddly and pressing up to bulge your " + player.skinDesc + ". It hurts, oh gods does it hurt, but you can't get a good angle to feel at the source of your agony. A loud crack splits the air, and then your body is forcing a pair of narrow limbs through a gap in your " + player.armorName + ". Blood pumps through the new appendages, easing the pain as they fill out and grow. Tentatively, you find yourself flexing muscles you didn't know you had, and <b>you're able to curve the new growths far enough around to behold your bUtils.Utils.rand new, " + player.hairColor + " wings.</b>", false);
            player.upperBody.wingType = WING.FEATHERED_LARGE;
            player.upperBody.wingDesc = "large, feathered";
            changes++;
        }
        //-Remove old wings
        if (player.upperBody.wingType != WING.FEATHERED_LARGE && player.upperBody.wingType > WING.NONE && changes < changeLimit && Utils.rand(4) == 0) {
            if (player.upperBody.wingType != WING.SHARK_FIN) MainScreen.text("\n\nSensation fades from your " + player.upperBody.wingDesc + " wings slowly but surely, leaving them dried out husks that break off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.", false);
            else MainScreen.text("\n\nSensation fades from your large fin slowly but surely, leaving it a dried out husk that breaks off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.", false);
            player.upperBody.wingType = WING.NONE;
            player.upperBody.wingDesc = "non-existant";
            changes++;
        }
        //-Feathery Arms
        if (player.armType != ARM.HARPY && changes < changeLimit && (type == 1 || player.upperBody.head.hairType == 1) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou smile impishly as you lick the last bits of the nut from your teeth, but when you go to wipe your mouth, instead of the usual texture of your " + player.skinDesc + " on your lips, you feel feathers! You look on in horror while more of the avian plumage sprouts from your " + player.skinDesc + ", covering your forearms until <b>your arms look vaguely like wings</b>. Your hands remain unchanged thankfully. It'd be impossible to be a champion without hands! The feathery limbs might help you maneuver if you were to fly, but there's no way they'd support you alone.", false);
            changes++;
            player.armType = ARM.HARPY;
        }
        //-Feathery Hair
        if (player.upperBody.head.hairType != 1 && changes < changeLimit && (type == 1 || player.faceType == FACE.HUMAN) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nA tingling starts in your scalp, getting worse and worse until you're itching like mad, the feathery stUtils.Utils.rands of your hair tickling your fingertips while you scratch like a dog itching a flea. When you pull back your hand, you're treated to the sight of downy fluff trailing from your fingernails. A realization dawns on you - you have feathers for hair, just like a harpy!", false);
            player.upperBody.head.hairType = 1;
            changes++;
        }
        //-Human face
        if (player.faceType != FACE.HUMAN && changes < changeLimit && (type == 1 || (player.upperBody.head.earType == EARS.HUMAN || player.upperBody.head.earType == EARS.ELFIN)) && Utils.rand(4) == 0) {
            MainScreen.text("\n\nSudden agony sweeps over your " + player.face() + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.", false);
            player.faceType = FACE.HUMAN;
            changes++;
        }
        //-Gain human ears (keep elf ears)
        if ((player.upperBody.head.earType != EARS.HUMAN && player.upperBody.head.earType != EARS.ELFIN) && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nOuch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!", false);
            player.upperBody.head.earType = EARS.HUMAN;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //SPECIAL:
        //Harpy Womb � All eggs are automatically upgraded to large, requires legs + tail to be harpy.
        if (!player.perks.has("HarpyWomb") && player.lowerBody == LOWER_BODY.HARPY && player.tailType == TAIL.HARPY && Utils.rand(4) == 0 && changes < changeLimit) {
            player.createPerk(PerkLib.HarpyWomb, 0, 0, 0, 0);
            MainScreen.text("\n\nThere's a rumbling in your womb, signifying that some strange change has taken place in your most feminine area. No doubt something in it has changed to be more like a harpy. (<b>You've gained the Harpy Womb perk! All the eggs you lay will always be large so long as you have harpy legs and a harpy tail.</b>)", false);
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) == 0 && ((player.ass.analWetness > 0 && !player.perks.has("MaraesGiftButtslut")) || player.ass.analWetness > 1)) {
            MainScreen.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.ass.analWetness--;
            if (player.ass.analLooseness > 1) player.ass.analLooseness--;
            changes++;
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove("BlackNipples");
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.vaginaType() == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.vaginaType(0);
            changes++;
        }
        if (changes == 0) MainScreen.text("\n\nAside from being a tasty treat, it doesn't seem to do anything to you this time.", false);
    }
}