import Player from '../../Player/Player';
import { ClickFunction } from '../Elements/ButtonElement';

export default interface Menu {
    /**
     * Display stuff on the main screen.
     */
    display(player?: Player, prevMenu?: ClickFunction);
}