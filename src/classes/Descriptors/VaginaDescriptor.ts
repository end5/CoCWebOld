import Creature, { SkinType } from '../Body/Creature';
import Vagina, { VaginaLooseness, VaginaType, VaginaWetness } from '../Body/Vagina';
import Utils from '../Utilities/Utils';

export default class VaginaDescriptor {
    public static describeVagina(body: Creature, vagina: Vagina): string {
        let description: string = "";

        //tightness descript - 40% display rate
        if (Utils.chance(40)) {
            if (vagina.vaginalLooseness == VaginaLooseness.TIGHT)
                description += vagina.virgin ? "virgin" : "tight";
            else if (vagina.vaginalLooseness == VaginaLooseness.LOOSE)
                description += "loose";
            else if (vagina.vaginalLooseness == VaginaLooseness.GAPING)
                description += "very loose";
            else if (vagina.vaginalLooseness == VaginaLooseness.GAPING_WIDE)
                description += "gaping";
            else if (vagina.vaginalLooseness == VaginaLooseness.LEVEL_CLOWN_CAR)
                description += "gaping-wide";

        }
        //wetness descript - 30% display rate
        if (Utils.chance(30)) {
            if (description.length > 0)
                description += ", ";
            if (vagina.vaginalWetness == VaginaWetness.DRY)
                description += "dry";
            if (vagina.vaginalWetness == VaginaWetness.NORMAL)
                description += "moist";
            if (vagina.vaginalWetness == VaginaWetness.WET)
                description += "wet";
            if (vagina.vaginalWetness == VaginaWetness.SLICK )
                description += "slick";
            if (vagina.vaginalWetness == VaginaWetness.DROOLING)
                description += "drooling";
            if (vagina.vaginalWetness == VaginaWetness.SLAVERING)
                description += "slavering";
        }
        if (vagina.labiaPierced > 0 && Utils.chance(33)) {
            if (description.length > 0)
                description += ", ";
            description += "pierced";
        }
        if (description == "" && body.skinType == SkinType.GOO) {
            if (description.length > 0)
                description += ", ";

            description += Utils.randomChoice("gooey", "slimy");
        }
        if (vagina.vaginaType == VaginaType.BLACK_SAND_TRAP && Utils.chance(50)) {
            if (description.length > 0)
                description += ", ";
            description += Utils.randomChoice(
                "black",
                "onyx",
                "ebony",
                "dusky",
                "sable",
                "obsidian",
                "midnight-hued",
                "jet black");
        }

        if (description.length > 0)
            description += " ";
        description += Utils.randomChoice(
            "vagina",
            "pussy",
            "cooter",
            "twat",
            "cunt",
            "snatch",
            "fuck-hole",
            "muff");
        //Something that would be nice to have but needs a variable in Creature or Character.
        //if(i_creature.bunnyScore() >= 3) description += "rabbit hole";

        return description;
    }

    public static describeClit(body: Creature, vagina: Vagina): string {
        let description: string = "";
        //Length Adjective - 50% chance
        if (Utils.chance(50)) {
            //small clits!
            if (vagina.clitLength <= .5) {
                description += Utils.randomChoice(
                    "tiny ",
                    "little ",
                    "petite ",
                    "diminutive ",
                    "miniature ");
            }
            //"average".
            if (vagina.clitLength > .5 && vagina.clitLength < 1.5) {
                //no size comment
            }
            //Biggies!
            if (vagina.clitLength >= 1.5 && vagina.clitLength < 4) {
                description += Utils.randomChoice(
                    "large ",
                    "large ",
                    "substantial ",
                    "substantial ",
                    "considerable ");
            }
            //'Uge
            if (vagina.clitLength >= 4) {
                description += Utils.randomChoice(
                    "monster ",
                    "tremendous ",
                    "colossal ",
                    "enormous ",
                    "bulky ");
            }
        }
        //Descriptive descriptions - 50% chance of being called
        if (Utils.chance(50)) {
            //Doggie descriptors - 50%
            if (body.skinType == SkinType.FUR && Utils.chance(50)) {
                description += "bitch-";
            }
            /*Horse descriptors - 50%
                if(creature.skinType == SkinType.FUR && !descripted && Utils.chance(50)) {
                descripted = true;
                descript += "mare-";
                }*/
            //Horny descriptors - 75% chance
            else if (body.stats.lust > 70 && Utils.chance(75)) {
                description += Utils.randomChoice(
                    "throbbing ",
                    "pulsating ",
                    "hard ");
            }
            //High libido - always use if no other descript
            else if (body.stats.lib > 50 && Utils.chance(50)) {
                description += Utils.randomChoice(
                    "insatiable ",
                    "greedy ",
                    "demanding ",
                    "rapacious");
            }
        }
        else if (vagina.clitPierced > 0) {
            description += "pierced ";
        }

        //Clit nouns
        description += Utils.randomChoice(
            "clit",
            "clitty",
            "button",
            "pleasure-buzzer",
            "clit",
            "clitty",
            "button",
            "clit",
            "clit",
            "button");

        return description;
    }

}