import { Useable } from './Useable';

/**
 * Created by aimozg on 09.01.14.
 */
export class Weapon extends Useable //Equipable
{
    private _verb: string;
    private _attack: number;
    private _perk: string;
    private _name: string;

    public constructor(id: string, shortName: string, name: string, longName: string, verb: string, attack: number, value: number = 0, description: string = null, perk: string = "") {
        super(id, shortName, longName, value, description);
        this._name = name;
        this._verb = verb;
        this._attack = attack;
        this._perk = perk;
    }

    public get verb(): string { return this._verb; }

    public get attack(): number { return this._attack; }

    public get perk(): string { return this._perk; }

    public get name(): string { return this._name; }

    public useText(): void {
        outputText("You equip " + this.longName + ".  ");
    }

    public playerEquip(): Weapon { //This item is being equipped by the player. Add any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public playerRemove(): Weapon { //This item is being removed by the player. Remove any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public removeText(): void { } //Produces any text seen when removing the armor normally

}
