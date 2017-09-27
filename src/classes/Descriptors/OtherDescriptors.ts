import CreatureBody from "../Body/Body";

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
            [SkinType.PLAIN, "skin"],
            [SkinType.FUR, "fur"],
            [SkinType.SCALES, "scales"],
            [SkinType.GOO, "goo"],
            [SkinType.UNDEFINED, "undefined flesh"]
        ]
    );
    public static const DEFAULT_SKIN.DESCS: Object = createMapFromPairs(
        [
            [SkinType.PLAIN, "skin"],
            [SkinType.FUR, "fur"],
            [SkinType.SCALES, "scales"],
            [SkinType.GOO, "skin"],
            [SkinType.UNDEFINED, "skin"]
        ]
    );
    public static const DEFAULT_HAIR.NAMES: Object = createMapFromPairs(
        [
            [HairType.NORMAL, "normal"],
            [HairType.FEATHER, "feather"],
            [HairType.GHOST, "transparent"],
            [HairType.GOO, "goopy"],
            [HairType.ANEMONE, "tentacle"]
        ]
    );
    public static const DEFAULT_FACE.NAMES: Object = createMapFromPairs(
        [
            [FaceType.HUMAN, "human"],
            [FaceType.HORSE, "horse"],
            [FaceType.DOG, "dog"],
            [FaceType.COW_MINOTAUR, "cow"],
            [FaceType.SHARK_TEETH, "shark"],
            [FaceType.SNAKE_FANGS, "snake"],
            [FaceType.CAT, "cat"],
            [FaceType.LIZARD, "lizard"],
            [FaceType.BUNNY, "bunny"],
            [FaceType.KANGAROO, "kangaroo"],
            [FaceType.SPIDER_FANGS, "spider"],
            [FaceType.FOX, "fox"],
            [FaceType.DRAGON, "dragon"],
            [FaceType.RACCOON_MASK, "raccoon mask"],
            [FaceType.RACCOON, "racoon"],
            [FaceType.BUCKTEETH, "buckteeth"],
            [FaceType.MOUSE, "mouse"]
        ]
    );
    public static const DEFAULT_TONGUE_NAMES: Object = createMapFromPairs(
        [
            [TongueType.HUMAN, "human"],
            [TongueType.SNAKE, "snake"],
            [TongueType.DEMONIC, "demonic"],
            [TongueType.DRACONIC, "draconic"]
        ]
    );
    public static const DEFAULT_EYES.NAMES: Object = createMapFromPairs(
        [
            [EyeType.HUMAN, "human"],
            [EyeType.FOUR_SPIDER_EYES, "4 spider"],
            [EyeType.BLACK_EYES_SAND_TRAP, "sandtrap black"]
        ]
    );
    public static const DEFAULT_EARS.NAMES: Object = createMapFromPairs(
        [
            [EarType.HUMAN, "human"],
            [EarType.HORSE, "horse"],
            [EarType.DOG, "dog"],
            [EarType.COW, "cow"],
            [EarType.ELFIN, "elfin"],
            [EarType.CAT, "cat"],
            [EarType.LIZARD, "lizard"],
            [EarType.BUNNY, "bunny"],
            [EarType.KANGAROO, "kangaroo"],
            [EarType.FOX, "fox"],
            [EarType.DRAGON, "dragon"],
            [EarType.RACCOON, "raccoon"],
            [EarType.MOUSE, "mouse"]
        ]
    );
    public static const DEFAULT_HORNS.NAMES: Object = createMapFromPairs(
        [
            [HornType.NONE, "non-existant"],
            [HornType.DEMON, "demon"],
            [HornType.COW_MINOTAUR, "cow"],
            [HornType.DRACONIC_X2, "2 draconic"],
            [HornType.DRACONIC_X4_12_INCH_LONG, "four 12\" long draconic"],
            [HornType.ANTLERS, "deer"]
        ]
    );
    public static const DEFAULT_ANTENNAE.NAMES: Object = createMapFromPairs(
        [
            [AntennaeType.NONE, "non-existant"],
            [AntennaeType.BEE, "bee"]
        ]
    );
    public static const DEFAULT_ARM_NAMES: Object = createMapFromPairs(
        [
            [ArmType.HUMAN, "human"],
            [ArmType.HARPY, "harpy"],
            [ArmType.SPIDER, "spider"]
        ]
    );
    public static const DEFAULT_WING_NAMES: Object = createMapFromPairs(
        [
            [WingType.NONE, "non-existant"],
            [WingType.BEE_LIKE_SMALL, "small bee-like"],
            [WingType.BEE_LIKE_LARGE, "large bee-like"],
            [WingType.HARPY, "harpy"],
            [WingType.IMP, "imp"],
            [WingType.BAT_LIKE_TINY, "tiny bat-like"],
            [WingType.BAT_LIKE_LARGE, "large bat-like"],
            [WingType.SHARK_FIN, "shark fin"],
            [WingType.FEATHERED_LARGE, "large feathered"],
            [WingType.DRACONIC_SMALL, "small draconic"],
            [WingType.DRACONIC_LARGE, "large draconic"],
            [WingType.GIANT_DRAGONFLY, "giant dragonfly"]
        ]
    );
    public static const DEFAULT_WING_DESCS: Object = createMapFromPairs(
        [
            [WingType.NONE, "non-existant"],
            [WingType.BEE_LIKE_SMALL, "small bee-like"],
            [WingType.BEE_LIKE_LARGE, "large bee-like"],
            [WingType.HARPY, "large feathery"],
            [WingType.IMP, "small"],
            [WingType.BAT_LIKE_TINY, "tiny, bat-like"],
            [WingType.BAT_LIKE_LARGE, "large, bat-like"],
            [WingType.SHARK_FIN, ""],
            [WingType.FEATHERED_LARGE, "large, feathered"],
            [WingType.DRACONIC_SMALL, "small, draconic"],
            [WingType.DRACONIC_LARGE, "large, draconic"],
            [WingType.GIANT_DRAGONFLY, "giant dragonfly"]
        ]
    );
    public static const DEFAULT_LOWER_BODY.NAMES: Object = createMapFromPairs(
        [
            [LowerBodyType.HUMAN, "human"],
            [LowerBodyType.HOOFED, "hoofed"],
            [LowerBodyType.DOG, "dog"],
            [LowerBodyType.NAGA, "naga"],
            [LowerBodyType.CENTAUR, "centaur"],
            [LowerBodyType.DEMONIC_HIGH_HEELS, "demonic high-heels"],
            [LowerBodyType.DEMONIC_CLAWS, "demonic claws"],
            [LowerBodyType.BEE, "bee"],
            [LowerBodyType.GOO, "goo"],
            [LowerBodyType.CAT, "cat"],
            [LowerBodyType.LIZARD, "lizard"],
            [LowerBodyType.PONY, "pony"],
            [LowerBodyType.BUNNY, "bunny"],
            [LowerBodyType.HARPY, "harpy"],
            [LowerBodyType.KANGAROO, "kangaroo"],
            [LowerBodyType.CHITINOUS_SPIDER_LEGS, "chitinous spider legs"],
            [LowerBodyType.DRIDER_LOWER_BODY, "drider"],
            [LowerBodyType.FOX, "fox"],
            [LowerBodyType.DRAGON, "dragon"],
            [LowerBodyType.RACCOON, "raccoon"]
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
        [VaginaWetness.DRY, "dry"],
        [VaginaWetness.NORMAL, "normal"],
        [VaginaWetness.WET, "wet"],
        [VaginaWetness.SLICK, "slick"],
        [VaginaWetness.DROOLING, "drooling"],
        [VaginaWetness.SLAVERING, "slavering"],
    ];
    public static const DEFAULT_VAGINA_LOOSENESS.SCALES: Array = [
        [VaginaLooseness.TIGHT, "tight"],
        [VaginaLooseness.NORMAL, "normal"],
        [VaginaLooseness.LOOSE, "loose"],
        [VaginaLooseness.GAPING, "gaping"],
        [VaginaLooseness.GAPING_WIDE, "gaping wide"],
        [VaginaLooseness.LEVEL_CLOWN_CAR, "clown-car level"]
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
