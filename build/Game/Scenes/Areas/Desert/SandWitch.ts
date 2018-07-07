import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { User } from "../../../User";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../../Body/Vagina";
import { BreastRow, BreastCup } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { HipRating } from "../../../Body/Hips";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { Armor } from "../../../Items/Armors/Armor";

// public defeated(hpVictory: boolean) {
// 	if (player.findStatusAffect(StatusAffects.StoneLust)) {
// 		player.statusAffects.remove("StoneLust");
// 	}

// 	if (player.stats.lust >= 33) {
// 		game.desert.sandWitchScene.beatSandwitch();
// 	} else {
// 		game.finishCombat();
// 	}
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	if (pcCameWorms) {
// 		DisplayText("\n\nThe witch blanches and backs away, leaving you to your fate.");
// 		game.return { next: Scenes.camp.returnToCampUseOneHour };
// 	} else {
// 		game.desert.sandWitchScene.sandwitchRape();
// 	}
// }

// private lustMagicAttack() {
// 	DisplayText("The sand witch points at you, drawing a circle in the air and mouthing strange words.\n\n");
// 	if (player.statusAffects.has(StatusAffectType.StoneLust)) {
// 		DisplayText("The orb inside you grows warm, almost hot, suffusing your body with heat and arousal.  ");
// 		game.dynStats("lus", 8 + int(player.stats.sens) / 10);
// 	}
// 	else {
// 		DisplayText("You feel the sands shift by your " + Desc.Leg.describeFeet(player) + ", and look down to see something slip out of the sands and into your clothes!  It feels incredibly smooth and circular as it glides upward along your " + Desc.Leg.describeLeg(player) + ", its progress unaffected by your frantic effort to dislodge it.  ");
// 		if (player.torso.vaginas.count > 0) DisplayText("It glides up your thighs to the entrance of your sex, and its intentions dawn on you!\n\nToo late! You reach to stop it, but it pushes against your lips and slips inside your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " in an instant.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
// 		else DisplayText("It glides up your thighs, curving around your buttocks, and its intentions dawn on you.\n\nYou desperately grab for it, but are too late!  It pushes firmly against your rectum and slips inside instantaneously.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
// 		player.statusAffects.add(StatusAffectType.StoneLust, 0, 0, 0, 0);
// 		game.dynStats("lus", 4 + int(player.stats.sens) / 10);
// 	}
// 	return { next: game.playerMenu };
// }

export class SandWitch extends Character {
    public constructor() {
        super(CharacterType.SandWitch);
        this.description = new CharacterDescription(this, "the ", User.settings.silly() ? "sand witch" : "sand witch", "A sand witch appears to be totally human, an oddity in this strange land.  She has dirty blonde hair and a very tanned complexion, choosing to cover most of her body with robes of the same color as the desert sands, making her impossible to spot from afar.");
        this.torso.vaginas.add(new Vagina(VaginaWetness.WET, VaginaLooseness.LOOSE, false));
        this.torso.chest.add(new BreastRow(BreastCup.DD));
        this.torso.chest.add(new BreastRow(BreastCup.DD));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.tallness = randInt(12) + 55;
        this.torso.hips.rating = HipRating.CURVY;
        this.torso.butt.rating = ButtRating.LARGE;
        this.skin.tone = "bronzed";
        this.torso.neck.head.hair.color = "sandy-blonde";
        this.torso.neck.head.hair.length = 15;
        this.baseStats.str = 25;
        this.baseStats.tou = 25;
        this.baseStats.spe = 35;
        this.baseStats.int = 45;
        this.baseStats.lib = 55;
        this.baseStats.sens = 40;
        this.baseStats.cor = 30;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("kick" as WeaponName, undefined, "kick", "kick", 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("robes" as ArmorName, undefined, "robes", 0));
        this.baseStats.bonusHP = 20;
        this.baseStats.lust = 30;
        // this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
        this.baseStats.level = 3;
        this.inventory.gems = randInt(15) + 5;
        // this.drop = new WeightedDrop().addMany(1,
        //     consumables.TSCROLL,
        //     consumables.OVIELIX,
        //     consumables.LACTAID,
        //     consumables.LABOVA_,
        //     consumables.W__BOOK,
        //     consumables.B__BOOK,
        //     null);
        // this.special1 = lustMagicAttack;
        // this.special2 = special2;
        // this.special3 = special3;
    }
}
