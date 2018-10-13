import { randInt } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import { StatusEffectType } from '../Effects/StatusEffectType';
import { EquipSlot } from '../Inventory/EquipSlot';
import { ConsumableName } from '../Items/Consumables/ConsumableName';
import { Item } from '../Items/Item';
import { ItemType } from '../Items/ItemType';
import { CockSockName } from '../Items/Misc/CockSockName';
import { WeaponName } from '../Items/Weapons/WeaponName';
import { NextScreenChoices } from '../ScreenDisplay';
import { isEaster } from '../Utilities/Dates';
import { campMenu } from '../Menus/InGame/PlayerMenu';
import { ConsumableLib } from '../Items/Consumables/ConsumableLib';
import { WeaponLib } from '../Items/Weapons/WeaponLib';
import { CView } from '../../Engine/Display/ContentView';

export class CombatDrops {
    public static awardPlayer(character: Character, enemy: Character): NextScreenChoices {
        const gildedCockSock = character.inventory.equipment.cockSocks.find(EquipSlot.FilterName(CockSockName.Gilded));
        if (gildedCockSock) {
            const cockIndex = character.inventory.equipment.cockSocks.indexOf(gildedCockSock);
            enemy.inventory.gems += enemy.inventory.gems * 0.15 + 5 * character.body.cocks.get(cockIndex).length;
        }
        enemy.combat.rewards.onReward();
        character.inventory.gems += enemy.combat.rewards.gems();
        character.stats.XP += enemy.combat.rewards.XP();
        const item = CombatDrops.dropItem(character, enemy);
        if (item) {
            return character.inventory.items.createAdd(character, item.type, item.name, campMenu);
        }
    }

    public static dropItem(character: Character, enemy: Character): Item {
        if (enemy.effects.has(StatusEffectType.NoLoot)) {
            return;
        }
        let item: Item = enemy.combat.rewards.drop().roll();
        if (enemy.desc.short === "tit-fucked Minotaur") {
            item = ConsumableLib.get(ConsumableName.MinotaurCum);
        }
        if (enemy.charType === CharacterType.Minotaur) {
            if (enemy.inventory.equipment.weapon.displayName === "axe") {
                if (randInt(2) === 0) {
                    // 50% breakage!
                    if (randInt(2) === 0) {
                        item = WeaponLib.get(WeaponName.LargeAxe);
                        if (character.body.tallness < 78) {
                            CView.text("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ");
                            if (randInt(2) === 0) item = undefined;
                            else item = ConsumableLib.get(ConsumableName.SuccubisDelight);
                        }
                        // Not too tall, dont rob of axe!
                        // else plotFight = true;
                    }
                    else CView.text("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ");
                }
                else item = ConsumableLib.get(ConsumableName.MinotaurBlood);
            }
        }
        // if (enemy.charType === CharacterType.BeeGirl) {
        //     // force honey drop if milked
        //     if (Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] === 1) {
        //         if (randInt(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BeeHoney);
        //         else item = ItemFactory.get(ItemType.Consumable, ConsumableName.BeeHoneyPure);
        //         Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] = 0;
        //     }
        // }
        // if (enemy.charType === CharacterType.Jojo) { // && Plot.monk > 4) {
        //     if (randInt(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.IncubusDraft);
        //     else {
        //         if (randInt(2) === 0) item = ItemFactory.get(ItemType.Consumable, ConsumableName.BlackSpellbook);
        //         else item = ItemFactory.get(ItemType.Consumable, ConsumableName.SuccubiMilk);
        //     }
        // }
        // if (enemy.charType === CharacterType.Harpy || enemy.charType === CharacterType.Sophie) {
        //     if (randInt(10) === 0) item = ItemFactory.get(ItemType.Armor, ArmorName.WizardRobes);
        //     else if (randInt(3) === 0 && character.perks.has(PerkType.LuststickAdapted)) item = ItemFactory.get(ItemType.Consumable, ConsumableName.LustStick);
        //     else item = ItemFactory.get(ItemType.Consumable, ConsumableName.GoldenSeed);
        // }
        // Chance of armor if at level 1 pierce fetish
        // if ((enemy.charType !== CharacterType.Ember &&
        //         enemy.charType !== CharacterType.Kiha &&
        //         enemy.charType !== CharacterType.Hel &&
        //         enemy.charType !== CharacterType.Isabella) &&
        //     Flags.list[FlagEnum.PC_FETISH] === 1 &&
        //     randInt(10) === 0 &&
        //     !character.inventory.items.has(ArmorName.SeductiveArmor)
        // ) {
        //     item = ItemFactory.get(ItemType.Armor, ArmorName.SeductiveArmor);
        // }

        if (randInt(200) === 0 && character.stats.level >= 7) item = ConsumableLib.get(ConsumableName.BroBrew);
        if (randInt(200) === 0 && character.stats.level >= 7) item = ConsumableLib.get(ConsumableName.BimboLiqueur);
        // Chance of eggs if Easter!
        if (randInt(6) === 0 && isEaster()) {
            const temp = randInt(13);
            if (temp === 0) item = ConsumableLib.get(ConsumableName.EggBlack);
            if (temp === 1) item = ConsumableLib.get(ConsumableName.EggBlue);
            if (temp === 2) item = ConsumableLib.get(ConsumableName.EggBrown);
            if (temp === 3) item = ConsumableLib.get(ConsumableName.EggPink);
            if (temp === 4) item = ConsumableLib.get(ConsumableName.EggPurple);
            if (temp === 5) item = ConsumableLib.get(ConsumableName.EggWhite);
            if (temp === 6) item = ConsumableLib.get(ConsumableName.LargeEggBlack);
            if (temp === 7) item = ConsumableLib.get(ConsumableName.LargeEggBlue);
            if (temp === 8) item = ConsumableLib.get(ConsumableName.LargeEggBrown);
            if (temp === 9) item = ConsumableLib.get(ConsumableName.LargeEggPink);
            if (temp === 10) item = ConsumableLib.get(ConsumableName.LargeEggPurple);
            if (temp === 11) item = ConsumableLib.get(ConsumableName.LargeEggWhite);
            if (temp === 12) item = ConsumableLib.get(ConsumableName.NeonPinkEgg);
        }
        // Bonus loot overrides others
        // if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] !== "") {
        //     item = ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]);
        // }
        enemy.combat.rewards.onRewardItem(item); // Each monster can now override the default award text
        return item;
    }
}
