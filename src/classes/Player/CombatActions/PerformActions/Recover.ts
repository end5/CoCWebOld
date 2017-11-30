import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import MainScreen from '../../../display/MainScreen';
import { StatusAffectType } from '../../../Effects/StatusAffectType';

export default class Recover implements CombatAction {
    public name: string = "Recover";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return character.statusAffects.has(StatusAffectType.IsabellaStunned) ||
            character.statusAffects.has(StatusAffectType.Stunned) ||
            character.statusAffects.has(StatusAffectType.Whispered) ||
            character.statusAffects.has(StatusAffectType.Confusion);
    }

    public use(character: Character, monster: Character) {
        if (character.statusAffects.has(StatusAffectType.IsabellaStunned) || character.statusAffects.has(StatusAffectType.Stunned)) {
            DisplayText.text("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            //MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.statusAffects.has(StatusAffectType.Whispered)) {
            DisplayText.text("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            //MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.statusAffects.has(StatusAffectType.Confusion)) {
            DisplayText.text("\nYou're too confused about who you are to try to attack!");
            //MainScreen.getBottomButton(0).modify("Recover", wait);
        }
    }
}