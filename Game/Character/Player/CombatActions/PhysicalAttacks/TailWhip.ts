import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { Tail, TailType } from '../../../../Body/Tail';
import { Character } from '../../../../Character/Character';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { StatusAffectFactory } from '../../../../Effects/StatusEffectFactory';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';

export class TailWhip implements CombatAction {
    public name: string = "Tail Whip";
    public reasonCannotUse: string = "";

    public isPossible(player: Player): boolean {
        return player.body.tails.reduce(Tail.HasType(TailType.SHARK), false) || player.body.tails.reduce(Tail.HasType(TailType.LIZARD), false) || player.body.tails.reduce(Tail.HasType(TailType.KANGAROO), false) || player.body.tails.reduce(Tail.HasType(TailType.DRACONIC), false) || player.body.tails.reduce(Tail.HasType(TailType.RACCOON), false);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player, monster: Character): NextScreenChoices {
        DisplayText().clear();
        // miss
        if ((player.effects.has(StatusEffectType.Blind) && randInt(2) === 0) ||
            (monster.stats.spe - player.stats.spe > 0 && randInt(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            DisplayText("Twirling like a top, you swing your tail, but connect with only empty air.");
        }
        else {
            if (!monster.desc.plural)
                DisplayText("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " looks disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon becomes irate and redoubles " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            else
                DisplayText("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " look disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon become irate and redouble " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            if (!monster.effects.has(StatusEffectType.CoonWhip))
                monster.effects.add(StatusEffectType.CoonWhip, Math.round(monster.combat.stats.defense() * .75), !player.body.tails.reduce(Tail.HasType(TailType.RACCOON), false) ? 2 : 4, 0, 0);
        }
        DisplayText("\n\n");
        return;
    }
}
