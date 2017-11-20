import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class DriderKiss extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        //(VENOM OVER TIME: WEAK)
        if (character.statusAffects.get(StatusAffectType.DriderKiss).value1 == 0) {
            character.stats.lust += 8;
            return "Your heart hammers a little faster as a vision of the drider's nude, exotic body on top of you assails you.  It'll only get worse if she kisses you again...\n\n";
        }
        //(VENOM OVER TIME: MEDIUM)
        else if (character.statusAffects.get(StatusAffectType.DriderKiss).value1 == 1) {
            character.stats.lust += 15;
            let out = "You shudder and moan, nearly touching yourself as your ";
            if (character.gender > 0) out += "loins tingle and leak, hungry for the drider's every touch.";
            else out += "asshole tingles and twitches, aching to be penetrated.";
            return out + "  Gods, her venom is getting you so hot.  You've got to end this quickly!\n\n";
        }
        //(VENOM OVER TIME: MAX)
        else {
            character.stats.lust += 25;
            return "You have to keep pulling your hands away from your crotch - it's too tempting to masturbate here on the spot and beg the drider for more of her sloppy kisses.  Every second that passes, your arousal grows higher.  If you don't end this fast, you don't think you'll be able to resist much longer.  You're too turned on... too horny... too weak-willed to resist much longer...\n\n";
        }
    }
}
