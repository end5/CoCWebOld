import Creature from "../Creature";
import Utils from "../Utilities/Utils";

export default class BallsDescriptor {
    /**
        * Describe creatures balls.
        * @param    forcedSize    Force a description of the size of the balls
        * @param    plural        Show plural forms
        * @param    creature        Monster, Player or NonPlayer
        * @param    withArticle    Show description with article in front
        * @return    Full description of balls
        */
    public static ballsDescription(forcedSize: boolean, plural: boolean, creature: Creature, withArticle: boolean = false): string {
        if (creature.balls == 0)
            return "prostate";

        let haveDescription: boolean = false;
        let randomNumber: number = 0;
        let description: string = "";
        let options: string[] = [];

        if (plural && (creature.statusAffects.has("Uniball") < 0)) {
            if (creature.balls == 1) {
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
            else if (creature.balls == 2) {
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
            else if (creature.balls == 3) {
                options = ["three",
                    "triple"];
                (withArticle) ? options.push("a trio of") : options.push("trio of");
                description += Utils.randomChoice(options);
            }
            else if (creature.balls == 4) {
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
        //size!
        if (creature.ballSize > 1 && (Utils.rand(3) <= 1 || forcedSize)) {
            if (description) description += " ";

            if (creature.ballSize >= 18)
                description += "hideously swollen and oversized";
            else if (creature.ballSize >= 15)
                description += "beachball-sized";
            else if (creature.ballSize >= 12)
                description += "watermelon-sized";
            else if (creature.ballSize >= 9)
                description += "basketball-sized";
            else if (creature.ballSize >= 7)
                description += "soccerball-sized";
            else if (creature.ballSize >= 5)
                description += "cantaloupe-sized";
            else if (creature.ballSize >= 4)
                description += "grapefruit-sized";
            else if (creature.ballSize >= 3)
                description += "apple-sized";
            else if (creature.ballSize >= 2)
                description += "baseball-sized";
            else if (creature.ballSize > 1)
                description += "large";

        }
        //UNIBALL
        if (creature.statusAffects.has("Uniball") >= 0) {
            if (description)
                description += " ";
            options = ["tightly-compressed",
                "snug",
                "cute",
                "pleasantly squeezed",
                "compressed-together"];
            description += Utils.randomChoice(options);

        }
        //Descriptive
        if (creature.hoursSinceCum >= 48 && Utils.rand(2) == 0 && !forcedSize) {
            if (description)
                description += " ";
            options = ["overflowing",
                "swollen",
                "cum-engorged"];
            description += Utils.randomChoice(options);

        }
        //lusty
        if (creature.lust > 90 && (description == "") && Utils.rand(2) == 0 && !forcedSize) {
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
        //Slimy skin
        if (creature.skinType == 3) {
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
        //if (i_creature.balls == 4 && i_plural) options.push("quads", "quads", "quads");

        description += Utils.randomChoice(options);
        if (plural)
            description += "s";

        if (creature.statusAffects.has("Uniball") >= 0 && Utils.rand(2) == 0) {
            if (Utils.rand(3) == 0)
                description += " merged into a cute, spherical package";
            else if (Utils.rand(2) == 0)
                description += " combined into a round, girlish shape";
            else
                description += " squeezed together into a perky, rounded form";
        }
        return description;
    }

    //Returns random description of scrotum
    public static sackDescript(creature: Creature): string {
        if (creature.balls == 0)
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