import Character from '../../Character/Character';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class NagaVenom extends StatusAffect {
    public update(character: Character): string {
        if (character.perks.has("Medicine") && Utils.rand(100) <= 14) {
            character.stats.spe += character.statusAffects.get("NagaVenom").value1;
            character.statusAffects.remove("NagaVenom");
            return "You manage to cleanse the naga venom from your system with your knowledge of medicine!\n\n";
        }
        else if (character.stats.spe > 3) {
            character.statusAffects.get("NagaVenom").value1 += 2;
            character.stats.spe -= 2;
        }
        else character.combat.loseHP(5, null);
        character.combat.loseHP(2, null);
        return "You wince in pain and try to collect yourself, the naga's venom still plaguing you.\n\n";
    }
}
