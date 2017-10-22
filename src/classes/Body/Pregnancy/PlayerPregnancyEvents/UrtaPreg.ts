import Player from '../../../Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class PregUrta implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.sceneManager.urtaPregs.urtaPregooUpdates();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        urtaPregs.PCGivesBirf();
    }
}