export enum StatEffectType {
    Value = 'value',
    Min = 'min',
    Max = 'max',
}

export class StatEffect {
    public constructor(
        public type: StatEffectType = StatEffectType.Value,
        public multiplier: number = 1,
        public flat: number = 0,
    ) { }
}
