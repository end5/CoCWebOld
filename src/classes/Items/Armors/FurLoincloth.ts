import Armor from './Armor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import Player from '../../Player';

export default class FurLoincloth extends Armor {
    public constructor() {
        super("FurLoin", "FurLoin", "revealing fur loincloths", "a front and back set of loincloths", 0, 100, "A pair of loincloths to cover your crotch and butt.  Typically worn by people named 'Conan'.", "Light");
    }

    public description(player: Player): string {
        return "A pair of loincloths to cover your crotch and " + ButtDescriptor.describeButt(player) + ".  Typically worn by people named 'Conan'."
    }
}
