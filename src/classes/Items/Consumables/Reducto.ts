import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { ClickFunction } from '../../display/Elements/ButtonElement';
import InventoryDisplay from '../../display/InventoryDisplay';
import MainScreen from '../../display/MainScreen';
import Menus from '../../display/Menus/Menus';
import BreastModifier from '../../Modifiers/BreastModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class Reducto extends Consumable {
    public constructor() {
        super(ConsumableName.Reducto, new ItemDesc("Reducto", "a salve marked as 'Reducto'", "This container full of paste can be used to shrink a body part down by a significant amount."), 30);
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        const rdtBalls: ClickFunction = (player.torso.balls.quantity > 0 && player.torso.balls.size > 1 ? this.reductoBalls : null);
        const rdtBreasts: ClickFunction = (player.torso.chest.count > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0 ? this.reductoBreasts : null);
        const rdtButt: ClickFunction = (player.torso.butt.rating > 1 ? this.reductoButt : null);
        const rdtClit: ClickFunction = (player.torso.vaginas.count > 0 && player.torso.clit.length > 0.25 ? this.reductoClit : null);
        const rdtCock: ClickFunction = (player.torso.cocks.count > 0 && player.torso.cocks.sort(Cock.LargestCockArea)[0].area > 6 ? this.reductoCock : null);
        const rdtHips: ClickFunction = (player.torso.hips.rating > 2 ? this.reductoHips : null);
        const rdtNipples: ClickFunction = (player.torso.chest.count > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length > 0.25 ? this.reductoNipples : null);
        DisplayText().clear();
        DisplayText("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
        MainScreen.displayChoices(["Balls", "Breasts", "Butt", "Clit", "Cock", "Hips", "Nipples"],
            [rdtBalls, rdtBreasts, rdtButt, rdtClit, rdtCock, rdtHips, rdtNipples]);
        MainScreen.addBackButton("Nevermind", this.reductoCancel);
        return (true);
    }

    private reductoBalls(player: Player): void {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling paste onto your " + BallsDescriptor.describeSack(player) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        player.torso.balls.size -= Utils.rand(4) + 2;
        if (player.torso.balls.size < 1)
            player.torso.balls.size = 1;
        DisplayText("You feel your scrotum shift, shrinking down along with your " + BallsDescriptor.describeBallsShort(player) + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private reductoBreasts(player: Player): void {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling ointment all over your " + BreastDescriptor.describeAllBreasts(player) + ", covering them entirely as the paste begins to get absorbed into your " + player.skin.desc + ".\n");
        BreastModifier.shrinkTits(player, true);
        if (Utils.rand(2) === 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) {
            DisplayText("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
            BreastModifier.shrinkTits(player, true);
        }
        DisplayText("\nThe last of it wicks away into your skin, completing the changes.");
        player.stats.sens -= 2;
        player.stats.lust -= 5;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private reductoButt(player: Player): void {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling paste onto your " + ButtDescriptor.describeButt(player) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (player.torso.butt.rating >= 15) {
            player.torso.butt.rating -= (3 + Math.floor(player.torso.butt.rating / 3));
            DisplayText("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
        }
        else if (player.torso.butt.rating >= 10) {
            player.torso.butt.rating -= 3;
            DisplayText("You feel much lighter as your " + ButtDescriptor.describeButt(player) + " jiggles slightly, adjusting to its smaller size.");
        }
        else {
            player.torso.butt.rating -= Utils.rand(3) + 1;
            if (player.torso.butt.rating < 1) player.torso.butt.rating = 1;
            DisplayText("After a few seconds your " + ButtDescriptor.describeButt(player) + " has shrunk to a much smaller size!");
        }
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private reductoClit(player: Player): void {
        DisplayText().clear();
        const vagina = player.torso.vaginas.get(0);
        DisplayText("You carefully apply the paste to your " + VaginaDescriptor.describeClit(player) + ", being very careful to avoid getting it on your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  It burns with heat as it begins to make its effects known...\n\n");
        player.torso.clit.length /= 1.7;
        // Set clitlength down to 2 digits in length
        player.torso.clit.length = Math.floor(player.torso.clit.length * 100) / 100;
        DisplayText("Your " + VaginaDescriptor.describeClit(player) + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
        player.stats.sens += 2;
        player.stats.lust += 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private reductoCock(player: Player): void {
        DisplayText().clear();
        const firstCock = player.torso.cocks.get(0);
        if (firstCock.type === CockType.BEE) {
            DisplayText("The gel produces an odd effect when you rub it into your " + CockDescriptor.describeCock(player, firstCock) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + CockDescriptor.describeCock(player, firstCock) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
            firstCock.type = CockType.HUMAN;
        }
        else {
            DisplayText("You smear the repulsive smelling paste over your " + CockDescriptor.describeMultiCockShort(player) + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + CockDescriptor.describeMultiCockShort(player) + " begins to shrink.\n\n");
            if (player.torso.cocks.count === 1) {
                DisplayText("Your " + CockDescriptor.describeCock(player, firstCock) + " twitches as it shrinks, disappearing steadily into your " + (firstCock.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                firstCock.length *= 2 / 3;
                firstCock.thickness *= 2 / 3;
            }
            else { // MULTI
                DisplayText("Your " + CockDescriptor.describeMultiCockShort(player) + " twitch and shrink, each member steadily disappearing into your " + (player.torso.cocks.filter(Cock.HasSheath).length > 0 ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                for (let index: number = 0; index < player.torso.cocks.count; index++) {
                    player.torso.cocks.get(index).length *= 2 / 3;
                    player.torso.cocks.get(index).thickness *= 2 / 3;
                }
            }
        }
        player.stats.sens -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private reductoHips(player: Player): void {
        DisplayText().clear();
        DisplayText("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (player.torso.hips.rating >= 15) {
            player.torso.hips.rating -= (3 + Math.floor(player.torso.hips.rating / 3));
            DisplayText("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
        }
        else if (player.torso.hips.rating >= 10) {
            player.torso.hips.rating -= 3;
            DisplayText("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
        }
        else {
            player.torso.hips.rating -= Utils.rand(3) + 1;
            if (player.torso.hips.rating < 1) player.torso.hips.rating = 1;
            DisplayText("After a few seconds your [hips] have shrunk to a much smaller size!");
        }
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private reductoNipples(player: Player): void {
        DisplayText().clear();
        const largestBreeasts = player.torso.chest.sort(BreastRow.BreastRatingLargest)[0];
        DisplayText("You rub the paste evenly over your " + BreastDescriptor.describeNipple(player, largestBreeasts) + "s, being sure to cover them completely.\n\n");
        // Shrink
        if (largestBreeasts.nipples.length / 2 < 0.25) {
            DisplayText("Your nipples continue to shrink down until they stop at 1/4\" long.");
            largestBreeasts.nipples.length = 0.25;
        }
        else {
            DisplayText("Your " + BreastDescriptor.describeNipple(player, largestBreeasts) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
            largestBreeasts.nipples.length /= 2;
        }
        player.stats.sens -= 5;
        player.stats.lust -= 5;
        MainScreen.doNext(Menus.Inventory.display);
    }

    private reductoCancel(player: Player): void {
        DisplayText().clear();
        DisplayText("You put the salve away.\n\n");
        InventoryDisplay.reverseAction();
        MainScreen.doNext(Menus.Inventory.display);
    }
}
