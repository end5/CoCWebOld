import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class DeBimbo extends Consumable {
    public constructor() {
        super(ConsumableName.DeBimbo, new ItemDesc("Debimbo", "a bottle marked as 'Debimbo'"), 250);
    }

    public description(player: Player): string {
        if (player.perks.has(PerkType.BimboBrains) || player.perks.has(PerkType.FutaFaculties))
            return "This should totally like, fix your brain and stuff.  You don't really think anything is wrong with your head - it feels all pink and giggly all the time.";
        else
            return "This draft is concocted from five scholar's teas and who knows what else.  Supposedly it will correct the stupifying effects of Bimbo Liqueur.";
    }

    public canUse(player: Player): boolean {
        if (player.perks.has(PerkType.BimboBrains) || player.perks.has(PerkType.FutaFaculties))
            return true;
        DisplayText.text("You can't use this right now, and it's too expensive to waste!\n\n");
        return false;
    }

    public use(player: Player) {
        if (player.perks.has(PerkType.BimboBrains)) {
            DisplayText.text("\n\n(<b>Perk Removed:  Bimbo Brains - Your intelligence and speech patterns are no longer limited to that of a bimbo.</b>)");
            player.perks.remove(PerkType.BimboBrains);
        }
        else if (player.perks.has(PerkType.FutaFaculties)) {
            DisplayText.text("\n\n(<b>Perk Removed:  Futa Faculties - Your intelligence and speech patterns are no longer limited to that of a futanari bimbo.</b>)");
            player.perks.remove(PerkType.FutaFaculties);
        }
    }

    public useText() {
        DisplayText.text("Well, time to see what this smelly, old rat was on about!  You pinch your nose and swallow the foul-tasting mixture with a grimace.  Oh, that's just <i>nasty!</i>  You drop the vial, which shatters on the ground, clutching at your head as a wave of nausea rolls over you.  Stumbling back against a rock for support, you close your eyes.  A constant, pounding ache throbs just behind your temples, and for once, you find yourself speechless.  A pained groan slips through your lips as thoughts and memories come rushing back.  One after another, threads of cognizant thought plow through the simple matrices of your bimbo mind, shredding and replacing them.");
        DisplayText.text("\n\nYou... you were an air-headed ditz!  A vacuous, idiot-girl with nothing between her ears but hunger for dick and pleasure!  You shudder as your faculties return, the pain diminishing with each passing moment.");
    }
}

