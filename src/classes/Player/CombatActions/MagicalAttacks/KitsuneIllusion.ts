import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerSpellAction from '../PlayerSpellAction';

export class KitsuneIllusion extends PlayerSpellAction {
    public name: string = "Illusion";
    public readonly baseCost: number = 25;

    public isPossible(player: Player): boolean {
        return player.perks.has(PerkType.EnlightenedNinetails);
    }

    public canUse(player: Player): boolean {
        if (!player.perks.has(PerkType.BloodMage) && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reasonCannotUse = "You are too tired to use this ability.";
            return false;
        }
        if (player.statusAffects.has(StatusAffectType.ThroatPunch) || player.statusAffects.has(StatusAffectType.WebSilence)) {
            this.reasonCannotUse = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public use(player: Player, monster: Character) {
        DisplayText().clear();
        if (monster.desc.short === "pod" || monster.stats.int === 0) {
            DisplayText("In the tight confines of this pod, there's no use making such an attack!\n\n");
            player.stats.fatigue++;
            return;
        }

        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        // Decrease enemy speed and increase their susceptibility to lust attacks if already 110% or more
        DisplayText("The world begins to twist and distort around you as reality bends to your will, " + monster.desc.a + monster.desc.short + "'s mind blanketed in the thick fog of your illusions.");
        // Check for success rate. Maximum 100% with over 90 Intelligence difference between PC and monster.
        if (player.stats.int / 10 + Utils.rand(20) > monster.stats.int / 10 + 9) {
            // Reduce speed down to -20. Um, are there many monsters with 110% lust vulnerability?
            DisplayText("  They stumble humorously to and fro, unable to keep pace with the shifting illusions that cloud their perceptions.\n\n");
            if (monster.stats.spe >= 0) monster.stats.spe -= 20;
            if (monster.stats.lustVuln >= 1.1) monster.stats.lustVuln += .1;
        }
        else
            DisplayText("  Like the snapping of a rubber band, reality falls back into its rightful place as they resist your illusory conjurations.\n\n");
    }
}
