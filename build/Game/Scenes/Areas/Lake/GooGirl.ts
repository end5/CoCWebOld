import { Character } from '../../../Character/Character';
import { User } from '../../../User';
import { CharacterType } from '../../../Character/CharacterType';
import { BreastRow } from '../../../Body/BreastRow';
import { CharacterDescription } from '../../../Character/CharacterDescription';
import { Desc } from '../../../Descriptors/Descriptors';
import { Vagina, VaginaWetness, VaginaLooseness } from '../../../Body/Vagina';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { ButtLooseness, ButtWetness, ButtRating } from '../../../Body/Butt';
import { randInt, randomChoice } from '../../../../Engine/Utilities/SMath';
import { HipRating } from '../../../Body/Hips';
import { LegType } from '../../../Body/Legs';
import { SkinType } from '../../../Body/Skin';
import { Armor } from '../../../Items/Armors/Armor';
import { ArmorName } from '../../../Items/Armors/ArmorName';
import { WeaponName } from '../../../Items/Weapons/WeaponName';
import { Weapon } from '../../../Items/Weapons/Weapon';

// /*Fight-
//  You are fighting a goo-girl.
//  The goo-girl has a curious expression on her youthful, shimmering face. Her body is slender and globs of slime regularly drip from her limbs, splattering into the goo puddle pooling beneath her hips. A small, heart-shaped nucleus pulses in her chest with a red glow. [if the player has a c-cup or larger chest: She has apparently made herself a bit more like you, as her chest appears to be a perfect copy of your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating)+ ".]
//  */

// // [Goo attacks]
// // Slap – The slime holds its hands up and they morph into a replica of your " + weaponName + ". Happily, she swings at you, painfully smacking her gooey limbs against your head.  You shake your " + Desc.Head.describeHair(player) + ", clearing your head of the dazing slap. (lightly damages hit points)
// // Acid Slap (Only after player's fire attack) – Her body quivering from your flames, the goo-girl delivers a painful slap across your cheek. You gasp when the light stinging becomes a searing burn that seems to get worse as time goes on! (heavily damages hit points and puts Acid Burn on the player)
// private gooGalAttack() {
//     let damage: number = 0;
//     // return to combat menu when finished
//     return { next: game.playerMenu };
//     if (findPerk(PerkLib.Acid) >= 0) DisplayText("Her body quivering from your flames, the goo-girl ");
//     else DisplayText("The slime holds its hands up and they morph into a replica of your " + player.inventory.equipment.weapon.displayname + ".  Happily, she swings at you");
//     // Determine if dodged!
//     if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
//         if (findPerk(PerkLib.Acid) >= 0) DisplayText("tries to slap you, but you dodge her attack.");
//         else DisplayText(", missing as you dodge aside.");
//         return;
//     }
//     // Determine if evaded
//     if (short != "Kiha" && player.perks.has(PerkType.Evade) && randInt(100) < 10) {
//         if (findPerk(PerkLib.Acid) >= 0) DisplayText("tries to slap you, but you evade her attack.");
//         else DisplayText(", but you evade the clumsy attack.");
//         return;
//     }
//     // ("Misdirection"
//     if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
//         if (findPerk(PerkLib.Acid) >= 0) DisplayText("tries to slap you.  You misdirect her, avoiding the hit.");
//         else DisplayText(", missing as you misdirect her attentions.");
//         return;
//     }
//     // Determine if cat'ed
//     if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
//         if (findPerk(PerkLib.Acid) >= 0) DisplayText("tries to slap you, but misses due to your cat-like evasion.");
//         else DisplayText(", missing due to your cat-like evasion.");
//         return;
//     }
//     // Determine damage - str modified by enemy toughness!
//     if (findPerk(PerkLib.Acid) >= 0) damage = int((str + 10 + weaponAttack) - randInt(player.stats.tou) - player.armorDef);
//     else damage = int((str + weaponAttack) - randInt(player.stats.tou) - player.armorDef);
//     if (damage > 0) damage = player.takeDamage(damage);
//     if (damage <= 0) {
//         damage = 0;
//         if (findPerk(PerkLib.Acid) >= 0) {
//             if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("tries to slap you, but the acid-bearing slap spatters weakly off your " + player.inventory.equipment.armor.displayName + ".");
//             else DisplayText("tries to slap you with an acid-loaded hand, but it splatters off you ineffectually.");
//         }
//         else {
//             // Due to toughness or amor...
//             if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText(", her attack slapping fruitlessly against your " + player.inventory.equipment.armor.displayName + ".");
//             else DisplayText(", her attack splattering ineffectually against you.");
//         }
//     }
//     // everyone else
//     else {
//         if (findPerk(PerkLib.Acid) >= 0) {
//             DisplayText("delivers a painful slap across your cheek.  You gasp when the light stinging becomes a searing burn that seems to get worse as time goes on!");
//             if (!player.statusAffects.has(StatusAffectType.AcidSlap)) player.statusAffects.add(StatusAffectType.AcidSlap, 0, 0, 0, 0);
//         }
//         else DisplayText(", painfully smacking her gooey limbs against your head.  You shake your " + player.Desc.Head.describeHair(player) + ", clearing your head of the dazing slap.");
//         DisplayText(" (" + damage + ")");
//     }
//     if (damage > 0) {
//         if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
//             if (!plural) DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
//             else DisplayText("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
//             lust += 5 * lustVuln;
//         }
//     }
//     statScreenRefresh();
//     DisplayText("\n");
//     combatRoundOver();
// }

