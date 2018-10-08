import { describeButthole } from "../../../Descriptors/ButtDescriptor";
import { Character } from "../../../Character/Character";
import { ButtWomb } from "../ButtWomb";
import { CView } from "../../../../Engine/Display/ContentView";
import { describeLegs } from "../../../Descriptors/LegDescriptor";
import { IPregnancyEvent } from "../IPregnancyEvent";

export class DriderEggsButtPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, buttWomb: ButtWomb): void {
        if (buttWomb.pregnancy.incubation === 199) {
            CView.text("\n<b>After your session with the drider, you feel so nice and... full.  There is no outward change on your body, aside from the egg-packed bulge of your belly, but your " + describeButthole(player.body.butt) + " tingles slightly and leaks green goop from time to time. Hopefully it's nothing to be alarmed about.</b>\n");
        }
        if (buttWomb.pregnancy.incubation === 180) {
            CView.text("\n<b>A hot flush works its way through you, and visions of aroused driders quickly come to dominate your thoughts.  You start playing with a nipple while you lose yourself in the fantasy, imagining being tied up in webs and packed completely full of eggs, stuffing your belly completely with burgeoning spheres of love.  You shake free of the fantasy and notice your hands rubbing over your slightly bloated belly.  Perhaps it wouldn't be so bad?</b>\n");
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 20;

        }
        if (buttWomb.pregnancy.incubation === 120) {
            CView.text("\n<b>Your belly is bulging from the size of the eggs growing inside you and gurgling just about any time you walk.  Green goo runs down your " + describeLegs(player) + " frequently, drooling out of your pregnant asshole.</b>\n");
        }
        if (buttWomb.pregnancy.incubation === 72) {
            CView.text("\n<b>The huge size of your pregnant belly constantly impedes your movement, but the constant squirming and shaking of your unborn offspring makes you pretty sure you won't have to carry them much longer.");
            CView.text("</b>\n");
        }
    }

    public canBirth(player: Character, buttWomb: ButtWomb): boolean {
        return buttWomb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, buttWomb: ButtWomb): void {
        birthSpiderEggsFromAnusITSBLEEDINGYAYYYYY(player);
        buttWomb.clear();
    }
}
