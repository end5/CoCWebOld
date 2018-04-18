import DisplayText from '../../../Engine/display/DisplayText';
import MainScreen from '../../../Engine/Display/MainScreen';
import Character from '../../Character/Character';
import PlayerFlags from '../../Character/Player/PlayerFlags';
import { PerkType } from '../../Effects/PerkType';
import User from '../../User';
import { numToCardinalText } from '../../Utilities/NumToText';
import Menus from '../Menus';

export default function display(character: Character) {
    DisplayText().clear();
    for (const key of character.perks.keys()) {
        DisplayText(character.perks.get(key).type).bold();
        DisplayText(" - " + character.perks.get(key).desc);
        DisplayText("\n\n");
    }

    const text = ["Next"];
    const func = [Menus.Player];

    MainScreen.hideBottomButtons();
    if (character.stats.perkPoints > 0) {
        DisplayText("You have " + numToCardinalText(character.stats.perkPoints) + " perk point").bold();
        if (character.stats.perkPoints > 1) DisplayText("s").bold();
        DisplayText(" to spend.").bold();
        text.push("Perk Up");
        func.push(Menus.PerkUp);
    }
    if (character.perks.has(PerkType.DoubleAttack)) {
        DisplayText("You can adjust your double attack settings.").bold();
        text.push("Dbl Options");
        func.push(doubleAttackOptions);
    }
    MainScreen.displayChoices(text, func);
}

function doubleAttackOptions(): void {
    DisplayText().clear();
    const text = ["All Double", "Dynamic", "Single"];
    const func = [doubleAttackForce, doubleAttackDynamic, doubleAttackOff];
    if ((User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE === 0) {
        DisplayText("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
        DisplayText("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
        DisplayText("\nYou can change it to always single attack.");
        func[0] = undefined;
    }
    else if ((User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE === 1) {
        DisplayText("You will currently double attack until your strength exceeds sixty, and then single attack.");
        DisplayText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        DisplayText("\nYou can change it to always single attack.");
        func[1] = undefined;
    }
    else {
        DisplayText("You will always single attack your foes in combat.");
        DisplayText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        DisplayText("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
        func[2] = undefined;
    }
    MainScreen.displayChoices(text, func, ["Back"], [display]);
}

function doubleAttackForce(): void {
    (User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE = 0;
    doubleAttackOptions();
}

function doubleAttackDynamic(): void {
    (User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE = 1;
    doubleAttackOptions();
}

function doubleAttackOff(): void {
    (User.flags.get("Player") as PlayerFlags).DOUBLE_ATTACK_STYLE = 2;
    doubleAttackOptions();
}
