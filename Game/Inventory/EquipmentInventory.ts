import { EquipSlot, IEquipSlot } from './EquipSlot';
import { EquipSlotList } from './EquipSlotList';
import { PiercingInventory, IPiercingInventory } from './PiercingInventory';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Character } from '../Character/Character';
import { Armor } from '../Items/Armors/Armor';
import { CockSock } from '../Items/Misc/CockSock';
import { Weapon } from '../Items/Weapons/Weapon';
import { ListMonitor } from '../Utilities/ListMonitor';
import { Cock } from '../Body/Cock';
import { ObservingEquipSlot } from './ObservingEquipSlot';

type CockSockSlot = ObservingEquipSlot<CockSock, Cock>;

export interface IEquipmentInventory {
    weapon?: IEquipSlot;
    armor?: IEquipSlot;
    piercings: IPiercingInventory;
    cockSocks: IEquipSlot[];
    armorDescMod: string;
}

export class EquipmentInventory implements ISerializable<IEquipmentInventory> {
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
        character.body.cocks.observers.add(this.cocksMonitor);
        this.armorDescMod = "";
        this.character = character;
    }

    public get weapon(): Weapon {
        return this.equippedWeaponSlot.item ? this.equippedWeaponSlot.item : this.defaultWeaponSlot.item!;
    }

    public get armor(): Armor {
        return this.equippedArmorSlot.item ? this.equippedArmorSlot.item : this.defaultArmorSlot.item!;
    }

    public serialize(): IEquipmentInventory {
        const saveObj: any = {
            piercings: this.piercings.serialize(),
            cockSocks: this.cockSocks.serialize(),
            armorDescMod: this.armorDescMod
        };
        const weapon = this.equippedWeaponSlot.serialize();
        const armor = this.equippedWeaponSlot.serialize();
        if (weapon) saveObj.weapon = weapon;
        if (armor) saveObj.armor = armor;
        return saveObj;
    }

    public deserialize(saveObject: IEquipmentInventory) {
        if (saveObject.weapon)
            this.equippedWeaponSlot.deserialize(saveObject.weapon);
        if (saveObject.armor)
            this.equippedArmorSlot.deserialize(saveObject.armor);
        this.piercings.deserialize(saveObject.piercings);
        this.cockSocks.deserialize(saveObject.cockSocks, ObservingEquipSlot, this.character);
        // if (saveObject.cockSocks && saveObject.cockSocks.length) {
        //     for (let index = 0; index < saveObject.cockSocks.length; index++) {
        //         if (saveObject.cockSocks[index] && saveObject.cockSocks[index].item && this.cockSocks.get(index)) {
        //             this.cockSocks.get(index)!.equip(new CockSock(saveObject.cockSocks[index].item.name as CockSockName));
        //         }
        //     }
        // }
        this.armorDescMod = saveObject.armorDescMod;
    }
}
