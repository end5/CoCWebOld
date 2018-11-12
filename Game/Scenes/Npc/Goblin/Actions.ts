import { CombatActionFlags } from "../../../Effects/CombatActionFlag";
import { CombatAction } from "../../../Combat/Actions/CombatAction";
import { Character } from "../../../Character/Character";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { randomChoice, randInt } from "../../../../Engine/Utilities/SMath";
import { CView } from "../../../../Page/ContentView";
import { PerkType } from "../../../Effects/PerkType";
import { CombatEffectType } from "../../../Effects/CombatEffectType";

export class GoblinAction implements CombatAction {
    public name: string = "Actions";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [new GoblinAttack(), new GoblinDrugAttack(), new GoblinTease()];
    public isPossible(character: Character): boolean { return true; }
    public canUse(character: Character, target: Character): boolean { return true; }
    public use(character: Character, target: Character): void | NextScreenChoices {
        return randomChoice(...this.subActions.filter((act) => act.canUse(character, target))).use(character, target);
    }
}

class GoblinAttack implements CombatAction {
    public name: string = "Attack";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];
    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, target: Character): boolean {
        return true;
    }
    public use(character: Character, target: Character): void | NextScreenChoices {
        CView.text(character.desc.capitalA + character.desc.short + character.inventory.weapon.verb + " you with " + character.inventory.weapon.desc.longName);
        const damage = character.combat.stats.attack(target);
        CView.text(`(${damage})`);
        target.stats.HP -= damage;
        CView.text("\n\n");
    }
}

class GoblinDrugAttack implements CombatAction {
    public name: string = "Attack";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];
    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, target: Character): boolean {
        return true;
    }
    public use(character: Character, target: Character): void {
        const color: string = randomChoice(...["red", "green", "blue", "white", "black"]);
        // Throw offensive potions at the player
        if (color !== "blue") {
            CView.text(character.desc.capitalA + character.desc.short + " uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
        }
        // Drink blue pots
        else {
            CView.text(character.desc.capitalA + character.desc.short + " pulls out a blue vial and uncaps it, swiftly downing its contents.");
            if (character.combat.stats.HPRatio() < 1) {
                CView.text("  She looks to have recovered from some of her wounds!\n");
                character.stats.HP += character.stats.maxHP() / 4;
            }
            else CView.text("  There doesn't seem to be any effect.\n");
            return;
        }
        // Dodge chance!
        if ((target.perks.has(PerkType.Evade) && randInt(10) <= 3) || (randInt(100) < target.stats.spe / 5)) {
            CView.text("\nYou narrowly avoid the gush of alchemic fluids!\n");
        }
        else {
            // Get hit!
            if (color === "red") {
                // Temporary heat
                CView.text("\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n");
                if (!target.combat.effects.has(CombatEffectType.TemporaryHeat))
                    target.combat.effects.add(CombatEffectType.TemporaryHeat, character);
            }
            else if (color === "green") {
                // Green poison
                CView.text("\nThe greenish fluids splash over you, making you feel slimy and gross.  Nausea plagues you immediately - you have been poisoned!\n");
                if (!target.combat.effects.has(CombatEffectType.Poison))
                    target.combat.effects.add(CombatEffectType.Poison, character);
            }
            else if (color === "white") {
                // sticky flee prevention
                CView.text("\nYou try to avoid it, but it splatters the ground around you with very sticky white fluid, making it difficult to run.  You'll have a hard time escaping now!\n");
                if (!target.combat.effects.has(CombatEffectType.NoFlee))
                    target.combat.effects.add(CombatEffectType.NoFlee, character);
            }
            else if (color === "black") {
                // Increase fatigue
                CView.text("\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n");
                target.stats.fatigue += 10 + randInt(25);
            }
        }
        CView.text("\n");
    }
}

class GoblinTease implements CombatAction {
    public name: string = "Tease";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];
    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, target: Character): boolean {
        return true;
    }
    public use(character: Character, target: Character): void {
        const det = randInt(3);
        if (det === 0) CView.text(character.desc.capitalA + character.desc.short + " runs her hands along her leather-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
        if (det === 1) CView.text(character.desc.capitalA + character.desc.short + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She caresses her snatch and gives you a come hither look.");
        if (det === 2) CView.text(character.desc.capitalA + character.desc.short + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
        target.stats.lust += randInt(target.stats.lib / 10) + 8;
        CView.text("  The display distracts you long enough to prevent you from taking advantage of her awkward pose, leaving you more than a little flushed.\n\n");
    }
}
