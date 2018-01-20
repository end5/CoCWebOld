import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import DisplayText from '../../display/DisplayText';
import NeonPinkEgg from '../../Items/Consumables/NeonPinkEgg';
import Player from '../Player';

export default class BunnyButtPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 800) {
            DisplayText("\nYour gut gurgles strangely.\n");
        }
        if (incubationTime === 785) {
            new NeonPinkEgg(true).use(player);
            DisplayText().newline();
        }
        if (incubationTime === 776) {
            DisplayText("\nYour gut feels full and bloated.\n");
        }
        if (incubationTime === 765) {
            new NeonPinkEgg(true).use(player);
            DisplayText().newline();
        }
        if (incubationTime === 745) {
            DisplayText("\nAfter dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your ass have dissolved.\n").bold();
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
    }
}
