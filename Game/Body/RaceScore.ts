import { ArmType } from './Arms';
import { BreastRow } from './BreastRow';
import { Cock, CockType } from './Cock';
import { EarType } from './Ears';
import { EyeType } from './Eyes';
import { FaceType } from './Face';
import { HairType } from './Hair';
import { AntennaeType } from './Antennae';
import { HornType } from './Horns';
import { LegType } from './Legs';
import { SkinType } from './Skin';
import { Tail, TailType } from './Tail';
import { TongueType } from './Tongue';
import { VaginaType } from './Vagina';
import { WingType } from './Wings';
import { Character } from '../Character/Character';
import { StatusEffectType } from '../Effects/StatusEffectType';

export class RaceScore {
    public static demonScore(character: Character): number {
        let demonCounter: number = 0;
        if (character.body.horns.count === HornType.DEMON && character.body.horns.count > 0) {
            demonCounter++;
            if (character.body.horns.count > 4)
                demonCounter++;
        }
        if (character.body.tails.filter(Tail.FilterType(TailType.DEMONIC)).length > 1)
            demonCounter++;
        if (character.body.wings.type === WingType.BAT_LIKE_LARGE ||
            character.body.wings.type === WingType.BAT_LIKE_TINY)
            demonCounter++;
        if (character.body.skin.type === SkinType.PLAIN && character.stats.cor > 50)
            demonCounter++;
        if (character.body.face.type === FaceType.HUMAN && character.stats.cor > 50)
            demonCounter++;
        if (character.body.legs.type === LegType.DEMONIC_HIGH_HEELS ||
            character.body.legs.type === LegType.DEMONIC_CLAWS)
            demonCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.DEMON)).length > 0)
            demonCounter++;
        return demonCounter;
    }

    // Determine Human Rating
    public static humanScore(character: Character): number {
        let humanCounter: number = 0;
        if (character.body.face.type === FaceType.HUMAN)
            humanCounter++;
        if (character.body.skin.type === SkinType.PLAIN)
            humanCounter++;
        if (character.body.horns.count === HornType.NONE)
            humanCounter++;
        if (character.body.tails.count === 0)
            humanCounter++;
        if (character.body.wings.type === WingType.NONE)
            humanCounter++;
        if (character.body.legs.type === LegType.HUMAN)
            humanCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.HUMAN)).length === 1 && character.body.cocks.count === 1)
            humanCounter++;
        if (character.body.chest.count === 1 && character.body.skin.type === SkinType.PLAIN)
            humanCounter++;
        return humanCounter;
    }

    // Determine minotaur rating
    public static minotaurScore(character: Character): number {
        let minoCounter: number = 0;
        if (character.body.face.type === FaceType.COW_MINOTAUR)
            minoCounter++;
        if (character.body.ears.type === EarType.COW)
            minoCounter++;
        if (character.body.tails.reduce(Tail.HasType(TailType.COW), false))
            minoCounter++;
        if (character.body.horns.type === HornType.COW_MINOTAUR)
            minoCounter++;
        if (character.body.legs.type === LegType.HOOFED && minoCounter > 0)
            minoCounter++;
        if (character.body.tallness > 80 && minoCounter > 0)
            minoCounter++;
        if (character.body.cocks.count > 0 && minoCounter > 0) {
            if (character.body.cocks.filter(Cock.FilterType(CockType.HORSE)))
                minoCounter++;
        }
        if (character.body.vaginas.count > 0)
            minoCounter--;
        return minoCounter;
    }

    // Determine cow rating
    public static cowScore(character: Character): number {
        let minoCounter: number = 0;
        if (character.body.face.type === 0)
            minoCounter++;
        if (character.body.face.type === FaceType.COW_MINOTAUR)
            minoCounter--;
        if (character.body.ears.type === EarType.COW)
            minoCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.COW)).length > 0)
            minoCounter++;
        if (character.body.horns.type === HornType.COW_MINOTAUR)
            minoCounter++;
        if (character.body.legs.type === 1 && minoCounter > 0)
            minoCounter++;
        if (character.body.tallness >= 73 && minoCounter > 0)
            minoCounter++;
        if (character.body.vaginas.count > 0)
            minoCounter++;
        if (character.body.chest.count > 0) {
            if (character.body.chest.sort(BreastRow.Largest)[0].rating > 4 && minoCounter > 0)
                minoCounter++;
            if (character.body.chest.sort(BreastRow.LactationMost)[0].rating > 2 && minoCounter > 0)
                minoCounter++;
        }
        return minoCounter;
    }

    public static sandTrapScore(character: Character): number {
        let counter: number = 0;
        if (character.statusAffects.has(StatusEffectType.BlackNipples))
            counter++;
        if (character.body.vaginas.count > 0 && character.body.vaginas.get(0).type === VaginaType.BLACK_SAND_TRAP)
            counter++;
        if (character.body.eyes.type === EyeType.BLACK_EYES_SAND_TRAP)
            counter++;
        if (character.body.wings.type === 12)
            counter++;
        if (character.statusAffects.has(StatusEffectType.Uniball))
            counter++;
        return counter;
    }

    // Determine Bee Rating
    public static beeScore(character: Character): number {
        let beeCounter: number = 0;
        if (character.body.hair.color === "shiny black")
            beeCounter++;
        if (character.body.hair.color === "black and yellow")
            beeCounter += 2;
        if (character.body.antennae.type > 0) {
            beeCounter++;
            if (character.body.face.type === FaceType.HUMAN)
                beeCounter++;
        }
        if (character.body.legs.type === LegType.BEE) {
            beeCounter++;
            if (character.body.vaginas.count === 1)
                beeCounter++;
        }
        if (character.body.tails.filter(Tail.FilterType(TailType.BEE_ABDOMEN)).length > 0)
            beeCounter++;
        if (character.body.wings.type === WingType.BEE_LIKE_LARGE)
            beeCounter++;
        if (character.body.wings.type === WingType.BEE_LIKE_SMALL)
            beeCounter++;
        return beeCounter;
    }
    // Determine Ferret Rating!
    public static ferretScore(character: Character): number {
        let counter: number = 0;
        if (character.body.face.type === FaceType.FERRET_MASK)
            counter++;
        if (character.body.face.type === FaceType.FERRET)
            counter += 2;
        if (character.body.ears.type === EarType.FERRET)
            counter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.FERRET)).length > 0)
            counter++;
        if (character.body.legs.type === LegType.FERRET)
            counter++;
        if (character.body.skin.type === SkinType.FUR && counter > 0)
            counter++;
        return counter;
    }
    // Determine Dog Rating
    public static dogScore(character: Character): number {
        let dogCounter: number = 0;
        if (character.body.face.type === FaceType.DOG)
            dogCounter++;
        if (character.body.ears.type === EarType.DOG)
            dogCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.DOG)).length > 0)
            dogCounter++;
        if (character.body.legs.type === LegType.DOG)
            dogCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.DOG)).length > 0)
            dogCounter++;
        if (character.body.chest.count > 1)
            dogCounter++;
        if (character.body.chest.count === 3)
            dogCounter++;
        if (character.body.chest.count > 3)
            dogCounter--;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === SkinType.FUR && dogCounter > 0)
            dogCounter++;
        return dogCounter;
    }

    public static mouseScore(character: Character): number {
        let coonCounter: number = 0;
        if (character.body.ears.type === EarType.MOUSE)
            coonCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.MOUSE)).length > 0)
            coonCounter++;

        if (character.body.face.type === FaceType.BUCKTEETH)
            coonCounter++;
        if (character.body.face.type === FaceType.MOUSE)
            coonCounter += 2;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === SkinType.FUR && coonCounter > 0)
            coonCounter++;

        if (character.body.tallness < 55 && coonCounter > 0)
            coonCounter++;
        if (character.body.tallness < 45 && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }

    public static raccoonScore(character: Character): number {
        let coonCounter: number = 0;
        if (character.body.face.type === FaceType.RACCOON)
            coonCounter++;
        if (character.body.face.type === FaceType.RACCOON_MASK)
            coonCounter += 2;
        if (character.body.ears.type === EarType.RACCOON)
            coonCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.RACCOON)).length > 0)
            coonCounter++;
        if (character.body.legs.type === LegType.RACCOON)
            coonCounter++;
        if (coonCounter > 0 && character.body.balls.count > 0)
            coonCounter++;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === SkinType.FUR && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }

    // Determine Fox Rating
    public static foxScore(character: Character): number {
        let foxCounter: number = 0;
        if (character.body.face.type === FaceType.FOX)
            foxCounter++;
        if (character.body.ears.type === EarType.FOX)
            foxCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.FOX)).length > 0)
            foxCounter++;
        if (character.body.legs.type === LegType.FOX)
            foxCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.DOG)).length > 0 && foxCounter > 0)
            foxCounter++;
        if (character.body.chest.count > 1 && foxCounter > 0)
            foxCounter++;
        if (character.body.chest.count === 3 && foxCounter > 0)
            foxCounter++;
        if (character.body.chest.count === 4 && foxCounter > 0)
            foxCounter++;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === SkinType.FUR && foxCounter > 0)
            foxCounter++;
        return foxCounter;
    }

    // Determine cat Rating
    public static catScore(character: Character): number {
        let catCounter: number = 0;
        if (character.body.face.type === FaceType.CAT)
            catCounter++;
        if (character.body.ears.type === EarType.CAT)
            catCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.CAT)).length > 0)
            catCounter++;
        if (character.body.legs.type === LegType.CAT)
            catCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.CAT)).length > 0)
            catCounter++;
        if (character.body.chest.count > 1 && catCounter > 0)
            catCounter++;
        if (character.body.chest.count === 3 && catCounter > 0)
            catCounter++;
        if (character.body.chest.count > 3)
            catCounter -= 2;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === SkinType.FUR && catCounter > 0)
            catCounter++;
        return catCounter;
    }

    // Determine lizard rating
    public static lizardScore(character: Character): number {
        let lizardCounter: number = 0;
        if (character.body.face.type === FaceType.LIZARD)
            lizardCounter++;
        if (character.body.ears.type === EarType.LIZARD)
            lizardCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.LIZARD)).length > 0)
            lizardCounter++;
        if (character.body.legs.type === LegType.LIZARD)
            lizardCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.LIZARD)).length > 0)
            lizardCounter++;
        if (character.body.horns.count > 0 &&
            (character.body.horns.type === HornType.DRACONIC_X2 ||
                character.body.horns.type === HornType.DRACONIC_X4_12_INCH_LONG))
            lizardCounter++;
        if (character.body.skin.type === 2)
            lizardCounter++;
        return lizardCounter;
    }

    public static spiderScore(character: Character): number {
        let score: number = 0;
        if (character.body.eyes.type === EyeType.FOUR_SPIDER_EYES)
            score += 2;
        if (character.body.face.type === FaceType.SPIDER_FANGS)
            score++;
        if (character.body.arms.type === ArmType.SPIDER)
            score++;
        if (character.body.legs.type === LegType.CHITINOUS_SPIDER_LEGS || character.body.legs.type === LegType.DRIDER_LOWER_BODY)
            score += 2;
        else if (score > 0)
            score--;
        if (character.body.tails.filter(Tail.FilterType(TailType.SPIDER_ABDOMEN)).length > 0)
            score += 2;
        if (character.body.skin.type !== SkinType.PLAIN && score > 0)
            score--;
        return score;
    }

    // Determine Horse Rating
    public static horseScore(character: Character): number {
        let horseCounter: number = 0;
        if (character.body.face.type === FaceType.HORSE)
            horseCounter++;
        if (character.body.ears.type === EarType.HORSE)
            horseCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.HORSE)).length > 0)
            horseCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0)
            horseCounter++;
        if (character.body.legs.type === LegType.HOOFED || character.body.legs.type === LegType.CENTAUR)
            horseCounter++;
        // Fur only counts if some equine features are present
        if (character.body.skin.type === SkinType.FUR && horseCounter > 0)
            horseCounter++;
        return horseCounter;
    }

    // Determine kitsune Rating
    public static kitsuneScore(character: Character): number {
        let kitsuneCounter: number = 0;
        if (character.body.ears.type === EarType.FOX)
            kitsuneCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.FOX)).length > 0)
            kitsuneCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.FOX)).length > 0 && character.body.tails.count >= 2)
            kitsuneCounter += 2;
        if (character.body.vaginas.count > 0 && character.body.vaginas.get(0).capacity() >= 8000)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && character.body.face.type === FaceType.HUMAN)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && (character.body.hair.color === "golden blonde" ||
            character.body.hair.color === "black" ||
            character.body.hair.color === "red" ||
            character.body.hair.color === "white" ||
            character.body.hair.color === "silver blonde"))
            kitsuneCounter++;
        if (kitsuneCounter > 0 && character.body.femininity >= 40)
            kitsuneCounter++;
        if (character.body.skin.type !== SkinType.PLAIN)
            kitsuneCounter -= 2;
        if (character.body.skin.type === SkinType.FUR)
            kitsuneCounter--;
        if (character.body.legs.type !== LegType.HUMAN)
            kitsuneCounter--;
        if (character.body.face.type !== FaceType.HUMAN)
            kitsuneCounter--;
        if (character.body.ears.type !== EarType.FOX)
            kitsuneCounter--;
        if (character.body.tails.filter(Tail.FilterType(TailType.FOX)).length <= 0)
            kitsuneCounter--;

        return kitsuneCounter;
    }

    // Determine Horse Rating
    public static dragonScore(character: Character): number {
        let dragonCounter: number = 0;
        if (character.body.face.type === FaceType.DRAGON)
            dragonCounter++;
        if (character.body.ears.type === EarType.DRAGON)
            dragonCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.DRACONIC)).length > 0)
            dragonCounter++;
        if (character.body.tongue.type === TongueType.DRACONIC)
            dragonCounter++;
        if (character.body.cocks.filter(Cock.FilterType(CockType.DRAGON)).length > 0)
            dragonCounter++;
        if (character.body.wings.type === WingType.DRACONIC_SMALL)
            dragonCounter++;
        if (character.body.wings.type === WingType.DRACONIC_LARGE)
            dragonCounter += 2;
        if (character.body.legs.type === LegType.DRAGON)
            dragonCounter++;
        if (character.body.skin.type === SkinType.SCALES && dragonCounter > 0)
            dragonCounter++;
        if (character.body.horns.type === HornType.DRACONIC_X4_12_INCH_LONG || character.body.horns.type === HornType.DRACONIC_X2)
            dragonCounter++;
        return dragonCounter;
    }

    // Goblinscore
    public static goblinScore(character: Character): number {
        let goblinCounter: number = 0;
        if (character.body.ears.type === EarType.ELFIN)
            goblinCounter++;
        if (character.body.skin.tone === "pale yellow" || character.body.skin.tone === "grayish-blue" || character.body.skin.tone === "green" || character.body.skin.tone === "dark green")
            goblinCounter++;
        if (goblinCounter > 0) {
            if (character.body.face.type === FaceType.HUMAN)
                goblinCounter++;
            if (character.body.tallness < 48)
                goblinCounter++;
            if (character.body.vaginas.count > 0)
                goblinCounter++;
            if (character.body.legs.type === 0)
                goblinCounter++;
        }
        return goblinCounter;
    }

    // Gooscore
    public static gooScore(character: Character): number {
        let gooCounter: number = 0;
        if (character.body.hair.type === HairType.GOO)
            gooCounter++;
        if (character.body.skin.adj === "slimy")
            gooCounter++;
        if (character.body.legs.type === LegType.GOO)
            gooCounter++;
        if (character.body.vaginas.count > 0 && character.body.vaginas.get(0).capacity() > 9000)
            gooCounter++;
        if (character.statusAffects.has(StatusEffectType.SlimeCraving))
            gooCounter++;
        return gooCounter;
    }

    // Nagascore
    public static nagaScore(character: Character): number {
        let nagaCounter: number = 0;
        if (character.body.face.type === FaceType.SNAKE_FANGS)
            nagaCounter++;
        if (character.body.tongue.type === TongueType.SNAKE)
            nagaCounter++;
        if (nagaCounter > 0 && character.body.antennae.type === AntennaeType.NONE)
            nagaCounter++;
        if (nagaCounter > 0 && character.body.wings.type === WingType.NONE)
            nagaCounter++;
        return nagaCounter;
    }

    // Bunnyscore
    public static bunnyScore(character: Character): number {
        let bunnyCounter: number = 0;
        if (character.body.face.type === FaceType.BUNNY)
            bunnyCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.BUNNY)).length > 0)
            bunnyCounter++;
        if (character.body.ears.type === EarType.BUNNY)
            bunnyCounter++;
        if (character.body.legs.type === LegType.BUNNY)
            bunnyCounter++;
        // More than 2 balls reduces bunny score
        if (character.body.balls.count > 2 && bunnyCounter > 0)
            bunnyCounter--;
        // Human skin on bunmorph adds
        if (character.body.skin.type === SkinType.PLAIN && bunnyCounter > 1)
            bunnyCounter++;
        // No wings and character.torso.antennae a plus
        if (bunnyCounter > 0 && character.body.antennae.type === AntennaeType.NONE)
            bunnyCounter++;
        if (bunnyCounter > 0 && character.body.wings.type === WingType.NONE)
            bunnyCounter++;
        return bunnyCounter;
    }

    // Harpyscore
    public static harpyScore(character: Character): number {
        let harpy: number = 0;
        if (character.body.arms.type === ArmType.HARPY)
            harpy++;
        if (character.body.hair.type === HairType.FEATHER)
            harpy++;
        if (character.body.wings.type === WingType.HARPY)
            harpy++;
        if (character.body.tails.filter(Tail.FilterType(TailType.HARPY)).length > 0)
            harpy++;
        if (character.body.legs.type === LegType.HARPY)
            harpy++;
        if (harpy >= 2 && character.body.face.type === FaceType.HUMAN)
            harpy++;
        if (harpy >= 2 && (character.body.ears.type === EarType.HUMAN || character.body.ears.type === EarType.ELFIN))
            harpy++;
        return harpy;
    }

    // Kangascore
    public static kangaScore(character: Character): number {
        let kanga: number = 0;
        if (character.body.cocks.filter(Cock.FilterType(CockType.KANGAROO)).length > 0)
            kanga++;
        if (character.body.ears.type === EarType.KANGAROO)
            kanga++;
        if (character.body.tails.filter(Tail.FilterType(TailType.KANGAROO)).length > 0)
            kanga++;
        if (character.body.legs.type === LegType.KANGAROO)
            kanga++;
        if (character.body.face.type === FaceType.KANGAROO)
            kanga++;
        if (kanga >= 2 && character.body.skin.type === SkinType.FUR)
            kanga++;
        return kanga;
    }

    // sharkscore
    public static sharkScore(character: Character): number {
        let sharkCounter: number = 0;
        if (character.body.face.type === FaceType.SHARK_TEETH)
            sharkCounter++;
        if (character.body.wings.type === WingType.SHARK_FIN)
            sharkCounter++;
        if (character.body.tails.filter(Tail.FilterType(TailType.SHARK)).length > 0)
            sharkCounter++;
        return sharkCounter;
    }

    // Determine Mutant Rating
    public static mutantScore(character: Character): number {
        let mutantCounter: number = 0;
        if (character.body.face.type > 0)
            mutantCounter++;
        if (character.body.skin.type !== SkinType.PLAIN)
            mutantCounter++;
        if (character.body.tails.count > 0)
            mutantCounter++;
        if (character.body.cocks.count > 1)
            mutantCounter++;
        if (character.body.cocks.count > 0 && character.body.vaginas.count > 0)
            mutantCounter++;
        if (character.body.chest.find(BreastRow.FuckableNipples))
            mutantCounter++;
        if (character.body.chest.count > 1)
            mutantCounter++;
        /*if (character.torso.face.type == FaceType.HORSE) {
            if (character.body.skin.type == SkinType.FUR)
                mutantCounter--;
            if (character.torso.tailType == TailType.HORSE)
                mutantCounter--;
        }
        if (character.torso.face.type == 2) {
            if (character.body.skin.type == SkinType.FUR)
                mutantCounter--;
            if (character.torso.tailType == 2)
                mutantCounter--;
        }*/
        return mutantCounter--;
    }
}
