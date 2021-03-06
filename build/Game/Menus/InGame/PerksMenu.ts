import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { PerkType } from '../../Effects/PerkType';
import { NextScreenChoices, ScreenChoice } from '../../ScreenDisplay';
import { User } from '../../User';
import { numToCardinalText } from '../../Utilities/NumToText';
import { Menus } from '../Menus';

export function display(character: Character): NextScreenChoices {
    DisplayText().clear();
    for (const key of character.perks.keys()) {
        DisplayText(character.perks.get(key).type).bold();
        DisplayText(" - " + character.perks.get(key).desc);
        DisplayText("\n\n");
    }

    const choices: ScreenChoice[] = [["Next", Menus.Player]];

    if (character.stats.perkPoints > 0) {
        DisplayText("You have " + numToCardinalText(character.stats.perkPoints) + " perk point").bold();
        if (character.stats.perkPoints > 1) DisplayText("s").bold();
        DisplayText(" to spend.").bold();
        choices.push(["Perk Up", Menus.PerkUp]);
    }
    if (character.perks.has(PerkType.DoubleAttack)) {
        DisplayText("You can adjust your double attack settings.").bold();
        choices.push(["Dbl Options", doubleAttackOptions]);
    }
    return { choices };
}

function doubleAttackOptions(): NextScreenChoices {
    DisplayText().clear();
    const choices: ScreenChoice[] = [["All Double", doubleAttackForce], ["Dynamic", doubleAttackDynamic], ["Single", doubleAttackOff]];
    if ((User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE === 0) {
        DisplayText("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
        DisplayText("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
        DisplayText("\nYou can change it to always single attack.");
        choices[0][1] = undefined;
    }
    else if ((User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE === 1) {
        DisplayText("You will currently double attack until your strength exceeds sixty, and then single attack.");
        DisplayText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        DisplayText("\nYou can change it to always single attack.");
        choices[1][1] = undefined;
    }
    else {
        DisplayText("You will always single attack your foes in combat.");
        DisplayText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        DisplayText("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
        choices[2][1] = undefined;
    }
    return { choices, persistantChoices: [["Back", display]] };
}

function doubleAttackForce(): NextScreenChoices {
    (User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE = 0;
    return doubleAttackOptions();
}

function doubleAttackDynamic(): NextScreenChoices {
    (User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE = 1;
    return doubleAttackOptions();
}

function doubleAttackOff(): NextScreenChoices {
    (User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE = 2;
    return doubleAttackOptions();
}
