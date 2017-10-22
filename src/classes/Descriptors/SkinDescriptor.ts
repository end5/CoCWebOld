export default class SkinDescriptor {
    public static skinFurScales(): string {
        let skinzilla: string = "";
        //Adjectives first!
        if (this.skinAdj != "")
            skinzilla += this.skinAdj + ", ";
        //Fur handled a little differently since it uses
        //haircolor
        skinzilla += this.skinType == SkinType.FUR ? this.upperBody.head.hairColor + " " : this.skinTone + " ";
        skinzilla += this.skinDesc;
        return skinzilla;
    }

    public skin(noAdj: boolean = false, noTone: boolean = false): string {
		let skinzilla: string = "";
		//Only show stuff other than skinDesc if justSkin is false
		if (!noAdj) {
			//Adjectives first!
			if (this.skinAdj != "" && !noTone && this.skinTone != "rough gray") {
				skinzilla += this.skinAdj;
				if (noTone)
					skinzilla += " ";
				else
					skinzilla += ", ";
			}
		}
		if (!noTone)
			skinzilla += this.skinTone + " ";
		//Fur handled a little differently since it uses
		//haircolor
		if (this.skinType == 1)
			skinzilla += "skin";
		else
			skinzilla += this.skinDesc;
		return skinzilla;
	}


}