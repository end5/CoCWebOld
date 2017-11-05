import Weapon from './Weapon';
import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class RaphaelsRapier extends Weapon {
    public constructor() {
        super("RRapier", new ItemDesc("RRapier", "Raphael's vulpine rapier", "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you."), "vulpine rapier", "slash", 8, 1000);
    }

    public get attack(): number {
        return 8 + Flags.list[FlagEnum.RAPHAEL_RAPIER_TRANING] * 2;
    }
    
    equip(character: Character): void {}
    unequip(character: Character): void {}
    equipText(): void {}
    unequipText(): void {}
    use(player: Player) {}
}

