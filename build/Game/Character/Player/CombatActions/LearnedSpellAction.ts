import PlayerSpellAction from './PlayerSpellAction';
import DisplayText from '../../../../Engine/display/DisplayText';
import Character from '../../../Character/Character';
import { PerkType } from '../../../Effects/PerkType';
import User from '../../../User';
import PlayerFlags from '../PlayerFlags';

export default abstract class LearnedSpellAction extends PlayerSpellAction {
    public abstract castSpell(character: Character, enemy: Character);

    public use(character: Character, enemy: Character) {
        this.castSpell(character, enemy);
        (User.flags.get("Player") as PlayerFlags).SPELLS_CAST++;
        this.spellPerkUnlock(character);
    }

    protected spellPerkUnlock(character: Character): void {
        if ((User.flags.get("Player") as PlayerFlags).SPELLS_CAST >= 5 && !character.perks.has(PerkType.SpellcastingAffinity)) {
            DisplayText("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
            character.perks.add(PerkType.SpellcastingAffinity, 20, 0, 0, 0);
        }
        if ((User.flags.get("Player") as PlayerFlags).SPELLS_CAST >= 15 && character.perks.get(PerkType.SpellcastingAffinity).value1 < 35) {
            DisplayText("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity).value1 = 35;
        }
        if ((User.flags.get("Player") as PlayerFlags).SPELLS_CAST >= 45 && character.perks.get(PerkType.SpellcastingAffinity).value1 < 50) {
            DisplayText("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity).value1 = 50;
        }
    }
}
