import { PlayerSpellAction } from './PlayerSpellAction';
import { Character } from '../../../Character/Character';
import { PerkType } from '../../../Effects/PerkType';
import { NextScreenChoices } from '../../../ScreenDisplay';
import { PlayerFlags } from '../PlayerFlags';
import { CView } from '../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';

export abstract class LearnedSpellAction extends PlayerSpellAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.Spells;
    public abstract castSpell(character: Character, enemy: Character): void | NextScreenChoices;

    public use(character: Character, enemy: Character): void | NextScreenChoices {
        PlayerFlags.SPELLS_CAST++;
        this.spellPerkUnlock(character);
        return this.castSpell(character, enemy);
    }

    protected spellPerkUnlock(character: Character): void {
        if (PlayerFlags.SPELLS_CAST >= 5 && !character.perks.has(PerkType.SpellcastingAffinity)) {
            CView.text("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
            character.perks.add(PerkType.SpellcastingAffinity, 20, 0, 0, 0);
        }
        if (PlayerFlags.SPELLS_CAST >= 15 && character.perks.get(PerkType.SpellcastingAffinity).value1 < 35) {
            CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity).value1 = 35;
        }
        if (PlayerFlags.SPELLS_CAST >= 45 && character.perks.get(PerkType.SpellcastingAffinity).value1 < 50) {
            CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity).value1 = 50;
        }
    }
}
