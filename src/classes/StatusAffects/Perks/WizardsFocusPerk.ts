import PerkDesc from "./PerkDesc"
import Perk from "./Perk"

export default class WizardsFocusPerk extends PerkDesc {
    public desc(params: Perk = null): string {
        return "Increases your spell effect modifier by " + params.value1 * 100 + "%.";
    }

    public constructor() {
			super("Wizard's Focus", "Wizard's Focus",
					"Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
    }
}
