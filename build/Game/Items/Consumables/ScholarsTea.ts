import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { Mod } from '../../Modifiers/Modifiers';
import { ItemDesc } from '../ItemDesc';

export class ScholarsTea extends Consumable {
    public constructor() {
        super(ConsumableName.ScholarsTea, new ItemDesc("Scholars T.", "a cup of scholar's tea", "This powerful brew supposedly has mind-strengthening effects."), 0);
    }

    public use(character: Character) {
        character.slimeFeed();
        DisplayText().clear();
        DisplayText("Following the merchant's instructions, you steep and drink the tea. Its sharp taste fires up your palate and in moments, you find yourself more alert and insightful. As your mind wanders, a creative, if somewhat sordid, story comes to mind. It is a shame that you do not have writing implements as you feel you could make a coin or two off what you have conceived. The strange seller was not lying about the power of the tea.");
        if (randInt(3) === 0)
            DisplayText(Mod.Body.displayModTone(character, 15, 1));
        character.stats.int = 2.5 + randInt(5);
    }
}
