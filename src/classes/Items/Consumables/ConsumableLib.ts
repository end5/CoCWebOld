import Library from "../../Utilities/Library";
import Consumable from "./Consumable";
import Utils from "../../Utilities/Utils";

export default class ConsumableLib extends Library<Consumable>
{
    // commented ones have issues
    public constructor() {
        //public static const DEFAULT_VALUE:number = 6;
        super();
        this.add(new Consumable("AuburnD", "AuburnD", "a vial of auburn hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "auburn"));
        this.add(new Consumable("B. Book", "B. Book", "a small book with a midnight-black cover", 40, "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home.", m.blackSpellbook);
        this.add(new Consumable("B.Gossr", "B.Gossr", "a bundle of black, gossamer webbing", 0, "These stUtils.rands of gooey black gossamer seem quite unlike the normal silk that driders produce.  It smells sweet and is clearly edible, but who knows what it might do to you?", Utils.curry(m.sweetGossamer, 1));
        this.add(new Consumable("BC Beer", "BC Beer", "a mug of Black Cat Beer", 1, "A capped mug containing an alcoholic drink secreted from the breasts of Niamh.  It smells tasty.", function (player: Player): void { getGame().telAdre.niamh.blackCatBeerEffects(player) });
        this.add(new BeeHoney(false, false));
        //this.add(new Consumable("BimboCh", "BimboCh", "a bottle of bimbo champagne", Utils.curry(function (player: Player): void { getGame().telAdre.niamh.bimboChampagne(player, true, true) }), null, 1));
        this.add(new BimboLiqueur());
        this.add(new Consumable("Black D", "Black D", "a vial of black hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "black"));
        this.add(new Consumable("BlackEg", "BlackEg", "a rubbery black egg", 0, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.blackRubberEgg, false));
        this.add(new Consumable("BlackPp", "BlackPp", "a solid black canine pepper", 10, "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right...", Utils.curry(m.caninePepper, 3));
        this.add(new Consumable("Blond D", "Blond D", "a vial of blonde hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "blonde"));
        this.add(new Consumable("BlueDye", "BlueDye", "a vial of blue hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "dark blue"));
        this.add(new Consumable("BlueEgg", "BlueEgg", "a blue and white mottled egg", 0, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.blueEgg, false));
        this.add(new Consumable("BroBrew", "BroBrew", "a can of Bro Brew", 0, "This aluminum can is labelled as 'Bro Brew'.  It even has a picture of a muscly, bare-chested man flexing on it.  A small label in the corner displays: \"Demon General's Warning: Bro Brew's effects are as potent (and irreversible) as they are refreshing.\"", m.broBrew);
        this.add(new Consumable("Brown D", "Brown D", "a vial of brown hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "brown"));
        this.add(new Consumable("BrownEg", "BrownEg", "a brown and white mottled egg", 0, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.brownEgg, false));
        this.add(new Consumable("BulbyPp", "BulbyPp", "a bulbous pepper", 10, "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base.", Utils.curry(m.caninePepper, 5));
        this.add(new Consumable("CanineP", "CanineP", "a Canine pepper", 0, "The pepper is shiny and red, bulbous at the base but long and narrow at the tip.  It smells spicy.", Utils.curry(m.caninePepper, 0));
        //this.add(new Consumable("CCupcak", "CCupcak", "a gigantic, chocolate cupcake", m.giantChocolateCupcake, null, 250));
        this.add(new Consumable("Cerul P", "Cerulean P.", "a cerulean-tinted potion", 0, "This is a mysterious bottle filled with a sky-blue liquid that sloshes gently inside.  Supposedly it will make you irresistible, though to what or who you cannot say.", m.ceruleanPotion);
        //this.add(new Consumable("Coal   ", "Coal   ", "two pieces of coal", m.coal, null));
        this.add(new Consumable("DblPepp", "DblPepp", "a double canine pepper", 10, "This canine pepper is actually two that have grown together due to some freak coincidence.", Utils.curry(m.caninePepper, 2));
        this.add(new DeBimbo());
        this.add(new Consumable("DrgnEgg", "DrgnEgg", "an unfertilized dragon egg", 0, "A large, solid egg, easily the size of your clenched fist.  Its shell color is reddish-white, with blue splotches.", m.eatEmberEgg);
        this.add(new Consumable("DryTent", "DryTent", "a shriveled tentacle", 0, "A dried tentacle from one of the lake anemones.  It's probably edible, but the stingers are still a little active.", m.shriveledTentacle);
        this.add(new Consumable("EctoPls", "EctoPls", "a bottle of ectoplasm", 0, "The green-tinted, hardly corporeal substance flows like a liquid inside its container. It makes you feel... uncomfortable, as you observe it.", m.ectoplasm);
        this.add(new Consumable("Equinum", "Equinum", "a vial of Equinum", 0, "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\".  It is likely this potion is tied to horses in some way.", m.equinum);
        this.add(new HairExtensionSerum());
        this.add(new Consumable("F.Draft", "F.Draft", "a vial of roiling red fluid labeled \"Fuck Draft\"", 0, "This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word \"Fuck\" is inscribed on the side of the vial.", Utils.curry(m.lustDraft, true));
        this.add(new Consumable("FishFil", "FishFil", "a fish fillet", 0, "A perfectly cooked piece of fish.  You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species.", m.fishFillet);
        this.add(new Consumable("FoxBery", "Fox Berry", "a fox berry", 0, "This large orange berry is heavy in your hands.  It may have gotten its name from its bright orange coloration.  You're certain it is no mere fruit.", Utils.curry(m.foxTF, false));
        this.add(new Consumable("Frrtfrt", "Frrtfrt", "a ferret fruit", 0, "This fruit is curved oddly, just like the tree it came from.  The skin is fuzzy and brown, like the skin of a peach.", m.ferretTF);
        this.add(new Consumable("FoxJewl", "Fox Jewel", "a fox jewel", 0, "A shining teardrop-shaped jewel.  An eerie blue flame dances beneath the surface.", Utils.curry(m.foxJewel, false));
        this.add(new Consumable("GldSeed", "GoldenSeed", "a golden seed", 0, "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations.", Utils.curry(m.goldenSeed, 0));
        //this.add(new Consumable("GodMead", "GodMead", "a pint of god's mead", m.godMead, null));
        this.add(new Consumable("Gob.Ale", "Gob.Ale", "a flagon of potent goblin ale", 0, "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew.  Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with.", m.goblinAle);
        this.add(new Consumable("GrayDye", "GrayDye", "a vial of gray hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "gray"));
        this.add(new Consumable("Green D", "Green D", "a vial of green hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "green"));
        this.add(new GroPlus());
        this.add(new Consumable("Hummus ", "Hummus ", "a blob of cheesy-looking hummus", 0, "This pile of hummus doesn't look that clean, and you really don't remember where you got it from.  It looks bland.  So bland that you feel blander just by looking at it.", m.Hummus);
        this.add(new Consumable("ImpFood", "ImpFood", "a parcel of imp food", 0, "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious.", m.impFood);
        this.add(new Consumable("IncubiD", "IncubiD", "an Incubi draft", 0, "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass.", Utils.curry(m.incubiDraft, true));
        this.add(new Consumable("IzyMilk", "IzyMilk", "a bottle of Isabella's milk", 0, "This is a bottle of Isabella's milk.  Isabella seems fairly certain it will invigorate you.", m.isabellaMilk);
        this.add(new Consumable("KangaFt", "KangaFruit", "a piece of kanga fruit", 0, "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them.", Utils.curry(m.kangaFruit, 0));
        this.add(new KitsuneGift());
        //		this.add(new Consumable("KitGift","KitGift", "a kitsune's gift", m.kitsunesGift, "A small square package given to you by a forest kitsune.  It is wrapped up in plain white paper and tied with a string.  Who knows what's inside?", 0));
        this.add(new Consumable("KnottyP", "KnottyP", "a knotty canine pepper", 10, "This knotted pepper is very swollen, with a massive, distended knot near the base.", Utils.curry(m.caninePepper, 4));
        this.add(new Consumable("L.Draft", "LustDraft", "a vial of roiling bubble-gum pink fluid", 20, "This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape.  It smells very sweet, and has \"Lust\" inscribed on the side of the vial.", Utils.curry(m.lustDraft, false));
        this.add(new Consumable("L.BlkEg", "L.BlkEg", "a large rubbery black egg", 0, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.  For all you know, it could turn you into rubber!", Utils.curry(m.blackRubberEgg, true));
        this.add(new Consumable("L.BluEg", "L.BluEg", "a large blue and white mottled egg", 0, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.blueEgg, true));
        this.add(new Consumable("L.BrnEg", "L.BrnEg", "a large brown and white mottled egg", 0, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.brownEgg, true));
        this.add(new Consumable("L.PnkEg", "L.PnkEg", "a large pink and white mottled egg", 0, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.pinkEgg, true));
        this.add(new Consumable("L.PrpEg", "L.PrpEg", "a large purple and white mottled egg", 0, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.purpleEgg, true));
        this.add(new Consumable("L.WhtEg", "L.WhtEg", "a large white egg", 0, "This is an oblong egg, not much different from an ostrich egg in appearance.  Something tells you it's more than just food.", Utils.curry(m.whiteEgg, true));
        this.add(new Consumable("LaBova ", "La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", 0, "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.", Utils.curry(m.laBova, true, false));
        this.add(new Consumable("Lactaid", "Lactaid", "a pink bottle labelled \"Lactaid\"", 0, "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction.", m.lactaid);
        this.add(new Consumable("LargePp", "LargePp", "an overly large canine pepper", 10, "This large canine pepper is much bigger than any normal peppers you've seen.", Utils.curry(m.caninePepper, 1));
        this.add(new LustStick());
        this.add(new Consumable("M. Milk", "M. Milk", "a clear bottle of milk from Marble", 0, "A clear bottle of milk from Marble's breasts. It smells delicious.", m.useMarbleMilk);
        this.add(new Consumable("MagSeed", "MagSeed", "a magically-enhanced golden seed", 0, "This seed glows with power.  It's been enhanced by Lumi to unlock its full potential, allowing it to transform you more easily.", Utils.curry(m.goldenSeed, 1));
        this.add(new Consumable("MghtyVg", "MghtyVg", "a mightily enhanced piece of kanga fruit", 0, "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them.  It glows slightly from Lumi's enhancements.", Utils.curry(m.kangaFruit, 1));
        this.add(new Consumable("MouseCo", "MouseCo", "a handful of mouse cocoa", 0, "A handful of rare aromatic beans with sharp creases in the middle, making them look like small mouse ears.  Allegedly very popular and plentiful before the mice-folk were wiped out.", m.mouseCocoa);
        this.add(new Consumable("MinoBlo", "MinoBlo", "a vial of Minotaur blood", 0, "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape.", m.minotaurBlood);
        this.add(new Consumable("MinoCum", "MinoCum", "a sealed bottle of minotaur cum", 60, "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown.", m.minotaurCum);
        this.add(new Consumable("MystJwl", "MystJwl", "a mystic jewel", 20, "The flames within this jewel glow brighter than before, and have taken on a sinister purple hue.  It has been enhanced to increase its potency, allowing it to transform you more easily, but may have odd side-effects...", Utils.curry(m.foxJewel, true));
        this.add(new Consumable("NumbRox", "Numb Rox", "a strange packet of candy called 'Numb Rocks'", 15, "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious.", m.numbRocks);
        this.add(new Consumable("NPnkEgg", "NPnkEgg", "a neon pink egg", 0, "This is an oblong egg with an unnatural neon pink coloration.  It tingles in your hand with odd energies that make you feel as if you could jump straight into the sky.", Utils.curry(m.neonPinkEgg, false));
        this.add(new Consumable("OrangDy", "OrangDy", "a vial of brilliant orange hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "bright orange"));
        this.add(new OvipositionElixir());
        this.add(new Consumable("P.Draft", "P.Draft", "an untainted Incubi draft", 20, "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use.", Utils.curry(m.incubiDraft, false));
        //this.add(new Consumable("P.LBova", "P.LBova", "a bottle containing a white fluid labeled \"Pure LaBova\"", Utils.curry(m.laBova, false, false), "A bottle containing a misty fluid with a grainy texture); it has a long neck and a ball-like base.  The label has a stylized picture of a well-endowed cow-girl nursing two guys while they jerk themselves off. It has been purified by Rathazul.");
        //this.add(new Consumable("P.Pearl", "P.Pearl", "a pure pearl", m.purePearl, null, 1000));
        this.add(new Consumable("P.S.Mlk", "P.S.Mlk", "an untainted bottle of Succubi milk", 20, "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"  Purified by Rathazul to prevent corruption.", Utils.curry(m.succubiMilk, false));
        this.add(new PhoukaWhiskey());
        this.add(new Consumable("PeppWht", "PeppWht", "a vial of peppermint white", 120, "This tightly corked glass bottle gives off a pepperminty smell and reminds you of the winter holidays.  How odd.", function (player: Player): void { getGame().peppermintWhite(player) });
        this.add(new Consumable("PinkDye", "PinkDye", "a vial of bright pink hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "neon pink"));
        this.add(new Consumable("PinkEgg", "PinkEgg", "a pink and white mottled egg", 0, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.pinkEgg, false));
        this.add(new Consumable("PrFruit", "PrFruit", "a purple fruit", 0, "This sweet-smelling produce looks like an eggplant, but feels almost squishy, and rubbery to the touch. Holding it to your ear, you think you can hear some fluid sloshing around inside.", m.purpleFruitEssrayle);
        this.add(new Consumable("ProBova", "ProBova", "a bottle containing a misty fluid labeled \"ProBova\"", 0, "This cloudy potion has been enhanced by the alchemist Lumi to imbue its drinker with cow-like attributes.", Utils.curry(m.laBova, true, true));
        this.add(new Consumable("PSDelit", "PSDelit", "an untainted bottle of \"Succubi's Delight\"", 20, "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption.", Utils.curry(m.succubisDelight, false));
        this.add(new BeeHoney(true, false));
        this.add(new Consumable("PurpDye", "PurpDye", "a vial of purple hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "purple"));
        this.add(new Consumable("PurPeac", "PurPeac", "a pure peach", 10, "This is a peach from Minerva's spring, yellowy-orange with red stripes all over it.", m.purityPeach);
        this.add(new Consumable("PurplEg", "PurplEg", "a purple and white mottled egg", 0, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.", Utils.curry(m.purpleEgg, false));
        this.add(new Consumable("Red Dye", "Red Dye", "a vial of red hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "red"));
        this.add(new Consumable("Reptlum", "Reptlum", "a vial of Reptilum", 0, "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way.", m.reptilum);
        this.add(new Reducto());
        this.add(new Consumable("RingFig", "RingFig", "a ringtail fig", 0, "A dried fig with two lobes and thin dark rings just below its stem.  The skin is wrinkly and it looks vaguely like a bulging scrotum.", m.ringtailFig);
        this.add(new RizzaRoot());
        this.add(new Consumable("S.Dream", "S.Dream", "a bottle of 'Succubus' Dream'", 0, "This precious fluid is often given to men a succubus intends to play with for a long time, though this batch has been enhanced by Lumi to have even greater potency.", m.succubisDream);
        this.add(new Consumable("S.Gossr", "S.Gossr", "a bundle of pink, gossamer webbing", 0, "These stUtils.rands of gooey pink gossamer seem quite unlike the normal silk that spider-morphs produce.  It smells sweet and is clearly edible, but who knows what it might do to you?", Utils.curry(m.sweetGossamer, 0));
        this.add(new Consumable("SDelite", "Sucb.Delite", "a bottle of 'Succubi's Delight'", 0, "This precious fluid is often given to men a succubus intends to play with for a long time.", Utils.curry(m.succubisDelight, true));
        this.add(new Consumable("SensDrf", "Sens. Draft", "a bottle of sensitivity draft", 15, "This carefully labelled potion is a 'Sensitivity Draft', and if the diagrams are any indication, it will make your body more sensitive.", m.sensitivityDraft);
        this.add(new Consumable("Shark.T", "Shark.T", "a sharp shark tooth", 0, "A glinting white tooth, very sharp and intimidating.", Utils.curry(m.sharkTooth, 0));
        this.add(new Consumable("SheepMk", "SheepMk", "a bottle of sheep milk", 0, "This bottle of sheep milk is said to have corruption-fighting properties.  It may be useful.", m.sheepMilk);
        this.add(new Consumable("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.", m.scholarsTea);
        this.add(new Consumable("SnakOil", "SnakOil", "a vial of snake oil", 0, "A vial the size of your fist made of dark brown glass. It contains what appears to be an oily, yellowish liquid. The odor is abominable.", m.snakeOil);
        this.add(new BeeHoney(false, true));
        this.add(new Consumable("SucMilk", "SucMilk", "a bottle of Succubi milk", 0, "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"", Utils.curry(m.succubiMilk, true));
        this.add(new Consumable("TrapOil", "TrapOil", "a vial of trap oil", 0, "A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous.", m.trapOil);
        this.add(new Consumable("TScroll", "TScroll", "a tattered scroll", 0, "This tattered scroll is written in strange symbols, yet you have the feeling that if you tried to, you could decipher it.", m.tatteredScroll);
        this.add(new Consumable("TSTooth", "TSTooth", "a glowing tiger shark tooth", 0, "This looks like a normal shark tooth, though with an odd purple glow.", Utils.curry(m.sharkTooth, 1));
        this.add(new Consumable("Vital T", "Vitality T.", "a vitality tincture", 0, "This potent tea is supposedly good for strengthening the body.", m.vitalityTincture);
        this.add(new Consumable("VixVigr", "VixVigr", "a bottle labelled \"Vixen's Vigor\"", 30, "This small medicine bottle contains something called \"Vixen's Vigor\", supposedly distilled from common fox-berries.  It is supposed to be a great deal more potent, and a small warning label warns of \"extra boobs\", whatever that means.", Utils.curry(m.foxTF, true));
        this.add(new Consumable("W. Book", "W. Book", "a small book with a pristine white cover", 40, "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it.", m.whiteSpellbook);
        this.add(new Consumable("W.Fruit", "W.Fruit", "a piece of whisker-fruit", 0, "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides.", m.catTransformation);
        this.add(new WingStick());
        this.add(new Consumable("WetClth", "WetClth", "a wet cloth dripping with slippery slime", 0, "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect.", m.gooGasmic);
        this.add(new Consumable("WhiteDy", "WhiteDy", "a vial of white hair dye", 0, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.", Utils.curry(m.hairDye, "white"));
        this.add(new Consumable("WhiteEg", "WhiteEg", "a milky-white egg", 0, "This is an oblong egg, not much different from a chicken egg in appearance.  Something tells you it's more than just food.", Utils.curry(m.whiteEgg, false));

        this.add(new Consumable("PrnsPkr", "PrnsPkr", "a vial of pinkish fluid", 0, "A vial filled with a viscous pink liquid.", m.princessPucker);

        this.add(new Consumable("HrblCnt", "HrblCnt", "a bundle of verdant green leaves", 0, "A small bundle of verdant green leaves.", m.herbalContraceptive);
    }
	public enum LARGE_EGGS = [L_BLKEG,L_BLUEG,L_BRNEG,L_PNKEG,L_PRPEG,L_WHTEG];
	public enum SMALL_EGGS = [BLACKEG,BLUEEGG,BROWNEG,PINKEGG,PURPLEG,WHITEEG];
	private mutations:Mutations;

	private get m():Mutations{
		if (mutations == null) {
			mutations = new Mutations();
		}
		return mutations;
	}
}
