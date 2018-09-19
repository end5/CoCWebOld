import { EquipSlot } from './EquipSlot';
import { EquipSlotList } from './EquipSlotList';
import { PiercingInventory } from './PiercingInventory';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { ListSerializer } from '../../Engine/Utilities/ListSerializer';
import { Character } from '../Character/Character';
import { Armor } from '../Items/Armors/Armor';
import { CockSock } from '../Items/Misc/CockSock';
import { Weapon } from '../Items/Weapons/Weapon';
import { ListMonitor } from '../Utilities/ListMonitor';

export class EquipmentInventory implements ISerializable<EquipmentInventory> {
    public readonly defaultWeaponSlot: EquipSlot<Weapon>;
    public readonly equippedWeaponSlot: EquipSlot<Weapon>;
    public readonly defaultArmorSlot: EquipSlot<Armor>;
    public readonly equippedArmorSlot: EquipSlot<Armor>;
    public readonly piercings: PiercingInventory;
    public readonly cockSocks: EquipSlotList<CockSock>;
    private cocksMonitor: ListMonitor;
    public armorDescMod: string;
    private character: Character;

    public constructor(character: Character) {
        this.defaultWeaponSlot = new EquipSlot(character);
        this.equippedWeaponSlot = new EquipSlot(character);
        this.defaultArmorSlot = new EquipSlot(character);
        this.equippedArmorSlot = new EquipSlot(character);
        this.piercings = new PiercingInventory(character);
        this.cockSocks = new EquipSlotList<CockSock>(character);
        this.cocksMonitor = new ListMonitor(this.cockSocks, EquipSlot, character);
        character.body.cocks.attach(this.cocksMonitor);
        this.armorDescMod = "";
        this.character = character;
    }

    public get weapon(): Weapon {
        return this.equippedWeaponSlot.item ? this.equippedWeaponSlot.item : this.defaultWeaponSlot.item;
    }

    public get armor(): Armor {
        return this.equippedArmorSlot.item ? this.equippedArmorSlot.item : this.defaultArmorSlot.item;
    }

    public serialize(): object | undefined {
        return {
            equippedWeaponSlot: this.equippedWeaponSlot.serialize(),
            equippedArmorSlot: this.equippedArmorSlot.serialize(),
            piercings: this.piercings.serialize(),
            cockSocks: ListSerializer.serialize(this.cockSocks),
            armorDescMod: this.armorDescMod
        };
    }

    public deserialize(saveObject: EquipmentInventory) {
        this.equippedWeaponSlot.deserialize(saveObject.equippedWeaponSlot);
        this.equippedArmorSlot.deserialize(saveObject.equippedArmorSlot);
        this.piercings.deserialize(saveObject.piercings);
        ListSerializer.deserialize(saveObject.cockSocks, this.cockSocks, EquipSlot, this.character);
        this.armorDescMod = saveObject.armorDescMod;
    }
}
