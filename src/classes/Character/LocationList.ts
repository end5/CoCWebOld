import GameLocation from '../Game/GameLocation';
import LocationName from '../Game/LocationName';
import Dictionary from '../Utilities/Dictionary';

export default class LocationList extends Dictionary<GameLocation> {
    public get(locationName: LocationName): GameLocation {
        if (!this.has(locationName)) {
            this.set(locationName, new GameLocation(locationName));
        }
        return this.dictionary[locationName];
    }
}
