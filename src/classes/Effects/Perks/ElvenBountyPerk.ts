import PerkDesc from "../PerkDesc";
import Perk from "../Perk";

export default class ElvenBountyPerk extends PerkDesc {
    public desc(params: Perk = null): string {
        return "Increases fertility by " + params.value2 + "% and cum production by " + params.value1 + "mLs.";
    }

    public constructor() {
        super("Elven Bounty", "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility.");
    }
}
