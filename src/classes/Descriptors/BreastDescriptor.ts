import Utils from "../../internals/Utils";
import BreastRow, { BreastCup } from "./BreastRow";
import BreastRowModule from "./BreastRowModule";

export default class BreastDescriptor {
    public static nippleDescription(breastRow: BreastRow): string {
        let haveDescription: boolean = false;
        let description: string = "";
        let options: string[] = [];
        let rando: number = 0;
        //Size descriptors 33% chance
        if (Utils.rand(4) == 0) {
            //TINAHHHH
            if (breastRow.nippleLength < .25) {
                options = ["tiny ",
                    "itty-bitty ",
                    "teeny-tiny ",
                    "dainty "];
                description += Utils.randomChoice(options);
            }
            //Prominant
            if (breastRow.nippleLength >= .4 && breastRow.nippleLength < 1) {
                options = ["prominent ",
                    "pencil eraser-sized ",
                    "eye-catching ",
                    "pronounced ",
                    "striking "];
                description += Utils.randomChoice(options);
            }
            //Big 'uns
            if (breastRow.nippleLength >= 1 && breastRow.nippleLength < 2) {
                options = ["forwards-jutting ",
                    "over-sized ",
                    "fleshy ",
                    "large protruding "];
                description += Utils.randomChoice(options);
            }
            //'Uge
            if (breastRow.nippleLength >= 2 && breastRow.nippleLength < 3.2) {
                options = ["elongated ",
                    "massive ",
                    "awkward ",
                    "lavish ",
                    "hefty "];
                description += Utils.randomChoice(options);
            }
            //Massive
            if (breastRow.nippleLength >= 3.2) {
                options = ["bulky ",
                    "ponderous ",
                    "thumb-sized ",
                    "cock-sized ",
                    "cow-like "];
                description += Utils.randomChoice(options);
            }
            haveDescription = true;
        }
        //Milkiness/Arousal/Wetness Descriptors 33% of the time
        if (Utils.rand(3) == 0 && !haveDescription) {
            //Fuckable chance first!
            if (breastRow.fuckable) {
                //Fuckable and lactating?
                if (breastRow.lactationMultiplier > 1) {
                    options = ["milk-lubricated ",
                        "lactating ",
                        "lactating ",
                        "milk-slicked ",
                        "milky "];
                    description += Utils.randomChoice(options);
                }
                //Just fuckable
                else {
                    options = ["wet ",
                        "mutated ",
                        "slimy ",
                        "damp ",
                        "moist ",
                        "slippery ",
                        "oozing ",
                        "sloppy ",
                        "dewy "];
                    description += Utils.randomChoice(options);
                }
                haveDescription = true;
            }
            //Just lactating!
            else if (breastRow.lactationMultiplier > 0) {
                //Light lactation
                if (breastRow.lactationMultiplier <= 1) {
                    options = ["milk moistened ",
                        "slightly lactating ",
                        "milk-dampened "];
                    description += Utils.randomChoice(options);
                }
                //Moderate lactation
                if (breastRow.lactationMultiplier > 1 && breastRow.lactationMultiplier <= 2) {
                    options = ["lactating ",
                        "milky ",
                        "milk-seeping "];
                    description += Utils.randomChoice(options);
                }
                //Heavy lactation
                if (breastRow.lactationMultiplier > 2) {
                    options = ["dripping ",
                        "dribbling ",
                        "milk-leaking ",
                        "drooling "];
                    description += Utils.randomChoice(options);
                }
                haveDescription = true;
            }
        }
        //Possible arousal descriptors
        else if (Utils.rand(3) == 0 && !haveDescription) {
            if (creature.lust > 50 && creature.lust < 75) {
                options = ["erect ",
                    "perky ",
                    "erect ",
                    "firm ",
                    "tender "];
                description += Utils.randomChoice(options);
                haveDescription = true;
            }
            if (creature.lust >= 75) {
                options = ["throbbing ",
                    "trembling ",
                    "needy ",
                    "throbbing "];
                description += Utils.randomChoice(options);
                haveDescription = true;
            }
        }
        if (!haveDescription && Utils.rand(2) == 0 && creature.nipplesPierced > 0 && rowNum == 0) {
            if (breastRow.nipplesPierced == 5)
                description += "chained ";
            else
                description += "pierced ";
            haveDescription = true;
        }
        if (!haveDescription && creature.skinType == 3) {
            options = ["slime-slick ",
                "goopy ",
                "slippery "];
            description += Utils.randomChoice(options);
        }
        if (!haveDescription && creature.statusAffects.has("BlackNipples")) {
            options = ["black ",
                "ebony ",
                "sable "];
            description += Utils.randomChoice(options);
        }

        options = [];
        options.push("nipple");

        if (breastRow.nippleLength < .5)
            options.push("perky nipple");
        else
            options.push("cherry-like nub");

        if (breastRow.fuckable)
            options.push("fuckable nip", "nipple-hole", "nipple-cunt");
        else if (breastRow.lactationMultiplier >= 1 && breastRow.nippleLength >= 1)
            options.push("teat");


        return description;
    }

