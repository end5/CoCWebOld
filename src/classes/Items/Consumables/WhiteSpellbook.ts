import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import StatusAffect from '../../Effects/StatusAffect';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class WhiteSpellbook extends Consumable {
    public constructor() {
        super(ConsumableName.WhiteSpellbook, new ItemDesc("W. Book", "a small book with a pristine white cover", "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it."), 40);
    }

    public use(player: Player) {
        DisplayText.clear();
        DisplayText.text("You open the white tome, and discover it to be an instructional book on the use of white magic.  Most of it is filled with generic information about white magic - how it is drawn for mental focus, is difficult to use when tired or aroused, and can be used to create and control energy.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.");
        if (player.stats.int < 30) {
            DisplayText.text("\n\nYou feel greatly enlightened by your time spent reading.");
            player.stats.int += 4;
        }
        else if (player.stats.int < 60) {
            DisplayText.text("\n\nSpending some time reading was probably good for you, and you definitely feel smarter for it.");
            player.stats.int += 2;
        }
        else if (player.stats.int < 80) {
            DisplayText.text("\n\nAfter reading the small tome your already quick mind feels invigorated.");
            player.stats.int += 1;
        }
        else {
            DisplayText.text("\n\nThe contents of the book did little for your already considerable intellect.");
            player.stats.int += .6;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 25 && !player.statusAffects.has(StatusAffectType.KnowsCharge)) {
            DisplayText.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Charge Weapon.</b>");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.KnowsCharge, 0, 0, 0, 0));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 30 && !player.statusAffects.has(StatusAffectType.KnowsBlind)) {
            DisplayText.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Blind.</b>");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.KnowsBlind, 0, 0, 0, 0));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 40 && !player.statusAffects.has(StatusAffectType.KnowsWhitefire)) {
            DisplayText.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Whitefire.</b>");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.KnowsWhitefire, 0, 0, 0, 0));
        }
    }
}