import * as AkbalScene from './Forest/AkbalScene';
import * as BeeGirlScene from './Forest/BeeGirlScene';
import * as CorruptedGlade from './Forest/CorruptedGlade';
import * as ErlKingScene from './Forest/ErlKingScene';
import * as Essrayle from './Forest/Essrayle';
import * as Faerie from './Forest/Faerie';
import * as KitsuneScene from './Forest/KitsuneScene';
import { DisplaySprite } from '../../../Engine/Display/DisplaySprite';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { SpriteName } from '../../../Engine/Display/Images/SpriteName';
import { randInt, randomChoice } from '../../../Engine/Utilities/SMath';
import { Cock } from '../../Body/Cock';
import { VaginaWetness } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { ItemType } from '../../Items/ItemType';
import { MaterialName } from '../../Items/Materials/MaterialName';
import { LocationName } from '../../Locations/LocationName';
import { Menus } from '../../Menus/Menus';
import { NextScreenChoices } from '../../ScreenDisplay';
import { User } from '../../User';
import { Scenes } from '../Scenes';

/**
 * Created by aimozg on 06.01.14.
 */

export const akbalScene = AkbalScene;
export const beeGirlScene = BeeGirlScene;
export const corruptedGlade = CorruptedGlade;
export const essrayle = Essrayle;
export const faerie = Faerie;
export const kitsuneScene = KitsuneScene;
// export const tamaniDaughtersScene: TamainsDaughtersScene = new TamainsDaughtersScene();
// export const tamaniScene: TamaniScene = new TamaniScene();
// export const tentacleBeastScene: TentacleBeastScene = new TentacleBeastScene();
export const erlkingScene = ErlKingScene;

export function exploreDeepwoods(character: Character): NextScreenChoices {
    User.locations.get(LocationName.Deepwoods).timesVisited++;

    const chooser = randInt(5);

    // Faerie
    if (chooser === 0) {
        return Scenes.forest.faerie.encounter(character);
    }
    // Tentacle monster
    if (chooser === 1) {
        DisplayText("Tentacle Beast Placeholder");
        return { next: Menus.Player };
    }
    // Corrupted Glade
    if (chooser === 2) {
        if (randInt(4) === 0) {
            return trappedSatyr(character);
        }
        return corruptedGlade.intro(character);
    }
    if (chooser === 3) {
        return akbalScene.supahAkabalEdition(character);
    }
    else if (chooser === 4) {
        if (randInt(3) === 0) return kitsuneScene.kitsuneShrine(character);
        else return kitsuneScene.enterTheTrickster(character);
    }
}

// Explore forest
export function exploreForest(character: Character): NextScreenChoices {
    User.locations.get(LocationName.Forest).timesVisited++;

    // Chance to discover deepwoods
    if ((User.locations.get(LocationName.Forest).timesVisited >= 20) && !User.locations.get(LocationName.Deepwoods).visited) {
        User.locations.get(LocationName.Deepwoods).timesVisited++;
        DisplayText().clear();
        DisplayText("After exploring the forest so many times, you decide to really push it, and plunge deeper and deeper into the woods.  The further you go the darker it gets, but you courageously press on.  The plant-life changes too, and you spot more and more lichens and fungi, many of which are luminescent.  Finally, a wall of tree-trunks as wide as houses blocks your progress.  There is a knot-hole like opening in the center, and a small sign marking it as the entrance to the 'Deepwoods'.  You don't press on for now, but you could easily find your way back to explore the Deepwoods.\n\n<b>Deepwoods exploration unlocked!</b>");
        return { next: Scenes.camp.returnToCampUseOneHour };
    }

    const chooser = randInt(4);
    return [goblinEncounter, jojoEncounter, tentacleEncounter, beeGirlEncounter][chooser](character);
}

