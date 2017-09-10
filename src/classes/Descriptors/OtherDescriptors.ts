import Body from "../Body/Body";

export default class OtherDescriptors {
    /*public static inverseMap(x: object): object {
        let result: object = {};
        for (let i: string in x) {
            result[String(x[i])] = i;
        }
        return result;
    }*/
    /*
    public static describeWings(body: Body): string {
        return OtherDescriptors.DEFAULT_WING_NAMES[body.wingType] + " wings";
    }


    public static createMapFromPairs(src: Array): Object {
        let result: Object = {};
        for (let i: number = 0; i < src.length; i++) result[src[i][0]] = src[i][1];
        return result;
    }

    public static const DEFAULT_GENDER.NAMES: Object = createMapFromPairs(
        [
            [GENDER.NONE, "genderless"],
            [GENDER.MALE, "male"],
            [GENDER.FEMALE, "female"],
            [GENDER.HERM, "hermaphrodite"]
        ]
    );
    public static const DEFAULT_SKIN.NAMES: Object = createMapFromPairs(
        [
            [SKIN.PLAIN, "skin"],
            [SKIN.FUR, "fur"],
            [SKIN.SCALES, "scales"],
            [SKIN.GOO, "goo"],
            [SKIN.UNDEFINED, "undefined flesh"]
        ]
    );
    public static const DEFAULT_SKIN.DESCS: Object = createMapFromPairs(
        [
            [SKIN.PLAIN, "skin"],
            [SKIN.FUR, "fur"],
            [SKIN.SCALES, "scales"],
            [SKIN.GOO, "skin"],
            [SKIN.UNDEFINED, "skin"]
        ]
    );
    public static const DEFAULT_HAIR.NAMES: Object = createMapFromPairs(
        [
            [HAIR.NORMAL, "normal"],
            [HAIR.FEATHER, "feather"],
            [HAIR.GHOST, "transparent"],
            [HAIR.GOO, "goopy"],
            [HAIR.ANEMONE, "tentacle"]
        ]
    );
    public static const DEFAULT_FACE.NAMES: Object = createMapFromPairs(
        [
            [FACE.HUMAN, "human"],
            [FACE.HORSE, "horse"],
            [FACE.DOG, "dog"],
            [FACE.COW_MINOTAUR, "cow"],
            [FACE.SHARK_TEETH, "shark"],
            [FACE.SNAKE_FANGS, "snake"],
            [FACE.CAT, "cat"],
            [FACE.LIZARD, "lizard"],
            [FACE.BUNNY, "bunny"],
            [FACE.KANGAROO, "kangaroo"],
            [FACE.SPIDER_FANGS, "spider"],
            [FACE.FOX, "fox"],
            [FACE.DRAGON, "dragon"],
            [FACE.RACCOON_MASK, "raccoon mask"],
            [FACE.RACCOON, "racoon"],
            [FACE.BUCKTEETH, "buckteeth"],
            [FACE.MOUSE, "mouse"]
        ]
    );
    public static const DEFAULT_TONGUE_NAMES: Object = createMapFromPairs(
        [
            [TONUGE.HUMAN, "human"],
            [TONUGE.SNAKE, "snake"],
            [TONUGE.DEMONIC, "demonic"],
            [TONUGE.DRACONIC, "draconic"]
        ]
    );
    public static const DEFAULT_EYES.NAMES: Object = createMapFromPairs(
        [
            [EYES.HUMAN, "human"],
            [EYES.FOUR_SPIDER_EYES, "4 spider"],
            [EYES.BLACK_EYES_SAND_TRAP, "sandtrap black"]
        ]
    );
    public static const DEFAULT_EARS.NAMES: Object = createMapFromPairs(
        [
            [EARS.HUMAN, "human"],
            [EARS.HORSE, "horse"],
            [EARS.DOG, "dog"],
            [EARS.COW, "cow"],
            [EARS.ELFIN, "elfin"],
            [EARS.CAT, "cat"],
            [EARS.LIZARD, "lizard"],
            [EARS.BUNNY, "bunny"],
            [EARS.KANGAROO, "kangaroo"],
            [EARS.FOX, "fox"],
            [EARS.DRAGON, "dragon"],
            [EARS.RACCOON, "raccoon"],
            [EARS.MOUSE, "mouse"]
        ]
    );
    public static const DEFAULT_HORNS.NAMES: Object = createMapFromPairs(
        [
            [HORNS.NONE, "non-existant"],
            [HORNS.DEMON, "demon"],
            [HORNS.COW_MINOTAUR, "cow"],
            [HORNS.DRACONIC_X2, "2 draconic"],
            [HORNS.DRACONIC_X4_12_INCH_LONG, "four 12\" long draconic"],
            [HORNS.ANTLERS, "deer"]
        ]
    );
    public static const DEFAULT_ANTENNAE.NAMES: Object = createMapFromPairs(
        [
            [ANTENNAE.NONE, "non-existant"],
            [ANTENNAE.BEE, "bee"]
        ]
    );
    public static const DEFAULT_ARM_NAMES: Object = createMapFromPairs(
        [
            [ARM.HUMAN, "human"],
            [ARM.HARPY, "harpy"],
            [ARM.SPIDER, "spider"]
        ]
    );
    public static const DEFAULT_WING_NAMES: Object = createMapFromPairs(
        [
            [WING.NONE, "non-existant"],
            [WING.BEE_LIKE_SMALL, "small bee-like"],
            [WING.BEE_LIKE_LARGE, "large bee-like"],
            [WING.HARPY, "harpy"],
            [WING.IMP, "imp"],
            [WING.BAT_LIKE_TINY, "tiny bat-like"],
            [WING.BAT_LIKE_LARGE, "large bat-like"],
            [WING.SHARK_FIN, "shark fin"],
            [WING.FEATHERED_LARGE, "large feathered"],
            [WING.DRACONIC_SMALL, "small draconic"],
            [WING.DRACONIC_LARGE, "large draconic"],
            [WING.GIANT_DRAGONFLY, "giant dragonfly"]
        ]
    );
    public static const DEFAULT_WING_DESCS: Object = createMapFromPairs(
        [
            [WING.NONE, "non-existant"],
            [WING.BEE_LIKE_SMALL, "small bee-like"],
            [WING.BEE_LIKE_LARGE, "large bee-like"],
            [WING.HARPY, "large feathery"],
            [WING.IMP, "small"],
            [WING.BAT_LIKE_TINY, "tiny, bat-like"],
            [WING.BAT_LIKE_LARGE, "large, bat-like"],
            [WING.SHARK_FIN, ""],
            [WING.FEATHERED_LARGE, "large, feathered"],
            [WING.DRACONIC_SMALL, "small, draconic"],
            [WING.DRACONIC_LARGE, "large, draconic"],
            [WING.GIANT_DRAGONFLY, "giant dragonfly"]
        ]
    );
    public static const DEFAULT_LOWER_BODY.NAMES: Object = createMapFromPairs(
        [
            [LOWER_BODY.HUMAN, "human"],
            [LOWER_BODY.HOOFED, "hoofed"],
            [LOWER_BODY.DOG, "dog"],
            [LOWER_BODY.NAGA, "naga"],
            [LOWER_BODY.CENTAUR, "centaur"],
            [LOWER_BODY.DEMONIC_HIGH_HEELS, "demonic high-heels"],
            [LOWER_BODY.DEMONIC_CLAWS, "demonic claws"],
            [LOWER_BODY.BEE, "bee"],
            [LOWER_BODY.GOO, "goo"],
            [LOWER_BODY.CAT, "cat"],
            [LOWER_BODY.LIZARD, "lizard"],
            [LOWER_BODY.PONY, "pony"],
            [LOWER_BODY.BUNNY, "bunny"],
            [LOWER_BODY.HARPY, "harpy"],
            [LOWER_BODY.KANGAROO, "kangaroo"],
            [LOWER_BODY.CHITINOUS_SPIDER_LEGS, "chitinous spider legs"],
            [LOWER_BODY.DRIDER_LOWER_BODY, "drider"],
            [LOWER_BODY.FOX, "fox"],
            [LOWER_BODY.DRAGON, "dragon"],
            [LOWER_BODY.RACCOON, "raccoon"]
        ]
    );
    public static const DEFAULT_PIERCING_NAMES: Object = createMapFromPairs(
        [
            [PIERCING.NONE, "none"],
            [PIERCING.STUD, "stud"],
            [PIERCING.RING, "ring"],
            [PIERCING.LADDER, "ladder"],
            [PIERCING.HOOP, "hoop"],
            [PIERCING.CHAIN, "chain"]
        ]
    );
    public static const DEFAULT_VAGINA.NAMES: Object = createMapFromPairs(
        [
            [VAGINA.HUMAN, "human"],
            [VAGINA.BLACK_SAND_TRAP, "black sandtrap"]
        ]
    );
    public static const DEFAULT_VAGINA_WETNESS.SCALES: Array = [
        [VAGINA_WETNESS.DRY, "dry"],
        [VAGINA_WETNESS.NORMAL, "normal"],
        [VAGINA_WETNESS.WET, "wet"],
        [VAGINA_WETNESS.SLICK, "slick"],
        [VAGINA_WETNESS.DROOLING, "drooling"],
        [VAGINA_WETNESS.SLAVERING, "slavering"],
    ];
    public static const DEFAULT_VAGINA_LOOSENESS.SCALES: Array = [
        [VAGINA_LOOSENESS.TIGHT, "tight"],
        [VAGINA_LOOSENESS.NORMAL, "normal"],
        [VAGINA_LOOSENESS.LOOSE, "loose"],
        [VAGINA_LOOSENESS.GAPING, "gaping"],
        [VAGINA_LOOSENESS.GAPING_WIDE, "gaping wide"],
        [VAGINA_LOOSENESS.LEVEL_CLOWN_CAR, "clown-car level"]
    ];
    public static const DEFAULT_ANAL_WETNESS.SCALES: Array = [
        [ANAL_WETNESS.DRY, "dry"],
        [ANAL_WETNESS.NORMAL, "normal"],
        [ANAL_WETNESS.MOIST, "moist"],
        [ANAL_WETNESS.SLIMY, "slimym"],
        [ANAL_WETNESS.DROOLING, "drooling"],
        [ANAL_WETNESS.SLIME_DROOLING, "slime-drooling"],
    ];
    public static const DEFAULT_ANAL_LOOSENESS.SCALES: Array = [
        [ANAL_LOOSENESS.VIRGIN, "virgin"],
        [ANAL_LOOSENESS.TIGHT, "tight"],
        [ANAL_LOOSENESS.NORMAL, "normal"],
        [ANAL_LOOSENESS.LOOSE, "loose"],
        [ANAL_LOOSENESS.STRETCHED, "stretched"],
        [ANAL_LOOSENESS.GAPING, "gaping"]
    ];
    public static const DEFAULT_HIP_RATING.SCALES: Array = [
        [HIP_RATING.BOYISH, "boyish"],
        [HIP_RATING.SLENDER, "slender"],
        [HIP_RATING.AVERAGE, "average"],
        [HIP_RATING.AMPLE, "ample"],
        [HIP_RATING.CURVY, "curvy"],
        [HIP_RATING.FERTILE, "fertile"],
        [HIP_RATING.INHUMANLY_WIDE, "inhumanly wide"]
    ];
    public static const DEFAULT_BUTT_RATING.SCALES: Array = [
        [BUTT_RATING.BUTTLESS, "buttless"],
        [BUTT_RATING.TIGHT, "tight"],
        [BUTT_RATING.AVERAGE, "average"],
        [BUTT_RATING.NOTICEABLE, "noticeable"],
        [BUTT_RATING.LARGE, "large"],
        [BUTT_RATING.JIGGLY, "jiggly"],
        [BUTT_RATING.EXPANSIVE, "expansive"],
        [BUTT_RATING.HUGE, "huge"],
        [BUTT_RATING.INCONCEIVABLY_BIG, "inconceivably big"]
    ];
    */
    /**
        * Assume scale = [[0,"small"],[5,"average"],[10,"big"]]
        *      value < 0   ->   "less than small"
        *      value = 0   ->   "small"
        *  0 < value < 5   ->   "between small and average"
        *      value = 5   ->   "average"
        *  5 < value < 10  ->   "between average and big"
        *      value = 10  ->   "big"
        *      value > 10  ->   "more than big"
        */
    /*public static describeByScale(value: number, scale: Array, lessThan: string = "less than", moreThan: string = "more than"): string {
        if (scale.length == 0) return "undescribeale";
        if (scale.length == 1) return "about " + scale[0][1];
        if (value < scale[0][0]) return lessThan + " " + scale[0][1];
        if (value == scale[0][0]) return scale[0][1];
        for (let i: number = 1; i < scale.length; i++) {
            if (value < scale[i][0]) return "between " + scale[i - 1][1] + " and " + scale[i][1];
            if (value == scale[i][0]) return scale[i][1];
        }
        return moreThan + " " + scale[scale.length - 1][1];
    }*/

    /**
        * numberOfThings(0,"brain") = "no brains"
        * numberOfThings(1,"head") = "one head"
        * numberOfThings(2,"tail") = "2 tails"
        * numberOfThings(3,"hoof","hooves") = "3 hooves"
        */
    /*public static numberOfThings(n: number, name: string, pluralForm: string = null): string {
        pluralForm = pluralForm || (name + "s");
        if (n == 0) return "no " + pluralForm;
        if (n == 1) return "one " + name;
        return n + " " + pluralForm;
    }*/

    /**
        * 13 -> 2'1"
        * 5.5 -> 5.5"
        * Positive only!
        */
    /*public static feetsAndInches(n: number): string {
        let feet: number = Math.floor(n / 12);
        let inches: number = n - feet * 12;
        if (feet > 0) return feet + "'" + inches + "\"";
        else return inches + "\"";
    }*/

    /**
        * 13 -> 13" (2'1")
        */
    /*public static inchesAndFeetsAndInches(n: number): string {
        if (n < 12) return n + "\"";
        return n + "\" (" + feetsAndInches(n) + ")";
    }*/




}
