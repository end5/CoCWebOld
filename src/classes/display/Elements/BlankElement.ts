import ScreenElement from './ScreenElement';

export default class BlankElement extends ScreenElement {
    protected create(): HTMLElement {
        return document.createElement('div');
    }
}