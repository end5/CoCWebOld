import { Perk, PerkDesc } from '../Perk';

export class WizardsEndurance extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk)
            return "Reduces fatigue cost of spells by " + perk.value1 + "%.";
        return "";
    }

    public constructor() {
        super("Wizard's Endurance", "Wizard's Endurance",
            "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
    }
}
