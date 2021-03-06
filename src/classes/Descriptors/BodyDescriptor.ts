﻿import ButtDescriptor from './ButtDescriptor';
import GenderDescriptor from './GenderDescriptor';
import VaginaDescriptor from './VaginaDescriptor';
import BreastRow from '../Body/BreastRow';
import Character from '../Character/Character';
import RaceScore from '../RaceScore';

export default class BodyDescriptor {
    public static describeBody(character: Character): string {
        let description: string = "";
        // OLD STUFF
        // SUPAH THIN
        if (character.thickness < 10) {
            // SUPAH BUFF
            if (character.tone > 90)
                description += "a lithe body covered in highly visible muscles";
            else if (character.tone > 75)
                description += "an incredibly thin, well-muscled frame";
            else if (character.tone > 50)
                description += "a very thin body that has a good bit of muscle definition";
            else if (character.tone > 25)
                description += "a lithe body and only a little bit of muscle definition";
            else
                description += "a waif-thin body, and soft, forgiving flesh";
        }
        // Pretty thin
        else if (character.thickness < 25) {
            if (character.tone > 90)
                description += "a thin body and incredible muscle definition";
            else if (character.tone > 75)
                description += "a narrow frame that shows off your muscles";
            else if (character.tone > 50)
                description += "a somewhat lithe body and a fair amount of definition";
            else if (character.tone > 25)
                description += "a narrow, soft body that still manages to show off a few muscles";
            else
                description += "a thin, soft body";
        }
        // Somewhat thin
        else if (character.thickness < 40) {
            if (character.tone > 90)
                description += "a fit, somewhat thin body and rippling muscles all over";
            else if (character.tone > 75)
                description += "a thinner-than-average frame and great muscle definition";
            else if (character.tone > 50)
                description += "a somewhat narrow body and a decent amount of visible muscle";
            else if (character.tone > 25)
                description += "a moderately thin body, soft curves, and only a little bit of muscle";
            else
                description += "a fairly thin form and soft, cuddle-able flesh";
        }
        // average
        else if (character.thickness < 60) {
            if (character.tone > 90)
                description += "average thickness and a bevy of perfectly defined muscles";
            else if (character.tone > 75)
                description += "an average-sized frame and great musculature";
            else if (character.tone > 50)
                description += "a normal waistline and decently visible muscles";
            else if (character.tone > 25)
                description += "an average body and soft, unremarkable flesh";
            else
                description += "an average frame and soft, untoned flesh with a tendency for jiggle";
        }
        else if (character.thickness < 75) {
            if (character.tone > 90)
                description += "a somewhat thick body that's covered in slabs of muscle";
            else if (character.tone > 75)
                description += "a body that's a little bit wide and has some highly-visible muscles";
            else if (character.tone > 50)
                description += "a solid build that displays a decent amount of muscle";
            else if (character.tone > 25)
                description += "a slightly wide frame that displays your curves and has hints of muscle underneath";
            else
                description += "a soft, plush body with plenty of jiggle";
        }
        else if (character.thickness < 90) {
            if (character.tone > 90)
                description += "a thickset frame that gives you the appearance of a wall of muscle";
            else if (character.tone > 75)
                description += "a burly form and plenty of muscle definition";
            else if (character.tone > 50)
                description += "a solid, thick frame and a decent amount of muscles";
            else if (character.tone > 25)
                description += "a wide-set body, some soft, forgiving flesh, and a hint of muscle underneath it";
            else {
                description += "a wide, cushiony body";
                if (character.gender >= 2 || character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3 || character.torso.hips.rating > 7 || character.torso.butt.rating > 7)
                    description += " and plenty of jiggle on your curves";
            }
        }
        // Chunky monkey
        else {
            if (character.tone > 90)
                description += "an extremely thickset frame and so much muscle others would find you harder to move than a huge boulder";
            else if (character.tone > 75)
                description += "a very wide body and enough muscle to make you look like a tank";
            else if (character.tone > 50)
                description += "an extremely substantial frame packing a decent amount of muscle";
            else if (character.tone > 25) {
                description += "a very wide body";
                if (character.gender >= 2 || character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 4 || character.torso.hips.rating > 10 || character.torso.butt.rating > 10)
                    description += ", lots of curvy jiggles,";
                description += " and hints of muscle underneath";
            }
            else {
                description += "a thick";
                if (character.gender >= 2 || character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 4 || character.torso.hips.rating > 10 || character.torso.butt.rating > 10)
                    description += ", voluptuous";
                description += " body and plush, ";
                if (character.gender >= 2 || character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 4 || character.torso.hips.rating > 10 || character.torso.butt.rating > 10)
                    description += " jiggly curves";
                else
                    description += " soft flesh";
            }
        }
        return description;
    }

