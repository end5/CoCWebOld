import Player from "./Player";
import { HornType } from "./Body/Head";
import { TailType } from "./Body/LowerBody";

export default class RaceScore {
    public static demonScore(player: Player): number {
        let demonCounter: number = 0;
        if (player.upperBody.head.hornType == HornType.DEMON && player.upperBody.head.horns > 0) {
            demonCounter++;
            if (player.upperBody.head.horns > 4)
                demonCounter++;
        }
        if (player.lowerBody.tailType == TailType.DEMONIC)
            demonCounter++;
        if (player.upperBody.wingType == WingType.BAT_LIKE_LARGE ||
            player.upperBody.wingType == WingType.BAT_LIKE_TINY)
            demonCounter++;
        if (player.skinType == SkinType.PLAIN && player.stats.cor > 50)
            demonCounter++;
        if (player.upperBody.head.face.faceType == FaceType.HUMAN && player.stats.cor > 50)
            demonCounter++;
        if (player.lowerBody.type == LowerBodyType.DEMONIC_HIGH_HEELS ||
            player.lowerBody.type == LowerBodyType.DEMONIC_CLAWS)
            demonCounter++;
        if (player.lowerBody.cockSpot.countType(CockType.DEMON) > 0)
            demonCounter++;
        return demonCounter;
    }

