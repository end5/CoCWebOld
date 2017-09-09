import Useable from "./Useable";

export default class Armor extends Useable //Equipable
{
    private _def: number;
    private _perk: string;
    private _displayname: string;
    private _supportsBulge: boolean;

    constructor(id: string, shortName: string, displayname: string, longName: string, def: number, value: number = 0, description: string = null, perk: string = "", supportsBulge: boolean = false) {
        super(id, shortName, longName, value, description);
        this._displayname = displayname;
        this._def = def;
        this._perk = perk;
        this._supportsBulge = supportsBulge;
    }

    public get def(): number { return this._def; }

    public get perk(): string { return this._perk; }

    public get displayname(): string { return this._displayname; }

    public get supportsBulge(): boolean { return this._supportsBulge && this.player.modArmorName == ""; }
    //For most clothes if the modArmorName is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.

    public useText(): void {
        Render.text("You equip " + this.longName + ".  ");
    }

    public playerEquip(): Armor { //This item is being equipped by the player. Add any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public playerRemove(): Armor { //This item is being removed by the player. Remove any perks, etc. - This function should only handle mechanics, not text output
        while (this.player.perks.has("BulgeArmor"))
            this.player.perks.remove("BulgeArmor"); //TODO remove this Exgartuan hack
        if (this.player.modArmorName.length > 0)
            this.player.modArmorName = "";
        return this;
    }

    public removeText(): void { } //Produces any text seen when removing the armor normally
}

