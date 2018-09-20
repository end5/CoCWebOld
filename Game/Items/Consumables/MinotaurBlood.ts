import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { ArmType } from '../../Body/Arms';
import { BreastRow } from '../../Body/BreastRow';
import { Cock, CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { Tail, TailType } from '../../Body/Tail';
import { VaginaLooseness } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { Mod } from '../../Modifiers/Modifiers';
import { User } from '../../User';
import { ItemDesc } from '../ItemDesc';
import { describeBalls, describeSack } from '../../Descriptors/BallsDescriptor';
import { describeFeet } from '../../Descriptors/LegDescriptor';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { describeBreastRow, describeNipple, breastCup } from '../../Descriptors/BreastDescriptor';
import { describeCock, nounCock } from '../../Descriptors/CockDescriptor';
import { describeButt } from '../../Descriptors/ButtDescriptor';

export class MinotaurBlood extends Consumable {
    public constructor() {
        super(ConsumableName.MinotaurBlood, new ItemDesc("MinoBlo", "a vial of Minotaur blood", "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape."));
    }

    public use(character: Character) {
        character.slimeFeed();
        const chest = character.body.chest;
        const vaginas = character.body.vaginas;
        const cocks = character.body.cocks;

        // Changes done
        let changes: number = 0;
        // Change limit
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        if (changeLimit === 1) changeLimit = 2;
        // Set up output
        DisplayText().clear();
        DisplayText("You drink the bubbling red fluid, tasting the tangy iron after-taste.");
        // STATS
        // Strength h
        if (randInt(3) === 0 && changes < changeLimit) {
            // weaker characters gain more
            if (character.stats.str <= 50) {
                DisplayText("\n\nPainful aches ripple through your body, flooding you with pain as your muscles flex and bulge, growing much stronger and more well-defined.");
                // very weak characters gain more
                if (character.stats.str <= 20) character.stats.str += 3;
                else character.stats.str += 2;
            }
            // stronger characters gain less
            else {
                // small growth if over 75
                if (character.stats.str >= 75) character.stats.str += .5;
                // faster from 50-75
                else character.stats.str += 1;
                DisplayText("\n\nYour muscles grow tighter, bulging outwards powerfully as you get even stronger!");
            }
            // Chance of speed drop
            if (randInt(2) === 0 && character.stats.str > 50) {
                DisplayText("\n\nYou begin to feel that the size of your muscles is starting to slow you down.");
                character.stats.spe += -1;
            }
            changes++;
        }
        // Toughness (chance of - sensitivity)
        if (randInt(3) === 0 && changes < changeLimit) {
            // weaker characters gain more
            if (character.stats.tou <= 50) {
                DisplayText("\n\nYour hide... skin... whatever... you can feel it getting tougher as it thickens perceptibly.");
                // very weak characters gain more
                if (character.stats.tou <= 20) character.stats.tou += 3;
                else character.stats.tou += 2;
            }
            // stronger characters gain less
            else {
                // small growth if over 75
                if (character.stats.tou >= 75) character.stats.tou += .5;
                // faster from 50-75
                else character.stats.tou += 1;
                DisplayText("\n\nYour tough hide grows slightly thicker.");
            }
            // chance of less sensitivity
            if (randInt(2) === 0 && character.stats.sens > 10) {
                if (character.stats.tou > 75) {
                    DisplayText("\n\nIt becomes much harder to feel anything through your leathery skin.");
                    character.stats.sens += -3;
                }
                if (character.stats.tou <= 75 && character.stats.tou > 50) {
                    DisplayText("\n\nThe level of sensation from your skin diminishes noticeably.");
                    character.stats.sens += -2;
                }
                if (character.stats.tou <= 50) {
                    DisplayText("\n\nYour sense of touch diminishes due to your tougher hide.");
                    character.stats.sens += -3;
                }
            }
            changes++;
        }
        // SEXUAL
        // Boosts ball size MORE than equinum :D:D:D:D:D:D:
        if (changes < changeLimit && randInt(2) === 0 && character.body.balls.size <= 5 && cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) {
            // Chance of ball growth if not 3" yet
            if (character.body.balls.count === 0) {
                character.body.balls.count = 2;
                character.body.balls.size = 1;
                DisplayText("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.");
                character.stats.lib += 2;
                character.stats.lust += 5;
            }
            else {
                character.body.balls.size++;
                if (character.body.balls.size <= 2) DisplayText("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + describeBalls(false, true, character) + " have grown larger than a human's.");
                if (character.body.balls.size > 2) DisplayText("\n\nA sudden onset of heat envelops your groin, focusing on your " + describeSack(character) + ".  Walking becomes difficult as you discover your " + describeBalls(false, true, character) + " have enlarged again.");
                character.stats.lib += 1;
                character.stats.lust += 3;
            }
            changes++;
        }
        // -Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && character.body.arms.type === ArmType.HARPY && randInt(4) === 0) {
            DisplayText("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + character.body.skin.desc + " behind.");
            character.body.arms.type = ArmType.HUMAN;
            changes++;
        }
        // -Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && character.body.arms.type === ArmType.SPIDER && randInt(4) === 0) {
            DisplayText("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + character.body.skin.desc + " behind.");
            character.body.arms.type = ArmType.HUMAN;
            changes++;
        }
        // +hooves
        if (character.body.legs.type !== LegType.HOOFED && character.body.legs.type !== LegType.CENTAUR) {
            if (changes < changeLimit && randInt(3) === 0) {
                changes++;
                if (character.body.legs.type === LegType.HUMAN) DisplayText("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (character.body.legs.type === LegType.DOG) DisplayText("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (character.body.legs.type === LegType.NAGA) DisplayText("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
                // Catch-all
                if (character.body.legs.type > LegType.NAGA) DisplayText("\n\nYou stagger as your " + describeFeet(character) + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (character.body.skin.type !== SkinType.FUR) DisplayText("  A fine coat of fur grows out below your waist, itching briefly as it fills in.");
                DisplayText("<b>  You now have hooves in place of your feet!</b>");
                character.body.legs.type = LegType.HOOFED;
                character.stats.spe += 1;
                changes++;
            }
        }
        if (!User.settings.hyperHappy) {
            // Kills vagina size (and eventually the whole vagina)
            if (vaginas.length > 0) {
                const topVagina = vaginas.get(0);
                if (topVagina.looseness > VaginaLooseness.TIGHT) {
                    // tighten that bitch up!
                    DisplayText("\n\nYour " + describeVagina(character, vaginas.get(0)) + " clenches up painfully as it tightens up, becoming smaller and tighter.");
                    topVagina.looseness--;
                }
                else {
                    DisplayText("\n\nA tightness in your groin is the only warning you get before your <b>" + describeVagina(character, topVagina) + " disappears forever</b>!");
                    // Goodbye womanhood!
                    vaginas.remove(0);
                    if (cocks.length === 0) {
                        DisplayText("  Strangely, your clit seems to have resisted the change, and is growing larger by the moment... shifting into the shape of a small ribbed minotaur-like penis!  <b>You now have a horse-cock!</b>");
                        const newCock = new Cock();
                        newCock.length = character.body.clit.length + 2;
                        newCock.thickness = 1;
                        newCock.type = CockType.HORSE;
                        cocks.add(newCock);
                    }
                    character.updateGender();
                }
                changes++;
            }
            // -Remove extra breast rows
            if (changes < changeLimit && character.body.chest.length > 1 && randInt(3) === 0) {
                const lastBreastRow = chest.get(chest.length - 1);
                changes++;
                DisplayText("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + describeBreastRow(lastBreastRow) + " shrink down, disappearing completely into your ");
                if (character.body.chest.length >= 3) DisplayText("abdomen");
                else DisplayText("chest");
                DisplayText(". The " + describeNipple(character, lastBreastRow) + "s even fade until nothing but ");
                if (character.body.skin.type === SkinType.FUR) DisplayText(character.body.hair.color + " " + character.body.skin.desc);
                else DisplayText(character.body.skin.tone + " " + character.body.skin.desc);
                DisplayText(" remains. <b>You've lost a row of breasts!</b>");
                character.stats.sens += -5;
                chest.remove(chest.length - 1);
            }
            // Shrink boobages till they are normal
            else if (randInt(2) === 0 && changes < changeLimit && chest.length > 0) {
                // Single row
                if (chest.length === 1) {
                    // Shrink if bigger than B cups
                    if (chest.get(0).rating >= 1) {
                        let superShrink = false;
                        chest.get(0).rating--;
                        // Shrink again if huuuuge
                        if (chest.get(0).rating > 8) {
                            superShrink = true;
                            chest.get(0).rating--;
                        }
                        // Talk about shrinkage
                        if (!superShrink)
                            DisplayText("\n\nYou feel a weight lifted from you, and realize your " + describeBreastRow(chest.get(0)) + " have shrunk to " + breastCup(chest.get(0).rating) + "s.");
                        else
                            DisplayText("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + breastCup(chest.get(0).rating) + "s.");
                        changes++;
                    }

                }
                // multiple
                else {
                    let growthAmount: number = 0;
                    if (chest.sort(BreastRow.Largest)[0].rating >= 1)
                        DisplayText("\n");
                    for (let index: number = 0; index < chest.length; index++) {
                        if (chest.get(index).rating >= 1) {
                            chest.get(index).rating--;
                            growthAmount++;
                            DisplayText("\n");
                            // If this isn't the first change...
                            if (growthAmount > 1) DisplayText("...and y");
                            else DisplayText("Y");
                            DisplayText("our " + describeBreastRow(chest.get(index)) + " shrink, dropping to " + breastCup(chest.get(index).rating) + "s.");
                        }
                    }
                    if (growthAmount === 2) DisplayText("\nYou feel so much lighter after the change.");
                    if (growthAmount === 3) DisplayText("\nWithout the extra weight you feel particularly limber.");
                    if (growthAmount >= 4) DisplayText("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
                    if (growthAmount > 0) changes++;
                }
            }
        }
        // Boosts cock size up to 36"x5".
        if (changes < changeLimit && randInt(2) === 0 && cocks.length > 0) {
            let selectedCock: Cock;
            for (let index: number = 0; index < cocks.length; index++) {
                if (cocks.get(index).type === CockType.HORSE && (cocks.get(index).length < 36 || cocks.get(index).thickness < 5)) {
                    selectedCock = cocks.get(index);
                    break;
                }
            }

            // Length first
            if (selectedCock) {
                // Thickness too if small enough
                if (selectedCock.thickness < 5) {
                    // Increase by 2 + randInt(8), and store the actual amount in temp
                    let growthAmount: number = Mod.Cock.growCock(character, selectedCock, 2 + randInt(8));
                    growthAmount += Mod.Cock.thickenCock(selectedCock, 1);
                    // Comment on length changes
                    if (growthAmount > 6) DisplayText("\n\nGasping in sudden pleasure, your " + describeCock(character, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
                    if (growthAmount <= 6 && growthAmount >= 3) DisplayText("\n\nYou pant in delight as a few inches of " + describeCock(character, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
                    if (growthAmount < 3) DisplayText("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
                    // Add a blurb about thickness...
                    DisplayText("  To your delight and surprise, you discover it has grown slightly thicker as well!");
                }
                // Just length...
                else {
                    // Increase by 2 + randInt(8), and store the actual amount in temp
                    const growthAmount: number = Mod.Cock.growCock(character, selectedCock, 2 + randInt(8));
                    // Comment on length changes
                    if (growthAmount > 6) DisplayText("\n\nGasping in sudden pleasure, your " + describeCock(character, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
                    if (growthAmount <= 6 && growthAmount >= 3) DisplayText("\n\nYou pant in delight as a few inches of " + describeCock(character, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
                    if (growthAmount < 3) DisplayText("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
                }
                changes++;
            }
        }
        // Morph dick to horsediiiiick
        if (cocks.length > 0 && randInt(2) === 0 && changes < changeLimit) {
            let selectedCock: Cock;
            for (let index: number = 0; index < cocks.length; index++) {
                if (cocks.get(index).type !== CockType.HORSE) {
                    selectedCock = cocks.get(index);
                    break;
                }
            }

            if (selectedCock) {
                // Text for humandicks or others
                if (selectedCock.type === CockType.HUMAN || selectedCock.type > 2) DisplayText("\n\nYour " + describeCock(character, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
                // Text for dogdicks
                if (selectedCock.type === CockType.DOG) DisplayText("\n\nYour " + nounCock(CockType.DOG) + " begins to feel odd...  You pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + nounCock(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond its traditional size.  You notice your knot vanishing, the extra flesh pushing more fresh horsecock out from your sheath.  <b>Your hands are drawn to the strange new " + nounCock(CockType.HORSE) + "</b>, and you jerk yourself off, splattering thick ropes of cum with intense force.");
                selectedCock.type = CockType.HORSE;
                Mod.Cock.growCock(character, selectedCock, 4);
                character.stats.lib += 5;
                character.stats.sens += 4;
                character.stats.lust += 35;
                DisplayText("<b>  You now have a");
                if (cocks.filter(Cock.FilterType(CockType.HORSE)).length > 1) DisplayText("nother");
                DisplayText(" horse-penis.</b>");
                changes++;
            }
        }

        // Males go into rut
        if (randInt(4) === 0) {
            Mod.Body.displayGoIntoRut(character);
        }

        // Anti-masturbation status
        if (randInt(4) === 0 && changes < changeLimit && !character.effects.has(StatusEffectType.Dysfunction)) {
            if (cocks.length > 0) DisplayText("\n\nYour " + describeCock(character, cocks.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
            else if (vaginas.length > 0) DisplayText("\n\nYour " + describeVagina(character, vaginas.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
            if (cocks.length > 0 || vaginas.length > 0) {
                character.effects.add(StatusEffectType.Dysfunction, 96, 0, 0, 0);
                changes++;
            }
        }
        // Appearance shit:
        // Tail, Ears, Hooves, Horns, Height (no prereq), Face
        // +height up to 9 foot
        if (changes < changeLimit && randInt(1.7) === 0 && character.body.tallness < 108) {
            let heightGrown: number = randInt(5) + 3;
            // Slow rate of growth near ceiling
            if (character.body.tallness > 90) heightGrown = Math.floor(heightGrown / 2);
            // Never 0
            if (heightGrown === 0) heightGrown = 1;
            // Flavor texts.  Flavored like 1950's cigarettes. Yum.
            if (heightGrown < 5) DisplayText("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
            if (heightGrown >= 5 && heightGrown < 7) DisplayText("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
            if (heightGrown === 7) DisplayText("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
            character.body.tallness += heightGrown;
            changes++;
        }
        // Face change, requires Ears + Height + Hooves
        if (character.body.ears.type === EarType.COW && character.body.legs.type === LegType.HOOFED && character.body.tallness >= 90
            && changes < changeLimit && randInt(3) === 0) {
            if (character.body.face.type !== FaceType.COW_MINOTAUR) {
                DisplayText("\n\nBones shift and twist painfully as your visage twists and morphs to resemble that of the beast whose blood you now drink.  <b>You now have a minotaur-like face.</b>");
                changes++;
                character.body.face.type = FaceType.COW_MINOTAUR;
            }
        }
        // +mino horns.amount require ears/tail
        if (changes < changeLimit && randInt(3) === 0 && character.body.ears.type === EarType.COW && character.body.tails.reduce(Tail.HasType(TailType.COW), false)) {
            // New horns.amount or expanding mino horns
            if (character.body.horns.type === HornType.COW_MINOTAUR || character.body.horns.type === HornType.NONE) {
                // Get bigger if character has horns
                if (character.body.horns.type === HornType.COW_MINOTAUR) {
                    // Fems horns.amount don't get bigger.
                    if (vaginas.length > 0) {
                        if (character.body.horns.count > 4) {
                            DisplayText("\n\nYou feel a pressure in your head around your horns, but they don't grow any larger.  ");
                            DisplayText("Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
                            character.hoursSinceCum += 200;
                            character.stats.lust += 20;
                        }
                        else {
                            DisplayText("\n\nYour small horns.amount get a bit bigger, stopping as medium sized nubs.");
                            character.body.horns.count += 3;
                        }
                        changes++;
                    }
                    // Males horns.amount get 'uge.
                    else {
                        const hornGrowth: number = 1 + randInt(3);
                        character.body.horns.count += hornGrowth;
                        if (hornGrowth === 0) changes--;
                        if (hornGrowth === 1) DisplayText("\n\nAn aching pressure builds in your temples as you feel your horns.amount push another inch of length from your skull.  ");
                        if (hornGrowth === 2) DisplayText("\n\nA powerful headache momentarily doubles you over.  With painful slowness, you feel your horns.amount push another two inches of length out from your brow, gradually thickening as they grow.  ");
                        if (hornGrowth === 3) DisplayText("\n\nAgony overwhelms you as a headache of terrifying intensity sweeps through your skull.  You squeeze your eyes shut from the pain, but it does little to help.  The torture intensifies before finally diminishing as you feel an inch or two of new horn force its way out of your forehead.  The headache remains despite this, and desperate for relief, you grab hold of your horns.amount and tug, pulling another inch of new horn free.  At last the pain fades, leaving you with significantly enhanced head-spikes.  ");
                        if (character.body.horns.count < 3) DisplayText("They are the size of tiny nubs.");
                        if (character.body.horns.count >= 3 && character.body.horns.count < 6) DisplayText("They are similar to what you would see on a young bull.");
                        if (character.body.horns.count >= 6 && character.body.horns.count < 12) DisplayText("They look like the horns.amount on a grown bull, big enough and dangerous enough to do some damage.");
                        if (character.body.horns.count >= 12 && character.body.horns.count < 20) DisplayText("They are large and wicked looking.");
                        if (character.body.horns.count >= 20) DisplayText("They are huge, heavy, and tipped with dangerous points.");
                        // boys get a cum refill sometimes
                        if (randInt(2) === 0 && changes < changeLimit) {
                            DisplayText("  Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
                            character.hoursSinceCum += 200;
                            character.stats.lust += 20;
                        }
                        changes++;
                    }
                }
                // If no horns.amount yet..
                else {
                    DisplayText("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
                    character.body.horns.type = HornType.COW_MINOTAUR;
                    character.body.horns.count = 2;
                    changes++;
                }
            }
            // Not mino horns, change to cow-horns
            if (character.body.horns.type === HornType.DEMON || character.body.horns.type > HornType.COW_MINOTAUR) {
                DisplayText("\n\nYour horns.amount vibrate and shift as if made of clay, reforming into two horns.amount with a bovine-like shape.");
                character.body.horns.type = HornType.COW_MINOTAUR;
                changes++;
            }
        }
        // +cow ears	- requires tail
        if (character.body.ears.type !== EarType.COW && changes < changeLimit && character.body.tails.reduce(Tail.HasType(TailType.COW), false) && randInt(2) === 0) {
            DisplayText("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
            character.body.ears.type = EarType.COW;
            changes++;
        }
        // +cow tail
        if (changes < changeLimit && randInt(2) === 0 && !character.body.tails.reduce(Tail.HasType(TailType.COW), false)) {
            if (character.body.tails.length === 0) DisplayText("\n\nYou feel the flesh above your " + describeButt(character) + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
            else {
                if (character.body.tails.length > 0) {
                    DisplayText("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
                }
                // insect
                if (character.body.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false) || character.body.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
                    DisplayText("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.");
                }
            }
            character.body.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.COW;
            character.body.tails.add(newTail);
            changes++;
        }
        if (randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.body.neck.gills = false;
            changes++;
        }
        if (changes < changeLimit && randInt(4) === 0 && ((character.body.butt.wetness > 0 && !character.perks.has(PerkType.MaraesGiftButtslut)) || character.body.butt.wetness > 1)) {
            DisplayText("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            character.body.butt.wetness--;
            if (character.body.butt.looseness > 1) character.body.butt.looseness--;
            changes++;
        }
        // Give you that mino build!
        if (randInt(4) === 0) DisplayText(Mod.Body.displayModFem(character, 5, 10));
        if (randInt(4) === 0) DisplayText(Mod.Body.displayModTone(character, 85, 3));
        if (randInt(4) === 0) DisplayText(Mod.Body.displayModThickness(character, 70, 4));
        // Default
        if (changes === 0) {
            DisplayText("\n\nMinotaur-like vitality surges through your body, invigorating and arousing you!\n");
            if (character.body.balls.count > 0) {
                DisplayText("Your balls feel as if they've grown heavier with the weight of more sperm.\n");
                character.hoursSinceCum += 200;
            }
            Mod.Stat.displayCharacterHPChange(character, 50);
            character.stats.lust += 50;
        }
    }
}
