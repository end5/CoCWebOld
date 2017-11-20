import Player from '../Player/Player';
import LibraryEntry from '../Utilities/LibraryEntry';

export default class ItemDesc {
    public readonly shortName: string;  // Short name to be displayed on buttons
    public readonly longName: string;   // A full name of the item, to be described in text
    private readonly detailedDesc: string;      // Detailed description to use on tooltips

    public constructor(shortName: string = null, longName: string = null, detailedDesc: string = null) {
        this.shortName = shortName;
        this.longName = longName || this.shortName;
        this.detailedDesc = detailedDesc || this.longName;
    }

    public description(player?: Player): string {
        return this.detailedDesc;
    }
}
