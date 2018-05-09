import { CockSockName } from './CockSockName';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { EquipableItem } from '../EquipableItem';
import { ItemType } from '../ItemType';

export class CockSock extends EquipableItem {
    public constructor(name: CockSockName) {
        super(name, ItemType.Misc, undefined);
    }

    public equipText(): void { }

    public unequipText(): void { }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) { }

    public useText(character: Character) { }

    public onEquip(character: Character) {
        if (this.name === CockSockName.Viridian) {
            if (!character.perks.has(PerkType.LustyRegeneration)) {
                character.perks.add(PerkType.LustyRegeneration, 0, 0, 0, 0);
            }
        }
        else if (this.name === CockSockName.Cockring) {
            if (!character.perks.has(PerkType.PentUp)) {
                character.perks.add(PerkType.PentUp, 0, 0, 0, 0);
            }
            else {
                const numRings: number = character.inventory.equipment.cockSocks.reduce((prev, cur) => {
                    if (cur.isEquipped() && cur.item.name === CockSockName.Cockring)
                        prev++;
                    return prev;
                }, -1);
                character.perks.get(PerkType.PentUp).value1 = 5 + (numRings * 5);
            }
        }
    }

    public onUnequip(character: Character) {
        if (this.name === CockSockName.Viridian) {
            if (character.perks.has(PerkType.LustyRegeneration)) {
                character.perks.remove(PerkType.LustyRegeneration);
            }
        }
        else if (this.name === CockSockName.Cockring) {
            if (character.perks.has(PerkType.PentUp)) {
                const numRings: number = character.inventory.equipment.cockSocks.reduce((prev, cur) => {
                    if (cur.isEquipped() && cur.item.name === CockSockName.Cockring)
                        prev++;
                    return prev;
                }, -1);
                if (numRings === 0) {
                    character.perks.remove(PerkType.PentUp);
                }
                else
                    character.perks.get(PerkType.PentUp).value1 = 5 + (numRings * 5);
            }
        }
    }
}
