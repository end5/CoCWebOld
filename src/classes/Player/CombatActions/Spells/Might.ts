import BlackMagic from './BlackMagic';
import Character from '../../../Character/Character';
import ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';

export class Might extends BlackMagic {
    public name: string = "Might";
    public readonly baseCost: number = 25;
    
    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.KnowsMight);
    }

    public canUse(player: Player): boolean {
        if (player.statusAffects.has(StatusAffectType.Might)) {
            this.reasonCannotUse = "<b>You are already under the effects of Might and cannot cast it again.</b>\n\n";
            return false;
        }
        return super.canUse(player);
    }

    public castSpell(player: Player, monster: Character) {
        player.stats.fatigueMagic(this.baseCost);
        DisplayText.clear();
        DisplayText.text("You flush, drawing on your body's desires to empower your muscles and toughen you up.\n\n");
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
            DisplayText.text("The rush of success and power flows through your body.  You feel like you can do anything!");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Might, 0, 0, 0, 0));
            let temp = 5 * player.combat.stats.spellMod();
            let tempStr = temp;
            let tempTou = temp;
            if (player.stats.str + temp > 100) tempStr = 100 - player.stats.str;
            if (player.stats.tou + temp > 100) tempTou = 100 - player.stats.tou;
            player.statusAffects.get(StatusAffectType.Might).value1 = tempStr;
            player.statusAffects.get(StatusAffectType.Might).value2 = tempTou;
            player.stats.str += player.statusAffects.get(StatusAffectType.Might).value1;
            player.stats.tou += player.statusAffects.get(StatusAffectType.Might).value2;
        }
        DisplayText.text("\n\n");
    }
}
