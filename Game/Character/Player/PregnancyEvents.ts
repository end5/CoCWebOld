import { Player } from './Player';
import { PlayerFlags } from './PlayerFlags';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Pregnancy, PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { PerkType } from '../../Effects/PerkType';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { User } from '../../User';
import { numToCardinalText } from '../../Utilities/NumToText';

export function updatePregnancy(player: Player) {
    // Cancel Heat
    if (player.pregnancy.womb.isPregnant() && player.pregnancy.womb.pregnancy.incubation === 1) {
        if (player.fertility < 15) player.fertility++;
        if (player.fertility < 25) player.fertility++;
        if (player.fertility < 40) player.fertility++;
        if (!player.effects.has(StatusEffectType.Birthed)) player.effects.add(StatusEffectType.Birthed, 1, 0, 0, 0);
    }
    else {
        player.effects.get(StatusEffectType.Birthed).value1 += 1;
        if (!player.perks.has(PerkType.BroodMother) && player.effects.get(StatusEffectType.Birthed).value1 >= 10) {
            DisplayText("\nYou have gained the Brood Mother perk").bold();
            DisplayText(" (Pregnancies progress twice as fast as a normal woman's).\n");
            player.perks.add(PerkType.BroodMother, 0, 0, 0, 0);
        }
    }
    // Amily failsafe - converts PC with pure babies to mouse babies if Amily is corrupted
    if (player.pregnancy.womb.isPregnantWith(PregnancyType.AMILY) && player.pregnancy.womb.pregnancy.incubation === 1) {
        if (playerFlags.AMILY_FOLLOWER === 2 || playerFlags.UNKNOWN_FLAG_NUMBER_00170 > 0)
            player.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.MOUSE, player.pregnancy.womb.pregnancy.incubation), 1, true);
    }
    // Amily failsafe - converts PC with pure babies to mouse babies if Amily is with Urta
    if (player.pregnancy.womb.isPregnantWith(PregnancyType.AMILY) && player.pregnancy.womb.pregnancy.incubation === 1) {
        if (playerFlags.AMILY_VISITING_URTA === 1 || playerFlags.AMILY_VISITING_URTA === 2)
            player.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.MOUSE, player.pregnancy.womb.pregnancy.incubation), 1, true);
    }
}

export function eggDescript(player: Player, plural: boolean = true): string {
    let descript: string = "";
    if (player.effects.has(StatusEffectType.Eggs)) {
        descript += numToCardinalText(player.effects.get(StatusEffectType.Eggs).value3) + " ";
        // size descriptor
        if (player.effects.get(StatusEffectType.Eggs).value2 === 1) descript += "large ";
        /*color descriptor
        0 - brown - ass expansion
        1 - purple - hip expansion
        2 - blue - vaginal removal and/or growth of existing maleness
        3 - pink - dick removal and/or fertility increase.
        4 - white - breast growth.  If lactating increases lactation.
        5 - rubbery black -
        */
        if (player.effects.get(StatusEffectType.Eggs).value1 === 0) descript += "brown ";
        if (player.effects.get(StatusEffectType.Eggs).value1 === 1) descript += "purple ";
        if (player.effects.get(StatusEffectType.Eggs).value1 === 2) descript += "blue ";
        if (player.effects.get(StatusEffectType.Eggs).value1 === 3) descript += "pink ";
        if (player.effects.get(StatusEffectType.Eggs).value1 === 4) descript += "white ";
        if (player.effects.get(StatusEffectType.Eggs).value1 === 5) descript += "rubbery black ";
        // EGGS
        if (plural) descript += "eggs";
        else descript += "egg";
        return descript;
    }
    return "EGG ERRORZ";
}
