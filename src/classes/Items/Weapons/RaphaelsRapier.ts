import Weapon from './Weapon';
import WeaponName from './WeaponName';
import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class RaphaelsRapier extends Weapon {
    public constructor() {
        super(WeaponName.RaphaelsRapier, new ItemDesc("RRapier", "Raphael's vulpine rapier", "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you."), "vulpine rapier", "slash", 8, 1000);
    }

    public get attack(): number {
        return 8 + Flags.list[FlagEnum.RAPHAEL_RAPIER_TRANING] * 2;
    }
    
    public equip(character: Character): void {}
    public unequip(character: Character): void {}
    public equipText(): void {}
    public unequipText(): void {}
    public use(player: Player) {}
}

