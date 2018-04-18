import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import ItemDesc from '../ItemDesc';

export default class SheepMilk extends Consumable {
    public constructor() {
        super(ConsumableName.SheepMilk, new ItemDesc("SheepMk", "a bottle of sheep milk", "This bottle of sheep milk is said to have corruption-fighting properties.  It may be useful."));
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You gulp the bottle's contents, and its sweet taste immediately invigorates you, making you feel calm and concentrated");
        // -30 fatigue, -2 libido, -10 lust]
        character.stats.fatigue -= 30;
        character.stats.lib += -.25;
        character.stats.lust += -10;
        character.stats.cor += -0.5;
    }
}