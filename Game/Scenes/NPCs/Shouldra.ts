import { Character } from "../../Character/Character";
import { NextScreenChoices } from "../../ScreenDisplay";
import { CView } from "../../../Engine/Display/ContentView";
import { PerkType } from "../../Effects/PerkType";
import { randInt } from "../../../Engine/Utilities/SMath";
import { describeHips } from "../../Descriptors/HipDescriptor";
import { CharacterType } from "../../Character/CharacterType";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../Body/Vagina";
import { StatusEffectType } from "../../Effects/StatusEffectType";
import { BreastRow } from "../../Body/BreastRow";
import { breastCupInverse } from "../../Descriptors/BreastDescriptor";
import { ButtLooseness, ButtWetness, ButtRating } from "../../Body/Butt";
import { HipRating } from "../../Body/Hips";
import { CombatAction } from "../../Combat/Actions/CombatAction";
import { ActionPerform } from "../../Combat/ActionPerform";
import { EndScenes } from "../../Combat/EndScenes";
import { DefeatType } from "../../Combat/DefeatEvent";
import { CharacterDescription } from "../../Character/CharacterDescription";
import { Weapon } from "../../Items/Weapons/Weapon";
import { WeaponName } from "../../Items/Weapons/WeaponName";
import { Armor } from "../../Items/Armors/Armor";
import { ArmorName } from "../../Items/Armors/ArmorName";
import { loseToShouldra, defeatDannyPhantom } from "./ShouldraScene";
import { CombatContainer } from "../../Combat/CombatContainer";
import { DefaultRespond } from "../../Combat/Default/DefaultRespond";

function shouldrattack(player: Character, monster: Character): NextScreenChoices {
    let damage: number = 0;
    // Determine if dodged!
    if (player.stats.spe - monster.stats.spe > 0 && Math.floor(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
        CView.text("The girl wades in for a swing, but you deftly dodge to the side. She recovers quickly, spinning back at you.");
        return;
    }
    // ("Misdirection"
    if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
        CView.text("The girl wades in for a swing, but you deftly misdirect her and avoid the attack. She recovers quickly, spinning back at you.");
        return;
    }
    // Determine if cat'ed
    if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
        CView.text("The girl wades in for a swing, but you deftly twist your flexible body out of the way. She recovers quickly, spinning back at you.");
        return;
    }
    // Determine damage - str modified by enemy toughness!
    damage = Math.floor((monster.stats.str + monster.combat.stats.weaponAttack()) - randInt(player.stats.tou) - player.combat.stats.defense());
    if (damage > 0) damage = player.combat.stats.loseHP(damage, monster);
    if (damage <= 0) {
        damage = 0;
        // Due to toughness or amor...
        if (randInt(player.combat.stats.defense() + player.stats.tou) < player.combat.stats.defense()) CView.text("You absorb and deflect every " + monster.inventory.equipment.weapon.verb + " with your " + player.inventory.equipment.armor.displayName + ".");
        else CView.text("You deflect and block every " + monster.inventory.equipment.weapon.verb + " " + monster.desc.a + monster.desc.short + " throws at you.");
    }
    // everyone else
    else {
        const choice: number = randInt(3);
        // (regular attack 1)
        if (choice === 0) CView.text("Ducking in close, the girl thunders a punch against your midsection, leaving a painful sting.");
        // (regular attack 2)
        else if (choice === 1) CView.text("The girl feints a charge, leans back, and snaps a kick against your " + describeHips(player) + ". You stagger, correct your posture, and plunge back into combat.");
        // (regular attack 3)
        else if (choice === 2) CView.text("You momentarily drop your guard as the girl appears to stumble. She rights herself as you step forward and lands a one-two combination against your torso.");
        CView.text(" (" + damage + ")");
    }
    if (damage > 0) {
        if (monster.stats.lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
            CView.text("\n" + monster.desc.capitalA + monster.desc.short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
            monster.stats.lust += 5 * monster.stats.lustVuln;
        }
    }

    CView.text("\n");
}

