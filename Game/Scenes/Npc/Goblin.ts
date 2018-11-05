import { Character } from "../../Character/Character";
import { CharacterDescription } from "../../Character/CharacterDescription";
import { CombatContainer, ActionResponse } from "../../Combat/CombatContainer";
import { CharacterInventory } from "../../Inventory/CharacterInventory";
import { CharacterType } from "../../Character/CharacterType";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../Body/Vagina";
import { BreastCup } from "../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../Body/Butt";
import { randInt, randomChoice } from "../../../Engine/Utilities/SMath";
import { HipRating } from "../../Body/Hips";
import { Weapon } from "../../Items/Weapons/Weapon";
import { Armor } from "../../Items/Armors/Armor";
import { ArmorName } from "../../Items/Armors/ArmorName";
import { WeaponName } from "../../Items/Weapons/WeaponName";
import { EndScenes } from "../../Combat/EndScenes";
import { DefeatType } from "../../Combat/DefeatEvent";
import { CView } from "../../../Page/ContentView";
import { Gender } from "../../Body/GenderIdentity";
import { passTime } from "../../Menus/InGame/PlayerMenu";
import { NextScreenChoices } from "../../ScreenDisplay";
import { ICombatAction } from "../../Combat/Actions/ICombatAction";
import { CombatActionFlags } from "../../Effects/CombatActionFlag";
import { PerkType } from "../../Effects/PerkType";
import { CombatEffectType } from "../../Effects/CombatEffectType";
import { WeightedDrop } from "../../Utilities/Drops/WeightedDrop";
import { ConsumableName } from "../../Items/Consumables/ConsumableName";
import { ItemDesc } from "../../Items/ItemDesc";
import { Dictionary } from "../../../Engine/Utilities/Dictionary";
import { attacked } from "../../Combat/Responses/Attacked";

class GoblinAction implements ICombatAction {
    public name: string = "Actions";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [new GoblinAttack(), new GoblinDrugAttack(), new GoblinTease()];
    public isPossible(character: Character): boolean { return true; }
    public canUse(character: Character, target: Character): boolean { return true; }
    public use(character: Character, target: Character): void | NextScreenChoices {
        return randomChoice(...this.subActions.filter((act) => act.canUse(character, target))).use(character, target);
    }
}

class GoblinAttack implements ICombatAction {
    public name: string = "Attack";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];
    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, target: Character): boolean {
        return true;
    }
    public use(character: Character, target: Character): void | NextScreenChoices {
        CView.text(character.desc.capitalA + character.desc.short + character.inventory.equipment.weapon.verb + " you with " + character.inventory.equipment.weapon.desc.longName);
        target.stats.HP -= character.combat.stats.attack(target);
    }
}

class GoblinDrugAttack implements ICombatAction {
    public name: string = "Attack";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];
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

class GoblinTease implements ICombatAction {
    public name: string = "Tease";
    public flag: CombatActionFlags = CombatActionFlags.All;
    public reasonCannotUse: string = "";
    public subActions: ICombatAction[] = [];
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

const GoblinResponses = new Dictionary<string, ActionResponse>();
GoblinResponses.set("Attack", attacked);

class GoblinEndScenes extends EndScenes {
    public defeatScene(howGoblinWon: DefeatType, enemy: Character): NextScreenChoices {
        CView.text("PLACEHOLDER - Goblin Defeat Scene");
        return { next: passTime(4) };
    }

    public victoryScene(howGoblinWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.gender === Gender.NONE) {
            CView.text("You collapse in front of the goblin, too wounded to fight.  She giggles and takes out a tube of lipstick smearing it whorishly on your face.  You pass into unconsciousness immediately.  It must have been drugged.");
            return { next: passTime(1) };
        }
        else {
            CView.text("PLACEHOLDER - Goblin Win Scene");
            return { next: passTime(1) };
        }
    }
}

export class Goblin extends Character {
    public inventory: CharacterInventory;
    protected combatContainer: CombatContainer;
    protected description: CharacterDescription;

    public constructor() {
        super(CharacterType.Goblin);
        this.description = new CharacterDescription(this, "the ", "goblin", "The goblin before you is a typical example of her species, with dark green skin, pointed ears, and purple hair that would look more at home on a punk-rocker.  She's only about three feet tall, but makes up for it with her curvy body, sporting hips and breasts that would entice any of the men in your village were she full-size.  There isn't a single scrap of clothing on her, just lewd leather straps and a few clinking pouches.  She does sport quite a lot of piercings – the most noticeable being large studs hanging from her purple nipples.  Her eyes are fiery red, and practically glow with lust.  This one isn't going to be satisfied until she has her way with you.  It shouldn't be too hard to subdue such a little creature, right?");
        this.body.vaginas.add(new Vagina(VaginaWetness.DROOLING, VaginaLooseness.NORMAL));
        this.body.chest.firstRow.rating = BreastCup.E;
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.tallness = 35 + randInt(4);
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.skin.tone = "dark green";
        this.body.hair.color = "purple";
        this.body.hair.length = 4;
        this.stats.base.str.value = 12;
        this.stats.base.tou.value = 13;
        this.stats.base.spe.value = 35;
        this.stats.base.int.value = 42;
        this.stats.base.lib.value = 45;
        this.stats.base.sens.value = 45;
        this.stats.base.cor.value = 60;
        this.stats.base.lust.value = 50;
        this.stats.base.level.value = 1;

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "tiny punch", 1),
            new Armor("leather straps" as ArmorName, new ItemDesc("leather straps"), "leather straps", 1)
        );
        this.inventory.gems = randInt(5) + 5;

        this.combatContainer = new CombatContainer(this,
            new GoblinAction(),
            GoblinResponses,
            new GoblinEndScenes(this),
            {
                drop: new WeightedDrop(ConsumableName.GoblinAle, 5)
                    .addMany(1, ConsumableName.LustDraft,
                        ConsumableName.HairDyeNeonPink,
                        ConsumableName.HairDyeDarkBlue,
                        ConsumableName.HairDyeBrightOrange,
                        ConsumableName.HairDyePurple),
                gems: () => randInt(20)
            });
    }
}
