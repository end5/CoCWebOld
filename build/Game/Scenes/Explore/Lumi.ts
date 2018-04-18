import DisplaySprite from '../../../Engine/Display/DisplaySprite';
import DisplayText from '../../../Engine/display/DisplayText';
import SpriteName from '../../../Engine/Display/Images/SpriteName';
import MainScreen, { ClickFunction } from '../../../Engine/Display/MainScreen';
import { randInt } from '../../../Engine/Utilities/SMath';
import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import ConsumableName from '../../Items/Consumables/ConsumableName';
import ItemFactory from '../../Items/ItemFactory';
import ItemType from '../../Items/ItemType';
import User from '../../User';
import Scenes from '../Scenes';

export interface LumiFlags {
    met: boolean;
}

const lumiFlags: LumiFlags = {
    met: false
};

User.flags.set(CharacterType.Lumi, lumiFlags);

export function encounter() {
    DisplayText().clear();
    // 1st time lumi meeting
    if (!lumiFlags.met) {
        // placeholder text for outside the cathedral
        DisplayText("You spot an anomaly in the barren wastes; a door that seems to be standing out in the middle of nowhere. Somehow, you figure that it must lead to some other part of the world, and the only reason it's here is because you can't get to where the door should be right now.\n\n");
        DisplayText("Do you open it?");
        MainScreen.doYesNo(lumiLabChoices, Scenes.camp.returnToCampUseOneHour);
    }
    else {
        // placeholder text for outside the cathedral
        DisplayText("You spot the door standing in the middle of nowhere again, and you guess that it will lead you back to Lumi's laboratory.  It swings open easily...");
        MainScreen.doNext(lumiLabChoices);
    }
    // end of placeholder text
}

export function lumiLabChoices(character: Character) {
    DisplaySprite(SpriteName.Lumi);
    DisplayText().clear();
    // First time meeting
    if (!lumiFlags.met) {
        // Set Lumi met flag
        lumiFlags.met = true;
        DisplayText("You open the door and carefully check inside for any enemies that may be trying to ambush you. The room seems to be some kind of alchemical lab, with shelves full of apparatuses all along the walls, a desk on one side of the room, and a long table across the room from you that is full of alchemical experiments in progress, many give off lots of smoke, and others are bottles of bubbling fluids.  A goblin wearing an apron and some kind of headband is sitting on a tall, wheeled stool; she is otherwise nude and seems to be watching at least 3 experiments right now. She suddenly turns around and looks straight in your direction.  It's hard to tell thanks to the dark goggles that hide her eyes from view, but you're fairly certain she's watching you.  After a few seconds she yells \"<i>Cuths-tohmer!</i>\" in a thick lisp. She looks harmless enough, so you step inside while she fiddles with her experiments, reducing the bubbling smoke.  She jumps down from her stool, tears off her apron, bounds over to the desk, and scrambles on top of it.\n\n");

        DisplayText("She's about 3 feet tall, with yellow-green skin, and wears her orange hair in a long ponytail that reaches to her knees.  Her breasts are about B cup, with average nipples that have been colored orange. All of her nails have been painted orange to match. She doesn't seem to ever stop moving, and while the majority of her face looks cute, it's a little hard to be sure while she's wearing those thick goggles.  The solid black lenses of her goggles make her look quite unsettling, stifling any appeal her form could inspire in you.\n\n");

        DisplayText("\"<i>Stho, what can Lumi, Gobin Aochomist Extwaordinaire, do fo you today?</i>\" asks the unusual goblin.\n\n");

        DisplayText("You explain that it's a little hard to understand her.  She sticks her tongue out at you, showing a VERY large stud in the middle of it, instantly explaining her lisp.  Rather than pushing the point, you ask her what she can do for you.  She pulls open a hatch on the top of the desk and pulls out a bottle of something and shakes it, \"<i>Lumi can sell you some of her finely cwafted poetions fo a good pwice, ore, if you've alweady got some nice poetions or reagents, Lumi can make them even bettar. But tha cost a whole lot. If you were one of dee Followers, den maybe Lumi could make a special deal wit you; but the boss don't want me playin wit outsiders. Wat will it be?</i>\"\n\n");
    }
    // Repeat Meetings
    else {
        DisplayText("Once more, you step into Lumi's lab.  She's still working on her experiments. Before you even have a chance to call out to her, she has already pivoted to watch you.  In a flash her apron hits the floor and she is standing on her desk, asking, \"<i>Stho, what can Lumi the Aochomist Extwaordinaire do fo you today?</i>\"");
    }
    let enhance: ClickFunction;
    if (lumiEnhance(character))
        enhance = lumiEnhance;
    MainScreen.displayChoices(["Shop", "Enhance", "", "", "Leave"], [lumiShop, enhance, undefined, undefined, Scenes.camp.returnToCampUseOneHour]);
}

