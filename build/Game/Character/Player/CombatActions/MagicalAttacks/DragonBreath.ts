import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CharacterType } from '../../../CharacterType';
import { PlayerSpellAction } from '../PlayerSpellAction';

export class DragonBreath extends PlayerSpellAction {
    public name: string = "DragonFire";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Dragonfire);
    }

    public canUse(character: Character): boolean {
        if (!character.perks.has(PerkType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            this.reasonCannotUse = "You are too tired to breathe fire.";
            return false;
        }
        // Not Ready Yet:
        if (character.statusAffects.has(StatusAffectType.DragonBreathCooldown)) {
            this.reasonCannotUse = "You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again...";
            return false;
        }
        return true;
    }

    public use(character: Character, monster: Character): NextScreenChoices {
        DisplayText().clear();
        character.stats.fatigueMagic(this.baseCost);
        character.statusAffects.add(StatusAffectType.DragonBreathCooldown, 0, 0, 0, 0);
        let damage: number = Math.floor(character.stats.level * 8 + 25 + randInt(10));
        if (character.statusAffects.has(StatusAffectType.DragonBreathBoost)) {
            character.statusAffects.remove(StatusAffectType.DragonBreathBoost);
            damage *= 1.5;
        }
        // Shell
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        // Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText("Amily easily glides around your attack thanks to her complete concentration on your movements.");
            return;
        }
        if (monster.charType === CharacterType.LivingStatue) {
            DisplayText("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        DisplayText("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + monster.desc.objectivePronoun + ".  " + monster.desc.capitalA + monster.desc.short + " does " + monster.desc.possessivePronoun + " best to avoid it, but the wave of force is too fast.");
        if (monster.statusAffects.has(StatusAffectType.Sandstorm)) {
            DisplayText("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        // Miss:
        if ((character.statusAffects.has(StatusAffectType.Blind) && randInt(2) === 0) || (monster.stats.spe - character.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - character.stats.spe) / 4) + 80)) > 80)) {
            DisplayText("  Despite the heavy impact caused by your roar, " + monster.desc.a + monster.desc.short + " manages to take it at an angle and remain on " + monster.desc.possessivePronoun + " feet and focuses on you, ready to keep fighting.");
        }
        // Special enemy avoidances
        else if (monster.desc.short === "Vala") {
            DisplayText("Vala beats her wings with surprising strength, blowing the fireball back at you! ");
            if (character.perks.has(PerkType.Evade) && randInt(2) === 0) {
                DisplayText("You dive out of the way and evade it!");
            }
            else if (character.perks.has(PerkType.Flexibility) && randInt(4) === 0) {
                DisplayText("You use your flexibility to barely fold your body out of the way!");
            }
            else {
                damage = character.combat.stats.loseHP(damage, monster);
                DisplayText("Your own fire smacks into your face! (" + damage + ")");
            }
            DisplayText("\n\n");
        }
        // Goos burn
        else if (monster.desc.short === "goo-girl") {
            DisplayText(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skin.tone + " skin has lost some of its shimmer. ");
            if (!monster.perks.has(PerkType.Acid))
                monster.perks.add(PerkType.Acid, 0, 0, 0, 0);
            damage = Math.round(damage * 1.5);
            damage = monster.combat.stats.loseHP(damage, character);
            monster.statusAffects.add(StatusAffectType.Stunned, 0, 0, 0, 0);
            DisplayText("(" + damage + ")\n\n");
        }
        else {
            if (!monster.perks.has(PerkType.Resolute)) {
                DisplayText("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " crashing to the ground, too dazed to strike back.");
                monster.statusAffects.add(StatusAffectType.Stunned, 1, 0, 0, 0);
            }
            else {
                DisplayText("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " staggering back, but <b>" + monster.desc.subjectivePronoun + " ");
                if (!monster.desc.plural) DisplayText("is ");
                else DisplayText("are");
                DisplayText("too resolute to be stunned by your attack.</b>");
            }
            damage = monster.combat.stats.loseHP(damage, character);
            DisplayText(" (" + damage + ")");
        }
        DisplayText("\n\n");
        // if (monster.desc.short === "Holli" && !monster.statusAffects.has(StatusAffectType.HolliBurning))
        //     monster.lightHolliOnFireMagically() as Holli;
        return;
    }
}
