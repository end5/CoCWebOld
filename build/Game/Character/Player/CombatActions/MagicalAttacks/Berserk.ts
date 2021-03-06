import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class Berserk implements CombatAction {
    public name: string = "Berzerk";
    public reasonCannotUse: string = "You're already pretty goddamn mad!";

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Berzerker);
    }

    public canUse(character: Character): boolean {
        return !character.statusAffects.has(StatusAffectType.Berzerking);
    }

    public use(character: Character, monster: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n");
        character.statusAffects.add(StatusAffectType.Berzerking, 0, 0, 0, 0);
        return;
    }
}
