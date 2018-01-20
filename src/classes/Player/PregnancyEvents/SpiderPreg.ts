import GenericPregnancyChanges from './GenericPregnancyChanges';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import DisplayText from '../../display/DisplayText';
import Player from '../Player';

export default class PregSpider implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 399) {
            DisplayText("\nAfter your session with the spider, you feel much... fuller.  There is no outward change on your body as far as you can see but your womb feels slightly tingly whenever you move.  Hopefully it's nothing to be alarmed about.\n").bold();
        }
        if (incubationTime === 275) {
            DisplayText("\nYour belly grumbles as if empty, even though you ate not long ago.  Perhaps with all the exercise you're getting you just need to eat a little bit more.\n").bold();
        }
        if (incubationTime === 250) {
            DisplayText("\nYour belly looks a little pudgy").bold();
            if (player.thickness > 60 && player.tone < 40) DisplayText(" even for you").bold();
            DisplayText(", maybe you should cut back on all the food you've been consuming lately?\n").bold();
        }
        if (incubationTime === 216) {
            DisplayText("\nYour belly is definitely getting bigger, and no matter what you do, you can't seem to stop yourself from eating at the merest twinge of hunger.  The only explanation you can come up with is that you've gotten pregnant during your travels.  Hopefully it won't inconvenience your adventuring.\n").bold();
        }
        if (incubationTime === 180) {
            DisplayText("\nA hot flush works its way through you, and visions of aroused ").bold();
            if (player.pregnancy.womb.isPregnantWith(PregnancyType.SPIDER)) DisplayText("spider-morphs ").bold();
            else DisplayText("driders ").bold();
            DisplayText("quickly come to dominate your thoughts.  You start playing with a nipple while you lose yourself in the fantasy, imagining being tied up in webs and mated with over and over, violated by a pack of horny males, each hoping to father your next brood.  You shake free of the fantasy and notice your hands rubbing over your slightly bloated belly.  Perhaps it wouldn't be so bad?\n").bold();
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 20;
        }
        if (incubationTime === 120) {
            DisplayText("\nYour belly has gotten nice and big, perhaps as big as you remember the bellies of the pregnant women back home being.  The elders always did insist on everyone doing their part to keep the population high enough to sustain the loss of a champion every year.  You give yourself a little hug, getting a surge of happiness from your hormone-addled body.  Pregnancy sure is great!\n").bold();
        }
        if (incubationTime === 72) {
            DisplayText("\nThe huge size of your pregnant belly constantly impedes your movement, but the constant squirming and shaking of your unborn offspring makes you pretty sure you won't have to carry them much longer.  A sense of motherly pride wells up in your breast - you just know you'll have such wonderful babies.").bold();
            if (player.stats.cor < 50) DisplayText("  You shudder and shake your head, wondering why you're thinking such unusual things.");
            DisplayText("\n").bold();
        }
        if (incubationTime === 32 || incubationTime === 64 || incubationTime === 85 || incubationTime === 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        swamp.maleSpiderMorphScene.spiderPregVagBirth();
    }
}
