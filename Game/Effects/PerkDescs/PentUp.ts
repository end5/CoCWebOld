import { Perk, PerkDesc } from '../Perk';

export class PentUp extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk)
            return "Increases minimum lust by " + Math.round(perk.value1) + " and makes you more vulnerable to seduction.";
        return "";
    }

    public constructor() {
        super("Pent Up", "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
    }
}
