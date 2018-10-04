export enum StatEffectType {
    Base = 'base',
    Min = 'min',
    Max = 'max',
}

export class StatEffect {
    public constructor(
        public type: StatEffectType = StatEffectType.Base,
        public multiplier: number = 1,
        public flat: number = 0,
    ) { }
}
