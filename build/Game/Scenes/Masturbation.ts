import Scenes from './Scenes';
import DisplayText from '../../Engine/display/DisplayText';
import MainScreen from '../../Engine/Display/MainScreen';
import { randInt } from '../../Engine/Utilities/SMath';
import BreastRow from '../Body/BreastRow';
import Cock, { CockType } from '../Body/Cock';
import { VaginaWetness } from '../Body/Vagina';
import Character from '../Character/Character';
import * as CockDescriptor from '../Descriptors/CockDescriptor';
import * as VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Menus from '../Menus/Menus';

export default function display(player: Character): void {
    if (player.torso.cocks.count > 0 && (player.torso.cocks.get(0).type === CockType.BEE)) {
        DisplayText().clear();
        DisplayText("Although your bee cock aches you know that there's no way for you to get relief on your own.  When you touch your shaft or think about cumming images of the bee girl and the sound of her hypnotic buzzing fill your mind.");
        MainScreen.doNext(Menus.Player);
        return;
    }

    // if ((player.perks.has(PerkType.HistoryReligious) && player.stats.cor <= 66) || (player.perks.has(PerkType.Enlightened) && player.stats.cor < 10)) {
    //     if (player.statusAffects.has(StatusAffectType.Exgartuan) && player.statusAffects.get(StatusAffectType.Exgartuan).value2 === 0)
    //         MainScreen.addButton(button++, "Masturbate", masturbateGo);
    //     else MainScreen.addButton(button++, "Meditate", meditate);
    // }
    // else MainScreen.addButton(button++, "Masturbate", masturbateGo);
    // // catofellato
    // if (player.torso.cocks.count > 0 && (player.perks.has(PerkType.Flexibility) || Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] > 0)) {
    //     MainScreen.addButton(button++, "Lick Cock", catAutoLick);
    // }
    // if (player.torso.vaginas.count > 0 && (player.perks.has(PerkType.Flexibility) || Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] > 0)) {
    //     MainScreen.addButton(button++, "Lick 'Gina", lickYerGirlParts);
    // }
    // if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0 && player.torso.vaginas.count > 0)).length {
    //     MainScreen.addButton(button++, "Tentapussy", tentacleSelfFuck);
    // }
    // if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0)).length {
    //     MainScreen.addButton(button++, "Tentabutt", tentacleGoesUpYerPooperNewsAtEleven);
    // }
    // if (player.canOvipositBee() && player.stats.lust >= 33 && player.torso.cocks.biggestCocks[0].area > 100) {
    //     MainScreen.addButton(button++, "LayInCock", getHugeEggsInCawk);
    // }
    // if (player.canOviposit() && player.torso.chest.hasFuckableNipples() && player.stats.lust >= 33 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 21) {
    //     MainScreen.addButton(button++, "LayInTits", layEggsInYerTits);
    // }
    // if (fappingItems(false))
    //     MainScreen.addButton(8, "Items", fappingItems);
    // else if (button === 1) { // If you can only masturbate or meditate the normal way then do that automatically
    //     if ((player.perks.has(PerkType.HistoryReligious) && player.stats.cor <= 66) || (player.perks.has(PerkType.Enlightened) && player.stats.cor < 10)) {
    //         if (player.statusAffects.has(StatusAffectType.Exgartuan) && player.statusAffects.get(StatusAffectType.Exgartuan).value2 === 0)
    //             masturbateGo();
    //         else meditate();
    //     }
    //     else masturbateGo();
    //     funcs = new Array();
    //     args = new Array();
    //     return;
    // }

    MainScreen.displayChoices(["Masturbate"], [masturbateGo], ["Back"], [Menus.Player]);
}

function masturbateGo() {
    DisplayText().clear();
    DisplayText("Maturbation Placeholder");
    MainScreen.doNext(Menus.Player);
}

// function fappingItems(menus: boolean = true): boolean {
//     let button: number = 0; // Will be greater than zero by the end if the player owns any fapping items
//     const canReachCock: boolean = player.torso.cocks.count > 0 && (!player.torso.hips.legs.isTaur() || player.torso.cocks.list[player.longestCock()].cockLength >= player.tallness * (5 / 6));

//     if (player.hasKeyItem("Deluxe Dildo") >= 0 && player.torso.vaginas.count > 0 && !player.torso.hips.legs.isTaur()) {
//         if (menus) MainScreen.addButton(button, "D. Dildo", deluxeDildo);
//         button++;
//     }
//     if (player.hasKeyItem("All-Natural Onahole") >= 0 && canReachCock) {
//         if (menus) MainScreen.addButton(button, "AN Onahole", allNaturalOnaholeUse);
//         button++;
//     }
//     if (player.hasKeyItem("Deluxe Onahole") >= 0 && canReachCock) {
//         if (menus) MainScreen.addButton(button, "D Onahole", deluxeOnaholeUse);
//         button++;
//     }
//     if (player.hasKeyItem("Plain Onahole") >= 0 && canReachCock) {
//         if (menus) MainScreen.addButton(button, "Onahole", onaholeUse);
//         button++;
//     }
//     if (player.hasKeyItem("Self-Stimulation Belt") >= 0 && player.torso.vaginas.count > 0 && !player.torso.hips.legs.isTaur()) {
//         if (menus) MainScreen.addButton(button, "Stim-Belt", stimBeltUse);
//         button++;
//     }
//     if (player.hasKeyItem("All-Natural Self-Stimulation Belt") >= 0 && player.torso.vaginas.count > 0 && !player.torso.hips.legs.isTaur()) {
//         if (menus) MainScreen.addButton(button, "AN Stim-Belt", allNaturalStimBeltUse);
//         button++;
//     }
//     if (player.hasKeyItem("Dual Belt") >= 0 && player.gender === 3 && !player.torso.hips.legs.isTaur()) {
//         if (menus) MainScreen.addButton(button, "Dual Belt", dualBeltMasturbation);
//         button++;
//     }
//     if (player.hasKeyItem("Fake Mare") >= 0 && player.torso.cocks.count > 0 && player.torso.hips.legs.isTaur()) {
//         if (menus) MainScreen.addButton(button, "Fake Mare", centaurDudesGetHorseAids);
//         button++;
//     }
//     if (player.hasKeyItem("Centaur Pole") >= 0 && player.torso.vaginas.count > 0 && player.torso.hips.legs.isTaur()) {
//         if (menus) MainScreen.addButton(button, "C. Pole", centaurGirlsGetHorseAids);
//         button++;
//     }
//     if (player.hasKeyItem("Dildo") >= 0) {
//         if (menus) MainScreen.addButton(button, "Anal Dildo", dildoButts);
//         button++;
//         if (player.torso.vaginas.count > 0) MainScreen.addButton(button, "Dildo", stickADildoInYourVagooSlut);
//     }
//     if (menus) MainScreen.addButton(9, "Back", masturbateMenu);
//     return button > 0;
// }

// // Non-shitty masturbation
// export function masturbateGo(player: Character): void {
//     DisplayText().clear();
//     if (player.statusAffects.has(StatusAffectType.Dysfunction)) {
//         DisplayText("You'd love to masturbate, but your sexual organs' numbness makes it impossible.  You'll have to find something to fuck to relieve your lust.");
//         MainScreen.doNext(Menus.Player);
//         return;
//     }
//     if (player.torso.cocks.count > 0 && (player.torso.cocks.get(0).type === CockType.BEE)) {
//         DisplayText("Although your bee cock aches you know that there's no way for you to get relief on your own.  When you touch your shaft or think about cumming images of the bee girl and the sound of her hypnotic buzzing fill your mind.");
//         MainScreen.doNext(Menus.Player);
//         return;
//     }
//     // if (inDungeon) {
//     //     DisplayText("There is no way you could get away with masturbating in a place like this!  You'd better find your way back to camp if you want to take care of that.");
//     //     MainScreen.doNext(Menus.Player);
//     //     return;
//     // }
//     if (player.torso.hips.legs.isTaur()) {
//         if (centaurMasturbation())
//             MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//         else MainScreen.doNext(Menus.Player);
//         return;
//     }
//     if (player.gender === 0) {
//         genderlessMasturbate();
//         player.stats.lust += -50;
//         MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//         return;
//     }
//     // if (player.statusAffects.has(StatusAffectType.Exgartuan) && player.statusAffects.get(StatusAffectType.Exgartuan).value2 === 0) {
//     //     if (player.torso.hips.legs.isNaga() && randInt(2) === 0 && player.statusAffects.get(StatusAffectType.Exgartuan).value1 === 1)
//     //         Game.exgartuan.exgartuanNagaStoleMyMasturbation();
//     //     else Game.exgartuan.exgartuanMasturbation();
//     //     return;
//     // }
//     // if (player.countCockSocks("gilded") > 0 && Flags.list[FlagEnum.GILDED_JERKED] < player.countCockSocks("gilded")) {
//     //     gildedCockTurbate();
//     //     return;
//     // }
//     let autofellatio: boolean = false;
//     const hermtastic: boolean = false;
//     let nippleFuck: boolean = false;
//     // Early prep
//     if (player.stats.cor < 15)
//         DisplayText("You sheepishly find some rocks to hide in, where you remove your clothes.\n\n");
//     else if (player.stats.cor < 30)
//         DisplayText("You make sure you are alone and strip naked.\n\n");
//     else if (player.stats.cor < 60)
//         DisplayText("You happily remove your " + player.inventory.equipment.armor.displayName + ", eager to pleasure yourself.\n\n");
//     else if (player.stats.cor < 80)
//         DisplayText("You strip naked in an exaggerated fashion, hoping someone might be watching.\n\n");
//     else DisplayText("You strip naked, fondling your naughty bits as you do so and casting seductive looks around, hoping someone or something is nearby to fuck you.\n\n");
//     // Tit foreplay
//     titForeplay();
//     // Touch our various junks
//     if (player.torso.cocks.count > 0) {
//         if (player.torso.cocks.count === 1) {
//             DisplayText("You stroke your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)));
//             if (player.stats.lib < 45)
//                 DisplayText(" eagerly, quickly bringing yourself to a full, throbbing state.  ");
//             else if (player.stats.lib < 70)
//                 DisplayText(" languidly, reveling at its near-constant hardness.  ");
//             else DisplayText(" teasingly, pre-cum running down your length from your constant state of arousal.  ");
//         }
//         else {
//             DisplayText("You stroke your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)));
//             if (player.stats.lib < 45)
//                 DisplayText(" eagerly, quickly bringing your cocks to a full, throbbing state.  ");
//             else if (player.stats.lib < 70)
//                 DisplayText(" languidly, reveling at their near-constant hardness.  ");
//             else DisplayText(" teasingly, pre-cum running down your cocks from your constant state of arousal, pooling around you.  ");
//         }
//     }
//     if (player.torso.vaginas.count > 0) {
//         if (player.torso.vaginas.count === 1) {
//             // 0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
//             if (player.stats.lib < 45)
//                 DisplayText("You touch and play with your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ", ");
//             else if (player.stats.lib < 70)
//                 DisplayText("You slap your pussy softly, ");
//             else DisplayText("You touch your enflamed and aroused " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ", ");
//             switch (player.torso.vaginas.get(0).wetness) {
//                 case VaginaWetness.DRY:
//                     DisplayText("expertly arousing your female parts.  "); break;
//                 case VaginaWetness.NORMAL:
//                     DisplayText("sighing as it quickly becomes moist.  "); break;
//                 case VaginaWetness.WET:
//                     DisplayText("giggling as your fingers get a little wet.  "); break;
//                 case VaginaWetness.SLICK:
//                     DisplayText("smiling as your fingers become coated in your slick fluids.  "); break;
//                 case VaginaWetness.DROOLING:
//                     DisplayText("slicking your fingers in the juices that constantly dribble from " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "  "); break;
//                 default:
//                     DisplayText("licking your lips as a small spurt of fluid squirts from your nethers.");
//             }
//         }
//         if (player.torso.vaginas.count > 1) {
//             if (player.stats.lib < 45)
//                 DisplayText("You touch and play with your many folds, ");
//             else if (player.stats.lib < 70)
//                 DisplayText("You slap your pussies softly, ");
//             else DisplayText("Touch your enflamed and aroused " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "s, ");
//             switch (player.torso.vaginas.get(0).wetness) {
//                 case VaginaWetness.DRY:
//                     DisplayText("expertly arousing your female parts.  "); break;
//                 case VaginaWetness.NORMAL:
//                     DisplayText("sighing as they quickly becomes moist.  "); break;
//                 case VaginaWetness.WET:
//                     DisplayText("giggling as your fingers get a little wet.  "); break;
//                 case VaginaWetness.SLICK:
//                     DisplayText("smiling as your fingers become coated in your slick fluids.  "); break;
//                 case VaginaWetness.DROOLING:
//                     DisplayText("slicking your fingers in the juices that constantly dribble from " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "s  "); break;
//                 default:
//                     DisplayText("licking your lips as small spurts of fluid squirt from your nethers.");
//             }
//         }
//     }
//     /*******************************
//     ||       MASTURBATION CORE    ||
//     \\*****************************/

//     // Cock masturbation!
//     if (player.torso.cocks.count === 1) {
//         // New lines for masturbation!
//         DisplayText("\n\n");
//         // 1.8 thick enough to satisfy all women
//         // 3 hard time fucking women
//         // 5 lucky to find demon/animal
//         const onlyCock = player.torso.cocks.get(0);
//         if (onlyCock.thickness < 1.8)
//             DisplayText("You easily wrap a hand around your " + CockDescriptor.describeCock(player, onlyCock) + " and start masturbating.  ");
//         else if (onlyCock.thickness < 3) {
//             DisplayText("You have some difficulty fitting your hand around your " + CockDescriptor.describeCock(player, onlyCock) + ", relishing the feelings of your ");
//             if (onlyCock.type === CockType.HORSE)
//                 DisplayText("animalistic");
//             else if (onlyCock.hasKnot())
//                 DisplayText("bulbous beast");
//             else DisplayText("large");
//             DisplayText(" endowment as you begin masturbating.  ");
//         }
//         else if (onlyCock.thickness < 5) {
//             DisplayText("You use both hands to grip your " + CockDescriptor.describeCock(player, onlyCock) + ", feeling the throbbing of your " + (onlyCock.hasKnot() ? "knot" : "member") + " as you begin to masturbate.  ");
//         }
//         else DisplayText("You grasp onto your " + CockDescriptor.describeCock(player, onlyCock) + " with both hands, but fail to encircle it fully as you begin to masturbate.  ");
//         // If length > 12 proud
//         // if length > 16 looong strokes (maybe tittyfucK?)
//         // if length > 20 selfsuck
//         if (onlyCock.length < 12) {
//             if (onlyCock.type === CockType.HUMAN)
//                 DisplayText("You stroke quickly, pleasuring your sensitive dick, darting down to fondle the base of your cock.  ");
//             else if (onlyCock.type === CockType.HORSE)
//                 DisplayText("You stroke quickly, reveling in your sensitive horseflesh, darting down to fondle your sensitive sheath.  ");
//             else if (onlyCock.type === CockType.DOG)
//                 DisplayText("You stroke quickly, pleasuring your sensitive, canine erection, darting down to fondle the sensitive sheath at the base of your cock.  ");
//             else if (onlyCock.type === CockType.TENTACLE)
//                 DisplayText("You stroke quickly, pleasuring the supple length of your tentacular endowment, fondling every inhuman nodule as you slide along every inch of twisting length.  ");
//             else if (onlyCock.type === CockType.DEMON)
//                 DisplayText("You stroke quickly, pleasuring the bumpy ridges of your demonic tool, fondling every inhuman nodule as you slide along the entire twitching length.  ");
//             else if (onlyCock.type === CockType.CAT)
//                 DisplayText("You stroke quickly, feeling the tiny 'barbs' of your " + CockDescriptor.describeCock(player, onlyCock) + " sliding through your fingers, even darting down to circle the sensitive skin around your sheath.  ");
//             else if (onlyCock.type === CockType.LIZARD)
//                 DisplayText("You stroke quickly, pleasuring your sensitive " + CockDescriptor.describeCock(player, onlyCock) + ", sliding fingers over each ridge and bump that covers its knotty length.  ");
//             else if (onlyCock.type === CockType.ANEMONE)
//                 DisplayText("You stroke quickly, gasping as your fingers are stung repeatedly with the aphrodisiac-laced tentacles around the base of your " + CockDescriptor.describeCock(player, onlyCock) + " and under its crown.  ");
//             else if (onlyCock.type === CockType.DISPLACER)
//                 DisplayText("You stroke quickly, pleasuring your sensitive, alien endowment, darting down to fondle the sensitive sheath as your pointed tip opens into a wiggling, starfish-like shape.  ");
//             else DisplayText("You stroke quickly, pleasuring your sensitive dick, darting down to fondle the base of your cock.  ");
//         }
//         else if (onlyCock.length < 20) {
//             if (onlyCock.type === CockType.HUMAN)
//                 DisplayText("You delight in teasing the crown of your " + CockDescriptor.describeCock(player, onlyCock) + ", rubbing it at the end of each stroke, squeezing out dollops of pre to smear over it and tease yourself with.  It seems to pulse and twitch with each stroke, responding to every touch.  ");
//             else if (onlyCock.type === CockType.HORSE)
//                 DisplayText("You delight in teasing the sensitive flared tip of your " + CockDescriptor.describeCock(player, onlyCock) + ", rubbing it at the end of each stroke, squeezing out dollops of pre to smear over it and tease yourself with.  It seems to pulse and ripple with each stroke, responding to every touch.  ");
//             else if (onlyCock.type === CockType.DOG)
//                 DisplayText("You delight in teasing the pointed tip of your " + CockDescriptor.describeCock(player, onlyCock) + ", rubbing it at the end of each stroke, squeezing out dollops of pre to smear over it and tease yourself with.  Your knot seems to pulse and twitch with each stroke, reacting to every touch.  ");
//             else if (onlyCock.type === CockType.TENTACLE)
//                 DisplayText("You delight in teasing the over-sized mushroom-like tip of your " + CockDescriptor.describeCock(player, onlyCock) + ", caressing it after every stroke as you squeeze out dollops of pre to smear along its slimy length.  It writhes and twists in your hands of it's own volition, lengthening and shortening with each set of strokes.  ");
//             else if (onlyCock.type === CockType.DEMON)
//                 DisplayText("You delight in teasing the larger bumps that form a ring around the crown of your " + CockDescriptor.describeCock(player, onlyCock) + ", watching as they twitch and spasm in time with the dollops of pre you're squeezing out and smearing over the entire length.  ");
//             else if (onlyCock.type === CockType.CAT)
//                 DisplayText("You delight in teasing the sensitive nubs all along your " + CockDescriptor.describeCock(player, onlyCock) + ", circling the cock-tip at the end of each stroke to gather pre and slather it over your entire length.  Each of the tiny 'barbs' provides bursts of pleasure with each stroke, driving you on.  ");
//             else if (onlyCock.type === CockType.LIZARD)
//                 DisplayText("You delight in teasing the rounded bulbs that cover your " + CockDescriptor.describeCock(player, onlyCock) + ", circling them with your fingertips before sliding up to the urethra and gathering a drop of pre.  You smear it over your sensitive reptile skin and revel in the pleasure radiating through you.  ");
//             else if (onlyCock.type === CockType.ANEMONE)
//                 DisplayText("You delight in grabbing hold of the tiny, stinging tentacles around the base and squeezing them between your " + CockDescriptor.describeCock(player, onlyCock) + " and hand.  Aphrodisiac pours into your blood as you release them and stroke along the length, gathering dollops of pre to coat yourself with and 'accidentally' bumping the other tentacles at the crown.  ");
//             else if (onlyCock.type === CockType.DISPLACER)
//                 DisplayText("You delight in teasing the opened tip of your " + CockDescriptor.describeCock(player, onlyCock) + ", rubbing it at the end of each stroke, watching it squeeze out dollops of pre that you smear over it to tease yourself with.  Your knot seems to pulse and twitch with each stroke, reacting to every touch.  ");
//             else DisplayText("You delight in teasing the crown of your " + CockDescriptor.describeCock(player, onlyCock) + ", rubbing it at the end of each stroke, squeezing out dollops of pre to smear over it and tease yourself with.  It seems to pulse and twitch with each stroke, responding to every touch.  ");
//         }
//         else if (onlyCock.length < 26) {
//             if (onlyCock.type === CockType.HUMAN)
//                 DisplayText("The head of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles towards your face as you masturbate, a dollop of pre slowly growing atop it.  ");
//             else if (onlyCock.type === CockType.HORSE)
//                 DisplayText("The flared tip of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles towards your face as you masturbate, a dollop of pre slowly growing atop it.  ");
//             else if (onlyCock.type === CockType.DOG)
//                 DisplayText("The pointed tip of your " + CockDescriptor.describeCock(player, onlyCock) + " angles towards your face as you masturbate, a dollop of pre slowly leaking from it.  ");
//             else if (onlyCock.type === CockType.TENTACLE)
//                 DisplayText("The overly wide head of your " + CockDescriptor.describeCock(player, onlyCock) + " bumps against your lips as you masturbate, waving back and forth like a snake as it searches for an orifice.  ");
//             else if (onlyCock.type === CockType.DEMON)
//                 DisplayText("The purplish head of your " + CockDescriptor.describeCock(player, onlyCock) + " bumps against your lips as you masturbate, flushing darkly with every beat of your heart.  ");
//             else if (onlyCock.type === CockType.CAT)
//                 DisplayText("The slightly pointed tip of your " + CockDescriptor.describeCock(player, onlyCock) + " bumps against your lips as you masturbate, flushing with blood as your spines grow thicker in your hand.  ");
//             else if (onlyCock.type === CockType.LIZARD)
//                 DisplayText("The pointed, purple tip of your " + CockDescriptor.describeCock(player, onlyCock) + " bumps against your lips while its knotted surface flushes near-purple and seems to grow thicker.  ");
//             else if (onlyCock.type === CockType.ANEMONE)
//                 DisplayText("The tentacle-ringed tip of your " + CockDescriptor.describeCock(player, onlyCock) + " brushes against your lips, making them tingle with artificial heat while you stroke it.  ");
//             else if (onlyCock.type === CockType.DISPLACER)
//                 DisplayText("The blooming tip of your " + CockDescriptor.describeCock(player, onlyCock) + " angles towards your face as you masturbate, a dollop of pre slowly leaking out of the outstretched top.  ");
//             else DisplayText("The head of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles towards your face as you masturbate, a dollop of pre slowly growing atop it.  ");
//             // try to stick it in a titty!
//             if (player.torso.chest.filter(BreastRow.FuckableNipples).length > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3) {
//                 // UNFINISHED - TWEAK PENETRATION VALUES
//                 nippleFuck = true;
//                 titFuckSingle();
//             }
//             else {
//                 // autofellatio doesnt get to be true unless you keep it in your mouth instead of sticking it in your boob.
//                 DisplayText("You give in to temptation and swallow the tip, slurping greedily as you milk your " + CockDescriptor.describeCock(player, onlyCock) + " of its pre-cum.  ");
//                 autofellatio = true;
//             }
//             if (player.torso.chest.filter(BreastRow.CanTitFuck).length > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3 && !nippleFuck) {
//                 DisplayText("Your hands migrate to your breasts of their own accord, wrapping your titflesh around your " + CockDescriptor.describeCock(player, onlyCock) + ", jacking it up and down in your pillowy tits.  ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//         }
//         else {
//             if (onlyCock.type === CockType.HUMAN)
//                 DisplayText("The head of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles over, bumping your face and smearing your lips with its copious pre-cum.  You are unable to resist opening your mouth and sucking it down, filling your mouth with your cock.  ");
//             else if (onlyCock.type === CockType.HORSE)
//                 DisplayText("The flared tip of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles over, bumping your face and smearing your lips with its copious pre-cum.  You are unable to resist opening your mouth and sucking it down, filling your mouth with horsemeat.  ");
//             else if (onlyCock.type === CockType.DOG)
//                 DisplayText("The head of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles over, bumping your face and smearing your lips with its copious pre-cum.  You are unable to resist opening your mouth and sucking it down, filling your mouth with your " + CockDescriptor.describeCock(player, onlyCock) + ".  ");
//             else if (onlyCock.type === CockType.TENTACLE)
//                 DisplayText("The bulbous, mushroom-like head of your " + CockDescriptor.describeCock(player, onlyCock) + " pushes against your face eagerly, smearing pre-cum over your lips as it seeks entrance to the nearest orifice.  You're unable to resist opening your mouth to suck it down, filling your mouth with slick rubbery cock-tentacle.  ");
//             else if (onlyCock.type === CockType.DEMON)
//                 DisplayText("The tainted swollen head of your " + CockDescriptor.describeCock(player, onlyCock) + " pushes against your face, smearing sweet pre-cum over your lips.  You're unable to resist opening wide and taking in the demonic member, submitting wholly to the desire to pleasure your corrupted body-parts.  ");
//             else if (onlyCock.type === CockType.CAT)
//                 DisplayText("The pointed tip of your " + CockDescriptor.describeCock(player, onlyCock) + " pushes against your face, smearing pre-cum over your lips and tickling you with the many barbs.  You're unable to resist opening wide and taking in the " + CockDescriptor.describeCock(player, onlyCock) + ", half-humming half-purring in contentment.  ");
//             else if (onlyCock.type === CockType.LIZARD)
//                 DisplayText("The slightly-pointed tip of your " + CockDescriptor.describeCock(player, onlyCock) + " pushes against your face, smearing pre-cum over your eager lips.   You can't resist opening wide and slipping it inside as your hands caress the reptilian bulges along your length.  ");
//             else if (onlyCock.type === CockType.ANEMONE)
//                 DisplayText("The rounded, tentacle-ringed tip of your " + CockDescriptor.describeCock(player, onlyCock) + " slides against your face, smearing pre-cum over your lips and stinging them with aphrodisiacs that make you pant with lust.  You can't resist opening wide to greedily slurp it down, and in seconds tiny, tingling stings are erupting through your oral cavity, filling you with lust and pleasure.  ");
//             else if (onlyCock.type === CockType.DISPLACER)
//                 DisplayText("The head of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles over, bumping your face and smearing your lips with its copious pre-cum.  Wiggling against your lips, the various protrusions of the 'star' at the tip smear you with your heady emissions.   You are unable to resist opening your mouth and sucking it down, filling your mouth with your " + CockDescriptor.describeCock(player, onlyCock) + ".  ");
//             else DisplayText("The head of your " + CockDescriptor.describeCock(player, onlyCock) + " wobbles over, bumping your face and smearing your lips with its copious pre-cum.  You are unable to resist opening your mouth and sucking it down, filling your mouth with your cock.  ");
//             // try to stick it in a titty!
//             if (player.torso.chest.filter(BreastRow.FuckableNipples).length > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3) {
//                 // In-between text
//                 // UNFINISHED
//                 // DisplayText("You gasp
//                 nippleFuck = true;
//                 // UNFINISHED
//                 titFuckSingle();
//             }
//             else {
//                 // autofellatio doesnt get to be true unless you keep it in your mouth instead of sticking it in your boob.
//                 if (player.stats.cor > 60) {
//                     if (onlyCock.type === CockType.HUMAN)
//                         DisplayText("The heady aroma of your cock fills your nostrils as you force inch after inch into your mouth, deepthroating as much of yourself as you can.  ");
//                     else if (onlyCock.type === CockType.HORSE)
//                         DisplayText("The thick animalistic scent fills your nostrils as you force inch after inch into your mouth, deepthroating as much of yourself as you can.  ");
//                     else if (onlyCock.type === CockType.DOG)
//                         DisplayText("The strong animal scent of your cock fills your nostrils as you force inch after inch into your mouth, deepthroating as much of yourself as you can.  ");
//                     else if (onlyCock.type === CockType.TENTACLE)
//                         DisplayText("The sweet scent of your " + CockDescriptor.describeCock(player, onlyCock) + " fills your nostrils as inch after inch of tentacle forces its way down your throat.  You struggle briefly with it, wrestling to keep it from pushing the whole way into your gut, swooning with the pleasure that fighting with your own cock induces.  ");
//                     else if (onlyCock.type === CockType.DEMON)
//                         DisplayText("The spicy demonic odor your " + CockDescriptor.describeCock(player, onlyCock) + " radiates fills your nostrils as you force inch after inch of tainted meat down your throat.  You struggle briefly, but your " + CockDescriptor.describeCock(player, onlyCock) + " quickly overwhelms your resistance and your gag reflex momentarily seems to disappear.  ");
//                     else if (onlyCock.type === CockType.CAT)
//                         DisplayText("The sweet, slightly tangy scent of your cock fills your nostrils as you force inch after inch into your mouth, deepthroating as much of the prickly shaft as you can.  The soft spines that coat its surface actually feel quite pleasant as you force it deeper, denying your gag reflex.  ");
//                     else if (onlyCock.type === CockType.LIZARD)
//                         DisplayText("The salty, dry odor of your " + CockDescriptor.describeCock(player, onlyCock) + " fills your nostrils as you force inch after inch into your mouth, swallowing as much of the bulgy shaft as you can.  ");
//                     else if (onlyCock.type === CockType.ANEMONE)
//                         DisplayText("The stinging, aphrodisiac-laced " + CockDescriptor.describeCock(player, onlyCock) + " slowly works its way down your throat as you swallow it deeper and deeper, gurgling happily as your throat grows more sensitive.  ");
//                     else if (onlyCock.type === CockType.DISPLACER)
//                         DisplayText("The strong animal scent of your cock fills your nostrils as you force inch after inch into your mouth, deepthroating as much of yourself as you can.  ");
//                     else DisplayText("The heady aroma of your cock fills your nostrils as you force inch after inch into your mouth, deepthroating as much of yourself as you can.  ");
//                 }
//                 autofellatio = true;
//             }
//             if (player.torso.chest.filter(BreastRow.FuckableNipples).length > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3 && !nippleFuck) {
//                 DisplayText("Your hands reach up to your pillowy breasts, wrapping them around the shaft of your " + CockDescriptor.describeCock(player, onlyCock) + ", causing you to let out muffled moans of excitment. ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//         }
//     }
//     else if (player.torso.cocks.count === 2) { // Pair of cocks
//         // Grab it
//         // Play with sheath if has one
//         if (player.torso.cocks.hasSheath()) {
//             DisplayText("Your fingers trace around your sheath, drawing involuntary spasms from your twin members.  ");
//         }
//         // Prep bit + variance based on thickness
//         DisplayText("You grasp one of your " + CockDescriptor.describeMultiCockShort(player) + " in each hand, ");
//         if (player.averageCockThickness() <= 1.8)
//             DisplayText("wrapping your fingers around each tool and just holding yourself, the feelings of two cocks almost too much to bear.  ");
//         else DisplayText("squeezing as many of your tools as your fingers can encircle.  The feeling of squeezing your thick twin cocks is amazing and overwhelming at the same time.  ");
//         // Get into it
//         // Play with it if <= 10"
//         if (player.averageCockLength() <= 10)
//             DisplayText("Your hips twitch of their own volition, force-fucking your hands.  In moments you're fiercely masturbating,  pumping each shaft in turn, pleasure mounting at the base and growing more urgent with each pump.  You squeal softly, and increase the tempo of your masturbation, desperate for release.  ");
//         // Tittyfuck if D cup+
//         else if (player.averageCockLength() < 20) {
//             // autofellatio only gets to be true if you have any dicks left to suck on after sticking them in your boobs
//             DisplayText("You look down at your trembling members, mere inches away, and tentatively lick at a cocktip.  Both dicks begin oozing pre in response.  ");
//             // Try to stick it in a titty!
//             if (player.torso.chest.hasFuckableNipples()) {
//                 // check for dogcocks
//                 if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0)).length; {
//                     // make sure that your cocks will fit in your tits if dogcocks
//                     if (player.torso.chest.hasFuckableNipples()) {
//                         nippleFuck = true;
//                         if (multiTitFuck()) autofellatio = true;
//                     }
//                     else if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) !== player.torso.cocks.count)).length; { // if you have something that will fit
//                         nippleFuck = true;
//                         autofellatio = true;
//                         // UNFINISHED
//                         if (player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) titFuckSingle(); ).length;
//                     } // if you only have dogcocks that are too big, no nipple fuck! Otherwise, run normal multiTitFuck
//                 }
// 					else {
//                     nippleFuck = true;
//                     if (multiTitFuck()) autofellatio = true;
//                 }
//             }
//             // Titfuck (squeeze em both in between 2!
//             if (player.canTitFuck() && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", sandwiching them inside your pillowy mounds.  With delicious slowness you begin jacking yourself off with your tits, your shafts rubbing together between your luxurious breasts, tongue running figure eights across the tips. ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // Titfuck (enough breasts for both!)
//             if (player.canTitFuck() && player.mostBreastsPerRow() > 2 && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", squeezing them between your " + character.torso.chest.count * 2 + " breasts.  With delicious slowness you begin jacking yourself off with your tits, smooth breastflesh massaging your members as you aggressively lick and suck at the tips.  ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your many nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // No tits, jerk and lick!
//             if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 3 && !nippleFuck) {
//                 DisplayText("You slowly stroke yourself, pausing every few strokes to smear the streaks of pre that leak from your " + CockDescriptor.describeMultiCockShort(player) + " over yourself.  As you become more and more lubed and horny, you increase the tempo, until at last you are pumping yourself hard and fast, squeezing your cocks together in pleasure.  ");
//             }
//         }
//         // Deepthroat yourself, maybe titfuck if equipped.
//         else {
//             // autofellatio only gets to be true if you have any dicks left to suck on after sticking them in your boobs
//             DisplayText("Your " + CockDescriptor.describeMultiCockShort(player) + " brush against your face, throbbing with need.   You open your mouth and suck one of your pricks into your mouth, taking as much of it as possible, running your tongue along the underside.  You smile and pop it free, then take a different shaft into your maw.  ");
//             // Try to stick it in a titty!
//             if (player.torso.chest.hasFuckableNipples()) {
//                 // check for dogcocks
//                 if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0)).length; {
//                     // make sure that your cocks will fit in your tits if dogcocks
//                     if (player.torso.chest.hasFuckableNipples()) {
//                         nippleFuck = true;
//                         if (multiTitFuck()) autofellatio = true;
//                     }
//                     else if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) !== player.torso.cocks.count)).length; { // if you have something that will fit
//                         nippleFuck = true;
//                         autofellatio = true;
//                         if (player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0 || player.torso.cocks.countType(CockType.HORSE) > 0) titFuckSingle(); ).length;
//                     }  // if you only have dogcocks that are too big, no nipple fuck! Otherwise, run normal multiTitFuck
//                 }
// 					else {
//                     nippleFuck = true;
//                     if (multiTitFuck()) autofellatio = true;
//                 }
//             }
//             // Titfuck (squeeze em both in between 2!
//             if (player.canTitFuck() && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", sandwiching them inside your pillowy mounds.  With delicious slowness you begin jacking yourself off with your tits, your shafts rubbing together between your luxurious breasts, mouthfucking yourself with each of your cocks in turn. ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // Titfuck (enough breasts for both!)
//             if (player.mostBreastsPerRow() > 2 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3 && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", squeezing them between your " + character.torso.chest.count * 2 + " breasts.  With delicious slowness you begin jacking yourself off with your tits, smooth breastflesh massaging your members as you aggressively mouthfuck each of your cocks. ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your many nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // No tits, jerk and lick!
//             if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 3 && !nippleFuck) {
//                 DisplayText("You slowly stroke yourself, pausing every few strokes to smear the streaks of pre that leak from your " + CockDescriptor.describeMultiCockShort(player) + " over yourself.  As you become more and more lubed and horny, you increase the tempo, until at last you are pumping yourself hard and fast, squeezing your cocks together in pleasure.  ");
//             }
//         }
//     }
//     else if (player.torso.cocks.count >= 3) { // Three or more cocks
//         // Grab it
//         // Play with sheath if has one
//         if (player.torso.cocks.hasSheath()) {
//             DisplayText("Your fingers trace around your sheath, drawing involuntary spasms from your cocks.  ");
//         }
//         // Prep bit + variance based on thickness
//         DisplayText("You grasp one of your " + CockDescriptor.describeMultiCockShort(player) + " in each hand, ");
//         if (player.averageCockThickness() <= 1.8)
//             DisplayText("wrapping your fingers around each tool and just holding yourself, the feelings of your " + num2Text(player.torso.cocks.count) + " cocks making you feel giddy.  ");
//         else DisplayText("squeezing as many of your tools as your fingers can encircle.  The feeling of rubbing your bundle of cocks together is indescribable.  Your eyes roll back in uncontrollable pleasure.  ");
//         // Get into it
//         // Play with it if <= 10"
//         if (player.averageCockLength() <= 10)
//             DisplayText("Your hips twitch of their own volition, forcing you to fuck your hands.  In moments you're fiercely masturbating,  pumping each shaft in turn, pleasure mounting in your loins and growing more urgent with each pump.  You squeal softly, and increase the tempo of your masturbation, desperate for release.  ");
//         // Tittyfuck if D cup+
//         else if (player.averageCockLength() < 20) {
//             // autofellatio only gets to be true if you have any dicks left to suck on after sticking them in your boobs
//             DisplayText("You look down at your trembling members, mere inches away, and tentatively lick at a cocktip.  Your dicks begin oozing pre in response.  ");
//             // Try to stick it in a titty!
//             if (player.torso.chest.hasFuckableNipples()) {
//                 // check for dogcocks
//                 if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0)).length; {
//                     // make sure that your cocks will fit in your tits if dogcocks
//                     if (player.torso.chest.hasFuckableNipples()) {
//                         nippleFuck = true;
//                         if (multiTitFuck()) autofellatio = true;
//                     }
//                     else if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) !== player.torso.cocks.count)).length; { // if you have something that will fit
//                         nippleFuck = true;
//                         autofellatio = true;
//                         if ((player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0 || player.torso.cocks.countType(CockType.HORSE) > 0) && player.torso.cocks.count - player.torso.cocks.countType(CockType.DOG) === 1)).length titFuckSingle();
//                         if (player.torso.cocks.count - player.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length > 1) multiTitFuck();
//                     } // if you only have dogcocks that are too big, no nipple fuck! Otherwise, run normal multiTitFuck
//                 }
// 					else {
//                     nippleFuck = true;
//                     if (multiTitFuck()) autofellatio = true;
//                 }
//             }
//             // Titfuck (squeeze em both in between 2!
//             if (player.canTitFuck() && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", sandwiching them inside your pillowy mounds.  With delicious slowness you begin jacking yourself off with your tits, your shafts rubbing together between your luxurious breasts, your tongue running figure eights across the tips. ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // Titfuck (enough breasts for both!)
//             if (player.mostBreastsPerRow() > 2 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3 && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", squeezing them between your " + character.torso.chest.count * 2 + " breasts.  With delicious slowness you begin jacking yourself off with your tits, smooth breastflesh massaging your members as you aggressively lick and suck at the tips.  ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your many nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // No tits, jerk and lick!
//             if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 3 && !nippleFuck) {
//                 DisplayText("You slowly stroke yourself, pausing every few strokes to smear the streaks of pre that leak from your " + CockDescriptor.describeMultiCockShort(player) + " over yourself.  As you become more and more lubed and horny, you increase the tempo, until at last you are pumping yourself hard and fast, squeezing your cocks together in pleasure.  ");
//             }
//         }
//         // Deepthroat yourself, maybe titfuck if equipped.
//         if (player.averageCockLength() >= 20) {
//             // autofellatio only gets to be true if you have any dicks left to suck on after sticking them in your boobs
//             DisplayText("Your " + CockDescriptor.describeMultiCockShort(player) + " brush against your face, throbbing with need.   You open your mouth and suck one of your pricks into your mouth, taking as much of it in as possible, running your tongue along the underside.  You smile and pop it free, then take a different shaft into your maw.  ");
//             // Try to stick it in a titty!
//             if (player.torso.chest.hasFuckableNipples()) {
//                 // check for dogcocks
//                 if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length > 0) {
//                     // make sure that your cocks will fit in your tits if dogcocks
//                     if (player.torso.chest.hasFuckableNipples()) {
//                         nippleFuck = true;
//                         if (multiTitFuck()) autofellatio = true;
//                     }
//                     else if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length !== player.torso.cocks.count) { // if you have something that will fit
//                         nippleFuck = true;
//                         autofellatio = true;
//                         if ((player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN)).length > 0 ||
//                             player.torso.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) &&
//                             player.torso.cocks.count - player.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length === 1
//                         )
//                             titFuckSingle();
//                         if (player.torso.cocks.count - player.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length > 1) multiTitFuck();
//                     } // if you only have dogcocks that are too big, no nipple fuck! Otherwise, run normal multiTitFuck
//                 }
//                 else {
//                     nippleFuck = true;
//                     if (multiTitFuck()) autofellatio = true;
//                 }
//             }
//             // Titfuck (squeeze em both in between 2!
//             if (player.canTitFuck() && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", sandwiching them inside your pillowy mounds.  With delicious slowness you begin jacking yourself off with your tits, your shafts rubbing together between your luxurious breasts, mouthfucking yourself with each of your cocks in turn. ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // Titfuck (enough breasts for both!)
//             if (player.mostBreastsPerRow() > 2 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3 && !nippleFuck) {
//                 DisplayText("You wrap your " + BreastDescriptor.breastCup(player.torso.chest.get(0)) + " tits around your " + CockDescriptor.describeMultiCockShort(player) + ", squeezing them between your " + player.torso.chest.count * 2 + " breasts.  With delicious slowness you begin jacking yourself off with your tits, smooth breastflesh massaging your members as you aggressively mouthfuck each of your cocks. ");
//                 if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) DisplayText("Jets of milk squirt out of your many nipples with each thrust of your hips, adding to the already copious amounts of fluids coating your body. ");
//             }
//             // No tits, jerk and lick!
//             if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 3 && !nippleFuck) {
//                 DisplayText("You slowly stroke yourself, pausing every few strokes to smear the streaks of pre that leak from your " + CockDescriptor.describeMultiCockShort(player) + " over yourself.  As you become more and more lubed and horny, you increase the tempo, until at last you are pumping yourself hard and fast, squeezing your cocks together in pleasure.  ");
//             }
//         }
//     }
//     // Vaginal Masturbation
//     if (player.torso.vaginas.count > 0) {
//         DisplayText("\n\n");
//         // Single cunt
//         if (player.torso.vaginas.count === 1) {
//             DisplayText("You let your hand roam over your pussy-lips, slowly teasing yourself, diving deeper into your folds to arouse and expose your clit.  ");
//             // Smaller clits
//             if (player.torso.clit.length < 1.5) {
//                 DisplayText("You stroke and tease around the sensitive little pleasure bud, letting your fingers plumb the depths below.  ");
//             }
//             // Big clits
//             else if (player.torso.clit.length < 4.5) {
//                 DisplayText("Your large clit is already poking out from your ");
//                 if (player.torso.vaginas.get(0).wetness > VaginaWetness.DRY) DisplayText("glistening ");
//                 DisplayText("lips.  You gently stroke and touch it until it grows as large as a tiny cock.  ");
//             }
//             // Cock-sized clits
//             else {
//                 DisplayText("Your cock-sized clit is already fully engorged and deliciously sensitive.  You touch it softly, eliciting a quiet moan from your throat.  ");
//             }
//             switch (player.torso.vaginas.get(0).wetness) {
//                 case VaginaWetness.DRY:
//                     DisplayText("You have some difficulty with your relatively dry pussy, but you manage to gently and pleasurably masturbate by taking it slowly.  "); break;
//                 case VaginaWetness.NORMAL:
//                     DisplayText("Your horny puss is aching for attention and you oblige it, dipping your fingers into the moist honeypot, and jilling yourself vigorously.  "); break;
//                 case VaginaWetness.WET:
//                     DisplayText("The moistened cleft on your groin demands your full attention, drawing your fingers deep inside to explore the wet passage.  "); break;
//                 case VaginaWetness.SLICK:
//                     DisplayText("The sweltering heat of your slick cunt aches for something to fill it, and you oblige, dipping your fingers into your slippery cunt.  "); break;
//                 case VaginaWetness.DROOLING:
//                     DisplayText("Warm wetness runs down your legs in thick streams, pouring from your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  You smile sheepishly and stroke up your now slickened legs to your pussy-lips, parting them and letting your fingers dive inside the wet channel.  "); break;
//                 default:
//                     DisplayText("The heavy scent of female arousal fills the air as your steamy sexpot drizzles girl-lube everywhere.  You gasp in surprise as your fingers find their way inside, vigorously fingerfucking your passage, spurts of girlcum squirting out with each penetration.  ");
//             }
//         }
//     }
//     // ORGASM GOES HERE
//     orgazmo(autofellatio, nippleFuck);
//     // POST MASTUBLATORY BLISS
//     DisplayText("\n\n");
//     if (player.torso.cocks.count > 0) {
//         // Single Cock
//         if (player.torso.cocks.count === 1) {
//             const onlyCock = player.torso.cocks.get(0);
//             if (player.stats.lib < 30)
//                 DisplayText("You quickly fall asleep, spent. ");
//             else if (player.stats.lib < 55)
//                 DisplayText("You roll and begin to doze, your semi-erect " + CockDescriptor.describeCock(player, onlyCock) + " flopping against you. ");
//             else if (player.stats.lib <= 80) {
//                 DisplayText("As you close your eyes and relax, your " + CockDescriptor.describeCock(player, onlyCock) + " surges back to erectness, ensuring ");
//                 if (player.stats.cor < 50)
//                     DisplayText("your dreams will be filled with sex.");
//                 else DisplayText("you dream in a depraved kinky fantasia.");
//             }
//             else DisplayText("You groan and drift to sleep, your rigid " + CockDescriptor.describeCock(player, onlyCock) + " pulsing and throbbing with continual lust.");
//         }
//         // Multi Cock
//         else {
//             if (player.stats.lib < 30)
//                 DisplayText("You quickly fall asleep, spent. ");
//             else if (player.stats.lib < 55)
//                 DisplayText("You roll and begin to doze for an hour, your semi-erect cocks flopping against you. ");
//             else if (player.stats.lib <= 80) {
//                 DisplayText("As you close your eyes and relax, your dicks surge back to erectness, ensuring ");
//                 if (player.stats.cor < 50)
//                     DisplayText("your dreams will be filled with sex.");
//                 else DisplayText("you dream in a depraved kinky fantasia.");
//             }
//             else DisplayText("You groan and drift into a brief catnap, your rigid erections pulsing and throbbing with continual lust.");
//         }
//     }
//     // No cock ending
//     else {
//         if (player.torso.vaginas.count > 0)
//             DisplayText("You sigh softly and drift off into a quick nap, smelling of sex."); // Girl ending
//         else DisplayText("You sigh and drift off to sleep."); // Genderless ending
//     }
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// // Genderless people suck!
// function genderlessMasturbate(player: Character): void {
//     DisplayText().clear();
//     // Early prep
//     if (player.stats.cor < 15)
//         DisplayText("You sheepishly find some rocks to hide in, where you remove your clothes.\n\n");
//     else if (player.stats.cor < 30)
//         DisplayText("You make sure you are alone and strip naked.\n\n");
//     else if (player.stats.cor < 60)
//         DisplayText("You happily remove your " + player.inventory.equipment.armor.displayName + ", eager to pleasure yourself.\n\n");
//     else if (player.stats.cor < 80)
//         DisplayText("You strip naked in an exaggerated fashion, hoping someone might be watching.\n\n");
//     else {
//         if (player.torso.cocks.count > 0 || player.torso.vaginas.count > 0)
//             DisplayText("You strip naked, fondling your naughty bits as you do so and casting seductive looks around, hoping someone or something is nearby to fuck you.\n\n");
//         else DisplayText("You strip naked, casting seductive looks around, hoping someone or something is nearby to fuck you.\n\n");
//     }
//     // Tit foreplay
//     titForeplay();
//     if (!player.statusAffects.has(StatusAffectType.FappedGenderless)) { // first time as a genderless person
//         DisplayText("Now this might be a problem. Here you are ready to get your rocks off and you have no idea how to do it. Nothing to do except some trial and error. You run your hands gently over where your genitals would be. Lightly you pet the skin and feel your finger tips tickle what was once your most pleasurable of places. While it feels incredibly nice, it just isn't getting you there. You teeter at the edge and it only frustrates you further. Unsure of what to do next, your body gives you a little nudge in an unexplored avenue and you decide to take the trip.\n\n");
//         player.statusAffects.add(StatusAffectType.FappedGenderless, 0, 0, 0, 0);
//     }
//     // All times as a genderless person (possibly written for all genders perhaps not herm (not enough hands)) -
//     DisplayText("Your " + ButtDescriptor.describeButthole(player.torso.butt) + " begins to twitch. It's practically crying out for attention.\n\n");
//     DisplayText("You lay down on your side and reach gingerly behind yourself.  The palm of your hand comes to rest on your " + ButtDescriptor.describeButt(player) + ".  You slide your finger into your crack and find your " + ButtDescriptor.describeButthole(player.torso.butt) + ".  You run your finger slowly around the sensitive ring of your hole and feel a tingle emanating from it. A smile creeps across your lips as you begin to imagine what is about to happen.\n\n");
//     // For all parts of scene penetration type changes based on anus size '''any (if you do not want to do more than one variable) or virgin pucker or tight/normal/loose/gaping'''-
//     // If no BioLube perk -
//     if (player.torso.butt.wetness < 2) {
//         DisplayText("Bringing your hand up to your mouth, you coat your ");
//         if (player.torso.butt.looseness <= 2)
//             DisplayText("middle finger");
//         else if (player.torso.butt.looseness === 3)
//             DisplayText("first two fingers");
//         else DisplayText("hand");
//         DisplayText(" in a generous helping of saliva and head back for your " + ButtDescriptor.describeButthole(player.torso.butt) + ".\n\n");
//     }
//     // If BioLube or continuing from no biolube -
//     else {
//         DisplayText("The lubrication you have created allows you to easily sink your finger");
//         if (player.torso.butt.looseness >= 3) DisplayText("s");
//         DisplayText(" into your asshole. A shiver runs up your spine as you plunge ");
//         if (player.torso.butt.looseness <= 2)
//             DisplayText("in all the way to your knuckle");
//         else if (player.torso.butt.looseness === 3)
//             DisplayText("all the way to the first two knuckles");
//         else if (player.torso.butt.looseness === 4)
//             DisplayText("your three knuckles");
//         else DisplayText("your four fingers in deep");
//         DisplayText(". Slowly you begin to push and pull your finger");
//         if (player.torso.butt.looseness >= 3) DisplayText("s");
//         DisplayText(" in and out of your anus. A slight moan escapes you as you begin to pick up pace.\n\n");
//     }
//     // If gaping -
//     if (player.torso.butt.looseness === 5) {
//         DisplayText("A devilish thought crosses your mind. You have taken into yourself all manner of beasts and beings. There is only one real way to achieve the pleasure you have gotten from them on your own. You slowly force your whole hand into your " + ButtDescriptor.describeButthole(player.torso.butt) + " and are greeted with a fullness that you never thought you would achieve without assistance. As you move in and out you begin to slowly close your hand into a fist and open it up again over and over.\n\n");
//     }
//     // All scene types -
//     DisplayText("Pleasure begins to fill your body with warmth. You deliberately start to twist your hand as you pump your pleasure hole with a deep desire. Your asshole begins to violently open and close around your invading ");
//     if (player.torso.butt.looseness <= 2)
//         DisplayText("digit");
//     else if (player.torso.butt.looseness < 5)
//         DisplayText("digits");
//     else DisplayText("hand");
//     DisplayText(" as your toes curl and an orgasm wracks your body.");
//     // If BioLube perk -
//     if (player.torso.butt.wetness >= 2) {
//         DisplayText("  You withdraw your ");
//         if (player.torso.butt.looseness <= 2)
//             DisplayText("finger");
//         else if (player.torso.butt.looseness < 5)
//             DisplayText("fingers");
//         else DisplayText("hand");
//         DisplayText(" and see it coated in the warm lube you produce. The scent and ecstasy you are in drive you over the edge and you begin to lick what once was inside you clean. Another orgasm drills through you and your body shakes for several seconds.");
//         // Still Horny -
//         if (player.stats.lib >= 75)
//             DisplayText("\n\nRolling over, you fall to sleep while your hole drips and twitches, ensuring your dreams to be filled with the most erotic of thoughts.");
//         else DisplayText("\n\nRolling over, you are completely spent and fall to sleep while your well-worked hole drips.");
//     }
//     // No BioLube perk -
//     else {
//         DisplayText("  You withdraw your ");
//         if (player.torso.butt.looseness <= 2)
//             DisplayText("finger");
//         else if (player.torso.butt.looseness < 5)
//             DisplayText("fingers");
//         else DisplayText("hand");
//         DisplayText(" and dry ");
//         if (player.torso.butt.looseness <= 2)
//             DisplayText("it");
//         else if (player.torso.butt.looseness < 5)
//             DisplayText("them");
//         else DisplayText("it");
//         DisplayText(" off.");
//         // Still Horny -
//         if (player.stats.lib > 75)
//             DisplayText("  Satisfied, you roll over and drift off to sleep. Your hole remains warm, ready for another round.");
//         else DisplayText("  Satisfied, you roll over and drift off to sleep.");
//     }
// }

