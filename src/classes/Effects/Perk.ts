import PerkDesc from './PerkDesc';
import Game from '../Game/Game';
import ValueContainer from '../Utilities/ValueContainer';

export default class Perk extends ValueContainer<PerkDesc> {
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

    public clone(): Perk {
        return new Perk(this.objectKey, this.value1, this.value2, this.value3, this.value4);
    }
}