import { randInt } from '../../../../../Engine/Utilities/SMath';
import { Tail, TailType } from '../../../../Body/Tail';
import { Character } from '../../../../Character/Character';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class TailWhip implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.PhysSpec;
    public name: string = "Tail Whip";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(player: Player): boolean {
        return player.body.tails.reduce(Tail.HasType(TailType.SHARK), false) || player.body.tails.reduce(Tail.HasType(TailType.LIZARD), false) || player.body.tails.reduce(Tail.HasType(TailType.KANGAROO), false) || player.body.tails.reduce(Tail.HasType(TailType.DRACONIC), false) || player.body.tails.reduce(Tail.HasType(TailType.RACCOON), false);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        // miss
        if ((player.combat.effects.has(CombatEffectType.Blind) && randInt(2) === 0) ||
            (monster.stats.spe - player.stats.spe > 0 && randInt(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            CView.text("Twirling like a top, you swing your tail, but connect with only empty air.");
        }
        else {
            if (!monster.desc.plural)
                CView.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " looks disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon becomes irate and redoubles " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            else
                CView.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " look disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon become irate and redouble " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            if (!monster.combat.effects.has(CombatEffectType.CoonWhip))
                monster.combat.effects.add(CombatEffectType.CoonWhip, player, {
                    defense: {
                        value: {
                            flat: -Math.round(monster.combat.stats.defense() * .75)
                        },
                    },
                    duration: !player.body.tails.reduce(Tail.HasType(TailType.RACCOON), false) ? 2 : 4
                });
        }
        CView.text("\n\n");
        return;
    }
}
