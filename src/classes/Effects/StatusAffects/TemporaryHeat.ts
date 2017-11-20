import Character from '../../Character/Character';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class TemporaryHeat extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        if (character.perks.has(PerkType.Medicine) && Utils.rand(100) <= 14) {
            character.statusAffects.remove(StatusAffectType.TemporaryHeat);
            return "You manage to cleanse the heat and rut drug from your system with your knowledge of medicine!\n\n";
        }
        else {
            character.stats.lust += (character.stats.lib / 12 + 5 + Utils.rand(5));
            let out: string;
            if (character.lowerBody.vaginaSpot.hasVagina()) {
                out = "Your " + VaginaDescriptor.describeVagina(character, character.lowerBody.vaginaSpot.get(0)) + " clenches with an instinctual desire to be touched and filled.  ";
            }
            else if (character.lowerBody.cockSpot.count() > 0) {
                out = "Your " + CockDescriptor.describeCock(character, character.lowerBody.cockSpot.get(0)) + " pulses and twitches, overwhelmed with the desire to breed.  ";
            }
            if (character.gender == 0) {
                out = "You feel a tingle in your " + ButtDescriptor.describeButthole(character) + ", and the need to touch and fill it nearly overwhelms you.  ";
            }
            return out + "If you don't finish this soon you'll give in to this potent drug!\n\n";
        }
    }
}
