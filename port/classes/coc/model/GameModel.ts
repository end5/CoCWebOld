export class GameModel {
    public player: Player;
    public oldStats: Object;
    public time: TimeModel;

    public flags: DefaultDict;

    //public debug : boolean;
    // I think this is supposed to be a compile time constant, sorta...
    public mobile: boolean;

    // TODO: Should this be attached to player instead?
    public maxHP: Function;
}
