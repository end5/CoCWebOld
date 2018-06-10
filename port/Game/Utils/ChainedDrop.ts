import { RandomDrop } from './RandomDrop';
import { CoC_Settings } from '../CoC_Settings';

/**
 * Created by aimozg on 11.01.14.
 */
export class ChainedDrop implements RandomDrop {
    private items: Array<any> = [];
    private probs: Array<number> = [];
    private defaultItem: any;
    public constructor(defaultItem: any = null) {
        this.defaultItem = defaultItem;
    }
    public add(item: any, prob: number): ChainedDrop {
        if (prob < 0 || prob > 1) {
            CoC_Settings.error("Invalid probability value " + prob);
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
        for (var i: number = 0; i < this.items.length; i++) {
            if (Math.random() < this.probs[i]) return this.items[i];
        }
        return this.defaultItem;
    }
}
