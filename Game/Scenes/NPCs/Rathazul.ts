import { FlagType } from "../../Utilities/FlagType";
import { User } from "../../User";
import { ITimeAware } from "../../ITimeAware";
import { Character } from "../../Character/Character";
import { NextScreenChoices, ClickFunction, ScreenChoice } from "../../ScreenDisplay";
import { StatusEffectType } from "../../Effects/StatusEffectType";
import { CView } from "../../../Engine/Display/ContentView";
import { SpriteName } from "../../../Engine/Display/Images/SpriteName";
import { returnToCampUseOneHour, campFollowers } from "../Camp";
import { randInt } from "../../../Engine/Utilities/SMath";
import { campMenu } from "../../Menus/InGame/PlayerMenu";
import { ConsumableName } from "../../Items/Consumables/ConsumableName";
import { MaterialName } from "../../Items/Materials/MaterialName";
import { PerkType } from "../../Effects/PerkType";
import { ItemType } from "../../Items/ItemType";
import { TailType, Tail } from "../../Body/Tail";
import { trace } from "console";
import { ArmorName } from "../../Items/Armors/ArmorName";
import { Cock } from "../../Body/Cock";
import { BreastRow } from "../../Body/BreastRow";
import { describeBiggestBreastRow } from "../../Descriptors/BreastDescriptor";
import { visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin } from "./MarblePurification";
import { amilyFollower } from "./AmilyScene";
import { Inventory } from "../../Inventory/Inventory";
import { bimboSophie } from "./SophieBimbo";
import { partial } from "../../Utilities/Partial";

export const RathazulFlags = {
    RATHAZUL_SILK_ARMOR_COUNTDOWN: 0,
    RATHAZUL_CAMP_INTERACTION_COUNTDOWN: 0,
    MARBLE_PURIFICATION_STAGE: 0,
    UNKNOWN_FLAG_NUMBER_00275: 0,
    JOJO_RATHAZUL_INTERACTION_COUNTER: 0,
    JOJO_DEAD_OR_GONE: 0,
    AMILY_MET_RATHAZUL: 0,
    AMILY_FOLLOWER: 0,
    PC_KNOWS_ABOUT_BLACK_EGGS: 0,
    RATHAZUL_DEBIMBO_OFFERED: 0,
};
User.flags.set(FlagType.Rathazul, RathazulFlags);

export class Rathazul implements ITimeAware {
    // const RATHAZUL_DEBIMBO_OFFERED: number = 744;

    // Rathazul the Alchemist
    // Encounter, random text for potential uses, choices.
    // After he has crafted 3 things for the player, option to move into

    // Implementation of ITimeAware
    public timeChange(): boolean {
        if (RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN > 1) {
            RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN--;
            if (RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN < 1) RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN = 1;
            if (RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN > 300) RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN = 24;
        }
        if (RathazulFlags.RATHAZUL_CAMP_INTERACTION_COUNTDOWN > 0) {
            RathazulFlags.RATHAZUL_CAMP_INTERACTION_COUNTDOWN--;
            if (RathazulFlags.RATHAZUL_CAMP_INTERACTION_COUNTDOWN < 0) RathazulFlags.RATHAZUL_CAMP_INTERACTION_COUNTDOWN = 0;
        }
        return false;
    }

    public timeChangeLarge(): boolean {
        return false;
    }

    public serialize(): object {
        return {};
    }

    public deserialize(saveObject: ITimeAware): void { }
}

export function returnToRathazulMenu(player: Character): NextScreenChoices {
    if (player.effects.has(StatusEffectType.CampRathazul))
        return campRathazul(player);
    else return encounterRathazul(player);
}

