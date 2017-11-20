import Character from '../../Character/Character';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class GooArmorSilence extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        if (character.statusAffects.get(StatusAffectType.GooArmorSilence).value1 >= 2 || Utils.rand(20) + 1 + character.stats.str / 10 >= 15) {
            //if passing str check, output at beginning of turn
            character.statusAffects.remove(StatusAffectType.GooArmorSilence);
            return "<b>The sticky slop covering your mouth pulls away reluctantly, taking more force than you would expect, but you've managed to free your mouth enough to speak!</b>\n\n";
        }
        else {
            character.statusAffects.get(StatusAffectType.GooArmorSilence).value1++;
            return "<b>Your mouth is obstructed by sticky goo!  You are silenced!</b>\n\n";
        }
    }
}
