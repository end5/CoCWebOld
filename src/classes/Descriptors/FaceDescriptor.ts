import { FaceType } from '../Body/Face';
import { TongueType } from '../Body/Tongue';
import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default class FaceDescriptor {
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

    public static describeFace(body: Character): string {
        let stringo: string = "";
        const face = body.torso.neck.head.face;
        const faceType = face.type;
        if (faceType === FaceType.HUMAN)
            return "face";
        if (face.hasMuzzle()) {
            if (Utils.rand(2) === 0)
                return "muzzle";
            if (Utils.rand(3) === 0 && faceType === FaceType.HORSE)
                stringo = "long ";
            if (Utils.rand(3) === 0 && faceType === FaceType.CAT)
                stringo = "feline ";
            return stringo + "face";
        }
        if (faceType === FaceType.COW_MINOTAUR) {
            if (Utils.rand(4) === 0)
                stringo = "bovine ";
            if (Utils.rand(2) === 0)
                return "muzzle";
            return stringo + "face";
        }
        if (faceType === FaceType.SHARK_TEETH) {
            if (Utils.rand(4) === 0)
                stringo = "angular ";
            return stringo + "face";
        }
        if (faceType === FaceType.LIZARD || faceType === FaceType.DRAGON) {
            if (Utils.rand(4) === 0)
                stringo = "reptilian ";
            if (Utils.rand(4) === 0)
                return stringo + "muzzle";
            if (Utils.rand(4) === 0)
                return stringo + "snout";
            return stringo + "face";
        }
        return "face";
    }

    /**
     * prev faceDesc from Character
     * @param character
     */
    public static describeFaceOther(character: Character): string {
        let description: string = "";
        if (character.femininity < 10) {
            description = "a square chin";
            // beard doesn't exist
            //
            // if (!body.hasBeard())
            description += " and chiseled jawline";
            // else
            //    description += ", chiseled jawline, and " + body.beard();
        }
        else if (character.femininity < 20) {
            description = "a rugged looking " + FaceDescriptor.describeFace(character) + " ";
            // beard doesn't exist
            //
            // if (body.hasBeard())
            //    description += "and " + body.beard();
            description += "that's surely handsome";
        }
        else if (character.femininity < 28)
            description = "a well-defined jawline and a fairly masculine profile";
        else if (character.femininity < 35)
            description = "a somewhat masculine, angular jawline";
        else if (character.femininity < 45)
            description = "the barest hint of masculinity on its features";
        else if (character.femininity <= 55)
            description = "an androgynous set of features that would look normal on a male or female";
        else if (character.femininity <= 65)
            description = "a tiny touch of character.femininity to it, with gentle curves";
        else if (character.femininity <= 72)
            description = "a nice set of cheekbones and lips that have the barest hint of pout";
        else if (character.femininity <= 80)
            description = "a beautiful, feminine shapeliness that's sure to draw the attention of males";
        else if (character.femininity <= 90)
            description = "a gorgeous profile with full lips, a button nose, and noticeable eyelashes";
        else
            description = "a jaw-droppingly feminine shape with full, pouting lips, an adorable nose, and long, beautiful eyelashes";
        return description;
    }

    public static describeBeard(character: Character): string {
        if (character.torso.neck.head.face.hasBeard())
            return "beard";
        else {
            // CoC_Settings.error("");
            return "ERROR: NO BEARD! <b>YOU ARE NOT A VIKING AND SHOULD TELL FEN IMMEDIATELY.</b>";
        }
    }
}
