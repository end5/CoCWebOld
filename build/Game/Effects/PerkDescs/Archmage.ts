import { Character } from '../../Character/Character';
import { Perk, PerkDesc } from '../Perk';
import { PerkType } from '../PerkType';

export class Archmage extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character.stats.int >= 75)
            return "Increases base spell strength by 50%.";
        else
            return "<b>You are too dumb to gain benefit from this perk.</b>";
    }

    public constructor() {
        super(PerkType.Archmage, "Archmage", "", "You choose the 'Archmage' perk, increasing base spell strength by 50%.");
    }
}
