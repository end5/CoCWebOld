import Player from "../Player";
import RaceScore from "../BodyTypeScore";
import GenderDescriptor from "./GenderDescriptor";

export default class PlayerDescriptor {
    public static describeBody(player: Player): string {
        let description: string = "";
        //OLD STUFF
        //SUPAH THIN
        if (player.thickness < 10) {
            //SUPAH BUFF
            if (player.tone > 90)
                description += "a lithe body covered in highly visible muscles";
            else if (player.tone > 75)
                description += "an incredibly thin, well-muscled frame";
            else if (player.tone > 50)
                description += "a very thin body that has a good bit of muscle definition";
            else if (player.tone > 25)
                description += "a lithe body and only a little bit of muscle definition";
            else
                description += "a waif-thin body, and soft, forgiving flesh";
        }
        //Pretty thin
        else if (player.thickness < 25) {
            if (player.tone > 90)
                description += "a thin body and incredible muscle definition";
            else if (player.tone > 75)
                description += "a narrow frame that shows off your muscles";
            else if (player.tone > 50)
                description += "a somewhat lithe body and a fair amount of definition";
            else if (player.tone > 25)
                description += "a narrow, soft body that still manages to show off a few muscles";
            else
                description += "a thin, soft body";
        }
        //Somewhat thin
        else if (player.thickness < 40) {
            if (player.tone > 90)
                description += "a fit, somewhat thin body and rippling muscles all over";
            else if (player.tone > 75)
                description += "a thinner-than-average frame and great muscle definition";
            else if (player.tone > 50)
                description += "a somewhat narrow body and a decent amount of visible muscle";
            else if (player.tone > 25)
                description += "a moderately thin body, soft curves, and only a little bit of muscle";
            else
                description += "a fairly thin form and soft, cuddle-able flesh";
        }
        //average
        else if (player.thickness < 60) {
            if (player.tone > 90)
                description += "average thickness and a bevy of perfectly defined muscles";
            else if (player.tone > 75)
                description += "an average-sized frame and great musculature";
            else if (player.tone > 50)
                description += "a normal waistline and decently visible muscles";
            else if (player.tone > 25)
                description += "an average body and soft, unremarkable flesh";
            else
                description += "an average frame and soft, untoned flesh with a tendency for jiggle";
        }
        else if (player.thickness < 75) {
            if (player.tone > 90)
                description += "a somewhat thick body that's covered in slabs of muscle";
            else if (player.tone > 75)
                description += "a body that's a little bit wide and has some highly-visible muscles";
            else if (player.tone > 50)
                description += "a solid build that displays a decent amount of muscle";
            else if (player.tone > 25)
                description += "a slightly wide frame that displays your curves and has hints of muscle underneath";
            else
                description += "a soft, plush body with plenty of jiggle";
        }
        else if (player.thickness < 90) {
            if (player.tone > 90)
                description += "a thickset frame that gives you the appearance of a wall of muscle";
            else if (player.tone > 75)
                description += "a burly form and plenty of muscle definition";
            else if (player.tone > 50)
                description += "a solid, thick frame and a decent amount of muscles";
            else if (player.tone > 25)
                description += "a wide-set body, some soft, forgiving flesh, and a hint of muscle underneath it";
            else {
                description += "a wide, cushiony body";
                if (player.gender >= 2 || player.upperBody.chest.BreastRatingLargest[0].breastRating > 3 || player.lowerBody.hipRating > 7 || player.lowerBody.butt.buttRating > 7)
                    description += " and plenty of jiggle on your curves";
            }
        }
        //Chunky monkey
        else {
            if (player.tone > 90)
                description += "an extremely thickset frame and so much muscle others would find you harder to move than a huge boulder";
            else if (player.tone > 75)
                description += "a very wide body and enough muscle to make you look like a tank";
            else if (player.tone > 50)
                description += "an extremely substantial frame packing a decent amount of muscle";
            else if (player.tone > 25) {
                description += "a very wide body";
                if (player.gender >= 2 || player.upperBody.chest.BreastRatingLargest[0].breastRating > 4 || player.lowerBody.hipRating > 10 || player.lowerBody.butt.buttRating > 10)
                    description += ", lots of curvy jiggles,";
                description += " and hints of muscle underneath";
            }
            else {
                description += "a thick";
                if (player.gender >= 2 || player.upperBody.chest.BreastRatingLargest[0].breastRating > 4 || player.lowerBody.hipRating > 10 || player.lowerBody.butt.buttRating > 10)
                    description += ", voluptuous";
                description += " body and plush, ";
                if (player.gender >= 2 || player.upperBody.chest.BreastRatingLargest[0].breastRating > 4 || player.lowerBody.hipRating > 10 || player.lowerBody.butt.buttRating > 10)
                    description += " jiggly curves";
                else
                    description += " soft flesh";
            }
        }
        return description;
    }

