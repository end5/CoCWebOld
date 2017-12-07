import Menu from './Menu';
import Menus from './Menus';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Utils from '../../Utilities/Utils';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class PerksMenu implements Menu {
    public display(player: Player, prevMenu: ClickFunction) {
        DisplayText.clear();
        for (let index = 0; index < player.perks.count(); index++) {
            DisplayText.bold(player.perks.at(index).type);
            DisplayText.text(" - " + player.perks.at(index).desc);
            DisplayText.newParagraph();
        }

        MainScreen.hideBottomButtons();
        if (player.perkPoints > 0) {
            DisplayText.bold("You have " + Utils.numToCardinalText(player.perkPoints) + " perk point");
            if (player.perkPoints > 1) DisplayText.bold("s");
            DisplayText.bold(" to spend.");
            MainScreen.getBottomButton(1).modify("Perk Up", Menus.PerkUp.display);
        }
        if (player.perks.has(PerkType.DoubleAttack)) {
            DisplayText.bold("You can adjust your double attack settings.");
            MainScreen.getBottomButton(2).modify("Dbl Options", this.doubleAttackOptions);
        }
        MainScreen.doNext(PlayerMenu.display);
    }

    public doubleAttackOptions(): void {
        DisplayText.clear();
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("All Double", this.doubleAttackForce);
        MainScreen.getBottomButton(1).modify("Dynamic", this.doubleAttackDynamic);
        MainScreen.getBottomButton(2).modify("Single", this.doubleAttackOff);
        if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 0) {
            DisplayText.text("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
            DisplayText.text("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
            DisplayText.text("\nYou can change it to always single attack.");
            MainScreen.getBottomButton(0).disable();
        }
        else if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 1) {
            DisplayText.text("You will currently double attack until your strength exceeds sixty, and then single attack.");
            DisplayText.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            DisplayText.text("\nYou can change it to always single attack.");
            MainScreen.getBottomButton(1).disable();
        }
        else {
            DisplayText.text("You will always single attack your foes in combat.");
            DisplayText.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            DisplayText.text("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
            MainScreen.getBottomButton(2).disable();
        }
        let e: MouseEvent;
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