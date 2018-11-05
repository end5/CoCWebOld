import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Berserk implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Berzerk";
    public reasonCannotUse: string = "You're already pretty goddamn mad!";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Berzerker);
    }

    public canUse(character: Character, monster: Character): boolean {
        return !character.combat.effects.has(CombatEffectType.Berzerking);
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n");
        character.combat.effects.add(CombatEffectType.Berzerking, character, {
            attack: {
                value: { flat: 30 }
            },
            defense: {
                value: { multi: 0 }
            }
        });
    }
}
