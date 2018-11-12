import { CombatActionFlags } from "../../../Effects/CombatActionFlag";
import { CombatAction } from "../../../Combat/Actions/CombatAction";
import { Character } from "../../../Character/Character";
import { randomChoice } from "../../../../Engine/Utilities/SMath";
import { CView } from "../../../../Page/ContentView";

export class TiberiusAction implements CombatAction {
    public name: string = "Actions";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [new TiberiusAttack()];
    public isPossible(character: Character): boolean { return true; }
    public canUse(character: Character, target: Character): boolean { return true; }
    public use(character: Character, target: Character): void {
        randomChoice(...this.subActions.filter((act) => act.canUse(character, target))).use(character, target);
    }
}

class TiberiusAttack implements CombatAction {
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
        CView.text(`${character.desc.capitalA + character.desc.short} performs a ${character.inventory.weapon.verb} attack on ${target.desc.a + target.desc.short} with ${character.desc.possessivePronoun} ${character.inventory.weapon.desc.longName}`);
        const damage = character.combat.stats.attack(target);
        CView.text(`(${damage})`);
        target.stats.HP -= damage;
        CView.text("\n\n");
    }
}
