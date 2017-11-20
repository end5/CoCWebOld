import Consumable from './Consumable';
import Cock from '../../Body/Cock';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class BroBrew extends Consumable {
    public constructor() {
        super("BroBrew", new ItemDesc("BroBrew", "a can of Bro Brew", "This aluminum can is labelled as 'Bro Brew'.  It even has a picture of a muscly, bare-chested man flexing on it.  A small label in the corner displays: \"Demon General's Warning: Bro Brew's effects are as potent (and irreversible) as they are refreshing.\""));
    }

    public use(player: Player) {
        DisplayText.clear();
        let cock: Cock;
        //no drink for bimbos!
        if (player.perks.has(PerkType.BimboBody)) {
            DisplayText.text("The stuff hits you like a giant cube, nearly staggering you as it begins to settle.");
            if (player.tallness < 77) {
                player.tallness = 77;
                DisplayText.text(".. Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!");
            }
            if (player.tone < 100) {
                DisplayText.text("  A tingling in your arm draws your attention just in time to see your biceps and triceps swell with new-found energy, skin tightening until thick cords of muscle run across the whole appendage.  Your other arm surges forward with identical results.  To compensate, your shoulders and neck widen to bodybuilder-like proportions while your chest and abs tighten to a firm, statuesque physique.  Your " + LowerBodyDescriptor.describeLegs(player) + " and glutes are the last to go, bulking up to proportions that would make any female martial artist proud.  You feel like you could kick forever with legs this powerful.");
                player.tone = 100;
            }
            DisplayText.text("\n\n");

            //female
            if (!player.lowerBody.cockSpot.hasCock()) {
                DisplayText.text("The beverage isn't done yet, however, and it makes it perfectly clear with a building pleasure in your groin.  You can only cry in ecstasy and loosen the bottoms of your " + player.inventory.armorSlot.equipment.displayName + " just in time for a little penis to spring forth.  You watch, enthralled, as blood quickly stiffens the shaft to its full length � then keeps on going!  Before long, you have a quivering 10-inch maleness, just ready to stuff into a welcoming box.");
                cock = new Cock();
                cock.cockLength = 10;
                cock.cockThickness = 2;
                player.lowerBody.cockSpot.add(cock);
                if (player.lowerBody.balls == 0) {
                    DisplayText.text("  Right on cue, two cum-laden testicles drop in behind it, their contents swirling and churning.");
                    player.lowerBody.balls = 2;
                    player.lowerBody.ballSize = 3;
                }
                DisplayText.text("\n\n");
            }
            else if (player.lowerBody.balls == 0) {
                DisplayText.text("A swelling begins behind your man-meat, and you're assailed with an incredibly peculiar sensation as two sperm-filled balls drop into a newly-formed scrotum.  Frikkin' sweet!\n\n");
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
            DisplayText.text("Finally, you feel the transformation skittering to a halt, leaving you to openly roam your new chiseled and sex-ready body.  So what if you can barely form coherent sentences anymore?  A body like this does all the talking you need, you figure!");
            if (player.stats.int > 35) {
                player.stats.int = 35;
                player.stats.int -= 0.1;

            }
            if (player.stats.lib < 50) {
                player.stats.lib = 50;
                player.stats.lib += 0.1;
            }
            DisplayText.text("\n\n");
            if (player.perks.has(PerkType.BimboBrains))
                DisplayText.text("<b>(Lost Perks - Bimbo Brains, Bimbo Body)\n");
            else
                DisplayText.text("<b>(Lost Perk - Bimbo Body)\n");
            player.perks.remove(PerkType.BimboBrains);
            player.perks.remove(PerkType.BimboBody);
            player.perks.add(PerkFactory.create(PerkType.FutaForm, 0, 0, 0, 0));
            player.perks.add(PerkFactory.create(PerkType.FutaFaculties, 0, 0, 0, 0));
            DisplayText.text("(Gained Perks - Futa Form, Futa Faculties)</b>");
            player.updateGender();
            return;
        }
        //HP restore for bros!
        if (player.perks.has(PerkType.BroBody) || player.perks.has(PerkType.FutaForm)) {
            DisplayText.text("You crack open the can and guzzle it in a hurry.  Goddamn, this shit is the best.  As you crush the can against your forehead, you wonder if you can find a six-pack of it somewhere?\n\n");
            player.stats.fatigue -= 33;
            StatModifier.displayPlayerHPChange(player, 100);
            return;
        }
        DisplayText.text("Well, maybe this will give you the musculature that you need to accomplish your goals.  You pull on the tab at the top and hear the distinctive snap-hiss of venting, carbonating pressure.  A smoky haze wafts from the opened container, smelling of hops and alcohol.  You lift it to your lips, the cold, metallic taste of the can coming to your tongue before the first amber drops of beer roll into your waiting mouth.  It tingles, but it's very, very good.  You feel compelled to finish it as rapidly as possible, and you begin to chug it.  You finish the entire container in seconds.\n\n");

        DisplayText.text("A churning, full sensation wells up in your gut, and without thinking, you open wide to release a massive burp. It rumbles through your chest, startling birds into flight in the distance.  Awesome!  You slam the can into your forehead hard enough to smash the fragile aluminum into a flat, crushed disc.  Damn, you feel stronger already");
        if (player.stats.int > 50)
            DisplayText.text(", though you're a bit worried by how much you enjoyed the simple, brutish act");
        DisplayText.text(".\n\n");

        //(Tits b' gone)
        if (player.upperBody.chest.count() > 0) {
            let topBreastRow = player.upperBody.chest.get(0);
            if (topBreastRow.breastRating >= 1) {
                DisplayText.text("A tingle starts in your " + BreastDescriptor.describeNipple(player, topBreastRow) + "s before the tight buds grow warm, hot even.  ");
                if (topBreastRow.lactationMultiplier >= 1)
                    DisplayText.text("Somehow, you know that the milk you had been producing is gone, reabsorbed by your body.  ");
                DisplayText.text("They pinch in towards your core, shrinking along with your flattening " + BreastDescriptor.describeAllBreasts(player) + ".  You shudder and flex in response.  Your chest isn't just shrinking, it's reforming, sculping itself into a massive pair of chiseled pecs.  ");
                if (player.upperBody.chest.count() > 1) {
                    DisplayText.text("The breasts below vanish entirely.  ");
                    let chestCount: number = player.upperBody.chest.count();
                    while (chestCount > 1) {
                        player.upperBody.chest.remove(player.upperBody.chest.get(chestCount - 1));
                        chestCount--;
                    }
                }
                topBreastRow.breastRating = 0;
                topBreastRow.nipplesPerBreast = 1;
                topBreastRow.fuckable = false;
                if (topBreastRow.nippleLength > .5)
                    topBreastRow.nippleLength = .25;
                topBreastRow.lactationMultiplier = 0;
                player.statusAffects.remove(StatusAffectType.Feeder);
                player.perks.remove(PerkType.Feeder);
                DisplayText.text("All too soon, your boobs are gone.  Whoa!\n\n");
            }
        }

        DisplayText.text("Starting at your hands, your muscles begin to contract and release, each time getting tighter, stronger, and more importantly - larger.  The oddness travels up your arms, thickens your biceps, and broadens your shoulders.  Soon, your neck and chest are as built as your arms.  You give a few experimental flexes as your abs ");
        if (player.tone >= 70) DisplayText.text("further define themselves");
        else DisplayText.text("become extraordinarily visible");
        DisplayText.text(".  The strange, muscle-building changes flow down your " + LowerBodyDescriptor.describeLegs(player) + ", making them just as fit and strong as the rest of you.  You curl your arm and kiss your massive, flexing bicep.  You're awesome!\n\n");

        DisplayText.text("Whoah, you're fucking ripped and strong, not at all like the puny weakling you were before.  Yet, you feel oddly wool-headed.  Your thoughts seem to be coming slower and slower, like they're plodding through a marsh.  You grunt in frustration at the realization.  Sure, you're a muscle-bound hunk now, but what good is it if you're as dumb as a box of rocks?  Your muscles flex in the most beautiful way, so you stop and strike a pose, mesmerized by your own appearance.  Fuck thinking, that shit's for losers!\n\n");

        //(has dick less than 10 inches)
        if (player.lowerBody.cockSpot.hasCock()) {
            let cock: Cock = player.lowerBody.cockSpot.get(0);
            if (cock.cockLength < 10) {
                DisplayText.text("As if on cue, the familiar tingling gathers in your groin, and you dimly remember you have one muscle left to enlarge.  If only you had the intelligence left to realize that your penis is not a muscle.  In any event, your " + CockDescriptor.describeCock(player, cock) + " swells in size, ");
                if (cock.cockThickness < 2.75) {
                    DisplayText.text("thickening and ");
                    cock.cockThickness = 2.75;
                }
                DisplayText.text("lengthening until it's ten inches long and almost three inches wide.  Fuck, you're hung!  ");
                cock.cockLength = 10;
            }
            //Dick already big enough! BALL CHECK!
            if (player.lowerBody.balls > 0) {
                DisplayText.text("Churning audibly, your " + BallsDescriptor.describeSack(player) + " sways, but doesn't show any outward sign of change.  Oh well, it's probably just like, getting more endurance or something.");
            }
            else {
                DisplayText.text("Two rounded orbs drop down below, filling out a new, fleshy sac above your " + LowerBodyDescriptor.describeLegs(player) + ".  Sweet!  You can probably cum buckets with balls like these.");
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
            DisplayText.text("\n\n");
        }
        //(No dick)
        else {
            DisplayText.text("You hear a straining, tearing noise before you realize it's coming from your underwear.  Pulling open your " + player.inventory.armorSlot.equipment.displayName + ", you gasp in surprise at the huge, throbbing manhood that now lies between your " + LowerBodyDescriptor.describeHips(player) + ".  It rapidly stiffens to a full, ten inches, and goddamn, it feels fucking good.  You should totally find a warm hole to fuck!");
            if (player.lowerBody.balls == 0)
                DisplayText.text("  Two rounded orbs drop down below, filling out a new, fleshy sac above your " + LowerBodyDescriptor.describeLegs(player) + ".  Sweet!  You can probably cum buckets with balls like these.");
            DisplayText.text("\n\n");
            let cock = new Cock();
            cock.cockLength = 12;
            cock.cockThickness = 2.75;
            player.lowerBody.cockSpot.add(cock);
            if (player.lowerBody.balls == 0) {
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
        }
        //(Pussy b gone)
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            DisplayText.text("At the same time, your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " burns hot, nearly feeling on fire.  You cuss in a decidedly masculine way for a moment before the pain fades to a dull itch.  Scratching it, you discover your lady-parts are gone.  Only a sensitive patch of skin remains.\n\n");
            let vaginaCount: number = player.lowerBody.vaginaSpot.count();
            while (vaginaCount > 0) {
                player.lowerBody.vaginaSpot.remove(player.lowerBody.vaginaSpot.get(vaginaCount - 1));
                vaginaCount--;
            }
        }
        player.updateGender();
        //(below max masculinity)
        if (player.femininity > 0) {
            DisplayText.text("Lastly, the change hits your face.  You can feel your jawbones shifting and sliding around, your skin changing to accommodate your face's new shape.  Once it's finished, you feel your impeccable square jaw and give a wide, easy-going grin.  You look awesome!\n\n");
            player.modFem(0, 100);
        }
        DisplayText.text("You finish admiring yourself and adjust your " + player.inventory.armorSlot.equipment.displayName + " to better fit your new physique.  Maybe there's some bitches around you can fuck.  Hell, as good as you look, you might have other dudes wanting you to fuck them too, no homo.\n\n");
        //max tone.  Thickness + 50
        player.modTone(100, 100);
        player.modThickness(100, 50);
        //Bonus cum production!
        player.perks.add(PerkFactory.create(PerkType.BroBrains, 0, 0, 0, 0));
        player.perks.add(PerkFactory.create(PerkType.BroBody, 0, 0, 0, 0));
        DisplayText.text("<b>(Bro Body - Perk Gained!)\n");
        DisplayText.text("(Bro Brains - Perk Gained!)</b>\n");//int to 20.  max int 50)
        if (player.perks.has(PerkType.Feeder)) {
            DisplayText.text("<b>(Perk Lost - Feeder!)</b>\n");
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