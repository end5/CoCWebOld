import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import DisplayText from '../display/DisplayText';
import InventoryDisplay from '../display/InventoryDisplay';
import Menus from '../display/Menus/Menus';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import ItemStack from '../Inventory/ItemStack';
import ArmorName from '../Items/Armors/ArmorName';
import ConsumableName from '../Items/Consumables/ConsumableName';
import Item from '../Items/Item';
import ItemFactory from '../Items/ItemFactory';
import ItemType from '../Items/ItemType';
import CockSock from '../Items/Misc/CockSock';
import CockSockName from '../Items/Misc/CockSockName';
import WeaponName from '../Items/Weapons/WeaponName';
import Player from '../Player/Player';
import DateUtils from '../Utilities/DateUtils';
import { Utils } from '../Utilities/Utils';

export default class CombatDrops {
    public static awardPlayer(player: Player, monster: Character) {
        if (player.inventory.equipment.cockSocks.hasCockSock(CockSockName.Gilded)) {
            const cockIndex = player.inventory.equipment.cockSocks.indexOfCockSock(CockSockName.Gilded);
            monster.inventory.gems += monster.inventory.gems * 0.15 + 5 * player.torso.cocks.get(cockIndex).length;
        }
        monster.combat.rewards.onReward();
        const item = CombatDrops.dropItem(player, monster);
        if (item !== undefined) {
            player.inventory.items.add(player, [new ItemStack(item, 1)], Menus.Player.display);
        }
        player.inventory.gems += monster.combat.rewards.gems();
        player.stats.XP += monster.combat.rewards.XP();
    }

    public static dropItem(player: Player, monster: Character): Item {
        if (monster.statusAffects.has(StatusAffectType.NoLoot)) {
            return;
        }
        let item: Item = monster.combat.rewards.drop().roll();
        if (monster.desc.short === "tit-fucked Minotaur") {
            item = ItemFactory.get(ItemType.Consumable, ConsumableName.MinotaurCum);
        }
        if (monster.charType === CharacterType.Minotaur) {
            if (monster.inventory.equipment.weapon.displayname === "axe") {
                if (Utils.rand(2) === 0) {
                    // 50% breakage!
                    if (Utils.rand(2) === 0) {
                        item = ItemFactory.get(ItemType.Weapon, WeaponName.LargeAxe);
                        if (player.tallness < 78) {
                            DisplayText("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ");
                            if (Utils.rand(2) === 0) item = null;
                            else item = ItemFactory.get(ItemType.Consumable, ConsumableName.SuccubisDelight);
                        }
                        // Not too tall, dont rob of axe!
                        else plotFight = true;
                    }
                    else DisplayText("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ");
                }
                else item = ItemFactory.get(ItemType.Consumable, ConsumableName.MinotaurBlood);
            }
        }
        if (monster.charType === CharacterType.BeeGirl) {
            // force honey drop if milked
            if (Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] === 1) {
                if (Utils.rand(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BeeHoney);
                else item = ItemFactory.get(ItemType.Consumable, ConsumableName.BeeHoneyPure);
                Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] = 0;
            }
        }
        if (monster.charType === CharacterType.Jojo && Plot.monk > 4) {
            if (Utils.rand(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.IncubusDraft);
            else {
                if (Utils.rand(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BlackSpellbook);
                else item = ItemFactory.get(ItemType.Consumable, ConsumableName.SuccubiMilk);
            }
        }
        if (monster.charType === CharacterType.Harpy || monster.charType === CharacterType.Sophie) {
            if (Utils.rand(10) === 0) item = ItemFactory.get(ItemType.Armor, ArmorName.WizardRobes);
            else if (Utils.rand(3) === 0 && player.perks.has(PerkType.LuststickAdapted)) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LustStick);
            else item = ItemFactory.get(ItemType.Consumable, ConsumableName.GoldenSeed);
        }
        // Chance of armor if at level 1 pierce fetish
        if (!plotFight &&
            (monster.charType !== CharacterType.Ember &&
                monster.charType !== CharacterType.Kiha &&
                monster.charType !== CharacterType.Hel &&
                monster.charType !== CharacterType.Isabella) &&
            Flags.list[FlagEnum.PC_FETISH] === 1 &&
            Utils.rand(10) === 0 &&
            !player.inventory.items.has(ArmorName.SeductiveArmor) &&
            !ceraphFollowerScene.ceraphIsFollower()
        ) {
            item = ItemFactory.get(ItemType.Armor, ArmorName.SeductiveArmor);
        }

        if (!plotFight && Utils.rand(200) === 0 && player.stats.level >= 7) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BroBrew);
        if (!plotFight && Utils.rand(200) === 0 && player.stats.level >= 7) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BimboLiqueur);
        // Chance of eggs if Easter!
        if (!plotFight && Utils.rand(6) === 0 && DateUtils.isEaster()) {
            const temp = Utils.rand(13);
            if (temp === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.EggBlack);
            if (temp === 1) item = ItemFactory.get(ItemType.Consumable, ConsumableName.EggBlue);
            if (temp === 2) item = ItemFactory.get(ItemType.Consumable, ConsumableName.EggBrown);
            if (temp === 3) item = ItemFactory.get(ItemType.Consumable, ConsumableName.EggPink);
            if (temp === 4) item = ItemFactory.get(ItemType.Consumable, ConsumableName.EggPurple);
            if (temp === 5) item = ItemFactory.get(ItemType.Consumable, ConsumableName.EggWhite);
            if (temp === 6) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LargeEggBlack);
            if (temp === 7) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LargeEggBlue);
            if (temp === 8) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LargeEggBrown);
            if (temp === 9) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LargeEggPink);
            if (temp === 10) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LargeEggPurple);
            if (temp === 11) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LargeEggWhite);
            if (temp === 12) item = ItemFactory.get(ItemType.Consumable, ConsumableName.NeonPinkEgg);
        }
        // Bonus loot overrides others
        if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] !== "") {
            item = ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]);
        }
        monster.combat.rewards.onRewardItem(item); // Each monster can now override the default award text
        return item;
    }
}
