import PlayerSpellAction from './PlayerSpellAction';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../Player';

export default abstract class LearnedSpellAction extends PlayerSpellAction {
    public abstract castSpell(player: Player, enemy: Character);

    public use(player: Player, enemy: Character) {
        this.castSpell(player, enemy);
        Flags.list[FlagEnum.SPELLS_CAST]++;
        this.spellPerkUnlock(player);
    }

    protected spellPerkUnlock(player: Player): void {
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 5 && !player.perks.has(PerkType.SpellcastingAffinity)) {
            DisplayText("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
            player.perks.set(PerkType.SpellcastingAffinity, PerkFactory.create(PerkType.SpellcastingAffinity, 20, 0, 0, 0));
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 15 && player.perks.get(PerkType.SpellcastingAffinity).value1 < 35) {
            DisplayText("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            player.perks.get(PerkType.SpellcastingAffinity).value1 = 35;
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 45 && player.perks.get(PerkType.SpellcastingAffinity).value1 < 50) {
            DisplayText("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            player.perks.get(PerkType.SpellcastingAffinity).value1 = 50;
        }
    }
}
