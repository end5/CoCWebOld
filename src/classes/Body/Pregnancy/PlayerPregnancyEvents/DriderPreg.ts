import MainScreen from '../../../display/MainScreen';
import Player from '../../../Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class PregDrider implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.sceneManager.bog.phoukaScene.phoukaPregUpdate();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        swamp.corruptedDriderScene.driderPregVagBirth();
    }
}