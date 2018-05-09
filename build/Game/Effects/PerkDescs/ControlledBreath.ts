import { Character } from '../../Character/Character';
import { Perk, PerkDesc } from '../Perk';

export class ControlledBreath extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character.stats.cor >= 30)
            return "<b>DISABLED</b> - Corruption too high!";
        else
            return super.description();
    }

    public constructor() {
        super("Controlled Breath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%");
    }
}
