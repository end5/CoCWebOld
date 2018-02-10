import BlackMagic from './BlackMagic';
import Character from '../../../Character/Character';
import ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';

export class Heal extends BlackMagic {
    public name: string = "Heal";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.statusAffects.has(StatusAffectType.KnowsHeal);
    }

    public castSpell(character: Character, monster: Character) {
        character.stats.fatigueMagic(this.baseCost);
        DisplayText().clear();
        DisplayText("You focus on your body and its desire to end pain, trying to draw on your arousal without enhancing it.\n");
        // 25% backfire!
        if (Utils.rand(4) === 0) {
            DisplayText("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ");
            if (character.gender === 0) DisplayText(ButtDescriptor.describeButthole(character) + " tingles with a desire to be filled as your libido spins out of control.");
            if (character.gender === 1) {
                if (character.torso.cocks.count === 1) DisplayText(CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " twitches obscenely and drips with pre-cum as your libido spins out of control.");
                else DisplayText(CockDescriptor.describeMultiCockShort(character) + " twitch obscenely and drip with pre-cum as your libido spins out of control.");
            }
            if (character.gender === 2) DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.");
            if (character.gender === 3) DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " and " + CockDescriptor.describeMultiCockShort(character) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.");
            character.stats.lib += .25;
            character.stats.lust += 15;
        }
        else {
            let hpGain = Math.floor((character.stats.int / (2 + Utils.rand(3)) * character.combat.stats.spellMod()) * (character.stats.maxHP() / 150));
            if (character.inventory.equipment.armor.displayName === "skimpy nurse's outfit")
                hpGain *= 1.2;
            DisplayText("You flush with success as your wounds begin to knit (+" + hpGain + ").");
            character.combat.stats.gainHP(hpGain, character);
        }
        DisplayText("\n\n");
    }
}
