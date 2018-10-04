import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { PerkType } from '../PerkType';
import { Gender } from '../../Body/GenderIdentity';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { describeCock } from '../../Descriptors/CockDescriptor';
import { describeButthole } from '../../Descriptors/ButtDescriptor';
import { CView } from '../../../Engine/Display/ContentView';

export class TemporaryHeat extends CombatEffect {
    public update(character: Character) {
        if (character.perks.has(PerkType.Medicine) && randInt(100) <= 14) {
            character.combat.effects.remove(CombatEffectType.TemporaryHeat);
            CView.text("You manage to cleanse the heat and rut drug from your system with your knowledge of medicine!");
            CView.text("\n\n");
        }
        else {
            character.stats.lust += (character.stats.lib / 12 + 5 + randInt(5));
            let out: string;
            if (character.body.vaginas.length > 0) {
                out = "Your " + describeVagina(character, character.body.vaginas.get(0)) + " clenches with an instinctual desire to be touched and filled.  ";
            }
            else if (character.body.cocks.length > 0) {
                out = "Your " + describeCock(character, character.body.cocks.get(0)) + " pulses and twitches, overwhelmed with the desire to breed.  ";
            }
            if (character.gender === Gender.NONE) {
                out = "You feel a tingle in your " + describeButthole(character.body.butt) + ", and the need to touch and fill it nearly overwhelms you.  ";
            }
            CView.text(out + "If you don't finish this soon you'll give in to this potent drug!");
            CView.text("\n\n");
        }
    }
}
