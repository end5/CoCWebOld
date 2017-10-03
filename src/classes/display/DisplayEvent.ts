export default class DisplayEvent {
    private eventFunc: (func?: object) => void;
    private eventData: object;

    public constructor(eventFunc: (func: object) => void, eventData: object) {
        this.eventFunc = eventFunc;
        this.eventData = eventData;
    }

    public display() {
        this.eventFunc(this.eventData);
    }
}