﻿import Giacomo from './Explore/Giacomo';
import BreastRow from '../Body/BreastRow';
import Cock from '../Body/Cock';
import { LegType } from '../Body/Legs';
import { VaginaWetness } from '../Body/Vagina';
import Character from '../Character/Character';
import CombatManager from '../Combat/CombatManager';
import BallsDescriptor from '../Descriptors/BallsDescriptor';
import BreastDescriptor from '../Descriptors/BreastDescriptor';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import HipDescriptor from '../Descriptors/HipDescriptor';
import LegDescriptor from '../Descriptors/LegDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import DisplayText from '../display/DisplayText';
import MainScreen from '../display/MainScreen';
import Menus from '../display/Menus/Menus';
import Game from '../Game/Game';
import LocationName from '../Game/LocationName';
import { Utils } from '../Utilities/Utils';

/**
 * Created by aimozg on 05.01.14.
 */
export default class Exploration {
    public giacomo: Giacomo = new Giacomo();

    // const MET_OTTERGIRL: number = 777;
    // const HAS_SEEN_MINO_AND_COWGIRL: number = 892;
    // const EXPLORATION_PAGE: number = 1015;
    // const BOG_EXPLORED: number = 1016;
    public display(character: Character) {
        if (!character.locations.get(LocationName.BeyondCamp).visited) {
            DisplayText().clear();
            DisplayText("You tentatively step away from your campsite, alert and scanning the ground and sky for danger.  You walk for the better part of an hour, marking the rocks you pass for a return trip to your camp.  It worries you that the portal has an opening on this side, and it was totally unguarded...\n\n...Wait a second, why is your campsite in front of you? The portal's glow is clearly visible from inside the tall rock formation.   Looking carefully you see your footprints leaving the opposite side of your camp, then disappearing.  You look back the way you came and see your markings vanish before your eyes.  The implications boggle your mind as you do your best to mull over them.  Distance, direction, and geography seem to have little meaning here, yet your campsite remains exactly as you left it.  A few things click into place as you realize you found your way back just as you were mentally picturing the portal!  Perhaps memory influences travel here, just like time, distance, and speed would in the real world!\n\nThis won't help at all with finding new places, but at least you can get back to camp quickly.  You are determined to stay focused the next time you explore and learn how to traverse this gods-forsaken realm.");
            this.tryDiscover(character);
            return;
        }
        else if (character.locations.get(LocationName.BeyondCamp).visited) {
            DisplayText().clear();
            DisplayText("You walk for quite some time, roaming the hard-packed and pink-tinged earth of the demon-realm.  Rust-red rocks speckle the wasteland, as barren and lifeless as anywhere else you've been.  A cool breeze suddenly brushes against your face, as if gracing you with its presence.  You turn towards it and are confronted by the lush foliage of a very old looking forest.  You smile as the plants look fairly familiar and non-threatening.  Unbidden, you remember your decision to test the properties of this place, and think of your campsite as you walk forward.  Reality seems to shift and blur, making you dizzy, but after a few minutes you're back, and sure you'll be able to return to the forest with similar speed.\n\n<b>You have discovered the Forest!</b>");
            this.tryDiscover(character);
            character.locations.get(LocationName.Forest).timesVisited++;
            character.locations.get(LocationName.Forest).locationKnown = true;
            // character.exploredForest++;
            return;
        }
        else if (character.locations.get(LocationName.BeyondCamp).locationKnown) {
            DisplayText().clear();
            DisplayText("You can continue to search for new locations, or explore your previously discovered locations.");
        }

        /*if (Flags.list[FlagEnum.EXPLORATION_PAGE] === 2) {
            explorePageII();
            return;
        }*/
        MainScreen.hideBottomButtons();
        const buttonText = ["Explore"];
        const buttonFunc = [this.tryDiscover];
        buttonText.push(character.locations.get(LocationName.Desert) ? "Desert" : "");
        buttonFunc.push(character.locations.get(LocationName.Desert) ? Game.scenes.desert.exploreDesert : undefined);
        buttonText.push(character.locations.get(LocationName.Forest) ? "Forest" : "");
        buttonFunc.push(character.locations.get(LocationName.Forest) ? Game.scenes.forest.exploreForest : undefined);
        buttonText.push(character.locations.get(LocationName.Lake) ? "Lake" : "");
        buttonFunc.push(character.locations.get(LocationName.Lake) ? Game.scenes.lake.exploreLake : undefined);
        buttonText.push(character.locations.get(LocationName.Plains) ? "Plains" : "");
        buttonFunc.push(character.locations.get(LocationName.Plains) ? Game.scenes.plains.explorePlains : undefined);
        buttonText.push(character.locations.get(LocationName.Swamp) ? "Swamp" : "");
        buttonFunc.push(character.locations.get(LocationName.Swamp) ? Game.scenes.swamp.exploreSwamp : undefined);
        buttonText.push(character.locations.get(LocationName.Deepwoods) ? "Deepwoods" : "");
        buttonFunc.push(character.locations.get(LocationName.Deepwoods) ? Game.scenes.forest.exploreDeepwoods : undefined);
        buttonText.push(character.locations.get(LocationName.Mountains) ? "Mountain" : "");
        buttonFunc.push(character.locations.get(LocationName.Mountains) ? Game.scenes.mountain.exploreMountain : undefined);
        buttonText.push(character.locations.get(LocationName.HighMountain) ? "High Mountain" : "");
        buttonFunc.push(character.locations.get(LocationName.HighMountain) ? Game.scenes.highMountains.exploreHighMountain : undefined);
        buttonText.push(character.locations.get(LocationName.Bog) ? "Bog" : "");
        buttonFunc.push(character.locations.get(LocationName.Bog) ? Game.scenes.bog.exploreBog : undefined);
        MainScreen.displayChoices(buttonText, buttonFunc, ["Back"], [Menus.Player.display]);
        /*
        if (character.exploredDesert > 0) MainScreen.getBottomButton(1).modify("Desert", kGAMECLASS.desert.exploreDesert);
        if (character.exploredForest > 0) MainScreen.getBottomButton(2).modify("Forest", kGAMECLASS.forest.exploreForest);
        if (character.exploredLake > 0) MainScreen.getBottomButton(3).modify("Lake", kGAMECLASS.lake.exploreLake);
        MainScreen.getBottomButton(4).modify("Next", explorePageII);
        if (Flags.list[FlagEnum.TIMES_EXPLORED_PLAINS] > 0) MainScreen.getBottomButton(5).modify("Plains", kGAMECLASS.plains.explorePlains);
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00272] > 0) MainScreen.getBottomButton(6).modify("Swamp", kGAMECLASS.swamp.exploreSwamp);
        if (character.statusAffects.has(StatusAffectType.ExploredDeepwoods)) MainScreen.getBottomButton(7).modify("Deepwoods", kGAMECLASS.forest.exploreDeepwoods);
        if (character.exploredMountain > 0) MainScreen.getBottomButton(8).modify("Mountain", kGAMECLASS.mountain.exploreMountain);
        MainScreen.getBottomButton(9).modify("Back", characterMenu);
    }

    private explorePageII() {
        Flags.list[FlagEnum.EXPLORATION_PAGE] = 2;
        menu();
        if (Flags.list[FlagEnum.DISCOVERED_HIGH_MOUNTAIN] > 0) MainScreen.getBottomButton(0).modify("High Mountain", kGAMECLASS.highMountains.exploreHighMountain);
        if (Flags.list[FlagEnum.BOG_EXPLORED] > 0) MainScreen.getBottomButton(1).modify("Bog", kGAMECLASS.bog.exploreBog);
        MainScreen.getBottomButton(4).modify("Previous", goBackToPageI);
        if (debug) MainScreen.getBottomButton(8).modify("Debug", exploreDebug.doExploreDebug);
        MainScreen.getBottomButton(9).modify("Back", characterMenu);
    }

    private goBackToPageI() {
        Flags.list[FlagEnum.EXPLORATION_PAGE] = 1;
        doExplore();
        */
    }

