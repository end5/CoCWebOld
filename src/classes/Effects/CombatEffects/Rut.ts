import Character from '../../Character/Character';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { Utils } from '../../Utilities/Utils';
import CombatEffect from '../CombatEffect';

export class Rut extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.torso.cocks.count > 0 && enemy.torso.vaginas.count > 0) {
            character.stats.lust += (Utils.rand(character.stats.lib / 5) + 3 + Utils.rand(5));
            let out: string;
            if (character.torso.cocks.count > 1)
                out = "Each of y";
            else
                out = "Y";
            if (enemy.desc.plural)
                out += "our " + CockDescriptor.describeMultiCockShort(character) + " dribbles pre-cum as you think about plowing " + enemy.desc.a + enemy.desc.short + " right here and now, fucking " + enemy.desc.possessivePronoun + " " + VaginaDescriptor.describeVagina(enemy, enemy.torso.vaginas.get(0)) + "s until they're totally fertilized and pregnant.";
            else
                out += "our " + CockDescriptor.describeMultiCockShort(character) + " dribbles pre-cum as you think about plowing " + enemy.desc.a + enemy.desc.short + " right here and now, fucking " + enemy.desc.possessivePronoun + " " + VaginaDescriptor.describeVagina(enemy, enemy.torso.vaginas.get(0)) + " until it's totally fertilized and pregnant.";
            DisplayText(out);
            DisplayText("\n\n");
        }
    }
}
