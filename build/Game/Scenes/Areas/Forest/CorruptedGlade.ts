import DisplaySprite from '../../../../Engine/Display/DisplaySprite';
import DisplayText from '../../../../Engine/display/DisplayText';
import SpriteName from '../../../../Engine/Display/Images/SpriteName';
import MainScreen from '../../../../Engine/Display/MainScreen';
import { randInt } from '../../../../Engine/Utilities/SMath';
import BreastRow from '../../../Body/BreastRow';
import Cock, { CockType } from '../../../Body/Cock';
import { VaginaLooseness } from '../../../Body/Vagina';
import Character from '../../../Character/Character';
import * as BallsDescriptor from '../../../Descriptors/BallsDescriptor';
import * as ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import * as CockDescriptor from '../../../Descriptors/CockDescriptor';
import * as HipDescriptor from '../../../Descriptors/HipDescriptor';
import * as LegDescriptor from '../../../Descriptors/LegDescriptor';
import * as VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import * as BreastModifier from '../../../Modifiers/BreastModifier';
import * as VaginaModifier from '../../../Modifiers/VaginaModifier';
import Scenes from '../../Scenes';

export default class CorruptedGlade {
    public intro(character: Character) {
        DisplaySprite(SpriteName.Corrupted_Glade);
        DisplayText("Walking through the woods, you find a damp patch overgrown with corrupted plant-life.  Every flower seems warped into a colorful imitation of a female's genitals, each vine appears throbbing and veiny, and every knot on the nearby trees is capped with a nipple-like protrusion, leaking dark sap.");
        if (character.stats.cor <= 33) { // disgusted reaction
            // Get plant-cum dripped on you if not fast and unlucky!
            if (character.stats.spe < 60 && randInt(character.stats.spe + 50) < 50) {
                DisplayText("  Disgusted by this perversion of nature, you turn to leave, catching a faceful of the white goop that's spurting down from the vines above!  It's slimy, gross, and difficult to clear from your eyes, nose, and mouth.  The musky smell and delicious salty flavor are undoubtedly a result of the plant's corruption.  You escape the tainted glade, but feel warmer and warmer as time passes...");
                character.stats.lust += 20 + character.stats.lib / 5;
            }
            else {
                DisplayText("  Disgusted by this perversion of nature, you turn away to leave, narrowly avoiding a sudden dripping of thick white fluid from the vines overhead.");
                character.stats.lust += 2;
            }
            MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
        }
        else if (character.stats.cor <= 66) { // intrigued reaction
            DisplayText("  You explore the glade with equal parts caution and curiosity.  ");
            switch (randInt(3)) {
                case 0: // flowers...
                    DisplayText("A group of perverted looking flowers catch your eye, leading you to bend closer for a better look at the intricately folded petals, noting the beads of slick moisture that seem to perspire from inside the plant.  Awed by the corrupt yet beautiful flower, you take a deep breath, inhaling a lungful of its pungent yet sweet scents.  It matches the flower somehow, lingering in your nose even after you pull away.  The smell makes you wonder just how functional the pussy flowers are, as they do have fairly large stalks.\n\nYou sigh and take one last sniff from the flower's honeypot before moving on.  Your body flushes happily with desire as your blood pools in your groin.  You giggle, wishing you could feel like this more often.");
                    break;
                case 1: // vines...
                    DisplayText("A few vines dangling from the trees catch your eye due to their rather 'unique' tips.  Every single one of them ends in a flared mushroom-like head, each twice as wide as the already thick vine.  You touch a vine gently, musing at its slippery texture and how similar it would be to a penis if the 'head' were smaller.  You encircle the vine with your hand, stroking it and giggling at the absurdity of this place.  The vine suddenly flexes in your grasp, pulsating and contracting as its head grows bigger, turning shiny and red.  Pulling away in shock, you gasp as the vine begins spurting out huge ropes of thick viscous fluid, splattering everywhere.  The plant-gasm ends as suddenly as it started, the 'head' retaining the size it gained and dripping the last of its strange load.  Overcome with curiosity, you sniff at the dripping spunk and swoon at the overpoweringly musky scent.  Gathering your wits, you decide to leave before you end up with one of those inside you.  You escape the corrupted glade, but stay flushed with arousal.");
                    break;
                default: // trees...
                    DisplayText("A cluster of huge breast-like knots on a nearby tree draws your attention.  Unable to resist, you poke one, and burst into giggles as it jiggles like a real breast!  You cautiously begin groping the tree-tit, and smile as it begins leaking sweet-smelling sap.  The scent conjures memories of helping to make maple syrup back home, and before you realize it, you've gathered a drop of the sap on your finger and tasted it.  It's powerfully sweet, making your tongue tingle and heart beat faster.  Unbidden, the thought of suckling the teat dry of its sweet treat comes to mind, but you manage to reject it and stumble away from the corrupted glade.  You have trouble with your tongue for the next hour: it won't stay in your mouth, and keeps licking your lips, seeking any leftover sweetness.  It almost distracts you from the palpable heat gathering between your thighs.");
            }
            character.stats.lust += 20 + character.stats.lib / 5;
            character.stats.cor += 0.5;
            MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
        }
        else { // drink sap/lick flower reaction
            DisplayText("  You smile as you enter the glade, wondering which of the forbidden fruits you should try...\n\nThere are flowers that bear more than a passing resemblance to pussies,\nvines with absurdly large penis-like tips,\nand trees covered in breast-like knots, leaking sap.");
            MainScreen.displayChoices(["Flowers", "Vines", "Trees"], [this.flowerFun, this.tentacleFun, this.treeBoobFun], ["Leave"], [Scenes.camp.returnToCampUseOneHour]);
        }
        // Wallow in decadence reaction - UNFINISHED
    }

