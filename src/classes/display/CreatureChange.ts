import MainScreen from './MainScreen';
import { BreastCup } from '../Body/BreastRow';
import Cock from '../Body/Cock';
import CockSpot from '../Body/CockSpot';
import Creature from '../Body/Creature';
import Vagina, { VaginaLooseness } from '../Body/Vagina';
import BallsDescriptor from '../Descriptors/BallsDescriptor';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import HeadDescriptor from '../Descriptors/HeadDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Player from '../Player';
import Utils from '../Utilities/Utils';

export default class CreatureChange {
    public static lengthChange(body: Creature, lengthChange: number, ncocks: number): void {

        if (lengthChange < 0 && Flags.list[FlagEnum.HYPER_HAPPY]) {  // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
            return;
        }

        const cocks: CockSpot = body.lowerBody.cockSpot;
        const firstCock: Cock = cocks.get(0);

        //DIsplay the degree of length change.
        if (lengthChange <= 1 && lengthChange > 0) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeCock(body, firstCock) + " has grown slightly longer.", false);
            if (cocks.count() > 1) {
                if (ncocks == 1)
                    MainScreen.text("One of your " + CockDescriptor.describeMultiCockShort(body) + " grows slightly longer.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("Some of your " + CockDescriptor.describeMultiCockShort(body) + " grow slightly longer.", false);
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " seem to fill up... growing a little bit larger.", false);
            }
        }
        if (lengthChange > 1 && lengthChange < 3) {
            if (cocks.count() == 1)
                MainScreen.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.describeCock(body, firstCock) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor.describeMultiCockShort(body) + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.", false);
                if (ncocks == 1)
                    MainScreen.text("A very pleasurable feeling spreads from your groin as one of your " + CockDescriptor.describeMultiCockShort(body) + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("A very pleasurable feeling spreads from your groin as " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.", false);
            }
        }
        if (lengthChange >= 3) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeCock(body, firstCock) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.", false);
            if (cocks.count() > 1) {
                if (ncocks == 1)
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " feel incredibly tight as one of their number begins to grow inch after inch of length.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " feel incredibly number as " + Utils.numToCardinalText(ncocks) + " of them begin to grow inch after inch of added length.", false);
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " feel incredibly tight as inch after inch of length pour out from your groin.", false);
            }
        }
        //Display LengthChange
        if (lengthChange > 0) {
            if (firstCock.cockLength >= 8 && firstCock.cockLength - lengthChange < 8) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>Most men would be overly proud to have a tool as long as yours.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + CockDescriptor.describeMultiCock(body) + ".</b>", false);
            }
            if (firstCock.cockLength >= 12 && firstCock.cockLength - lengthChange < 12) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeCock(body, firstCock) + " is so long it nearly swings to your knee at its full length.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeMultiCockShort(body) + " are so long they nearly reach your knees when at full length.</b>", false);
            }
            if (firstCock.cockLength >= 16 && firstCock.cockLength - lengthChange < 16) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeCock(body, firstCock) + " would look more at home on a large horse than you.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>Your " + CockDescriptor.describeMultiCockShort(body) + " would look more at home on a large horse than on your body.</b>", false);
                if (body.upperBody.chest.BreastRatingLargest[0].breastRating >= BreastCup.C) {
                    if (cocks.count() == 1)
                        MainScreen.text("  You could easily stuff your " + CockDescriptor.describeCock(body, firstCock) + " between your breasts and give yourself the titty-fuck of a lifetime.", false);
                    if (cocks.count() > 1)
                        MainScreen.text("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.", false);
                }
                else {
                    if (cocks.count() == 1)
                        MainScreen.text("  Your " + CockDescriptor.describeCock(body, firstCock) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.", false);
                    if (cocks.count() > 1)
                        MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(body) + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.", false);
                }
            }
            if (firstCock.cockLength >= 20 && firstCock.cockLength - lengthChange < 20) {
                if (cocks.count() == 1)
                    MainScreen.text("  <b>As if the pulsing heat of your " + CockDescriptor.describeCock(body, firstCock) + " wasn't enough, the tip of your " + CockDescriptor.describeCock(body, firstCock) + " keeps poking its way into your view every time you get hard.</b>", false);
                if (cocks.count() > 1)
                    MainScreen.text("  <b>As if the pulsing heat of your " + CockDescriptor.describeMultiCockShort(body) + " wasn't bad enough, every time you get hard, the tips of your " + CockDescriptor.describeMultiCockShort(body) + " wave before you, obscuring the lower portions of your vision.</b>", false);
                if (body.stats.cor > 40 && body.stats.cor <= 60) {
                    if (cocks.count() > 1)
                        MainScreen.text("  You wonder if there is a demon or beast out there that could take the full length of one of your " + CockDescriptor.describeMultiCockShort(body) + "?", false);
                    if (cocks.count() == 1)
                        MainScreen.text("  You wonder if there is a demon or beast out there that could handle your full length.", false);
                }
                if (body.stats.cor > 60 && body.stats.cor <= 80) {
                    if (cocks.count() > 1)
                        MainScreen.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.describeMultiCockShort(body) + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.", false);
                    if (cocks.count() == 1)
                        MainScreen.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor.describeCock(body, firstCock) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.", false);
                }
                if (body.stats.cor > 80) {
                    if (cocks.count() > 1)
                        MainScreen.text("  You find yourself fantasizing about impaling nubile young champions on your " + CockDescriptor.describeMultiCockShort(body) + " in a year's time.", false);
                }
            }
        }
        //Display the degree of length loss.
        if (lengthChange < 0 && lengthChange >= -1) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " has shrunk to a slightly shorter length.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " have shrunk to a slightly shorter length.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " have shrunk to a slightly shorter length.", false);
                if (ncocks == 1)
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " has shrunk to a slightly shorter length.", false);
            }
        }
        if (lengthChange < -1 && lengthChange > -3) {
            if (cocks.count() == 1)
                MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " shrinks smaller, flesh vanishing into your groin.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " shrink smaller, the flesh vanishing into your groin.", false);
                if (ncocks == 1)
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " shrink smaller, the flesh vanishing into your groin.", false);
                if (ncocks > 1 && ncocks < cocks.count())
                    MainScreen.text("You feel " + Utils.numToCardinalText(ncocks) + " of your " + CockDescriptor.describeMultiCockShort(body) + " shrink smaller, the flesh vanishing into your groin.", false);
            }
        }
        if (lengthChange <= -3) {
            if (cocks.count() == 1)
                MainScreen.text("A large portion of your " + CockDescriptor.describeMultiCockShort(body) + "'s length shrinks and vanishes.", false);
            if (cocks.count() > 1) {
                if (ncocks == cocks.count())
                    MainScreen.text("A large portion of your " + CockDescriptor.describeMultiCockShort(body) + " receeds towards your groin, receding rapidly in length.", false);
                if (ncocks == 1)
                    MainScreen.text("A single member of your " + CockDescriptor.describeMultiCockShort(body) + " vanishes into your groin, receding rapidly in length.", false);
                if (ncocks > 1 && cocks.count() > ncocks)
                    MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(body) + " tingles as " + Utils.numToCardinalText(ncocks) + " of your members vanish into your groin, receding rapidly in length.", false);
            }
        }
    }

    // Attempts to put the player in heat (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if she is already pregnant or is a he.
    // 
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the 
    // duration and intensity. Defaults to 1.
    public static goIntoHeat(body: Creature, intensity: number = 1) {
        //Already in heat, intensify further.
        if (body.inHeat) {
            MainScreen.text("\n\nYour mind clouds as your " + VaginaDescriptor.describeVagina(body, body.lowerBody.vaginaSpot.get(0)) + " moistens.  Despite already being in heat, the desire to copulate constantly grows even larger.", false);
            const statusAffectHeat: StatusAffect = body.statusAffects.get("Heat");
            statusAffectHeat.value1 += 5 * intensity;
            statusAffectHeat.value2 += 5 * intensity;
            statusAffectHeat.value3 += 48 * intensity;
            body.stats.bimboIntReduction = true;
            body.stats.lib += 5 * intensity;
        }
        //Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
        else {
            MainScreen.text("\n\nYour mind clouds as your " + VaginaDescriptor.describeVagina(body, body.lowerBody.vaginaSpot.get(0)) + " moistens.  Your hands begin stroking your body from top to bottom, your sensitive skin burning with desire.  Fantasies about bending over and presenting your needy pussy to a male overwhelm you as <b>you realize you have gone into heat!</b>", false);
            body.statusAffects.add(new StatusAffect("Heat", 10 * intensity, 15 * intensity, 48 * intensity, 0));
            body.stats.bimboIntReduction = true;
            body.stats.lib += 15 * intensity;
        }
    }

    // Attempts to put the player in rut (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if he is a she.
    // 
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the 
    // duration and intensity. Defaults to 1.
    public static goIntoRut(body: Creature, intensity: number = 1) {
        //Has rut, intensify it!
        if (body.inRut) {
            MainScreen.text("\n\nYour " + CockDescriptor.describeCock(body, body.lowerBody.cockSpot.get(0)) + " throbs and dribbles as your desire to mate intensifies.  You know that <b>you've sunken deeper into rut</b>, but all that really matters is unloading into a cum-hungry cunt.", false);
            const statusAffectRut: StatusAffect = body.statusAffects.get("Rut");
            statusAffectRut.value1 = 100 * intensity;
            statusAffectRut.value2 = 5 * intensity;
            statusAffectRut.value3 = 48 * intensity;
            body.stats.bimboIntReduction = true;
            body.stats.lib += 5 * intensity;
        }
        else {
            MainScreen.text("\n\nYou stand up a bit straighter and look around, sniffing the air and searching for a mate.  Wait, what!?  It's hard to shake the thought from your head - you really could use a nice fertile hole to impregnate.  You slap your forehead and realize <b>you've gone into rut</b>!", false);
            //v1 - bonus cum production
            //v2 - bonus body.stats.libido
            //v3 - time remaining!
            body.statusAffects.add(new StatusAffect("Rut", 150 * intensity, 5 * intensity, 100 * intensity, 0));
            body.stats.bimboIntReduction = true;
            body.stats.lib += 5 * intensity;
        }
    }

    public static ballsRemovalDescription(creature: Creature) {
        MainScreen.text("  <b>Your " + BallsDescriptor.describeSack(creature) + " and " + BallsDescriptor.describeSack(creature) + " shrink and disappear, vanishing into your groin.</b>", false);
    }

    public static removeCocksDescriptor(creature: Creature, removed: number) {
        let cocks = creature.lowerBody.cockSpot;
        //Texts
        if (removed == 1) {
            if (cocks.count() == 0) {
                MainScreen.text("<b>Your manhood shrinks into your body, disappearing completely.</b>", false);
                if (creature.statusAffects.has("Infested")) MainScreen.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
            }
            if (cocks.count() == 1) {
                MainScreen.text("<b>Your smallest penis disappears, shrinking into your body and leaving you with just one " + CockDescriptor.describeCock(creature, creature.lowerBody.cockSpot.get(0)) + ".</b>", false);
            }
            if (cocks.count() > 1) {
                MainScreen.text("<b>Your smallest penis disappears forever, leaving you with just your " + CockDescriptor.describeMultiCockShort(creature) + ".</b>", false);
            }
        }
        if (removed > 1) {
            if (cocks.count() == 0) {
                MainScreen.text("<b>All your male endowments shrink smaller and smaller, disappearing one at a time.</b>", false);
                if (creature.statusAffects.has("Infested")) MainScreen.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
            }
            if (cocks.count() == 1) {
                MainScreen.text("<b>You feel " + Utils.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with just your " + CockDescriptor.describeCock(creature, creature.lowerBody.cockSpot.get(0)) + ".", false);
            }
            if (cocks.count() > 1) {
                MainScreen.text("<b>You feel " + Utils.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with " + CockDescriptor.describeMultiCockShort(creature) + ".", false);
            }
        }
        //remove infestation if cockless
        if (cocks.count() == 0 && creature.statusAffects.has("Infested"))
            creature.statusAffects.remove("Infested");
        if (cocks.count() == 0 && creature.lowerBody.balls > 0) {
            MainScreen.text("  <b>Your " + BallsDescriptor.describeSack(creature) + " and " + BallsDescriptor.describeBallsShort(creature) + " shrink and disappear, vanishing into your groin.</b>", false);
            creature.lowerBody.balls = 0;
            creature.lowerBody.ballSize = 1;
        }
    }

    public static growHair(creature: Creature, amount: number = .1): boolean {
        //Grow hair!
        const hairLength: number = creature.upperBody.head.hairLength;
        creature.upperBody.head.hairLength += amount;
        if (creature.upperBody.head.hairLength > 0 && hairLength == 0) {
            MainScreen.text("\n<b>You are no longer bald.  You now have " + HeadDescriptor.describeHair(creature) + " coating your head.\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 1 && hairLength < 1) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 3 && hairLength < 3) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 6 && hairLength < 6) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 10 && hairLength < 10) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 16 && hairLength < 16) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 26 && hairLength < 26) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 40 && hairLength < 40) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        else if (creature.upperBody.head.hairLength >= 40 && creature.upperBody.head.hairLength >= creature.tallness && hairLength < creature.tallness) {
            MainScreen.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HeadDescriptor.describeHair(creature) + ".\n</b>", false);
            return true;
        }
        return false;
    }

    public static HPChange(player: Player, changeAmount: number) {
        if (changeAmount > 0 && player.stats.HP == player.stats.maxHP()) {
            MainScreen.text("You're as healthy as you can be.\n", false);
            return;
        }

        const oldHP = player.stats.HP;
        player.stats.HP += changeAmount;
        const diff = player.stats.HP - oldHP;

        if (diff > 0) {
            if (player.stats.HP == player.stats.maxHP())
                MainScreen.text("Your HP maxes out at " + player.stats.maxHP() + ".\n", false);
            else
                MainScreen.text("You gain " + diff + " HP.\n", false);
        }
        //Negative HP
        else if (diff < 0) {
            if (player.stats.HP == 0)
                MainScreen.text("You take " + diff + " damage, dropping your HP to 0.\n", false);
            else
                MainScreen.text("You take " + diff + " damage.\n", false);
        }
    }

    public static stretchVagina(creature: Creature, cArea: number, display: boolean, spacingsF: boolean = false, spacingsB: boolean = true): boolean {
        if (!creature.lowerBody.vaginaSpot.hasVagina()) return false;
        const firstVagina: Vagina = creature.lowerBody.vaginaSpot.get(0);
        let wasVirgin: boolean = firstVagina.virgin;
        let stretched: boolean = creature.stretchVagina(cArea);
        let devirgined: boolean = wasVirgin && !firstVagina.virgin;
        if (devirgined) {
            if (spacingsF) MainScreen.text("  ");
            MainScreen.text("<b>Your hymen is torn, robbing you of your virginity.</b>", false);
            if (spacingsB) MainScreen.text("  ");
        }
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (display && stretched) {
            //Virgins get different formatting
            if (devirgined) {
                //If no spaces after virgin loss
                if (!spacingsB) MainScreen.text("  ");
            }
            //Non virgins as usual
            else if (spacingsF) MainScreen.text("  ");
            if (firstVagina.vaginalLooseness == VaginaLooseness.LEVEL_CLOWN_CAR)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
            if (firstVagina.vaginalLooseness == VaginaLooseness.GAPING_WIDE)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is stretched so wide that it gapes continually.</b>");
            if (firstVagina.vaginalLooseness == VaginaLooseness.GAPING)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
            if (firstVagina.vaginalLooseness == VaginaLooseness.LOOSE)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is now very loose.</b>", false);
            if (firstVagina.vaginalLooseness == VaginaLooseness.NORMAL)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is now a little loose.</b>", false);
            if (firstVagina.vaginalLooseness == VaginaLooseness.TIGHT)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is stretched out to a more normal size.</b>");
            if (spacingsB) MainScreen.text("  ");
        }
        return stretched;
    }
    public static stretchButt(creature: Creature, cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
        var stretched: boolean = creature.stretchButt(cArea);
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (stretched && display) {
            if (spacingsF) MainScreen.text("  ");
            if (creature.lowerBody.butt.analLooseness == 5) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
            if (creature.lowerBody.butt.analLooseness == 4) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " becomes so stretched that it gapes continually.</b>", false);
            if (creature.lowerBody.butt.analLooseness == 3) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " is now very loose.</b>");
            if (creature.lowerBody.butt.analLooseness == 2) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " is now a little loose.</b>");
            if (creature.lowerBody.butt.analLooseness == 1) MainScreen.text("<b>You have lost your anal virginity.</b>", false);
            if (spacingsB) MainScreen.text("  ");
        }
        return stretched;
    }
}