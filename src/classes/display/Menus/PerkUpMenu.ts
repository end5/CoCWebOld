import Menu from './Menu';
import Menus from './Menus';
import Character from '../../Character/Character';
import Perk from '../../Effects/Perk';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import { Utils } from '../../Utilities/Utils';
import DisplayText from '../DisplayText';
import ButtonElement from '../Elements/ButtonElement';
import ListItemElement from '../Elements/ListItemElement';
import ParagraphElement from '../Elements/ParagraphElement';
import UnorderedListElement from '../Elements/UnorderedListElement';
import MainScreen, { TopButton } from '../MainScreen';

export default class PerkUpMenu implements Menu {
    private selectedPerk: Perk;

    public display(character: Character) {
        DisplayText().clear();
        const perkList: Perk[] = this.getAvailablePerks(character);

        if (perkList.length === 0) {
            DisplayText("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + Utils.numToCardinalText(character.stats.perkPoints) + " perk point");
            if (character.stats.perkPoints > 1) DisplayText("s");
            DisplayText(".");
            MainScreen.doNext(Menus.Player.display);
        }
        else {
            DisplayText("Please select a perk from the list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.");
            DisplayText("\n\n");

            this.displayPerkList(character);

            MainScreen.getTopButton(TopButton.MainMenu).hide();
            MainScreen.hideBottomButtons();
            // "Okay" button is modified in displayPerkList
            MainScreen.getBottomButton(0).modify("Okay", this.confirmPerk, true);
            MainScreen.getBottomButton(1).modify("Skip", Menus.Player.display);
        }
    }

    private confirmPerk(character: Character) {
        DisplayText().clear();
        DisplayText("You have selected the following perk:");
        DisplayText("\n\n");
        DisplayText(this.selectedPerk.desc.name + ": ").bold();
        DisplayText(this.selectedPerk.desc.longDesc);
        DisplayText("\n\n");
        DisplayText("If you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Okay", this.applyPerk);
        MainScreen.getBottomButton(1).modify("Skip", Menus.Player.display);
    }

    private displayPerkList(character: Character) {
        if (this.selectedPerk)
            this.selectedPerk = null;
        const perkList = this.getAvailablePerks(character);
        const perkListDisplay = new UnorderedListElement();
        DisplayText().appendElement(perkListDisplay);
        perkList.forEach((perk) => {
            const listEntry = new ListItemElement();
            perkListDisplay.appendElement(listEntry);

            const buttonElement = new ButtonElement();
            listEntry.appendElement(buttonElement);
            buttonElement.modify(perk.desc.name, () => {
                this.selectedPerk = perk;
                // Okay button is disabled until perk is selected
                MainScreen.getBottomButton(0).enable();
            });

            const longDescElement = new ParagraphElement();
            listEntry.appendElement(longDescElement);
            longDescElement.text(perk.desc.longDesc);
        });
    }

    private getAvailablePerks(character: Character): Perk[] {
        let perkList: Perk[] = [];

        // STRENGTH PERKS
        if (character.stats.str >= 25) {
            perkList.push(PerkFactory.create(PerkType.StrongBack));
        }
        if (character.perks.has(PerkType.StrongBack) && character.stats.str >= 50) {
            perkList.push(PerkFactory.create(PerkType.StrongBack2));
        }
        // Tier 1 Strength Perks
        if (character.stats.level >= 6) {
            // Thunderous Strikes - +20% basic attack damage while str > 80.
            if (character.stats.str >= 80) {
                perkList.push(PerkFactory.create(PerkType.ThunderousStrikes));
            }
            // Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
            if (character.stats.str > 60) {
                perkList.push(PerkFactory.create(PerkType.WeaponMastery));
            }
            if (character.stats.str >= 75)
                perkList.push(PerkFactory.create(PerkType.BrutalBlows));
        }
        // Tier 2 Strength Perks
        if (character.stats.level >= 12) {
            if (character.stats.str >= 75)
                perkList.push(PerkFactory.create(PerkType.Berzerker));
        }
        // slot 2 - toughness perk 1
        if (!character.perks.has(PerkType.Tank) && character.stats.tou >= 25) {
            perkList.push(PerkFactory.create(PerkType.Tank));
        }
        // slot 2 - regeneration perk
        if (character.perks.has(PerkType.Tank) && character.stats.tou >= 50) {
            perkList.push(PerkFactory.create(PerkType.Regeneration));
        }
        // Tier 1 Toughness Perks
        if (character.stats.level >= 6) {
            if (character.perks.has(PerkType.Tank) && character.stats.tou >= 60) {
                perkList.push(PerkFactory.create(PerkType.Tank2));
            }
            if (character.perks.has(PerkType.Regeneration) && character.stats.tou >= 70) {
                perkList.push(PerkFactory.create(PerkType.Regeneration2));
            }
            if (character.stats.tou >= 75) {
                perkList.push(PerkFactory.create(PerkType.ImmovableObject));
            }
        }
        // Tier 2 Toughness Perks
        if (character.stats.level >= 12) {
            if (character.stats.tou >= 75) {
                perkList.push(PerkFactory.create(PerkType.Resolute));
            }
            if (character.stats.tou >= 60) {
                perkList.push(PerkFactory.create(PerkType.IronMan));
            }
        }
        // slot 3 - speed perk
        if (character.stats.spe >= 25) {
            perkList.push(PerkFactory.create(PerkType.Evade));
        }
        // slot 3 - run perk
        if (character.stats.spe >= 25) {
            perkList.push(PerkFactory.create(PerkType.Runner));
        }
        // slot 3 - Double Attack perk
        if (character.perks.has(PerkType.Evade) && character.perks.has(PerkType.Runner) && character.stats.spe >= 50) {
            perkList.push(PerkFactory.create(PerkType.DoubleAttack));
        }
        // Tier 1 Speed Perks
        if (character.stats.level >= 6) {
            // Speedy Recovery - Regain Fatigue 50% faster speed.
            if (character.perks.has(PerkType.Evade) && character.stats.spe >= 60) {
                perkList.push(PerkFactory.create(PerkType.SpeedyRecovery));
            }
            // Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
            if (character.stats.spe > 75 && character.perks.has(PerkType.Runner) &&
                (character.inventory.equipment.armor.armorClass === "Light" || character.inventory.equipment.armor.armorClass === "Medium")) {
                perkList.push(PerkFactory.create(PerkType.Agility));
            }
            if (character.stats.spe >= 60) {
                perkList.push(PerkFactory.create(PerkType.LightningStrikes));
            }
        }
        // Tier 2 Speed Perks
        if (character.stats.level >= 12) {
            if (character.stats.spe >= 75) {
                perkList.push(PerkFactory.create(PerkType.LungingAttacks));
            }
        }
        // Slot 4 - precision - -10 enemy toughness for damage calc
        if (character.stats.int >= 25) {
            perkList.push(PerkFactory.create(PerkType.Precision));
        }
        // Spellpower - boosts spell power
        if (character.stats.int >= 50) {
            perkList.push(PerkFactory.create(PerkType.Spellpower));
        }
        if (character.perks.has(PerkType.Spellpower) && character.stats.int >= 50) {
            perkList.push(PerkFactory.create(PerkType.Mage));
        }
        // Tier 1 Intelligence Perks
        if (character.stats.level >= 6) {
            if (character.stats.int >= 50)
                perkList.push(PerkFactory.create(PerkType.Tactician));
            if (character.combat.spellCount() > 0 && character.perks.has(PerkType.Spellpower) && character.perks.has(PerkType.Mage) && character.stats.int >= 60) {
                perkList.push(PerkFactory.create(PerkType.Channeling));
            }
            if (character.stats.int >= 60) {
                perkList.push(PerkFactory.create(PerkType.Medicine));
            }
        }
        // Tier 2 Intelligence perks
        if (character.stats.level >= 12) {
            if (character.perks.has(PerkType.Mage) && character.stats.int >= 75) {
                perkList.push(PerkFactory.create(PerkType.Archmage));
            }
        }
        // LIBIDO PERKZ
        // slot 5 - libido perks
        // Slot 5 - Fertile+ increases cum production and fertility (+15%)
        if (character.stats.lib >= 25) {
            perkList.push(PerkFactory.create(PerkType.FertilityPlus, 15, 1.75, 0, 0));
        }
        // Slot 5 - minimum libido
        if (character.stats.lib >= 50) {
            perkList.push(PerkFactory.create(PerkType.HotBlooded, 20, 0, 0, 0));
        }
        // Tier 1 Libido Perks
        if (character.stats.level >= 6) {
            // Slot 5 - minimum libido
            if (character.stats.lib >= 60) {
                perkList.push(PerkFactory.create(PerkType.WellAdjusted));
            }
            // Slot 5 - minimum libido
            if (character.stats.lib >= 60 && character.stats.cor >= 50) {
                perkList.push(PerkFactory.create(PerkType.Masochist));
            }
        }
        // Corruption Perks - slot 7
        // Slot 7 - Corrupted Libido - lust raises 10% slower.
        if (character.stats.cor >= 25) {
            perkList.push(PerkFactory.create(PerkType.CorruptedLibido, 20, 0, 0, 0));
        }
        // Slot 7 - Seduction (Must have seduced Jojo
        if (!character.perks.has(PerkType.Seduction) && character.stats.cor >= 50 && monk >= 5) {
            perkList.push(PerkFactory.create(PerkType.Seduction));
        }
        // Slot 7 - Nymphomania
        else if (character.perks.has(PerkType.CorruptedLibido) && character.stats.cor >= 75) {
            perkList.push(PerkFactory.create(PerkType.Nymphomania));
        }
        // Slot 7 - UNFINISHED :3
        if (character.stats.minLust() >= 20 && character.perks.has(PerkType.CorruptedLibido) && character.stats.cor >= 50) {
            perkList.push(PerkFactory.create(PerkType.Acclimation));
        }
        // Tier 1 Corruption Perks - acclimation over-rides
        if (character.stats.level >= 6) {
            if (character.stats.cor >= 60 && character.perks.has(PerkType.CorruptedLibido)) {
                perkList.push(PerkFactory.create(PerkType.Sadist));
            }
            if (character.perks.has(PerkType.CorruptedLibido) && character.stats.cor >= 70) {
                perkList.push(PerkFactory.create(PerkType.ArousingAura));
            }
        }
        // Tier 1 Misc Perks
        if (character.stats.level >= 6) {
            perkList.push(PerkFactory.create(PerkType.Resistance));
        }
        // FILTER PERKS
        perkList = perkList.filter((perk: Perk) => {
            if (!character.perks.has(perk.type)) {
                return perk;
            }
        });

        return perkList;
    }

    private applyPerk(character: Character) {
        DisplayText().clear();
        character.stats.perkPoints--;
        // Apply perk here.
        DisplayText(this.selectedPerk.type).bold();
        DisplayText(" gained!");
        character.perks.add(this.selectedPerk.type, this.selectedPerk.value1, this.selectedPerk.value2, this.selectedPerk.value3, this.selectedPerk.value4);
        if (this.selectedPerk.type === PerkType.StrongBack2) character.inventory.items.unlock();
        if (this.selectedPerk.type === PerkType.StrongBack) character.inventory.items.unlock();
        if (this.selectedPerk.type === PerkType.Tank2) {
            character.stats.HP += character.stats.tou;
        }
        MainScreen.doNext(Menus.Player.display);
    }
}
