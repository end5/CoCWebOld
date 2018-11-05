import { randInt } from '../../../../../Engine/Utilities/SMath';
import { fatigueRecovery } from '../../../../Combat/CombatUtils';
import { PerkType } from '../../../../Effects/PerkType';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { PlayerFlags } from '../../PlayerFlags';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Attack implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Attack";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void {
        if (!character.combat.effects.has(CombatEffectType.FirstAttack)) {
            CView.clear();
            fatigueRecovery(character);
        }

        if (!missNoAttack(character)) {
            if (character.perks.has(PerkType.DoubleAttack) && character.stats.spe >= 50 && PlayerFlags.DOUBLE_ATTACK_STYLE < 2) {
                if (character.combat.effects.has(CombatEffectType.FirstAttack))
                    character.combat.effects.remove(CombatEffectType.FirstAttack);
                else {
                    // Always!
                    if (PlayerFlags.DOUBLE_ATTACK_STYLE === 0)
                        character.combat.effects.add(CombatEffectType.FirstAttack, character);
                    // Alternate!
                    else if (character.stats.str < 61 && PlayerFlags.DOUBLE_ATTACK_STYLE === 1)
                        character.combat.effects.add(CombatEffectType.FirstAttack, character);
                }
            }

            if (!missUsedAttack(character, target)) {
                const crit = canCrit(character);
                let damage = determineDamage(character, target, crit);
                if (character.perks.has(PerkType.HistoryFighter))
                    damage *= 1.1;
                if (target.combat.responses.has(this.name))
                    target.combat.responses.get(this.name)!(target, character, damage, crit);
            }

            if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                this.use(character, target);
                return;
            }
            else
                CView.text("\n");
        }
    }
}

function missNoAttack(character: Character): boolean {
    if (PlayerFlags.FETISH >= 3) {
        CView.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n");
        return true;
    }
    return false;
}

function missUsedAttack(character: Character, enemy: Character): boolean {
    if (character.combat.effects.has(CombatEffectType.Blind)) {
        CView.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        return true;
    }
    return false;
}

function canCrit(character: Character): boolean {
    return randInt(100) <= 4 || (character.perks.has(PerkType.Tactician) && character.stats.int >= 50 && (character.stats.int - 50) / 5 > randInt(100));
}

function determineDamage(character: Character, enemy: Character, crit: boolean): number {
    let damage: number = 0;
    // Double Attack Hybrid Reductions
    if (
        character.perks.has(PerkType.DoubleAttack) &&
        character.stats.spe >= 50 &&
        character.stats.str > 61 &&
        PlayerFlags.DOUBLE_ATTACK_STYLE === 0
    ) {
        damage = 60.5;
    }
    else
        damage = character.stats.str;

    // Weapon addition!
    damage += character.inventory.equipment.weapon.attack;

    // Determine if critical hit!
    if (crit) {
        damage *= 1.75;
    }

    // Thunderous Strikes
    if (character.perks.has(PerkType.ThunderousStrikes) && character.stats.str >= 80)
        damage *= 1.2;

    // if (character.perks.has(PerkType.ChiReflowMagic)) damage *= UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
    // if (character.perks.has(PerkType.ChiReflowAttack)) damage *= UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;

    damage = Math.round(damage);
    return damage;
}
