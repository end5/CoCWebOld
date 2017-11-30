import Character from '../../../Character/Character';
import Player from '../../Player';
import LearnedSpellAction from '../LearnedSpellAction';

export default abstract class BlackMagic extends LearnedSpellAction {
    public canUse(player: Player, monster?: Character): boolean {
        if (player.stats.lust < 50) {
            this.reasonCannotUse = "You aren't turned on enough to use any black magics.\n\n";
            return false;
        }
        return super.canUse(player);
    }
}
