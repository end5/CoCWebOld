import Character from '../../Character/Character';
import MainScreen from '../../display/MainScreen';
import Utils from '../../Utilities/Utils';
import Perk from '../Perk';

export default class ArousingAura extends Perk {
    public update(character: Character): string {
        if (enemyChar.stats.lustVuln > 0 && character.stats.cor >= 70) {
            if (enemyChar.stats.lust < 50) return "Your aura seeps into " + enemyChar.desc.a + enemyChar.desc.short + " but does not have any visible effects just yet.\n\n";
            else if (enemyChar.stats.lust < 60) {
                if (!enemyChar.desc.plural) MainScreen.text(enemyChar.desc.capitalA + enemyChar.desc.short + " starts to squirm a little from your unholy presence.\n\n", false);
                else MainScreen.text(enemyChar.desc.capitalA + enemyChar.desc.short + " start to squirm a little from your unholy presence.\n\n", false);
            }
            else if (enemyChar.stats.lust < 75) return "Your arousing aura seems to be visibly affecting " + enemyChar.desc.a + enemyChar.desc.short + ", making " + enemyChar.desc.objectivePronoun + " squirm uncomfortably.\n\n";
            else if (enemyChar.stats.lust < 85) {
                if (!enemyChar.desc.plural) MainScreen.text(enemyChar.desc.capitalA + enemyChar.desc.short + "'s skin colors red as " + enemyChar.desc.subjectivePronoun + " inadvertantly basks in your presence.\n\n", false);
                else MainScreen.text(enemyChar.desc.capitalA + enemyChar.desc.short + "' skin colors red as " + enemyChar.desc.subjectivePronoun + " inadvertantly bask in your presence.\n\n", false);
            }
            else {
                if (!enemyChar.desc.plural) return "The effects of your aura are quite pronounced on " + enemyChar.desc.a + enemyChar.desc.short + " as " + enemyChar.desc.subjectivePronoun + " begins to shake and steal glances at your body.\n\n";
                else return "The effects of your aura are quite pronounced on " + enemyChar.desc.a + enemyChar.desc.short + " as " + enemyChar.desc.subjectivePronoun + " begin to shake and steal glances at your body.\n\n";
            }
            enemyChar.stats.lust += enemyChar.stats.lustVuln * (2 + Utils.rand(4));
        }
    }
}
