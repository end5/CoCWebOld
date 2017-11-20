import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import Player from '../Player';

export default class PregSandWitch implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.sceneManager.sandPregUpdate();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        birthAWitch();
    }
}