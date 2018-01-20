import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import DisplayText from '../../display/DisplayText';
import Player from '../Player';

export default class ButtPregSatyr implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        // Stage 1:
        if (incubationTime === 150) {
            DisplayText("\nYou find that you're feeling quite sluggish these days; you just don't have as much energy as you used to.  You're also putting on weight.\n").bold();
        }
        // Stage 2:
        if (incubationTime === 125) {
            DisplayText("\nYour belly is getting bigger and bigger.  Maybe your recent urges are to blame for this development?\n").bold();
        }
        // Stage 3:
        if (incubationTime === 100) {
            DisplayText("\nYou can feel the strangest fluttering sensations in your distended belly; it must be a pregnancy.  You should eat more and drink plenty of wine so your baby can grow properly.  Wait, wine...?\n").bold();
        }
        // Stage 4:
        if (incubationTime === 75) {
            DisplayText("\nSometimes you feel a bump in your pregnant belly.  You wonder if it's your baby complaining about your moving about.\n").bold();
        }
        // Stage 5:
        if (incubationTime === 50) {
            DisplayText("\nWith your bloating gut, you are loathe to exert yourself in any meaningful manner; you feel horny and hungry all the time...\n").bold();
            // temp min lust up +5
        }
        // Stage 6:
        if (incubationTime === 30) {
            DisplayText("\nThe baby you're carrying constantly kicks your belly in demand for food and wine, and you feel sluggish and horny.  You can't wait to birth this little one so you can finally rest for a while.\n").bold();
            // temp min lust up addl +5
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        plains.satyrScene.satyrBirth(false);
    }
}
