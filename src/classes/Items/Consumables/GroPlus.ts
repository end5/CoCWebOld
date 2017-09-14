import Consumable from "./Consumable";
import Player from "../../Player";
import Utils from "../../Utilities/Utils";

export default class GroPlus extends Consumable {

    public constructor() {
        super("GroPlus", "GroPlus", "a needle filled with Gro+", 50, "This is a small needle with a reservoir full of blue liquid.  A faded label marks it as 'GroPlus'.  Its purpose seems obvious.");
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public use(player: Player) {
        let gpBalls: Function = (player.lowerBody.balls > 0 ? this.growPlusBalls : null);
        let gpBreasts: Function = (player.upperBody.chest.count() > 0 ? this.growPlusBreasts : null);
        let gpClit: Function = (player.lowerBody.vaginaSpot.count() > 0 ? this.growPlusClit : null);
        let gpCock: Function = (player.lowerBody.cockSpot.count() > 0 ? this.growPlusCock : null);
        let gpNipples: Function = (player.upperBody.chest.countNipples() > 0 ? this.growPlusNipples : null);
        MainScreen.clearText();
        MainScreen.text("You ponder the needle in your hand knowing it will enlarge the injection site.  What part of your body will you use it on?  ");
        game.choices("Balls", gpBalls, "Breasts", gpBreasts, "Clit", gpClit, "Cock", gpCock, "Nipples", gpNipples, "", null, "", null, "", null, "", null, "Nevermind", this.growPlusCancel);
        return (true);
    }

    private growPlusBalls(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle deep into your " + player.sackDescript() + ".  It hurts like hell, but you push down the plunger and the pain vanishes as the needles contents flow into you.\n\n");
        //1 in 4 BIG growth.
        if (Utils.rand(4) == 0) {
            MainScreen.text("You feel a trembling in your " + player.ballsDescriptLight() + " as the chemicals start to go to work.  You can tell they're going to be VERY effective.\n");
            player.lowerBody.ballSize += Utils.rand(4) + 2;
            MainScreen.text("They shift, stretching your " + player.sackDescript() + " tight as they gain inches of size.  You step to steady yourself as your center of balance shifts due to your newly enlarged " + player.ballsDescriptLight() + ".  ");
        }
        else {
            player.lowerBody.ballSize += Utils.rand(2) + 1;
            MainScreen.text("You feel your testicles shift, pulling the skin of your " + player.sackDescript() + " a little bit as they grow to " + player.ballsDescriptLight() + ".  ");
        }
        if (player.lowerBody.ballSize > 10) MainScreen.text("Walking gets even tougher with the swollen masses between your legs.  Maybe this was a bad idea.");
        game.dynStats("lus", 10);
        game.inventory.itemGoNext();
    }

    private growPlusBreasts(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into the flesh of your " + player.allBreastsDescript() + " injecting each with a portion of the needle.\n\n");
        if (player.upperBody.chest.count() == 1)
            player.growTits(Utils.rand(5) + 1, 1, true, 1);
        else
            player.growTits(Utils.rand(2) + 1, player.upperBody.chest.count(), true, 1);
        game.dynStats("lus", 10);
        game.inventory.itemGoNext();
    }

    private growPlusClit(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into your clit, nearly crying with how much it hurts.  You push down the plunger and the pain vanishes as your clit starts to grow.\n\n");
        player.lowerBody.vaginaSpot.list[0].clitLength++;
        MainScreen.text("Your " + player.clitDescript() + " stops growing after an inch of new flesh surges free of your netherlips.  It twitches, feeling incredibly sensitive.");
        game.dynStats("sen", 2, "lus", 10);
        game.inventory.itemGoNext();
    }

    private growPlusCock(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into the base of your " + player.multiCockDescriptLight() + ".  It hurts like hell, but as you depress the plunger, the pain vanishes, replaced by a tingling pleasure as the chemicals take effect.\n\n");
        if (player.lowerBody.cockSpot.count() == 1) {
            MainScreen.text("Your " + player.cockDescript(0) + " twitches and thickens, pouring more than an inch of thick new length from your ");
            player.increaseCock(0, 4);
            player.lowerBody.cockSpot.list[0].cockLength += 1; // This was forcing "what was said" to match "what actually happened" no matter what increase/growCock /actually/ did.
            player.lowerBody.cockSpot.list[0].cockThickness += 0.5; // And growCock never actually touched thickness. Nor does the new version. Thickness mod was stripped out entirely.
        }
        //MULTI
        else {
            MainScreen.text("Your " + player.multiCockDescriptLight() + " twitch and thicken, each member pouring out more than an inch of new length from your ");
            for (let index: number = 0; index < player.lowerBody.cockSpot.count(); index++) {
                player.increaseCock(i, 2);
                player.lowerBody.cockSpot.list[index].cockLength += 1;
                player.lowerBody.cockSpot.list[index].cockThickness += 0.5;
            }
        }
        if (player.lowerBody.cockSpot.hasSheath())
            MainScreen.text("sheath.");
        else MainScreen.text("crotch.");
        game.dynStats("sen", 2, "lus", 10);
        game.inventory.itemGoNext();
    }

    private growPlusNipples(player: Player): void {
        MainScreen.clearText();
        player.slimeFeed();
        MainScreen.text("You sink the needle into each of your " + player.nippleDescript(0) + "s in turn, dividing the fluid evenly between them.  Though each injection hurts, the pain is quickly washed away by the potent chemical cocktail.\n\n");
        //Grow nipples
        MainScreen.text("Your nipples engorge, prodding hard against the inside of your " + player.armorName + ".  Abruptly you realize they've grown more than an additional quarter-inch.\n\n");
        player.upperBody.chest.list[Utils.rand(player.upperBody.chest.count() - 1)].nippleLength += (Utils.rand(2) + 3) / 10;
        game.dynStats("lus", 15);
        //NIPPLECUNTZZZ
        if (!player.upperBody.chest.hasFuckableNipples() && Utils.rand(4) == 0) {
            let nowFuckable: boolean = false;
            for (let index: number = 0; index < player.upperBody.chest.count(); index++) {
                if (!player.upperBody.chest.list[index].fuckable && player.upperBody.chest.list[index].nippleLength >= 2) {
                    player.upperBody.chest.list[index].fuckable = true;
                    nowFuckable = true;
                }
            }
            //Talk about if anything was changed.
            if (nowFuckable) MainScreen.text("Your " + player.allBreastsDescript() + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>\n\n");
        }
        game.inventory.itemGoNext();
    }

    private growPlusCancel(): void {
        MainScreen.clearText();
        MainScreen.text("You put the vial away.\n\n");
        game.inventory.returnItemToInventory(this);
    }
}