// function titForeplay(player: Character): void {
//     // Ok lets touch our boobies if we haz them and they are big enough
//     if (player.torso.chest.count === 1 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3) {
//         if (player.stats.lib < 45)
//             DisplayText("You caress your " + BreastDescriptor.describeBreastRow(player.torso.chest.get(0)) + " gently with your fingers");
//         else if (player.stats.lib < 70)
//             DisplayText("You grope your " + BreastDescriptor.describeBreastRow(player.torso.chest.get(0)) + " agressively with both hands");
//         else DisplayText("You squeeze your " + BreastDescriptor.describeBreastRow(player.torso.chest.get(0)) + " brutally with both hands");
//     }
//     else if (player.torso.chest.count > 1 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3) {
//         if (player.stats.lib < 45)
//             DisplayText("You hesitantly run your hands across your front, caressing each of your " + num2Text(character.torso.chest.count * 2) + " breasts in turn. ");
//         else if (player.stats.lib < 70)
//             DisplayText("You run your hands across your front, squeezing each of your " + num2Text(character.torso.chest.count * 2) + " breasts in turn. ");
//         else DisplayText("You aggressively run your hands across your front, groping each of your " + num2Text(character.torso.chest.count * 2) + " breasts in turn. ");
//         // different attitude based on player.corruption (ashamed/feels too good to care/reveling in how fucked up you are)
//         if (player.stats.cor <= 25)
//             DisplayText("You blink back tears of shame as you experience the tactile proof of your abnormal endowments, unable to resist mashing your " + BreastDescriptor.describeAllBreasts(player) + " together");
//         else if (player.stats.cor < 75)
//             DisplayText("Though a small part of you is horrified by your abnormal endowments, it doesn't stop you from mashing your " + BreastDescriptor.describeAllBreasts(player) + " together");
//         else DisplayText("The tactile reminder of your abnormal endowments gives you a delicious thrill.  You sigh and mash your tits together");
//     }
//     // If nips are fuckable
//     if (player.torso.chest.hasFuckableNipples() && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3) {
//         // more than one row?
//         if (player.torso.chest.count >= 1) DisplayText(" as you move your attention to your nipples");
//         // Different attitude based on libido
//         if (player.stats.lib < 60)
//             DisplayText(". Hesitantly, you rub your fingers across the ");
//         else DisplayText(". Eagerly, you begin to roughly stroke the ");
//         // Different description based on vag looseness
//         if (player.averageVaginalLooseness() < 2)
//             DisplayText("small, delicate openings at the tip of each nipple. ");
//         else if (player.averageVaginalLooseness() < 4)
//             DisplayText("puckered holes at the tip of each nipple. ");
//         // add "many if lots of nips
//         else if (player.torso.chest.averageNipplesPerBreast() > 1)
//             DisplayText("many ");
//         else DisplayText("swollen, cunt-like lips that top each breast. ");
//         // Different noise based on sensitivity
//         if (player.stats.sens < 45)
//             DisplayText("You sigh contentedly as ");
//         else if (player.stats.sens < 70)
//             DisplayText("You moan lewdly as ");
//         else DisplayText("You squeal with pleasure as ");
//         // Different description based on wetness
//         if (player.averageVaginalWetness() < 2)
//             DisplayText("you feel your nipples loosen up. ");
//         else if (player.averageVaginalWetness() < 4)
//             DisplayText("you begin to slowly spread the slippery secretions leaking from your engorged nipples all over your " + BreastDescriptor.describeBreastRow(player.torso.chest.get(0)) + ". ");
//         else {
//             DisplayText("little spurts of ");
//             // Lactating?
//             if (player.torso.chest.averageLactation() > 0) DisplayText(" milky ");
//             DisplayText("girlcum squirt out of your engorged nipples. ");
//         }
//         // Special extras for lactation
//         if (player.torso.chest.averageLactation() > 0 && player.torso.chest.averageLactation() < 2)
//             DisplayText("Your freakish mammaries drip a sticky combination of cunt-juice and milk, spattering your " + LegDescriptor.describeLegs(player) + " and crotch.");
//         else if (player.torso.chest.averageLactation() < 3)
//             DisplayText("Your freakish mammaries leak thin streams of sticky girlcum mixed with milk all over your " + LegDescriptor.describeLegs(player) + " and crotch.");
//         else DisplayText("Your freakish mammaries constantly drool a steady stream of milky cunt-juice, drenching your " + LegDescriptor.describeLegs(player) + " and crotch in milky goo.");
//     }
//     // If nipples aren't fuckable.
//     else if (player.torso.chest.count > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3) {
//         DisplayText(", emitting ");
//         // different noises depending on sensitivity
//         if (player.stats.sens < 45)
//             DisplayText("soft gasps of pleasure each time you flick one of your ");
//         else if (player.stats.sens < 70)
//             DisplayText("loud moans of pleasure each time you flick one of your ");
//         else DisplayText("squeals of pleasure each time you flick one of your ");
//         // extra bit if you have LOTS of nipples
//         if (player.torso.chest.countNipples() > 2) DisplayText("many ");
//         // different description based on size of nips
//         if (player.stats.lust >= 50) {
//             if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 2)
//                 DisplayText("huge, swollen nipples. ");
//             else if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1)
//                 DisplayText("fat, puckered nipples. ");
//             else DisplayText("erect nipples. ");
//         }
//         else DisplayText("nipples.  ");
//         // Special extras if lactating
//         if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1 && player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 2)
//             DisplayText("Droplets of milk dribble from each nipple, spattering milk onto your " + LegDescriptor.describeLegs(player) + " and crotch.  ");
//         else if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 3)
//             DisplayText("Thin squirts of milk spray from each nipple, spattering milk onto your " + LegDescriptor.describeLegs(player) + " and crotch.  ");
//         else if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 3) DisplayText("A constant stream of milk drizzles from each teat, soaking your " + LegDescriptor.describeLegs(player) + " and crotch.  ");
//     }
// }

// function titFuckSingle(): void {
//     /*DUPLICATE WITH SCENE BELOW)
//     //different based on libido
//     if(player.stats.lib < 45) DisplayText("You grip your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin cautiously guiding it towards ");
//     if(player.stats.lib >= 45 && player.stats.lib < 70) DisplayText("Shivering with anticipation, you place the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " against the opening of ");
//     if(player.stats.lib >= 70) DisplayText("Without hesitation, you shove the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " into ");
//     //More than one row?
//     if(player.torso.chest.count > 1) DisplayText("one of the ",false);
//     if(player.torso.chest.count === 1) DisplayText("one of your ",false);
//     //More than 1 nip per boob?
//     if(player.torso.chest.averageNipplesPerBreast() > 1) DisplayText("many ");
//     //Different based on looseness (again)
//     if(player.averageVaginalLooseness() < 2) DisplayText("painfully stretched nipples");
//     if(player.averageVaginalLooseness() >= 2 && player.averageVaginalLooseness() < 4) DisplayText("freakishly swollen nipples");
//     if(player.averageVaginalLooseness() >= 4) DisplayText("huge, bloated cunt-nipples");
//     if(player.torso.chest.count > 1) DisplayText(" on one of your lower breasts",false);
//     DisplayText(". ");*/