    public static BreastCupNames: string[] = [
        "flat",//0
        "A-cup", "B-cup", "C-cup", "D-cup", "DD-cup", "big DD-cup", "E-cup", "big E-cup", "EE-cup",// 1-9
        "big EE-cup", "F-cup", "big F-cup", "FF-cup", "big FF-cup", "G-cup", "big G-cup", "GG-cup", "big GG-cup", "H-cup",//10-19
        "big H-cup", "HH-cup", "big HH-cup", "HHH-cup", "I-cup", "big I-cup", "II-cup", "big II-cup", "J-cup", "big J-cup",//20-29
        "JJ-cup", "big JJ-cup", "K-cup", "big K-cup", "KK-cup", "big KK-cup", "L-cup", "big L-cup", "LL-cup", "big LL-cup",//30-39
        "M-cup", "big M-cup", "MM-cup", "big MM-cup", "MMM-cup", "large MMM-cup", "N-cup", "large N-cup", "NN-cup", "large NN-cup",//40-49
        "O-cup", "large O-cup", "OO-cup", "large OO-cup", "P-cup", "large P-cup", "PP-cup", "large PP-cup", "Q-cup", "large Q-cup",//50-59
        "QQ-cup", "large QQ-cup", "R-cup", "large R-cup", "RR-cup", "large RR-cup", "S-cup", "large S-cup", "SS-cup", "large SS-cup",//60-69
        "T-cup", "large T-cup", "TT-cup", "large TT-cup", "U-cup", "large U-cup", "UU-cup", "large UU-cup", "V-cup", "large V-cup",//70-79
        "VV-cup", "large VV-cup", "W-cup", "large W-cup", "WW-cup", "large WW-cup", "X-cup", "large X-cup", "XX-cup", "large XX-cup",//80-89
        "Y-cup", "large Y-cup", "YY-cup", "large YY-cup", "Z-cup", "large Z-cup", "ZZ-cup", "large ZZ-cup", "ZZZ-cup", "large ZZZ-cup"//90-99
    ];

    public static breastCup(size: BreastCup): string {
        return this.BreastCupNames[Math.min(Math.floor(size), this.BreastCupNames.length - 1)];
    }

    /**
        * Returns breast size from cup name.
        * Acceptable input: "flat","A","B","C","D","DD","DD+",... "ZZZ","ZZZ+" or exact match from BreastCupNames array
        */
    public static breastCupInverse(name: string, defaultValue: BreastCup = 0): BreastCup {
        if (name.length == 0)
            return defaultValue;
        if (name == "flat")
            return BreastCup.FLAT;
        let big: boolean = name.charAt(name.length - 1) == "+";
        if (big)
            name = name.substr(0, name.length - 1);
        for (let cup: number = 0; cup < this.BreastCupNames.length; cup++) {
            if (name == this.BreastCupNames[cup])
                return cup;
            if (this.BreastCupNames[cup].indexOf(name) == 0)
                return cup + (big ? 1 : 0);
        }
        return defaultValue;
    }

    public static biggestBreastSizeDescript(breastRowModule: BreastRowModule): string {
        let description: string = "";
        let biggestBreastRow: BreastRow = breastRowModule.BreastRatingLargest[0];

        if (biggestBreastRow.breastRating < 1)
            return "flat breasts";
        //50% of the time size-descript them
        if (Utils.rand(2) == 0)
            description += breastSize(biggestBreastRow.breastRating);

        //Nouns!
        let options: string[] = [];
        if (biggestBreastRow.breastRating > 6)
            options.push("love-pillows");
        if (biggestBreastRow.lactationMultiplier > 1.5)
            options.push("milky tits", "milky breasts");
        if (biggestBreastRow.lactationMultiplier > 2)
            options.push("milk-udders");
        if (biggestBreastRow.lactationMultiplier >= 1 && biggestBreastRow.lactationMultiplier < 2.5)
            options.push("milk jugs");
        if (biggestBreastRow.lactationMultiplier >= 2.5)
            options.push("udders");
        if (biggestBreastRow.lactationMultiplier < 1)
            options.push("jugs");

        options.push("boobs", "breasts", "tits");

        description += Utils.randomChoice(options);
        return description;
    }

