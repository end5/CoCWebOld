import { CharacterHolder } from './CharacterHolder';
import { ItemDrop } from '../Utilities/Drops/ItemDrop';
import { Character } from '../Character/Character';

export class CombatRewards extends CharacterHolder {
    public drop?: ItemDrop;
    public constructor(char: Character, drop?: ItemDrop) {
        super(char);
        this.drop = drop;
    }

    public XP(): number {
        return this.char.stats.XP;
    }

    public gems(): number {
        return this.char.inventory.gems;
    }
}
