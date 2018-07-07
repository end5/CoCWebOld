import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Weapon } from "../../../Items/Weapons/Weapon";

// override protected performCombatAction() {
// 	//Worms have different AI
// 	if (randInt(2) === 0)
// 		special1();
// 	else special2();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	DisplayText("Overcome by your " + (hpVictory ? "wounds" : "lust") + ", you sink to your knees as the colony of worms swarms all over your body...\n\n", true);
// 	game.infest1();
// }

// public eMaxHP(): number {
// 	return 40;
// }

export class WormMass extends Character {
    public constructor() {
        super(CharacterType.WormMass);
        this.description = new CharacterDescription(this, "the ", "worms", "Before you stands the horrid mass of worms. It has shifted itself and now takes the shape of a humanoid composed completely of the worms in the colony. Its vaguely human shape lumbers towards you in a clearly aggressive manner.", true);
        this.torso.chest.add(new BreastRow(0, 0));
        this.torso.butt.looseness = ButtLooseness.VIRGIN;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.tallness = 1;
        this.torso.hips.rating = HipRating.SLENDER;
        this.torso.butt.rating = ButtRating.BUTTLESS;
        this.skin.tone = "white";
        this.baseStats.str = 35;
        this.baseStats.tou = 5;
        this.baseStats.spe = 10;
        this.baseStats.int = 1;
        this.baseStats.lib = 90;
        this.baseStats.sens = 60;
        this.baseStats.cor = 90;
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("skin" as ArmorName, undefined, "skin", 0));
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("worm" as WeaponName, undefined, "worm", "slap", 5));
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = 0;
        // this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.baseStats.level = 3;
        this.inventory.gems = 0;
        // this.special1 = game.wormAttack;
        // this.special2 = game.wormsEntice;
        // this.drop = NO_DROP;
    }
}
