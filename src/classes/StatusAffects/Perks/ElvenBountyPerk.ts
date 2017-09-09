import StatusAffectDesc from "../StatusAffectDesc";
import StatusAffect from "../StatusAffect";

export default class ElvenBountyPerk extends StatusAffectDesc {
    public desc(params: StatusAffect = null): string {
        return "Increases fertility by " + params.value2 + "% and cum production by " + params.value1 + "mLs.";
    }

    public constructor() {
        super("Elven Bounty", "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility.");
    }
}
