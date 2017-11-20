import Game from '../../../Game/Game';
import Player from '../../../Player/Player';
import IPregnancyEvent from '../IPregnancyEvent';

export default class BenoitPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.sceneManager.bog.phoukaScene.phoukaPregUpdate();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        if (model.time.hours != 5 && model.time.hours != 6) {
            player.knockUpForce(player.pregnancyType, 3); //Make sure eggs are only birthed early in the morning
        }
        else {
            bazaar.benoit.popOutBenoitEggs();
        }
    }
}