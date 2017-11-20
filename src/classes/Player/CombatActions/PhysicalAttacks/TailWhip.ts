import { TailType } from '../../../Body/LowerBody';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class TailWhip implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.lowerBody.tailType == (TailType.SHARK || TailType.LIZARD || TailType.KANGAROO || TailType.DRACONIC || TailType.RACCOON);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        //miss
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            DisplayText.text("Twirling like a top, you swing your tail, but connect with only empty air.");
        }
        else {
            if (!monster.desc.plural)
                DisplayText.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " looks disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon becomes irate and redoubles " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            else
                DisplayText.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.desc.subjectivePronoun + " look disbelieving, as if " + monster.desc.possessivePronoun + " world turned upside down, but " + monster.desc.subjectivePronoun + " soon become irate and redouble " + monster.desc.possessivePronoun + " offense, leaving large holes in " + monster.desc.possessivePronoun + " guard.  If you're going to take advantage, it had better be right away; " + monster.desc.subjectivePronoun + "'ll probably cool off very quickly.");
            if (!monster.statusAffects.has("CoonWhip"))
                monster.statusAffects.add(StatusAffectFactory.create(StatusAffectType.CoonWhip, Math.round(monster.defense() * .75), player.lowerBody.tailType != TailType.RACCOON ? 2 : 4, 0, 0));
        }
        DisplayText.text("\n\n");
    }
}

