import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class SpellcastingAffinityPerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
			return "Reduces spell costs by " + params.value1 + "%.";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
