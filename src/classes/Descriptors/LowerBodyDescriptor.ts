import CreatureBody from "../Body/Body";
import Utils from "../Utilities/Utils";
import LowerBody, { LowerBodyType } from "../Body/LowerBody";

export default class LowerBodyDescriptor {
    public static assholeOrPussy(body: CreatureBody): string {
        if (body.lowerBody.vaginaSpot.hasVagina())
            return vaginaDescript(body, 0);
        return assholeDescript(body);
    }

    public static describeHips(body: CreatureBody): string {
        let description: string = "";
        let options: string[] = [];
        if (body.lowerBody.hipRating <= 1) {
            description = Utils.randomChoice(
                "tiny ",
                "narrow ",
                "boyish ");
        }
        else if (body.lowerBody.hipRating > 1 && body.lowerBody.hipRating < 4) {
            description = Utils.randomChoice(
                "slender ",
                "narrow ",
                "thin ");
            if (body.thickness < 30) {
                if (Utils.chance(50))
                    description = "slightly-flared ";
                else
                    description = "curved ";
            }
        }
        else if (body.lowerBody.hipRating >= 4 && body.lowerBody.hipRating < 6) {
            description = Utils.randomChoice(
                "well-formed ",
                "pleasant ");
            if (body.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "curvy ";
            }
        }
        else if (body.lowerBody.hipRating >= 6 && body.lowerBody.hipRating < 10) {
            description = Utils.randomChoice(
                "ample ",
                "noticeable ",
                "girly ");
            if (body.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (body.lowerBody.hipRating >= 10 && body.lowerBody.hipRating < 15) {
            description = Utils.randomChoice(
                "flared ",
                "curvy ",
                "wide ");
            if (body.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (body.lowerBody.hipRating >= 15 && body.lowerBody.hipRating < 20) {
            if (body.thickness < 40) {
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
        else if (body.lowerBody.hipRating >= 20) {
            if (body.thickness < 40) {
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
        if (body.lowerBody.isTaur() && Utils.chance(33))
            description += "flanks";
        //Nagas have sides, right?
        else if (body.lowerBody.isNaga() && Utils.chance(33))
            description += "sides";
        //Non taurs or taurs who didn't roll flanks
        else {
            description += Utils.randomChoice(
                "hips",
                "thighs");
        }

        return description;
    }

    public static describeLeg(body: CreatureBody): string {
        switch (body.lowerBody.type) {
            case LowerBodyType.HUMAN:
            case LowerBodyType.HOOFED:
            case LowerBodyType.DOG:
                return "leg";
            case LowerBodyType.NAGA:
                return "snake-tail";
            case LowerBodyType.CENTAUR:
                return "equine leg";
            case LowerBodyType.GOO:
                return "mound of goo";
            case LowerBodyType.PONY:
                return "cartoonish pony-leg";
            case LowerBodyType.BUNNY:
                return Utils.randomChoice(
                    "fuzzy, bunny leg",
                    "fur-covered leg",
                    "furry leg",
                    "leg");
            case LowerBodyType.HARPY:
                return Utils.randomChoice(
                    "bird-like leg",
                    "feathered leg",
                    "leg"
                );
            case LowerBodyType.FOX:
                return Utils.randomChoice(
                    "fox-like leg",
                    "leg",
                    "leg",
                    "vulpine leg"
                );
            case LowerBodyType.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like leg",
                    "leg"
                );
            default:
                return "leg";
        }
    }

    public static describeLegs(body: CreatureBody): string {
        switch (body.lowerBody.type) {
            case LowerBodyType.HUMAN:
            case LowerBodyType.HOOFED:
            case LowerBodyType.DOG:
                return "legs";
            case LowerBodyType.NAGA:
                return "snake-like coils";
            case LowerBodyType.CENTAUR:
                return "four legs";
            case LowerBodyType.GOO:
                return "mounds of goo";
            case LowerBodyType.PONY:
                return "cute pony-legs";
            case LowerBodyType.BUNNY:
                return Utils.randomChoice(
                    "fuzzy, bunny legs",
                    "fur-covered legs",
                    "furry legs",
                    "legs");
            case LowerBodyType.HARPY:
                return Utils.randomChoice(
                    "bird-like legs",
                    "feathered legs",
                    "legs"
                );
            case LowerBodyType.FOX:
                return Utils.randomChoice(
                    "fox-like legs",
                    "legs",
                    "legs",
                    "vulpine legs"
                );
            case LowerBodyType.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like legs",
                    "legs"
                );
            default:
                return "legs";
        }
    }

    public static describeFoot(body: CreatureBody): string {
        switch (body.lowerBody.type) {
            case LowerBodyType.HUMAN:
                return "foot";
            case LowerBodyType.HOOFED:
            case LowerBodyType.CENTAUR:
                return "hoof";
            case LowerBodyType.DOG:
                return "paw";
            case LowerBodyType.NAGA:
                return "coiled tail";
            case LowerBodyType.GOO:
                return "slimey undercarriage";
            case LowerBodyType.PONY:
                return "flat pony-foot";
            case LowerBodyType.BUNNY:
                return Utils.randomChoice(
                    "large bunny foot",
                    "rabbit foot",
                    "large foot",
                    "foot");
            case LowerBodyType.HARPY:
                return Utils.randomChoice(
                    "taloned foot",
                    "foot"
                );
            case LowerBodyType.KANGAROO:
                return "foot-foot";
            case LowerBodyType.FOX:
                return Utils.randomChoice(
                    "foot",
                    "soft, padded paw",
                    "fox-like foot",
                    "paw"
                );
            case LowerBodyType.RACCOON:
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

    public static describeFeet(body: CreatureBody): string {
        switch (body.lowerBody.type) {
            case LowerBodyType.HUMAN:
                return "feet";
            case LowerBodyType.HOOFED:
            case LowerBodyType.CENTAUR:
                return "hooves";
            case LowerBodyType.DOG:
                return "paws";
            case LowerBodyType.NAGA:
                return "coils";
            case LowerBodyType.DEMONIC_HIGH_HEELS:
                return "demonic high-heels";
            case LowerBodyType.DEMONIC_CLAWS:
                return "demonic foot-claws";
            case LowerBodyType.GOO:
                return "slimey cillia";
            case LowerBodyType.PONY:
                return "flat pony-feet";
            case LowerBodyType.BUNNY:
                return Utils.randomChoice(
                    "large bunny feet",
                    "rabbit feet",
                    "large feet",
                    "feet");
            case LowerBodyType.HARPY:
                return Utils.randomChoice(
                    "taloned feet",
                    "feet"
                );
            case LowerBodyType.KANGAROO:
                return "foot-paws";
            case LowerBodyType.FOX:
                return Utils.randomChoice(
                    "paws",
                    "soft, padded paws",
                    "fox-like feet",
                    "paws"
                );
            case LowerBodyType.RACCOON:
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