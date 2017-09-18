import Effect from "./Effect";
import PerkDesc from "./PerkDesc";
import Game from "../Game/Game";

export default class Perk extends Effect<PerkDesc> {
    public constructor(perkDescKey: string, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        let perkDesc: PerkDesc;
        if (!Game.libraries.perkDesc.has(perkDescKey)) {
            console.trace("Perk Description " + perkDescKey + " does not exist.");
            return;
        }
        else
            perkDesc = Game.libraries.perkDesc.get(perkDescKey);

        super(perkDesc, value1, value2, value3, value4);
    }

}