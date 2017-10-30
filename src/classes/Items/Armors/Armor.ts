import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import Player from '../../Player';
import Item, { ItemType } from '../Item';
import ItemDesc from '../ItemDesc';

export type ArmorClass = "Light" | "Medium" | "Heavy" | "";

export default class Armor extends Item {
    public readonly defense: number;
    public readonly armorClass: ArmorClass;
    public readonly displayName: string;
    private _supportsBulge: boolean;

    constructor(key: string, itemDesc: ItemDesc, displayname: string, defense: number, value?: number, armorClass: ArmorClass = "Light", supportsBulge: boolean = false) {
        super(key, ItemType.Armor, itemDesc, value);
        this.displayName = displayname;
        this.defense = defense;
        this.armorClass = armorClass;
        this._supportsBulge = supportsBulge;
    }

    public supportsBulge(player: Player): boolean { return this._supportsBulge && player.inventory.armorDescMod == ""; }
    //For most clothes if the armorDescMod is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {

    }

    public useText(player: Player): void {
        MainScreen.text("You equip " + this.desc.longName + ".  ");
    }

    public equip(player: Player): Armor { //This item is being equipped by the player. Add any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public unequip(player: Player): Armor { //This item is being removed by the player. Remove any perks, etc. - This function should only handle mechanics, not text output
        while (player.perks.has("BulgeArmor"))
            player.perks.remove("BulgeArmor"); //TODO remove this Exgartuan hack
        if (player.inventory.armorDescMod.length > 0)
            player.inventory.armorDescMod = "";
        return this;
    }

    public removeText(): void { } //Produces any text seen when removing the armor normally
}

