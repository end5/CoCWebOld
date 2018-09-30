import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { randomChoice, randInt } from "../../../../Engine/Utilities/SMath";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../../Body/Vagina";
import { BreastRow, BreastCup } from "../../../Body/BreastRow";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { SkinType } from "../../../Body/Skin";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { Armor } from "../../../Items/Armors/Armor";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { CView } from "../../../../Engine/Display/ContentView";
import { combatDodge } from "../../../Combat/CombatUtils";
import { returnToCampUseOneHour } from "../../Camp";
import { ActionPerform } from "../../../Combat/ActionPerform";
import { CombatAction } from "../../../Combat/Actions/CombatAction";
import { EndScenes } from "../../../Combat/EndScenes";
import { defeatChameleonGirl, loseToChameleonGirl } from "./ChameleonGirlScene";
import { DefeatType } from "../../../Combat/DefeatEvent";
import { ActionRespond } from "../../../Combat/ActionRespond";
import { CombatContainer } from "../../../Combat/CombatContainer";

function chameleonTongueAttack(self: Character, target: Character): NextScreenChoices {
    if (self.combat.perform.attack.canUse(self)) {
        self.inventory.equipment.equippedWeaponSlot.equip(this.tongueWeapon);
        self.combat.perform.attack.use(self, target);
        self.inventory.equipment.equippedWeaponSlot.unequip();
    }
    return;
}

function chameleonClaws(self: Character, target: Character): NextScreenChoices {
    // Blind dodge change
    if (self.effects.has(StatusEffectType.Blind) && randInt(3) < 1) {
        CView.text(self.desc.a + self.desc.short + " completely misses you with a blind claw-attack!\n");
    }
    // Evade:
    else if (combatDodge(self, target))
        CView.text("The chameleon girl's claws slash towards you, but you lean away from them and they fly by in a harmless blur.");
    // Get hit
    else {
        let damage: number = Math.floor((self.stats.str + self.combat.stats.weaponAttack()) - randInt(target.stats.tou));
        if (damage > 0) {
            damage = target.combat.stats.loseHP(damage, self);
            CView.text("The chameleon swings her arm at you, catching you with her claws.  You wince as they scratch your skin, leaving thin cuts in their wake. (" + damage + ")");
        }
        else CView.text("The chameleon swings her arm at you, catching you with her claws.  You defend against the razor sharp attack.");
    }
    return;
}

function rollKickClawWhatTheFuckComboIsThisShit(self: Character, target: Character): NextScreenChoices {
    // Blind dodge change
    if (self.effects.has(StatusEffectType.Blind) && randInt(3) < 1) {
        CView.text(self.desc.a + self.desc.short + " completely misses you with a blind roll-kick!\n");
    }
    // Evade:
    else if (combatDodge(self, target)) {
        let damage2: number = 1 + randInt(10);
        damage2 = self.combat.stats.loseHP(damage2, target);
        CView.text("The chameleon girl leaps in your direction, rolls, and kicks at you.  You sidestep her flying charge and give her a push from below to ensure she lands face-first in the bog. (" + damage2 + ")");
    }
    // Get hit
    else {
        let damage: number = Math.floor((self.stats.str + self.combat.stats.weaponAttack()) - randInt(target.stats.tou) - target.combat.stats.defense()) + 25;
        if (damage > 0) {
            damage = target.combat.stats.loseHP(damage, self);
            CView.text("The chameleon leaps in your direction, rolls, and kicks you square in the shoulder as she ascends, sending you reeling.  You grunt in pain as a set of sharp claws rake across your chest. (" + damage + ")");
        }
        else CView.text("The chameleon rolls in your direction and kicks up at your chest, but you knock her aside without taking any damage..");
    }
    return;
}

class MainAction implements CombatAction {
    private actions = [chameleonClaws, rollKickClawWhatTheFuckComboIsThisShit, chameleonTongueAttack];
    public name = 'Attack Action';
    public reasonCannotUse = '';
    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, target?: Character): boolean {
        return true;
    }
    public use(character: Character, target: Character): NextScreenChoices {
        return this.actions[randInt(3)](character, target);
    }
}

class ChameleonGirlEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean {
        return false;
    }
    public hasDefeated(enemy: Character): boolean {
        return false;
    }
    public claimsVictory(howYouWon: DefeatType, enemy: Character): void { }
    public criesInDefeat(howYouLost: DefeatType, enemy: Character): void { }
    protected beforeEndingScene(howYouLost: DefeatType, enemy: Character): void { }
    public hasVictoryScene: boolean = true;
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(StatusEffectType.CameWorms)) {
            CView.text("\n\nThe chameleon girl recoils.  \"<i>Ew, gross!</i>\" she screetches as she runs away, leaving you to recover from your defeat alone.");
            return { next: returnToCampUseOneHour };
        }
        else {
            return loseToChameleonGirl(this.char, enemy);
        }
    }
    public hasDefeatScene: boolean = true;
    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return defeatChameleonGirl(enemy, this.char);
    }
}

