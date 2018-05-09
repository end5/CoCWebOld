import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { Mod } from '../../Modifiers/Modifiers';
import { ItemDesc } from '../ItemDesc';

export class Coal extends Consumable {
    public constructor() {
        super(ConsumableName.Coal, new ItemDesc("Coal", "two pieces of coal"));
    }

    public use(character: Character) {
        let changes: number = 0;
        DisplayText().clear();
        DisplayText("You handle the coal rocks experimentally and they crumble to dust in your hands!  You cough as you breathe in the cloud, sputtering and wheezing.  After a minute of terrible coughing, you recover and realize there's no remaining trace of the rocks, not even a sooty stain on your hands!");
        // Try to go into intense heat
        if (Mod.Body.displayGoIntoHeat(character, 2)) {
            changes++;
        }
        // Males go into rut
        else if (Mod.Body.displayGoIntoRut(character)) {
            changes++;
        }
        else {
            // Boost anal capacity without gaping
            if (character.statusAffects.get(StatusAffectType.BonusACapacity).value1 < 80) {
                if (!character.statusAffects.has(StatusAffectType.BonusACapacity))
                    character.statusAffects.add(StatusAffectType.BonusACapacity, 0, 0, 0, 0);
                character.statusAffects.get(StatusAffectType.BonusACapacity).value1 = 5;
                DisplayText("\n\nYou feel... more accommodating somehow.  Your " + Desc.Butt.describeButthole(character.torso.butt) + " is tingling a bit, and though it doesn't seem to have loosened, it has grown more elastic.");
                changes++;
            }
            else {
                DisplayText("\n\nYour whole body tingles for a moment but it passes.  It doesn't look like the coal can do anything to you at this point.");
            }
        }
    }
}
