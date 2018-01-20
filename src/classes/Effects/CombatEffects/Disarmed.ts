import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import WeaponName from '../../Items/Weapons/WeaponName';
import CombatEffect from '../CombatEffect';

export class Disarmed extends CombatEffect {
    public onRemove(character: Character) {
        if (character.inventory.equipment.weapon.name === WeaponName.Fists) {
            character.inventory.equipment.equip(Game.libraries.weapon.get(Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ID]));
        }
        else {
            Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] = Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ID];
        }
    }
}
