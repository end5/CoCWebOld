import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastCup, BreastRow } from '../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../Body/Butt';
import { HipRating } from '../../Body/Hips';
import {
    Vagina,
    VaginaLooseness,
    VaginaType,
    VaginaWetness
    } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { CharacterDescription } from '../../Character/CharacterDescription';
import { CharacterType } from '../../Character/CharacterType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { Armor } from '../../Items/Armors/Armor';
import { ArmorName } from '../../Items/Armors/ArmorName';
import { Weapon } from '../../Items/Weapons/Weapon';
import { WeaponName } from '../../Items/Weapons/WeaponName';

export class Goblin extends Character {
    protected goblinDrugAttack() {
        let temp2: number = randInt(2);
        if (short === "Tamani") temp2 = randInt(5);
        if (short === "Tamani's daughters") temp2 = randInt(5);
        let color: string = "";
        if (temp2 === 0) color = "red";
        if (temp2 === 1) color = "green";
        if (temp2 === 2) color = "blue";
        if (temp2 === 3) color = "white";
        if (temp2 === 4) color = "black";
        // Throw offensive potions at the player
        if (color != "blue") {
            if (short === "Tamani's daughters") DisplayText("Tamani uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
            else DisplayText(capitalA + short + " uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
        }
        // Drink blue pots
        else {
            if (short === "Tamani's daughters") {
                DisplayText("Tamani pulls out a blue vial and uncaps it, then douses the mob with the contents.");
                if (HPRatio() < 1) {
                    DisplayText("  Though less effective than ingesting it, the potion looks to have helped the goblins recover from their wounds!\n");
                    addHP(80);
                }
                else DisplayText("  There doesn't seem to be any effect.\n");
                DisplayText("\n");
            }
            else {
                DisplayText(capitalA + short + " pulls out a blue vial and uncaps it, swiftly downing its contents.");
                if (HPRatio() < 1) {
                    DisplayText("  She looks to have recovered from some of her wounds!\n");
                    addHP(eMaxHP() / 4);
                    if (short === "Tamani") addHP(eMaxHP() / 4);
                }
                else DisplayText("  There doesn't seem to be any effect.\n");
                combatRoundOver();
            }
            return;
        }
        // Dodge chance!
        if ((player.perks.has(PerkType.Evade) && randInt(10) <= 3) || (randInt(100) < player.stats.spe / 5)) {
            DisplayText("\nYou narrowly avoid the gush of alchemic fluids!\n");
        }
        else {
            // Get hit!
            if (color === "red") {
                // Temporary heat
                DisplayText("\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n");
                if (!player.statusAffects.has(StatusAffectType.TemporaryHeat)) player.statusAffects.add(StatusAffectType.TemporaryHeat, 0, 0, 0, 0);
            }
            else if (color === "green") {
                // Green poison
                DisplayText("\nThe greenish fluids splash over you, making you feel slimy and gross.  Nausea plagues you immediately - you have been poisoned!\n");
                if (!player.statusAffects.has(StatusAffectType.Poison)) player.statusAffects.add(StatusAffectType.Poison, 0, 0, 0, 0);
            }
            else if (color === "white") {
                // sticky flee prevention
                DisplayText("\nYou try to avoid it, but it splatters the ground around you with very sticky white fluid, making it difficult to run.  You'll have a hard time escaping now!\n");
                if (!player.statusAffects.has(StatusAffectType.NoFlee)) player.statusAffects.add(StatusAffectType.NoFlee, 0, 0, 0, 0);
            }
            else if (color === "black") {
                // Increase fatigue
                DisplayText("\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n");
                game.fatigue(10 + randInt(25));
            }
        }
        if (!plural) combatRoundOver();
        else DisplayText("\n");
    }
    protected goblinTeaseAttack() {
        const det: number = randInt(3);
        if (det === 0) DisplayText(capitalA + short + " runs her hands along her leather-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
        if (det === 1) DisplayText(capitalA + short + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She caresses her snatch and gives you a come hither look.");
        if (det === 2) DisplayText(capitalA + short + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
        game.dynStats("lus", randInt(player.stats.lib / 10) + 8);
        DisplayText("  The display distracts you long enough to prevent you from taking advantage of her awkward pose, leaving you more than a little flushed.\n\n");
        combatRoundOver();
    }

    public defeated(hpVictory: boolean) {
        game.goblinScene.gobboRapeIntro();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean) {
        if (player.gender === Gender.NONE) {
            DisplayText("You collapse in front of the goblin, too wounded to fight.  She giggles and takes out a tube of lipstick smearing it whorishly on your face.  You pass into unconsciousness immediately.  It must have been drugged.");
            game.return { next: Scenes.camp.returnToCampUseOneHour };
        } else if (pcCameWorms) {
            DisplayText("\n\nThe goblin's eyes go wide and she turns to leave, no longer interested in you.");
            player.orgasm();
            return { next: game.cleanupAfterCombat };
        } else {
            game.goblinScene.goblinRapesPlayer();
        }
    }

    public constructor() {
        super(CharacterType.Goblin);
        this.description = new CharacterDescription(this, "goblin", "The goblin before you is a typical example of her species, with dark green skin, pointed ears, and purple hair that would look more at home on a punk-rocker.  She's only about three feet tall, but makes up for it with her curvy body, sporting hips and breasts that would entice any of the men in your village were she full-size.  There isn't a single scrap of clothing on her, just lewd leather straps and a few clinking pouches.  She does sport quite a lot of piercings – the most noticeable being large studs hanging from her purple nipples.  Her eyes are fiery red, and practically glow with lust.  This one isn't going to be satisfied until she has her way with you.  It shouldn't be too hard to subdue such a little creature, right?", false, "the ");
        this.torso.vaginas.add(new Vagina(VaginaType.HUMAN, VaginaWetness.DROOLING, VaginaLooseness.NORMAL));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 40, 0, 0, 0);
        this.torso.chest.add(new BreastRow(BreastCup.E));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0);
        this.tallness = 35 + randInt(4);
        this.torso.hips.rating = HipRating.AMPLE + 2;
        this.torso.butt.rating = ButtRating.LARGE;
        this.skin.tone = "dark green";
        this.torso.neck.head.hair.color = "purple";
        this.torso.neck.head.hair.length = 4;
        this.baseStats.str = 12;
        this.baseStats.tou = 13;
        this.baseStats.spe = 35;
        this.baseStats.int = 42;
        this.baseStats.lib = 45;
        this.baseStats.sens = 45;
        this.baseStats.cor = 60;
        this.baseStats.lust = 50;
        this.baseStats.level = 1;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("fists" as WeaponName, undefined, "", "tiny punch", 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("leather straps" as ArmorName, undefined, "", 0));
        // this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.inventory.gems = randInt(5) + 5;
        // this.drop = new WeightedDrop().
        //     add(consumables.GOB_ALE, 5).
        //     addMany(1, consumables.L_DRAFT,
        //         consumables.PINKDYE,
        //         consumables.BLUEDYE,
        //         consumables.ORANGDY,
        //         consumables.PURPDYE);
        this.special1 = goblinDrugAttack;
        this.special2 = goblinTeaseAttack;
    }
}
