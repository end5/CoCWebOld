import { DisplayText } from "../../../../Engine/display/DisplayText";
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

//     public chameleonTongueAttack() {
//     this.weaponName = "tongue";
//     this.weaponVerb = "tongue-slap";
//     this.weaponAttack = 10;
//     statusAffects.set(new StatusAffect("Attacks", 1, 0, 0, 0));
//     eAttack();
//     this.weaponAttack = 30;
//     this.weaponName = "claws";
//     this.weaponVerb = "claw";
//     combatRoundOver();
// }

//     //Ignores armor
//     public chameleonClaws() {
//     //Blind dodge change
//     if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
//         DisplayText(capitalA + short + " completely misses you with a blind claw-attack!\n");
//     }
//     //Evade:
//     else if (game.combatMiss() || game.combatEvade() || game.combatFlexibility() || game.combatMisdirect()) DisplayText("The chameleon girl's claws slash towards you, but you lean away from them and they fly by in a harmless blur.");
//     //Get hit
//     else {
//         let damage: number = int((str + weaponAttack) - randInt(player.stats.tou));
//         if (damage > 0) {
//             damage = player.takeDamage(damage);
//             DisplayText("The chameleon swings her arm at you, catching you with her claws.  You wince as they scratch your skin, leaving thin cuts in their wake. (" + damage + ")");
//         }
//         else DisplayText("The chameleon swings her arm at you, catching you with her claws.  You defend against the razor sharp attack.");
//     }
//     combatRoundOver();
// }

//     //Attack 3:
//     public rollKickClawWhatTheFuckComboIsThisShit() {
//     //Blind dodge change
//     if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
//         DisplayText(capitalA + short + " completely misses you with a blind roll-kick!\n");
//     }
//     //Evade:
//     else if (game.combatMiss() || game.combatEvade() || game.combatFlexibility() || game.combatMisdirect()) {
//         let damage2: number = 1 + randInt(10);
//         damage2 = game.doDamage(damage2);
//         DisplayText("The chameleon girl leaps in your direction, rolls, and kicks at you.  You sidestep her flying charge and give her a push from below to ensure she lands face-first in the bog. (" + damage2 + ")");

//     }
//     //Get hit
//     else {
//         let damage: number = int((str + weaponAttack) - randInt(player.stats.tou) - player.armorDef) + 25;
//         if (damage > 0) {
//             damage = player.takeDamage(damage);
//             DisplayText("The chameleon leaps in your direction, rolls, and kicks you square in the shoulder as she ascends, sending you reeling.  You grunt in pain as a set of sharp claws rake across your chest. (" + damage + ")");
//         }
//         else DisplayText("The chameleon rolls in your direction and kicks up at your chest, but you knock her aside without taking any damage..");
//     }
//     combatRoundOver();
// }

// override protected performCombatAction() {
//     game.DisplaySprite(89);
//     let select: number = randInt(3);
//     if (select === 0) rollKickClawWhatTheFuckComboIsThisShit();
//     else if (select === 1) chameleonTongueAttack();
//     else chameleonClaws();
// }

//     public defeated(hpVictory: boolean) {
//     game.bog.chameleonGirlScene.defeatChameleonGirl();
// }

//     public won(hpVictory: boolean, pcCameWorms: boolean) {
//     if (pcCameWorms) {
//         DisplayText("\n\nThe chameleon girl recoils.  \"<i>Ew, gross!</i>\" she screetches as she runs away, leaving you to recover from your defeat alone.");
//         game.return { next: Scenes.camp.returnToCampUseOneHour };
//     } else {
//         game.bog.chameleonGirlScene.loseToChameleonGirl();
//     }
// }

// override protected outputPlayerDodged(dodge: number) {
//     DisplayText("The chameleon girl whips her head and sends her tongue flying at you, but you hop to the side and manage to avoid it.  The pink blur flies back into her mouth as quickly as it came at you, and she looks more than a bit angry that she didn't find her target.\n");
// }

//     public outputAttack(damage: number) {
//     if (damage <= 0) {
//         DisplayText("The Chameleon Girl lashes out with her tongue, but you deflect the sticky projectile off your arm, successfully defending against it.  She doesn't look happy about it when she slurps the muscle back into her mouth.");
//     } else {
//         DisplayText("The chameleon whips her head forward and sends her tongue flying at you.  It catches you in the gut, the incredible force behind it staggering you.  The pink blur flies back into her mouth as quickly as it came at you, and she laughs mockingly as you recover your footing. (" + damage + ")");
//     }
// }

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
        this.description = new CharacterDescription(this, "chameleon girl", "You're faced with a tall lizard-like girl with smooth " + skin[0] + " skin and long, " + skin[1] + " stripes that run along her body from ankle to shoulder.  An abnormally large tail swishes behind her, and her hands are massive for her frame, built for easily climbing the trees.  A pair of small, cute horns grow from her temples, and a pair of perky B-cups push out through her skimpy drapings.  Large, sharp claws cap her fingers, gesturing menacingly at you.", false, "the ");
        this.torso.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.LOOSE, false));
        this.torso.chest.add(new BreastRow(BreastCup.B));
        this.torso.butt.looseness = ButtLooseness.NORMAL;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.tallness = randInt(2) + 68;
        this.torso.hips.rating = HipRating.AMPLE + 2;
        this.torso.butt.rating = ButtRating.LARGE;
        this.skin.tone = skin[0];
        this.skin.type = SkinType.PLAIN;
        this.skin.desc = "skin";
        this.skin.adj = skin[1];
        this.torso.neck.head.hair.color = "black";
        this.torso.neck.head.hair.length = 15;
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
    }
}
