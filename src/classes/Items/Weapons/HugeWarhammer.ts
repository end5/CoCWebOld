import Weapon from "../Weapon";

export default class HugeWarhammer extends Weapon {

    public constructor() {
        super("Warhamr", "Warhammer", "huge warhammer", "a huge warhammer", "smash", 15, 1600, "A huge war-hammer made almost entirely of steel that only the strongest warriors could use.  Requires 80 strength to use.  Getting hit with this might stun the victim.  (ATK: 15) (Cost: 1600)", "Large");
    }

    public canUse(): boolean {
        if (player.str >= 80) return true;
        MainScreen.text("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }

}
