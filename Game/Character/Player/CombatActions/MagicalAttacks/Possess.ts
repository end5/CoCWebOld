import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class Possess implements ICombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Possess";
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Incorporeality);
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        // Sample possession text (>79 int, perhaps?):
        if ((monster.body.cocks.length <= 0 && monster.body.vaginas.length <= 0) || monster.stats.lustVuln === 0 || monster.stats.int === 0 || monster.stats.int > 100) {
            CView.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame.  Unfortunately, it seems ");
            if (monster.stats.int > 100)
                CView.text("they were FAR more mentally prepared than anything you can handle, and you're summarily thrown out of their body before you're even able to have fun with them.  Darn, you muse.\n\n");
            else
                CView.text("they have a body that's incompatible with any kind of possession.\n\n");
        }
        // Success!
        else if (character.stats.int >= (monster.stats.int - 10) + randInt(21)) {
            CView.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into your opponent's frame. Before they can regain the initiative, you take control of one of their arms, vigorously masturbating for several seconds before you're finally thrown out. Recorporealizing, you notice your enemy's blush, and know your efforts were somewhat successful.\n\n");
            const damage = Math.round(character.stats.int / 5) + randInt(character.stats.level) + character.stats.level;
            monster.stats.lust += monster.stats.lustVuln * damage;
        }
        // Fail
        else {
            CView.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame. Unfortunately, it seems they were more mentally prepared than you hoped, and you're summarily thrown out of their body before you're even able to have fun with them. Darn, you muse. Gotta get smarter.\n\n");
        }
    }
}
