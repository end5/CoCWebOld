import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import Player from '../Player';

export default class PregUrta implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.sceneManager.urtaPregs.urtaPregooUpdates();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        urtaPregs.PCGivesBirf();
    }
}
