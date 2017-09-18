import PerkDesc from "../PerkDesc";
import Perk from "../Perk";

export default class PentUpPerk extends PerkDesc {
    public desc(params: Perk = null): string {
			return "Increases minimum lust by " + Math.round(params.value1) + " and makes you more vulnerable to seduction.";
    }

    public constructor() {
        super("Pent Up", "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
    }
}
