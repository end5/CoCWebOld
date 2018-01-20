import BlackMagic from './BlackMagic';
import Vagina, { VaginaWetness } from '../../../Body/Vagina';
import Character from '../../../Character/Character';
import CockDescriptor from '../../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';
import Player from '../../Player';

export class Arouse extends BlackMagic {
    public name: string = "Arouse";
    public readonly baseCost: number = 15;

    public isPossible(player: Player): boolean {
        return player.statusAffects.has(StatusAffectType.KnowsArouse);
    }

    public castSpell(player: Player, monster: Character) {
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        DisplayText().clear();
        DisplayText("You make a series of arcane gestures, drawing on your own lust to inflict it upon your foe!\n");
        // Worms be immune
        if (monster.desc.short === "worms") {
            DisplayText("The worms appear to be unaffected by your magic!");
            DisplayText("\n\n");
            return;
        }
        if (monster.stats.lustVuln === 0) {
            DisplayText("It has no effect!  Your foe clearly does not experience lust in the same way as you.\n\n");
            return;
        }
        monster.stats.lust += monster.stats.lustVuln * (player.stats.int / 5 * player.combat.stats.spellMod() + Utils.rand(monster.stats.lib - monster.stats.int * 2 + monster.stats.cor) / 5);
        if (monster.stats.lust < 30)
            DisplayText(monster.desc.capitalA + monster.desc.short + " squirms as the magic affects " + monster.desc.objectivePronoun + ".  ");
        if (monster.stats.lust >= 30 && monster.stats.lust < 60) {
            if (monster.desc.plural)
                DisplayText(monster.desc.capitalA + monster.desc.short + " stagger, suddenly weak and having trouble focusing on staying upright.  ");
            else
                DisplayText(monster.desc.capitalA + monster.desc.short + " staggers, suddenly weak and having trouble focusing on staying upright.  ");
        }
        if (monster.stats.lust >= 60) {
            DisplayText(monster.desc.capitalA + monster.desc.short + "'");
            if (!monster.desc.plural) DisplayText("s");
            DisplayText(" eyes glaze over with desire for a moment.  ");
        }
        if (monster.torso.cocks.count > 0) {
            if (monster.stats.lust >= 60 && monster.torso.cocks.count > 0)
                DisplayText("You see " + monster.desc.possessivePronoun + " " + CockDescriptor.describeMultiCockShort(player) + " dribble pre-cum.  ");
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.torso.cocks.count === 1)
                DisplayText(monster.desc.capitalA + monster.desc.short + "'s " + CockDescriptor.describeCockShort(player.torso.cocks.get(0)) + " hardens, distracting " + monster.desc.objectivePronoun + " further.  ");
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.torso.cocks.count > 1)
                DisplayText("You see " + monster.desc.possessivePronoun + " " + CockDescriptor.describeMultiCockShort(player) + " harden uncomfortably.  ");
        }
        if (monster.torso.vaginas.count > 0) {
            const firstVagina: Vagina = player.torso.vaginas.get(0);
            if (monster.desc.plural) {
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.NORMAL)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "s dampen perceptibly.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.WET)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s crotches become sticky with girl-lust.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLICK)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "s become sloppy and wet.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.DROOLING)
                    DisplayText("Thick runners of girl-lube stream down the insides of " + monster.desc.a + monster.desc.short + "'s thighs.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLAVERING)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + "s instantly soak " + monster.desc.objectivePronoun + " groin.  ");
            }
            else {
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.NORMAL)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " dampens perceptibly.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.WET)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s crotch becomes sticky with girl-lust.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLICK)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " becomes sloppy and wet.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.DROOLING)
                    DisplayText("Thick runners of girl-lube stream down the insides of " + monster.desc.a + monster.desc.short + "'s thighs.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLAVERING)
                    DisplayText(monster.desc.capitalA + monster.desc.short + "'s " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " instantly soaks her groin.  ");
            }
        }
        DisplayText("\n\n");
    }
}
