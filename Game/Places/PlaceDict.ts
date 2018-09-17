import { Place } from './Place';
import { PlaceName } from './PlaceName';
import { Dictionary } from '../../Engine/Utilities/Dictionary';

export class PlaceDict extends Dictionary<Place> {
    public get(locationName: PlaceName): Place {
        if (!this.has(locationName)) {
            this.set(locationName, new Place(locationName));
        }
        return this.dictionary[locationName];
    }
}
