export default class VaginaChangeModifier {
    public cuntChange(cArea: number, display: boolean, spacingsF: boolean = false, spacingsB: boolean = true): boolean {
        if (!this.lowerBody.vaginaSpot.hasVagina())
            return false;
        let wasVirgin: boolean = this.lowerBody.vaginaSpot.list[0].virgin;
        let stretched: boolean = cuntChangeNoDisplay(cArea);
        let devirgined: boolean = wasVirgin && !this.lowerBody.vaginaSpot.list[0].virgin;
        if (devirgined) {
            if (spacingsF) MainScreen.text("  ");
            MainScreen.text("<b>Your hymen is torn, robbing you of your virginity.</b>", false);
            if (spacingsB) MainScreen.text("  ");
        }
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (display && stretched) {
            //Virgins get different formatting
            if (devirgined) {
                //If no spaces after virgin loss
                if (!spacingsB) MainScreen.text("  ");
            }
            //Non virgins as usual
            else if (spacingsF) MainScreen.text("  ");
            if (this.lowerBody.vaginaSpot.list[0].vaginalLooseness == VaginaLooseness.LEVEL_CLOWN_CAR) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
            if (this.lowerBody.vaginaSpot.list[0].vaginalLooseness == VaginaLooseness.GAPING_WIDE) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched so wide that it gapes continually.</b>");
            if (this.lowerBody.vaginaSpot.list[0].vaginalLooseness == VaginaLooseness.GAPING) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
            if (this.lowerBody.vaginaSpot.list[0].vaginalLooseness == VaginaLooseness.LOOSE) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now very loose.</b>", false);
            if (this.lowerBody.vaginaSpot.list[0].vaginalLooseness == VaginaLooseness.NORMAL) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now a little loose.</b>", false);
            if (this.lowerBody.vaginaSpot.list[0].vaginalLooseness == VaginaLooseness.TIGHT) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched out to a more normal size.</b>");
            if (spacingsB) MainScreen.text("  ");
        }
        return stretched;
    }

}