import Consumable from './Consumable';
import InventoryDisplay from '../../display/InventoryDisplay';
import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class KitsuneGift extends Consumable {

    public constructor() {
        super("KitGift", new ItemDesc("KitGift", "a kitsune's gift", "A small square package given to you by a forest kitsune.  It is wrapped up in plain white paper and tied with a string.  Who knows what's inside?"));
    }

    public canUse(player: Player) {
        return true;
    }

    public use(player: Player) {
        MainScreen.clearText();
        MainScreen.text("Curiosity gets the best of you, and you decide to open the package.  After all, what's the worst that could happen?\n\n");
        //Opening the gift Utils.randomly results in one of the following:
        switch (Utils.rand(12)) {
            //[Fox Jewel]
            case 0:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, sitting in the center is a small teardrop-shaped jewel!");
                MainScreen.text("\n\n<b>You've received a shining Fox Jewel from the kitsune's gift!  How generous!</b>  ");
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(Game.libraries.consumables.get("FoxJewl"))
                    InventoryDisplay.displayPlayersInventory(player);
                }
                return (true);

            //[Fox Berries]
            case 1:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, there is a small cluster of orange-colored berries sitting in the center!");
                MainScreen.text("\n\n<b>You've received a fox berry from the kitsune's gift!  How generous!</b>  ");
                //add Fox Berries to inventory
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(Game.libraries.consumables.get("FoxJewl"))
                    InventoryDisplay.displayPlayersInventory(player);
                }
                return (true);

            //[Gems]
            case 2:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it is filled to the brim with shining gems!");
                let gems: number = 2 + Utils.rand(20);
                MainScreen.text("\n\n<b>You've received " + Utils.numToCardinalText(gems) + " shining gems from the kitsune's gift!  How generous!</b>");
                player.inventory.gems += gems;
                //add X gems to inventory
                MainScreen.updateStats(player);
                break;

            //[Kitsune Tea/Scholar's Tea] //Just use Scholar's Tea and drop the "trick" effect if you don't want to throw in another new item.
            case 3:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small bag of dried tea leaves!");
                MainScreen.text("\n\n<b>You've received a bag of tea from the kitsune's gift!  How thoughtful!</b>  ");
                //add Kitsune Tea/Scholar's Tea to inventory
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(Game.libraries.consumables.get("FoxJewl"))
                    InventoryDisplay.displayPlayersInventory(player);
                }
                return (true);

            //[Hair Dye]
            case 4:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small vial filled with hair dye!");
                let randomHairDye: Consumable = [
                    Game.libraries.consumables.get("Red Dye"),
                    Game.libraries.consumables.get("Blond D"),
                    Game.libraries.consumables.get("Black D"),
                    Game.libraries.consumables.get("WhiteDy")
                ][Utils.rand(4)];

                MainScreen.text("\n\n<b>You've received " + randomHairDye.desc.longName + " from the kitsune's gift!  How generous!</b>  ");
                //add <color> Dye to inventory
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(Game.libraries.consumables.get("FoxJewl"))
                    InventoryDisplay.displayPlayersInventory(player);
                }
                return (true);

            //[Knowledge Spell]
            case 5:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but it seems like there's nothing else inside.  As you peer into the box, a glowing circle filled with strange symbols suddenly flashes to life!  Light washes over you, and your mind is suddenly assaulted with new knowledge...  and the urge to use that knowledge for mischief!");

                MainScreen.text("\n\n<b>The kitsune has shared some of its knowledge with you!</b>  But in the process, you've gained some of the kitsune's promiscuous trickster nature...");
                //Increase INT and Libido, +10 LUST
                player.stats.int += 4;
                player.stats.sens += 2;
                player.stats.lust += 10;
                break;

            //[Thief!]
            case 6:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it leaps into your item pouch, then hops away and gallavants into the woods, carting off a small fortune in gems.");

                MainScreen.text("\n\n<b>The kitsune's familiar has stolen your gems!</b>");
                // Lose X gems as though losing in battle to a kitsune
                player.inventory.gems -= 2 + Utils.rand(15);
                MainScreen.updateStats(player);
                break;

            //[Prank]
            case 7:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it pulls a large calligraphy brush from thin air and leaps up into your face, then hops away and gallavants off into the woods.  Touching your face experimentally, you come away with a fresh coat of black ink on your fingertips.");

                MainScreen.text("\n\n<b>The kitsune's familiar has drawn all over your face!</b>  The resilient marks take about an hour to completely scrub off in the nearby stream.  You could swear you heard some mirthful snickering among the trees while you were cleaning yourself off.");
                //Advance time 1 hour, -20 LUST
                player.stats.lust -= 20;
                break;

            //[Aphrodisiac]
            case 8:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sweet-smelling pink dust into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel yourself growing hot and flushed, unable to keep your hands away from your groin.");
                MainScreen.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a powerful aphrodisiac!  You are debilitatingly aroused and can think of nothing other than masturbating.</b>");
                //+100 LUST
                player.stats.lustNoResist += 100;
                break;

            //[Wither]
            case 9:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sour-smelling orange powder into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel the strength draining from your muscles, withering away before your eyes.");
                MainScreen.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a strength draining spell!  Hopefully it's only temporary...</b>");
                player.stats.str -= 5;
                player.stats.tou -= 5;
                break;

            //[Dud]
            case 10:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.");
                MainScreen.text("\n\n<b>It seems the kitsune's gift was just a pile of useless junk!  What a ripoff!</b>");
                break;

            //[Dud...  Or is it?]
            case 11:
                MainScreen.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.  Upon further investigation, though, you find a shard of shiny black chitinous plating mixed in with the other useless junk.");
                MainScreen.text("\n\n<b>At least you managed to salvage a shard of black chitin from it...</b>  ");
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(Game.libraries.materials.get("B.Chitn"))
                    InventoryDisplay.displayPlayersInventory(player);
                }
                return (true);

            default: console.trace("Kitsune's gift roll foobar...");
        }
        return (false); //Any other case does not have a sub-menu.
    }
}