export function lumiShop() {
    DisplaySprite(SpriteName.Lumi);
    // Set item handling to lumi shop
    DisplayText().clear();
    DisplayText("You ask Lumi if you can see her potions.  She smiles at you and pulls out several bottles from her desk and shows them to you.\n\n\"<i>Gawantied qwality, made by Lumi herself,</i>\" she says proudly.\n\n");
    DisplayText("Lust Draft - 15 gems\nGoblin Ale - 20 gems\nOviposition Elixir - 45 gems\n");

    // The player is given a list of choices, clicking on one gives the description and the price, like Giacomo.
    const buttonText = [
        ItemFactory.get(ItemType.Consumable, ConsumableName.LustDraft).desc.shortName,
        ItemFactory.get(ItemType.Consumable, ConsumableName.GoblinAle).desc.shortName,
        ItemFactory.get(ItemType.Consumable, ConsumableName.OvipositionElixir).desc.shortName,
    ];

    const buttonFunc = [
        lumiLustDraftPitch,
        lumiPitchGobboAle,
        lumiPitchOviElixer,
    ];
    MainScreen.displayChoices(buttonText, buttonFunc, ["Leave"], [lumiLabChoices]);
}

// Lust Draft
function lumiLustDraftPitch() {
    DisplaySprite(SpriteName.Lumi);
    DisplayText().clear();
    DisplayText("You point at the bottle filled with bubble-gum pink fluid.\n\n\"<i>De lust dwaft? Always a favowite, with it you nevar have to worwy about not bein weady for sexy time; one of my fiwst creations. 15 gems each.</i>\"\n\n");
    DisplayText("Will you buy the lust draft?");
    MainScreen.doYesNo((character: Character) => { lumiPurchase(character, ConsumableName.LustDraft); }, lumiShop);
}
// Goblin Ale
function lumiPitchGobboAle() {
    DisplaySprite(SpriteName.Lumi);
    DisplayText().clear();
    DisplayText("You point at the flagon. \"<i>Oh? Oh thats Lumi's... actually no, dat tispsy stuff for 20 gems. You'll like if you want to be like Lumi. Do you like it?</i>\"\n\n");
    DisplayText("Will you buy the goblin ale?");
    MainScreen.doYesNo((character: Character) => { lumiPurchase(character, ConsumableName.GoblinAle); }, lumiShop);
}
// Ovi Elixir
function lumiPitchOviElixer() {
    DisplaySprite(SpriteName.Lumi);
    DisplayText().clear();
    DisplayText("You point at the curious hexagonal bottle. \"<i>De Oviposar Elixir? Made baithsed on da giant bee's special stuff dey give deir queen. It will help make de burfing go faster, an if you dwink it while you awen pweggy, iw will give you some eggs to burf later. More dwinks, eqwals more and biggar eggs. Lumi charges 45 gems for each dose.</i>\"\n\n");
    DisplayText("Will you buy the Ovi Elixir?");
    MainScreen.doYesNo((character: Character) => { lumiPurchase(character, ConsumableName.OvipositionElixir); }, lumiShop);
}

function lumiPurchase(character: Character, itype: string) {
    DisplaySprite(SpriteName.Lumi);
    DisplayText().clear();
    // After choosing, and PC has enough gems
    let cost: number = 0;
    if (itype === ConsumableName.OvipositionElixir)
        cost = 45;
    if (itype === ConsumableName.GoblinAle)
        cost = 20;
    if (itype === ConsumableName.LustDraft)
        cost = 15;
    if (character.inventory.gems >= cost) {
        DisplayText("You pay Lumi the gems, and she hands you " + ItemFactory.get(ItemType.Consumable, itype).desc.longName + " saying, \"<i>Here ya go!</i>\"\n\n");
        character.inventory.gems -= cost;
        character.inventory.items.createAdd(character, ItemType.Consumable, itype, lumiLabChoices);
    }
    else {
        // After choosing, and PC doesn't have enough gems
        DisplayText("You go to pay Lumi the gems, but then you realize that you don't have enough. Lumi seems to know what happened and tells you \"<i>Ok, is dere somefing you want to buy that you can affowd?</i>\"\n\n");
        // Return to main Lumi menu
        MainScreen.doNext(lumiShop);
    }
}

