import WhiteMagic from './WhiteMagic';
import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';

export class Blind extends WhiteMagic {
    public name: string = "Blind";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.statusAffects.has(StatusAffectType.KnowsBlind);
    }

    public canUse(character: Character, monster: Character): boolean {
        if (monster.statusAffects.has(StatusAffectType.Blind)) {
            this.reasonCannotUse = "<b>" + monster.desc.capitalA + monster.desc.short + " is already affected by blind.</b>\n\n";
            return false;
        }
        return super.canUse(character);
    }

    public castSpell(character: Character, monster: Character) {
        DisplayText().clear();
        character.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.charType === CharacterType.JeanClaude) {
            DisplayText("Jean-Claude howls, reeling backwards before turning back to you, rage clenching his dragon-like face and enflaming his eyes. Your spell seemed to cause him physical pain, but did nothing to blind his lidless sight.");

            DisplayText("\n\n“<i>You think your hedge magic will work on me, intrus?</i>” he snarls. “<i>Here- let me show you how it’s really done.</i>” The light of anger in his eyes intensifies, burning a retina-frying white as it demands you stare into it...");

            if (Utils.rand(character.stats.spe) >= 50 || Utils.rand(character.stats.int) >= 50) {
                DisplayText("\n\nThe light sears into your eyes, but with the discipline of conscious effort you escape the hypnotic pull before it can mesmerize you, before Jean-Claude can blind you.");

                DisplayText("\n\n“<i>You fight dirty,</i>” the monster snaps. He sounds genuinely outraged. “<i>I was told the interloper was a dangerous warrior, not a little [boy] who accepts duels of honour and then throws sand into his opponent’s eyes. Look into my eyes, little [boy]. Fair is fair.</i>”");
                monster.combat.stats.loseHP(Math.floor(10 + (character.stats.int / 3 + Utils.rand(character.stats.int / 2)) * character.combat.stats.spellMod()), character);
            }
            else {
                DisplayText("\n\nThe light sears into your eyes and mind as you stare into it. It’s so powerful, so infinite, so exquisitely painful that you wonder why you’d ever want to look at anything else, at anything at- with a mighty effort, you tear yourself away from it, gasping. All you can see is the afterimages, blaring white and yellow across your vision. You swipe around you blindly as you hear Jean-Claude bark with laughter, trying to keep the monster at arm’s length.");

                DisplayText("\n\n“<i>The taste of your own medicine, it is not so nice, eh? I will show you much nicer things in there in time intrus, don’t worry. Once you have learnt your place.</i>”");

                character.statusAffects.add(StatusAffectType.Blind, Utils.rand(4) + 1, 0, 0, 0);
            }
            return;
        }
        DisplayText("You glare at " + monster.desc.a + monster.desc.short + " and point at " + monster.desc.objectivePronoun + ".  A bright flash erupts before " + monster.desc.objectivePronoun + "!\n");
        if (monster.charType === CharacterType.LivingStatue) {
            // noop
        }
        else if (Utils.rand(3) !== 0) {
            DisplayText(" <b>" + monster.desc.capitalA + monster.desc.short + " ");
            if (monster.desc.plural && monster.desc.short !== "imp horde") DisplayText("are blinded!</b>");
            else DisplayText("is blinded!</b>");
            monster.statusAffects.add(StatusAffectType.Blind, 5 * character.combat.stats.spellMod(), 0, 0, 0);
            if (monster.desc.short === "Isabella")
                if (isabellaFollowerScene.isabellaAccent()) DisplayText("\n\n\"<i>Nein! I cannot see!</i>\" cries Isabella.");
                else DisplayText("\n\n\"<i>No! I cannot see!</i>\" cries Isabella.");
            if (monster.desc.short === "Kiha") DisplayText("\n\n\"<i>You think blindness will slow me down?  Attacks like that are only effective on those who don't know how to see with their other senses!</i>\" Kiha cries defiantly.");
            if (monster.desc.short === "plain girl") {
                DisplayText("  Remarkably, it seems as if your spell has had no effect on her, and you nearly get clipped by a roundhouse as you stand, confused. The girl flashes a radiant smile at you, and the battle continues.");
                monster.statusAffects.remove(StatusAffectType.Blind);
            }
        }
        else DisplayText(monster.desc.capitalA + monster.desc.short + " blinked!");
        DisplayText("\n\n");
    }
}
