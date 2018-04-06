import { SkinType } from '../Body/Skin';
import Character from '../Character/Character';

export function skinFurScales(character: Character): string {
    let skinzilla: string = "";
    // Adjectives first!
    if (character.skin.adj !== "")
        skinzilla += character.skin.adj + ", ";
    // Fur handled a little differently since it uses
    // haircolor
    skinzilla += character.skin.type === SkinType.FUR ? character.torso.neck.head.hair.color + " " : character.skin.tone + " ";
    skinzilla += character.skin.desc;
    return skinzilla;
}

export function skin(character: Character, noAdj: boolean = false, noTone: boolean = false): string {
    let skinzilla: string = "";
    // Only show stuff other than skin.desc if justSkin is false
    if (!noAdj) {
        // Adjectives first!
        if (character.skin.adj !== "" && !noTone && character.skin.tone !== "rough gray") {
            skinzilla += character.skin.adj;
            if (noTone)
                skinzilla += " ";
            else
                skinzilla += ", ";
        }
    }
    if (!noTone)
        skinzilla += character.skin.tone + " ";
    // Fur handled a little differently since it uses
    // haircolor
    if (character.skin.type === 1)
        skinzilla += "skin";
    else
        skinzilla += character.skin.desc;
    return skinzilla;
}
