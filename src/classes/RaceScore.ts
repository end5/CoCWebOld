import { ArmType } from './Body/Arms';
import BreastRow from './Body/BreastRow';
import { CockType } from './Body/Cock';
import { EarType } from './Body/Ears';
import { EyeType } from './Body/Eyes';
import { FaceType } from './Body/Face';
import { HairType } from './Body/Hair';
import { AntennaeType } from './Body/Head';
import { HornType } from './Body/Horns';
import { LegType } from './Body/Legs';
import { SkinType } from './Body/Skin';
import { TailType } from './Body/Tail';
import { TongueType } from './Body/Tongue';
import { VaginaType } from './Body/Vagina';
import { WingType } from './Body/Wings';
import Character from './Character/Character';
import { StatusAffectType } from './Effects/StatusAffectType';

export default class RaceScore {
    public static demonScore(character: Character): number {
        let demonCounter: number = 0;
        if (character.torso.neck.head.horns.amount === HornType.DEMON && character.torso.neck.head.horns.amount > 0) {
            demonCounter++;
            if (character.torso.neck.head.horns.amount > 4)
                demonCounter++;
        }
        if (character.torso.tails.filterType(TailType.DEMONIC).length > 1)
            demonCounter++;
        if (character.torso.wings.type === WingType.BAT_LIKE_LARGE ||
            character.torso.wings.type === WingType.BAT_LIKE_TINY)
            demonCounter++;
        if (character.skin.type === SkinType.PLAIN && character.stats.cor > 50)
            demonCounter++;
        if (character.torso.neck.head.face.type === FaceType.HUMAN && character.stats.cor > 50)
            demonCounter++;
        if (character.torso.hips.legs.type === LegType.DEMONIC_HIGH_HEELS ||
            character.torso.hips.legs.type === LegType.DEMONIC_CLAWS)
            demonCounter++;
        if (character.torso.cocks.filterType(CockType.DEMON).length > 0)
            demonCounter++;
        return demonCounter;
    }

