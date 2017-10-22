import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class VitalityTincture extends Consumable {
    public constructor() {
        super("Vital T", "Vitality T.", "a vitality tincture", VitalityTincture.DefaultValue, "This potent tea is supposedly good for strengthening the body.");
    }

    public use(player: Player) {
        player.slimeFeed();
        MainScreen.text("You down the contents of the bottle. The liquid is thick and tastes remarkably like cherries. Within moments, you feel much more fit and healthy.", true);
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
            MainScreen.text("  Any aches, pains and bruises you have suffered no longer hurt and you feel much better.", false);
        if (Utils.rand(3) == 0)
            MainScreen.text(player.modTone(95, 3), false);
    }
}