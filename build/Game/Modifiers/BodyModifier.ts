import DisplayText from '../../Engine/display/DisplayText';
import { Gender } from '../Body/GenderIdentity';
import Character from '../Character/Character';
import * as CockDescriptor from '../Descriptors/CockDescriptor';
import * as FaceDescriptor from '../Descriptors/FaceDescriptor';
import * as VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';

export function displayModThickness(character: Character, goal: number, strength: number = 1): string {
    if (goal === character.thickness)
        return "";
    // Lose weight fatty!
    if (goal < character.thickness && goal < 50) {
        character.thickness -= strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.thickness < goal)
            character.thickness = goal;
    }
    // Sup tubby!
    if (goal > character.thickness && goal > 50) {
        character.thickness += strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.thickness > goal)
            character.thickness = goal;
    }

    // DIsplay 'U GOT FAT'
    if (goal >= character.thickness && goal >= 50)
        return "\n\nYour center of balance changes a little bit as your body noticeably widens. (+" + strength + " body thickness)";
    // GET THIN BITCH
    else if (goal <= character.thickness && goal <= 50)
        return "\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+" + strength + " thin)";
    return "";
}

export function displayModTone(character: Character, goal: number, strength: number = 1): string {
    if (goal === character.tone)
        return "";
    // Lose muscle visibility!
    if (goal < character.tone && goal < 50) {
        character.tone -= strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.tone < goal) {
            character.tone = goal;
            return "\n\nYou've lost some tone, but can't lose any more creature way. (-" + strength + " muscle tone)";
        }
    }
    // MOAR hulkness
    if (goal > character.tone && goal > 50) {
        character.tone += strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.tone > goal) {
            character.tone = goal;
            return "\n\nYou've gained some muscle tone, but can't gain any more creature way. (+" + strength + " muscle tone)";
        }
    }
    // DIsplay BITCH I WORK OUT
    if (goal >= character.tone && goal > 50)
        return "\n\nYour body feels a little more solid as you move, and your muscles look slightly more visible. (+" + strength + " muscle tone)";
    // Display DERP I HAVE GIRL MUSCLES
    else if (goal <= character.tone && goal < 50)
        return "\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-" + strength + " muscle tone)";
    return "";
}

// Modify this.femininity!
export function displayModFem(character: Character, goal: number, strength: number = 1): string {
    let output: string = "";
    const old: string = FaceDescriptor.describeFaceOther(character);
    const oldN: number = character.femininity;
    let Changed: boolean = false;
    // If already perfect!
    if (goal === character.femininity)
        return "";
    // If turning MANLYMAN
    if (goal < character.femininity && goal <= 50) {
        character.femininity -= strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.femininity < goal)
            character.femininity = goal;
        Changed = true;
    }
    // if turning GIRLGIRLY, like duh!
    if (goal > character.femininity && goal >= 50) {
        character.femininity += strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.femininity > goal)
            character.femininity = goal;
        Changed = true;
    }
    // Fix if it went out of bounds!
    if (!character.perks.has(PerkType.Androgyny))
        displayFixFemininity(character);
    // Abort if nothing changed!
    if (!Changed)
        return "";
    // See if a change happened!
    if (old !== FaceDescriptor.describeFaceOther(character)) {
        // Gain fem?
        if (goal > oldN)
            output = "\n\n<b>Your facial features soften as your body becomes more feminine. (+" + strength + ")</b>";
        if (goal < oldN)
            output = "\n\n<b>Your facial features harden as your body becomes more masculine. (+" + strength + ")</b>";
    }
    // Barely noticable change!
    else {
        if (goal > oldN)
            output = "\n\nThere's a tingling in your " + FaceDescriptor.describeFace(character) + " as it changes imperceptibly towards being more feminine. (+" + strength + ")";
        else if (goal < oldN)
            output = "\n\nThere's a tingling in your " + FaceDescriptor.describeFace(character) + " as it changes imperciptibly towards being more masculine. (+" + strength + ")";
    }
    return output;
}

