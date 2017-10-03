import DisplayEvent from "./DisplayEvent";

export default class DisplayEventHandler {
    private displayEvents: DisplayEvent[];

    public constructor() {
        this.displayEvents = [];
    }

    public add(displayEvent: DisplayEvent) {
        this.displayEvents.push(displayEvent);
    }

    public processEvents() {
        for (let index: number = 0; index < this.displayEvents.length; index++) {
            this.displayEvents[index].display();
        }
    }
}