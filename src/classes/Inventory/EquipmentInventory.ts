import CockSockList from './CockSockList';
import EquipmentSlot from './EquipmentSlot';
import PiercingInventory from './PiercingInventory';
import Character from '../Character/Character';
import Armor from '../Items/Armors/Armor';
import Weapon from '../Items/Weapons/Weapon';
import ISerializable from '../Utilities/ISerializable';
import ListSerializer from '../Utilities/ListSerializer';

export default class EquipmentInventory implements ISerializable<EquipmentInventory> {
    public readonly defaultWeaponSlot: EquipmentSlot<Weapon>;
    public readonly equippedWeaponSlot: EquipmentSlot<Weapon>;
    public readonly defaultArmorSlot: EquipmentSlot<Armor>;
    public readonly equippedArmorSlot: EquipmentSlot<Armor>;
    public readonly piercings: PiercingInventory;
    public readonly cockSocks: CockSockList;
    public armorDescMod: string;

    public constructor(character: Character) {
        this.defaultWeaponSlot = new EquipmentSlot(character);
        this.equippedWeaponSlot = new EquipmentSlot(character);
        this.defaultArmorSlot = new EquipmentSlot(character);
        this.equippedArmorSlot = new EquipmentSlot(character);
        this.piercings = new PiercingInventory(character);
        this.cockSocks = new CockSockList(character, character.torso.cocks);
        this.armorDescMod = "";
    }

    public get weapon(): Weapon {
        return this.equippedWeaponSlot.item ? this.equippedWeaponSlot.item : this.defaultWeaponSlot.item;
    }

    public get armor(): Armor {
        return this.equippedArmorSlot.item ? this.equippedArmorSlot.item : this.defaultArmorSlot.item;
    }

    public serialize(): string {
        return JSON.stringify({
            defaultWeaponSlot: this.defaultWeaponSlot.serialize(),
            equippedWeaponSlot: this.equippedWeaponSlot.serialize(),
            defaultArmorSlot: this.defaultArmorSlot.serialize(),
            equippedArmorSlot: this.equippedArmorSlot.serialize(),
            piercings: this.piercings.serialize(),
            cockSocks: ListSerializer.serialize(this.cockSocks),
            armorDescMod: this.armorDescMod
        });
    }

    public deserialize(saveObject: EquipmentInventory) {
        this.defaultWeaponSlot.deserialize(saveObject.defaultWeaponSlot);
        this.equippedWeaponSlot.deserialize(saveObject.equippedWeaponSlot);
        this.defaultArmorSlot.deserialize(saveObject.defaultArmorSlot);
        this.equippedArmorSlot.deserialize(saveObject.equippedArmorSlot);
        this.piercings.deserialize(saveObject.piercings);
        ListSerializer.deserialize(saveObject.cockSocks, this.cockSocks, EquipSlot, this.character);
        this.armorDescMod = saveObject.armorDescMod;
    }
}