    //Determine Human Rating
    public static humanScore(player: Player): number {
        let humanCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.HUMAN)
            humanCounter++;
        if (player.skinType == SkinType.PLAIN)
            humanCounter++;
        if (player.upperBody.head.horns == HornType.NONE)
            humanCounter++;
        if (player.lowerBody.tailType == TailType.NONE)
            humanCounter++;
        if (player.upperBody.wingType == WingType.NONE)
            humanCounter++;
        if (player.lowerBody.type == LowerBodyType.HUMAN)
            humanCounter++;
        if (player.lowerBody.cockSpot.countType(CockType.HUMAN) == 1 && player.lowerBody.cockSpot.count() == 1)
            humanCounter++;
        if (player.upperBody.chest.count() == 1 && player.skinType == SkinType.PLAIN)
            humanCounter++;
        return humanCounter;
    }

    //Determine minotaur rating
    public static minotaurScore(player: Player): number {
        let minoCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.COW_MINOTAUR)
            minoCounter++;
        if (player.upperBody.head.earType == EarType.COW)
            minoCounter++;
        if (player.lowerBody.tailType == TailType.COW)
            minoCounter++;
        if (player.upperBody.head.hornType == HornType.COW_MINOTAUR)
            minoCounter++;
        if (player.lowerBody.type == LowerBodyType.HOOFED && minoCounter > 0)
            minoCounter++;
        if (player.tallness > 80 && minoCounter > 0)
            minoCounter++;
        if (player.lowerBody.cockSpot.hasCock() && minoCounter > 0) {
            if (player.lowerBody.cockSpot.countType(CockType.HORSE))
                minoCounter++;
        }
        if (player.lowerBody.vaginaSpot.hasVagina())
            minoCounter--;
        return minoCounter;
    }

    //Determine cow rating
    public static cowScore(player: Player): number {
        let minoCounter: number = 0;
        if (player.upperBody.head.face.faceType == 0)
            minoCounter++;
        if (player.upperBody.head.face.faceType == FaceType.COW_MINOTAUR)
            minoCounter--;
        if (player.upperBody.head.earType == EarType.COW)
            minoCounter++;
        if (player.lowerBody.tailType == TailType.COW)
            minoCounter++;
        if (player.upperBody.head.hornType == HornType.COW_MINOTAUR)
            minoCounter++;
        if (player.lowerBody.type == 1 && minoCounter > 0)
            minoCounter++;
        if (player.tallness >= 73 && minoCounter > 0)
            minoCounter++;
        if (player.lowerBody.vaginaSpot.hasVagina())
            minoCounter++;
        if (player.upperBody.chest.hasBreasts()) {
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 4 && minoCounter > 0)
                minoCounter++;
            if (player.upperBody.chest.LactationMultipierLargest[0].breastRating > 2 && minoCounter > 0)
                minoCounter++;
        }
        return minoCounter;
    }

    public static sandTrapScore(player: Player): number {
        let counter: number = 0;
        if (player.statusAffects.has("BlackNipples"))
            counter++;
        if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.list[0].type == VaginaType.BLACK_SAND_TRAP)
            counter++;
        if (player.upperBody.head.face.eyeType == EyeType.BLACK_EYES_SAND_TRAP)
            counter++;
        if (player.upperBody.wingType == 12)
            counter++;
        if (player.statusAffects.has("Uniball"))
            counter++;
        return counter;
    }

    //Determine Bee Rating
    public static beeScore(player: Player): number {
        let beeCounter: number = 0;
        if (player.upperBody.head.hairColor == "shiny black")
            beeCounter++;
        if (player.upperBody.head.hairColor == "black and yellow")
            beeCounter += 2;
        if (player.upperBody.head.antennae > 0) {
            beeCounter++;
            if (player.upperBody.head.face.faceType == FaceType.HUMAN)
                beeCounter++;
        }
        if (player.lowerBody.type == LowerBodyType.BEE) {
            beeCounter++;
            if (player.lowerBody.vaginaSpot.count() == 1)
                beeCounter++;
        }
        if (player.lowerBody.tailType == TailType.BEE_ABDOMEN)
            beeCounter++;
        if (player.upperBody.wingType == WingType.BEE_LIKE_LARGE)
            beeCounter++;
        if (player.upperBody.wingType == WingType.BEE_LIKE_SMALL)
            beeCounter++;
        return beeCounter;
    }
    //Determine Ferret Rating!
    public static ferretScore(player: Player): number {
        let counter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.FERRET_MASK)
            counter++;
        if (player.upperBody.head.face.faceType == FaceType.FERRET)
            counter += 2;
        if (player.upperBody.head.earType == EarType.FERRET)
            counter++;
        if (player.lowerBody.tailType == TailType.FERRET)
            counter++;
        if (player.lowerBody.type == LowerBodyType.FERRET)
            counter++;
        if (player.skinType == SkinType.FUR && counter > 0)
            counter++;
        return counter;
    }
    //Determine Dog Rating
    public static dogScore(player: Player): number {
        let dogCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.DOG)
            dogCounter++;
        if (player.upperBody.head.earType == EarType.DOG)
            dogCounter++;
        if (player.lowerBody.tailType == TailType.DOG)
            dogCounter++;
        if (player.lowerBody.type == LowerBodyType.DOG)
            dogCounter++;
        if (player.lowerBody.cockSpot.hasCockType(CockType.DOG))
            dogCounter++;
        if (player.upperBody.chest.count() > 1)
            dogCounter++;
        if (player.upperBody.chest.count() == 3)
            dogCounter++;
        if (player.upperBody.chest.count() > 3)
            dogCounter--;
        //Fur only counts if some canine features are present
        if (player.skinType == SkinType.FUR && dogCounter > 0)
            dogCounter++;
        return dogCounter;
    }

    public static mouseScore(player: Player): number {
        let coonCounter: number = 0;
        if (player.upperBody.head.earType == EarType.MOUSE)
            coonCounter++;
        if (player.lowerBody.tailType == TailType.MOUSE)
            coonCounter++;

        if (player.upperBody.head.face.faceType == FaceType.BUCKTEETH)
            coonCounter++;
        if (player.upperBody.head.face.faceType == FaceType.MOUSE)
            coonCounter += 2;
        //Fur only counts if some canine features are present
        if (player.skinType == SkinType.FUR && coonCounter > 0)
            coonCounter++;

        if (player.tallness < 55 && coonCounter > 0)
            coonCounter++;
        if (player.tallness < 45 && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }

    public static raccoonScore(player: Player): number {
        let coonCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.RACCOON)
            coonCounter++;
        if (player.upperBody.head.face.faceType == FaceType.RACCOON_MASK)
            coonCounter += 2;
        if (player.upperBody.head.earType == EarType.RACCOON)
            coonCounter++;
        if (player.lowerBody.tailType == TailType.RACCOON)
            coonCounter++;
        if (player.lowerBody.type == LowerBodyType.RACCOON)
            coonCounter++;
        if (coonCounter > 0 && player.lowerBody.balls > 0)
            coonCounter++;
        //Fur only counts if some canine features are present
        if (player.skinType == SkinType.FUR && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }

    //Determine Fox Rating
    public static foxScore(player: Player): number {
        let foxCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.FOX)
            foxCounter++;
        if (player.upperBody.head.earType == EarType.FOX)
            foxCounter++;
        if (player.lowerBody.tailType == TailType.FOX)
            foxCounter++;
        if (player.lowerBody.type == LowerBodyType.FOX)
            foxCounter++;
        if (player.lowerBody.cockSpot.hasCockType(CockType.DOG) && foxCounter > 0)
            foxCounter++;
        if (player.upperBody.chest.count() > 1 && foxCounter > 0)
            foxCounter++;
        if (player.upperBody.chest.count() == 3 && foxCounter > 0)
            foxCounter++;
        if (player.upperBody.chest.count() == 4 && foxCounter > 0)
            foxCounter++;
        //Fur only counts if some canine features are present
        if (player.skinType == SkinType.FUR && foxCounter > 0)
            foxCounter++;
        return foxCounter;
    }

    //Determine cat Rating
    public static catScore(player: Player): number {
        let catCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.CAT)
            catCounter++;
        if (player.upperBody.head.earType == EarType.CAT)
            catCounter++;
        if (player.lowerBody.tailType == TailType.CAT)
            catCounter++;
        if (player.lowerBody.type == LowerBodyType.CAT)
            catCounter++;
        if (player.lowerBody.cockSpot.hasCockType(CockType.CAT))
            catCounter++;
        if (player.upperBody.chest.count() > 1 && catCounter > 0)
            catCounter++;
        if (player.upperBody.chest.count() == 3 && catCounter > 0)
            catCounter++;
        if (player.upperBody.chest.count() > 3)
            catCounter -= 2;
        //Fur only counts if some canine features are present
        if (player.skinType == SkinType.FUR && catCounter > 0)
            catCounter++;
        return catCounter;
    }

    //Determine lizard rating
    public static lizardScore(player: Player): number {
        let lizardCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.LIZARD)
            lizardCounter++;
        if (player.upperBody.head.earType == EarType.LIZARD)
            lizardCounter++;
        if (player.lowerBody.tailType == TailType.LIZARD)
            lizardCounter++;
        if (player.lowerBody.type == LowerBodyType.LIZARD)
            lizardCounter++;
        if (player.lowerBody.cockSpot.hasCockType(CockType.LIZARD))
            lizardCounter++;
        if (player.upperBody.head.horns > 0 &&
            (player.upperBody.head.hornType == HornType.DRACONIC_X2 ||
                player.upperBody.head.hornType == HornType.DRACONIC_X4_12_INCH_LONG))
            lizardCounter++;
        if (player.skinType == 2)
            lizardCounter++;
        return lizardCounter;
    }

    public static spiderScore(player: Player): number {
        let score: number = 0;
        if (player.upperBody.head.face.eyeType == EyeType.FOUR_SPIDER_EYES)
            score += 2;
        if (player.upperBody.head.face.faceType == FaceType.SPIDER_FANGS)
            score++;
        if (player.upperBody.armType == ArmType.SPIDER)
            score++;
        if (player.lowerBody.type == LowerBodyType.CHITINOUS_SPIDER_LEGS || player.lowerBody.type == LowerBodyType.DRIDER_LOWER_BODY)
            score += 2;
        else if (score > 0)
            score--;
        if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN)
            score += 2;
        if (player.skinType != SkinType.PLAIN && score > 0)
            score--;
        return score;
    }

    //Determine Horse Rating
    public static horseScore(player: Player): number {
        let horseCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.HORSE)
            horseCounter++;
        if (player.upperBody.head.earType == EarType.HORSE)
            horseCounter++;
        if (player.lowerBody.tailType == TailType.HORSE)
            horseCounter++;
        if (player.lowerBody.cockSpot.hasCockType(CockType.HORSE))
            horseCounter++;
        if (player.lowerBody.type == LowerBodyType.HOOFED || player.lowerBody.type == LowerBodyType.CENTAUR)
            horseCounter++;
        //Fur only counts if some equine features are present
        if (player.skinType == SkinType.FUR && horseCounter > 0)
            horseCounter++;
        return horseCounter;
    }

    //Determine kitsune Rating
    public static kitsuneScore(player: Player): number {
        let kitsuneCounter: number = 0;
        if (player.upperBody.head.earType == EarType.FOX)
            kitsuneCounter++;
        if (player.lowerBody.tailType == TailType.FOX)
            kitsuneCounter++;
        if (player.lowerBody.tailType == TailType.FOX && player.lowerBody.tailVenom >= 2)
            kitsuneCounter += 2;
        if (player.lowerBody.vaginaSpot.list[0].capacity() >= 8000)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && player.upperBody.head.face.faceType == FaceType.HUMAN)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && (player.upperBody.head.hairColor == "golden blonde" ||
            player.upperBody.head.hairColor == "black" ||
            player.upperBody.head.hairColor == "red" ||
            player.upperBody.head.hairColor == "white" ||
            player.upperBody.head.hairColor == "silver blonde"))
            kitsuneCounter++;
        if (kitsuneCounter > 0 && player.femininity >= 40)
            kitsuneCounter++;
        if (player.skinType != SkinType.PLAIN)
            kitsuneCounter -= 2;
        if (player.skinType == SkinType.FUR)
            kitsuneCounter--;
        if (player.lowerBody.type != LowerBodyType.HUMAN)
            kitsuneCounter--;
        if (player.upperBody.head.face.faceType != FaceType.HUMAN)
            kitsuneCounter--;
        if (player.upperBody.head.earType != EarType.FOX)
            kitsuneCounter--;
        if (player.lowerBody.tailType != TailType.FOX)
            kitsuneCounter--;

        return kitsuneCounter;
    }

    //Determine Horse Rating
    public static dragonScore(player: Player): number {
        let dragonCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.DRAGON)
            dragonCounter++;
        if (player.upperBody.head.earType == EarType.DRAGON)
            dragonCounter++;
        if (player.lowerBody.tailType == TailType.DRACONIC)
            dragonCounter++;
        if (player.upperBody.head.face.tongueType == TongueType.DRACONIC)
            dragonCounter++;
        if (player.lowerBody.cockSpot.hasCockType(CockType.DRAGON))
            dragonCounter++;
        if (player.upperBody.wingType == WingType.DRACONIC_SMALL)
            dragonCounter++;
        if (player.upperBody.wingType == WingType.DRACONIC_LARGE)
            dragonCounter += 2;
        if (player.lowerBody.type == LowerBodyType.DRAGON)
            dragonCounter++;
        if (player.skinType == SkinType.SCALES && dragonCounter > 0)
            dragonCounter++;
        if (player.upperBody.head.hornType == HornType.DRACONIC_X4_12_INCH_LONG || player.upperBody.head.hornType == HornType.DRACONIC_X2)
            dragonCounter++;
        return dragonCounter;
    }

    //Goblinscore
    public static goblinScore(player: Player): number {
        let goblinCounter: number = 0;
        if (player.upperBody.head.earType == EarType.ELFIN)
            goblinCounter++;
        if (player.skinTone == "pale yellow" || player.skinTone == "grayish-blue" || player.skinTone == "green" || player.skinTone == "dark green")
            goblinCounter++;
        if (goblinCounter > 0) {
            if (player.upperBody.head.face.faceType == FaceType.HUMAN)
                goblinCounter++;
            if (player.tallness < 48)
                goblinCounter++;
            if (player.lowerBody.vaginaSpot.hasVagina())
                goblinCounter++;
            if (player.lowerBody.type == 0)
                goblinCounter++;
        }
        return goblinCounter;
    }

    //Gooscore
    public static gooScore(player: Player): number {
        let gooCounter: number = 0;
        if (player.upperBody.head.hairType == HairType.GOO)
            gooCounter++;
        if (player.skinAdj == "slimy")
            gooCounter++;
        if (player.lowerBody.type == LowerBodyType.GOO)
            gooCounter++;
        if (player.lowerBody.vaginaSpot.list[0].capacity() > 9000)
            gooCounter++;
        if (player.statusAffects.has("SlimeCraving"))
            gooCounter++;
        return gooCounter;
    }

    //Nagascore
    public static nagaScore(player: Player): number {
        let nagaCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.SNAKE_FANGS)
            nagaCounter++;
        if (player.upperBody.head.face.tongueType == TongueType.SNAKE)
            nagaCounter++;
        if (nagaCounter > 0 && player.upperBody.head.antennae == AntennaeType.NONE)
            nagaCounter++;
        if (nagaCounter > 0 && player.upperBody.wingType == WingType.NONE)
            nagaCounter++;
        return nagaCounter;
    }

    //Bunnyscore
    public static bunnyScore(player: Player): number {
        let bunnyCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.BUNNY)
            bunnyCounter++;
        if (player.lowerBody.tailType == TailType.BUNNY)
            bunnyCounter++;
        if (player.upperBody.head.earType == EarType.BUNNY)
            bunnyCounter++;
        if (player.lowerBody.type == LowerBodyType.BUNNY)
            bunnyCounter++;
        //More than 2 balls reduces bunny score
        if (player.lowerBody.balls > 2 && bunnyCounter > 0)
            bunnyCounter--;
        //Human skin on bunmorph adds
        if (player.skinType == SkinType.PLAIN && bunnyCounter > 1)
            bunnyCounter++;
        //No wings and player.upperBody.head.antennae a plus
        if (bunnyCounter > 0 && player.upperBody.head.antennae == AntennaeType.NONE)
            bunnyCounter++;
        if (bunnyCounter > 0 && player.upperBody.wingType == WingType.NONE)
            bunnyCounter++;
        return bunnyCounter;
    }

    //Harpyscore
    public static harpyScore(player: Player): number {
        let harpy: number = 0;
        if (player.upperBody.armType == ArmType.HARPY)
            harpy++;
        if (player.upperBody.head.hairType == HairType.FEATHER)
            harpy++;
        if (player.upperBody.wingType == WingType.HARPY)
            harpy++;
        if (player.lowerBody.tailType == TailType.HARPY)
            harpy++;
        if (player.lowerBody.type == LowerBodyType.HARPY)
            harpy++;
        if (harpy >= 2 && player.upperBody.head.face.faceType == FaceType.HUMAN)
            harpy++;
        if (harpy >= 2 && (player.upperBody.head.earType == EarType.HUMAN || player.upperBody.head.earType == EarType.ELFIN))
            harpy++;
        return harpy;
    }

    //Kangascore
    public static kangaScore(player: Player): number {
        let kanga: number = 0;
        if (player.lowerBody.cockSpot.hasCockType(CockType.KANGAROO))
            kanga++;
        if (player.upperBody.head.earType == EarType.KANGAROO)
            kanga++;
        if (player.lowerBody.tailType == TailType.KANGAROO)
            kanga++;
        if (player.lowerBody.type == LowerBodyType.KANGAROO)
            kanga++;
        if (player.upperBody.head.face.faceType == FaceType.KANGAROO)
            kanga++;
        if (kanga >= 2 && player.skinType == SkinType.FUR)
            kanga++;
        return kanga;
    }

    //sharkscore
    public static sharkScore(player: Player): number {
        let sharkCounter: number = 0;
        if (player.upperBody.head.face.faceType == FaceType.SHARK_TEETH)
            sharkCounter++;
        if (player.upperBody.wingType == WingType.SHARK_FIN)
            sharkCounter++;
        if (player.lowerBody.tailType == TailType.SHARK)
            sharkCounter++;
        return sharkCounter;
    }

    //Determine Mutant Rating
    public static mutantScore(player: Player): number {
        let mutantCounter: number = 0;
        if (player.upperBody.head.face.faceType > 0)
            mutantCounter++;
        if (player.skinType != SkinType.PLAIN)
            mutantCounter++;
        if (player.lowerBody.tailType != TailType.NONE)
            mutantCounter++;
        if (player.lowerBody.cockSpot.count() > 1)
            mutantCounter++;
        if (player.lowerBody.cockSpot.hasCock() && player.lowerBody.vaginaSpot.hasVagina())
            mutantCounter++;
        if (player.upperBody.chest.hasFuckableNipples())
            mutantCounter++;
        if (player.upperBody.chest.count() > 1)
            mutantCounter++;
        /*if (player.upperBody.head.face.faceType == FaceType.HORSE) {
            if (player.skinType == SkinType.FUR)
                mutantCounter--;
            if (player.lowerBody.tailType == TailType.HORSE)
                mutantCounter--;
        }
        if (player.upperBody.head.face.faceType == 2) {
            if (player.skinType == SkinType.FUR)
                mutantCounter--;
            if (player.lowerBody.tailType == 2)
                mutantCounter--;
        }*/
        return mutantCounter--;
    }

}