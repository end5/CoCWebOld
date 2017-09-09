import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class SluttySeductionPerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
        return "Increases odds of successfully teasing and lust damage of successful teases by " + params.value1 + " points."
    }

    public constructor() {
        super("Slutty Seduction", "Slutty Seduction",
            "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
    }
}
