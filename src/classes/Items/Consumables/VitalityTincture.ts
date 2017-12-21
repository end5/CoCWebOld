import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import BodyModifier from '../../Modifiers/BodyModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class VitalityTincture extends Consumable {
    public constructor() {
        super(ConsumableName.VitalityTincture, new ItemDesc("Vitality T.", "a vitality tincture", "This potent tea is supposedly good for strengthening the body."));
    }

    public use(player: Player) {
        player.slimeFeed();
        DisplayText.clear();
        DisplayText.text("You down the contents of the bottle. The liquid is thick and tastes remarkably like cherries. Within moments, you feel much more fit and healthy.");
        //str change
        let strChange: number = Utils.rand(3);
        player.stats.str = strChange;
        //Garunteed toughness if no str
        if (strChange == 0) {
            strChange = Utils.rand(3);
            if (strChange == 0)
                strChange = 1;
        }
        else
            strChange = Utils.rand(3);
        //tou change
        player.stats.tou = strChange;
        //Chance of fitness change
        if (player.stats.HP += 50)
            DisplayText.text("  Any aches, pains and bruises you have suffered no longer hurt and you feel much better.");
        if (Utils.rand(3) == 0)
            DisplayText.text(BodyModifier.displayModTone(player, 95, 3));
    }
}