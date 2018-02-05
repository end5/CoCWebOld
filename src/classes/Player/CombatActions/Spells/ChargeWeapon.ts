import WhiteMagic from './WhiteMagic';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../Player';

export class ChargeWeapon extends WhiteMagic {
    public name: string = "Charge W.";
    public readonly baseCost: number = 15;

    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.KnowsCharge);
    }

    public canUse(player: Player): boolean {
        if (player.statusAffects.has(StatusAffectType.ChargeWeapon)) {
            this.reasonCannotUse = "<b>Charge weapon is already active and cannot be cast again.</b>\n\n";
            return false;
        }
        return super.canUse(player);
    }

    public castSpell(player: Player, monster: Character) {
        player.stats.fatigueMagic(this.baseCost);
        DisplayText().clear();
        DisplayText("You utter words of power, summoning an electrical charge around your " + player.inventory.equipment.weapon.displayname + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n");
        player.statusAffects.add(StatusAffectType.ChargeWeapon, 10 * player.combat.stats.spellMod(), 0, 0, 0);
    }
}
