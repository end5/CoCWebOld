import ScreenElement from './ScreenElement';
import Game from '../../Game/Game';
import Player from '../../Player/Player';


export interface ClickFunction {
    (player: Player): void;
}

interface EventFunction {
    (event: Event): void;
}

export default class ButtonElement extends ScreenElement {
    private clickFunc: EventFunction;
    public modify(text: string, clickFunc: ClickFunction, disabled: boolean = false) {
            this.show();
            this.htmlElement.textContent = text;
            this.htmlElement.removeEventListener('click', this.clickFunc);
            this.clickFunc = function (evnt: Event) {
                clickFunc(Game.player);
            };
            this.htmlElement.addEventListener('click', this.clickFunc);
    }
}