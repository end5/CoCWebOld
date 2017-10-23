import Creature from '../Body/Creature';
import Vagina, { VaginaLooseness } from '../Body/Vagina';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';
import Utils from '../Utilities/Utils';

export default class VaginaModifier {
    public static stretchVagina(creature: Creature, vaginaArea: number): boolean {
        if (!creature.lowerBody.vaginaSpot.hasVagina)
            return false;
        let stretched: boolean = false;
        let loosestVagina = creature.lowerBody.vaginaSpot.LoosenessMost[0];
        if (creature.perks.has("FerasBoonMilkingTwat") || loosestVagina.vaginalLooseness <= VaginaLooseness.NORMAL) {
            //cArea > capacity = autostreeeeetch.
            if (vaginaArea >= creature.vaginalCapacity()) {
                if (loosestVagina.vaginalLooseness >= VaginaLooseness.LEVEL_CLOWN_CAR)
                    loosestVagina.vaginalLooseness++;
                stretched = true;
            }
            //If within top 10% of capacity, 50% stretch
            else if (vaginaArea >= .9 * creature.vaginalCapacity() && Utils.chance(50)) {
                loosestVagina.vaginalLooseness++;
                stretched = true;
            }
            //if within 75th to 90th percentile, 25% stretch
            else if (vaginaArea >= .75 * creature.vaginalCapacity() && Utils.chance(25)) {
                loosestVagina.vaginalLooseness++;
                stretched = true;
            }
        }
        //If virgin
        if (creature.lowerBody.vaginaSpot.Virgin.length > 0) {
            creature.lowerBody.vaginaSpot.Virgin[0].virgin = false;
        }
        //Delay anti-stretching
        if (vaginaArea >= .5 * creature.vaginalCapacity()) {
            //Cunt Stretched used to determine how long since last enlargement
            if (!creature.statusAffects.has("CuntStretched"))
                creature.statusAffects.add(new StatusAffect("CuntStretched", 0, 0, 0, 0));
            //Reset the timer on it to 0 when restretched.
            else
                creature.statusAffects.get("CuntStretched").value1 = 0;
        }
        return stretched;
    }
    
    public static displayStretchVagina(creature: Creature, cArea: number, display: boolean, spacingsF: boolean = false, spacingsB: boolean = true): boolean {
        if (!creature.lowerBody.vaginaSpot.hasVagina())
            return false;
        const firstVagina: Vagina = creature.lowerBody.vaginaSpot.get(0);
        let wasVirgin: boolean = firstVagina.virgin;
        let stretched: boolean = VaginaModifier.stretchVagina(creature, cArea);
        let devirgined: boolean = wasVirgin && !firstVagina.virgin;
        if (devirgined) {
            if (spacingsF) MainScreen.text("  ");
            MainScreen.text("<b>Your hymen is torn, robbing you of your virginity.</b>", false);
            if (spacingsB) MainScreen.text("  ");
        }
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (display && stretched) {
            //Virgins get different formatting
            if (devirgined) {
                //If no spaces after virgin loss
                if (!spacingsB) MainScreen.text("  ");
            }
            //Non virgins as usual
            else if (spacingsF) MainScreen.text("  ");
            if (firstVagina.vaginalLooseness == VaginaLooseness.LEVEL_CLOWN_CAR)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
            if (firstVagina.vaginalLooseness == VaginaLooseness.GAPING_WIDE)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is stretched so wide that it gapes continually.</b>");
            if (firstVagina.vaginalLooseness == VaginaLooseness.GAPING)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
            if (firstVagina.vaginalLooseness == VaginaLooseness.LOOSE)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is now very loose.</b>", false);
            if (firstVagina.vaginalLooseness == VaginaLooseness.NORMAL)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is now a little loose.</b>", false);
            if (firstVagina.vaginalLooseness == VaginaLooseness.TIGHT)
                MainScreen.text("<b>Your " + VaginaDescriptor.describeVagina(creature, firstVagina) + " is stretched out to a more normal size.</b>");
            if (spacingsB) MainScreen.text("  ");
        }
        return stretched;
    }
}