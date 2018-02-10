import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import Game from '../../Game/Game';
import Player from '../Player';

export default class BenoitPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        Game.scenes.bog.phoukaScene.phoukaPregUpdate();
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        if (Game.time.hour !== 5 && Game.time.hour !== 6) {
            if (player.pregnancy.womb.isPregnantWith(PregnancyType.BENOIT)) {
                const thisPreg = player.pregnancy.womb.pregnancy;
                player.pregnancy.womb.pregnancy.incubation = 3; // Make sure eggs are only birthed early in the morning
            }
        }
        else {
            bazaar.benoit.popOutBenoitEggs();
        }
    }
}