    public static breastSize(size: number): string {
        let description: string = "";
        //Catch all for dudes.
        if (size < BreastCup.A) return "manly ";
        //Small - A->B
        if (size <= BreastCup.B) {
            description += Utils.randomChoice("palmable ", "tight ", "perky ", "baseball-sized ");
        }
        //C-D
        else if (size <= BreastCup.D) {
            description += Utils.randomChoice("nice ", "hand-filling ", "well-rounded ", "supple ", "softball-sized ");
        }
        //DD->big EE
        else if (size < BreastCup.F) {
            description += Utils.randomChoice("big ", "large ", "pillowy ", "jiggly ", "volleyball-sized ");
        }
        //F->big FF
        else if (size < BreastCup.G) {
            description += Utils.randomChoice("soccerball-sized ", "hand-overflowing ", "generous ", "jiggling ");
        }
        //G -> HHH
        else if (size < BreastCup.I) {
            description += Utils.randomChoice("basketball-sized ", "whorish ", "cushiony ", "wobbling ");
        }
        //I -> KK
        else if (size < BreastCup.KK_BIG) {
            description += Utils.randomChoice("massive motherly ", "luscious ", "smothering ", "prodigious ");
        }
        //K- > MMM+
        else {
            description += Utils.randomChoice("mountainous ", "monumental ", "back-breaking ", "exercise-ball-sized ", "immense ");
        }
        return description;
    }

    public static allBreastsDescript(breastRowModule: BreastRowModule): string {
        let desciption: string = "";
        switch (breastRowModule.totalBreasts() / 2) {
            case 0:
                return "unremarkable chest muscles ";
            case 2:
                desciption += "two rows of ";
            case 3:
                desciption += Utils.randomChoice("three rows of ", "multi-layered ");
            case 4:
                desciption += Utils.randomChoice("four rows of ", "four-tiered ");
            case 5:
                desciption += Utils.randomChoice("five rows of ", "five-tiered ");
        }
        desciption += this.biggestBreastSizeDescript(breastRowModule);
        return desciption;

    }


    public static breastGrowthDescription(amount: number, chest: BreastRowModule) {
        if (amount <= 2) {
            if (chest.count() > 1) outputText("Your rows of " + breastDescript(0) + " jiggle with added weight, growing a bit larger.", false);
            if (chest.count() == 1) outputText("Your " + breastDescript(0) + " jiggle with added weight as they expand, growing a bit larger.", false);
        }
        else if (amount <= 4) {
            if (chest.count() > 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your rows of " + breastDescript(0) + " expand significantly.", false);
            if (chest.count() == 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + breastDescript(0) + " expand significantly.", false);
        }
        else {
            if (chest.count() > 1) outputText("You drop to your knees from a massive change in your body's center of gravity.  Your " + breastDescript(0) + " tingle strongly, growing disturbingly large.", false);
            if (chest.count() == 1) outputText("You drop to your knees from a massive change in your center of gravity.  The tingling in your " + breastDescript(0) + " intensifies as they continue to grow at an obscene rate.", false);
        }
        if (chest.BreastRatingLargest[0].breastRating >= 8.5 && chest.BreastRatingLargest[0].nippleLength < 2) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = 2;
        }
        if (chest.BreastRatingLargest[0].breastRating >= 7 && chest.BreastRatingLargest[0].nippleLength < 1) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = 1;
        }
        if (chest.BreastRatingLargest[0].breastRating >= 5 && chest.BreastRatingLargest[0].nippleLength < .75) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = .75;
        }
        if (chest.BreastRatingLargest[0].breastRating >= 3 && chest.BreastRatingLargest[0].nippleLength < .5) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = .5;
        }
    }

    public static topRowBreastGrowthDescription(amount: number, chest: BreastRowModule) {
        if (amount <= 2) {
            if (chest.count() > 1) outputText("Your top row of " + breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.", false);
            if (chest.count() == 1) outputText("Your row of " + breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.", false);
        }
        if (amount > 2 && amount <= 4) {
            if (chest.count() > 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your top row of " + breastDescript(0) + " expand significantly.", false);
            if (chest.count() == 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + breastDescript(0) + " expand significantly.", false);
        }
        if (amount > 4) {
            if (chest.count() > 1) outputText("You drop to your knees from a massive change in your body's center of gravity.  Your top row of " + breastDescript(0) + " tingle strongly, growing disturbingly large.", false);
            if (chest.count() == 1) outputText("You drop to your knees from a massive change in your center of gravity.  The tinglng in your " + breastDescript(0) + " intensifies as they continue to grow at an obscene rate.", false);
        }
        if (chest.BreastRatingLargest[0].breastRating >= 8.5 && chest.BreastRatingLargest[0].nippleLength < 2) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = 2;
        }
        if (chest.BreastRatingLargest[0].breastRating >= 7 && chest.BreastRatingLargest[0].nippleLength < 1) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = 1;
        }
        if (chest.BreastRatingLargest[0].breastRating >= 5 && chest.BreastRatingLargest[0].nippleLength < .75) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = .75;
        }
        if (chest.BreastRatingLargest[0].breastRating >= 3 && chest.BreastRatingLargest[0].nippleLength < .5) {
            outputText("  A tender ache starts at your " + nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
            chest.BreastRatingLargest[0].nippleLength = .5;
        }
    }

}