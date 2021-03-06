import { TailType } from '../../../Body/LowerBody';
import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';
import Player from '../../Player';

export class Web implements CombatAction {
    public name: string = "Web";
    public reasonCannotUse: string = "You do not have enough webbing to shoot right now!";

    public isPossible(player: Player): boolean {
        return player.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false);
    }

    public canUse(player: Player): boolean {
        return player.torso.tails.filter(Tail.Type(TailType.SPIDER_ABDOMEN))[0].vemon >= 33;
    }

    public use(player: Player, monster: Character) {
        DisplayText().clear();
        player.torso.tails.filter(Tail.Type(TailType.SPIDER_ABDOMEN))[0].vemon -= 33;
        // Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        // Blind
        if (player.statusAffects.has(StatusAffectType.Blind)) {
            DisplayText("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        }
        else DisplayText("Turning and clenching muscles that no human should have, you expel a spray of sticky webs at " + monster.desc.a + monster.desc.short + "!  ");
        // Determine if dodged!
        if ((player.statusAffects.has(StatusAffectType.Blind) && Utils.rand(2) === 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            DisplayText("You miss " + monster.desc.a + monster.desc.short + " completely - ");
            DisplayText(monster.desc.subjectivePronoun + " moved out of the way!\n\n");
            return;
        }
        // Over-webbed
        if (monster.stats.spe < 1) {
            if (!monster.desc.plural) DisplayText(monster.desc.capitalA + monster.desc.short + " is completely covered in webbing, but you hose " + monster.desc.objectivePronoun + " down again anyway.");
            else DisplayText(monster.desc.capitalA + monster.desc.short + " are completely covered in webbing, but you hose them down again anyway.");
        }
        // LAND A HIT!
        else {
            if (!monster.desc.plural) DisplayText("The adhesive strands cover " + monster.desc.a + monster.desc.short + " with restrictive webbing, greatly slowing " + monster.desc.objectivePronoun + ".");
            else DisplayText("The adhesive strands cover " + monster.desc.a + monster.desc.short + " with restrictive webbing, greatly slowing " + monster.desc.objectivePronoun + ".");
            monster.stats.spe -= 45;
            if (monster.stats.spe < 0) monster.stats.spe = 0;
        }
        DisplayText("\n\n");
    }
}
