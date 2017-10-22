export default class VaginaChangeModifier {
    public cuntChange(cArea: number, display: boolean, spacingsF: boolean = false, spacingsB: boolean = true): boolean {
        if (!this.lowerBody.vaginaSpot.hasVagina())
            return false;
        let wasVirgin: boolean = this.lowerBody.vaginaSpot.get(0).virgin;
        let stretched: boolean = cuntChangeNoDisplay(cArea);
        let devirgined: boolean = wasVirgin && !this.lowerBody.vaginaSpot.get(0).virgin;
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
            if (this.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.LEVEL_CLOWN_CAR) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
            if (this.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.GAPING_WIDE) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched so wide that it gapes continually.</b>");
            if (this.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.GAPING) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
            if (this.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.LOOSE) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now very loose.</b>", false);
            if (this.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.NORMAL) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now a little loose.</b>", false);
            if (this.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.TIGHT) MainScreen.text("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched out to a more normal size.</b>");
            if (spacingsB) MainScreen.text("  ");
        }
        return stretched;
    }
    public stretchVagina(vaginaArea: number): boolean {
        if (!this.lowerBody.vaginaSpot.hasVagina)
            return false;
        let stretched: boolean = false;
        let loosestVagina = this.lowerBody.vaginaSpot.LoosenessMost[0];
        if (this.perks.has("FerasBoonMilkingTwat") || loosestVagina.vaginalLooseness <= VaginaLooseness.NORMAL) {
            //cArea > capacity = autostreeeeetch.
            if (vaginaArea >= this.vaginalCapacity()) {
                if (loosestVagina.vaginalLooseness >= VaginaLooseness.LEVEL_CLOWN_CAR)
                    loosestVagina.vaginalLooseness++;
                stretched = true;
            }
            //If within top 10% of capacity, 50% stretch
            else if (vaginaArea >= .9 * this.vaginalCapacity() && Utils.chance(50)) {
                loosestVagina.vaginalLooseness++;
                stretched = true;
            }
            //if within 75th to 90th percentile, 25% stretch
            else if (vaginaArea >= .75 * this.vaginalCapacity() && Utils.chance(25)) {
                loosestVagina.vaginalLooseness++;
                stretched = true;
            }
        }
        //If virgin
        if (this.lowerBody.vaginaSpot.Virgin.length > 0) {
            this.lowerBody.vaginaSpot.Virgin[0].virgin = false;
        }
        //Delay anti-stretching
        if (vaginaArea >= .5 * this.vaginalCapacity()) {
            //Cunt Stretched used to determine how long since last enlargement
            if (!this.statusAffects.has("CuntStretched"))
                this.statusAffects.add(new StatusAffect("CuntStretched", 0, 0, 0, 0));
            //Reset the timer on it to 0 when restretched.
            else
                this.statusAffects.get("CuntStretched").value1 = 0;
        }
        return stretched;
    }

}