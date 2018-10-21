import { Perk, PerkDesc } from '../Perk';

export class SpellcastingAffinity extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk)
            return "Reduces spell costs by " + perk.value1 + "%.";
        return "";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
