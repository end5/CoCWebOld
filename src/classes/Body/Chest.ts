﻿import BreastRow from './BreastRow';
import { SerializeInterface } from '../SerializeInterface';

export default class Chest implements SerializeInterface {
    private breastRows: BreastRow[];

    public constructor() {
        this.breastRows = [];
    }

    public add(newBreastRow: BreastRow): boolean {
        if (this.breastRows.length >= 10)
            return false;
        this.breastRows.push(newBreastRow);
        return true;
    }

    public remove(breastRow: BreastRow): void {
        let index: number = this.breastRows.indexOf(breastRow);
        if (index >= 0)
            this.breastRows.splice(index);
    }

    public get(index: number): BreastRow {
        return index >= 0 && index < this.breastRows.length ? this.breastRows[index] : null;
    }

    public count(): number {
        return this.breastRows.length;
    }

    public countBreasts(): number {
        let total: number = 0;
        for (let index = 0; index < this.breastRows.length; index++)
            total += this.breastRows[index].breasts;
        return total;
    }

    public countNipples(): number {
        let total: number = 0;
        for (let index = 0; index < this.breastRows.length; index++)
            total += this.breastRows[index].nipplesPerBreast * this.breastRows[index].breasts;
        return total;
    }

    public lactationSpeed(): number {
        //Lactation * breastSize x 10 (milkPerBreast) determines scene
        return this.LactationMultipierLargest[0].lactationMultiplier * this.BreastRatingLargest[0].breastRating * 10;
    }

    // Sorted -------- V

    public get BreastRatingLargest(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return a.breastRating - b.breastRating;
        });
    }

    public get BreastRatingSmallest(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return b.breastRating - a.breastRating;
        });
    }

    public get LactationMultipierLargest(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return a.lactationMultiplier - b.lactationMultiplier;
        });
    }

    public get LactationMultipierSmallest(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return b.lactationMultiplier - a.lactationMultiplier;
        });
    }

    public get MilkFullnessMost(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return a.milkFullness - b.milkFullness;
        });
    }

    public get MilkFullnessLeast(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return b.milkFullness - a.milkFullness;
        });
    }

    public get FullnessMost(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return a.fullness - b.fullness;
        });
    }

    public get FullnessLeast(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return b.fullness - a.fullness;
        });
    }

    public get NipplesPerBreastMost(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return a.nipplesPerBreast - b.nipplesPerBreast;
        });
    }

    public get NipplesPerBreastLeast(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return b.nipplesPerBreast - a.nipplesPerBreast;
        });
    }

    public get NumOfBreastsLargest(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return a.breasts - b.breasts;
        });
    }

    public get NumOfBreastsSmallest(): BreastRow[] {
        return this.breastRows.slice().sort((a: BreastRow, b: BreastRow) => {
            return b.breasts - a.breasts;
        });
    }

    public get Fuckable(): BreastRow[] {
        return this.breastRows.filter((a: BreastRow) => {
            if (a.fuckable)
                return a;
        });
    }

    public get NotFuckable(): BreastRow[] {
        return this.breastRows.filter((a: BreastRow) => {
            if (!a.fuckable)
                return a;
        });
    }

    // Has ----------- V

    public hasNipples(): boolean {
        for (let index = 0; index < this.breastRows.length; index++)
            if (this.breastRows[index].nipplesPerBreast > 0)
                return true;
        return false;
    }

    public hasFuckableNipples(): boolean {
        for (let index = 0; index < this.breastRows.length; index++)
            if (this.breastRows[index].fuckable)
                return true;
        return false;
    }

    public hasBreasts(): boolean {
        return this.breastRows.length > 0 ? true : false;
        /*
        if (this.breastRows.length > 0) {
            if (this.BreastRatingLargest[0].breastRating >= 1)
                return true;
        }
        return false;*/
    }

    public hasFemaleBreasts(): boolean {
        if (this.breastRows.length > 0) {
            if (this.BreastRatingLargest[0].breastRating >= 1)
                return true;
        }
        return false;
    }

    // Averages ------ V

    public averageBreastSize(): number {
        let total: number = 0;
        for (let index = 0; index < this.breastRows.length; index++)
            total += this.breastRows[index].breastRating;
        return (total / this.breastRows.length);
    }

    public averageLactation(): number {
        if (this.breastRows.length == 0)
            return 0;
        let total: number = 0;
        for (let index = 0; index < this.breastRows.length; index++)
            total += this.breastRows[index].lactationMultiplier;
        return Math.floor(total / this.breastRows.length);
    }

    public averageNippleLength(): number {
        return this.averageBreastSize() / 10 + 0.2;
    }

    public averageNipplesPerBreast(): number {
        if (this.breastRows.length == 0)
            return 0;
        let total: number = 0;
        for (let index = 0; index < this.breastRows.length; index++)
            total += this.breastRows[index].nipplesPerBreast;
        return total / this.breastRows.length;
    }

    public canTitFuck(): boolean {
        for (let index = 0; index < this.breastRows.length; index++)
            if (this.breastRows[index].breasts >= 2 && this.breastRows[index].breastRating > 3)
                return true;
        return false;
    }

    serialize(): string {
        let saveObject: object;
        saveObject["length"] = this.breastRows.length;
        for (let index = 0; index < this.breastRows.length; index++) {
            saveObject[index] = this.breastRows[index].serialize();
        }
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        if (!saveObject["length"] || saveObject["length"] < 0) {
            console.error("Chest length non zero.");
            return;
        }
        this.breastRows = [];
        for (let index = 0; index < saveObject["length"]; index++) {
            this.breastRows.push(new BreastRow());
            this.breastRows[index].deserialize(saveObject[index]);
        }
    }

}