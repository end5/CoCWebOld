import { PerkClass } from '../PerkClass';
import { PerkType } from '../PerkType';

/**
 * Created by aimozg on 27.01.14.
 */
export class SluttySeductionPerk extends PerkType {

    public desc(params: PerkClass = null): string {
        return "Increases odds of successfully teasing and lust damage of successful teases by " + params.value1 + " points."
    }

    public constructor() {
        super("Slutty Seduction", "Slutty Seduction",
            "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
    }
}
