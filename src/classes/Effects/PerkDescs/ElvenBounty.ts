import Perk from '../Perk';
import PerkDesc from '../PerkDesc';

export default class ElvenBounty extends PerkDesc {
    public description(perk?: Perk): string {
        return "Increases fertility by " + perk.value2 + "% and cum production by " + perk.value1 + "mLs.";
    }

    public constructor() {
        super("Elven Bounty", "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility.");
    }
}
