import { BlackMagic } from './BlackMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { Vagina, VaginaWetness } from '../../../../Body/Vagina';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CView } from '../../../../../Engine/Display/ContentView';
import { describeCockShort, describeCocksLight } from '../../../../Descriptors/CockDescriptor';
import { describeVagina } from '../../../../Descriptors/VaginaDescriptor';

export class Arouse extends BlackMagic {
    public name: string = "Arouse";
    public readonly baseCost: number = 15;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsArouse);
    }

    public castSpell(character: Character, monster: Character): void | NextScreenChoices {
        character.stats.fatigueMagic(this.baseCost);
        if (monster.effects.has(StatusEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        CView.clear();
        CView.text("You make a series of arcane gestures, drawing on your own lust to inflict it upon your foe!\n");
        // Worms be immune
        if (monster.desc.short === "worms") {
            CView.text("The worms appear to be unaffected by your magic!");
            CView.text("\n\n");
            return;
        }
        if (monster.stats.lustVuln === 0) {
            CView.text("It has no effect!  Your foe clearly does not experience lust in the same way as you.\n\n");
            return;
        }
        monster.stats.lust += monster.stats.lustVuln * (character.stats.int / 5 * character.combat.stats.spellMod() + randInt(monster.stats.lib - monster.stats.int * 2 + monster.stats.cor) / 5);
        if (monster.stats.lust < 30)
            CView.text(monster.desc.capitalA + monster.desc.short + " squirms as the magic affects " + monster.desc.objectivePronoun + ".  ");
        if (monster.stats.lust >= 30 && monster.stats.lust < 60) {
            if (monster.desc.plural)
                CView.text(monster.desc.capitalA + monster.desc.short + " stagger, suddenly weak and having trouble focusing on staying upright.  ");
            else
                CView.text(monster.desc.capitalA + monster.desc.short + " staggers, suddenly weak and having trouble focusing on staying upright.  ");
        }
        if (monster.stats.lust >= 60) {
            CView.text(monster.desc.capitalA + monster.desc.short + "'");
            if (!monster.desc.plural) CView.text("s");
            CView.text(" eyes glaze over with desire for a moment.  ");
        }
        if (monster.body.cocks.length > 0) {
            if (monster.stats.lust >= 60 && monster.body.cocks.length > 0)
                CView.text("You see " + monster.desc.possessivePronoun + " " + describeCocksLight(character) + " dribble pre-cum.  ");
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.body.cocks.length === 1)
                CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeCockShort(character.body.cocks.get(0)) + " hardens, distracting " + monster.desc.objectivePronoun + " further.  ");
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.body.cocks.length > 1)
                CView.text("You see " + monster.desc.possessivePronoun + " " + describeCocksLight(character) + " harden uncomfortably.  ");
        }
        if (monster.body.vaginas.length > 0) {
            const firstVagina: Vagina = character.body.vaginas.get(0);
            if (monster.desc.plural) {
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.NORMAL)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, character.body.vaginas.get(0)) + "s dampen perceptibly.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.WET)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s crotches become sticky with girl-lust.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLICK)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, character.body.vaginas.get(0)) + "s become sloppy and wet.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.DROOLING)
                    CView.text("Thick runners of girl-lube stream down the insides of " + monster.desc.a + monster.desc.short + "'s thighs.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLAVERING)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, character.body.vaginas.get(0)) + "s instantly soak " + monster.desc.objectivePronoun + " groin.  ");
            }
            else {
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.NORMAL)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, character.body.vaginas.get(0)) + " dampens perceptibly.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.WET)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s crotch becomes sticky with girl-lust.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLICK)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, character.body.vaginas.get(0)) + " becomes sloppy and wet.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.DROOLING)
                    CView.text("Thick runners of girl-lube stream down the insides of " + monster.desc.a + monster.desc.short + "'s thighs.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLAVERING)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, character.body.vaginas.get(0)) + " instantly soaks her groin.  ");
            }
        }
        CView.text("\n\n");
    }
}
