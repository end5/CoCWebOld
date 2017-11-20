import WhiteMagic from './WhiteMagic';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Player from '../../../Player/Player';

export default class SpellChargeWeapon extends WhiteMagic {
    public isPossible(player: Player): boolean {
        return player.statusAffects.has("KnowsCharge");
    }
    public canUse(player: Player): boolean {
        if (player.statusAffects.has("ChargeWeapon")) {
            this.reason = "<b>Charge weapon is already active and cannot be cast again.</b>\n\n";
            return false;
        }
        return super.canUse(player);
    }
    public readonly baseCost: number = 15;
    public castSpell(player: Player, monster: Character) {
        player.stats.fatigueMagic(this.baseCost);
        DisplayText.clear();
        DisplayText.text("You utter words of power, summoning an electrical charge around your " + player.inventory.weaponSlot.equipment.displayname + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n");
        player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.ChargeWeapon, 10 * player.spellMod(), 0, 0, 0));
    }
}
