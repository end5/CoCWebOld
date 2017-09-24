import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";
import LowerBodyDescriptor from "../../Descriptors/LowerBodyDescriptor";
import Game from "../../Game/Game";
import BreastRow from "../../Body/BreastRow";

export default class TatteredScroll extends Consumable {
    public constructor() {
        super("TScroll", "TScroll", "a tattered scroll", 0, "This tattered scroll is written in strange symbols, yet you have the feeling that if you tried to, you could decipher it.");
    }

    public use(player: Player) {
        let selectedBreasts: BreastRow;
        MainScreen.text("Your wobbly " + LowerBodyDescriptor.describeLegs(player.lowerBody) + " give out underneath you as your body's willpower seems to evaporate, your mouth reading the words on the scroll with a backwards sounding sing-song voice.\n\n", true);
        if (player.upperBody.head.hairColor == "sandy blonde") {
            MainScreen.text("Your mouth forms a smile of its own volition, reading, \"<i>Tresed eht retaw llahs klim ruoy.</i>\"\n\n", false);
            if (player.upperBody.chest.count() == 0 || player.upperBody.chest.BreastRatingLargest[0].breastRating == 0) {
                MainScreen.text("You grow a perfectly rounded pair of C-cup breasts!  ", false);
                if (player.upperBody.chest.count() == 0)
                    player.upperBody.chest.add();
                selectedBreasts = player.upperBody.chest.BreastRatingLargest[0];
                selectedBreasts.breasts = 2;
                selectedBreasts.breastRating = 3;
                if (selectedBreasts.nipplesPerBreast < 1)
                    selectedBreasts.nipplesPerBreast = 1;
                player.stats.sens += 2;
                player.stats.lust += 1;
            }
            selectedBreasts = player.upperBody.chest.BreastRatingLargest[0];
            if (selectedBreasts.breastRating > 0 && selectedBreasts.breastRating < 3) {
                MainScreen.text("Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.  ", false);
                selectedBreasts.breastRating = 3;
                player.stats.sens += 1;
                player.stats.lust += 1;
            }
            if (player.upperBody.chest.averageNipplesPerBreast() < 1) {
                MainScreen.text("A dark spot appears on each breast, rapidly forming into a sensitive nipple.  ", false);
                for (let index = 0; index < player.upperBody.chest.count(); index++) {
                    //If that breast didnt have nipples reset length
                    if (player.upperBody.chest.list[index].nipplesPerBreast < 1)
                        player.upperBody.chest.list[index].nippleLength = .2;
                    player.upperBody.chest.list[index].nipplesPerBreast = 1;

                }
                player.stats.sens += 2;
                player.stats.lust += 1;
            }
            selectedBreasts = player.upperBody.chest.LactationMultipierLargest[0];
            if (selectedBreasts.lactationMultiplier > 0) {
                MainScreen.text("A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ", false);
                if (selectedBreasts.lactationMultiplier < 2)
                    MainScreen.text("powerful jets of milk spray from your nipples, spraying thick streams over the ground.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ", false);
                if (selectedBreasts.lactationMultiplier >= 2 && selectedBreasts.lactationMultiplier <= 2.6)
                    MainScreen.text("eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ", false);
                if (selectedBreasts.lactationMultiplier > 2.6 && selectedBreasts.lactationMultiplier < 3)
                    MainScreen.text("thick hoses of milk erupt from your aching nipples, forming puddles on the ground.  You smile at how well you're feeding the earth, your milk coating the ground faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, your hands completely out of control.  In time you realize the milk has stopped, and even had time to soak into the dirt.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ", false);

                if (selectedBreasts.lactationMultiplier >= 3)
                    MainScreen.text("you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down a hill in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the ground all of your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ", false);
                if (selectedBreasts.lactationMultiplier < 3) {
                    player.boostLactation(.7);
                    MainScreen.text("Your breasts feel fuller... riper... like your next milking could be even bigger.  ", false);
                }
                player.stats.lib += 1;
                player.stats.sens += 4;
                player.stats.lust += 15;
            }
            if (selectedBreasts.lactationMultiplier == 0) {
                MainScreen.text("A pleasurable release suddenly erupts from your nipples!  Twin streams of milk are spraying from your breasts, soaking into the ground immediately.  It stops all too soon, though a voice in your head assures you that you can lactate quite often now.  ", false);
                player.boostLactation(1);
                player.stats.lib += 0.5;
                player.stats.sens += 1;
                player.stats.lust += 10;
            }
            MainScreen.text("\n\nYour mouth curls into a sick smile and, with a voice that isn't your own, speaks, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
            MainScreen.doNext(camp.returnToCampUseOneHour);
        }
        else {
            MainScreen.text("Your mouth forms a smile of its own volition, reading, \"<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>\"\n\nYou feel a tingling in your scalp, and realize your hair has become a sandy blonde!", false);
            player.upperBody.head.hairColor = "sandy blonde";
            MainScreen.text("\n\nYour mouth curls with a sick smile, speaking with a voice that isn't your own, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
            MainScreen.doNext(camp.returnToCampUseOneHour);
        }
        if (!Game.inCombat) {
            //RAEP
            spriteSelect(50);
            MainScreen.text("\n\nYou hear the soft impact of clothes hitting the ground behind you, and turn to see that the sand witch has found you! You cannot resist a peek at your uninvited guest, beholding a curvy dark-skinned beauty, her form dominated by a quartet of lactating breasts.  Somewhere in your lust-fogged mind you register the top two as something close to double-Ds, and her lower pair to be about Cs.  She smiles and leans over you, pushing you to the ground violently.\n\nShe turns around and drops, planting her slick honey-pot firmly against your mouth.  Her scent is strong, overpowering in its intensity.  Your tongue darts out for a taste and finds a treasure trove of sticky sweetness.  Instinctively you tongue-fuck her, greedily devouring her cunny-juice, shoving your tongue in as far as possible while suckling her clit.  Dimly you feel the milk spattering over you, splashing off you and into the cracked earth.  Everywhere the milk touches feels silky smooth and sensitive, and your hands begin stroking your body, rubbing it in as the witch sprays more and more of it.  You lose track of time, orgasming many times, slick and sticky with sexual fluids.", false);
            player.orgasm();
            player.stats.lib += 1;
            player.stats.sens += 5;
            player.slimeFeed();
        }
    }
}