export function encounterRathazul(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;

    if (RathazulFlags.MARBLE_PURIFICATION_STAGE === 2 && player.effects.has(StatusEffectType.MetRathazul)) {
        return visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin(player);
    }
    let offered: NextScreenChoices;
    // Rat is definitely not sexy!
    if (player.stats.lust > 30) player.stats.lust += -10;

    // Introduction
    if (player.effects.has(StatusEffectType.MetRathazul)) {
        if (player.effects.has(StatusEffectType.CampRathazul))
            CView.clear().text("You walk over to Rathazul's corner of the   He seems as busy as usual, with his nose buried deep in some tome or alchemical creation, but he turns to face you as soon as you walk within a few paces of him.\n\n");
        else
            CView.clear().text("You spy the familiar sight of the alchemist Rathazul's camp along the lake.  The elderly rat seems to be oblivious to your presence as he scurries between his equipment, but you know him well enough to bet that he is entirely aware of your presence.\n\n");
    }
    else {
        CView.clear().text("You encounter a hunched figure working as you come around a large bush.  Clothed in tattered robes that obscure most his figure, you can nontheless see a rat-like muzzle protruding from the shadowy hood that conceals most of his form.  A simple glance behind him confirms your suspicions - this is some kind of rat-person.  He seems oblivious to your presence as he stirs a cauldron of viscous fluid with one hand; a neat stack of beakers and phials sit in the dirt to his left.  You see a smile break across his aged visage, and he says, \"<i>Come closer child.  I will not bite.</i>\"\n\nApprehensive of the dangers of this unknown land, you cautiously approach.\n\n\"<i>I am Rathazul the Alchemist.  Once I was famed for my miracle cures.  Now I idle by this lake, helpless to do anything but measure the increasing amounts of corruption that taint its waters,</i>\" he says as he pulls back his hood, revealing the entirety of his very bald and wrinkled head.\n\n");
        player.effects.add(StatusEffectType.MetRathazul, 0, 0, 0, 0);
    }
    // Camp offer!
    if (player.effects.get(StatusEffectType.MetRathazul).value2 >= 3 && player.effects.get(StatusEffectType.MetRathazul).value3 !== 1 && player.stats.cor < 75) {
        CView.text("\"<i>You know, I think I might be able to do this worn-out world a lot more good from your camp than by wandering around this lake.  What do you say?</i>\" asks the rat.\n\n(Move Rathazul into your camp?)");
        // Set rathazul flag that he has offered to move in (1 time offer)
        player.effects.get(StatusEffectType.MetRathazul).value3 = 1;
        return { yes: rathazulMoveToCamp, no: rathazulMoveDecline };
    }
    offered = rathazulWorkOffer(player);
    if (!offered) {
        CView.text("He sighs dejectedly, \"<i>I am not sure what I can do for you, youngling.  This world is fraught with unimaginable dangers, and you're just scratching the surface of them.</i>\"\n\nYou nod and move on, leaving the depressed alchemist to his sadness.");
        return { next: returnToCampUseOneHour };
    }
}

function rathazulMoveToCamp(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Rathazul smiles happily back at you and begins packing up his equipment.  He mutters over his shoulder, \"<i>It will take me a while to get my equipment moved over, but you head on back and I'll see you within the hour.  Oh my, yes.</i>\"\n\nHe has the look of someone experiencing hope for the first time in a long time.");
    player.effects.add(StatusEffectType.CampRathazul, 0, 0, 0, 0);
    return { next: returnToCampUseOneHour };
}

function rathazulMoveDecline(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Rathazul wheezes out a sigh, and nods.\n\n\"<i>Perhaps I'll still be of some use out here after all,</i>\" he mutters as he packs up his camp and prepares to head to another spot along the lake.");
    return { next: returnToCampUseOneHour };
}

export function campRathazul(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    if (RathazulFlags.MARBLE_PURIFICATION_STAGE === 2 && player.effects.has(StatusEffectType.MetRathazul)) {
        return visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin(player);
    }
    if (RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN === 1 && RathazulFlags.UNKNOWN_FLAG_NUMBER_00275 > 0) {
        return collectRathazulArmor(player);
    }
    // Special rathazul/follower scenes scenes.
    if (randInt(6) === 0 && RathazulFlags.RATHAZUL_CAMP_INTERACTION_COUNTDOWN === 0) {
        RathazulFlags.RATHAZUL_CAMP_INTERACTION_COUNTDOWN = 3;
        // Pure jojo
        if (RathazulFlags.JOJO_RATHAZUL_INTERACTION_COUNTER === 0 && player.effects.has(StatusEffectType.PureCampJojo) && RathazulFlags.JOJO_DEAD_OR_GONE === 0) {
            return jojoOffersRathazulMeditation();
        }
        if (RathazulFlags.AMILY_MET_RATHAZUL === 0 && RathazulFlags.AMILY_FOLLOWER === 1 && amilyFollower()) {
            return AmilyIntroducesSelfToRathazul();
        }
        if (RathazulFlags.AMILY_MET_RATHAZUL === 1 && RathazulFlags.AMILY_FOLLOWER === 1 && amilyFollower()) {
            return amilyIngredientDelivery();
        }
        if (RathazulFlags.AMILY_MET_RATHAZUL === 2 && RathazulFlags.AMILY_FOLLOWER === 1 && amilyFollower()) {
            return amilyAsksAboutRathazulsVillage();
        }
    }
    let offered: NextScreenChoices;
    // Rat is definitely not sexy!
    if (player.stats.lust > 50) player.stats.lust += -1;

    if (player.stats.lust > 65) player.stats.lust += -5;

    if (player.stats.lust > 80) player.stats.lust += -5;

    if (player.stats.lust > 90) player.stats.lust += -5;

    // Introduction
    CView.clear().text("Rathazul looks up from his equipment and gives you an uncertain smile.\n\n\"<i>Oh, don't mind me,</i>\" he says, \"<i>I'm just running some tests here.  Was there something you needed, " + player.desc.name + "?</i>\"\n\n");
    // player.effects.add(StatusEffectType.metRathazul,0,0,0,0);
    offered = rathazulWorkOffer(player);
    if (!offered) {
        CView.text("He sighs dejectedly, \"<i>I don't think there is.  Why don't you leave me be for a time, and I will see if I can find something to aid you.</i>\"");
        if (player.effects.has(StatusEffectType.CampRathazul))
            return { next: campFollowers };
        else return { next: campMenu };
    }

}

