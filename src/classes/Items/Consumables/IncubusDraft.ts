import Consumable from './Consumable';
import GenericTransforms from './GenericTransforms';
import Cock, { CockType } from '../../Body/Cock';
import { SkinType } from '../../Body/Creature';
import { FaceType, TongueType } from '../../Body/Face';
import { HornType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { WingType } from '../../Body/UpperBody';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import BreastModifier from '../../Modifiers/BreastModifiers';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class IncubusDraft extends Consumable {
    public readonly tainted: boolean;
    public constructor(tainted: boolean) {
        if (tainted)
            super("IncubiD", "IncubiD", "an Incubi draft", IncubusDraft.DefaultValue, "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass.");
        else
            super("P.Draft", "P.Draft", "an untainted Incubi draft", 20, "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use.");
        this.tainted = tainted;
    }

    public use(player: Player) {
        player.slimeFeed();
        let changeAmount: number = Utils.rand(100);
        if (player.perks.has("HistoryAlchemist"))
            changeAmount += 10;
        MainScreen.text("The draft is slick and sticky, ", true);
        if (player.stats.cor <= 33)
            MainScreen.text("just swallowing it makes you feel unclean.", false);
        if (player.stats.cor > 33 && player.stats.cor <= 66)
            MainScreen.text("reminding you of something you just can't place.", false);
        if (player.stats.cor > 66)
            MainScreen.text("deliciously sinful in all the right ways.", false);
        if (player.stats.cor >= 90)
            MainScreen.text("  You're sure it must be distilled from the cum of an incubus.", false);
        //Lowlevel changes
        if (changeAmount < 50)
            this.lowLevelChanges(player);
        //Mid-level changes
        if (changeAmount >= 50 && changeAmount < 93)
            this.midLevelChanges(player);
        //High level change
        if (changeAmount >= 93)
            this.highLevelChanges(player);
        //Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + player.stats.cor / 3 > 35 && this.tainted)
            GenericTransforms.demonChanges(player);
        player.updateGender();
        if (Utils.rand(4) == 0 && this.tainted)
            MainScreen.text(player.modFem(5, 2), false);
        if (Utils.rand(4) == 0 && this.tainted)
            MainScreen.text(player.modThickness(30, 2), false);
    }

    private lowLevelChanges(player: Player) {
        const cockCount: number = player.lowerBody.cockSpot.count();
        let selectedCock: Cock;
        let cockGrowth: number;
        if (cockCount == 1) {
            cockGrowth = 0;
            selectedCock = player.lowerBody.cockSpot.get(0);
            if (selectedCock.cockType != CockType.DEMON)
                MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " becomes shockingly hard.  It turns a shiny inhuman purple and spasms, dribbling hot demon-like cum as it begins to grow.", false);
            else
                MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " becomes shockingly hard.  It dribbles hot demon-like cum as it begins to grow.", false);
            if (Utils.rand(4) == 0)
                cockGrowth = CockModifier.growCock(player, selectedCock, 3);
            else
                cockGrowth = CockModifier.growCock(player, selectedCock, 3);

            player.stats.int += 1;
            player.stats.lib += 2;
            player.stats.sens += 1;
            player.stats.lust += 5 + cockGrowth * 3;
            player.stats.cor += this.tainted ? 1 : 0;

            if (cockGrowth < .5)
                MainScreen.text("  It stops almost as soon as it starts, growing only a tiny bit longer.", false);
            if (cockGrowth >= .5 && cockGrowth < 1)
                MainScreen.text("  It grows slowly, stopping after roughly half an inch of growth.", false);
            if (cockGrowth >= 1 && cockGrowth <= 2)
                MainScreen.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.", false);
            if (cockGrowth > 2)
                MainScreen.text("  You smile and idly stroke your lengthening " + CockDescriptor.describeCock(player, selectedCock) + " as a few more inches sprout.", false);
            if (selectedCock.cockType != CockType.DEMON)
                MainScreen.text("  With the transformation complete, your " + CockDescriptor.describeCock(player, selectedCock) + " returns to its normal coloration.", false);
            else
                MainScreen.text("  With the transformation complete, your " + CockDescriptor.describeCock(player, selectedCock) + " throbs in an almost happy way as it goes flaccid once more.", false);
        }
        if (cockCount > 1) {
            selectedCock = player.lowerBody.cockSpot.listShortestCocks[0];
            cockGrowth = 0;
            if (Utils.rand(4) == 0)
                cockGrowth = CockModifier.growCock(player, selectedCock, 3);
            else
                cockGrowth = CockModifier.growCock(player, selectedCock, 1);

            player.stats.int += 1;
            player.stats.lib += 2;
            player.stats.sens += 1;
            player.stats.lust += 5 + cockGrowth * 3;
            player.stats.cor += this.tainted ? 1 : 0;

            if (player.lowerBody.cockSpot.count() == 2)
                MainScreen.text("\n\nBoth of your " + CockDescriptor.describeMultiCockShort(player) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor.describeCock(player, selectedCock) + " begins to grow.", false);
            else
                MainScreen.text("\n\nAll of your " + CockDescriptor.describeMultiCockShort(player) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor.describeCock(player, selectedCock) + " begins to grow.", false);

            if (cockGrowth < .5)
                MainScreen.text("  It stops almost as soon as it starts, growing only a tiny bit longer.", false);
            if (cockGrowth >= .5 && cockGrowth < 1)
                MainScreen.text("  It grows slowly, stopping after roughly half an inch of growth.", false);
            if (cockGrowth >= 1 && cockGrowth <= 2)
                MainScreen.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.", false);
            if (cockGrowth > 2)
                MainScreen.text("  You smile and idly stroke your lengthening " + CockDescriptor.describeCock(player, selectedCock) + " as a few more inches sprout.", false);
            MainScreen.text("  With the transformation complete, your " + CockDescriptor.describeMultiCockShort(player) + " return to their normal coloration.", false);
        }
        //NO CAWKS?
        if (cockCount == 0) {
            selectedCock = new Cock();
            selectedCock.cockLength = Utils.rand(3) + 4;
            selectedCock.cockThickness = 1;
            player.lowerBody.cockSpot.add(selectedCock);

            MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
            MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor.describeCock(player, selectedCock) + " fades to a more normal " + player.skinTone + " tone.", false);

            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 1 : 0;
        }
        //TIT CHANGE 25% chance of shrinkage
        if (Utils.rand(4) == 0) {
            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                BreastModifier.shrinkTits(player);
            }
        }
    }

    private midLevelChanges(player: Player) {
        const cockCount: number = player.lowerBody.cockSpot.count();
        let selectedCock: Cock;
        let cockGrowth: number;
        let cockThickness: number;
        if (cockCount > 1) {
            MainScreen.text("\n\nYour cocks fill to full-size... and begin growing obscenely.  ", false);
            for (let index: number = 0; index < cockCount; index++) {
                selectedCock = player.lowerBody.cockSpot.get(index);
                cockGrowth = CockModifier.growCock(player, selectedCock, Utils.rand(3) + 2);
                cockThickness = CockModifier.thickenCock(selectedCock, 1);
                if (cockThickness < .1)
                    selectedCock.cockThickness += .05;
            }
            CreatureChange.lengthChange(player, cockGrowth, cockCount);

            //Display the degree of thickness change.
            if (cockThickness >= 1) {
                if (cockCount == 1) MainScreen.text("\n\nYour cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                else MainScreen.text("\n\nYour cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
            }
            if (cockThickness <= .5) {
                if (cockCount > 1) MainScreen.text("\n\nYour cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                else MainScreen.text("\n\nYour cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
            }
            if (cockThickness > .5 && cockGrowth < 1) {
                if (cockCount == 1) MainScreen.text("\n\nYour cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                if (cockCount > 1) MainScreen.text("\n\nYour cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
            }
            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount == 1) {
            MainScreen.text("\n\nYour cock fills to its normal size and begins growing... ", false);
            selectedCock = player.lowerBody.cockSpot.get(0);
            cockThickness = CockModifier.thickenCock(selectedCock, 1);
            cockGrowth = CockModifier.growCock(player, selectedCock, Utils.rand(3) + 2);
            CreatureChange.lengthChange(player, cockGrowth, cockCount);
            //Display the degree of thickness change.
            if (cockThickness >= 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                else MainScreen.text("  Your cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
            }
            if (cockThickness <= .5) {
                if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                else MainScreen.text("  Your cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
            }
            if (cockThickness > .5 && cockGrowth < 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
            }
            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount == 0) {
            selectedCock = new Cock();
            selectedCock.cockLength = Utils.rand(3) + 4;
            selectedCock.cockThickness = 1;
            player.lowerBody.cockSpot.add(selectedCock);

            MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
            MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor.describeCock(player, selectedCock) + " fades to a more normal " + player.skinTone + " tone.", false);

            player.stats.lib += 3;
            player.stats.sens += 5;
            player.stats.lust += 10;
            player.stats.cor += this.tainted ? 3 : 0;
        }
        //Shrink breasts a more
        //TIT CHANGE 50% chance of shrinkage
        if (Utils.rand(2) == 0) {
            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                BreastModifier.shrinkTits(player);
            }
        }
    }

    private highLevelChanges(player: Player) {
        if (player.lowerBody.cockSpot.count() < 10) {
            if (Utils.rand(10) < Math.floor(player.stats.cor / 25)) {
                MainScreen.text("\n\n", false);
                this.growDemonCock(player, Utils.rand(2) + 2);
                player.stats.lib += 3;
                player.stats.sens += 5;
                player.stats.lust += 10;
                player.stats.cor += this.tainted ? 5 : 0;
            }
            else {
                this.growDemonCock(player, 1);
            }
        }
        if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
            BreastModifier.shrinkTits(player);
            BreastModifier.shrinkTits(player);
        }
    }

    public growDemonCock(player: Player, growCocks: number): void {
        let numOfCockGrown: number = 0;
        let cock: Cock;
        while (growCocks > 0) {
            cock = new Cock();
            console.trace("COCK LENGTH: " + cock.cockLength);
            cock.cockLength = Utils.rand(3) + 4;
            cock.cockThickness = .75;
            console.trace("COCK LENGTH: " + cock.cockLength);
            player.lowerBody.cockSpot.add(cock);
            growCocks--;
            numOfCockGrown++;
        }
        MainScreen.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ", false);
        if (numOfCockGrown == 1)
            MainScreen.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  In time it fades to a more normal coloration and human-like texture.  ", false);
        else
            MainScreen.text("The skin bulges obscenely, darkening and splitting around " + Utils.numToCardinalText(numOfCockGrown) + " of your new dicks.  For an instant they turn a demonic purple and dribble in thick spasms of scalding demon-cum.  After, they return to a more humanoid coloration.  ", false);
        if (numOfCockGrown > 4)
            MainScreen.text("Your tender bundle of new cocks feels deliciously sensitive, and you cannot stop yourself from wrapping your hands around the slick demonic bundle and pleasuring them.\n\nNearly an hour later, you finally pull your slick body away from the puddle you left on the ground.  When you look back, you notice it has already been devoured by the hungry earth.", false);
        player.orgasm();
    }
}