export function lumiEnhance(character: Character): boolean {
    DisplaySprite(SpriteName.Lumi);
    const buttonFunc = [];
    character.inventory.items.has(ConsumableName.FoxBerry);

    let fox;
    if (character.inventory.items.has(ConsumableName.FoxBerry))
        fox = lumiEnhanceFox;
    let laBova;
    if (character.inventory.items.has(ConsumableName.LaBova))
        laBova = lumiEnhanceLaBova;
    let succuDelight;
    if (character.inventory.items.has(ConsumableName.SuccubisDelight))
        succuDelight = lumiEnhanceSDelight;
    const oviElix = undefined;
    // if(character.inventory.items.has(ConsumableName.OVIELIX))
    // 	oviElix = lumiEnhanceOviElix;
    let lustDraft;
    if (character.inventory.items.has(ConsumableName.LustDraft))
        lustDraft = lumiEnhanceDraft;
    let seed;
    if (character.inventory.items.has(ConsumableName.GoldenSeed))
        seed = lumiEnhanceGoldenSeed;
    let kanga;
    if (character.inventory.items.has(ConsumableName.KangaFruit))
        kanga = lumiEnhanceKanga;
    let kitsune;
    if (character.inventory.items.has(ConsumableName.FoxJewel))
        kitsune = lumiEnhanceFoxJewel;
    DisplayText().clear();
    DisplayText("\"<i>Do you have 100 gems for de enhancement?</i>\" asks Lumi.\n\n");
    // If (character has less than 100 gems)
    if (character.inventory.gems < 100) {
        DisplayText("You shake your head no, and Lumi gives you a disappointed look and says, \"<i>Den Lumi can do no enhancement for you. Anyfing else?</i>\"\n\n");
        // Return to main Lumi menu
        MainScreen.doNext(lumiLabChoices);
        return false;
    }
    else {
        DisplayText("You nod and Lumi gives an excited yell, \"<i>Yay! Lumi loves to do enhancement, what you want to be bettar?</i>\"\n\n");
        // The character chooses an item that can be enhanced from a list, regardless of which is chosen, the text for the next part is the same.
        MainScreen.displayChoices([
            ItemFactory.get(ItemType.Consumable, ConsumableName.FoxBerry).desc.shortName,
            ItemFactory.get(ItemType.Consumable, ConsumableName.FoxJewel).desc.shortName,
            ItemFactory.get(ItemType.Consumable, ConsumableName.GoldenSeed).desc.shortName,
            ItemFactory.get(ItemType.Consumable, ConsumableName.KangaFruit).desc.shortName,
            ItemFactory.get(ItemType.Consumable, ConsumableName.LustDraft).desc.shortName,
            ItemFactory.get(ItemType.Consumable, ConsumableName.LaBova).desc.shortName,
            ItemFactory.get(ItemType.Consumable, ConsumableName.OvipositionElixir).desc.shortName,
            ItemFactory.get(ItemType.Consumable, ConsumableName.SuccubisDelight).desc.shortName,
        ],
            [
                fox, kitsune, seed, kanga, lustDraft, laBova, oviElix, succuDelight
            ],
            ["Back"], [lumiLabChoices]
        );
    }
}
function lumiEnhanceLaBova(character: Character) {
    lumiEnhanceGo(character, ConsumableName.LaBova);
}
function lumiEnhanceSDelight(character: Character) {
    lumiEnhanceGo(character, ConsumableName.SuccubisDelight);
}

function lumiEnhanceOviElix(character: Character) {
    lumiEnhanceGo(character, ConsumableName.OvipositionElixir);
}

function lumiEnhanceDraft(character: Character) {
    lumiEnhanceGo(character, ConsumableName.LustDraft);
}

function lumiEnhanceGoldenSeed(character: Character) {
    lumiEnhanceGo(character, ConsumableName.GoldenSeed);
}

function lumiEnhanceKanga(character: Character) {
    lumiEnhanceGo(character, ConsumableName.KangaFruit);
}

function lumiEnhanceFox(character: Character) {
    lumiEnhanceGo(character, ConsumableName.FoxBerry);
}

function lumiEnhanceFoxJewel(character: Character) {
    lumiEnhanceGo(character, ConsumableName.FoxJewel);
}

