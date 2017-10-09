import InventoryDisplay from '../display/InventoryDisplay';
import MainScreen from '../display/MainScreen';
import Flags, { FlagEnum } from '../Game/Flags';
import Item from '../Items/Item';
import ItemStack from '../Items/ItemStack';
import Monster from '../Monster';
import Player from '../Player';
import Utils from '../Utilities/Utils';

export default class CombatDrops {
    public static dropItem(monster: Monster): Item {
        if (monster.statusAffects.has("NoLoot")) {
            return;
        }
        let item: Item = monster.dropLoot();
        if (monster.short == "tit-fucked Minotaur") {
            item = consumables.MINOCUM;
        }
        if (monster instanceof Minotaur) {
            if (monster.weaponName == "axe") {
                if (Utils.rand(2) == 0) {
                    //50% breakage!
                    if (Utils.rand(2) == 0) {
                        item = weapons.L__AXE;
                        if (player.tallness < 78) {
                            MainScreen.text("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ", false);
                            if (Utils.rand(2) == 0) item = null;
                            else item = consumables.SDELITE;
                        }
                        //Not too tall, dont rob of axe!
                        else plotFight = true;
                    }
                    else MainScreen.text("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ", false);
                }
                else item = consumables.MINOBLO;
            }
        }
        if (monster instanceof BeeGirl) {
            //force honey drop if milked
            if (Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] == 1) {
                if (Utils.rand(2) == 0) item = consumables.BEEHONY;
                else item = consumables.PURHONY;
                Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] = 0;
            }
        }
        if (monster instanceof Jojo && monk > 4) {
            if (Utils.rand(2) == 0) item = consumables.INCUBID;
            else {
                if (Utils.rand(2) == 0) item = consumables.B__BOOK;
                else item = consumables.SUCMILK;
            }
        }
        if (monster instanceof Harpy || monster instanceof Sophie) {
            if (Utils.rand(10) == 0) item = armors.W_ROBES;
            else if (Utils.rand(3) == 0 && player.perks.has("LuststickAdapted")) item = consumables.LUSTSTK;
            else item = consumables.GLDSEED;
        }
        //Chance of armor if at level 1 pierce fetish
        if (!plotFight && !(monster instanceof Ember) && !(monster instanceof Kiha) && !(monster instanceof Hel) && !(monster instanceof Isabella)
            && Flags.list[FlagEnum.PC_FETISH] == 1 && Utils.rand(10) == 0 && !player.inventory.items.has(armors.SEDUCTA, 1) && !ceraphFollowerScene.ceraphIsFollower()) {
            item = armors.SEDUCTA;
        }

        if (!plotFight && Utils.rand(200) == 0 && player.level >= 7) item = consumables.BROBREW;
        if (!plotFight && Utils.rand(200) == 0 && player.level >= 7) item = consumables.BIMBOLQ;
        //Chance of eggs if Easter!
        if (!plotFight && Utils.rand(6) == 0 && isEaster()) {
            let temp = Utils.rand(13);
            if (temp == 0) item = consumables.BROWNEG;
            if (temp == 1) item = consumables.L_BRNEG;
            if (temp == 2) item = consumables.PURPLEG;
            if (temp == 3) item = consumables.L_PRPEG;
            if (temp == 4) item = consumables.BLUEEGG;
            if (temp == 5) item = consumables.L_BLUEG;
            if (temp == 6) item = consumables.PINKEGG;
            if (temp == 7) item = consumables.NPNKEGG;
            if (temp == 8) item = consumables.L_PNKEG;
            if (temp == 9) item = consumables.L_WHTEG;
            if (temp == 10) item = consumables.WHITEEG;
            if (temp == 11) item = consumables.BLACKEG;
            if (temp == 12) item = consumables.L_BLKEG;
        }
        //Bonus loot overrides others
        if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] != "") {
            item = ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]);
        }
        monster.handleAwardItemText(item); //Each monster can now override the default award text
        return item;
    }
    
    public static awardPlayer(player: Player, monster: Monster) {
        if (player.countCockSocks("gilded") > 0) {
            monster.stats.gems += monster.stats.gems * 0.15 + 5 * player.lowerBody.cockSpot.cockSocks("gilded").length;
        }
        monster.handleAwardText(); //Each monster can now override the default award text
        let item = CombatDrops.dropItem(monster);
        if (item != null) {
            InventoryDisplay.addItem(item);
            InventoryDisplay.displayPlayersInventory(player);
        }
        player.stats.gems += monster.stats.gems;
        player.stats.XP += monster.stats.XP;
    }
}