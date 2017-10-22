import Inventory from './Inventory';
import Game from '../Game/Game';
import Armor from '../Items/Armors/Armor';
import Item from '../Items/Item';
import Weapon from '../Items/Weapons/Weapon';
import { SaveInterface } from '../SaveInterface';

export default class CharacterInventory implements SaveInterface {
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

    saveKey: string = "CharacterInventory";
    save(): object {
        let saveObject: object = {};
        saveObject["gems"] = this.gems;
        saveObject[this.items.saveKey] = this.items.save();
        saveObject[this.weapon.saveKey] = this.weapon.save();
        saveObject[this.armor.saveKey] = this.armor.save();
        saveObject["armorDescMod"] = this.armorDescMod;
        
        return saveObject;
    }
    load(saveObject: object) {
        this.gems = saveObject["gems"] = this.gems;
        this.items.load(saveObject[this.items.saveKey]);
        this.weapon.load(saveObject[this.weapon.saveKey]);
        this.armor.load(saveObject[this.armor.saveKey]);
        this.armorDescMod = saveObject["armorDescMod"];
    }
}