// (lust attack 1)
function shouldraLustAttack(player: Character, monster: Character) {
    if (randInt(2) === 0) CView.text("The girl spins away from one of your swings, her tunic flaring around her hips. The motion gives you a good view of her firm and moderately large butt. She notices your glance and gives you a little wink.\n");
    else CView.text("The girl's feet get tangled on each other and she tumbles to the ground. Before you can capitalize on her slip, she rolls with the impact and comes up smoothly. As she rises, however, you reel back and raise an eyebrow in confusion; are her breasts FILLING the normally-loose tunic? She notices your gaze and smiles, performing a small pirouette on her heel before squaring up to you again. Your confusion only heightens when her torso comes back into view, her breasts back to their normal proportions. A trick of the light, perhaps? You shake your head and try to fall into the rhythm of the fight.\n");
    player.stats.lust += (8 + player.stats.lib / 10);

}
// (magic attack)
function shouldraMagicLazers(player: Character, monster: Character) {
    const damage: number = player.combat.stats.loseHP(20 + randInt(10), monster);
    CView.text("Falling back a step, the girl raises a hand and casts a small spell. From her fingertips shoot four magic missiles that slam against your skin and cause a surprising amount of discomfort. (" + damage + ")\n");
}

class ShouldraAction implements CombatAction {
    public name: string = 'Action';
    public reasonCannotUse: string = '';
    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, target?: Character): boolean {
        return true;
    }
    public use(character: Character, target: Character): NextScreenChoices {
        const attack: number = randInt(3);
        if (attack === 0) return shouldrattack(target, character);
        else if (attack === 1) shouldraLustAttack(target, character);
        else shouldraMagicLazers(target, character);
    }
}

class ShouldraPerform implements ActionPerform {
    public mainAction: CombatAction = new ShouldraAction();
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

class ShouldraEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean { return false; }
    public hasDefeated(enemy: Character): boolean { return false; }
    public claimsVictory(howYouWon: DefeatType, enemy: Character): void { }
    public criesInDefeat(howYouLost: DefeatType, enemy: Character): void { }
    protected beforeEndingScene(howYouLost: DefeatType, enemy: Character): void { }
    public hasVictoryScene: boolean = true;
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        return loseToShouldra(enemy);
    }
    public hasDefeatScene: boolean = true;
    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return defeatDannyPhantom(enemy, this.char);
    }
    protected defeatAwardScene(): NextScreenChoices { }
    protected victoryAwardScene(): NextScreenChoices { }
}

export class Shouldra extends Character {
    public constructor() {
        super(CharacterType.Shouldra);
        this.description = new CharacterDescription(this, "the ", "plain girl", "Her face has nothing overly attractive about it; a splash of freckles flits across her cheeks, her brows are too strong to be considered feminine, and her jaw is a tad bit square. Regardless, the features come together to make an aesthetically pleasing countenance, framed by a stylish brown-haired bob. Her breasts are obscured by her grey, loose-fitting tunic, flowing down to reach the middle of her thigh. Her legs are clad in snug, form-fitting leather breeches, and a comfortable pair of leather shoes shield her soles from the potentially harmful environment around her.");
        this.body.vaginas.add(new Vagina(VaginaWetness.WET, VaginaLooseness.NORMAL, false));
        this.effects.add(StatusEffectType.BonusVCapacity, 40, 0, 0, 0);
        this.body.chest.add(new BreastRow(breastCupInverse("D")));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.effects.add(StatusEffectType.BonusACapacity, 40, 0, 0, 0);
        this.body.tallness = 65;
        this.body.hips.rating = HipRating.AMPLE;
        this.body.butt.rating = ButtRating.AVERAGE + 1;
        this.body.skin.tone = "white";
        this.body.hair.color = "white";
        this.body.hair.length = 3;
        this.baseStats.str = 45;
        this.baseStats.tou = 30;
        this.baseStats.spe = 5;
        this.baseStats.int = 110;
        this.baseStats.lib = 100;
        this.baseStats.sens = 0;
        this.baseStats.cor = 33;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("fists" as WeaponName, undefined, "fists", "punches", 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("comfortable clothes" as ArmorName, undefined, "comfortable clothes", 0));
        this.baseStats.bonusHP = 30;
        this.stats.lust = 10;
        // this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
        this.stats.level = 4;
        this.inventory.gems = 0;
        // this.inventory.drop = new ChainedDrop().add(ConsumableName.Ectoplasm, 1 / 3);
        this.combatContainer = new CombatContainer(this, new ShouldraPerform(), new DefaultRespond(), new ShouldraEndScenes(this));
    }
}
