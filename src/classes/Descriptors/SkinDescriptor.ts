import Creature, { SkinType } from '../Body/Creature';

export default class SkinDescriptor {
    public static skinFurScales(body: Creature): string {
        let skinzilla: string = "";
        //Adjectives first!
        if (body.skinAdj != "")
            skinzilla += body.skinAdj + ", ";
        //Fur handled a little differently since it uses
        //haircolor
        skinzilla += body.skinType == SkinType.FUR ? body.upperBody.head.hairColor + " " : body.skinTone + " ";
        skinzilla += body.skinDesc;
        return skinzilla;
    }

    public static skin(body: Creature, noAdj: boolean = false, noTone: boolean = false): string {
		let skinzilla: string = "";
		//Only show stuff other than skinDesc if justSkin is false
		if (!noAdj) {
			//Adjectives first!
			if (body.skinAdj != "" && !noTone && body.skinTone != "rough gray") {
				skinzilla += body.skinAdj;
				if (noTone)
					skinzilla += " ";
				else
					skinzilla += ", ";
			}
		}
		if (!noTone)
			skinzilla += body.skinTone + " ";
		//Fur handled a little differently since it uses
		//haircolor
		if (body.skinType == 1)
			skinzilla += "skin";
		else
			skinzilla += body.skinDesc;
		return skinzilla;
	}
}