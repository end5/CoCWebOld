import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';

export class Bound extends CombatEffect {
    public update(character: Character) {
        if (PlayerFlags.FETISH >= 2 && character.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
            character.stats.lust += 3;
            CView.text("The feel of tight leather completely immobilizing you turns you on more and more.  Would it be so bad to just wait and let her play with you like this?");
            CView.text("\n\n");
        }
    }
}
