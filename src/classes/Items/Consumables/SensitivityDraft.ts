import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SensitivityDraft extends Consumable {
    public constructor() {
        super(ConsumableName.SensitivityDraft, new ItemDesc("Sens. Draft", "a bottle of sensitivity draft", "This carefully labelled potion is a 'Sensitivity Draft', and if the diagrams are any indication, it will make your body more sensitive."), 15);
    }

    public use(player: Player) {
        DisplayText().clear();
        DisplayText("You pop the cork on this small vial and drink down the clear liquid.  It makes your lips and tongue tingle strangely, letting you feel each globule of spit in your mouth and each breath of air as it slides past your lips.");

        if (player.statusAffects.has(StatusAffectType.Dysfunction)) {
            DisplayText("\n\nThankfully, the draft invigorates your groin, replacing the numbness with waves of raw sensation.  It seems your crotch is back to normal and <b>you can masturbate again!</b>");
            player.statusAffects.remove(StatusAffectType.Dysfunction);
        }
        if (Utils.rand(4) === 0 && !player.statusAffects.has(StatusAffectType.LustyTongue)) {
            DisplayText("The constant tingling in your mouth grows and grows, particularly around your lips, until they feel as sensitive as ");
            if (player.torso.vaginas.count > 0) DisplayText("your");
            else DisplayText("a woman's");
            DisplayText(" lower lips.  You'll have to be careful not to lick them!");
            // (Lustytongue status)
            player.statusAffects.add(StatusAffectType.LustyTongue, 25, 0, 0, 0);
        }
        DisplayText("\n\nAfter the wave of sensation passes, your " + player.skin.desc + " feels a little more receptive to touch.  ");
        if (player.stats.lust > 70 || player.stats.lib > 70) {
            DisplayText("You shiver and think of how much better it'll make sex and masturbation.");
        }
        else DisplayText("You worry it'll make it harder to resist the attentions of a demon.");
        player.stats.sens += 10;
        player.stats.lust += 5;
    }
}
