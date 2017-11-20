import { HornType } from '../../../Body/Head';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import PlayerPhysicalAction from '../Player/PlayerPhysicalAction';

export default class Gore extends PlayerPhysicalAction {
    public isPossible(player: Player): boolean {
        return player.upperBody.head.hornType == HornType.COW_MINOTAUR && player.upperBody.head.horns >= 6;
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
        if (monster.desc.short == "worms") {
            DisplayText.text("Taking advantage of your new natural weapons, you quickly charge at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving your horns to stab only at air.\n\n");
            return;
        }
        player.stats.fatiguePhysical(this.baseCost);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        //Bigger horns = better success chance.
        //Small horns - 60% hit
        let hitChance: number = 0;
        if (player.upperBody.head.horns >= 6 && player.upperBody.head.horns < 12) {
            hitChance = 60;
        }
        //bigger horns - 75% hit
        if (player.upperBody.head.horns >= 12 && player.upperBody.head.horns < 20) {
            hitChance = 75;
        }
        //huge horns - 90% hit
        if (player.upperBody.head.horns >= 20) {
            hitChance = 80;
        }
        //Vala dodgy bitch!
        if (monster.desc.short == "Vala") {
            hitChance = 20;
        }
        //Account for monster speed - up to -50%.
        hitChance -= monster.stats.spe / 2;
        //Account for player speed - up to +50%
        hitChance += player.stats.spe / 2;
        //Hit & calculation
        if (hitChance >= Utils.rand(100)) {
            let horns: number = player.upperBody.head.horns;
            let damage: number = 0;
            if (horns > 40) horns = 40;
            //normal
            if (Utils.rand(4) > 0) {
                DisplayText.text("You lower your head and charge, skewering " + monster.desc.a + monster.desc.short + " on one of your bullhorns!  ");
                //As normal attack + horn length bonus
                damage = Math.floor(player.stats.str + horns * 2 - Utils.rand(monster.stats.tou) - monster.defense());
            }
            //CRIT
            else {
                //doubles horn bonus damage
                damage = Math.floor(player.stats.str + horns * 4 - Utils.rand(monster.stats.tou) - monster.defense());
                DisplayText.text("You lower your head and charge, slamming into " + monster.desc.a + monster.desc.short + " and burying both your horns into " + monster.desc.objectivePronoun + "!  ");
            }
            //Bonus damage for rut!
            if (player.inRut && monster.lowerBody.cockSpot.count() > 0) {
                DisplayText.text("The fury of your rut lent you strength, increasing the damage!  ");
                damage += 5;
            }
            //Bonus per level damage
            damage += player.stats.level * 2;
            //Reduced by defense
            damage -= monster.defense();
            if (damage < 0) damage = 5;
            //CAP 'DAT SHIT
            if (damage > player.stats.level * 10 + 100) damage = player.stats.level * 10 + 100;
            if (damage > 0) {
                damage *= player.physicalAttackMod();
                damage = monster.combat.loseHP(damage, player);
            }
            //Different horn damage messages
            if (damage < 20) DisplayText.text("You pull yourself free, dealing " + damage + " damage.");
            if (damage >= 20 && damage < 40) DisplayText.text("You struggle to pull your horns free, dealing " + damage + " damage.");
            if (damage >= 40) DisplayText.text("With great difficulty you rip your horns free, dealing " + damage + " damage.");
        }
        //Miss
        else {
            //Special vala changes
            if (monster.desc.short == "Vala") {
                DisplayText.text("You lower your head and charge Vala, but she just flutters up higher, grabs hold of your horns as you close the distance, and smears her juicy, fragrant cunt against your nose.  The sensual smell and her excited moans stun you for a second, allowing her to continue to use you as a masturbation aid, but she quickly tires of such foreplay and flutters back with a wink.\n\n");
                player.stats.lust += 5;
            }
            else DisplayText.text("You lower your head and charge " + monster.desc.a + monster.desc.short + ", only to be sidestepped at the last moment!");
        }
        //New line before monster attack
        DisplayText.text("\n\n");
    }
}