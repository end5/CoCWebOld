/*
	definition		=
	concatenation	,
	alternation		|
	optional		[ ... ]
	repetition		{ ... }
	grouping		( ... )
    terminal string	" ... "
    regex           \/ ... \/

	Block       = {[String] , ["[" , _ , Statement|Condition|Expression|Lookup|String , _ ,"]"] , [String]}
	Statement   = ["if" , _ , "(" , _ , Condition , _ , ")" , Block , ["|" , Block]]
	Condition   = Boolean | (Expression|Lookup|String , "=="|"="|"!="|"<"|">"|"<="|">=" , Expression|Lookup|String)
    Expression  = _ , Factor , {"+"|"-" , _ , Factor}
    Factor      = _ , Unary , {_ , "*"|"/" , _ , Unary}
    Unary       = _ , ["-"] , _ , Number
    Number      = _ , \/[\d]+\/
    Boolean     = _ , "true"|"false"
    Lookup      = _ , object
    String      = \/[\w\d\s.?!-\"\']+\/
	_           = \/[ \t\n\r]*\/
*/

export class Parser {
    private currIndex: number = 0;
    private str: string;
    private parserResult;
    private expectedList: string[];
    private deepestFailIndex: number;
    private resultStack: string[];

    private peek(str: string, ignoreCase?: boolean): boolean {
        return ignoreCase ? this.str.slice(this.currIndex, this.currIndex + str.length).toLowerCase() === str.toLowerCase() : this.str.startsWith(str, this.currIndex);
    }

    private check(str: string, ignoreCase?: boolean): boolean {
        if (this.peek(str, ignoreCase)) {
            this.currIndex += str.length;
            return true;
        }
        this.expect(str);
        return false;
    }

    private expect(str: string | string[]) {
        if (this.currIndex < this.deepestFailIndex) return;

        if (this.currIndex > this.deepestFailIndex) {
            this.deepestFailIndex = this.currIndex;
            this.expectedList = [];
        }
        if (Array.isArray(str))
            this.expectedList = this.expectedList.concat(str);
        else
            this.expectedList.push(str);
    }

    private nest() {
        this.resultStack.push(this.parserResult);
        this.parserResult = "";
    }

    public parse(str: string): string {
        this.currIndex = 0;
        this.str = str;
        this.expectedList = [];
        this.parserResult = "";
        this.deepestFailIndex = 0;
        this.resultStack = [];
        let result = "";
        do {
            if (!this.block()) {
                return this.resultStack.reduce((prev, curr) => prev + curr) +
                    "<" + this.parserResult + "> Error at " + this.deepestFailIndex + ":[" + (this.deepestFailIndex - this.currIndex) + "]" +
                    " Expected " + this.expectedList
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .reduce((prev, curr, index, self) => prev + curr.toString() + (index !== self.length - 1 ? ", " : ""), "");
            }
            this.resultStack = [];
            result += this.parserResult;
        } while (this.currIndex <= this.str.length - 1);
        return result;
    }

    public block(): boolean {
        const startIndex = this.currIndex;
        let result = "";
        if (this.string())
            result += this.parserResult;
        if (this.check("[")) {
            this.nest();
            this.whitespace();
            if (this.statement() || this.condition() || this.expression() || this.lookup() || this.block()) {
                if (this.check("]")) {
                    result += this.parserResult;
                }
                else {
                    this.currIndex = startIndex;
                    return false;
                }
            }
            else {
                this.currIndex = startIndex;
                return false;
            }
        }
        if (this.string())
            result += this.parserResult;
        this.parserResult = result;
        return true;
    }

    public statement(): boolean {
        let condition: boolean;
        let trueVal: boolean | number | string;
        // If no false value, default to empty string
        let falseVal: boolean | number | string = "";
        const startIndex = this.currIndex;

        this.whitespace();
        if (!this.check("if")) {
            this.currIndex = startIndex;
            return false;
        }

        this.whitespace();

        if (!this.check("(")) {
            this.currIndex = startIndex;
            return false;
        }

        if (this.condition()) {
            condition = this.parserResult;

            this.whitespace();

            if (!this.check(")")) {
                this.currIndex = startIndex;
                return false;
            }

            if (this.block()) {
                trueVal = this.parserResult;
                this.whitespace();
                if (this.check("|")) {
                    if (this.block()) {
                        falseVal = this.parserResult;
                        this.parserResult = condition ? trueVal : falseVal;
                        return true;
                    }
                    else {
                        this.currIndex = startIndex;
                        return false;
                    }
                }
                this.parserResult = condition ? trueVal : falseVal;
                return true;
            }
            else {
                this.currIndex = startIndex;
                return false;
            }
        }
        else {
            this.currIndex = startIndex;
            return false;
        }
    }

