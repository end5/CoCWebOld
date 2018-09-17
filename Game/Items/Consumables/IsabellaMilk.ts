import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';

export class IsabellaMilk extends Consumable {
    public constructor() {
        super(ConsumableName.IsabellaMilk, new ItemDesc("IzyMilk", "a bottle of Isabella's milk", "This is a bottle of Isabella's milk.  Isabella seems fairly certain it will invigorate you."));
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You swallow down the bottle of Isabella's milk.");
        if (character.stats.fatigue > 0) DisplayText("  You feel much less tired! (-33 fatigue)");
        character.stats.fatigue -= 33;
    }
}
