import Consumable from './Consumable';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class BimboLiqueur extends Consumable {
    public constructor() {
        super("BimboLq", new ItemDesc("BimboLq", "a potent bottle of 'Bimbo Liqueur'", "This small bottle of liqueur is labelled 'Bimbo Liqueur'.  There's a HUGE warning label about the effects being strong and usually permanent, so you should handle this with care."), 1000);
    }

    public canUse(player: Player) {
        if (!player.perks.has("FutaForm"))
            return true;
        MainScreen.text("Ugh.  This stuff is so, like... last year.  Maybe you can find someone else to feed it to?\n\n");
        return false;
    }

    public use(player: Player) {
        if (player.perks.has("BroBody")) {
            MainScreen.text("You wince as the stuff hits your stomach, already feeling the insidious effects beginning to take hold.  A lengthy belch escapes your lips as your stomach gurgles, and you giggle abashedly to yourself.");
            if (player.tallness < 77) {
                MainScreen.text(" ...Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!");
                player.tallness = 77;
            }
            let largestBreasts = player.upperBody.chest.BreastRatingLargest[0];
            if (largestBreasts.breastRating < 7) {
                if (largestBreasts.breastRating < 1)
                    MainScreen.text("  Tingling, your chest begins to itch, then swell into a pair of rounded orbs.  ");
                else
                    MainScreen.text("  You feel a tingling inside your breasts.  ");
                MainScreen.text("They quiver ominously, and you can't help but squeeze your tits together to further appreciate the boobquake as another tremor runs through them.  Unexpectedly, the shaking pushes your hands further apart as your tits balloon against each other, growing rapidly against your now-sunken fingers.  The quakes continue until calming at around an E-cup.");
                largestBreasts.breastRating = 7;
            }
            //(If vagina = 2tight:
            if (!player.lowerBody.vaginaSpot.hasVagina()) {
                MainScreen.text("  Before you can even take a breath, an extremely peculiar sensation emanates from your crotch.  You can't see through your " + player.inventory.armorSlot.equipment.displayName + ", but you can certainly feel the vagina splitting " + (player.lowerBody.balls > 0 ? "from behind your testicles" : "your groin") + ".  Luckily, the cunt-forming doesn't yield any discomfort - on the contrary, you feel yourself falling farther into your chemically-dulled, libido-fueled rut.");
                if (player.lowerBody.hipRating < 12 || player.lowerBody.butt.buttRating < 12) MainScreen.text("  As if realizing the necessity of womanly proportions to attract the hard cocks your body now craves, your waist pinches slightly inward and your hips and butt swell.  You can't help but run a hand across your newly-feminized pelvis, admiring it.");
                player.lowerBody.vaginaSpot.add(new Vagina());
                player.lowerBody.vaginaSpot.get(0).clitLength = 0.25;
                if (player.lowerBody.hipRating < 12)
                    player.lowerBody.hipRating = 12;
                if (player.lowerBody.butt.buttRating < 12)
                    player.lowerBody.butt.buttRating = 12;
            }
            MainScreen.text("\n\n");
            MainScreen.text("A wave of numbness rolls through your features, alerting you that another change is happening.  You reach up to your feel your jaw narrowing, becoming more... feminine?  Heavy, filling lips purse in disappointment as your face takes on a very feminine cast.  You're probably pretty hot now!\n\n");
            if (player.femininity < 80) player.femininity = 80;

            MainScreen.text("Your surging, absurdly potent libido surges through your body, reminding you that you need to fuck.  Not just bitches, but guys too.  Hard cocks, wet pussies, hell, you don't care.  They can have both or a dozen of either.  You just want to get laid and bone something, hopefully at the same time!");
            MainScreen.text("\n\n<b>(Perks Lost: Bro Body");
            if (player.perks.has("BroBrains"))
                MainScreen.text(", Bro Brains");
            MainScreen.text(")\n");
            MainScreen.text("(Perks Gained: Futa Form, Futa Faculties)\n");
            player.perks.remove("BroBody");
            player.perks.remove("BroBrains");
            player.perks.add(new Perk("FutaFaculties", 0, 0, 0, 0));
            player.perks.add(new Perk("FutaForm", 0, 0, 0, 0));
            if (player.stats.int > 35) {
                player.stats.int = 35;
                player.stats.int -= 0.1;
            }
            if (player.stats.lib < 50) {
                player.stats.lib = 50;
                player.stats.lib += .1;
            }
        }
        else {
            MainScreen.text("You pop the cork from the flask and are immediately assaulted by a cloying, spiced scent that paints visions of a slutty slave-girl's slightly-spread folds.  Wow, this is some potent stuff!  Well, you knew what you were getting into when you found this bottle!  You open wide and guzzle it down, feeling the fire of alcohol burning a path to your belly.  The burning quickly fades to a pleasant warmth that makes you light-headed and giggly.\n\n");
            if (player.upperBody.head.hairColor != "platinum blonde") {
                MainScreen.text("The first change that you notice is to your " + HeadDescriptor.describeHair(player) + ".  It starts with a tingling in your scalp and intensifies ");
                if (player.upperBody.head.hairLength < 36) {
                    MainScreen.text("as you feel the weight of your hair growing heavier and longer.");
                    player.upperBody.head.hairLength = 36;
                }
                else MainScreen.text("as your hair grows thicker and heavier.");
                MainScreen.text("  You grab a lock of the silken stUtils.rands and watch open-mouthed while streaks so blonde they're almost white flow down the " + player.upperBody.head.hairColor + " hair.  It goes faster and faster until your hair has changed into perfectly bimbo-blonde, flowing locks.\n\n");
                player.upperBody.head.hairColor = "platinum blonde";
            }

            MainScreen.text("Moaning lewdly, you begin to sway your hips from side to side, putting on a show for anyone who might manage to see you.   You just feel so... sexy.  Too sexy to hide it.  Your body aches to show itself and feel the gaze of someone, anyone upon it.  Mmmm, it makes you so wet!  ");
            if (!player.lowerBody.vaginaSpot.hasVagina()) {
                player.lowerBody.vaginaSpot.add(new Vagina());
                player.lowerBody.vaginaSpot.get(0).clitLength = 0.25;
                player.lowerBody.vaginaSpot.get(0).vaginalWetness = VaginaWetness.SLICK;
                if (player.lowerBody.isTaur()) MainScreen.text("Wait!? Wet? You wish you could touch yourself between the " + LowerBodyDescriptor.describeLegs(player) + ", but you can tell from the fluid running down your hind-legs just how soaked your new vagina is.");
                else MainScreen.text("Wait!?  Wet?  You touch yourself between the " + LowerBodyDescriptor.describeLegs(player) + " and groan when your fingers sink into a sloppy, wet cunt.");
            }
            else {
                if (player.lowerBody.isTaur()) {
                    MainScreen.text("You wish you could sink your fingers into your sloppy, wet cunt, but as a centaur, you can't quite reach.");
                    if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.SLICK)
                        player.lowerBody.vaginaSpot.get(0).vaginalWetness = VaginaWetness.SLICK;
                }
                else {
                    MainScreen.text("You sink your fingers into your ");
                    if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.SLICK) {
                        MainScreen.text("now ");
                        player.lowerBody.vaginaSpot.get(0).vaginalWetness = VaginaWetness.SLICK;
                    }
                    MainScreen.text("sloppy, wet cunt with a groan of satisfaction.");
                }
            }
            if (player.lowerBody.balls > 0) {
                MainScreen.text("\n\nThere's a light pinch against your [sack] that makes you gasp in surprise, followed by an exquisite tightness that makes your [vagina] drool.  Looking down, <b>you see your balls slowly receding into your body, leaving nothing behind but your puffy mons.</b>");
                player.lowerBody.balls = 0;
                player.lowerBody.ballSize = 3;
                player.cumMultiplier = 2;
            }
            if (player.lowerBody.cockSpot.hasCock()) {
                MainScreen.text("\n\n[EachCock] seems to be responding to the liqueur in its own way.  Clenching and relaxing obscenely, your genitals begin to drizzle cum onto the ground in front of you, throwing you into paroxysms of bliss.  The flow of cum is steady but weak, and each droplet that leaves you lets [eachCock] go more flaccid.  Even once you're soft and little, it doesn't stop.  You cum your way down to nothing, a tiny droplet heralding your new, girlish groin.  <b>You no longer have ");
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("a penis");
                else MainScreen.text("penises");
                MainScreen.text("!</b>");
                while (player.lowerBody.cockSpot.hasCock()) {
                    player.lowerBody.cockSpot.remove(player, player.lowerBody.cockSpot.get(0));
                }
            }
            MainScreen.text("  Somehow, you feel like you could seduce anyone right now!\n\n");

            MainScreen.text("Another bubbly giggle bursts from your lips, which you then lick hungrily.  You, like, totally want some dick to suck!  Wow, that came out of left field.  You shake your head and try to clear the unexpected, like, words from your head but it's getting kind of hard.  Omigosh, you feel kind of like a dumb bimbo after, like, drinking that weird booze.  Oh, well, it doesn't matter anyhow – you can, like, still stop the demons and stuff.  You'll just have to show off your sexy bod until they're offering to serve you.\n\n");

            MainScreen.text("You sigh and run one hand over your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s");
            if (player.upperBody.chest.get(0).breastRating < 10) {
                player.upperBody.chest.get(0).breastRating += 5 + Utils.rand(5);
                MainScreen.text(", surprised at how large and rounded your expanding breasts have become while fresh tit-flesh continues to spill out around your needy fingers.  They feel so supple and soft, but when you let them go, they still sit fairly high and firm on your chest.  The newer, more generous, " + BreastDescriptor.breastCup(player.upperBody.chest.get(0).breastRating) + " cleavage has you moaning with how sensitive it is, pinching a nipple with one hand ");
            }
            else {
                player.upperBody.chest.get(0).breastRating += 5 + Utils.rand(5);
                MainScreen.text(", admiring how sensitive they're getting.  The big breasts start getting bigger and bigger, soft chest-flesh practically oozing out between your fingers as the squishy mammaries sprout like weeds, expanding well beyond any hand's ability to contain them.  The supple, " + BreastDescriptor.breastCup(player.upperBody.chest.get(0).breastRating) + " boobs still manage to sit high on your chest, almost gravity defying in their ability to generate cleavage.  You pinch a nipple with one hand ");
            }
            player.stats.sens += 20;
            MainScreen.text("while the other toys with the juicy entrance of your folds.  Mmmm, it, like, feels too good not to touch yourself, and after being worried about getting all dumb and stuff, you need to relax.  Thinking is hard, but sex is so easy and, like, natural!  You lean back and start grunting as you plunge four fingers inside yourself, plowing your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " like no tomorrow.  By now, your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " is throbbing, and you give it an experimental ");
            if (player.lowerBody.vaginaSpot.get(0).clitLength >= 3) MainScreen.text("jerk ");
            else MainScreen.text("caress ");
            MainScreen.text("that makes your " + LowerBodyDescriptor.describeLegs(player) + " give out as you cum, splattering female fluids as you convulse nervelessly on the ground.\n\n");

            MainScreen.text("Though the orgasm is intense, you recover a few moments later feeling refreshed, but still hot and horny.  Maybe you could find a partner to fuck?  After all, sex is, like, better with a partner or two.  Or that number after two.  You brush a lengthy, platinum blonde stUtils.rand of hair out of your eyes and lick your lips - you're ready to have some fun!\n\n");

            if (player.lowerBody.hipRating < 12 || player.lowerBody.butt.buttRating < 12) {
                MainScreen.text("As you start to walk off in search of a sexual partner, you feel your center of balance shifting.");
                if (player.lowerBody.hipRating < 12 && player.lowerBody.butt.buttRating < 12) {
                    MainScreen.text("  Your ass and hips inflate suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling your hips back and forth comes naturally to you.  You make sure to squeeze your butt-muscles and make your curvy tush jiggle as you go.");
                    player.lowerBody.butt.buttRating = 12;
                    player.lowerBody.hipRating = 12;
                }
                else if (player.lowerBody.hipRating < 12) {
                    MainScreen.text("  Your hips widen suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling yours hips back and forth comes naturally to you, and your big, obscene ass seems to jiggle all on its own with every step you take.");
                    player.lowerBody.hipRating = 12;
                }
                else {
                    MainScreen.text("  Your [butt] swells dramatically, the puffy cheeks swelling with newfound weight that jiggles along with each step.  Clenching your glutes to make the posh cheeks jiggle a little more enticingly becomes second nature to you in a few seconds.");
                    player.lowerBody.butt.buttRating = 12;
                }
                MainScreen.text("\n\n");
            }
            if (player.tone > 0) {
                MainScreen.text("Like, weirdest of all, your muscles seem to be vanishing!  Before your eyes, all muscle tone vanishes, leaving your body soft and gently curvy.  You poke yourself and giggle!  Everyone's totally going to want to, like, rub up against you at every opportunity.  Your thighs are so soft you bet you could squeeze a pair of dicks to orgasm without even touching your moist cunny.");
                player.tone = 0;
                if (player.stats.str >= 30) {
                    if (player.stats.str >= 90) player.stats.str -= 10;
                    if (player.stats.str >= 70) player.stats.str -= 10;
                    if (player.stats.str >= 50) player.stats.str -= 10;
                    player.stats.str -= 5;
                    MainScreen.text("  It does get a bit harder to carry yourself around with your diminished strength, but that's, like, what big strong hunks are for anyways!  You can just flirt until one of them volunteers to help out or something!  Besides, you don't need to be strong to jerk off cocks or finger slutty pussies!");
                }
                MainScreen.text("\n\n");
            }
            if (!player.perks.has("BimboBody")) {
                MainScreen.text("<b>(Bimbo Body - Perk Gained!)\n");
                player.perks.add(new Perk("BimboBody", 0, 0, 0, 0));
            }
            if (!player.perks.has("BimboBrains")) {
                MainScreen.text("(Bimbo Brains - Perk Gained!)\n");//int to 20.  max int 50)
                player.perks.add(new Perk("BimboBrains", 0, 0, 0, 0));
                if (player.stats.int > 21)
                    player.stats.int = 21;
            }
            player.orgasm();
            player.stats.int -= 1;
            player.stats.lib -= 4;
            player.stats.sens -= 25;
            //FULL ON BITCHFACE
            player.modFem(100, 100);
            //Body
            //Tease/Seduce Boost
            //*boosts min lust and lust resistance)
            //*Tit size
            //Brain
            //Max int - 50
        }
        player.updateGender();
    }
}
