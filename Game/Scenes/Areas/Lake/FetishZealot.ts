﻿import { Character } from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import { CharacterDescription } from '../../../Character/CharacterDescription';
import { Cock } from '../../../Body/Cock';
import { BreastRow } from '../../../Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from '../../../Body/Butt';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { HipRating } from '../../../Body/Hips';
import { randInt } from '../../../../Engine/Utilities/SMath';
import { Armor } from '../../../Items/Armors/Armor';
import { ArmorName } from '../../../Items/Armors/ArmorName';
import { WeaponName } from '../../../Items/Weapons/WeaponName';
import { Weapon } from '../../../Items/Weapons/Weapon';

const RELIGIOUS_CLOTHES: string = "religious clothes";
// private static const PIRATE_CLOTHES: string = "pirate clothes";
// private static const MILITARY_CLOTHES: string = "military clothes";
// private static const LEATHER_CLOTHES: string = "leather clothes";
// private static const STUDENTS_CLOTHES: string = "student's clothes";

// public combatRoundUpdate() {
//     super.combatRoundUpdate();
//     let changed: boolean = false;
//     //Fetish Zealot Update!
//     switch (randInt(5)) {
//         case 0:
//             //Religious outfit!
//             if (armorName != RELIGIOUS_CLOTHES) {
//                 long = "The zealot is clad in a bizarre set of religious robes.  They are similar to what you've seen on other religious leaders from home, but none of them included the large slit at the front that lets his above average sized human dick stick out of the front.";
//                 this.armorName = RELIGIOUS_CLOTHES;
//                 changed = true;
//             }
//             break;
//         case 1:
//             //Pirate Outfit
//             if (armorName != PIRATE_CLOTHES) {
//                 this.armorName = PIRATE_CLOTHES;
//                 long = "You are faced with one of the strangest things you have ever seen in your life.  A stereotypical pirate, who has not replaced his hand with a hook, but rather a collection of sex toys.  You can see at least two dildos, a fleshlight, and numerous other toys that you're incapable of recognizing.";
//                 changed = true;
//             }
//             break;
//         case 2:
//             //Military Uniform
//             if (armorName != MILITARY_CLOTHES) {
//                 long = "In front of you is someone wearing a green military uniform.  They obviously aren't in any military you've ever heard of, as on his shoulder he has emblazoned <i>FF Army Sex Instructor</i>.  It seems you are his latest recruit...";
//                 this.armorName = MILITARY_CLOTHES;
//                 changed = true;
//             }
//             break;
//         case 3:
//             //Leather fetish shiiiiite
//             if (armorName != LEATHER_CLOTHES) {
//                 long = "The Zealot has taken on an appearance that seems more suitable for the level of perversion he exudes.  He is wearing a full-body suit of leather, with a cock case over his crotch; you can clearly see a large zipper on it.  The zipper handle is far bigger than you think is absolutely necessary.";
//                 this.armorName = LEATHER_CLOTHES;
//                 changed = true;
//             }
//             break;
//         case 4:
//             //Student
//             if (armorName != STUDENTS_CLOTHES) {
//                 long = "The Zealot seems to have taken on the appearance of a young adult wearing a student uniform of sorts; of course, this isn't any less perverted than any of the other costumes this man wears.  This one includes a number of loose straps that you're certain would cause large sections of his clothes to fall off if somebody pulled on them.";
//                 this.armorName = STUDENTS_CLOTHES;
//                 changed = true;
//             }

//             break;
//     }
//     //Talk abouts it mang!
//     if (changed) DisplayText("The fetish zealot's clothing shifts and twists, until he is wearing " + armorName + ".\n\n");
//     lust += lustVuln * 5;
// }

// //Special1: Tease
// //See Costumes section for text
// private zealotSpecial1() {
//     //Costumes
//     //This foe periodically switches between outfits; this determines what text is displayed when they use tease.

