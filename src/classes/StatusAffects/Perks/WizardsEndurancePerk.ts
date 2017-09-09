import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class WizardsEndurancePerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
			return "Reduces fatigue cost of spells by " + params.value1 + "%.";
    }

    public constructor() {
        super("Wizard's Endurance", "Wizard's Endurance",
            "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
    }
}
