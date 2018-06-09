import { Consumable } from '../Consumable';

/**
 * Created by aimozg on 11.01.14.
 */
export class Reducto extends Consumable {

    public constructor() {
        super("Reducto", "Reducto", "a salve marked as 'Reducto'", 30, "This container full of paste can be used to shrink a body part down by a significant amount.");
    }

    public canUse(): boolean {
        return true;
    }

    public useItem(): boolean {
        var rdtBalls: Function = (this.game.player.balls > 0 && this.game.player.ballSize > 1 ? this.reductoBalls : null);
        var rdtBreasts: Function = (this.game.player.breastRows.length > 0 && this.game.player.biggestTitSize() > 0 ? this.reductoBreasts : null);
        var rdtButt: Function = (this.game.player.buttRating > 1 ? this.reductoButt : null);
        var rdtClit: Function = (this.game.player.vaginas.length > 0 && this.game.player.clitLength > 0.25 ? this.reductoClit : null);
        var rdtCock: Function = (this.game.player.cockTotal() > 0 && this.game.player.biggestCockArea() > 6 ? this.reductoCock : null);
        var rdtHips: Function = (this.game.player.hipRating > 2 ? this.reductoHips : null);
        var rdtNipples: Function = (this.game.player.nippleLength > 0.25 ? this.reductoNipples : null);
        clearOutput();
        outputText("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
        this.game.choices("Balls", rdtBalls, "Breasts", rdtBreasts, "Butt", rdtButt, "Clit", rdtClit, "Cock", rdtCock,
            "Hips", rdtHips, "Nipples", rdtNipples, "", null, "", null, "Nevermind", this.reductoCancel);
        return (true);
    }

    private reductoBalls(): void {
        clearOutput();
        outputText("You smear the foul-smelling paste onto your " + this.game.player.sackDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        this.game.player.ballSize -= Utils.rand(4) + 2;
        if (this.game.player.ballSize < 1) this.game.player.ballSize = 1;
        outputText("You feel your scrotum shift, shrinking down along with your " + this.game.player.ballsDescriptLight() + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
        this.game.dynStats("lib", -2, "lus", -10);
        this.game.inventory.itemGoNext();
    }

    private reductoBreasts(): void {
        clearOutput();
        outputText("You smear the foul-smelling ointment all over your " + this.game.player.allBreastsDescript() + ", covering them entirely as the paste begins to get absorbed into your " + this.game.player.skinDesc + ".\n");
        this.game.player.shrinkTits(true);
        if (Utils.rand(2) == 0 && this.game.player.biggestTitSize() >= 1) {
            outputText("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
            this.game.player.shrinkTits(true);
        }
        outputText("\nThe last of it wicks away into your skin, completing the changes.");
        this.game.dynStats("sen", -2, "lus", -5);
        this.game.inventory.itemGoNext();
    }

    private reductoButt(): void {
        clearOutput();
        outputText("You smear the foul-smelling paste onto your " + this.game.player.buttDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (this.game.player.buttRating >= 15) {
            this.game.player.buttRating -= (3 + Math.floor(this.game.player.buttRating / 3));
            outputText("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
        }
        else if (this.game.player.buttRating >= 10) {
            this.game.player.buttRating -= 3;
            outputText("You feel much lighter as your " + this.game.player.buttDescript() + " jiggles slightly, adjusting to its smaller size.");
        }
        else {
            this.game.player.buttRating -= Utils.rand(3) + 1;
            if (this.game.player.buttRating < 1) this.game.player.buttRating = 1;
            outputText("After a few seconds your " + this.game.player.buttDescript() + " has shrunk to a much smaller size!");
        }
        this.game.dynStats("lib", -2, "lus", -10);
        this.game.inventory.itemGoNext();
    }

    private reductoClit(): void {
        clearOutput();
        outputText("You carefully apply the paste to your " + this.game.player.clitDescript() + ", being very careful to avoid getting it on your " + this.game.player.vaginaDescript(0) + ".  It burns with heat as it begins to make its effects known...\n\n");
        this.game.player.clitLength /= 1.7;
        //Set clitlength down to 2 digits in length
        this.game.player.clitLength = Math.floor(this.game.player.clitLength * 100) / 100;
        outputText("Your " + this.game.player.clitDescript() + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
        this.game.dynStats("sen", 2, "lus", 10);
        this.game.inventory.itemGoNext();
    }

    private reductoCock(): void {
        clearOutput();
        if (this.game.player.cocks[0].cockType == CockTypesEnum.BEE) {
            outputText("The gel produces an odd effect when you rub it into your " + this.game.player.cockDescript(0) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + this.game.player.cockDescript(0) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
            this.game.player.cocks[0].cockType = CockTypesEnum.HUMAN;
        }
        else {
            outputText("You smear the repulsive smelling paste over your " + this.game.player.multiCockDescriptLight() + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + this.game.player.multiCockDescriptLight() + " begins to shrink.\n\n");
            if (this.game.player.cocks.length == 1) {
                outputText("Your " + this.game.player.cockDescript(0) + " twitches as it shrinks, disappearing steadily into your " + (this.game.player.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                this.game.player.cocks[0].cockLength *= 2 / 3;
                this.game.player.cocks[0].cockThickness *= 2 / 3;
            }
            else { //MULTI
                outputText("Your " + this.game.player.multiCockDescriptLight() + " twitch and shrink, each member steadily disappearing into your " + (this.game.player.hasSheath() ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                for (var i: number = 0; i < this.game.player.cocks.length; i++) {
                    this.game.player.cocks[i].cockLength *= 2 / 3;
                    this.game.player.cocks[i].cockThickness *= 2 / 3;
                }
            }
        }
        this.game.dynStats("sen", -2, "lus", -10);
        this.game.inventory.itemGoNext();
    }

    private reductoHips(): void {
        clearOutput();
        outputText("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (this.game.player.hipRating >= 15) {
            this.game.player.hipRating -= (3 + Math.floor(this.game.player.hipRating / 3));
            outputText("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
        }
        else if (this.game.player.hipRating >= 10) {
            this.game.player.hipRating -= 3;
            outputText("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
        }
        else {
            this.game.player.hipRating -= Utils.rand(3) + 1;
            if (this.game.player.hipRating < 1) this.game.player.hipRating = 1;
            outputText("After a few seconds your [hips] have shrunk to a much smaller size!");
        }
        this.game.dynStats("lib", -2, "lus", -10);
        this.game.inventory.itemGoNext();
    }

    private reductoNipples(): void {
        clearOutput();
        outputText("You rub the paste evenly over your " + this.game.player.nippleDescript(0) + "s, being sure to cover them completely.\n\n");
        //Shrink
        if (this.game.player.nippleLength / 2 < 0.25) {
            outputText("Your nipples continue to shrink down until they stop at 1/4\" long.");
            this.game.player.nippleLength = 0.25;
        }
        else {
            outputText("Your " + this.game.player.nippleDescript(0) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
            this.game.player.nippleLength /= 2;
        }
        this.game.dynStats("sen", -5, "lus", -5);
        this.game.inventory.itemGoNext();
    }

    private reductoCancel(): void {
        clearOutput();
        outputText("You put the salve away.\n\n");
        this.game.inventory.returnItemToInventory(this);
    }
}
