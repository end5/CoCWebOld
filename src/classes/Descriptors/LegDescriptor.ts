import { LegType } from '../Body/Legs';
import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default class LegDescriptor {
    public static describeLeg(body: Character): string {
        switch (body.torso.hips.legs.type) {
            case LegType.HUMAN:
            case LegType.HOOFED:
            case LegType.DOG:
                return "leg";
            case LegType.NAGA:
                return "snake-tail";
            case LegType.CENTAUR:
                return "equine leg";
            case LegType.GOO:
                return "mound of goo";
            case LegType.PONY:
                return "cartoonish pony-leg";
            case LegType.BUNNY:
                return Utils.randomChoice(
                    "fuzzy, bunny leg",
                    "fur-covered leg",
                    "furry leg",
                    "leg");
            case LegType.HARPY:
                return Utils.randomChoice(
                    "bird-like leg",
                    "feathered leg",
                    "leg"
                );
            case LegType.FOX:
                return Utils.randomChoice(
                    "fox-like leg",
                    "leg",
                    "leg",
                    "vulpine leg"
                );
            case LegType.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like leg",
                    "leg"
                );
            default:
                return "leg";
        }
    }

    public static describeLegs(body: Character): string {
        switch (body.torso.hips.legs.type) {
            case LegType.HUMAN:
            case LegType.HOOFED:
            case LegType.DOG:
                return "legs";
            case LegType.NAGA:
                return "snake-like coils";
            case LegType.CENTAUR:
                return "four legs";
            case LegType.GOO:
                return "mounds of goo";
            case LegType.PONY:
                return "cute pony-legs";
            case LegType.BUNNY:
                return Utils.randomChoice(
                    "fuzzy, bunny legs",
                    "fur-covered legs",
                    "furry legs",
                    "legs");
            case LegType.HARPY:
                return Utils.randomChoice(
                    "bird-like legs",
                    "feathered legs",
                    "legs"
                );
            case LegType.FOX:
                return Utils.randomChoice(
                    "fox-like legs",
                    "legs",
                    "legs",
                    "vulpine legs"
                );
            case LegType.RACCOON:
                return Utils.randomChoice(
                    "raccoon-like legs",
                    "legs"
                );
            default:
                return "legs";
        }
    }

    public static describeFoot(body: Character): string {
        switch (body.torso.hips.legs.type) {
            case LegType.HUMAN:
                return "foot";
            case LegType.HOOFED:
            case LegType.CENTAUR:
                return "hoof";
            case LegType.DOG:
                return "paw";
            case LegType.NAGA:
                return "coiled tail";
            case LegType.GOO:
                return "slimey undercarriage";
            case LegType.PONY:
                return "flat pony-foot";
            case LegType.BUNNY:
                return Utils.randomChoice(
                    "large bunny foot",
                    "rabbit foot",
                    "large foot",
                    "foot");
            case LegType.HARPY:
                return Utils.randomChoice(
                    "taloned foot",
                    "foot"
                );
            case LegType.KANGAROO:
                return "foot-foot";
            case LegType.FOX:
                return Utils.randomChoice(
                    "foot",
                    "soft, padded paw",
                    "fox-like foot",
                    "paw"
                );
            case LegType.RACCOON:
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

    public static describeFeet(body: Character): string {
        switch (body.torso.hips.legs.type) {
            case LegType.HUMAN:
                return "feet";
            case LegType.HOOFED:
            case LegType.CENTAUR:
                return "hooves";
            case LegType.DOG:
                return "paws";
            case LegType.NAGA:
                return "coils";
            case LegType.DEMONIC_HIGH_HEELS:
                return "demonic high-heels";
            case LegType.DEMONIC_CLAWS:
                return "demonic foot-claws";
            case LegType.GOO:
                return "slimey cillia";
            case LegType.PONY:
                return "flat pony-feet";
            case LegType.BUNNY:
                return Utils.randomChoice(
                    "large bunny feet",
                    "rabbit feet",
                    "large feet",
                    "feet");
            case LegType.HARPY:
                return Utils.randomChoice(
                    "taloned feet",
                    "feet"
                );
            case LegType.KANGAROO:
                return "foot-paws";
            case LegType.FOX:
                return Utils.randomChoice(
                    "paws",
                    "soft, padded paws",
                    "fox-like feet",
                    "paws"
                );
            case LegType.RACCOON:
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
