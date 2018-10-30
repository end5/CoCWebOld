import { ItemDrop } from './ItemDrop';
import { Item } from '../../Items/Item';

export class ChainedDrop implements ItemDrop {
    private items: Item[] = [];
    private probs: number[] = [];
    private defaultItem: Item;

    constructor(defaultItem: Item) {
        this.defaultItem = defaultItem;
    }

    public add(item: Item, prob: number): ChainedDrop {
        if (prob < 0 || prob > 1) {
            console.error("Invalid probability value " + prob);
        }
        this.items.push(item);
        this.probs.push(prob);
        return this;
    }

    public elseDrop(item: Item): ChainedDrop {
        this.defaultItem = item;
        return this;
    }

    public roll(): Item {
        for (let i = 0; i < this.items.length; i++) {
            if (Math.random() < this.probs[i]) return this.items[i];
        }
        return this.defaultItem;
    }
}
