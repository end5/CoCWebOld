import { CharacterHolder } from './CharacterHolder';
import { Item } from '../Items/Item';
import { NextScreenChoices } from '../SceneDisplay';
import { ChainedDrop } from '../Utilities/Drops/ChainedDrop';

export abstract class CombatRewards extends CharacterHolder {
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

    public abstract onReward(): void;
    public abstract onRewardItem(item: Item): void;
    public abstract onRewardGems(gems: number): void;
}
