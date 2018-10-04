export class StatValueModifier {
    public constructor(
        public multiplier: number = 1,
        public flat: number = 0,
    ) { }
}

export interface StatEffect {
    name: string;
    value: StatValueModifier;
    min: StatValueModifier;
    max: StatValueModifier;
}
