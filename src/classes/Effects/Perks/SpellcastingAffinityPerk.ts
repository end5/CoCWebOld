import PerkDesc from "../PerkDesc";
import Perk from "../Perk";

export default class SpellcastingAffinityPerk extends PerkDesc {
    public desc(params: Perk = null): string {
		return "Reduces spell costs by " + params.value1 + "%.";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
