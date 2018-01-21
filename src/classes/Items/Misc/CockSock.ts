import CockSockName from './CockSockName';
import Cock from '../../Body/Cock';
import Character from '../../Character/Character';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import EquipmentSlot from '../../Inventory/EquipmentSlot';
import EquipableItem from '../EquipableItem';
import ItemType from '../ItemType';

export default class CockSock extends EquipableItem {
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
                character.perks.set(PerkType.LustyRegeneration, PerkFactory.create(PerkType.LustyRegeneration));
            }
        }
        else if (this.name === CockSockName.Cockring) {
            if (!character.perks.has(PerkType.PentUp)) {
                character.perks.set(PerkType.PentUp, PerkFactory.create(PerkType.PentUp));
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
