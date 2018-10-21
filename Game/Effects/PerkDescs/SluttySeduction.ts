import { Perk, PerkDesc } from '../Perk';

export class SluttySeduction extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk)
            return "Increases odds of successfully teasing and lust damage of successful teases by " + perk.value1 + " points.";
        return "";
    }

    public constructor() {
        super("Slutty Seduction", "Slutty Seduction",
            "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
    }
}
