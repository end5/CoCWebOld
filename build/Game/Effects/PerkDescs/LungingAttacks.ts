import { Character } from '../../Character/Character';
import { Perk, PerkDesc } from '../Perk';
import { PerkType } from '../PerkType';

export class LungingAttacks extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character.stats.spe >= 75)
            return "Grants 50% armor penetration for standard attacks.";
        else
            return "<b>You are too slow to benefit from this perk.</b>";
    }

    public constructor() {
        super(PerkType.LungingAttacks, "Lunging Attacks", "", "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.");
    }
}
