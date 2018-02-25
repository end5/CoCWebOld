import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Character from '../../Character/Character';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import Game from '../../Game/Game';
import BodyModifier from '../../Modifiers/BodyModifier';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class LustDraft extends Consumable {
    private enhanced: boolean;
    public constructor(enhanced: boolean) {
        if (enhanced)
            super(ConsumableName.LustDraftEnhanced, new ItemDesc("F.Draft", "a vial of roiling red fluid labeled \"Fuck Draft\"", "This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word \"Fuck\" is inscribed on the side of the vial."));
        else
            super(ConsumableName.LustDraft, new ItemDesc("LustDraft", "a vial of roiling bubble-gum pink fluid", "This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape.  It smells very sweet, and has \"Lust\" inscribed on the side of the vial."), 20);
        this.enhanced = enhanced;
    }

    public use(character: Character) {
        character.slimeFeed();
        DisplayText().clear();
        DisplayText("You drink the ");
        if (this.enhanced) DisplayText("red");
        else DisplayText("pink");
        DisplayText(" potion, and its unnatural warmth immediately flows to your groin.");
        character.stats.lustNoResist += 30 + Utils.rand(character.stats.lib / 10);

        // Heat/Rut for those that can have them if "fuck draft"
        if (this.enhanced) {
            // Try to go into intense heat.
            BodyModifier.displayGoIntoHeat(character, 2);
            // Males go into rut
            BodyModifier.displayGoIntoRut(character);
        }
        // ORGAZMO
        if (character.stats.lust >= 100 && !Game.inCombat) {
            DisplayText("\n\nThe arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your " + character.inventory.equipment.armor.displayName + " and look down as your ");
            if (character.torso.cocks.count > 0) {
                DisplayText(CockDescriptor.describeMultiCockShort(character) + " erupts in front of you, liberally spraying the ground around you.  ");
            }
            if (character.torso.cocks.count > 0 && character.torso.vaginas.count > 0) {
                DisplayText("At the same time your ");
            }
            if (character.torso.vaginas.count > 0) {
                DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " soaks your thighs.  ");
            }
            if (character.gender === 0) DisplayText("body begins to quiver with orgasmic bliss.  ");
            DisplayText("Once you've had a chance to calm down, you notice that the explosion of pleasure you just experienced has rocked you to your core.  You are a little hornier than you were before.");
            // increase character libido, and maybe sensitivity too?
            character.orgasm();
            character.stats.lib += 2;
            character.stats.sens += 1;
        }
        if (character.stats.lust > 100) character.stats.lust = 100;
        DisplayText("\n\n");
    }
}
