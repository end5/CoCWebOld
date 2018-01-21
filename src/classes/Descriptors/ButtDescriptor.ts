import Butt, { ButtLooseness, ButtRating, ButtWetness } from '../Body/Butt';
import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default class ButtDescriptor {
    /**
     * Gives a full description of a Character's butt.
     * Be aware that it only supports Characters, not all Creatures.
     * @param    character
     * @return    A full description of a Character's butt.
     */
    public static describeButt(character: Character): string {
        let description: string = "";
        const butt: Butt = character.torso.butt;

        if (butt.rating < ButtRating.TIGHT) {
            if (character.tone >= 60)
                description += "incredibly tight, perky ";
            else {
                description = Utils.randomChoice(
                    "tiny",
                    "very small",
                    "dainty");
                // Soft PC's buns!
                if (character.tone <= 30 && Utils.chance(33))
                    description += " yet soft";
                description += " ";
            }
        }
        else if (butt.rating >= ButtRating.TIGHT && butt.rating < ButtRating.AVERAGE) {
            if (character.tone >= 65) {
                description = Utils.randomChoice(
                    "perky, muscular ",
                    "tight, toned ",
                    "compact, muscular ",
                    "tight ",
                    "muscular, toned ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice(
                    "tight ",
                    "firm ",
                    "compact ",
                    "petite ");
            }
            // FLABBAH
            else {
                description = Utils.randomChoice(
                    "small, heart-shaped ",
                    "soft, compact ",
                    "soft, heart-shaped ",
                    "small, cushy ",
                    "small ",
                    "petite ",
                    "snug ");
            }
        }
        else if (butt.rating >= ButtRating.AVERAGE && butt.rating < ButtRating.NOTICEABLE) {
            // TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("nicely muscled ",
                    "nice, toned ",
                    "muscly ",
                    "nice toned ",
                    "toned ",
                    "fair ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("nice ",
                    "fair ");
            }
            // FLABBAH
            else {
                description = Utils.randomChoice("nice, cushiony ",
                    "soft ",
                    "nicely-rounded, heart-shaped ",
                    "cushy ",
                    "soft, squeezable ");
            }
        }
        else if (butt.rating >= ButtRating.NOTICEABLE && butt.rating < ButtRating.LARGE) {
            // TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("full, toned ",
                    "muscly handful of ",
                    "shapely, toned ",
                    "muscular, hand-filling ",
                    "shapely, chiseled ",
                    "full ",
                    "chiseled ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("handful of ",
                    "full ",
                    "shapely ",
                    "hand-filling ");
            }
            // FLABBAH
            else {
                if (Utils.chance(12))
                    return "supple, handful of ass";
                description = Utils.randomChoice("somewhat jiggly ",
                    "soft, hand-filling ",
                    "cushiony, full ",
                    "plush, shapely ",
                    "full ",
                    "soft, shapely ",
                    "rounded, spongy ");
            }
        }
        else if (butt.rating >= ButtRating.LARGE && butt.rating < ButtRating.JIGGLY) {
            // TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("large, muscular ",
                    "substantial, toned ",
                    "big-but-tight ",
                    "squeezable, toned ",
                    "large, brawny ",
                    "big-but-fit ",
                    "powerful, squeezable ",
                    "large ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("squeezable ",
                    "large ",
                    "substantial ");
            }
            // FLABBAH
            else {
                description = Utils.randomChoice("large, bouncy ",
                    "soft, eye-catching ",
                    "big, slappable ",
                    "soft, pinchable ",
                    "large, plush ",
                    "squeezable ",
                    "cushiony ",
                    "plush ",
                    "pleasantly plump ");
            }
        }
        else if (butt.rating >= ButtRating.JIGGLY && butt.rating < ButtRating.EXPANSIVE) {
            // TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("thick, muscular ",
                    "big, burly ",
                    "heavy, powerful ",
                    "spacious, muscular ",
                    "toned, cloth-straining ",
                    "thick ",
                    "thick, strong ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("jiggling ",
                    "spacious ",
                    "heavy ",
                    "cloth-straining ");
            }
            // FLABBAH
            else {
                description = Utils.randomChoice("super-soft, jiggling ",
                    "spacious, cushy ",
                    "plush, cloth-straining ",
                    "squeezable, over-sized ",
                    "spacious ",
                    "heavy, cushiony ",
                    "slappable, thick ",
                    "jiggling ",
                    "spacious ",
                    "soft, plump ");
            }
        }
        else if (butt.rating >= ButtRating.EXPANSIVE && butt.rating < ButtRating.HUGE) {
            // TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("expansive, muscled ",
                    "voluminous, rippling ",
                    "generous, powerful ",
                    "big, burly ",
                    "well-built, voluminous ",
                    "powerful ",
                    "muscular ",
                    "powerful, expansive ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("expansive ",
                    "generous ",
                    "voluminous ",
                    "wide ");
            }
            // FLABBAH
            else {
                description = Utils.randomChoice("pillow-like ",
                    "generous, cushiony ",
                    "wide, plush ",
                    "soft, generous ",
                    "expansive, squeezable ",
                    "slappable ",
                    "thickly-padded ",
                    "wide, jiggling ",
                    "wide ",
                    "voluminous ",
                    "soft, padded ");
            }
        }
        else if (butt.rating >= ButtRating.HUGE && butt.rating < ButtRating.INCONCEIVABLY_BIG) {
            if (character.tone >= 65) {
                description = Utils.randomChoice("huge, toned ",
                    "vast, muscular ",
                    "vast, well-built ",
                    "huge, muscular ",
                    "strong, immense ",
                    "muscle-bound ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                if (Utils.chance(20))
                    return "jiggling expanse of ass";
                if (Utils.chance(20))
                    return "copious ass-flesh";
                description = Utils.randomChoice("huge ",
                    "vast ",
                    "giant ");
            }
            // FLABBAH
            else {
                description = Utils.randomChoice("vast, cushiony ",
                    "huge, plump ",
                    "expansive, jiggling ",
                    "huge, cushiony ",
                    "huge, slappable ",
                    "seam-bursting ",
                    "plush, vast ",
                    "giant, slappable ",
                    "giant ",
                    "huge ",
                    "swollen, pillow-like ");
            }
        }
        else if (butt.rating >= ButtRating.INCONCEIVABLY_BIG) {
            if (character.tone >= 65) {
                if (Utils.chance(14))
                    return "colossal, muscly ass";
                description = Utils.randomChoice("ginormous, muscle-bound ",
                    "colossal yet toned ",
                    "strong, tremdously large ",
                    "tremendous, muscled ",
                    "ginormous, toned ",
                    "colossal, well-defined ");
            }
            // Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("ginormous ",
                    "colossal ",
                    "tremendous ",
                    "gigantic ");
            }
            // FLABBAH
            else {
                description = Utils.randomChoice("ginormous, jiggly ",
                    "plush, ginormous ",
                    "seam-destroying ",
                    "tremendous, rounded ",
                    "bouncy, colossal ",
                    "thong-devouring ",
                    "tremendous, thickly padded ",
                    "ginormous, slappable ",
                    "gigantic, rippling ",
                    "gigantic ",
                    "ginormous ",
                    "colossal ",
                    "tremendous ");
            }
        }
        description += Utils.randomChoice("butt",
            "butt",
            "butt",
            "butt",
            "ass",
            "ass",
            "ass",
            "ass",
            "backside",
            "backside",
            "derriere",
            "rump",
            "bottom");
        // if(rando == 2) desc += "cheeks";
        return description;
    }

    /**
     * Gives a short description of a creature's butt.
     * Different from buttDescription in that it supports all creatures, not just characters.
     * Warning, very judgemental.
     * @param rating Butt Rating
     * @return Short description of a butt.
     */
    public static describeButtShort(rating: ButtRating): string {
        let description: string = "";
        if (rating < ButtRating.TIGHT) {
            description = Utils.randomChoice("insignificant ",
                "very small ");
        }
        else if (rating >= ButtRating.TIGHT && rating < ButtRating.AVERAGE) {
            description = Utils.randomChoice("tight ",
                "firm ",
                "compact ");
        }
        else if (rating >= ButtRating.AVERAGE && rating < ButtRating.NOTICEABLE) {
            description = Utils.randomChoice("regular ",
                "unremarkable ");
        }
        else if (rating >= ButtRating.NOTICEABLE && rating < ButtRating.LARGE) {
            if (Utils.chance(33))
                return "handful of ass";
            description = Utils.randomChoice("full ",
                "shapely ");
        }
        else if (rating >= ButtRating.LARGE && rating < ButtRating.JIGGLY) {
            description = Utils.randomChoice("squeezable ",
                "large ",
                "substantial ");
        }
        else if (rating >= ButtRating.JIGGLY && rating < ButtRating.EXPANSIVE) {
            description = Utils.randomChoice("jiggling ",
                "spacious ",
                "heavy ");
        }
        else if (rating >= ButtRating.EXPANSIVE && rating < ButtRating.HUGE) {
            if (Utils.chance(33))
                return "generous amount of ass";
            description = Utils.randomChoice("expansive ",
                "voluminous ");
        }
        else if (rating >= ButtRating.HUGE && rating < ButtRating.INCONCEIVABLY_BIG) {
            if (Utils.chance(66))
                return "jiggling expanse of ass";
            description = Utils.randomChoice("huge ",
                "vast ");
        }
        else if (rating >= ButtRating.INCONCEIVABLY_BIG) {
            description = Utils.randomChoice("ginormous ",
                "colossal ",
                "tremendous ");
        }
        description += Utils.randomChoice("butt ",
            "ass ");
        if (Utils.chance(50))
            description += "cheeks";
        return description;
    }

    public static describeButthole(butt: Butt): string {
        let description: string = "";

        if (Utils.chance(33)) {
            if (butt.wetness === ButtWetness.DRY)
                description += "";
            else if (butt.wetness === ButtWetness.NORMAL)
                description += "";
            else if (butt.wetness === ButtWetness.MOIST)
                description += "moist ";
            else if (butt.wetness === ButtWetness.SLIMY)
                description += "slimy ";
            else if (butt.wetness === ButtWetness.DROOLING)
                description += "drooling ";
            else if (butt.wetness === ButtWetness.SLIME_DROOLING)
                description += "slime-drooling ";
        }

        // 25% tightness description
        if (Utils.chance(25) || (butt.looseness <= ButtLooseness.TIGHT && Utils.chance(50))) {
            if (butt.looseness === ButtLooseness.VIRGIN)
                description += "virgin ";
            else if (butt.looseness === ButtLooseness.TIGHT)
                description += "tight ";
            else if (butt.looseness === ButtLooseness.NORMAL)
                description += "loose ";
            else if (butt.looseness === ButtLooseness.LOOSE)
                description += "roomy ";
            else if (butt.looseness === ButtLooseness.STRETCHED)
                description += "stretched ";
            else if (butt.looseness === ButtLooseness.GAPING)
                description += "gaping ";
        }

        // asshole descriptor
        description += Utils.randomChoice("ass",
            "anus",
            "pucker",
            "backdoor",
            "asshole",
            "butthole");

        return description;
    }
}
