import Perk from '../Perk';
import PerkDesc from '../PerkDesc';

export default class WizardsFocusPerk extends PerkDesc {
    public description(perk?: Perk): string {
        return "Increases your spell effect modifier by " + perk.value1 * 100 + "%.";
    }

    public constructor() {
		super("Wizard's Focus", "Wizard's Focus",
				"Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
    }
}