    // Determine Human Rating
    public static humanScore(character: Character): number {
        let humanCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.HUMAN)
            humanCounter++;
        if (character.skin.type === SkinType.PLAIN)
            humanCounter++;
        if (character.torso.neck.head.horns.amount === HornType.NONE)
            humanCounter++;
        if (character.torso.tails.count === 0)
            humanCounter++;
        if (character.torso.wings.type === WingType.NONE)
            humanCounter++;
        if (character.torso.hips.legs.type === LegType.HUMAN)
            humanCounter++;
        if (character.torso.cocks.filterType(CockType.HUMAN).length === 1 && character.torso.cocks.count === 1)
            humanCounter++;
        if (character.torso.chest.count === 1 && character.skin.type === SkinType.PLAIN)
            humanCounter++;
        return humanCounter;
    }

    // Determine minotaur rating
    public static minotaurScore(character: Character): number {
        let minoCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.COW_MINOTAUR)
            minoCounter++;
        if (character.torso.neck.head.ears.type === EarType.COW)
            minoCounter++;
        if (character.torso.tails.hasType(TailType.COW))
            minoCounter++;
        if (character.torso.neck.head.horns.type === HornType.COW_MINOTAUR)
            minoCounter++;
        if (character.torso.hips.legs.type === LegType.HOOFED && minoCounter > 0)
            minoCounter++;
        if (character.tallness > 80 && minoCounter > 0)
            minoCounter++;
        if (character.torso.cocks.count > 0 && minoCounter > 0) {
            if (character.torso.cocks.filterType(CockType.HORSE))
                minoCounter++;
        }
        if (character.torso.vaginas.count > 0)
            minoCounter--;
        return minoCounter;
    }

    // Determine cow rating
    public static cowScore(character: Character): number {
        let minoCounter: number = 0;
        if (character.torso.neck.head.face.type === 0)
            minoCounter++;
        if (character.torso.neck.head.face.type === FaceType.COW_MINOTAUR)
            minoCounter--;
        if (character.torso.neck.head.ears.type === EarType.COW)
            minoCounter++;
        if (character.torso.tails.filterType(TailType.COW).length > 0)
            minoCounter++;
        if (character.torso.neck.head.horns.type === HornType.COW_MINOTAUR)
            minoCounter++;
        if (character.torso.hips.legs.type === 1 && minoCounter > 0)
            minoCounter++;
        if (character.tallness >= 73 && minoCounter > 0)
            minoCounter++;
        if (character.torso.vaginas.count > 0)
            minoCounter++;
        if (character.torso.chest.count > 0) {
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 4 && minoCounter > 0)
                minoCounter++;
            if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].rating > 2 && minoCounter > 0)
                minoCounter++;
        }
        return minoCounter;
    }

    public static sandTrapScore(character: Character): number {
        let counter: number = 0;
        if (character.statusAffects.has(StatusAffectType.BlackNipples))
            counter++;
        if (character.torso.vaginas.count > 0 && character.torso.vaginas.get(0).type === VaginaType.BLACK_SAND_TRAP)
            counter++;
        if (character.torso.neck.head.face.eyes.type === EyeType.BLACK_EYES_SAND_TRAP)
            counter++;
        if (character.torso.wings.type === 12)
            counter++;
        if (character.statusAffects.has(StatusAffectType.Uniball))
            counter++;
        return counter;
    }

    // Determine Bee Rating
    public static beeScore(character: Character): number {
        let beeCounter: number = 0;
        if (character.torso.neck.head.hair.color === "shiny black")
            beeCounter++;
        if (character.torso.neck.head.hair.color === "black and yellow")
            beeCounter += 2;
        if (character.torso.neck.head.antennae > 0) {
            beeCounter++;
            if (character.torso.neck.head.face.type === FaceType.HUMAN)
                beeCounter++;
        }
        if (character.torso.hips.legs.type === LegType.BEE) {
            beeCounter++;
            if (character.torso.vaginas.count === 1)
                beeCounter++;
        }
        if (character.torso.tails.filterType(TailType.BEE_ABDOMEN).length > 0)
            beeCounter++;
        if (character.torso.wings.type === WingType.BEE_LIKE_LARGE)
            beeCounter++;
        if (character.torso.wings.type === WingType.BEE_LIKE_SMALL)
            beeCounter++;
        return beeCounter;
    }
    // Determine Ferret Rating!
    public static ferretScore(character: Character): number {
        let counter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.FERRET_MASK)
            counter++;
        if (character.torso.neck.head.face.type === FaceType.FERRET)
            counter += 2;
        if (character.torso.neck.head.ears.type === EarType.FERRET)
            counter++;
        if (character.torso.tails.filterType(TailType.FERRET).length > 0)
            counter++;
        if (character.torso.hips.legs.type === LegType.FERRET)
            counter++;
        if (character.skin.type === SkinType.FUR && counter > 0)
            counter++;
        return counter;
    }
    // Determine Dog Rating
    public static dogScore(character: Character): number {
        let dogCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.DOG)
            dogCounter++;
        if (character.torso.neck.head.ears.type === EarType.DOG)
            dogCounter++;
        if (character.torso.tails.filterType(TailType.DOG).length > 0)
            dogCounter++;
        if (character.torso.hips.legs.type === LegType.DOG)
            dogCounter++;
        if (character.torso.cocks.filterType(CockType.DOG).length > 0)
            dogCounter++;
        if (character.torso.chest.count > 1)
            dogCounter++;
        if (character.torso.chest.count === 3)
            dogCounter++;
        if (character.torso.chest.count > 3)
            dogCounter--;
        // Fur only counts if some canine features are present
        if (character.skin.type === SkinType.FUR && dogCounter > 0)
            dogCounter++;
        return dogCounter;
    }

    public static mouseScore(character: Character): number {
        let coonCounter: number = 0;
        if (character.torso.neck.head.ears.type === EarType.MOUSE)
            coonCounter++;
        if (character.torso.tails.filterType(TailType.MOUSE).length > 0)
            coonCounter++;

        if (character.torso.neck.head.face.type === FaceType.BUCKTEETH)
            coonCounter++;
        if (character.torso.neck.head.face.type === FaceType.MOUSE)
            coonCounter += 2;
        // Fur only counts if some canine features are present
        if (character.skin.type === SkinType.FUR && coonCounter > 0)
            coonCounter++;

        if (character.tallness < 55 && coonCounter > 0)
            coonCounter++;
        if (character.tallness < 45 && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }

    public static raccoonScore(character: Character): number {
        let coonCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.RACCOON)
            coonCounter++;
        if (character.torso.neck.head.face.type === FaceType.RACCOON_MASK)
            coonCounter += 2;
        if (character.torso.neck.head.ears.type === EarType.RACCOON)
            coonCounter++;
        if (character.torso.tails.filterType(TailType.RACCOON).length > 0)
            coonCounter++;
        if (character.torso.hips.legs.type === LegType.RACCOON)
            coonCounter++;
        if (coonCounter > 0 && character.torso.balls.quantity > 0)
            coonCounter++;
        // Fur only counts if some canine features are present
        if (character.skin.type === SkinType.FUR && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }

    // Determine Fox Rating
    public static foxScore(character: Character): number {
        let foxCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.FOX)
            foxCounter++;
        if (character.torso.neck.head.ears.type === EarType.FOX)
            foxCounter++;
        if (character.torso.tails.filterType(TailType.FOX).length > 0)
            foxCounter++;
        if (character.torso.hips.legs.type === LegType.FOX)
            foxCounter++;
        if (character.torso.cocks.filterType(CockType.DOG).length > 0 && foxCounter > 0)
            foxCounter++;
        if (character.torso.chest.count > 1 && foxCounter > 0)
            foxCounter++;
        if (character.torso.chest.count === 3 && foxCounter > 0)
            foxCounter++;
        if (character.torso.chest.count === 4 && foxCounter > 0)
            foxCounter++;
        // Fur only counts if some canine features are present
        if (character.skin.type === SkinType.FUR && foxCounter > 0)
            foxCounter++;
        return foxCounter;
    }

    // Determine cat Rating
    public static catScore(character: Character): number {
        let catCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.CAT)
            catCounter++;
        if (character.torso.neck.head.ears.type === EarType.CAT)
            catCounter++;
        if (character.torso.tails.filterType(TailType.CAT).length > 0)
            catCounter++;
        if (character.torso.hips.legs.type === LegType.CAT)
            catCounter++;
        if (character.torso.cocks.filterType(CockType.CAT).length > 0)
            catCounter++;
        if (character.torso.chest.count > 1 && catCounter > 0)
            catCounter++;
        if (character.torso.chest.count === 3 && catCounter > 0)
            catCounter++;
        if (character.torso.chest.count > 3)
            catCounter -= 2;
        // Fur only counts if some canine features are present
        if (character.skin.type === SkinType.FUR && catCounter > 0)
            catCounter++;
        return catCounter;
    }

    // Determine lizard rating
    public static lizardScore(character: Character): number {
        let lizardCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.LIZARD)
            lizardCounter++;
        if (character.torso.neck.head.ears.type === EarType.LIZARD)
            lizardCounter++;
        if (character.torso.tails.filterType(TailType.LIZARD).length > 0)
            lizardCounter++;
        if (character.torso.hips.legs.type === LegType.LIZARD)
            lizardCounter++;
        if (character.torso.cocks.filterType(CockType.LIZARD).length > 0)
            lizardCounter++;
        if (character.torso.neck.head.horns.amount > 0 &&
            (character.torso.neck.head.horns.type === HornType.DRACONIC_X2 ||
                character.torso.neck.head.horns.type === HornType.DRACONIC_X4_12_INCH_LONG))
            lizardCounter++;
        if (character.skin.type === 2)
            lizardCounter++;
        return lizardCounter;
    }

    public static spiderScore(character: Character): number {
        let score: number = 0;
        if (character.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES)
            score += 2;
        if (character.torso.neck.head.face.type === FaceType.SPIDER_FANGS)
            score++;
        if (character.torso.arms.type === ArmType.SPIDER)
            score++;
        if (character.torso.hips.legs.type === LegType.CHITINOUS_SPIDER_LEGS || character.torso.hips.legs.type === LegType.DRIDER_LOWER_BODY)
            score += 2;
        else if (score > 0)
            score--;
        if (character.torso.tails.filterType(TailType.SPIDER_ABDOMEN).length > 0)
            score += 2;
        if (character.skin.type !== SkinType.PLAIN && score > 0)
            score--;
        return score;
    }

    // Determine Horse Rating
    public static horseScore(character: Character): number {
        let horseCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.HORSE)
            horseCounter++;
        if (character.torso.neck.head.ears.type === EarType.HORSE)
            horseCounter++;
        if (character.torso.tails.filterType(TailType.HORSE).length > 0)
            horseCounter++;
        if (character.torso.cocks.filterType(CockType.HORSE).length > 0)
            horseCounter++;
        if (character.torso.hips.legs.type === LegType.HOOFED || character.torso.hips.legs.type === LegType.CENTAUR)
            horseCounter++;
        // Fur only counts if some equine features are present
        if (character.skin.type === SkinType.FUR && horseCounter > 0)
            horseCounter++;
        return horseCounter;
    }

    // Determine kitsune Rating
    public static kitsuneScore(character: Character): number {
        let kitsuneCounter: number = 0;
        if (character.torso.neck.head.ears.type === EarType.FOX)
            kitsuneCounter++;
        if (character.torso.tails.filterType(TailType.FOX).length > 0)
            kitsuneCounter++;
        if (character.torso.tails.filterType(TailType.FOX).length > 0 && character.torso.tails.count >= 2)
            kitsuneCounter += 2;
        if (character.torso.vaginas.get(0).capacity() >= 8000)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && character.torso.neck.head.face.type === FaceType.HUMAN)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && (character.torso.neck.head.hair.color === "golden blonde" ||
            character.torso.neck.head.hair.color === "black" ||
            character.torso.neck.head.hair.color === "red" ||
            character.torso.neck.head.hair.color === "white" ||
            character.torso.neck.head.hair.color === "silver blonde"))
            kitsuneCounter++;
        if (kitsuneCounter > 0 && character.femininity >= 40)
            kitsuneCounter++;
        if (character.skin.type !== SkinType.PLAIN)
            kitsuneCounter -= 2;
        if (character.skin.type === SkinType.FUR)
            kitsuneCounter--;
        if (character.torso.hips.legs.type !== LegType.HUMAN)
            kitsuneCounter--;
        if (character.torso.neck.head.face.type !== FaceType.HUMAN)
            kitsuneCounter--;
        if (character.torso.neck.head.ears.type !== EarType.FOX)
            kitsuneCounter--;
        if (character.torso.tails.filterType(TailType.FOX).length <= 0)
            kitsuneCounter--;

        return kitsuneCounter;
    }

    // Determine Horse Rating
    public static dragonScore(character: Character): number {
        let dragonCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.DRAGON)
            dragonCounter++;
        if (character.torso.neck.head.ears.type === EarType.DRAGON)
            dragonCounter++;
        if (character.torso.tails.filterType(TailType.DRACONIC).length > 0)
            dragonCounter++;
        if (character.torso.neck.head.face.tongue.type === TongueType.DRACONIC)
            dragonCounter++;
        if (character.torso.cocks.filterType(CockType.DRAGON).length > 0)
            dragonCounter++;
        if (character.torso.wings.type === WingType.DRACONIC_SMALL)
            dragonCounter++;
        if (character.torso.wings.type === WingType.DRACONIC_LARGE)
            dragonCounter += 2;
        if (character.torso.hips.legs.type === LegType.DRAGON)
            dragonCounter++;
        if (character.skin.type === SkinType.SCALES && dragonCounter > 0)
            dragonCounter++;
        if (character.torso.neck.head.horns.type === HornType.DRACONIC_X4_12_INCH_LONG || character.torso.neck.head.horns.type === HornType.DRACONIC_X2)
            dragonCounter++;
        return dragonCounter;
    }

    // Goblinscore
    public static goblinScore(character: Character): number {
        let goblinCounter: number = 0;
        if (character.torso.neck.head.ears.type === EarType.ELFIN)
            goblinCounter++;
        if (character.skin.tone === "pale yellow" || character.skin.tone === "grayish-blue" || character.skin.tone === "green" || character.skin.tone === "dark green")
            goblinCounter++;
        if (goblinCounter > 0) {
            if (character.torso.neck.head.face.type === FaceType.HUMAN)
                goblinCounter++;
            if (character.tallness < 48)
                goblinCounter++;
            if (character.torso.vaginas.count > 0)
                goblinCounter++;
            if (character.torso.hips.legs.type === 0)
                goblinCounter++;
        }
        return goblinCounter;
    }

    // Gooscore
    public static gooScore(character: Character): number {
        let gooCounter: number = 0;
        if (character.torso.neck.head.hair.type === HairType.GOO)
            gooCounter++;
        if (character.skin.adj === "slimy")
            gooCounter++;
        if (character.torso.hips.legs.type === LegType.GOO)
            gooCounter++;
        if (character.torso.vaginas.get(0).capacity() > 9000)
            gooCounter++;
        if (character.statusAffects.has(StatusAffectType.SlimeCraving))
            gooCounter++;
        return gooCounter;
    }

    // Nagascore
    public static nagaScore(character: Character): number {
        let nagaCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.SNAKE_FANGS)
            nagaCounter++;
        if (character.torso.neck.head.face.tongue.type === TongueType.SNAKE)
            nagaCounter++;
        if (nagaCounter > 0 && character.torso.neck.head.antennae === AntennaeType.NONE)
            nagaCounter++;
        if (nagaCounter > 0 && character.torso.wings.type === WingType.NONE)
            nagaCounter++;
        return nagaCounter;
    }

    // Bunnyscore
    public static bunnyScore(character: Character): number {
        let bunnyCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.BUNNY)
            bunnyCounter++;
        if (character.torso.tails.filterType(TailType.BUNNY).length > 0)
            bunnyCounter++;
        if (character.torso.neck.head.ears.type === EarType.BUNNY)
            bunnyCounter++;
        if (character.torso.hips.legs.type === LegType.BUNNY)
            bunnyCounter++;
        // More than 2 balls reduces bunny score
        if (character.torso.balls.quantity > 2 && bunnyCounter > 0)
            bunnyCounter--;
        // Human skin on bunmorph adds
        if (character.skin.type === SkinType.PLAIN && bunnyCounter > 1)
            bunnyCounter++;
        // No wings and character.upperBody.head.antennae a plus
        if (bunnyCounter > 0 && character.torso.neck.head.antennae === AntennaeType.NONE)
            bunnyCounter++;
        if (bunnyCounter > 0 && character.torso.wings.type === WingType.NONE)
            bunnyCounter++;
        return bunnyCounter;
    }

    // Harpyscore
    public static harpyScore(character: Character): number {
        let harpy: number = 0;
        if (character.torso.arms.type === ArmType.HARPY)
            harpy++;
        if (character.torso.neck.head.hair.type === HairType.FEATHER)
            harpy++;
        if (character.torso.wings.type === WingType.HARPY)
            harpy++;
        if (character.torso.tails.filterType(TailType.HARPY).length > 0)
            harpy++;
        if (character.torso.hips.legs.type === LegType.HARPY)
            harpy++;
        if (harpy >= 2 && character.torso.neck.head.face.type === FaceType.HUMAN)
            harpy++;
        if (harpy >= 2 && (character.torso.neck.head.ears.type === EarType.HUMAN || character.torso.neck.head.ears.type === EarType.ELFIN))
            harpy++;
        return harpy;
    }

    // Kangascore
    public static kangaScore(character: Character): number {
        let kanga: number = 0;
        if (character.torso.cocks.filterType(CockType.KANGAROO).length > 0)
            kanga++;
        if (character.torso.neck.head.ears.type === EarType.KANGAROO)
            kanga++;
        if (character.torso.tails.filterType(TailType.KANGAROO).length > 0)
            kanga++;
        if (character.torso.hips.legs.type === LegType.KANGAROO)
            kanga++;
        if (character.torso.neck.head.face.type === FaceType.KANGAROO)
            kanga++;
        if (kanga >= 2 && character.skin.type === SkinType.FUR)
            kanga++;
        return kanga;
    }

    // sharkscore
    public static sharkScore(character: Character): number {
        let sharkCounter: number = 0;
        if (character.torso.neck.head.face.type === FaceType.SHARK_TEETH)
            sharkCounter++;
        if (character.torso.wings.type === WingType.SHARK_FIN)
            sharkCounter++;
        if (character.torso.tails.filterType(TailType.SHARK).length > 0)
            sharkCounter++;
        return sharkCounter;
    }

    // Determine Mutant Rating
    public static mutantScore(character: Character): number {
        let mutantCounter: number = 0;
        if (character.torso.neck.head.face.type > 0)
            mutantCounter++;
        if (character.skin.type !== SkinType.PLAIN)
            mutantCounter++;
        if (character.torso.tails.count > 0)
            mutantCounter++;
        if (character.torso.cocks.count > 1)
            mutantCounter++;
        if (character.torso.cocks.count > 0 && character.torso.vaginas.count > 0)
            mutantCounter++;
        if (character.torso.chest.filter(BreastRow.FuckableNipples).length > 0)
            mutantCounter++;
        if (character.torso.chest.count > 1)
            mutantCounter++;
        /*if (character.upperBody.head.face.type == FaceType.HORSE) {
            if (character.skin.type == SkinType.FUR)
                mutantCounter--;
            if (character.torso.tailType == TailType.HORSE)
                mutantCounter--;
        }
        if (character.upperBody.head.face.type == 2) {
            if (character.skin.type == SkinType.FUR)
                mutantCounter--;
            if (character.torso.tailType == 2)
                mutantCounter--;
        }*/
        return mutantCounter--;
    }
}
