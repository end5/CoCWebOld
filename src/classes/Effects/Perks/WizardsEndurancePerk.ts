import PerkDesc from "../PerkDesc";
import Perk from "../Perk";

export default class WizardsEndurancePerk extends PerkDesc {
    public desc(params: Perk = null): string {
		return "Reduces fatigue cost of spells by " + params.value1 + "%.";
    }

    public constructor() {
        super("Wizard's Endurance", "Wizard's Endurance",
            "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
    }
}
