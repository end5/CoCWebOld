import { LowerBody } from "../../includes/appearanceDefs";
import Character from "../Character";
import Creature from "../Creature";
import Utils from "../Utilities/Utils";

export default class LowerBodyDescriptor {
    public static assholeOrPussy(creature: Creature): string {
        if (creature.vaginas.hasVagina)
            return vaginaDescript(creature, 0);
        return assholeDescript(creature);
    }

    public static hipDescription(character: Character): string {
        let description: string = "";
        let options: string[] = [];
        if (character.hipRating <= 1) {
            description = Utils.randomChoice(
                "tiny ",
                "narrow ",
                "boyish ");
        }
        else if (character.hipRating > 1 && character.hipRating < 4) {
            description = Utils.randomChoice(
                "slender ",
                "narrow ",
                "thin ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "slightly-flared ";
                else
                    description = "curved ";
            }
        }
        else if (character.hipRating >= 4 && character.hipRating < 6) {
            description = Utils.randomChoice(
                "well-formed ",
                "pleasant ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "curvy ";
            }
        }
        else if (character.hipRating >= 6 && character.hipRating < 10) {
            description = Utils.randomChoice(
                "ample ",
                "noticeable ",
                "girly ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (character.hipRating >= 10 && character.hipRating < 15) {
            description = Utils.randomChoice(
                "flared ",
                "curvy ",
                "wide ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (character.hipRating >= 15 && character.hipRating < 20) {
            if (character.thickness < 40) {
                if (Utils.chance(50))
                    description = "flared, ";
                else
                    description = "waspish, ";
            }
            description += Utils.randomChoice(
                "fertile ",
                "child-bearing ",
                "voluptuous ");
        }
        else if (character.hipRating >= 20) {
            if (character.thickness < 40) {
                if (Utils.chance(50))
                    description = "flaring, ";
                else
                    description = "incredibly waspish, ";
            }
            description += Utils.randomChoice(
                "broodmother-sized ",
                "cow-like ",
                "inhumanly-wide ");
        }
        //Taurs
        if (character.isTaur() && Utils.chance(33))
            description += "flanks";
        //Nagas have sides, right?
        else if (character.isNaga() && Utils.chance(33))
            description += "sides";
        //Non taurs or taurs who didn't roll flanks
        else {
            description += Utils.randomChoice(
                "hips",
                "thighs");
        }

        return description;
    }

    public static leg(lowerBody: LowerBody): string {
        switch (lowerBody) {
            case LowerBody.HUMAN:
            case LowerBody.HOOFED:
            case LowerBody.DOG:
                return "leg";
            case LowerBody.NAGA:
                return "snake-tail";
            case LowerBody.CENTAUR:
                return "equine leg";
            case LowerBody.GOO:
                return "mound of goo";
            case LowerBody.PONY:
                return "cartoonish pony-leg";
            case LowerBody.BUNNY:
                return Utils.randomChoice(
                    "fuzzy, bunny leg",
                    "fur-covered leg",
                    "furry leg",
                    "leg");
            case LowerBody.HARPY:
                return Utils.randomChoice(
                    "bird-like leg",
                    "feathered leg",
                    "leg"
                );
            case LowerBody.FOX:
                return Utils.randomChoice(
                    "fox-like leg",
                    "leg",
                    "leg",
                    "vulpine leg"
                );
            case LowerBody.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like leg",
                    "leg"
                );
            default:
                return "leg";
        }
    }

    public static legs(lowerBody: LowerBody): string {
        switch (lowerBody) {
            case LowerBody.HUMAN:
            case LowerBody.HOOFED:
            case LowerBody.DOG:
                return "legs";
            case LowerBody.NAGA:
                return "snake-like coils";
            case LowerBody.CENTAUR:
                return "four legs";
            case LowerBody.GOO:
                return "mounds of goo";
            case LowerBody.PONY:
                return "cute pony-legs";
            case LowerBody.BUNNY:
                return Utils.randomChoice(
                    "fuzzy, bunny legs",
                    "fur-covered legs",
                    "furry legs",
                    "legs");
            case LowerBody.HARPY:
                return Utils.randomChoice(
                    "bird-like legs",
                    "feathered legs",
                    "legs"
                );
            case LowerBody.FOX:
                return Utils.randomChoice(
                    "fox-like legs",
                    "legs",
                    "legs",
                    "vulpine legs"
                );
            case LowerBody.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like legs",
                    "legs"
                );
            default:
                return "legs";
        }
    }

    public static foot(lowerBody: LowerBody): string {
        switch (lowerBody) {
            case LowerBody.HUMAN:
                return "foot";
            case LowerBody.HOOFED:
            case LowerBody.CENTAUR:
                return "hoof";
            case LowerBody.DOG:
                return "paw";
            case LowerBody.NAGA:
                return "coiled tail";
            case LowerBody.GOO:
                return "slimey undercarriage";
            case LowerBody.PONY:
                return "flat pony-foot";
            case LowerBody.BUNNY:
                return Utils.randomChoice(
                    "large bunny foot",
                    "rabbit foot",
                    "large foot",
                    "foot");
            case LowerBody.HARPY:
                return Utils.randomChoice(
                    "taloned foot",
                    "foot"
                );
            case LowerBody.KANGAROO:
                return "foot-foot";
            case LowerBody.FOX:
                return Utils.randomChoice(
                    "foot",
                    "soft, padded paw",
                    "fox-like foot",
                    "paw"
                );
            case LowerBody.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like foot",
                    "long-toed paw",
                    "foot",
                    "paw"
                );
            default:
                return "foot";
        }
    }

    public static feet(lowerBody: LowerBody): string {
        switch (lowerBody) {
            case LowerBody.HUMAN:
                return "feet";
            case LowerBody.HOOFED:
            case LowerBody.CENTAUR:
                return "hooves";
            case LowerBody.DOG:
                return "paws";
            case LowerBody.NAGA:
                return "coils";
            case LowerBody.DEMONIC_HIGH_HEELS:
                return "demonic high-heels";
            case LowerBody.DEMONIC_CLAWS:
                return "demonic foot-claws";
            case LowerBody.GOO:
                return "slimey cillia";
            case LowerBody.PONY:
                return "flat pony-feet";
            case LowerBody.BUNNY:
                return Utils.randomChoice(
                    "large bunny feet",
                    "rabbit feet",
                    "large feet",
                    "feet");
            case LowerBody.HARPY:
                return Utils.randomChoice(
                    "taloned feet",
                    "feet"
                );
            case LowerBody.KANGAROO:
                return "foot-paws";
            case LowerBody.FOX:
                return Utils.randomChoice(
                    "paws",
                    "soft, padded paws",
                    "fox-like feet",
                    "paws"
                );
            case LowerBody.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like feet",
                    "long-toed paws",
                    "feet",
                    "paws"
                );
            default:
                return "feet";
        }
    }

}