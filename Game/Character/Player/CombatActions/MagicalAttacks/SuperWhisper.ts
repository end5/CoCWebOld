import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class SuperWhisperAttack extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Whisper";
    public readonly baseCost: number = 10;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Whispered);
    }

    public canUse(character: Character): boolean {
        if (!character.perks.has(PerkType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            this.reasonCannotUse = "You are too tired to use this ability.";
            return false;
        }
        if (character.combat.effects.has(CombatEffectType.ThroatPunch) || character.combat.effects.has(CombatEffectType.WebSilence)) {
            this.reasonCannotUse = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        character.stats.fatigueMagic(this.baseCost);
        if (monster.combat.effects.has(CombatEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.perks.has(PerkType.Focused)) {
            if (!monster.desc.plural)
                CView.text(monster.desc.capitalA + monster.desc.short + " is too focused for your whispers to influence!\n\n");
            return;
        }
        // Enemy too strong or multiplesI think you
        if (character.stats.int < monster.stats.int || monster.desc.plural) {
            CView.text("You reach for your enemy's mind, but can't break through.\n");
            character.stats.fatigue += 10;
            return;
        }
        // [Failure]
        if (randInt(10) === 0) {
            CView.text("As you reach for your enemy's mind, you are distracted and the chorus of voices screams out all at once within your mind. You're forced to hastily silence the voices to protect yourself.");
            character.stats.fatigue += 10;
            return;
        }
        CView.text("You reach for your enemy's mind, watching as its sudden fear petrifies your foe.\n\n");
        monster.combat.effects.add(CombatEffectType.Fear, character, {
            duration: 1
        });
    }
}
