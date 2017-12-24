import BreastRow from './BreastRow';
import Nipple from './Nipple';
import SerializableList from '../Utilities/SerializableList';

export default class Chest extends SerializableList<BreastRow> {
    public constructor() {
        super(new BreastRow().deserialize);
    }

    public add(newBreastRow: BreastRow) {
        if (this.list.length >= 10)
            return;
        this.list.push(newBreastRow);
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

    public averageNippleLength(): number {
        return this.reduce(BreastRow.AverageRating, 0) / 10 + 0.2;
    }
}
