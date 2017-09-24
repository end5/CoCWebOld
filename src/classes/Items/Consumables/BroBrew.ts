import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class BroBrew extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        //no drink for bimbos!
        if (player.perks.has("BimboBody")) {
            MainScreen.text("The stuff hits you like a giant cube, nearly staggering you as it begins to settle.", false);
            if (player.tallness < 77) {
                player.tallness = 77;
                MainScreen.text(".. Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!", false);
            }
            if (player.tone < 100) {
                MainScreen.text("  A tingling in your arm draws your attention just in time to see your biceps and triceps swell with new-found energy, skin tightening until thick cords of muscle run across the whole appendage.  Your other arm surges forward with identical results.  To compensate, your shoulders and neck widen to bodybuilder-like proportions while your chest and abs tighten to a firm, statuesque physique.  Your " + player.legs() + " and glutes are the last to go, bulking up to proportions that would make any female martial artist proud.  You feel like you could kick forever with legs this powerful.", false);
                player.tone = 100;
            }
            MainScreen.text("\n\n", false);

            //female
            if (!player.lowerBody.cockSpot.hasCock()) {
                MainScreen.text("The beverage isn't done yet, however, and it makes it perfectly clear with a building pleasure in your groin.  You can only cry in ecstasy and loosen the bottoms of your " + player.armorName + " just in time for a little penis to spring forth.  You watch, enthralled, as blood quickly stiffens the shaft to its full length – then keeps on going!  Before long, you have a quivering 10-inch maleness, just ready to stuff into a welcoming box.", false);
                player.lowerBody.cockSpot.add(new Cock());
                player.lowerBody.cockSpot.list[0].cockLength = 10;
                player.lowerBody.cockSpot.list[0].cockThickness = 2;
                if (player.lowerBody.balls == 0) {
                    MainScreen.text("  Right on cue, two cum-laden testicles drop in behind it, their contents swirling and churning.", false);
                    player.lowerBody.balls = 2;
                    player.lowerBody.ballSize = 3;
                }
                MainScreen.text("\n\n", false);
            }
            else if (player.lowerBody.balls == 0) {
                MainScreen.text("A swelling begins behind your man-meat, and you're assailed with an incredibly peculiar sensation as two sperm-filled balls drop into a newly-formed scrotum.  Frikkin' sweet!\n\n", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
            MainScreen.text("Finally, you feel the transformation skittering to a halt, leaving you to openly roam your new chiseled and sex-ready body.  So what if you can barely form coherent sentences anymore?  A body like this does all the talking you need, you figure!", false);
            if (player.stats.int > 35) {
                player.stats.int = 35;
                dynStats("int", -0.1);

            }
            if (player.stats.lib < 50) {
                player.stats.lib = 50;
                dynStats("lib", .1);
            }
            MainScreen.text("\n\n", false);
            if (player.perks.has("BimboBrains")) MainScreen.text("<b>(Lost Perks - Bimbo Brains, Bimbo Body)\n", false);
            else MainScreen.text("<b>(Lost Perk - Bimbo Body)\n", false);
            player.perks.remove("BimboBrains");
            player.perks.remove("BimboBody");
            player.createPerk(PerkLib.FutaForm, 0, 0, 0, 0);
            player.createPerk(PerkLib.FutaFaculties, 0, 0, 0, 0);
            MainScreen.text("(Gained Perks - Futa Form, Futa Faculties)</b>", false);
            player.genderCheck();
            return;
        }
        //HP restore for bros!
        if (player.perks.has("BroBody") || player.perks.has("FutaForm")) {
            MainScreen.text("You crack open the can and guzzle it in a hurry.  Goddamn, this shit is the best.  As you crush the can against your forehead, you wonder if you can find a six-pack of it somewhere?\n\n", false);
            fatigue(-33);
            HPChange(100, true);
            return;
        }
        MainScreen.text("Well, maybe this will give you the musculature that you need to accomplish your goals.  You pull on the tab at the top and hear the distinctive snap-hiss of venting, carbonating pressure.  A smoky haze wafts from the opened container, smelling of hops and alcohol.  You lift it to your lips, the cold, metallic taste of the can coming to your tongue before the first amber drops of beer roll into your waiting mouth.  It tingles, but it's very, very good.  You feel compelled to finish it as rapidly as possible, and you begin to chug it.  You finish the entire container in seconds.\n\n", false);

        MainScreen.text("A churning, full sensation wells up in your gut, and without thinking, you open wide to release a massive burp. It rumbles through your chest, startling birds into flight in the distance.  Awesome!  You slam the can into your forehead hard enough to smash the fragile aluminum into a flat, crushed disc.  Damn, you feel stronger already", false);
        if (player.stats.int > 50) MainScreen.text(", though you're a bit worried by how much you enjoyed the simple, brutish act", false);
        MainScreen.text(".\n\n", false);

        //(Tits b' gone)
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) {
            MainScreen.text("A tingle starts in your " + nippleDescript(0) + "s before the tight buds grow warm, hot even.  ", false);
            if (player.biggestLactation() >= 1) MainScreen.text("Somehow, you know that the milk you had been producing is gone, reabsorbed by your body.  ", false);
            MainScreen.text("They pinch in towards your core, shrinking along with your flattening " + allChestDesc() + ".  You shudder and flex in response.  Your chest isn't just shrinking, it's reforming, sculping itself into a massive pair of chiseled pecs.  ", false);
            if (player.upperBody.chest.count() > 1) {
                MainScreen.text("The breasts below vanish entirely.  ", false);
                while (player.upperBody.chest.count() > 1) {
                    player.removeBreastRow(player.upperBody.chest.count() - 1, 1);
                }
            }
            player.upperBody.chest.list[0].breastRating = 0;
            player.upperBody.chest.list[0].nipplesPerBreast = 1;
            player.upperBody.chest.list[0].fuckable = false;
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength > .5) player.upperBody.chest.BreastRatingLargest[0].nippleLength = .25;
            player.upperBody.chest.list[0].lactationMultiplier = 0;
            player.statusAffects.remove("Feeder");
            player.perks.remove("Feeder");
            MainScreen.text("All too soon, your boobs are gone.  Whoa!\n\n", false);
        }

        MainScreen.text("Starting at your hands, your muscles begin to contract and release, each time getting tighter, stronger, and more importantly - larger.  The oddness travels up your arms, thickens your biceps, and broadens your shoulders.  Soon, your neck and chest are as built as your arms.  You give a few experimental flexes as your abs ", false);
        if (player.tone >= 70) MainScreen.text("further define themselves", false);
        else MainScreen.text("become extraordinarily visible", false);
        MainScreen.text(".  The strange, muscle-building changes flow down your " + player.legs() + ", making them just as fit and strong as the rest of you.  You curl your arm and kiss your massive, flexing bicep.  You're awesome!\n\n", false);

        MainScreen.text("Whoah, you're fucking ripped and strong, not at all like the puny weakling you were before.  Yet, you feel oddly wool-headed.  Your thoughts seem to be coming slower and slower, like they're plodding through a marsh.  You grunt in frustration at the realization.  Sure, you're a muscle-bound hunk now, but what good is it if you're as dumb as a box of rocks?  Your muscles flex in the most beautiful way, so you stop and strike a pose, mesmerized by your own appearance.  Fuck thinking, that shit's for losers!\n\n", false);

        //(has dick less than 10 inches)
        if (player.lowerBody.cockSpot.hasCock()) {
            if (player.lowerBody.cockSpot.list[0].cockLength < 10) {
                MainScreen.text("As if on cue, the familiar tingling gathers in your groin, and you dimly remember you have one muscle left to enlarge.  If only you had the intelligence left to realize that your penis is not a muscle.  In any event, your " + cockDescript(0) + " swells in size, ", false);
                if (player.lowerBody.cockSpot.list[0].cockThickness < 2.75) {
                    MainScreen.text("thickening and ", false);
                    player.lowerBody.cockSpot.list[0].cockThickness = 2.75;
                }
                MainScreen.text("lengthening until it's ten inches long and almost three inches wide.  Fuck, you're hung!  ", false);
                player.lowerBody.cockSpot.list[0].cockLength = 10;
            }
            //Dick already big enough! BALL CHECK!
            if (player.lowerBody.balls > 0) {
                MainScreen.text("Churning audibly, your " + sackDescript() + " sways, but doesn't show any outward sign of change.  Oh well, it's probably just like, getting more endurance or something.", false);
            }
            else {
                MainScreen.text("Two rounded orbs drop down below, filling out a new, fleshy sac above your " + player.legs() + ".  Sweet!  You can probably cum buckets with balls like these.", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
            MainScreen.text("\n\n", false);
        }
        //(No dick)
        else {
            MainScreen.text("You hear a straining, tearing noise before you realize it's coming from your underwear.  Pulling open your " + player.armorName + ", you gasp in surprise at the huge, throbbing manhood that now lies between your " + hipDescript() + ".  It rapidly stiffens to a full, ten inches, and goddamn, it feels fucking good.  You should totally find a warm hole to fuck!", false);
            if (player.lowerBody.balls == 0) MainScreen.text("  Two rounded orbs drop down below, filling out a new, fleshy sac above your " + player.legs() + ".  Sweet!  You can probably cum buckets with balls like these.", false);
            MainScreen.text("\n\n", false);
            player.lowerBody.cockSpot.add(new Cock());
            player.lowerBody.cockSpot.list[0].cockLength = 12;
            player.lowerBody.cockSpot.list[0].cockThickness = 2.75;
            if (player.lowerBody.balls == 0) {
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 3;
            }
        }
        //(Pussy b gone)
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("At the same time, your " + vaginaDescript(0) + " burns hot, nearly feeling on fire.  You cuss in a decidedly masculine way for a moment before the pain fades to a dull itch.  Scratching it, you discover your lady-parts are gone.  Only a sensitive patch of skin remains.\n\n", false);
            player.removeVagina(0, 1);
        }
        player.genderCheck();
        //(below max masculinity)
        if (player.femininity > 0) {
            MainScreen.text("Lastly, the change hits your face.  You can feel your jawbones shifting and sliding around, your skin changing to accommodate your face's new shape.  Once it's finished, you feel your impeccable square jaw and give a wide, easy-going grin.  You look awesome!\n\n", false);
            player.modFem(0, 100);
        }
        MainScreen.text("You finish admiring yourself and adjust your " + player.armorName + " to better fit your new physique.  Maybe there's some bitches around you can fuck.  Hell, as good as you look, you might have other dudes wanting you to fuck them too, no homo.\n\n", false);
        //max tone.  Thickness + 50
        player.modTone(100, 100);
        player.modThickness(100, 50);
        //Bonus cum production!
        player.createPerk(PerkLib.BroBrains, 0, 0, 0, 0);
        player.createPerk(PerkLib.BroBody, 0, 0, 0, 0);
        MainScreen.text("<b>(Bro Body - Perk Gained!)\n", false);
        MainScreen.text("(Bro Brains - Perk Gained!)</b>\n", false);//int to 20.  max int 50)
        if (player.perks.has("Feeder")) {
            MainScreen.text("<b>(Perk Lost - Feeder!)</b>\n", false);
            player.perks.remove("Feeder");
        }
        if (player.stats.int > 21) player.stats.int = 21;
        dynStats("str", 33, "tou", 33, "int", -1, "lib", 4, "lus", 40);
    }
}