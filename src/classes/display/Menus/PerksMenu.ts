import Menu from './Menu';
import Menus from './Menus';
import Character from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import { Utils } from '../../Utilities/Utils';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class PerksMenu implements Menu {
    public display(character: Character) {
        DisplayText().clear();
        for (const key of character.perks.keys()) {
            DisplayText(character.perks.get(key).type).bold();
            DisplayText(" - " + character.perks.get(key).desc);
            DisplayText("\n\n");
        }

        const text = ["Next"];
        const func = [Menus.Player.display];

        MainScreen.hideBottomButtons();
        if (character.stats.perkPoints > 0) {
            DisplayText("You have " + Utils.numToCardinalText(character.stats.perkPoints) + " perk point").bold();
            if (character.stats.perkPoints > 1) DisplayText("s").bold();
            DisplayText(" to spend.").bold();
            text.push("Perk Up");
            func.push(Menus.PerkUp.display);
        }
        if (character.perks.has(PerkType.DoubleAttack)) {
            DisplayText("You can adjust your double attack settings.").bold();
            text.push("Dbl Options");
            func.push(this.doubleAttackOptions);
        }
        MainScreen.displayChoices(text, func);
    }

    public doubleAttackOptions(): void {
        DisplayText().clear();
        const text = ["All Double", "Dynamic", "Single"];
        const func = [this.doubleAttackForce, this.doubleAttackDynamic, this.doubleAttackOff];
        if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] === 0) {
            DisplayText("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
            DisplayText("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
            DisplayText("\nYou can change it to always single attack.");
            func[0] = undefined;
        }
        else if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] === 1) {
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
        MainScreen.displayChoices(text, func, ["Back"], [this.display]);
    }

    public doubleAttackForce(): void {
        Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] = 0;
        this.doubleAttackOptions();
    }

    public doubleAttackDynamic(): void {
        Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] = 1;
        this.doubleAttackOptions();
    }

    public doubleAttackOff(): void {
        Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] = 2;
        this.doubleAttackOptions();
    }
}
