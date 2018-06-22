/*
Parser Syntax:

// Querying simple PC stat nouns:
    [noun]

Conditional statements:
// Simple if statement:
    [if (condition) OUTPUT_IF_TRUE]
// If-Else statement
    [if (condition) OUTPUT_IF_TRUE | OUTPUT_IF_FALSE]
    // Note - Implicit else indicated by presence of the "|"

// Object aspect descriptions
    [object aspect]
    // gets the description of aspect "aspect" of object/NPC/PC "object"
    // Eventually, I want this to be able to use introspection to access class attributes directly
    // Maybe even manipulate them, though I haven't thought that out much at the moment.

// Gender Pronoun Weirdness:
// PRONOUNS: The parser uses Elverson/Spivak Pronouns specifically to allow characters to be written with non-specific genders.
// http://en.wikipedia.org/wiki/Spivak_pronoun
//
// Cheat Table:
//           | Subject    | Object       | Possessive Adjective | Possessive Pronoun | Reflexive         |
// Agendered | ey laughs  | I hugged em  | eir heart warmed     | that is eirs       | ey loves emself   |
// Masculine | he laughs  | I hugged him | his heart warmed     | that is his        | he loves himself  |
// Feminine  | she laughs | I hugged her | her heart warmed     | that is hers       | she loves herself |

[screen (SCREEN_NAME) | screen text]
    // creates a new screen/page.

[button (SCREEN_NAME) | button_text]
    // Creates a button which jumps to SCREEN_NAME when clicked

*/

/*
    required = []
    optional = ()
    optional repeating = {}
    or = |

    Block = "[" Statement|Condition|Expression|Factor|Unary|Number|Boolean|String "]"
    Statement = "if" "(" Condition|Boolean ")" Unary|Boolean|String "|" Unary|Boolean|String
    Condition = Expression|Boolean|String ["=="|"="|"!="|"<"|">"|"<="|">="] Expression|Boolean|String
    Expression = Factor {["+"|"-"] Factor}
    Factor = Unary {["*"|"/"] Unary}
    Unary = ("-") Number
    Number = [0-9]+
    Boolean = ["true"|"false"]
    String = [\w\d\s.\"\']+
*/
export class Parser {
    private offset: number;
    private currIndex: number = 0;
    private str: string;
    private parserResult;
    private expectedList: string[];
    private deepestFailIndex: number;

    private endStr(): boolean {
        return this.currIndex >= this.str.length;
    }

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

    private expect(str: string) {
        if (this.currIndex < this.deepestFailIndex) return;

        if (this.currIndex > this.deepestFailIndex) {
            this.deepestFailIndex = this.currIndex;
            this.expectedList = [];
        }

        this.expectedList.push(str);
    }

    public parse(str: string): string {
        let startIndex: number;
        let matchIndex = 0;
        let result = "";
        this.offset = 0;
        this.currIndex = 0;
        this.str = str;
        this.expectedList = [];
        this.parserResult = "";
        this.deepestFailIndex = 0;
        while (matchIndex < str.length) {
            startIndex = matchIndex;
            matchIndex = str.indexOf("[", matchIndex);
            if (matchIndex === -1) {
                return str;
            }
            else {
                result += str.slice(startIndex, matchIndex);
                this.currIndex = matchIndex;
                this.offset = matchIndex;
                if (!this.block()) {
                    return result + "<" + this.parserResult + "> Error at " + (this.deepestFailIndex - this.offset) + " Expected " + this.expectedList
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .reduce((prev, curr, index, self) => prev + curr.toString() + (index !== self.length - 1 ? ", " : ""), "");
                }
                result += this.parserResult;
                matchIndex = this.currIndex;
            }
        }
        return result;
    }

    public block(): boolean {
        const startIndex = this.currIndex;
        if (!this.check("[")) {
            this.currIndex = startIndex;
            return false;
        }

        this.whitespace();
        if (this.statement() || this.condition() || this.expression() || this.factor() || this.unary() || this.number() || this.boolean() || this.string()) {
            if (this.check("]"))
                return true;
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

        if (this.condition() || this.boolean()) {
            condition = this.parserResult;

            this.whitespace();

            if (!this.check(")")) {
                this.currIndex = startIndex;
                return false;
            }

            if (this.unary() || this.boolean() || this.string()) {
                trueVal = this.parserResult;
                this.whitespace();
                if (this.check("|")) {
                    if (this.unary() || this.boolean() || this.string()) {
                        falseVal = this.parserResult;
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
        if (this.expression() || this.boolean() || this.string()) {
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

            if (this.unary() || this.boolean() || this.string()) {
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

    public string(): boolean {
        const startIndex = this.currIndex;
        this.whitespace();
        if (/[\s\w\d]/.test(this.str.charAt(this.currIndex))) {
            this.currIndex++;
            while (!this.endStr() && /[\s\w\d]/.test(this.str.charAt(this.currIndex))) {
                this.currIndex++;
            }
            this.parserResult = this.str.substring(startIndex, this.currIndex).trimRight();
            return true;
        }
        else {
            this.currIndex = startIndex;
            this.expect("string");
            return false;
        }
    }

    public number(): boolean {
        const startIndex = this.currIndex;
        this.whitespace();
        if (/[\d]/.test(this.str.charAt(this.currIndex))) {
            this.currIndex++;
            while (!this.endStr() && /[\d]/.test(this.str.charAt(this.currIndex))) {
                this.currIndex++;
            }
            this.parserResult = +(this.str.substring(startIndex, this.currIndex));
            return true;
        }
        else {
            this.currIndex = startIndex;
            this.expect("number");
            return false;
        }
    }

    public whitespace(): void {
        while (!this.endStr() && /[ \t\n\r]/.test(this.str.charAt(this.currIndex))) {
            this.currIndex++;
        }
    }
}