//     // different based on player.libido
//     if (player.stats.lib < 45)
//         DisplayText("You grip your " + CockDescriptor.describeCock(player, ) + " and begin cautiously guiding it towards ");
//     else if (player.stats.lib < 70) {
//         DisplayText("Shivering with anticipation, you place the ");
//         switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//             case CockType.ANEMONE:
//             case CockType.DISPLACER:
//                 DisplayText("wriggling ");
//                 break;
//             case CockType.DEMON:
//                 DisplayText("bump-encircled ");
//                 break;
//             case CockType.DOG:
//             case CockType.FOX:
//                 DisplayText("pointed ");
//                 break;
//             case CockType.HORSE:
//                 DisplayText("flared ");
//                 break;
//             case CockType.TENTACLE:
//                 DisplayText("bulbous ");
//             default:
//         }
//         DisplayText("tip of your " + CockDescriptor.describeCock(player, ) + " against the opening of ");
//         /* Old method
//                 if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("Shivering with anticipation, you place the flared tip of your " + horseDescript(0) + " against the opening of ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("Shivering with anticipation, you place the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " against the opening of ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0) DisplayText("Shivering with anticipation, you place the pointed tip of your " + dogDescript(0) + " against the opening of ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("Shivering with anticipation, you place the bulbous tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " against the opening of ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("Shivering with anticipation, you place the bump-encircled tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " against the opening of ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("Shivering with anticipation, you place the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " against the opening of ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0 || player.displacerCocks() > 0) DisplayText("Shivering with anticipation, you place the wriggling tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " against the opening of ")).length;
//                 else DisplayText("Shivering with anticipation, you place the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " against the opening of ");
//         */
//     }
//     else {
//         DisplayText("Without hesitation, you shove the ");
//         switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//             case CockType.ANEMONE:
//                 DisplayText("tentacle-laden mushroom that is ");
//                 break;
//             case CockType.DEMON:
//                 DisplayText("bump-ringed monstrosity that is ");
//                 break;
//             case CockType.DISPLACER:
//                 DisplayText("opened top of ");
//                 break;
//             case CockType.DOG:
//             case CockType.FOX:
//                 DisplayText("pointed tip of ");
//                 break;
//             case CockType.HORSE:
//                 DisplayText("engorged flare of ");
//                 break;
//             case CockType.HUMAN:
//                 DisplayText("tip of ");
//                 break;
//             case CockType.TENTACLE:
//                 DisplayText("over-sized mushroom that is ");
//                 break;
//             default:
//                 DisplayText(player.cockHead() + " of ");
//         }
//         DisplayText("your " + CockDescriptor.describeCock(player, ) + " into ");
//         /* Old method
//                 if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("Without hesitation, you shove the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " into ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("Without hesitation, you shove the engorged flare of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " into ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0) DisplayText("Without hesitation, you shove the pointed tip of your " + dogDescript(0) + " into ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("Without hesitation, you shove the over-sized mushroom that is your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " into ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("Without hesitation, you shove the bump-ringed monstrosity that is your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " into ")).length;
//                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0) DisplayText("Without hesitation, you shove the tentacle-laden mushroom that is your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " into ")).length;
//                 else if(player.displacerCocks() > 0) DisplayText("Without hesitation, you shove the opened top of your " + CockDescriptor.describeCock(player, x) + " into ");
//                 else DisplayText("Without hesitation, you shove the " + cockHead(0) + " of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " into ");
//         */
//     }
//     // More than one row?
//     if (player.torso.chest.count > 1)
//         DisplayText("one of the ");
//     else DisplayText("one of your ");
//     // More than 1 nip per boob?
//     if (player.torso.chest.averageNipplesPerBreast() > 1) DisplayText("many ");
//     // Different based on looseness (again)
//     if (player.averageVaginalLooseness() < 2)
//         DisplayText("painfully stretched nipples");
//     else if (player.averageVaginalLooseness() < 4)
//         DisplayText("freakishly swollen nipples");
//     else DisplayText("huge, bloated cunt-nipples");
//     if (player.torso.chest.count > 1) DisplayText(" on one of your lower breasts");
//     DisplayText(". ");
//     // How wet/milky is this procedure?
//     if (player.torso.chest.averageLactation() === 0) {
//         if (player.averageVaginalWetness() < 2)
//             DisplayText("Y");
//         else if (player.averageVaginalWetness() < 4) {
//             DisplayText("Slick juices dribble ");
//             switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//                 case CockType.ANEMONE:
//                     DisplayText("over the nearly transparent skin of ");
//                     break;
//                 case CockType.CAT:
//                     DisplayText("over the pink, spiny protrusions that cover ");
//                     break;
//                 case CockType.DEMON:
//                     DisplayText("down the shiny purplish skin and nodules of ");
//                     break;
//                 case CockType.DISPLACER:
//                     DisplayText("over the dusky purple of ");
//                     break;
//                 case CockType.DOG:
//                 case CockType.FOX:
//                     DisplayText("down the red, shiny skin of ");
//                     break;
//                 case CockType.HORSE:
//                     DisplayText("down the mottled skin of ");
//                     break;
//                 case CockType.LIZARD:
//                     DisplayText("down the bumpy purple skin of ");
//                     break;
//                 case CockType.TENTACLE:
//                     DisplayText("down the rubbery skin of ");
//                     break;
//                 default:
//                     DisplayText("down the skin of ");
//             }
//             DisplayText("your " + CockDescriptor.describeCock(player, ) + " and y");
//             /* Old method
//                         if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("Slick juices dribble down the skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("Slick juices dribble down the mottled skin of your " + horseDescript(0) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0) DisplayText("Slick juices dribble down the red, shiny skin of your " + dogDescript(0) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("Slick juices dribble down the rubbery skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("Slick juices dribble down the shiny purplish skin and nodules of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD) > 0) DisplayText("Slick juices dribble down the bumpy purple skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("Slick juices dribble over the pink, spiny protrusions that cover your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0) DisplayText("Slick juices dribble over the nearly transparent skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.displacerCocks() > 0) DisplayText("Slick juices dribble over the dusky purple of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y");
//                         else DisplayText("Slick juices dribble down the skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y");
//             */
//         }
//         else DisplayText("Slick juices squirt out from around your " + CockDescriptor.describeCock(player, ) + " and y");
//     }
//     else {
//         if (player.torso.chest.averageLactation() < 2) {
//             DisplayText("Rivulets of milky girlcum drizzle ");
//             switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//                 case CockType.ANEMONE:
//                     DisplayText("and drip from the many tiny tentacles of ");
//                     break;
//                 case CockType.CAT:
//                     DisplayText("down the spiny, pink flesh of ");
//                     break;
//                 case CockType.DEMON:
//                     DisplayText("down the shiny purplish skin and nodules of ");
//                     break;
//                 case CockType.DISPLACER:
//                     DisplayText("over the purplish, knotted flesh of ");
//                     break;
//                 case CockType.DOG:
//                 case CockType.FOX:
//                     DisplayText("down the red, shiny skin of ");
//                     break;
//                 case CockType.HORSE:
//                     DisplayText("down the mottled skin of ");
//                     break;
//                 case CockType.HUMAN:
//                     DisplayText("down the skin of ");
//                     break;
//                 case CockType.LIZARD:
//                     DisplayText("over the purplish, bumpy flesh of ");
//                     break;
//                 case CockType.TENTACLE:
//                     DisplayText("down the rubbery skin of ");
//                     break;
//                 default:
//                     DisplayText("over the sensitive skin of ");
//             }
//             DisplayText("your " + CockDescriptor.describeCock(player, ) + " and y");
//             /* Old method
//                         if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("Rivulets of milky girlcum drizzle down the skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("Rivulets of milky girlcum drizzle down the mottled skin of your " + horseDescript(0) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0) DisplayText("Rivulets of milky girlcum drizzle down the red, shiny skin of your " + dogDescript(0) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("Rivulets of milky girlcum drizzle down the rubbery skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("Rivulets of milky girlcum drizzle down the shiny purplish skin and nodules of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("Rivulets of milky girlcum drizzle down the spiny, pink flesh of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD) > 0 || player.displacerCocks()) DisplayText("Rivulets of milky girlcum drizzle over the purplish, knotted flesh of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0) DisplayText("Rivulets of milky girlcum drizzle and drip from the many tiny tentacles of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y")).length;
//                         else DisplayText("Rivulets of milky girlcum drizzle over the sensitive skin of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and y");
//             */
//         }
//         else {
//             DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, ) + ", staining ");
//             switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//                 case CockType.ANEMONE:
//                     DisplayText("the odd aquatic shaft white.  Y");
//                     break;
//                 case CockType.CAT:
//                     DisplayText("the pink kitty-skin white.  Y");
//                     break;
//                 case CockType.DEMON:
//                     DisplayText("its purplish-skin white.  Y");
//                     break;
//                 case CockType.DISPLACER:
//                     DisplayText("purple, knotty flesh white.  Y");
//                     break;
//                 case CockType.DOG:
//                 case CockType.FOX:
//                     DisplayText("its shiny skin white.  Y");
//                     break;
//                 case CockType.HORSE:
//                     DisplayText("its mottled skin white.  Y");
//                     break;
//                 case CockType.HUMAN:
//                     DisplayText("it white.  Y");
//                     break;
//                 case CockType.LIZARD:
//                     DisplayText("purple, bumpy flesh white.  Y");
//                     break;
//                 case CockType.TENTACLE:
//                     DisplayText("its rubbery skin white.  Y");
//                     break;
//                 default:
//                     DisplayText("its length white.  Y");
//             }
//             /* Old method
//                         if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", staining it white.  Y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("Milky girlcum squirts out from around your " + horseDescript(0) + ", staining its mottled skin white.  Y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0) DisplayText("Milky girlcum squirts out from around your " + dogDescript(0) + ", staining its shiny skin white.  Y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", staining its rubbery skin white.  Y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", staining its purplish-skin white.  Y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", staining the pink kitty-skin white.  Y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD) > 0 || player.displacerCocks() > 0) DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", staining the purple, knotty flesh white.  Y")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0) DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", staining the odd aquatic shaft wide.  Y")).length;
//                         else DisplayText("Milky girlcum squirts out from around your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", staining its length white.  Y");
//             */
//         }
//     }
//     // Round and compare cock thickness to vag looseness
//     if (Math.round(player.cockArea(0)) >= player.vaginalCapacity()) {
//         // Different noises based on sensitivity
//         if (player.stats.sens < 45)
//             DisplayText("ou grunt with exertion as you attempt to stuff your " + CockDescriptor.describeCock(player, ) + " into ");
//         else if (player.stats.sens < 70)
//             DisplayText("ou blink back tears as you attempt to stuff your " + CockDescriptor.describeCock(player, ) + " into ");
//         else DisplayText("ou scream with a combination of pain and pleasure as you attempt to stuff your " + CockDescriptor.describeCock(player, ) + " into ");
//         // Different based on looseness
//         if (player.averageVaginalLooseness() < 2)
//             DisplayText("the small, over-stretched opening of your swollen nipple. ");
//         else if (player.averageVaginalLooseness() < 4)
//             DisplayText("the engorged and distended opening of your fat, swollen nipple. ");
//         else DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. ");
//         // Compare cockthickness and vaglooseness more specifically
//         // if it barely fits
//         if (Math.round(player.cockArea(0)) === player.vaginalCapacity()) {
//             if (player.averageVaginalLooseness() < 2)
//                 DisplayText("Your poor, tortured nipple is barely up to the task of accepting the " + CockDescriptor.describeCock(player, ) + ", but accept it it does. ");
//             else if (player.averageVaginalLooseness() < 4)
//                 DisplayText("The engorged opening at the end of your swollen nipple is stretched to its limit as you shove your " + CockDescriptor.describeCock(player, ) + " home. ");
//             else {
//                 switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//                     case CockType.ANEMONE:
//                         DisplayText("The swollen tips of your bloated nipple wrap around the stinging tentacles that surround your " + CockDescriptor.describeCock(player, ) + "'s tip, convulsing with wet squishing sounds as they become red and enflamed with artificial lust.  ");
//                         break;
//                     case CockType.CAT:
//                         DisplayText("The swollen tips of your bloated nipples stretch around the barbed tip of your " + CockDescriptor.describeCock(player, ) + ", swallowing it like an enormous mouth.  ");
//                         break;
//                     case CockType.DEMON:
//                         DisplayText("The swollen lips of your bloated nipple stretch around the nodule-ringed tip of your " + CockDescriptor.describeCock(player, ) + ", swallowing it like an enormous mouth.  ");
//                         break;
//                     case CockType.DISPLACER:
//                         DisplayText("The swollen tips of your bloated nipple wrap around the outstretched head of your " + CockDescriptor.describeCock(player, ) + ", convulsing with wet, squishing sounds as it wriggles inside you.  ");
//                         break;
//                     case CockType.DOG:
//                     case CockType.FOX:
//                         DisplayText("The swollen lips of your bloated nipple stretch around the pointed tip of your " + CockDescriptor.describeCock(player, ) + " swallowing it like an enormous mouth.  ");
//                         break;
//                     case CockType.HORSE:
//                         DisplayText("The swollen lips of your bloated nipple stretch around the flared tip of your " + CockDescriptor.describeCock(player, ) + " swallowing it like an enormous mouth.  ");
//                         break;
//                     case CockType.HUMAN:
//                         DisplayText("The swollen lips of your bloated nipple stretch around the tip of your " + CockDescriptor.describeCock(player, ) + " swallowing it like an enormous mouth.  ");
//                         break;
//                     case CockType.LIZARD:
//                         DisplayText("The swollen tips of your bloated nipple wrap around the pointed tip of your " + CockDescriptor.describeCock(player, ) + ", stretching oddly as it swallows the knot-covered appendage.  ");
//                         break;
//                     case CockType.TENTACLE:
//                         DisplayText("The swollen lips of your bloated nipple stretch around the rounded tip of your " + CockDescriptor.describeCock(player, ) + ", swallowing it like an enormous mouth.  ");
//                         break;
//                     default:
//                         DisplayText("tips of your bloated nipples wrap around the " + player.cockHead() + " of your " + CockDescriptor.describeCock(player, ) + ", swallowing it like an enormous mouth.  ");
//                 }
//                 /* Old method
//                                 if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("The swollen lips of your bloated nipple stretch around the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " swallowing it like an enormous mouth. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("The swollen lips of your bloated nipple stretch around the flared tip of your " + horseDescript(0) + " swallowing it like an enormous mouth. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0) DisplayText("The swollen lips of your bloated nipple stretch around the pointed tip of your " + dogDescript(0) + " swallowing it like an enormous mouth. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("The swollen lips of your bloated nipple stretch around the rounded tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", swallowing it like an enormous mouth. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("The swollen lips of your bloated nipple stretch around the nodule-ringed tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", swallowing it like an enormous mouth. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("The swollen tips of your bloated nipples stretch around the barbed tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", swallowing it like an enormous mouth. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD) > 0) DisplayText("The swollen tips of your bloated nipple wrap around the pointed tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", stretching oddly as it swallows the knot-covered appendage. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0) DisplayText("The swollen tips of your bloated nipple wrap around the stinging tentacles that surround your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + "'s tip, convulsing with wet squishing sounds as they become red and enflamed with artificial lust.  ")).length;
//                                 else if(player.displacerCocks() > 0) DisplayText("The swollen tips of your bloated nipple wrap around the outstretched head of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", convulsing with wet, squishing sounds as it wriggles inside you.");
//                                 else DisplayText("The swollen tips of your bloated nipples wrap around the " + cockHead(0) + " of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + ", swallowing it like an enormous mouth. ");
//                 */
//             }
//             DisplayText("With each thrust, you bury your " + CockDescriptor.describeCock(player, ) + " deeper into your greedy tit. Overwhelmed by the combined sensations, your mind is barely able to cope with the intense feeling of fullness where no such feeling should be possible.");
//         }
//         // if it doesnt really fit
//         if (Math.round(player.cockArea(0)) > player.vaginalCapacity()) {
//             if (player.averageVaginalLooseness() < 2)
//                 DisplayText("Your poor, tortured nipple is woefully insufficient compared to your " + CockDescriptor.describeCock(player, ) + ", delerious with arousal, you keep trying anyway. ");
//             else if (player.averageVaginalLooseness() < 4)
//                 DisplayText("The engorged opening at the end of your swollen nipple is stretched to its limits and beyond as you shove your " + CockDescriptor.describeCock(player, ) + " home. ");
//             else {
//                 switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//                     case CockType.ANEMONE:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the stinging tip of your " + CockDescriptor.describeCock(player, ) + " spreads them wider and fills them with artificial lust.  ");
//                         break;
//                     case CockType.CAT:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the barbed tip of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                         break;
//                     case CockType.DEMON:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the tip of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                         break;
//                     case CockType.DISPLACER:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the wide head of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                         break;
//                     case CockType.DOG:
//                     case CockType.FOX:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the massive girth of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                         break;
//                     case CockType.HORSE:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the flared tip of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                         break;
//                     case CockType.HUMAN:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the tip of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                         break;
//                     case CockType.LIZARD:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the pointed tip of your " + CockDescriptor.describeCock(player, ) + " slowly spreads them even wider.  ");
//                         break;
//                     case CockType.TENTACLE:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the tip of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                         break;
//                     default:
//                         DisplayText("The swollen lips of your bloated nipple gape wide, but the " + player.cockHead() + " of your " + CockDescriptor.describeCock(player, ) + " spreads them even wider.  ");
//                 }
//                 /* Old method
//                                 if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("The swollen lips of your bloated nipple gape wide, but the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " spreads them even wider. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("The swollen lips of your bloated nipple gape wide, but the flared tip of your " + horseDescript(0) + " spreads them even wider. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0) DisplayText("The swollen lips of your bloated nipple gape wide, but the massive girth of your " + dogDescript(0) + " spreads them even wider. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("The swollen lips of your bloated nipple gape wide, but the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " spreads them even wider. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("The swollen lips of your bloated nipple gape wide, but the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " spreads them even wider. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("The swollen lips of your bloated nipple gape wide, but the barbed tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " spreads them even wider. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD) > 0) DisplayText("The swollen lips of your bloated nipple gape wide, but the pointed tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " slowly spreads them even wider. ")).length;
//                                 else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0)  DisplayText("The swollen lips of your bloated nipple gape wide, but the stinging tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " spreads them wider and fills them with artificial lust. ")).length;
//                                 else if(player.displacerCocks() > 0)  DisplayText("The swollen lips of your bloated nipple gape wide, but the wide head of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " spreads them even wider. ");
//                                 else DisplayText("The swollen lips of your bloated nipple gape wide, but the " + cockHead(0) + " of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " spreads them even wider. ");
//                 */
//             }
//             DisplayText("Grunting and sweating with effort, you stuff as much of your " + CockDescriptor.describeCock(player, ) + " into your overstretched nipple as you can fit. The feeling of incredible tightness around your " + CockDescriptor.describeCock(player, ) + " combines with the pain of your distended nipple to form a mindbending sensation that makes your head spin. ");
//         }
//         if (player.torso.chest.averageLactation() > 0)
//             DisplayText("Milky ");
//         else DisplayText("Slick ");
//         if (player.averageVaginalWetness() < 2) DisplayText("girl-lube quickly coats the whole length of your " + CockDescriptor.describeCock(player, ) + " in a glistening layer of fuck juice. ");
//         else if (player.averageVaginalWetness() < 4) {
//             DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, ) + " in thick streams, ");
//             switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//                 case CockType.ANEMONE:
//                     DisplayText("pooling around the wriggling tentacles near your base.  ");
//                     break;
//                 case CockType.CAT:
//                     DisplayText("pooling around the spines near your base.  ");
//                     break;
//                 case CockType.DEMON:
//                     DisplayText("pooling around the base of your member.  ");
//                     break;
//                 case CockType.DISPLACER:
//                 case CockType.DOG:
//                 case CockType.FOX:
//                     DisplayText("pooling around the bulb near your base.  ");
//                     break;
//                 case CockType.HORSE:
//                     DisplayText("pooling in and around your sheath.  ");
//                     break;
//                 case CockType.LIZARD:
//                     DisplayText("pooling around the bulbs near your base.  ");
//                     break;
//                 case CockType.TENTACLE:
//                     DisplayText("mixing with the tentacles own lubricants.  ");
//                     break;
//                 default:
//                     DisplayText("pooling at your crotch.  ");
//             }
//             /* Old method
//                         if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling at your crotch. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling in and around your sheath. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, mixing with the tentacles own lubricants. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling around the base of your member. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling around the spines near your base. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD) > 0) DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling around the bulbs near your base. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0)  DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling around the wriggling tentacles near your base. ")).length;
//                         else if(player.hasKnot()) DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling around the bulb near your base. ");
//                         else  DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " in thick streams, pooling around the spines near your base. ");
//             */
//         }
//         else DisplayText("girl-lube spurts out of your tortured nipple with each thrust of your " + CockDescriptor.describeCock(player, ) + ", spattering your arms and face with your secretions. ");
//     }
//     if (Math.round(player.cockArea(0)) < player.vaginalCapacity()) {
//         // Different noises based on sensitivity
//         if (player.stats.sens < 45)
//             DisplayText("ou sigh with pleasure");
//         else if (player.stats.sens < 70)
//             DisplayText("ou moan with pleasure");
//         else DisplayText("ou scream with delight");
//         DisplayText(" as your " + CockDescriptor.describeCock(player, ) + " slides into ");
//         // Different based on looseness
//         if (player.averageVaginalLooseness() < 2)
//             DisplayText("the small, over-stretched opening of your swollen nipple. Your " + CockDescriptor.describeCock(player, ) + " penetrates your swollen nipple easily, sliding halfway in on your first thrust. ");
//         else if (player.averageVaginalLooseness() < 4)
//             DisplayText("the engorged and distended opening of your fat, swollen nipple. Your " + CockDescriptor.describeCock(player, ) + " plunges deeply into your freakishly engorged nipple, penetrating it easily. ");
//         else {
//             DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt.  The swollen lips of your bloated nipple engulf the ");
//             if (player.torso.cocks.get(0).type === CockType.HORSE) DisplayText("flared ");
//             DisplayText("tip of your " + CockDescriptor.describeCock(player, ) + " and begin to slide down its length, ");
//             switch (player.torso.cocks.get(0).type) { // Different way of choosing cock to use, results in consistent description of cock[0]
//                 case CockType.ANEMONE:
//                     DisplayText("swallowing it completely and leaving a searing trail of desire in its wake.  ");
//                     break;
//                 case CockType.CAT:
//                     DisplayText("swallowing it completely as each springy barb makes you quiver with pleasure.  ");
//                     break;
//                 case CockType.DEMON:
//                     DisplayText("swallowing it completely as each bump and nodule makes you quiver with unholy pleasures.  ");
//                     break;
//                 case CockType.DISPLACER:
//                 case CockType.DOG:
//                 case CockType.FOX:
//                     DisplayText("even swallowing your bulging knot without difficulty.  ");
//                     break;
//                 case CockType.LIZARD:
//                     DisplayText("swallowing it completely as each of the bulgy knots along its length stretch the orifice further.  ");
//                     break;
//                 case CockType.TENTACLE:
//                     DisplayText("swallowing it completely as it twists and pulses on its own, fucking your nipple.  ");
//                     break;
//                 default:
//                     DisplayText("swallowing it completely.  ");
//             }
//             /* Old method
//                         if(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN) > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin to slide down its length, swallowing it completely. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the flared tip of your " + horseDescript(0) + " and begin to slide down its length, swallowing it completely. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > 0 || player.displacerCocks() > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + dogDescript(0) + " and begin to slide down its length, even swallowing your bulging knot without difficulty. ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE) > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin to slide down its length, swallowing it completely as it twists and pulses on its own, fucking your nipple.  ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.DEMON) > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin to slide down its length, swallowing it completely as each bump and nodule makes you quiver with unholy pleasures.  ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.CAT) > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin to slide down its length, swallowing it completely as each springy barb makes you quiver with pleasure.  ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD) > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin to slide down its length, swallowing it completely as each of the bulgy knots along its length stretch the orifice further.  ")).length;
//                         else if(player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE) > 0) DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin to slide down its length, swallowing it completely and leaving a searing trail of desire in its path.  ")).length;
//                         else DisplayText("the gaping fuck-mouth of your inhuman nipple-cunt. The swollen lips of your bloated nipple engulf the tip of your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and begin to slide down its length, swallowing it completely. ");
//             */
//         }
//         DisplayText("You revel in the sensation as you slowly stroke your " + CockDescriptor.describeCock(player, ) + " in and out of your distended nipple. Your shaft is enveloped in the warm, wet embrace of your freakish tit, and ");
//         if (player.torso.chest.averageLactation() > 0)
//             DisplayText("milky ");
//         else DisplayText("slippery ");
//         if (player.averageVaginalWetness() < 2)
//             DisplayText("girl-lube quickly coats the whole length of your " + CockDescriptor.describeCock(player, ) + " in a glistening layer of fuck juice. ");
//         else if (player.averageVaginalWetness() < 4)
//             DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, ) + " in thick streams, pooling at your crotch. ");
//         else {
//             if (player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN)).length > 0)
//                 DisplayText("girl-lube pours out of your swollen nipple over your " + CockDescriptor.describeCock(player, ) + " and hands, pooling on the ground below you. ");
//             else if (player.torso.cocks.hasSheath() > 0)
//                 DisplayText("girl-lube drizzles down the length of your " + CockDescriptor.describeCock(player, ) + " in thick streams, pooling in and around your sheath. ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length > 0)
//                 DisplayText("girl-lube pours out of your swollen nipple over your " + CockDescriptor.describeCock(player, ) + " and hands, pooling on the ground below you. ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.DEMON)).length > 0)
//                 DisplayText("girl-lube pours out of your swollen nipple over your " + CockDescriptor.describeCock(player, ) + " and hands, pooling on the ground below you. ");
//             else DisplayText("girl-lube pours out of your swollen nipple over your " + CockDescriptor.describeCock(player, ) + " and hands, pooling on the ground below you. ");
//         }
//     }
// }

// function multiTitFuck(); : boolean; {
//     const holeTotal: number = player.torso.chest.countNipples();
//     const fittableCocks: number = player.torso.cocks.count;
//     let doubleUp: boolean = false;
//     // randomize what kind of dick to start with
//     const randomCock: number = randInt(fittableCocks);
//     multiNippleFuckPrep(randomCock);
//     // Now deal with the rest of your dicks in more general terms
//     // Just how many cocks are we dealing with here?
//     if (holeTotal >= fittableCocks) {
//         if (fittableCocks === 2) // only two dicks total
//             DisplayText("Quickly, you move your other cock into position against ");
//         else if (fittableCocks === 2 || holeTotal === 2) // more than two dicks but only two that fit, or if you have only two holes anyway
//             DisplayText("Quickly, you move another cock into position against ");
//         else if (holeTotal >= fittableCocks) // If you have more than two dicks to use, and enough nipples for all of them
//             DisplayText("Quickly, you move your remaining shafts into position against your other nipples. ");
//         // How many nips?
//         if (holeTotal === 2)
//             DisplayText("your other nipple. ");
//         else if (fittableCocks <= 2)
//             DisplayText("one of your other nipples. ");
//     }
//     // if you dont have enough nipples for all your dicks
//     if (fittableCocks > 2 && holeTotal < fittableCocks) {
//         DisplayText("You are momentarily stumped as you realize that you don't have enough nipples for all of your cocks. ");
//         // can you fit more than one in each?
//         if (player.vaginalCapacity() >= 2 * player.cockArea(randomCock)) {
//             doubleUp = true; // WTF IS MULTIDIVISICATION?  SERIOUSLY?
//             DisplayText("The words \"multiple insertions\" drifts through your lust-fogged brain, and you begin to position two dicks against a poor, unsuspecting nipple, preparing to double-penetrate.  ");
//             // does this give enough space?
//             if (2 * holeTotal >= fittableCocks)
//                 DisplayText("You giggle with glee as you realize that you will be able to jam every single one of your " + CockDescriptor.describeMultiCockShort(player) + " into your abused nipples, thanks to double-penetration! ");
//             else DisplayText("With a flash of irritation, you realize that even if you stick two cocks in each hole, you still won't be able to fit all " + num2Text(player.torso.cocks.count) + " of your dicks into your abused tits. Deciding to make the best of it, you prepare to stuff in as many as you can. ");
//         }
//         else DisplayText("Accepting that you can't do anything about it, you start pushing. ");
//     }
//     // How wet/milky is this procedure?
//     if (player.torso.chest.averageLactation() === 0) {
//         if (player.averageVaginalWetness() < 2)
//             DisplayText("Y");
//         else if (player.averageVaginalWetness() < 4)
//             DisplayText("Slick juices dribble down your shafts, and y");
//         else DisplayText("Slick juices squirt out from around your shafts and y");
//     }
//     else {
//         if (player.torso.chest.averageLactation() < 2)
//             DisplayText("Rivulets of milky girlcum drizzle down your shafts and y");
//         else DisplayText("Milky girlcum squirts out from around your shafts, staining them white. Y");
//     }
//     // Round and compare cock thickness to vag looseness
//     if (Math.round(player.cockArea(randomCock)) >= player.vaginalCapacity()) {
//         // Different noises based on sensitivity
//         if (player.stats.sens < 45)
//             DisplayText("ou grunt with exertion as you attempt to stuff your cocks into ");
//         else if (player.stats.sens < 70)
//             DisplayText("ou blink back tears as you attempt to stuff your cocks into ");
//         else DisplayText("ou scream with a combination of pain and pleasure as you attempt to stuff your cocks into ");
//         // Different based on looseness
//         if (player.averageVaginalLooseness() < 2)
//             DisplayText("the small, over-stretched openings of your swollen nipples. ");
//         else if (player.averageVaginalLooseness() < 4)
//             DisplayText("the engorged and distended openings of your fat, swollen nipples. ");
//         else DisplayText("the gaping fuck-mouths of your inhuman nipple-cunts. ");
//         // Compare cockthickness and vaglooseness more specifically
//         // if it barely fits
//         if (Math.round(player.cockArea(randomCock)) === player.vaginalCapacity()) {
//             if (player.averageVaginalLooseness() < 2)
//                 DisplayText("Your poor, tortured nipples are barely up to the task of accepting your swollen rods, but accept them they do. ");
//             else if (player.averageVaginalLooseness() < 4)
//                 DisplayText("The puckered openings that cap your engorged nipples are stretched to their limits as you shove your fat rods home. ");
//             else DisplayText("The swollen lips of your bloated nipples stretch around your throbbing cocks, swallowing them whole. ");
//             DisplayText("With each thrust, you bury your shafts deeper into your greedy tits. Overwhelmed by the combined sensations, your mind is barely able to cope with the intense feelings of fullness where no such feelings should be possible. ");
//         }
//         // if it doesnt really fit well
//         if (Math.round(player.cockArea(randomCock)) > player.vaginalCapacity()) {
//             if (player.averageVaginalLooseness() < 2)
//                 DisplayText("Your poor, tortured nipples are woefully insufficient compared to the width of your swollen rods. Delirious with arousal, you keep pushing them in anyway. ");
//             else if (player.averageVaginalLooseness() < 4)
//                 DisplayText("The puckered openings that cap your engorged nipples are stretched to their limits and beyond as you shove your fat rods home. ");
//             else DisplayText("The swollen lips of your bloated nipples gape wide, but the enormous girth of your throbbing members spread them even wider. ");
//             DisplayText("Grunting and sweating with effort, you stuff as much cock into each of your overstretched nipples as you can fit. The feeling of incredible tightness around your tools combines with the pain of your distended nipples to form a blizzard of mindbending sensations that makes your head spin. ");
//         }
//         if (player.torso.chest.averageLactation() > 0)
//             DisplayText("Milky ");
//         else DisplayText("Slick ");
//         if (player.averageVaginalWetness() < 2)
//             DisplayText("girl-lube drizzles down your shafts, coating them in glistening layers of fuck juice. ");
//         else if (player.averageVaginalWetness() < 4)
//             DisplayText("girl-lube drools from your tortured nipples in thick streams, pooling beneath your ass. ");
//         else DisplayText("girl-lube spurts out of your tortured nipples with each thrust of your hips, spattering your arms and face with your secretions. ");
//     }
//     if (Math.round(player.cockArea(randomCock)) < player.vaginalCapacity()) {
//         if (!doubleUp) {
//             // Different noises based on sensitivity
//             if (player.stats.sens < 45)
//                 DisplayText("ou sigh with pleasure as your stiff cocks slide into ");
//             else if (player.stats.sens < 70)
//                 DisplayText("ou moan with pleasure as your stiff cocks slide into ");
//             else DisplayText("ou scream with delight as your stiff cocks slide into ");
//             // Different based on looseness
//             if (player.averageVaginalLooseness() < 2)
//                 DisplayText("the small, over-stretched openings on your swollen nipples. Your hard rods penetrate your engorged nipples easily, sliding halfway in on your first thrust. ");
//             else if (player.averageVaginalLooseness() < 4)
//                 DisplayText("the engorged and distended openings on your fat, swollen nipples. Your hard rods plunge deeply into your freakishly engorged nipples, penetrating them easily. ");
//             else DisplayText("the gaping fuck-mouths of your inhuman nipple-cunts. The swollen lips of your bloated nipples engulf your hard rods and begin to slide down their length, swallowing them completely. ");
//             DisplayText("You revel in the sensation as you slowly stroke your shafts in and out of your distended nipples. Your cocks are enveloped in the warm, wet embrace of your freakish tits, and ");
//             if (player.torso.chest.averageLactation() > 0)
//                 DisplayText("milky ");
//             else DisplayText("slippery ");
//             if (player.averageVaginalWetness() < 2)
//                 DisplayText("girl-lube drizzles down your shafts, coating them in glistening layers of fuck juice. ");
//             else if (player.averageVaginalWetness() < 4)
//                 DisplayText("girl-lube drools from your fat nipples in thick streams, pooling beneath your ass. ");
//             else DisplayText("girl-lube pours out of your swollen nipples in a constant deluge of sticky fluid, creating a large puddle beneath you. ");
//         }
//         else {
//             // Different noises based on sensitivity
//             if (player.stats.sens < 45)
//                 DisplayText("ou sigh with pleasure as your stiff cocks slide into ");
//             else if (player.stats.sens < 70)
//                 DisplayText("ou moan with pleasure as your stiff cocks slide into ");
//             else DisplayText("ou scream with delight as your stiff cocks slide into ");
//             // if you have really small dicks or HUGE nipples - THIS I LIKE
//             if (4 * Math.round(player.averageCockThickness()) < player.averageVaginalLooseness()) {
//                 if (player.averageVaginalLooseness() < 2)
//                     DisplayText("the over-stretched openings on your swollen nipples. Though they are reletively small and delicate, you can easily slide two of your tiny cocks into each of their slippery passages.");
//                 else if (player.averageVaginalLooseness() < 4)
//                     DisplayText("the engorged and distended openings on your fat, swollen nipples. Stretching easily, they can engulf two cocks each with surprising ease, stretching around your turgid rods with little difficulty. ");
//                 else DisplayText("the gaping fuck-mouths of your inhuman nipple-cunts. The swollen lips of your bloated nipples squish open as they swallow your fat dicks with little difficulty. ");
//                 DisplayText("With each thrust, you bury your shafts deeper into your greedy tits. The feeling of your cocks rubbing together inside the warm, wet embrace of your inhuman breasts pushes you towards the edge of insanity, and you are briefly unable to comprehend the world around you. ");
//             }
//             else { // otherwise, its a tight fit
//                 if (player.averageVaginalLooseness() < 2)
//                     DisplayText("the small, over-stretched openings on your swollen nipples. Your poor, tortured nipples are stretched painfully as you cram two of your throbbing cocks into one. ");
//                 else if (player.averageVaginalLooseness() < 4)
//                     DisplayText("the engorged and distended openings on your fat, swollen nipples. They are stretched to their limits as you shove two of your fat dicks into one. ");
//                 else DisplayText("the gaping fuck-mouths of your inhuman nipple-cunts. The swollen lips of your bloated nipples are stretched to their limits as you push two of your fat dicks into one. ");
//                 DisplayText("Grunting and sweating with effort, you stuff as much cock into each of your overstretched nipples as you can fit. The feeling of your cocks being crushed together inside the warm, wet embrace of your inhuman breasts pushes you towards the edge of insanity, and you are briefly unable to comprehend the world around you. ");
//             }
//             if (player.torso.chest.averageLactation() > 0)
//                 DisplayText("Milky ");
//             else DisplayText("Slick ");
//             if (player.averageVaginalWetness() < 2)
//                 DisplayText("girl-lube drizzles down your shafts, coating them in glistening layers of fuck juice. ");
//             else if (player.averageVaginalWetness() < 4)
//                 DisplayText("girl-lube drools from your tortured nipples in thick streams, pooling beneath your ass. ");
//             else DisplayText("girl-lube spurts out of your tortured nipples with each thrust of your hips, spattering your arms and face with your secretions. ");
//         }
//     }
//     // if your dog cocks wouldnt fit, or you had enough holes for all your dicks (potentailly doubled up) then there are no dicks left for you to suck. Return false
//     if ((!doubleUp && fittableCocks <= holeTotal) || (doubleUp && fittableCocks <= holeTotal * 2)) return false;
//     return true;
// }

// function multiNippleFuckPrep(randomCock: number): void {
//     // Start with some detail on one random cock
//     // different based on libido
//     if (player.stats.lib < 70)
//         DisplayText("Shivering with anticipation, you place the ");
//     else DisplayText("Without hesitation, you shove the ");
//     // I love it when the new code makes things simpler.
//     // Applying randomization - normal cocks
//     if (player.torso.cocks.get(randomCock).type === CockType.HUMAN; ) {
//         DisplayText("tip of ");
//         // more than one?
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN)).length > 1)
//             DisplayText("one of your " + num2Text(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN)).length) + " " + CockDescriptor.describeCock(player, randomCock) + "s ");
//         else DisplayText("your " + CockDescriptor.describeCock(player, randomCock) + " ");
//     }
//     // Applying randomization - horse cocks
//     if (player.torso.cocks.get(randomCock).type === CockType.HORSE) {
//         DisplayText("flared tip of ");
//         // more than one?
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 1)
//             DisplayText("one of your " + num2Text(player.torso.cocks.filter(Cock.FilterType(CockType.HORSE)).length) + " " + CockDescriptor.describeCock(player, randomCock) + "s ");
//         else DisplayText("your " + CockDescriptor.describeCock(player, randomCock) + " ");
//     }
//     // Applying randomization - dog cocks
//     if (player.torso.cocks.get(randomCock).type === CockType.DOG) {
//         DisplayText("pointed tip of ");
//         // more than one?
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length > 1)
//             DisplayText("one of your " + num2Text(player.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length) + " " + CockDescriptor.describeCock(player, randomCock) + "s ");
//         else DisplayText("your " + CockDescriptor.describeCock(player, randomCock) + " ");
//     }
//     // Applying randomization - everything else
//     if (player.torso.cocks.get(randomCock).type.Index >= 3) {
//         DisplayText("tip of ");
//         // more than one?
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN)).length > 1)
//             DisplayText("one of your " + num2Text(player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN)).length) + " " + CockDescriptor.describeCock(player, randomCock) + "s ");
//         else DisplayText("your " + CockDescriptor.describeCock(player, randomCock) + " ");
//     }
//     if (player.stats.lib < 70)
//         DisplayText("against the opening of ");
//     else DisplayText("into ");
//     // More than one row?
//     if (player.torso.chest.count > 1) {
//         if (player.torso.chest.averageNipplesPerBreast() > 1)
//             DisplayText("one of the ");
//         else DisplayText("the ");
//     }
//     else DisplayText("one of your ");
//     if (player.torso.chest.averageNipplesPerBreast() > 1) DisplayText("many ");
//     // Different based on looseness (again)
//     if (player.averageVaginalLooseness() < 2)
//         DisplayText("painfully stretched nipple");
//     else if (player.averageVaginalLooseness() < 4)
//         DisplayText("freakishly swollen nipple");
//     else DisplayText("huge, bloated cunt-nipple");
//     if (player.torso.chest.count > 1)
//         DisplayText(" on one of your lower breasts");
//     else if (player.torso.chest.averageNipplesPerBreast() > 1)
//         DisplayText("s");
//     DisplayText(". ");
// }

