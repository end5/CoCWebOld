import Weapon from './Weapon';
import WeaponName from './WeaponName';
import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class JeweledRapier extends Weapon {
    public constructor() {
        super(WeaponName.JeweledRapier, new ItemDesc("JRapier", "a jeweled rapier", "This jeweled rapier is ancient but untarnished.  The hilt is wonderfully made, and fits your hand like a tailored glove.  The blade is shiny and perfectly designed for stabbing."), "jeweled rapier", "slash", 13, 1400);
    }

    public get attack(): number {
        return (13 + Flags.list[FlagEnum.RAPHAEL_RAPIER_TRANING] * 2);
    }
    
    public equip(character: Character): void {}
    public unequip(character: Character): void {}
    public equipText(): void {}
    public unequipText(): void {}
    public use(player: Player) {}
}


