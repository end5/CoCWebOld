import { DisplayText } from '../../Engine/display/DisplayText';
import { Character } from '../Character/Character';
import { Desc } from '../Descriptors/Descriptors';

export function displayGrowHair(character: Character, amount: number = .1): boolean {
    // Grow hair!
    const hairLength: number = character.torso.neck.head.hair.length;
    character.torso.neck.head.hair.length += amount;
    if (hairLength > 0 && hairLength === 0) {
        DisplayText("\n<b>You are no longer bald.  You now have " + Desc.Head.describeHair(character) + " coating your head.\n</b>");
        return true;
    }
    else if (hairLength >= 1 && hairLength < 1) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 3 && hairLength < 3) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 6 && hairLength < 6) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 10 && hairLength < 10) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 16 && hairLength < 16) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 26 && hairLength < 26) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 40 && hairLength < 40) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 40 && hairLength >= character.tallness && hairLength < character.tallness) {
        DisplayText("\n<b>Your hair's growth has reached a new threshhold, giving you " + Desc.Head.describeHair(character) + ".\n</b>");
        return true;
    }
    return false;
}
