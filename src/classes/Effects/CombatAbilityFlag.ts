export enum CombatAbilityFlag {
    None = 0,
    MainAction = 1 << 0,
    Tease = 1 << 1,
    Spells = 1 << 2,
    Items = 1 << 3,
    MoveAway = 1 << 4,
    PhysSpec = 1 << 5,
    MagicSpec = 1 << 6,
    Wait = 1 << 7,
    Fantasize = 1 << 8,
    All = MainAction | Tease | Spells | Items | MoveAway | PhysSpec | MagicSpec | Wait | Fantasize
}
