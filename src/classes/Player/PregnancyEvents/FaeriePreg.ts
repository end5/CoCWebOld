import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class FaeriePreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.sceneManager.bog.phoukaScene.phoukaPregUpdate();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        Game.sceneManager.bog.phoukaScene.phoukaPregBirth();
    }
}