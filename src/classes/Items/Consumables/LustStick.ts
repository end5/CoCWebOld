import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class LustStick extends Consumable {

    public constructor() {
        super("LustStk", new ItemDesc("LustStk", "a tube of golden lipstick", "This tube of golden lipstick is used by harpies to keep males aroused.  It has aphrodisiac properties on anyone with male genitalia and is most effective when applied to the lips or groin."));
    }

    public canUse(player: Player): boolean {
        if (player.lowerBody.cockSpot.hasCock() && !player.perks.has("LuststickAdapted")) {
            MainScreen.text("You look at the tube of lipstick, but get the idea it would be a pretty bad idea to smear a thick coating of cock-hardening aphrodisiacs over your own lips.  ");
            return false;
        }
        return true;
    }

    public use(player: Player) {
        if (player.statusAffects.has("LustStickApplied")) {
            player.statusAffects.get("LustStickApplied").value1 = Utils.rand(12) + 12;
            MainScreen.text("You carefully open the sweet-smelling tube and smear the lipstick over the coat you already have on your lips.  <b>No doubt another layer will make it last even longer!</b>  ");
            MainScreen.text("You finish and pucker your lips, feeling fairly sexy with your new, thicker makeup on.\n\n");
        }
        else {
            player.statusAffects.add(new StatusAffect("LustStickApplied", 24, 0, 0, 0));
            MainScreen.text("You carefully open the sweet-smelling tube and smear the lipstick over your lips.  ");
            if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("It tingles a little, but the drugs have little to no effect on you now.");
            else MainScreen.text("Honestly, it amazes you that something as little as a kiss can make a man putty in your hands.");
            MainScreen.text("  You finish and pucker your lips, feeling fairly sexy with your new makeup on.\n\n");
        }
        player.stats.lust += 1;
        return (false);
    }
}
