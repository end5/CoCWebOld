import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import GenericTransforms from './GenericTransforms';
import Cock, { CockType } from '../../Body/Cock';
import Character from '../../Character/Character';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import BreastModifier from '../../Modifiers/BreastModifier';
import CockModifier from '../../Modifiers/CockModifier';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class IncubusDraft extends Consumable {
    public readonly tainted: boolean;
    public constructor(tainted: boolean) {
        if (tainted)
            super(ConsumableName.IncubusDraft, new ItemDesc("IncubiD", "an Incubi draft", "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass."));
        else
            super(ConsumableName.IncubusDraftPure, new ItemDesc("P.Draft", "an untainted Incubi draft", "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use."), 20);
        this.tainted = tainted;
    }

    public use(character: Character) {
        character.slimeFeed();
        let changeAmount: number = Utils.rand(100);
        if (character.perks.has(PerkType.HistoryAlchemist))
            changeAmount += 10;
        DisplayText().clear();
        DisplayText("The draft is slick and sticky, ");
        if (character.stats.cor <= 33)
            DisplayText("just swallowing it makes you feel unclean.");
        if (character.stats.cor > 33 && character.stats.cor <= 66)
            DisplayText("reminding you of something you just can't place.");
        if (character.stats.cor > 66)
            DisplayText("deliciously sinful in all the right ways.");
        if (character.stats.cor >= 90)
            DisplayText("  You're sure it must be distilled from the cum of an incubus.");
        // Lowlevel changes..
        if (changeAmount < 50)
            this.lowLevelChanges(character);
        // Mid-level changes
        if (changeAmount >= 50 && changeAmount < 93)
            this.midLevelChanges(character);
        // High level change
        if (changeAmount >= 93)
            this.highLevelChanges(character);
        // Demonic changes - higher chance with higher corruption.
        if (Utils.rand(40) + character.stats.cor / 3 > 35 && this.tainted)
            GenericTransforms.demonChanges(character);
        character.updateGender();
        if (Utils.rand(4) === 0 && this.tainted)
            DisplayText(BodyModifier.displayModFem(character, 5, 2));
        if (Utils.rand(4) === 0 && this.tainted)
            DisplayText(BodyModifier.displayModThickness(character, 30, 2));
    }

    private lowLevelChanges(character: Character) {
        const cockCount: number = character.torso.cocks.count;
        let selectedCock: Cock;
        let cockGrowth: number;
        if (cockCount === 1) {
            cockGrowth = 0;
            selectedCock = character.torso.cocks.get(0);
            if (selectedCock.type !== CockType.DEMON)
                DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " becomes shockingly hard.  It turns a shiny inhuman purple and spasms, dribbling hot demon-like cum as it begins to grow.");
            else
                DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " becomes shockingly hard.  It dribbles hot demon-like cum as it begins to grow.");
            if (Utils.rand(4) === 0)
                cockGrowth = CockModifier.growCock(character, selectedCock, 3);
            else
                cockGrowth = CockModifier.growCock(character, selectedCock, 3);

            character.stats.int += 1;
            character.stats.lib += 2;
            character.stats.sens += 1;
            character.stats.lust += 5 + cockGrowth * 3;
            character.stats.cor += this.tainted ? 1 : 0;

            if (cockGrowth < .5)
                DisplayText("  It stops almost as soon as it starts, growing only a tiny bit longer.");
            if (cockGrowth >= .5 && cockGrowth < 1)
                DisplayText("  It grows slowly, stopping after roughly half an inch of growth.");
            if (cockGrowth >= 1 && cockGrowth <= 2)
                DisplayText("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.");
            if (cockGrowth > 2)
                DisplayText("  You smile and idly stroke your lengthening " + CockDescriptor.describeCock(character, selectedCock) + " as a few more inches sprout.");
            if (selectedCock.type !== CockType.DEMON)
                DisplayText("  With the transformation complete, your " + CockDescriptor.describeCock(character, selectedCock) + " returns to its normal coloration.");
            else
                DisplayText("  With the transformation complete, your " + CockDescriptor.describeCock(character, selectedCock) + " throbs in an almost happy way as it goes flaccid once more.");
        }
        if (cockCount > 1) {
            selectedCock = character.torso.cocks.sort(Cock.ShortestCocks)[0];
            cockGrowth = 0;
            if (Utils.rand(4) === 0)
                cockGrowth = CockModifier.growCock(character, selectedCock, 3);
            else
                cockGrowth = CockModifier.growCock(character, selectedCock, 1);

            character.stats.int += 1;
            character.stats.lib += 2;
            character.stats.sens += 1;
            character.stats.lust += 5 + cockGrowth * 3;
            character.stats.cor += this.tainted ? 1 : 0;

            if (character.torso.cocks.count === 2)
                DisplayText("\n\nBoth of your " + CockDescriptor.describeMultiCockShort(character) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor.describeCock(character, selectedCock) + " begins to grow.");
            else
                DisplayText("\n\nAll of your " + CockDescriptor.describeMultiCockShort(character) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor.describeCock(character, selectedCock) + " begins to grow.");

            if (cockGrowth < .5)
                DisplayText("  It stops almost as soon as it starts, growing only a tiny bit longer.");
            if (cockGrowth >= .5 && cockGrowth < 1)
                DisplayText("  It grows slowly, stopping after roughly half an inch of growth.");
            if (cockGrowth >= 1 && cockGrowth <= 2)
                DisplayText("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.");
            if (cockGrowth > 2)
                DisplayText("  You smile and idly stroke your lengthening " + CockDescriptor.describeCock(character, selectedCock) + " as a few more inches sprout.");
            DisplayText("  With the transformation complete, your " + CockDescriptor.describeMultiCockShort(character) + " return to their normal coloration.");
        }
        // NO CAWKS?
        if (cockCount === 0) {
            selectedCock = new Cock();
            selectedCock.length = Utils.rand(3) + 4;
            selectedCock.thickness = 1;
            character.torso.cocks.add(selectedCock);

            DisplayText("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
            DisplayText("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor.describeCock(character, selectedCock) + " fades to a more normal " + character.skin.tone + " tone.");

            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 1 : 0;
        }
        // TIT CHANGE 25% chance of shrinkage
        if (Utils.rand(4) === 0) {
            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                BreastModifier.shrinkTits(character);
            }
        }
    }

    private midLevelChanges(character: Character) {
        const cockCount: number = character.torso.cocks.count;
        let selectedCock: Cock;
        let cockGrowth: number;
        let thickness: number;
        if (cockCount > 1) {
            DisplayText("\n\nYour cocks fill to full-size... and begin growing obscenely.  ");
            for (let index: number = 0; index < cockCount; index++) {
                selectedCock = character.torso.cocks.get(index);
                cockGrowth = CockModifier.growCock(character, selectedCock, Utils.rand(3) + 2);
                thickness = CockModifier.thickenCock(selectedCock, 1);
                if (thickness < .1)
                    selectedCock.thickness += .05;
            }
            CockModifier.displayLengthChange(character, cockGrowth, cockCount);

            // Display the degree of thickness change.
            if (thickness >= 1) {
                if (cockCount === 1) DisplayText("\n\nYour cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                else DisplayText("\n\nYour cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
            }
            if (thickness <= .5) {
                if (cockCount > 1) DisplayText("\n\nYour cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                else DisplayText("\n\nYour cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
            }
            if (thickness > .5 && cockGrowth < 1) {
                if (cockCount === 1) DisplayText("\n\nYour cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                if (cockCount > 1) DisplayText("\n\nYour cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
            }
            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount === 1) {
            DisplayText("\n\nYour cock fills to its normal size and begins growing... ");
            selectedCock = character.torso.cocks.get(0);
            thickness = CockModifier.thickenCock(selectedCock, 1);
            cockGrowth = CockModifier.growCock(character, selectedCock, Utils.rand(3) + 2);
            CockModifier.displayLengthChange(character, cockGrowth, cockCount);
            // Display the degree of thickness change.
            if (thickness >= 1) {
                if (character.torso.cocks.count === 1) DisplayText("  Your cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                else DisplayText("  Your cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
            }
            if (thickness <= .5) {
                if (character.torso.cocks.count > 1) DisplayText("  Your cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                else DisplayText("  Your cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
            }
            if (thickness > .5 && cockGrowth < 1) {
                if (character.torso.cocks.count === 1) DisplayText("  Your cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                if (character.torso.cocks.count > 1) DisplayText("  Your cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
            }
            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount === 0) {
            selectedCock = new Cock();
            selectedCock.length = Utils.rand(3) + 4;
            selectedCock.thickness = 1;
            character.torso.cocks.add(selectedCock);

            DisplayText("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
            DisplayText("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor.describeCock(character, selectedCock) + " fades to a more normal " + character.skin.tone + " tone.");

            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 3 : 0;
        }
        // Shrink breasts a more
        // TIT CHANGE 50% chance of shrinkage
        if (Utils.rand(2) === 0) {
            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                BreastModifier.shrinkTits(character);
            }
        }
    }

    private highLevelChanges(character: Character) {
        if (character.torso.cocks.count < 10) {
            if (Utils.rand(10) < Math.floor(character.stats.cor / 25)) {
                DisplayText("\n\n");
                this.growDemonCock(character, Utils.rand(2) + 2);
                character.stats.lib += 3;
                character.stats.sens += 5;
                character.stats.lust += 10;
                character.stats.cor += this.tainted ? 5 : 0;
            }
            else {
                this.growDemonCock(character, 1);
            }
        }
        if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
            BreastModifier.shrinkTits(character);
            BreastModifier.shrinkTits(character);
        }
    }

    public growDemonCock(character: Character, growCocks: number): void {
        let numOfCockGrown: number = 0;
        while (growCocks > 0) {
            character.torso.cocks.add(new Cock(Utils.rand(3) + 4, 0.75));
            growCocks--;
            numOfCockGrown++;
        }
        DisplayText("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
        if (numOfCockGrown === 1)
            DisplayText("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  In time it fades to a more normal coloration and human-like texture.  ");
        else
            DisplayText("The skin bulges obscenely, darkening and splitting around " + Utils.numToCardinalText(numOfCockGrown) + " of your new dicks.  For an instant they turn a demonic purple and dribble in thick spasms of scalding demon-cum.  After, they return to a more humanoid coloration.  ");
        if (numOfCockGrown > 4)
            DisplayText("Your tender bundle of new cocks feels deliciously sensitive, and you cannot stop yourself from wrapping your hands around the slick demonic bundle and pleasuring them.\n\nNearly an hour later, you finally pull your slick body away from the puddle you left on the ground.  When you look back, you notice it has already been devoured by the hungry earth.");
        character.orgasm();
    }
}
