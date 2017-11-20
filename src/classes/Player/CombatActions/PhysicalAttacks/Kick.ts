import { LowerBodyType, TailType } from '../../../Body/LowerBody';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../../Game/Flags';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerPhysicalAction from '../PlayerPhysicalAction';

export class Kick extends PlayerPhysicalAction {
    public isPossible(player: Player): boolean {
        return player.lowerBody.isTaur() || player.lowerBody.type == LowerBodyType.HOOFED || player.lowerBody.type == LowerBodyType.BUNNY || player.lowerBody.type == LowerBodyType.KANGAROO;
    }

    public readonly baseCost: number = 15;
    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public reasonCannotUse(): string {
        return "You're too fatigued to use a charge attack!";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        player.stats.fatiguePhysical(this.baseCost);
        //Variant start messages!
        if (player.lowerBody.type == LowerBodyType.KANGAROO) {
            //(tail)
            if (player.lowerBody.tailType == TailType.KANGAROO)
                DisplayText.text("You balance on your flexible kangaroo-tail, pulling both legs up before slamming them forward simultaneously in a brutal kick.  ");
            //(no tail) 
            else
                DisplayText.text("You balance on one leg and cock your powerful, kangaroo-like leg before you slam it forward in a kick.  ");
        }
        //(bunbun kick) 
        else if (player.lowerBody.type == LowerBodyType.BUNNY)
            DisplayText.text("You leap straight into the air and lash out with both your furred feet simultaneously, slamming forward in a strong kick.  ");
        //(centaur kick)
        else if (player.lowerBody.type == LowerBodyType.CENTAUR)
            DisplayText.text("You lurch up onto your backlegs, lifting your forelegs from the ground a split-second before you lash them out in a vicious kick.  ");
        //(bipedal hoof-kick) 
        else if (player.lowerBody.type == LowerBodyType.HOOFED)
            DisplayText.text("You twist and lurch as you raise a leg and slam your hoof forward in a kick.  ");

        if (Flags.list[FlagEnum.PC_FETISH] >= 3) {
            DisplayText.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n");
            return;
        }
        //Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        //Blind
        if (player.statusAffects.has(StatusAffectType.Blind)) {
            DisplayText.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        }
        //Worms are special
        if (monster.desc.short == "worms") {
            //50% chance of hit (int boost)
            if (Utils.rand(100) + player.stats.int / 3 >= 50) {
                let damage = Math.floor(player.stats.str / 5 - Utils.rand(5));
                if (damage <= 0)
                    damage = 1;
                damage = monster.combat.loseHP(damage, player);
                DisplayText.text("You strike at the amalgamation, crushing countless worms into goo, dealing " + damage + " damage.\n\n");
            }
            //Fail
            else {
                DisplayText.text("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n");
            }

            return;
        }
        let damage: number;
        //Determine if dodged!
        if ((player.statusAffects.has(StatusAffectType.Blind) && Utils.rand(2) == 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            //Akbal dodges special education
            if (monster.desc.short == "Akbal") DisplayText.text("Akbal moves like lightning, weaving in and out of your furious attack with the speed and grace befitting his jaguar body.\n");
            else {
                DisplayText.text(monster.desc.capitalA + monster.desc.short + " manage");
                if (!monster.desc.plural)
                    DisplayText.text("s");
                DisplayText.text(" to dodge your kick!");
                DisplayText.text("\n\n");
            }

            return;
        }
        //Determine damage
        //Base:
        damage = player.stats.str;
        //Leg bonus
        //Bunny - 20, Kangaroo - 35, 1 hoof = 30, 2 hooves = 40
        if (player.lowerBody.type == LowerBodyType.CENTAUR) damage += 40;
        else if (player.lowerBody.type == LowerBodyType.HOOFED) damage += 30;
        else if (player.lowerBody.type == LowerBodyType.BUNNY) damage += 20;
        else if (player.lowerBody.type == LowerBodyType.KANGAROO) damage += 35;
        //Start figuring enemy damage resistance
        let reduction: number = Utils.rand(monster.stats.tou);
        //Add in enemy defense if needed
        reduction += monster.defense();
        //Apply AND DONE!
        damage -= reduction;
        //Damage post processing!
        damage *= player.physicalAttackMod();
        //(None yet!)
        if (damage > 0) damage = monster.combat.loseHP(damage, player);

        //BLOCKED
        if (damage <= 0) {
            damage = 0;
            DisplayText.text(monster.desc.capitalA + monster.desc.short);
            if (monster.desc.plural) DisplayText.text("'");
            else DisplayText.text("s");
            DisplayText.text(" defenses are too tough for your kick to penetrate!");
        }
        //LAND A HIT!
        else {
            DisplayText.text(monster.desc.capitalA + monster.desc.short);
            if (!monster.desc.plural) DisplayText.text(" reels from the damaging impact! (" + damage + ")");
            else DisplayText.text(" reel from the damaging impact! (" + damage + ")");
        }
        if (damage > 0) {
            //Lust raised by anemone contact!
            if (monster.desc.short == "anemone") {
                DisplayText.text("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.");
                //(gain lust, temp lose str/spd)
                <Anemone>monster.applyVenom((1 + Utils.rand(2)));
            }
        }
        DisplayText.text("\n\n");
    }
}
