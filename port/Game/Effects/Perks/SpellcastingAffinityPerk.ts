import { PerkClass } from '../PerkClass';
import { PerkType } from '../PerkType';

/**
 * Created by aimozg on 27.01.14.
 */
export class SpellcastingAffinityPerk extends PerkType {

    public desc(params: PerkClass = null): string {
        return "Reduces spell costs by " + params.value1 + "%.";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