    // Try to find a new location - called from doExplore once the first location is found
    public tryDiscover(character: Character) {

        // kGAMECLASS.goblinAssassinScene.goblinAssassinEncounter();
        // return;

        if (Flags.list[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] === 1 && Flags.list[FlagEnum.HEL_RAPED_TODAY] === 0 && Utils.rand(10) === 0 && character.gender > 0 && !kGAMECLASS.helFollower.followerHel()) {
            kGAMECLASS.helScene.helSexualAmbush();
            return;
        }
        if (character.locations.get(LocationName.BeyondCamp).timesVisited > 1) {
            if (!character.locations.get(LocationName.Lake).visited) {
                DisplayText().clear();
                DisplayText("Your wanderings take you far and wide across the barren wasteland that surrounds the portal, until the smell of humidity and fresh water alerts you to the nearby lake.  With a few quick strides you find a lake so massive the distant shore cannot be seen.  Grass and a few sparse trees grow all around it.\n\n<b>You have discovered the Lake!</b>");
                character.locations.get(LocationName.Lake).timesVisited++;
                character.locations.get(LocationName.Lake).locationKnown = true;
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                MainScreen.doNext(Game.scenes.camp.returnToCampUseOneHour);
                return;
            }
            if (character.locations.get(LocationName.Lake).locationKnown && Utils.rand(3) === 0 && !character.locations.get(LocationName.Desert).visited) {
                DisplayText().clear();
                DisplayText("You stumble as the ground shifts a bit underneath you.  Groaning in frustration, you straighten up and discover the rough feeling of sand ");
                if (character.torso.hips.legs.type === LegType.HUMAN) DisplayText("inside your footwear, between your toes");
                if (character.torso.hips.legs.type === LegType.HOOFED) DisplayText("in your hooves");
                if (character.torso.hips.legs.type === LegType.DOG) DisplayText("in your paws");
                if (character.torso.hips.legs.type === LegType.NAGA) DisplayText("in your scales");
                DisplayText(".\n\n<b>You've discovered the Desert!</b>");
                character.locations.get(LocationName.Desert).timesVisited++;
                character.locations.get(LocationName.Desert).locationKnown = true;
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                MainScreen.doNext(Game.scenes.camp.returnToCampUseOneHour);
                return;
            }
            if (character.locations.get(LocationName.Desert).locationKnown && Utils.rand(3) === 0 && !character.locations.get(LocationName.Mountains).visited) {
                DisplayText().clear();
                DisplayText("Thunder booms overhead, shaking you out of your thoughts.  High above, dark clouds encircle a distant mountain peak.  You get an ominous feeling in your gut as you gaze up at it.\n\n<b>You have discovered the mountain!</b>");
                character.locations.get(LocationName.Mountains).timesVisited++;
                character.locations.get(LocationName.Mountains).locationKnown = true;
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                MainScreen.doNext(Game.scenes.camp.returnToCampUseOneHour);
                return;
            }
            if (character.locations.get(LocationName.Mountains).locationKnown && Utils.rand(3) === 0 && !character.locations.get(LocationName.Plains).visited) {
                character.locations.get(LocationName.Plains).timesVisited++;
                character.locations.get(LocationName.Plains).locationKnown = true;
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                DisplayText().clear();
                DisplayText("You find yourself standing in knee-high grass, surrounded by flat plains on all sides.  Though the mountain, forest, and lake are all visible from here, they seem quite distant.\n\n<b>You've discovered the plains!</b>");
                MainScreen.doNext(Game.scenes.camp.returnToCampUseOneHour);
                return;
            }
            if (character.locations.get(LocationName.Plains).locationKnown && Utils.rand(3) === 0 && !character.locations.get(LocationName.Swamp).visited) {
                character.locations.get(LocationName.Swamp).timesVisited++;
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                DisplayText().clear();
                DisplayText("All things considered, you decide you wouldn't mind a change of scenery.  Gathering up your belongings, you begin a journey into the wasteland.  The journey begins in high spirits, and you whistle a little traveling tune to pass the time.  After an hour of wandering, however, your wanderlust begins to whittle away.  Another half-hour ticks by.  Fed up with the fruitless exploration, you're nearly about to head back to camp when a faint light flits across your vision.  Startled, you whirl about to take in three luminous will-o'-the-wisps, swirling around each other whimsically.  As you watch, the three ghostly lights begin to move off, and though the thought of a trap crosses your mind, you decide to follow.\n\n");
                DisplayText("Before long, you start to detect traces of change in the environment.  The most immediate difference is the increasingly sweltering heat.  A few minutes pass, then the will-o'-the-wisps plunge into the boundaries of a dark, murky, stagnant swamp; after a steadying breath you follow them into the bog.  Once within, however, the gaseous balls float off in different directions, causing you to lose track of them.  You sigh resignedly and retrace your steps, satisfied with your discovery.  Further exploration can wait.  For now, your camp is waiting.\n\n");
                DisplayText("<b>You've discovered the swamp!</b>");
                MainScreen.doNext(Game.scenes.camp.returnToCampUseTwoHours);
                return;
            }
            // Used for chosing 'repeat' encounters.
            let choosey: number = Utils.rand(6);
            // 2 (gargoyle) is never chosen once cathedral is discovered.
            if (choosey === 2 && !character.locations.get(LocationName.Lake).locationKnown) {
                choosey = Utils.rand(5);
                if (choosey >= 2) choosey++;
            }
            // Chance of encountering Giacomo!
            if (choosey === 0) {
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                this.giacomo.giacomoEncounter(); // eventParser(2015);
                return;
            }
            else if (choosey === 1) {
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                this.lumi.lumiEncounter();
                return;
            }
            else if (choosey === 2) {
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                if (Flags.list[FlagEnum.GAR_NAME] === 0) this.gargoyle.gargoylesTheShowNowOnWBNetwork();
                else this.gargoyle.returnToCathedral();
                return;
            }
            // Monster - 50/50 imp/gob split.
            else {
                character.locations.get(LocationName.BeyondCamp).timesVisited++;
                const impGob: number = 5;
                // Imptacular Encounter
                if (Utils.rand(10) < impGob) {
                    if (character.stats.level >= 8 && Utils.rand(2) === 0) {
                        Game.scenes.impScene.impLordEncounter();
                        spriteSelect(29);
                        return;
                    }
                    else {
                        DisplayText().clear();
                        DisplayText("An imp wings out of the sky and attacks!");
                        CombatManager.beginBattle(character, character.party, [new Imp()]);
                        spriteSelect(29);
                    }
                    return;
                }
                // Encounter Gobbalin!
                else {
                    // 50% of the time, goblin assassin!
                    if (character.stats.level >= 10 && Utils.rand(2) === 0) {
                        kGAMECLASS.goblinAssassinScene.goblinAssassinEncounter();
                        return;
                    }
                    if (character.gender > 0) {
                        DisplayText().clear();
                        DisplayText("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + character.mf("stud", "slut"));
                        DisplayText(".</i>\"");
                        CombatManager.beginBattle(character, character.party, [new Goblin()]);
                        spriteSelect(24);
                        return;
                    }
                    else {
                        DisplayText().clear();
                        DisplayText("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!");
                        DisplayText("</i>\"");
                        CombatManager.beginBattle(character, character.party, [new Goblin()]);
                        spriteSelect(24);
                        return;
                    }
                }
            }
            DisplayText().clear();
            DisplayText("You wander around, fruitlessly searching for new places.");
        }
        character.locations.get(LocationName.BeyondCamp).timesVisited++;
        MainScreen.doNext(Game.scenes.camp.returnToCampUseOneHour);
    }

    // Massive bodyparts scene
    // [DESERT]
    // [RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT,
    // AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
    public bigJunkDesertScene(character: Character) {
        DisplayText().clear();
        const longestCock = character.torso.cocks.sort(Cock.LongestCocks)[0];
        // PARAGRAPH 1
        DisplayText("Walking along the sandy dunes of the desert you find yourself increasingly impeded by the bulk of your " + CockDescriptor.describeCock(character, longestCock) + " dragging along the sandscape behind you.  The incredibly hot surface of the desert causes your loins to sweat heavily and fills them with relentless heat.");

        if (character.torso.cocks.count === 1) DisplayText("  As it drags along the dunes, the sensation forces you to imagine the rough textured tongue of a monstrous animal sliding along the head of your " + CockDescriptor.nounCock(longestCock.type) + ".");
        else if (character.torso.cocks.count >= 2) DisplayText("  With all of your " + CockDescriptor.describeMultiCockShort(character) + " dragging through the sands they begin feeling as if the rough textured tongues of " + Utils.numToCardinalText(character.torso.cocks.count) + " different monstrous animals were slobbering over each one.");
        DisplayText("\n\n");

        // PARAGRAPH 2

        // FOR NON-CENTAURS]
        if (!character.torso.hips.legs.isTaur()) {
            DisplayText("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + CockDescriptor.describeMultiCockShort(character) + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward but your genitals have grown too large and heavy for your " + HipDescriptor.describeHips(character) + " to hold them aloft.  Instead you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down on top of your obscene " + CockDescriptor.describeMultiCockShort(character) + ".");

            // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
            const largestBreasts = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0];
            if (largestBreasts.rating >= 35) DisplayText("  Your " + BreastDescriptor.describeAllBreasts(character) + " hang lewdly off your torso to rest on the desert sands, seeming to bury the dunes on either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The burning heat of the desert teases your " + BreastDescriptor.describeNipple(character, largestBreasts) + "s mercilessly as they grind in the sand.");
            // IF CHARACTER HAS A BALLS ADD SENTENCE
            if (character.torso.balls.quantity > 0) DisplayText("  Your " + character.skin.tone + BallsDescriptor.describeSack(character) + " rests beneath your raised " + ButtDescriptor.describeButt(character) + ".  The fiery warmth of the desert caresses it, causing your " + BallsDescriptor.describeBalls(true, true, character) + " to pulse with the need to release their sperm through your " + CockDescriptor.describeMultiCockShort(character) + ".");
            // IF CHARACTER HAS A VAGINA ADD SENTENCE
            if (character.torso.vaginas.count >= 1) {
                DisplayText("  Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " and " + VaginaDescriptor.describeClit(character) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + ButtDescriptor.describeButt(character) + " above.");
                // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                if (character.torso.vaginas.get(0).wetness >= VaginaWetness.DROOLING) DisplayText("  Juices stream from your womanhood and begin pooling on the hot sand beneath you.  Wisps of steam rise up into the air only to tease your genitals further.  ");
            }
        }
        // FOR CENTAURS
        else {
            DisplayText("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + CockDescriptor.describeMultiCockShort(character) + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + HipDescriptor.describeHips(character) + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hindquarters until you rest atop your " + CockDescriptor.describeMultiCockShort(character) + ".");
            // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
            const largestBreasts = character.torso.chest.sort(BreastRow.BreastRatingLargest)[0];
            if (largestBreasts.rating >= 35) DisplayText("  Your " + BreastDescriptor.describeAllBreasts(character) + " pull your human torso forward until it also is forced to rest facedown, just like your horse half.  Your tits rest, pinned on the desert sand to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The burning heat of the desert teases your " + BreastDescriptor.describeNipple(character, largestBreasts) + "s incessantly.");
            // IF CHARACTER HAS A BALLS ADD SENTENCE
            if (character.torso.balls.quantity > 0) DisplayText("  Your " + character.skin.tone + BallsDescriptor.describeSack(character) + " rests beneath your raised " + ButtDescriptor.describeButt(character) + ".  The airy warmth of the desert teases it, causing your " + BallsDescriptor.describeBalls(true, true, character) + " pulse with the need to release their sperm through your " + CockDescriptor.describeMultiCockShort(character) + ".");
            // IF CHARACTER HAS A VAGINA ADD SENTENCE
            if (character.torso.vaginas.count >= 1) {
                DisplayText("  Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " and " + VaginaDescriptor.describeClit(character) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + ButtDescriptor.describeButt(character) + " above.");
                // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                if (character.torso.vaginas.get(0).wetness >= VaginaWetness.DROOLING) DisplayText("  The desert sun beats down on your body, its fiery heat inflaming the senses of your vaginal lips.  Juices stream from your womanhood and begin pooling on the hot sand beneath you.");
            }
        }
        DisplayText("\n\n");
        // PARAGRAPH 3
        DisplayText("You realize you are effectively trapped here by your own body.");
        // CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
        if (character.stats.cor < 33) DisplayText("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!");
        else if (character.stats.cor < 66) DisplayText("  You realize that if any dangerous predator were to find you in this state you'd be completely defenseless.  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.");
        else DisplayText("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you're exhilarated at the prospect.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might die of thirst in the desert, you'd be incredibly tempted to remain right where you are.");

        // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
        if (character.canFly()) DisplayText("  You extend your wings and flap as hard as you can, until at last you manage to lighten the bulk of your body somewhat - enough to allow yourself to drag your genitals across the hot sands and back to camp.  The ordeal takes nearly an hour.");
        // SCENE END IF CHARACTER HAS CENTAUR BODY
        else if (character.torso.hips.legs.isTaur()) DisplayText("  You struggle and work your equine legs against the surface of the dune you are trapped on.  Your " + LegDescriptor.describeFeet(character) + " have consistent trouble finding footing, the soft sand failing to provide enough leverage to lift your bulk.  You breath in deeply and lean from side to side, trying to find some easier vertical leverage.  Eventually, with a crude crawl, your legs manage to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals across the sandscape and back to camp.");
        // SCENE END = FOR ALL OTHER CHARACTERS
        else DisplayText("  You struggle and push with your " + LegDescriptor.describeLegs(character) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + CockDescriptor.describeMultiCockShort(character) + " with as much vigor as you can muster.  Eventually your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're simply too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later " + CockDescriptor.describeMultiCockSimpleOne(character) + " softens enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the warm sand.");
        character.stats.lustNoResist += 25 + Utils.rand(character.stats.cor / 5);
        character.stats.fatigue += 5;
        MainScreen.doNext(Game.scenes.camp.returnToCampUseOneHour);
    }
}
