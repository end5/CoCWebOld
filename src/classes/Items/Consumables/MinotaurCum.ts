import Consumable from './Consumable';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class MinotaurCum extends Consumable {
    public constructor() {
        super("MinoCum", new ItemDesc("MinoCum", "a sealed bottle of minotaur cum", "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown."), 60);
    }

    public use(player: Player) {
        player.slimeFeed();
        //Minotaur cum addiction
        player.minoCumAddiction(7);
        DisplayText.clear();
        DisplayText.text("As soon as you crack the seal on the bottled white fluid, a ");
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 0) DisplayText.text("potent musk washes over you.");
        else DisplayText.text("heavenly scent fills your nostrils.");
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 50) DisplayText.text("  It makes you feel dizzy, ditzy, and placid.");
        else DisplayText.text("  It makes you feel euphoric, happy, and willing to do ANYTHING to keep feeling this way.");
        DisplayText.text("  Unbidden, your hand brings the bottle to your lips, and the heady taste fills your mouth as you convulsively swallow the entire bottle.");
        //-Raises lust by 10.
        //-Raises sensitivity
        player.stats.sens += 1;
        player.stats.lust += 10;
        //-Raises corruption by 1 to 50, then by .5 to 75, then by .25 to 100.
        if (player.stats.cor < 50) player.stats.cor += 1;
        else if (player.stats.cor < 75) player.stats.cor += 0.5;
        else player.stats.cor += 0.25;
        DisplayText.text("\n\nIntermittent waves of numbness wash through your body, turning into a warm tingling that makes you feel sensitive all over.  The warmth flows through you, converging in your loins and bubbling up into lust.");
        if (player.lowerBody.cockSpot.count() > 0) {
            DisplayText.text("  ");
            if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("Y");
            else DisplayText.text("Each of y");
            DisplayText.text("our " + CockDescriptor.describeMultiCockShort(player) + " aches, flooding with blood until it's bloating and trembling.");
        }
        if (player.lowerBody.vaginaSpot.hasVagina()) {
            let vagina: Vagina = player.lowerBody.vaginaSpot.get(0);
            DisplayText.text("  Your " + VaginaDescriptor.describeClit(player, vagina) + " engorges, ");
            if (player.lowerBody.vaginaSpot.get(0).clitLength < 3) DisplayText.text("parting your lips.");
            else DisplayText.text("bursting free of your lips and bobbing under its own weight.");
            if (vagina.vaginalWetness <= VaginaWetness.NORMAL) DisplayText.text("  Wetness builds inside you as your " + VaginaDescriptor.describeVagina(player, vagina) + " tingles and aches to be filled.");
            else if (vagina.vaginalWetness <= VaginaWetness.SLICK) DisplayText.text("  A trickle of wetness escapes your " + VaginaDescriptor.describeVagina(player, vagina) + " as your body reacts to the desire burning inside you.");
            else if (vagina.vaginalWetness <= VaginaWetness.DROOLING) DisplayText.text("  Wet fluids leak down your thighs as your body reacts to this new stimulus.");
            else DisplayText.text("  Slick fluids soak your thighs as your body reacts to this new stimulus.");
        }
        //(Minotaur fantasy)
        if (!Game.inCombat && Utils.rand(10) == 1) {
            DisplayText.text("\n\nYour eyes flutter closed for a second as a fantasy violates your mind.  You're on your knees, prostrate before a minotaur.  Its narcotic scent fills the air around you, and you're swaying back and forth with your belly already sloshing and full of spunk.  Its equine-like member is rubbing over your face, and you submit to the beast, stretching your jaw wide to take its sweaty, glistening girth inside you.  Your tongue quivers happily as you begin sucking and slurping, swallowing each drop of pre-cum you entice from the beastly erection.  Gurgling happily, you give yourself to your inhuman master for a chance to swallow into unthinking bliss.");
            player.stats.lib += 1;
            player.stats.lust += Utils.rand(5) + player.stats.cor / 20 + Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] / 5;
        }
        //(Healing � if hurt and uber-addicted (hasperk))
        if (player.stats.HP < player.stats.maxHP() && player.perks.has(PerkType.MinotaurCumAddict)) {
            DisplayText.text("\n\nThe fire of your arousal consumes your body, leaving vitality in its wake.  You feel much better!");
            player.stats.HP += Math.floor(player.stats.maxHP() / 4);
        }
        //Uber-addicted status!
        if (player.perks.has(PerkType.MinotaurCumAddict) && Flags.list[FlagEnum.MINOTAUR_CUM_REALLY_ADDICTED_STATE] <= 0) {
            Flags.list[FlagEnum.MINOTAUR_CUM_REALLY_ADDICTED_STATE] = 3 + Utils.rand(2);
            DisplayText.text("\n\n<b>Your body feels so amazing and sensitive.  Experimentally you pinch yourself and discover that even pain is turning you on!</b>");
        }
    }
}