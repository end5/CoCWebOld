import { BlackMagic } from './BlackMagic';
import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { Desc } from '../../../../Descriptors/Descriptors';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';

export class Might extends BlackMagic {
    public name: string = "Might";
    public readonly baseCost: number = 25;

    public isPossible(character: Character): boolean {
        return character.statusAffects.has(StatusAffectType.KnowsMight);
    }

    public canUse(character: Character): boolean {
        if (character.statusAffects.has(StatusAffectType.Might)) {
            this.reasonCannotUse = "<b>You are already under the effects of Might and cannot cast it again.</b>\n\n";
            return false;
        }
        return super.canUse(character);
    }

    public castSpell(character: Character, monster: Character): NextScreenChoices {
        character.stats.fatigueMagic(this.baseCost);
        DisplayText().clear();
        DisplayText("You flush, drawing on your body's desires to empower your muscles and toughen you up.\n\n");
        // 25% backfire!
        if (randInt(4) === 0) {
            DisplayText("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ");
            if (character.gender === 0) DisplayText(Desc.Butt.describeButthole(character.torso.butt) + " tingles with a desire to be filled as your libido spins out of control.");
            if (character.gender === 1) {
                if (character.torso.cocks.count === 1) DisplayText(Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " twitches obscenely and drips with pre-cum as your libido spins out of control.");
                else DisplayText(Desc.Cock.describeMultiCockShort(character) + " twitch obscenely and drip with pre-cum as your libido spins out of control.");
            }
            if (character.gender === 2) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.");
            if (character.gender === 3) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " and " + Desc.Cock.describeMultiCockShort(character) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.");
            character.stats.lib += .25;
            character.stats.lust += 15;
        }
        else {
            DisplayText("The rush of success and power flows through your body.  You feel like you can do anything!");
            character.statusAffects.add(StatusAffectType.Might, 0, 0, 0, 0);
            const temp = 5 * character.combat.stats.spellMod();
            let tempStr = temp;
            let tempTou = temp;
            if (character.stats.str + temp > 100) tempStr = 100 - character.stats.str;
            if (character.stats.tou + temp > 100) tempTou = 100 - character.stats.tou;
            character.statusAffects.get(StatusAffectType.Might).value1 = tempStr;
            character.statusAffects.get(StatusAffectType.Might).value2 = tempTou;
            character.stats.str += character.statusAffects.get(StatusAffectType.Might).value1;
            character.stats.tou += character.statusAffects.get(StatusAffectType.Might).value2;
        }
        DisplayText("\n\n");
        return;
    }
}
