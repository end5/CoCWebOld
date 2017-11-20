import BlackMagic from './BlackMagic';
import Character from '../../../Character/Character';
import ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';

export class Heal extends BlackMagic {
    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.KnowsHeal);
    }
    public readonly baseCost: number = 20;
    public castSpell(player: Player, monster: Character) {
        player.stats.fatigueMagic(this.baseCost);
        DisplayText.clear();
        DisplayText.text("You focus on your body and its desire to end pain, trying to draw on your arousal without enhancing it.\n");
        //25% backfire!
        if (Utils.rand(4) == 0) {
            DisplayText.text("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ");
            if (player.gender == 0) DisplayText.text(ButtDescriptor.describeButthole(player) + " tingles with a desire to be filled as your libido spins out of control.");
            if (player.gender == 1) {
                if (player.lowerBody.cockSpot.count() == 1) DisplayText.text(CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " twitches obscenely and drips with pre-cum as your libido spins out of control.");
                else DisplayText.text(CockDescriptor.describeMultiCockShort(player) + " twitch obscenely and drip with pre-cum as your libido spins out of control.");
            }
            if (player.gender == 2) DisplayText.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.");
            if (player.gender == 3) DisplayText.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and " + CockDescriptor.describeMultiCockShort(player) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.");
            player.stats.lib += .25;
            player.stats.lust += 15;
        }
        else {
            let hpGain = Math.floor((player.stats.int / (2 + Utils.rand(3)) * player.spellMod()) * (player.stats.maxHP() / 150));
            if (player.inventory.armorSlot.equipment.displayName == "skimpy nurse's outfit")
                hpGain *= 1.2;
            DisplayText.text("You flush with success as your wounds begin to knit (+" + hpGain + ").");
            player.combat.gainHP(hpGain, player);
        }
        DisplayText.text("\n\n");
    }
}
