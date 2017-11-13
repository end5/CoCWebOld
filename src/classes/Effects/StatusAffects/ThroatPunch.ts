import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class ThroatPunch extends StatusAffect {
    public update(character: Character): string {
        character.statusAffects.get("ThroatPunch").value1--;
        if (character.statusAffects.get("ThroatPunch").value1 >= 0)
            return "Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are <b>unable to cast spells as a consequence.</b>\n\n";
        else {
            character.statusAffects.remove("ThroatPunch");
            return "Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!\n\n";
        }
    }
}
