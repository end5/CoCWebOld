import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class CorruptedFoxFire extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "C.FoxFire";
    public readonly baseCost: number = 35;

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
        character.stats.fatigueMagic(this.baseCost);
        // Deals direct damage and lust regardless of enemy defenses.  Especially effective against non-corrupted targets.
        CView.text("Holding out your palm, you conjure corrupted purple flame that dances across your fingertips.  You launch it at " + monster.desc.a + monster.desc.short + " with a ferocious throw, and it bursts on impact, showering dazzling lavender sparks everywhere.");

        let damage: number = Math.floor(10 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.stats.spellMod());
        if (monster.stats.cor >= 66) damage = Math.round(damage * .66);
        else if (monster.stats.cor >= 50) damage = Math.round(damage * .8);
        // High damage to goes.
        if (monster.desc.short === "goo-girl") damage = Math.round(damage * 1.5);
        // Using fire attacks on the goo]
        if (monster.desc.short === "goo-girl") {
            CView.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.body.skin.tone + " skin has lost some of its shimmer.");
            if (!monster.perks.has(PerkType.Acid))
                monster.perks.add(PerkType.Acid);
        }
        damage = monster.combat.stats.loseHP(damage);
        CView.text("  (" + damage + ")\n\n");
    }
}
