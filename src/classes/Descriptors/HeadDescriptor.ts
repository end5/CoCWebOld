import { HairType } from '../Body/Hair';
import { SkinType } from '../Body/Skin';
import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default class HeadDescriptor {
    public static hairOrFur(character: Character): string {
        if (character.skin.type === SkinType.FUR)
            return "fur";
        else
            return "hair";
    }

    public static describeHair(character: Character): string {
        let description: string = "";
        const head = character.torso.neck.head;

        if (head.hair.length === 0) {
            return Utils.randomChoice("shaved",
                "bald",
                "smooth",
                "hairless",
                "glabrous") + " head";
        }
        else if (head.hair.length < 1) {
            description += Utils.randomChoice(
                "close-cropped, ",
                "trim, ",
                "very short, ");
        }
        else if (head.hair.length >= 1 && head.hair.length < 3)
            description += "short, ";
        else if (head.hair.length >= 3 && head.hair.length < 6)
            description += "shaggy, ";
        else if (head.hair.length >= 6 && head.hair.length < 10)
            description += "moderately long, ";
        else if (head.hair.length >= 10 && head.hair.length < 16) {
            if (Utils.chance(50))
                description += "long, ";
            else
                description += "shoulder-length, ";
        }
        else if (head.hair.length >= 16 && head.hair.length < 26) {
            if (Utils.chance(50))
                description += "very long, ";
            else
                description += "flowing locks of ";
        }
        else if (head.hair.length >= 26 && head.hair.length < 40)
            description += "ass-length, ";
        else if (head.hair.length >= 40 && head.hair.length < character.tallness)
            description += "obscenely long, ";
        else if (head.hair.length >= character.tallness) {
            if (Utils.chance(50))
                description += "floor-length, ";
            else
                description += "floor-dragging, ";
        }

        description += head.hair.color + " ";

        switch (head.hair.type) {
            case HairType.FEATHER:
                description += "feather-";
                break;
            case HairType.GHOST:
                description += "transparent ";
                break;
            case HairType.GOO:
                description += "goo-";
                break;
            case HairType.ANEMONE:
                description += "tentacle-";
                break;
        }

        // if medium length refer to as locks sometimes
        // CUT - locks is plural and screws up tense.
        /*if(head.hair.length >= 3 && head.hair.length < 16 && Utils.rand(2) == 0) {
			descript += "locks of hair";
			return descript;
			}*/

        // If furry and longish hair sometimes call it a mane (50%)
        if (character.skin.type === SkinType.FUR && head.hair.length > 3 && Utils.chance(50))
            description += "mane";
        else
            description += "hair";

        return description;
    }
}
