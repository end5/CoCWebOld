import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Pregnancy, { IncubationTime, PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class OvipositionElixir extends Consumable {
    public constructor() {
        super(ConsumableName.OvipositionElixir, new ItemDesc("Ovi Elixir", "a hexagonal crystal bottle tagged with an image of an egg", "This hexagonal crystal bottle is filled with a strange green fluid.  A tag with a picture of an egg is tied to the neck of the bottle, indicating it is somehow connected to egg-laying."), 30);
    }

    public canUse(character: Character): boolean {
        if (character.torso.vaginas.count > 0) return true;
        DisplayText("You pop the cork and prepare to drink the stuff, but the smell nearly makes you gag.  You cork it hastily.\n\n");
        return false;
    }

    // Oviposition Elixer!
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
    public use(character: Character) {
        character.slimeFeed();
        DisplayText("You pop the cork and gulp down the thick greenish fluid.  The taste is unusual and unlike anything you've tasted before.");
        if (character.pregnancy.womb.isPregnantWith(PregnancyType.GOO_STUFFED)) {
            DisplayText("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with Valeria's goo filling your womb the ovielixir is unable to work its magic on you.");
            return;
        }
        if (character.pregnancy.womb.isPregnantWith(PregnancyType.WORM_STUFFED)) {
            DisplayText("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with the worms filling your womb the ovielixir is unable to work its magic on you.");
            return;
        }
        if (!character.pregnancy.womb.isPregnant()) { // If the character is not pregnant, get preggers with eggs!
            DisplayText("\n\nThe elixir has an immediate effect on your belly, causing it to swell out slightly as if pregnant.  You guess you'll be laying eggs sometime soon!");
            character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.OVIELIXIR_EGGS, IncubationTime.OVIELIXIR_EGGS), 1, true);
            character.statusAffects.add(StatusAffectType.Eggs, Utils.rand(6), 0, Utils.rand(3) + 5, 0);
            return;
        }
        let changeOccurred: boolean = false;
        if (character.pregnancy.womb.isPregnantWith(PregnancyType.OVIELIXIR_EGGS)) { // If character already has eggs, chance of size increase!
            if (character.statusAffects.has(StatusAffectType.Eggs)) {
                // If eggs are small, chance of increase!
                if (character.statusAffects.get(StatusAffectType.Eggs).value2 === 0) {
                    // 1 in 2 chance!
                    if (Utils.rand(3) === 0) {
                        character.statusAffects.get(StatusAffectType.Eggs).value2 = 1;
                        DisplayText("\n\nYour pregnant belly suddenly feels heavier and more bloated than before.  You wonder what the elixir just did.");
                        changeOccurred = true;
                    }
                }
                // Chance of quantity increase!
                if (Utils.rand(2) === 0) {
                    DisplayText("\n\nA rumble radiates from your uterus as it shifts uncomfortably and your belly gets a bit larger.");
                    character.statusAffects.get(StatusAffectType.Eggs).value3 = Utils.rand(4 + 1);
                    changeOccurred = true;
                }
            }
        }
        // If no changes, speed up all pregnancies.
        if (!changeOccurred && character.pregnancy.womb.isPregnant()) {
            DisplayText("\n\nYou gasp as your pregnancy suddenly leaps forwards, your belly bulging outward a few inches as it gets closer to time for birthing.");
            const pregnancy = character.pregnancy.womb.pregnancy;
            if (pregnancy.incubation > 20 && pregnancy.type !== PregnancyType.BUNNY) {
                let newIncubation: number = pregnancy.incubation - Math.floor(pregnancy.incubation * 0.3 + 10);
                if (newIncubation < 2) newIncubation = 2;
                pregnancy.incubation = newIncubation;
                console.trace("Pregger Count New total:" + pregnancy.incubation);
            }
        }
    }
}
