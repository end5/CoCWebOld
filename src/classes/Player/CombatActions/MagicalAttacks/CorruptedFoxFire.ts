import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import PerkFactory from '../../../Effects/PerkFactory';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerSpellAction from '../PlayerSpellAction';

export class CorruptedFoxFire extends PlayerSpellAction {
    public isPossible(player: Player): boolean {
        return player.perks.has(PerkType.CorruptedNinetails);
    }

    public readonly baseCost: number = 35;
    public canUse(player: Player): boolean {
        if (!player.perks.has(PerkType.BloodMage) && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reason = "You are too tired to use this ability.";
            return false;
        }
        if (player.statusAffects.has(StatusAffectType.ThroatPunch) || player.statusAffects.has(StatusAffectType.WebSilence)) {
            this.reason = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        player.stats.fatigueMagic(this.baseCost);
        //Deals direct damage and lust regardless of enemy defenses.  Especially effective against non-corrupted targets.
        DisplayText.text("Holding out your palm, you conjure corrupted purple flame that dances across your fingertips.  You launch it at " + monster.desc.a+ monster.desc.short + " with a ferocious throw, and it bursts on impact, showering dazzling lavender sparks everywhere.");

        let damage: number = Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * player.spellMod());
        if (monster.stats.cor >= 66) damage = Math.round(damage * .66);
        else if (monster.stats.cor >= 50) damage = Math.round(damage * .8);
        //High damage to goes.
        if (monster.desc.short == "goo-girl") damage = Math.round(damage * 1.5);
        //Using fire attacks on the goo]
        if (monster.desc.short == "goo-girl") {
            DisplayText.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.");
            if (!monster.perks.has(PerkType.Acid))
                monster.perks.add(PerkFactory.create(PerkType.Acid, 0, 0, 0, 0));
        }
        damage = monster.combat.loseHP(damage, player);
        DisplayText.text("  (" + damage + ")\n\n");
    }
}

