import { ButtLooseness } from '../Body/Butt';
import Creature from '../Body/Creature';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';
import Utils from '../Utilities/Utils';

export default class ButtModifier {
    public static stretchButt(creature: Creature, buttArea: number): boolean {
        let stretched: boolean = false;
        //cArea > capacity = autostreeeeetch half the time.
        if (buttArea >= creature.analCapacity() && Utils.chance(50)) {
            if (creature.lowerBody.butt.analLooseness < ButtLooseness.GAPING)
                creature.lowerBody.butt.analLooseness++;
            stretched = true;
            //Reset butt stretchin recovery time
            if (creature.statusAffects.has("ButtStretched"))
                creature.statusAffects.get("ButtStretched").value1 = 0;
        }
        //If within top 10% of capacity, 25% stretch
        if (buttArea < creature.analCapacity() && buttArea >= .9 * creature.analCapacity() && Utils.chance(25)) {
            creature.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //if within 75th to 90th percentile, 10% stretch
        if (buttArea < .9 * creature.analCapacity() && buttArea >= .75 * creature.analCapacity() && Utils.chance(10)) {
            creature.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //Anti-virgin
        if (creature.lowerBody.butt.analLooseness == ButtLooseness.VIRGIN) {
            creature.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //Delay un-stretching
        if (buttArea >= .5 * creature.analCapacity()) {
            //Butt Stretched used to determine how long since last enlargement
            if (!creature.statusAffects.has("ButtStretched"))
                creature.statusAffects.add(new StatusAffect("ButtStretched", 0, 0, 0, 0));
            //Reset the timer on it to 0 when restretched.
            else
                creature.statusAffects.get("ButtStretched").value1 = 0;
        }
        if (stretched) {
            console.trace("BUTT STRETCHED TO " + (creature.lowerBody.butt.analLooseness) + ".");
        }
        return stretched;
    }

    public static displayStretchButt(creature: Creature, cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
        var stretched: boolean = ButtModifier.stretchButt(creature, cArea);
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (stretched && display) {
            if (spacingsF) MainScreen.text("  ");
            if (creature.lowerBody.butt.analLooseness == 5) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
            if (creature.lowerBody.butt.analLooseness == 4) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " becomes so stretched that it gapes continually.</b>", false);
            if (creature.lowerBody.butt.analLooseness == 3) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " is now very loose.</b>");
            if (creature.lowerBody.butt.analLooseness == 2) MainScreen.text("<b>Your " + ButtDescriptor.describeButthole(creature) + " is now a little loose.</b>");
            if (creature.lowerBody.butt.analLooseness == 1) MainScreen.text("<b>You have lost your anal virginity.</b>", false);
            if (spacingsB) MainScreen.text("  ");
        }
        return stretched;
    }
}