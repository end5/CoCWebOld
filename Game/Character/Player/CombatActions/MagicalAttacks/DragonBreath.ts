import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class DragonBreath extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "DragonFire";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Dragonfire);
    }

    public canUse(character: Character, monster: Character): boolean {
        if (!character.perks.has(PerkType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            this.reasonCannotUse = "You are too tired to breathe fire.";
            return false;
        }
        // Not Ready Yet:
        if (character.effects.has(StatusEffectType.DragonBreathCooldown)) {
            this.reasonCannotUse = "You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again...";
            return false;
        }
        return true;
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        character.stats.fatigueMagic(this.baseCost);
        character.effects.add(StatusEffectType.DragonBreathCooldown);
        let damage: number = Math.floor(character.stats.level * 8 + 25 + randInt(10));
        if (character.effects.has(StatusEffectType.DragonBreathBoost)) {
            character.effects.remove(StatusEffectType.DragonBreathBoost);
            damage *= 1.5;
        }
        // Shell
        if (monster.combat.effects.has(CombatEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        CView.text("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + monster.desc.objectivePronoun + ".  " + monster.desc.capitalA + monster.desc.short + " does " + monster.desc.possessivePronoun + " best to avoid it, but the wave of force is too fast.");
        if (monster.combat.effects.has(CombatEffectType.Sandstorm)) {
            CView.text("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        // Miss:
        if ((character.combat.effects.has(CombatEffectType.Blind) && randInt(2) === 0) || (monster.stats.spe - character.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - character.stats.spe) / 4) + 80)) > 80)) {
            CView.text("  Despite the heavy impact caused by your roar, " + monster.desc.a + monster.desc.short + " manages to take it at an angle and remain on " + monster.desc.possessivePronoun + " feet and focuses on you, ready to keep fighting.");
        }
        else {
            if (!monster.perks.has(PerkType.Resolute)) {
                CView.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " crashing to the ground, too dazed to strike back.");
                monster.combat.effects.add(CombatEffectType.Stunned, character, { duration: 1 });
            }
            else {
                CView.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " staggering back, but <b>" + monster.desc.subjectivePronoun + " ");
                if (!monster.desc.plural) CView.text("is ");
                else CView.text("are");
                CView.text("too resolute to be stunned by your attack.</b>");
            }
            damage = monster.combat.stats.loseHP(damage);
            CView.text(" (" + damage + ")");
        }
        CView.text("\n\n");
    }
}
