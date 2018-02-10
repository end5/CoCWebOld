import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';
import LearnedSpellAction from '../LearnedSpellAction';

export class CleansingPalm extends LearnedSpellAction {
    public name: string = "C.Palm";
    public readonly baseCost: number = 30;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.CleansingPalm) && character.stats.cor < 10;
    }

    public castSpell(character: Character, monster: Character) {
        DisplayText().clear();
        character.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }

        if (monster.desc.short === "Jojo") {
            // Not a completely corrupted monkmouse
            if (Game.monk < 2) {
                DisplayText("You thrust your palm forward, sending a blast of pure energy towards Jojo. At the last second he sends a blast of his own against yours canceling it out\n\n");
                return;
            }
        }

        if (monster.charType === CharacterType.LivingStatue) {
            DisplayText("You thrust your palm forward, causing a blast of pure energy to slam against the giant stone statue- to no effect!");
            return;
        }

        let corruptionMulti: number = (monster.stats.cor - 20) / 25;
        if (corruptionMulti > 1.5) corruptionMulti = 1.5;

        let damage = Math.floor((character.stats.int / 4 + Utils.rand(character.stats.int / 3)) * (character.combat.stats.spellMod() * corruptionMulti));

        if (damage > 0) {
            DisplayText("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.desc.a + monster.desc.short + ", tossing");
            DisplayText(" " + monster.desc.objectivePronoun);
            DisplayText(" back a few feet.\n\n");

            DisplayText(monster.desc.capitalA + monster.desc.short + " takes " + damage + " damage.\n\n");
        }
        else {
            damage = 0;
            DisplayText("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.desc.a + monster.desc.short + ", which they ignore. It is probably best you don’t use this technique against the pure.\n\n");
        }
        monster.combat.stats.loseHP(damage, character);
    }
}
