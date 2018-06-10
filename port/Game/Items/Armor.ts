import { Useable } from './Useable';
import { PerkLib } from '../PerkLib';

/**
 * Created by aimozg on 10.01.14.
 */
export class Armor extends Useable //Equipable
{
    private _def: number;
    private _perk: string;
    private _name: string;
    private _supportsBulge: boolean;

    public constructor(id: string, shortName: string, name: string, longName: string, def: number, value: number = 0, description: string = null, perk: string = "", supportsBulge: boolean = false) {
        super(id, shortName, longName, value, description);
        this._name = name;
        this._def = def;
        this._perk = perk;
        this._supportsBulge = supportsBulge;
    }

    public get def(): number { return this._def; }

    public get perk(): string { return this._perk; }

    public get name(): string { return this._name; }

    public get supportsBulge(): boolean { return this._supportsBulge && this.game.player.modArmorName == ""; }
    //For most clothes if the modArmorName is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.

    public useText(): void {
        outputText("You equip " + this.longName + ".  ");
    }

    public playerEquip(): Armor { //This item is being equipped by the player. Add any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public playerRemove(): Armor { //This item is being removed by the player. Remove any perks, etc. - This function should only handle mechanics, not text output
        while (this.game.player.findPerk(PerkLib.BulgeArmor) >= 0) this.game.player.removePerk(PerkLib.BulgeArmor); //TODO remove this Exgartuan hack
        if (this.game.player.modArmorName.length > 0) this.game.player.modArmorName = "";
        return this;
    }

    public removeText(): void { } //Produces any text seen when removing the armor normally
}
