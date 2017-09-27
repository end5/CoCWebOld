import CreatureBody, { SkinType } from "../Body/Body";
import Utils from "../Utilities/Utils";
import Head, { HairType } from "../Body/Head";
import Face, { TongueType, FaceType } from "../Body/Face";

export default class HeadDescriptor {
    public static hairOrFur(body: CreatureBody): string {
        if (body.skinType == SkinType.FUR)
            return "fur";
        else
            return "hair";
    }

    public static describeHair(body: CreatureBody): string {
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

	/**
		* Describe tongue. Monsters don't have tongues, apparently.
		* @param    character Either Player or NonPlayer
		* @return    A beautiful description of a tongue.
		*/
    public static describeTongue(tongueType: TongueType): string {
        switch (tongueType) {
            case TongueType.SNAKE:
                return "serpentine tongue";
            case TongueType.DEMONIC:
                return "demonic tongue";
            case TongueType.DRACONIC:
                return "draconic tongue";
            default:
                return "tongue";
        }
    }

    public static describeFace(body: CreatureBody): string {
        let stringo: string = "";
        let face = body.upperBody.head.face;
        let faceType = body.upperBody.head.face.faceType;
        if (faceType == FaceType.HUMAN)
            return "face";
        if (face.hasMuzzle()) {
            if (Utils.rand(2) == 0)
                return "muzzle";
            if (Utils.rand(3) == 0 && faceType == FaceType.HORSE)
                stringo = "long ";
            if (Utils.rand(3) == 0 && faceType == FaceType.CAT)
                stringo = "feline ";
            return stringo + "face";
        }
        if (faceType == FaceType.COW_MINOTAUR) {
            if (Utils.rand(4) == 0)
                stringo = "bovine ";
            if (Utils.rand(2) == 0)
                return "muzzle";
            return stringo + "face";
        }
        if (faceType == FaceType.SHARK_TEETH) {
            if (Utils.rand(4) == 0)
                stringo = "angular ";
            return stringo + "face";
        }
        if (faceType == FaceType.LIZARD || face.faceType == FaceType.DRAGON) {
            if (Utils.rand(4) == 0)
                stringo = "reptilian ";
            if (Utils.rand(4) == 0)
                return stringo + "muzzle";
            if (Utils.rand(4) == 0)
                return stringo + "snout";
            return stringo + "face";
        }
        return "face";
    }

    /**
     * prev faceDesc from Character
     * @param body
     */
    public static describeFaceOther(body: CreatureBody): string {
        let description: string = "";
        if (body.femininity < 10) {
            description = "a square chin";
            // beard doesn't exist
            //
            //if (!body.hasBeard())
            description += " and chiseled jawline";
            //else
            //    description += ", chiseled jawline, and " + body.beard();
        }
        else if (body.femininity < 20) {
            description = "a rugged looking " + HeadDescriptor.describeFace(body) + " ";
            // beard doesn't exist
            //
            //if (body.hasBeard())
            //    description += "and " + body.beard();
            description += "that's surely handsome";
        }
        else if (body.femininity < 28)
            description = "a well-defined jawline and a fairly masculine profile";
        else if (body.femininity < 35)
            description = "a somewhat masculine, angular jawline";
        else if (body.femininity < 45)
            description = "the barest hint of masculinity on its features";
        else if (body.femininity <= 55)
            description = "an androgynous set of features that would look normal on a male or female";
        else if (body.femininity <= 65)
            description = "a tiny touch of character.femininity to it, with gentle curves";
        else if (body.femininity <= 72)
            description = "a nice set of cheekbones and lips that have the barest hint of pout";
        else if (body.femininity <= 80)
            description = "a beautiful, feminine shapeliness that's sure to draw the attention of males";
        else if (body.femininity <= 90)
            description = "a gorgeous profile with full lips, a button nose, and noticeable eyelashes";
        else
            description = "a jaw-droppingly feminine shape with full, pouting lips, an adorable nose, and long, beautiful eyelashes";
        return description;
    }

}