import BreastRow from './BreastRow';
import Nipple from './Nipple';
import SerializableList from '../Utilities/SerializableList';

export default class Chest extends SerializableList<BreastRow> {
    public constructor() {
        super(BreastRow);
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
        for (let index = 0; index < this.list.length; index++)
            total += this.list[index].nipples.count * 2;
        return total;
    }

    public lactationSpeed(): number {
        //Lactation * breastSize x 10 (milkPerBreast) determines scene
        return this.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier * this.sort(BreastRow.BreastRatingLargest)[0].rating * 10;
    }
    
    public hasNipples(): boolean {
        for (let index = 0; index < this.list.length; index++)
            if (this.list[index].nipples.count > 0)
                return true;
        return false;
    }

    public hasFuckableNipples(): boolean {
        return this.filter(BreastRow.Fuckable).length > 0;
    }

    public hasBreasts(): boolean {
        return this.list.length > 0 ? true : false;
    }

    public hasFemaleBreasts(): boolean {
        if (this.list.length > 0) {
            if (this.sort(BreastRow.BreastRatingLargest)[0].rating >= 1)
                return true;
        }
        return false;
    }

    // Averages ------ V

    public averageBreastSize(): number {
        let total: number = 0;
        for (let index = 0; index < this.list.length; index++)
            total += this.list[index].rating;
        return (total / this.list.length);
    }

    public averageLactation(): number {
        if (this.list.length == 0)
            return 0;
        let total: number = 0;
        for (let index = 0; index < this.list.length; index++)
            total += this.list[index].lactationMultiplier;
        return Math.floor(total / this.list.length);
    }

    public averageNippleLength(): number {
        return this.averageBreastSize() / 10 + 0.2;
    }

    public averageNipplesPerBreast(): number {
        if (this.list.length == 0)
            return 0;
        let total: number = 0;
        for (let index = 0; index < this.list.length; index++)
            total += this.list[index].nipples.count;
        return total / this.list.length;
    }

    public canTitFuck(): boolean {
        for (let index = 0; index < this.list.length; index++)
            if (this.list[index].rating > 3)
                return true;
        return false;
    }
}