class ChameleonGirlResponds implements ActionRespond {
    public enemyAttack() { }
    public enemyTease(damage: number, self: Character, enemy: Character) { }
    public enemyUseItem() { }
    public enemyPhysicalAttack() { }
    public enemyMagicalAttack() { }
    public enemyDodge() {
        CView.text("The chameleon girl whips her head and sends her tongue flying at you, but you hop to the side and manage to avoid it.  The pink blur flies back into her mouth as quickly as it came at you, and she looks more than a bit angry that she didn't find her target.\n");
    }
    public enemyRun() { }
    public attacked(damage: number, crit: boolean, self: Character, enemy: Character) { }
    public didNoDamage(self: Character, enemy: Character) {
        CView.text("The Chameleon Girl lashes out with her tongue, but you deflect the sticky projectile off your arm, successfully defending against it.  She doesn't look happy about it when she slurps the muscle back into her mouth.");
    }
    public didDamage(damage: number, crit: boolean, self: Character, enemy: Character) {
        CView.text("The chameleon whips her head forward and sends her tongue flying at you.  It catches you in the gut, the incredible force behind it staggering you.  The pink blur flies back into her mouth as quickly as it came at you, and she laughs mockingly as you recover your footing. (" + damage + ")");
    }
    public feared() { }
    public stunned() { }
    public constricted() { }
    public blinded() { }
}

class ChameleonGirlPerforms implements ActionPerform {
    public mainAction: CombatAction = new MainAction();
    public approach: CombatAction;
    public recover: CombatAction;
    public squeeze: CombatAction;
    public struggle: CombatAction;
    public attack: CombatAction;
    public tease: CombatAction;
    public spells: CombatAction;
    public items: CombatAction;
    public moveAway: CombatAction;
    public climb: CombatAction;
    public release: CombatAction;
    public run: CombatAction;
    public physicalSpecials: CombatAction;
    public magicalSpecials: CombatAction;
    public wait: CombatAction;
    public fantasize: CombatAction;
    public inspect: CombatAction;
}

// /**
//  * Pairs of skin.tone/skinAdj
//  */
const ChameleonSkin = [
    ["red", "black"],
    ["green", "yellowish"],
    ["blue", "lighter blue"],
    ["purple", "bright yellow"],
    ["orange", "brown"],
    ["tan", "white"]
];

export class ChameleonGirl extends Character {
    public constructor() {
        super(CharacterType.ChameleonGirl);
        const skin = randomChoice(ChameleonSkin);
        this.description = new CharacterDescription(this, "the ", "chameleon girl", "You're faced with a tall lizard-like girl with smooth " + skin[0] + " skin and long, " + skin[1] + " stripes that run along her body from ankle to shoulder.  An abnormally large tail swishes behind her, and her hands are massive for her frame, built for easily climbing the trees.  A pair of small, cute horns grow from her temples, and a pair of perky B-cups push out through her skimpy drapings.  Large, sharp claws cap her fingers, gesturing menacingly at you.");
        this.body.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.LOOSE, false));
        this.body.chest.add(new BreastRow(BreastCup.B));
        this.body.butt.looseness = ButtLooseness.NORMAL;
        this.body.butt.wetness = ButtWetness.DRY;
        this.body.tallness = randInt(2) + 68;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = skin[0];
        this.body.skin.type = SkinType.PLAIN;
        this.body.skin.desc = "skin";
        this.body.skin.adj = skin[1];
        this.body.hair.color = "black";
        this.body.hair.length = 15;
        this.baseStats.str = 65;
        this.baseStats.tou = 65;
        this.baseStats.spe = 95;
        this.baseStats.int = 85;
        this.baseStats.lib = 50;
        this.baseStats.sens = 45;
        this.baseStats.cor = 50;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "claw", 30));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("skin" as ArmorName, undefined, "skin", 20));
        this.baseStats.bonusHP = 350;
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = .25;
        // this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.baseStats.level = 14;
        this.inventory.gems = 10 + randInt(50);
        // this.drop = NO_DROP;
        this.combatContainer = new CombatContainer(this, new ChameleonGirlPerforms(), new ChameleonGirlResponds(), new ChameleonGirlEndScenes(this));
    }
}
