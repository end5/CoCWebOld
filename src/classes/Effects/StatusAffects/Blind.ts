import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class Blind extends StatusAffect {
    public update(character: Character, enemy: Character): string {
        if (character.statusAffects.has("Blind") && !enemy.statusAffects.has("Sandstorm")) {
            if (character.statusAffects.has("SheilaOil")) {
                if (character.statusAffects.get("Blind").value1 <= 0) {
                    character.statusAffects.remove("Blind");
                    return "<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>\n\n";
                }
                else {
                    character.statusAffects.get("Blind").value1--;
                    return "<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>\n\n";
                }
            }
            else {
                //Remove blind if countdown to 0
                if (character.statusAffects.get("Blind").value1 == 0) {
                    character.statusAffects.remove("Blind");
                    //Alert PC that blind is gone if no more stacks are there.
                    if (!character.statusAffects.has("Blind")) {
                        return "<b>Your eyes have cleared and you are no longer blind!</b>\n\n";
                    }
                    else return "<b>You are blind, and many physical attacks will miss much more often.</b>\n\n";
                }
                else {
                    character.statusAffects.get("Blind").value1--;
                    return "<b>You are blind, and many physical attacks will miss much more often.</b>\n\n";
                }
            }
        }
    }
}