    public condition(): boolean {
        let opStored: string;
        let rval: boolean | number | string;
        let lval: boolean | number | string;
        const startIndex = this.currIndex;

        this.whitespace();
        if (!this.boolean()) {
            if (this.expression() || this.lookup() || this.string()) {
                lval = this.parserResult;
                this.whitespace();
                const ops = ["==", "=", "!=", "<", ">", "<=", ">="];
                for (const op of ops) {
                    if (this.check(op)) {
                        opStored = op;
                        break;
                    }
                }

                if (!opStored) {
                    this.currIndex = startIndex;
                    return false;
                }

                if (this.expression() || this.lookup() || this.string()) {
                    rval = this.parserResult;
                    switch (opStored) {
                        case "==": { this.parserResult = lval === rval; break; }
                        case "=": { this.parserResult = lval === rval; break; }
                        case "!=": { this.parserResult = lval !== rval; break; }
                        case "<": { this.parserResult = lval < rval; break; }
                        case ">": { this.parserResult = lval > rval; break; }
                        case "<=": { this.parserResult = lval <= rval; break; }
                        case ">=": { this.parserResult = lval >= rval; break; }
                    }
                    return true;
                }
                else {
                    this.currIndex = startIndex;
                    return false;
                }
            }
            else {
                this.currIndex = startIndex;
                return false;
            }
        }
        else {
            return true;
        }
    }

    public expression(): boolean {
        let value;
        let op: string;
        const startIndex = this.currIndex;

        this.whitespace();
        if (this.factor()) {
            value = this.parserResult;

            do {
                op = "";
                if (this.check("+"))
                    op = "+";
                else if (this.check("-"))
                    op = "-";
                else
                    break;

                if (op === "+" || op === "-") {
                    if (this.factor()) {
                        if (op === "+")
                            value += this.parserResult;
                        if (op === "-")
                            value -= this.parserResult;
                    }
                    else {
                        this.currIndex = startIndex;
                        return false;
                    }
                }
            } while (op !== "");
            this.parserResult = value;
            return true;
        }
        else {
            this.currIndex = startIndex;
            return false;
        }
    }

    public factor(): boolean {
        let value;
        let op: string;
        const startIndex = this.currIndex;

        this.whitespace();
        if (this.unary()) {
            value = this.parserResult;

            do {
                op = "";
                if (this.check("*"))
                    op = "*";
                else if (this.check("/"))
                    op = "/";
                else
                    break;

                if (op === "*" || op === "/") {
                    if (this.unary()) {
                        if (op === "*")
                            value *= this.parserResult;
                        if (op === "/")
                            value /= this.parserResult;
                    }
                    else {
                        this.currIndex = startIndex;
                        return false;
                    }
                }
            } while (op !== "");
            this.parserResult = value;
            return true;
        }
        else {
            this.currIndex = startIndex;
            return false;
        }
    }

    public unary(): boolean {
        const startIndex = this.currIndex;

        this.whitespace();
        if (this.check("-")) {
            if (this.number()) {
                this.parserResult = -this.parserResult;
                return true;
            }
            else {
                this.currIndex = startIndex;
                return false;
            }
        }
        else return this.number();
    }

    public boolean(): boolean {
        this.whitespace();
        if (this.check("true", true)) {
            this.parserResult = true;
            return true;
        }
        else if (this.check("false", true)) {
            this.parserResult = false;
            return true;
        }
        else return false;
    }

    public lookup(): boolean {
        const startIndex = this.currIndex;

        this.whitespace();
        let layer: object | (() => number | boolean | string) = {};
        let queue = Object.keys(layer);
        let key;
        while (queue.length > 0) {
            key = queue.pop();
            if (this.check(key)) {
                layer = layer[key];
                if (!this.check(".")) {
                    if (typeof layer === "function")
                        this.parserResult = layer();
                    else
                        this.parserResult = layer;
                    return true;
                }
                else {
                    queue = Object.keys(layer);
                }
            }
            else {
                this.expect(key);
            }
        }

        this.currIndex = startIndex;
        return false;
    }

    public string(): boolean {
        let result = "";
        const startIndex = this.currIndex;
        const match = /[\s\w\d,.?!\-\'\"]+/.exec(this.str.substring(this.currIndex));
        if (match && match.index === 0) {
            this.currIndex += match[0].length;
            result += match[0];
            this.parserResult = result;
            return true;
        }
        else {
            this.currIndex = startIndex;
            this.expect("string");
            return false;
        }
    }

    public number(): boolean {
        this.whitespace();
        const match = /[\d]+/.exec(this.str.substring(this.currIndex));
        if (match && match.index === 0) {
            this.currIndex += match[0].length;
            this.parserResult = +(match[0]);
            return true;
        }
        else {
            this.expect("number");
            return false;
        }
    }

    public whitespace(): void {
        const match = /[ \t\n\r]+/.exec(this.str.substring(this.currIndex));
        if (match && match.index === 0) {
            this.currIndex += match[0].length;
        }
    }
}
