import Character from '../../Character/Character';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class NagaVenom extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatEnd(character: Character) {
        character.stats.spe += character.statusAffects.get(StatusAffectType.NagaVenom).value1;        
    }

    public combatUpdate(character: Character): string {
        if (character.perks.has(PerkType.Medicine) && Utils.rand(100) <= 14) {
            character.stats.spe += character.statusAffects.get(StatusAffectType.NagaVenom).value1;
            character.statusAffects.remove(StatusAffectType.NagaVenom);
            return "You manage to cleanse the naga venom from your system with your knowledge of medicine!\n\n";
        }
        else if (character.stats.spe > 3) {
            character.statusAffects.get(StatusAffectType.NagaVenom).value1 += 2;
            character.stats.spe -= 2;
        }
        else character.combat.loseHP(5, null);
        character.combat.loseHP(2, null);
        return "You wince in pain and try to collect yourself, the naga's venom still plaguing you.\n\n";
    }
}
