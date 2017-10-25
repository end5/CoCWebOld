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
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Flags, { FlagEnum } from '../../Game/Flags';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class MinotaurBlood extends Consumable {
    public constructor() {
        super("MinoBlo", "MinoBlo", "a vial of Minotaur blood", MinotaurBlood.DefaultValue, "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape.");
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
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (changeLimit == 1) changeLimit = 2;
        //Set up output
        MainScreen.text("You drink the bubbling red fluid, tasting the tangy iron after-taste.", true);
        //STATS
        //Strength h
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            //weaker players gain more
            if (player.stats.str <= 50) {
                MainScreen.text("\n\nPainful aches ripple through your body, flooding you with pain as your muscles flex and bulge, growing much stronger and more well-defined.", false);
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
                MainScreen.text("\n\nYour muscles grow tighter, bulging outwards powerfully as you get even stronger!", false);
            }
            //Chance of speed drop
            if (Utils.rand(2) == 0 && player.stats.str > 50) {
                MainScreen.text("\n\nYou begin to feel that the size of your muscles is starting to slow you down.", false);
                player.stats.spe += -1;
            }
            changes++;
        }
        //Toughness (chance of - sensitivity)
        if (Utils.rand(3) == 0 && changes < changeLimit) {
            //weaker players gain more
            if (player.stats.tou <= 50) {
                MainScreen.text("\n\nYour hide... skin... whatever... you can feel it getting tougher as it thickens perceptibly.", false);
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
                MainScreen.text("\n\nYour tough hide grows slightly thicker.", false);
            }
            //chance of less sensitivity
            if (Utils.rand(2) == 0 && player.stats.sens > 10) {
                if (player.stats.tou > 75) {
                    MainScreen.text("\n\nIt becomes much harder to feel anything through your leathery skin.", false);
                    player.stats.sens += -3;
                }
                if (player.stats.tou <= 75 && player.stats.tou > 50) {
                    MainScreen.text("\n\nThe level of sensation from your skin diminishes noticeably.", false);
                    player.stats.sens += -2;
                }
                if (player.stats.tou <= 50) {
                    MainScreen.text("\n\nYour sense of touch diminishes due to your tougher hide.", false);
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
                MainScreen.text("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.", false);
                player.stats.lib += 2;
                player.stats.lust += 5;
            }
            else {
                player.lowerBody.ballSize++;
                if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, player) + " have grown larger than a human's.", false);
                if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(player) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, player) + " have enlarged again.", false);
                player.stats.lib += 1;
                player.stats.lust += 3;
            }
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //+hooves
        if (player.lowerBody.type != LowerBodyType.HOOFED && player.lowerBody.type != LowerBodyType.CENTAUR) {
            if (changes < changeLimit && Utils.rand(3) == 0) {
                changes++;
                if (player.lowerBody.type == LowerBodyType.HUMAN) MainScreen.text("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.lowerBody.type == LowerBodyType.DOG) MainScreen.text("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.lowerBody.type == LowerBodyType.NAGA) MainScreen.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!", false);
                //Catch-all
                if (player.lowerBody.type > LowerBodyType.NAGA) MainScreen.text("\n\nYou stagger as your " + LowerBodyDescriptor.describeFeet(player) + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
                if (player.skinType != SkinType.FUR) MainScreen.text("  A fine coat of fur grows out below your waist, itching briefly as it fills in.");
                MainScreen.text("<b>  You now have hooves in place of your feet!</b>", false);
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
                    MainScreen.text("\n\nYour " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " clenches up painfully as it tightens up, becoming smaller and tighter.", false);
                    topVagina.vaginalLooseness--;
                }
                else {
                    MainScreen.text("\n\nA tightness in your groin is the only warning you get before your <b>" + VaginaDescriptor.describeVagina(player, topVagina) + " disappears forever</b>!", false);
                    //Goodbye womanhood!
                    vaginaSpot.remove(topVagina);
                    if (cockSpot.count() == 0) {
                        MainScreen.text("  Strangely, your clit seems to have resisted the change, and is growing larger by the moment... shifting into the shape of a small ribbed minotaur-like penis!  <b>You now have a horse-cock!</b>", false);
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
                MainScreen.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(lastBreastRow) + " shrink down, disappearing completely into your ", false);
                if (player.upperBody.chest.count() >= 3) MainScreen.text("abdomen", false);
                else MainScreen.text("chest", false);
                MainScreen.text(". The " + BreastDescriptor.describeNipple(player, lastBreastRow) + "s even fade until nothing but ", false);
                if (player.skinType == SkinType.FUR) MainScreen.text(player.upperBody.head.hairColor + " " + player.skinDesc, false);
                else MainScreen.text(player.skinTone + " " + player.skinDesc, false);
                MainScreen.text(" remains. <b>You've lost a row of breasts!</b>", false);
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
                            MainScreen.text("\n\nYou feel a weight lifted from you, and realize your " + BreastDescriptor.describeBreastRow(chest.get(0)) + " have shrunk to " + BreastDescriptor.breastCup(chest.get(0).breastRating) + "s.", false);
                        else
                            MainScreen.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + BreastDescriptor.breastCup(chest.get(0).breastRating) + "s.", false);
                        changes++;
                    }

                }
                //multiple
                else {
                    let growthAmount: number = 0;
                    if (chest.BreastRatingLargest[0].breastRating >= 1)
                        MainScreen.text("\n", false);
                    for (let index: number = 0; index < chest.count(); index++) {
                        if (chest.get(index).breastRating >= 1) {
                            chest.get(index).breastRating--;
                            growthAmount++;
                            MainScreen.text("\n", false);
                            //If this isn't the first change...
                            if (growthAmount > 1) MainScreen.text("...and y", false);
                            else MainScreen.text("Y", false);
                            MainScreen.text("our " + BreastDescriptor.describeBreastRow(chest.get(index)) + " shrink, dropping to " + BreastDescriptor.breastCup(chest.get(index).breastRating) + "s.", false);
                        }
                    }
                    if (growthAmount == 2) MainScreen.text("\nYou feel so much lighter after the change.", false);
                    if (growthAmount == 3) MainScreen.text("\nWithout the extra weight you feel particularly limber.", false);
                    if (growthAmount >= 4) MainScreen.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.", false);
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
                    if (growthAmount > 6) MainScreen.text("\n\nGasping in sudden pleasure, your " + CockDescriptor.describeCock(player, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.", false);
                    if (growthAmount <= 6 && growthAmount >= 3) MainScreen.text("\n\nYou pant in delight as a few inches of " + CockDescriptor.describeCock(player, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.", false);
                    if (growthAmount < 3) MainScreen.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.", false);
                    //Add a blurb about thickness...
                    MainScreen.text("  To your delight and surprise, you discover it has grown slightly thicker as well!", false);
                }
                //Just length...
                else {
                    //Increase by 2 + Utils.rand(8), and store the actual amount in temp
                    let growthAmount: number = CockModifier.growCock(player, selectedCock, 2 + Utils.rand(8));
                    //Comment on length changes
                    if (growthAmount > 6) MainScreen.text("\n\nGasping in sudden pleasure, your " + CockDescriptor.describeCock(player, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.", false);
                    if (growthAmount <= 6 && growthAmount >= 3) MainScreen.text("\n\nYou pant in delight as a few inches of " + CockDescriptor.describeCock(player, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.", false);
                    if (growthAmount < 3) MainScreen.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.", false);
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
                if (selectedCock.cockType == CockType.HUMAN || selectedCock.cockType > 2) MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.", false);
                //Text for dogdicks
                if (selectedCock.cockType == CockType.DOG) MainScreen.text("\n\nYour " + CockDescriptor.nounCock(CockType.DOG) + " begins to feel odd...  You pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.nounCock(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond its traditional size.  You notice your knot vanishing, the extra flesh pushing more fresh horsecock out from your sheath.  <b>Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + "</b>, and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                selectedCock.cockType = CockType.HORSE;
                CockModifier.growCock(player, selectedCock, 4);
                player.stats.lib += 5;
                player.stats.sens += 4;
                player.stats.lust += 35;
                MainScreen.text("<b>  You now have a");
                if (cockSpot.countType(CockType.HORSE) > 1) MainScreen.text("nother")
                MainScreen.text(" horse-penis.</b>", false);
                changes++;
            }
        }

        //Males go into rut
        if (Utils.rand(4) == 0) {
            CreatureChange.goIntoRut(player);
        }

        //Anti-masturbation status
        if (Utils.rand(4) == 0 && changes < changeLimit && !player.statusAffects.has("Dys")) {
            if (cockSpot.count() > 0) MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, cockSpot.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.", false);
            else if (vaginaSpot.hasVagina()) MainScreen.text("\n\nYour " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.", false);
            if (cockSpot.count() > 0 || vaginaSpot.hasVagina()) {
                player.statusAffects.add(new StatusAffect("Dys", 96, 0, 0, 0));
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
            if (heightGrown < 5) MainScreen.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.", false);
            if (heightGrown >= 5 && heightGrown < 7) MainScreen.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.", false);
            if (heightGrown == 7) MainScreen.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.", false);
            player.tallness += heightGrown;
            changes++;
        }
        //Face change, requires Ears + Height + Hooves
        if (player.upperBody.head.earType == EarType.COW && player.lowerBody.type == LowerBodyType.HOOFED && player.tallness >= 90
            && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.upperBody.head.face.faceType != FaceType.COW_MINOTAUR) {
                MainScreen.text("\n\nBones shift and twist painfully as your visage twists and morphs to resemble that of the beast whose blood you now drink.  <b>You now have a minotaur-like face.</b>", false);
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
                            MainScreen.text("\n\nYou feel a pressure in your head around your horns, but they don't grow any larger.  ", false);
                            MainScreen.text("Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.", false);
                            player.hoursSinceCum += 200;
                            player.stats.lust += 20;
                        }
                        else {
                            MainScreen.text("\n\nYour small horns get a bit bigger, stopping as medium sized nubs.", false);
                            player.upperBody.head.horns += 3;
                        }
                        changes++;
                    }
                    //Males horns get 'uge.
                    else {
                        let hornGrowth: number = 1 + Utils.rand(3);
                        player.upperBody.head.horns += hornGrowth;
                        if (hornGrowth == 0) changes--;
                        if (hornGrowth == 1) MainScreen.text("\n\nAn aching pressure builds in your temples as you feel your horns push another inch of length from your skull.  ", false);
                        if (hornGrowth == 2) MainScreen.text("\n\nA powerful headache momentarily doubles you over.  With painful slowness, you feel your horns push another two inches of length out from your brow, gradually thickening as they grow.  ", false);
                        if (hornGrowth == 3) MainScreen.text("\n\nAgony overwhelms you as a headache of terrifying intensity sweeps through your skull.  You squeeze your eyes shut from the pain, but it does little to help.  The torture intensifies before finally diminishing as you feel an inch or two of new horn force its way out of your forehead.  The headache remains despite this, and desperate for relief, you grab hold of your horns and tug, pulling another inch of new horn free.  At last the pain fades, leaving you with significantly enhanced head-spikes.  ", false);
                        if (player.upperBody.head.horns < 3) MainScreen.text("They are the size of tiny nubs.", false);
                        if (player.upperBody.head.horns >= 3 && player.upperBody.head.horns < 6) MainScreen.text("They are similar to what you would see on a young bull.", false);
                        if (player.upperBody.head.horns >= 6 && player.upperBody.head.horns < 12) MainScreen.text("They look like the horns on a grown bull, big enough and dangerous enough to do some damage.", false);
                        if (player.upperBody.head.horns >= 12 && player.upperBody.head.horns < 20) MainScreen.text("They are large and wicked looking.", false);
                        if (player.upperBody.head.horns >= 20) MainScreen.text("They are huge, heavy, and tipped with dangerous points.", false);
                        //boys get a cum refill sometimes
                        if (Utils.rand(2) == 0 && changes < changeLimit) {
                            MainScreen.text("  Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.", false);
                            player.hoursSinceCum += 200;
                            player.stats.lust += 20;
                        }
                        changes++;
                    }
                }
                //If no horns yet..
                else {
                    MainScreen.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.", false);
                    player.upperBody.head.hornType = HornType.COW_MINOTAUR;
                    player.upperBody.head.horns = 2;
                    changes++;
                }
            }
            //Not mino horns, change to cow-horns
            if (player.upperBody.head.hornType == HornType.DEMON || player.upperBody.head.hornType > HornType.COW_MINOTAUR) {
                MainScreen.text("\n\nYour horns vibrate and shift as if made of clay, reforming into two horns with a bovine-like shape.", false);
                player.upperBody.head.hornType = HornType.COW_MINOTAUR;
                changes++;
            }
        }
        //+cow ears	- requires tail
        if (player.upperBody.head.earType != EarType.COW && changes < changeLimit && player.lowerBody.tailType == TailType.COW && Utils.rand(2) == 0) {
            MainScreen.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>", false);
            player.upperBody.head.earType = EarType.COW;
            changes++;
        }
        //+cow tail
        if (changes < changeLimit && Utils.rand(2) == 0 && player.lowerBody.tailType != TailType.COW) {
            if (player.lowerBody.tailType == TailType.NONE) MainScreen.text("\n\nYou feel the flesh above your " + ButtDescriptor.describeButt(player) + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
            else {
                if (player.lowerBody.tailType < TailType.SPIDER_ABDOMEN || player.lowerBody.tailType > TailType.BEE_ABDOMEN) {
                    MainScreen.text("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
                }
                //insect
                if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN || player.lowerBody.tailType == TailType.BEE_ABDOMEN) {
                    MainScreen.text("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.", false);
                }
            }
            player.lowerBody.tailType = TailType.COW;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) == 0 && ((player.lowerBody.butt.analWetness > 0 && !player.perks.has("MaraesGiftButtslut")) || player.lowerBody.butt.analWetness > 1)) {
            MainScreen.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.lowerBody.butt.analWetness--;
            if (player.lowerBody.butt.analLooseness > 1) player.lowerBody.butt.analLooseness--;
            changes++;
        }
        //Give you that mino build!
        if (Utils.rand(4) == 0) MainScreen.text(player.modFem(5, 10), false);
        if (Utils.rand(4) == 0) MainScreen.text(player.modTone(85, 3), false);
        if (Utils.rand(4) == 0) MainScreen.text(player.modThickness(70, 4), false);
        //Default
        if (changes == 0) {
            MainScreen.text("\n\nMinotaur-like vitality surges through your body, invigorating and arousing you!\n", false);
            if (player.lowerBody.balls > 0) {
                MainScreen.text("Your balls feel as if they've grown heavier with the weight of more sperm.\n", false);
                player.hoursSinceCum += 200;
            }
            CreatureChange.HPChange(player, 50);
            player.stats.lust += 50;
        }

    }
}