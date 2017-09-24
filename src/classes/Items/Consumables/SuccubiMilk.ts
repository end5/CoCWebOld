import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class SuccubiMilk extends Consumable {
    public readonly tainted: boolean;

    public constructor(tainted: boolean) {
        super("SucMilk", "SucMilk", "a bottle of Succubi milk", 0, "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"");
        this.tainted = tainted;
    }

    public use(player: Player) {
        player.slimeFeed();
        let temp2: number = 0;
        let temp3: number = 0;
        let Utils.rando: number = Math.Utils.random() * 100;
        if (player.perks.has("HistoryAlchemist")) Utils.rando += 10;
        if (Utils.rando >= 90 && !tainted) Utils.rando -= 10;
        if (player.stats.cor < 35) MainScreen.text("You wonder why in the gods' names you would drink such a thing, but you have to admit, it is the best thing you have ever tasted.", true);
        if (player.stats.cor >= 35 && player.stats.cor < 70) {
            MainScreen.text("You savor the incredible flavor as you greedily gulp it down.", true);
            if (player.gender == 2 || player.gender == 3) {
                MainScreen.text("  The taste alone makes your " + vaginaDescript(0) + " feel ", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DRY) MainScreen.text("tingly.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.NORMAL) MainScreen.text("wet.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.WET) MainScreen.text("sloppy and wet.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLICK) MainScreen.text("sopping and juicy.", false);
                if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.DROOLING) MainScreen.text("dripping wet.", false);
            }
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  You feel a building arousal, but it doesn't affect your cock.", false);
        }
        if (player.stats.cor >= 70) {
            MainScreen.text("You pour the milk down your throat, chugging the stuff as fast as you can.  You want more.", true);
            if (player.gender == 2 || player.gender == 3) {
                MainScreen.text("  Your " + vaginaDescript(0), false);
                if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text(" quiver in orgasm, ", false);
                if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text(" quivers in orgasm, ", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DRY) MainScreen.text("becoming slightly sticky.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.NORMAL) MainScreen.text("leaving your undergarments sticky.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.WET) MainScreen.text("wet with girlcum.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLICK) MainScreen.text("staining your undergarments with cum.", false);
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DROOLING) MainScreen.text("leaving cunt-juice trickling down your leg.", false);
                if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.SLAVERING) MainScreen.text("spraying your undergarments liberally with slick girl-cum.", false);
                player.orgasm();
            }
            else if (player.gender != 0) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  You feel a strange sexual pleasure, but your " + multiCockDescript() + " remains unaffected.", false);
                else MainScreen.text("  You feel a strange sexual pleasure, but your " + multiCockDescript() + " remain unaffected.", false);
            }
        }
        if (tainted) dynStats("spe", 1, "lus", 3, "cor", 1);
        else dynStats("spe", 1, "lus", 3);
        //Breast growth (maybe cock reduction!)
        if (Utils.rando <= 75) {
            //Temp stores the level of growth...
            temp = 1 + Utils.rand(3);
            if (player.upperBody.chest.count() > 0) {
                if (player.upperBody.chest.list[0].breastRating < 2 && Utils.rand(3) == 0) temp++;
                if (player.upperBody.chest.list[0].breastRating < 5 && Utils.rand(4) == 0) temp++;
                if (player.upperBody.chest.list[0].breastRating < 6 && Utils.rand(5) == 0) temp++;
            }
            MainScreen.text("\n\n", false);
            player.growTits(temp, player.upperBody.chest.count(), true, 3);
            if (player.upperBody.chest.count() == 0) {
                MainScreen.text("A perfect pair of B cup breasts, complete with tiny nipples, form on your chest.", false);
                player.createBreastRow();
                player.upperBody.chest.list[0].breasts = 2;
                player.upperBody.chest.list[0].breastsPerRow = 2;
                player.upperBody.chest.list[0].nipplesPerBreast = 1;
                player.upperBody.chest.list[0].breastRating = 2;
                MainScreen.text("\n", false);
            }
            if (!Flags.get(FlagEnum.HYPER_HAPPY)) {
                // Shrink cocks if you have them.
                if (player.lowerBody.cockSpot.count() > 0) {
                    temp = 0;
                    temp2 = player.lowerBody.cockSpot.count();
                    temp3 = 0;
                    //Find biggest cock
                    while (temp2 > 0) {
                        temp2--;
                        if (player.lowerBody.cockSpot.list[temp].cockLength <= player.lowerBody.cockSpot.list[temp2].cockLength) temp = temp2;
                    }
                    //Shrink said cock
                    if (player.lowerBody.cockSpot.list[temp].cockLength < 6 && player.lowerBody.cockSpot.list[temp].cockLength >= 2.9) {
                        player.lowerBody.cockSpot.list[temp].cockLength -= .5;
                        temp3 -= .5;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness * 6 > player.lowerBody.cockSpot.list[temp].cockLength) player.lowerBody.cockSpot.list[temp].cockThickness -= .2;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness * 8 > player.lowerBody.cockSpot.list[temp].cockLength) player.lowerBody.cockSpot.list[temp].cockThickness -= .2;
                        if (player.lowerBody.cockSpot.list[temp].cockThickness < .5) player.lowerBody.cockSpot.list[temp].cockThickness = .5;
                    }
                    temp3 += player.increaseCock(temp, (Utils.rand(3) + 1) * -1);
                    MainScreen.text("\n\n", false);
                    player.lengthChange(temp3, 1);
                    if (player.lowerBody.cockSpot.list[temp].cockLength < 2) {
                        MainScreen.text("  ", false);
                        player.killCocks(1);
                    }
                }
            }
        }
        if (player.lowerBody.vaginaSpot.count() == 0 && (Utils.rand(3) == 0 || (Utils.rando > 75 && Utils.rando < 90))) {
            player.createVagina();
            player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.TIGHT;
            player.vaginas[0].vaginalWetness = VAGINA_WETNESS.NORMAL;
            player.vaginas[0].virgin = true;
            player.lowerBody.vaginaSpot.list[0].clitLength = .25;
            if (player.fertility <= 5) player.fertility = 6;
            MainScreen.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + vaginaDescript(0) + "</b>!", false);
        }
        //Increase pussy wetness or grow one!!
        else if (Utils.rando > 75 && Utils.rando < 90) {
            //Shrink cawk
            if (player.lowerBody.cockSpot.count() > 0 && !Flags.get(FlagEnum.HYPER_HAPPY)) {
                MainScreen.text("\n\n", false);
                temp = 0;
                temp2 = player.lowerBody.cockSpot.count();
                //Find biggest cock
                while (temp2 > 0) {
                    temp2--;
                    if (player.lowerBody.cockSpot.list[temp].cockLength <= player.lowerBody.cockSpot.list[temp2].cockLength) temp = temp2;
                }
                //Shrink said cock
                if (player.lowerBody.cockSpot.list[temp].cockLength < 6 && player.lowerBody.cockSpot.list[temp].cockLength >= 2.9) {
                    player.lowerBody.cockSpot.list[temp].cockLength -= .5;
                }
                temp3 = player.increaseCock(temp, -1 * (Utils.rand(3) + 1));
                player.lengthChange(temp3, 1);
                if (player.lowerBody.cockSpot.list[temp].cockLength < 3) {
                    MainScreen.text("  ", false);
                    player.killCocks(1);
                }
            }
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("\n\n", false);
                //0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLAVERING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("Your " + vaginaDescript(0) + " gushes fluids down your leg as you spontaneously orgasm.", false);
                    else MainScreen.text("Your " + vaginaDescript(0) + "s gush fluids down your legs as you spontaneously orgasm, leaving a thick puddle of pussy-juice on the ground.  It is rapidly absorbed by the earth.", false);
                    player.orgasm();
                    if (tainted) dynStats("cor", 1);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DROOLING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("Your pussy feels hot and juicy, aroused and tender.  You cannot resist as your hands dive into your " + vaginaDescript(0) + ".  You quickly orgasm, squirting fluids everywhere.  <b>You are now a squirter</b>.", false);
                    if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text("Your pussies feel hot and juicy, aroused and tender.  You cannot resist plunging your hands inside your " + vaginaDescript(0) + "s.  You quiver around your fingers, squirting copious fluids over yourself and the ground.  The fluids quickly disappear into the dirt.", false);
                    player.orgasm();
                    if (tainted) dynStats("cor", 1);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.SLICK) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("You feel a sudden trickle of fluid down your leg.  You smell it and realize it's your pussy-juice.  Your " + vaginaDescript(0) + " now drools lubricant constantly down your leg.", false);
                    if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text("You feel sudden trickles of fluids down your leg.  You smell the stuff and realize it's your pussies-juices.  They seem to drool lubricant constantly down your legs.", false);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.WET) {
                    MainScreen.text("You flush in sexual arousal as you realize how moist your cunt-lips have become.  Once you've calmed down a bit you realize they're still slick and ready to fuck, and always will be.", false);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.NORMAL) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + vaginaDescript(0) + " felt much wetter than normal.", false);
                    else MainScreen.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + vaginaDescript(0) + " were much wetter than normal.", false);
                }
                if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DRY) {
                    MainScreen.text("You feel a tingling in your crotch, but cannot identify it.", false);
                }
                temp = player.lowerBody.vaginaSpot.count();
                while (temp > 0) {
                    temp--;
                    if (player.vaginas[0].vaginalWetness < VAGINA_WETNESS.SLAVERING) player.vaginas[temp].vaginalWetness++;
                }
            }
        }
        if (Utils.rando >= 90) {
            if (player.skinTone == "blue" || player.skinTone == "purple" || player.skinTone == "indigo" || player.skinTone == "shiny black") {
                if (player.lowerBody.vaginaSpot.count() > 0) {
                    MainScreen.text("\n\nYour heart begins beating harder and harder as heat floods to your groin.  You feel your clit peeking out from under its hood, growing larger and longer as it takes in more and more blood.", false);
                    if (player.lowerBody.vaginaSpot.list[0].clitLength > 3 && !player.perks.has("BigClit")) MainScreen.text("  After some time it shrinks, returning to its normal aroused size.  You guess it can't get any bigger.", false);
                    if (player.lowerBody.vaginaSpot.list[0].clitLength > 5 && player.perks.has("BigClit")) MainScreen.text("  Eventually it shrinks back down to its normal (but still HUGE) size.  You guess it can't get any bigger.", false);
                    if (((player.perks.has("BigClit")) && player.lowerBody.vaginaSpot.list[0].clitLength < 6)
                        || player.lowerBody.vaginaSpot.list[0].clitLength < 3) {
                        temp += 2;
                        player.lowerBody.vaginaSpot.list[0].clitLength += (Utils.rand(4) + 2) / 10;
                    }
                    dynStats("sen", 3, "lus", 8);
                }
                else {
                    player.createVagina();
                    player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.TIGHT;
                    player.vaginas[0].vaginalWetness = VAGINA_WETNESS.NORMAL;
                    player.vaginas[0].virgin = true;
                    player.lowerBody.vaginaSpot.list[0].clitLength = .25;
                    MainScreen.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + vaginaDescript(0) + "</b>!", false);
                }
            }
            else {
                temp = Utils.rand(10);
                if (temp == 0) player.skinTone = "shiny black";
                if (temp == 1 || temp == 2) player.skinTone = "indigo";
                if (temp == 3 || temp == 4 || temp == 5) player.skinTone = "purple";
                if (temp > 5) player.skinTone = "blue";
                MainScreen.text("\n\nA tingling sensation runs across your skin in waves, growing stronger as <b>your skin's tone slowly shifts, darkening to become " + player.skinTone + " in color.</b>", false);
                if (tainted) dynStats("cor", 1);
                else dynStats("cor", 0);
            }
        }
        //Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && tainted) demonChanges(player);
        if (tainted) {
            MainScreen.text(player.modFem(100, 2), false);
            if (Utils.rand(3) == 0) MainScreen.text(player.modTone(15, 2), false);
        }
        else {
            MainScreen.text(player.modFem(90, 1), false);
            if (Utils.rand(3) == 0) MainScreen.text(player.modTone(20, 2), false);
        }
        player.genderCheck();
    }
}