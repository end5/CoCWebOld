import CoC_Settings from "../CoC_Settings"
export default class Utils {
    private static NUMBER_WORDS_CARDINAL: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    private static NUMBER_WORDS_CARDINAL_CAPITAL: string[] = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    private static NUMBER_WORDS_ORDINAL: string[] = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

    // curryFunction(f,args1)(args2)=f(args1.concat(args2))
    // e.g. curryFunction(f,x,y)(z,w) = f(x,y,z,w)
    public static curry(func: Function, ...args): Function {
        if (func == null) CoC_Settings.error("carryFunction(null," + args + ")");
        return function (...args2): any {
            return func.apply(null, args.concat(args2));
        };
    }

    public static formatStringArray(stringList: string[]): string { //Changes an array of values into "1", "1 and 2" or "1, (x, )y and z"
        switch (stringList.length) {
            case 0: return "";
            case 1: return stringList[0];
            case 2: return stringList[0] + " and " + stringList[1];
            default:
        }
        let concat: string = stringList[0];
        for (let x = 1; x < stringList.length - 1; x++) concat += ", " + stringList[x];
        return concat + " and " + stringList[stringList.length - 1];
    }
    /**
     * Converts a number to cardinal words. (eg. zero, one, two ...)
     * @param number
     */
    public static numToCardinalText(number: number): string {
        if (number >= 0 && number <= 10) return Utils.NUMBER_WORDS_CARDINAL[number];
        return number.toString();
    }
    /**
     * Converts a number to ordinal words. (eg. first, second, third ...)
     * @param number
     */
    public static numToOrdinalText(number: number): string {
        if (number < 0) return number.toString(); //Can't really have the -10th of something
        if (number <= 10) return Utils.NUMBER_WORDS_ORDINAL[number];
        switch (number % 10) {
            case 1: return number.toString() + "st";
            case 2: return number.toString() + "nd";
            case 3: return number.toString() + "rd";
            default:
        }
        return number.toString() + "th";
    }

    public static numToCardinalCapText(number): string {
        if (number >= 0 && number <= 10) return Utils.NUMBER_WORDS_CARDINAL_CAPITAL[number];
        return number.toString();
    }

    // Basically, you pass an arbitrary-length list of arguments, and it returns one of them at random.
    // Accepts any type.
    // Can also accept a *single* array of items, in which case it picks from the array instead.
    // This lets you pre-construct the argument, to make things cleaner
    public static randomChoice(...args): any {
        let choice;
        if ((args.length == 1))// && (args[0] is Array))
        {
            choice = Math.round(Math.random() * (args[0].length - 1));
            return args[0][choice];
        }
        else {
            choice = Math.round(Math.random() * (args.length - 1));
            return args[choice];
        }
    }

    public static rand(max): number {
        return Math.floor(Math.random() * Math.floor(max)); //The maximum is exclusive and the minimum is inclusive
    }

    public static chance(percent: number): boolean {
        if (percent > 100)
            percent = Math.random() * 100;
        return Math.random() * 100 < percent;
    }

    public static validateNonNegativeNumberFields(object: object, func: string, nonNegField: any[]) {
        let error: string = "";
        for (let field of nonNegField) {
            if (!object.hasOwnProperty(field) || !(typeof object[field] === "number") && object[field] != null) error += "Misspelling in " + func + ".nnf: '" + field + "'. ";
            else if (object[field] == null) error += "Null '" + field + "'. ";
            else if (object[field] < 0) error += "Negative '" + field + "'. ";
        }
        if (error != "")
            console.log(error);
    }

    public static validateNonEmptyStringFields(object: object, func: string, nonEmptyField: any[]) {
        let error: string = "";
        for (let field of nonEmptyField) {
            if (!object.hasOwnProperty(field) || !(typeof object[field] === "string") && object[field] != null) error += "Misspelling in " + func + ".nef: '" + field + "'. ";
            else if (object[field] == null) error += "Null '" + field + "'. ";
            else if (object[field] == "") error += "Empty '" + field + "'. ";
        }
        if (error != "")
            console.log(error);
    }
}

