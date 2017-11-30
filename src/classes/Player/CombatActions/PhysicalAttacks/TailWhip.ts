import { TailType } from '../../../Body/LowerBody';
import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';

export class TailWhip implements CombatAction {
    public name: string = "Tail Whip";
    public reasonCannotUse: string = "";
    
    public isPossible(player: Player): boolean {
        return player.lowerBody.tailType == (TailType.SHARK || TailType.LIZARD || TailType.KANGAROO || TailType.DRACONIC || TailType.RACCOON);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        //miss
        if ((player.statusAffects.has(StatusAffectType.Blind) && Utils.rand(2) == 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            DisplayText.text("Twirling like a top, you swing your tail, but connect with only empty air.");
        }
        else {
            if (!monster.desc.plural)
                DisplayText.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " looks disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon becomes irate and redoubles " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            else
                DisplayText.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " look disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon become irate and redouble " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            if (!monster.statusAffects.has(StatusAffectType.CoonWhip))
                monster.statusAffects.add(StatusAffectFactory.create(StatusAffectType.CoonWhip, Math.round(monster.combat.stats.defense() * .75), player.lowerBody.tailType != TailType.RACCOON ? 2 : 4, 0, 0));
        }
        DisplayText.text("\n\n");
    }
}

