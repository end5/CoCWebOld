import { teased } from './Teased';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffectType } from '../../Effects/CombatEffectType';
import { PerkType } from '../../Effects/PerkType';
import { WeaponPerkType } from '../../Items/Weapons/WeaponPerk';
import { ActionRespond } from '../ActionRespond';

export class DefaultRespond implements ActionRespond {
    public enemyAttack() { }
    public enemyTease(damage: number, self: Character, enemy: Character): void {
        teased(damage, self, enemy);
    }
    public enemyUseItem() { }
    public enemyPhysicalAttack() { }
    public enemyMagicalAttack() { }
    public enemyDodge() { }
    public enemyRun() { }
    public attacked(damage: number, crit: boolean, self: Character, enemy: Character) {
        if (self.combat.effects.has(CombatEffectType.Earthshield) && randInt(4) === 0) {
            enemy.combat.respond.didNoDamage(enemy, self);
            return;
        }
        // // Start figuring enemy damage resistance
        // let reduction: number = randInt(self.stats.tou);
        // const enemyWeapon = enemy.inventory.equipment.weapon;
        // // Add in enemy armor if needed
        // if (enemyWeapon.perks.has(WeaponPerkType.Penetrate)) {
        //     const penetrationAmount = enemyWeapon.perks.get(WeaponPerkType.Penetrate)(enemy, self);
        //     if (self.combat.stats.defense() >= penetrationAmount)
        //         reduction -= penetrationAmount;
        //     else
        //         reduction -= self.combat.stats.defense();
        // }
        // else {
        //     reduction += self.combat.stats.defense();
        //     // Remove half armor for lunging strikes
        //     if (enemy.perks.has(PerkType.LungingAttacks))
        //         reduction -= self.combat.stats.defense() / 2;
        // }

        const damageDone = self.combat.stats.loseHP(damage, enemy);

        if (damageDone > 0) {
            if (enemy.inventory.equipment.weapon.perks.keys.length > 0)
                for (const perk of enemy.inventory.equipment.weapon.perks) {
                    perk(enemy, self);
                }
            enemy.combat.respond.didDamage(damage, crit, enemy, self);
        }
        else {
            enemy.combat.respond.didNoDamage(enemy, self);
        }
    }

    public didNoDamage(self: Character, enemy: Character) {
        if (enemy.combat.effects.has(CombatEffectType.Earthshield)) {
            DisplayText("Your strike is deflected by the wall of sand, dirt, and rock!  Damn!\n");
        }
        DisplayText("Your attacks are deflected or blocked by " + enemy.desc.a + enemy.desc.short + ".");
    }

    public didDamage(damage: number, crit: boolean, self: Character, enemy: Character) {
        DisplayText("You hit " + enemy.desc.a + enemy.desc.short + "! (" + damage + ")");
        if (crit)
            DisplayText(" <b>*CRIT*</b>");

        if (self.perks.has(PerkType.BrutalBlows) && self.stats.str > 75) {
            if (enemy.combat.stats.defense() > 0)
                DisplayText("\nYour hits are so brutal that you damage " + enemy.desc.a + enemy.desc.short + "'s defenses!");
            if (enemy.combat.stats.defense() - 10 > 0)
                enemy.combat.stats.defenseMod -= 10;
            else
                enemy.combat.stats.defenseMod = 0;
        }
    }

    public feared() { }
    public stunned() { }
    public constricted() { }
    public blinded() { }
}
