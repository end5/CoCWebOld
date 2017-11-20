import WhiteMagic from './WhiteMagic';
import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';

export default class SpellWhitefire extends WhiteMagic {
    public isPossible(player: Player): boolean {
        return player.statusAffects.has("KnowsWhitefire");
    }
    public readonly baseCost: number = 30;
    public castSpell(player: Player, monster: Character) {
        DisplayText.clear();
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            DisplayText.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.charType == CharacterType.Doppleganger) {
            <Doppleganger>monster.handleSpellResistance("whitefire");
            return;
        }
        DisplayText.text("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and " + monster.desc.a + monster.desc.short + " is enveloped in a flash of white flames!\n");
        let damage = Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * player.spellMod());
        //High damage to goes.
        if (monster.desc.short == "goo-girl")
            damage = Math.round(damage * 1.5);
        DisplayText.text(monster.desc.capitalA + monster.desc.short + " takes " + damage + " damage.");
        //Using fire attacks on the goo]
        if (monster.desc.short == "goo-girl") {
            DisplayText.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.");
            if (!monster.perks.has("Acid"))
                monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
        }
        DisplayText.text("\n\n");
        monster.combat.loseHP(damage, player);
    }
}