function lumiEnhanceGo(character: Character, itype: string) {
    DisplaySprite(SpriteName.Lumi);
    let nextItem = "";
    if (itype === ConsumableName.LaBova) {
        nextItem = ConsumableName.LaBovaEnhanced;
    }
    else if (itype === ConsumableName.KangaFruit) {
        nextItem = ConsumableName.KangaFruitEnhanced;
    }
    else if (itype === ConsumableName.SuccubisDelight) {
        nextItem = ConsumableName.SuccubisDream;
    }
    /*else if(itype === ConsumableName.OVIELIX) {
        nextItem = ConsumableName.OVIMAX_;
    } */
    else if (itype === ConsumableName.LustDraft) {
        nextItem = ConsumableName.LustDraftEnhanced;
    }
    else if (itype === ConsumableName.GoldenSeed) {
        nextItem = ConsumableName.GoldenSeedEnhanced;
    }
    else if (itype === ConsumableName.FoxBerry) {
        nextItem = ConsumableName.FoxBerryEnhanced;
    }
    else if (itype === ConsumableName.FoxJewel) {
        nextItem = ConsumableName.FoxJewelEnhanced;
    }
    character.inventory.gems -= 100;
    character.inventory.items.consumeItem(itype);
    DisplayText().clear();
    DisplayText("Lumi grabs the item from you and runs over to her table, stopping for only a second to put her apron on.  ");
    // start list of possible enhancement texts
    const temp = randInt(3);
    const item = ItemFactory.get(ItemType.Consumable, nextItem);
    if (itype === ConsumableName.GoldenSeed) DisplayText("She fiddles with it, coating it in exotic powders before she tosses the whole mess onto a hotplate.  It explodes, knocking the goblin flat on her ass.  She sits bolt upright and snatches up the now-glowing seed with a gloved hand.\n\n");
    else if (itype === ConsumableName.FoxJewel) DisplayText("Lumi stares wide-eyed into the fathoms of its depths.  She remains like that for several moments before you clear your throat, and then hurries off to work.  Flitting back and forth between the various beakers and test tubes that litter the workshop, she mixes chemicals seemingly at random, many of which bubble or explode rather violently.\n\nAfter several minutes of this, she pours all of the reagents into a large beaker over an open flame.  The contents boil up through the neck of the flask and drip slowly down the condenser.  A ponderously large drop of black liquid builds up at the tip of the condenser, wobbling precipitously for a moment before finally falling onto the jewel with a splash.\n\nThe jewel soaks up the black fluid like a sponge, veins of sickening purple spreading across the surface like a spider's web.  A few moments later, the jewel is entirely purple, the mystic flames inside glowing a bright violet.\n\nYou reach out hesitantly and place the mystically enhanced teardrop-shaped jewel into your pouch.\n\n");
    else if (itype === ConsumableName.KangaFruit) DisplayText("She fiddles with it, coating it in exotic powders before she tosses the whole mess onto a hotplate.  It explodes, knocking the goblin flat on her ass.  She sits bolt upright and snatches up the now-glowing fruit with a gloved hand.\n\n");
    else if (temp === 0) DisplayText("She starts grabbing things from around the table, seemingly at random, and adds them to " + item.desc.longName + ".  To your alarm, there is soon a large cloud of smoke coming off it! There is a strong smell to the smoke and it makes it hard to breathe.  Lumi grabs a mask out of a drawer and puts it on, continuing with her work unperturbed.  She suddenly stops and you wonder if she is done, but she takes off her mask and inhales deeply of the smoke, then keels over!  As you go over to help her she suddenly stands up, waves away some of the smoke, and says, \"<i>All dun!</i>\"\n\n");
    else if (temp === 1) DisplayText("Taking hold of one of the bottles that were sitting where she put the tray, she seems to think for a moment before tossing the bottle into one of the corners of the room.  It shatters just behind the table, and a small puff of smoke goes up into the air.  You're a little nervous about that bottle, but before you have a chance to say anything, two more bottles fly off and join it; this time causing a small explosion. You ask her what she is thinking tossing those aside, and she simply responds, \"<i>Dey were in my way.</i>\"\n\n\"<i>What?!  So you just toss things that explode to the side?</i>\"\n\n<i>\"Don worry, I'll put counter agents in dere at de end of de day.  An I never throw stuff da'll do any damage.  Done!</i>\"\n\n");
    else if (temp === 2) DisplayText("She adds a few things to the tray before moving down the table.  She adds some reagents to a bubbling chemical reaction, and then adds some more ingredients to that.  You wonder why she just left " + item.desc.longName + " there to work on something else.  Then Lumi moves back across the table, past where " + item.desc.longName + " sits, to start adding things to something else.  Before you have a chance to complain, she moves back to " + item.desc.longName + " and continues.  You decide that it's probably best not to ask about her work ethic and just let her do her thing; she has more experience than you, after all.\n\nPOP! You look over in surprise as the first thing she worked on makes a small explosion.  POW! Now the second experiment has blown up!  You start to move in alarm, wondering if Lumi really knows what she's doing; just before " + item.desc.longName + " seems to explode with an incredible BOOM.  Lumi stops moving for a moment, looking straight ahead before saying, \"<i>Dat was a gud one, Lumi dun!</i>\"\n\n");
    character.inventory.items.createAdd(character, ItemType.Consumable, nextItem, lumiLabChoices);
}
