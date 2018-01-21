import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default class HipDescriptor {
    public static describeHips(character: Character): string {
        let description: string = "";
        const options: string[] = [];
        if (character.torso.hips.rating <= 1) {
            description = Utils.randomChoice(
                "tiny ",
                "narrow ",
                "boyish ");
        }
        else if (character.torso.hips.rating > 1 && character.torso.hips.rating < 4) {
            description = Utils.randomChoice(
                "slender ",
                "narrow ",
                "thin ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "slightly-flared ";
                else
                    description = "curved ";
            }
        }
        else if (character.torso.hips.rating >= 4 && character.torso.hips.rating < 6) {
            description = Utils.randomChoice(
                "well-formed ",
                "pleasant ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "curvy ";
            }
        }
        else if (character.torso.hips.rating >= 6 && character.torso.hips.rating < 10) {
            description = Utils.randomChoice(
                "ample ",
                "noticeable ",
                "girly ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (character.torso.hips.rating >= 10 && character.torso.hips.rating < 15) {
            description = Utils.randomChoice(
                "flared ",
                "curvy ",
                "wide ");
            if (character.thickness < 30) {
                if (Utils.chance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (character.torso.hips.rating >= 15 && character.torso.hips.rating < 20) {
            if (character.thickness < 40) {
                if (Utils.chance(50))
                    description = "flared, ";
                else
                    description = "waspish, ";
            }
            description += Utils.randomChoice(
                "fertile ",
                "child-bearing ",
                "voluptuous ");
        }
        else if (character.torso.hips.rating >= 20) {
            if (character.thickness < 40) {
                if (Utils.chance(50))
                    description = "flaring, ";
                else
                    description = "incredibly waspish, ";
            }
            description += Utils.randomChoice(
                "broodmother-sized ",
                "cow-like ",
                "inhumanly-wide ");
        }
        // Taurs
        if (character.torso.hips.legs.isTaur() && Utils.chance(33))
            description += "flanks";
        // Nagas have sides, right?
        else if (character.torso.hips.legs.isNaga() && Utils.chance(33))
            description += "sides";
        // Non taurs or taurs who didn't roll flanks
        else {
            description += Utils.randomChoice(
                "hips",
                "thighs");
        }

        return description;
    }
}
