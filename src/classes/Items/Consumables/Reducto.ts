import Consumable from './Consumable';
import { CockType } from '../../Body/Cock';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import InventoryDisplay from '../../display/InventoryDisplay';
import MainScreen, { ClickFunction } from '../../display/MainScreen';
import PlayerInventoryMenu from '../../display/Menus/PlayerInventoryMenu';
import BreastModifier from '../../Modifiers/BreastModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class Reducto extends Consumable {

    public constructor() {
        super("Reducto", new ItemDesc("Reducto", "a salve marked as 'Reducto'", "This container full of paste can be used to shrink a body part down by a significant amount."), 30);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        let rdtBalls: ClickFunction = (player.lowerBody.balls > 0 && player.lowerBody.ballSize > 1 ? this.reductoBalls : null);
        let rdtBreasts: ClickFunction = (player.upperBody.chest.count() > 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0 ? this.reductoBreasts : null);
        let rdtButt: ClickFunction = (player.lowerBody.butt.buttRating > 1 ? this.reductoButt : null);
        let rdtClit: ClickFunction = (player.lowerBody.vaginaSpot.count() > 0 && player.lowerBody.vaginaSpot.get(0).clitLength > 0.25 ? this.reductoClit : null);
        let rdtCock: ClickFunction = (player.lowerBody.cockSpot.count() > 0 && player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() > 6 ? this.reductoCock : null);
        let rdtHips: ClickFunction = (player.lowerBody.hipRating > 2 ? this.reductoHips : null);
        let rdtNipples: ClickFunction = (player.upperBody.chest.count() > 0 && player.upperBody.chest.BreastRatingLargest[0].nippleLength > 0.25 ? this.reductoNipples : null);
        MainScreen.clearText();
        MainScreen.text("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
        MainScreen.displayChoices(["Balls", "Breasts", "Butt", "Clit", "Cock", "Hips", "Nipples"],
            [rdtBalls, rdtBreasts, rdtButt, rdtClit, rdtCock, rdtHips, rdtNipples]);
        MainScreen.addBackButton("Nevermind", this.reductoCancel);
        return (true);
    }

    private reductoBalls(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You smear the foul-smelling paste onto your " + BallsDescriptor.describeSack(player) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        player.lowerBody.ballSize -= Utils.rand(4) + 2;
        if (player.lowerBody.ballSize < 1)
            player.lowerBody.ballSize = 1;
        MainScreen.text("You feel your scrotum shift, shrinking down along with your " + BallsDescriptor.describeBallsShort(player) + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private reductoBreasts(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You smear the foul-smelling ointment all over your " + BreastDescriptor.describeAllBreasts(player) + ", covering them entirely as the paste begins to get absorbed into your " + player.skinDesc + ".\n");
        BreastModifier.shrinkTits(player, true);
        if (Utils.rand(2) == 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) {
            MainScreen.text("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
            BreastModifier.shrinkTits(player, true);
        }
        MainScreen.text("\nThe last of it wicks away into your skin, completing the changes.");
        player.stats.sens -= 2;
        player.stats.lust -= 5;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private reductoButt(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You smear the foul-smelling paste onto your " + ButtDescriptor.describeButt(player) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (player.lowerBody.butt.buttRating >= 15) {
            player.lowerBody.butt.buttRating -= (3 + Math.floor(player.lowerBody.butt.buttRating / 3));
            MainScreen.text("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
        }
        else if (player.lowerBody.butt.buttRating >= 10) {
            player.lowerBody.butt.buttRating -= 3;
            MainScreen.text("You feel much lighter as your " + ButtDescriptor.describeButt(player) + " jiggles slightly, adjusting to its smaller size.");
        }
        else {
            player.lowerBody.butt.buttRating -= Utils.rand(3) + 1;
            if (player.lowerBody.butt.buttRating < 1) player.lowerBody.butt.buttRating = 1;
            MainScreen.text("After a few seconds your " + ButtDescriptor.describeButt(player) + " has shrunk to a much smaller size!");
        }
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private reductoClit(player: Player): void {
        MainScreen.clearText();
        let vagina = player.lowerBody.vaginaSpot.get(0);
        MainScreen.text("You carefully apply the paste to your " + VaginaDescriptor.describeClit(player, vagina) + ", being very careful to avoid getting it on your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  It burns with heat as it begins to make its effects known...\n\n");
        vagina.clitLength /= 1.7;
        //Set clitlength down to 2 digits in length
        vagina.clitLength = Math.floor(vagina.clitLength * 100) / 100;
        MainScreen.text("Your " + VaginaDescriptor.describeClit(player, vagina) + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
        player.stats.sens += 2;
        player.stats.lust += 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private reductoCock(player: Player): void {
        MainScreen.clearText();
        let cock = player.lowerBody.cockSpot.get(0);
        if (cock.cockType == CockType.BEE) {
            MainScreen.text("The gel produces an odd effect when you rub it into your " + CockDescriptor.describeCock(player, cock) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + CockDescriptor.describeCock(player, cock) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
            cock.cockType = CockType.HUMAN;
        }
        else {
            MainScreen.text("You smear the repulsive smelling paste over your " + CockDescriptor.describeMultiCockShort(player) + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + CockDescriptor.describeMultiCockShort(player) + " begins to shrink.\n\n");
            if (player.lowerBody.cockSpot.count() == 1) {
                MainScreen.text("Your " + CockDescriptor.describeCock(player, cock) + " twitches as it shrinks, disappearing steadily into your " + (cock.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                cock.cockLength *= 2 / 3;
                cock.cockThickness *= 2 / 3;
            }
            else { //MULTI
                MainScreen.text("Your " + CockDescriptor.describeMultiCockShort(player) + " twitch and shrink, each member steadily disappearing into your " + (player.lowerBody.cockSpot.hasSheath() ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                for (let index: number = 0; index < player.lowerBody.cockSpot.count(); index++) {
                    player.lowerBody.cockSpot.get(index).cockLength *= 2 / 3;
                    player.lowerBody.cockSpot.get(index).cockThickness *= 2 / 3;
                }
            }
        }
        player.stats.sens -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private reductoHips(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (player.lowerBody.hipRating >= 15) {
            player.lowerBody.hipRating -= (3 + Math.floor(player.lowerBody.hipRating / 3));
            MainScreen.text("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
        }
        else if (player.lowerBody.hipRating >= 10) {
            player.lowerBody.hipRating -= 3;
            MainScreen.text("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
        }
        else {
            player.lowerBody.hipRating -= Utils.rand(3) + 1;
            if (player.lowerBody.hipRating < 1) player.lowerBody.hipRating = 1;
            MainScreen.text("After a few seconds your [hips] have shrunk to a much smaller size!");
        }
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private reductoNipples(player: Player): void {
        MainScreen.clearText();
        let breasts = player.upperBody.chest.BreastRatingLargest[0];
        MainScreen.text("You rub the paste evenly over your " + BreastDescriptor.describeNipple(player, breasts) + "s, being sure to cover them completely.\n\n");
        //Shrink
        if (breasts.nippleLength / 2 < 0.25) {
            MainScreen.text("Your nipples continue to shrink down until they stop at 1/4\" long.");
            breasts.nippleLength = 0.25;
        }
        else {
            MainScreen.text("Your " + BreastDescriptor.describeNipple(player, breasts) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
            breasts.nippleLength /= 2;
        }
        player.stats.sens -= 5;
        player.stats.lust -= 5;
        MainScreen.doNext(PlayerInventoryMenu.display);
    }

    private reductoCancel(player: Player): void {
        MainScreen.clearText();
        MainScreen.text("You put the salve away.\n\n");
        InventoryDisplay.reverseAction();
        MainScreen.doNext(PlayerInventoryMenu.display);
    }
}
