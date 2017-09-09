import PerkDesc from "./PerkDesc"
import Perk from "./Perk"

export default class PiercedCrimstonePerk extends PerkDesc {
    public desc(params: Perk = null): string {
        return "Increases minimum lust by " + Math.round(params.value1) + ".";
    }

    public constructor() {
        super("Pierced: Crimstone", "Pierced: Crimstone",
            "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
    }
}
