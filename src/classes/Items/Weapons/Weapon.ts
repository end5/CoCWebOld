import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Item, { ItemType } from '../Item';
import ItemDesc from '../ItemDesc';

export default class Weapon extends Item {
    public readonly verb: string;
    public readonly attack: number;
    public readonly perk: string;
    public readonly displayname: string;

    public constructor(key: string, itemDesc: ItemDesc, displayname: string, verb: string, attack: number, value?: number, perk: string = "") {
        super(key, ItemType.Weapon, itemDesc, value);
        this.displayname = displayname;
        this.verb = verb;
        this.attack = attack;
        this.perk = perk;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
    }

    public useText(player: Player) {
        MainScreen.text("You equip " + this.desc.longName + ".  ");
    }

    public equip(player: Player): Weapon { //This item is being equipped by the player. Add any perks, etc. - This should only handle mechanics, not text output
        return this;
    }

    public unequip(player: Player): Weapon { //This item is being removed by the player. Remove any perks, etc. - This should only handle mechanics, not text output
        return this;
    }

    public removeText() { } //Produces any text seen when removing the armor normally
}

