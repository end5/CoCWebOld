import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import Character from '../../Character/Character';
import GenderDescriptor from '../../Descriptors/GenderDescriptor';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import { Utils } from '../../Utilities/Utils';
import Player from '../Player';

export default class EmberPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        // Pregnancy notes: Egg Laying
        const ember: Character;
        if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0) {
            if (incubationTime === 330) DisplayText("\nYour belly has swollen, becoming larger - proof that Ember's seed did its work.  The dragon seems to be constantly checking you out, as if looking for the signs of weight gain.");
            if (incubationTime === 250) DisplayText("\nYour belly grows ever bigger, making your pregnancy noticeable; your belly also feels somewhat solid.  Ember casts pleased glances in your direction, whenever " + ember.desc.subjectivePronoun + " thinks you're not looking.");
            if (incubationTime === 170) {
                DisplayText("\nYou've grown a lot.  Anyone is able to tell that you're pregnant with a single glance; and by the shape, you have no doubt that there's an egg in your womb; a big one.");
                // (If Corruption < 40)
                if (player.stats.cor < 40) DisplayText("  Part of you didn't really want to get knocked up, but it's for a good cause.  Besides, Ember looks very cute, trying to hide " + ember.desc.possessivePronoun + " happiness whenever " + ember.desc.subjectivePronoun + " glances at your belly...");
                // (If Corruption >= 40)
                else if (player.stats.cor < 75) DisplayText("  Considering the size of the egg, you hope it doesn't hurt when your child comes out.  You hope Ember will help you through this.");
                // (If Corruption >= 75)
                else DisplayText("  You think dreamily about the wild sex that helped conceive this little one.  Ember is such a great fuck.  Really, you're doing this world a favor by bringing more of Ember's offspring into it.");
            }
            if (incubationTime === 120) DisplayText("\nThough you're sure that this is the time when a regular baby would start moving about, your own belly simply sits there, heavy and full.  You'd be worried if you didn't remember that Ember hatched from an egg.  Sometimes; a delightful, refreshing, chill spreads from your belly throughout your body; making you feel invigorated, ready for anything.");
            if (incubationTime === 90) DisplayText("\nYou've somehow grown even larger, the egg's outline appearing through your tummy.  By now, you're quite bothered with how difficult it's getting to move.  Ember constantly shadows you around the camp, making sure you're all right, although if you ever question " + ember.desc.objectivePronoun + " " + ember.desc.subjectivePronoun + "'ll just say you're both going in the same direction.");
            if (incubationTime === 60) {
                DisplayText("\nThe egg inside your belly seems to grow heavier each day that passes.  ");
                // (If Corruption < 40)
                if (player.stats.cor < 40) DisplayText("It's quite a burden that you're carrying.  Still, it's a worthwhile sacrifice to make in order to restore Ember's race.");
                // (If Corruption >= 40)
                else if (player.stats.cor < 75) DisplayText("You wonder how much longer you have to wait.  This egg is quite burdensome.  Part of you is scared of its size, the other part is delighted to have produced such a big egg.");
                // If Corruption >= 75)
                else DisplayText("You're eager to give birth, just so you can get impregnated again.  Particularly because that means more wild sex with Ember.");
            }
            if (incubationTime === 30) {
                DisplayText("\nYou rub your hands over your ripe belly, lost in the sensations of motherhood.  ");
                player.stats.sens += 5;
                player.stats.lust += 5 + player.stats.sens / 20;
                // If Corruption < 40
                if (player.stats.cor < 40) DisplayText("Despite your initial reluctance, you've come to find a very real pleasure in being pregnant.  You hope Ember will want to have more children in the future...");
                // (If Corruption >= 40)
                else if (player.stats.cor < 75) DisplayText("You smile, knowing you'll have your egg in your hands the next few days.  A part of you is almost sad that you'll be empty, but you can always entice Ember into getting you pregnant again.");
                // (If Corruption >= 75)
                else {
                    DisplayText("You find yourself daydreaming about giving birth, your belly swollen huge - bigger than it currently is - and the orgasmic sensation of many large, round eggs sliding out of your [vagina].\n\nYou start to absently rub yourself as you envision eggs by the dozens coming from within you; you shall be mothergod for a whole new race of dragons...");
                    player.stats.lust += 35;
                }
                DisplayText("\n\nEmber interrupts your musings with a question.  \"<i>How are you feeling? Do you need me to get you anything?</i>\"");
                DisplayText("\n\nThe dragon's question is uncharacteristic of " + ember.desc.objectivePronoun + ".  Still, you do appreciate the attention you're getting, and so you ask Ember to fetch you some food and water.  The speed with which Ember dashes off to fulfill your requests is truly impressive!  In short moments Ember is back with a piece of roasted meat and a skin of water.");
                DisplayText("\n\nAs you eat and drink your fill, Ember uses one wing to shield you off the sun.  You're starting to really enjoy all the attention, but seeing Ember give up on " + ember.desc.possessivePronoun + " usual antics is still very weird.");
            }
        }
        // Pregnancy Notes: Live Birth
        else {
            if (incubationTime === 330) DisplayText("\nYour belly is a bit swollen - either you're eating too much or Ember's seed really did the job.");
            if (incubationTime === 250) DisplayText("\nYour belly grows ever bigger, making your pregnancy noticeable.  Ember shoots you quick looks, trying to hide " + ember.desc.possessivePronoun + " smirk of success every time " + ember.desc.subjectivePronoun + " does.  You smirk right back at " + ember.desc.objectivePronoun + ", and occasionally make a subtle show of your gravid form, just to see " + ember.desc.objectivePronoun + " get turned on by the sight.");
            if (incubationTime === 170) {
                DisplayText("\nYou've grown a lot, anyone is able to tell that you're pregnant with a single glance.  ");
                // If Corruption < 40
                if (player.stats.cor < 40) DisplayText("Part of you didn't really want to get knocked up.  However, Ember's look of satisfaction whenever " + ember.desc.subjectivePronoun + " gazes your way is rewarding despite that.  Plus, it is for a good cause.  You smirk in satisfaction - with a couple of dragons at your beck and call, things will look very different indeed.");
                // If Corruption >= 40
                else if (player.stats.cor < 75) DisplayText("You grin, savoring the strange, erotic sensations from the life inside your burgeoning womb and the promise of motherhood.  Mmm, if it feels this good, maybe you should \"<i>encourage</i>\" Ember to get you pregnant again.");
                else DisplayText("You think dreamily about the wild sex that helped conceive this little one.  Ember is such a great fuck. Really, you're doing this world a favor by bringing more of Ember's offspring into it.");
            }
            if (incubationTime === 120) {
                DisplayText("\nEvery once in awhile, you feel a kick from inside your bulging belly.  Right now, it's really kicking up a storm, and so you decide to sit down and take it easy.  You keep rubbing your belly, hoping to calm your child down and make it stop battering your innards.");
                DisplayText("\n\nEmber approaches you, and casually asks, \"<i>So... is it kicking already?</i>\"");
                DisplayText("\n\nYou admit that it is, stroking your stomach.  Casually, you ask if Ember would maybe like to touch your belly, wondering if " + ember.desc.subjectivePronoun + " will be able to bring " + ember.desc.objectivePronoun + "self to do it.");
                DisplayText("\n\n\"<i>Yes! Of course!</i>\" Ember replies");
                if (Flags.list[FlagEnum.EMBER_ROUNDFACE] === 1) DisplayText(", blush at " + ember.desc.possessivePronoun + " own over-enthusiastic reply");
                DisplayText(".  You just smile encouragingly at the dragon " + GenderDescriptor.genderText(ember.gender, "-boy", "herm") + " and lean back slightly, sticking out your gravid midriff in open encouragement to its " + GenderDescriptor.genderText(ember.gender, "father", "mother") + " to try and connect with " + ember.desc.possessivePronoun + " unborn child.");
                DisplayText("\n\nEmber sets a clawed hand on your belly, careful not to hurt you with " + ember.desc.possessivePronoun + " claws.  Slowly " + ember.desc.subjectivePronoun + " rubs your belly, until " + ember.desc.subjectivePronoun + " feels a small kick and smiles in glee.  You smile at the look of joy on " + ember.desc.possessivePronoun + " face, even as " + ember.desc.subjectivePronoun + " realizes what " + ember.desc.subjectivePronoun + "'s doing and embarrassedly mumbles an excuse and walks away.");
            }
            if (incubationTime === 90) {
                DisplayText("\nYou stop for a moment and sit down on a nearby rock.  Your belly feels much heavier than usual, and just walking about has become a chore.  Ember takes notice of your tiredness and quickly closes the distance between you two.  \"<i>[name], are you feeling all right?</i>\"");
                DisplayText("\n\nYou tell " + ember.desc.objectivePronoun + " that you are, just worn out.  It's not easy carrying " + ember.desc.possessivePronoun + " child, after all.");
                DisplayText("\n\nEmber sighs in relief.  \"<i>Good, is there anything I can do for you?</i>\"");
                DisplayText("\n\nYou tap your lips thoughtfully, mulling it over.  ");
                // (Low Corruption)
                if (player.stats.cor <= 33) DisplayText("There really isn't anything you feel like you need right now... maybe some water?  Or maybe you could have Ember help you to your tent for a quick rest?");
                // (Medium Corruption)
                else if (player.stats.cor <= 66) DisplayText("You wonder if you should take advantage of Ember - you've certainly been feeling a little on edge lately, and besides " + ember.desc.subjectivePronoun + " did say 'anything'.  You ponder this for a while longer.");
                // High Corruptio
                else DisplayText("You  already thought up a perfect way for this sexy dragon to help you, but it's best not to rush.  It's not everyday that Ember says " + ember.desc.subjectivePronoun + "'ll do 'anything' for you.  A quick jab on your belly from your unborn child makes you recoil a bit though.  Maybe it would be better to wait until this little one is out of you, just so you can have another.  You ponder what to ask of " + ember.desc.objectivePronoun + " a while longer.");
                DisplayText("\n\nFinally, you decide there really isn't anything Ember can help you with, and tell " + ember.desc.objectivePronoun + " so.  Though " + ember.desc.subjectivePronoun + " had better be ready to do " + ember.desc.possessivePronoun + " part when the baby is born and needs caring.");
                if (Flags.list[FlagEnum.EMBER_GENDER] === 1 && Flags.list[FlagEnum.EMBER_MILK] > 0) DisplayText("  You can't resist smirking and patting one of your shemale dragon's bountiful breasts, noting that maybe you should let him do all the breast-feeding.");

                DisplayText("\n\n");
                if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) DisplayText("Ember blushes.  ");
                DisplayText("\"<i>O-of course I'll do my part.  If you don't need me for anything, I'll be going then.</i>\" " + Utils.capFirstLetter(ember.desc.subjectivePronoun) + " turns on " + ember.desc.possessivePronoun + " heels and walks away.  You watch " + ember.desc.objectivePronoun + " go, pat yourself on the stomach, then painstakingly hoist yourself back upright and go on your way.\n");
            }
            if (incubationTime === 60) {
                DisplayText("\nBesides being so huge you'd probably be asked if you were having twins back in Ingnam, your belly has grown stupidly heavy, ");
                if (player.stats.cor <= 33) DisplayText("making you wonder more than ever if it really was a good idea to get pregnant with a dragon.  True, Ember looks ready to burst with pride at your fruitful bounty, but you feel ready to just plain burst yourself.\n");
                else if (player.stats.cor <= 66) DisplayText("and you wonder how much longer you have to wait.  Despite being a bit bothersome, you're pleased your child is growing into a healthy, hopefully sexy, dragon; like its father.\n");
                else DisplayText("and you're eager to give birth, so you can get impregnated again.  Particularly because that means more rowdy fucking from Ember.\n");
            }
            if (incubationTime === 30) {
                DisplayText("\nYou rub your hands over your gloriously full, ripe belly, lost in the sensations of motherhood.  ");
                if (player.stats.cor <= 33) DisplayText("Despite your initial reluctance, you've come to find a very real pleasure in being pregnant.  You hope Ember will want to have more children in the future.\n");
                else if (player.stats.cor <= 66) DisplayText("You smile, knowing you'll meet your child in the next few days.  A part of you is almost sad that you'll be empty, but you can always entice Ember into getting you pregnant again.\n");
                else DisplayText("You find yourself daydreaming about being the revered mother-queen of a huge army of dragons, visions of magnificent, sexy, scaly beasts sweeping across the land conquering it in your honor, offering up tribute to the ever-ripe womb that brought them forth; rolling around, as the musk of their fucking fills the air.  The image is so delicious you don't want to wake up from your fantasy.\n");
            }
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        emberScene.giveBirthToEmberKids();
    }
}
