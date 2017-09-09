import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class WizardsFocusPerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
        return "Increases your spell effect modifier by " + params.value1 * 100 + "%.";
    }

    public constructor() {
			super("Wizard's Focus", "Wizard's Focus",
					"Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
    }
}
