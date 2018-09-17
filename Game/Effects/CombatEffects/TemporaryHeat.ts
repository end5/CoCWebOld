import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { PerkType } from '../PerkType';

export class TemporaryHeat extends CombatEffect {
    public update(character: Character) {
        if (character.perks.has(PerkType.Medicine) && randInt(100) <= 14) {
            character.combat.effects.remove(CombatEffectType.TemporaryHeat);
            DisplayText("You manage to cleanse the heat and rut drug from your system with your knowledge of medicine!");
            DisplayText("\n\n");
        }
        else {
            character.stats.lust += (character.stats.lib / 12 + 5 + randInt(5));
            let out: string;
            if (character.torso.vaginas.count > 0) {
                out = "Your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " clenches with an instinctual desire to be touched and filled.  ";
            }
            else if (character.torso.cocks.count > 0) {
                out = "Your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " pulses and twitches, overwhelmed with the desire to breed.  ";
            }
            if (character.gender === Gender.NONE) {
                out = "You feel a tingle in your " + Desc.Butt.describeButthole(character.torso.butt) + ", and the need to touch and fill it nearly overwhelms you.  ";
            }
            DisplayText(out + "If you don't finish this soon you'll give in to this potent drug!");
            DisplayText("\n\n");
        }
    }
}
