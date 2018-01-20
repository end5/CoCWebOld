import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import DisplayText from '../../display/DisplayText';
import Player from '../Player';

export default class PregDrider implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.sceneManager.bog.phoukaScene.phoukaPregUpdate();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        swamp.corruptedDriderScene.driderPregVagBirth();
    }
}
