import Consumable from './Consumable';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Player from '../../Player';

export default class BlackSpellbook extends Consumable {
    public constructor() {
        super("B. Book", "B. Book", "a small book with a midnight-black cover", 40, "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home.");
    }

    public use(player: Player) {
        MainScreen.text("You open the small black book, and discover it to be an instructional book on the use of black magic.  Most of it is filled with generic information about black magic - how it is drawn from emotions (typically lust), and how it has the power to affect bodies and emotions.  It also warns against using it on oneself, as it is difficult to draw on your emotions while meddling with your own body.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.", true);
        if (player.stats.int < 30) {
            MainScreen.text("\n\nYou feel greatly enlightened by your time spent reading.", false);
            player.stats.int += 4;
        }
        else if (player.stats.int < 60) {
            MainScreen.text("\n\nSpending some time reading was probably good for you, and you definitely feel smarter for it.", false);
            player.stats.int += 2;
        }
        else if (player.stats.int < 80) {
            MainScreen.text("\n\nAfter reading the small tome your already quick mind feels invigorated.", false);
            player.stats.int += 1;
        }
        else {
            MainScreen.text("\n\nThe contents of the book did little for your already considerable intellect.", false);
            player.stats.int += 0.6;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 25 && !player.statusAffects.has("KnowsArouse")) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Arouse.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsArouse", 0, 0, 0, 0));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 30 && !player.statusAffects.has("KnowsHeal")) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Heal.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsHeal", 0, 0, 0, 0));
            return;
        }
        //Smart enough for arouse and doesnt have it
        if (player.stats.int >= 40 && !player.statusAffects.has("KnowsMight")) {
            MainScreen.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Might.</b>", false);
            player.statusAffects.add(new StatusAffect("KnowsMight", 0, 0, 0, 0));
        }
    }
}