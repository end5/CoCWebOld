import { randInt } from '../../../../../Engine/Utilities/SMath';
import { HornType } from '../../../../Body/Horns';
import { Character } from '../../../../Character/Character';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Gore extends PlayerPhysicalAction {
    public name: string = "Gore";
    public reasonCannotUse: string = "You're too fatigued to use a charge attack!";
    public readonly baseCost: number = 15;

    public isPossible(player: Player): boolean {
        return player.body.horns.type === HornType.COW_MINOTAUR && player.body.horns.count >= 6;
    }

    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        if (monster.desc.short === "worms") {
            CView.text("Taking advantage of your new natural weapons, you quickly charge at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving your horns to stab only at air.\n\n");
            return;
        }
        player.stats.fatiguePhysical(this.baseCost);
        // Amily!
        if (monster.combat.effects.has(CombatEffectType.Concentration)) {
            CView.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        // Bigger horns = better success chance.
        // Small horns - 60% hit
        let hitChance: number = 0;
        if (player.body.horns.count >= 6 && player.body.horns.count < 12) {
            hitChance = 60;
        }
        // bigger horns - 75% hit
        if (player.body.horns.count >= 12 && player.body.horns.count < 20) {
            hitChance = 75;
        }
        // huge horns - 90% hit
        if (player.body.horns.count >= 20) {
            hitChance = 80;
        }
        // Vala dodgy bitch!
        if (monster.desc.short === "Vala") {
            hitChance = 20;
        }
        // Account for monster speed - up to -50%.
        hitChance -= monster.stats.spe / 2;
        // Account for player speed - up to +50%
        hitChance += player.stats.spe / 2;
        // Hit & calculation
        if (hitChance >= randInt(100)) {
            const horns = player.body.horns;
            let damage: number = 0;
            if (horns.count > 40) horns.count = 40;
            // normal
            if (randInt(4) > 0) {
                CView.text("You lower your head and charge, skewering " + monster.desc.a + monster.desc.short + " on one of your bullhorns!  ");
                // As normal attack + horn length bonus
                damage = Math.floor(player.stats.str + horns.count * 2 - randInt(monster.stats.tou) - monster.combat.stats.defense());
            }
            // CRIT
            else {
                // doubles horn bonus damage
                damage = Math.floor(player.stats.str + horns.count * 4 - randInt(monster.stats.tou) - monster.combat.stats.defense());
                CView.text("You lower your head and charge, slamming into " + monster.desc.a + monster.desc.short + " and burying both your horns into " + monster.desc.objectivePronoun + "!  ");
            }
            // Bonus damage for rut!
            if (player.effects.has(StatusEffectType.Rut) && monster.body.cocks.length > 0) {
                CView.text("The fury of your rut lent you strength, increasing the damage!  ");
                damage += 5;
            }
            // Bonus per level damage
            damage += player.stats.level * 2;
            // Reduced by defense
            damage -= monster.combat.stats.defense();
            if (damage < 0) damage = 5;
            // CAP 'DAT SHIT
            if (damage > player.stats.level * 10 + 100) damage = player.stats.level * 10 + 100;
            if (damage > 0) {
                damage *= player.combat.stats.attack(monster);
                damage = monster.combat.stats.loseHP(damage);
            }
            // Different horn damage messages
            if (damage < 20) CView.text("You pull yourself free, dealing " + damage + " damage.");
            if (damage >= 20 && damage < 40) CView.text("You struggle to pull your horns free, dealing " + damage + " damage.");
            if (damage >= 40) CView.text("With great difficulty you rip your horns free, dealing " + damage + " damage.");
        }
        // Miss
        else {
            // Special vala changes
            if (monster.desc.short === "Vala") {
                CView.text("You lower your head and charge Vala, but she just flutters up higher, grabs hold of your horns as you close the distance, and smears her juicy, fragrant cunt against your nose.  The sensual smell and her excited moans stun you for a second, allowing her to continue to use you as a masturbation aid, but she quickly tires of such foreplay and flutters back with a wink.\n\n");
                player.stats.lust += 5;
            }
            else CView.text("You lower your head and charge " + monster.desc.a + monster.desc.short + ", only to be sidestepped at the last moment!");
        }
        // New line before monster attack
        CView.text("\n\n");
    }
}
