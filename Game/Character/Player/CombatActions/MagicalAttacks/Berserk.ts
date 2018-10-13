import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CView } from '../../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Berserk implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MagicSpec;
    public name: string = "Berzerk";
    public reasonCannotUse: string = "You're already pretty goddamn mad!";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Berzerker);
    }

    public canUse(character: Character): boolean {
        return !character.effects.has(StatusEffectType.Berzerking);
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n");
        character.effects.add(StatusEffectType.Berzerking, 0, 0, 0, 0);
    }
}
