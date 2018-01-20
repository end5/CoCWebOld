import CharacterHolder from './CharacterHolder';
import Item from '../Items/Item';
import Player from '../Player/Player';
import ChainedDrop from '../Utilities/ChainedDrop';
import Utils from '../Utilities/Utils';

export default abstract class CombatRewards extends CharacterHolder {
    private chainedDrop: ChainedDrop = new ChainedDrop();
    public drop(): ChainedDrop { return this.chainedDrop; }
    public addDrop(value: ChainedDrop) {
        this.chainedDrop = value;
    }

    public XP(): number {
        return this.char.stats.XP;
    }

    public gems(): number {
        return this.char.inventory.gems;
    }

    public abstract onReward();
    public abstract onRewardItem(item: Item);
    public abstract onRewardGems(gems: number);
}
