import DisplayText from '../../../display/DisplayText';
import NeonPinkEgg from '../../../Items/Consumables/NeonPinkEgg';
import Player from '../../../Player/Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class BunnyButtPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 800) {
            DisplayText.text("\nYour gut gurgles strangely.\n");
        }
        if (incubationTime == 785) {
            new NeonPinkEgg(true).use(player);
            DisplayText.text("\n");
        }
        if (incubationTime == 776) {
            DisplayText.text("\nYour gut feels full and bloated.\n");
        }
        if (incubationTime == 765) {
            new NeonPinkEgg(true).use(player);
            DisplayText.text("\n");
        }
        if (incubationTime == 745) {
            DisplayText.text("\n<b>After dealing with the discomfort and bodily changes for the past day or so, you finally get the feeling that the eggs in your ass have dissolved.</b>\n");
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
    }
}