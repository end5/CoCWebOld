import { Perk, PerkDesc } from '../Perk';

export class PentUp extends PerkDesc {
    public description(perk?: Perk): string {
        return "Increases minimum lust by " + Math.round(perk.value1) + " and makes you more vulnerable to seduction.";
    }

    public constructor() {
        super("Pent Up", "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
    }
}