// Run creature every hour to 'fix' creature.femininity.
export function displayFixFemininity(character: Character): string {
    let output: string = "";
    // Genderless/herms share the same bounds
    if (character.gender === Gender.NONE || character.gender === Gender.HERM) {
        if (character.femininity < 20) {
            output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
            if (character.torso.neck.head.face.hasBeard()) {
                output += "  As if that wasn't bad enough, your " + FaceDescriptor.describeBeard(character) + " falls out too!";
                character.torso.neck.head.face.beard.length = 0;
                character.torso.neck.head.face.beard.style = "";
            }
            output += "</b>\n";
            character.femininity = 20;
        }
        else if (character.femininity > 85) {
            output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
            character.femininity = 85;
        }
    }
    // GURLS!
    else if (character.gender === 2) {
        if (character.femininity < 30) {
            output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
            if (character.torso.neck.head.face.hasBeard()) {
                output += "  As if that wasn't bad enough, your " + FaceDescriptor.describeBeard(character) + " falls out too!";
                character.torso.neck.head.face.beard.length = 0;
                character.torso.neck.head.face.beard.style = "";
            }
            output += "</b>\n";
            character.femininity = 30;
        }
    }
    // BOIZ!
    else if (character.gender === 1) {
        if (character.femininity > 70) {
            output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
            character.femininity = 70;
        }
        if (character.femininity > 40 && character.torso.neck.head.face.hasBeard()) {
            output += "\n<b>Your beard falls out, leaving you with " + FaceDescriptor.describeFace(character) + ".</b>\n";
            character.torso.neck.head.face.beard.length = 0;
            character.torso.neck.head.face.beard.style = "";
        }
    }
    if (character.gender !== 1 && character.torso.neck.head.face.hasBeard()) {
        output += "\n<b>Your beard falls out, leaving you with " + FaceDescriptor.describeFace(character) + ".</b>\n";
        character.torso.neck.head.face.beard.length = 0;
        character.torso.neck.head.face.beard.style = "";
    }
    return output;
}

// Attempts to put the player in heat (or deeper in heat).
// Returns true if successful, false if not.
// The player cannot go into heat if she is already pregnant or is a he.
//
// First parameter: boolean indicating if should output standard text.
// Second parameter: intensity, an integer multiplier that can increase the
// duration and intensity. Defaults to 1.
export function displayGoIntoHeat(character: Character, intensity: number = 1) {
    // Already in heat, intensify further.
    if (character.statusAffects.has(StatusAffectType.Heat)) {
        DisplayText("\n\nYour mind clouds as your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " moistens.  Despite already being in heat, the desire to copulate constantly grows even larger.");
        const statusAffectHeat = character.statusAffects.get(StatusAffectType.Heat);
        statusAffectHeat.value1 += 5 * intensity;
        statusAffectHeat.value2 += 5 * intensity;
        statusAffectHeat.value3 += 48 * intensity;
        character.stats.libBimbo += 5 * intensity;
    }
    // Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
    else {
        DisplayText("\n\nYour mind clouds as your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " moistens.  Your hands begin stroking your body from top to bottom, your sensitive skin burning with desire.  Fantasies about bending over and presenting your needy pussy to a male overwhelm you as <b>you realize you have gone into heat!</b>");
        character.statusAffects.add(StatusAffectType.Heat, 10 * intensity, 15 * intensity, 48 * intensity, 0);
        character.stats.libBimbo += 15 * intensity;
    }
}

// Attempts to put the player in rut (or deeper in heat).
// Returns true if successful, false if not.
// The player cannot go into heat if he is a she.
//
// First parameter: boolean indicating if should output standard text.
// Second parameter: intensity, an integer multiplier that can increase the
// duration and intensity. Defaults to 1.
export function displayGoIntoRut(character: Character, intensity: number = 1) {
    // Has rut, intensify it!
    if (character.statusAffects.has(StatusAffectType.Rut)) {
        DisplayText("\n\nYour " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " throbs and dribbles as your desire to mate intensifies.  You know that <b>you've sunken deeper into rut</b>, but all that really matters is unloading into a cum-hungry cunt.");
        const statusAffectRut = character.statusAffects.get(StatusAffectType.Rut);
        statusAffectRut.value1 = 100 * intensity;
        statusAffectRut.value2 = 5 * intensity;
        statusAffectRut.value3 = 48 * intensity;
        character.stats.libBimbo += 5 * intensity;
    }
    else {
        DisplayText("\n\nYou stand up a bit straighter and look around, sniffing the air and searching for a mate.  Wait, what!?  It's hard to shake the thought from your head - you really could use a nice fertile hole to impregnate.  You slap your forehead and realize <b>you've gone into rut</b>!");
        // v1 - bonus cum production
        // v2 - bonus libido
        // v3 - time remaining!
        character.statusAffects.add(StatusAffectType.Rut, 150 * intensity, 5 * intensity, 100 * intensity, 0);
        character.stats.libBimbo += 5 * intensity;
    }
}
