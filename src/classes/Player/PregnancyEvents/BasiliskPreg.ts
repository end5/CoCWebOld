import GenericPregnancyChanges from './GenericPregnancyChanges';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import DisplayText from '../../display/DisplayText';
import Player from '../Player';

export default class BasiliskPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 185) {
            DisplayText.text("\n<b>Your belly grumbles as if empty, even though you ate not long ago.  Perhaps with all the exercise you're getting you just need to eat a little bit more.</b>\n");
        }
        if (incubationTime == 160) {
            DisplayText.text("\n<b>Your belly looks a little pudgy");
            if (player.thickness > 60 && player.tone < 40) DisplayText.text(" even for you");
            DisplayText.text(", maybe you should cut back on all the food you've been consuming lately?</b>\n");
        }
        if (incubationTime == 140) {
            DisplayText.text("\n<b>Your belly is definitely getting bigger, and no matter what you do, you can't seem to stop yourself from eating at the merest twinge of hunger.  The only explanation you can come up with is that you've gotten pregnant during your travels.  Hopefully it won't inconvenience your adventuring.</b>\n");
        }
        if (incubationTime == 110) {
            DisplayText.text("\n<b>Your belly has gotten nice and big, perhaps as big as you remember the bellies of the pregnant women back home being.  The elders always did insist on everyone doing their part to keep the population high enough to sustain the loss of a champion every year.  You give yourself a little hug, getting a surge of happiness from your hormone-addled body.  Pregnancy sure is great!</b>\n");
        }
        if (incubationTime == 72) {
            DisplayText.text("\n<b>The huge size of your pregnant belly constantly impedes your movement, but the constant squirming and shaking of your unborn offspring makes you pretty sure you won't have to carry them much longer.  A sense of motherly pride wells up in your breast - you just know you'll have such wonderful babies.");
            if (player.stats.cor < 50) DisplayText.text("  You shudder and shake your head, wondering why you're thinking such unusual things.");
            DisplayText.text("</b>\n");
        }
        if (incubationTime == 32 || incubationTime == 64 || incubationTime == 85 || incubationTime == 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        highMountains.basiliskScene.basiliskBirth();
    }
}