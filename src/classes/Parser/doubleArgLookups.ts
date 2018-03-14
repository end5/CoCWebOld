import Cock from '../Body/Cock';
import Character from '../Character/Character';
import CockDescriptor from '../Descriptors/CockDescriptor';
import Game from '../Game/Game';

// provides rubiLookups and arianLookups
// note that these are only used in doubleArgLookups, not in Parser.as itself
//
// =!= NOTE: MUST BE IMPORTED BEFORE "./doubleArgLookups.as" =!=

// PC ASCII Aspect lookups

const cockLookups = // For subject: "cock"
    {
        all: (char: Character) => CockDescriptor.describeMultiCockShort(char),
        each: (char: Character) => CockDescriptor.describeMultiCockSimpleEach(char),
        one: (char: Character) => CockDescriptor.describeMultiCockSimpleOne(char),
        largest: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.LargestCockArea)[0]),
        biggest: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.LargestCockArea)[0]),
        biggest2: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.LargestCockArea)[1]),
        biggest3: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.LargestCockArea)[2]),
        smallest: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.SmallestCockArea)[0]),
        smallest2: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.SmallestCockArea)[1]),
        longest: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.LongestCocks)[0]),
        shortest: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.ShortestCocks)[0])
    };

const cockHeadLookups = // For subject: "cockHead"
    {
        biggest: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.LargestCockArea)[0]),
        biggest2: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.LargestCockArea)[1]),
        biggest3: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.LargestCockArea)[2]),
        largest: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.LargestCockArea)[0]),
        smallest: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.SmallestCockArea)[0]),
        smallest2: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.SmallestCockArea)[1]),
        longest: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.LongestCocks)[0]),
        shortest: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.sort(Cock.ShortestCocks)[0])
    };

// These tags take a two-word tag with a **numberic** attribute for lookup.
// [object NUMERIC-attribute]
// if "NUMERIC-attribute" can be cast to a Number, the parser looks for "object" in twoWordNumericTagsLookup.
// If it finds twoWordNumericTagsLookup["object"], it calls the anonymous function stored with said key "object"
// like so: twoWordNumericTagsLookup["object"](Number("NUMERIC-attribute"))
//
// if attribute cannot be case to a number, the parser looks for "object" in twoWordTagsLookup.
const twoWordNumericTagsLookup =
    {
        cockfit: (char: Character, args: string) => {
            if (char.torso.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.torso.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return CockDescriptor.describeCock(char, cocksThatFit[0]);
                else return CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.SmallestCockArea)[0]);
            }
        },
        cockfit2: (char: Character, args: string) => {
            if (char.torso.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.torso.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return CockDescriptor.describeCock(char, cocksThatFit[1]);
                else return CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.SmallestCockArea)[0]);
            }
        },
        cockheadfit: (char: Character, args: string) => {
            if (char.torso.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.torso.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return CockDescriptor.describeCockHead(cocksThatFit[0]);
                else return CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.SmallestCockArea)[0]);
            }
        },
        cockheadfit2: (char: Character, args: string) => {
            if (char.torso.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.torso.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return CockDescriptor.describeCockHead(cocksThatFit[1]);
                else return CockDescriptor.describeCock(char, char.torso.cocks.sort(Cock.SmallestCockArea)[0]);
            }
        },
        cock: (char: Character, args: string) => {
            if (char.torso.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cockIndex = +args - 1;
                if (cockIndex >= 0 && cockIndex - 1 < char.torso.cocks.count) return CockDescriptor.describeCock(char, char.torso.cocks.get(cockIndex));
                else return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
            }
        },
        cockhead: (char: Character, args: string) => {
            if (char.torso.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cockIndex = +args - 1;
                if (cockIndex >= 0 && cockIndex - 1 < char.torso.cocks.count) return CockDescriptor.describeCockHead(char.torso.cocks.get(cockIndex));
                else return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
            }
        },
    };

// These tags take an ascii attribute for lookup.
// [object attribute]
// if attribute cannot be cast to a number, the parser looks for "object" in twoWordTagsLookup,
// and then uses the corresponding object to determine the value of "attribute", by looking for
// "attribute" twoWordTagsLookup["object"]["attribute"]
/*const twoWordTagsLookup =
    {
        // NPCs:
        rubi: rubiLookups,
        arian: arianLookups,

        // PC Attributes:

        cock: cockLookups,
        cockhead: cockHeadLookups
    }*/
