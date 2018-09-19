import { BreastRow } from './BreastRow';
import { ObservableList } from '../Utilities/ObservableList';

export class Chest extends ObservableList<BreastRow> {
    public add(newBreastRow: BreastRow) {
        if (this.list.length < 10)
            this.list.push(newBreastRow);
    }

    public remove(index: number) {
        if (this.count - 1 >= 1)
            super.remove(index);
    }

    public lactationSpeed(): number {
        // Lactation * breastSize x 10 (milkPerBreast) determines scene
        return this.sort(BreastRow.LactationMost)[0].lactationMultiplier * this.sort(BreastRow.Largest)[0].rating * 10;
    }
}
