import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import GenericTransforms from './GenericTransforms';
import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import Character from '../../Character/Character';
import * as CockDescriptor from '../../Descriptors/CockDescriptor';
import * as VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import { PerkType } from '../../Effects/PerkType';
import * as BodyModifier from '../../Modifiers/BodyModifier';
import * as BreastModifier from '../../Modifiers/BreastModifier';
import * as CockModifier from '../../Modifiers/CockModifier';
import User from '../../User';
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

    public use(character: Character) {
        // character.slimeFeed();
        let chance: number = randInt(100);
        if (character.perks.has(PerkType.HistoryAlchemist)) chance += 10;
        if (chance >= 90 && !this.tainted) chance -= 10;
        DisplayText().clear();
        if (character.stats.cor < 35) DisplayText("You wonder why in the gods' names you would drink such a thing, but you have to admit, it is the best thing you have ever tasted.");
        if (character.stats.cor >= 35 && character.stats.cor < 70) {
            DisplayText("You savor the incredible flavor as you greedily gulp it down.");
            if (character.gender === 2 || character.gender === 3) {
                DisplayText("  The taste alone makes your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " feel ");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.DRY) DisplayText("tingly.");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.NORMAL) DisplayText("wet.");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.WET) DisplayText("sloppy and wet.");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.SLICK) DisplayText("sopping and juicy.");
                if (character.torso.vaginas.get(0).wetness >= VaginaWetness.DROOLING) DisplayText("dripping wet.");
            }
            else if (character.torso.cocks.count > 0) DisplayText("  You feel a building arousal, but it doesn't affect your cock.");
        }
        if (character.stats.cor >= 70) {
            DisplayText("You pour the milk down your throat, chugging the stuff as fast as you can.  You want more.");
            if (character.gender === 2 || character.gender === 3) {
                DisplayText("  Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)));
                if (character.torso.vaginas.count > 1) DisplayText(" quiver in orgasm, ");
                if (character.torso.vaginas.count === 1) DisplayText(" quivers in orgasm, ");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.DRY) DisplayText("becoming slightly sticky.");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.NORMAL) DisplayText("leaving your undergarments sticky.");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.WET) DisplayText("wet with girlcum.");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.SLICK) DisplayText("staining your undergarments with cum.");
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.DROOLING) DisplayText("leaving cunt-juice trickling down your leg.");
                if (character.torso.vaginas.get(0).wetness >= VaginaWetness.SLAVERING) DisplayText("spraying your undergarments liberally with slick girl-cum.");
                character.orgasm();
            }
            else if (character.gender !== 0) {
                if (character.torso.cocks.count === 1) DisplayText("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(character) + " remains unaffected.");
                else DisplayText("  You feel a strange sexual pleasure, but your " + CockDescriptor.describeMultiCock(character) + " remain unaffected.");
            }
        }
        if (this.tainted) {
            character.stats.spe += 1;
            character.stats.lust += 3;
            character.stats.cor += 1;
        }
        else {
            character.stats.spe += 1;
            character.stats.lust += 3;
        }
        // Breast growth (maybe cock reduction!)
        if (chance <= 75) {
            // Temp stores the level of growth...
            let breastGrowth: number = 1 + randInt(3);
            if (character.torso.chest.count > 0) {
                if (character.torso.chest.get(0).rating < 2 && randInt(3) === 0) breastGrowth++;
                if (character.torso.chest.get(0).rating < 5 && randInt(4) === 0) breastGrowth++;
                if (character.torso.chest.get(0).rating < 6 && randInt(5) === 0) breastGrowth++;
            }
            DisplayText("\n\n");
            if (character.torso.chest.count === 0) {
                DisplayText("A perfect pair of B cup breasts, complete with tiny nipples, form on your chest.");
                const newBreastRow: BreastRow = new BreastRow();
                newBreastRow.nipples.count = 1;
                newBreastRow.rating = 2;
                character.torso.chest.add(newBreastRow);
                DisplayText("\n");
            }
            else
                BreastModifier.growTopBreastRow(character, breastGrowth, character.torso.chest.count, true);

            if (!User.settings.hyperHappy) {
                // Shrink cocks if you have them.
                if (character.torso.cocks.count > 0) {
                    const longestCock: Cock = character.torso.cocks.sort(Cock.LongestCocks)[0];
                    let lengthenAmount: number = 0;
                    // Shrink said cock
                    if (longestCock.length < 6 && longestCock.length >= 2.9) {
                        longestCock.length -= .5;
                        lengthenAmount -= .5;
                        if (longestCock.thickness * 6 > longestCock.length) longestCock.thickness -= .2;
                        if (longestCock.thickness * 8 > longestCock.length) longestCock.thickness -= .2;
                        if (longestCock.thickness < .5) longestCock.thickness = .5;
                    }
                    lengthenAmount += CockModifier.growCock(character, longestCock, (randInt(3) + 1) * -1);
                    DisplayText("\n\n");
                    CockModifier.displayLengthChange(character, lengthenAmount, 1);
                    if (longestCock.length < 2) {
                        DisplayText("  ");
                        CockModifier.displayKillCocks(character, 1);
                    }
                }
            }
        }
        if (character.torso.vaginas.count === 0 && (randInt(3) === 0 || (chance > 75 && chance < 90))) {
            const newVagina: Vagina = new Vagina();
            newVagina.looseness = VaginaLooseness.TIGHT;
            newVagina.wetness = VaginaWetness.NORMAL;
            newVagina.virgin = true;
            character.torso.vaginas.add(newVagina);
            if (character.fertility <= 5) character.fertility = 6;
            DisplayText("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + "</b>!");
        }
        // Increase pussy wetness or grow one!!
        else if (chance > 75 && chance < 90) {
            // Shrink cawk
            if (character.torso.cocks.count > 0 && !User.settings.hyperHappy) {
                DisplayText("\n\n");
                const longestCock = character.torso.cocks.sort(Cock.LongestCocks)[0];
                // Shrink said cock
                if (longestCock.length < 6 && longestCock.length >= 2.9)
                    longestCock.length -= .5;
                const lengthChange: number = CockModifier.growCock(character, longestCock, -1 * (randInt(3) + 1));
                CockModifier.displayLengthChange(character, lengthChange, 1);
                if (longestCock.length < 3) {
                    DisplayText("  ");
                    CockModifier.displayKillCocks(character, 1);
                }
            }
            if (character.torso.vaginas.count > 0) {
                DisplayText("\n\n");
                // 0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.SLAVERING) {
                    if (character.torso.vaginas.count === 1) DisplayText("Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " gushes fluids down your leg as you spontaneously orgasm.");
                    else DisplayText("Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + "s gush fluids down your legs as you spontaneously orgasm, leaving a thick puddle of pussy-juice on the ground.  It is rapidly absorbed by the earth.");
                    character.orgasm();
                    if (this.tainted) character.stats.cor += 1;
                }
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.DROOLING) {
                    if (character.torso.vaginas.count === 1) DisplayText("Your pussy feels hot and juicy, aroused and tender.  You cannot resist as your hands dive into your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ".  You quickly orgasm, squirting fluids everywhere.  <b>You are now a squirter</b>.");
                    if (character.torso.vaginas.count > 1) DisplayText("Your pussies feel hot and juicy, aroused and tender.  You cannot resist plunging your hands inside your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + "s.  You quiver around your fingers, squirting copious fluids over yourself and the ground.  The fluids quickly disappear into the dirt.");
                    character.orgasm();
                    if (this.tainted) character.stats.cor += 1;
                }
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.SLICK) {
                    if (character.torso.vaginas.count === 1) DisplayText("You feel a sudden trickle of fluid down your leg.  You smell it and realize it's your pussy-juice.  Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " now drools lubricant constantly down your leg.");
                    if (character.torso.vaginas.count > 1) DisplayText("You feel sudden trickles of fluids down your leg.  You smell the stuff and realize it's your pussies-juices.  They seem to drool lubricant constantly down your legs.");
                }
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.WET) {
                    DisplayText("You flush in sexual arousal as you realize how moist your cunt-lips have become.  Once you've calmed down a bit you realize they're still slick and ready to fuck, and always will be.");
                }
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.NORMAL) {
                    if (character.torso.vaginas.count === 1) DisplayText("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " felt much wetter than normal.");
                    else DisplayText("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " were much wetter than normal.");
                }
                if (character.torso.vaginas.get(0).wetness === VaginaWetness.DRY) {
                    DisplayText("You feel a tingling in your crotch, but cannot identify it.");
                }
                for (let index: number = 0; index < character.torso.vaginas.count; index++)
                    if (character.torso.vaginas.get(index).wetness < VaginaWetness.SLAVERING)
                        character.torso.vaginas.get(index).wetness++;
            }
        }
        if (chance >= 90) {
            if (character.skin.tone === "blue" || character.skin.tone === "purple" || character.skin.tone === "indigo" || character.skin.tone === "shiny black") {
                if (character.torso.vaginas.count > 0) {
                    DisplayText("\n\nYour heart begins beating harder and harder as heat floods to your groin.  You feel your clit peeking out from under its hood, growing larger and longer as it takes in more and more blood.");
                    if (character.torso.clit.length > 3 && !character.perks.has(PerkType.BigClit)) DisplayText("  After some time it shrinks, returning to its normal aroused size.  You guess it can't get any bigger.");
                    if (character.torso.clit.length > 5 && character.perks.has(PerkType.BigClit)) DisplayText("  Eventually it shrinks back down to its normal (but still HUGE) size.  You guess it can't get any bigger.");
                    if (((character.perks.has(PerkType.BigClit)) && character.torso.clit.length < 6)
                        || character.torso.clit.length < 3) {
                        character.torso.clit.length += (randInt(4) + 2) / 10;
                    }
                    character.stats.sens += 3;
                    character.stats.lust += 8;
                }
                else {
                    const newVagina: Vagina = new Vagina();
                    newVagina.looseness = VaginaLooseness.TIGHT;
                    newVagina.wetness = VaginaWetness.NORMAL;
                    newVagina.virgin = true;
                    character.torso.vaginas.add(newVagina);
                    DisplayText("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + "</b>!");
                }
            }
            else {
                const randomSkinColor: number = randInt(10);
                if (randomSkinColor === 0) character.skin.tone = "shiny black";
                if (randomSkinColor === 1 || randomSkinColor === 2) character.skin.tone = "indigo";
                if (randomSkinColor === 3 || randomSkinColor === 4 || randomSkinColor === 5) character.skin.tone = "purple";
                if (randomSkinColor > 5) character.skin.tone = "blue";
                DisplayText("\n\nA tingling sensation runs across your skin in waves, growing stronger as <b>your skin's tone slowly shifts, darkening to become " + character.skin.tone + " in color.</b>");
                if (this.tainted) character.stats.cor += 1;
                else character.stats.cor += 0;
            }
        }
        // Demonic changes - higher chance with higher corruption.
        if (randInt(40) + character.stats.cor / 3 > 35 && this.tainted) GenericTransforms.demonChanges(character);
        if (this.tainted) {
            DisplayText(BodyModifier.displayModFem(character, 100, 2));
            if (randInt(3) === 0) DisplayText(BodyModifier.displayModTone(character, 15, 2));
        }
        else {
            DisplayText(BodyModifier.displayModFem(character, 90, 1));
            if (randInt(3) === 0) DisplayText(BodyModifier.displayModTone(character, 20, 2));
        }
        character.updateGender();
    }
}
