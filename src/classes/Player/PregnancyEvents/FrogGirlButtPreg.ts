import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import DisplayText from '../../display/DisplayText';
import Player from '../Player';

export default class FrogGirlButtPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 8) {
            //Egg Maturing
            DisplayText.text("\nYour gut churns, and with a squelching noise, a torrent of transparent slime gushes from your ass.  You immediately fall to your knees, landing wetly amidst the slime.  The world around briefly flashes with unbelievable colors, and you hear someone giggling.\n\nAfter a moment, you realize that it�s you.");
            //pussy:
            if (player.lowerBody.vaginaSpot.hasVagina()) DisplayText.text("  Against your [vagina], the slime feels warm and cold at the same time, coaxing delightful tremors from your [clit].");
            //[balls:
            else if (player.lowerBody.balls > 0) DisplayText.text("  Slathered in hallucinogenic frog slime, your balls tingle, sending warm pulses of pleasure all the way up into your brain.");
            //[cock:
            else if (player.lowerBody.cockSpot.hasCock()) DisplayText.text("  Splashing against the underside of your " + CockDescriptor.describeMultiCockShort(player) + ", the slime leaves a warm, oozy sensation that makes you just want to rub [eachCock] over and over and over again.");
            //genderless: 
            else DisplayText.text("  Your asshole begins twitching, aching for something to push through it over and over again.");
            DisplayText.text("  Seated in your own slime, you moan softly, unable to keep your hands off yourself.");
            player.stats.lustNoResist = 100;
            //dynStats("lus=", 100, "resisted", false);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        bog.frogGirlScene.birthFrogEggsAnal();
    }
}