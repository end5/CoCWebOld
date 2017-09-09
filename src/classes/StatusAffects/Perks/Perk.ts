import PerkDesc from "./PerkDesc"
import KeyObject from "../Utilities/KeyObject";
import Game from "../Game/Game";

export default class Perk extends KeyObject {
    private _perkDesc: PerkDesc;
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;

    constructor(perkDescKey: string, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        let perkDesc: PerkDesc;
        if (!Game.libraries.perkDesc.has(perkDescKey)) {
            console.trace("Perk Description " + perkDescKey + " does not exist.");
            return;
        }
        else
            perkDesc = Game.libraries.perkDesc.get(perkDescKey);
        super(perkDesc.id);
        this._perkDesc = perkDesc;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }

    public get perkDesc(): PerkDesc {
        return this._perkDesc;
    }
}
