import Consumable from './Consumable';
import GenericTransforms from './GenericTransforms';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import BreastModifier from '../../Modifiers/BreastModifier';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SuccubiMilk extends Consumable {
    public readonly tainted: boolean;

    public constructor(tainted: boolean) {
        if (tainted)
            super("SucMilk", new ItemDesc("SucMilk", "a bottle of Succubi milk", "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\""));
        else
            super("P.S.Mlk", new ItemDesc("P.S.Mlk", "an untainted bottle of Succubi milk", "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"  Purified by Rathazul to prevent corruption."), 20);
        this.tainted = tainted;
    }

    public use(player: Player) {
        player.slimeFeed();
        let chance: number = Utils.rand(100);
        if (player.perks.has(PerkType.HistoryAlchemist)) chance += 10;
        if (chance >= 90 && !this.tainted) chance -= 10;
        DisplayText.clear();
        if (player.stats.cor < 35) DisplayText.text("You wonder why in the gods' names you would drink such a thing, but you have to admit, it is the best thing you have ever tasted.");
        if (player.stats.cor >= 35 && player.stats.cor < 70) {
            DisplayText.text("You savor the incredible flavor as you greedily gulp it down.");
            if (player.gender == 2 || player.gender == 3) {
                DisplayText.text("  The taste alone makes your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " feel ");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) DisplayText.text("tingly.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.NORMAL) DisplayText.text("wet.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.WET) DisplayText.text("sloppy and wet.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLICK) DisplayText.text("sopping and juicy.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.DROOLING) DisplayText.text("dripping wet.");
            }
            else if (player.lowerBody.cockSpot.hasCock()) DisplayText.text("  You feel a building arousal, but it doesn't affect your cock.");
        }
        if (player.stats.cor >= 70) {
            DisplayText.text("You pour the milk down your throat, chugging the stuff as fast as you can.  You want more.");
            if (player.gender == 2 || player.gender == 3) {
                DisplayText.text("  Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
                if (player.lowerBody.vaginaSpot.count() > 1) DisplayText.text(" quiver in orgasm, ");
                if (player.lowerBody.vaginaSpot.count() == 1) DisplayText.text(" quivers in orgasm, ");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) DisplayText.text("becoming slightly sticky.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.NORMAL) DisplayText.text("leaving your undergarments sticky.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.WET) DisplayText.text("wet with girlcum.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLICK) DisplayText.text("staining your undergarments with cum.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DROOLING) DisplayText.text("leaving cunt-juice trickling down your leg.");
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= VaginaWetness.SLAVERING) DisplayText.text("spraying your undergarments liberally with slick girl-cum.");
                player.orgasm();
            }
            else if (player.gender != 0) {
                if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(player) + " remains unaffected.");
                else DisplayText.text("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(player) + " remain unaffected.");
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
            DisplayText.text("\n\n");
            if (player.upperBody.chest.count() == 0) {
                DisplayText.text("A perfect pair of B cup breasts, complete with tiny nipples, form on your chest.");
                const newBreastRow: BreastRow = new BreastRow();
                newBreastRow.breasts = 2;
                newBreastRow.nipplesPerBreast = 1;
                newBreastRow.breastRating = 2;
                player.upperBody.chest.add(newBreastRow);
                DisplayText.text("\n");
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
                    DisplayText.text("\n\n");
                    CockModifier.displayLengthChange(player, lengthenAmount, 1);
                    if (longestCock.cockLength < 2) {
                        DisplayText.text("  ");
                        CockModifier.displayKillCocks(player, 1);
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
            DisplayText.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "</b>!");
        }
        //Increase pussy wetness or grow one!!
        else if (chance > 75 && chance < 90) {
            //Shrink cawk
            if (player.lowerBody.cockSpot.count() > 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
                DisplayText.text("\n\n");
                const longestCock: Cock = player.lowerBody.cockSpot.listLongestCocks[0];
                //Shrink said cock
                if (longestCock.cockLength < 6 && longestCock.cockLength >= 2.9)
                    longestCock.cockLength -= .5;
                let lengthChange: number = CockModifier.growCock(player, longestCock, -1 * (Utils.rand(3) + 1));
                CockModifier.displayLengthChange(player, lengthChange, 1);
                if (longestCock.cockLength < 3) {
                    DisplayText.text("  ");
                    CockModifier.displayKillCocks(player, 1);
                }
            }
            if (player.lowerBody.vaginaSpot.count() > 0) {
                DisplayText.text("\n\n");
                //0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLAVERING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) DisplayText.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " gushes fluids down your leg as you spontaneously orgasm.");
                    else DisplayText.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s gush fluids down your legs as you spontaneously orgasm, leaving a thick puddle of pussy-juice on the ground.  It is rapidly absorbed by the earth.");
                    player.orgasm();
                    if (this.tainted) player.stats.cor += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DROOLING) {
                    if (player.lowerBody.vaginaSpot.count() == 1) DisplayText.text("Your pussy feels hot and juicy, aroused and tender.  You cannot resist as your hands dive into your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  You quickly orgasm, squirting fluids everywhere.  <b>You are now a squirter</b>.");
                    if (player.lowerBody.vaginaSpot.count() > 1) DisplayText.text("Your pussies feel hot and juicy, aroused and tender.  You cannot resist plunging your hands inside your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s.  You quiver around your fingers, squirting copious fluids over yourself and the ground.  The fluids quickly disappear into the dirt.");
                    player.orgasm();
                    if (this.tainted) player.stats.cor += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.SLICK) {
                    if (player.lowerBody.vaginaSpot.count() == 1) DisplayText.text("You feel a sudden trickle of fluid down your leg.  You smell it and realize it's your pussy-juice.  Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " now drools lubricant constantly down your leg.");
                    if (player.lowerBody.vaginaSpot.count() > 1) DisplayText.text("You feel sudden trickles of fluids down your leg.  You smell the stuff and realize it's your pussies-juices.  They seem to drool lubricant constantly down your legs.");
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.WET) {
                    DisplayText.text("You flush in sexual arousal as you realize how moist your cunt-lips have become.  Once you've calmed down a bit you realize they're still slick and ready to fuck, and always will be.");
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.NORMAL) {
                    if (player.lowerBody.vaginaSpot.count() == 1) DisplayText.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " felt much wetter than normal.");
                    else DisplayText.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " were much wetter than normal.");
                }
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) {
                    DisplayText.text("You feel a tingling in your crotch, but cannot identify it.");
                }
                for (let index: number = 0; index < player.lowerBody.vaginaSpot.count(); index++)
                    if (player.lowerBody.vaginaSpot.get(index).vaginalWetness < VaginaWetness.SLAVERING)
                        player.lowerBody.vaginaSpot.get(index).vaginalWetness++;
            }
        }
        if (chance >= 90) {
            if (player.skinTone == "blue" || player.skinTone == "purple" || player.skinTone == "indigo" || player.skinTone == "shiny black") {
                if (player.lowerBody.vaginaSpot.count() > 0) {
                    DisplayText.text("\n\nYour heart begins beating harder and harder as heat floods to your groin.  You feel your clit peeking out from under its hood, growing larger and longer as it takes in more and more blood.");
                    if (player.lowerBody.vaginaSpot.get(0).clitLength > 3 && !player.perks.has(PerkType.BigClit)) DisplayText.text("  After some time it shrinks, returning to its normal aroused size.  You guess it can't get any bigger.");
                    if (player.lowerBody.vaginaSpot.get(0).clitLength > 5 && player.perks.has(PerkType.BigClit)) DisplayText.text("  Eventually it shrinks back down to its normal (but still HUGE) size.  You guess it can't get any bigger.");
                    if (((player.perks.has(PerkType.BigClit)) && player.lowerBody.vaginaSpot.get(0).clitLength < 6)
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
                    DisplayText.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "</b>!");
                }
            }
            else {
                let chance: number = Utils.rand(10);
                if (chance == 0) player.skinTone = "shiny black";
                if (chance == 1 || chance == 2) player.skinTone = "indigo";
                if (chance == 3 || chance == 4 || chance == 5) player.skinTone = "purple";
                if (chance > 5) player.skinTone = "blue";
                DisplayText.text("\n\nA tingling sensation runs across your skin in waves, growing stronger as <b>your skin's tone slowly shifts, darkening to become " + player.skinTone + " in color.</b>");
                if (this.tainted) player.stats.cor += 1;
                else player.stats.cor += 0;
            }
        }
        //Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && this.tainted) GenericTransforms.demonChanges(player);
        if (this.tainted) {
            DisplayText.text(player.modFem(100, 2));
            if (Utils.rand(3) == 0) DisplayText.text(BodyModifier.displayModTone(player, 15, 2));
        }
        else {
            DisplayText.text(player.modFem(90, 1));
            if (Utils.rand(3) == 0) DisplayText.text(BodyModifier.displayModTone(player, 20, 2));
        }
        player.updateGender();
    }
}