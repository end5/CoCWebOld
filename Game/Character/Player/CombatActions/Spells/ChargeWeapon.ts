import { WhiteMagic } from './WhiteMagic';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CView } from '../../../../../Engine/Display/ContentView';

export class ChargeWeapon extends WhiteMagic {
    public name: string = "Charge W.";
    public readonly baseCost: number = 15;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsCharge);
    }

    public canUse(character: Character): boolean {
        if (character.effects.has(StatusEffectType.ChargeWeapon)) {
            this.reasonCannotUse = "<b>Charge weapon is already active and cannot be cast again.</b>\n\n";
            return false;
        }
        return super.canUse(character);
    }

    public castSpell(character: Character, monster: Character): void | NextScreenChoices {
        character.stats.fatigueMagic(this.baseCost);
        CView.clear();
        CView.text("You utter words of power, summoning an electrical charge around your " + character.inventory.equipment.weapon.displayName + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n");
        character.effects.add(StatusEffectType.ChargeWeapon, 10 * character.combat.stats.spellMod(), 0, 0, 0);
    }
}
