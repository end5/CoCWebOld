import { SkinType } from '../Body/Skin';
import Vagina, { VaginaLooseness, VaginaType, VaginaWetness } from '../Body/Vagina';
import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default class VaginaDescriptor {
    public static describeVagina(character: Character, vagina: Vagina): string {
        let description: string = "";

        // tightness descript - 40% display rate
        if (Utils.chance(40)) {
            if (vagina.looseness === VaginaLooseness.TIGHT)
                description += vagina.virgin ? "virgin" : "tight";
            else if (vagina.looseness === VaginaLooseness.LOOSE)
                description += "loose";
            else if (vagina.looseness === VaginaLooseness.GAPING)
                description += "very loose";
            else if (vagina.looseness === VaginaLooseness.GAPING_WIDE)
                description += "gaping";
            else if (vagina.looseness === VaginaLooseness.LEVEL_CLOWN_CAR)
                description += "gaping-wide";

        }
        // wetness descript - 30% display rate
        if (Utils.chance(30)) {
            if (description.length > 0)
                description += ", ";
            if (vagina.wetness === VaginaWetness.DRY)
                description += "dry";
            if (vagina.wetness === VaginaWetness.NORMAL)
                description += "moist";
            if (vagina.wetness === VaginaWetness.WET)
                description += "wet";
            if (vagina.wetness === VaginaWetness.SLICK )
                description += "slick";
            if (vagina.wetness === VaginaWetness.DROOLING)
                description += "drooling";
            if (vagina.wetness === VaginaWetness.SLAVERING)
                description += "slavering";
        }
        if (character.inventory.equipment.piercings.labia.isEquipped() && Utils.chance(33)) {
            if (description.length > 0)
                description += ", ";
            description += "pierced";
        }
        if (description === "" && character.skin.type === SkinType.GOO) {
            if (description.length > 0)
                description += ", ";

            description += Utils.randomChoice("gooey", "slimy");
        }
        if (vagina.type === VaginaType.BLACK_SAND_TRAP && Utils.chance(50)) {
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
        // Something that would be nice to have but needs a variable in Creature or Character.
        // if(i_creature.bunnyScore() >= 3) description += "rabbit hole";

        return description;
    }

    public static describeClit(character: Character): string {
        let description: string = "";
        const clit = character.torso.clit;
        // Length Adjective - 50% chance
        if (Utils.chance(50)) {
            // small clits!
            if (clit.length <= .5) {
                description += Utils.randomChoice(
                    "tiny ",
                    "little ",
                    "petite ",
                    "diminutive ",
                    "miniature ");
            }
            // "average".
            if (clit.length > .5 && clit.length < 1.5) {
                // no size comment
            }
            // Biggies!
            if (clit.length >= 1.5 && clit.length < 4) {
                description += Utils.randomChoice(
                    "large ",
                    "large ",
                    "substantial ",
                    "substantial ",
                    "considerable ");
            }
            // 'Uge
            if (clit.length >= 4) {
                description += Utils.randomChoice(
                    "monster ",
                    "tremendous ",
                    "colossal ",
                    "enormous ",
                    "bulky ");
            }
        }
        // Descriptive descriptions - 50% chance of being called
        if (Utils.chance(50)) {
            // Doggie descriptors - 50%
            if (character.skin.type === SkinType.FUR && Utils.chance(50)) {
                description += "bitch-";
            }
            /*Horse descriptors - 50%
                if(creature.skinType == SkinType.FUR && !descripted && Utils.chance(50)) {
                descripted = true;
                descript += "mare-";
                }*/
            // Horny descriptors - 75% chance
            else if (character.stats.lust > 70 && Utils.chance(75)) {
                description += Utils.randomChoice(
                    "throbbing ",
                    "pulsating ",
                    "hard ");
            }
            // High libido - always use if no other descript
            else if (character.stats.lib > 50 && Utils.chance(50)) {
                description += Utils.randomChoice(
                    "insatiable ",
                    "greedy ",
                    "demanding ",
                    "rapacious");
            }
        }
        else if (character.inventory.equipment.piercings.clit.isEquipped()) {
            description += "pierced ";
        }

        // Clit nouns
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
