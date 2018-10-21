import { Perk, PerkDesc } from '../Perk';

export class WizardsFocus extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk)
            return "Increases your spell effect modifier by " + perk.value1 * 100 + "%.";
        return "";
    }

    public constructor() {
        super("Wizard's Focus", "Wizard's Focus",
            "Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
    }
}
