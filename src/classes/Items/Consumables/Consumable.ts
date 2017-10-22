import Player from '../../Player';
import Item from '../Item';

export default class Consumable extends Item {
    private readonly mutationFunc: Function;
    constructor(key: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null, mutationFunc: Function = null) {
        super(key, shortName, longName, value, description);
        this.mutationFunc = mutationFunc;
    }

    public canUse(player: Player): boolean {
        return true;
    }
    public use(player: Player) {
        this.mutationFunc();
    }
    public useText(player: Player) {
        
    }
}

