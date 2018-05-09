import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { User } from '../../User';
import { ItemDesc } from '../ItemDesc';

export class RaphaelsRapier extends Weapon {
    public constructor() {
        super(WeaponName.RaphaelsRapier, new ItemDesc("RRapier", "Raphael's vulpine rapier", "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you."), "vulpine rapier", "slash", 8, 1000);
    }

    public get attack(): number {
        return 8 + (User.flags.get("Player") as PlayerFlags).RAPHAEL_RAPIER_TRANING * 2;
    }
}
