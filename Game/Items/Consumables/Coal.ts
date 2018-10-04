import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { describeButthole } from '../../Descriptors/ButtDescriptor';
import { CView } from '../../../Engine/Display/ContentView';
import { displayGoIntoHeat, displayGoIntoRut } from '../../Modifiers/BodyModifier';

export class Coal extends Consumable {
    public constructor() {
        super(ConsumableName.Coal, new ItemDesc("Coal", "two pieces of coal"));
    }

    public use(character: Character) {
        let changes: number = 0;
        CView.clear();
        CView.text("You handle the coal rocks experimentally and they crumble to dust in your hands!  You cough as you breathe in the cloud, sputtering and wheezing.  After a minute of terrible coughing, you recover and realize there's no remaining trace of the rocks, not even a sooty stain on your hands!");
        // Try to go into intense heat
        if (displayGoIntoHeat(character, 2)) {
            changes++;
        }
        // Males go into rut
        else if (displayGoIntoRut(character)) {
            changes++;
        }
        else {
            // Boost anal capacity without gaping
            if (character.effects.get(StatusEffectType.BonusACapacity).value1 < 80) {
                if (!character.effects.has(StatusEffectType.BonusACapacity))
                    character.effects.add(StatusEffectType.BonusACapacity, 0, 0, 0, 0);
                character.effects.get(StatusEffectType.BonusACapacity).value1 = 5;
                CView.text("\n\nYou feel... more accommodating somehow.  Your " + describeButthole(character.body.butt) + " is tingling a bit, and though it doesn't seem to have loosened, it has grown more elastic.");
                changes++;
            }
            else {
                CView.text("\n\nYour whole body tingles for a moment but it passes.  It doesn't look like the coal can do anything to you at this point.");
            }
        }
    }
}
