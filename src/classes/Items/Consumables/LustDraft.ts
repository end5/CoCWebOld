import Consumable from './Consumable';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class LustDraft extends Consumable {
    private enhanced: boolean;
    public constructor(enhanced: boolean) {
        if (enhanced)
            super("F.Draft", "F.Draft", "a vial of roiling red fluid labeled \"Fuck Draft\"", LustDraft.DefaultValue, "This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word \"Fuck\" is inscribed on the side of the vial.");
        else
            super("L.Draft", "LustDraft", "a vial of roiling bubble-gum pink fluid", 20, "This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape.  It smells very sweet, and has \"Lust\" inscribed on the side of the vial.");
        this.enhanced = enhanced;
    }

    public use(player: Player) {
        player.slimeFeed();
        MainScreen.text("You drink the ", true);
        if (this.enhanced) MainScreen.text("red", false);
        else MainScreen.text("pink", false);
        MainScreen.text(" potion, and its unnatural warmth immediately flows to your groin.", false);
        player.stats.lustChange(30 + Utils.rand(player.stats.lib / 10), false);

        //Heat/Rut for those that can have them if "fuck draft"
        if (this.enhanced) {
            //Try to go into intense heat.
            CreatureChange.goIntoHeat(player, 2);
            //Males go into rut
            CreatureChange.goIntoRut(player);
        }
        //ORGAZMO
        if (player.stats.lust >= 100 && !Game.inCombat) {
            MainScreen.text("\n\nThe arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your " + player.inventory.armor.displayName + " and look down as your ", false);
            if (player.lowerBody.cockSpot.count() > 0) {
                MainScreen.text(CockDescriptor.describeMultiCockShort(player) + " erupts in front of you, liberally spraying the ground around you.  ", false);
            }
            if (player.lowerBody.cockSpot.count() > 0 && player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("At the same time your ", false);
            }
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " soaks your thighs.  ", false);
            }
            if (player.gender == 0) MainScreen.text("body begins to quiver with orgasmic bliss.  ", false);
            MainScreen.text("Once you've had a chance to calm down, you notice that the explosion of pleasure you just experienced has rocked you to your core.  You are a little hornier than you were before.", false);
            //increase player libido, and maybe sensitivity too?
            player.orgasm();
            player.stats.lib += 2;
            player.stats.sens += 1;
        }
        if (player.stats.lust > 100) player.stats.lust = 100;
        MainScreen.text("\n\n", false);
    }
}