// // ORGASM COOOOAD
// function orgazmo(selfSucking: boolean, nippleFuck: boolean): void {
//     DisplayText("\n\n");
//     if (player.torso.cocks.count > 0) {
//         if (player.torso.cocks.count === 1) {
//             DisplayText("The sensations prove too much for you, and you feel the tightness building in your ");
//             if (player.torso.cocks.filter(Cock.FilterType(CockType.HUMAN)).length === 1)
//                 DisplayText("twitching manhood, growing rapidly.  You stroke furiously, feeling the pressure of your cum as it nears release.  ");
//             else if (player.hasKnot())
//                 DisplayText("swelling, bulbous knot.  You feel it growing tighter and tighter until it's nearly twice the width of your " + CockDescriptor.describeCock(player, ) + ".  The pressure is an agonizing pleasure that only builds higher and higher as you come closer and closer to orgasm.  ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.HORSE)).length === 1)
//                 DisplayText("swollen equine sheath, slowly beginning to work its way up your shaft.  Pre-cum begins pouring from your " + CockDescriptor.describeCock(player, ) + ", slicking your " + CockDescriptor.describeCock(player, ) + " as you get ready to blow.  ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length === 1)
//                 DisplayText("wiggling vine-like cock, growing rapidly.  You feel the rubbery surface of your tentacle prick contracting as it nears release.  Thick bulges of fluids collect and travel along the length of your " + CockDescriptor.describeCock(player, ) + ", the first of which is almost to your oversized tip.  ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.DEMON)).length === 1)
//                 DisplayText("tainted man-meat, growing rapidly.  You feel the nodules close to the base swell and pulse, starting a rippling wave of pleasure that migrates upwards.  The ring of bumps around your crown double in size, flaring out as your " + CockDescriptor.describeCock(player, ) + " prepares to unload.  ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.CAT)).length === 1)
//                 DisplayText("full, cat-like sheath.  You feel it tingling and throbbing as the spines pulsate with arousal.  You feel the barbs at the bottom thickening as bulges of fluid migrate through your " + CockDescriptor.describeCock(player, ) + " towards the tip.  ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.LIZARD)).length === 1)
//                 DisplayText("swollen member.  You can feel it tingling and bulging strangly as it begins to contract and pulse.  Pre-cum leaks from your " + CockDescriptor.describeCock(player, ) + " in a steady stream as each 'bulb' nearly doubles in size, and then one at a time, they deflate while your urethra dilates wide.  ");
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.ANEMONE)).length === 1)
//                 DisplayText("base.  The tentacles surrounding your " + CockDescriptor.describeCock(player, ) + " go nuts, constricting around it, inadvertently firing aphrodisiacs into the orgasmic flesh as they wring a potent, hip-jerking climax from you.  ");
//             elseDisplayText("twitching manhood, growing rapidly.  You stroke furiously, feeling the pressure of your cum as it nears release.  ");
//             DisplayText("Pleasurable spasms overwhelm you as cum erupts from your " + CockDescriptor.describeCock(player, ));
//             DisplayText(".  Your hips jerk in the air in time with your eruptions, spraying cum ");
//             if (selfSucking) DisplayText("into your eager mouth.  ");
//             if (nippleFuck)
//                 DisplayText("deep inside your unnatural breast. ");
//             else if (!selfSucking)
//                 DisplayText("in the air.  ");
//             if (selfSucking) {
//                 if (player.cumQ() < 25)
//                     DisplayText("You manage to gulp down most of your cum as it bursts from your loins, the pleasure of orgasm goading you into compulsively swallowing.  ");
//                 else if (player.cumQ() < 250)
//                     DisplayText("You sputter jism from your mouth as your orgasm becomes too much to keep up with, cum filling your mouth to capacity as you swallow and dribble in equal measure.  ");
//                 else if (player.cumQ() < 500)
//                     DisplayText("Pulse after pulse of cum erupts from your " + CockDescriptor.describeCock(player, ) + " into your mouth.  You swallow what you can but it's too much for you.  Cum runs down your cock to pool on you as your orgasm drags on.  ");
//                 else DisplayText("Your orgasm never seems to end, and your world dissolves into the feelings from your " + CockDescriptor.describeCock(player, ) + " as it erupts jet after jet of cum into your mouth.  You nearly gag, cum overflowing to spray out in a river, pooling around you.  ");
//             }
//             else if (nippleFuck) {
//                 if (player.cumQ() < 25)
//                     DisplayText("You feel multiple thick spurts of cum splash against the inside of your breast. ");
//                 else if (player.cumQ() < 250)
//                     DisplayText("Cum dribbles down the length of your shaft as your abused tit is filled to overflowing by spurt after spurt of gooey sperm. ");
//                 else if (player.cumQ() < 500)
//                     DisplayText("Pulse after pulse of cum splash deep within your breast, causing it to swell with pressure. Cum runs down your cock in a torrent to pool on you as your orgasm drags on.  ");
//                 else DisplayText("Your orgasm never seems to end, and your world dissolves into the feelings from your " + CockDescriptor.describeCock(player, ) + " as it erupts jet after jet of cum into your abused tit.  With a *pop*, your cock is forced free by the pressure. It continues to squirt semen everywhere, while a river of cum pours out of your dialated nipple, pooling around you.  ");
//             }
//             else {
//                 if (player.cumQ() < 25)
//                     DisplayText("A few thick spurts of cum burst from your loins, splattering you liberally.  ");
//                 else if (player.cumQ() < 250)
//                     DisplayText("The orgasm drags on and on, spurt after spurt of jism coating you.  ");
//                 else if (player.cumQ() < 500)
//                     DisplayText("Your body spasms powerfully, each spurt making you twitch more powerfully than the last.  Rope after rope of jizz rains down.  ");
//                 else DisplayText("The orgasm never seems to end, and your world dissolves to little more than the feeling of each jet of cum erupting from your cock.  Your mind dimly processes the feeling of each burst splattering over you, but it only enhances the feeling.  ");
//             }
//         }
//         // MULTICOCK
//         if (player.torso.cocks.count > 1) {
//             DisplayText("The sensations prove too much for you, and you feel the tightness building in your loins.  ");

//             if (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) > player.torso.cocks.countType(CockType.HUMAN) && player.torso.cocks.countType(CockType.DOG) > player.torso.cocks.countType(CockType.HORSE)).length) { // Primary Dog
//                 let dogIndex: number;
//                 for (dogIndex = 0; dogIndex < player.torso.cocks.count; dogIndex++) {
//                     if (player.torso.cocks.get(dogIndex).type === CockType.DOG) break;
//                 }
//                 DisplayText("Your feel your knots bulging and swelling, growing tighter and tighter until they're nearly double the width of a " + CockDescriptor.describeCock(player, dogIndex) + ".  The agonizing pressure builds higher and tighter with every passing second as you get closer and closer to orgasm.  ");
//             }
//             else if (player.torso.cocks.filter(Cock.FilterType(CockType.HORSE) > player.torso.cocks.countType(CockType.HUMAN).length)) { // Primary Horse
//                 let horseIndex: number;
//                 for (horseIndex = 0; horseIndex < player.torso.cocks.count; horseIndex++) {
//                     if (player.torso.cocks.get(horseIndex).type === CockType.HORSE) break;
//                 }
//                 DisplayText("You feel a pulsing in your sheath, slowly working its way up your " + CockDescriptor.describeCock(player, horseIndex) + "s.  Pre-cum pours from your " + CockDescriptor.describeCock(player, horseIndex) + "s, slicking the wobbly equine shafts as they get ready to blow.  ");
//             }
//             else { // Primary Normal
//                 DisplayText("Your manhoods twitch, growing to their full size.  You stroke them furiously, feeling the pressure of your cum as it nears release.  ");
//             }
//             // check if all dicks are stuck in tits.
//             if (nippleFuck) {
//                 if (player.cumQ() < 25)
//                     DisplayText("You feel multiple thick spurts of cum splash inside of your breasts. As you buck and thrust with orgasm, your cocks begin to pop free of your abused tits. ");
//                 else if (player.cumQ() < 250)
//                     DisplayText("Cum dribbles down your shafts as your abused tits are filled to overflowing by spurt after spurt of gooey sperm. As you buck and thrust with orgasm, your cocks begin to pop free of your abused tits. ");
//                 else if (player.cumQ() < 500)
//                     DisplayText("Pulse after pulse of cum splash deep within your breasts, causing them to swell with pressure. Torrents of cum run down your cocks to pool around you. As you buck and thrust with orgasm, your cocks begin to pop free of your abused tits.  ");
//                 else DisplayText("With an explosive release, you finally cum.  Your orgasm never seems to end, and your world dissolves into the feelings from your " + CockDescriptor.describeMultiCockShort(player) + " as they erupt jet after jet of cum into your abused tits.  With a series of wet *pops*, your cocks are forced free by the pressure. They continue to squirt semen everywhere, while rivers of cum pour out of your dilated nipples, pooling around you.  ");
//             }

//             // Doing the perverted sprinkler after dicks have popped out.
//             DisplayText("Pleasure overwhelms your fragile mind as cum erupts from your " + CockDescriptor.describeMultiCockShort(player) + ".  Your hips jerk in the air in time with your eruptions, cum spraying from you as your body does its best impression of a perverted sprinkler.  ");
//             if (selfSucking) {
//                 if (player.cumQ() < 25)
//                     DisplayText("You manage to swallow most of your cum as it bursts from your loins, the pleasure of orgasm goading you into compulsively swallowing.  ");
//                 else if (player.cumQ() < 250)
//                     DisplayText("You sputter jism from your mouth as your orgasm becomes too much to keep up with, cum filling your mouth to capacity as you swallow and dribble in equal measure.  Cum splatters on you from the rest of your equipment, making you a slimy mess.");
//                 else if (player.cumQ() < 500)
//                     DisplayText("Pulse after pulse of cum erupts from your " + CockDescriptor.describeCock(player, ) + " into your mouth.  You swallow what you can but it's too much for you.  Cum runs down your " + CockDescriptor.describeCock(player, ) + " to pool on you as your orgasm drags on.  Jizz rains over you the entire time from the rest of your \"equipment\".");
//                 else DisplayText("Your orgasm never seems to end, and your world dissolves into the feelings from your " + CockDescriptor.describeCock(player, ) + " as it erupts jet after jet of cum into your mouth.  You nearly gag, cum overflowing to spray out in a river, pooling around you.  Your other 'equipment' rains jizz upon you the whole while, soaking you in a cum-puddle.");
//             }
//             // These seem like they should always be displayed regardless of other factors.
//             if (player.cumQ() < 5)
//                 DisplayText("A few thick spurts of cum burst from your cocks, splattering you liberally.  ");
//             else if (player.cumQ() < 7)
//                 DisplayText("The orgasm drags on and on, spurt after spurt of jism coating you from each cock.  ");
//             else if (player.cumQ() < 10)
//                 DisplayText("Your body spasms powerfully, each spurt making you twitch more powerfully than the last.  Rope after rope of jizz rains down as the orgasms from each of your members begin to overlap.  Your nearly black out in pleasure.  ");
//             else DisplayText("The orgasm never seems to end, and your world dissolves to little more than the feeling of multiple cum eruptions spurting from your pricks.  Your mind dimly processes the feeling of each burst splattering over you, but it only enhances the feeling.  ");
//         }
//     }
//     // Vaginal CUMMING
//     if (player.torso.vaginas.count > 0) {
//         // Single vagina!
//         if (player.torso.vaginas.count === 1) {
//             DisplayText("Your ");
//             // Specify which sex for herms :3
//             if (player.gender === 3) DisplayText("fem");
//             DisplayText("sex quivers as the pleasure overwhelms you, robbing you of muscle control, your passage rippling and contracting around your fingers.  ");
//             // Big clitty bonus!
//             if (player.torso.clit.length >= 4.5)
//                 DisplayText("A hand finds your cock-like clit, squeezing and caressing it as the cunt-wrenching orgasm wracks your body, the over-sized joy-buzzer nearly making you black out from the sensations it generates.  ");
//             else if (player.torso.clit.length > 1.5)
//                 DisplayText("Every muscle-twitch seems to stretch your big oversensitive clitty larger, causing you to squeal with delight at every bump and touch against it.  ");
//             // Wet orgasms
//             if (player.torso.vaginas.get(0).wetness === VaginaWetness.SLAVERING) DisplayText("A veritable gush of fluid explodes from your nethers, pulsing in time with the ripples of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  ");
//         }
//         // MultiCunt UNFINISHED
//         else {

//         }
//     }
//     // Cumming time for TITS! Should only trigger if: you are lactating at level 2 or higher, you are a female/herm, or you have nipplecocks/cunts
//     if (player.torso.chest.averageLactation() >= 2 || player.torso.chest.hasFuckableNipples()) {
//         // FUCK ANOTHER SHODDILY WRITTEN FUNCTION TO DEBUG/PORT
//         // WHYYYYY
//         titCum(player.cumQ());
//     }
//     // DONE!
//     player.orgasm();
//     dynStats("sen", (-0.5));
// }

// function titCum(cumQuantity: number = 3): void {
//     // let tempSize:number = Math.round((nipples.length + baseCockLength/2)*100)/100;
//     // let nippleCockDescript:string = nippleCockDescript(tempSize);
//     // Normal Tits, only if lactating at at least level 2
//     if (player.torso.chest.averageLactation() >= 2 && !player.torso.chest.hasFuckableNipples()) {
//         DisplayText("As orgasm after orgasm thunders through your body, you feel pressure build in your breasts and then suddenly release, as ");
//         if (player.torso.chest.averageLactation() <= 2.6) DisplayText("thin streams of milk spray out of your ");
//         if (player.torso.chest.averageLactation() > 2.6 && player.torso.chest.averageLactation() < 3) DisplayText("thick gouts of milk spurt out of your ");
//         if (player.torso.chest.averageLactation() >= 3) DisplayText("huge torrents of milk blast out of your ");
//         // different description based on size of nips
//         if (player.averageNippleLength() <= 1) DisplayText("erect nipples, ");
//         if (player.averageNippleLength() > 1 && player.averageNippleLength() < 4) DisplayText("fat, puckered nipples, ");
//         if (player.averageNippleLength() >= 4) DisplayText("huge, swollen teats, ");
//         if (player.torso.chest.averageLactation() <= 2.6) DisplayText("spattering milk everywhere. ");
//         if (player.torso.chest.averageLactation() > 2.6 && player.torso.chest.averageLactation() < 3) DisplayText("covering everything nearby. ");
//         if (player.torso.chest.averageLactation() >= 3) DisplayText("drenching the entire area.");
//     }
//     // Cumming with Nipplecunts!
//     if (player.torso.chest.hasFuckableNipples()) {
//         DisplayText("A strange feeling builds in your breasts as your nipples seem to tighten and quiver with anticipation. You ");
//         // Different noise based on sensitivity
//         if (player.stats.sens < 70) DisplayText("moan with ecstacy as your freakishly swollen nipples ");
//         if (player.stats.sens >= 70) DisplayText("scream with ecstacy as your freakishly swollen nipples ");
//         // Different description based on wetness
//         if (player.averageVaginalWetness() < 2) DisplayText("dribble ");
//         if (player.averageVaginalWetness() >= 2 && player.averageVaginalWetness() < 4) DisplayText("spray ");
//         if (player.averageVaginalWetness() >= 4) DisplayText("gush ");
//         // Lactating?
//         if (player.torso.chest.averageLactation() > 0) DisplayText("milk and ");
//         DisplayText("pussy juice everywhere.");
//     }
// }

// // (D. Dildo) – a floppy pink dildo with aphrodisiac reservoir
// function deluxeDildo(): void {
//     player.slimeFeed();
//     DisplayText().clear();
//     // [USE FEMALE]
//     if (player.torso.vaginas.count > 0) {
//         // (highcor)
//         if (player.stats.cor > 66)
//             DisplayText("You retrieve the floppy pink dildo from your possessions and strip down in the middle of your camp, shivering with the sexual thrill of your exhibitionism.");
//         // (medcor)
//         else if (player.stats.cor > 33)
//             DisplayText("You retrieve your floppy dildo and sigh happily as you squeeze it, feeling the spongy surface give a little bit.  Glancing around furtively, you find a secluded spot and strip down.");
//         // (lowcor)
//         else DisplayText("You blush feverishly as you grab your pink dildo.  It flops about lewdly as you run off behind some rocks and strip down to use it.  You feel like such a pervert.");
//         DisplayText("\n\n");
//         // (low cor)
//         if (player.stats.cor < 50)
//             DisplayText("You hold the fake dong away from you, aroused but still somewhat disgusted by its lewd shape.");
//         // high cor
//         else DisplayText("You hold the fake dong, squeezing it and giggling at the realistic texture.  You can't wait to try it out.");
//         DisplayText("  A drop of pink aphrodisiac leaks from the tip, offering you a hint of the pleasure you're in for.   You make sure to catch it on your crotch, letting the fluid seep into your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  Warmth radiates outwards, spreading to your thighs as your " + VaginaDescriptor.describeClit(player));
//         if (player.torso.clit.length < .5)
//             DisplayText(" becomes hard and sensitive");
//         else if (player.torso.clit.length < 3)
//             DisplayText(" peeks through your folds");
//         else if (player.torso.clit.length < 6)
//             DisplayText(" fills with blood, growing erect like a tiny cock");
//         else DisplayText(" fills with blood, twitching and pulsating like a man's cock");
//         DisplayText(".  You ");
//         if (player.stats.cor > 50) DisplayText("don't ");
//         DisplayText("hesitate ");
//         if (player.stats.cor < 50)
//             DisplayText("before slowly working it inside you, gasping at the enhanced sensitivity of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".");
//         else DisplayText("ramming it deep inside you, moaning as it rubs your now over-sensitive walls.");
//         DisplayText("  You splay your " + LegDescriptor.describeLegs(player) + " and lie there with it inside you, feeling it respond to your wetness, becoming more and more turned on by the second.\n\n");

//         // (Kinda dry)
//         if (player.torso.vaginas.get(0).wetness < VaginaWetness.SLICK)
//             DisplayText("The thickness of the toy gradually increases, filling you more and more effectively as it reacts to your bodily fluids.  You grab it two-handed and start slamming it into your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ", vigorously fucking yourself with the swelling dong.  The sensations just keep getting better and better as more and more of the goblin's sex-drug leaks into you.  Even your " + VaginaDescriptor.describeClit(player) + " and cunt-lips tingle with need.  You answer that need by picking up the pace, pistoning faster and faster.\n\n");
//         // (Pretty wet)
//         else if (player.torso.vaginas.get(0).wetness < VaginaWetness.SLAVERING) {
//             DisplayText("The toy's girth seems to pulse and swell within you, spreading you wide open as it sops up your natural wetness and grows larger.  You grab it in a two-handed grip and begin working it in and out of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ", gasping and twitching as every ridge and feature of the dildo rubs you just right.  Every inch of your nethers tingles with a desire to be touched, rubbed, and squeezed. ");
//             if (player.torso.cocks.count > 0) {
//                 DisplayText("Even your " + CockDescriptor.describeMultiCock(player) + " ache");
//                 if (player.torso.cocks.count === 1) DisplayText("s");
//                 DisplayText(" and pulse");
//                 if (player.torso.cocks.count === 1) DisplayText("s");
//                 DisplayText(", bouncing on your belly.  ");
//             }
//             DisplayText("You answer that need by pistoning the fat juicy dick even harder into your tightly stretched box, cooing as tiny squirts of fluid erupt with every thrust.\n\n");
//         }
//         // (Soaked)
//         else DisplayText("You can feel the dildo growing inside you, reacting to gushing feminine fluids by stretching your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " wide.  It doesn't seem to stop when you start fucking yourself with it.  If anything, it only seems to get thicker and thicker until there is barely room for your juices to squirt around it and your hips feel sore.  However, the tingling hotness of the dildo's aphrodisiac cum overwhelms the discomfort of the fattening fuck-tool, and you work it harder and harder, reveling in being stretched beyond your normal capacity.\n\n");

//         // Sensitivity based orgasms.
//         // (Low sensitivity)
//         if (player.stats.sens < 80) {
//             DisplayText("Practically brutalizing your cunt with the swollen puss-plug, you bring yourself to orgasm.  Your " + LowerBodyDescriptor.describeHips(player) + " leap off the ground, quivering in the air against your hands as you ram the toy into yourself as far as it will go.  You can feel it spurting inside you, just like a real man.  You wiggle and moan as the muscle spasms work their way through your " + LegDescriptor.describeLegs(player) + ", leaving you drained and exhausted.  The pink dildo suddenly shrinks back to its original size and flops free, leaving your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " stretched open to drool a puddle of pink cum.");
//             // (+sensitivity by 5)
//             player.stats.sens += 5;
//         }
//         // High sensitivity (80+)
//         else {
//             DisplayText("Brutalizing your stretched fuck-hole with the bloated toy, you manage to get yourself off.   Your body quakes and spasms while your " + LowerBodyDescriptor.describeHips(player) + " buck into the air, fucking an imaginary lover.  The dildo sinks into your core, your arms instinctively fulfilling your desire for complete penetration.  A warm wetness suddenly soaks your womb as the fuck-stick erupts, filling you.  Just like that the orgasm you had seems like foreplay.  Your eyes roll back into your head and you begin convulsing, practically having a pleasure-seizure from the drugs and your already oversensitive twat.   You sprawl there, wiggling and cumming your brains out for what feels like an eternity, but it does eventually end, and when it does the dildo is back to its normal size, lying in a puddle of aphrodisiacs and girlcum.");
//             // (+sensitivity by 3 & intellect -2 & libido +1	)
//         }
//         // Option Jojo veyeurism?
//         if (Game.monk >= 5 && Flags.list[FlagEnum.JOJO_DEAD_OR_GONE] === 0) {
//             DisplayText("\n\nAs you stand and try to clean up you manage to spot Jojo off in the woods, ");
//             if (player.statusAffects.has(StatusAffectType.TentacleJojo))
//                 DisplayText("his tentacles splattering mouse-jizz everywhere as he gets off from your show.");
//             else DisplayText("splattering himself with mouse-spunk as he finishes enjoying your inadvertent show.  He runs off before you have a chance to react.");
//         }
//         player.orgasm();
//         MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//         DisplayText("\n");
//         player.cuntChange(player.vaginalCapacity() * 0.9, true);
//     }
// }

// // onaHole use - game should already have checked if player has a cock! CHECK BEFORE CALLING
// function onaholeUse(): void {
//     // Clear text for new stuff
//     DisplayText().clear();
//     // Flag after first use!
//     if (!player.statusAffects.has(StatusAffectType.PlainOnaholeUsed)) {
//         player.statusAffects.add(StatusAffectType.PlainOnaholeUsed, 0, 0, 0, 0);

//         DisplayText("You get naked and settle down with your new toy. The device looks mildly unappealing and almost comical. However, you have never been one to slouch in the search for new forms of pleasure. ");
//         if (player.torso.cocks.count > 1)
//             DisplayText("With your free hand, you slap your " + CockDescriptor.describeMultiCockShort(player) + " to 'attention' and ease the onahole over your cocks.  ");
//         else DisplayText("With your free hand, you slap your cock to 'attention' and ease the onahole over your cock.");

//         DisplayText("\n\nMuch to your surprise, Giacomo failed to point out that the ugly rubber sheath was open-ended on the inside and is providing an impressive grip around your shaft. Without hesitation, you begin working your cock as if the world would die tomorrow. Stroke upon stroke, you demand your body to break itself in half with massive orgasmic pulses. Inside the toy, your member clenches and swells with pleasure, triggering floods of pre-cum into the tube, making it feel even sharper.");

//         DisplayText("\n\nYour body is quick to respond to your demands and you pump impressive amounts of your seed into your toy. Savoring each shot, you relish the sensation of feeling the warmth of your cum radiate throughout and warm your cock even more.");
//     }
//     // If player is already flagged, show repeated use text!
//     else if (player.stats.cor > 66)
//         onaholeRepeatUse(true);
//     else onaholeRepeatUse(false);

//     player.stats.sens += -.75;
//     onaholeContinuation();
// }

// function deluxeOnaholeUse(): void {
//     DisplayText().clear();
//     // Flag after first use!
//     if (!player.statusAffects.has(StatusAffectType.DeluxeOnaholeUsed)) {
//         player.statusAffects.add(StatusAffectType.DeluxeOnaholeUsed, 0, 0, 0, 0);

//         DisplayText("You get naked and settle down with your new toy. You are amazed at the level of care and detail in the craftsmanship of this toy. You wonder if it feels as good as it looks.\n\n");

//         if (player.torso.cocks.count > 1)
//             DisplayText("With your free hand, you slap your " + CockDescriptor.describeMultiCockShort(player) + " to 'attention' and ease the onahole over your cocks.  ");
//         else DisplayText("With your free hand, you slap your cock to 'attention' and ease the onahole over your cock. ");

//         DisplayText("As you 'deflower' the toy, you are floored by how realistic it REALLY does feel. Giacomo must use one of these himself, as it does feel damn close to a real twat. You especially enjoy how it manages to squeeze with just the right amount of pressure.");

//         DisplayText("\n\nWithout hesitation, you begin working your cock as if the world would die tomorrow. Stroke upon stroke, you demand your body to break itself in half with massive orgasmic pulses. Inside the toy, your member clenches with pleasure, triggering floods of pre-cum into the tube, making it feel even sharper. As your pre-cum fills the nooks and crannies of the toy pussy, it begins warming up and feels like an actual lubricated cunt! Amazing!");

//         DisplayText("\n\nYour body is quick to respond to your demands and you pump impressive amounts of your seed into your toy. Savoring each shot, you relish the sensation of feeling the warmth of your cum radiate throughout and warm your cock even more.");
//     }
//     // If player is already flagged, show repeated use text!
//     else if (player.stats.cor > 66)
//         onaholeRepeatUse(true);
//     else onaholeRepeatUse(false);

//     player.stats.sens += -1.5;
//     onaholeContinuation();
// }

// function onaholeContinuation(): void {
//     if (player.torso.cocks.count > 1) {
//         if (player.gender === 3 && randInt(2) === 0)
//             MainScreen.doNext(onaholeFutaContinuation);
//         else MainScreen.doNext(onaholeMulticockContinuation);
//     }
//     else if (player.gender === 3)
//         MainScreen.doNext(onaholeFutaContinuation);
//     else {
//         player.orgasm();
//         MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//     }
// }

