import Character from '../../Character/Character';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class Poison extends StatusAffect {
    public update(character: Character): string {
        if (character.perks.has("Medicine") && Utils.rand(100) <= 14) {
            character.statusAffects.remove("Poison");
            return "You manage to cleanse the poison from your system with your knowledge of medicine!\n\n";
        }
        else {
            character.combat.loseHP(8 + Utils.rand(character.stats.maxHP() / 20), null);
            return "The poison continues to work on your body, wracking you with pain!\n\n";
        }
    }
}