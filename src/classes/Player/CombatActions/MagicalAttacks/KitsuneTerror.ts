import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerSpellAction from '../PlayerSpellAction';

export class KitsuneTerror extends PlayerSpellAction {
    public name: string = "Terror";
    public readonly baseCost: number = 20;

    public isPossible(player: Player): boolean {
        return player.perks.has(PerkType.CorruptedNinetails);
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
        // Fatigue Cost: 25
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.desc.short === "pod" || monster.stats.int === 0) {
            DisplayText("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n");
            player.stats.fatigue++;
            return;
        }
        player.stats.fatigueMagic(this.baseCost);
        // Inflicts fear and reduces enemy SPD.
        DisplayText("The world goes dark, an inky shadow blanketing everything in sight as you fill " + monster.desc.a + monster.desc.short + "'s mind with visions of otherworldly terror that defy description.");
        // (succeed)
        if (player.stats.int / 10 + Utils.rand(20) + 1 > monster.stats.int / 10 + 10) {
            DisplayText("  They cower in horror as they succumb to your illusion, believing themselves beset by eldritch horrors beyond their wildest nightmares.\n\n");
            monster.statusAffects.add(StatusAffectType.Fear, 1, 0, 0, 0);
            monster.stats.spe -= 5;
            if (monster.stats.spe < 1)
                monster.stats.spe = 1;
        }
        else
            DisplayText("  The dark fog recedes as quickly as it rolled in as they push back your illusions, resisting your hypnotic influence.\n\n");
    }
}
