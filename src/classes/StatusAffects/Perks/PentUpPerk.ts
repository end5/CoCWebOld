import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class PentUpPerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
			return "Increases minimum lust by " + Math.round(params.value1) + " and makes you more vulnerable to seduction.";
    }

    public constructor() {
        super("Pent Up", "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
    }
}
