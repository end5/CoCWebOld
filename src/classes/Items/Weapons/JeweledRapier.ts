import Weapon from './Weapon';
import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class JeweledRapier extends Weapon {
    public constructor() {
        super("JRapier", new ItemDesc("JRapier", "a jeweled rapier", "This jeweled rapier is ancient but untarnished.  The hilt is wonderfully made, and fits your hand like a tailored glove.  The blade is shiny and perfectly designed for stabbing."), "jeweled rapier", "slash", 13, 1400);
    }

    public get attack(): number {
        return (13 + Flags.list[FlagEnum.RAPHAEL_RAPIER_TRANING] * 2);
    }
    
    equip(character: Character): void {}
    unequip(character: Character): void {}
    equipText(): void {}
    unequipText(): void {}
    use(player: Player) {}
}


