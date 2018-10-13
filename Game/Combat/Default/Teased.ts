import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export function teased(lustDelta: number, self: Character, enemy: Character) {
    displayDefaultTeaseReaction(lustDelta, self);
    if (lustDelta > 0) {
        // Imp mob uber interrupt!
        if (self.effects.has(StatusEffectType.ImpUber)) {
            CView.text("\nThe imps in the back stumble over their spell, their loincloths tenting obviously as your display interrupts their casting.  One of them spontaneously orgasms, having managed to have his spell backfire.  He falls over, weakly twitching as a growing puddle of whiteness surrounds his defeated form.");
            // (-5% of max enemy HP)
            self.combat.stats.loseHP(this.char.stats.bonusHP * .05, enemy);
            self.stats.lust -= 15;
            self.effects.remove(StatusEffectType.ImpUber);
            self.effects.add(StatusEffectType.ImpSkip);
        }
    }
    applyTease(lustDelta, self);
}

function displayDefaultTeaseReaction(lustDelta: number, self: Character) {
    const charDesc = self.desc.capitalA + self.desc.short;
    const pronoun1 = self.desc.subjectivePronoun;
    const pronoun2 = self.desc.possessivePronoun;
    const pronoun3 = self.desc.objectivePronoun;
    const plural = self.desc.plural;
    if (plural) {
        if (lustDelta === 0) CView.text("\n\n" + charDesc + " seem unimpressed.");
        if (lustDelta > 0 && lustDelta < 4) CView.text("\n" + charDesc + " look intrigued by what " + pronoun1 + " see.");
        if (lustDelta >= 4 && lustDelta < 10) CView.text("\n" + charDesc + " definitely seem to be enjoying the show.");
        if (lustDelta >= 10 && lustDelta < 15) CView.text("\n" + charDesc + " openly stroke " + pronoun2 + "selves as " + pronoun1 + " watch you.");
        if (lustDelta >= 15 && lustDelta < 20) CView.text("\n" + charDesc + " flush hotly with desire, " + pronoun3 + " eyes filled with longing.");
        if (lustDelta >= 20) CView.text("\n" + charDesc + " lick " + pronoun3 + " lips in anticipation, " + pronoun3 + " hands idly stroking " + pronoun3 + " bodies.");
    }
    else {
        if (lustDelta === 0) CView.text("\n" + charDesc + " seems unimpressed.");
        if (lustDelta > 0 && lustDelta < 4) {
            if (plural) CView.text("\n" + charDesc + " looks intrigued by what " + pronoun1 + " see.");
            else CView.text("\n" + charDesc + " looks intrigued by what " + pronoun1 + " sees.");
        }
        if (lustDelta >= 4 && lustDelta < 10) CView.text("\n" + charDesc + " definitely seems to be enjoying the show.");
        if (lustDelta >= 10 && lustDelta < 15) {
            if (plural) CView.text("\n" + charDesc + " openly strokes " + pronoun2 + "selves as " + pronoun1 + " watch you.");
            else CView.text("\n" + charDesc + " openly strokes " + pronoun2 + "self as " + pronoun1 + " watches you.");
        }
        if (lustDelta >= 15 && lustDelta < 20) {
            if (plural) CView.text("\n" + charDesc + " flush hotly with desire, " + pronoun3 + " eyes filling with longing.");
            else CView.text("\n" + charDesc + " flushes hotly with desire, " + pronoun3 + " eyes filled with longing.");
        }
        if (lustDelta >= 20) {
            if (plural) CView.text("\n" + charDesc + " licks " + pronoun3 + " lips in anticipation, " + pronoun3 + " hands idly stroking " + pronoun3 + " own bodies.");
            else CView.text("\n" + charDesc + " licks " + pronoun3 + " lips in anticipation, " + pronoun3 + " hands idly stroking " + pronoun3 + " own body.");
        }
    }
}

function applyTease(lustDelta: number, self: Character) {
    self.stats.lust += lustDelta;
    lustDelta = Math.round(lustDelta * 10) / 10;
    CView.text(" (" + lustDelta + ")");
}
