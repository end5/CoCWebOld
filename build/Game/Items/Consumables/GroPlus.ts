import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Cock } from '../../Body/Cock';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { Menus } from '../../Menus/Menus';
import { Mod } from '../../Modifiers/Modifiers';
import { ClickFunction, NextScreenChoices } from '../../ScreenDisplay';
import { ItemDesc } from '../ItemDesc';
import { ItemType } from '../ItemType';

export class GroPlus extends Consumable {
    public constructor() {
        super(ConsumableName.GroPlus, new ItemDesc("GroPlus", "a needle filled with Gro+", "This is a small needle with a reservoir full of blue liquid.  A faded label marks it as 'GroPlus'.  Its purpose seems obvious."), 50);
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character): NextScreenChoices {
        const gpBalls: ClickFunction = (character.torso.balls.quantity > 0 ? this.growPlusBalls : undefined);
        const gpBreasts: ClickFunction = (character.torso.chest.count > 0 ? this.growPlusBreasts : undefined);
        const gpClit: ClickFunction = (character.torso.vaginas.count > 0 ? this.growPlusClit : undefined);
        const gpCock: ClickFunction = (character.torso.cocks.count > 0 ? this.growPlusCock : undefined);
        const gpNipples: ClickFunction = (character.torso.chest.countNipples() > 0 ? this.growPlusNipples : undefined);
        DisplayText().clear();
        DisplayText("You ponder the needle in your hand knowing it will enlarge the injection site.  What part of your body will you use it on?  ");
        return {
            choices: [["Balls", gpBalls], ["Breasts", gpBreasts], ["Clit", gpClit], ["Cock", gpCock], ["Nipples", gpNipples]],
            persistantChoices: [["Nevermind", this.growPlusCancel]]
        };
    }

    private growPlusBalls(character: Character): NextScreenChoices {
        DisplayText().clear();
        // character.slimeFeed();
        DisplayText("You sink the needle deep into your " + Desc.Balls.describeSack(character) + ".  It hurts like hell, but you push down the plunger and the pain vanishes as the needles contents flow into you.\n\n");
        // 1 in 4 BIG growth.
        if (randInt(4) === 0) {
            DisplayText("You feel a trembling in your " + Desc.Balls.describeBallsShort(character) + " as the chemicals start to go to work.  You can tell they're going to be VERY effective.\n");
            character.torso.balls.size += randInt(4) + 2;
            DisplayText("They shift, stretching your " + Desc.Balls.describeSack(character) + " tight as they gain inches of size.  You step to steady yourself as your center of balance shifts due to your newly enlarged " + Desc.Balls.describeBallsShort(character) + ".  ");
        }
        else {
            character.torso.balls.size += randInt(2) + 1;
            DisplayText("You feel your testicles shift, pulling the skin of your " + Desc.Balls.describeSack(character) + " a little bit as they grow to " + Desc.Balls.describeBallsShort(character) + ".  ");
        }
        if (character.torso.balls.size > 10) DisplayText("Walking gets even tougher with the swollen masses between your legs.  Maybe this was a bad idea.");
        character.stats.lust += 10;
        return { next: Menus.Inventory };
    }

    private growPlusBreasts(character: Character): NextScreenChoices {
        DisplayText().clear();
        // character.slimeFeed();
        DisplayText("You sink the needle into the flesh of your " + Desc.Breast.describeAllBreasts(character) + " injecting each with a portion of the needle.\n\n");
        if (character.torso.chest.count === 1)
            Mod.Breast.growSmallestBreastRow(character, randInt(5) + 1, 1, true);
        else
            Mod.Breast.growSmallestBreastRow(character, randInt(2) + 1, character.torso.chest.count, true);
        character.stats.lust += 10;
        return { next: Menus.Inventory };
    }

    private growPlusClit(character: Character): NextScreenChoices {
        DisplayText().clear();
        // character.slimeFeed();
        DisplayText("You sink the needle into your clit, nearly crying with how much it hurts.  You push down the plunger and the pain vanishes as your clit starts to grow.\n\n");
        character.torso.clit.length++;
        DisplayText("Your " + Desc.Vagina.describeClit(character) + " stops growing after an inch of new flesh surges free of your netherlips.  It twitches, feeling incredibly sensitive.");

        character.stats.sens += 2;
        character.stats.lust += 10;
        return { next: Menus.Inventory };
    }

    private growPlusCock(character: Character): NextScreenChoices {
        DisplayText().clear();
        // character.slimeFeed();
        DisplayText("You sink the needle into the base of your " + Desc.Cock.describeMultiCockShort(character) + ".  It hurts like hell, but as you depress the plunger, the pain vanishes, replaced by a tingling pleasure as the chemicals take effect.\n\n");
        if (character.torso.cocks.count === 1) {
            DisplayText("Your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " twitches and thickens, pouring more than an inch of thick new length from your ");
            Mod.Cock.growCock(character, character.torso.cocks.get(0), 4);
            character.torso.cocks.get(0).length += 1; // This was forcing "what was said" to match "what actually happened" no matter what increase/growCock /actually/ did.
            character.torso.cocks.get(0).thickness += 0.5; // And growCock never actually touched thickness. Nor does the new version. Thickness mod was stripped out entirely.
        }
        // MULTI
        else {
            DisplayText("Your " + Desc.Cock.describeMultiCockShort(character) + " twitch and thicken, each member pouring out more than an inch of new length from your ");
            for (let index: number = 0; index < character.torso.cocks.count; index++) {
                Mod.Cock.growCock(character, character.torso.cocks.get(index), 2);
                character.torso.cocks.get(index).length += 1;
                character.torso.cocks.get(index).thickness += 0.5;
            }
        }
        if (character.torso.cocks.filter(Cock.HasSheath).length > 0)
            DisplayText("sheath.");
        else DisplayText("crotch.");
        character.stats.sens += 2;
        character.stats.lust += 10;
        return { next: Menus.Inventory };
    }

    private growPlusNipples(character: Character): NextScreenChoices {
        DisplayText().clear();
        // character.slimeFeed();
        DisplayText("You sink the needle into each of your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s in turn, dividing the fluid evenly between them.  Though each injection hurts, the pain is quickly washed away by the potent chemical cocktail.\n\n");
        // Grow nipples
        DisplayText("Your nipples engorge, prodding hard against the inside of your " + character.inventory.equipment.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.\n\n");
        character.torso.chest.get(randInt(character.torso.chest.count - 1)).nipples.length += (randInt(2) + 3) / 10;
        character.stats.lust += 15;
        // NIPPLECUNTZZZ
        if (character.torso.chest.filter(BreastRow.NonFuckableNipples).length > 0 && randInt(4) === 0) {
            let nowFuckable: boolean = false;
            for (const breastRow of character.torso.chest) {
                if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                    breastRow.nipples.fuckable = true;
                    nowFuckable = true;
                }
            }
            // Talk about if anything was changed.
            if (nowFuckable) DisplayText("Your " + Desc.Breast.describeAllBreasts(character) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>\n\n");
        }
        return { next: Menus.Inventory };
    }

    private growPlusCancel(character: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You put the vial away.\n\n");
        return character.inventory.items.createAdd(character, ItemType.Consumable, ConsumableName.GroPlus, Menus.Inventory);
        // InventoryDisplay.reverseAction();
        // return { next: Menus.Inventory };
    }
}
