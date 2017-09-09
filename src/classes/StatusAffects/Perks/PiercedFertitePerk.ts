import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class PiercedFertitePerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
        return "Increases cum production by " + Math.round(2 * params.value1) + "% and fertility by " + Math.round(params.value1) + ".";
    }

    public constructor() {
        super("Pierced: Fertite", "Pierced: Fertite",
            "You've been pierced with Fertite and any male or female organs have become more fertile.");
    }
}
