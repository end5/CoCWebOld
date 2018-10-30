import { randInt } from '../../../../../Engine/Utilities/SMath';
import { Character } from '../../../../Character/Character';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { TrainingRoomFlags } from '../../../../Scenes/TrainingRoom';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class FireBow extends PlayerPhysicalAction {
    public name: string = "Fire Bow";
    public readonly baseCost: number = 25;

    public isPossible(player: Player): boolean {
        return player.inventory.keyItems.has("Bow");
    }

    public canUse(player: Player, monster: Character): boolean {
        if (player.stats.fatigue + this.physicalCost(player) > 100) {
            this.reasonCannotUse = "You're too fatigued to fire the bow!";
            return false;
        }
        if (player.combat.effects.has(CombatEffectType.BowDisabled)) {
            this.reasonCannotUse = "You can't use your bow right now!";
            return false;
        }
        return true;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        player.stats.fatiguePhysical(this.baseCost);
        // Keep logic sane if this attack brings victory
        // This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        // Amily!
        if (monster.combat.effects.has(CombatEffectType.Concentration)) {
            CView.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        // Prep messages vary by skill.
        if (TrainingRoomFlags.BowSkill < 30) {
            CView.text("Fumbling a bit, you nock an arrow and fire!\n");
        }
        else if (TrainingRoomFlags.BowSkill < 50) {
            CView.text("You pull an arrow and fire it at " + monster.desc.a + monster.desc.short + "!\n");
        }
        else if (TrainingRoomFlags.BowSkill < 80) {
            CView.text("With one smooth motion you draw, nock, and fire your deadly arrow at your opponent!\n");
        }
        else if (TrainingRoomFlags.BowSkill <= 99) {
            CView.text("In the blink of an eye you draw and fire your bow directly at " + monster.desc.a + monster.desc.short + ".\n");
        }
        else {
            CView.text("You casually fire an arrow at " + monster.desc.a + monster.desc.short + " with supreme skill.\n");
            // Keep it from going over 100
            TrainingRoomFlags.BowSkill = 100;
        }
        if (monster.combat.effects.has(CombatEffectType.Sandstorm) && randInt(10) > 1) {
            CView.text("Your shot is blown off target by the tornado of sand and wind.  Damn!\n\n");
            return;
        }
        // [Bow Response]
        // worms are immune
        if (monster.desc.short === "worms") {
            CView.text("The arrow slips between the worms, sticking into the ground.\n\n");
            return;
        }
        // Vala miss chance!
        if (monster.desc.short === "Vala" && randInt(10) < 7) {
            CView.text("Vala flaps her wings and twists her body. Between the sudden gust of wind and her shifting of position, the arrow goes wide.\n\n");
            return;
        }
        // Blind miss chance
        if (player.combat.effects.has(CombatEffectType.Blind)) {
            CView.text("The arrow hits something, but blind as you are, you don't have a chance in hell of hitting anything with a bow.\n\n");
            return;
        }
        // Miss chance 10% based on speed + 10% based on int + 20% based on skill
        if (monster.desc.short !== "pod" && player.stats.spe / 10 + player.stats.int / 10 + TrainingRoomFlags.BowSkill / 5 + 60 < randInt(101)) {
            CView.text("The arrow goes wide, disappearing behind your foe.\n\n");
            return;
        }
        // Hit!  Damage calc! 20 +
        let damage: number = Math.floor((20 + player.stats.str / 3 + TrainingRoomFlags.BowSkill / 1.2) + player.stats.spe / 3 - randInt(monster.stats.tou) - monster.combat.stats.defense());
        if (damage < 0) damage = 0;
        if (damage === 0) {
            if (monster.stats.int > 0)
                CView.text(monster.desc.capitalA + monster.desc.short + " shrugs as the arrow bounces off them harmlessly.\n\n");
            else
                CView.text("The arrow bounces harmlessly off " + monster.desc.a + monster.desc.short + ".\n\n");
            return;
        }
        if (monster.desc.short === "pod")
            CView.text("The arrow lodges deep into the pod's fleshy wall");
        else if (monster.desc.plural)
            CView.text(monster.desc.capitalA + monster.desc.short + " look down at the arrow that now protrudes from one of " + monster.desc.possessivePronoun + " bodies");
        else CView.text(monster.desc.capitalA + monster.desc.short + " looks down at the arrow that now protrudes from " + monster.desc.possessivePronoun + " body");
        damage *= monster.combat.stats.attack(player);
        damage = monster.combat.stats.loseHP(damage);
        monster.stats.lust -= 20;
        if (monster.stats.lust < 0) monster.stats.lust = 0;
        if (monster.stats.HP <= 0) {
            if (monster.desc.short === "pod")
                CView.text(". (" + String(damage) + ")\n\n");
            else if (monster.desc.plural)
                CView.text(" and stagger, collapsing onto each other from the wounds you've inflicted on " + monster.desc.objectivePronoun + ".  (" + String(damage) + ")\n\n");
            else CView.text(" and staggers, collapsing from the wounds you've inflicted on " + monster.desc.objectivePronoun + ".  (" + String(damage) + ")\n\n");
            return;
        }
        else CView.text(".  It's clearly very painful. (" + String(damage) + ")\n\n");
    }
}
