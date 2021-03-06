import { Character } from '../../Character/Character';
import { Perk, PerkDesc } from '../Perk';
import { PerkType } from '../PerkType';

export class ImmovableObject extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character.stats.tou >= 75)
            return "Grants 20% physical damage reduction.</b>";
        else
            return "<b>You aren't tough enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(PerkType.ImmovableObject, "Immovable Object", "", "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>");
    }
}
