import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { Gender } from '../../Body/GenderIdentity';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import ItemDesc from '../ItemDesc';

export default class CeruleanPotion extends Consumable {
    public constructor() {
        super(ConsumableName.CeruleanPotion, new ItemDesc("Cerulean P.", "a cerulean-tinted potion", "This is a mysterious bottle filled with a sky-blue liquid that sloshes gently inside.  Supposedly it will make you irresistible, though to what or who you cannot say."));
    }

    public use(character: Character) {
        character.slimeFeed();
        // Repeat genderless encounters
        DisplayText().clear();
        if (character.gender === Gender.NONE && Flags.list[FlagEnum.CERULEAN_POTION_NEUTER_ATTEMPTED] > 0) {
            DisplayText("You take another sip of the Cerulean Potion.  You find it soothing and become very excited about the possibility of another visit from the succubus.");
        }
        else if (character.gender === Gender.HERM && Flags.list[FlagEnum.CERULEAN_POTION_HERM_USED] > 0) {
            DisplayText("With anticipation, you chug down another bottle of the Cerulean Potion. A warm sensation radiates out from your stomach as you feel the potion course through your body.");
        }
        // All else
        else {
            DisplayText("The liquid tastes rather bland and goes down easily. ");
            // Special repeat texts
            if (character.statusAffects.has(StatusAffectType.RepeatSuccubi))
                DisplayText("You look forwards to tonight's encounter.");
            // First timer huh?
            else DisplayText("You do not notice any real effects.  Did the merchant con you?");
        }
        if (character.statusAffects.has(StatusAffectType.SuccubiNight))
            if (character.statusAffects.get(StatusAffectType.SuccubiNight).value1 < 3)
                character.statusAffects.get(StatusAffectType.SuccubiNight).value1 = 1;
            else
                character.statusAffects.add(StatusAffectType.SuccubiNight, 1, 0, 0, 0);
    }
}
