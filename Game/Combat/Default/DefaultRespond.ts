import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffectType } from '../../Effects/CombatEffectType';
import { IActionRespond } from '../IActionRespond';
import { CView } from '../../../Page/ContentView';

export class DefaultRespond implements IActionRespond {
    public enemyAttack() { }
    public enemyTease() { }
    public enemyUseItem() { }
    public enemyPhysicalAttack() { }
    public enemyMagicalAttack() { }
    public enemyDodge() { }
    public enemyRun() { }
    public attacked(damage: number, crit: boolean, self: Character, enemy: Character) {
        if (self.combat.effects.has(CombatEffectType.Earthshield) && randInt(4) === 0) {
            if (enemy.combat.respond.didNoDamage)
                enemy.combat.respond.didNoDamage(enemy, self);
            return;
        }

        const damageDone = self.combat.stats.loseHP(damage);

        if (damageDone > 0) {
            if (enemy.inventory.equipment.weapon.perks.keys.length > 0)
                for (const perk of enemy.inventory.equipment.weapon.perks) {
                    perk(enemy, self);
                }
            if (enemy.combat.respond.didDamage)
                enemy.combat.respond.didDamage(damage, crit, enemy, self);
        }
        else if (enemy.combat.respond.didNoDamage) {
            enemy.combat.respond.didNoDamage(enemy, self);
        }
    }

    public didNoDamage(self: Character, enemy: Character) {
        if (enemy.combat.effects.has(CombatEffectType.Earthshield)) {
            CView.text("Your strike is deflected by the wall of sand, dirt, and rock!  Damn!\n");
        }
        CView.text("Your attacks are deflected or blocked by " + enemy.desc.a + enemy.desc.short + ".");
    }

    public didDamage(damage: number, crit: boolean, self: Character, enemy: Character) {
        CView.text("You hit " + enemy.desc.a + enemy.desc.short + "! (" + damage + ")");
        if (crit)
            CView.text(" <b>*CRIT*</b>");

    }

    public feared() { }
    public stunned() { }
    public constricted() { }
    public blinded() { }

    public onReward() { }
    public onRewardGems() { }
    public onRewardItem() { }
}
