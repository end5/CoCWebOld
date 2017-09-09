import { ButtRating as ButtRating, ButtWetness as ButtWetness, ButtLooseness as ButtLooseness, Butt } from "../Modules/Butt";
import Character from "../Character";
import Utils from "../Utilities/Utils";
import Creature from "../Creature";

export default class ButtDescriptor {
    /**
    * Gives a full description of a Character's butt.
    * Be aware that it only supports Characters, not all Creatures.
    * @param    character
    * @return    A full description of a Character's butt.
    */
    public static buttDescription(character: Character): string {
        let description: string = "";

        if (character.buttRating < ButtRating.TIGHT) {
            if (character.tone >= 60)
                description += "incredibly tight, perky ";
            else {
                description = Utils.randomChoice(
                    "tiny",
                    "very small",
                    "dainty");
                //Soft PC's buns!
                if (character.tone <= 30 && Utils.chance(33))
                    description += " yet soft";
                description += " ";
            }
        }
        else if (character.buttRating >= ButtRating.TIGHT && character.buttRating < ButtRating.AVERAGE) {
            if (character.tone >= 65) {
                description = Utils.randomChoice(
                    "perky, muscular ",
                    "tight, toned ",
                    "compact, muscular ",
                    "tight ",
                    "muscular, toned ");
            }
            //Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice(
                    "tight ",
                    "firm ",
                    "compact ",
                    "petite ");
            }
            //FLABBAH
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
        else if (character.buttRating >= ButtRating.AVERAGE && character.buttRating < ButtRating.NOTICEABLE) {
            //TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("nicely muscled ",
                    "nice, toned ",
                    "muscly ",
                    "nice toned ",
                    "toned ",
                    "fair ");
            }
            //Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("nice ",
                    "fair ");
            }
            //FLABBAH
            else {
                description = Utils.randomChoice("nice, cushiony ",
                    "soft ",
                    "nicely-rounded, heart-shaped ",
                    "cushy ",
                    "soft, squeezable ");
            }
        }
        else if (character.buttRating >= ButtRating.NOTICEABLE && character.buttRating < ButtRating.LARGE) {
            //TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("full, toned ",
                    "muscly handful of ",
                    "shapely, toned ",
                    "muscular, hand-filling ",
                    "shapely, chiseled ",
                    "full ",
                    "chiseled ");
            }
            //Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("handful of ",
                    "full ",
                    "shapely ",
                    "hand-filling ");
            }
            //FLABBAH
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
        else if (character.buttRating >= ButtRating.LARGE && character.buttRating < ButtRating.JIGGLY) {
            //TOIGHT LIKE A TIGER
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
            //Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("squeezable ",
                    "large ",
                    "substantial ");
            }
            //FLABBAH
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
        else if (character.buttRating >= ButtRating.JIGGLY && character.buttRating < ButtRating.EXPANSIVE) {
            //TOIGHT LIKE A TIGER
            if (character.tone >= 65) {
                description = Utils.randomChoice("thick, muscular ",
                    "big, burly ",
                    "heavy, powerful ",
                    "spacious, muscular ",
                    "toned, cloth-straining ",
                    "thick ",
                    "thick, strong ");
            }
            //Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("jiggling ",
                    "spacious ",
                    "heavy ",
                    "cloth-straining ");
            }
            //FLABBAH
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
        else if (character.buttRating >= ButtRating.EXPANSIVE && character.buttRating < ButtRating.HUGE) {
            //TOIGHT LIKE A TIGER
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
            //Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("expansive ",
                    "generous ",
                    "voluminous ",
                    "wide ");
            }
            //FLABBAH
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
        else if (character.buttRating >= ButtRating.HUGE && character.buttRating < ButtRating.INCONCEIVABLY_BIG) {
            if (character.tone >= 65) {
                description = Utils.randomChoice("huge, toned ",
                    "vast, muscular ",
                    "vast, well-built ",
                    "huge, muscular ",
                    "strong, immense ",
                    "muscle-bound ");
            }
            //Nondescript
            else if (character.tone >= 30) {
                if (Utils.chance(20))
                    return "jiggling expanse of ass";
                if (Utils.chance(20))
                    return "copious ass-flesh";
                description = Utils.randomChoice("huge ",
                    "vast ",
                    "giant ");
            }
            //FLABBAH
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
        else if (character.buttRating >= ButtRating.INCONCEIVABLY_BIG) {
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
            //Nondescript
            else if (character.tone >= 30) {
                description = Utils.randomChoice("ginormous ",
                    "colossal ",
                    "tremendous ",
                    "gigantic ");
            }
            //FLABBAH
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
        //if(rando == 2) desc += "cheeks";
        return description;
    }


    /**
        * Gives a short description of a creature's butt.
        * Different from buttDescription in that it supports all creatures, not just characters.
        * Warning, very judgemental.
        * @param    creature
        * @return Short description of a butt.
        */
    public static buttDescriptionShort(creature: Creature): string {
        let description: string = "";
        if (creature.buttRating < ButtRating.TIGHT) {
            description = Utils.randomChoice("insignificant ",
                "very small ");
        }
        else if (creature.buttRating >= ButtRating.TIGHT && creature.buttRating < ButtRating.AVERAGE) {
            description = Utils.randomChoice("tight ",
                "firm ",
                "compact ");
        }
        else if (creature.buttRating >= ButtRating.AVERAGE && creature.buttRating < ButtRating.NOTICEABLE) {
            description = Utils.randomChoice("regular ",
                "unremarkable ");
        }
        else if (creature.buttRating >= ButtRating.NOTICEABLE && creature.buttRating < ButtRating.LARGE) {
            if (Utils.chance(33))
                return "handful of ass";
            description = Utils.randomChoice("full ",
                "shapely ");
        }
        else if (creature.buttRating >= ButtRating.LARGE && creature.buttRating < ButtRating.JIGGLY) {
            description = Utils.randomChoice("squeezable ",
                "large ",
                "substantial ");
        }
        else if (creature.buttRating >= ButtRating.JIGGLY && creature.buttRating < ButtRating.EXPANSIVE) {
            description = Utils.randomChoice("jiggling ",
                "spacious ",
                "heavy ");
        }
        else if (creature.buttRating >= ButtRating.EXPANSIVE && creature.buttRating < ButtRating.HUGE) {
            if (Utils.chance(33))
                return "generous amount of ass";
            description = Utils.randomChoice("expansive ",
                "voluminous ");
        }
        else if (creature.buttRating >= ButtRating.HUGE && creature.buttRating < ButtRating.INCONCEIVABLY_BIG) {
            if (Utils.chance(66))
                return "jiggling expanse of ass";
            description = Utils.randomChoice("huge ",
                "vast ");
        }
        else if (creature.buttRating >= ButtRating.INCONCEIVABLY_BIG) {
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

    public static assholeDescript(butt: Butt): string {
        let description: string = "";

        if (Utils.chance(33)) {
            if (butt.analWetness == ButtWetness.DRY)
                description += "";
            else if (butt.analWetness == ButtWetness.NORMAL)
                description += "";
            else if (butt.analWetness == ButtWetness.MOIST)
                description += "moist ";
            else if (butt.analWetness == ButtWetness.SLIMY)
                description += "slimy ";
            else if (butt.analWetness == ButtWetness.DROOLING)
                description += "drooling ";
            else if (butt.analWetness == ButtWetness.SLIME_DROOLING)
                description += "slime-drooling ";
        }

        //25% tightness description
        if (Utils.chance(25) || (butt.analLooseness <= ButtLooseness.TIGHT && Utils.chance(50))) {
            if (butt.analLooseness == ButtLooseness.VIRGIN)
                description += "virgin ";
            else if (butt.analLooseness == ButtLooseness.TIGHT)
                description += "tight ";
            else if (butt.analLooseness == ButtLooseness.NORMAL)
                description += "loose ";
            else if (butt.analLooseness == ButtLooseness.LOOSE)
                description += "roomy ";
            else if (butt.analLooseness == ButtLooseness.STRETCHED)
                description += "stretched ";
            else if (butt.analLooseness == ButtLooseness.GAPING)
                description += "gaping ";
        }

        //asshole descriptor
        description += Utils.randomChoice("ass",
            "anus",
            "pucker",
            "backdoor",
            "asshole",
            "butthole");

        return description;
    }


}