import { LegType } from '../../../Body/Legs';
import { TailType } from '../../../Body/Tail';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../../Game/Flags';
import { Utils } from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerPhysicalAction from '../PlayerPhysicalAction';

export class Kick extends PlayerPhysicalAction {
    public name: string = "Kick";
    public reasonCannotUse: string = "You're too fatigued to use a charge attack!";
    public readonly baseCost: number = 15;

    public isPossible(player: Player): boolean {
        return player.torso.hips.legs.isTaur() || player.torso.hips.legs.type === LegType.HOOFED || player.torso.hips.legs.type === LegType.BUNNY || player.torso.hips.legs.type === LegType.KANGAROO;
    }

    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public use(player: Player, monster: Character) {
        DisplayText().clear();
        player.stats.fatiguePhysical(this.baseCost);
        // Variant start messages!
        if (player.torso.hips.legs.type === LegType.KANGAROO) {
            // (tail)
            if (player.torso.tails.filterType(TailType.KANGAROO).length > 0)
                DisplayText("You balance on your flexible kangaroo-tail, pulling both legs up before slamming them forward simultaneously in a brutal kick.  ");
            // (no tail)
            else
                DisplayText("You balance on one leg and cock your powerful, kangaroo-like leg before you slam it forward in a kick.  ");
        }
        // (bunbun kick)
        else if (player.torso.hips.legs.type === LegType.BUNNY)
            DisplayText("You leap straight into the air and lash out with both your furred feet simultaneously, slamming forward in a strong kick.  ");
        // (centaur kick)
        else if (player.torso.hips.legs.type === LegType.CENTAUR)
            DisplayText("You lurch up onto your backlegs, lifting your forelegs from the ground a split-second before you lash them out in a vicious kick.  ");
        // (bipedal hoof-kick)
        else if (player.torso.hips.legs.type === LegType.HOOFED)
            DisplayText("You twist and lurch as you raise a leg and slam your hoof forward in a kick.  ");

        if (Flags.list[FlagEnum.PC_FETISH] >= 3) {
            DisplayText("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n");
            return;
        }
        // Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        // Blind
        if (player.statusAffects.has(StatusAffectType.Blind)) {
            DisplayText("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        }
        // Worms are special
        if (monster.desc.short === "worms") {
            // 50% chance of hit (int boost)
            if (Utils.rand(100) + player.stats.int / 3 >= 50) {
                let wormDamage = Math.floor(player.stats.str / 5 - Utils.rand(5));
                if (wormDamage <= 0)
                    wormDamage = 1;
                wormDamage = monster.combat.stats.loseHP(wormDamage, player);
                DisplayText("You strike at the amalgamation, crushing countless worms into goo, dealing " + wormDamage + " damage.\n\n");
            }
            // Fail
            else {
                DisplayText("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n");
            }

            return;
        }
        let damage: number;
        // Determine if dodged!
        if ((player.statusAffects.has(StatusAffectType.Blind) && Utils.rand(2) === 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            // Akbal dodges special education
            if (monster.desc.short === "Akbal") DisplayText("Akbal moves like lightning, weaving in and out of your furious attack with the speed and grace befitting his jaguar body.\n");
            else {
                DisplayText(monster.desc.capitalA + monster.desc.short + " manage");
                if (!monster.desc.plural)
                    DisplayText("s");
                DisplayText(" to dodge your kick!");
                DisplayText("\n\n");
            }

            return;
        }
        // Determine damage
        // Base:
        damage = player.stats.str;
        // Leg bonus
        // Bunny - 20, Kangaroo - 35, 1 hoof = 30, 2 hooves = 40
        if (player.torso.hips.legs.type === LegType.CENTAUR) damage += 40;
        else if (player.torso.hips.legs.type === LegType.HOOFED) damage += 30;
        else if (player.torso.hips.legs.type === LegType.BUNNY) damage += 20;
        else if (player.torso.hips.legs.type === LegType.KANGAROO) damage += 35;
        // Start figuring enemy damage resistance
        let reduction: number = Utils.rand(monster.stats.tou);
        // Add in enemy defense if needed
        reduction += monster.combat.stats.defense();
        // Apply AND DONE!
        damage -= reduction;
        // Damage post processing!
        damage *= player.combat.stats.physicalAttackMod();
        // (None yet!)
        if (damage > 0) damage = monster.combat.stats.loseHP(damage, player);

        // BLOCKED
        if (damage <= 0) {
            damage = 0;
            DisplayText(monster.desc.capitalA + monster.desc.short);
            if (monster.desc.plural) DisplayText("'");
            else DisplayText("s");
            DisplayText(" defenses are too tough for your kick to penetrate!");
        }
        // LAND A HIT!
        else {
            DisplayText(monster.desc.capitalA + monster.desc.short);
            if (!monster.desc.plural) DisplayText(" reels from the damaging impact! (" + damage + ")");
            else DisplayText(" reel from the damaging impact! (" + damage + ")");
        }
        if (damage > 0) {
            // Lust raised by anemone contact!
            if (monster.desc.short === "anemone") {
                DisplayText("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.");
                // (gain lust, temp lose str/spd)
                (monster as Anemone).applyVenom((1 + Utils.rand(2)));
            }
        }
        DisplayText("\n\n");
    }
}
