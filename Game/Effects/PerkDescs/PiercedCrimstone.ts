import { Perk, PerkDesc } from '../Perk';

export class PiercedCrimstone extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk)
            return "Increases minimum lust by " + Math.round(perk.value1) + ".";
        return "";
    }

    public constructor() {
        super("Pierced: Crimstone", "Pierced: Crimstone",
            "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
    }
}
