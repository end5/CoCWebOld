import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CharacterType } from '../../../CharacterType';
import { LearnedSpellAction } from '../LearnedSpellAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { PlayerFlags } from '../../PlayerFlags';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class CleansingPalm extends LearnedSpellAction {
    public name: string = "C.Palm";
    public readonly baseCost: number = 30;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.CleansingPalm) && character.stats.cor < 10;
    }

    public castSpell(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        character.stats.fatigueMagic(this.baseCost);
        if (monster.combat.effects.has(CombatEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }

        if (monster.desc.short === "Jojo") {
            // Not a completely corrupted monkmouse
            if (PlayerFlags.monk < 2) {
                CView.text("You thrust your palm forward, sending a blast of pure energy towards Jojo. At the last second he sends a blast of his own against yours canceling it out\n\n");
                return;
            }
        }

        if (monster.charType === CharacterType.LivingStatue) {
            CView.text("You thrust your palm forward, causing a blast of pure energy to slam against the giant stone statue- to no effect!");
            return;
        }

        let corruptionMulti: number = (monster.stats.cor - 20) / 25;
        if (corruptionMulti > 1.5) corruptionMulti = 1.5;

        let damage = Math.floor((character.stats.int / 4 + randInt(character.stats.int / 3)) * (character.combat.stats.spellMod() * corruptionMulti));

        if (damage > 0) {
            CView.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.desc.a + monster.desc.short + ", tossing");
            CView.text(" " + monster.desc.objectivePronoun);
            CView.text(" back a few feet.\n\n");

            CView.text(monster.desc.capitalA + monster.desc.short + " takes " + damage + " damage.\n\n");
        }
        else {
            damage = 0;
            CView.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.desc.a + monster.desc.short + ", which they ignore. It is probably best you don’t use this technique against the pure.\n\n");
        }
        monster.combat.stats.loseHP(damage);
    }
}