    public static describeRace(character: Character): string {
        let race: string = "human";
        if (character.torso.hips.legs.type === 4)
            race = "centaur";
        if (character.torso.hips.legs.type === 11)
            race = "pony-kin";
        if (RaceScore.catScore(character) >= 4)
            race = "cat-" + GenderDescriptor.mf(character, "boy", "girl");
        if (RaceScore.lizardScore(character) >= 4) {
            if (character.gender === 0)
                race = "lizan";
            else if (character.gender === 1)
                race = "male lizan";
            else if (character.gender === 2)
                race = "female lizan";
            else
                race = "hermaphrodite lizan";
        }
        if (RaceScore.dragonScore(character) >= 4) {
            race = "dragon-morph";
            if (character.torso.neck.head.face.type === 0)
                race = "dragon-" + GenderDescriptor.mf(character, "man", "girl");
        }
        if (RaceScore.raccoonScore(character) >= 4) {
            race = "raccoon-morph";
            if (character.torso.balls.quantity > 0 && character.torso.balls.size > 5)
                race = "tanuki-morph";
        }
        if (RaceScore.dogScore(character) >= 4) {
            race = "dog-morph";
            if (character.torso.neck.head.face.type === 0)
                race = "dog-" + GenderDescriptor.mf(character, "man", "girl");
        }
        if (RaceScore.foxScore(character) >= 4) {
            if (character.skin.type === 1)
                race = "fox-morph";
            else
                race = "fox-" + GenderDescriptor.mf(character, "morph", "girl");
        }
        if (RaceScore.ferretScore(character) >= 4) {
            if (character.skin.type === 1)
                race = "ferret-morph";
            else
                race = "ferret-" + GenderDescriptor.mf(character, "morph", "girl");
        }
        if (RaceScore.kitsuneScore(character) >= 4) {
            race = "kitsune";
        }
        if (RaceScore.horseScore(character) >= 3) {
            if (character.torso.hips.legs.type === 4)
                race = "centaur-morph";
            else
                race = "equine-morph";
        }
        if (RaceScore.mutantScore(character) >= 5 && race === "human")
            race = "corrupted mutant";
        if (RaceScore.minotaurScore(character) >= 4)
            race = "minotaur-morph";
        if (RaceScore.cowScore(character) > 5) {
            race = "cow-";
            race += GenderDescriptor.mf(character, "morph", "girl");
        }
        if (RaceScore.beeScore(character) >= 5)
            race = "bee-morph";
        if (RaceScore.goblinScore(character) >= 5)
            race = "goblin";
        if (RaceScore.humanScore(character) >= 5 && race === "corrupted mutant")
            race = "somewhat human mutant";
        if (RaceScore.demonScore(character) > 4)
            race = "demon-morph";
        if (RaceScore.sharkScore(character) >= 3)
            race = "shark-morph";
        if (RaceScore.bunnyScore(character) >= 4)
            race = "bunny-" + GenderDescriptor.mf(character, "boy", "girl");
        if (RaceScore.harpyScore(character) >= 4) {
            if (character.gender >= 2)
                race = "harpy";
            else
                race = "avian";
        }
        if (RaceScore.spiderScore(character) >= 4) {
            race = "spider-morph";
            if (GenderDescriptor.mf(character, "no", "yes") === "yes")
                race = "spider-girl";
            if (character.torso.hips.legs.type === 16)
                race = "drider";
        }
        if (RaceScore.kangaScore(character) >= 4)
            race = "kangaroo-morph";
        if (RaceScore.mouseScore(character) >= 3) {
            if (character.torso.neck.head.face.type !== 16)
                race = "mouse-" + GenderDescriptor.mf(character, "boy", "girl");
            else
                race = "mouse-morph";
        }
        if (character.torso.hips.legs.type === 3)
            race = "naga";
        if (character.torso.hips.legs.type === 4)
            race = "centaur";

        if (RaceScore.gooScore(character) >= 3) {
            race = "goo-";
            race += GenderDescriptor.mf(character, "boi", "girl");
        }
        return race;
    }

    public static assholeOrPussy(character: Character): string {
        if (character.torso.vaginas.count > 0)
            return VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0));
        return ButtDescriptor.describeButthole(character.torso.butt);
    }
}
