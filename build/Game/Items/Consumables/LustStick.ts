import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import Character from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import ItemDesc from '../ItemDesc';

export default class LustStick extends Consumable {

    public constructor() {
        super(ConsumableName.LustStick, new ItemDesc("LustStk", "a tube of golden lipstick", "This tube of golden lipstick is used by harpies to keep males aroused.  It has aphrodisiac properties on anyone with male genitalia and is most effective when applied to the lips or groin."));
    }

    public canUse(character: Character): boolean {
        if (character.torso.cocks.count > 0 && !character.perks.has(PerkType.LuststickAdapted)) {
            DisplayText("You look at the tube of lipstick, but get the idea it would be a pretty bad idea to smear a thick coating of cock-hardening aphrodisiacs over your own lips.  ");
            return false;
        }
        return true;
    }

    public use(character: Character) {
        if (character.statusAffects.has(StatusAffectType.LustStickApplied)) {
            character.statusAffects.get(StatusAffectType.LustStickApplied).value1 = randInt(12) + 12;
            DisplayText("You carefully open the sweet-smelling tube and smear the lipstick over the coat you already have on your lips.  <b>No doubt another layer will make it last even longer!</b>  ");
            DisplayText("You finish and pucker your lips, feeling fairly sexy with your new, thicker makeup on.\n\n");
        }
        else {
            character.statusAffects.add(StatusAffectType.LustStickApplied, 24, 0, 0, 0);
            DisplayText("You carefully open the sweet-smelling tube and smear the lipstick over your lips.  ");
            if (character.torso.cocks.count > 0) DisplayText("It tingles a little, but the drugs have little to no effect on you now.");
            else DisplayText("Honestly, it amazes you that something as little as a kiss can make a man putty in your hands.");
            DisplayText("  You finish and pucker your lips, feeling fairly sexy with your new makeup on.\n\n");
        }
        character.stats.lust += 1;
    }
}
