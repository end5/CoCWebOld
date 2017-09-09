import StatusAffectDesc from "./StatusAffectDesc";
import Game from "../Game/Game";
import KeyObject from "../Utilities/KeyObject";

export default class StatusAffect extends KeyObject {
    private statusAffectDesc: StatusAffectDesc;
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;

    public constructor(statusAffectDescKey: string, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        let statusAffect: StatusAffectDesc;
        if (!Game.libraries.perkDesc.has(statusAffectDescKey)) {
            console.trace("Status Affect Description " + statusAffectDescKey + " does not exist.");
            return;
        }
        else
            statusAffect = Game.libraries.perkDesc.get(statusAffect);
        super(statusAffect.objectKey);
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }

    public toString(): string {
        return "[" + this.objectKey + "," + this.value1 + "," + this.value2 + "," + this.value3 + "," + this.value4 + "]";
    }
}
