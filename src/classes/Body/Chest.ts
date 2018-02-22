import BreastRow from './BreastRow';
import ObservableList from '../Utilities/ObservableList';

export default class Chest extends ObservableList<BreastRow> {
    public add(newBreastRow: BreastRow) {
        if (this.list.length < 10)
            this.list.push(newBreastRow);
    }

    public remove(index: number) {
        if (this.count - 1 >= 1)
            super.remove(index);
    }

    public countBreasts(): number {
        return this.list.length * 2;
    }

    public countNipples(): number {
        let total: number = 0;
        for (const breastRow of this.list)
            total += breastRow.nipples.count * 2;
        return total;
    }

    public lactationSpeed(): number {
        // Lactation * breastSize x 10 (milkPerBreast) determines scene
        return this.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier * this.sort(BreastRow.BreastRatingLargest)[0].rating * 10;
    }
}
