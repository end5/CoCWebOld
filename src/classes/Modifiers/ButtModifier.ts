export default class ButtModifier {

    public buttChange(cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
        let stretched: boolean = buttChangeNoDisplay(cArea);
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (stretched && display) {
            if (spacingsF) MainScreen.text("  ");
            buttChangeDisplay();
            if (spacingsB) MainScreen.text("  ");
        }
        return stretched;
    }
    public stretchButt(buttArea: number): boolean {
        let stretched: boolean = false;
        //cArea > capacity = autostreeeeetch half the time.
        if (buttArea >= this.analCapacity() && Utils.chance(50)) {
            if (this.lowerBody.butt.analLooseness < ButtLooseness.GAPING)
                this.lowerBody.butt.analLooseness++;
            stretched = true;
            //Reset butt stretchin recovery time
            if (this.statusAffects.has("ButtStretched"))
                this.statusAffects.get("ButtStretched").value1 = 0;
        }
        //If within top 10% of capacity, 25% stretch
        if (buttArea < this.analCapacity() && buttArea >= .9 * this.analCapacity() && Utils.chance(25)) {
            this.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //if within 75th to 90th percentile, 10% stretch
        if (buttArea < .9 * this.analCapacity() && buttArea >= .75 * this.analCapacity() && Utils.chance(10)) {
            this.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //Anti-virgin
        if (this.lowerBody.butt.analLooseness == ButtLooseness.VIRGIN) {
            this.lowerBody.butt.analLooseness++;
            stretched = true;
        }
        //Delay un-stretching
        if (buttArea >= .5 * this.analCapacity()) {
            //Butt Stretched used to determine how long since last enlargement
            if (!this.statusAffects.has("ButtStretched"))
                this.statusAffects.add(new StatusAffect("ButtStretched", 0, 0, 0, 0));
            //Reset the timer on it to 0 when restretched.
            else
                this.statusAffects.get("ButtStretched").value1 = 0;
        }
        if (stretched) {
            console.trace("BUTT STRETCHED TO " + (this.lowerBody.butt.analLooseness) + ".");
        }
        return stretched;
    }



}