import ISerializable from './ISerializable';

export namespace Utils {
    export const NUMBER_WORDS_CARDINAL: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    export const NUMBER_WORDS_CARDINAL_CAPITAL: string[] = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    export const NUMBER_WORDS_ORDINAL: string[] = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

    /**
     * Converts a number to cardinal words. (eg. zero, one, two ...)
     * @param num
     */
    export function numToCardinalText(num: number): string {
        if (num >= 0 && num <= 10) return NUMBER_WORDS_CARDINAL[num];
        return num.toString();
    }
    /**
     * Converts a number to ordinal words. (eg. first, second, third ...)
     * @param num
     */
    export function numToOrdinalText(num: number): string {
        if (num < 0) return num.toString(); // Can't really have the -10th of something
        if (num <= 10) return NUMBER_WORDS_ORDINAL[num];
        switch (num % 10) {
            case 1: return num.toString() + "st";
            case 2: return num.toString() + "nd";
            case 3: return num.toString() + "rd";
            default:
        }
        return num.toString() + "th";
    }

    export function numToCardinalCapText(num): string {
        if (num >= 0 && num <= 10) return NUMBER_WORDS_CARDINAL_CAPITAL[num];
        return num.toString();
    }

    // Basically, you pass an arbitrary-length list of arguments, and it returns one of them at random.
    // Accepts any type.
    // Can also accept a *single* array of items, in which case it picks from the array instead.
    // This lets you pre-construct the argument, to make things cleaner
    export function randomChoice(...args): any {
        let choice;
        if ((args.length === 1))// && (args[0] is Array))
        {
            choice = Math.round(Math.random() * (args[0].length - 1));
            return args[0][choice];
        }
        else {
            choice = Math.round(Math.random() * (args.length - 1));
            return args[choice];
        }
    }

    /**
     * Returns the floor of a rand number from 0 to max. The maximum is exclusive and the minimum is inclusive.
     * @param max
     */
    export function rand(max: number): number {
        return Math.floor(Math.random() * Math.floor(max)); //
    }

    export function chance(percent: number): boolean {
        if (percent > 100)
            percent = Math.random() * 100;
        return Math.random() * 100 < percent;
    }

    export function round(value: number, place: number = 1): number {
        return Math.round(value * Math.pow(10, Math.floor(place))) / Math.pow(10, Math.floor(place));
    }
    export function serializeArray<T extends ISerializable<T>>(array: T[]): string {
        const saveObject: object = {};
        for (let index = 0; index < array.length; index++) {
            saveObject[index] = array[index].serialize();
        }
        return JSON.stringify(saveObject);
    }

    export function deserializeArray<T extends ISerializable<T>>(saveObject: object, constructor?: new () => T): T[] {
        const newArray = [];
        for (let index = 0; saveObject[index] !== undefined; index++) {
            if (constructor) {
                newArray.push(new constructor());
                newArray[index].deserialize(saveObject[index]);
            }
            else {
                newArray.push(saveObject[index]);
            }
        }
        return newArray;
    }

    export function capFirstLetter(str: string): string {
        if (str.length === 0) return "";
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
    export function loadFromId<K extends keyof HTMLElementTagNameMap>(id: string): HTMLElementTagNameMap[K] {
        const element: HTMLElement = document.getElementById(id);
        if (!element)
            throw new Error("Could not find " + id + " on page");
        return element as HTMLElementTagNameMap[K];
    }

    export function loadFromClassName<K extends keyof HTMLElementTagNameMap>(classname: string, parentElement: HTMLElement): HTMLElementTagNameMap[K] {
        let element: HTMLElement = null;
        if (parentElement.getElementsByClassName(classname).length !== 0)
            element = parentElement.getElementsByClassName(classname)[0] as HTMLElement;
        else
            throw new Error(classname + " was not found on " + parentElement.title);
        return element as HTMLElementTagNameMap[K];
    }
}
