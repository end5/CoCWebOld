import { Character } from '../../Character/Character';
import { Perk, PerkDesc } from '../Perk';
import { PerkType } from '../PerkType';

export class Tactician extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character.stats.spe >= 75)
            return "Increases critical hit chance by up to 10% (Intelligence-based).";
        else
            return "<b>You are too dumb to gain benefit from this perk.</b>";
    }

    public constructor() {
        super(PerkType.Tactician, "Tactician", "", "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).");
    }
}