    private flowerFun(character: Character) {
        DisplayText().clear();
        DisplaySprite(SpriteName.Corrupted_Glade);
        if (character.torso.cocks.count > 0) { // Sex scenes for those with cawks
            if (character.torso.cocks.count === 1) { // Single Cawk
                DisplayText("You grin to yourself as you decide to see just how close to a pussy these perverted little flowers are.  The thick stem bends with ease as you grasp it and bend it towards your groin, your other hand fumbling to open your " + character.inventory.equipment.armor.displayName + ".  In seconds you free yourself and gingerly bring the folds closer, the musky scent that fills the air rapidly bringing you to a full, throbbing hardness.  The first touch of petals to your skin slicks you with the flower's silky secretions, allowing you to easily slip between the petals.  Though the flower looks fairly deep, you quickly feel yourself bottom out inside the petal's slippery grip.  Shrugging, you decide to make the best of it and begin thrusting into the plant, enjoying the unusual sensations along the front-most parts of your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + ".  As you pound away, you begin to notice a change in the rear of the flower.\n\n");

                DisplayText("It feels as if something is opening up, and the tip of your cock begins slipping through a tight ring, bulging the plant's stem noticeably.  The sudden change worries you enough to pull back for a moment, your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " nearly clearing the opening before dozens of tiny whip-like tendrils burst from the flower, wrapping your maleness with painful tightness.  They constrict further and with a burst of movement, slam the flower down onto your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + ", pulling you further and further into the stem with painful force.  You struggle briefly but the pain it causes your over-stimulated member is too much, so you just give up, letting the pussy-like plant draw the last of you inside its stem, the silken flowers cupping around your ");
                if (character.torso.balls.quantity > 0)
                    DisplayText("balls and gently squeezing them.\n\n");
                else
                    DisplayText("groin and gently squeezing your taint.\n\n");

                DisplayText("You feel a flood of wetness surge up from the depths of the plant, surrounding your member with even more fluid as the stem begins constricting and squeezing.  Gently at first, and then with increasing insistence, a suction builds inside the stem, drawing more and more blood into your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + ".  The stem, now heavily distended by your massive member, continues rippling, squeezing, and sucking your over-engorged meat-pole, overwhelming your mind with sensation far beyond normal.  You'd wonder just what kind of tactile-enhancing fluids that plant excretes, if you weren't already mindlessly pistoning against the tainted plant, still locked inside it by tight little tentacles.\n\n");
            }
            else { // Multicock
                DisplayText("You grin to yourself as you decide to see just how close to a pussy these perverted little flowers are.  The thick stems bend with ease as you grab a few with your hand and pull them towards your groin, your other hand fumbling to open your " + character.inventory.equipment.armor.displayName + ".  In seconds you free yourself, and gingerly bring the folds closer.  The musky scent filling the air rapidly brings your " + CockDescriptor.describeMultiCockShort(character) + " to a full, throbbing hardness.  The first touch of petals to your skin slicks you with the flower's silky secretions, allowing you to easily slip between the petals.  Though the flowers look fairly deep, you quickly feel yourself bottom out inside the petals' slippery grip.  Shrugging, you decide to make the best of it and begin thrusting into the plant, enjoying the unusual sensations along the front-most parts of your " + CockDescriptor.describeMultiCockShort(character) + ".  As you pound away, you begin to notice a change in the rear of the flowers.\n\n");

                DisplayText("They seem to be gradually opening up, allowing the smallest of your cock-tips to begin slipping through an opening in the backs of the flowers and into the stems.  Shocked by this unexpected development, you pull the bundle of flowers from your " + CockDescriptor.describeMultiCockShort(character) + ", but whiplike tendrils shoot forth from deep within the flowers, wrapping tightly around your manhoods, painfully squeezing as they drag your " + CockDescriptor.describeMultiCockShort(character) + " back into the tight vaginal openings.  They pull tighter as they force you deeper inside the plant, pulling the full length of each of your members into the constricting stalks.   Wrapped tightly around your base, the tendrils form effective cock-rings, making each of your " + CockDescriptor.describeMultiCockShort(character) + " overfill with blood.\n\n");

                DisplayText("You briefly try to free yourself but the pain it causes your groin overwhelms you.  Resigned to your fate, you allow the plants to wrap their petals fully around your groin, encapsulating all of your maleness.  With surprising gentleness, you feel a suction and squeezing building around each and every one of your dicks.  You feel a flood of fluids around each over-engorged member, making them tingle with unnatural sensitivity.  The squeezing and sucking of the plant's stalks, combined with the sudden onset of strange sensation, is too much to bear.  You feel a churning pressure at the base of your groin, liquid heat filling every member as your body makes ready to give these plants what they want.\n\n");
            }
            DisplayText("You cum, and cum, and cum, the evidence of your pleasure devoured by the plant's sucking, squeezing gullet.  The orgasm drags on for what feels like forever, your " + LegDescriptor.describeLegs(character) + " eventually giving out, your hips the only muscle that seems to work as they twitch into the air, as if begging for more.  You are milked of a few last big spurts, at last collapsing.\n\n");

            DisplayText("The tendrils encircling your genitals do not release; instead they pull tighter, one of " + (character.torso.cocks.count > 1 ? "each plant's tiny" : "the tiny plant's") + " appendages penetrating your urethra" + (character.torso.cocks.count > 1 ? "s" : "") + ", squirming up your cum slicked passage" + (character.torso.cocks.count > 1 ? "s" : "") + " with uncomfortable slowness.  You lay there, too weak to resist it or fight, hoping that whatever the plants are doing won't hurt much.  You feel it twisting and coiling inside you... until it stops.  You feel a sharp pinch, and then it withdraws, seemingly satisfied.  The tendrils unwrap, allowing the plants to spring back up, exposing your still over-engorged and sensitive member" + (character.torso.cocks.count > 1 ? "s" : "") + ".\n\n");

            DisplayText("You lay there for some time until your muscle control returns, your cock" + (character.torso.cocks.count > 1 ? "s" : "") + " still slightly over-large " + (character.torso.balls.quantity >= 2 ? "and your " + BallsDescriptor.describeBalls(true, true, character) : "and") + " feeling sore from the exertion.  At least you hope it's just from the exertion and not from whatever the plant did.\n\n");
            if (character.cumQ() < 25)
                DisplayText("As you depart, you notice the plants looking remarkably colorful and healthy...");
            else if (character.cumQ() < 250)
                DisplayText("As you depart, you notice the plants' stalks bulging slightly from your deposit, their flowers wet with moisture and bright red.");
            else if (character.cumQ() < 500)
                DisplayText("As you depart, you note the plants' stalks bulging obscenely, bits of your seed dripping from the flowers' opening.");
            else DisplayText("As you depart, you note the plants' stalks bulging out obscenely, looking like overfull balloons.  They're stretched so thin as to be transparent, your cum sloshing about inside them as they attempt to digest their meals.  Steady streams of your jism leak from the flowers' lips, unable to keep it all inside.");
            // Stat changes!
            character.orgasm();
            character.stats.sens += 2;
            let booster: number = 1;
            if (character.torso.balls.quantity === 0)
                booster += 3;
            else if (character.torso.balls.size < 6)
                booster += 2;
            if (character.perks.has(PerkType.MessyOrgasms) && character.cumMultiplier < 3) booster += 1;
            character.cumMultiplier += booster;
        }
        else { // Oral sex for those without!
            DisplayText("You grin to yourself and decide to sample the fine smelling nectar of the flowers. You grip the unusually thick stalk as you lean down, taking in the bright red and iridescent purples of the pussy-flower's petals. You give it an experimental lick, gaining a feeling for the flavor of the nectar. It's delicious, but leaves your tongue tingling and sensitive. A small budding protrusion emerges from between the petals, slick with more of the plants fluid, cherry red and looking very much like an engorged clit.\n\n");

            DisplayText("Giddy from either the novelty of the situation or the chemicals in the flower's juices, you lick at the plant's bud-like clit and are immediately rewarded with a burst of fruity plant-nectar. The taste becomes the last thing on your mind as your tongue becomes even more sensitive, every touch and taste rapidly becoming highly erotic. You delve into its folds, seeking more nectar, your tongue slurping and licking, noisily tongue-fucking the little plant. The taste deepens, losing some of the sweetness as that clitty swells bigger, drops of tangy moisture oozing from it.\n\n");

            DisplayText("Closing your eyes, it becomes easy to lose yourself in the feeling of plunging in and out of those petals, your tongue a tiny cock. You revel in the decadence of it all, your lips becoming equally sensitive and engorged, french kissing the pussy-flower with abandon, rubbing your puffy lips over its clit, tongue-fucking the flower with abandon. The petals curl around your face, as a sudden gush of fluid rushes out from deep within the flower, flooding your mouth with tangy sweetness. Your tongue quivers in pleasure as you feel your over-sensitized mouth orgasming, pleasurable and unlike anything else you've experienced. Swallowing instinctively, you collapse back on your haunches, licking your lips and squirming in satisfaction.");

            DisplayText("You walk away, your lips and tongue feeling slightly puffy and sensitive, but none the worse for the wear.");
            // character.slimeFeed();
            character.orgasm();
            character.stats.sens += 4;
            character.stats.cor += 1;
        }
        MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
    }

    private tentacleFun(character: Character) {
        DisplayText().clear();
        DisplaySprite(SpriteName.Corrupted_Glade);
        if (character.torso.vaginas.count > 0 && randInt(2) === 0) { // Vaginal Variant 50% of the time
            DisplayText("You saunter over to a dangling group of perverted looking vines, discarding your " + character.inventory.equipment.armor.displayName + " along the way. Running your fingertips along the bulbous-tipped tentacle-like vines, you find one that looks ");
            const tentacle: number = randInt(3); // Big, medium or small size tentacle
            let tentacleSize: number = 0;
            if (tentacle === 0) { // Small
                DisplayText("a little small for your ");
                switch (character.torso.vaginas.get(0).looseness) {
                    case VaginaLooseness.TIGHT: tentacleSize = 0; break;
                    case VaginaLooseness.NORMAL: tentacleSize = 4; break;
                    case VaginaLooseness.LOOSE: tentacleSize = 16; break;
                    case VaginaLooseness.GAPING: tentacleSize = 40; break;
                    case VaginaLooseness.GAPING_WIDE: tentacleSize = 65; break;
                    default: tentacleSize = 100;
                }
            }
            if (tentacle === 1) { // Normal
                DisplayText("well suited to your ");
                switch (character.torso.vaginas.get(0).looseness) {
                    case VaginaLooseness.TIGHT: tentacleSize = 3; break;
                    case VaginaLooseness.NORMAL: tentacleSize = 7; break;
                    case VaginaLooseness.LOOSE: tentacleSize = 26; break;
                    case VaginaLooseness.GAPING: tentacleSize = 60; break;
                    case VaginaLooseness.GAPING_WIDE: tentacleSize = 115; break;
                    default: tentacleSize = 175;
                }
            }
            if (tentacle === 2) { // Large
                DisplayText("almost too big to cram in your ");
                switch (character.torso.vaginas.get(0).looseness) {
                    case VaginaLooseness.TIGHT: tentacleSize = 6; break;
                    case VaginaLooseness.NORMAL: tentacleSize = 9; break;
                    case VaginaLooseness.LOOSE: tentacleSize = 34; break;
                    case VaginaLooseness.GAPING: tentacleSize = 78; break;
                    case VaginaLooseness.GAPING_WIDE: tentacleSize = 135; break;
                    default: tentacleSize = 210;
                }
            }
            // resume secksings
            DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ". Pulling gently, you manage to yank a bit more vine free, allowing it to brush against the damp forest loam. That same soft earth makes the perfect cushion for you as you lay down, spreading your legs. With both hands you grasp the vine, guiding it towards the entrance of your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ". The beaded moisture that covers the vine tingles tantalizingly at the first contact with your lips.\n\n");

            if (tentacle === 0) // Small
                DisplayText("With a sexy little sigh, you slip the mushroom-like tip between your nether-lips, feeling it bulge a little as it penetrates you. The vine's lubricants combine with your own, turning your horny cunt into a sloppy little slip-and-slide. You take it all the way to your cervix, easily handling its smaller size as you begin to use it like a favorite dildo. Deep inside your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ", the vine's lubricants begin to make your passage tingle, intensifying until your entire channel is overloaded with clit-like levels of sensation.\n\n");
            if (tentacle === 1) // Medium
                DisplayText("With a soft grunt, you manage to wrangle the fat tip of the vine between your nether-lips, feeling the swollen bulge pulse inside you penetrate yourself with it. The vine's lubricants combine with your own, turning your horny cunt into a sloppy slip-and-slide. You force in the rest of the vine's length, taking it all the way to your cervix, enjoying the feeling of fullness it gives you as you begin pumping it in and out like an obscene green dildo. Deep inside your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ", the vine's lubricants begin to make your passage tingle, intensifying until your entire channel is overloaded with clit-like levels of sensation.\n\n");
            if (tentacle === 2) // Large
                DisplayText("With a desperate grunt, you barely manage to force the obscene cock-head of the vine between your nether-lips. The swollen bulge pulses inside you, stretching you uncomfortably as it reacts to the warmth and tightness of your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ". The vine's lubricants begin to combine with your own, rapidly transforming your horny cunt into a sloppy slip-and-slide. You manage to cram the vine the rest of the way inside, bottoming it out against your cervix, reveling in the feeling of being stretched so wide, as you begin pumping it in and out of your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " like an over-sized sex-toy. Deep inside your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ", the vine's lubricants begin to make your passage tingle, intensifying until your entire channel is overloaded with clit-like levels of sensation.\n\n");
            if (VaginaModifier.displayStretchVagina(character, tentacleSize, true)) DisplayText("\n\n"); // Stretch cuuuuunt and newline if it gets stretched

            DisplayText("The rest of the world disappears as your mind tries to cope with the sensation overload coming from your groin. You're dimly aware of your hands pumping the slippery vine in and out, in and out, over and over.  Hips bucking, " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " squeezing, thighs trembling, you achieve the first of many orgasms.  Incredibly, the sensitivity of your groin redoubles, nearly blacking you out from the pleasure.  Cumming over and over, you writhe in the dirt, pumping the corrupted prick-vine in and out of your spasming cunt.  Your eyes roll back in your head when the vine begins pumping you full of its strange fluid, and you finally lose your battle to remain conscious.\n\n");

            DisplayText("An hour or two later, you wake feeling very sore, but satisfied.  The vine must have popped free at some point and the bulb now rests on your pussy lips.  You go to brush it off and nearly orgasm from touching your nether-lips, still sensitive and parted from the overlarge tentacle they so recently took.  A rush of white goop escapes from between your thighs as you stand, soaking back into the soil immediately.   A quick stretch later, you don your gear and head back to camp with a smile.\n\n");
            // Normal stat changes
            character.orgasm();
            character.stats.sens += 5;
            character.stats.cor += 2;
            // Xforms
            if (randInt(3) === 0 && character.torso.neck.head.hair.color !== "green") { // Change hair to green sometimes
                DisplayText("You don't get far before you realize all the hair on your body has shifted to a verdant green color.  <b>You now have green hair.</b>  ");
                character.torso.neck.head.hair.color = "green";
            }
            if (randInt(4) === 0 && character.torso.hips.rating <= 10) { // +hip up to 10
                DisplayText("A strange shifting occurs below your waist, making your " + character.inventory.equipment.armor.displayName + " feel tight.  <b>Your hips have grown larger</b>, becoming " + HipDescriptor.describeHips(character) + ".  ");
                character.torso.hips.rating += randInt(3) + 1;
                character.fertility++;
            }
        }
        else {
            DisplayText("You approach the swollen vines, noting a drizzle of fluid leaking from one of the bulbous and mushroom-like tips.   Licking your lips as you approach, you feel your heart beat faster in anticipation of sampling the tainted flora of the glade.   Grasping one gently, you lift it up, noting the pebbly texture along the curvature of its head, and the soft nubs on the underside where it rejoins the stalk.  The whole thing feels moist, just barely lubricated with some fluid that the plant seems to sweat.\n\n");

            DisplayText("Pulling it closer, you open your mouth wide enough to take in the plant, slipping it between your lips.  The taste of the plant is starchy with a tangy aftertaste.  You run your tongue around it lewdly, your efforts swiftly rewarded by a spurt of salty cream.   The penis vine seems more receptive to your actions than the real thing, shifting color to a rapidly darkening pink.  You begin jacking the vine off with your hands, rubbing a fingertip where the 'bulb' joins the stalk.  In no time it starts spurting seed into your throat, bright crimson spreading back along the vine as thick bulges of goo are pumped down the vine.  The bulb in your mouth swells up like a balloon, wrenching your jaws apart and trapping itself behind your teeth.   You're forced to breathe through your nose as it rapidly plugs your oral opening, gulping down each load of throat-filling seed in an effort not to choke.\n\n");

            DisplayText("You wonder if your efforts are in vain as time passes and your stomach fills with strange alien fluids.  Feeling faint from lack of oxygen, you drop to your knees, throat working overtime to swallow and breathe, only to immediately swallow another load.   Your whole body burns from the effort.  Your lungs hurt, your heart spasms, and your gut gurgles as it takes in the strange liquid.   Nearly unconscious, you sway, the vine pulled tight in your mouth, supporting the weight of your body.\n\n");

            DisplayText("With a snap you feel consciousness return; the endless torrent of fluid has stopped, though your mouth is still pried wide open by the engorged bulb.  In panic, you thrash backwards, painfully yanking against the now-taut vine.  You struggle in vain  for a moment, the vine not giving an inch, until finally you feel the bulb start to soften.  Working it back and forth, you eventually manage to pry it free with a satisfying 'pop'.   Rubbing your hand against your sore jawline, you step away from the glade, spitting out some of the musky goop with every step.\n\n");
            // Last PG includes change-texts
            DisplayText("As you leave the corrupted plant-life behind a comforting warmth seems to radiate from your gut, suffusing you with gentle heat that makes your ");

            if (character.torso.cocks.count > 0) { // Cocks (and maybe vagina)
                DisplayText(character.torso.cocks.count === 1 ? CockDescriptor.describeCock(character, character.torso.cocks.get(0)) : CockDescriptor.describeMultiCockShort(character));
                if (character.torso.vaginas.count > 0) DisplayText(" and " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)));
            }
            else if (character.torso.vaginas.count > 0) // Vagina
                DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)));
            else DisplayText("nipples"); // Nipples
            // Finish sentance
            DisplayText(" tingle.  ");
            // Simple stat changes - + lust.
            character.stats.lust += 25 + character.stats.lib / 10;
            character.stats.cor += 2;
            // Change hair to green sometimes
            if (randInt(3) === 0 && character.torso.neck.head.hair.color !== "green") {
                DisplayText("You don't get far before you realize all the hair on your body has shifted to a verdant green color.  <b>You now have green hair.</b>  ");
                character.torso.neck.head.hair.color = "green";
            }
            // +butt up to 10
            if (randInt(4) === 0 && character.torso.butt.rating <= 10) {
                DisplayText("A strange shifting occurs on your backside, making your " + character.inventory.equipment.armor.displayName + " feel tight.  <b>Your butt has grown larger</b>, becoming a " + ButtDescriptor.describeButt(character) + ".  ");
                character.torso.butt.rating += randInt(3) + 1;
            }
            // Rarely change one prick to a vine-like tentacle cock.
            if (randInt(3) === 0 && character.torso.cocks.count > 0 && character.torso.neck.head.hair.color === "green") {
                if (character.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length < character.torso.cocks.count) {
                    if (character.torso.cocks.count === 1) { // Single cawks
                        DisplayText("Your feel your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " bending and flexing of its own volition... looking down, you see it morph into a green vine-like shape.  <b>You now have a tentacle cock!</b>  ");
                        // Set primary cock flag
                        character.torso.cocks.get(0).type = CockType.TENTACLE;
                    }
                    if (character.torso.cocks.count > 1) { // multi
                        DisplayText("Your feel your " + CockDescriptor.describeMultiCockShort(character) + " bending and flexing of their own volition... looking down, you watch them morph into flexible vine-like shapes.  <b>You now have green tentacle cocks!</b>  ");
                        for (const cock of character.torso.cocks)
                            cock.type = CockType.TENTACLE;
                    }
                }
            }
        }
        // character.slimeFeed();
        MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
    }

    private treeBoobFun(character: Character) {
        DisplayText().clear();
        DisplaySprite(SpriteName.Corrupted_Glade);
        DisplayText("Stepping carefully around the other hazards of the glade, you close on the strange trees with equal parts curiosity and desire.  Up close, it's easy to see the strange growths that sprout from the bark – dozens of full ripe-looking breasts, each capped with a swollen and leaking nipple.  You touch one, marveling at the smooth texture of its chocolate-colored skin.   In response a runner of sap oozes free of the nipple and slides down the curved surface.\n\n");
        DisplayText("You lean forwards and lick around the nipple's surface, sampling the sweetness of the trickling sap.   The stuff nearly overpowers you with a taste like syrupy cream as more sap drips free of the fully-erect tree-nipple.  Unable to resist testing this nonsensical oddity, you engulf the entire nipple between your lips, suckling hard.   The tree seems to oblige your efforts with a fresh discharge of the sticky sap.   Your tongue tingles and vibrates with the sinfully sweet taste in your mouth, dancing in circles around the nipple, coaxing yet more nectar from swollen plant-jug.  It's easy to lose yourself in that taste, falling into a rhythm of alternatively sucking, swallowing, and licking.\n\n");
        DisplayText("In time you realize the breast has long since been emptied by your hungry mouth, and you pull free with a pop, letting your tongue run over your now over-sensitive lips.  It seems your entire mouth has been affected by the tree's sap, and is now as sensitive and receptive as a maiden's box.  You don't think you could drink any more sap with how full you feel, and you make ready to depart this perverted place.");
        character.stats.sens += 1;
        character.stats.lust += 15;
        character.stats.cor += .5;
        // character.slimeFeed();
        if (!character.statusAffects.has(StatusAffectType.LustyTongue)) {
            if (randInt(4) === 0) { // 25% Chance of sensitive mouth status – increased lust gain/hour due to licking your lips :3
                DisplayText("  The feeling doesn't seem to fade, only becoming more and more intense over the coming hour.  It will be hard to keep from getting turned on any time you lick your lips or eat some food.");
                character.statusAffects.add(StatusAffectType.LustyTongue, 24, 0, 0, 0);
            }
            else DisplayText("  Thankfully, the feeling goes away after a few minutes, leaving you feeling just a bit more sensitive.");
        }
        if (randInt(2) === 0) { // 50% Chance of breast-growth
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 5) {
                DisplayText("  As you redress, you feel a sense of added weight on your chest.  After a few moments you realize your already-formidable chest has grown even larger.");
                BreastModifier.growSmallestBreastRow(character, 1, 1 + randInt(3), false);
                // character.growTits(1, 1 + randInt(3), false, 1);
            }
            else {
                if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating === 0) { // No tits yet
                    DisplayText("  As you redress, you realize you have grown a pair of luscious breasts!  Perhaps this was a good idea after all...");
                    BreastModifier.growSmallestBreastRow(character, 1, 2 + randInt(3), false);
                    // character.growTits(1, 2 + randInt(3), false, 1);
                }
                else { // Small tits growth
                    DisplayText("  As you redress, you realize your breasts have gotten quite a bit larger!  Maybe you can come back later when you aren't so full and plump them up a bit more.");
                    BreastModifier.growSmallestBreastRow(character, 1, 1 + randInt(3), false);
                    // character.growTits(1, 1 + randInt(3), false, 1);
                }
            }
        }
        MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
    }
}