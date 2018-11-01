import { WhiteMagic } from './WhiteMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Whitefire extends WhiteMagic {
    public name: string = "Whitefire";
    public readonly baseCost: number = 30;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsWhitefire);
    }

    public castSpell(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        // This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        character.stats.fatigueMagic(this.baseCost);
        if (monster.combat.effects.has(CombatEffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        CView.text("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and " + monster.desc.a + monster.desc.short + " is enveloped in a flash of white flames!\n");
        let damage = Math.floor(10 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.stats.spellMod());
        // High damage to goes.
        if (monster.desc.short === "goo-girl")
            damage = Math.round(damage * 1.5);
        CView.text(monster.desc.capitalA + monster.desc.short + " takes " + damage + " damage.");
        // Using fire attacks on the goo]
        if (monster.desc.short === "goo-girl") {
            CView.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.body.skin.tone + " skin has lost some of its shimmer.");
            if (!monster.perks.has(PerkType.Acid))
                monster.perks.add(PerkType.Acid, {});
        }
        CView.text("\n\n");
        monster.combat.stats.loseHP(damage);
    }
}
