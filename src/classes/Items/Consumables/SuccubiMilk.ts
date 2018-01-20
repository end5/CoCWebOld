import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
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
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SuccubiMilk extends Consumable {
    public readonly tainted: boolean;

    public constructor(tainted: boolean) {
        if (tainted)
            super(ConsumableName.SuccubiMilk, new ItemDesc("SucMilk", "a bottle of Succubi milk", "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\""));
        else
            super(ConsumableName.SuccubiMilkPure, new ItemDesc("P.S.Mlk", "an untainted bottle of Succubi milk", "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"  Purified by Rathazul to prevent corruption."), 20);
        this.tainted = tainted;
    }

    public use(player: Player) {
        player.slimeFeed();
        let chance: number = Utils.rand(100);
        if (player.perks.has(PerkType.HistoryAlchemist)) chance += 10;
        if (chance >= 90 && !this.tainted) chance -= 10;
        DisplayText().clear();
        if (player.stats.cor < 35) DisplayText("You wonder why in the gods' names you would drink such a thing, but you have to admit, it is the best thing you have ever tasted.");
        if (player.stats.cor >= 35 && player.stats.cor < 70) {
            DisplayText("You savor the incredible flavor as you greedily gulp it down.");
            if (player.gender === 2 || player.gender === 3) {
                DisplayText("  The taste alone makes your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " feel ");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) DisplayText("tingly.");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.NORMAL) DisplayText("wet.");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.WET) DisplayText("sloppy and wet.");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.SLICK) DisplayText("sopping and juicy.");
                if (player.torso.vaginas.get(0).wetness >= VaginaWetness.DROOLING) DisplayText("dripping wet.");
            }
            else if (player.torso.cocks.count > 0) DisplayText("  You feel a building arousal, but it doesn't affect your cock.");
        }
        if (player.stats.cor >= 70) {
            DisplayText("You pour the milk down your throat, chugging the stuff as fast as you can.  You want more.");
            if (player.gender === 2 || player.gender === 3) {
                DisplayText("  Your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)));
                if (player.torso.vaginas.count > 1) DisplayText(" quiver in orgasm, ");
                if (player.torso.vaginas.count === 1) DisplayText(" quivers in orgasm, ");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) DisplayText("becoming slightly sticky.");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.NORMAL) DisplayText("leaving your undergarments sticky.");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.WET) DisplayText("wet with girlcum.");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.SLICK) DisplayText("staining your undergarments with cum.");
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.DROOLING) DisplayText("leaving cunt-juice trickling down your leg.");
                if (player.torso.vaginas.get(0).wetness >= VaginaWetness.SLAVERING) DisplayText("spraying your undergarments liberally with slick girl-cum.");
                player.orgasm();
            }
            else if (player.gender !== 0) {
                if (player.torso.cocks.count === 1) DisplayText("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(player) + " remains unaffected.");
                else DisplayText("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(player) + " remain unaffected.");
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
        // Breast growth (maybe cock reduction!)
        if (chance <= 75) {
            // Temp stores the level of growth...
            let breastGrowth: number = 1 + Utils.rand(3);
            if (player.torso.chest.count > 0) {
                if (player.torso.chest.get(0).rating < 2 && Utils.rand(3) === 0) breastGrowth++;
                if (player.torso.chest.get(0).rating < 5 && Utils.rand(4) === 0) breastGrowth++;
                if (player.torso.chest.get(0).rating < 6 && Utils.rand(5) === 0) breastGrowth++;
            }
            DisplayText("\n\n");
            if (player.torso.chest.count === 0) {
                DisplayText("A perfect pair of B cup breasts, complete with tiny nipples, form on your chest.");
                const newBreastRow: BreastRow = new BreastRow();
                newBreastRow.nipples.count = 1;
                newBreastRow.rating = 2;
                player.torso.chest.add(newBreastRow);
                DisplayText("\n");
            }
            else
                BreastModifier.growTopBreastRow(player, breastGrowth, player.torso.chest.count, true);

            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                // Shrink cocks if you have them.
                if (player.torso.cocks.count > 0) {
                    const longestCock: Cock = player.torso.cocks.sort(Cock.LongestCocks)[0];
                    let lengthenAmount: number = 0;
                    // Shrink said cock
                    if (longestCock.length < 6 && longestCock.length >= 2.9) {
                        longestCock.length -= .5;
                        lengthenAmount -= .5;
                        if (longestCock.thickness * 6 > longestCock.length) longestCock.thickness -= .2;
                        if (longestCock.thickness * 8 > longestCock.length) longestCock.thickness -= .2;
                        if (longestCock.thickness < .5) longestCock.thickness = .5;
                    }
                    lengthenAmount += CockModifier.growCock(player, longestCock, (Utils.rand(3) + 1) * -1);
                    DisplayText("\n\n");
                    CockModifier.displayLengthChange(player, lengthenAmount, 1);
                    if (longestCock.length < 2) {
                        DisplayText("  ");
                        CockModifier.displayKillCocks(player, 1);
                    }
                }
            }
        }
        if (player.torso.vaginas.count === 0 && (Utils.rand(3) === 0 || (chance > 75 && chance < 90))) {
            const newVagina: Vagina = new Vagina();
            newVagina.looseness = VaginaLooseness.TIGHT;
            newVagina.wetness = VaginaWetness.NORMAL;
            newVagina.virgin = true;
            player.torso.vaginas.add(newVagina);
            if (player.fertility <= 5) player.fertility = 6;
            DisplayText("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "</b>!");
        }
        // Increase pussy wetness or grow one!!
        else if (chance > 75 && chance < 90) {
            // Shrink cawk
            if (player.torso.cocks.count > 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
                DisplayText("\n\n");
                const longestCock = player.torso.cocks.sort(Cock.LongestCocks)[0];
                // Shrink said cock
                if (longestCock.length < 6 && longestCock.length >= 2.9)
                    longestCock.length -= .5;
                const lengthChange: number = CockModifier.growCock(player, longestCock, -1 * (Utils.rand(3) + 1));
                CockModifier.displayLengthChange(player, lengthChange, 1);
                if (longestCock.length < 3) {
                    DisplayText("  ");
                    CockModifier.displayKillCocks(player, 1);
                }
            }
            if (player.torso.vaginas.count > 0) {
                DisplayText("\n\n");
                // 0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.SLAVERING) {
                    if (player.torso.vaginas.count === 1) DisplayText("Your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " gushes fluids down your leg as you spontaneously orgasm.");
                    else DisplayText("Your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "s gush fluids down your legs as you spontaneously orgasm, leaving a thick puddle of pussy-juice on the ground.  It is rapidly absorbed by the earth.");
                    player.orgasm();
                    if (this.tainted) player.stats.cor += 1;
                }
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.DROOLING) {
                    if (player.torso.vaginas.count === 1) DisplayText("Your pussy feels hot and juicy, aroused and tender.  You cannot resist as your hands dive into your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  You quickly orgasm, squirting fluids everywhere.  <b>You are now a squirter</b>.");
                    if (player.torso.vaginas.count > 1) DisplayText("Your pussies feel hot and juicy, aroused and tender.  You cannot resist plunging your hands inside your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "s.  You quiver around your fingers, squirting copious fluids over yourself and the ground.  The fluids quickly disappear into the dirt.");
                    player.orgasm();
                    if (this.tainted) player.stats.cor += 1;
                }
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.SLICK) {
                    if (player.torso.vaginas.count === 1) DisplayText("You feel a sudden trickle of fluid down your leg.  You smell it and realize it's your pussy-juice.  Your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " now drools lubricant constantly down your leg.");
                    if (player.torso.vaginas.count > 1) DisplayText("You feel sudden trickles of fluids down your leg.  You smell the stuff and realize it's your pussies-juices.  They seem to drool lubricant constantly down your legs.");
                }
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.WET) {
                    DisplayText("You flush in sexual arousal as you realize how moist your cunt-lips have become.  Once you've calmed down a bit you realize they're still slick and ready to fuck, and always will be.");
                }
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.NORMAL) {
                    if (player.torso.vaginas.count === 1) DisplayText("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " felt much wetter than normal.");
                    else DisplayText("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " were much wetter than normal.");
                }
                if (player.torso.vaginas.get(0).wetness === VaginaWetness.DRY) {
                    DisplayText("You feel a tingling in your crotch, but cannot identify it.");
                }
                for (let index: number = 0; index < player.torso.vaginas.count; index++)
                    if (player.torso.vaginas.get(index).wetness < VaginaWetness.SLAVERING)
                        player.torso.vaginas.get(index).wetness++;
            }
        }
        if (chance >= 90) {
            if (player.skin.tone === "blue" || player.skin.tone === "purple" || player.skin.tone === "indigo" || player.skin.tone === "shiny black") {
                if (player.torso.vaginas.count > 0) {
                    DisplayText("\n\nYour heart begins beating harder and harder as heat floods to your groin.  You feel your clit peeking out from under its hood, growing larger and longer as it takes in more and more blood.");
                    if (player.torso.clit.length > 3 && !player.perks.has(PerkType.BigClit)) DisplayText("  After some time it shrinks, returning to its normal aroused size.  You guess it can't get any bigger.");
                    if (player.torso.clit.length > 5 && player.perks.has(PerkType.BigClit)) DisplayText("  Eventually it shrinks back down to its normal (but still HUGE) size.  You guess it can't get any bigger.");
                    if (((player.perks.has(PerkType.BigClit)) && player.torso.clit.length < 6)
                        || player.torso.clit.length < 3) {
                        player.torso.clit.length += (Utils.rand(4) + 2) / 10;
                    }
                    player.stats.sens += 3;
                    player.stats.lust += 8;
                }
                else {
                    const newVagina: Vagina = new Vagina();
                    newVagina.looseness = VaginaLooseness.TIGHT;
                    newVagina.wetness = VaginaWetness.NORMAL;
                    newVagina.virgin = true;
                    player.torso.vaginas.add(newVagina);
                    DisplayText("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "</b>!");
                }
            }
            else {
                const randomSkinColor: number = Utils.rand(10);
                if (randomSkinColor === 0) player.skin.tone = "shiny black";
                if (randomSkinColor === 1 || randomSkinColor === 2) player.skin.tone = "indigo";
                if (randomSkinColor === 3 || randomSkinColor === 4 || randomSkinColor === 5) player.skin.tone = "purple";
                if (randomSkinColor > 5) player.skin.tone = "blue";
                DisplayText("\n\nA tingling sensation runs across your skin in waves, growing stronger as <b>your skin's tone slowly shifts, darkening to become " + player.skin.tone + " in color.</b>");
                if (this.tainted) player.stats.cor += 1;
                else player.stats.cor += 0;
            }
        }
        // Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && this.tainted) GenericTransforms.demonChanges(player);
        if (this.tainted) {
            DisplayText(BodyModifier.displayModFem(player, 100, 2));
            if (Utils.rand(3) === 0) DisplayText(BodyModifier.displayModTone(player, 15, 2));
        }
        else {
            DisplayText(BodyModifier.displayModFem(player, 90, 1));
            if (Utils.rand(3) === 0) DisplayText(BodyModifier.displayModTone(player, 20, 2));
        }
        player.updateGender();
    }
}
