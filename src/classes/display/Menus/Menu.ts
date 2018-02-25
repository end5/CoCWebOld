import Character from '../../Character/Character';
import { ClickFunction } from '../Elements/ButtonElement';

export default interface Menu {
    /**
     * Display stuff on the main screen.
     */
    display(character?: Character, prevMenu?: ClickFunction);
}
