import MainScreen from '../../../display/MainScreen';
import NeonPinkEgg from '../../../Items/Consumables/NeonPinkEgg';
import Player from '../../../Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class BunnyButtPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 800) {
            MainScreen.text("\nYour gut gurgles strangely.\n", false);
        }
        if (incubationTime == 785) {
            new NeonPinkEgg(true).use(player);
            MainScreen.text("\n", false);
        }
        if (incubationTime == 776) {
            MainScreen.text("\nYour gut feels full and bloated.\n", false);
        }
        if (incubationTime == 765) {
            new NeonPinkEgg(true).use(player);
            MainScreen.text("\n", false);
        }
        if (incubationTime == 745) {
            MainScreen.text("\n<b>After dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your ass have dissolved.</b>\n", false);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
    }
}