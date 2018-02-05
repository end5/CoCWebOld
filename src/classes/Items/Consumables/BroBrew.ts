import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Cock from '../../Body/Cock';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import HipDescriptor from '../../Descriptors/HipDescriptor';
import LegDescriptor from '../../Descriptors/LegDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import BodyModifier from '../../Modifiers/BodyModifier';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class BroBrew extends Consumable {
    public constructor() {
        super(ConsumableName.BroBrew, new ItemDesc("BroBrew", "a can of Bro Brew", "This aluminum can is labelled as 'Bro Brew'.  It even has a picture of a muscly, bare-chested man flexing on it.  A small label in the corner displays: \"Demon General's Warning: Bro Brew's effects are as potent (and irreversible) as they are refreshing.\""));
    }

    public use(player: Player) {
        DisplayText().clear();
        // no drink for bimbos!
        if (player.perks.has(PerkType.BimboBody)) {
            DisplayText("The stuff hits you like a giant cube, nearly staggering you as it begins to settle.");
            if (player.tallness < 77) {
                player.tallness = 77;
                DisplayText(".. Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!");
            }
            if (player.tone < 100) {
                DisplayText("  A tingling in your arm draws your attention just in time to see your biceps and triceps swell with new-found energy, skin tightening until thick cords of muscle run across the whole appendage.  Your other arm surges forward with identical results.  To compensate, your shoulders and neck widen to bodybuilder-like proportions while your chest and abs tighten to a firm, statuesque physique.  Your " + LegDescriptor.describeLegs(player) + " and glutes are the last to go, bulking up to proportions that would make any female martial artist proud.  You feel like you could kick forever with legs this powerful.");
                player.tone = 100;
            }
            DisplayText("\n\n");

            // female
            if (player.torso.cocks.count <= 0) {
                DisplayText("The beverage isn't done yet, however, and it makes it perfectly clear with a building pleasure in your groin.  You can only cry in ecstasy and loosen the bottoms of your " + player.inventory.equipment.armor.displayName + " just in time for a little penis to spring forth.  You watch, enthralled, as blood quickly stiffens the shaft to its full length � then keeps on going!  Before long, you have a quivering 10-inch maleness, just ready to stuff into a welcoming box.");
                player.torso.cocks.add(new Cock(10, 2));
                if (player.torso.balls.quantity === 0) {
                    DisplayText("  Right on cue, two cum-laden testicles drop in behind it, their contents swirling and churning.");
                    player.torso.balls.quantity = 2;
                    player.torso.balls.size = 3;
                }
                DisplayText("\n\n");
            }
            else if (player.torso.balls.quantity === 0) {
                DisplayText("A swelling begins behind your man-meat, and you're assailed with an incredibly peculiar sensation as two sperm-filled balls drop into a newly-formed scrotum.  Frikkin' sweet!\n\n");
                player.torso.balls.quantity = 2;
                player.torso.balls.size = 3;
            }
            DisplayText("Finally, you feel the transformation skittering to a halt, leaving you to openly roam your new chiseled and sex-ready body.  So what if you can barely form coherent sentences anymore?  A body like this does all the talking you need, you figure!");
            if (player.stats.int > 35) {
                player.stats.int = 35;
                player.stats.int -= 0.1;

            }
            if (player.stats.lib < 50) {
                player.stats.lib = 50;
                player.stats.lib += 0.1;
            }
            DisplayText("\n\n");
            if (player.perks.has(PerkType.BimboBrains))
                DisplayText("<b>(Lost Perks - Bimbo Brains, Bimbo Body)\n");
            else
                DisplayText("<b>(Lost Perk - Bimbo Body)\n");
            player.perks.remove(PerkType.BimboBrains);
            player.perks.remove(PerkType.BimboBody);
            player.perks.add(PerkType.FutaForm, 0, 0, 0, 0);
            player.perks.add(PerkType.FutaFaculties, 0, 0, 0, 0);
            DisplayText("(Gained Perks - Futa Form, Futa Faculties)</b>");
            player.updateGender();
            return;
        }
        // HP restore for bros!
        if (player.perks.has(PerkType.BroBody) || player.perks.has(PerkType.FutaForm)) {
            DisplayText("You crack open the can and guzzle it in a hurry.  Goddamn, this shit is the best.  As you crush the can against your forehead, you wonder if you can find a six-pack of it somewhere?\n\n");
            player.stats.fatigue -= 33;
            StatModifier.displayCharacterHPChange(player, 100);
            return;
        }
        DisplayText("Well, maybe this will give you the musculature that you need to accomplish your goals.  You pull on the tab at the top and hear the distinctive snap-hiss of venting, carbonating pressure.  A smoky haze wafts from the opened container, smelling of hops and alcohol.  You lift it to your lips, the cold, metallic taste of the can coming to your tongue before the first amber drops of beer roll into your waiting mouth.  It tingles, but it's very, very good.  You feel compelled to finish it as rapidly as possible, and you begin to chug it.  You finish the entire container in seconds.\n\n");

        DisplayText("A churning, full sensation wells up in your gut, and without thinking, you open wide to release a massive burp. It rumbles through your chest, startling birds into flight in the distance.  Awesome!  You slam the can into your forehead hard enough to smash the fragile aluminum into a flat, crushed disc.  Damn, you feel stronger already");
        if (player.stats.int > 50)
            DisplayText(", though you're a bit worried by how much you enjoyed the simple, brutish act");
        DisplayText(".\n\n");

        // (Tits b' gone)
        if (player.torso.chest.count > 0) {
            const topBreastRow = player.torso.chest.get(0);
            if (topBreastRow.rating >= 1) {
                DisplayText("A tingle starts in your " + BreastDescriptor.describeNipple(player, topBreastRow) + "s before the tight buds grow warm, hot even.  ");
                if (topBreastRow.lactationMultiplier >= 1)
                    DisplayText("Somehow, you know that the milk you had been producing is gone, reabsorbed by your body.  ");
                DisplayText("They pinch in towards your core, shrinking along with your flattening " + BreastDescriptor.describeAllBreasts(player) + ".  You shudder and flex in response.  Your chest isn't just shrinking, it's reforming, sculping itself into a massive pair of chiseled pecs.  ");
                if (player.torso.chest.count > 1) {
                    DisplayText("The breasts below vanish entirely.  ");
                    let chestCount: number = player.torso.chest.count;
                    while (chestCount > 1) {
                        player.torso.chest.remove(chestCount - 1);
                        chestCount--;
                    }
                }
                topBreastRow.rating = 0;
                if (topBreastRow.nipples.count > 1)
                    topBreastRow.nipples.count = 1;
                topBreastRow.nipples.fuckable = false;
                if (topBreastRow.nipples.length > .5)
                    topBreastRow.nipples.length = .25;
                topBreastRow.lactationMultiplier = 0;
                player.statusAffects.remove(StatusAffectType.Feeder);
                player.perks.remove(PerkType.Feeder);
                DisplayText("All too soon, your boobs are gone.  Whoa!\n\n");
            }
        }

        DisplayText("Starting at your hands, your muscles begin to contract and release, each time getting tighter, stronger, and more importantly - larger.  The oddness travels up your arms, thickens your biceps, and broadens your shoulders.  Soon, your neck and chest are as built as your arms.  You give a few experimental flexes as your abs ");
        if (player.tone >= 70) DisplayText("further define themselves");
        else DisplayText("become extraordinarily visible");
        DisplayText(".  The strange, muscle-building changes flow down your " + LegDescriptor.describeLegs(player) + ", making them just as fit and strong as the rest of you.  You curl your arm and kiss your massive, flexing bicep.  You're awesome!\n\n");

        DisplayText("Whoah, you're fucking ripped and strong, not at all like the puny weakling you were before.  Yet, you feel oddly wool-headed.  Your thoughts seem to be coming slower and slower, like they're plodding through a marsh.  You grunt in frustration at the realization.  Sure, you're a muscle-bound hunk now, but what good is it if you're as dumb as a box of rocks?  Your muscles flex in the most beautiful way, so you stop and strike a pose, mesmerized by your own appearance.  Fuck thinking, that shit's for losers!\n\n");

        // (has dick less than 10 inches)
        if (player.torso.cocks.count > 0) {
            const cock = player.torso.cocks.get(0);
            if (cock.length < 10) {
                DisplayText("As if on cue, the familiar tingling gathers in your groin, and you dimly remember you have one muscle left to enlarge.  If only you had the intelligence left to realize that your penis is not a muscle.  In any event, your " + CockDescriptor.describeCock(player, cock) + " swells in size, ");
                if (cock.thickness < 2.75) {
                    DisplayText("thickening and ");
                    cock.thickness = 2.75;
                }
                DisplayText("lengthening until it's ten inches long and almost three inches wide.  Fuck, you're hung!  ");
                cock.length = 10;
            }
            // Dick already big enough! BALL CHECK!
            if (player.torso.balls.quantity > 0) {
                DisplayText("Churning audibly, your " + BallsDescriptor.describeSack(player) + " sways, but doesn't show any outward sign of change.  Oh well, it's probably just like, getting more endurance or something.");
            }
            else {
                DisplayText("Two rounded orbs drop down below, filling out a new, fleshy sac above your " + LegDescriptor.describeLegs(player) + ".  Sweet!  You can probably cum buckets with balls like these.");
                player.torso.balls.quantity = 2;
                player.torso.balls.size = 3;
            }
            DisplayText("\n\n");
        }
        // (No dick)
        else {
            DisplayText("You hear a straining, tearing noise before you realize it's coming from your underwear.  Pulling open your " + player.inventory.equipment.armor.displayName + ", you gasp in surprise at the huge, throbbing manhood that now lies between your " + HipDescriptor.describeHips(player) + ".  It rapidly stiffens to a full, ten inches, and goddamn, it feels fucking good.  You should totally find a warm hole to fuck!");
            if (player.torso.balls.quantity === 0)
                DisplayText("  Two rounded orbs drop down below, filling out a new, fleshy sac above your " + LegDescriptor.describeLegs(player) + ".  Sweet!  You can probably cum buckets with balls like these.");
            DisplayText("\n\n");
            player.torso.cocks.add(new Cock(12, 2.75));
            if (player.torso.balls.quantity === 0) {
                player.torso.balls.quantity = 2;
                player.torso.balls.size = 3;
            }
        }
        // (Pussy b gone)
        if (player.torso.vaginas.count > 0) {
            DisplayText("At the same time, your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " burns hot, nearly feeling on fire.  You cuss in a decidedly masculine way for a moment before the pain fades to a dull itch.  Scratching it, you discover your lady-parts are gone.  Only a sensitive patch of skin remains.\n\n");
            while (player.torso.vaginas.count > 0) {
                player.torso.vaginas.remove(0);
            }
        }
        player.updateGender();
        // (below max masculinity)
        if (player.femininity > 0) {
            DisplayText("Lastly, the change hits your face.  You can feel your jawbones shifting and sliding around, your skin changing to accommodate your face's new shape.  Once it's finished, you feel your impeccable square jaw and give a wide, easy-going grin.  You look awesome!\n\n");
            BodyModifier.displayModFem(player, 0, 100);
        }
        DisplayText("You finish admiring yourself and adjust your " + player.inventory.equipment.armor.displayName + " to better fit your new physique.  Maybe there's some bitches around you can fuck.  Hell, as good as you look, you might have other dudes wanting you to fuck them too, no homo.\n\n");
        // max tone.  Thickness + 50
        BodyModifier.displayModTone(player, 100, 100);
        BodyModifier.displayModThickness(player, 100, 50);
        // Bonus cum production!
        player.perks.add(PerkType.BroBrains, 0, 0, 0, 0);
        player.perks.add(PerkType.BroBody, 0, 0, 0, 0);
        DisplayText("<b>(Bro Body - Perk Gained!)\n");
        DisplayText("(Bro Brains - Perk Gained!)</b>\n"); // int to 20.  max int 50
        if (player.perks.has(PerkType.Feeder)) {
            DisplayText("<b>(Perk Lost - Feeder!)</b>\n");
            player.perks.remove(PerkType.Feeder);
        }
        if (player.stats.int > 21)
            player.stats.int = 21;
        player.stats.str += 33;
        player.stats.tou += 33;
        player.stats.int -= 1;
        player.stats.lib += 4;
        player.stats.lust += 40;
    }
}
