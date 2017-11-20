import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class Blind extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
            if (character.statusAffects.has(StatusAffectType.Blind) && !enemy.statusAffects.has(StatusAffectType.Sandstorm)) {
                if (character.statusAffects.has(StatusAffectType.SheilaOil)) {
                    if (character.statusAffects.get(StatusAffectType.Blind).value1 <= 0) {
                        character.statusAffects.remove(StatusAffectType.Blind);
                        return "<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>\n\n";
                    }
                    else {
                        character.statusAffects.get(StatusAffectType.Blind).value1--;
                        return "<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>\n\n";
                    }
                }
                else {
                    //Remove blind if countdown to 0
                    if (character.statusAffects.get(StatusAffectType.Blind).value1 == 0) {
                        character.statusAffects.remove(StatusAffectType.Blind);
                        //Alert PC that blind is gone if no more stacks are there.
                        if (!character.statusAffects.has(StatusAffectType.Blind)) {
                            return "<b>Your eyes have cleared and you are no longer blind!</b>\n\n";
                        }
                        else return "<b>You are blind, and many physical attacks will miss much more often.</b>\n\n";
                    }
                    else {
                        character.statusAffects.get(StatusAffectType.Blind).value1--;
                        return "<b>You are blind, and many physical attacks will miss much more often.</b>\n\n";
                    }
                }
            }
        }
        else {
            character.statusAffects.get(StatusAffectType.Blind).value1 -= 1;
            if (character.statusAffects.get(StatusAffectType.Blind).value1 <= 0) {
                character.statusAffects.remove(StatusAffectType.Blind);
                return "<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " no longer blind!</b>\n\n";
            }
            else return "<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " currently blind!</b>\n\n";
        }
    }
}
