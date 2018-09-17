import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { ItemDesc } from '../ItemDesc';

export class WhiteSpellbook extends Consumable {
    public constructor() {
        super(ConsumableName.WhiteSpellbook, new ItemDesc("W. Book", "a small book with a pristine white cover", "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it."), 40);
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You open the white tome, and discover it to be an instructional book on the use of white magic.  Most of it is filled with generic information about white magic - how it is drawn for mental focus, is difficult to use when tired or aroused, and can be used to create and control energy.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.");
        if (character.stats.int < 30) {
            DisplayText("\n\nYou feel greatly enlightened by your time spent reading.");
            character.stats.int += 4;
        }
        else if (character.stats.int < 60) {
            DisplayText("\n\nSpending some time reading was probably good for you, and you definitely feel smarter for it.");
            character.stats.int += 2;
        }
        else if (character.stats.int < 80) {
            DisplayText("\n\nAfter reading the small tome your already quick mind feels invigorated.");
            character.stats.int += 1;
        }
        else {
            DisplayText("\n\nThe contents of the book did little for your already considerable intellect.");
            character.stats.int += .6;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 25 && !character.statusAffects.has(StatusAffectType.KnowsCharge)) {
            DisplayText("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Charge Weapon.</b>");
            character.statusAffects.add(StatusAffectType.KnowsCharge, 0, 0, 0, 0);
            return;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 30 && !character.statusAffects.has(StatusAffectType.KnowsBlind)) {
            DisplayText("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Blind.</b>");
            character.statusAffects.add(StatusAffectType.KnowsBlind, 0, 0, 0, 0);
            return;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 40 && !character.statusAffects.has(StatusAffectType.KnowsWhitefire)) {
            DisplayText("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Whitefire.</b>");
            character.statusAffects.add(StatusAffectType.KnowsWhitefire, 0, 0, 0, 0);
        }
    }
}
