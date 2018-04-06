import { percentChance, randomChoice } from '../../Engine/Utilities/SMath';
import Character from '../Character/Character';

export function describeHips(character: Character): string {
    let description: string = "";
    const options: string[] = [];
    if (character.torso.hips.rating <= 1) {
        description = randomChoice(
            "tiny ",
            "narrow ",
            "boyish ");
    }
    else if (character.torso.hips.rating > 1 && character.torso.hips.rating < 4) {
        description = randomChoice(
            "slender ",
            "narrow ",
            "thin ");
        if (character.thickness < 30) {
            if (percentChance(50))
                description = "slightly-flared ";
            else
                description = "curved ";
        }
    }
    else if (character.torso.hips.rating >= 4 && character.torso.hips.rating < 6) {
        description = randomChoice(
            "well-formed ",
            "pleasant ");
        if (character.thickness < 30) {
            if (percentChance(50))
                description = "flared ";
            else
                description = "curvy ";
        }
    }
    else if (character.torso.hips.rating >= 6 && character.torso.hips.rating < 10) {
        description = randomChoice(
            "ample ",
            "noticeable ",
            "girly ");
        if (character.thickness < 30) {
            if (percentChance(50))
                description = "flared ";
            else
                description = "waspish ";
        }
    }
    else if (character.torso.hips.rating >= 10 && character.torso.hips.rating < 15) {
        description = randomChoice(
            "flared ",
            "curvy ",
            "wide ");
        if (character.thickness < 30) {
            if (percentChance(50))
                description = "flared ";
            else
                description = "waspish ";
        }
    }
    else if (character.torso.hips.rating >= 15 && character.torso.hips.rating < 20) {
        if (character.thickness < 40) {
            if (percentChance(50))
                description = "flared, ";
            else
                description = "waspish, ";
        }
        description += randomChoice(
            "fertile ",
            "child-bearing ",
            "voluptuous ");
    }
    else if (character.torso.hips.rating >= 20) {
        if (character.thickness < 40) {
            if (percentChance(50))
                description = "flaring, ";
            else
                description = "incredibly waspish, ";
        }
        description += randomChoice(
            "broodmother-sized ",
            "cow-like ",
            "inhumanly-wide ");
    }
    // Taurs
    if (character.torso.hips.legs.isTaur() && percentChance(33))
        description += "flanks";
    // Nagas have sides, right?
    else if (character.torso.hips.legs.isNaga() && percentChance(33))
        description += "sides";
    // Non taurs or taurs who didn't roll flanks
    else {
        description += randomChoice(
            "hips",
            "thighs");
    }

    return description;
}
