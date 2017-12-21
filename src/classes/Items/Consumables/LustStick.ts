import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class LustStick extends Consumable {

    public constructor() {
        super(ConsumableName.LustStick, new ItemDesc("LustStk", "a tube of golden lipstick", "This tube of golden lipstick is used by harpies to keep males aroused.  It has aphrodisiac properties on anyone with male genitalia and is most effective when applied to the lips or groin."));
    }

    public canUse(player: Player): boolean {
        if (player.lowerBody.cockSpot.hasCock() && !player.perks.has(PerkType.LuststickAdapted)) {
            DisplayText.text("You look at the tube of lipstick, but get the idea it would be a pretty bad idea to smear a thick coating of cock-hardening aphrodisiacs over your own lips.  ");
            return false;
        }
        return true;
    }

    public use(player: Player) {
        if (player.statusAffects.has(StatusAffectType.LustStickApplied)) {
            player.statusAffects.get(StatusAffectType.LustStickApplied).value1 = Utils.rand(12) + 12;
            DisplayText.text("You carefully open the sweet-smelling tube and smear the lipstick over the coat you already have on your lips.  <b>No doubt another layer will make it last even longer!</b>  ");
            DisplayText.text("You finish and pucker your lips, feeling fairly sexy with your new, thicker makeup on.\n\n");
        }
        else {
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LustStickApplied, 24, 0, 0, 0));
            DisplayText.text("You carefully open the sweet-smelling tube and smear the lipstick over your lips.  ");
            if (player.lowerBody.cockSpot.hasCock()) DisplayText.text("It tingles a little, but the drugs have little to no effect on you now.");
            else DisplayText.text("Honestly, it amazes you that something as little as a kiss can make a man putty in your hands.");
            DisplayText.text("  You finish and pucker your lips, feeling fairly sexy with your new makeup on.\n\n");
        }
        player.stats.lust += 1;
    }
}
