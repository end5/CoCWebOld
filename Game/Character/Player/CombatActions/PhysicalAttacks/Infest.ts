import { Character } from '../../../../Character/Character';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Infest implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.PhysSpec;
    public name: string = "Infest";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(player: Player): boolean {
        return player.effects.has(StatusEffectType.Infested) && player.effects.get(StatusEffectType.Infested).value1 === 5 && player.body.cocks.length > 0;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        // this.playerInfest();
        return;
    }
}
