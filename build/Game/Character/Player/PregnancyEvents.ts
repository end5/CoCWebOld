import Player from './Player';
import PlayerFlags from './PlayerFlags';
import DisplayText from '../../../Engine/display/DisplayText';
import Pregnancy, { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import User from '../../User';
import * as NumToText from '../../Utilities/NumToText';

export function updatePregnancy(player: Player) {
    // Cancel Heat
    if (player.pregnancy.womb.isPregnant() && player.pregnancy.womb.pregnancy.incubation === 1) {
        if (player.fertility < 15) player.fertility++;
        if (player.fertility < 25) player.fertility++;
        if (player.fertility < 40) player.fertility++;
        if (!player.statusAffects.has(StatusAffectType.Birthed)) player.statusAffects.add(StatusAffectType.Birthed, 1, 0, 0, 0);
    }
    else {
        player.statusAffects.get(StatusAffectType.Birthed).value1 += 1;
        if (!player.perks.has(PerkType.BroodMother) && player.statusAffects.get(StatusAffectType.Birthed).value1 >= 10) {
            DisplayText("\nYou have gained the Brood Mother perk").bold();
            DisplayText(" (Pregnancies progress twice as fast as a normal woman's).\n");
            player.perks.add(PerkType.BroodMother, 0, 0, 0, 0);
        }
    }
    // Amily failsafe - converts PC with pure babies to mouse babies if Amily is corrupted
    if (player.pregnancy.womb.isPregnantWith(PregnancyType.AMILY) && player.pregnancy.womb.pregnancy.incubation === 1) {
        if ((User.flags.get("Player") as PlayerFlags).AMILY_FOLLOWER === 2 || (User.flags.get("Player") as PlayerFlags).UNKNOWN_FLAG_NUMBER_00170 > 0)
            player.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.MOUSE, player.pregnancy.womb.pregnancy.incubation), 1, true);
    }
    // Amily failsafe - converts PC with pure babies to mouse babies if Amily is with Urta
    if (player.pregnancy.womb.isPregnantWith(PregnancyType.AMILY) && player.pregnancy.womb.pregnancy.incubation === 1) {
        if ((User.flags.get("Player") as PlayerFlags).AMILY_VISITING_URTA === 1 || (User.flags.get("Player") as PlayerFlags).AMILY_VISITING_URTA === 2)
            player.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.MOUSE, player.pregnancy.womb.pregnancy.incubation), 1, true);
    }
}

export function eggDescript(player: Player, plural: boolean = true): string {
    let descript: string = "";
    if (player.statusAffects.has(StatusAffectType.Eggs)) {
        descript += NumToText.numToCardinalText(player.statusAffects.get(StatusAffectType.Eggs).value3) + " ";
        // size descriptor
        if (player.statusAffects.get(StatusAffectType.Eggs).value2 === 1) descript += "large ";
        /*color descriptor
        0 - brown - ass expansion
        1 - purple - hip expansion
        2 - blue - vaginal removal and/or growth of existing maleness
        3 - pink - dick removal and/or fertility increase.
        4 - white - breast growth.  If lactating increases lactation.
        5 - rubbery black -
        */
        if (player.statusAffects.get(StatusAffectType.Eggs).value1 === 0) descript += "brown ";
        if (player.statusAffects.get(StatusAffectType.Eggs).value1 === 1) descript += "purple ";
        if (player.statusAffects.get(StatusAffectType.Eggs).value1 === 2) descript += "blue ";
        if (player.statusAffects.get(StatusAffectType.Eggs).value1 === 3) descript += "pink ";
        if (player.statusAffects.get(StatusAffectType.Eggs).value1 === 4) descript += "white ";
        if (player.statusAffects.get(StatusAffectType.Eggs).value1 === 5) descript += "rubbery black ";
        // EGGS
        if (plural) descript += "eggs";
        else descript += "egg";
        return descript;
    }
    return "EGG ERRORZ";
}
