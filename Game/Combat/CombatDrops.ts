import { Character } from '../Character/Character';
import { EquipSlot } from '../Inventory/EquipSlot';
import { Item } from '../Items/Item';
import { CockSockName } from '../Items/Misc/CockSockName';
import { NextScreenChoices } from '../ScreenDisplay';
import { InGameMenus } from '../Menus/InGame/InGameMenus';

export function awardPlayer(character: Character, enemy: Character): NextScreenChoices {
    const gildedCockSock = character.inventory.equipment.cockSocks.find(EquipSlot.FilterName(CockSockName.Gilded));
    if (gildedCockSock && gildedCockSock.observedObject) {
        enemy.inventory.gems += enemy.inventory.gems * 0.15 + 5 * gildedCockSock.observedObject.length;
    }
    enemy.combat.respond.onReward();
    character.inventory.gems += enemy.combat.rewards.gems();
    character.stats.XP += enemy.combat.rewards.XP();
    const item = dropItem(enemy);
    if (item) {
        return character.inventory.items.createAdd(character, item.name, InGameMenus.Player);
    }
    return { next: InGameMenus.Player };
}

function dropItem(enemy: Character): Item | undefined {
    if (enemy.combat.rewards.drop) {
        const item = enemy.combat.rewards.drop.roll();
        if (item) {
            enemy.combat.respond.onRewardItem(item); // Each monster can now override the default award text
            return item;
        }
    }
    return;
}
