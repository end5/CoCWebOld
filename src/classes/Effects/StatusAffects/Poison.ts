import Character from '../../Character/Character';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class Poison extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        if (character.perks.has(PerkType.Medicine) && Utils.rand(100) <= 14) {
            character.statusAffects.remove(StatusAffectType.Poison);
            return "You manage to cleanse the poison from your system with your knowledge of medicine!\n\n";
        }
        else {
            character.combat.loseHP(8 + Utils.rand(character.stats.maxHP() / 20), null);
            return "The poison continues to work on your body, wracking you with pain!\n\n";
        }
    }
}