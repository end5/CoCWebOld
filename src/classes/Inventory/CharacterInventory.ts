import Inventory from './Inventory';
import Game from '../Game/Game';
import Armor from '../Items/Armors/Armor';
import Item from '../Items/Item';
import Weapon from '../Items/Weapons/Weapon';
import { SerializeInterface } from '../SaveInterface';

export default class CharacterInventory implements SerializeInterface {
    public readonly items: Inventory<Item>;
    public weapon: Weapon;
    public armor: Armor;
    public armorDescMod: string;
	public gems: number;
    
    public constructor() {
        this.items = new Inventory<Item>();
        this.weapon = Game.libraries.weapons.get("Fists");
        this.armor = Game.libraries.armor.get("c.under");
        this.armorDescMod = "";
    }

    serialKey: string = "CharacterInventory";
    serialize(): object {
        let saveObject: object = {};
        saveObject["gems"] = this.gems;
        saveObject[this.items.serialKey] = this.items.serialize();
        saveObject[this.weapon.serialKey] = this.weapon.serialize();
        saveObject[this.armor.serialKey] = this.armor.serialize();
        saveObject["armorDescMod"] = this.armorDescMod;
        
        return saveObject;
    }
    deserialize(saveObject: object) {
        this.gems = saveObject["gems"] = this.gems;
        this.items.deserialize(saveObject[this.items.serialKey]);
        this.weapon.deserialize(saveObject[this.weapon.serialKey]);
        this.armor.deserialize(saveObject[this.armor.serialKey]);
        this.armorDescMod = saveObject["armorDescMod"];
    }
}