    public static describeRace(player: Player): string {
        let race: string = "human";
        if (player.lowerBody.type == 4)
            race = "centaur";
        if (player.lowerBody.type == 11)
            race = "pony-kin";
        if (RaceScore.catScore(player) >= 4)
            race = "cat-" + GenderDescriptor.mf(player, "boy", "girl");
        if (RaceScore.lizardScore(player) >= 4) {
            if (player.gender == 0)
                race = "lizan";
            else if (player.gender == 1)
                race = "male lizan";
            else if (player.gender == 2)
                race = "female lizan";
            else
                race = "hermaphrodite lizan";
        }
        if (RaceScore.dragonScore(player) >= 4) {
            race = "dragon-morph";
            if (player.upperBody.head.face.faceType == 0)
                race = "dragon-" + GenderDescriptor.mf(player, "man", "girl");
        }
        if (RaceScore.raccoonScore(player) >= 4) {
            race = "raccoon-morph";
            if (player.lowerBody.balls > 0 && player.lowerBody.ballSize > 5)
                race = "tanuki-morph";
        }
        if (RaceScore.dogScore(player) >= 4) {
            race = "dog-morph";
            if (player.upperBody.head.face.faceType == 0)
                race = "dog-" + GenderDescriptor.mf(player, "man", "girl");
        }
        if (RaceScore.foxScore(player) >= 4) {
            if (player.skinType == 1)
                race = "fox-morph";
            else
                race = "fox-" + GenderDescriptor.mf(player, "morph", "girl");
        }
        if (RaceScore.ferretScore(player) >= 4) {
            if (player.skinType == 1)
                race = "ferret-morph";
            else
                race = "ferret-" + GenderDescriptor.mf(player, "morph", "girl");
        }
        if (RaceScore.kitsuneScore(player) >= 4) {
            race = "kitsune";
        }
        if (RaceScore.horseScore(player) >= 3) {
            if (player.lowerBody.type == 4)
                race = "centaur-morph";
            else
                race = "equine-morph";
        }
        if (RaceScore.mutantScore(player) >= 5 && race == "human")
            race = "corrupted mutant";
        if (RaceScore.minotaurScore(player) >= 4)
            race = "minotaur-morph";
        if (RaceScore.cowScore(player) > 5) {
            race = "cow-";
            race += GenderDescriptor.mf(player, "morph", "girl");
        }
        if (RaceScore.beeScore(player) >= 5)
            race = "bee-morph";
        if (RaceScore.goblinScore(player) >= 5)
            race = "goblin";
        if (RaceScore.humanScore(player) >= 5 && race == "corrupted mutant")
            race = "somewhat human mutant";
        if (RaceScore.demonScore(player) > 4)
            race = "demon-morph";
        if (RaceScore.sharkScore(player) >= 3)
            race = "shark-morph";
        if (RaceScore.bunnyScore(player) >= 4)
            race = "bunny-" + GenderDescriptor.mf(player, "boy", "girl");
        if (RaceScore.harpyScore(player) >= 4) {
            if (player.gender >= 2)
                race = "harpy";
            else
                race = "avian";
        }
        if (RaceScore.spiderScore(player) >= 4) {
            race = "spider-morph";
            if (GenderDescriptor.mf(player, "no", "yes") == "yes")
                race = "spider-girl";
            if (player.lowerBody.type == 16)
                race = "drider";
        }
        if (RaceScore.kangaScore(player) >= 4)
            race = "kangaroo-morph";
        if (RaceScore.mouseScore(player) >= 3) {
            if (player.upperBody.head.face.faceType != 16)
                race = "mouse-" + GenderDescriptor.mf(player, "boy", "girl");
            else
                race = "mouse-morph";
        }
        if (player.lowerBody.type == 3)
            race = "naga";
        if (player.lowerBody.type == 4)
            race = "centaur";

        if (RaceScore.gooScore(player) >= 3) {
            race = "goo-";
            race += GenderDescriptor.mf(player, "boi", "girl");
        }
        return race;
    }

}