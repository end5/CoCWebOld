import Consumable from './Consumable';
import GenericTransforms from './GenericTransforms';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import BreastModifier from '../../Modifiers/BreastModifiers';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class SuccubiMilk extends Consumable {
    public readonly tainted: boolean;

    public constructor(tainted: boolean) {
        if (tainted)
            super("SucMilk", "SucMilk", "a bottle of Succubi milk", SuccubiMilk.DefaultValue, "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"");
        else
            super("P.S.Mlk", "P.S.Mlk", "an untainted bottle of Succubi milk", 20, "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"  Purified by Rathazul to prevent corruption.");
        this.tainted = tainted;
    }

    public use(player: Player) {
        player.slimeFeed();
        let chance: number = Utils.rand(100);
        if (player.perks.has("HistoryAlchemist")) chance += 10;
        if (chance >= 90 && !this.tainted) chance -= 10;
        if (player.stats.cor < 35) MainScreen.text("You wonder why in the gods' names you would drink such a thing, but you have to admit, it is the best thing you have ever tasted.", true);
        if (player.stats.cor >= 35 && player.stats.cor < 70) {
            MainScreen.text("You savor the incredible flavor as you greedily gulp it down.", true);
            if (player.gender == 2 || player.gender == 3) {
                MainScreen.text("  The taste alone makes your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " feel ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) MainScreen.text("tingly.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.NORMAL) MainScreen.text("wet.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.WET) MainScreen.text("sloppy and wet.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLICK) MainScreen.text("sopping and juicy.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.DROOLING) MainScreen.text("dripping wet.", false);
            }
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  You feel a building arousal, but it doesn't affect your cock.", false);
        }
        if (player.stats.cor >= 70) {
            MainScreen.text("You pour the milk down your throat, chugging the stuff as fast as you can.  You want more.", true);
            if (player.gender == 2 || player.gender == 3) {
                MainScreen.text("  Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)), false);
                if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text(" quiver in orgasm, ", false);
                if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text(" quivers in orgasm, ", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) MainScreen.text("becoming slightly sticky.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.NORMAL) MainScreen.text("leaving your undergarments sticky.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.WET) MainScreen.text("wet with girlcum.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLICK) MainScreen.text("staining your undergarments with cum.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DROOLING) MainScreen.text("leaving cunt-juice trickling down your leg.", false);
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.SLAVERING) MainScreen.text("spraying your undergarments liberally with slick girl-cum.", false);
                player.orgasm();
            }
            else if (player.gender != 0) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(player) + " remains unaffected.", false);
                else MainScreen.text("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(player) + " remain unaffected.", false);
            }
        }
        if (this.tainted) {
            player.stats.spe += 1;
            player.stats.lust += 3;
            player.stats.cor += 1;
        }
        else {
            player.stats.spe += 1;
            player.stats.lust += 3;
        }
        //Breast growth (maybe cock reduction!)
        if (chance <= 75) {
            //Temp stores the level of growth...
            let breastGrowth: number = 1 + Utils.rand(3);
            if (player.upperBody.chest.count() > 0) {
                if (player.upperBody.chest.get(0).breastRating < 2 && Utils.rand(3) == 0) breastGrowth++;
                if (player.upperBody.chest.get(0).breastRating < 5 && Utils.rand(4) == 0) breastGrowth++;
                if (player.upperBody.chest.get(0).breastRating < 6 && Utils.rand(5) == 0) breastGrowth++;
            }
            MainScreen.text("\n\n", false);
            if (player.upperBody.chest.count() == 0) {
                MainScreen.text("A perfect pair of B cup breasts, complete with tiny nipples, form on your chest.", false);
                const newBreastRow: BreastRow = new BreastRow();
                newBreastRow.breasts = 2;
                newBreastRow.nipplesPerBreast = 1;
                newBreastRow.breastRating = 2;
                player.upperBody.chest.add(newBreastRow);
                MainScreen.text("\n", false);
            }
            else
                BreastModifier.growTopBreastRow(player, breastGrowth, player.upperBody.chest.count(), true);

            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                // Shrink cocks if you have them.
                if (player.lowerBody.cockSpot.count() > 0) {
                    const longestCock: Cock = player.lowerBody.cockSpot.listLongestCocks[0];
                    let lengthenAmount: number = 0;
                    //Shrink said cock
                    if (longestCock.cockLength < 6 && longestCock.cockLength >= 2.9) {
                        longestCock.cockLength -= .5;
                        lengthenAmount -= .5;
                        if (longestCock.cockThickness * 6 > longestCock.cockLength) longestCock.cockThickness -= .2;
                        if (longestCock.cockThickness * 8 > longestCock.cockLength) longestCock.cockThickness -= .2;
                        if (longestCock.cockThickness < .5) longestCock.cockThickness = .5;
                    }
                    lengthenAmount += CockModifier.growCock(player, longestCock, (Utils.rand(3) + 1) * -1);
                    MainScreen.text("\n\n", false);
                    CreatureChange.lengthChange(player, lengthenAmount, 1);
                    if (longestCock.cockLength < 2) {
                        MainScreen.text("  ", false);
                        CockModifier.killCocks(player, 1);
                    }
                }
            }
        }
        if (player.lowerBody.vaginaSpot.count() == 0 && (Utils.rand(3) == 0 || (chance > 75 && chance < 90))) {
            const newVagina: Vagina = new Vagina();
            newVagina.vaginalLooseness = VaginaLooseness.TIGHT;
            newVagina.vaginalWetness = VaginaWetness.NORMAL;
            newVagina.virgin = true;
            newVagina.clitLength = .25;
            player.lowerBody.vaginaSpot.add(newVagina);
            if (player.fertility <= 5) player.fertility = 6;
            MainScreen.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "</b>!", false);
        }
        //Increase pussy wetness or grow one!!
        else if (chance > 75 && chance < 90) {
            //Shrink cawk
            if (player.lowerBody.cockSpot.count() > 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
                MainScreen.text("\n\n", false);
                const longestCock: Cock = player.lowerBody.cockSpot.listLongestCocks[0];
                //Shrink said cock
                if (longestCock.cockLength < 6 && longestCock.cockLength >= 2.9)
                    longestCock.cockLength -= .5;
                let lengthChange: number = CockModifier.growCock(player, longestCock, -1 * (Utils.rand(3) + 1));
                CreatureChange.lengthChange(player, lengthChange, 1);
                if (longestCock.cockLength < 3) {
                    MainScreen.text("  ", false);
                    CockModifier.killCocks(player, 1);
                }
            }
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("\n\n", false);
                //0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLAVERING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " gushes fluids down your leg as you spontaneously orgasm.", false);
                    else MainScreen.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s gush fluids down your legs as you spontaneously orgasm, leaving a thick puddle of pussy-juice on the ground.  It is rapidly absorbed by the earth.", false);
                    player.orgasm();
                    if (this.tainted) player.stats.cor += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DROOLING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("Your pussy feels hot and juicy, aroused and tender.  You cannot resist as your hands dive into your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  You quickly orgasm, squirting fluids everywhere.  <b>You are now a squirter</b>.", false);
                    if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text("Your pussies feel hot and juicy, aroused and tender.  You cannot resist plunging your hands inside your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s.  You quiver around your fingers, squirting copious fluids over yourself and the ground.  The fluids quickly disappear into the dirt.", false);
                    player.orgasm();
                    if (this.tainted) player.stats.cor += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLICK) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("You feel a sudden trickle of fluid down your leg.  You smell it and realize it's your pussy-juice.  Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " now drools lubricant constantly down your leg.", false);
                    if (player.lowerBody.vaginaSpot.count() > 1) MainScreen.text("You feel sudden trickles of fluids down your leg.  You smell the stuff and realize it's your pussies-juices.  They seem to drool lubricant constantly down your legs.", false);
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.WET) {
                    MainScreen.text("You flush in sexual arousal as you realize how moist your cunt-lips have become.  Once you've calmed down a bit you realize they're still slick and ready to fuck, and always will be.", false);
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.NORMAL) {
                    if (player.lowerBody.vaginaSpot.count() == 1) MainScreen.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " felt much wetter than normal.", false);
                    else MainScreen.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " were much wetter than normal.", false);
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) {
                    MainScreen.text("You feel a tingling in your crotch, but cannot identify it.", false);
                }
                for (let index: number = 0; index < player.lowerBody.vaginaSpot.count(); index++)
                    if (player.lowerBody.vaginaSpot.get(index).vaginalWetness < VaginaWetness.SLAVERING)
                        player.lowerBody.vaginaSpot.get(index).vaginalWetness++;
            }
        }
        if (chance >= 90) {
            if (player.skinTone == "blue" || player.skinTone == "purple" || player.skinTone == "indigo" || player.skinTone == "shiny black") {
                if (player.lowerBody.vaginaSpot.count() > 0) {
                    MainScreen.text("\n\nYour heart begins beating harder and harder as heat floods to your groin.  You feel your clit peeking out from under its hood, growing larger and longer as it takes in more and more blood.", false);
                    if (player.lowerBody.vaginaSpot.get(0).clitLength > 3 && !player.perks.has("BigClit")) MainScreen.text("  After some time it shrinks, returning to its normal aroused size.  You guess it can't get any bigger.", false);
                    if (player.lowerBody.vaginaSpot.get(0).clitLength > 5 && player.perks.has("BigClit")) MainScreen.text("  Eventually it shrinks back down to its normal (but still HUGE) size.  You guess it can't get any bigger.", false);
                    if (((player.perks.has("BigClit")) && player.lowerBody.vaginaSpot.get(0).clitLength < 6)
                        || player.lowerBody.vaginaSpot.get(0).clitLength < 3) {
                        player.lowerBody.vaginaSpot.get(0).clitLength += (Utils.rand(4) + 2) / 10;
                    }
                    player.stats.sens += 3;
                    player.stats.lust += 8;
                }
                else {
                    const newVagina: Vagina = new Vagina();
                    newVagina.vaginalLooseness = VaginaLooseness.TIGHT;
                    newVagina.vaginalWetness = VaginaWetness.NORMAL;
                    newVagina.virgin = true;
                    newVagina.clitLength = .25;
                    player.lowerBody.vaginaSpot.add(newVagina);
                    MainScreen.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "</b>!", false);
                }
            }
            else {
                let chance: number = Utils.rand(10);
                if (chance == 0) player.skinTone = "shiny black";
                if (chance == 1 || chance == 2) player.skinTone = "indigo";
                if (chance == 3 || chance == 4 || chance == 5) player.skinTone = "purple";
                if (chance > 5) player.skinTone = "blue";
                MainScreen.text("\n\nA tingling sensation runs across your skin in waves, growing stronger as <b>your skin's tone slowly shifts, darkening to become " + player.skinTone + " in color.</b>", false);
                if (this.tainted) player.stats.cor += 1;
                else player.stats.cor += 0;
            }
        }
        //Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && this.tainted) GenericTransforms.demonChanges(player);
        if (this.tainted) {
            MainScreen.text(player.modFem(100, 2), false);
            if (Utils.rand(3) == 0) MainScreen.text(player.modTone(15, 2), false);
        }
        else {
            MainScreen.text(player.modFem(90, 1), false);
            if (Utils.rand(3) == 0) MainScreen.text(player.modTone(20, 2), false);
        }
        player.updateGender();
    }
}