// // Play –
// private gooPlay() {
//     DisplayText("The goo-girl lunges, wrapping her slimy arms around your waist in a happy hug, hot muck quivering excitedly against you. She looks up, empty eyes confused by your lack of enthusiasm and forms her mouth into a petulant pout before letting go.  You shiver in the cold air, regretting the loss of her embrace.");
//     game.dynStats("lus", 3 + randInt(3) + player.stats.sens / 10);
//     combatRoundOver();
// }

// // Throw –
// private gooThrow() {
//     DisplayText("The girl reaches into her torso, pulls a large clump of goo out, and chucks it at you like a child throwing mud. The slime splatters on your chest and creeps under your " + player.inventory.equipment.armor.displayName + ", tickling your skin like fingers dancing across your body.");
//     const damage: number = 1;
//     player.takeDamage(damage);
//     game.dynStats("lus", 5 + randInt(3) + player.stats.sens / 10);
//     combatRoundOver();
// }

// // Engulf –
// private gooEngulph() {
//     DisplayText("The goo-girl gleefully throws her entire body at you and, before you can get out of the way, she has engulfed you in her oozing form! Tendrils of " + skin.tone + " slime slide up your nostrils and through your lips, filling your lungs with the girl's muck. You begin suffocating!");
//     if (!player.statusAffects.has(StatusAffectType.GooBind)) player.statusAffects.add(StatusAffectType.GooBind, 0, 0, 0, 0);
//     combatRoundOver();
// }

// public override; protected performCombatAction() {
//     // 1/3 chance of base attack + bonus if in acid mode
//     if ((findPerk(PerkLib.Acid) >= 0 && randInt(3) === 0) || randInt(3) === 0)
//         gooGalAttack();
//     else if (randInt(5) === 0) gooEngulph();
//     else if (randInt(3) === 0) gooPlay();
//     else gooThrow();
// }

// public defeated(hpVictory: boolean) {
//     game.lake.gooGirlScene.beatUpGoo();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
//     if (pcCameWorms) {
//         DisplayText("\n\nThe goo-girl seems confused but doesn't mind.");
//         return { next: game.endLustLoss };
//     } else {
//         game.lake.gooGirlScene.getBeatByGooGirl();
//     }
// }

// public teased(lustDelta: number) {
//     if (lust <= 99) {
//         if (lustDelta <= 0) DisplayText("\nThe goo-girl looks confused by your actions, as if she's trying to understand what you're doing.");
//         else if (lustDelta < 13) DisplayText("\nThe curious goo has begun stroking herself openly, trying to understand the meaning of your actions by imitating you.");
//         else DisplayText("\nThe girl begins to understand your intent. She opens and closes her mouth, as if panting, while she works slimy fingers between her thighs and across her jiggling nipples.");
//     }
//     else DisplayText("\nIt appears the goo-girl has gotten lost in her mimicry, squeezing her breasts and jilling her shiny " + skin.tone + " clit, her desire to investigate you forgotten.");
//     applyTease(lustDelta);
// }

export class GooGirl extends Character {
    public constructor() {
        super(CharacterType.GooGirl);
        const playerHasBigBoobs: boolean = User.char.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3;
        this.description = new CharacterDescription(this, "the ", "goo-girl", "The goo-girl has a curious expression on her youthful, shimmering face. Her body is slender and globs of slime regularly drip from her limbs, splattering into the goo puddle pooling beneath her hips. A small, heart-shaped nucleus pulses in her chest with a red glow." + (playerHasBigBoobs ? ("  She has apparently made herself a bit more like you, as her chest appears to be a perfect copy of your " + Desc.Breast.describeChest(User.char) + ".") : ""));
        // this.long = false;
        this.torso.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.NORMAL, false));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 9001, 0, 0, 0);
        this.torso.chest.add(new BreastRow(playerHasBigBoobs ? User.char.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating : 3));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 9001, 0, 0, 0);
        this.tallness = randInt(8) + 70;
        this.torso.hips.rating = HipRating.AMPLE;
        this.torso.butt.rating = ButtRating.LARGE;
        this.torso.hips.legs.type = LegType.GOO;
        const tone: string = randomChoice("blue", "purple", "crystal");
        this.skin.tone = tone;
        this.skin.type = SkinType.GOO;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.GOO];
        this.skin.adj = "goopey";
        this.torso.neck.head.hair.color = tone;
        this.torso.neck.head.hair.length = 12 + randInt(10);
        this.baseStats.str = 25;
        this.baseStats.tou = 25;
        this.baseStats.spe = 20;
        this.baseStats.int = 30;
        this.baseStats.lib = 50;
        this.baseStats.sens = 40;
        this.baseStats.cor = 10;
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("gelatinous skin" as ArmorName, undefined, "gelatinous skin", 0));
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("hands" as WeaponName, undefined, "hands", "slap", 0));
        this.baseStats.bonusHP = 40;
        this.baseStats.lust = 45;
        this.baseStats.lustVuln = .75;
        // this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.baseStats.level = 3;
        this.inventory.gems = randInt(5) + 1;
        // this.drop = new ChainedDrop().add(weapons.PIPE, 1 / 10)
        //     .add(consumables.WETCLTH, 1 / 2)
        //     .elseDrop(useables.GREENGL);
    }
}
