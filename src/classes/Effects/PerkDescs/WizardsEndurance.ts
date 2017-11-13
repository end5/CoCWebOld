import Perk from '../Perk';
import PerkDesc from '../PerkDesc';

export default class WizardsEndurance extends PerkDesc {
    public description(perk?: Perk): string {
		return "Reduces fatigue cost of spells by " + perk.value1 + "%.";
    }

    public constructor() {
        super("Wizard's Endurance", "Wizard's Endurance",
            "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
    }
}
