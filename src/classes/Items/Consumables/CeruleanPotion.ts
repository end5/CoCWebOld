import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { Gender } from '../../Body/Creature';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class CeruleanPotion extends Consumable {
    public constructor() {
        super(ConsumableName.CeruleanPotion, new ItemDesc("Cerulean P.", "a cerulean-tinted potion", "This is a mysterious bottle filled with a sky-blue liquid that sloshes gently inside.  Supposedly it will make you irresistible, though to what or who you cannot say."));
    }

    public use(player: Player) {
        player.slimeFeed();
        //Repeat genderless encounters
        DisplayText.clear();
        if (player.gender == Gender.NONE && Flags.list[FlagEnum.CERULEAN_POTION_NEUTER_ATTEMPTED] > 0) {
            DisplayText.text("You take another sip of the Cerulean Potion.  You find it soothing and become very excited about the possibility of another visit from the succubus.");
        }
        else if (player.gender == Gender.HERM && Flags.list[FlagEnum.CERULEAN_POTION_HERM_USED] > 0) {
            DisplayText.text("With anticipation, you chug down another bottle of the Cerulean Potion. A warm sensation radiates out from your stomach as you feel the potion course through your body.");
        }
        //All else
        else {
            DisplayText.text("The liquid tastes rather bland and goes down easily. ");
            //Special repeat texts
            if (player.statusAffects.has(StatusAffectType.RepeatSuccubi))
                DisplayText.text("You look forwards to tonight's encounter.");
            //First timer huh?
            else DisplayText.text("You do not notice any real effects.  Did the merchant con you?");
        }
        if (player.statusAffects.has(StatusAffectType.SuccubiNight))
            if (player.statusAffects.get(StatusAffectType.SuccubiNight).value1 < 3)
                player.statusAffects.get(StatusAffectType.SuccubiNight).value1 = 1;
            else
                player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.SuccubiNight, 1, 0, 0, 0));
    }
}
