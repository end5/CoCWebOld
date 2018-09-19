import { Cock } from '../Body/Cock';
import { Character } from '../Character/Character';
import { Desc } from '../Descriptors/Descriptors';

// provides rubiLookups and arianLookups
// note that these are only used in doubleArgLookups, not in Parser.as itself
//
// =!= NOTE: MUST BE IMPORTED BEFORE "./doubleArgLookups.as" =!=

// PC ASCII Aspect lookups

const cockLookups = // For subject: "cock"
    {
        all: (char: Character) => describeMultiCockShort(char),
        each: (char: Character) => describeMultiCockSimpleEach(char),
        one: (char: Character) => describeMultiCockSimpleOne(char),
        largest: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Largest)[0]),
        biggest: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Largest)[0]),
        biggest2: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Largest)[1]),
        biggest3: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Largest)[2]),
        smallest: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Smallest)[0]),
        smallest2: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Smallest)[1]),
        longest: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Longest)[0]),
        shortest: (char: Character) => describeCock(char, char.body.cocks.sort(Cock.Shortest)[0])
    };

const cockHeadLookups = // For subject: "cockHead"
    {
        biggest: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Largest)[0]),
        biggest2: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Largest)[1]),
        biggest3: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Largest)[2]),
        largest: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Largest)[0]),
        smallest: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Smallest)[0]),
        smallest2: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Smallest)[1]),
        longest: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Longest)[0]),
        shortest: (char: Character) => describeCockHead(char.body.cocks.sort(Cock.Shortest)[0])
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
            if (char.body.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.body.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return describeCock(char, cocksThatFit[0]);
                else return describeCock(char, char.body.cocks.sort(Cock.Smallest)[0]);
            }
        },
        cockfit2: (char: Character, args: string) => {
            if (char.body.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.body.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return describeCock(char, cocksThatFit[1]);
                else return describeCock(char, char.body.cocks.sort(Cock.Smallest)[0]);
            }
        },
        cockheadfit: (char: Character, args: string) => {
            if (char.body.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.body.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return describeCockHead(cocksThatFit[0]);
                else return describeCock(char, char.body.cocks.sort(Cock.Smallest)[0]);
            }
        },
        cockheadfit2: (char: Character, args: string) => {
            if (char.body.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cocksThatFit = char.body.cocks.filter(Cock.CockThatFits(+args));
                if (cocksThatFit.length >= 0) return describeCockHead(cocksThatFit[1]);
                else return describeCock(char, char.body.cocks.sort(Cock.Smallest)[0]);
            }
        },
        cock: (char: Character, args: string) => {
            if (char.body.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cockIndex = +args - 1;
                if (cockIndex >= 0 && cockIndex - 1 < char.body.cocks.count) return describeCock(char, char.body.cocks.get(cockIndex));
                else return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
            }
        },
        cockhead: (char: Character, args: string) => {
            if (char.body.cocks.count <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                const cockIndex = +args - 1;
                if (cockIndex >= 0 && cockIndex - 1 < char.body.cocks.count) return describeCockHead(char.body.cocks.get(cockIndex));
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
