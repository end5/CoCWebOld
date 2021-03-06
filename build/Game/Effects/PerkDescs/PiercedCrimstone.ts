import { Perk, PerkDesc } from '../Perk';

export class PiercedCrimstone extends PerkDesc {
    public description(perk?: Perk): string {
        return "Increases minimum lust by " + Math.round(perk.value1) + ".";
    }

    public constructor() {
        super("Pierced: Crimstone", "Pierced: Crimstone",
            "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
    }
}
