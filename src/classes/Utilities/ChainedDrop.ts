import RandomDrop from './RandomDrop';

export default class ChainedDrop implements RandomDrop {
    private items: any[] = [];
    private probs: number[] = [];
    private defaultItem: any;

    constructor(defaultItem: any = null) {
        this.defaultItem = defaultItem;
    }

    public add(item: any, prob: number): ChainedDrop {
        if (prob < 0 || prob > 1) {
            console.error("Invalid probability value " + prob);
        }
        this.items.push(item);
        this.probs.push(prob);
        return this;
    }
    public elseDrop(item: any): ChainedDrop {
        this.defaultItem = item;
        return this;
    }

    public roll(): any {
        for (let i = 0; i < this.items.length; i++) {
            if (Math.random() < this.probs[i]) return this.items[i];
        }
        return this.defaultItem;
    }
}
