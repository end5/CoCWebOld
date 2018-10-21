import { Perk, PerkDesc } from '../Perk';

export class ElvenBounty extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk)
            return "Increases fertility by " + perk.value2 + "% and cum production by " + perk.value1 + "mLs.";
        return "";
    }

    public constructor() {
        super("Elven Bounty", "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility.");
    }
}
