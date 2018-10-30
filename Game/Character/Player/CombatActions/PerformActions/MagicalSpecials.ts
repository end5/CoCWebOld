import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { Berserk } from '../MagicalAttacks/Berserk';
import { DragonBreath } from '../MagicalAttacks/DragonBreath';
import { Fireball } from '../MagicalAttacks/Fireball';
import { Hellfire } from '../MagicalAttacks/Hellfire';
import { Possess } from '../MagicalAttacks/Possess';
import { SuperWhisperAttack } from '../MagicalAttacks/SuperWhisper';
import { CorruptedFoxFire } from '../MagicalAttacks/CorruptedFoxFire';
import { KitsuneTerror } from '../MagicalAttacks/KitsuneTerror';
import { FoxFire } from '../MagicalAttacks/FoxFire';
import { ShieldingSpell } from '../MagicalAttacks/ShieldingSpell';
import { ImmolationSpell } from '../MagicalAttacks/ImmolationSpell';
import { randomChoice } from '../../../../../Engine/Utilities/SMath';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class MagicalSpecials implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MagicSpec;
    public name: string = "M. Specials";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [
        new Berserk(),
        new DragonBreath(),
        new Fireball(),
        new Hellfire(),
        new Possess(),
        new SuperWhisperAttack(),
        new CorruptedFoxFire(),
        new KitsuneTerror(),
        new FoxFire(),
        new KitsuneTerror(),
        new ShieldingSpell(),
        new ImmolationSpell(),
    ];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!this.actions.find((action) => action.canUse(character, target));
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        return randomChoice(...this.actions).use(character, target);
        // return showActions(character, MagicalActionLib.getPossibleActions(character));
    }
}
