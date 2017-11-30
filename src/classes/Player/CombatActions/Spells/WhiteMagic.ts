import Character from '../../../Character/Character';
import { PerkType } from '../../../Effects/PerkType';
import Player from '../../Player';
import LearnedSpellAction from '../LearnedSpellAction';

export default abstract class WhiteMagic extends LearnedSpellAction {
    public canUse(player: Player, monster?: Character): boolean {
        let whiteLustCap: number = 75;
        if (player.perks.has(PerkType.Enlightened) && player.stats.cor < 10)
            whiteLustCap += 10;
        if (player.stats.lust >= whiteLustCap) {
            this.reasonCannotUse = "You are far too aroused to focus on white magic.\n\n";
            return false;
        }
        return super.canUse(player);
    }
}
