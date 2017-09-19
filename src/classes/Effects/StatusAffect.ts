import StatusAffectDesc from "./StatusAffectDesc";
import Game from "../Game/Game";
import ValueContainer from "../Utilities/ValueContainer";

export default class StatusAffect extends ValueContainer<StatusAffectDesc> {
    public constructor(statusAffectDescKey: string, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        let statusAffectDesc: StatusAffectDesc;
        if (!Game.libraries.statusAffectDesc.has(statusAffectDescKey)) {
            console.trace("Status Affect Description " + statusAffectDescKey + " does not exist.");
            return;
        }
        else
            statusAffectDesc = Game.libraries.statusAffectDesc.get(statusAffectDescKey);

        super(statusAffectDesc, value1, value2, value3, value4);
    }
}
