import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import DisplayText from '../display/DisplayText';
import InventoryDisplay from '../display/InventoryDisplay';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import { ArmorType } from '../Items/Armors/ArmorType';
import { ConsumableType } from '../Items/Consumables/ConsumableType';
import Item, { ItemType } from '../Items/Item';
import ItemFactory from '../Items/ItemFactory';
import ItemStack from '../Items/ItemStack';
import { WeaponType } from '../Items/Weapons/WeaponType';
import Player from '../Player/Player';
import DateUtils from '../Utilities/DateUtils';
import Utils from '../Utilities/Utils';

export default class CombatDrops {
    public static awardPlayer(player: Player, monster: Character) {
        if (player.lowerBody.cockSpot.cockSocks("gilded").length > 0) {
            monster.inventory.gems += monster.inventory.gems * 0.15 + 5 * player.lowerBody.cockSpot.cockSocks("gilded").length;
        }
        monster.combat.rewards.onReward();
        let item = CombatDrops.dropItem(player, monster);
        if (item != null) {
            InventoryDisplay.addItem(item);
            InventoryDisplay.displayPlayersInventory(player);
        }
        player.inventory.gems += monster.combat.rewards.gems();
        player.stats.XP += monster.combat.rewards.XP();
    }

    public static dropItem(player: Player, monster: Character): Item {
        if (monster.statusAffects.has(StatusAffectType.NoLoot)) {
            return;
        }
        let item: Item = monster.combat.rewards.drop().roll();
        if (monster.desc.short == "tit-fucked Minotaur") {
            item = ItemFactory.create(ItemType.Consumable, ConsumableType.MinotaurCum);
        }
        if (monster.charType == CharacterType.Minotaur) {
            if (monster.inventory.weaponSlot.equipment.displayname == "axe") {
                if (Utils.rand(2) == 0) {
                    //50% breakage!
                    if (Utils.rand(2) == 0) {
                        item = ItemFactory.create(ItemType.Weapon, WeaponType.LargeAxe);
                        if (player.tallness < 78) {
                            DisplayText.text("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ");
                            if (Utils.rand(2) == 0) item = null;
                            else item = ItemFactory.create(ItemType.Consumable, ConsumableType.SuccubisDelight);
                        }
                        //Not too tall, dont rob of axe!
                        else plotFight = true;
                    }
                    else DisplayText.text("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ");
                }
                else item = ItemFactory.create(ItemType.Consumable, ConsumableType.MinotaurBlood);
            }
        }
        if (monster.charType == CharacterType.BeeGirl) {
            //force honey drop if milked
            if (Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] == 1) {
                if (Utils.rand(2) == 0) item = ItemFactory.create(ItemType.Consumable, ConsumableType.BeeHoney);
                else item = ItemFactory.create(ItemType.Consumable, ConsumableType.BeeHoneyPure);
                Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] = 0;
            }
        }
        if (monster.charType == CharacterType.Jojo && Plot.monk > 4) {
            if (Utils.rand(2) == 0) item = ItemFactory.create(ItemType.Consumable, ConsumableType.IncubusDraft);
            else {
                if (Utils.rand(2) == 0) item = ItemFactory.create(ItemType.Consumable, ConsumableType.BlackSpellbook);
                else item = ItemFactory.create(ItemType.Consumable, ConsumableType.SuccubiMilk);
            }
        }
        if (monster.charType == CharacterType.Harpy || monster.charType == CharacterType.Sophie) {
            if (Utils.rand(10) == 0) item = ItemFactory.create(ItemType.Armor, ArmorType.WizardRobes);
            else if (Utils.rand(3) == 0 && player.perks.has(PerkType.LuststickAdapted)) item = ItemFactory.create(ItemType.Consumable, ConsumableType.LustStick);
            else item = ItemFactory.create(ItemType.Consumable, ConsumableType.GoldenSeed);
        }
        //Chance of armor if at level 1 pierce fetish
        if (!plotFight &&
            monster.charType != (CharacterType.Ember | CharacterType.Kiha | CharacterType.Hel | CharacterType.Isabella) &&
            Flags.list[FlagEnum.PC_FETISH] == 1 &&
            Utils.rand(10) == 0 &&
            !player.inventory.items.has(ArmorType.SeductiveArmor) &&
            !ceraphFollowerScene.ceraphIsFollower()
        ) {
            item = ItemFactory.create(ItemType.Armor, ArmorType.SeductiveArmor);
        }

        if (!plotFight && Utils.rand(200) == 0 && player.stats.level >= 7) item = ItemFactory.create(ItemType.Consumable, ConsumableType.BroBrew);
        if (!plotFight && Utils.rand(200) == 0 && player.stats.level >= 7) item = ItemFactory.create(ItemType.Consumable, ConsumableType.BimboLiqueur);
        //Chance of eggs if Easter!
        if (!plotFight && Utils.rand(6) == 0 && DateUtils.isEaster()) {
            let temp = Utils.rand(13);
            if (temp == 0) item = ItemFactory.create(ItemType.Consumable, ConsumableType.EggBlack);
            if (temp == 1) item = ItemFactory.create(ItemType.Consumable, ConsumableType.EggBlue);
            if (temp == 2) item = ItemFactory.create(ItemType.Consumable, ConsumableType.EggBrown);
            if (temp == 3) item = ItemFactory.create(ItemType.Consumable, ConsumableType.EggPink);
            if (temp == 4) item = ItemFactory.create(ItemType.Consumable, ConsumableType.EggPurple);
            if (temp == 5) item = ItemFactory.create(ItemType.Consumable, ConsumableType.EggWhite);
            if (temp == 6) item = ItemFactory.create(ItemType.Consumable, ConsumableType.LargeEggBlack);
            if (temp == 7) item = ItemFactory.create(ItemType.Consumable, ConsumableType.LargeEggBlue);
            if (temp == 8) item = ItemFactory.create(ItemType.Consumable, ConsumableType.LargeEggBrown);
            if (temp == 9) item = ItemFactory.create(ItemType.Consumable, ConsumableType.LargeEggPink);
            if (temp == 10) item = ItemFactory.create(ItemType.Consumable, ConsumableType.LargeEggPurple);
            if (temp == 11) item = ItemFactory.create(ItemType.Consumable, ConsumableType.LargeEggWhite);
            if (temp == 12) item = ItemFactory.create(ItemType.Consumable, ConsumableType.NeonPinkEgg);
        }
        //Bonus loot overrides others
        if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] != "") {
            item = ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]);
        }
        monster.combat.rewards.onRewardItem(item); //Each monster can now override the default award text
        return item;
    }
}