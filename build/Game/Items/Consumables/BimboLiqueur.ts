import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Vagina, VaginaWetness } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkType } from '../../Effects/PerkType';
import { Mod } from '../../Modifiers/Modifiers';
import { ItemDesc } from '../ItemDesc';

export class BimboLiqueur extends Consumable {
    public constructor() {
        super(ConsumableName.BimboLiqueur, new ItemDesc("BimboLq", "a potent bottle of 'Bimbo Liqueur'", "This small bottle of liqueur is labelled 'Bimbo Liqueur'.  There's a HUGE warning label about the effects being strong and usually permanent, so you should handle this with care."), 1000);
    }

    public canUse(character: Character) {
        if (!character.perks.has(PerkType.FutaForm))
            return true;
        DisplayText("Ugh.  This stuff is so, like... last year.  Maybe you can find someone else to feed it to?\n\n");
        return false;
    }

    public use(character: Character) {
        if (character.perks.has(PerkType.BroBody)) {
            DisplayText("You wince as the stuff hits your stomach, already feeling the insidious effects beginning to take hold.  A lengthy belch escapes your lips as your stomach gurgles, and you giggle abashedly to yourself.");
            if (character.tallness < 77) {
                DisplayText(" ...Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!");
                character.tallness = 77;
            }
            const largestBreasts = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0];
            if (largestBreasts.rating < 7) {
                if (largestBreasts.rating < 1)
                    DisplayText("  Tingling, your chest begins to itch, then swell into a pair of rounded orbs.  ");
                else
                    DisplayText("  You feel a tingling inside your breasts.  ");
                DisplayText("They quiver ominously, and you can't help but squeeze your tits together to further appreciate the boobquake as another tremor runs through them.  Unexpectedly, the shaking pushes your hands further apart as your tits balloon against each other, growing rapidly against your now-sunken fingers.  The quakes continue until calming at around an E-cup.");
                largestBreasts.rating = 7;
            }
            // If vagina = 2tight:
            if (character.torso.vaginas.count <= 0) {
                DisplayText("  Before you can even take a breath, an extremely peculiar sensation emanates from your crotch.  You can't see through your " + character.inventory.equipment.armor.displayName + ", but you can certainly feel the vagina splitting " + (character.torso.balls.quantity > 0 ? "from behind your testicles" : "your groin") + ".  Luckily, the cunt-forming doesn't yield any discomfort - on the contrary, you feel yourself falling farther into your chemically-dulled, libido-fueled rut.");
                if (character.torso.hips.rating < 12 || character.torso.butt.rating < 12) DisplayText("  As if realizing the necessity of womanly proportions to attract the hard cocks your body now craves, your waist pinches slightly inward and your hips and butt swell.  You can't help but run a hand across your newly-feminized pelvis, admiring it.");
                character.torso.vaginas.add(new Vagina());
                character.torso.clit.length = 0.25;
                if (character.torso.hips.rating < 12)
                    character.torso.hips.rating = 12;
                if (character.torso.butt.rating < 12)
                    character.torso.butt.rating = 12;
            }
            DisplayText("\n\n");
            DisplayText("A wave of numbness rolls through your features, alerting you that another change is happening.  You reach up to your feel your jaw narrowing, becoming more... feminine?  Heavy, filling lips purse in disappointment as your face takes on a very feminine cast.  You're probably pretty hot now!\n\n");
            if (character.femininity < 80) character.femininity = 80;

            DisplayText("Your surging, absurdly potent libido surges through your body, reminding you that you need to fuck.  Not just bitches, but guys too.  Hard cocks, wet pussies, hell, you don't care.  They can have both or a dozen of either.  You just want to get laid and bone something, hopefully at the same time!");
            DisplayText("\n\n<b>(Perks Lost: Bro Body");
            if (character.perks.has(PerkType.BroBrains))
                DisplayText(", Bro Brains");
            DisplayText(")\n");
            DisplayText("(Perks Gained: Futa Form, Futa Faculties)\n");
            character.perks.remove(PerkType.BroBody);
            character.perks.remove(PerkType.BroBrains);
            character.perks.add(PerkType.FutaFaculties, 0, 0, 0, 0);
            character.perks.add(PerkType.FutaForm, 0, 0, 0, 0);
            if (character.stats.int > 35) {
                character.stats.int = 35;
                character.stats.int -= 0.1;
            }
            if (character.stats.lib < 50) {
                character.stats.lib = 50;
                character.stats.lib += .1;
            }
        }
        else {
            DisplayText("You pop the cork from the flask and are immediately assaulted by a cloying, spiced scent that paints visions of a slutty slave-girl's slightly-spread folds.  Wow, this is some potent stuff!  Well, you knew what you were getting into when you found this bottle!  You open wide and guzzle it down, feeling the fire of alcohol burning a path to your belly.  The burning quickly fades to a pleasant warmth that makes you light-headed and giggly.\n\n");
            if (character.torso.neck.head.hair.color !== "platinum blonde") {
                DisplayText("The first change that you notice is to your " + Desc.Head.describeHair(character) + ".  It starts with a tingling in your scalp and intensifies ");
                if (character.torso.neck.head.hair.length < 36) {
                    DisplayText("as you feel the weight of your hair growing heavier and longer.");
                    character.torso.neck.head.hair.length = 36;
                }
                else DisplayText("as your hair grows thicker and heavier.");
                DisplayText("  You grab a lock of the silken stUtils.rand(s and watch open-mouthed while streaks so blonde they're almost white flow down the " + character.torso.neck.head.hair.color + " hair.  It goes faster and faster until your hair has changed into perfectly bimbo-blonde, flowing locks.\n\n");
                character.torso.neck.head.hair.color = "platinum blonde";
            }

            DisplayText("Moaning lewdly, you begin to sway your hips from side to side, putting on a show for anyone who might manage to see you.   You just feel so... sexy.  Too sexy to hide it.  Your body aches to show itself and feel the gaze of someone, anyone upon it.  Mmmm, it makes you so wet!  ");
            if (character.torso.vaginas.count <= 0) {
                character.torso.vaginas.add(new Vagina());
                character.torso.clit.length = 0.25;
                character.torso.vaginas.get(0).wetness = VaginaWetness.SLICK;
                if (character.torso.hips.legs.isTaur()) DisplayText("Wait!? Wet? You wish you could touch yourself between the " + Desc.Leg.describeLegs(character) + ", but you can tell from the fluid running down your hind-legs just how soaked your new vagina is.");
                else DisplayText("Wait!?  Wet?  You touch yourself between the " + Desc.Leg.describeLegs(character) + " and groan when your fingers sink into a sloppy, wet cunt.");
            }
            else {
                if (character.torso.hips.legs.isTaur()) {
                    DisplayText("You wish you could sink your fingers into your sloppy, wet cunt, but as a centaur, you can't quite reach.");
                    if (character.torso.vaginas.get(0).wetness < VaginaWetness.SLICK)
                        character.torso.vaginas.get(0).wetness = VaginaWetness.SLICK;
                }
                else {
                    DisplayText("You sink your fingers into your ");
                    if (character.torso.vaginas.get(0).wetness < VaginaWetness.SLICK) {
                        DisplayText("now ");
                        character.torso.vaginas.get(0).wetness = VaginaWetness.SLICK;
                    }
                    DisplayText("sloppy, wet cunt with a groan of satisfaction.");
                }
            }
            if (character.torso.balls.quantity > 0) {
                DisplayText("\n\nThere's a light pinch against your [sack] that makes you gasp in surprise, followed by an exquisite tightness that makes your [vagina] drool.  Looking down, <b>you see your balls slowly receding into your body, leaving nothing behind but your puffy mons.</b>");
                character.torso.balls.quantity = 0;
                character.torso.balls.size = 3;
                character.cumMultiplier = 2;
            }
            if (character.torso.cocks.count > 0) {
                DisplayText("\n\n[EachCock] seems to be responding to the liqueur in its own way.  Clenching and relaxing obscenely, your genitals begin to drizzle cum onto the ground in front of you, throwing you into paroxysms of bliss.  The flow of cum is steady but weak, and each droplet that leaves you lets [eachCock] go more flaccid.  Even once you're soft and little, it doesn't stop.  You cum your way down to nothing, a tiny droplet heralding your new, girlish groin.  <b>You no longer have ");
                if (character.torso.cocks.count === 1) DisplayText("a penis");
                else DisplayText("penises");
                DisplayText("!</b>");
                while (character.torso.cocks.count > 0) {
                    character.torso.cocks.remove(0);
                }
            }
            DisplayText("  Somehow, you feel like you could seduce anyone right now!\n\n");

            DisplayText("Another bubbly giggle bursts from your lips, which you then lick hungrily.  You, like, totally want some dick to suck!  Wow, that came out of left field.  You shake your head and try to clear the unexpected, like, words from your head but it's getting kind of hard.  Omigosh, you feel kind of like a dumb bimbo after, like, drinking that weird booze.  Oh, well, it doesn't matter anyhow – you can, like, still stop the demons and stuff.  You'll just have to show off your sexy bod until they're offering to serve you.\n\n");

            DisplayText("You sigh and run one hand over your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s");
            if (character.torso.chest.get(0).rating < 10) {
                character.torso.chest.get(0).rating += 5 + randInt(5);
                DisplayText(", surprised at how large and rounded your expanding breasts have become while fresh tit-flesh continues to spill out around your needy fingers.  They feel so supple and soft, but when you let them go, they still sit fairly high and firm on your chest.  The newer, more generous, " + Desc.Breast.breastCup(character.torso.chest.get(0).rating) + " cleavage has you moaning with how sensitive it is, pinching a nipple with one hand ");
            }
            else {
                character.torso.chest.get(0).rating += 5 + randInt(5);
                DisplayText(", admiring how sensitive they're getting.  The big breasts start getting bigger and bigger, soft chest-flesh practically oozing out between your fingers as the squishy mammaries sprout like weeds, expanding well beyond any hand's ability to contain them.  The supple, " + Desc.Breast.breastCup(character.torso.chest.get(0).rating) + " boobs still manage to sit high on your chest, almost gravity defying in their ability to generate cleavage.  You pinch a nipple with one hand ");
            }
            character.stats.sens += 20;
            DisplayText("while the other toys with the juicy entrance of your folds.  Mmmm, it, like, feels too good not to touch yourself, and after being worried about getting all dumb and stuff, you need to relax.  Thinking is hard, but sex is so easy and, like, natural!  You lean back and start grunting as you plunge four fingers inside yourself, plowing your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " like no tomorrow.  By now, your " + Desc.Vagina.describeClit(character) + " is throbbing, and you give it an experimental ");
            if (character.torso.clit.length >= 3) DisplayText("jerk ");
            else DisplayText("caress ");
            DisplayText("that makes your " + Desc.Leg.describeLegs(character) + " give out as you cum, splattering female fluids as you convulse nervelessly on the ground.\n\n");

            DisplayText("Though the orgasm is intense, you recover a few moments later feeling refreshed, but still hot and horny.  Maybe you could find a partner to fuck?  After all, sex is, like, better with a partner or two.  Or that number after two.  You brush a lengthy, platinum blonde stUtils.rand( of hair out of your eyes and lick your lips - you're ready to have some fun!\n\n");

            if (character.torso.hips.rating < 12 || character.torso.butt.rating < 12) {
                DisplayText("As you start to walk off in search of a sexual partner, you feel your center of balance shifting.");
                if (character.torso.hips.rating < 12 && character.torso.butt.rating < 12) {
                    DisplayText("  Your ass and hips inflate suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling your hips back and forth comes naturally to you.  You make sure to squeeze your butt-muscles and make your curvy tush jiggle as you go.");
                    character.torso.butt.rating = 12;
                    character.torso.hips.rating = 12;
                }
                else if (character.torso.hips.rating < 12) {
                    DisplayText("  Your hips widen suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling yours hips back and forth comes naturally to you, and your big, obscene ass seems to jiggle all on its own with every step you take.");
                    character.torso.hips.rating = 12;
                }
                else {
                    DisplayText("  Your [butt] swells dramatically, the puffy cheeks swelling with newfound weight that jiggles along with each step.  Clenching your glutes to make the posh cheeks jiggle a little more enticingly becomes second nature to you in a few seconds.");
                    character.torso.butt.rating = 12;
                }
                DisplayText("\n\n");
            }
            if (character.tone > 0) {
                DisplayText("Like, weirdest of all, your muscles seem to be vanishing!  Before your eyes, all muscle tone vanishes, leaving your body soft and gently curvy.  You poke yourself and giggle!  Everyone's totally going to want to, like, rub up against you at every opportunity.  Your thighs are so soft you bet you could squeeze a pair of dicks to orgasm without even touching your moist cunny.");
                character.tone = 0;
                if (character.stats.str >= 30) {
                    if (character.stats.str >= 90) character.stats.str -= 10;
                    if (character.stats.str >= 70) character.stats.str -= 10;
                    if (character.stats.str >= 50) character.stats.str -= 10;
                    character.stats.str -= 5;
                    DisplayText("  It does get a bit harder to carry yourself around with your diminished strength, but that's, like, what big strong hunks are for anyways!  You can just flirt until one of them volunteers to help out or something!  Besides, you don't need to be strong to jerk off cocks or finger slutty pussies!");
                }
                DisplayText("\n\n");
            }
            if (!character.perks.has(PerkType.BimboBody)) {
                DisplayText("<b>(Bimbo Body - Perk Gained!)\n");
                character.perks.add(PerkType.BimboBody, 0, 0, 0, 0);
            }
            if (!character.perks.has(PerkType.BimboBrains)) {
                DisplayText("(Bimbo Brains - Perk Gained!)\n"); // int to 20.  max int 50
                character.perks.add(PerkType.BimboBrains, 0, 0, 0, 0);
                if (character.stats.int > 21)
                    character.stats.int = 21;
            }
            character.orgasm();
            character.stats.int -= 1;
            character.stats.lib -= 4;
            character.stats.sens -= 25;
            // FULL ON BITCHFACE
            Mod.Body.displayModFem(character, 100, 100);
            // Body
            // Tease/Seduce Boost
            // *boosts min lust and lust resistance)
            // *Tit size
            // Brain
            // Max int - 50
        }
        character.updateGender();
    }
}
