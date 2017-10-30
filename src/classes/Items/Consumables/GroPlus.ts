import Consumable from './Consumable';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import InventoryDisplay from '../../display/InventoryDisplay';
import MainScreen, { ClickFunction } from '../../display/MainScreen';
import PlayerInventoryMenu from '../../display/Menus/PlayerInventoryMenu';
import BreastModifier from '../../Modifiers/BreastModifier';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class GroPlus extends Consumable {
    public constructor() {
        super("GroPlus", new ItemDesc("GroPlus", "a needle filled with Gro+", "This is a small needle with a reservoir full of blue liquid.  A faded label marks it as 'GroPlus'.  Its purpose seems obvious."), 50);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        let gpBalls: ClickFunction = (player.lowerBody.balls > 0 ? this.growPlusBalls : null);
        let gpBreasts: ClickFunction = (player.upperBody.chest.count() > 0 ? this.growPlusBreasts : null);
        let gpClit: ClickFunction = (player.lowerBody.vaginaSpot.count() > 0 ? this.growPlusClit : null);
        let gpCock: ClickFunction = (player.lowerBody.cockSpot.count() > 0 ? this.growPlusCock : null);
        let gpNipples: ClickFunction = (player.upperBody.chest.countNipples() > 0 ? this.growPlusNipples : null);
        MainScreen.clearText();
        MainScreen.text("You ponder the needle in your hand knowing it will enlarge the injection site.  What part of your body will you use it on?  ");
        MainScreen.displayChoices(["Balls", "Breasts", "Clit", "Cock", "Nipples"], [gpBalls, gpBreasts, gpClit, gpCock, gpNipples]);
        MainScreen.addBackButton("Nevermind", this.growPlusCancel);
    }

    private growPlusBalls(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle deep into your " + BallsDescriptor.describeSack(player) + ".  It hurts like hell, but you push down the plunger and the pain vanishes as the needles contents flow into you.\n\n");
        //1 in 4 BIG growth.
        if (Utils.rand(4) == 0) {
            MainScreen.text("You feel a trembling in your " + BallsDescriptor.describeBallsShort(player) + " as the chemicals start to go to work.  You can tell they're going to be VERY effective.\n");
            player.lowerBody.ballSize += Utils.rand(4) + 2;
            MainScreen.text("They shift, stretching your " + BallsDescriptor.describeSack(player) + " tight as they gain inches of size.  You step to steady yourself as your center of balance shifts due to your newly enlarged " + BallsDescriptor.describeBallsShort(player) + ".  ");
        }
        else {
            player.lowerBody.ballSize += Utils.rand(2) + 1;
            MainScreen.text("You feel your testicles shift, pulling the skin of your " + BallsDescriptor.describeSack(player) + " a little bit as they grow to " + BallsDescriptor.describeBallsShort(player) + ".  ");
        }
        if (player.lowerBody.ballSize > 10) MainScreen.text("Walking gets even tougher with the swollen masses between your legs.  Maybe this was a bad idea.");
        player.stats.lust += 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private growPlusBreasts(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into the flesh of your " + BreastDescriptor.describeAllBreasts(player) + " injecting each with a portion of the needle.\n\n");
        if (player.upperBody.chest.count() == 1)
            BreastModifier.growSmallestBreastRow(player, Utils.rand(5) + 1, 1, true);
        else
            BreastModifier.growSmallestBreastRow(player, Utils.rand(2) + 1, player.upperBody.chest.count(), true);
        player.stats.lust += 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private growPlusClit(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into your clit, nearly crying with how much it hurts.  You push down the plunger and the pain vanishes as your clit starts to grow.\n\n");
        player.lowerBody.vaginaSpot.get(0).clitLength++;
        MainScreen.text("Your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " stops growing after an inch of new flesh surges free of your netherlips.  It twitches, feeling incredibly sensitive.");

        player.stats.sens += 2;
        player.stats.lust += 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private growPlusCock(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into the base of your " + CockDescriptor.describeMultiCockShort(player) + ".  It hurts like hell, but as you depress the plunger, the pain vanishes, replaced by a tingling pleasure as the chemicals take effect.\n\n");
        if (player.lowerBody.cockSpot.count() == 1) {
            MainScreen.text("Your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " twitches and thickens, pouring more than an inch of thick new length from your ");
            CockModifier.growCock(player, player.lowerBody.cockSpot.get(0), 4);
            player.lowerBody.cockSpot.get(0).cockLength += 1; // This was forcing "what was said" to match "what actually happened" no matter what increase/growCock /actually/ did.
            player.lowerBody.cockSpot.get(0).cockThickness += 0.5; // And growCock never actually touched thickness. Nor does the new version. Thickness mod was stripped out entirely.
        }
        //MULTI
        else {
            MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(player) + " twitch and thicken, each member pouring out more than an inch of new length from your ");
            for (let index: number = 0; index < player.lowerBody.cockSpot.count(); index++) {
                CockModifier.growCock(player, player.lowerBody.cockSpot.get(index), 2);
                player.lowerBody.cockSpot.get(index).cockLength += 1;
                player.lowerBody.cockSpot.get(index).cockThickness += 0.5;
            }
        }
        if (player.lowerBody.cockSpot.hasSheath())
            MainScreen.text("sheath.");
        else MainScreen.text("crotch.");
        player.stats.sens += 2;
        player.stats.lust += 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private growPlusNipples(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into each of your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s in turn, dividing the fluid evenly between them.  Though each injection hurts, the pain is quickly washed away by the potent chemical cocktail.\n\n");
        //Grow nipples
        MainScreen.text("Your nipples engorge, prodding hard against the inside of your " + player.inventory.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.\n\n");
        player.upperBody.chest.get(Utils.rand(player.upperBody.chest.count() - 1)).nippleLength += (Utils.rand(2) + 3) / 10;
        player.stats.lust += 15;
        //NIPPLECUNTZZZ
        if (!player.upperBody.chest.hasFuckableNipples() && Utils.rand(4) == 0) {
            let nowFuckable: boolean = false;
            for (let index: number = 0; index < player.upperBody.chest.count(); index++) {
                if (!player.upperBody.chest.get(index).fuckable && player.upperBody.chest.get(index).nippleLength >= 2) {
                    player.upperBody.chest.get(index).fuckable = true;
                    nowFuckable = true;
                }
            }
            //Talk about if anything was changed.
            if (nowFuckable) MainScreen.text("Your " + BreastDescriptor.describeAllBreasts(player) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>\n\n");
        }
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private growPlusCancel(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You put the vial away.\n\n");
        InventoryDisplay.reverseAction();
        MainScreen.doNext(PlayerInventoryMenu.display);
   }
}