import Butt, { ButtLooseness, ButtRating, ButtWetness } from '../Body/Butt';
import Creature from '../Body/Creature';
import Utils from '../Utilities/Utils';

export default class ButtDescriptor {
    /**
    * Gives a full description of a Character's butt.
    * Be aware that it only supports Characters, not all Creatures.
    * @param    body
    * @return    A full description of a Character's butt.
    */
    public static describeButt(body: Creature): string {
        let description: string = "";
        let butt: Butt = body.lowerBody.butt;

        if (butt.buttRating < ButtRating.TIGHT) {
            if (body.tone >= 60)
                description += "incredibly tight, perky ";
            else {
                description = Utils.randomChoice(
                    "tiny",
                    "very small",
                    "dainty");
                //Soft PC's buns!
                if (body.tone <= 30 && Utils.chance(33))
                    description += " yet soft";
                description += " ";
            }
        }
        else if (butt.buttRating >= ButtRating.TIGHT && butt.buttRating < ButtRating.AVERAGE) {
            if (body.tone >= 65) {
                description = Utils.randomChoice(
                    "perky, muscular ",
                    "tight, toned ",
                    "compact, muscular ",
                    "tight ",
                    "muscular, toned ");
            }
            //Nondescript
            else if (body.tone >= 30) {
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
        else if (butt.buttRating >= ButtRating.AVERAGE && butt.buttRating < ButtRating.NOTICEABLE) {
            //TOIGHT LIKE A TIGER
            if (body.tone >= 65) {
                description = Utils.randomChoice("nicely muscled ",
                    "nice, toned ",
                    "muscly ",
                    "nice toned ",
                    "toned ",
                    "fair ");
            }
            //Nondescript
            else if (body.tone >= 30) {
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
        else if (butt.buttRating >= ButtRating.NOTICEABLE && butt.buttRating < ButtRating.LARGE) {
            //TOIGHT LIKE A TIGER
            if (body.tone >= 65) {
                description = Utils.randomChoice("full, toned ",
                    "muscly handful of ",
                    "shapely, toned ",
                    "muscular, hand-filling ",
                    "shapely, chiseled ",
                    "full ",
                    "chiseled ");
            }
            //Nondescript
            else if (body.tone >= 30) {
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
        else if (butt.buttRating >= ButtRating.LARGE && butt.buttRating < ButtRating.JIGGLY) {
            //TOIGHT LIKE A TIGER
            if (body.tone >= 65) {
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
            else if (body.tone >= 30) {
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
        else if (butt.buttRating >= ButtRating.JIGGLY && butt.buttRating < ButtRating.EXPANSIVE) {
            //TOIGHT LIKE A TIGER
            if (body.tone >= 65) {
                description = Utils.randomChoice("thick, muscular ",
                    "big, burly ",
                    "heavy, powerful ",
                    "spacious, muscular ",
                    "toned, cloth-straining ",
                    "thick ",
                    "thick, strong ");
            }
            //Nondescript
            else if (body.tone >= 30) {
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
        else if (butt.buttRating >= ButtRating.EXPANSIVE && butt.buttRating < ButtRating.HUGE) {
            //TOIGHT LIKE A TIGER
            if (body.tone >= 65) {
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
            else if (body.tone >= 30) {
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
        else if (butt.buttRating >= ButtRating.HUGE && butt.buttRating < ButtRating.INCONCEIVABLY_BIG) {
            if (body.tone >= 65) {
                description = Utils.randomChoice("huge, toned ",
                    "vast, muscular ",
                    "vast, well-built ",
                    "huge, muscular ",
                    "strong, immense ",
                    "muscle-bound ");
            }
            //Nondescript
            else if (body.tone >= 30) {
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
        else if (butt.buttRating >= ButtRating.INCONCEIVABLY_BIG) {
            if (body.tone >= 65) {
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
            else if (body.tone >= 30) {
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
        * @param    body
        * @return Short description of a butt.
        */
    public static describeButtShort(body: Creature): string {
        let description: string = "";
        let buttRating: number = body.lowerBody.butt.buttRating;
        if (buttRating < ButtRating.TIGHT) {
            description = Utils.randomChoice("insignificant ",
                "very small ");
        }
        else if (buttRating >= ButtRating.TIGHT && buttRating < ButtRating.AVERAGE) {
            description = Utils.randomChoice("tight ",
                "firm ",
                "compact ");
        }
        else if (buttRating >= ButtRating.AVERAGE && buttRating < ButtRating.NOTICEABLE) {
            description = Utils.randomChoice("regular ",
                "unremarkable ");
        }
        else if (buttRating >= ButtRating.NOTICEABLE && buttRating < ButtRating.LARGE) {
            if (Utils.chance(33))
                return "handful of ass";
            description = Utils.randomChoice("full ",
                "shapely ");
        }
        else if (buttRating >= ButtRating.LARGE && buttRating < ButtRating.JIGGLY) {
            description = Utils.randomChoice("squeezable ",
                "large ",
                "substantial ");
        }
        else if (buttRating >= ButtRating.JIGGLY && buttRating < ButtRating.EXPANSIVE) {
            description = Utils.randomChoice("jiggling ",
                "spacious ",
                "heavy ");
        }
        else if (buttRating >= ButtRating.EXPANSIVE && buttRating < ButtRating.HUGE) {
            if (Utils.chance(33))
                return "generous amount of ass";
            description = Utils.randomChoice("expansive ",
                "voluminous ");
        }
        else if (buttRating >= ButtRating.HUGE && buttRating < ButtRating.INCONCEIVABLY_BIG) {
            if (Utils.chance(66))
                return "jiggling expanse of ass";
            description = Utils.randomChoice("huge ",
                "vast ");
        }
        else if (buttRating >= ButtRating.INCONCEIVABLY_BIG) {
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

    public static describeButthole(body: Creature): string {
        let description: string = "";
        let butt: Butt = body.lowerBody.butt;

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