//     //Perverted religious costume;
//     if (armorName === RELIGIOUS_CLOTHES) {
//         //The zealot is clad in a bizarre set of religious robes.  They are similar to what you've seen on other religious leaders from home, but none that included the large slit at the front that lets his above average sized human dick stick out the front.
//         DisplayText("The zealot cries out \"<i>Child, are you ready to present your offering to the holy rod?</i>\" while indicating his cock sliding between his robes.  The whole scene leaves you distracted for a few moments and significantly aroused.");
//     }
//     //A pirate costume;
//     if (armorName === PIRATE_CLOTHES) {
//         //You are faced with one of the strangest things you have ever seen in your life.  A stereotypical pirate, who has not replaced his hand with a hook, but rather a collection of sex toys.  You can see at least two dildos, a fleshlight, and numerous other toys that you're incapable of recognizing.
//         DisplayText("The zealot turns to the side holding his prosthetic towards you and doing something that sends the devices spinning and clicking.  <i>So that's how that would work...<i> you find yourself thinking for a few moments before realizing that he had both distracted and aroused you.");
//     }
//     //Military attire;
//     if (armorName === MILITARY_CLOTHES) {
//         //In front of you is someone wearing a green military uniform.  They obviously aren't in any military you've ever heard of, as on his shoulder he has emblazoned <i>FF Army Sex Instructor</i>.  It seems you are his latest Recruit...
//         DisplayText("He suddenly barks, \"<i>Let's see those genitals, soldier!</i>\" ");
//         //[player is corrupt]
//         if (player.stats.cor > 50) DisplayText("You eagerly cry out \"<i>Yes, sir!</i>\" and show yourself off to the best of your ability.  The whole act is extremely arousing.");
//         //[player is not corrupt]
//         else DisplayText("You have no idea why, but you promptly display yourself in the most provocative way possible.  After a moment you realize what you're doing and quickly stop, flushed with embarrassment and arousal.");
//     }
//     //Gimp gear;
//     if (armorName === LEATHER_CLOTHES) {
//         //The Zealot has taken on an appearance that seems more suitable for the level of perversion he exudes.  He is wearing a full-body suit of leather, with a cock case over his crotch; you can clearly see a large zipper on it.  The zipper handle is far bigger than you think is absolutely necessary.
//         DisplayText("The Zealot turns around and gives you a full view of his tight leather clad body.  He smacks his ass and says \"<i>You like what you see, don't you " + Desc.Gender.mf(player, "stud", "slut") + "?</i>\"  You can't help but be incredibly aroused by the scene.");
//     }
//     //Well dressed and well groomed student in uniform;
//     if (armorName === STUDENTS_CLOTHES) {
//         //The Zealot seems to have taken on the appearance of a young adult wearing a student uniform of sorts; of course, this isn't any less perverted than any of the other costumes this man wears.  This one includes a number of loose straps that you're certain would cause large sections of his clothes to fall off if somebody pulled on them.
//         DisplayText("The Zealot student looks at you a little shyly and sticks a pencil in his mouth while pushing a hand in front of his groin, trying to hide a rather obvious bulge.  The whole scene is rather cute, and you feel incredibly aroused afterwards.");
//     }
//     game.dynStats("lus", (7 + randInt(player.stats.lib / 20 + player.stats.cor / 20)));
//     combatRoundOver();
// }
// //Special2: Lust transfer spell, it becomes more and
// //more likely that he will use this power as his lust gets
// //higher, but he can use it at any time (like the cultist).
// private zealotSpecial2() {
//     DisplayText("The zealot suddenly cries out and extends his arms towards you; your mind is suddenly overwhelmed with a massive wave of arousal as images of every kind of fetish you can imagine wash over you, all blended together.  After a moment you are able to recover, but you notice that the Zealot doesn't seem to be as aroused as before.");
//     game.dynStats("lus", lust / 2);
//     lust /= 2;
//     combatRoundOver();
// }

// override protected postAttack(damage: number) {
//     if (damage > 0) {
//         DisplayText("\nYou notice that some kind of unnatural heat is flowing into your body from the wound");
//         if (player.stats.int > 50) DisplayText(", was there some kind of aphrodisiac on the knife?");
//         else DisplayText(".");
//         game.dynStats("lus", (player.stats.lib / 20 + 5));
//     }
//     super.postAttack(damage);
// }

// public defeated(hpVictory: boolean) {
//     game.lake.fetishZealotScene.zealotDefeated();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
//     if (pcCameWorms) {
//         DisplayText("\n\nThe fetish cultist ignores the perverse display and continues on as if nothing had happened...");
//         player.orgasm();
//         return { next: game.lake.fetishZealotScene.zealotLossRape };
//     } else {
//         game.lake.fetishZealotScene.zealotLossRape();
//     }
// }

export class FetishZealot extends Character {
    public constructor() {
        super(CharacterType.FetishZealot);
        this.description = new CharacterDescription(this, "the ", "fetish zealot", "The zealot is clad in a bizarre set of religious robes.  They are similar to what you've seen on other religious leaders from home, but none that included the large slit at the front that lets his above average sized human dick stick out the front.");
        this.torso.cocks.add(new Cock(7, 1.5));
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.LOOSE;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 40, 0, 0, 0);
        this.tallness = 6 * 12;
        this.torso.hips.rating = HipRating.BOYISH + 1;
        this.torso.butt.rating = ButtRating.TIGHT;
        this.skin.tone = "tan";
        this.torso.neck.head.hair.color = "black";
        this.torso.neck.head.hair.length = 4;
        this.baseStats.str = 35;
        this.baseStats.tou = 35;
        this.baseStats.spe = 30;
        this.baseStats.int = 1;
        this.baseStats.lib = 75;
        this.baseStats.sens = 80;
        this.baseStats.cor = 90;
        this.inventory.equipment.defaultArmorSlot.equip(new Armor(RELIGIOUS_CLOTHES as ArmorName, undefined, RELIGIOUS_CLOTHES, 5));
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("wavy dagger" as WeaponName, undefined, "wavy dagger", "stab", 3));
        this.baseStats.lust = 25;
        this.baseStats.lustVuln = 0.75;
        // this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.baseStats.level = 5;
        this.inventory.gems = 5 + randInt(10);
        // this.drop = new WeightedDrop().add(armors.C_CLOTH, 1)
        //     .add(consumables.L_DRAFT, 4)
        //     .add(weapons.L_DAGGR, 1)
        //     .add(null, 4);
        // this.special1 = zealotSpecial1;
        // this.special2 = zealotSpecial2;
    }
}