import { Character } from "../../../Character/Character";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { CombatContainer } from "../../../Combat/CombatContainer";
import { CharacterInventory } from "../../../Inventory/CharacterInventory";
import { CharacterType } from "../../../Character/CharacterType";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { HipRating } from "../../../Body/Hips";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { ItemDesc } from "../../../Items/ItemDesc";
import { TiberiusReactions } from "./Reactions";
import { TiberiusAction } from "./Actions";
import { TiberiusEndScenes } from "./EndScenes";
import { Cock, CockType } from "../../../Body/Cock";
import { SkinType } from "../../../Body/Skin";

export class Tiberius extends Character {
    public inventory: CharacterInventory;
    protected combatContainer: CombatContainer;
    protected description: CharacterDescription;

    public constructor() {
        super(CharacterType.Tiberius);
        this.description = new CharacterDescription(this, "", "Tiberius", "Tiberius looks like a wolf-man.");
        this.body.cocks.add(new Cock(10, 2, CockType.DOG, 1.5));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.tallness = 35 + randInt(4);
        this.body.hips.rating = HipRating.BOYISH;
        this.body.skin.tone = "solid";
        this.body.skin.type = SkinType.FUR;
        this.body.hair.color = "grey";
        this.body.hair.length = 2;
        this.stats.base.str.value = 40;
        this.stats.base.tou.value = 40;
        this.stats.base.spe.value = 35;
        this.stats.base.int.value = 25;
        this.stats.base.lib.value = 20;
        this.stats.base.sens.value = 45;
        this.stats.base.cor.value = 0;
        this.stats.base.lust.value = 0;
        this.stats.base.level.value = 1;

        this.inventory = new CharacterInventory(this,
            new Weapon("claws" as WeaponName, new ItemDesc("claws"), "claws", "claw-slash", 1),
            new Armor("gear" as ArmorName, new ItemDesc("gear"), "gear", 1)
        );
        this.inventory.equippedWeaponSlot.equip(new Weapon("broadsword" as WeaponName, new ItemDesc("broadsword"), "broadsword", "slash", 5, 50));
        this.inventory.equippedArmorSlot.equip(new Armor("leather" as ArmorName, new ItemDesc("leather"), "leather", 10, 150));
        this.inventory.gems = 0;

        this.combatContainer = new CombatContainer(this,
            new TiberiusAction(),
            TiberiusReactions,
            new TiberiusEndScenes(this),
            {});
    }
}
