import Perk from '../Perk';
import PerkDesc from '../PerkDesc';

export default class SpellcastingAffinityPerk extends PerkDesc {
    public description(perk?: Perk): string {
		return "Reduces spell costs by " + perk.value1 + "%.";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
