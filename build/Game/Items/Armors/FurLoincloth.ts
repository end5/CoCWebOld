import { Armor } from './Armor';
import { ArmorName } from './ArmorName';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { ItemDesc } from '../ItemDesc';

export class FurLoincloth extends Armor {
    public constructor() {
        super(ArmorName.FurLoincloth, new ItemDesc("FurLoin", "a front and back set of loincloths", "A pair of loincloths to cover your crotch and butt.  Typically worn by people named 'Conan'."), "revealing fur loincloths", 0, 100, "Light");
    }

    public description(character: Character): string {
        return "A pair of loincloths to cover your crotch and " + Desc.Butt.describeButt(character) + ".  Typically worn by people named 'Conan'.";
    }
}
