import Character from '../Character/Character';
import { StatusAffectType } from '../Effects/StatusAffectType';
import { Utils } from '../Utilities/Utils';

export default class BallsDescriptor {
    // ballsDescriptLight(forcedSize, true, this)
    /**
     * Describe creatures balls.
     * @param    forceDisplaySize    Force a description of the size of the balls
     * @param    plural        Show plural forms
     * @param    creature        Monster, Player or NonPlayer
     * @param    withArticle    Show description with article in front
     * @return    Full description of balls
     */
    public static describeBalls(forceDisplaySize: boolean, plural: boolean, character: Character, withArticle: boolean = false): string {
        if (character.torso.balls.quantity === 0)
            return "prostate";

        const haveDescription: boolean = false;
        const randomNumber: number = 0;
        let description: string = "";
        let options: string[] = [];

        if (plural && (!character.statusAffects.has(StatusAffectType.Uniball))) {
            if (character.torso.balls.quantity === 1) {
                if (withArticle) {
                    options = ["a single",
                        "a solitary",
                        "a lone",
                        "an individual"];
                }
                else {
                    options = ["single",
                        "solitary",
                        "lone",
                        "individual"];
                }
                description += Utils.randomChoice(options);
            }
            else if (character.torso.balls.quantity === 2) {
                if (withArticle) {
                    options = ["a pair of",
                        "two",
                        "a duo of"];
                }
                else {
                    options = ["pair of",
                        "two",
                        "duo of"];
                }
                description += Utils.randomChoice(options);
            }
            else if (character.torso.balls.quantity === 3) {
                options = ["three",
                    "triple"];
                (withArticle) ? options.push("a trio of") : options.push("trio of");
                description += Utils.randomChoice(options);
            }
            else if (character.torso.balls.quantity === 4) {
                options = ["four",
                    "quadruple"];
                (withArticle) ? options.push("a quartette of") : options.push("quartette of");
                description += Utils.randomChoice(options);
            }
            else {
                if (withArticle) {
                    options = ["a multitude of",
                        "many",
                        "a large handful of"];
                }
                else {
                    options = ["multitude of",
                        "many",
                        "large handful of"];
                }
                description += Utils.randomChoice(options);
            }
        }
        // size!
        if (character.torso.balls.size > 1 && (Utils.rand(3) <= 1 || forceDisplaySize)) {
            if (description) description += " ";

            if (character.torso.balls.size >= 18)
                description += "hideously swollen and oversized";
            else if (character.torso.balls.size >= 15)
                description += "beachball-sized";
            else if (character.torso.balls.size >= 12)
                description += "watermelon-sized";
            else if (character.torso.balls.size >= 9)
                description += "basketball-sized";
            else if (character.torso.balls.size >= 7)
                description += "soccerball-sized";
            else if (character.torso.balls.size >= 5)
                description += "cantaloupe-sized";
            else if (character.torso.balls.size >= 4)
                description += "grapefruit-sized";
            else if (character.torso.balls.size >= 3)
                description += "apple-sized";
            else if (character.torso.balls.size >= 2)
                description += "baseball-sized";
            else if (character.torso.balls.size > 1)
                description += "large";

        }
        // UNIBALL
        if (character.statusAffects.has(StatusAffectType.Uniball)) {
            if (description)
                description += " ";
            options = ["tightly-compressed",
                "snug",
                "cute",
                "pleasantly squeezed",
                "compressed-together"];
            description += Utils.randomChoice(options);

        }
        // Descriptive
        if (character.hoursSinceCum >= 48 && Utils.rand(2) === 0 && !forceDisplaySize) {
            if (description)
                description += " ";
            options = ["overflowing",
                "swollen",
                "cum-engorged"];
            description += Utils.randomChoice(options);

        }
        // lusty
        if (character.stats.lust > 90 && (description === "") && Utils.rand(2) === 0 && !forceDisplaySize) {
            options = ["eager",
                "full",
                "needy",
                "desperate",
                "throbbing",
                "heated",
                "trembling",
                "quivering",
                "quaking"];
            description += Utils.randomChoice(options);

        }
        // Slimy skin
        if (character.skin.type === 3) {
            if (description)
                description += " ";
            options = ["goopey",
                "gooey",
                "slimy"];
            description += Utils.randomChoice(options);

        }
        if (description)
            description += " ";

        options = ["nut",
            "gonad",
            "teste",
            "testicle",
            "testicle",
            "ball",
            "ball",
            "ball"];

        // I don't know how this was ever supposed to work.
        // if (i_creature.balls == 4 && i_plural) options.push("quads", "quads", "quads");

        description += Utils.randomChoice(options);
        if (plural)
            description += "s";

        if (character.statusAffects.has(StatusAffectType.Uniball) && Utils.rand(2) === 0) {
            if (Utils.rand(3) === 0)
                description += " merged into a cute, spherical package";
            else if (Utils.rand(2) === 0)
                description += " combined into a round, girlish shape";
            else
                description += " squeezed together into a perky, rounded form";
        }
        return description;
    }

    public static describeBallsShort(character: Character, forceDisplaySize: boolean = true): string {
        return BallsDescriptor.describeBalls(forceDisplaySize, true, character);
    }

    // Returns random description of scrotum
    public static describeSack(character: Character): string {
        if (character.torso.balls.quantity === 0)
            return "prostate";

        let options: string[] = [];
        let description: string = "";

        options = ["scrotum",
            "sack",
            "nutsack",
            "ballsack",
            "beanbag",
            "pouch"];

        description += Utils.randomChoice(options);

        return description;
    }
}
