import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class KitsuneTerror extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Terror";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.CorruptedNinetails);
    }

    public canUse(character: Character, monster: Character): boolean {
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
        // Fatigue Cost: 25
        if (monster.combat.effects.has(CombatEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.desc.short === "pod" || monster.stats.int === 0) {
            CView.text("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n");
            character.stats.fatigue++;
            return;
        }
        character.stats.fatigueMagic(this.baseCost);
        // Inflicts fear and reduces enemy SPD.
        CView.text("The world goes dark, an inky shadow blanketing everything in sight as you fill " + monster.desc.a + monster.desc.short + "'s mind with visions of otherworldly terror that defy description.");
        // (succeed)
        if (character.stats.int / 10 + randInt(20) + 1 > monster.stats.int / 10 + 10) {
            CView.text("  They cower in horror as they succumb to your illusion, believing themselves beset by eldritch horrors beyond their wildest nightmares.\n\n");
            monster.combat.effects.add(CombatEffectType.Fear, character, {
                duration: 1
            });
            monster.stats.spe -= 5;
            if (monster.stats.spe < 1)
                monster.stats.spe = 1;
        }
        else
            CView.text("  The dark fog recedes as quickly as it rolled in as they push back your illusions, resisting your hypnotic influence.\n\n");
    }
}
