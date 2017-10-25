import SpellAction from './SpellAction';
import Character from '../../Character/Character';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';

export default abstract class LearnedSpellAction extends SpellAction {
    abstract castSpell(player: Player, enemy: Character);

    public use(player: Player, enemy: Character) {
        this.castSpell(player, enemy);
        Flags.list[FlagEnum.SPELLS_CAST]++;
        this.spellPerkUnlock(player);
    }
    
    protected spellPerkUnlock(player: Player): void {
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 5 && !player.perks.has("SpellcastingAffinity")) {
            MainScreen.text("<b>You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!</b>\n\n");
            player.perks.add(new Perk("SpellcastingAffinity", 20, 0, 0, 0));
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 15 && player.perks.get("SpellcastingAffinity").value1 < 35) {
            MainScreen.text("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
            player.perks.get("SpellcastingAffinity").value1 = 35;
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 45 && player.perks.get("SpellcastingAffinity").value1 < 50) {
            MainScreen.text("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
            player.perks.get("SpellcastingAffinity").value1 = 50;
        }
    }    
}
