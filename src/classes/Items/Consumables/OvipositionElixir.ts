import Consumable from './Consumable';
import Pregnancy, { IncubationTime, PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import Vagina from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import StatusAffect from '../../Effects/StatusAffect';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import OvielixirEggsPreg from '../../Player/PregnancyEvents/OvielixirEggsPreg';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class OvipositionElixir extends Consumable {

    public constructor() {
        super("OviElix", new ItemDesc("Ovi Elixir", "a hexagonal crystal bottle tagged with an image of an egg", "This hexagonal crystal bottle is filled with a strange green fluid.  A tag with a picture of an egg is tied to the neck of the bottle, indicating it is somehow connected to egg-laying."), 30);
    }

    public canUse(player: Player): boolean {
        if (player.lowerBody.vaginaSpot.hasVagina()) return true;
        DisplayText.text("You pop the cork and prepare to drink the stuff, but the smell nearly makes you gag.  You cork it hastily.\n\n");
        return false;
    }

    //Oviposition Elixer!
    /* Notes on StatusAffects.Eggs
     v1 = egg type.
     v2 = size - 0 for normal, 1 for large
     v3 = quantity
     EGG TYPES-
     0 - brown - ass expansion
     1 - purple - hip expansion
     2 - blue - vaginal removal and/or growth of existing maleness
     3 - pink - dick removal and/or fertility increase.
     4 - white - breast growth.  If lactating increases lactation.
     5 - rubbery black
     */
    public use(player: Player) {
        player.slimeFeed();
        DisplayText.text("You pop the cork and gulp down the thick greenish fluid.  The taste is unusual and unlike anything you've tasted before.");
        if (player.pregnancy.isPregnantWith(PregnancyType.GOO_STUFFED)) {
            DisplayText.text("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with Valeria's goo filling your womb the ovielixir is unable to work its magic on you.");
            return;
        }
        if (player.pregnancy.isPregnantWith(PregnancyType.WORM_STUFFED)) {
            DisplayText.text("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with the worms filling your womb the ovielixir is unable to work its magic on you.");
            return;
        }
        if (!player.pregnancy.isPregnant()) { //If the player is not pregnant, get preggers with eggs!
            DisplayText.text("\n\nThe elixir has an immediate effect on your belly, causing it to swell out slightly as if pregnant.  You guess you'll be laying eggs sometime soon!");
            player.pregnancy.knockUp(player.pregnancy.getNotPregVagina[0], new Pregnancy(PregnancyType.OVIELIXIR_EGGS, IncubationTime.OVIELIXIR_EGGS, new OvielixirEggsPreg()), 1, 1);
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Eggs, Utils.rand(6), 0, Utils.rand(3) + 5, 0));
            return;
        }
        let changeOccurred: boolean = false;
        if (player.pregnancy.isPregnantWith(PregnancyType.OVIELIXIR_EGGS)) { //If player already has eggs, chance of size increase!
            if (player.statusAffects.has(StatusAffectType.Eggs)) {
                //If eggs are small, chance of increase!
                if (player.statusAffects.get(StatusAffectType.Eggs).value2 == 0) {
                    //1 in 2 chance!
                    if (Utils.rand(3) == 0) {
                        player.statusAffects.get(StatusAffectType.Eggs).value2 = 1;
                        DisplayText.text("\n\nYour pregnant belly suddenly feels heavier and more bloated than before.  You wonder what the elixir just did.");
                        changeOccurred = true;
                    }
                }
                //Chance of quantity increase!
                if (Utils.rand(2) == 0) {
                    DisplayText.text("\n\nA rumble radiates from your uterus as it shifts uncomfortably and your belly gets a bit larger.");
                    player.statusAffects.get(StatusAffectType.Eggs).value3 = Utils.rand(4 + 1);
                    changeOccurred = true;
                }
            }
        }
        // If no changes, speed up all pregnancies.
        if (!changeOccurred && player.pregnancy.isPregnant()) {
            DisplayText.text("\n\nYou gasp as your pregnancy suddenly leaps forwards, your belly bulging outward a few inches as it gets closer to time for birthing.");
            for (let index: number = 0; index < player.pregnancy.count(); index++) {
                let pregnancy: Pregnancy = player.pregnancy.vaginaPregnancy(index);
                if (pregnancy.incubation > 20 && pregnancy.type != PregnancyType.BUNNY) {
                    let newIncubation: number = pregnancy.incubation - Math.floor(pregnancy.incubation * 0.3 + 10);
                    if (newIncubation < 2) newIncubation = 2;
                    pregnancy.incubation = newIncubation;
                    console.trace("Pregger Count New total:" + pregnancy.incubation);
                }
            }
        }
    }
}

