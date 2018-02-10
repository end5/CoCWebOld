import GameLocation from '../Game/GameLocation';
import LocationName from '../Game/LocationName';
import SerializableDictionary from '../Utilities/SerializableDictionary';

export default class LocationList extends SerializableDictionary<GameLocation> {
    public get(locationName: LocationName): GameLocation {
        if (!this.has(locationName)) {
            this.set(locationName, new GameLocation(locationName));
        }
        return this.dictionary[locationName];
    }
}
