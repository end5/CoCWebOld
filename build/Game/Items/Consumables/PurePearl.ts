import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { ItemDesc } from '../ItemDesc';

export class PurePearl extends Consumable {
    public constructor() {
        super(ConsumableName.PurePearl, new ItemDesc("P.Pearl", "a pure pearl"), 1000);
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You cram the pearl in your mouth and swallow it like a giant pill with some difficulty.  Surprisingly there is no discomfort, only a cool calming sensation that springs up from your core.");
        character.stats.lib += -5;
        character.stats.lust += -25;
        character.stats.cor += -10;
        if (!character.perks.has(PerkType.PurityBlessing))
            character.perks.add(PerkType.PurityBlessing, 0, 0, 0, 0);
    }
}
