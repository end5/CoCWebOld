import { ButtonElement } from '../../../Engine/Display/Elements/ButtonElement';
import { UnorderedListElement } from '../../../Engine/Display/Elements/UnorderedListElement';
import { MainScreen, TopButton } from '../../../Engine/Display/MainScreen';
import { Character } from '../../Character/Character';
import { Perk } from '../../Effects/Perk';
import { PerkType } from '../../Effects/PerkType';
import { displayNextScreenChoices, NextScreenChoices } from '../../ScreenDisplay';
import { numToCardinalText } from '../../Utilities/NumToText';
import { CView } from '../../../Engine/Display/ContentView';
import { ListEntryElement } from '../../../Engine/Display/Elements/ListEntryElement';
import { ParagraphElement } from '../../../Engine/Display/Elements/ParagraphElement';
import { InGameMenus } from './InGameMenus';

export function perkUpMenu(character: Character): NextScreenChoices {
    CView.clear();
    const perkList: Perk[] = getAvailablePerks(character);

    if (perkList.length === 0) {
        CView.text("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + numToCardinalText(character.stats.perkPoints) + " perk point");
        if (character.stats.perkPoints > 1) CView.text("s");
        CView.text(".");
        return { next: InGameMenus.Player };
    }
    else {
        CView.text("Please select a perk from the list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.");
        CView.text("\n\n");

        displayPerkList(character);

        MainScreen.getTopButton(TopButton.MainMenu).hide();
        // "Okay" button is modified in displayPerkList
        return { choices: [["Okay", undefined], ["Skip", InGameMenus.Player]] };
    }
}

function confirmPerk(character: Character, selectedPerk: Perk): NextScreenChoices {
    CView.clear();
    CView.text("You have selected the following perk:");
    CView.text("\n\n");
    CView.text("<b>" + selectedPerk.desc.name + "</b>: ");
    CView.text(selectedPerk.desc.longDesc);
    CView.text("\n\n");
    CView.text("If you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
    return { choices: [["Okay", (char: Character) => applyPerk(char, selectedPerk)], ["Skip", InGameMenus.Player]] };
}

function displayPerkList(character: Character) {
    const perkList = getAvailablePerks(character);
    const perkListDisplay = new UnorderedListElement();
    CView.textElement.appendElement(perkListDisplay);
    perkList.forEach((perk) => {
        const listEntry = new ListEntryElement();
        perkListDisplay.appendElement(listEntry);

        const buttonElement = new ButtonElement();
        listEntry.appendElement(buttonElement);
        buttonElement.modify(perk.desc.name, () => {
            // Okay button is disabled until perk is selected
            displayNextScreenChoices({ choices: [["Okay", (char: Character) => confirmPerk(char, perk)], ["Skip", InGameMenus.Player]] });
        });

        const longDescElement = new ParagraphElement();
        listEntry.appendElement(longDescElement);
        longDescElement.text(perk.desc.longDesc);
    });
}

function getAvailablePerks(character: Character): Perk[] {
    const perkList: Perk[] = [];

    return perkList;
}

function applyPerk(character: Character, selectedPerk: Perk) {
    CView.clear();
    character.stats.perkPoints--;
    // Apply perk here.
    CView.text("<b>" + selectedPerk.type + "</b>");
    CView.text(" gained!");
    character.perks.add(selectedPerk.type);
    if (selectedPerk.type === PerkType.StrongBack2) character.inventory.items.unlock();
    if (selectedPerk.type === PerkType.StrongBack) character.inventory.items.unlock();
    if (selectedPerk.type === PerkType.Tank2) {
        character.stats.HP += character.stats.tou;
    }
    return { next: InGameMenus.Player };
}
