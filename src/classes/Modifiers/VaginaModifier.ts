import Vagina, { VaginaLooseness } from '../Body/Vagina';
import Character from '../Character/Character';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import DisplayText from '../display/DisplayText';
import { PerkType } from '../Effects/PerkType';
import StatusAffectFactory from '../Effects/StatusAffectFactory';
import { StatusAffectType } from '../Effects/StatusAffectType';
import { Utils } from '../Utilities/Utils';

export default class VaginaModifier {
    public static stretchVagina(character: Character, vaginaArea: number): boolean {
        if (character.torso.vaginas.count <= 0)
            return false;
        let stretched: boolean = false;
        const loosestVagina = character.torso.vaginas.sort(Vagina.LoosenessMost)[0];
        if (character.perks.has(PerkType.FerasBoonMilkingTwat) || loosestVagina.looseness <= VaginaLooseness.NORMAL) {
            // cArea > capacity = autostreeeeetch.
            if (vaginaArea >= character.vaginalCapacity()) {
                if (loosestVagina.looseness >= VaginaLooseness.LEVEL_CLOWN_CAR)
                    loosestVagina.looseness++;
                stretched = true;
            }
            // If within top 10% of capacity, 50% stretch
            else if (vaginaArea >= .9 * character.vaginalCapacity() && Utils.chance(50)) {
                loosestVagina.looseness++;
                stretched = true;
            }
            // if within 75th to 90th percentile, 25% stretch
            else if (vaginaArea >= .75 * character.vaginalCapacity() && Utils.chance(25)) {
                loosestVagina.looseness++;
                stretched = true;
            }
        }
        // If virgin
        const virginVaginas = character.torso.vaginas.filter(Vagina.Virgin);
        if (virginVaginas.length > 0) {
            virginVaginas[0].virgin = false;
        }
        // Delay anti-stretching
        if (vaginaArea >= .5 * character.vaginalCapacity()) {
            // Cunt Stretched used to determine how long since last enlargement
            if (!character.statusAffects.has(StatusAffectType.CuntStretched))
                character.statusAffects.set(StatusAffectType.CuntStretched, StatusAffectFactory.create(StatusAffectType.CuntStretched, 0, 0, 0, 0));
            // Reset the timer on it to 0 when restretched.
            else
                character.statusAffects.get(StatusAffectType.CuntStretched).value1 = 0;
        }
        return stretched;
    }

    public static displayStretchVagina(character: Character, cArea: number, display: boolean, spacingsF: boolean = false, spacingsB: boolean = true): boolean {
        if (character.torso.vaginas.count <= 0)
            return false;
        const firstVagina: Vagina = character.torso.vaginas.get(0);
        const wasVirgin: boolean = firstVagina.virgin;
        const stretched: boolean = VaginaModifier.stretchVagina(character, cArea);
        const devirgined: boolean = wasVirgin && !firstVagina.virgin;
        if (devirgined) {
            if (spacingsF) DisplayText("  ");
            DisplayText("<b>Your hymen is torn, robbing you of your virginity.</b>");
            if (spacingsB) DisplayText("  ");
        }
        // STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (display && stretched) {
            // Virgins get different formatting
            if (devirgined) {
                // If no spaces after virgin loss
                if (!spacingsB) DisplayText("  ");
            }
            // Non virgins as usual
            else if (spacingsF) DisplayText("  ");
            if (firstVagina.looseness === VaginaLooseness.LEVEL_CLOWN_CAR)
                DisplayText("<b>Your " + VaginaDescriptor.describeVagina(character, firstVagina) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
            if (firstVagina.looseness === VaginaLooseness.GAPING_WIDE)
                DisplayText("<b>Your " + VaginaDescriptor.describeVagina(character, firstVagina) + " is stretched so wide that it gapes continually.</b>");
            if (firstVagina.looseness === VaginaLooseness.GAPING)
                DisplayText("<b>Your " + VaginaDescriptor.describeVagina(character, firstVagina) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
            if (firstVagina.looseness === VaginaLooseness.LOOSE)
                DisplayText("<b>Your " + VaginaDescriptor.describeVagina(character, firstVagina) + " is now very loose.</b>");
            if (firstVagina.looseness === VaginaLooseness.NORMAL)
                DisplayText("<b>Your " + VaginaDescriptor.describeVagina(character, firstVagina) + " is now a little loose.</b>");
            if (firstVagina.looseness === VaginaLooseness.TIGHT)
                DisplayText("<b>Your " + VaginaDescriptor.describeVagina(character, firstVagina) + " is stretched out to a more normal size.</b>");
            if (spacingsB) DisplayText("  ");
        }
        return stretched;
    }
}
