import Useable from "../Useable";

export default class Weapon extends Useable //Equipable
{
    private _verb: string;
    private _attack: number;
    private _perk: string;
    private _displayname: string;

    public constructor(id: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = null, perk: string = "") {
        super(id, shortName, longName, value, description);
        this._displayname = displayname;
        this._verb = verb;
        this._attack = attack;
        this._perk = perk;
    }

    public get verb(): string { return this._verb; }

    public get attack(): number { return this._attack; }

    public get perk(): string { return this._perk; }

    public get displayname(): string { return this._displayname; }

    public use() {
        Render.text("You equip " + this._longName + ".  ");
    }

    public playerEquip(): Weapon { //This item is being equipped by the player. Add any perks, etc. - This should only handle mechanics, not text output
        return this;
    }

    public playerRemove(): Weapon { //This item is being removed by the player. Remove any perks, etc. - This should only handle mechanics, not text output
        return this;
    }

    public removeText() { } //Produces any text seen when removing the armor normally
}

