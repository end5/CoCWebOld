﻿import { DisplayText } from '../../Engine/display/DisplayText';
import { randInt } from '../../Engine/Utilities/SMath';
import { ButtLooseness } from '../Body/Butt';
import { Character } from '../Character/Character';
import { Desc } from '../Descriptors/Descriptors';
import { StatusAffectType } from '../Effects/StatusAffectType';

export function stretchButt(character: Character, buttArea: number): boolean {
    let stretched: boolean = false;
    // cArea > capacity = autostreeeeetch half the time.
    if (buttArea >= character.analCapacity() && randInt(2) === 0) {
        if (character.torso.butt.looseness < ButtLooseness.GAPING)
            character.torso.butt.looseness++;
        stretched = true;
        // Reset butt stretchin recovery time
        if (character.statusAffects.has(StatusAffectType.ButtStretched))
            character.statusAffects.get(StatusAffectType.ButtStretched).value1 = 0;
    }
    // If within top 10% of capacity, 25% stretch
    if (buttArea < character.analCapacity() && buttArea >= .9 * character.analCapacity() && randInt(4) === 0) {
        character.torso.butt.looseness++;
        stretched = true;
    }
    // if within 75th to 90th percentile, 10% stretch
    if (buttArea < .9 * character.analCapacity() && buttArea >= .75 * character.analCapacity() && randInt(10) === 0) {
        character.torso.butt.looseness++;
        stretched = true;
    }
    // Anti-virgin
    if (character.torso.butt.looseness === ButtLooseness.VIRGIN) {
        character.torso.butt.looseness++;
        stretched = true;
    }
    // Delay un-stretching
    if (buttArea >= .5 * character.analCapacity()) {
        // Butt Stretched used to determine how long since last enlargement
        if (!character.statusAffects.has(StatusAffectType.ButtStretched))
            character.statusAffects.add(StatusAffectType.ButtStretched, 0, 0, 0, 0);
        // Reset the timer on it to 0 when restretched.
        else
            character.statusAffects.get(StatusAffectType.ButtStretched).value1 = 0;
    }
    if (stretched) {
        console.trace("BUTT STRETCHED TO " + (character.torso.butt.looseness) + ".");
    }
    return stretched;
}

export function displayStretchButt(character: Character, cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
    const stretched: boolean = stretchButt(character, cArea);
    // STRETCH SUCCESSFUL - begin flavor text if outputting it!
    if (stretched && display) {
        if (spacingsF) DisplayText("  ");
        if (character.torso.butt.looseness === 5) DisplayText("<b>Your " + Desc.Butt.describeButthole(character.torso.butt) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
        if (character.torso.butt.looseness === 4) DisplayText("<b>Your " + Desc.Butt.describeButthole(character.torso.butt) + " becomes so stretched that it gapes continually.</b>");
        if (character.torso.butt.looseness === 3) DisplayText("<b>Your " + Desc.Butt.describeButthole(character.torso.butt) + " is now very loose.</b>");
        if (character.torso.butt.looseness === 2) DisplayText("<b>Your " + Desc.Butt.describeButthole(character.torso.butt) + " is now a little loose.</b>");
        if (character.torso.butt.looseness === 1) DisplayText("<b>You have lost your anal virginity.</b>");
        if (spacingsB) DisplayText("  ");
    }
    return stretched;
}
