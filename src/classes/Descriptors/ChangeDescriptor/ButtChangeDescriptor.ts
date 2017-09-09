export default class ButtChangeDescriptor {

    public buttChangeDisplay(): void {	//Allows the test for stretching and the text output to be separated
        if (this.lowerBody.butt.analLooseness == 5) outputText("<b>Your " + Appearance.assholeDescript(this) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
        if (this.lowerBody.butt.analLooseness == 4) outputText("<b>Your " + Appearance.assholeDescript(this) + " becomes so stretched that it gapes continually.</b>", false);
        if (this.lowerBody.butt.analLooseness == 3) outputText("<b>Your " + Appearance.assholeDescript(this) + " is now very loose.</b>");
        if (this.lowerBody.butt.analLooseness == 2) outputText("<b>Your " + Appearance.assholeDescript(this) + " is now a little loose.</b>");
        if (this.lowerBody.butt.analLooseness == 1) outputText("<b>You have lost your anal virginity.</b>", false);
    }

}