function rathazulWorkOffer(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    let totalOffers: number = 0;
    let spoken: boolean = false;
    let showArmorMenu: boolean = false;
    let purify: ClickFunction;
    let debimbo: number = 0;
    let reductos: ClickFunction;
    let lethiciteDefense: ClickFunction;
    let dyes: ClickFunction;
    if (player.inventory.items.has(ConsumableName.EggBlack) || player.inventory.items.has(ConsumableName.LargeEggBlack)) {
        RathazulFlags.PC_KNOWS_ABOUT_BLACK_EGGS = 1;
        spoken = true;
        CView.text("He eyes the onyx egg in your inventory and offers a little advice.  \"<i>Be careful with black eggs.  They can turn your skin to living latex or rubber.  The smaller ones are usually safer, but everyone reacts differently.  I'd get rid of them, if you want my opinion.</i>\"\n\n");
    }
    // Item crafting offer
    if (player.inventory.items.reduce(Inventory.TotalQuantityOf(MaterialName.GreenGel), 0) >= 2) {
        if (!player.effects.has(StatusEffectType.RathazulArmor)) CView.text("He pipes up with a bit of hope in his voice, \"<i>I can smell the essence of the tainted lake-slimes you've defeated, and if you'd let me, I could turn it into something a bit more useful to you.  You see, the slimes are filled with the tainted essence of the world-mother herself, and once the taint is burned away, the remaining substance remains very flexible but becomes nearly impossible to cut through.  With the gel of five defeated slimes I could craft you a durable suit of armor.</i>\"\n\n");
        else CView.text("He pipes up with a bit of excitement in his voice, \"<i>With just five pieces of slime-gel I could make another suit of armor...</i>\"\n\n");
        spoken = true;
        if (player.inventory.items.reduce(Inventory.TotalQuantityOf(MaterialName.GreenGel), 0) >= 5) {
            showArmorMenu = true;
            totalOffers++;
        }
        else {
            CView.text("You realize you're still a bit short of gel.\n\n");
        }
    }
    // Item crafting offer
    if (player.inventory.items.has(MaterialName.BlackChitin)) {
        CView.text("The elderly rat looks at you intently and offers, \"<i>I see you've gathered a piece of chitin from the giant bees of the forests.  If you bring me five pieces I could probably craft it into some tough armor.</i>\"\n\n");
        spoken = true;
        if (player.inventory.items.reduce(Inventory.TotalQuantityOf(MaterialName.BlackChitin), 0) >= 5) {
            showArmorMenu = true;
            totalOffers++;
        }
        else {
            CView.text("(You need five pieces of chitin for Rathazul to make you the chitinous armor.)\n\n");
        }
    }
    let pCounter: number = 0;
    // Item purification offer
    if (player.inventory.items.has(ConsumableName.IncubusDraft)) {
        purify = purifySomething;
        totalOffers++;
        pCounter++;
    }
    if (player.inventory.items.has(ConsumableName.SuccubiMilk)) {
        purify = purifySomething;
        totalOffers++;
        pCounter++;
    }
    if (player.inventory.items.has(ConsumableName.SuccubisDelight)) {
        purify = purifySomething;
        totalOffers++;
        pCounter++;
    }
    if (player.inventory.items.has(ConsumableName.LaBova)) {
        purify = purifySomething;
        totalOffers++;
        pCounter++;
    }
    // Single Offer
    if (pCounter === 1) {
        CView.text("The rat mentions, \"<i>I see you have at least one tainted item on you... for 20 gems I could remove most of the taint, making it a good deal safer to use.  Of course, who knows what kind of freakish transformations it would cause...</i>\"\n\n");
        spoken = true;
        totalOffers++;
    }
    if (pCounter > 1) {
        CView.text("The rat mentions, \"<i>I see you have a number of demonic items on your person.  For 20 gems I could attempt to remove the taint from one of them, rendering it a good deal safer for consumption.  Of course it would not remove most of the transformative properties of the item...</i>\"\n\n");
        spoken = true;
        totalOffers += 2;
    }
    // Offer dyes if offering something else.
    if (player.inventory.gems >= 50) {
        CView.text("Rathazul offers, \"<i>Since you have enough gems to cover the cost of materials for my dyes as well, you could buy one of my dyes for your hair.  I will need 50 gems up-front.</i>\"\n\n");
        spoken = true;
        totalOffers++;
        dyes = buyDyes;
    }
    // Reducto
    if (player.effects.has(StatusEffectType.CampRathazul) && player.effects.get(StatusEffectType.MetRathazul).value2 >= 4) {
        CView.text("The rat hurries over to his supplies and produces a container of paste, looking rather proud of himself, \"<i>Good news everyone!  I've developed a paste you could use to shrink down any, ah, oversized body parts.  The materials are expensive though, so I'll need ");
        if (RathazulFlags.AMILY_MET_RATHAZUL >= 2) CView.text("50");
        else CView.text("100");
        CView.text(" gems for each jar of ointment you want.</i>\"\n\n");
        totalOffers++;
        spoken = true;
        reductos = buyReducto;
    }
    // SPOIDAH
    if (player.effects.has(StatusEffectType.CampRathazul) && player.inventory.items.has(MaterialName.ToughSpiderSilk) && RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN + RathazulFlags.UNKNOWN_FLAG_NUMBER_00275 === 0) {
        showArmorMenu = true;
        spoken = true;
        totalOffers++;
        CView.text("\"<i>Oooh, is that some webbing from a giant spider or spider-morph?  Most excellent!  With a little bit of alchemical treatment, it is possible I could loosen the fibers enough to weave them into something truly magnificent - armor, or even a marvelous robe,</i>\" offers Rathazul.\n\n");
    }
    // Vines
    if (player.inventory.keyItems.has("Marae's Lethicite") && player.inventory.keyItems.get("Marae's Lethicite").value2 < 3 && !player.effects.has(StatusEffectType.DefenseCanopy) && player.effects.has(StatusEffectType.CampRathazul)) {
        CView.text("His eyes widen in something approaching shock when he sees the Lethicite crystal you took from Marae.  Rathazul stammers, \"<i>By the goddess... that's the largest piece of lethicite I've ever seen.  I don't know how you got it, but there is immense power in those crystals.  If you like, I know a way we could use its power to grow a canopy of thorny vines that would hide the camp and keep away imps.  Growing such a defense would use a third of that lethicite's power.</i>\"\n\n");
        totalOffers++;
        spoken = true;
        lethiciteDefense = growLethiciteDefense;
    }
    if (player.effects.has(StatusEffectType.CampRathazul)) {
        if (RathazulFlags.RATHAZUL_DEBIMBO_OFFERED === 0 && (bimboSophie() || player.perks.has(PerkType.BimboBrains) || player.perks.has(PerkType.FutaFaculties))) {
            return rathazulDebimboOffer(player);
        }
        else if (RathazulFlags.RATHAZUL_DEBIMBO_OFFERED > 0) {
            CView.text("You recall that Rathazul is willing to make something to cure bimbo liqueur for 250 gems and five Scholar's Teas.");
            if (player.inventory.items.reduce(Inventory.TotalQuantityOf(ConsumableName.ScholarsTea), 0) >= 5 && player.inventory.gems >= 250) {
                totalOffers++;
                debimbo = 1;
            }
            else if (player.inventory.items.reduce(Inventory.TotalQuantityOf(ConsumableName.ScholarsTea), 0) >= 5) CView.text("  You should probably find some if you want that...");
            else CView.text("  You need more gems to afford that, though.");
            CView.text("\n\n");
        }
    }
    if (totalOffers === 0 && spoken) {
        return { next: returnToCampUseOneHour };
    }
    if (totalOffers > 0) {
        CView.text("Will you take him up on an offer or leave?");
        // In camp has no time passage if left.

        const choices: ScreenChoice[] = [];
        if (showArmorMenu) choices[0] = ["Armor", rathazulArmorMenu];
        if (debimbo > 0) choices[1] = ["Debimbo", makeADeBimboDraft];
        choices[2] = ["Buy Dye", dyes];
        if (lethiciteDefense !== undefined) choices[3] = ["Lethicite", lethiciteDefense];
        choices[4] = ["Purify", purify];
        if (reductos !== undefined) choices[8] = ["Reducto", reductos];
        if (player.effects.has(StatusEffectType.CampRathazul))
            choices[9] = ["Leave", campFollowers];
        else
            choices[9] = ["Leave", returnToCampUseOneHour];

        return { choices };
    }
}

