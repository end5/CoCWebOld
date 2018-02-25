import ScreenElement from './ScreenElement';
import Character from '../../Character/Character';
import Game from '../../Game/Game';

export type ClickFunction = (activeCharacter: Character, event?: Event, prevMenu?: ClickFunction) => void;

type EventFunction = (event: Event) => void;

export default class ButtonElement extends ScreenElement {
    private static textColorActive = "Black";
    private static textColorInactive = "DarkGrey";
    private clickFunc: EventFunction;
    private lock: boolean = false;

    public constructor() {
        super();
        this.htmlElement = document.createElement('a');
    }

    /**
     * Modifies the text and click function in the button and shows the button.
     * @param text The text that appears on the button.
     * @param clickFunc The function that is called when clicked.
     * @param disable Whether or not the button should be clickable.
     */
    public modify(text: string, clickFunc: ClickFunction, disable: boolean = false) {
        this.htmlElement.textContent = text;

        this.disable();
        this.clickFunc = (evnt: Event) => {
            clickFunc(Game.player, evnt, clickFunc);
        };
        if (!disable)
            this.enable();

        this.show();
    }

    public enable() {
        if (!this.lock) {
            this.lock = true;
            this.htmlElement.addEventListener('click', this.clickFunc);
            this.htmlElement.style.color = ButtonElement.textColorActive;
        }
    }

    public disable() {
        if (this.lock) {
            this.lock = false;
            this.htmlElement.removeEventListener('click', this.clickFunc);
            this.htmlElement.style.color = ButtonElement.textColorInactive;
        }
    }
}
