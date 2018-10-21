import { ItemDrop } from './ItemDrop';
import { Item } from '../../Items/Item';

export class WeightedDrop implements ItemDrop {
    private items: [Item, number][] = [];
    private sum: number = 0;

    public constructor(first: Item, firstWeight: number = 0) {
        if (first) {
            this.items.push([first, firstWeight]);
            this.sum += firstWeight;
        }
    }

    public add(item: Item, weight: number = 1): WeightedDrop {
        this.items.push([item, weight]);
        this.sum += weight;
        return this;
    }

    public addMany(weight: number, ...items: Item[]): WeightedDrop {
        for (const item of items) {
            this.items.push([item, weight]);
            this.sum += weight;
        }
        return this;
    }

    // you can pass your own random value from 0 to 1 (so you can use your own RNG)
    public roll(): Item | undefined {
        let random = Math.random() * this.sum;
        let item: Item | undefined;
        while (random > 0 && this.items.length > 0) {
            const pair = this.items.shift();
            if (pair) {
                item = pair[0];
                random -= pair[1];
            }
        }
        return item;
    }

    /*
    public clone():WeightedDrop
    {
        let other:WeightedDrop = new WeightedDrop();
        other.items = this.items.slice();
        other.sum = this.sum;
        return other;
    }*/
}
