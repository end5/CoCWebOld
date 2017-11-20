import { TailType } from '../../../Body/LowerBody';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class Web implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.lowerBody.tailType == TailType.SPIDER_ABDOMEN;
    }

    public canUse(player: Player): boolean {
        return player.lowerBody.tailVenom >= 33;
    }

    public reasonCannotUse(): string {
        return "You do not have enough webbing to shoot right now!";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        player.lowerBody.tailVenom -= 33;
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        //Blind
        if (player.statusAffects.has("Blind")) {
            DisplayText.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        }
        else DisplayText.text("Turning and clenching muscles that no human should have, you expel a spray of sticky webs at " + monster.desc.a + monster.desc.short + "!  ");
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            DisplayText.text("You miss " + monster.desc.a + monster.desc.short + " completely - ");
            DisplayText.text(monster.desc.subjectivePronoun + " moved out of the way!\n\n");
            return;
        }
        //Over-webbed
        if (monster.stats.spe < 1) {
            if (!monster.desc.plural) DisplayText.text(monster.desc.capitalA + monster.desc.short + " is completely covered in webbing, but you hose " + monster.desc.objectivePronoun + " down again anyway.");
            else DisplayText.text(monster.desc.capitalA + monster.desc.short + " are completely covered in webbing, but you hose them down again anyway.");
        }
        //LAND A HIT!
        else {
            if (!monster.desc.plural) DisplayText.text("The adhesive strands cover " + monster.desc.a + monster.desc.short + " with restrictive webbing, greatly slowing " + monster.desc.objectivePronoun + ".");
            else DisplayText.text("The adhesive strands cover " + monster.desc.a + monster.desc.short + " with restrictive webbing, greatly slowing " + monster.desc.objectivePronoun + ".");
            monster.stats.spe -= 45;
            if (monster.stats.spe < 0) monster.stats.spe = 0;
        }
        DisplayText.text("\n\n");
    }
}
