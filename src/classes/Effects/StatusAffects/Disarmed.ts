import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import StatusAffect from '../StatusAffect';

export class Disarmed extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatEnd(character: Character) {
        if (character.inventory.weaponSlot.equipment == Game.libraries.weapon.get("Fists")) {
            character.inventory.weaponSlot.equip(Game.libraries.weapon.get(Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ID]));
        }
        else {
            Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] = Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ID];
        }
    }

    public combatUpdate(character: Character): string {
        return "";
    }
}
