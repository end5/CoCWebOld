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

        MainScreen.hideBottomButtons();
        if (character.perkPoints > 0) {
            DisplayText("You have " + Utils.numToCardinalText(character.perkPoints) + " perk point").bold();
            if (character.perkPoints > 1) DisplayText("s").bold();
            DisplayText(" to spend.").bold();
            MainScreen.getBottomButton(1).modify("Perk Up", Menus.PerkUp.display);
        }
        if (character.perks.has(PerkType.DoubleAttack)) {
            DisplayText("You can adjust your double attack settings.").bold();
            MainScreen.getBottomButton(2).modify("Dbl Options", this.doubleAttackOptions);
        }
        MainScreen.doNext(Menus.Character.display);
    }

    public doubleAttackOptions(): void {
        DisplayText().clear();
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("All Double", this.doubleAttackForce);
        MainScreen.getBottomButton(1).modify("Dynamic", this.doubleAttackDynamic);
        MainScreen.getBottomButton(2).modify("Single", this.doubleAttackOff);
        if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] === 0) {
            DisplayText("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
            DisplayText("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
            DisplayText("\nYou can change it to always single attack.");
            MainScreen.getBottomButton(0).disable();
        }
        else if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] === 1) {
            DisplayText("You will currently double attack until your strength exceeds sixty, and then single attack.");
            DisplayText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            DisplayText("\nYou can change it to always single attack.");
            MainScreen.getBottomButton(1).disable();
        }
        else {
            DisplayText("You will always single attack your foes in combat.");
            DisplayText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            DisplayText("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
            MainScreen.getBottomButton(2).disable();
        }
        MainScreen.addBackButton("Back", this.display);
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
