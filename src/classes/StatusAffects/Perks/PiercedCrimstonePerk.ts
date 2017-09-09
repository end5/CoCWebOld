import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class PiercedCrimstonePerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
        return "Increases minimum lust by " + Math.round(params.value1) + ".";
    }

    public constructor() {
        super("Pierced: Crimstone", "Pierced: Crimstone",
            "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
    }
}
