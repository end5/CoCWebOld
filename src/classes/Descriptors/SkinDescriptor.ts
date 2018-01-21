import { SkinType } from '../Body/Skin';
import Character from '../Character/Character';

export default class SkinDescriptor {
    public static skinFurScales(body: Character): string {
        let skinzilla: string = "";
        // Adjectives first!
        if (body.skin.adj !== "")
            skinzilla += body.skin.adj + ", ";
        // Fur handled a little differently since it uses
        // haircolor
        skinzilla += body.skin.type === SkinType.FUR ? body.torso.neck.head.hair.color + " " : body.skin.tone + " ";
        skinzilla += body.skin.desc;
        return skinzilla;
    }

    public static skin(body: Character, noAdj: boolean = false, noTone: boolean = false): string {
        let skinzilla: string = "";
        // Only show stuff other than skin.desc if justSkin is false
        if (!noAdj) {
            // Adjectives first!
            if (body.skin.adj !== "" && !noTone && body.skin.tone !== "rough gray") {
                skinzilla += body.skin.adj;
                if (noTone)
                    skinzilla += " ";
                else
                    skinzilla += ", ";
            }
        }
        if (!noTone)
            skinzilla += body.skin.tone + " ";
        // Fur handled a little differently since it uses
        // haircolor
        if (body.skin.type === 1)
            skinzilla += "skin";
        else
            skinzilla += body.skin.desc;
        return skinzilla;
    }
}
