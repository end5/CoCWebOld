import { WhiteMagic } from './WhiteMagic';
import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../SceneDisplay';
import { Character } from '../../../Character';

export class ChargeWeapon extends WhiteMagic {
    public name: string = "Charge W.";
    public readonly baseCost: number = 15;

    public isPossible(character: Character): boolean {
        return character.statusAffects.has(StatusAffectType.KnowsCharge);
    }

    public canUse(character: Character): boolean {
        if (character.statusAffects.has(StatusAffectType.ChargeWeapon)) {
            this.reasonCannotUse = "<b>Charge weapon is already active and cannot be cast again.</b>\n\n";
            return false;
        }
        return super.canUse(character);
    }

    public castSpell(character: Character, monster: Character): NextScreenChoices {
        character.stats.fatigueMagic(this.baseCost);
        DisplayText().clear();
        DisplayText("You utter words of power, summoning an electrical charge around your " + character.inventory.equipment.weapon.displayname + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n");
        character.statusAffects.add(StatusAffectType.ChargeWeapon, 10 * character.combat.stats.spellMod(), 0, 0, 0);
        return;
    }
}
