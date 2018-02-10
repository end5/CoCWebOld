import PlayerSpellAction from './PlayerSpellAction';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';

export default abstract class LearnedSpellAction extends PlayerSpellAction {
    public abstract castSpell(character: Character, enemy: Character);

    public use(character: Character, enemy: Character) {
        this.castSpell(character, enemy);
        Flags.list[FlagEnum.SPELLS_CAST]++;
        this.spellPerkUnlock(character);
    }

    protected spellPerkUnlock(character: Character): void {
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 5 && !character.perks.has(PerkType.SpellcastingAffinity)) {
            DisplayText("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
            character.perks.add(PerkType.SpellcastingAffinity, 20, 0, 0, 0);
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 15 && character.perks.get(PerkType.SpellcastingAffinity).value1 < 35) {
            DisplayText("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity).value1 = 35;
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 45 && character.perks.get(PerkType.SpellcastingAffinity).value1 < 50) {
            DisplayText("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity).value1 = 50;
        }
    }
}
