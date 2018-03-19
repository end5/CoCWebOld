import Character from '../../Character/Character';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { Utils } from '../../Utilities/Utils';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { PerkType } from '../PerkType';

export class TemporaryHeat extends CombatEffect {
    public update(character: Character) {
        if (character.perks.has(PerkType.Medicine) && Utils.rand(100) <= 14) {
            character.combat.effects.remove(CombatEffectType.TemporaryHeat);
            DisplayText("You manage to cleanse the heat and rut drug from your system with your knowledge of medicine!");
            DisplayText("\n\n");
        }
        else {
            character.stats.lust += (character.stats.lib / 12 + 5 + Utils.rand(5));
            let out: string;
            if (character.torso.vaginas.count > 0) {
                out = "Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " clenches with an instinctual desire to be touched and filled.  ";
            }
            else if (character.torso.cocks.count > 0) {
                out = "Your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " pulses and twitches, overwhelmed with the desire to breed.  ";
            }
            if (character.gender === 0) {
                out = "You feel a tingle in your " + ButtDescriptor.describeButthole(character.torso.butt) + ", and the need to touch and fill it nearly overwhelms you.  ";
            }
            DisplayText(out + "If you don't finish this soon you'll give in to this potent drug!");
            DisplayText("\n\n");
        }
    }
}
