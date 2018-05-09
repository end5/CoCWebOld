import { Perk, PerkDesc } from '../Perk';

export class PiercedFertite extends PerkDesc {
    public description(perk?: Perk): string {
        return "Increases cum production by " + Math.round(2 * perk.value1) + "% and fertility by " + Math.round(perk.value1) + ".";
    }

    public constructor() {
        super("Pierced: Fertite", "Pierced: Fertite",
            "You've been pierced with Fertite and any male or female organs have become more fertile.");
    }
}
