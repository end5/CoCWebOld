import Creature, { SkinType } from '../Body/Creature';
import Head, { HairType } from '../Body/Head';
import Utils from '../Utilities/Utils';

export default class HeadDescriptor {
    public static hairOrFur(body: Creature): string {
        if (body.skinType == SkinType.FUR)
            return "fur";
        else
            return "hair";
    }

    public static describeHair(body: Creature): string {
        let description: string = "";
        let head = body.upperBody.head;

        if (head.hairLength == 0) {
            return Utils.randomChoice("shaved",
                "bald",
                "smooth",
                "hairless",
                "glabrous") + " head";
        }
        else if (head.hairLength < 1) {
            description += Utils.randomChoice(
                "close-cropped, ",
                "trim, ",
                "very short, ");
        }
        else if (head.hairLength >= 1 && head.hairLength < 3)
            description += "short, ";
        else if (head.hairLength >= 3 && head.hairLength < 6)
            description += "shaggy, ";
        else if (head.hairLength >= 6 && head.hairLength < 10)
            description += "moderately long, ";
        else if (head.hairLength >= 10 && head.hairLength < 16) {
            if (Utils.chance(50))
                description += "long, ";
            else
                description += "shoulder-length, ";
        }
        else if (head.hairLength >= 16 && head.hairLength < 26) {
            if (Utils.chance(50))
                description += "very long, ";
            else
                description += "flowing locks of ";
        }
        else if (head.hairLength >= 26 && head.hairLength < 40)
            description += "ass-length, ";
        else if (head.hairLength >= 40 && head.hairLength < body.tallness)
            description += "obscenely long, ";
        else if (head.hairLength >= body.tallness) {
            if (Utils.chance(50))
                description += "floor-length, ";
            else
                description += "floor-dragging, ";
        }

        description += head.hairColor + " ";

        switch (head.hairType) {
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

        //if medium length refer to as locks sometimes
        //CUT - locks is plural and screws up tense.
		/*if(head.hairLength >= 3 && head.hairLength < 16 && Utils.rand(2) == 0) {
			descript += "locks of hair";
			return descript;
			}*/

        //If furry and longish hair sometimes call it a mane (50%)
        if (body.skinType == SkinType.FUR && head.hairLength > 3 && Utils.chance(50))
            description += "mane";
        else
            description += "hair";

        return description;
    }

}