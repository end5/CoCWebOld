import Cock, { CockType } from '../Body/Cock';
import { SkinType } from '../Body/Skin';
import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default class CockDescriptor {
    public static describeCock(character: Character, cock: Cock): string {
        if (character.torso.cocks.count > 0 || cock === undefined)
            return "<b>ERROR: CockDescript Called But No Cock Present</b>";

        // Only describe as pierced or sock covered if the creature has just one cock
        const isPierced: boolean = character.inventory.equipment.piercings.cocks.get(character.torso.cocks.indexOf(cock)).isEquipped();
        const hasSock: boolean = character.inventory.equipment.cockSocks.get(character.torso.cocks.indexOf(cock)).isEquipped();
        const isGooey: boolean = (character.skin.type === SkinType.GOO);
        if (Utils.chance(50)) {
            if (cock.type === CockType.HUMAN)
                return CockDescriptor.adjectiveCock(character, cock, character.stats.lust, character.cumQ(), isGooey) + " " + CockDescriptor.nounCock(cock.type);
            else
                return CockDescriptor.adjectiveCock(character, cock, character.stats.lust, character.cumQ(), isGooey) + ", " + CockDescriptor.nounCock(cock.type);
        }
        return CockDescriptor.nounCock(cock.type);
    }

    public static nounCock(cockType: CockType): string {
        if (cockType === CockType.HUMAN) {
            // Yeah, this is kind of messy
            // there is no other easy way to preserve the weighting fenoxo did
            return Utils.randomChoice("cock",
                "cock",
                "cock",
                "cock",
                "cock",
                "prick",
                "prick",
                "pecker",
                "shaft",
                "shaft",
                "shaft");
        }
        else if (cockType === CockType.BEE) {
            return Utils.randomChoice("bee prick",
                "bee prick",
                "bee prick",
                "bee prick",
                "insectoid cock",
                "insectoid cock",
                "furred monster");
        }
        else if (cockType === CockType.DOG) {
            return Utils.randomChoice("dog-shaped dong",
                "canine shaft",
                "pointed prick",
                "knotty dog-shaft",
                "bestial cock",
                "animalistic puppy-pecker",
                "pointed dog-dick",
                "pointed shaft",
                "canine member",
                "canine cock",
                "knotted dog-cock");
        }
        else if (cockType === CockType.FOX) {
            return Utils.randomChoice("fox-shaped dong",
                "vulpine shaft",
                "pointed prick",
                "knotty fox-shaft",
                "bestial cock",
                "animalistic vixen-pricker",
                "pointed fox-dick",
                "pointed shaft",
                "vulpine member",
                "vulpine cock",
                "knotted fox-cock");
        }
        else if (cockType === CockType.HORSE) {
            return Utils.randomChoice("flared horse-cock",
                "equine prick",
                "bestial horse-shaft",
                "flat-tipped horse-member",
                "animalistic stallion-prick",
                "equine dong",
                "beast cock",
                "flared stallion-cock");
        }
        else if (cockType === CockType.DEMON) {
            return Utils.randomChoice("nub-covered demon-dick",
                "nubby shaft",
                "corrupted cock",
                "perverse pecker",
                "bumpy demon-dick",
                "demonic cock",
                "demonic dong",
                "cursed cock",
                "infernal prick",
                "unholy cock",
                "blighted cock");
        }
        else if (cockType === CockType.TENTACLE) {
            return Utils.randomChoice("twisting tentacle-prick",
                "wriggling plant-shaft",
                "sinuous tentacle-cock",
                "squirming cock-tendril",
                "writhing tentacle-pecker",
                "wriggling plant-prick",
                "penile flora",
                "smooth shaft",
                "undulating tentacle-dick",
                "slithering vine-prick",
                "vine-shaped cock");
        }
        else if (cockType === CockType.CAT) {
            return Utils.randomChoice("feline dick",
                "spined cat-cock",
                "pink kitty-cock",
                "spiny prick",
                "animalistic kitty-prick",
                "oddly-textured cat-penis",
                "feline member",
                "spined shaft",
                "feline shaft",
                "barbed dick",
                "nubby kitten-prick");
        }
        else if (cockType === CockType.LIZARD) {
            return Utils.randomChoice("reptilian dick",
                "purple cock",
                "inhuman cock",
                "reptilian prick",
                "purple prick",
                "purple member",
                "serpentine member",
                "serpentine shaft",
                "reptilian shaft",
                "bulbous snake-shaft",
                "bulging snake-dick");
        }
        else if (cockType === CockType.ANEMONE) {
            return Utils.randomChoice("anemone dick",
                "tentacle-ringed cock",
                "blue member",
                "stinger-laden shaft",
                "pulsating prick",
                "anemone prick",
                "stinger-coated member",
                "blue cock",
                "tentacle-ringed dick",
                "near-transparent shaft",
                "squirming shaft");
        }
        else if (cockType === CockType.KANGAROO) {
            return Utils.randomChoice("kangaroo-like dick",
                "pointed cock",
                "marsupial member",
                "tapered shaft",
                "curved pecker",
                "pointed prick",
                "squirming kangaroo-cock",
                "marsupial cock",
                "tapered kangaroo-dick",
                "curved kangaroo-cock",
                "squirming shaft");
        }
        else if (cockType === CockType.DRAGON) {
            return Utils.randomChoice("dragon-like dick",
                "segmented shaft",
                "pointed prick",
                "knotted dragon-cock",
                "mythical mast",
                "segmented tool",
                "draconic dick",
                "draconic cock",
                "tapered dick",
                "unusual endowment",
                "scaly shaft");
        }
        else if (cockType === CockType.DISPLACER) {
            return Utils.randomChoice("coerl cock",
                "tentacle-tipped phallus",
                "starfish-tipped shaft",
                "alien member",
                "almost-canine dick",
                "bizarre prick",
                "beastly cock",
                "cthulhu-tier cock",
                "coerl cock",
                "animal dong",
                "star-capped tool",
                "knotted erection");
        }
        return Utils.randomChoice("cock",
            "prick",
            "pecker",
            "shaft");
    }

    // New cock adjectives.  The old one sucked dicks
    // This function handles all cockAdjectives. Previously there were separate functions for the player, monsters and NPCs.
    public static adjectiveCock(character: Character, cock: Cock, lust: number = 50, cumQ: number = 10, isGooey: boolean = false): string {
        const isPierced: boolean = character.inventory.equipment.piercings.cocks.get(character.torso.cocks.indexOf(cock)).isEquipped();
        const hasSock: boolean = character.inventory.equipment.cockSocks.get(character.torso.cocks.indexOf(cock)).isEquipped();
        // First, the three possible special cases
        if (isPierced && Utils.chance(20))
            return "pierced";
        if (hasSock && Utils.chance(20))
            return Utils.randomChoice("sock-sheathed", "garment-wrapped", "smartly dressed", "cloth-shrouded", "fabric swaddled", "covered");
        if (isGooey && Utils.chance(25))
            return Utils.randomChoice("goopey", "gooey", "slimy");
        // Length 1/3 chance
        if (Utils.chance(33)) {
            if (length < 3)
                return Utils.randomChoice("little", "toy-sized", "mini", "budding", "tiny");
            else if (length < 5)
                return Utils.randomChoice("short", "small");
            else if (length < 7)
                return Utils.randomChoice("fair-sized", "nice");
            else if (length < 9) {
                if (cock.type === CockType.HORSE)
                    return Utils.randomChoice("sizable", "pony-sized", "colt-like");
                return Utils.randomChoice("sizable", "long", "lengthy");
            }
            else if (length < 13) {
                if (cock.type === CockType.DOG)
                    return Utils.randomChoice("huge", "foot-long", "mastiff-like");
                return Utils.randomChoice("huge", "foot-long", "cucumber-length");
            }
            else if (length < 18)
                return Utils.randomChoice("massive", "knee-length", "forearm-length");
            else if (length < 30)
                return Utils.randomChoice("enormous", "giant", "arm-like");
            else if (cock.type === CockType.TENTACLE && Utils.chance(50))
                return "coiled";
            else
                return Utils.randomChoice("towering", "freakish", "monstrous", "massive");
        }
        // Hornyness 1/2
        else if (lust > 75 && Utils.chance(50)) {
            if (lust > 90) { // Uber horny like a baws!
                if (cumQ < 50)
                    return Utils.randomChoice("throbbing", "pulsating"); // Weak as shit cum
                else if (cumQ < 200)
                    return Utils.randomChoice("dribbling", "leaking", "drooling"); // lots of cum? drippy.
                else
                    return Utils.randomChoice("very drippy", "pre-gushing", "cum-bubbling", "pre-slicked", "pre-drooling"); // Tons of cum
            }
            else {// A little less lusty, but still lusty.
                if (cumQ < 50)
                    return Utils.randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager"); // Weak as shit cum
                else if (cumQ < 200)
                    return Utils.randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager", "fluid-beading", "slowly-oozing"); // A little drippy
                else
                    return Utils.randomChoice("dribbling", "drooling", "fluid-leaking", "leaking"); // uber drippy
            }
        }
        // Girth - fallback
        if (cock.thickness <= 0.75) return Utils.randomChoice("thin", "slender", "narrow");
        else if (cock.thickness <= 1.2)
            return "ample";
        else if (cock.thickness <= 1.4)
            return Utils.randomChoice("ample", "big");
        else if (cock.thickness <= 2)
            return Utils.randomChoice("broad", "meaty", "girthy");
        else if (cock.thickness <= 3.5)
            return Utils.randomChoice("fat", "distended", "wide");
        else
            return Utils.randomChoice("inhumanly distended", "monstrously thick", "bloated");
    }

    // Cock adjectives for single cock
    public static adjectivesCock(cock: Cock, character: Character): string {
        let description: string = "";
        // length or thickness, usually length.
        if (Utils.chance(25)) {
            if (cock.length < 3) {
                description = Utils.randomChoice("little", "toy-sized", "tiny");
            }
            else if (cock.length < 5) {
                description = Utils.randomChoice("short", "small");
            }
            else if (cock.length < 7) {
                description = Utils.randomChoice("fair-sized", "nice");
            }
            else if (cock.length < 9) {
                description = Utils.randomChoice("long", "lengthy", "sizable");
            }
            else if (cock.length < 13) {
                description = Utils.randomChoice("huge", "foot-long");
            }
            else if (cock.length < 18) {
                description = Utils.randomChoice("massive", "forearm-length");
            }
            else if (cock.length < 30) {
                description = Utils.randomChoice("enormous", "monster-length");
            }
            else {
                description = Utils.randomChoice("towering", "freakish", "massive");
            }
        }
        // thickness go!
        else if (Utils.chance(25)) {
            if (cock.thickness <= .75)
                description += "narrow";
            else if (cock.thickness <= 1.1)
                description += "nice";
            else if (cock.thickness <= 1.4)
                description += Utils.randomChoice("ample", "big");
            else if (cock.thickness <= 2)
                description += Utils.randomChoice("broad", "girthy");
            else if (cock.thickness <= 3.5)
                description += Utils.randomChoice("fat", "distended");
            else
                description += Utils.randomChoice("inhumanly distended", "monstrously thick");
        }
        // Length/Thickness done.  Moving on to special animal characters/lust stuff.
        /*Animal Fillers - turned off due to duplication in noun segment
            else if(type == 1 && descripts == 0 && Utils.rand(2) == 0) {
            if(Utils.rand(2) == 0) descript += "flared ";
            else descript += "musky ";
            }
            else if(type == 2 && descripts == 0 && Utils.rand(2) == 0) {
            descript += "musky ";
            }*/
        // FINAL FALLBACKS - lust descriptors
        // Lust stuff
        else if (character.stats.lust > 90) {
            // lots of cum? drippy.
            if (character.cumQ() > 50 && character.cumQ() < 200 && Utils.chance(50)) {
                switch (cock.type) {
                    case CockType.HUMAN:
                    case CockType.HORSE:
                    case CockType.DOG:
                    case CockType.CAT:
                    case CockType.KANGAROO:
                    case CockType.FOX:
                        description += "animal-pre leaking";
                        break;
                    default:
                        description += "pre-slickened";
                        break;
                }
            }
            // Tons of cum
            else if (character.cumQ() >= 200 && Utils.chance(50)) {
                switch (cock.type) {
                    case CockType.HUMAN:
                    case CockType.HORSE:
                    case CockType.DOG:
                    case CockType.CAT:
                    case CockType.KANGAROO:
                    case CockType.FOX:
                        description += "animal-spunk dripping";
                        break;
                    default:
                        description += "cum-drooling";
                        break;
                }
            }
            // Not descripted? Pulsing and twitching
            else
                description += Utils.randomChoice("throbbing", "pulsating");
        }
        // A little less lusty, but still lusty.
        else if (character.stats.lust > 75) {
            if (character.cumQ() > 50 && character.cumQ() < 200 && Utils.chance(50))
                description += "pre-leaking";
            else if (character.cumQ() >= 200 && Utils.chance(50))
                description += "pre-cum dripping";
            else
                description += Utils.randomChoice("rock-hard", "eager");
        }
        // Not lusty at all, fallback adjective
        else if (character.stats.lust > 50)
            description += "hard";
        else
            description += "ready";
        return description;
    }

    public static nounMultiCock(cockType: CockType): string {
        if (cockType === CockType.HUMAN)
            return Utils.randomChoice("cock",
                "cock",
                "cock",
                "cock",
                "cock",
                "prick",
                "prick",
                "pecker",
                "shaft",
                "shaft",
                "shaft");
        else if (cockType === CockType.BEE)
            return Utils.randomChoice("bee prick",
                "bee prick",
                "bee prick",
                "bee prick",
                "insectoid cock",
                "insectoid cock",
                "furred monster");
        else if (cockType === CockType.DOG)
            return Utils.randomChoice("doggie dong",
                "canine shaft",
                "pointed prick",
                "dog-shaft",
                "dog-cock",
                "puppy-pecker",
                "dog-dick",
                "pointed shaft",
                "canine cock",
                "canine cock",
                "dog cock");
        else if (cockType === CockType.HORSE)
            return Utils.randomChoice("horsecock",
                "equine prick",
                "horse-shaft",
                "horse-prick",
                "stallion-prick",
                "equine dong");
        else if (cockType === CockType.DEMON)
            return Utils.randomChoice("demon-dick",
                "nubby shaft",
                "corrupted cock",
                "perverse pecker",
                "bumpy demon-dick",
                "demonic cock",
                "demonic dong",
                "cursed cock",
                "infernal prick",
                "unholy cock",
                "blighted cock");
        else if (cockType === CockType.TENTACLE)
            return Utils.randomChoice("tentacle prick",
                "plant-like shaft",
                "tentacle cock",
                "cock-tendril",
                "tentacle pecker",
                "plant prick",
                "penile flora",
                "smooth inhuman shaft",
                "tentacle dick",
                "vine prick",
                "vine-like cock");
        else if (cockType === CockType.CAT)
            return Utils.randomChoice("feline dick",
                "cat-cock",
                "kitty-cock",
                "spiny prick",
                "pussy-prick",
                "cat-penis",
                "feline member",
                "spined shaft",
                "feline shaft",
                "'barbed' dick",
                "kitten-prick");
        else if (cockType === CockType.LIZARD)
            return Utils.randomChoice("reptile-dick",
                "purple cock",
                "inhuman cock",
                "reptilian prick",
                "purple prick",
                "purple member",
                "serpentine member",
                "serpentine shaft",
                "reptilian shaft",
                "snake-shaft",
                "snake dick");
        return Utils.randomChoice("cock",
            "prick",
            "pecker",
            "shaft");
    }

    /**
     * Previously sMultiCockDesc and SMultiCockDesc
     * @param character
     * @param caps
     */
    public static describeMultiCockSimpleOne(character: Character, caps: boolean = false): string {
        if (caps)
            return (character.torso.cocks.count > 1 ? "One of your " : "Your ") + CockDescriptor.cockMultiLDescriptionShort(character);
        else
            return (character.torso.cocks.count > 1 ? "one of your " : "your ") + CockDescriptor.cockMultiLDescriptionShort(character);
    }

    /**
     * Previously oMultiCockDesc and OMultiCockDesc
     * @param character
     * @param caps
     */
    public static describeMultiCockSimpleEach(character: Character, caps: boolean = false): string {
        if (caps)
            return (character.torso.cocks.count > 1 ? "Each of your " : "Your ") + CockDescriptor.cockMultiLDescriptionShort(character);
        else
            return (character.torso.cocks.count > 1 ? "each of your " : "your ") + CockDescriptor.cockMultiLDescriptionShort(character);
    }

    private static cockMultiLDescriptionShort(character: Character): string {
        const cocks = character.torso.cocks;
        if (cocks.count >= 1) {
            if (cocks.count === 1) { // For a single cock return the default description
                return CockDescriptor.describeCock(character, cocks.get(0));
            }
            if (cocks.get(0).type === CockType.DOG || cocks.get(0).type === CockType.FOX) {
                return CockDescriptor.nounCock(CockType.DOG) + "s";
            }
            return CockDescriptor.nounCock(cocks[0].type) + "s";
        }

        return CockDescriptor.nounCock(CockType.HUMAN) + "s";
    }

    public static describeCockHead(cock: Cock): string {
        switch (cock.type) {
            case CockType.CAT:
                return Utils.randomChoice(
                    "ponumber",
                    "narrow tip"
                );
            case CockType.DEMON:
                return Utils.randomChoice(
                    "tanumbered crown",
                    "nub-ringed tip"
                );
            case CockType.DISPLACER:
                return Utils.randomChoice(
                    "star tip",
                    "blooming cock-head",
                    "open crown",
                    "alien tip",
                    "bizarre head"
                );
            case CockType.DOG:
            case CockType.FOX:
                return Utils.randomChoice(
                    "ponumbered tip",
                    "narrow tip"
                );
            case CockType.HORSE:
                return Utils.randomChoice(
                    "flare",
                    "flat tip"
                );
            case CockType.KANGAROO:
                return Utils.randomChoice(
                    "tip",
                    "ponumber"
                );
            case CockType.LIZARD:
                return Utils.randomChoice(
                    "crown",
                    "head"
                );
            case CockType.TENTACLE:
                return Utils.randomChoice(
                    "mushroom-like tip",
                    "wide plant-like crown"
                );
            default:
                return Utils.randomChoice(
                    "crown",
                    "head",
                    "cock-head"
                );
        }
    }

    public static describeCockSheath(cock: Cock): string {
        return cock.hasSheath() ? "sheath" : "base";
    }

    // Short cock description. Describes length or girth. Supports multiple cocks.
    public static describeCockShort(cock: Cock): string {
        let description: string = "";
        // Discuss length one in 3 times
        if (Utils.chance(33)) {
            if (cock.length >= 30)
                description = "towering ";
            else if (cock.length >= 18)
                description = "enormous ";
            else if (cock.length >= 13)
                description = "massive ";
            else if (cock.length >= 10)
                description = "huge ";
            else if (cock.length >= 7)
                description = "long ";
            else if (cock.length >= 5)
                description = "average ";
            else
                description = "short ";
        }
        else if (Utils.chance(50)) { // Discuss girth one in 2 times if not already talked about length.
            // narrow, thin, ample, broad, distended, voluminous
            if (cock.thickness <= .75)
                description = "narrow ";
            else if (cock.thickness > 1 && cock.thickness <= 1.4)
                description = "ample ";
            else if (cock.thickness > 1.4 && cock.thickness <= 2)
                description = "broad ";
            else if (cock.thickness > 2 && cock.thickness <= 3.5)
                description = "fat ";
            else if (cock.thickness > 3.5)
                description = "distended ";
        }
        // Seems to work better without this comma:			if (descripted && cock.cockType != CockType.HUMAN) description += ", ";
        description += CockDescriptor.nounCock(cock.type);

        return description;
    }

    public static describeMultiCockShort(character: Character): string {
        let description: string = "";
        const cocks = character.torso.cocks;
        const cockCount = cocks.count;
        const cocksSameType: boolean = cockCount === cocks.filterType(cocks.get(0).type).length;

        if (cockCount === 1)
            return CockDescriptor.describeCock(character, cocks.get(0));

        if (cockCount === 2) {
            if (cocksSameType)
                description += Utils.randomChoice("pair of ", "two ", "brace of ", "matching ", "twin ");
            else
                description += Utils.randomChoice("pair of ", "two ", "brace of ");
        }
        else if (cockCount === 3) {
            if (cocksSameType)
                description += Utils.randomChoice("three ", "group of ", "<i>ménage à trois</i> of ", "triad of ", "triumvirate of ");
            else
                description += Utils.randomChoice("three ", "group of ");
        }
        else if (cockCount > 3)
            description += Utils.randomChoice("bundle of ", "obscene group of ", "cluster of ", "wriggling bunch of ");

        description += CockDescriptor.adjectiveCock(character, cocks.sort(Cock.LargestCockArea)[0], character.stats.lust, character.cumQ(), character.skin.type === SkinType.GOO);

        if (cocksSameType)
            description += ", " + CockDescriptor.nounCock(cocks[0].cockType) + "s";
        else
            description += Utils.randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");

        return description;
    }

    public static describeMultiCock(character: Character): string {
        let description: string = "";
        const cocks = character.torso.cocks;
        const cockCount: number = cocks.count;
        const cocksSameType: boolean = cockCount === cocks.filterType(cocks.get(0).type).length;

        if (cockCount === 1)
            return CockDescriptor.describeCock(character, cocks.get(0));

        if (cockCount === 2) {
            if (cocksSameType)
                description += Utils.randomChoice("a pair of ", "two ", "a brace of ", "matching ", "twin ");
            else
                description += Utils.randomChoice("a pair of ", "two ", "a brace of ");
        }
        else if (cockCount === 3) {
            if (cocksSameType)
                description += Utils.randomChoice("three ", "a group of ", "a <i>ménage à trois</i> of ", "a triad of ", "a triumvirate of ");
            else
                description += Utils.randomChoice("three ", "a group of ");
        }
        else if (cockCount > 3)
            description += Utils.randomChoice("a bundle of ", "an obscene group of ", "a cluster of ", "a wriggling group of ");

        description += CockDescriptor.adjectiveCock(character, cocks.sort(Cock.LargestCockArea)[0], character.stats.lust, character.cumQ(), character.skin.type === SkinType.GOO);

        if (cocksSameType)
            description += ", " + CockDescriptor.nounCock(cocks[0].cockType) + "s";
        else
            description += Utils.randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");

        return description;
    }
}
