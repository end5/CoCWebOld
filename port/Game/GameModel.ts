import { TimeModel } from './TimeModel';
import { DefaultDict } from '../../classes/DefaultDict';
import { Player } from '../../classes/Player';

export class GameModel {
    public player: Player;
    public oldStats: Object;
    public time: TimeModel;

    public flags: DefaultDict;


    // TODO: Should this be attached to player instead?
    public maxHP: Function;
}
