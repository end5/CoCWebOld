import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import DisplayText from '../../display/DisplayText';
import Player from '../Player';

export default class FrogGirlPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 8) {
            // Egg Maturing
            if (player.torso.vaginas.count > 0) {
                DisplayText("\nYour gut churns, and with a squelching noise, a torrent of transparent slime gushes from your [vagina].  You immediately fall to your knees, landing wetly amidst the slime.  The world around briefly flashes with unbelievable colors, and you hear someone giggling.\n\nAfter a moment, you realize that it's you.");
                // pussy:
                if (player.torso.vaginas.count > 0) DisplayText("  Against your [vagina], the slime feels warm and cold at the same time, coaxing delightful tremors from your [clit].");
                // [balls:
                else if (player.torso.balls.quantity > 0) DisplayText("  Slathered in hallucinogenic frog slime, your balls tingle, sending warm pulses of pleasure all the way up into your brain.");
                // genderless:
                else DisplayText("  Your [vagina] begins twitching, aching for something to push through it over and over again.");
                DisplayText("  Seated in your own slime, you moan softly, unable to keep your hands off yourself.");
                player.stats.lustNoResist = 100;
                // dynStats("lus=", 100, "resisted", false);
            }
            else {
                DisplayText("\nYour gut churns, but after a moment it settles. Your belly does seem a bit bigger and more gravid afterward, like you're filling up with fluid without any possible vent. You suddenly wonder if losing your pussy was such a great idea.");
            }
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        bog.frogGirlScene.layFrogEggs();
    }
}
