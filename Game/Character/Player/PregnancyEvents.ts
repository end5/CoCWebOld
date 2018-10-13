import { Player } from './Player';
import { Pregnancy, PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { PerkType } from '../../Effects/PerkType';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { numToCardinalText } from '../../Utilities/NumToText';
import { PlayerFlags } from './PlayerFlags';
import { Womb } from '../../Body/Pregnancy/Womb';
import { CView } from '../../../Engine/Display/ContentView';

export function updatePregnancy(player: Player) {
    // Cancel Heat
    if (player.body.wombs.find(Womb.Pregnant) && player.body.wombs.find(Womb.Pregnant).pregnancy.incubation === 1) {
        if (player.body.fertility < 15) player.body.fertility++;
        if (player.body.fertility < 25) player.body.fertility++;
        if (player.body.fertility < 40) player.body.fertility++;
        if (!player.effects.has(StatusEffectType.Birthed)) player.effects.add(StatusEffectType.Birthed, 1, 0, 0, 0);
    }
    else {
        player.effects.get(StatusEffectType.Birthed).value1 += 1;
        if (!player.perks.has(PerkType.BroodMother) && player.effects.get(StatusEffectType.Birthed).value1 >= 10) {
            CView.text("<b>\nYou have gained the Brood Mother perk</b>");
            CView.text(" (Pregnancies progress twice as fast as a normal woman's).\n");
            player.perks.add(PerkType.BroodMother, 0, 0, 0, 0);
        }
    }
    // Amily failsafe - converts PC with pure babies to mouse babies if Amily is corrupted
    if (player.body.womb.isPregnantWith(PregnancyType.AMILY) && player.body.womb.pregnancy.incubation === 1) {
        if (PlayerFlags.AMILY_FOLLOWER === 2 || PlayerFlags.UNKNOWN_FLAG_NUMBER_00170 > 0)
            player.body.womb.knockUp(new Pregnancy(PregnancyType.MOUSE, player.body.womb.pregnancy.incubation), 1, true);
    }
    // Amily failsafe - converts PC with pure babies to mouse babies if Amily is with Urta
    if (player.body.womb.isPregnantWith(PregnancyType.AMILY) && player.body.womb.pregnancy.incubation === 1) {
        if (PlayerFlags.AMILY_VISITING_URTA === 1 || PlayerFlags.AMILY_VISITING_URTA === 2)
            player.body.womb.knockUp(new Pregnancy(PregnancyType.MOUSE, player.body.womb.pregnancy.incubation), 1, true);
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
