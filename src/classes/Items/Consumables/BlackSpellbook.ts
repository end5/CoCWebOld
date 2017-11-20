import Consumable from './Consumable';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class BlackSpellbook extends Consumable {
    public constructor() {
        super("B. Book", new ItemDesc("B. Book", "a small book with a midnight-black cover", "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home."), 40);
    }

    public use(player: Player) {
        DisplayText.clear();
        DisplayText.text("You open the small black book, and discover it to be an instructional book on the use of black magic.  Most of it is filled with generic information about black magic - how it is drawn from emotions (typically lust), and how it has the power to affect bodies and emotions.  It also warns against using it on oneself, as it is difficult to draw on your emotions while meddling with your own body.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.");
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
            player.stats.int += 0.6;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 25 && !player.statusAffects.has(StatusAffectType.KnowsArouse)) {
            DisplayText.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Arouse.</b>");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.KnowsArouse, 0, 0, 0, 0));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 30 && !player.statusAffects.has(StatusAffectType.KnowsHeal)) {
            DisplayText.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Heal.</b>");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.KnowsHeal, 0, 0, 0, 0));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 40 && !player.statusAffects.has(StatusAffectType.KnowsMight)) {
            DisplayText.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Might.</b>");
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.KnowsMight, 0, 0, 0, 0));
        }
    }
}