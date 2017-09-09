import Consumable from "./Consumable";
import Player from "../../Player";
import Utils from "../../Utilities/Utils";
import { CockType } from "../../Modules/Cock";

export default class Reducto extends Consumable {

    public constructor() {
        super("Reducto", "Reducto", "a salve marked as 'Reducto'", 30, "This container full of paste can be used to shrink a body part down by a significant amount.");
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        let rdtBalls: Function = (player.lowerBody.balls > 0 && player.lowerBody.ballSize > 1 ? this.reductoBalls : null);
        let rdtBreasts: Function = (player.upperBody.chest.count() > 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0 ? this.reductoBreasts : null);
        let rdtButt: Function = (player.lowerBody.butt.buttRating > 1 ? this.reductoButt : null);
        let rdtClit: Function = (player.lowerBody.vaginaSpot.count() > 0 && player.lowerBody.vaginaSpot.list[0].clitLength > 0.25 ? this.reductoClit : null);
        let rdtCock: Function = (player.lowerBody.cockSpot.count() > 0 && player.lowerBody.cockSpot.biggestCocks[0].cockArea > 6 ? this.reductoCock : null);
        let rdtHips: Function = (player.lowerBody.hipRating > 2 ? this.reductoHips : null);
        let rdtNipples: Function = (player.upperBody.chest.count() > 0 && player.upperBody.chest.BreastRatingLargest[0].nippleLength > 0.25 ? this.reductoNipples : null);
        clearOutput();
        Render.text("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
        game.choices("Balls", rdtBalls, "Breasts", rdtBreasts, "Butt", rdtButt, "Clit", rdtClit, "Cock", rdtCock,
            "Hips", rdtHips, "Nipples", rdtNipples, "", null, "", null, "Nevermind", this.reductoCancel);
        return (true);
    }

    private reductoBalls(player: Player): void {
        clearOutput();
        Render.text("You smear the foul-smelling paste onto your " + player.sackDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        player.lowerBody.ballSize -= Utils.rand(4) + 2;
        if (player.lowerBody.ballSize < 1) player.lowerBody.ballSize = 1;
        Render.text("You feel your scrotum shift, shrinking down along with your " + player.ballsDescriptLight() + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        game.inventory.itemGoNext();
    }

    private reductoBreasts(player: Player): void {
        clearOutput();
        Render.text("You smear the foul-smelling ointment all over your " + player.allBreastsDescript() + ", covering them entirely as the paste begins to get absorbed into your " + player.skinDesc + ".\n");
        player.shrinkTits(true);
        if (Utils.rand(2) == 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) {
            Render.text("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
            player.shrinkTits(true);
        }
        Render.text("\nThe last of it wicks away into your skin, completing the changes.");
        player.stats.sens -= 2;
        player.stats.lust -= 5;
        game.inventory.itemGoNext();
    }

    private reductoButt(player: Player): void {
        clearOutput();
        Render.text("You smear the foul-smelling paste onto your " + player.buttDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (player.lowerBody.butt.buttRating >= 15) {
            player.lowerBody.butt.buttRating -= (3 + int(player.lowerBody.butt.buttRating / 3));
            Render.text("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
        }
        else if (player.lowerBody.butt.buttRating >= 10) {
            player.lowerBody.butt.buttRating -= 3;
            Render.text("You feel much lighter as your " + player.buttDescript() + " jiggles slightly, adjusting to its smaller size.");
        }
        else {
            player.lowerBody.butt.buttRating -= Utils.rand(3) + 1;
            if (player.lowerBody.butt.buttRating < 1) player.lowerBody.butt.buttRating = 1;
            Render.text("After a few seconds your " + player.buttDescript() + " has shrunk to a much smaller size!");
        }
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        game.inventory.itemGoNext();
    }

    private reductoClit(player: Player): void {
        clearOutput();
        Render.text("You carefully apply the paste to your " + player.clitDescript() + ", being very careful to avoid getting it on your " + player.vaginaDescript(0) + ".  It burns with heat as it begins to make its effects known...\n\n");
        player.lowerBody.vaginaSpot.list[0].clitLength /= 1.7;
        //Set clitlength down to 2 digits in length
        player.lowerBody.vaginaSpot.list[0].clitLength = Math.floor(player.lowerBody.vaginaSpot.list[0].clitLength * 100) / 100;
        Render.text("Your " + player.clitDescript() + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
        player.stats.sens += 2;
        player.stats.lust += 10;
        game.inventory.itemGoNext();
    }

    private reductoCock(player: Player): void {
        clearOutput();
        if (player.lowerBody.cockSpot.list[0].cockType == CockType.BEE) {
            Render.text("The gel produces an odd effect when you rub it into your " + player.cockDescript(0) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + player.cockDescript(0) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
            player.lowerBody.cockSpot.list[0].cockType = CockType.HUMAN;
        }
        else {
            Render.text("You smear the repulsive smelling paste over your " + player.multiCockDescriptLight() + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + player.multiCockDescriptLight() + " begins to shrink.\n\n");
            if (player.lowerBody.cockSpot.count() == 1) {
                Render.text("Your " + player.cockDescript(0) + " twitches as it shrinks, disappearing steadily into your " + (player.lowerBody.cockSpot.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                player.lowerBody.cockSpot.list[0].cockLength *= 2 / 3;
                player.lowerBody.cockSpot.list[0].cockThickness *= 2 / 3;
            }
            else { //MULTI
                Render.text("Your " + player.multiCockDescriptLight() + " twitch and shrink, each member steadily disappearing into your " + (player.lowerBody.cockSpot.hasSheath() ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                for (let i: number = 0; i < player.lowerBody.cockSpot.count(); i++) {
                    player.lowerBody.cockSpot.list[i].cockLength *= 2 / 3;
                    player.lowerBody.cockSpot.list[i].cockThickness *= 2 / 3;
                }
            }
        }
        player.stats.sens -= 2;
        player.stats.lust -= 10;
        game.inventory.itemGoNext();
    }

    private reductoHips(player: Player): void {
        clearOutput();
        Render.text("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (player.lowerBody.hipRating >= 15) {
            player.lowerBody.hipRating -= (3 + int(player.lowerBody.hipRating / 3));
            Render.text("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
        }
        else if (player.lowerBody.hipRating >= 10) {
            player.lowerBody.hipRating -= 3;
            Render.text("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
        }
        else {
            player.lowerBody.hipRating -= Utils.rand(3) + 1;
            if (player.lowerBody.hipRating < 1) player.lowerBody.hipRating = 1;
            Render.text("After a few seconds your [hips] have shrunk to a much smaller size!");
        }
        player.stats.lib -= 2;
        player.stats.lust -= 10;
        game.inventory.itemGoNext();
    }

    private reductoNipples(player: Player): void {
        clearOutput();
        Render.text("You rub the paste evenly over your " + player.nippleDescript(0) + "s, being sure to cover them completely.\n\n");
        //Shrink
        if (player.upperBody.chest.BreastRatingLargest[0].nippleLength / 2 < 0.25) {
            Render.text("Your nipples continue to shrink down until they stop at 1/4\" long.");
            player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.25;
        }
        else {
            Render.text("Your " + player.nippleDescript(0) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
            player.upperBody.chest.BreastRatingLargest[0].nippleLength /= 2;
        }
        player.stats.sens -= 5;
        player.stats.lust -= 5;
        game.inventory.itemGoNext();
    }

    private reductoCancel(player: Player): void {
        clearOutput();
        Render.text("You put the salve away.\n\n");
        game.inventory.returnItemToInventory(this);
    }
}
