export interface IStatModifier {
    multi?: number | (() => number);
    flat?: number | (() => number);
}

export class StatModifier implements IStatModifier {
    public multi: number = 1;
    public flat: number = 0;
    public constructor(values?: IStatModifier) {
        if (values) {
            if (values.flat) {
                if (typeof values.flat === 'number')
                    this.flat = values.flat;
                if (typeof values.flat === 'function')
                    this.flat = values.flat();
            }
            if (values.multi) {
                if (typeof values.multi === 'number')
                    this.multi = values.multi;
                if (typeof values.multi === 'function')
                    this.multi = values.multi();
            }
        }
    }
    public toString() {
        if (this.multi !== 1 || this.flat !== 0)
            return 'x' + this.multi + ' + ' + this.flat;
        return '';
    }
}

export interface IStatEffect {
    value?: IStatModifier;
    min?: IStatModifier;
    max?: IStatModifier;
    gain?: IStatModifier;
}

export class StatEffect implements IStatEffect {
    public value = new StatModifier();
    public min = new StatModifier();
    public max = new StatModifier();
    public gain = new StatModifier();
    public constructor(values?: IStatEffect) {
        if (values) {
            if (values.value)
                this.value = new StatModifier(values.value);
            if (values.min)
                this.min = new StatModifier(values.min);
            if (values.max)
                this.max = new StatModifier(values.max);
            if (values.gain)
                this.gain = new StatModifier(values.gain);
        }
    }
    public toString() {
        let out = '';
        if (this.value.toString() !== '') {
            out += 'Value - ' + this.value.toString();
        }
        if (this.min.toString() !== '') {
            out += ' Min - ' + this.min.toString();
        }
        if (this.max.toString() !== '') {
            out += ' Max - ' + this.max.toString();
        }
        if (this.gain.toString() !== '') {
            out += ' Gain - ' + this.gain.toString();
        }
        return out;
    }
}
