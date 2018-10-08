import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { CView } from "../../../../Engine/Display/ContentView";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class SatyrPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        // Stage 1:
        if (womb.pregnancy.incubation === 150) {
            CView.text("\n<b>You find that you're feeling quite sluggish these days; you just don't have as much energy as you used to.  You're also putting on weight.</b>\n");
        }
        // Stage 2:
        if (womb.pregnancy.incubation === 125) {
            CView.text("\n<b>Your belly is getting bigger and bigger.  Maybe your recent urges are to blame for this development?</b>\n");
        }
        // Stage 3:
        if (womb.pregnancy.incubation === 100) {
            CView.text("\n<b>You can feel the strangest fluttering sensations in your distended belly; it must be a pregnancy.  You should eat more and drink plenty of wine so your baby can grow properly.  Wait, wine...?</b>\n");
        }
        // Stage 4:
        if (womb.pregnancy.incubation === 75) {
            CView.text("\n<b>Sometimes you feel a bump in your pregnant belly.  You wonder if it's your baby complaining about your moving about.</b>\n");
        }
        // Stage 5:
        if (womb.pregnancy.incubation === 50) {
            CView.text("\n<b>With your bloating gut, you are loathe to exert yourself in any meaningful manner; you feel horny and hungry all the time...</b>\n");
            // temp min lust up +5
        }
        // Stage 6:
        if (womb.pregnancy.incubation === 30) {
            CView.text("\n<b>The baby you're carrying constantly kicks your belly in demand for food and wine, and you feel sluggish and horny.  You can't wait to birth this little one so you can finally rest for a while.</b>\n");
            // temp min lust up addl +5
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        // The womb clear happens before the scene in old code
        // Dunno which way it should be
        satyrBirth(player);
        womb.clear();
    }
}
