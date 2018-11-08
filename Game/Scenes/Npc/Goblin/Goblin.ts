import { Character } from "../../../Character/Character";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { CombatContainer } from "../../../Combat/CombatContainer";
import { CharacterInventory } from "../../../Inventory/CharacterInventory";
import { CharacterType } from "../../../Character/CharacterType";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../../Body/Vagina";
import { BreastCup } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { HipRating } from "../../../Body/Hips";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { WeightedDrop } from "../../../Utilities/Drops/WeightedDrop";
import { ConsumableName } from "../../../Items/Consumables/ConsumableName";
import { ItemDesc } from "../../../Items/ItemDesc";
import { GoblinReactions } from "./Reactions";
import { GoblinAction } from "./Actions";
import { GoblinEndScenes } from "./EndScenes";

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
            GoblinReactions,
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
