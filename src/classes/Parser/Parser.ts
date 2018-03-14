import Character from '../Character/Character';
import Game from '../Game/Game';
import Dictionary from '../Utilities/Dictionary';

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
    Statement = "if" "(" Condition ")" Number|Boolean|String "|" Number|Boolean|String
    Condition = Expression|Boolean|String ["=="|"="|"!="|"<"|">"|"<="|">="] Expression|Boolean|String
    Expression = Factor {["+"|"-"] Factor}
    Factor = Unary {["*"|"/"] Unary}
    Unary = ("-") Number
    Number = [0-9]+
    Boolean = ["true"|"false"]
    String = [\w\d\s.\"\']+
*/

class Parser {
    private curIndex: number;
    private str: string;
    private hasFailed: boolean;
    private failedMessage: string;

    public parse(str: string): string {
        this.str = str;
        this.curIndex = 0;
        this.hasFailed = false;
        const result = this.block();
        if (this.hasFailed) {
            return this.failedMessage;
        }
        return "" + result;
    }

    private endStr(): boolean {
        return this.curIndex < this.str.length;
    }

    private stringCheck(str: string): boolean {
        if (this.str.substr(this.curIndex, str.length) === str) {
            this.curIndex += str.length;
            return true;
        }
        return false;
    }

    private failed(startIndex: number) {
        this.hasFailed = true;
        this.failedMessage = "Parsing has failed at position " + this.curIndex;
        this.curIndex = startIndex;
    }

    public block(): any {
        const startIndex = this.curIndex;
        let result: any;
        while (this.endStr() && this.str.charAt(this.curIndex) !== "[") {
            this.curIndex++;
        }
        if (this.str.charAt(this.curIndex) === "[") {
            this.curIndex++;
            this.whitespace();
            result = this.statement();
            if (this.hasFailed) {
                this.hasFailed = false;
                result = this.condition();
                if (this.hasFailed) {
                    this.hasFailed = false;
                    result = this.expression();
                    if (this.hasFailed) {
                        this.hasFailed = false;
                        result = this.factor();
                        if (this.hasFailed) {
                            this.hasFailed = false;
                            result = this.unary();
                            if (this.hasFailed) {
                                this.hasFailed = false;
                                result = this.number();
                                if (this.hasFailed) {
                                    this.hasFailed = false;
                                    result = this.boolean();
                                    if (this.hasFailed) {
                                        this.hasFailed = false;
                                        result = this.string();
                                        if (this.hasFailed) {
                                            this.failed(startIndex);
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.str.charAt(this.curIndex) === "]") {
            this.curIndex++;
            return result;
        }
        else {
            this.failed(startIndex);
            return;
        }
    }

    public statement(): boolean | number | string {
        this.whitespace();
        const startIndex = this.curIndex;
        let condition: boolean;
        let trueVal: boolean | number | string;
        let falseVal: boolean | number | string;
        //    Statement = "if" "(" Condition ")" Number|Boolean|String "|" Number|Boolean|String
        if (!this.stringCheck("if")) {
            this.failed(startIndex);
            return;
        }
        this.whitespace();
        if (!this.stringCheck("(")) {
            this.failed(startIndex);
            return;
        }
        condition = this.condition();
        if (this.hasFailed) {
            this.failed(startIndex);
            return;
        }
        this.whitespace();
        if (!this.stringCheck(")")) {
            this.failed(startIndex);
            return;
        }
        trueVal = this.number();
        if (this.hasFailed) {
            this.hasFailed = false;
            trueVal = this.boolean();
            if (this.hasFailed) {
                this.hasFailed = false;
                trueVal = this.string();
                if (this.hasFailed) {
                    this.failed(startIndex);
                    return;
                }
            }
        }
        this.whitespace();
        if (this.stringCheck("|")) {
            falseVal = this.number();
            if (this.hasFailed) {
                this.hasFailed = false;
                falseVal = this.boolean();
                if (this.hasFailed) {
                    this.hasFailed = false;
                    falseVal = this.string();
                    if (this.hasFailed) {
                        this.failed(startIndex);
                        return;
                    }
                }
            }
        }
        else falseVal = "";
        return condition ? trueVal : falseVal;
    }

    public condition(): boolean {
        this.whitespace();
        const startIndex = this.curIndex;
        let opStored: string;
        let rval: boolean | number | string;
        let lval: boolean | number | string;
        let result: boolean;

        lval = this.expression();
        if (this.hasFailed) {
            this.hasFailed = false;
            lval = this.boolean();
            if (this.hasFailed) {
                this.hasFailed = false;
                lval = this.string();
                if (this.hasFailed) { this.failed(startIndex); return; }
            }
        }
        this.whitespace();
        const ops = ["==", "=", "!=", "<", ">", "<=", ">="];
        for (const op of ops) {
            if (this.str.substr(this.curIndex, op.length) === op) {
                this.curIndex += op.length;
                opStored = op;
                break;
            }
        }
        if (opStored === undefined) {
            this.failed(startIndex);
            return;
        }
        rval = this.expression();
        if (this.hasFailed) {
            this.hasFailed = false;
            rval = this.boolean();
            if (this.hasFailed) {
                this.hasFailed = false;
                rval = this.string();
                if (this.hasFailed) { this.failed(startIndex); return; }
            }
        }

        switch (opStored) {
            case "==": { result = lval === rval; break; }
            case "=": { result = lval === rval; break; }
            case "!=": { result = lval !== rval; break; }
            case "<": { result = lval < rval; break; }
            case ">": { result = lval > rval; break; }
            case "<=": { result = lval <= rval; break; }
            case ">=": { result = lval >= rval; break; }
        }
        return result;
    }

    public expression(): number {
        this.whitespace();
        const startIndex = this.curIndex;
        const head = this.factor();
        let factor: number;
        let op: string;
        if (!this.hasFailed) {
            let result = head;
            while (this.endStr() && !this.hasFailed) {
                this.whitespace();
                if (this.stringCheck("+"))
                    op = "+";
                else if (this.stringCheck("-"))
                    op = "-";
                else break;
                factor = this.factor();
                if (!this.hasFailed) {
                    if (op === "+")
                        result += factor;
                    else if (op === "-")
                        result -= factor;
                }
                else { this.failed(startIndex); return; }
            }
            return result;
        }
    }

    public factor(): number {
        this.whitespace();
        const startIndex = this.curIndex;
        const head = this.unary();
        let unary: number;
        let op: string;
        if (!this.hasFailed) {
            let result = head;
            while (this.endStr() && !this.hasFailed) {
                this.whitespace();
                if (this.stringCheck("*"))
                    op = "*";
                else if (this.stringCheck("/"))
                    op = "/";
                else break;
                unary = this.unary();
                if (!this.hasFailed) {
                    if (op === "*")
                        result *= unary;
                    else if (op === "/")
                        result /= unary;
                }
                else { this.failed(startIndex); return; }
            }
            return result;
        }
    }

    public unary(): number {
        this.whitespace();
        if (this.str.charAt(this.curIndex) === "-") {
            this.curIndex++;
            return -this.number();
        }
        return this.number();
    }

    public boolean(): boolean {
        this.whitespace();
        const startIndex = this.curIndex;
        if (this.str.substr(this.curIndex, 4).toLowerCase() === "true") {
            this.curIndex += 4;
            return true;
        }
        else if (this.str.substr(this.curIndex, 5).toLowerCase() === "false") {
            this.curIndex += 5;
            return false;
        }
        else this.failed(startIndex);
    }

    public string(): string {
        this.whitespace();
        const startIndex = this.curIndex;
        if (/[\s\w\d]/.test(this.str.charAt(this.curIndex))) {
            this.curIndex++;
            while (this.endStr() && /[\s\w\d]/.test(this.str.charAt(this.curIndex))) {
                this.curIndex++;
            }
            return this.str.substring(startIndex, this.curIndex).trimRight();
        }
        else this.failed(startIndex);
    }

    public number(): number {
        this.whitespace();
        const startIndex = this.curIndex;
        if (/[\d]/.test(this.str.charAt(this.curIndex))) {
            this.curIndex++;
            while (this.endStr() && /[\d]/.test(this.str.charAt(this.curIndex))) {
                this.curIndex++;
            }
            return +(this.str.substring(startIndex, this.curIndex));
        }
        else this.failed(startIndex);
    }

    public whitespace(): void {
        while (this.endStr() && /[ \t\n\r]/.test(this.str.charAt(this.curIndex))) {
            this.curIndex++;
        }
    }
}
