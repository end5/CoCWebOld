import { WhiteMagic } from './WhiteMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CharacterType } from '../../../CharacterType';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Blind extends WhiteMagic {
    public name: string = "Blind";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsBlind);
    }

    public canUse(character: Character, monster: Character): boolean {
        if (monster.combat.effects.has(CombatEffectType.Blind)) {
            this.reasonCannotUse = "<b>" + monster.desc.capitalA + monster.desc.short + " is already affected by blind.</b>\n\n";
            return false;
        }
        return super.canUse(character, monster);
    }

    public castSpell(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        character.stats.fatigueMagic(this.baseCost);
        if (monster.combat.effects.has(CombatEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.charType === CharacterType.JeanClaude) {
            CView.text("Jean-Claude howls, reeling backwards before turning back to you, rage clenching his dragon-like face and enflaming his eyes. Your spell seemed to cause him physical pain, but did nothing to blind his lidless sight.");

            CView.text("\n\n“<i>You think your hedge magic will work on me, intrus?</i>” he snarls. “<i>Here- let me show you how it’s really done.</i>” The light of anger in his eyes intensifies, burning a retina-frying white as it demands you stare into it...");

            if (randInt(character.stats.spe) >= 50 || randInt(character.stats.int) >= 50) {
                CView.text("\n\nThe light sears into your eyes, but with the discipline of conscious effort you escape the hypnotic pull before it can mesmerize you, before Jean-Claude can blind you.");

                CView.text("\n\n“<i>You fight dirty,</i>” the monster snaps. He sounds genuinely outraged. “<i>I was told the interloper was a dangerous warrior, not a little [boy] who accepts duels of honour and then throws sand into his opponent’s eyes. Look into my eyes, little [boy]. Fair is fair.</i>”");
                monster.combat.stats.loseHP(Math.floor(10 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.stats.spellMod()));
            }
            else {
                CView.text("\n\nThe light sears into your eyes and mind as you stare into it. It’s so powerful, so infinite, so exquisitely painful that you wonder why you’d ever want to look at anything else, at anything at- with a mighty effort, you tear yourself away from it, gasping. All you can see is the afterimages, blaring white and yellow across your vision. You swipe around you blindly as you hear Jean-Claude bark with laughter, trying to keep the monster at arm’s length.");

                CView.text("\n\n“<i>The taste of your own medicine, it is not so nice, eh? I will show you much nicer things in there in time intrus, don’t worry. Once you have learnt your place.</i>”");

                character.combat.effects.add(CombatEffectType.Blind, monster, { duration: randInt(4) + 1 });
            }
            return;
        }
        CView.text("You glare at " + monster.desc.a + monster.desc.short + " and point at " + monster.desc.objectivePronoun + ".  A bright flash erupts before " + monster.desc.objectivePronoun + "!\n");
        if (monster.charType === CharacterType.LivingStatue) {
            // noop
        }
        else if (randInt(3) !== 0) {
            CView.text(" <b>" + monster.desc.capitalA + monster.desc.short + " ");
            if (monster.desc.plural && monster.desc.short !== "imp horde") CView.text("are blinded!</b>");
            else CView.text("is blinded!</b>");
            monster.combat.effects.add(CombatEffectType.Blind, character, { duration: 5 * character.combat.stats.spellMod() });
        }
        else CView.text(monster.desc.capitalA + monster.desc.short + " blinked!");
        CView.text("\n\n");
    }
}