function goblinEncounter(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Goblin Encounter Placeholder");
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function jojoEncounter(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Jojo Encounter Placeholder");
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function tentacleEncounter(character: Character): NextScreenChoices {
    DisplayText().clear();
    const temp = randInt(5);
    // Oh noes, tentacles!
    if (temp === 0) {
        // Tentacle avoidance chance due to dangerous plants
        DisplayText("Tentacle Beast Placeholder.");
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    if (temp === 1) {
        if (character.stats.cor < 80) {
            DisplayText("You enjoy a peaceful walk in the woods, it gives you time to think.");
            character.stats.tou += .5;
            character.stats.int += 1;
        }
        else {
            DisplayText("As you wander in the forest, you keep ");
            if (character.gender === 1) DisplayText("stroking your half-erect " + Desc.Cock.describeMultiCockShort(character) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes.");
            if (character.gender === 2) DisplayText("idly toying with your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " as you daydream about getting fucked by all kinds of monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
            if (character.gender === 3) DisplayText("stroking alternatively your " + Desc.Cock.describeMultiCockShort(character) + " and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes, before, or while, getting fucked by various monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
            if (character.gender === 0) DisplayText("daydreaming about sex-demons with huge sexual attributes, and how you could please them.");
            DisplayText("");
            character.stats.tou += 0.5;
            character.stats.lib += 0.25;
            character.stats.lust += character.stats.lib / 5;
        }
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    // CORRUPTED GLADE
    if (temp === 2 || temp >= 4) {
        if (randInt(4) === 0) {
            return trappedSatyr(character);
        }
        return corruptedGlade.intro(character);
    }
    // Trip on a root!
    if (temp === 3) {
        DisplayText("You trip on an exposed root, scraping yourself somewhat, but otherwise the hour is uneventful.");
        character.stats.HP -= 10;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
}

function beeGirlEncounter(character: Character): NextScreenChoices {
    if (randInt(10) === 0) {
        DisplayText().clear();
        DisplayText("You find a large piece of insectile carapace obscured in the ferns to your left.  It's mostly black with a thin border of bright yellow along the outer edge.  There's still a fair portion of yellow fuzz clinging to the chitinous shard.  It feels strong and flexible - maybe someone can make something of it.  ");
        return character.inventory.items.createAdd(character, ItemType.Material, MaterialName.BlackChitin, Scenes.camp.returnToCampUseOneHour);
    }
    return Scenes.forest.beeGirlScene.beeEncounter(character);
}

// Catch a Satyr using the corrupt glade and either leave or have your way with him.
// Suggested to Fen as the MaleXMale submission.
// Will be standalone
function trappedSatyr(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplaySprite(SpriteName.Satyr);
    DisplayText("As you wander through the woods, you find yourself straying into yet another corrupt glade.  However, this time the perverse grove isn't unoccupied; loud bleatings and brayings of pleasure split the air, and as you push past a bush covered in dripping, glans-shaped berries, you spot the source.\n\n");

    DisplayText("A humanoid figure with a set of goat-like horns and legs - a satyr - is currently buried balls-deep in one of the vagina-flowers that scatter the grove, whooping in delight as he hungrily pounds into its ravenously sucking depths.  He stops on occasion to turn and take a slobbering suckle from a nearby breast-like growth; evidently, he doesn't care that he's stuck there until the flower's done with him.\n\n");

    // (Player lacks a penis:
    if (character.torso.cocks.count <= 0) {
        DisplayText("You can't really see any way to take advantage of this scenario, so you simply turn back and leave the way you came.");
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    // Player returns to camp)
    // (Player has penis:
    else {
        DisplayText("You can see his goat tail flitting happily above his tight, squeezable asscheeks, the loincloth discarded beside him failing to obscure his black cherry, ripe for the picking.  Do you take advantage of his distraction and ravage his ass while he's helpless?\n\n");
        // [Yes] [No]
        return { choices: [["Ravage"], [rapeSatyr]], persistantChoices: [["Leave"], [ignoreSatyr]] };
    }
}

// [=No=]
function ignoreSatyr(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplaySprite(SpriteName.Satyr);
    DisplayText("You shake your head, ");
    if (character.stats.cor < 50) DisplayText("disgusted by the strange thoughts this place seems to put into your mind");
    else DisplayText("not feeling inclined to rape some satyr butt right now");
    DisplayText(", and silently leave him to his pleasures.");
    character.stats.lust += 5 + character.stats.lib / 20;
    return { next: Scenes.camp.returnToCampUseOneHour };
}
// Player returns to camp
function rapeSatyr(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplaySprite(SpriteName.Satyr);
    const biggestCocks = character.torso.cocks.sort(Cock.LargestCockArea);
    const x = biggestCocks[0];

    // (Low Corruption)
    if (character.stats.cor < 33) DisplayText("For a moment you hesitate... taking someone from behind without their consent seems wrong... but then again you doubt a satyr would pass on the opportunity if you were in his position.");
    // (Medium Corruption)
    else if (character.stats.cor < 66) DisplayText("You smirk; normally you would have given this some thought, but the idea of free booty is all you need to make a decision.");
    // High Corruption
    else DisplayText("You grin; this is not even a choice!  Passing on free anal is just not something a decent person does, is it?");

    DisplayText("  You silently strip your " + character.inventory.equipment.armor.displayName + " and ");
    if (character.torso.hips.legs.isNaga()) DisplayText("slither");
    else DisplayText("sneak");

    DisplayText(" towards the distracted satyr; stopping a few feet away, you stroke your " + Desc.Cock.describeCock(character, x) + ", urging it to full erection and coaxing a few beads of pre, which you smear along your " + Desc.Cock.describeCockHead(x) + ".  With no warning, you lunge forward, grabbing and pulling his hips towards your " + Desc.Cock.describeCock(character, x) + " and shoving as much of yourself inside his tight ass as you can.\n\n");

    DisplayText("The satyr lets out a startled yelp, struggling against you, but between his awkward position and the mutant flower ravenously sucking on his sizable cock, he's helpless.\n\n");

    DisplayText("You slap his butt with a open palm, leaving a clear mark on his taut behind.  He bleats, bucking wildly, but this serves only to slam his butt into your crotch until the flower hungrily sucks him back, sliding him off your prick.  You smile as a wicked idea hits you; you hit his ass again and again, making him buck into your throbbing " + Desc.Cock.nounCock(x.type) + ", while the flower keeps pulling him back inside; effectively making the satyr fuck himself.\n\n");

    DisplayText("Eventually, his bleating and screaming start to annoy you, so you silence him by grabbing at his horns and shoving his head to the side, into one of the breast-like growths nearby.  The satyr unthinkingly latches onto the floral nipple and starts to suckle, quieting him as you hoped.  You're not sure why, but he starts to voluntarily buck back and forth between you and the flower; maybe he's getting into the spirit of things, or maybe the vegetal teat he's pulling on has introduced an aphrodisiac chemical after so many violent attempts to pull out of the kindred flower.\n\n");

    DisplayText("You resolve not to think about it right now and just enjoy pounding the satyr's ass.  With his bucking you're able to thrust even farther into his tight puckered cherry, ");
    if (x.area >= 100) DisplayText("stretching it all out of normal proportion and ruining it for whomever might happen to use it next.");
    else DisplayText("stretching it to fit your " + Desc.Cock.describeCock(character, x) + " like a condom.");
    DisplayText("  Your groin throbs, ");
    if (character.torso.balls.quantity > 0) DisplayText("your balls churn, ");
    DisplayText("and you grunt as you feel the first shots of cum flowing along " + Desc.Cock.describeMultiCockSimpleOne(character) + ", only to pour out into");
    if (character.torso.cocks.count > 1) DisplayText(" and onto");
    DisplayText(" the satyr's abused ass; you continue pounding him even as you climax, causing rivulets of cum to run down his cheeks and legs.\n\n");

    DisplayText("Still slurping obscenely on the fake breast, the satyr groans and murmurs; you're not sure how much of a role the sap he's swallowing or the cunt-flower on his cock is playing, but it looks like he's actually enjoying himself now.");

    // (Low Cum Amount)
    if (character.cumQ() < 250) DisplayText("  As much as you'd love to fill his belly so full of spunk he'd look pregnant, you just can't muster any more, and pull out with a sigh.\n\n");
    // (Medium Cum Amount)
    else if (character.cumQ() < 1000) DisplayText("  You cum and cum, filling every crevice of his anal passage with warm jism, the slutty goatman doesn't seem to mind this in the least.  When you're finally spent, you pull out with a sigh, and watch as your cum backflows out of his ass to fall on the grass below.\n\n");
    // (Large Cum Amount)
    else DisplayText("  You cum and cum, filling every crevice of his anal passage with warm jism, and the slutty goatman doesn't seem to mind this in the least - yet.  You push him to his limits; cum backflows out of his ass and around your spewing prick, but still you dump more and more of your heavy load inside your now-willing cock-sleeve, inflating his belly like a balloon.  When you're finally spent, you pull out with a sigh and look at your handiwork; cum pours out of his ass like an open tap and his belly is absolutely bulging, making him look pregnant.\n\n");

    DisplayText("The satyr is too absorbed in his own fucking of the plant-pussy, and his nursing of the tree boob to bewail your absence");
    if (character.cumQ() >= 1000) DisplayText(", although his eyes have widened perceptibly along with the stretching of his stomach");
    DisplayText(".\n\n");

    DisplayText("You can't help but smile inwardly at the helpless goatman's eagerness, and decide to stick around and watch him a little longer.  It's not everyday you see a creature like him at your mercy.  Every once in awhile you egg him on with a fresh slapping of his butt. The satyr grumbles and huffs, but continues to thrust and rut mindlessly into the vegetative pussy feeding on his cock. You don't think it'll be long before he cums...\n\n");

    DisplayText("As you watch the lewd display, you feel your arousal building and your " + Desc.Cock.describeCock(character, x) + " growing back into full mast. Figuring you already have a willing slut readily available, you consider using him to relieve yourself once more... What do you do?");
    character.orgasm();
    // [Again][Leave]
    return { choices: [["Again"], [secondSatyrFuck]], persistantChoices: [["Leave"], [dontRepeatFuckSatyr]] };
}

// [=Leave=]
function dontRepeatFuckSatyr(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplaySprite(SpriteName.Satyr);
    DisplayText("You've had your fun, and you don't really want to fool around in the forest all day, so you grab your " + character.inventory.equipment.armor.displayName + " and leave the rutting satyr behind.\n\n");
    return { next: Scenes.camp.returnToCampUseOneHour };
}
// [=Again=]
function secondSatyrFuck(character: Character): NextScreenChoices {
    const biggestCocks = character.torso.cocks.sort(Cock.LargestCockArea);
    const x = biggestCocks[0];
    DisplayText().clear();
    DisplayText("There's no harm in using the helpless goat once more... This time though, you decide you'll use his mouth.  With a yank on his horns, you forcefully dislodge him from the breast-plant and force him to his knees, turning his head towards you; he doesn't put up much resistance and when you present your erect shaft to him, he licks his lips in excitement and latches onto your " + Desc.Cock.describeCock(character, x) + ".\n\n");

    DisplayText("His mouth is exquisite; it feels slippery and warm and his lips are soft while his tongue wriggles about your shaft, trying to embrace and massage it.  He gloms onto your manhood with eager hunger, desperate to ravish you with his mouth.  Quivers of pleasure ripple and shudder through his body as he slobbers and gulps - and no wonder!  From the remnants of sap still in his mouth, you can feel currents of arousal tingling down your cock; if he's been drinking it straight, his mouth must be as sensitive as a cunt from the effects of this stuff.\n\n");

    DisplayText("Having had your first orgasm mere minutes ago, you don't last long.  Within a few moments of his beginning you flood his mouth with a second load of cum, pulling out to paint his face with the last couple jets.\n\n");

    DisplayText("With a great, garbled cry, the satyr cums on his own, gurgling through the sap-tinted cum drooling from his mouth as he spews into the waiting opening of his rapacious plant lover.  It swells and bloats as it gorges itself on his thick, stinking seed, stretching its stem until it is almost spherical, finally releasing him to collapse on his knees, free at last of the plant's grip.  He moans and bleats softly, leaking cummy sap from his chin onto his hairy chest, too overwhelmed by the combined fucking of yourself and the flower and too poisoned by whatever aphrodisiac he's been slurping on to move.\n\n");

    DisplayText("You give your sensitive member a few trembling, almost-painful strokes... maybe you overdid it a bit.  Shrugging, you gather your " + character.inventory.equipment.armor.displayName + " and leave the passed-out satyr behind as you go back to your camp.");
    character.orgasm();
    character.stats.lib += 1;
    character.stats.sens += -5;
    return { next: Scenes.camp.returnToCampUseOneHour };
}
