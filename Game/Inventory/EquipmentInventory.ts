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
import { Cock } from '../Body/Cock';
import { ObservingEquipSlot } from './ObservingEquipSlot';
import { CockSockName } from '../Items/Misc/CockSockName';

type CockSockSlot = ObservingEquipSlot<CockSock, Cock>;

export class EquipmentInventory implements ISerializable<EquipmentInventory> {
    public readonly defaultWeaponSlot: EquipSlot<Weapon>;
    public readonly equippedWeaponSlot: EquipSlot<Weapon>;
    public readonly defaultArmorSlot: EquipSlot<Armor>;
    public readonly equippedArmorSlot: EquipSlot<Armor>;
    public readonly piercings: PiercingInventory;
    public readonly cockSocks = new EquipSlotList<CockSock, CockSockSlot>();
    private cocksMonitor: ListMonitor<Cock, CockSockSlot, EquipSlotList<CockSock, CockSockSlot>>;
    public armorDescMod: string;
    private character: Character;

    public constructor(character: Character, defaultWeapon: Weapon, defaultArmor: Armor) {
        this.defaultWeaponSlot = new EquipSlot(character);
        this.defaultWeaponSlot.equip(defaultWeapon);
        this.equippedWeaponSlot = new EquipSlot(character);
        this.defaultArmorSlot = new EquipSlot(character);
        this.defaultArmorSlot.equip(defaultArmor);
        this.equippedArmorSlot = new EquipSlot(character);
        this.piercings = new PiercingInventory(character);
        this.cocksMonitor = new ListMonitor<Cock, CockSockSlot, EquipSlotList<CockSock, CockSockSlot>>(this.cockSocks, ObservingEquipSlot, character);
        character.body.cocks.attach(this.cocksMonitor);
        this.armorDescMod = "";
        this.character = character;
    }

    public get weapon(): Weapon {
        return this.equippedWeaponSlot.item ? this.equippedWeaponSlot.item : this.defaultWeaponSlot.item!;
    }

    public get armor(): Armor {
        return this.equippedArmorSlot.item ? this.equippedArmorSlot.item : this.defaultArmorSlot.item!;
    }

    public serialize(): object {
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
        for (const cockSock of saveObject.cockSocks) {
            if (cockSock.item) {
                cockSock.equip(new CockSock(cockSock.item.name as CockSockName));
            }
        }
        ListSerializer.deserialize(saveObject.cockSocks, this.cockSocks, ObservingEquipSlot, this.character);
        this.armorDescMod = saveObject.armorDescMod;
    }
}