function purifySomething(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    CView.text("Rathazul asks, \"<i>What would you like me to purify?</i>\"");

    const choices: ScreenChoice[] = [];
    // Item purification offer
    if (player.inventory.items.has(ConsumableName.IncubusDraft)) {
        choices[0] = ["Incubi Draft", rathazulPurifyIncubiDraft];
    }
    if (player.inventory.items.has(ConsumableName.SuccubiMilk)) {
        choices[1] = ["SuccubiMilk", rathazulPurifySuccubiMilk];
    }
    if (player.inventory.items.has(ConsumableName.SuccubisDelight)) {
        choices[2] = ["S. Delight", rathazulPurifySuccubiDelight];
    }
    if (player.inventory.items.has(ConsumableName.LaBova)) {
        choices[3] = ["LaBova", rathazulPurifyLaBova];
    }
    choices[4] = ["Back", rathazulWorkOffer];

    return { choices };
}

function rathazulPurifyIncubiDraft(player: Character): NextScreenChoices {
    CView.clear();
    if (player.inventory.gems < 20) {
        CView.text("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
        return { next: returnToRathazulMenu };
    }
    // if (!debug)
    //     player.inventory.items.consumeItem(ConsumableName.IncubusDraft, 1);
    player.inventory.gems -= 20;
    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;

    return player.inventory.items.createAdd(player, ItemType.Consumable, ConsumableName.IncubusDraftPure, returnToRathazulMenu);
}

function rathazulPurifySuccubiMilk(player: Character): NextScreenChoices {
    CView.clear();
    if (player.inventory.gems < 20) {
        CView.text("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
        return { next: returnToRathazulMenu };
    }
    // if (!debug)
    //     player.inventory.items.consumeItem(ConsumableName.SuccubiMilk, 1);
    player.inventory.gems -= 20;
    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;

    return player.inventory.items.createAdd(player, ItemType.Consumable, ConsumableName.SuccubiMilkPure, returnToRathazulMenu);
}

function rathazulPurifySuccubiDelight(player: Character): NextScreenChoices {
    CView.clear();
    if (player.inventory.gems < 20) {
        CView.text("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
        return { next: returnToRathazulMenu };
    }
    // if (!debug)
    //     player.inventory.items.consumeItem(ConsumableName.SuccubisDelight, 1);
    player.inventory.gems -= 20;
    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;

    return player.inventory.items.createAdd(player, ItemType.Consumable, ConsumableName.SuccubisDelightPure, returnToRathazulMenu);
}

function rathazulPurifyLaBova(player: Character): NextScreenChoices {
    CView.clear();
    if (player.inventory.gems < 20) {
        CView.text("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
        return { next: returnToRathazulMenu };
    }
    // if (!debug)
    //     player.inventory.items.consumeItem(ConsumableName.LaBova, 1);
    player.inventory.gems -= 20;
    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;

    return player.inventory.items.createAdd(player, ItemType.Consumable, ConsumableName.LaBovaPure, returnToRathazulMenu);
}

function rathazulDebimboOffer(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    if (RathazulFlags.RATHAZUL_DEBIMBO_OFFERED === 0) {
        if (bimboSophie()) {
            CView.text("Rathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  \"<i>Tell me, [name], do you truly enjoy having that vacuous idiot around, lusting after you at all hours of the day?</i>\" he asks, shaking his head in frustration.  \"<i>She's clearly been subjected to the effects of Bimbo Liqueur, which as you can plainly see are quite indeed potent.  However, like most things in Mareth, it can be countered - at least partially.</i>\"  Rathazul folds his long, clawed fingers together, his tail lashing behind him as he thinks.  \"<i>Perhaps with a sufficient quantity of something called Scholar's Tea... I could counter the stupefying effects of the elixir... oh my, yes... hmm...</i>\"  Rathazul nods, stroking at the few long wisps of fur that hang from his chin.");
            CView.text("\n\nYou await");
            if (User.settings.silly()) CView.text(" getGoodPost()"); // C# await joke ;_; http://msdn.microsoft.com/en-gb/library/hh156528.aspx
            CView.text(" further clarification, but the old rat just stands there, staring off into space.  Coughing politely, you reacquire his attention, causing him to jump.");
            CView.text("\n\n\"<i>Oh?  Nmm, YES, bimbos, that's right!  As I was saying, five Scholar's Teas along with 250 gems for other reagents should give me all I need to create a bimbo-beating brew!  Oh my, the alliteration!  How absurd.</i>\"  Rathazul chuckles slowly, wiping a drop from his eye before he looks back at you fiercely, \"<i>It is a worthwhile goal - no creature should be subjected to a reduced intellect.  Let me know when you have acquired what is needed.</i>\"");
        }
        else {
            // Notification if the PC is the one bimbo'ed*
            CView.text("\n\nRathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  \"<i>Tell me [name], do you truly enjoy living your life under the debilitating effects of that cursed potion?  Even now the spark of intelligence has all but left from your eyes.  Do you even understand what I'm saying?</i>\"");
            CView.text("\n\nYou twirl a lock of hair around your finger and giggle.  This silly old rat thinks you're like, dumb and stuff!  He just doesn't know how great it is to have a rocking body and a sex-drive that's always ready to suck and fuck.  It's so much fun!  You look back at the rat, realizing you haven't answered him yet, feeling a bit embarrassed as he sighs in disappointment.");
            CView.text("\n\n\"<i>Child, please... bring me five Scholar's Teas and 250 gems for reagents, then I can fix you!  I can help you!  Just... get the tea!</i>\" the alchemist pleads, counting off to five on his clawed fingers for extra emphasis while shaking his gem pouch profusely.  You bite your lower lip— he seems really really mad about this or something.  Maybe you should like, get the tea?");
        }
        RathazulFlags.RATHAZUL_DEBIMBO_OFFERED++;
    }
    // Rath menu

    return { next: campRathazul };
}

// Creation Of The Draft:*
function makeADeBimboDraft(player: Character): NextScreenChoices {
    CView.clear();
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.text("Rathazul takes the teas and the gems into his wizened palms, shuffling the glittering jewels into a pouch and the teas into a large decanter.  He promptly sets the combined brews atop a flame and shuffles over to his workbench, where he picks up numerous pouches and vials of every color and description, adding them to the mix one after the other.  The mixture roils and bubbles atop the open flame like a monstrous, eerie thing, but quickly simmers down to a quiet boil.  Rathazul leaves it going for a while, stirring occasionally as he pulls out a smaller vial.  Once most of the excess liquid has evaporated, he pours the concoction into the glass container and corks it, holding it up to the light to check its coloration.");
    CView.text("\n\n\"<i>That <b>should</b> do,</i>\" he mutters to himself.  Rathazul turns, carefully handing you the mixture.  \"<i>This should counter the mental-inhibiting effects of the Bimbo Liqueur, but I have no idea to what extent those who imbibe it will retain of their time spent as a bimbo...</i>\"\n\n");
    // Take items
    player.inventory.gems -= 250;
    player.inventory.items.consumeItem(ConsumableName.ScholarsTea, 5);

    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;
    return player.inventory.items.createAdd(player, ItemType.Consumable, ConsumableName.DeBimbo, returnToRathazulMenu);
}

export function rathazulArmorMenu(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    const beeArmor: ClickFunction = (player.inventory.items.reduce(Inventory.TotalQuantityOf(MaterialName.BlackChitin), 0) >= 5 ? craftCarapace : undefined);
    const gelArmor: ClickFunction = (player.inventory.items.reduce(Inventory.TotalQuantityOf(MaterialName.GreenGel), 0) >= 5 ? craftOozeArmor : undefined);
    let silk: ClickFunction;
    CView.text("Which armor project would you like to pursue with Rathazul?");
    if (player.effects.has(StatusEffectType.CampRathazul) && player.inventory.items.has(MaterialName.ToughSpiderSilk) && RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN + RathazulFlags.UNKNOWN_FLAG_NUMBER_00275 === 0) {
        silk = craftSilkArmor;
    }
    return {
        choices: [
            ["BeeArmor", beeArmor],
            ["GelArmor", gelArmor],
            ["SpiderSilk", silk],
            ["", undefined],
            ["Back", returnToRathazulMenu],
        ]
    };
}

function craftSilkArmor(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;

    CView.text("You hand the bundled webbing to Rathazul carefully, lest you damage the elderly mouse.  He gives you a bemused smile and snatches the stuff from your grasp while he mutters, \"<i>I'm not falling apart you know.</i>\"\n\n");
    // (Not enough webs:
    if (player.inventory.items.reduce(Inventory.TotalQuantityOf(MaterialName.ToughSpiderSilk), 0) < 5) {
        CView.text("The rat shakes his head and hands it back to you.  \"<i>This isn't enough for me to make anything with.  I'll need at least five bundles of this stuff total, so you'll need to find more,</i>\" he explains.\n\n");
        // (optional spider bonus:
        if (player.body.tails.find(Tail.FilterType(TailType.SPIDER_ABDOMEN))) {
            CView.text("You show him your spider-like abdomen in response, offering to produce more webbing for him.  Rathazul chuckles dryly, a sound that reminds you of hot wind rushing through a dead valley.  \"<i>Dear child, this would never do.  Silk this tough can only be produced by a true-born spider.  No matter how you change yourself, you'll always be a human at heart.</i>\"\n\n");
            CView.text("The old rat shakes his head and adds, \"<i>Well, now that I think about it, the venom of a red widow might be able to transform you until you are a spider to the core, but I have absolutely no idea what that would do to you.  If you ever try such a dangerous, reckless idea, let me know.  I want to have my notebooks handy, for SCIENCE!</i>\"\n\n");
        }
        return { next: returnToRathazulMenu };
    }
    CView.text("The rat limps over to his equipment, spider-silk in hand.  With efficient, practiced motions, he runs a few tests.  As he finishes, he sighs and explains, \"<i>This will be harder than I thought.  The webbing is highly resistant to most of my alchemic reagents.  To even begin to work with such material I will need a number of rare, expensive elements.  I would need 500 gems to even start such a project.</i>\"\n\n");
    CView.text("You can't help but sigh when he names such a sizable figure.  Do you give him the 500 gems and spider-silk in order for him to create you a garment?");
    if (player.inventory.gems < 500) {
        CView.text("  <b>Wait... you don't even have 500 gems.  Damn.</b>");
        return { next: returnToRathazulMenu };
    }
    // [Yes] [No]
    return { yes: commissionSilkArmorForReal, no: declineSilkArmorCommish };
}
function commissionSilkArmorForReal(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;

    CView.text("You sort 500 gems into a pouch and toss them to Rathazul, along with the rest of the webbing.  The wizened alchemist snaps the items out of the air with lightning-fast movements and goes to work immediately.  He bustles about with enormous energy, invigorated by the challenging task before him.  It seems Rathazul has completely forgotten about you, but as you turn to leave, he calls out, \"<i>What did you want me to make?  A mage's robe or some nigh-impenetrable armor?</i>\"\n\n");
    player.inventory.gems -= 500;

    player.inventory.items.consumeItem(MaterialName.ToughSpiderSilk, 5);

    return {
        choices: [
            ["Armor", partial(chooseArmorOrRobes, player, 1)],
            ["Robes", partial(chooseArmorOrRobes, player, 2)],
        ]
    };
}

function declineSilkArmorCommish(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;

    CView.text("You take the silk back from Rathazul and let him know that you can't spend 500 gems on a project like that right now.  He sighs, giving you a crestfallen look and a slight nod of his hooded muzzle.");
    return { next: returnToRathazulMenu };
}

export function chooseArmorOrRobes(player: Character, robeType: number): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear().text("Rathazul grunts in response and goes back to work.  You turn back to the center of your camp, wondering if the old rodent will actually deliver the wondrous item that he's promised you.");
    return { next: returnToCampUseOneHour };
    RathazulFlags.UNKNOWN_FLAG_NUMBER_00275 = robeType;
    RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN = 24;
    trace("274: " + RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN);
}
function collectRathazulArmor(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;

    CView.text("Rathazul beams and ejaculates, \"<i>Good news everyone!  Your ");
    if (RathazulFlags.UNKNOWN_FLAG_NUMBER_00275 === 1) CView.text("armor");
    else CView.text("robe");
    CView.text(" is finished!</i>\"\n\n");
    // Robe
    let itype: ArmorName;
    if (RathazulFlags.UNKNOWN_FLAG_NUMBER_00275 === 2) {
        CView.text("Hanging from a small rack is a long, flowing robe.  It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric.  You run your fingers over the silken garment, feeling the soft material give at your touch.  There's a hood with a golden border embroidered around the edge.  For now, it hangs limply down the back, but it would be easy to pull up in order to shield the wearer's eyes from harsh sunlight or rainy drizzle.  The sleeves match the cowl, circled with intricate threads laid out in arcane patterns.\n\n");

        CView.text("Rathazul gingerly takes down the garment and hands it to you.  \"<i>Don't let the softness of the material fool you.  This robe is tougher than many armors, and the spider-silk's properties may even help you in your spell-casting as well.</i>\"\n\n");
        itype = ArmorName.SpidersilkRobes;
    }
    // (Armor)
    else {
        CView.text("A glittering white suit of armor sits atop a crude armor rack, reflecting the light that plays across its surface beautifully.  You definitely didn't expect anything like this!  It looks nearly identical to a set of light platemail, though instead of having a cold metal surface, the armor feels slightly spongy, with just a little bit of give in it.\n\n");

        CView.text("While you marvel at the strange equipment, Rathazul explains, \"<i>When you said you wanted armor, I realized I could skip a few of the alchemical processes used to soften material.  The savings let me acquire a cheap metal set of armor to use as a base, and I molded half the armor around each piece, then removed it and created the outer, defensive layers with the rest of the webbing.  Unfortunately, I didn't have enough silk for a solid codpiece, but I did manage to make a you thin loincloth from the leftover scraps  - for modesty.</i>\"\n\n");
        itype = ArmorName.SpidersilkArmor;
    }
    // Reset counters
    RathazulFlags.UNKNOWN_FLAG_NUMBER_00275 = 0;
    RathazulFlags.RATHAZUL_SILK_ARMOR_COUNTDOWN = 0;
    return player.inventory.items.createAdd(player, ItemType.Armor, itype, returnToRathazulMenu);
}

function craftOozeArmor(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    player.inventory.items.consumeItem(MaterialName.GreenGel, 5);
    CView.clear().text("Rathazul takes the green gel from you and drops it into an empty cauldron.  With speed well beyond what you'd expect from such an elderly creature, he nimbly unstops a number of vials and pours them into the cauldron.  He lets the mixture come to a boil, readying a simple humanoid-shaped mold from what you had thought was piles of junk material.  In no time at all, he has cast the boiling liquid into the mold, and after a few more minutes he cracks it open, revealing a suit of glistening armor.\n\n");
    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;
    if (!player.effects.has(StatusEffectType.RathazulArmor)) player.effects.add(StatusEffectType.RathazulArmor, 0, 0, 0, 0);
    return player.inventory.items.createAdd(player, ItemType.Armor, ArmorName.GelArmor, returnToRathazulMenu);
}

function buyDyes(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    CView.text("Rathazul smiles and pulls forth several vials of colored fluids.  Which type of dye would you like?");
    CView.text("\n\n<b>(-50 Gems)</b>");
    player.inventory.gems -= 50;

    const choices: ScreenChoice[] = [];
    choices[0] = ["Auburn", partial(buyDye, player, ConsumableName.HairDyeAuburn)];
    choices[1] = ["Black", partial(buyDye, player, ConsumableName.HairDyeBlack)];
    choices[2] = ["Blond", partial(buyDye, player, ConsumableName.HairDyeBlonde)];
    choices[3] = ["Brown", partial(buyDye, player, ConsumableName.HairDyeBrown)];
    choices[4] = ["Red", partial(buyDye, player, ConsumableName.HairDyeRed)];
    choices[5] = ["White", partial(buyDye, player, ConsumableName.HairDyeWhite)];
    choices[6] = ["Gray", partial(buyDye, player, ConsumableName.HairDyeGray)];
    choices[9] = ["Nevermind", buyDyeNevermind];

    return { choices };
}

function buyDye(player: Character, dye: ConsumableName): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;

    return player.inventory.items.createAdd(player, ItemType.Consumable, dye, returnToRathazulMenu);
}

function buyDyeNevermind(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    CView.text("You change your mind about the dye, and Rathazul returns your gems.\n\n(<b>+50 Gems</b>)");
    player.inventory.gems += 50;

    return { next: returnToRathazulMenu };
}

function buyReducto(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    const cost: number = (RathazulFlags.AMILY_MET_RATHAZUL >= 2 ? 50 : 100);
    if (player.inventory.gems >= cost) {
        CView.text("Rathazul hands you the Reducto with a nod before returning to his work.\n\n");
        player.inventory.gems -= cost;
        player.effects.get(StatusEffectType.MetRathazul).value2 += 1;

        return player.inventory.items.createAdd(player, ItemType.Consumable, ConsumableName.Reducto, returnToRathazulMenu);
    }
    else {
        CView.text("\"<i>I'm sorry, but you lack the gems I need to make the trade,</i>\" apologizes Rathazul.");
        return { next: returnToRathazulMenu };
    }
}

function growLethiciteDefense(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    CView.text("Rathazul asks, \"<i>Are you absolutely sure?  Growing this thorn canopy as a defense will use one third of the crystal's power.</i>\"\n\n(Do you have Rathazul use the crystal to grow a defensive canopy?)");
    return { yes: growLethiciteDefenseYesYesYes, no: growLethiciteDefenseGuessNot };
}

function growLethiciteDefenseYesYesYes(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    CView.text("Rathazul nods and produces a mallet and chisel from his robes.  With surprisingly steady hands for one so old, he holds the chisel against the crystal and taps it, easily cracking off a large shard.  Rathazul gathers it into his hands before slamming it down into the dirt, until only the smallest tip of the crystal is visible.  He produces vials of various substances from his robe, as if by magic, and begins pouring them over the crystal.  In a few seconds, he finishes, and runs back towards his equipment.\n\n\"<i>You may want to take a step back,</i>\" he warns, but before you have a chance to do anything, a thick trunk covered in thorny vines erupts from the ground.  Thousands of vine-like branches split off the main trunk as it reaches thirty feet in the air, radiating away from the trunk and intertwining with their neighbors as they curve back towards the ground.  In the span of a few minutes, your camp gained a thorn tree and a thick mesh of barbed vines preventing access from above.");
    player.effects.add(StatusEffectType.DefenseCanopy, 0, 0, 0, 0);
    player.effects.get(StatusEffectType.MaraesLethicite).value2 += 1;
    return { next: campMenu };
}

function growLethiciteDefenseGuessNot(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear();
    CView.text("Rathazul nods sagely, \"<i>That may be wise.  Perhaps there will be another use for this power.");
    return { next: returnToRathazulMenu };
}

export function craftCarapace(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Rathazul); // 49;
    CView.clear().text("The rat takes the scales and works on his bench for an hour while you wait.  Once he has finished, Ratzhul is beaming with pride, \"<i>I think you'll be pleased. Go ahead and take a look.</i>\"\n\nHe hands you the armor.  ");
    CView.text("The plates shine and shimmer like black steel.  He has used the yellow chitin to add accents and embroidery to the plates with a level of detail and craftsmanship rarely seen back home. A yellow fur neck lining has been fashioned from hairs found on the pieces.  The armor includes a breastplate, shoulder guards, full arm guards, and knee high boots.  You notice there are no pants.  As you turn to ask him where the pants are, you see him scratching his head and hastily rustling in drawers.  He mutters under his breath, \"<i>I'm sorry, I'm sorry, I got so focused on working on the pauldrons that I forgot to make any leg coverings!  Here, this should look good with it, and it won't restrict your movements.</i>\"  He hands you a silken loincloth");
    if (player.gender >= 2) CView.text(" with stockings and garters");
    CView.text(".  He still manages to look somewhat pleased with himself in spite of the blunder, even bragging a little bit, \"<i>Let me show you the different lengths of string I used.</i>\"\n\n");
    if (player.body.cocks.length > 0 && player.body.cocks.sort(Cock.Largest)[0].area >= 40) CView.text("The silken material does little to hide the bulge of your groin, if anything it looks a little lewd.  Rathazul mumbles and looks away, shaking his head.\n\n");
    if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 8) CView.text("Your " + describeBiggestBreastRow(player) + " barely fit into the breastplate, leaving you displaying a large amount of jiggling cleavage.\n\n");
    player.inventory.items.consumeItem(MaterialName.BlackChitin, 5);
    player.effects.get(StatusEffectType.MetRathazul).value2 += 1;
    return player.inventory.items.createAdd(player, ItemType.Armor, ArmorName.BeeArmor, returnToRathazulMenu);
}
