import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Cock, CockType } from '../../Body/Cock';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { Menus } from '../../Menus/Menus';
import { Mod } from '../../Modifiers/Modifiers';
import { ClickFunction, NextScreenChoices } from '../../ScreenDisplay';
import { ItemDesc } from '../ItemDesc';
import { ItemType } from '../ItemType';

export class Reducto extends Consumable {
    public constructor() {
        super(ConsumableName.Reducto, new ItemDesc("Reducto", "a salve marked as 'Reducto'", "This container full of paste can be used to shrink a body part down by a significant amount."), 30);
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character): NextScreenChoices {
        const rdtBalls: ClickFunction = (character.torso.balls.quantity > 0 && character.torso.balls.size > 1 ? this.reductoBalls : undefined);
        const rdtBreasts: ClickFunction = (character.torso.chest.count > 0 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0 ? this.reductoBreasts : undefined);
        const rdtButt: ClickFunction = (character.torso.butt.rating > 1 ? this.reductoButt : undefined);
        const rdtClit: ClickFunction = (character.torso.vaginas.count > 0 && character.torso.clit.length > 0.25 ? this.reductoClit : undefined);
        const rdtCock: ClickFunction = (character.torso.cocks.count > 0 && character.torso.cocks.sort(Cock.LargestCockArea)[0].area > 6 ? this.reductoCock : undefined);
        const rdtHips: ClickFunction = (character.torso.hips.rating > 2 ? this.reductoHips : undefined);
        const rdtNipples: ClickFunction = (character.torso.chest.count > 0 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length > 0.25 ? this.reductoNipples : undefined);
        DisplayText().clear();
        DisplayText("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
        return {
            choices: [["Balls", rdtBalls], ["Breasts", rdtBreasts], ["Butt", rdtButt], ["Clit", rdtClit], ["Cock", rdtCock], ["Hips", rdtHips], ["Nipples", rdtNipples]], persistantChoices: [["Nevermind", this.reductoCancel]]
        };
    }

    private reductoBalls(character: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling paste onto your " + Desc.Balls.describeSack(character) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        character.torso.balls.size -= randInt(4) + 2;
        if (character.torso.balls.size < 1)
            character.torso.balls.size = 1;
        DisplayText("You feel your scrotum shift, shrinking down along with your " + Desc.Balls.describeBallsShort(character) + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
        character.stats.lib -= 2;
        character.stats.lust -= 10;
        return { next: Menus.Inventory };
    }

    private reductoBreasts(character: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling ointment all over your " + Desc.Breast.describeAllBreasts(character) + ", covering them entirely as the paste begins to get absorbed into your " + character.skin.desc + ".\n");
        Mod.Breast.shrinkTits(character, true);
        if (randInt(2) === 0 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) {
            DisplayText("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
            Mod.Breast.shrinkTits(character, true);
        }
        DisplayText("\nThe last of it wicks away into your skin, completing the changes.");
        character.stats.sens -= 2;
        character.stats.lust -= 5;
        return { next: Menus.Inventory };
    }

    private reductoButt(character: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling paste onto your " + Desc.Butt.describeButt(character) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (character.torso.butt.rating >= 15) {
            character.torso.butt.rating -= (3 + Math.floor(character.torso.butt.rating / 3));
            DisplayText("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
        }
        else if (character.torso.butt.rating >= 10) {
            character.torso.butt.rating -= 3;
            DisplayText("You feel much lighter as your " + Desc.Butt.describeButt(character) + " jiggles slightly, adjusting to its smaller size.");
        }
        else {
            character.torso.butt.rating -= randInt(3) + 1;
            if (character.torso.butt.rating < 1) character.torso.butt.rating = 1;
            DisplayText("After a few seconds your " + Desc.Butt.describeButt(character) + " has shrunk to a much smaller size!");
        }
        character.stats.lib -= 2;
        character.stats.lust -= 10;
        return { next: Menus.Inventory };
    }

    private reductoClit(character: Character): NextScreenChoices {
        DisplayText().clear();
        const vagina = character.torso.vaginas.get(0);
        DisplayText("You carefully apply the paste to your " + Desc.Vagina.describeClit(character) + ", being very careful to avoid getting it on your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  It burns with heat as it begins to make its effects known...\n\n");
        character.torso.clit.length /= 1.7;
        // Set clitlength down to 2 digits in length
        character.torso.clit.length = Math.floor(character.torso.clit.length * 100) / 100;
        DisplayText("Your " + Desc.Vagina.describeClit(character) + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
        character.stats.sens += 2;
        character.stats.lust += 10;
        return { next: Menus.Inventory };
    }

    private reductoCock(character: Character): NextScreenChoices {
        DisplayText().clear();
        const firstCock = character.torso.cocks.get(0);
        if (firstCock.type === CockType.BEE) {
            DisplayText("The gel produces an odd effect when you rub it into your " + Desc.Cock.describeCock(character, firstCock) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + Desc.Cock.describeCock(character, firstCock) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
            firstCock.type = CockType.HUMAN;
        }
        else {
            DisplayText("You smear the repulsive smelling paste over your " + Desc.Cock.describeMultiCockShort(character) + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + Desc.Cock.describeMultiCockShort(character) + " begins to shrink.\n\n");
            if (character.torso.cocks.count === 1) {
                DisplayText("Your " + Desc.Cock.describeCock(character, firstCock) + " twitches as it shrinks, disappearing steadily into your " + (firstCock.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                firstCock.length *= 2 / 3;
                firstCock.thickness *= 2 / 3;
            }
            else { // MULTI
                DisplayText("Your " + Desc.Cock.describeMultiCockShort(character) + " twitch and shrink, each member steadily disappearing into your " + (character.torso.cocks.filter(Cock.HasSheath).length > 0 ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                for (let index: number = 0; index < character.torso.cocks.count; index++) {
                    character.torso.cocks.get(index).length *= 2 / 3;
                    character.torso.cocks.get(index).thickness *= 2 / 3;
                }
            }
        }
        character.stats.sens -= 2;
        character.stats.lust -= 10;
        return { next: Menus.Inventory };
    }

    private reductoHips(character: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (character.torso.hips.rating >= 15) {
            character.torso.hips.rating -= (3 + Math.floor(character.torso.hips.rating / 3));
            DisplayText("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
        }
        else if (character.torso.hips.rating >= 10) {
            character.torso.hips.rating -= 3;
            DisplayText("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
        }
        else {
            character.torso.hips.rating -= randInt(3) + 1;
            if (character.torso.hips.rating < 1) character.torso.hips.rating = 1;
            DisplayText("After a few seconds your [hips] have shrunk to a much smaller size!");
        }
        character.stats.lib -= 2;
        character.stats.lust -= 10;
        return { next: Menus.Inventory };
    }

    private reductoNipples(character: Character): NextScreenChoices {
        DisplayText().clear();
        const largestBreeasts = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0];
        DisplayText("You rub the paste evenly over your " + Desc.Breast.describeNipple(character, largestBreeasts) + "s, being sure to cover them completely.\n\n");
        // Shrink
        if (largestBreeasts.nipples.length / 2 < 0.25) {
            DisplayText("Your nipples continue to shrink down until they stop at 1/4\" long.");
            largestBreeasts.nipples.length = 0.25;
        }
        else {
            DisplayText("Your " + Desc.Breast.describeNipple(character, largestBreeasts) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
            largestBreeasts.nipples.length /= 2;
        }
        character.stats.sens -= 5;
        character.stats.lust -= 5;
        return { next: Menus.Inventory };
    }

    private reductoCancel(character: Character): NextScreenChoices {
        DisplayText().clear();
        DisplayText("You put the salve away.\n\n");
        return character.inventory.items.createAdd(character, ItemType.Consumable, ConsumableName.Reducto, Menus.Inventory);
        // InventoryDisplay.reverseAction();
        // return { next: Menus.Inventory };
    }
}
