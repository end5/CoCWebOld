import Cock, { CockType } from '../Body/Cock';

export default class CockDescLib {
    private static library: object = {};

    public static lookupPerk(id: CockType): string {
        return CockDescLib.library[id];
    }

    public static getLibrary(): object {
        return CockDescLib.library;
    }

    public static init() {
        CockDescLib.library[CockType.HUMAN] = "human";
        CockDescLib.library[CockType.HORSE] = "mammal";
        CockDescLib.library[CockType.DOG] = "mammal";
        CockDescLib.library[CockType.DEMON] = "super";
        CockDescLib.library[CockType.TENTACLE] = "tentacle";
        CockDescLib.library[CockType.CAT] = "mammal";
        CockDescLib.library[CockType.LIZARD] = "reptile";
        CockDescLib.library[CockType.ANEMONE] = "seaworld";
        CockDescLib.library[CockType.KANGAROO] = "mammal";
        CockDescLib.library[CockType.DRAGON] = "reptile";
        CockDescLib.library[CockType.DISPLACER] = "other";
        CockDescLib.library[CockType.FOX] = "mammal";
        CockDescLib.library[CockType.BEE] = "insect";
        CockDescLib.library[CockType.UNDEFINED] = "";
    }

    /* Cock types
    * 0 - human
    * 1 - horse
    * 2 - dog
    * 3 - demon
    * 4 - tentacle?
    * 5 - CAT
    * 6 - Lizard/Naga?
    * 7 - ANEMONE!
    * 8 - ugliest wang ever (kangaroo)
    * 9 - dragon
    * 10 - displacer
    * 11 - Fox

    Group Types used for general description code (eventually)
    * human  	- obvious
    * mammal 	- obvious again
    * super 	- supernatural types
    * tentacle - only one tentacle!
    * reptile	- make a guess
    * seaworld - Anything in the water
    * other	- doesn't fit anywhere else
    *
    public static const HUMAN: CockType = new CockType("human");
    public static const HORSE: CockType = new CockType("mammal");
    public static const DOG: CockType = new CockType("mammal");
    public static const DEMON: CockType = new CockType("super");
    public static const TENTACLE: CockType = new CockType("tentacle");
    public static const CAT: CockType = new CockType("mammal");
    public static const LIZARD: CockType = new CockType("reptile");
    public static const ANEMONE: CockType = new CockType("seaworld");
    public static const KANGAROO: CockType = new CockType("mammal");
    public static const DRAGON: CockType = new CockType("reptile");
    public static const DISPLACER: CockType = new CockType("other");
    public static const FOX: CockType = new CockType("mammal");
    public static const BEE: CockType = new CockType("insect");
    public static const UNDEFINED: CockType = new CockType("");
    */
}