// function onaholeMulticockContinuation(): void {
//     DisplayText("You pull the sloppy toy from your dribbling dick and smile, shoving its slippery surface down on another of your " + CockDescriptor.describeMultiCockShort(player) + ".  You rapidly work it around your cocks, orgasming until ");
//     if (player.torso.balls.quantity > 0)
//         DisplayText("you pass out with aching, empty balls.");
//     else DisplayText("you pass out with " + CockDescriptor.describeMultiCockShort(player) + " sore from exertion.");
//     player.stats.sens += -1;
//     player.orgasm();
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function onaholeFutaContinuation(): void {
//     DisplayText("\n\nThe blessing - or curse, depending on how you feel - of your gender catches up with you. As with all members of your gender, you are incapable of having just ONE orgasm. You feel the muscles deep in your crotch bear down hard. Your eyes widen as you realize you are about to blow a monumental load. The pressure works its way through you and towards your cock as, with one final push, you force a torrent of semen out of your body. Your grip was not sufficient on the onahole and you launch it ");
//     DisplayText(String(int(((Math.random() * player.stats.str / 12) + player.stats.str / 6) * 10) / 10));
//     DisplayText(" feet away from you. Delirious with pleasure, you continue your 'impression' of a semen volcano, covering yourself and the area with your seed. ");
//     DisplayText(" As your orgasms fade, you find yourself a well-fucked mess, and pass out.");
//     player.stats.sens += -1;
//     player.orgasm();
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function allNaturalOnaholeUse(): void {
//     DisplayText().clear();
//     // First use!
//     if (!player.statusAffects.has(StatusAffectType.AllNaturalOnaholeUsed)) {

//         player.statusAffects.add(StatusAffectType.AllNaturalOnaholeUsed, 0, 0, 0, 0);

//         DisplayText("Scratching your head, you wonder how such a goofy contraption can offer the extreme pleasures Giacomo was peddling. Shrugging your shoulders, you disrobe and quickly stir the she-cock for a nice quick fuck. With little difficulty, you push the two cushions aside as you penetrate the toy. It feels very warm, like the warmth of flesh. You push the onahole down on your cock until you bottom out. You feel some sort of soft protrusion in the base of the toy, pressing against the opening of your cock.");
//         DisplayText("\n\nYou begin gently stroking yourself with the toy. You decide for a nice, leisurely pace over your usual hectic moods. The toy is warm and is very pleasurable. While hardly worthy of the sales pitch made by Giacomo, you feel that it was worth the money. If nothing else, it is different.");
//         DisplayText("\n\nWithout warning, you feel immense pressure clamp down upon your cock. Shocked, you instinctively try to pull out. Your efforts only succeed in pulling the toy up your shaft for a moment before it crawls back down. Whatever went wrong, your cock is stuck. You feel a pulse from the two cushions inside the onahole. The thing lurches forward on your cock and it is now embedded deeper. Frustrated, you start thumping your trapped pecker against the ground, trying to shake the thing loose, to no avail. The thing lurches down on your cock. You now feel the annoying impression against the head of your cock as you bottom out.");
//         DisplayText("\n\nBefore you can react, you feel the impression move. It shifts... adjusts. Utterly confused and revolted, you pause to figure out what is going on. You then feel the unmistakable sensation of something prodding at the opening in the head of your dick. The horrid reality crashes down upon you like a falling wall; this \"toy\" is a living creature!");
//         DisplayText("\n\nAs the true reality of your plight buffets against your mind, you feel a slender tendril push past your opening and into your urethra! Unaccustomed to this kind of \"penetration\", your body convulses and bucks as you try to shake the thing off. You grab the creature and begin to pull it off, only to see needle-like growths come from the holes around the main opening. They push against the base of your pubic mound and you feel the needles prickling against your skin. As you try to pull, the needles react by trying to pierce your skin. When you stop, the needles retract. You come to the realization that you will not get this thing off your dick without tearing yourself apart.");
//         DisplayText("\n\nThe tendril continues exploring your urethra until it settles inside your prostate. The tendril begins flicking its end around your inner sex as the muscular body begins humping and pumping your cock. Within minutes, the pace of the little creature is frenetic. Scream upon scream thunders from your lungs as the creature plunders your insides.  Pain and pleasure become the same sensation as you get the cock-milking of your life.");
//         DisplayText("\n\nAs you feel your cum build, you feel a sharp suction inside you. The suction immediately triggers your orgasm and your muscles cramp and push to cum. Instead of shooting a load, you feel the sucking of the tendril vacuum up your cum! As it swells to feed, you feel your inner tube match its growth. The uncoordinated sensation of your urethra dilating against your own orgasm forces you to cum again, prompting the creature to suck the cum right out of you again.");
//         DisplayText("\n\nThe more semen you produce, the harder the accursed thing sucks. Eventually, the pain subsides and only the unholy pleasure of such deep penetration and stimulation remains. THIS is what that crazy merchant was talking about. You have never cum so hard or as much as now. Your mind is polluted with lust and all you want is for this thing to keep milking you and leave you intoxicated with pleasure. The shock of this treatment sends you in and out of consciousness. You wake up only long enough to pump another load down its endless pipe. Each time you wake up to cum, you see the thing get fatter and fatter.");
//         DisplayText("\n\nAwake... out... awake, out. The next minutes, hours or whatever, are a blur. You sense the need to cum. You feel your muscles squeeze to force your seed out. You feel the animal, or whatever it is, suck the very life-milk from you. It grows fatter. You want to feel your muscles squeeze again! You want to feel the semen surge again! You want the thing to work your shaft some more! Endless pleasure. Endless orgasm. You faint.");
//         DisplayText("\n\nYou have no clue how much time has passed. However, you wake up with your sex organs sore from the inside out. There are small dribbles of cum on the ground and you see the thing has swelled up to twice its size. Horrified, you reach to grab the thing to kill it--but stop. After you got over being penetrated, they were THE best orgasms you have ever had.");
//     }
//     // If player is already flagged, show repeated use text!
//     else {
//         // High corruption variant!
//         if (player.stats.cor > 66) {
//             DisplayText("Grinning from ear to ear, you grab your \"pet\" from your bag and bury your dick deep into its maw. Somewhat stunned by your zeal, the creature shifts about lethargically. You impatiently wobble your dong, shaking the creature with it, in an attempt to wake the little dick-milking bastard up. The beast eventually comes to life and begins doing the only thing it knows how to do. Securing itself to your erection and easily entering your well-stretched urethra, the creature inserts itself to begin another feeding session. Enjoying the creature's efforts to milk you of your fluids, you choose to up the ante a bit. You begin flexing your pelvic muscles to make your cock bob about. Along with the gentle pinch of pleasure your flexing gives you, the creature mistakes your self-pleasure for an attempt to dislodge it and stabs its tendril deeper into your prostate, creating an even sharper response. Throwing your head back as the pleasure washes over, you continuously flex yourself to make the beast plunder deeper inside you. Welling up with an impressive load, you grab the animal with both hands as you expertly control your ejaculation reflex. With an expertise borne from repeated self-exploration, you force feed the beast gout upon gout of your seed. The thing quickly bloats as your shots are more than a match for even its ravenous appetite. It swells quickly and releases itself from your body, obviously stuffed to the proverbial gills. Undaunted and unsatisfied, you launch the creature off your cock with another great eruption from your sex. The creature lands smartly on the ground where you quickly waddle over to unload the rest of your pent-up cum all over its shell. Satisfactorily drained and the beast covered completely in your lust, you wipe the sweat from your forehead and silently congratulate yourself on the impressive job you did on keeping your pet well fed. You check to make sure your vigor did not injure the creature and, satisfied that it was otherwise uninjured, set it aside to vegetate on the massive load of cum you fed it with.");
//         }
//         // low corruption variant!
//         else {
//             DisplayText("Part of you regretting the purchase, the other half longing for the intensity of pleasure, you reach into the bag to get the creature Giacomo laughingly labels an \"all-natural\" onahole. Telling yourself that the creature needs to feed and has every right to survive as any other animal, you reluctantly place the beast on your stiff, implacable erection. Springing to life, the animal immediately bears down upon your shaft and clamps itself in place. With a greater adroitness, the creature's feeding tube breaches your urethra and muscles its way deep into your sex. Undulating its mass and flicking its tentacle, the creature forces your body to make the sexual fluid it needs to survive. Biting your lip and groaning, you can only endure the painful pleasure of your sensitive genitalia being forced to produce. The unique sensation of sex juice building in your body inflames the abomination, forcing it to move faster. Moments later, an orgasmic wave cramps your body into knots as you force semen into the creature. Load after load shoots into the beast and it swells up as it fattens from your lust. Once you are spent, the creature retracts the tendril, prompting one last cumshot from you, and releases your used and mildly abused prick. Collapsing to the ground, you fall asleep before you can recover from the encounter.");
//         }
//     }

//     player.stats.lib += -1.5;
//     player.stats.sens += .75;
//     player.stats.cor += .5;
//     player.orgasm();
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function stimBeltUse(): void {
//     DisplayText().clear();
//     // FIRST TIME USAGE
//     if ((player.hasKeyItem("Self-Stimulation Belt") >= 0)) {
//         // First use! Flag after first use!
//         if (!player.statusAffects.has(StatusAffectType.used_self_dash_stim)) {
//             player.statusAffects.add(StatusAffectType.used_self_dash_stim, 0, 0, 0, 0);
//             DisplayText("Brimming with anticipation, you wind up the small gearbox on the weird contraption. You place the machine down and strip yourself naked. Stepping through the straps of the garment, you pull it up. The dildo does not come out, so you take the time to ease the artificial phallus to rest deep in your womanhood. After nestling the false cock in your pussy, you finish pulling up the belt and you tighten the straps. You lay down and you flip the switch. The machine vibrates around and inside you vigorously. Immediately, waves and cramps of pleasure swirl around your cunt and shoot up and down your spine. The machine, free of human limitations and fatigue, ceaselessly rubs and caresses your insides at impossibly high speeds. Within minutes, you begin experiencing the tell-tale contractions of an impending orgasm. With your hands free, you are able to explore your breasts and body as the device hammers away. You squeeze your ");
//             DisplayText(BreastDescriptor.breastCup(player.torso.chest.get(0)));
//             DisplayText(" tits as your body convulses with multiple orgasms. Savoring every moment, you relish in the pangs of delight searing your body. Eventually, the belt moves slower and slower, until it comes to a stop, along with your fun. You realize that the gears have wound down and the box needs to be wound for your pleasure to continue. Deciding not to overwhelm yourself, you carefully remove your toy and save it for another time.");
//             player.orgasm();
//             player.stats.sens += -1;
//             MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//         }
//         // Repeated use!
//         else {
//             DisplayText("Your need for release causes you to fumble with the mechanical contraption. As you don the self-stimulation belt, you inadvertently drop the key used to crank the gearbox. Cursing in frustration, you awkwardly paw about for the key. After a few moments scraping about in a manner that would thoroughly amuse any onlookers, you locate the key and wind up the main spring.\n\n");
//             DisplayText("Switching the belt on, it begins to immediately vibrate and rub every sensitive part of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ". You immediately glow with pleasure as the machine works its magic on your hungry pussy. Worried about the machine winding down, you re-crank the gear box occasionally to ensure that you get worked over by the tireless device as long as you can handle it.\n\n");
//             DisplayText("Eventually, the machine tweaks your nerves and your " + VaginaDescriptor.describeClit(player) + " just right, triggering a massive orgasm that leaves you bucking wildly like an untamed horse, screaming in mind-numbing pleasure. Your uncontrollable movement dislodges the key from the gear box and you have no choice but to wait for the machine and your still-orgasming body to wind down, and THEN find the goddamn thing. After about fifteen minutes, the machine expends the last of its energy, leaving you a twitching heap until you can move to find the meddlesome key.\n\n");
//             DisplayText("Fortunately, you locate the key near your feet, saving you the money of having another made for the device. You put aside your machine, your lusts slaked, for now.");
//             player.orgasm();
//             player.stats.sens += -1;
//             MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//         }
//         player.cuntChange(1, true, true, false);
//     }
// }

// function allNaturalStimBeltUse(): void {
//     DisplayText().clear();
//     if (player.hasKeyItem("All-Natural Self-Stimulation Belt")) {
//         // First time!
//         if (!player.statusAffects.has(StatusAffectType.UsedNaturalSelfStim)) {
//             // Flag as used!
//             player.statusAffects.add(StatusAffectType.UsedNaturalSelfStim, 0, 0, 0, 0);
//             DisplayText("Brimming with anticipation, you put on the gloves to avoid prematurely triggering the machine. You place the belt down and strip yourself completely. Stepping through the straps of the garment, you pull it up. You take the time to align the nodule with the opening of your womanhood. After settling the knob to the entrance to your pussy, you take off the gloves, lay back and touch the amber pads with your fingers.\n\n");
//             DisplayText("You hear a distinctive squishing sound and you feel the belt tighten around your waist and pelvis. It becomes tighter and tighter until its removal is an impossibility because of your own bulk. While you are concerned, you maintain composure as the belt eventually stops tightening. There is a pause. A couple of minutes go by and little happens. You notice that the entire front of the belt is becoming warm. It is not the typical heat from a blanket or a piece of metal, but it feels like the warmth of flesh on flesh. You hear more squishing and you feel the nodule stir and rub against your opening. Your pleasure slowly begins to build and you are stimulated and amused by the teasing the apparatus seems to produce. Without warning, you feel your cunt stretch open as something thrusts inside you.\n\n");
//             MainScreen.doNext(allNaturalSelfStimulationBeltContinuation);
//         }
//         // Multiple uses
//         else {
//             // Low corruption variant
//             if (player.stats.cor < 50) {
//                 DisplayText("Shamed by the depths of your sexual needs, you don the abominable stimulation belt and brace for its eventual ravaging of your needy womanhood. Without waiting for you to touch the activator, the organic portion of the device, sensing your needs, engorges and buries itself in your vagina, beginning to pump with furious speed. The shock of the sudden stimulation convulses you backwards, leaving you writhing on the ground as the horrid symbiote undulates in a luridly sordid manner. You distinctly feel a nodule growing about your clitoris, shifting and changing into a sucker. The suction begins furiously working your clitoris as if it were a miniature penis, slurping, sucking and jerking away, prompting another painfully pleasurable wave of multiple orgasms.\n\n");
//                 DisplayText("You cry in shock as the creature pushes past your cervix and begins injecting your womb with hot, thick cum... or whatever it is that it shoots inside you.  Unlike before, the very sensation of the fluid acts upon your brain and body strangely. The pain dulls and eventually filters from your mind and only the pleasure of the experience remains. The fluid continues pumping in until it overflows. The flooding of your insides leaves you paradoxically ecstatic and revolted. After an unknown amount of time, the thing stops fucking you and it releases its grip of your pelvis, leaving you a sticky, exhausted mess. A part of you wants to try the belt again, but you are too tired to bother cleaning yourself up.");
//                 player.orgasm();
//                 player.stats.lib += -1;
//                 player.stats.sens += .75;
//                 player.stats.cor += 1;
//                 MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//             }
//             // High corruption variant
//             else {
//                 DisplayText("Barely taking the time to strip yourself down, you quickly slide the belt-shaped beast onto your hips. It immediately clamps down and begins the all-too-familiar plundering of your opening. It barrels deep into your box and quickly latches on your " + VaginaDescriptor.describeClit(player) + " and the relieving pleasure of its thundering movements quench your need for pleasure. The creature quickly begins streaming its fluids inside you. No longer sensing pain, as you did when you first used the belt, you lay in endless bliss as the warmth of the fluid fills you up. The creature, sensing how much of its juice is in you, stops squirting and begins stirring the jizm it left. The unique pleasure of the hot fluid literally stirring and swirling inside you coaxes a wave of orgasms from your body, which draw the milk even deeper into your womanhood. It almost feels as if your body is absorbing the milk into your deepest recesses with each pelvic contraction.\n\n");
//                 DisplayText("The creature lets out another torrent of cum and repeats the process. Drunk with lust, you are uncertain how you are containing so much spunk without it gushing out, as before. Every time you try to think about it, another orgasm destroys any attempt at rational thought. By the time the thing is done with you, hours and hours have already passed you by. You crash from your hours-long orgasm, exhausted, and can only think of the next opportunity to have the belt about your loins.");
//                 player.orgasm();
//                 player.stats.lib += -.5;
//                 player.stats.sens += 1;
//                 player.stats.cor += 1.5;
//                 // Game over if fully corrupt!
//                 if (player.stats.cor >= 100) MainScreen.doNext(allNaturalSelfStimulationBeltBadEnd);
//                 // Otherwise, 4 hours pass!
//                 else MainScreen.doNext(Scenes.camp.returnToCampUseFourHours);
//             }
//         }
//     }
//     player.cuntChange(1, true);
//     player.slimeFeed();
// }

// function allNaturalSelfStimulationBeltContinuation(): void {
//     DisplayText().clear();
//     DisplayText("In shock, you scream as you realize the nodule has instantly grown into a massive, organic dildo. It bottoms out easily and rests against your cervix as you recover from the initial shock of its penetration. As the pangs subside, the infernal appendage begins working itself. It begins undulating in long, slow strokes. It takes great care to adjust itself to fit every curve of your womb. Overwhelmed, your body begins reacting against your conscious thought and slowly thrusts your pelvis in tune to the thing.\n\n");
//     DisplayText("As suddenly as it penetrated you, it shifts into a different phase of operation. It buries itself as deep as it can and begins short, rapid strokes. The toy hammers your insides faster than any man could ever hope to do. You orgasm immediately and produce successive climaxes. Your body loses what motor control it had and bucks and undulates wildly as the device pistons your cunt without end. You scream at the top of your lungs. Each yell calls to creation the depth of your pleasure and lust.\n\n");
//     DisplayText("The fiendish belt shifts again. It buries itself as deep as it can go and you feel pressure against the depths of your womanhood. You feel a hot fluid spray inside you. Reflexively, you shout, \"<b>IT'S CUMMING! IT'S CUMMING INSIDE ME!</b>\" Indeed, each push of the prodding member floods your box with juice. It cums... and cums... and cums... and cums...\n\n");
//     DisplayText("An eternity passes, and your pussy is sore. It is stretched and filled completely with whatever this thing shoots for cum. It retracts itself from your hole and you feel one last pang of pressure as your body now has a chance to force out all of the spunk that it cannot handle. Ooze sprays out from the sides of the belt and leaves you in a smelly, sticky mess. You feel the belt's tension ease up as it loosens. The machine has run its course. You immediately pass out.");
//     player.slimeFeed();
//     player.orgasm();
//     dynStats("lib", 1, "sen", (-0.5));
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function allNaturalSelfStimulationBeltBadEnd(): void {
//     spriteSelect(23);
//     DisplayText().clear();
//     DisplayText("Whatever the belt is, whatever it does, it no longer matters to you.  The only thing you want is to feel the belt and its creature fuck the hell out of you, day and night.  You quickly don the creature again and it begins working its usual lustful magic on your insatiable little box.  An endless wave of orgasms take you.  All you now know is the endless bliss of an eternal orgasm.\n\n");
//     DisplayText("Your awareness hopelessly compromised by the belt and your pleasure, you fail to notice a familiar face approach your undulating form.  It is the very person who sold you this infernal toy.  The merchant, Giacomo.\n\n");
//     DisplayText("\"<i>Well, well,</i>\" Giacomo says.  \"<i>The Libertines are right.  The creature's fluids are addictive. This poor woman is a total slave to the beast!</i>\"\n\n");
//     DisplayText("Giacomo contemplates the situation as you writhe in backbreaking pleasure before him.  His sharp features brighten as an idea strikes him.\n\n");
//     DisplayText("\"<i>AHA!</i>\" the hawkish purveyor cries.  \"<i>I have a new product to sell! I will call it the 'One Woman Show!'</i>\"\n\n");
//     DisplayText("Giacomo cackles smugly at his idea.  \"<i>Who knows how much someone will pay me for a live woman who can't stop cumming!</i>\"\n\n");
//     DisplayText("Giacomo loads you up onto his cart and sets off for his next sale.  You do not care.  You do not realize what has happened.  All you know is that the creature keeps cumming and it feels... sooooo GODDAMN GOOD!");
//     Game.gameOver();
// }

// function lickYerGirlParts(): void { // Female cat masturbation
//     DisplayText().clear();
//     if (!player.perks.has(PerkType.Flexibility)) {
//         DisplayText("You undress from your " + player.inventory.equipment.armor.displayName + " and take a seat down on the ground. You spread your legs and look down at your sex. It's aching for something more than just your fingers, and you have a craving to taste the lustful juices leaking out. A very perverted idea of cats flashes through your brain, putting a naughty smile on your face. You lay on your side and spread your legs, giving you a perfect view of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " You lean your head down towards the pleasure-hole, only to be stopped half-way there. You stick your tongue out, trying to add a few more inches, but this doesn't do anything except increase your appetite and your lust as a drop of warm saliva falls onto your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ". You stretch and wriggle your tongue out in a fruitless effort to taste your dripping wet cunt, craving the feeling of your tongue caressing your lips and penetrating into your depths... but it is not to be. You sit back up, frustrated and even more aroused than you were before.");
//         player.stats.lust += 15;
//         MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//         return;
//     }
//     // [1st time doing this]
//     if (Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] === 0) {
//         Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY]++;
//         DisplayText("You take off your " + player.inventory.equipment.armor.displayName + " and take a seat on the ground. You spread your legs and look down at your sex. It's aching for something more than just your fingers, and you have a craving to taste the lustful juices leaking out. A very perverted idea flashes through your brain, putting a smile on your face. You lay on your side and spread your legs again, giving you a perfect view of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ". You lean your head down with your tongue sticking out; closer and closer you come to your own cunt, feeling the heat from your puss flowing against your face as your own hot breath returns the warmth. You're only a small distance away from tasting it before you can't bend any farther.  Your cunny can almost feel your tongue wriggling its slimy warm wetness only a few centimeters away. You pull your head back and let out a frustrated sigh before you remember how the cats in your village got to those hard to reach places: they stretched one of their legs straight up. Following their example, you point one leg straight to the sky and close your eyes as you plunge your head down. You slowly open one eye to see that you're face to face with your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "; you're amazed that you are actually able to do it. You begin lapping your tongue up and down the slutty snatch.\n\n");

//         DisplayText("The feeling is amazing, as you flick your tongue across your swollen " + VaginaDescriptor.describeClit(player) + ". Juices leak from your moist hole, filling your mouth with the sweet taste of girlcum. You can feel your entire sex pulsing and throbbing around your tongue as you plumb the depths of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  The vibrations from your moans and screams of pleasure cause the intense feelings to increase, making you a slave to your own needs. Your juices flow down your chin as you try to swallow every last drop. You crane your neck, giving you deeper access to your wanting honey pot. You can feel yourself tightening around your tongue as it rams into your pussy, soaking up the juices as you slowly reach your peak.  You lick and suck hard around your " + VaginaDescriptor.describeClit(player) + ", using both your hands to spread your cunt farther open. You move your head in an up and down motion just like a cat when they groom themselves. Your lapping and tongue play continues until you can feel your body tense up, ready to cum.\n\n");

//         DisplayText("You cover your entire pussy with your mouth and send a wave of hot air into it; suddenly, a powerful and erotic feeling washes over your entire body. Your pussy clenches hard around your tongue, as your juices release all over your face. You try as hard as you can to catch it all in your mouth, but you find it difficult; your entire body is shaking uncontrollably from the amazing orgasm you gave yourself, making it hard to catch your girlcum. Finally, the orgasm comes to a close as you swallow your juices with pride, giving a relaxed sigh. Still lying on the ground, you savor your own unique flavor with a lick across your lips and sigh of achievement. You feel like taking a cat nap right about now.");
//     }
//     // [Repeatable]
//     else {
//         DisplayText("You quickly undress from your " + player.inventory.equipment.armor.displayName + ", both of your mouths drooling in anticipation for one another. You're going to do some stretches so you can be more nimble with your tongue work. You stand straight and spread your leg apart before leaning back and sticking your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " out in front of you. After holding for a moment, you change positions, leaning your " + BreastDescriptor.describeAllBreasts(player) + " forward and sticking your " + ButtDescriptor.describeButt(player) + " out for all to see.  You alternate leaning back and forth; it looks like you're teasingly thrusting at some unknown creature in the wilds, letting them know you're ready to get fucked. Soon, your spine is nice and limber - working on your legs is next. You stand up straight again, then lift and hold one knee up to your chest, pressing it against your " + BreastDescriptor.describeAllBreasts(player) + ". This loosens it up a bit, but you know you can be more flexible than that. You support the underside of the leg with your hands and then lift the rest of your leg up, pointing your toes at the sky. You slowly take your hands off your leg, and are astonished that you're able to hold it up by itself.  Being naked in this position has allowed your funhole to be exposed to the elements, and you feel a cool breeze blow past your dripping wet sex.  It shakes and quivers, causing you to coo and moan at the sensation. Your leg feels as limber as your spine, so you switch to the other leg.  You immediately launch the other leg up next to your head, not needing the support of your hands to get your ankle behind your ear. You hold the pose for a few minutes, your cunt now drooling with pussy juice and eagerly waiting for you to kiss it. You soon put the leg down; now your back, legs and even your aching sluthole is stretched. You do some quick jaw stretches as you lay down on your bedroll.  Throwing one leg over your head, you easily bend your head down to your other pair of lips.\n\n");

//         DisplayText("Your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " is now right in front of your face, and you can't help but give it a lick with your tongue. The feeling is amazing as you flick your tongue across your swollen " + VaginaDescriptor.describeClit(player) + ". Juices leak from your moist hole, filling your mouth with the sweet taste of girlcum. You can feel you entire sex pulsing and throbbing around your tongue as you plumb the depths of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  The vibrations from your moans and screams of pleasure cause the intense feelings to increase, making you a slave to your own needs. Your juices flow down your chin as you try to swallow every last drop. You crane your neck, giving you deeper access to your wanting honey pot. You can feel yourself tightening around your tongue as it rams into your pussy and soaking up all the juices as you slowly reach your peak. You lick and suck hard around your " + VaginaDescriptor.describeClit(player) + ", using both your hands to spread your cunt farther open. You move your head in an up and down motion just like a cat when they groom themselves. Your lapping and tongue play continues until you can feel your body tense up, ready to cum.\n\n");

//         DisplayText("You lap harder and faster with each second, coming closer and closer to tasting the girlcum about to squirt out of you. You feel your eager sex tighten one more time around your tongue before it releases its sweet nectar into your craving mouth. You guzzle as much as you can, but some leaks onto your " + HeadDescriptor.describeFace(player) + ".  You stick your tongue into your slick cunt to tease out the last few drops of cum. You tongue explores the depths once more, feeling its way around your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " walls and gathering up everything that may not have come out. You wriggle it around for a while until you're satisfied that you got most of the girlcum. You pull away from your sex and spread out relaxed on your bedroll, letting out a sigh like you just drank a whole pitcher of ale in one chug. You stretch out your arms and legs and curl up, ready to take a catnap.");
//     }
//     // Stats & next event
//     // DONE!
//     player.orgasm();
//     player.stats.sens += -0.5;
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function catAutoLick(): void { // Male cat masturbation
//     DisplayText().clear();
//     // NOT FEXIBLE
//     if (!player.perks.has(PerkType.Flexibility)) {
//         // Fails [Herm has a 50/50 chance of getting either.]
//         // [Male]
//         DisplayText("You undress from your " + player.inventory.equipment.armor.displayName + " and take a seat down on the ground, your " + CockDescriptor.describeCock(player, ) + " pointing straight at your face. You stroke the erect member a few times, but then remember the cats back at the village. You stare at your " + CockDescriptor.describeCock(player, ) + "; the more you look at the cock, the more your mouth craves to suck on it. You open your mouth as wide as you can and lean towards your cock, only to be stopped halfway to the tip. You stick your tongue out and try to lick the head. You pretend you're rolling your tongue around the head, but this only makes your cock harder in eagerness. You throw your head forward in an attempt to flick your tongue against it, but the " + CockDescriptor.describeCock(player, ) + " is pulled back as you go forward. You slump your back onto the ground and let out a frustrated groan. The only thing you've managed to do is make yourself more aroused than when you started.");
//         player.stats.lust += 15;
//         MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//         return;
//     }
//     // 1st time
//     if (Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] === 0) {
//         Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY]++;

//         DisplayText("You undress from your " + player.inventory.equipment.armor.displayName + " and take a seat on the ground. You take a look at your transformed body, making notes of things you haven't noticed before. Suddenly, an idea pops into your head: the cats back at the village could reach any place on their body with their tongues! You wonder... closing your eyes and slowly bending down, you try to get as close as possible to your " + CockDescriptor.describeCock(player, ) + ". It only takes a moment before you feel warm breath blowing against your dick. You open your eyes, coming face to face with your erect member. Your body is twisted and bent in a way that only cats can manage. You huff a cloud of hot air on your pecker, and the resulting sensation causes your eyes to roll back in your head. That was incredible and it's about to get better as another thought passes through your head, giving you a dirty smile.\n\n");

//         DisplayText("You lick the head of your throbbing man-meat and another bodyshaking shudder flows through you. You do it a few more times, enjoying the sensations running around inside of you. You bend down farther and lick from the base of your dick to the head. Slowly, you take the head inside of your mouth and begin sucking on it, trying to keep the drool in your mouth. The feeling is enough to make you cum, but you hold it in and move on. You take a few more inches inside your mouth as you begin pumping and thrusting, making lewd noises of moaning and sucking. The feeling is better than any blowjob you've ever had. You start to pump faster and faster, desperate to cum all over your own face. Just thinking about the fact that you're doing this to yourself turns you on even more. You take the rest of your " + CockDescriptor.describeCock(player, ) + " inside of your mouth. You can smell the musty scent coming off of your " + player.BallsDescriptor.describeSack(player) + ". Your throat closes up on your member as you hum and flick your tongue across its head.\n\n");

//         DisplayText("A very familiar feeling of pleasure rushes through your body, causing you to shudder. You pull your cock out and begin to stroke it as you suck on the tip, practically drinking your pre-cum. You can feel your cum building up as it gets ready to be released. After flicking your tongue against the tip of your " + CockDescriptor.describeCock(player, ) + ", you feel the flood of cum flowing up your dick");

//         if (player.countCockSocks("gilded") > 0 && Flags.list[FlagEnum.GILDED_JERKED] < player.countCockSocks("gilded")) {
//             Flags.list[FlagEnum.GILDED_JERKED]++;

//             const gems: number = midasCockJackingGemsRoll();

//             DisplayText(" along with a sudden chill from your Gilded cock sock causing you to reflexively pull off your " + CockDescriptor.describeCock(player, ) + "'s tip just as the complete bliss of orgasm fills your body. Your face is less than an inch from your cock head as you watch your cum shoot up into the air. Caught in the light of the golden cocksock, it beads and twists in the light, crystallizing into a glittering shower. A ");
//             if (player.cumQ() < 25)
//                 DisplayText("sprinkle of");
//             else if (player.cumQ() < 250)
//                 DisplayText("rain of");
//             else DisplayText("torrent of");
//             DisplayText(" gems falls down upon your body instead of cum, bouncing off your " + player.skinFurScales() + " as you arc your back higher and higher until the only thing touching the ground is the top of your head and the tips of your toes! Your hips continue jerking in the air from the intense orgasm for a little while after the cum stops flowing.\n\n");
//             DisplayText("<b>You take a few moments to collect all the glittering gems you just squirted all over the place, all " + gems + " of them</b>, before curling up and taking a short cat nap.");
//             player.stats.gems += gems;
//         }
//         else {
//             DisplayText(". Suddenly, a feeling of complete bliss takes over your body, and you start to squirm and writhe as cum shoots down your throat. You pull off of the tip and let the next burst hit your face. Soon, the torrent of cum subsides, though your hips are still jerking in the air from the intense orgasm. You take a moment to lie down properly and decide to take a small cat nap.");
//         }
//     }
//     // [Repeatable]
//     else {
//         Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY]++;

//         DisplayText("You quickly undress from your " + player.inventory.equipment.armor.displayName + ", your cock drooling with pre-cum in anticipation of your tongue's magic. You're going to do some stretches so you can be more nimble with your tongue work. You stand straight and spread your leg apart, before leaning back and sticking your erect " + CockDescriptor.describeCock(player, ) + " forward. After holding for a moment, you switch positions, leaning your chest forward and sticking your " + ButtDescriptor.describeButt(player) + " out for all to see – if anyone was around. You alternate leaning back and forth; it looks like you're fucking some invisible bitch. Soon, your spine is nice and limber – working on your legs is next. You stand up straight again, then lift and hold one knee up to your chest, pressing it against your " + BreastDescriptor.describeAllBreasts(player) + ". This loosens it up a bit, but you know you can be more flexible than that. You support the underside of the leg with your hands and then lift the rest of your leg up, pointing your toes at the sky. You slowly take your hands off your leg, and are astonished that you're able to hold it up by itself. Being naked in this position has allowed your man-meat to be exposed to the elements, and you feel a cool breeze brushing against your cock.  It throbs harder, causing you to coo and moan at the sensation. Your leg feels as limber as your spine, so you switch to the other leg. You immediately launch the other leg up next to your head, not needing the support of your hands to get your ankle behind your ear. You hold the pose for a few minutes, your cock throbbing and leaking pre-cum, eagerly waiting for you to lick and suck it. You soon put the leg down, hornier then you've ever been. You do some quick jaw stretches as you lay down on your bed roll. Throwing one leg over your head, you easily bend your head down to your member.\n\n");

//         DisplayText("Your " + CockDescriptor.describeCock(player, ) + " is now poking at the left cheek of your " + HeadDescriptor.describeFace(player) + "; you miscalculated how much flexibility you needed. You use your tongue to guide the eager meat-rod into your dripping wet mouth. Your lips latch around the tip, sucking on it while your tongue rolls around the head. You begin leaning your head forward, bringing the " + CockDescriptor.describeCock(player, ) + " further into your mouth. Your tongue massages the underside as you stick it out to cover as much cock as you can. Small bits of pre-cum shoot out, sending its salty taste down your throat. You lift your head off and your tongue follows close behind, leaving a trail of saliva and resulting in a slurp as you continue to lick the throbbing head. You take the cock down your throat once more, bobbing your head up and down the shaft while flicking your tongue from left to right. You begin moving your head faster and harder, making you let out lewd gagging sounds, but it feels too good to stop now. Your entire cock is soaked in saliva, dripping down your shaft and onto the ground. Soon you're moving your hips as much as you can; you are no longer giving yourself a blowjob – you're throat-fucking yourself. The lewd, gagging sound grows louder and more aggressive; anyone passing by would think you were choking a chicken.\n\n");

//         DisplayText("Another shot of pre-cum is sent down your throat, followed by the building pressure of your release. You force your head down to the base of your " + CockDescriptor.describeCock(player, ) + ", sending it deeply down your throat, feeling the warm and smooth inside as it tightens around the invading member. Thank goodness you're holding your breath, or you would be suffocating right now. You hurry up before you choke on your cock,  moving your head back and forth while your hand caresses the base of your cock. ");

//         if (player.countCockSocks("gilded") > 0 && Flags.list[FlagEnum.GILDED_JERKED] < player.countCockSocks("gilded")) {

//             Flags.list[FlagEnum.GILDED_JERKED]++;

//             const gemsCreated: number = midasCockJackingGemsRoll(); // Changed as gems caused a duplicate let warning

//             DisplayText("You once again feel a slight chill as you reach the point-of-no-return and you let your " + CockDescriptor.describeCock(player, ) + " pop free of your mouth. You watch in glee as your seed slit parts to begin the sparkling shower you know is coming. Your cum, caught in the light of the golden cocksock, beads and twists in the light, crystallizing into a glittering shower. A ");
//             if (player.cumQ() < 25)
//                 DisplayText("sprinkle of");
//             else if (player.cumQ() < 250)
//                 DisplayText("rain of");
//             else DisplayText("torrent of");
//             DisplayText(" gems falls down upon your body instead of cum, bouncing off your " + player.skinFurScales() + " as you arc your back higher and higher until the only thing touching the ground is the top of your head and the tips of your toes! Your hips continue jerking in the air from the intense orgasm for a little while after the cum stops flowing.\n\n<b>You take a few moments to collect all the glittering gems you just squirted all over the place, all " + gemsCreated + " of them</b>, before curling up and taking a short cat nap.");

//             player.stats.gems += gemsCreated;
//         }
//         else {
//             if (Flags.list[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] > 10 && player.torso.balls.quantity > 1 && randInt(5) === 0) {
//                 DisplayText("But it's not enough and you are forced to come up for air.");

//                 DisplayText("\n\nWhile gasping for air, you scowl at your " + CockDescriptor.describeCock(player, ) + " in disapproval. That's when your " + player.BallsDescriptor.describeSack(player) + " catches your attention. It's gleaming with your sex sheen and you watch one of your balls slowly slide off to one side.");

//                 DisplayText("\n\nYou think you can make it! You throw your other leg over your head and both feet come to rest on your back. You push your mouth towards your " + player.BallsDescriptor.describeSack(player) + ", slowly walking your toes down your back. You are only an inch from your " + player.BallsDescriptor.describeBalls(true, true, player) + " now and your own aroma fills your nostrils, spurring your on. Then, finally, you are there! And it nearly knocks you out! The sensation of your own balls in your mouth is incredible--you can feel them churning in your mouth--and your [feet] start kneeding your back. You bring your hands up to massage your " + player.BallsDescriptor.describeBalls(true, true, player) + " as well, making them take turns in your mouth. Completely intoxicated by your own scent you loose all track of time--there is only the bliss of sucking, licking, and massaging your own balls...");

//                 DisplayText("\n\nAbrubtly you realize that your " + CockDescriptor.describeMultiCockSimpleOne(player) + " have soaked your torso in precum--apparently you've been on the edge for some time. In one swift motion, you pick your head up and slam your mouth down over your " + CockDescriptor.describeCock(player, ) + " leaving your hands to continue their ball massage.");

//                 // add cum quantity conditional text...
//                 DisplayText("\n\nThe release is immediate. You feel the contractions of your climax against your [face], your [feet] involuntarly start massaging your back, and you feel your " + CockDescriptor.describeCock(player, ) + " expand and contract in your mouth as seed pumps through it into your stomach. It's more relaxing than anything else--each contraction makes you feel like you might be melting a little, like you might remain in this position forever.");

//                 DisplayText("\n\nYour [feet] and hands are still masagging their respective charges when you realize you are starting to go flaccid! You make an attempt to massage every last drop of cum from your " + player.BallsDescriptor.describeBalls(true, true, player) + ", sucking on your " + CockDescriptor.describeCock(player, ) + " continuously as it goes down. It slowly slips from your mouth once it's completely deflated, causing you to frown slightly. Still feeling great in this position, you go down on your " + player.BallsDescriptor.describeSack(player) + " again--alternating between licking and sucking them with your mouth and massaging them with your hands.");

//                 DisplayText("\n\nFinally satiated, you begin untangling yourself and realize how sweaty and sticky you are. Again, remembering the cats from your village, you begin to lick ever square inch clean you can reach just like they do and you discover a new form of pleasure. After you lick yourself clean, you stretch out into the spread-eagle position to get a few small kinks out and to admire your naked body glistening in your spit. As you begin to doze off, <b>you think your balls feel a little denser.</b>");

//                 player.modCumMultiplier(0.3);
//             }
//             else {
//                 DisplayText("This releases the pent - up pressure through your cock and down your throat. It's too much for you to handle; your cheeks fill up with cum and you pull your head back, making a loud popping sound when you finally free your mouth, as the cum pooled in your cheeks spills out all over your cock. Your cock spurts a few more lines of sperm onto your stomach. You stroke the exhausted member a few times, milking the last drops of cum out. Satisfying the final bits of lust, you lay down on the bedroll and fall into a short cat nap.");
//             }
//         }
//     }
//     // Stats & next event
//     // DONE!
//     player.orgasm();
//     dynStats("sen", (-0.5));
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function meditate(): void {
//     DisplayText().clear();
//     DisplayText("You find a flat, comfortable rock to sit down on and meditate.  As always, meditation brings a sense of peace and calm to you, but it eats up two hours of the day.");

//     dynStats("lus", - 50, "cor", -.3 - 0.3 * player.countCockSocks("alabaster"))
//     if (player.perks.has(PerkType.Enlightened) && player.stats.cor < 10) HPChange(50, true);
//     MainScreen.doNext(Scenes.camp.returnToCampUseTwoHours);
// }

// function dualBeltMasturbation(): void {
//     DisplayText().clear();
//     DisplayText("You look at the thing in front of you and sigh, your " + CockDescriptor.describeMultiCockShort(player) + " and " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " dripping with fluids. With a nervous sigh you step into the underwear looking device and slip it up your legs, the cold metal feeling so good on your " + player.skinDesc + ", sending a rush of feelings up your body. You slip your " + CockDescriptor.describeCock(player, ) + " down and into a hole on the front of the belt, the extra length sticking out on the other side of it. Underneath the hole and right above your pussy is another metal square with what feels like a small nub on the inside rubbing against your clit. Shivering from the feeling of it, you stay there for a moment, waiting in anticipation. Finally, you reach down to the side of the belt and flick the switch to the on position.\n\n");
//     DisplayText("The belt whirs to life, shaking on your waist, sending jolts of pleasure through your clit as the small inside nub hits it. \"<i>Ohh...</i>\" Suddenly, the ring around your cock vibrates and then tightens hard around your cock, the belt sinking onto your body and locking in place. Worry sets in instantly as you try to wiggle and take it off, but it is no use. You see something black bubble from the edges of the metal, worried even more that it might be some sort of acid. It begins to creep across your skin at a disturbing rate, going down your " + LegDescriptor.describeLegs(player) + " and encasing them in the blackness, wrapping your cock, ");
//     if (player.torso.tailType > TailType.NONE) DisplayText("covering up your tail, ");
//     DisplayText("and then going up your body, covering your " + BreastDescriptor.describeAllBreasts(player) + " and neck. The only part of your body unclad by the suit is your head. The blackness feels slick and smooth, almost cold, a strange type of feeling washes over you until you realize that it is a rubber suit.\n\n");
//     DisplayText("Before you can do anything else, the belt activates again and the latex covering of your " + CockDescriptor.describeCock(player, ) + " begins to tighten and pulse around the meat, warming up to feel like a virgin cunt. A moan is dragged from your lips as it begins to ripple and pulse, simulating the feeling of fucking a tight hole as the entire suit molds itself to your body. Before you can get too used to the feeling of the suit milking your cock, the nub that had been teasing your clit suddenly expands and pushes out, the slick feeling of the latex pushing into your pussy.  The hardened black latex splits your tunnel and spreads you wide as it goes in deep. Your eyes widen for a moment as both stop, and then your world explodes in a flash of pleasure. The hardened lump begins to piston in and out of your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ", vibrating wildly as a lump grows in on top in precisely the right spot to rub back and forth on your g-spot.\n\n");
//     DisplayText("Meanwhile the latex around your " + CockDescriptor.describeCock(player, ) + " begins to pulse and ripple faster than ever before. You quake and quiver, " + LegDescriptor.describeLegs(player) + " giving out as it teases and pulses around your " + BreastDescriptor.describeAllBreasts(player) + ". Your hands go down your body helplessly and start stroking at your encased cock, rubbing up and down your length. Unfortunately, all things must come to an end as the pleasure gets to be way too much and you feel yourself cum. Your hips buck wildly as you feel cum spurt into the latex, the end swelling up and filling like a ");
//     if (player.cumQ() > 200) DisplayText("massive ");
//     DisplayText("balloon. ");
//     if (player.cumQ() >= 1000) DisplayText("It grows larger and larger until you are sure it will pop, but it doesn't.  It just sloshes around - a huge bubble, nearly waist high. ");
//     DisplayText("Your eyes close in shivered ecstasy as your cunt spasms and clutches down around the hardened section deep inside of you. ");
//     // ([If high lactation]
//     if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 2) DisplayText("Milk gushes out from your " + BreastDescriptor.describeBreastRow(player.torso.chest.get(0)) + " as you orgasm, filling the inside of the suit with a slick layer of milk and forming milk bubbles that hang lewdly off your chest. ");
//     DisplayText("However, the suit is far from over as it keeps up all of its actions, keeping you on an orgasmic plateau, making sure you never stop coming. Your hands fall to the side and your body falls down, unable to keep it up as your consciousness fades, the suit still filling with all your fluids.\n\n");
//     DisplayText("When you wake, the black latex is no longer covering your body and the belt is silent around your waist. Cum drips from the tip of your cock and the top part of your " + LegDescriptor.describeLegs(player) + " are coated with your feminine juices. ");
//     if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 2) DisplayText("Thin streams of creamy milk flow from your " + BreastDescriptor.describeAllBreasts(player) + ", your torso and midsection dripping wet from the stuff. ");
//     DisplayText("Completely sated, you take off the belt, finding it slides off easily, and put it away in your campsite, eagerly awaiting the time you can next use it and have the suit work you over once more.");
//     player.stats.sens += -1;
//     player.stats.lust += -300;
//     if (player.stats.lib < 30) player.stats.lib += .5;
//     if (player.stats.lib < 50) player.stats.lib += .5;
//     if (player.stats.lib < 60) player.stats.lib += .5;
//     if (player.stats.sens > 40) player.stats.sens -= 1;
//     if (player.stats.sens > 60) player.stats.sens -= 1;
//     if (player.stats.sens > 80) player.stats.sens -= 1;
//     if (player.stats.tou > 50) player.stats.tou += -1;
//     if (player.stats.tou > 75) player.stats.tou += -1;
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function centaurMasturbation(): boolean {
//     DisplayText().clear();
//     const canMasturbateHugeCock: boolean = player.torso.cocks.count > 0 && (player.tallness * (5 / 6) < player.torso.cocks.list[player.longestCock()].cockLength);
//     if (player.torso.chest.hasFuckableNipples()) {
//         if (canMasturbateHugeCock && randInt(2) === 0) { // 50/50 chance of either if you can do both
//             centaurHugeCock();
//             return true;
//         }
//         centaurNippleCunt();
//         return true;
//     }
//     else if (canMasturbateHugeCock) {
//         centaurHugeCock();
//         return true;
//     }
//     centaurCantMasturbate(); // Failsafe - you suck.
//     return false;
// }

// function centaurNippleCunt(): void {
//     DisplayText("You shrug out of your " + player.inventory.equipment.armor.displayName + ", ");
//     if (Flags.list[FlagEnum.PC_FETISH] > 0)
//         DisplayText("panting lustily as you envision being caught masturbating your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s.");
//     else if (player.stats.cor < 33)
//         DisplayText("blushing a bit as you look down at your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s.");
//     else if (player.stats.cor < 66)
//         DisplayText("shivering as the air hits your exposed " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s.");
//     else DisplayText("smiling to yourself as you blatantly oogle your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s.");
//     DisplayText("  The openings are soft, sensitive, and slick as you ease a fingertip into ");
//     if (player.torso.chest.countNipples() > 2) DisplayText("two of ");
//     DisplayText("them.");
//     if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2)
//         DisplayText("  The sudden displacement makes your " + BreastDescriptor.describeBreastRow(player.torso.chest.get(0)) + " jiggle enticingly, and the sudden movement fires arcs of pleasure deep into your body.");
//     else DisplayText("  They're shallow enough that you don't get much more than a fingertip inside them, but the flesh is extraordinarily sensitive, shooting arcs of pleasure deep into your body.");
//     DisplayText("  Your free fingers slowly stroke around the outer edges of your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s' lips, pausing when you feel a tiny sensitive clit-like nub just inside the top of the opening.\n\n");

//     DisplayText("Shivering with pleasure, you kneel down to prevent your legs from going out from underneath you.   Your " + HeadDescriptor.describeFace(player) + " flushes hotter as you toy with the slippery nipple-cunts, feeling them growing hard and puffy as you turn yourself on more and more.  ");
//     if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1)
//         DisplayText("Thick, milky lubricant races down the curvature of your breasts as your self-pleasure inadvertently lets your milk down.");
//     else if (player.torso.vaginas.get(0).wetness >= 3)
//         DisplayText("Rivulets of lubricant race down the curvature of your breasts as your chest-pussies clench around your intruding fingers.");
//     else DisplayText("Slick lubricant squishes around your fingers as you finger-fuck your chest-pussies.");
//     DisplayText("  You moan and lean over, shoving a second finger inside each of them and rubbing your thumbs over the miniature clits as you near orgasm.\n\n");

//     if (player.torso.vaginas.count > 0 || player.torso.cocks.count > 0) {
//         let plural: boolean = false;
//         DisplayText("Denied a single touch, your ");
//         if (player.torso.cocks.count > 0) {
//             if (player.torso.vaginas.count > 0)
//                 DisplayText(CockDescriptor.describeMultiCockShort(player) + " and " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)));
//             else DisplayText(CockDescriptor.describeCock(player, ));
//             // Set as plural if multi dick or dick and vag.
//             if (player.torso.vaginas.count > 0 || player.torso.cocks.count > 1) plural = true;
//         }
//         else DisplayText(VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)));
//         if (plural)
//             DisplayText(" leak their own fluid, quivering with ache and need that you can't reach to satisfy.");
//         else DisplayText(" leaks its own fluids, quivering with ache and need that you can't reach to satisfy.");
//         if (player.torso.cocks.count > 1)
//             DisplayText("  You feel each of your " + CockDescriptor.describeMultiCockShort(player) + " tapping against your belly as your muscles clench, getting as much pleasure as possible from your male endowments.");
//         else if (player.torso.cocks.count === 1)
//             DisplayText("  You feel your " + CockDescriptor.describeMultiCockShort(player) + " tapping against your belly as your muscles clench, getting as much pleasure as possible from your male endowment.");
//         if (player.torso.balls.quantity > 0) DisplayText("  Rocking slightly inside your sack, your " + player.BallsDescriptor.describeBalls(true, true, player) + " repeatedly clench up against your body, ready to release.");
//         DisplayText("\n\n");
//     }
//     // (ORGAZMO)
//     DisplayText("A slow wave of contractions starts deep inside each of your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s.  It intensifies as it rises towards the surface of your " + BreastDescriptor.describeBreastRow(player.torso.chest.get(0)) + ", reaching a crescendo that brings you to the peak of pleasure.  Your eyes roll back as you slump down in orgasmic bliss, fingers pumping relentlessly at you slippery nipple-holes.  Noisy wet squelches and incessant moaning rouse you from your pleasure-induced coma, eventually waking you back to reality.\n\n");

//     // Optional post orgasm bits for dicks/pussies
//     if (player.torso.cocks.count > 0) {
//         if (player.cumQ() < 50) DisplayText("A small puddle of semen has formed under you, ");
//         else if (player.cumQ() < 200) DisplayText("A decent sized puddle of white seed has formed under you, ");
//         else if (player.cumQ() < 1000) DisplayText("A large puddle of white seed has formed underneath you and even splattered your underside, ");
//         else if (player.cumQ() < 2000) DisplayText("A frothing puddle of thick cum has formed below you, soaking your legs and underbelly, ");
//         else DisplayText("A small lake of semen surrounds you, ");
//         DisplayText("released from your " + CockDescriptor.describeMultiCockShort(player) + " by the intense climax.");
//         if (player.torso.vaginas.count > 0) DisplayText("  ");
//     }
//     if (player.torso.vaginas.count > 0) {
//         if (player.torso.vaginas.get(0).wetness < 2)
//             DisplayText("The scent of pussy hangs in the air, clinging to your moist, puffy cunt-lips.");
//         else if (player.torso.vaginas.get(0).wetness < 4)
//             DisplayText("The air is full of the scent of horny horse-pussy.  If the moist feeling between your hind-legs is any indication, your back-half probably looks and smells like a mare in heat.");
//         else if (player.torso.vaginas.get(0).wetness < 5)
//             DisplayText("The air is saturated with the heady scent of aroused horse-pussy, and if the wetness between your hind-legs is any indication, your hind-quarters would be a slip 'n slide of pleasure for any daring enough to penetrate you.");
//         else DisplayText("The air is filled with the thick musk of your bestial horse-pussy.  If the rivulets of moisture dripping down to your hooves are any indication, you might need to get used to the smell.");
//     }
//     if (player.torso.cocks.count > 0 || player.torso.vaginas.count > 0) DisplayText("\n\n");

//     // Real aftermath
//     DisplayText("Judging by the sky, at least an hour has passed.  You sigh and pry your cramped fingers from your aching " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s, rubbing the sore entrances with your palm before you climb back up onto your " + LowerBodyDescriptor.describeFeet(player) + ".  As you get dressed, you're very conscious of how much better you feel from the wonderful finger-fuck.  ");
//     if (player.stats.cor > 66)
//         DisplayText("You can't wait to do it again.");
//     else if (player.stats.cor > 33)
//         DisplayText("You're a bit confused by how much you enjoyed the perverse activity.");
//     else DisplayText("You're horrified at what you're doing to deal with your inner perversions.");
//     // DONE!
//     player.orgasm();
//     dynStats("sen", (-0.5));
// }

// function centaurHugeCock(): void {
//     // Set plurality and primary cock.
//     let primary: number = player.longestCock();
//     let plural: boolean = (player.torso.cocks.count > 1);
//     DisplayText("You shrug out of your " + player.inventory.equipment.armor.displayName + ", not that it does much to impede your " + CockDescriptor.describeMultiCockShort(player) + " as a centaur.   ");
//     if (player.stats.cor < 33)
//         DisplayText("Sighing in disappointment and shame, ");
//     else if (player.stats.cor < 66)
//         DisplayText("Sighing in resignation, ");
//     else DisplayText("Smiling with excitement, ");
//     DisplayText("you blush as ");
//     if (plural) DisplayText("each of ");
//     DisplayText("your " + CockDescriptor.describeMultiCockShort(player) + " swells out underneath you, hanging down from your equine hindquarters as ");
//     if (!plural) DisplayText("it grows full and hard.");
//     else DisplayText("they grow full and hard.");
//     if (plural)
//         DisplayText("  After a moment they peek out from under your forelegs, proudly displaying your " + CockDescriptor.describeMultiCockShort(player) + ".");
//     else {
//         DisplayText("  After a moment it peeks out from under your forelegs, proudly displaying your ");
//         if (player.torso.cocks.get(primary).type === CockType.HORSE) DisplayText("flared tip");
//         else if (player.torso.cocks.get(primary).type === CockType.DEMON) DisplayText("nodule-ringed head");
//         else if (player.torso.cocks.get(primary).type === CockType.DOG) DisplayText("pointed erection");
//         else if (player.torso.cocks.get(primary).type === CockType.TENTACLE) DisplayText("wriggling, mushroom-like tip");
//         else if (player.torso.cocks.get(primary).type === CockType.CAT) DisplayText("spiny head");
//         else if (player.torso.cocks.get(primary).type === CockType.LIZARD) DisplayText("pointed, purple tip");
//         else if (player.torso.cocks.get(primary).type === CockType.ANEMONE) DisplayText("tentacle-ringed head");
//         else DisplayText("dome-like head");
//         DisplayText(".");
//     }
//     if (player.tallness * 1.5 < player.torso.cocks.list[player.longestCock()].cockLength) {
//         DisplayText("  In no time flat you're rendered virtually immobile by the length of ");
//         if (plural) DisplayText("all ");
//         DisplayText("your " + CockDescriptor.describeMultiCockShort(player) + ".");
//     }
//     DisplayText("\n\n");
//     // Get started (not THAT long)
//     if (player.tallness * 1.5 >= player.torso.cocks.list[player.longestCock()].cockLength) {
//         DisplayText("Bending down and grabbing hold with both hands, you take ");
//         if (plural)
//             DisplayText("a ");
//         else DisplayText("your ");
//         DisplayText(CockDescriptor.describeCock(player, primary) + " and lift up, pressing it tightly against your belly as you begin to stroke along the sensitive underside.  ");
//         if (player.cumQ() > 500)
//             DisplayText("Thick streams of pre-cum start to drizzle from your tip, forced out due to your prodigious production of sexual fluid.");
//         else if (player.cumQ() > 100)
//             DisplayText("A dribble of pre-cum starts to leak from the tip as you get more into the act.");
//         else DisplayText("A tiny dollop of pre-cum slowly builds on your tip as you get into the act.");
//         if (player.torso.vaginas.count > 0) DisplayText("  Your neglected " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " aches for penetration, but there's no way you'll be able to reach it in your current state.");
//         DisplayText("  You sigh, delighted that you're able to caress at least one of your sexual organs with this body");
//         if (player.stats.cor < 40) DisplayText(", but you're also worried that you're falling into the perversion that lurks in this strange world");
//         DisplayText(".  It feels so good that you close your eyes and whinny with delight.\n\n");

//         DisplayText("You smear your pre-cum over the tip, rolling your palm across the sensitive tip in a way that makes it hard to stand.  Meanwhile your other hand is busy fondling the underside, stroking what little of your length you can reach.  Even with the limited access, you can feel your " + CockDescriptor.describeCock(player, primary) + " pulsing in your grip, growing harder with every touch and caress.");
//         if (player.torso.cocks.count === 2)
//             DisplayText("  Your other dick mimics its lucky brother's pleasure, even though it's been ignored in order for you to focus on your current 'toy'.");
//         else if (player.torso.cocks.count > 2)
//             DisplayText("  Your other " + CockDescriptor.describeMultiCockShort(player) + " mimic their lucky brother's pleasure, even though they've been ignored in order for you to focus on your current 'toy'.");
//         DisplayText("  You let your hind legs give out and slump down, locking your forelegs while you tremble with what can only be the approach of an orgasm.\n\n");
//     }
//     // Get started (long)
//     else {
//         DisplayText("Bending down and grabbing hold with both hands, you take ");
//         if (plural)
//             DisplayText("a ");
//         else DisplayText("your ");
//         DisplayText(CockDescriptor.describeCock(player, primary) + " and lift it up, curving it slightly as you begin to stroke the underside with long, fluid caresses.  You even manage to bend down and give it a lick, forcing you into a pleasurable shudder.");
//         if (player.cumQ() > 500)
//             DisplayText("  Thick streams of pre-cum start to drizzle from your tip, forced out due to your prodigious production of sexual fluid.");
//         else if (player.cumQ() > 100)
//             DisplayText("  A dribble of pre-cum starts to leak from the tip as you get more into the act.");
//         else DisplayText("  A tiny dollop of pre-cum slowly builds on your tip as you get into the act.");
//         if (player.torso.vaginas.count > 0) DisplayText("  Your neglected " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " aches for penetration, but there's no way you'll be able to reach it in your current state.");
//         DisplayText("  You sigh, delighted that you're able to caress your sexual organs with this body");
//         if (player.stats.cor < 33) DisplayText(", but you're also worried that you're falling into the perversion that lurks in this strange world");
//         DisplayText(".  It feels so good that you close your eyes and whinny with delight as your hands fondle your massive length.\n\n");

//         // STROKE (long)
//         DisplayText("You smear your pre-cum over the tip, rolling your palm across the sensitive tip in a way that makes it hard to stand.  Meanwhile your other hand is making great use of your incredible length, jacking you off with long fluid strokes.  In no time flat, you can feel your " + CockDescriptor.describeCock(player, ) + " pulsing in your grip, growing harder in time with your fevered stroking.");
//         if (player.torso.cocks.count === 2)
//             DisplayText("  Your other dick mimics its lucky brother's pleasure, even though it's been ignored in order for you to focus on your current 'toy'.");
//         else if (player.torso.cocks.count > 2)
//             DisplayText("  Your other " + CockDescriptor.describeMultiCockShort(player) + " mimic their lucky brother's pleasure, even though they've been ignored in order for you to focus on your current 'toy'.");
//         DisplayText("  You let your hind legs give out and slump down, locking your forelegs while you tremble with what can only be the approach of an orgasm.\n\n");
//     }
//     // Cumjaculation
//     if (player.tallness * 1.5 >= player.torso.cocks.list[player.longestCock()].cockLength)
//         DisplayText("Squeezing tightly around your " + player.cockHead());
//     else DisplayText("Pumping hard");
//     DisplayText(", you orgasm, feeling relief flow through you with every pump of ");
//     if (player.torso.balls.quantity > 0)
//         DisplayText("your " + player.BallsDescriptor.describeBalls(true, true, player));
//     else DisplayText("release");
//     DisplayText(".  You arch your back as you blast out your seed, shuddering and spraying it into the air.  It splatters wetly against a rock, oozing down the now-slimy surface ");
//     if (player.cumQ() < 50)
//         DisplayText("as you finish unloading against it.");
//     else if (player.cumQ() < 200)
//         DisplayText("as you continue to pump more and more seed onto it.");
//     else if (player.cumQ() < 500)
//         DisplayText("as you continue to fountain more and more spooge over it.  By the time you finish there's a small puddle at the base and you've thoroughly glazed the rock in question.");
//     else if (player.cumQ() < 1500)
//         DisplayText("as you continue to blast it with cum.  Spooge puddles underneath it, slowly spreading while it soaks into the barren ground.");
//     else {
//         DisplayText("as you continue to erupt cum all over it.  The thick spooge forms a thick puddle at the base, spreading until your hooves are coated in it.");
//         if (player.cumQ() > 3000) DisplayText("  As you finish cumming, the puddle deepens.  It's inches thick and splattering everywhere whenever you take a step.");
//     }
//     DisplayText("  You slump back, still shuddering from the pleasure as you feel your ");
//     if (!plural)
//         DisplayText("member");
//     else DisplayText("members");
//     if (player.torso.cocks.hasSheath()) {
//         if (plural)
//             DisplayText(" slowly grow limp and slide back inside your sheath.");
//         else DisplayText(" slowly growing limp and sliding back inside your sheath.");
//     }
//     else if (player.minLust() > 40 || player.stats.lib > 50) {
//         if (plural)
//             DisplayText(" grow slightly less hard.  As much as you seem to need sex, that doesn't surprise you.");
//         else DisplayText(" growing slightly less hard.  As much as you seem to need sex, that doesn't surprise you.");
//     }
//     else {
//         if (plural)
//             DisplayText(" slowly grow limp, shrinking.");
//         else DisplayText(" slowly growing limp, shrinking.");
//     }
//     DisplayText("\n\n");
//     // Cunt cums
//     if (player.torso.vaginas.count > 0) {
//         if (player.torso.vaginas.get(0).wetness <= 1)
//             DisplayText("A trickle of wetness oozes down your thighs, filling the air with the scent of centaur sex from your orgasm.");
//         else if (player.torso.vaginas.get(0).wetness === 2)
//             DisplayText("Fluids leak down your thighs, filling the air with the scent of centaur sex as you orgasm.");
//         else if (player.torso.vaginas.get(0).wetness === 3)
//             DisplayText("Thick, clear fluid soaks your thighs, filling the air with the scent of liquid centaur sex as you orgasm.");
//         else if (player.torso.vaginas.get(0).wetness === 4)
//             DisplayText("Thick fluid coats your thighs and drips into a puddle on the ground, filling the air with the pungent aroma of liquid centaur sex as you orgasm.");
//         else DisplayText("Spatters of fluids gush out from between your thighs, coating your upper legs in a thick coat of clear feminine lubricant as you orgasm.  The air is filled from the scent of your liquid centaur lust as more and more drips into a rapidly expanding puddle between your rear legs.");
//         if (player.torso.chest.hasFuckableNipples()) {
//             if (player.torso.chest.countNipples() > 2)
//                 DisplayText("All");
//             else DisplayText("Both");
//             DisplayText(" of your " + num2Text(player.torso.chest.countNipples()) + " " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s quiver, ");
//             if (player.torso.vaginas.get(0).wetness < 4 && player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 2)
//                 DisplayText("leaking");
//             else if (player.torso.vaginas.get(0).wetness < 5 && player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 3)
//                 DisplayText("dripping");
//             else DisplayText("squirting");
//             DisplayText(" equal quantities of ");
//             if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 1)
//                 DisplayText("clear");
//             else DisplayText("milk-laced");
//             DisplayText(" lubricant.  You pause to finger their entrances, shivering unconsciously as you slowly come down.");
//         }
//         DisplayText("\n\n");
//     }
//     DisplayText("Sated for now, you rest for an hour or so before climbing back atop your hooves.");
//     // DONE!
//     player.orgasm();
//     dynStats("sen", (-0.5));
// }

// function centaurCantMasturbate(): void {
//     if (Flags.list[FlagEnum.UNABLE_TO_MASTURBATE_BECAUSE_CENTAUR] === 0) {
//         DisplayText("No matter how you twist and turn, you can't reach anywhere close to your ");
//         if (player.torso.cocks.count > 0 || player.torso.vaginas.count > 0)
//             DisplayText("genitalia");
//         else DisplayText("anything remotely sexual");
//         DisplayText("!  It seems that being a centaur has a rather crippling downside – you can't reach around to get yourself off and sate your lusts!\n\n");
//         Flags.list[FlagEnum.UNABLE_TO_MASTURBATE_BECAUSE_CENTAUR]++;
//     }
//     else {
//         DisplayText("You still can't reach around to masturbate yourself.  Being half-horse sure is inconvenient!\n\n");
//     }
//     // (If Milker)
//     if (player.hasKeyItem("Cock Milker - Installed At Whitney's Farm") >= 0 && player.torso.cocks.count > 0)
//         DisplayText("Perhaps you could visit the cock-milker you have set up at Whitney's farm and drain off the arousal?  Or maybe you'll just have to find a willing partner somewhere.");
//     else DisplayText("It looks like you'll have to find a partner to relieve your pent up need, but in your current state you'll probably be on the receiving end of whatever you can get!");
// }

// // [Maturbate] -- [Fake Mare] (Cock Centaurs Only)
// function centaurDudesGetHorseAids(): void {
//     let x: number = player.biggestCockIndex();
//     DisplayText().clear();
//     if (player.keyItemv1("Fake Mare") === 0) {
//         if (player.stats.cor < 50)
//             DisplayText("Deciding to give the mare-like cocksleeve you got from Whitney a try, you spend a few awkward minutes dragging the lump of metal off to someplace secluded and setting it up.  When you're done, you stand behind a wood-and-iron replica of a mare, adjusted to the perfect height for you.  Looking \"<i>her</i>\" over, your eyes are drawn to the slick black lips of the Onahole between her legs, craftily shaped like a horsecunt, and what looks like a second, smaller one above it simulating an anus.\n\n");
//         // [If Med-High Corruption:]
//         else DisplayText("You decide to play with the mare-shaped cocksleeve Whitney gave you.  You pull it out of your stash and spend a few minutes setting it up in the heart of camp.  Once done, you stand behind a wood-and-iron replica of a mare, adjusted to the perfect height for you.  Looking \"<i>her</i>\" over, your eyes are drawn to the slick black lips of the Onahole between her legs, craftily shaped like a horsecunt, and what looks like a second, smaller one above it simulating an anus.\n\n");
//     }
//     DisplayText("Seeing the toy's exposed, gaping genitals, you feel a stirring in your " + CockDescriptor.describeMultiCockShort(player) + ".  You yearn to touch yourself, but your centaur lower body prevents you, as usual.  Grunting with annoyance, you trot up to the toy and give its wide cunt an experimental fisting.  ");
//     // [If small cock:
//     if (player.cockArea(x) < 30)
//         DisplayText("Your hand slips in easily... since it's made for real horsecocks, it's a bit too big to give you any satisfaction.  Your gaze shifts upwards to the toy's fake anus, which seems a bit more your size.</i>\"");
//     else DisplayText("Your fist slips in easily, and you give the toy a few preparatory thrusts to make sure it's nice and ready for your hefty cock.");
//     DisplayText("\n\n");

//     DisplayText("Satisfied the toy is ready for you, you clop back a few paces and surge forward.  You mount the toy easily, your belly running across its smooth, warm back until your chest bumps against the mare's head.  You grip her shoulders for support and start to buck your hips, your " + CockDescriptor.describeCock(player, x) + " poking around in search of entrance.  Finally, you feel the tip of your prick ");
//     if (player.cockArea(x) < 30)
//         DisplayText("pressing against the tight ring of the toy's anus");
//     else DisplayText("lining up with the toy's gaping cunt");
//     DisplayText(".  You rear your " + LowerBodyDescriptor.describeHips(player) + " and slam yourself into the mare's waiting hole.\n\n");

//     DisplayText("The toy's passage seems to shift and contract around your " + CockDescriptor.describeCock(player, x) + ", molding itself to perfectly sheathe you.  What a marvelous little toy!  You slide on up until you hilt yourself, your crotch pressed against the mare's wide ass as your " + player.chestDesc() + " squeezes against her back.  Now fully mounted, you begin to rut on the mare toy, slapping your hips");
//     if (player.torso.balls.quantity > 0)
//         DisplayText(" and " + player.BallsDescriptor.describeBalls(true, true, player));
//     DisplayText(" hard against her rump as you pound into her tight, slick ");
//     if (player.cockArea(x) >= 30)
//         DisplayText("horsecunt");
//     else DisplayText("asshole");
//     DisplayText(".\n\n");

//     DisplayText("Finally able to get the release you weren't able to give yourself, you feel an orgasm mounting deep within you.  You let out a loud, equine whinny as you hump the toy faster and faster, pounding her with your " + CockDescriptor.describeCock(player, x) + " until the pleasure overwhelms you.  You cry out as you cum, squirting your centaur-cum as far into the toy as you can shoot it");

//     if (player.countCockSocks("gilded") > 0 && Flags.list[FlagEnum.GILDED_JERKED] < player.countCockSocks("gilded")) {

//         Flags.list[FlagEnum.GILDED_JERKED]++;

//         const gems: number = midasCockJackingGemsRoll();

//         DisplayText(".\n\nSated, you spend a few blissful minutes enjoying the warmth and tightness of the mare-like onahole until your " + CockDescriptor.describeCock(player, x) + " is soft inside it.  You scamper off of her, dropping back to your four equine feet.  <b>You are startled to see glittering gems pouring from her ");
//         if (player.cockArea(x) >= 30)
//             DisplayText("horsecunt");
//         else DisplayText("asshole");
//         DisplayText(" and you scramble to gather all " + gems + " of them up.</b> Satisfied you didn't miss any shinies, you disassemble the toy and haul it off back to your stash.");

//         player.stats.gems += gems;
//     }
//     else {
//         DisplayText(", until she's full up and leaking onto the ground.\n\n");

//         DisplayText("Sated, you spend a few blissful minutes enjoying the warmth and tightness of the mare-like onahole until your " + CockDescriptor.describeCock(player, x) + " is soft inside it.  You scamper off of her, dropping back to your four equine feet.  With a contented yawn, you disassemble the toy and haul it off back to your stash, leaking your cum the entire way.");
//     }

//     player.orgasm();
//     player.stats.sens += -2;
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//     player.addKeyValue("Fake Mare", 1, 1);
// }

// // [Masturbate] -- [CentaurPole] -- [Fem/Herm Centaurs]
// function centaurGirlsGetHorseAids(): void {
//     DisplayText().clear();
//     if (player.keyItemv1("Centaur Pole") === 0) {
//         // [If low Corruption:]
//         if (player.stats.cor < 50)
//             DisplayText("Feeling a bit antsy, you decide to give Whitney's so-called \"<i>Centaur Pole</i>\" a try.  You dig it out of your stash and spend a few awkward minutes dragging it off someplace secluded and setting it up.\n\n");
//         // [If Med-High Corruption:]
//         else DisplayText("Unable to sate your own lusts due to your centaur configuration, you decide to put one of Whitney's centaur toys to use.  You dig the Centaur Pole out of your stash and drag it to the middle of camp.\n\n");
//     }
//     DisplayText("When you've got it ready, the \"<i>Pole</i>\" is actually quite impressive.  It's a large metallic statue of what seems to be a particularly well-endowed imp, equipped with a huge, flared horsecock displayed proudly between his muscular legs.  You give the tremendous purple cock a few experimental strokes, and to your delight it inflates just like a real boner, becoming rock-hard in your grasp.  You lick your lips and, unable to resist, take the cock into your mouth.\n\n");

//     DisplayText("Though it tastes rubbery, the heft and size of the prick feels... right... inside you.  You spend a few blissful minutes sucking off the horse dildo, getting it nice and wet and ready for you.  When you're satisfied the imp-statue's wang is sufficiently lubed up, you let it pop out of your mouth and, making sure it's still standing straight out of the statue, you turn around.\n\n");

//     DisplayText("Your " + LowerBodyDescriptor.describeHips(player) + " wiggle in anticipation as you work to get your ready " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " lined up with the horse dildo.  Unable to see the toy past your equine rump, it's a long, desperate minute until finally you feel its flared head against your horsecunt.  You shimmy back, gasping in delight as the meaty horsecock pushes into you.  It seems to inflate and expand inside you as you take it, until you're completely and utterly full of purple rubber -- and then some.  You grunt as the cock continues to grow, stretching your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " until you let out a pained whimper.");
//     player.cuntChange(player.vaginalCapacity() - 3, true, true, false);
//     DisplayText("\n\n");

//     DisplayText("Just then, though, the cock seems to stop.  You grunt and groan as it settles inside you, finally letting out a relieved sigh when it's only giving you a modest, pleasant stretching.  Now that you're stuffed full of fake horsecock, though, you're not sure what to do... \"<i>EEP!</i>\" you yelp as the imp-statue's hands suddenly reach out and grasp your " + LowerBodyDescriptor.describeHips(player) + ".  Your eyes go wide as you feel the thick dildo withdraw from your cunt, the imp's hips pulling back.\n\n");

//     DisplayText("You have time only to let out a desperate curse before the toy rams itself back into you.  You try to leap forward from the massive, yet mind-numbingly pleasurable, impact, but its strong hands hold you fast.  You yelp and scream as the statue begins to fuck you roughly, making forceful thrusts deep into your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " until the dildo is battering your cervix.  Something inside the cock begins to contract and expand, altering the thickness and heft of the rod inside you, stretching the walls of your cunt even further until your tongue hangs out and your eyes roll back, overwhelmed with pleasure.\n\n");

//     DisplayText("You sense your own orgasm coming as a hot, sticky fluid rushes into you.  You scream your pleasure as the statue unloads a load of hot faux-spunk into your womb, flooding your cunt with its strange seed.  So utterly and completely filled, you cannot hold back your orgasm.  You cum, your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " clamping down hard on the fake cock buried inside you, milking it for more and more of its thick, creamy spooge.\n\n");

//     DisplayText("When your climax finally passes, you've collapsed on all fours, swaying light-headed as the statue continues to leak a steady trickle of spooge onto your " + ButtDescriptor.describeButt(player) + ".  You stagger to your legs and begin to disassemble the pole.  You drag it back to your stash, your hips making a lewd squishing noise with every step as globs of fake cum leak out of your horsecunt.");
//     player.orgasm();
//     player.stats.sens += -2;
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
//     player.addKeyValue("Centaur Pole", 1, 1);
//     trace("Times Ridden Pole" + player.keyItemv1("Centaur Pole"));
// }

// // Self/Exgartuan
// // Bee Eggs in Huge Cock: Finished (Slywyn) (edited)
// function getHugeEggsInCawk(): void {
//     DisplayText().clear();
//     // Bee Eggs in Huge Cock + Exgartuan: Finished (Slywyn)(edited)
//     if (player.statusAffects.get(StatusAffectType.Exgartuan).value1 === 1 && player.statusAffects.get(StatusAffectType.Exgartuan).value2 === 0 && Flags.list[FlagEnum.TIMES_EGGED_IN_COCK] === 0) {
//         // requires Exgartuan awake
//         DisplayText("You decide it's time for a little fun.");
//         DisplayText("\n\nRemoving your [armor], you settle down ");
//         if (player.stats.cor < 33) {
//             DisplayText("in your bedroll");
//             if (camp.hasCompanions()) DisplayText(", hoping one of your companions sees");
//         }
//         else if (player.stats.cor < 66)
//             DisplayText("behind a rock to hide your sight if not sound");
//         else DisplayText("in the wastes just outside of camp to be out of sight and mind");
//         DisplayText(" while you take care of your endowments.");

//         DisplayText("\n\nReaching up as you lay on your back, you take hold of your [cock biggest], beginning to stroke the length of it with both hands, marveling at the size.  You can feel Exgartuan stirring within, ready and eager for some action at last.  At the same time, you can feel the eggs shifting within your bee half, awakening your lust even further, and an amusing idea springs forth in your mind.  You flex muscles you can still barely control, and though it is difficult, you manage to curl your abdomen up, stinger pointing toward your own cock.  It is at this point that Exgartuan seems to realize that something's going on.");

//         DisplayText("\n\n\"<i>Uh?  Champion... get that thing away from me.</i>\"");

//         DisplayText("\n\nYou grin, flexing your muscles, and the slit next to your stinger opens; your ovipositor slides out freely, the flaccid tube hardening as your lust rises even further thanks to the visions of debauchery flowing through your mind.  You take your [cockHead 1] in hand and bend it toward your ovipositor, intending to bring the two together and see if it's really possible for you to lay your eggs down your own massive length.");

//         DisplayText("\n\nThe demon within you, realizing just what's going on and wanting no part in it, begins to fight back.  Thus begins a struggle for your own body, as he attempts to both tug your [cock 1] away from your bee-half, and stimulate your length with his own magic and your hand so that you orgasm and feel no need to continue anyway.  You");
//         if (Game.shouldraFollower.followerShouldra()) DisplayText(", with Shouldra's assistance,");
//         DisplayText(" manage to fight him, keeping your cock in place.  With his attention distracted, you're able to lower your ovipositor directly to the tip of your cock, and with a flex and a shove, you manage to force it in.");

//         DisplayText("\n\nYou feel your slit stretching with a feeling unlike anything you've ever experienced, being both the penetrated and the penetrating at the same time.  A lewd moan rolls from your lungs, and your back arches from the sheer pleasure of the sensation; unbidden, an egg attempts to push down into your cock, spreading the slit further.");

//         DisplayText("\n\n\"<i>This isn't happening!</i>\"");

//         DisplayText("\n\nAgainst your will, you can feel the demon within your [cock biggest] beginning to push... something up through your urethra, as if to block the passage of the egg.  Creamy white leaks from your tip as the pressure builds within you, and you realize that he's using your own cum against you!  You haven't orgasmed, but the crafty demon seems to have more control over your body than you realized.  Fighting back, you thrust your ovipositor deeper, and with a mighty shove you actually force the next few inches within, egg and all.");

//         DisplayText("\n\nThe sensation nearly causes you to black out, your girth stretching more than you can ever remember to accept this invader within you, and you curl up even further atop yourself, the anticipation goading you on.  You shove more of your egg-laying tube down your length, and now stimulating honey begins to seep from the hole of your bloated and bulging cock along with the remnants of the cum that Exgartuan was trying to use against you.  Perhaps now resigned to his 'fate', the demon seems to have gone silent - though knowing him he's merely planning something else.");

//         DisplayText("\n\nMore eggs begin to rise up from your abdomen, one after the other beginning to shove its way down your poor stretched length.  The first is nearly halfway down your " + num2Text(player.torso.cocks.list[player.biggestCockIndex()].cockLength) + " inches, and you feel another entering your slit.  Then you feel something else deep within, something that drops your jaw.  Your cock begins to lurch, as if beginning to orgasm, and you realize what Exartuan is doing. He's trying to make you climax to force the eggs out!");

//         DisplayText("\n\nYou struggle, ");
//         if (Game.shouldraFollower.followerShouldra()) DisplayText("ghost-assisted ");
//         DisplayText("will versus demon-induced orgasm, eggs versus cum, and you actually appear to be losing.  The base of your cock bulges out as you moan, rapidly filling and bloating with gathering seed, and you can feel orgasmic pressure rising as the demon turns the tide, so to speak.  Your eyes roll back up into your head, lids beginning to close, when you see your salvation.  Your stinger!  It hangs just above the tip of your cock, and though you dread what you're about to do, you hope that it will be able to give you the edge over your demon companion.  You steel yourself for what must be done.");

//         DisplayText("\n\nFlexing and clenching up as you anticipate what's to come, you drive your stinger toward your own [cockHead].  You nearly cry out from the pain as your venomous needle stabs into your length, piercing it, but your bee parts autonomously drive their lust-and-pleasure-inducing venom directly into your cock.  The combined pleasure and pain draw a fog over your eyes, but within moments the pleasure begins to mask everything else, and you find yourself a panting heap, tongue hanging from your [face] as you pour all the venom you can manage directly into your poor abused cock.");

//         DisplayText("\n\nThis sends your ovipositor into overdrive, and one after the other eggs are forced down your bulging length, pushing your cum further back down within you, and clinching your victory against the demon.  Barely coherent, you can feel egg after egg sliding down your length, and you watch as egg-shaped bulges slowly sink down your urethra, heading toward your ");
//         if (player.torso.balls.quantity > 0)
//             DisplayText("[balls]");
//         else DisplayText("[hips]");
//         DisplayText(".");

//         // [If balls:]
//         if (player.torso.balls.quantity > 0) {
//             DisplayText("\n\nThe eggs push toward your testicles; you begin to anticipate once again just what's going to happen when they reach those overfull orbs resting against the ground.  You feel one egg pushing against some kind of entrance and squint your eyes as pressure builds within your cock; the eggs are beginning to back up against one another.  You strain and push, and finally feel something give way.  The sensations are an exquisite mix of pleasure and sickness as one egg after another forces its way into your heavy sack");
//             if (player.fertilizedEggs() > 0) DisplayText(", and you know beyond a doubt that they'll be fertilized before much longer and you'll be able to lay your own eggs");
//             DisplayText(".");
//         }
//         // [If no balls:]
//         else {
//             DisplayText("\n\nAs the eggs push within you, you can feel pressure building somewhere within your abdomen as they meet some sort of blockage.  It feels incredibly strange, yet deliciously delightful at the same time, and you flex and strain to force them past whatever's keeping them in place.  You feel the blockage give way, and glorious, warm, sticky bliss fills you as egg after egg rubs past your prostate and drops down into whatever space inside you that they can find.");
//         }
//         if (player.torso.balls.quantity > 0)
//             DisplayText("\n\nYour sack begins to bulge with its knobbly load");
//         else DisplayText("\n\nYour belly begins to bulge with an obvious, though strange, pregnancy");
//         DisplayText(", egg after egg forcing its way into you until you have nothing left to give from your ovipositor, and it begins to withdraw from your length.  You finally pull it free with a loud 'schlick' sound, and go limp against the ground as you recover from your ordeals.");

//         DisplayText("\n\nAs you begin to drop off into a brief nap, you can hear Exartuan's voice in your head.  \"<i>That wasn't as bad as I thought...</i>\"");

//         DisplayText("\n\nYou manage to laugh once or twice before your fatigue overtakes you and you drift off into sleep.");
//     }
//     else {
//         DisplayText("Feeling a little bit randy, you slip ");
//         if (player.stats.cor < 33)
//             DisplayText("into your bedroll");
//         else if (player.stats.cor < 66)
//             DisplayText("off behind a rock");
//         else DisplayText("into the trees outside of camp");
//         DisplayText(" and  strip yourself out of your [armor].  You can feel  your abdomen swaying heavily behind you, reminding you that it's been some time since you laid any eggs.  This presents you with a problem. You'll continue to feel full of eggs until you get rid of them, but you want to masturbate right now; there are no able receptors anywhere nearby.");

//         DisplayText("\n\nYou get yourself comfortable and begin to stroke your cock, eyes closing as you lose yourself to the pleasure.  Your length hardens further, feeling full in your hand, and an errant thought sparks through your mind.  What if you were the receptacle?  Your eyes open, and you look down at yourself.  Unbidden, your ovipositor has already extended from your bee-half, and is dripping golden-colored, sweet-smelling honey on the ground.  You begin examining yourself, pondering just where it might be possible to lay eggs within your own body to relieve your burden.");

//         // [If herm:]
//         if (player.gender === 3) {
//             DisplayText("\n\nYou examine your cock");
//             if (player.torso.cocks.count > 1) DisplayText("s");
//             DisplayText(" as well as your pussy, and decide to try the latter first.  You flex your still-unfamiliar muscles and curl your abdomen back across yourself, straining to pull it into place, but it just isn't flexible enough to curl that far. Even using your arms, ");
//             if (player.stats.str > 50) DisplayText("even with your considerable strength, ");
//             DisplayText("you cannot manage to bend it far enough to get there.  You actually start to feel a pain where your abdomen connects to the rest of your body, and you disregard this as a bad idea.");
//         }
//         // [If male:]
//         else DisplayText("\n\nYou look down at yourself, and suppose that you could try the one hole that you do have. You begin to flex your abdomen to curl it in upon your anus, but you quickly realize that without removing your abdomen from your body, a prospect you don't really want to entertain, that this will be impossible.");

//         DisplayText("\n\nLeft with only the possibility of your cock, you look down at it curiously.  If you weren't as big as you are now, you'd dismiss this entirely out of hand.  However... you take your [cock biggest] into hand, and give it a few strokes to get it back to throbbing hardness.  Your abdomen is curled up over yourself, and one hand rests thoughtfully on your chin as you ponder the possibilities.  You suppose it couldn't hurt, and you are committed by now to at least trying to lay eggs within yourself.");

//         DisplayText("\n\nYou curl your ovipositor inward just a bit farther, and you find that - yes, you actually can reach.  Overtaken with curiosity as well as lust, you extend the tubular organ toward yourself, and using your hands, help your cock and the honey-dripping thing to meet.  You're stymied with a momentary impasse as you realize that the ovipositor alone doesn't quite fit, much less the eggs you feel cramping your abdomen.  But desperation makes you think - looking at the hole, it's almost large enough.");

//         DisplayText("\n\nDeciding to go for broke, you try it.  A push, a shove, a little straining, and... you groan out loud as your ovipositor neatly stretches your slit wide and slides on in, your own pre-cum and leaking honey doing wonders to lubricate the opening.  You rest for a moment to bask in the sensations of penetrating yourself with your own body, an act that you wouldn't have even been able to consider, much less perpetrate, before coming to this land.");
//         DisplayText("\n\nYou rest for a moment to simply bask in the pleasure, but the insistent throbbing as well as the weight of eggs you're currently holding aloft in your abdomen quickly bring you back down to earth... in a manner of speaking.  You waste little time in beginning to thrust, made awkward by your positioning, but in no time flat you manage to create a rhythm that you're able to maintain without hurting several parts of your body.");

//         DisplayText("\n\nPre flows freely up your cock; when it manages to burble up around your ovipositor, you can feel your lust growing as your warm fluid coats the black organ and the arousal-inducing honey from your bee-half begins to seep into the vacuum left and take hold.  You speed up your thrusts as much as you can, beginning to pant and moan in equal measure from the debaucherous machinations of your ");
//         if (player.stats.cor >= 75)
//             DisplayText("corrupted ");
//         else DisplayText("transformed ");
//         DisplayText("body.  You thrust deeper, feeling an egg beginning to slide through your ovipositor, and by now you're aching to feel it push itself down your cock.");

//         DisplayText("\n\nAs you thrust, you begin to feel something prick against your [cockHead], but you quickly dismiss it in favor of continuing to drive yourself further toward what you know is going to be one of the strangest, and best, orgasms you've ever felt.  This is a dubious move as within a moment, you feel something stab into your cockhead and your world nearly goes white with pain.");

//         DisplayText("\n\nYour stinger!  You've forgotten all about it in your lust-addled state of mind, and now you've managed to sting yourself, directly in your cock.  Venom is already flowing into your prick, and you do nothing to stop it once you realize just how good things are going to feel in a moment. Sure enough, within a few seconds a haze of lust seems to settle down around you as your stinger withdraws, and you can feel several more eggs pushing their way toward your cock, the first nearly at your stretched cockhead.");

//         DisplayText("\n\nAll it takes is a little more pushing, and you relax to enjoy what's coming.  An egg butts up against your tight slit, and for a moment you worry that it isn't going to fit.  Then, you feel yourself stretching further, drawing a long moan from between your lips as the orb forces through the opening and slides in.  Several more follow, nearly backed up within you at this point, and you lose yourself to the contractions as egg after egg is forced down your bulging cock, to the point that you can actually see them travelling down your distended urethra, sojourning toward your ");
//         if (player.torso.balls.quantity > 0)
//             DisplayText("[balls]");
//         else DisplayText("[hips]");
//         DisplayText(".");

//         // [If balls and unfertilized eggs:]
//         if (player.torso.balls.quantity > 0) {
//             DisplayText("\n\nYou begin to anticipate the ending of their journey, wanting to see your sack fill with your own eggs, knowing that they'll be immediately fertilized by your own cum.  You idly wonder if this would be considered masturbation, incest, or cloning, but those thoughts are lost as the first egg reaches the base of your cock and the end of its journey.  It disappears within you, and for a moment you wonder if it's gone the wrong way.  However, immediately after you feel it pressing against some sort of resistance within you that tightens your stomach, and you're forced to strain muscles to attempt to help it along.");
//             DisplayText("\n\nSucceeding, you manage to force the egg deeper into your body, where after stroking your prostate, it deposits itself neatly into your sack.  ");
//             if (!player.torso.hips.legs.isTaur()) DisplayText("More begin to follow, and you massage your quickly-bloating balls as they fill with egg after egg after egg.  ");
//             DisplayText("Your gut protests slightly, but with the tranquilizing effects of the honey and venom, the discomfort is nearly nonexistent.");
//             // [endballs]
//         }
//         // [If no balls and unfertilized:]
//         else {
//             DisplayText("\n\nYou begin to anticipate the ending of their journey, wondering just where your eggs are going to end up; you can only imagine it'll be the same place your cum comes from, which means they'll be instantly fertilized by you.  Pondering briefly if this is some odd form of cloning, those thoughts are driven from your mind as the first egg pushes its way through the base of your cock and deeper into your body.  A groan escapes as you feel it push up against some kind of blockage within you, and you strain to force it deeper inside.");

//             DisplayText("\n\nYour efforts pay off as the egg slips past the resistance and settles somewhere within you, triggering a small involuntary orgasm as it pushes by your prostate, and several more orbs quickly follow suit, fording the flow of semen that tries to push them the other way.");
//         }
//         DisplayText("\n\nYou bask in the sensations of filling yourself with eggs and narcotic honey for several more minutes as the pleasurable contractions continue, but as always seems to happen, the good times end as you run out of spheres to push within.  Withdrawing your ovipositor, you lie limp upon the ground, relaxing as you bask in the sensations of a job well done.  A quick nap claims you");
//         if (!player.torso.hips.legs.isTaur()) {
//             DisplayText(" as you idly fondle your ");
//             if (player.torso.balls.quantity === 0)
//                 DisplayText("swollen belly");
//             else DisplayText("bulging sack");
//         }
//         DisplayText(", and you dream of laying your own eggs some time in the future.");
//     }
//     if (player.fertilizedEggs() > 0 && Flags.list[FlagEnum.DICK_EGG_INCUBATION] === 0) {
//         Flags.list[FlagEnum.DICK_EGG_INCUBATION] = 48;
//     }
//     player.dumpEggs();
//     player.orgasm();
//     Flags.list[FlagEnum.TIMES_EGGED_IN_COCK]++;
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// 	// Birth Bee Eggs Out Your Wang: Finished (Slywyn)(edited)
// 	public birthBeeEggsOutYourWang(): void {
//     DisplayText("\nYou feel more lusty and aroused than usual.  As you notice the feeling, it gets worse and worse; though you try to continue on with whatever it is that you're doing, by now you're far too distracted to continue.  All you can do is plop right down on the ground and prepare to masturbate, as it seems to be the only thing your body's going to allow you to do at this point.");

// 		DisplayText("\n\nQuickly shedding your [armor] and plopping down on your [ass], you make sure not to smash your abdomen in the process.  Your ");
// 		if(player.torso.balls.quantity > 0 )
// DisplayText("balls feel");
// 		else DisplayText("stomach feels");
// DisplayText(" heavy, and ");
// if (player.torso.hips.legs.isTaur())
//     DisplayText("y");
// else {
//     DisplayText("you caress ");
//     if (player.torso.balls.quantity > 0)
//         DisplayText("them");
//     else DisplayText("it");
//     DisplayText(" with the hand not already actively stroking your [cock biggest].  Y");
// }
// DisplayText("ou feel something within you shifting; it's time to lay your eggs!");

// DisplayText("\n\nYou lie back on the ground and groan as your [cock biggest] quickly grows to full hardness in your hand, feeling your ");
// if (player.torso.balls.quantity === 0)
//     DisplayText("stomach");
// else DisplayText("balls");
// DisplayText(" shift as your eggs begin to attempt their journey outward.  Your strokes speed up; your lust only rises while the eggs move, and before much longer you're arching your back and thrusting your hips, practically fucking your hand, losing yourself to the pleasure of the act.");

// DisplayText("\n\nYou begin to feel something pushing at the base of your cock, and all pre-flow from within you ceases as the first egg plugs up your length.  Redoubling your stroking to attempt to force the damn thing out fails... it seems stuck fast!  You begin to regret your decision to start this without some kind of prior stretching, but it's not like you had much of a choice in the matter in the first place.");

// DisplayText("\n\nNow panting with the effort of keeping up the furious pace you've been setting, you're struggling just to continue.  You rub as fast as you can, hoping that the pressure you can feel building within yourself will be enough to force the eggs out before you get too tired to continue, but to make matters worse you can feel yet more eggs descending within you. As the blockage slowly exacerbates, eggs pile up at the base of your cock; you can see the first one, the stuck one, slowly forced up your length by the pressure.");

// DisplayText("\n\nIt starts as a single bulge at the base of your cock, but it quickly begins to bloat further as all the pre, cum, and other eggs trapped inside you only add to the pileup.  This quickly makes the base of your cock look like the world's most perverted traffic jam.  You keep pulling, hoping that the pressure will continue to aid you, and you can feel an actual orgasm beginning to pile up on you as well, driving you to distraction and making your strokes more frantic and erratic.");

// DisplayText("\n\nAll these things seem to be ganging up on you, the building climax, the cum, the eggs, and the pre all stuck within your quickly bloating member.  Eventually it just all proves to be far too much,  and you cum, the pleasure driving you crazy.");

// DisplayText("\n\nThe base of your cock gets even worse for a moment, bloating out in a way that you're sure shouldn't be possible, and you can actually see multiple eggs stuck within your urethra, each one trying to barge past the others as the pressure quickly reaches the breaking point.");

// DisplayText("\n\nYou spasm, hard, and curl in on yourself as everything seems to come crashing down around you. Your cock flops over, leaning against your head, the heft of it far too much to keep aloft with the added weight of everything stuck within.  The pressure mounts until it's painful, and then suddenly it's released.");

// DisplayText("\n\nAn explosion of pleasure threatens to knock you out on the spot, as your body quickly pushes everything up and out of your sensitive slit with a force that you simply couldn't have managed on your own.  Eggs, cum, and honey all come spurting out of your length like bats out of hell, splattering and bumping across the ground.  You're thankful that insectile eggs seem to be rather pliant and resilient, as you're almost certain that any other kind might have broken with the force of your ejaculation.");

// DisplayText("\n\nYou lose count of how many eggs pass through your stretched and abused urethra, as well as how many times you cum from the amazing feeling of them leaving your body.  As the last few eggs slowly travel up your length, you pass out, your orgasmic contractions continuing long after they normally would have stopped.");

// DisplayText("\n\nA few minutes later you awaken, covered in cum, honey, and whatever might have been left of your pre, and feeling much lighter than you did before.  You look 'up' at the ground in front of you; a loose pile of bee eggs rests on the ground, covered in cum and even more honey.");

// DisplayText("\n\nYou smile a bit at your self-created children, and you can already hear a quiet buzzing starting from the eggs.  It seems you managed to fertilize them after all, and they must have attached within you somewhere so that they wouldn't come out until they'd completely gestated.");

// DisplayText("\n\nTurning over, you watch the little things hatch, and you don't have to wait long. The buzzing grows louder, and the first of the eggs burst open, revealing a very small, very wet, and very fuzzy, little bee.  You smile as your child takes its first tentative flight, and are ");
// if (player.stats.cor < 50)
//     DisplayText("amused");
// else DisplayText("somewhat annoyed");
// DisplayText(" as it manages to land directly on your nose.  When you helpfully pluck it off and place it on the ground, it looks up at you with a wave and a smile.");

// DisplayText("\n\nBy this time the others are beginning to hatch, and one by one they find their wings and take to the air, often waving or buzzing around you for a moment before they head off toward the forest to do bee things.");

// DisplayText("\n\nFeeling lighter and a bit happier than you have in a while, you pick yourself up and redress, quickly heading back to camp.\n");
// Flags.list[FlagEnum.DICK_EGG_INCUBATION] = 0;
// player.orgasm();
// 	}

// // I Regret Nothing/Exgartuan:
// // Don't know the formatting well, so going to make some mistakes I suppose.
// // Scene Requires Fuckable Nipples, I'm going to aim at breasts around HH Cup or higher, since Exgartuan will push you over that from the bare minimum breast size - I'm thinking that breast pregnancy chance without Exgartuan will be nil/low and with Exgartuan will be extant/reasonable
// function layEggsInYerTits(): void {
//     DisplayText().clear();
//     if (player.statusAffects.get(StatusAffectType.Exgartuan).value1 === 2 && player.statusAffects.get(StatusAffectType.Exgartuan).value2 === 0) {
//         // Exgartuan; breasts should be HH or larger, fuckable nipples, only if Exgartuan is awake
//         DisplayText("Smiling mischieviously to yourself, you look down to your possessed [chest] and tell Exgartuan that you have something you very much would like to do for her.");
//         DisplayText("\n\n\"<i>Oi bitch, I know what you're on about.  You think you can just lay eggs inside me?  Well... I'm proud of you, that's the sort of attention these magnificent cans deserve.</i>\"");
//         DisplayText("\n\nYour mischievous grin turns confused as you get the distinct impression that if Exgartuan had knuckles to crack and joints to pop, she would be.  Certainly, the uncanny jiggling of your [chest] implies some sort of activity.");
//         DisplayText("\n\n\"<i>Alright.  You sure you want to do this?  Nah, I'm just fucking with you, you have to now.</i>\"");
//         DisplayText("\n\nExgartuan's enthusiasm is boundless, and her arousal magnetic.  You find your hands groping your bosom without your control, and Exgartuan clearly revels in it.  In short order, Exgartuan's primed you enough that the ovipositor has exited its sheath, and now hangs beneath you.  Recognizing that the following procedure would be problematic at best, Exgartuan hurls her entire weight to the side, and you topple over instantly.  You begin to wonder how Exgartuan took control of your taking advantage of her, but suddenly find yourself in control of your arms.");
//         DisplayText("\n\nYou know what to do, so you prop yourself up on an elbow without ceasing to caress and please your possessed knockers; teasing the [nipple] causes Exgartuan to tremble slightly.  Your other hand roams down between your [legs] as you snap your abdomen as close into you as you can.  You take hold of the ovipositor and begin to pull it up to meet your [chest][if (cocks > 0) , past your ][if (cocks > 2) forest of ][if (cocks > 0) cock][if (cocks > 1) s].");
//         DisplayText("\n\nSuddenly, Exgartuan pipes up out of the [nipple] that isn't being squeezed, \"<i>Hold it champ, that one tube isn't going to be enough.</i>\"");
//         DisplayText("\n\nYour hand draws your ovipositor between your [chest] unbidden. Exgartuan begins a weird chant that, while not actually audible, you can feel in your [chest], causing them to quake[if (isLactating = true)  and milk to spurt forth].  Then the pain starts.");
//         DisplayText("\n\nYou next notice things when you feel your hands free again, and you pull the ovipositor out from its hiding place.  You mentally correct yourself, ovipositors.  Well, more precisely, near the base of your egg tube it's split into two columns from one trunk.  Exgartuan's purpose is made exceedingly clear, and you place one tip to each [nipple].");
//         DisplayText("\n\n\"<i>Alright bitch, I've cleared out space for these bad boys, and now you're gonna make me a momma.  Treat me right, I may even let you keep the double tube one of these days.</i>\"");
//         DisplayText("\n\nMight Exgartuan actually relish the idea of being pregnant?  You're not entirely sure how the demon works, beyond that she resides immovably in your [chest].  Exgartuan begins holding your... her - whatever - [nipples] open, and you plunge your ovipositor's tips in, pulling your knees up tight toward your chest to push your ovipositor into your [fullChest]... her.");
//         DisplayText("\n\nNot only does it feel amazing to push your ovipositor into yourself for so many reasons, but Exgartuan is practically blissed out.  Quickly, on the heels of the lube[if (isLactating = true)  that is forcing milk out around the edges of your tubes], your eggs begin down your ovipositor.  Exgartuan's concentration snaps back, you guess, on the basis that your [chest] becomes slightly more pert and gravity-defying.");
//         DisplayText("\n\nThe first egg goes down one tube, and the one that follows goes down the other.  You initially marvel at this, but then you realize Exgatuan is forcing this symmetry herself.  Later, you'll speculate to yourself that if Exgartuan put the sort of effort into other aspects of life that she's putting into this, the both of you would be a lot further ahead than you are, but that time is not now.  Now is the moment when the first egg reaches your [nipple].");
//         DisplayText("\n\nYou exert for a moment, and it begins to make headway into the [nipple], the feeling of the stretch causing you to moan in pleasure as your [chest] quakes in its own particular pleasure.  You delay its entry for a moment to match it with the egg that has begun pressing insistently into the other side of your [chest], before letting them both in simultaneously.");
//         DisplayText("\n\nYou are rewarded with a keening, intense orgasm shared between yourself and Exgartuan, that falls off into waves as the eggs continue to inexorably push into your [chest].  You can see the shapes of the eggs begin to deform the pillowy expanse of your chest, and if it weren't that Exgartuan knows what's going on in your breasts better than you, you'd worry.");
//         DisplayText("\n\nAs it is, Exgartuan is stifling all movement and protest you might be able to muster to be beholden to her moment.  You realize that you feel little to nothing outside of the euphoric release of depositing your eggs and the dual-persona'd orgasm going on in your [chest].");
//         // [if (cocks > 1)
//         if (player.torso.cocks.count > 1)
//             DisplayText("  Your cocks, while still erect, are doing little more than dribbling cum over your breasts and tubes, devoid of the force and power they usually have.");
//         // [if (cocks = 1)]
//         else if (player.torso.cocks.count === 1)
//             DisplayText("  Your [cock], while still erect, does little more than dribble cum over your breasts and tubes, devoid of the force and power that usually comes with orgasm.");
//         // [if (hasVagina = true)]
//         if (player.torso.vaginas.count > 0) DisplayText("  Your [vagina] lets sticky fluids out slowly around your thighs; you are only able to tell by the damp feel of your [legs].  It feels fantastic!");
//         DisplayText("\n\nAll too soon, the eggs come to a stop, with your breasts feeling as if they've gained numerous cup sizes, at least in weight, from the orbs of your children.  You remove the ovipositors from your [nipples] with a gentle awe, both to the euphoria and to Exgartuan.");
//         DisplayText("\n\nSeeming much more subdued, and slightly muffled, Exgartuan says \"<i>That was an interesting experience, even by my standards.  I'm not going to make the double ovipositor thing work for you whenever, so I'll just be taking that back.</i>\"");
//         DisplayText("\n\nYour hands automatically pull your ovipositors between your mammaries, and the experience of it fusing back into itself is far less painful than the split.  You relax as your ovipositor withdraws back into your abdomen.");
//         DisplayText("\n\n\"<i>You know, I think you and I could really get along, you keep treating me nice like this.</i>\" The thought crosses your mind that \"like this\" is essentially worshipful submission to her whim.  \"<i>Now go to sleep, I need some time to adjust.</i>\"");
//         DisplayText("\n\nYou agree with that suggestion, too exhausted from the ordeal to do much else anyway. You pass out in a puddle of your own fluids, to wake up most of an hour later.");
//     }
//     else {
//         DisplayText("Having decided to give in to your baser urges, you see no reason not to solve all your problems and lay the orbs that have been burdening you at the same time.  You look around a moment before beginning, [if (corruption < 50) concerned that you may be observed.][if (corruption > 50) hopeful for a target on which to unburden yourself instead.]");

//         DisplayText("\n\nCertain that you will not be interrupted, you quickly remove your [armor] and lie on your side against a comfortable rock, having sorted out that being on your back will involve twisting your ovipositor uncomfortably and on all fours will risk your eggs.  Your [chest] squash softly down on the loam next to you, and you begin to tease and stretch your [nipples] in preparation for your insane plan.");

//         DisplayText("\n\nWith mounting anticipation for the main event, your twisted body quickly reacts to your ministrations. [if (cocks > 1) Your cocks begin ][if (cocks = 1) Your cock begins ][if (cocks > 0) to harden and rise toward your [chest], a veritable promised land for male organs, but that is not your concern today.]");
//         if (player.torso.vaginas.count > 0) {
//             if (player.torso.balls.quantity > 0)
//                 DisplayText("  Behind your [balls], y");
//             else DisplayText("Y");
//             DisplayText("our [vagina] begins to quietly drip and pull open slightly, and you wish for the flexibility to plant your eggs in it.");
//         }
//         DisplayText("\n\nFinally, your ovipositor begins to peek out from its hiding place, and you seize it with one hand, rapidly stroking it and encouraging it to elongate further, and then, tucking your abdomen tight against you, you pull it through your [legs] and up [if (cocks > 0) past your maleness] to your [chest].");

//         DisplayText("\n\nWith your free hand, you pull your [nipple] open wide, painfully wide, and squeeze the tip of your ovipositor into it, simultaneously stretching your ovipositor to its maximum.  With a frustrated sigh, you attempt to coax more length out of it while doubling over, inadvertently pushing the ovipositor into your [nipple].  You spasm a moment, and [if (isLactating = true) a mixture of milk and ] ");
//         if (player.canOvipositBee())
//             DisplayText("honey ");
//         else DisplayText("green fluid ");
//         DisplayText("squirts out of you under the sudden pressure from your penetration.");

//         DisplayText("\n\nOverwhelmed with a sexual glee, you begin to jackknife, driving your ovipositor from the tip to deep inside your breast.  Holding everything in place with one hand, your other begins to toy with a spare [nipple].  [if (cocks > 0)   [EachCock] hardens to the full extent, forcing you to take a moment to rearrange yourself, and leaving you jacking off [oneCock] with your spare hand instead.]");
//         if (player.torso.vaginas.count > 0) {
//             DisplayText("  Meanwhile, your [vagina] has fully parted and begun to drool ");
//             if (player.torso.vaginas.get(0).wetness >= 4) DisplayText("liberally ");
//             DisplayText("onto your [legs] and abdomen.");
//         }

//         DisplayText("\n\nYour ovipositor has already begun its task.  You can see rounded distortions making their way up the tube.  As the leader of the pack begins nearing the end of its journey, you double over tightly, driving the ovipositor as deep into your chest as you can.  Your [nipple] aches delightfully as it is spread yet further open by the bulging intrusion, and just as the egg pops from the tip of the ovipositor, a low, gentle orgasm spreads through you, radiating out from your [chest].");

//         // Stage 1 - low/no chance of pregnancy
//         if (player.eggs() < 20) {
//             DisplayText("\n\nWith a contented glow, you let your eggs go in, each time crashing into your consciousness like waves slowly eating away your mind, until you start to feel some discomfort in your breast. You let one more egg pass, and then you pull your ovipositor out, causing a small explosion of[if (isLactating = true)  milk and]");
//             if (player.canOvipositBee())
//                 DisplayText("honey");
//             else DisplayText("goo");
//             DisplayText(".  Quickly, you thrust it into your other breast and let the egging continue.  Suddenly conscious of your situation, you hold your previous [nipple] closed.");
//             if (player.torso.cocks.count > 0) DisplayText("  Your [chest] and ovipositor meanwhile are slowly being coated in white from your languid pleasure.");
//             DisplayText("\n\nEventually, no more eggs come down the tube, and with a contented sigh, you release your ovipositor and, clutching your [chest] tightly to prevent the eggs' escape, pass out for the remainder of the hour.");
//         }
//         // Stage 2 no/moderate chance of pregnancy
//         else if (player.eggs() < 40) {
//             DisplayText("\n\nYour [chest] begins to tingle and your heart begins to race as the eggs continue to bring orgasmic waves with each transfer. Your breast rapidly begins to feel full, and your abdomen has only just begun to deflate. With a mixture of concern and desperation for every last egg, you hold the ovipositor until no more eggs could possibly fit. Your egg-laden tit has ballooned considerably in size, and you have to squeeze your [nipple] shut to keep the eggs in after you remove your ovipositor.[if (isLactating = true)   Under the sheer pressure, milk constantly streams out of your [nipple].]");
//             DisplayText("\n\nDraping your arm tight over the newly egged tit, you use that hand to hold open your other [nipple] so that you can insert your egg tube.  You begin to giggle under the assault of the constant euphoria[if (cocks > 0) , and your tits and ovipositor have long since had their natural color obscured by your constant streams of cum, which has begun to pool underneath you].  Soon, even the second breast begins to feel uncomfortably full, and not for the first time you start to worry about the wisdom of this course of action.");
//             DisplayText("\n\nAt long last, your egg sac has nothing more to feed into your [chest]. You pop out the shriveling organ and try to watch it shrivel back up, but your newly plumped [chest][if (cocks > 0)  and your diminishing erection][if (cocks > 1) s] make it impossible to see.  You spend several long moments caressing your swollen [chest], now dimpled slightly by the orbs inside them, and those long moments stretch into eternity as you pass out.");
//         }
//         // Stage Three no/high chance
//         else {
//             DisplayText("\n\nYour [chest] begins to tingle and your heart begins to race as the eggs continue to bring orgasmic waves with each transfer. Your breast rapidly begins to feel full, and your abdomen hasn't even begun to deflate.  With a mixture of concern and desperation for every last egg, you hold the ovipositor until no more eggs could possibly fit. Your egg-laden tit has ballooned considerably in size, and you have to squeeze your [nipple] shut to keep the eggs in after you remove your ovipositor.[if (isLactating = true)   Under the sheer pressure, milk constantly streams out of your [nipple].]");
//             DisplayText("\n\nDraping your arm tight over the newly egged tit, you use that hand to hold open your other [nipple] so that you can insert your egg tube. You begin to giggle under the assault of the constant euphoria[if (cocks > 0) , and your tits and ovipositor have long since had their natural color obscured by your constant streams of cum, which has begun to pool underneath you]. Soon, even the second breast is absolutely egg-stuffed, and not for the first time you start to worry about the wisdom of this course of action.");
//             // [if (breastRows > 1)
//             if (player.torso.chest.count > 1)
//                 DisplayText("\n\nQuickly you switch to another [nipple] and then another, until at long last, your egg sac has nothing more to feed into your [chest].  You pop out the shriveling organ and try to watch it shrivel back up, but your newly plumped [chest] make it impossible to see.  You spend several long moments caressing your swollen [chest], now dimpled slightly by the orbs inside them, and those long moments stretch into eternity as you pass out.");
//             else DisplayText("\n\nYou realize that there is no way to finish laying your eggs, and release a moan that is half orgasm and half frustration. The glorious sensation of egg-laying is cut off as there's nowhere to lay your eggs.  Then you realize what you must do.");
//             if (player.torso.chest.count < 2) {
//                 DisplayText("\n\nHaving popped your ovipositor out, you spend a few moments contemplating the pulsating organ, which isn't even moving the eggs without the surety of a nice warm hole.  You feel stuck, trapped on the edge of orgasm with an egg half down the tube.  Finally, your arousal and desperation overcomes your better judgment again, and you open your mouth wide for your egg tube.  Immediately, you feel the until-then backed up lubricant of your ovipositor flowing down your gullet, and your mouth and throat begin to feel strange.");
//                 DisplayText("\n\nThe eggs quickly resume their advance, now aimed down your throat. All too soon, the egg reaches your teeth, and a new problem arises.  It's too big. Tears of frustration begin to sprout, and then suddenly you feel a massive convulsion in your ovipositor, and the egg is forced past your teeth with a horrible click of your jaw, which then proceeds to hang in its newly gaping state.  You then start to panic when you realize if the egg couldn't get into your jaw then there's no way to swallow it, when you feel it slip into your throat all the same, and realize that the entire structure has been numbed and widened to accomodate your needs.");
//                 DisplayText("\n\nEven your stomach is beginning to feel uncomfortably full when the final egg enters the ovipositor to begin its journey.  Once it pops into your gullet, you feel a great sense of relief wash over you accompanied by the last orgasm.  You pass out cradling your swollen stomach and [chest].");
//             }
//         }
//     }
//     if (!player.statusAffects.has(StatusAffectType.Eggchest)) {
//         player.statusAffects.set(new StatusAffect("Eggchest", 3 + randInt(10))), 1 + randInt(4), 0, 0; )

//     }
//     player.orgasm();
//     player.stats.sens += 1;
//     player.dumpEggs();
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// // Tentacle In Gina Faps.
// // Normal intro.
// // Segue into tentacle-faps.
// // Pick biggest tentacle that can possible fit into 'gina
// function tentacleSelfFuck(): void {
//     let x: number = -1;
//     let y: number = -1;
//     temp = 0;
//     while (temp < player.torso.cocks.count) {
//         if (player.torso.cocks.get(temp).type === CockType.TENTACLE) {
//             if (x === -1) x = temp;
//         }
//         temp++;
//     }
//     // Pick a second dick that isn't the first.
//     temp = 0;
//     while (temp < player.torso.cocks.count) {
//         if (temp !== x) {
//             if (y < 0)
//                 y = temp;
//             else if (randInt(2) === 0 && player.torso.cocks.get(y).type !== CockType.TENTACLE)
//                 y = temp;
//             else if (player.torso.cocks.get(temp).type === CockType.TENTACLE)
//                 y = temp;
//         }
//         temp++;
//     }
//     DisplayText().clear();
//     if (player.stats.cor < 15) DisplayText("You sheepishly find some rocks to hide in, where you remove your clothes.\n\n");
//     else if (player.stats.cor < 30) DisplayText("You make sure you are alone and strip naked.\n\n");
//     else if (player.stats.cor < 60) DisplayText("You happily remove your " + player.inventory.equipment.armor.displayName + ", eager to pleasure yourself.\n\n");
//     else if (player.stats.cor < 80) DisplayText("You strip naked in an exaggerated fashion, hoping someone might be watching.\n\n");
//     else DisplayText("You strip naked, fondling your naughty bits as you do so and casting seductive looks around, hoping someone or something is nearby to fuck you.\n\n");

//     DisplayText("Almost immediately, your " + CockDescriptor.describeCock(player, x) + " perks up like a pet expecting to be fed, and you have to admit that you plan to give that squirming tentacle exactly what it desires - a hot, slippery slit to nestle inside of.  Already, your [vagina] has grown ");
//     if (player.torso.vaginas.get(0).wetness <= 2)
//         DisplayText("moist");
//     else if (player.torso.vaginas.get(0).wetness <= 3)
//         DisplayText("wet");
//     else if (player.torso.vaginas.get(0).wetness <= 4)
//         DisplayText("sloppy and wet");
//     else DisplayText("beyond soaked");
//     DisplayText(".  The slick slit is slowly parting as you reach to wrangle the wiggly cock");
//     if (player.torso.cocks.count > 1) {
//         DisplayText(", brushing your hand against your other ");
//         if (player.stats.lust <= 70)
//             DisplayText("half-hard");
//         else DisplayText("erect");
//         DisplayText(" penis");
//         if (player.torso.cocks.count > 2) DisplayText("es");
//         DisplayText(" on the way");
//     }
//     DisplayText(".  Moaning out loud, you try your best to handle the flood of alien sensations, but the pleasure-sparking tendril in your grip feels so different from a human penis.  It's almost like you're compelled to thrust it inside of some orifice, any orifice, so long as it's somewhere warm and tight.");
//     if (y >= 0) DisplayText("  It loops around your " + CockDescriptor.describeCock(player, y) + " while you fight with it, strangling the other phallus in tight coils of squeezing, floral friction.");

//     DisplayText("\n\nYou arch your back as you try to contain the unexpected waves of desire that flood your groin, but it's no use.  In the span of a few seconds, you decide to accept that you need to fuck something now.  Foreplay is no longer an option.");
//     if (player.torso.balls.quantity > 0)
//         DisplayText("  You lift you [balls] out of the way and");
//     else DisplayText("  You");
//     DisplayText(" twist your wrist down.  That change in direction comes far easier than trying to stroke it.  Releasing sets of alien muscles that you had held instinctively, you let your " + CockDescriptor.describeCock(player, x) + " do what it was made to do.  It slithers down sinuously, the purplish head pressing heavy and hot against your juicy mound just hard enough to encourage you to press back against it.  It slowly spreads your clinging tunnel around its obscene girth one fold at a time.");
//     // Cunt change!
//     player.cuntChange(player.cockArea(x), true, true, false);

//     DisplayText("\n\nRipples of delight radiate along your " + CockDescriptor.describeCock(player, x) + " as it buries itself as deeply into your velvet tunnel as possible.  The fat, purplish head stretches you out as it goes, just enough that the trailing stalk is comfortably ensconced in twat.  Tugging on the exposed portion, you find yourself pumping wildly on your length, squeezing it while paroxysms of ecstasy render your fine muscle control useless.  The dual sensations of being fucked and dishing out a hot dicking have overlapped into a tangled-up knot inside you.");
//     if (y >= 0) {
//         DisplayText("  Your " + CockDescriptor.describeCock(player, y) + " is getting jacked off by the engorged cock-coil's motions and slowly leaks creamy pre over the jerking length.");
//         if (player.torso.cocks.get(y).type === CockType.TENTACLE) {
//             DisplayText("  In no time flat the second tendril has gotten the idea, and it elongates to reach for your unoccupied asshole.  There's a moment of token resistance before it violates your [asshole], but then, there's only the warm heat of a torrid butt-fuck.");
//             // BUTTCHANGE IF APPROPRIATE
//             player.buttChange(player.cockArea(y), true, true, false);
//         }
//     }
//     DisplayText("\n\nDelirious with excitement, you grab hold of your [chest]");
//     if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) DisplayText(", kneading the soft mammary");
//     DisplayText(" and twisting your [nipple] as your body goes white-hot with pleasure");
//     if (player.torso.chest.hasFuckableNipples()) DisplayText(", even stuffing a finger inside a sloppy, dripping nipplecunt");
//     DisplayText(".");
//     if (player.lactationQ() >= 250) DisplayText("  Milk squirts from your engorged teat almost immediately to fall in a moist, creamy rain across your writhing form.");
//     // {no new PG}  Three + Tentalce fork - one in mouth
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 3) {
//         DisplayText("  The pleasured noises that have been issuing forth from your 'O'-gaped lips are cut off by a sudden intrusion from another of your arboreal phalluses.   This one punches straight into your throat without pause, sliding so smoothly across your tongue that you barely care about gagging when it feels so good.  Trickles of your sweet pre-cum are dribbling out from [eachCock] into your holes");
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length < player.torso.cocks.count) DisplayText(" and the open air");
//         DisplayText(".");
//         if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 4) DisplayText("  Laying right between your boobs, it doesn't take long for the shaft to extend far enough to loop around each tit, sliding slowly encircling each curvy mound as it presses them together around itself, getting a titfuck while it plows your unresisting mouth.");
//     }
//     // No bonus cawks!
//     else {
//         DisplayText("  The pleasured noises issuing forth from your 'O'-gaped lips get higher and higher pitched with each passing second, and for a split second, you find yourself wishing you had a third tentacle so you could suck it while you fuck yourself.");
//         if (y >= 0 && player.torso.cocks.get(y).type === CockType.TENTACLE && player.torso.cocks.get(y).length >= 20) {
//             DisplayText("  Luckily, you're so big down there that a juicy cock-head is right there within reach, and you bend to slurp it up without thought, busily self-sucking with reckless abandon.");
//         }
//     }
//     // MORE
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 6) {
//         DisplayText("\n\nThe excess green tools rise up above you.  They survey the view before them in a crude approximation of a sentient surveyor, seeming to take in the shifting, squiggling view of your ardent masturbation.  In truth, you're just trying to think of where to stick them.  A few droplets of liquid lust leak from their tips in sympathetic pleasure, and it gives you an idea for just what to do with them.  They stretch out towards your torso, veering to the sides at the last second.  Dripping onto your shoulders, the pulsating plant-pricks slowly push into your armpit, lubricating your " + player.skinFurScales() + " with their amorous liquid.");
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 7) DisplayText("  They pile in there, really squirming against each other as much as you, frotting against your sweat-slick flesh.  ");
//         DisplayText("  You're fucking your armpits, and it feels divine, so good that your pits are swampy pits of sex within moments.");
//     }
//     // One more:
//     else if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 4) {
//         DisplayText("\n\nThe last green tool rises up above you.  It surveys the view before it in a crude approximation of a sentient surveyor, seeming to take in the shifting, squiggling view of your ardent masturbation.  In truth, you're just trying to think of where to stick it.  A droplet of liquid lust leaks from the tip in sympathetic pleasure, and it gives you an idea for just what to do with it.  It stretches out towards your torso but veers left at the last second.  Dripping onto your shoulder, the pulsating plant-prick slowly pushes into your armpit, lubricating your " + player.skinFurScales() + " with its amorous liquid.  You're fucking your armpit and it feels divine, so good that you quickly slick your pit and twist the spare cock around yourself so that it can double-fuck both sides.");
//     }

//     // JIZZBOMB
//     DisplayText("\n\nFamiliar twinges start down in your ");
//     if (player.torso.balls.quantity > 0)
//         DisplayText("balls");
//     else DisplayText("groin");
//     DisplayText(".  Orgasm is rapidly closing in, and there's no slowing your frenzied flora at this point.  You ");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 3)
//         DisplayText("gurgle");
//     else DisplayText("moan");
//     DisplayText(" as your inner muscles begin to contract into tight knots, the pressure building to a turgid, throbbing peak.  Then, as you");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 3)
//         DisplayText("r multitude of penises");
//     DisplayText(" thrust deep inside yourself, a volcano of pleasure erupts, pumping thick flows of white goo straight into your snatch");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length === 2)
//         DisplayText(" and ass");
//     else if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length > 2)
//         DisplayText(", ass, and mouth");
//     DisplayText(".");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 3) {
//         DisplayText("  You gulp the salty flow down as best you are able");
//         if (player.cumQ() >= 500) {
//             DisplayText(".  That doesn't really count for much with how heavy your load is, ");
//             if (player.cumQ() < 1000)
//                 DisplayText("and your cheeks bulge with the size of each squirt");
//             else DisplayText("and the cum is soon squirting out the corners of your mouth while your cheeks bulge cartoonishly");
//         }
//         DisplayText(".");
//     }
//     DisplayText("  Your birth canal is quickly flooded with white spooge");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 2) DisplayText(", while your [ass]'s interior is painted bright white");
//     DisplayText(".");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length === 2) {
//         DisplayText("  Your untended " + CockDescriptor.describeCock(player, y) + " blows spunk over you ");
//         if (player.cumQ() < 50)
//             DisplayText("in small spurts");
//         else if (player.cumQ() < 200)
//             DisplayText("in thick ropes");
//         else if (player.cumQ() < 500)
//             DisplayText("in huge blobs");
//         else DisplayText("like a virile sprinkler");
//         DisplayText(".");
//         if (player.torso.cocks.count > 2) {
//             DisplayText("  The other one");
//             if (player.torso.cocks.count > 3)
//                 DisplayText("s match");
//             else DisplayText(" matches");
//             DisplayText(" it in output, even though you haven't done anything to stimulate ");
//             if (player.torso.cocks.count === 3)
//                 DisplayText("it");
//             else DisplayText("them");
//             DisplayText(".  The sensations coming from your prehensile penises are just so overwhelming that it's like a whole-body-gasm.");
//         }
//     }
//     else if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 4) {
//         DisplayText("  Meanwhile, the purple tip");
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length === 4)
//             DisplayText("s swell");
//         else DisplayText(" swells");
//         DisplayText(" in your armpit");
//         if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 5) DisplayText("s");
//         DisplayText(", engorging immensely as they press right into the soft, concave flesh within, the semen squirting out in pressured, arm-soaking jets.");
//     }

//     DisplayText("\n\nAt once, your whole body sags back, limp and drained.  The elongated tentacle");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length > 1)
//         DisplayText("s retract");
//     else DisplayText(" retracts");
//     DisplayText(" back to ");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length === 1)
//         DisplayText("its");
//     else DisplayText("their");
//     DisplayText(" normal length, popping out of your vagina");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length === 2)
//         DisplayText(" and ass");
//     else if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length > 2) DisplayText(", ass, and mouth");
//     DisplayText(", leaving your orifice");
//     if (player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length > 1) DisplayText("s");
//     DisplayText(" to dribble the spent passion on the ground.  Damn, that was satisfying.");
//     // (-2 sens + 1 per tentacle dick, -100 lust)
//     player.orgasm();
//     dynStats("sen", (-1 * (1 + player.torso.cocks.filter(Cock.FilterType(CockType.TENTACLE))).length))
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// // Upon selecting the option to masturbate you should have the option to fuck your own ass if you have a tentacle dick
// // Replace n with the tentacle cock number
// function tentacleGoesUpYerPooperNewsAtEleven(): void {
//     let tentacle: number;
//     for (tentacle = 0; tentacle < player.torso.cocks.count; tentacle++) {
//         if (player.torso.cocks.get(tentacle).type === CockType.TENTACLE) break;
//     }
//     for (let x: number = tentacle + 1; x < player.torso.cocks.count; x++) { // Find the biggest tentacle cock you've got
//         if (player.torso.cocks.get(x).type === CockType.TENTACLE && player.torso.cocks.get(x).cArea() > player.torso.cocks.get(tentacle).cArea()) tentacle = x;
//     }
//     DisplayText().clear();
//     // [Standard text for stripping off goes here]
//     if (player.stats.cor < 15)
//         DisplayText("You sheepishly find some rocks to hide in, where you remove your clothes.\n\n");
//     else if (player.stats.cor < 30)
//         DisplayText("You make sure you are alone and strip naked.\n\n");
//     else if (player.stats.cor < 60)
//         DisplayText("You happily remove your " + player.inventory.equipment.armor.displayName + ", eager to pleasure yourself.\n\n");
//     else if (player.stats.cor < 80)
//         DisplayText("You strip naked in an exaggerated fashion, hoping someone might be watching.\n\n");
//     else DisplayText("You strip naked, fondling your naughty bits as you do so and casting seductive looks around, hoping someone or something is nearby to fuck you.\n\n");

//     DisplayText("You eagerly reveal your flora pecker as it squirms and wriggles on its own, gently caressing the green surface here and there, its coloration changing as you tease yourself.  After toying with your tentacle dick for a while, you decide to get down to business; using your newly acquired shaft muscles, you expertly guide your ever-writhing " + CockDescriptor.describeCock(player, tentacle) + " to your back, pointing it toward your buttocks.  You grind the tip against your [butt], making pre-cum flow from your mushroom-like head and smearing it against your " + player.skinFurScales() + ".  Using your own seminal fluid as a natural lube, you press the tip of your " + CockDescriptor.describeCock(player, tentacle) + " in front of your own backdoor, stretching your anal opening little by little, careful not to tear your own insides.  This goes on for a while, until you suddenly lose all patience and roughly stuff your own " + CockDescriptor.describeCock(player, tentacle) + " at full force inside your colon.");
//     // [anal tightness check]
//     player.buttChange(player.cockArea(tentacle), true, true, false);

//     DisplayText("\n\nThe impetuousness of the act makes you cry in a mixture of pleasure and pain, your [asshole] being overloaded with intense sensations.  Fortunately the tender and rubbery texture of your " + CockDescriptor.describeCock(player, tentacle) + " allows for more sensitivity, the subtle friction sending tingles from your crotch all the way up your spine.  You shiver from the sheer cocktail of raw pleasure you're inflicting on your own body.  Your " + CockDescriptor.describeCock(player, tentacle) + " keeps squirming against your insides, making you quiver and giggle like a whore, until it lodges all the way inside your colon, adopting a more comfortable position.  You then proceed to ferociously fuck your own [asshole], stretching it a bit more at every thrust.");

//     // [Standard text for stroking other cocks/vagina goes here; text between ()s should be removed if the PC doesn't have multicocks]

//     DisplayText("\n\nThe conjugated friction of your " + CockDescriptor.describeCock(player, tentacle) + " writhing inside your devastated interior (as well as the rough hanjdob you're giving yourself) eventually proves too much for your horny body, and [eachCock] releases a massive load, squirting sexual juices everywhere inside (and outside) your body.  Pressure builds in your ass (and your hands) as cum flows out of you");
//     // [if cum production is massive]
//     if (player.cumQ() >= 1000) DisplayText(", making [eachCock] bulge.  The extra feeling sends you over the edge and you quickly reach your climax as you cum and cum");
//     DisplayText(".");
//     // [if cum production is moderate]
//     if (player.cumQ() >= 500) DisplayText("  Your belly swells a bit from all the semen being packed inside you.");
//     // [if cum production is massive]
//     if (player.cumQ() >= 1500) DisplayText("  Your poor insides cannot handle the enormous cumshot being unloaded in your [asshole] and a significant volume of spunk dribbles outside, carelessly polluting the floor.");
//     // [Standard text for other cocks cumming goes here.]
//     DisplayText("  You groan and lazily remove your " + CockDescriptor.describeCock(player, tentacle) + " from your anus as you give in to your pleasure-induced drowsiness.");
//     if (player.torso.cocks.count > 0) {
//         // Single Cock
//         if (player.torso.cocks.count === 1) {
//             if (player.stats.lib < 30)
//                 DisplayText("  You quickly fall asleep, spent. ");
//             else if (player.stats.lib < 55)
//                 DisplayText("  You roll and begin to doze, your semi-erect " + CockDescriptor.describeCock(player, ) + " flopping against you. ");
//             else if (player.stats.lib <= 80) {
//                 DisplayText("  As you close your eyes and relax, your " + CockDescriptor.describeCock(player, ) + " surges back to erectness, ensuring ");
//                 if (player.stats.cor < 50)
//                     DisplayText("your dreams will be filled with sex.");
//                 else DisplayText("you dream in a depraved kinky fantasia.");
//             }
//             else DisplayText("  You groan and drift to sleep, your rigid " + CockDescriptor.describeCock(player, ) + " pulsing and throbbing with continual lust.");
//         }
//         // Multi Cock
//         if (player.torso.cocks.count > 1) {
//             if (player.stats.lib < 30)
//                 DisplayText("  You quickly fall asleep, spent. ");
//             else if (player.stats.lib < 55)
//                 DisplayText("  You roll and begin to doze for an hour, your semi-erect cocks flopping against you. ");
//             else if (player.stats.lib <= 80) {
//                 DisplayText("  As you close your eyes and relax, your dicks surge back to erectness, ensuring ");
//                 if (player.stats.cor < 50)
//                     DisplayText("your dreams will be filled with sex.");
//                 else DisplayText("you dream in a depraved kinky fantasia.");
//             }
//             else DisplayText("  You groan and drift into a brief catnap, your rigid erections pulsing and throbbing with continual lust.");
//         }
//     }
//     player.orgasm();
//     player.stats.sens += -2;
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// // Unique Masturbation Scene (by Frogapus)
// // Select [Gilded Sock] from Masturbation menu
// function gildedCockTurbate(): void {
//     DisplayText().clear();
//     let gildedCock: number;
//     for (gildedCock = 0; gildedCock < player.torso.cocks.count; gildedCock++) {
//         if (player.torso.cocks.get(gildedCock).sock === "gilded") break;
//     }
//     for (let x: number = gildedCock + 1; x < player.torso.cocks.count; x++) { // Find the biggest gilded cock you've got
//         if (player.torso.cocks.get(x).sock === "gilded" && player.torso.cocks.get(x).cArea() > player.torso.cocks.get(gildedCock).cArea()) gildedCock = x;
//     }
//     DisplayText("You disrobe, shivering softly.  Biting your lip, you look down, realizing that though the day is warm the gleaming metallic sleeve on your cock is cool, almost chill.");
//     DisplayText("\n\nThe light catches the golden cock-sock, scattering light through the area.  You grin as you grasp it, rubbing your thumb against the smooth top of the sheath, with your fingers rubbing against the tight leather cords beneath.  Your cock swells against the metallic walls of the cocksock, and though you're clearly growing warmer, the gleaming sheath stays cool to the touch.");

//     DisplayText("\n\nYour fingers slide easily over the smooth metallic fabric and you begin masturbating.  The gold sheath shifts up and down against your shaft as you stroke faster and faster.  The gold casing blocks the familiar feel of your hand, instead feeling like the hand of some eager stranger on your dick.");
//     if (player.torso.cocks.get(gildedCock).cArea() < 6)
//         DisplayText("  Enveloped in the cocksock, you can barely see the tip of your tiny dick as your head peeks out on every downstroke.  The rounded edge of the metallic sleeve rubs maddeningly against the head of your cock, cool and smooth.");
//     // [medium dicks]
//     else if (player.torso.cocks.get(gildedCock).cArea() < 20)
//         DisplayText("  The head of your cock abuts against the edge of the cocksock, bumping against it with every stroke.  With your thickness, the cocksock is a perfect fit, tugging on your cock with every upstroke, stretching your dick lightly as you jack yourself.");
//     // [large dicks]
//     else DisplayText("  Clamped around your dick, the metal casing looks more like a gigantic cock ring. The golden sheath actually allows you a better grip on your massive member, a ring of coolness around your hot meat.");

//     DisplayText("\n\nPressure builds, and tremors of pleasure run through your body as you stroke faster and faster.  You let out a small moan, as you pump the cocksleeve up and down your " + CockDescriptor.describeCock(player, gildedCock) + ".  Your cock swells within the confines of the sleeve, throbbing against the metallic confines of the sheath.  You shudder, arching your back, as you climax, your " + Math.round(player.cumQ()) + "mLs of cum arcing up high into the air overhead.");

//     DisplayText("\n\nPanting, you watch the jet of cum glittering in the air, caught in the light of the golden cocksock.  It beads and twists in the light, crystallizing.  In a glittering shower, ");
//     if (player.cumQ() < 25)
//         DisplayText("a sprinkle of");
//     else if (player.cumQ() < 250)
//         DisplayText("a rain of");
//     else DisplayText("a torrent of");
//     DisplayText(" gems falls down upon your body instead of cum, bouncing off your " + player.skinFurScales() + ".");

//     const gems: number = midasCockJackingGemsRoll();

//     DisplayText("\n\n<b>You have just enough wherewithal to gather up the spent " + num2Text(gems) + " gems before falling asleep for a quick nap.</b>");
//     player.orgasm();
//     player.stats.sens += -1;
//     player.stats.gems += gems;
//     Flags.list[FlagEnum.GILDED_JERKED]++;
//     statScreenRefresh();
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function stickADildoInYourVagooSlut(): void {
//     DisplayText().clear();
//     if (player.hasVirginVagina()) { // LOW CORRUPTION DEFLOWER
//         if (player.stats.cor <= 50) {
//             DisplayText("You blush nervously as you grasp your phallic toy. The firm dildo bends slightly as you hold it in your hand. You feel perverse to consider doing this, and shakingly undo the bottom of your [armor].");
//             DisplayText("\n\nSitting on your [butt], you begin to rub the length of the slender tube against your [vagina], the gentle stimulation calming your nerves and helping to relax the tension.  As you pick up the pace, moans begin to escape your lips.  Your [clit] fills with blood and twitches as the faux cock slides against it.  You tenderly caress your [chest] with your other hand, becoming more breathy as you do so. ");
//             if (player.torso.vaginas.get(0).wetness <= 2)
//                 DisplayText("The toy slides easier as your juices cover it.");
//             else DisplayText("The toy slides effortlessly thanks to your copious, almost inhuman lubrication.");

//             DisplayText("\n\nSwallowing, you lean back and position the dildo toward your [vagina], the entrance twitching as it yearns for penetration. With an experimental push, you prod at the hole, jumping at the realization of how large the object really is. It's not nearly as thin, short, and bendable as a finger. You think about why you'd do such a thing. Your virginity too precious to risk a demon stealing away, or perhaps you're simply grown more perverted in this corrupt world. Whatever the case, you bite your lip and press the toy into you. Your decision made, the pain of your splitting hymen shoots through you. You gasp, easing the pressure on the toy, letting it sink one more inch before letting go altogether.");
//             player.cuntChange(8, true, true, false);
//             // Cunt change text go here!
//             DisplayText("\n\nBreathing heavily, you slowly pull the invasive, fake phallus from your stinging vagina. A light stain of blood now coats the first several inches of the dildo. Taking a deep breath, you push the toy back in, this time feeling less pain. The worst of the experience behind you, you gently pump in and out. Your once pure pussy is now accepting the intruder deeply. Your speed increases as you get used to it. Breathing heavier in between moans, you thrust your cherry-picker in towards unforeseen ecstasy. The tears in your eyes, accumulated from pain, well up even larger in pleasure. Using one hand to piston the imitation cock in your [vagina] and the other to massage around your [clit], the stimulation becomes almost unbearable. Even with the remnants of pain from your recent deflowering, you can't help but grind your [hips] and slide slowly onto your back in preparation for your first penetrative orgasm. Your moans becoming louder and more intense while vaginal juices drip down your buttcheeks. In one last screaming moan, your thighs lift, and you thrust the dildo as deeply into you as it will go, pushing you over the edge into orgasm.");
//             DisplayText("\n\nYou rest your [butt] back onto the ground and your arms limply at your sides. After several minutes of catching your breath, you pull the toy out of you with a sigh of relief and pleasure. The experience has been quite draining; you decide to rest for some time longer before washing up.");
//         }
//         // 50+ Corruption Shit
//         else {
//             DisplayText("\n\nYou blush perversely as you grasp your phallic toy. The firm dildo bends slightly as you hold it in your hand. A small jolt of giddiness runs through you as you remove your [armor].");
//             DisplayText("\n\nPrancing nude to a comfortable spot, you proceed to rest on your [butt] and place the toy cock aside as you eagerly prepare your [vagina]. You rub your lips gently as you relax your vaginal muscles. Not wishing to leave your mouth out of the fun, you grasp this dildo and begin to lick and suckle it. The passion of the act urging you on, you push a finger inside your [vagina]. Its tight grip on your finger emphasizes the inexperience of the little hole - a problem you're soon to fix.");
//             DisplayText("\n\nWith your faux phallus slick with saliva, you remove the digit from your virgin depths. You press the tip against your entrance, savouring your last moments of virginity. Your poor hymen was only an obstacle for cock, and you're the only one truly worthy of taking your virginity. You push the lust-driving object inside. Pain shoots through you, forcing a gasp from you, but failing to halt your beloved cherry-picker's progress. When you finally reach the greatest depth you can, you release the dildo, breathing deeply as the pain passes.");
//             // CUNT CHANGE CALL
//             player.cuntChange(8, true, true, false);
//             DisplayText("\n\nYet to be satisfied, you regain composure and start pumping into your freshly plucked flower. Your other hand rushes to massage and caress your sensitive [chest]. The fantasies of all the monstrous cocks you'll have thrusted into you spur the rough piston motion, eager to train your [vagina] for its fated task. You slide onto your back as your body devotes itself to pleasure, moans and whimpers fleeting from your mouth. The stimulation builds, only enhanced by the mild pain of inexperience, and within minutes you tense up and scream in ecstasy. Fluids squirt from your [vagina], and you smile gleefully. When the orgasm has passed, you pull your well-used toy from your newly trained slutting-slot. You bring the dildo to your lips to give it an affectionate kiss and lick your virginal blood from it's surface.");
//             DisplayText("\n\nAfter basking in the afterglow, you clean yourself up and redress.");
//         }
//     }
//     // Repeat Dildo For Ladyboners
//     else {
//         DisplayText("You remove your [armor] and sit yourself down behind a rock not far from camp, being sure to bring your toy with you.");
//         DisplayText("\n\nSpreading your [legs], you rub two fingers between your lips, while also suckling your healthy-sized faux cock to lubricate it. Your [vagina] becomes slick with your juices in moments and you eagerly delve a finger into the thirsty hole. The digit goes in slowly and deeply, pleasuring your inner walls with tender stimulation. Your muscles begin to relax, and you feel ready to move onto the main event. Removing the saliva-slicked toy from your mouth, you trade it with your finger. The satisfying easing of the dildo into your nethers is matched by your feminine flavor pushing across your tongue. Muffled moans escape your plugged maw as the beloved toy sinks deep into your [vagina]. Using your free hand, you grope and caress your [chest].");
//         player.cuntChange(8, true, true, false);
//         DisplayText("\n\nThe erotic pumping of the phallic object picks up the pace as you gently build a rhythm with the beating of your heart and tensing of your vaginal walls. Your breathing heaves, and your moans become almost as desperate as they are lustful. Soon the pleasure is rising up into unstoppable tide of phallus-induced ecstasy, and you slide from against the rock to on your side, still fucking yourself with blissful joy. The constant thrusting of the toy begins to make you shake and lose rhythm, your body wanting only to fuck as hard and fast as possible.");
//         DisplayText("\n\nYour orgasm arrives with supreme relief as you force the dildo to your furthest depths. Juices spurt from your genitals, and you roll onto your back to rest. When your breathing regulates, you pull the thoroughly used toy from your [vagina] and prepare to return to camp.");
//     }
//     player.orgasm();
//     player.stats.sens += -1.5;
//     statScreenRefresh();
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// // Dildo in the butt because why not?
// function dildoButts(): void {
//     DisplayText().clear();
//     DisplayText("A kinky idea crosses your mind, and you grab your dildo. Finding a safe spot a short distance from camp, you undo your [armor] and rest on your [butt].");
//     DisplayText("\n\nYou adjust your position as you spread your [legs], giving you the most comfortable access to your [asshole]. You sloppily lick an experimental finger and carry it down to the eager entrance between your cheeks. ");
//     if (player.analCapacity() <= 8)
//         DisplayText("Your tight hole offers resistance at first, but soon relaxes with a tender, lubricated fingering.");
//     else DisplayText("Your experienced hole readily accepts your saliva-coated finger.");
//     DisplayText(" As you gently rub your insides, you use your free hand and reach up to pinch and rub your [nipples]. As the motions become easier, you push a second finger inside as well. You soon find your sensitive anal entrance begging for something more appropriate, and you happily oblige.");
//     DisplayText("\n\nGrabbing your toy, you give it several long wet licks before holding your [legs] up and sending the substitute cock to its true task. You rub the tip against your [asshole] momentarily before finally pushing it inside. Stuttering moans escape your lips as your butt gets its much-needed fill of firm faux phallus");
//     if (silly()) DisplayText(", the alliteration of the experience further arousing you");
//     DisplayText(". Your toes curl as you begin to pull in and out, pumping the dildo with smooth motions. Your tongue hangs from your mouth, your breathing becomes heavy, and your moans lewdly express pure lust as you increase your tempo. Before too long, you feel your pucker becoming more sensitive and know an orgasm is quickly approaching.");
//     player.buttChange(8, true, true, false);
//     if (player.torso.cocks.count > 0 && player.torso.vaginas.count > 0)
//         DisplayText("\n\nYou moan in ecstasy while your [vagina] and " + CockDescriptor.describeMultiCockShort(player) + " erupt with sex juices. ");
//     else if (player.torso.cocks.count > 0)
//         DisplayText("\n\nYou moan in ecstasy while cum spurts from your " + CockDescriptor.describeMultiCockShort(player) + ". ");
//     else if (player.torso.vaginas.count > 0) {
//         DisplayText("\n\nYou moan in ecstasy while juices ");
//         if (player.torso.vaginas.get(0).wetness >= 4)
//             DisplayText("squirt");
//         else DisplayText("trickle");
//         DisplayText(" from your [vagina]. ");
//     }
//     else DisplayText("\n\n");
//     DisplayText("Your body shakes and rocks from the anal orgasm before slumping onto your back. Happily tightening around the toy with each beat of your hammering heart, you rest.");
//     DisplayText("\n\nSome time later, you gather your things and return to camp.");
//     player.orgasm();
//     player.stats.sens += 0.5;
//     statScreenRefresh();
//     MainScreen.doNext(Scenes.camp.returnToCampUseOneHour);
// }

// function midasCockJackingGemsRoll(): number {
//     const cockSocks: number = player.countCockSocks("gilded");
//     let gems: number = 10 + randInt(20);

//     if (player.cumQ() < 1000 * cockSocks)
//         gems += player.cumQ() / 10;
//     else if (player.cumQ() < 2500 * cockSocks)
//         gems += player.cumQ() / 50;
//     else if (player.cumQ() < 5000 * cockSocks)
//         gems += player.cumQ() / 150;
//     else if (player.cumQ() < 10000 * cockSocks)
//         gems += player.cumQ() / 450;
//     else
//         gems += player.cumQ() / 1350;

//     if (gems > 200 * cockSocks)
//         gems = 200 * cockSocks + randInt(20);

//     return gems;
// }

// function onaholeRepeatUse(corrupted: boolean): void {
//     let gemsCreated: number = 0; // Changed as gems caused a duplicate let warning
//     if (player.countCockSocks("gilded") > 0 && Flags.list[FlagEnum.GILDED_JERKED] < player.countCockSocks("gilded")) {
//         Flags.list[FlagEnum.GILDED_JERKED]++;
//         gemsCreated = midasCockJackingGemsRoll();
//         player.stats.gems += gemsCreated;
//     }
//     if (corrupted) {
//         DisplayText("Amused, yet annoyed by the aching of your loins, you take out the well-used onahole to give yourself a good, old-fashioned cock milking. With singular purpose, you impale the toy on your " + CockDescriptor.describeCock(player, ) + " and begin hammering away as if the world depended upon your orgasm. Your fist is but a blur as the toy pumps your " + CockDescriptor.describeCock(player, ) + " beyond any degree of reason. Relishing in each cramp of pleasure as your cum builds, you flex your well-toned pelvic muscles to both heighten your pleasure and to prevent premature release of the impressive batch you are working on. As time passes, even your impressive physical control is no match for the need to unload your spunk. Waiting until the pressure mashes the base of your cock, you strip the toy away from your shaft and with a great squeeze of your crotch, let loose an impressive stream of cock juice that arcs several yards away. Impressed with your own orgasm, you smile, grit your teeth and continue clenching your crotch muscles in an attempt to repeat your massive distance in the orgasm. Lance upon lance of fuck-milk hoses the area down as you empty yourself of your overwhelming lust. After a few dozen shots, your body empties itself of its needs and fatigue strikes you. After cleaning yourself up and rearranging your area to avoid the massive cum puddle you made, ");

//         if (gemsCreated > 0) {
//             DisplayText("<b>you relize the puddle is shimmering strangly. Looking closer you see that your man milk is coalescing into gems! You start collecting them, counting them as you go. You end up with " + gemsCreated + " gems and very little cum.</b>");
//         }
//         else {
//             DisplayText("you lay back to recuperate your strength knowing that your dick will demand more attention later.");
//         }
//     }
//     else {
//         DisplayText("Much to your annoyance and embarrassment, you feel the need to relieve yourself of your tension. Sighing in reservation, you remove the used onahole from your sack. Operating with a mind of its own, your " + CockDescriptor.describeCock(player, ) + " springs to attention, anticipating the coming stimulation and release. Your member easily pushes past the opening in the toy and you begin working your penis with some vigor. Pleasure begins to pulse through your " + CockDescriptor.describeCock(player, ) + " as you build yourself up. The force of the building fluids pushes against your inner organs, creating the paradoxical sensation of pain and pleasure. Pure instict takes over, and your hips begin to buck reflexively. With a sudden, sharp pinch at the base of your member, the need to cum takes over your body");

//         if (gemsCreated > 0) {
//             DisplayText(". You pop the toy from your rod and let your reflexes hump the sky.");

//             DisplayText("\n\nPanting and humping hard, you watch the jet of cum shimmers through the air. Caught in the light of the golden cocksock, it beads and twists into small crystals.  In a glittering shower, a ");
//             if (player.cumQ() < 25)
//                 DisplayText("sprinkle");
//             else if (player.cumQ() < 250)
//                 DisplayText("rain");
//             else DisplayText("torrent");
//             DisplayText(" of gems falls down upon your body instead of cum, bouncing off your " + player.skinFurScales() + ".\n\n<b>You force yourself to pick up the " + gemsCreated + " gems before passing out.</b>");
//         }
//         else {
//             DisplayText("as multiple streams of semen erupt from your dong, creating an impressive mess about you. Soaked in your own fluids, you take a moment to clean yourself up before replacing the toy in your bag and going to sleep, happy to be relieved of your urges.");
//         }
//     }
// }
