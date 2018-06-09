import { RandomDrop } from './RandomDrop';

/**
 * Created by aimozg on 11.01.14.
 */
export class WeightedDrop implements RandomDrop {
    private items: Array<any> = [];
    private sum: number = 0;
    public WeightedDrop(first: any = null, firstWeight: number = 0) {
        if (first != null) {
            this.items.push([first, firstWeight]);
            this.sum += firstWeight;
        }
    }
    public add(item: any, weight: number = 1): WeightedDrop {
        this.items.push([item, weight]);
        this.sum += weight;
        return this;
    }
    public addMany(weight: number, ..._items): WeightedDrop {
        for (var item of _items) {
            this.items.push([item, weight]);
            this.sum += weight;
        }
        return this;
    }
    // you can pass your own random value from 0 to 1 (so you can use your own RNG)
    public roll(): any {
        var random: number = Math.random() * this.sum;
        var item: any = null;
        while (random > 0 && this.items.length > 0) {
            var pair: Array<any> = this.items.shift();
            item = pair[0];
            random -= pair[1];
        }
        return item;
    }

    public clone(): WeightedDrop {
        var other: WeightedDrop = new WeightedDrop();
        other.items = this.items.slice();
        other.sum = this.sum;
        return other;
    }
}
