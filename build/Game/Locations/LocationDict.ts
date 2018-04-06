import Location from './Location';
import LocationName from './LocationName';
import Dictionary from '../../Engine/Utilities/Dictionary';

export default class LocationDict extends Dictionary<Location> {
    public get(locationName: LocationName): Location {
        if (!this.has(locationName)) {
            this.set(locationName, new Location(locationName));
        }
        return this.dictionary[locationName];
    }
}
