import { Character } from '../../../../Character/Character';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';

export class Infest implements CombatAction {
    public name: string = "Infest";
    public reasonCannotUse: string = "";

    public isPossible(player: Player): boolean {
        return player.effects.has(StatusEffectType.Infested) && player.effects.get(StatusEffectType.Infested).value1 === 5 && player.body.cocks.length > 0;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player, monster: Character): NextScreenChoices {
        // this.playerInfest();
        return;
    }
}
