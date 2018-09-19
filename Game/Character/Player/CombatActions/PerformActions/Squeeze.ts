import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';

export class Squeeze implements CombatAction {
    public name: string = "Squeeze";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return !!target && target.statusAffects.has(StatusEffectType.Constricted);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        DisplayText().clear();
        // Squeeze -
        DisplayText("Your coils wrap tighter around your prey, leaving " + target.desc.objectivePronoun + " short of breath. You can feel it in your tail as " + target.desc.possessivePronoun + " struggles are briefly intensified.");
        target.stats.HP -= target.stats.maxHP() * (.10 + randInt(15) / 100);
        // Enemy faints -
        if (target.stats.HP < 1) {
            DisplayText("You can feel " + target.desc.a + target.desc.short + "'s life signs beginning to fade, and before you crush all the life from " + target.desc.objectivePronoun + ", you let go, dropping " + target.desc.objectivePronoun + " to the floor, unconscious but alive.  In no time, " + target.desc.possessivePronoun + "'s eyelids begin fluttering, and you've no doubt they'll regain consciousness soon.  ");
            if (target.desc.short === "demons")
                DisplayText("The others quickly back off, terrified at the idea of what you might do to them.");
            DisplayText("\n\n");
            return { next: kGAMECLASS.endHpVictory };
        }
        DisplayText("\n\n");
        return;
    }
}
