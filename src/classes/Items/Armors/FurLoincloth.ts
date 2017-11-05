import Armor from './Armor';
import Character from '../../Character/Character';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class FurLoincloth extends Armor {
    public constructor() {
        super("FurLoin", new ItemDesc("FurLoin", "a front and back set of loincloths", "A pair of loincloths to cover your crotch and butt.  Typically worn by people named 'Conan'."), "revealing fur loincloths", 0, 100, "Light");
    }

    public description(player: Player): string {
        return "A pair of loincloths to cover your crotch and " + ButtDescriptor.describeButt(player) + ".  Typically worn by people named 'Conan'."
    }
    
    use(player: Player) { }

    equipText(): void { }
    unequipText(): void { }
    
    onEquip(character: Character): void { }
    onUnequip(character: Character): void { }
}
