import Inventory from './Inventory';
import Game from '../Game/Game';
import Armor from '../Items/Armors/Armor';
import EquipableItem from '../Items/EquipableItem';
import Item from '../Items/Item';
import Weapon from '../Items/Weapons/Weapon';
import { SerializeInterface } from '../SerializeInterface';

class EquipableItemManager<Equipable extends EquipableItem> implements SerializeInterface {
    private item: Equipable;
    private defaultItem: Equipable;
    public descMod: string;

    public constructor(defaultEquipableItem: Equipable) {
        this.defaultItem = defaultEquipableItem;
        this.item = this.defaultItem;
    }

    public get equipment(): Equipable {
        return this.item;
    }

    public equip(equipableItem: Equipable) {
        if (this.item == this.defaultItem) {
            this.item = equipableItem;
        }
        else {
            // drop item
            this.item = this.defaultItem;
        }
    }
    
    public unequip() {
        if (this.item != this.defaultItem) {
            // drop item
            this.item = this.defaultItem;
        }
    }

    serialize(): string {
        return JSON.stringify({
            "item": this.item,
            "defaultItem": this.defaultItem,
            "descMod": this.descMod
        })
    }
    deserialize(saveObject: object) {
        this.item = saveObject["item"];
        this.defaultItem = saveObject["defaultItem"];
        this.descMod = saveObject["descMod"];
    }
}

export default class CharacterInventory implements SerializeInterface {
    public readonly items: Inventory<Item>;
    public readonly weaponSlot: EquipableItemManager<Weapon>;
    public readonly armorSlot: EquipableItemManager<Armor>;
    public armorDescMod: string;
	public gems: number;
    
    public constructor(defaultWeapon: Weapon, defaultArmor: Armor) {
        this.items = new Inventory<Item>();
        this.weaponSlot = new EquipableItemManager<Weapon>(defaultWeapon);
        this.armorSlot = new EquipableItemManager<Armor>(defaultArmor);
        this.armorDescMod = "";
    }

    serialize(): string {
        let saveObject: object = {};
        saveObject["gems"] = this.gems;
        saveObject["items"] = this.items.serialize();
        saveObject["weaponSlot"] = this.weaponSlot.serialize();
        saveObject["armorSlot"] = this.armorSlot.serialize();
        saveObject["armorDescMod"] = this.armorDescMod;
        
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        this.gems = saveObject["gems"] = this.gems;
        this.items.deserialize(saveObject["items"]);
        this.weaponSlot.deserialize(saveObject["weaponSlot"]);
        this.armorSlot.deserialize(saveObject["armorSlot"]);
        this.armorDescMod = saveObject["armorDescMod"];
    }
}