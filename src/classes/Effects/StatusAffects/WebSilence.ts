import Character from '../../Character/Character';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class WebSilence extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }
    
    public combatUpdate(character: Character): string {
        if (character.statusAffects.get("WebSilence").value1 >= 2 || Utils.rand(20) + 1 + character.stats.str / 10 >= 15) {
            character.statusAffects.remove("WebSilence");
            return "You rip off the webbing that covers your mouth with a cry of pain, finally able to breathe normally again!  Now you can cast spells!\n\n";
        }
        else {
            character.statusAffects.get("WebSilence").value1++;
            return "<b>Your mouth and nose are obstructed by sticky webbing, making it difficult to breathe and impossible to focus on casting spells.  You try to pull it off, but it just won't work!</b>\n\n";
        }
    }
}
