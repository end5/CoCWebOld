import Item from "../Item";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class Weapon extends Item
{
    public readonly verb: string;
    public readonly attack: number;
    public readonly perk: string;
    public readonly displayname: string;

    public constructor(key: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = null, perk: string = "") {
        super(key, shortName, longName, value, description);
        this.displayname = displayname;
        this.verb = verb;
        this.attack = attack;
        this.perk = perk;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        MainScreen.text("You equip " + this.longName + ".  ");
    }

    public equip(player: Player): Weapon { //This item is being equipped by the player. Add any perks, etc. - This should only handle mechanics, not text output
        return this;
    }

    public unequip(player: Player): Weapon { //This item is being removed by the player. Remove any perks, etc. - This should only handle mechanics, not text output
        return this;
    }

    public removeText() { } //Produces any text seen when removing the armor normally
}

