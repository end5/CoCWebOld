import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import DisplayText from '../display/DisplayText';
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
import CockSockName from '../Items/Misc/CockSockName';
import WeaponName from '../Items/Weapons/WeaponName';
import DateUtils from '../Utilities/DateUtils';
import { Utils } from '../Utilities/Utils';

export default class CombatDrops {
    public static awardPlayer(character: Character, enemy: Character) {
        if (character.inventory.equipment.cockSocks.hasCockSock(CockSockName.Gilded)) {
            const cockIndex = character.inventory.equipment.cockSocks.indexOfCockSock(CockSockName.Gilded);
            enemy.inventory.gems += enemy.inventory.gems * 0.15 + 5 * character.torso.cocks.get(cockIndex).length;
        }
        enemy.combat.rewards.onReward();
        const item = CombatDrops.dropItem(character, enemy);
        if (item !== undefined) {
            character.inventory.items.add(character, [new ItemStack(item, 1)], Menus.Player.display);
        }
        character.inventory.gems += enemy.combat.rewards.gems();
        character.stats.XP += enemy.combat.rewards.XP();
    }

    public static dropItem(character: Character, enemy: Character): Item {
        if (enemy.statusAffects.has(StatusAffectType.NoLoot)) {
            return;
        }
        let item: Item = enemy.combat.rewards.drop().roll();
        if (enemy.desc.short === "tit-fucked Minotaur") {
            item = ItemFactory.get(ItemType.Consumable, ConsumableName.MinotaurCum);
        }
        if (enemy.charType === CharacterType.Minotaur) {
            if (enemy.inventory.equipment.weapon.displayname === "axe") {
                if (Utils.rand(2) === 0) {
                    // 50% breakage!
                    if (Utils.rand(2) === 0) {
                        item = ItemFactory.get(ItemType.Weapon, WeaponName.LargeAxe);
                        if (character.tallness < 78) {
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
        if (enemy.charType === CharacterType.BeeGirl) {
            // force honey drop if milked
            if (Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] === 1) {
                if (Utils.rand(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BeeHoney);
                else item = ItemFactory.get(ItemType.Consumable, ConsumableName.BeeHoneyPure);
                Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] = 0;
            }
        }
        if (enemy.charType === CharacterType.Jojo && Plot.monk > 4) {
            if (Utils.rand(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.IncubusDraft);
            else {
                if (Utils.rand(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BlackSpellbook);
                else item = ItemFactory.get(ItemType.Consumable, ConsumableName.SuccubiMilk);
            }
        }
        if (enemy.charType === CharacterType.Harpy || enemy.charType === CharacterType.Sophie) {
            if (Utils.rand(10) === 0) item = ItemFactory.get(ItemType.Armor, ArmorName.WizardRobes);
            else if (Utils.rand(3) === 0 && character.perks.has(PerkType.LuststickAdapted)) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LustStick);
            else item = ItemFactory.get(ItemType.Consumable, ConsumableName.GoldenSeed);
        }
        // Chance of armor if at level 1 pierce fetish
        if (!plotFight &&
            (enemy.charType !== CharacterType.Ember &&
                enemy.charType !== CharacterType.Kiha &&
                enemy.charType !== CharacterType.Hel &&
                enemy.charType !== CharacterType.Isabella) &&
            Flags.list[FlagEnum.PC_FETISH] === 1 &&
            Utils.rand(10) === 0 &&
            !character.inventory.items.has(ArmorName.SeductiveArmor) &&
            !ceraphFollowerScene.ceraphIsFollower()
        ) {
            item = ItemFactory.get(ItemType.Armor, ArmorName.SeductiveArmor);
        }

        if (!plotFight && Utils.rand(200) === 0 && character.stats.level >= 7) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BroBrew);
        if (!plotFight && Utils.rand(200) === 0 && character.stats.level >= 7) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BimboLiqueur);
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
        enemy.combat.rewards.onRewardItem(item); // Each monster can now override the default award text
        return item;
    }
}
