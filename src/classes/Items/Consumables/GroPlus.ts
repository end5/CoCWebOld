import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { ClickFunction } from '../../display/Elements/ButtonElement';
import InventoryDisplay from '../../display/InventoryDisplay';
import MainScreen from '../../display/MainScreen';
import Menus from '../../display/Menus/Menus';
import BreastModifier from '../../Modifiers/BreastModifier';
import CockModifier from '../../Modifiers/CockModifier';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export default class GroPlus extends Consumable {
    public constructor() {
        super(ConsumableName.GroPlus, new ItemDesc("GroPlus", "a needle filled with Gro+", "This is a small needle with a reservoir full of blue liquid.  A faded label marks it as 'GroPlus'.  Its purpose seems obvious."), 50);
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) {
        const gpBalls: ClickFunction = (character.torso.balls.quantity > 0 ? this.growPlusBalls : null);
        const gpBreasts: ClickFunction = (character.torso.chest.count > 0 ? this.growPlusBreasts : null);
        const gpClit: ClickFunction = (character.torso.vaginas.count > 0 ? this.growPlusClit : null);
        const gpCock: ClickFunction = (character.torso.cocks.count > 0 ? this.growPlusCock : null);
        const gpNipples: ClickFunction = (character.torso.chest.countNipples() > 0 ? this.growPlusNipples : null);
        DisplayText().clear();
        DisplayText("You ponder the needle in your hand knowing it will enlarge the injection site.  What part of your body will you use it on?  ");
        MainScreen.displayChoices(["Balls", "Breasts", "Clit", "Cock", "Nipples"], [gpBalls, gpBreasts, gpClit, gpCock, gpNipples]);
        MainScreen.addBackButton("Nevermind", this.growPlusCancel);
    }

    private growPlusBalls(character: Character): void {
        DisplayText().clear();
        character.slimeFeed();
        DisplayText("You sink the needle deep into your " + BallsDescriptor.describeSack(character) + ".  It hurts like hell, but you push down the plunger and the pain vanishes as the needles contents flow into you.\n\n");
        // 1 in 4 BIG growth.
        if (Utils.rand(4) === 0) {
            DisplayText("You feel a trembling in your " + BallsDescriptor.describeBallsShort(character) + " as the chemicals start to go to work.  You can tell they're going to be VERY effective.\n");
            character.torso.balls.size += Utils.rand(4) + 2;
            DisplayText("They shift, stretching your " + BallsDescriptor.describeSack(character) + " tight as they gain inches of size.  You step to steady yourself as your center of balance shifts due to your newly enlarged " + BallsDescriptor.describeBallsShort(character) + ".  ");
        }
        else {
            character.torso.balls.size += Utils.rand(2) + 1;
            DisplayText("You feel your testicles shift, pulling the skin of your " + BallsDescriptor.describeSack(character) + " a little bit as they grow to " + BallsDescriptor.describeBallsShort(character) + ".  ");
        }
        if (character.torso.balls.size > 10) DisplayText("Walking gets even tougher with the swollen masses between your legs.  Maybe this was a bad idea.");
        character.stats.lust += 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private growPlusBreasts(character: Character): void {
        DisplayText().clear();
        character.slimeFeed();
        DisplayText("You sink the needle into the flesh of your " + BreastDescriptor.describeAllBreasts(character) + " injecting each with a portion of the needle.\n\n");
        if (character.torso.chest.count === 1)
            BreastModifier.growSmallestBreastRow(character, Utils.rand(5) + 1, 1, true);
        else
            BreastModifier.growSmallestBreastRow(character, Utils.rand(2) + 1, character.torso.chest.count, true);
        character.stats.lust += 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private growPlusClit(character: Character): void {
        DisplayText().clear();
        character.slimeFeed();
        DisplayText("You sink the needle into your clit, nearly crying with how much it hurts.  You push down the plunger and the pain vanishes as your clit starts to grow.\n\n");
        character.torso.clit.length++;
        DisplayText("Your " + VaginaDescriptor.describeClit(character) + " stops growing after an inch of new flesh surges free of your netherlips.  It twitches, feeling incredibly sensitive.");

        character.stats.sens += 2;
        character.stats.lust += 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private growPlusCock(character: Character): void {
        DisplayText().clear();
        character.slimeFeed();
        DisplayText("You sink the needle into the base of your " + CockDescriptor.describeMultiCockShort(character) + ".  It hurts like hell, but as you depress the plunger, the pain vanishes, replaced by a tingling pleasure as the chemicals take effect.\n\n");
        if (character.torso.cocks.count === 1) {
            DisplayText("Your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " twitches and thickens, pouring more than an inch of thick new length from your ");
            CockModifier.growCock(character, character.torso.cocks.get(0), 4);
            character.torso.cocks.get(0).length += 1; // This was forcing "what was said" to match "what actually happened" no matter what increase/growCock /actually/ did.
            character.torso.cocks.get(0).thickness += 0.5; // And growCock never actually touched thickness. Nor does the new version. Thickness mod was stripped out entirely.
        }
        // MULTI
        else {
            DisplayText("Your " + CockDescriptor.describeMultiCockShort(character) + " twitch and thicken, each member pouring out more than an inch of new length from your ");
            for (let index: number = 0; index < character.torso.cocks.count; index++) {
                CockModifier.growCock(character, character.torso.cocks.get(index), 2);
                character.torso.cocks.get(index).length += 1;
                character.torso.cocks.get(index).thickness += 0.5;
            }
        }
        if (character.torso.cocks.filter(Cock.HasSheath).length > 0)
            DisplayText("sheath.");
        else DisplayText("crotch.");
        character.stats.sens += 2;
        character.stats.lust += 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private growPlusNipples(character: Character): void {
        DisplayText().clear();
        character.slimeFeed();
        DisplayText("You sink the needle into each of your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s in turn, dividing the fluid evenly between them.  Though each injection hurts, the pain is quickly washed away by the potent chemical cocktail.\n\n");
        // Grow nipples
        DisplayText("Your nipples engorge, prodding hard against the inside of your " + character.inventory.equipment.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.\n\n");
        character.torso.chest.get(Utils.rand(character.torso.chest.count - 1)).nipples.length += (Utils.rand(2) + 3) / 10;
        character.stats.lust += 15;
        // NIPPLECUNTZZZ
        if (character.torso.chest.filter(BreastRow.NonFuckableNipples).length > 0 && Utils.rand(4) === 0) {
            let nowFuckable: boolean = false;
            for (const breastRow of character.torso.chest) {
                if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                    breastRow.nipples.fuckable = true;
                    nowFuckable = true;
                }
            }
            // Talk about if anything was changed.
            if (nowFuckable) DisplayText("Your " + BreastDescriptor.describeAllBreasts(character) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>\n\n");
        }
        MainScreen.doNext(Menus.Inventory.display);
    }

    private growPlusCancel(character: Character): void {
        DisplayText().clear();
        DisplayText("You put the vial away.\n\n");
        character.inventory.items.add(character, ItemType.Consumable, ConsumableName.GroPlus, Menus.Inventory.display);
        // InventoryDisplay.reverseAction();
        // MainScreen.doNext(Menus.Inventory.display);
   }
}
