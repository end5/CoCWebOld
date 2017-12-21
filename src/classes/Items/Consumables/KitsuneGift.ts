import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import InventoryDisplay from '../../display/InventoryDisplay';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import Item, { ItemType } from '../Item';
import ItemDesc from '../ItemDesc';
import ItemFactory from '../ItemFactory';
import MaterialName from '../Materials/MaterialName';

export default class KitsuneGift extends Consumable {

    public constructor() {
        super(ConsumableName.KitsuneGift, new ItemDesc("KitGift", "a kitsune's gift", "A small square package given to you by a forest kitsune.  It is wrapped up in plain white paper and tied with a string.  Who knows what's inside?"));
    }

    public canUse(player: Player) {
        return true;
    }

    public use(player: Player) {
        DisplayText.clear();
        DisplayText.text("Curiosity gets the best of you, and you decide to open the package.  After all, what's the worst that could happen?\n\n");
        //Opening the gift Utils.randomly results in one of the following:
        switch (Utils.rand(12)) {
            //[Fox Jewel]
            case 0:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, sitting in the center is a small teardrop-shaped jewel!");
                DisplayText.text("\n\n<b>You've received a shining Fox Jewel from the kitsune's gift!  How generous!</b>  ");
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(ItemFactory.create(ItemType.Consumable, ConsumableName.FoxJewel));
                    InventoryDisplay.displayPlayersInventory(player);
                }
                break;

            //[Fox Berries]
            case 1:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, there is a small cluster of orange-colored berries sitting in the center!");
                DisplayText.text("\n\n<b>You've received a fox berry from the kitsune's gift!  How generous!</b>  ");
                //add Fox Berries to inventory
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(ItemFactory.create(ItemType.Consumable, ConsumableName.FoxJewel));
                    InventoryDisplay.displayPlayersInventory(player);
                }
                break;

            //[Gems]
            case 2:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it is filled to the brim with shining gems!");
                let gems: number = 2 + Utils.rand(20);
                DisplayText.text("\n\n<b>You've received " + Utils.numToCardinalText(gems) + " shining gems from the kitsune's gift!  How generous!</b>");
                player.inventory.gems += gems;
                //add X gems to inventory
                break;

            //[Kitsune Tea/Scholar's Tea] //Just use Scholar's Tea and drop the "trick" effect if you don't want to throw in another new item.
            case 3:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small bag of dried tea leaves!");
                DisplayText.text("\n\n<b>You've received a bag of tea from the kitsune's gift!  How thoughtful!</b>  ");
                //add Kitsune Tea/Scholar's Tea to inventory
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(ItemFactory.create(ItemType.Consumable, ConsumableName.FoxJewel));
                    InventoryDisplay.displayPlayersInventory(player);
                }
                break;

            //[Hair Dye]
            case 4:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small vial filled with hair dye!");
                const randomHairDye: ConsumableName = [
                    ConsumableName.HairDyeRed,
                    ConsumableName.HairDyeBlonde,
                    ConsumableName.HairDyeBlack,
                    ConsumableName.HairDyeWhite
                ][Utils.rand(4)];
                const hairDyeItem = ItemFactory.create(ItemType.Consumable, randomHairDye);

                DisplayText.text("\n\n<b>You've received " + hairDyeItem.desc.longName + " from the kitsune's gift!  How generous!</b>  ");
                //add <color> Dye to inventory
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(hairDyeItem);
                    InventoryDisplay.displayPlayersInventory(player);
                }
                break;

            //[Knowledge Spell]
            case 5:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but it seems like there's nothing else inside.  As you peer into the box, a glowing circle filled with strange symbols suddenly flashes to life!  Light washes over you, and your mind is suddenly assaulted with new knowledge...  and the urge to use that knowledge for mischief!");

                DisplayText.text("\n\n<b>The kitsune has shared some of its knowledge with you!</b>  But in the process, you've gained some of the kitsune's promiscuous trickster nature...");
                //Increase INT and Libido, +10 LUST
                player.stats.int += 4;
                player.stats.sens += 2;
                player.stats.lust += 10;
                break;

            //[Thief!]
            case 6:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it leaps into your item pouch, then hops away and gallavants into the woods, carting off a small fortune in gems.");

                DisplayText.text("\n\n<b>The kitsune's familiar has stolen your gems!</b>");
                // Lose X gems as though losing in battle to a kitsune
                player.inventory.gems -= 2 + Utils.rand(15);
                break;

            //[Prank]
            case 7:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it pulls a large calligraphy brush from thin air and leaps up into your face, then hops away and gallavants off into the woods.  Touching your face experimentally, you come away with a fresh coat of black ink on your fingertips.");

                DisplayText.text("\n\n<b>The kitsune's familiar has drawn all over your face!</b>  The resilient marks take about an hour to completely scrub off in the nearby stream.  You could swear you heard some mirthful snickering among the trees while you were cleaning yourself off.");
                //Advance time 1 hour, -20 LUST
                player.stats.lust -= 20;
                break;

            //[Aphrodisiac]
            case 8:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sweet-smelling pink dust into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel yourself growing hot and flushed, unable to keep your hands away from your groin.");
                DisplayText.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a powerful aphrodisiac!  You are debilitatingly aroused and can think of nothing other than masturbating.</b>");
                //+100 LUST
                player.stats.lustNoResist += 100;
                break;

            //[Wither]
            case 9:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sour-smelling orange powder into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel the strength draining from your muscles, withering away before your eyes.");
                DisplayText.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a strength draining spell!  Hopefully it's only temporary...</b>");
                player.stats.str -= 5;
                player.stats.tou -= 5;
                break;

            //[Dud]
            case 10:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.");
                DisplayText.text("\n\n<b>It seems the kitsune's gift was just a pile of useless junk!  What a ripoff!</b>");
                break;

            //[Dud...  Or is it?]
            case 11:
                DisplayText.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.  Upon further investigation, though, you find a shard of shiny black chitinous plating mixed in with the other useless junk.");
                DisplayText.text("\n\n<b>At least you managed to salvage a shard of black chitin from it...</b>  ");
                if (!InventoryDisplay.isHoldingItem) {
                    InventoryDisplay.addItem(ItemFactory.create(ItemType.Material, MaterialName.BlackChitin));
                    InventoryDisplay.displayPlayersInventory(player);
                }
                break;

            default: console.trace("Kitsune's gift roll foobar...");
        }
    }
}

