import Consumable from './Consumable';
import Chest from '../../Body/Chest';
import Cock, { CockType } from '../../Body/Cock';
import CockSpot from '../../Body/CockSpot';
import { SkinType } from '../../Body/Creature';
import { FaceType } from '../../Body/Face';
import { EarType, HornType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { ArmType } from '../../Body/UpperBody';
import Vagina, { VaginaLooseness } from '../../Body/Vagina';
import VaginaSpot from '../../Body/VaginaSpot';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import StatusAffect from '../../Effects/StatusAffect';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import CockModifier from '../../Modifiers/CockModifier';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class MinotaurBlood extends Consumable {
    public constructor() {
        super("MinoBlo", new ItemDesc("MinoBlo", "a vial of Minotaur blood", "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape."));
    }

    public use(player: Player) {
        player.slimeFeed();
        const chest: Chest = player.upperBody.chest;
        const vaginaSpot: VaginaSpot = player.lowerBody.vaginaSpot;
        const cockSpot: CockSpot = player.lowerBody.cockSpot;

        //Changes done
        let changes: number = 0;
        //Change limit
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        if (changeLimit == 1) changeLimit = 2;
        //Set up output
        DisplayText.clear();
        DisplayText.text("You drink the bubbling red fluid, tasting the tangy iron after-taste.");
        //STATS
        //Strength h
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            //weaker players gain more
            if (player.stats.str <= 50) {
                DisplayText.text("\n\nPainful aches ripple through your body, flooding you with pain as your muscles flex and bulge, growing much stronger and more well-defined.");
                //very weak players gain more
                if (player.stats.str <= 20) player.stats.str += 3;
                else player.stats.str += 2;
            }
            //stronger players gain less
            else {
                //small growth if over 75
                if (player.stats.str >= 75) player.stats.str += .5;
                //faster from 50-75
                else player.stats.str += 1;
                DisplayText.text("\n\nYour muscles grow tighter, bulging outwards powerfully as you get even stronger!");
            }
            //Chance of speed drop
            if (Utils.rand(2) == 0 && player.stats.str > 50) {
                DisplayText.text("\n\nYou begin to feel that the size of your muscles is starting to slow you down.");
                player.stats.spe += -1;
            }
            changes++;
        }
        //Toughness (chance of - sensitivity)
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            //weaker players gain more
            if (player.stats.tou <= 50) {
                DisplayText.text("\n\nYour hide... skin... whatever... you can feel it getting tougher as it thickens perceptibly.");
                //very weak players gain more
                if (player.stats.tou <= 20) player.stats.tou += 3;
                else player.stats.tou += 2;
            }
            //stronger players gain less
            else {
                //small growth if over 75
                if (player.stats.tou >= 75) player.stats.tou += .5;
                //faster from 50-75
                else player.stats.tou += 1;
                DisplayText.text("\n\nYour tough hide grows slightly thicker.");
            }
            //chance of less sensitivity
            if (Utils.rand(2) == 0 && player.stats.sens > 10) {
                if (player.stats.tou > 75) {
                    DisplayText.text("\n\nIt becomes much harder to feel anything through your leathery skin.");
                    player.stats.sens += -3;
                }
                if (player.stats.tou <= 75 && player.stats.tou > 50) {
                    DisplayText.text("\n\nThe level of sensation from your skin diminishes noticeably.");
                    player.stats.sens += -2;
                }
                if (player.stats.tou <= 50) {
                    DisplayText.text("\n\nYour sense of touch diminishes due to your tougher hide.");
                    player.stats.sens += -3;
                }
            }
            changes++;
        }
        //SEXUAL
        //Boosts ball size MORE than equinum :D:D:D:D:D:D:
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.ballSize <= 5 && cockSpot.countType(CockType.HORSE) > 0) {
            //Chance of ball growth if not 3" yet
            if (player.lowerBody.balls == 0) {
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 1;
                DisplayText.text("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.");
                player.stats.lib += 2;
                player.stats.lust += 5;
            }
            else {
                player.lowerBody.ballSize++;
                if (player.lowerBody.ballSize <= 2) DisplayText.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, player) + " have grown larger than a human's.");
                if (player.lowerBody.ballSize > 2) DisplayText.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(player) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, player) + " have enlarged again.");
                player.stats.lib += 1;
                player.stats.lust += 3;
            }
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.HARPY && Utils.rand(4) == 0) {
            DisplayText.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.");
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.SPIDER && Utils.rand(4) == 0) {
            DisplayText.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.");
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //+hooves
        if (player.lowerBody.type != LowerBodyType.HOOFED && player.lowerBody.type != LowerBodyType.CENTAUR) {
            if (changes < changeLimit && Utils.rand(3) == 0) {
                changes++;
                if (player.lowerBody.type == LowerBodyType.HUMAN) DisplayText.text("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (player.lowerBody.type == LowerBodyType.DOG) DisplayText.text("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (player.lowerBody.type == LowerBodyType.NAGA) DisplayText.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
                //Catch-all
                if (player.lowerBody.type > LowerBodyType.NAGA) DisplayText.text("\n\nYou stagger as your " + LowerBodyDescriptor.describeFeet(player) + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (player.skinType != SkinType.FUR) DisplayText.text("  A fine coat of fur grows out below your waist, itching briefly as it fills in.");
                DisplayText.text("<b>  You now have hooves in place of your feet!</b>");
                player.lowerBody.type = LowerBodyType.HOOFED;
                player.stats.spe += 1;
                changes++;
            }
        }
        if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
            //Kills vagina size (and eventually the whole vagina)
            if (vaginaSpot.count() > 0) {
                let topVagina: Vagina = vaginaSpot.get(0);
                if (topVagina.vaginalLooseness > VaginaLooseness.TIGHT) {
                    //tighten that bitch up!
                    DisplayText.text("\n\nYour " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " clenches up painfully as it tightens up, becoming smaller and tighter.");
                    topVagina.vaginalLooseness--;
                }
                else {
                    DisplayText.text("\n\nA tightness in your groin is the only warning you get before your <b>" + VaginaDescriptor.describeVagina(player, topVagina) + " disappears forever</b>!");
                    //Goodbye womanhood!
                    vaginaSpot.remove(topVagina);
                    if (cockSpot.count() == 0) {
                        DisplayText.text("  Strangely, your clit seems to have resisted the change, and is growing larger by the moment... shifting into the shape of a small ribbed minotaur-like penis!  <b>You now have a horse-cock!</b>");
                        const newCock = new Cock();
                        newCock.cockLength = vaginaSpot.get(0).clitLength + 2;
                        newCock.cockThickness = 1;
                        newCock.cockType = CockType.HORSE;
                        cockSpot.add(newCock);
                        vaginaSpot.get(0).clitLength = .25;
                    }
                    player.updateGender();
                }
                changes++;
            }
            //-Remove extra breast rows
            if (changes < changeLimit && player.upperBody.chest.count() > 1 && Utils.rand(3) == 0) {
                const lastBreastRow = chest.get(chest.count() - 1);
                changes++;
                DisplayText.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(lastBreastRow) + " shrink down, disappearing completely into your ");
                if (player.upperBody.chest.count() >= 3) DisplayText.text("abdomen");
                else DisplayText.text("chest");
                DisplayText.text(". The " + BreastDescriptor.describeNipple(player, lastBreastRow) + "s even fade until nothing but ");
                if (player.skinType == SkinType.FUR) DisplayText.text(player.upperBody.head.hairColor + " " + player.skinDesc);
                else DisplayText.text(player.skinTone + " " + player.skinDesc);
                DisplayText.text(" remains. <b>You've lost a row of breasts!</b>");
                player.stats.sens += -5;
                chest.remove(lastBreastRow);
            }
            //Shrink boobages till they are normal
            else if (Utils.rand(2) == 0 && changes < changeLimit && chest.count() > 0) {
                //Single row
                if (chest.count() == 1) {
                    //Shrink if bigger than B cups
                    if (chest.get(0).breastRating >= 1) {
                        let superShrink = false;
                        chest.get(0).breastRating--;
                        //Shrink again if huuuuge
                        if (chest.get(0).breastRating > 8) {
                            superShrink = true;
                            chest.get(0).breastRating--;
                        }
                        //Talk about shrinkage
                        if (!superShrink)
                            DisplayText.text("\n\nYou feel a weight lifted from you, and realize your " + BreastDescriptor.describeBreastRow(chest.get(0)) + " have shrunk to " + BreastDescriptor.breastCup(chest.get(0).breastRating) + "s.");
                        else
                            DisplayText.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + BreastDescriptor.breastCup(chest.get(0).breastRating) + "s.");
                        changes++;
                    }

                }
                //multiple
                else {
                    let growthAmount: number = 0;
                    if (chest.BreastRatingLargest[0].breastRating >= 1)
                        DisplayText.text("\n");
                    for (let index: number = 0; index < chest.count(); index++) {
                        if (chest.get(index).breastRating >= 1) {
                            chest.get(index).breastRating--;
                            growthAmount++;
                            DisplayText.text("\n");
                            //If this isn't the first change...
                            if (growthAmount > 1) DisplayText.text("...and y");
                            else DisplayText.text("Y");
                            DisplayText.text("our " + BreastDescriptor.describeBreastRow(chest.get(index)) + " shrink, dropping to " + BreastDescriptor.breastCup(chest.get(index).breastRating) + "s.");
                        }
                    }
                    if (growthAmount == 2) DisplayText.text("\nYou feel so much lighter after the change.");
                    if (growthAmount == 3) DisplayText.text("\nWithout the extra weight you feel particularly limber.");
                    if (growthAmount >= 4) DisplayText.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
                    if (growthAmount > 0) changes++;
                }
            }
        }
        //Boosts cock size up to 36"x5".
        if (changes < changeLimit && Utils.rand(2) == 0 && cockSpot.count() > 0) {
            let selectedCock: Cock = null;
            for (let index: number = 0; index < cockSpot.count(); index++) {
                if (cockSpot.get(index).cockType == CockType.HORSE && (cockSpot.get(index).cockLength < 36 || cockSpot.get(index).cockThickness < 5)) {
                    selectedCock = cockSpot.get(index);
                    break;
                }
            }

            //Length first
            if (selectedCock) {
                //Thickness too if small enough
                if (selectedCock.cockThickness < 5) {
                    //Increase by 2 + Utils.rand(8), and store the actual amount in temp
                    let growthAmount: number = CockModifier.growCock(player, selectedCock, 2 + Utils.rand(8));
                    growthAmount += CockModifier.thickenCock(selectedCock, 1);
                    //Comment on length changes
                    if (growthAmount > 6) DisplayText.text("\n\nGasping in sudden pleasure, your " + CockDescriptor.describeCock(player, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
                    if (growthAmount <= 6 && growthAmount >= 3) DisplayText.text("\n\nYou pant in delight as a few inches of " + CockDescriptor.describeCock(player, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
                    if (growthAmount < 3) DisplayText.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
                    //Add a blurb about thickness...
                    DisplayText.text("  To your delight and surprise, you discover it has grown slightly thicker as well!");
                }
                //Just length...
                else {
                    //Increase by 2 + Utils.rand(8), and store the actual amount in temp
                    let growthAmount: number = CockModifier.growCock(player, selectedCock, 2 + Utils.rand(8));
                    //Comment on length changes
                    if (growthAmount > 6) DisplayText.text("\n\nGasping in sudden pleasure, your " + CockDescriptor.describeCock(player, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
                    if (growthAmount <= 6 && growthAmount >= 3) DisplayText.text("\n\nYou pant in delight as a few inches of " + CockDescriptor.describeCock(player, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
                    if (growthAmount < 3) DisplayText.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
                }
                changes++;
            }
        }
        //Morph dick to horsediiiiick
        if (cockSpot.count() > 0 && Utils.rand(2) == 0 && changes < changeLimit) {
            let selectedCock: Cock = null;
            for (let index: number = 0; index < cockSpot.count(); index++) {
                if (cockSpot.get(index).cockType != CockType.HORSE) {
                    selectedCock = cockSpot.get(index);
                    break;
                }
            }

            if (selectedCock) {
                //Text for humandicks or others
                if (selectedCock.cockType == CockType.HUMAN || selectedCock.cockType > 2) DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
                //Text for dogdicks
                if (selectedCock.cockType == CockType.DOG) DisplayText.text("\n\nYour " + CockDescriptor.nounCock(CockType.DOG) + " begins to feel odd...  You pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.nounCock(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond its traditional size.  You notice your knot vanishing, the extra flesh pushing more fresh horsecock out from your sheath.  <b>Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + "</b>, and you jerk yourself off, splattering thick ropes of cum with intense force.");
                selectedCock.cockType = CockType.HORSE;
                CockModifier.growCock(player, selectedCock, 4);
                player.stats.lib += 5;
                player.stats.sens += 4;
                player.stats.lust += 35;
                DisplayText.text("<b>  You now have a");
                if (cockSpot.countType(CockType.HORSE) > 1) DisplayText.text("nother")
                DisplayText.text(" horse-penis.</b>");
                changes++;
            }
        }

        //Males go into rut
        if (Utils.rand(4) == 0) {
            BodyModifier.displayGoIntoRut(player);
        }

        //Anti-masturbation status
        if (Utils.rand(4) == 0 && changes < changeLimit && !player.statusAffects.has(StatusAffectType.Dys)) {
            if (cockSpot.count() > 0) DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, cockSpot.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
            else if (vaginaSpot.hasVagina()) DisplayText.text("\n\nYour " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
            if (cockSpot.count() > 0 || vaginaSpot.hasVagina()) {
                player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Dys, 96, 0, 0, 0));
                changes++;
            }
        }
        //Appearance shit:
        //Tail, Ears, Hooves, Horns, Height (no prereq), Face
        //+height up to 9 foot
        if (changes < changeLimit && Utils.rand(1.7) == 0 && player.tallness < 108) {
            let heightGrown: number = Utils.rand(5) + 3;
            //Slow rate of growth near ceiling
            if (player.tallness > 90) heightGrown = Math.floor(heightGrown / 2);
            //Never 0
            if (heightGrown == 0) heightGrown = 1;
            //Flavor texts.  Flavored like 1950's cigarettes. Yum.
            if (heightGrown < 5) DisplayText.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
            if (heightGrown >= 5 && heightGrown < 7) DisplayText.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
            if (heightGrown == 7) DisplayText.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
            player.tallness += heightGrown;
            changes++;
        }
        //Face change, requires Ears + Height + Hooves
        if (player.upperBody.head.earType == EarType.COW && player.lowerBody.type == LowerBodyType.HOOFED && player.tallness >= 90
            && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.upperBody.head.face.faceType != FaceType.COW_MINOTAUR) {
                DisplayText.text("\n\nBones shift and twist painfully as your visage twists and morphs to resemble that of the beast whose blood you now drink.  <b>You now have a minotaur-like face.</b>");
                changes++;
                player.upperBody.head.face.faceType = FaceType.COW_MINOTAUR;
            }
        }
        //+mino horns require ears/tail
        if (changes < changeLimit && Utils.rand(3) == 0 && player.upperBody.head.earType == EarType.COW && player.lowerBody.tailType == TailType.COW) {
            //New horns or expanding mino horns
            if (player.upperBody.head.hornType == HornType.COW_MINOTAUR || player.upperBody.head.hornType == HornType.NONE) {
                //Get bigger if player has horns
                if (player.upperBody.head.hornType == HornType.COW_MINOTAUR) {
                    //Fems horns don't get bigger.
                    if (vaginaSpot.count() > 0) {
                        if (player.upperBody.head.horns > 4) {
                            DisplayText.text("\n\nYou feel a pressure in your head around your horns, but they don't grow any larger.  ");
                            DisplayText.text("Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
                            player.hoursSinceCum += 200;
                            player.stats.lust += 20;
                        }
                        else {
                            DisplayText.text("\n\nYour small horns get a bit bigger, stopping as medium sized nubs.");
                            player.upperBody.head.horns += 3;
                        }
                        changes++;
                    }
                    //Males horns get 'uge.
                    else {
                        let hornGrowth: number = 1 + Utils.rand(3);
                        player.upperBody.head.horns += hornGrowth;
                        if (hornGrowth == 0) changes--;
                        if (hornGrowth == 1) DisplayText.text("\n\nAn aching pressure builds in your temples as you feel your horns push another inch of length from your skull.  ");
                        if (hornGrowth == 2) DisplayText.text("\n\nA powerful headache momentarily doubles you over.  With painful slowness, you feel your horns push another two inches of length out from your brow, gradually thickening as they grow.  ");
                        if (hornGrowth == 3) DisplayText.text("\n\nAgony overwhelms you as a headache of terrifying intensity sweeps through your skull.  You squeeze your eyes shut from the pain, but it does little to help.  The torture intensifies before finally diminishing as you feel an inch or two of new horn force its way out of your forehead.  The headache remains despite this, and desperate for relief, you grab hold of your horns and tug, pulling another inch of new horn free.  At last the pain fades, leaving you with significantly enhanced head-spikes.  ");
                        if (player.upperBody.head.horns < 3) DisplayText.text("They are the size of tiny nubs.");
                        if (player.upperBody.head.horns >= 3 && player.upperBody.head.horns < 6) DisplayText.text("They are similar to what you would see on a young bull.");
                        if (player.upperBody.head.horns >= 6 && player.upperBody.head.horns < 12) DisplayText.text("They look like the horns on a grown bull, big enough and dangerous enough to do some damage.");
                        if (player.upperBody.head.horns >= 12 && player.upperBody.head.horns < 20) DisplayText.text("They are large and wicked looking.");
                        if (player.upperBody.head.horns >= 20) DisplayText.text("They are huge, heavy, and tipped with dangerous points.");
                        //boys get a cum refill sometimes
                        if (Utils.rand(2) == 0 && changes < changeLimit) {
                            DisplayText.text("  Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
                            player.hoursSinceCum += 200;
                            player.stats.lust += 20;
                        }
                        changes++;
                    }
                }
                //If no horns yet..
                else {
                    DisplayText.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
                    player.upperBody.head.hornType = HornType.COW_MINOTAUR;
                    player.upperBody.head.horns = 2;
                    changes++;
                }
            }
            //Not mino horns, change to cow-horns
            if (player.upperBody.head.hornType == HornType.DEMON || player.upperBody.head.hornType > HornType.COW_MINOTAUR) {
                DisplayText.text("\n\nYour horns vibrate and shift as if made of clay, reforming into two horns with a bovine-like shape.");
                player.upperBody.head.hornType = HornType.COW_MINOTAUR;
                changes++;
            }
        }
        //+cow ears	- requires tail
        if (player.upperBody.head.earType != EarType.COW && changes < changeLimit && player.lowerBody.tailType == TailType.COW && Utils.rand(2) == 0) {
            DisplayText.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
            player.upperBody.head.earType = EarType.COW;
            changes++;
        }
        //+cow tail
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.tailType != TailType.COW) {
            if (player.lowerBody.tailType == TailType.NONE) DisplayText.text("\n\nYou feel the flesh above your " + ButtDescriptor.describeButt(player) + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
            else {
                if (player.lowerBody.tailType < TailType.SPIDER_ABDOMEN || player.lowerBody.tailType > TailType.BEE_ABDOMEN) {
                    DisplayText.text("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
                }
                //insect
                if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN || player.lowerBody.tailType == TailType.BEE_ABDOMEN) {
                    DisplayText.text("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.");
                }
            }
            player.lowerBody.tailType = TailType.COW;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            DisplayText.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.upperBody.gills = false;
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) == 0 && ((player.lowerBody.butt.analWetness > 0 && !player.perks.has(PerkType.MaraesGiftButtslut)) || player.lowerBody.butt.analWetness > 1)) {
            DisplayText.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.lowerBody.butt.analWetness--;
            if (player.lowerBody.butt.analLooseness > 1) player.lowerBody.butt.analLooseness--;
            changes++;
        }
        //Give you that mino build!
        if (Utils.rand(4) == 0) DisplayText.text(player.modFem(5, 10));
        if (Utils.rand(4) == 0) DisplayText.text(BodyModifier.displayModTone(player, 85, 3));
        if (Utils.rand(4) == 0) DisplayText.text(BodyModifier.displayModThickness(player, 70, 4));
        //Default
        if (changes == 0) {
            DisplayText.text("\n\nMinotaur-like vitality surges through your body, invigorating and arousing you!\n");
            if (player.lowerBody.balls > 0) {
                DisplayText.text("Your balls feel as if they've grown heavier with the weight of more sperm.\n");
                player.hoursSinceCum += 200;
            }
            StatModifier.displayPlayerHPChange(player, 50);
            player.stats.lust += 50;
        }

    }
}