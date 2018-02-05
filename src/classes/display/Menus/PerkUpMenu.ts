import Menu from './Menu';
import Menus from './Menus';
import Perk from '../../Effects/Perk';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import DisplayText from '../DisplayText';
import ButtonElement from '../Elements/ButtonElement';
import ListItemElement from '../Elements/ListItemElement';
import ParagraphElement from '../Elements/ParagraphElement';
import UnorderedListElement from '../Elements/UnorderedListElement';
import MainScreen, { TopButton } from '../MainScreen';

export default class PerkUpMenu implements Menu {
    private selectedPerk: Perk;

    public display(player: Player) {
        DisplayText().clear();
        const perkList: Perk[] = this.getAvailablePerks(player);

        if (perkList.length === 0) {
            DisplayText("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + Utils.numToCardinalText(player.perkPoints) + " perk point");
            if (player.perkPoints > 1) DisplayText("s");
            DisplayText(".");
            MainScreen.doNext(Menus.Player.display);
        }
        else {
            DisplayText("Please select a perk from the list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.");
            DisplayText("\n\n");

            this.displayPerkList(player);

            MainScreen.getTopButton(TopButton.MainMenu).hide();
            MainScreen.hideBottomButtons();
            MainScreen.getBottomButton(0).modify("Okay", this.confirmPerk, true);
            MainScreen.getBottomButton(1).modify("Skip", Menus.Player.display);
        }
    }

    private confirmPerk(player: Player) {
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

    private displayPerkList(player: Player) {
        if (this.selectedPerk)
            this.selectedPerk = null;
        const perkList = this.getAvailablePerks(player);
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

    private getAvailablePerks(player: Player): Perk[] {
        let perkList: Perk[] = [];

        // STRENGTH PERKS
        if (player.stats.str >= 25) {
            perkList.push(PerkFactory.create(PerkType.StrongBack));
        }
        if (player.perks.has(PerkType.StrongBack) && player.stats.str >= 50) {
            perkList.push(PerkFactory.create(PerkType.StrongBack2));
        }
        // Tier 1 Strength Perks
        if (player.stats.level >= 6) {
            // Thunderous Strikes - +20% basic attack damage while str > 80.
            if (player.stats.str >= 80) {
                perkList.push(PerkFactory.create(PerkType.ThunderousStrikes));
            }
            // Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
            if (player.stats.str > 60) {
                perkList.push(PerkFactory.create(PerkType.WeaponMastery));
            }
            if (player.stats.str >= 75)
                perkList.push(PerkFactory.create(PerkType.BrutalBlows));
        }
        // Tier 2 Strength Perks
        if (player.stats.level >= 12) {
            if (player.stats.str >= 75)
                perkList.push(PerkFactory.create(PerkType.Berzerker));
        }
        // slot 2 - toughness perk 1
        if (!player.perks.has(PerkType.Tank) && player.stats.tou >= 25) {
            perkList.push(PerkFactory.create(PerkType.Tank));
        }
        // slot 2 - regeneration perk
        if (player.perks.has(PerkType.Tank) && player.stats.tou >= 50) {
            perkList.push(PerkFactory.create(PerkType.Regeneration));
        }
        // Tier 1 Toughness Perks
        if (player.stats.level >= 6) {
            if (player.perks.has(PerkType.Tank) && player.stats.tou >= 60) {
                perkList.push(PerkFactory.create(PerkType.Tank2));
            }
            if (player.perks.has(PerkType.Regeneration) && player.stats.tou >= 70) {
                perkList.push(PerkFactory.create(PerkType.Regeneration2));
            }
            if (player.stats.tou >= 75) {
                perkList.push(PerkFactory.create(PerkType.ImmovableObject));
            }
        }
        // Tier 2 Toughness Perks
        if (player.stats.level >= 12) {
            if (player.stats.tou >= 75) {
                perkList.push(PerkFactory.create(PerkType.Resolute));
            }
            if (player.stats.tou >= 60) {
                perkList.push(PerkFactory.create(PerkType.IronMan));
            }
        }
        // slot 3 - speed perk
        if (player.stats.spe >= 25) {
            perkList.push(PerkFactory.create(PerkType.Evade));
        }
        // slot 3 - run perk
        if (player.stats.spe >= 25) {
            perkList.push(PerkFactory.create(PerkType.Runner));
        }
        // slot 3 - Double Attack perk
        if (player.perks.has(PerkType.Evade) && player.perks.has(PerkType.Runner) && player.stats.spe >= 50) {
            perkList.push(PerkFactory.create(PerkType.DoubleAttack));
        }
        // Tier 1 Speed Perks
        if (player.stats.level >= 6) {
            // Speedy Recovery - Regain Fatigue 50% faster speed.
            if (player.perks.has(PerkType.Evade) && player.stats.spe >= 60) {
                perkList.push(PerkFactory.create(PerkType.SpeedyRecovery));
            }
            // Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
            if (player.stats.spe > 75 && player.perks.has(PerkType.Runner) &&
                (player.inventory.equipment.armor.armorClass === "Light" || player.inventory.equipment.armor.armorClass === "Medium")) {
                perkList.push(PerkFactory.create(PerkType.Agility));
            }
            if (player.stats.spe >= 60) {
                perkList.push(PerkFactory.create(PerkType.LightningStrikes));
            }
        }
        // Tier 2 Speed Perks
        if (player.stats.level >= 12) {
            if (player.stats.spe >= 75) {
                perkList.push(PerkFactory.create(PerkType.LungingAttacks));
            }
        }
        // Slot 4 - precision - -10 enemy toughness for damage calc
        if (player.stats.int >= 25) {
            perkList.push(PerkFactory.create(PerkType.Precision));
        }
        // Spellpower - boosts spell power
        if (player.stats.int >= 50) {
            perkList.push(PerkFactory.create(PerkType.Spellpower));
        }
        if (player.perks.has(PerkType.Spellpower) && player.stats.int >= 50) {
            perkList.push(PerkFactory.create(PerkType.Mage));
        }
        // Tier 1 Intelligence Perks
        if (player.stats.level >= 6) {
            if (player.stats.int >= 50)
                perkList.push(PerkFactory.create(PerkType.Tactician));
            if (player.combat.spellCount() > 0 && player.perks.has(PerkType.Spellpower) && player.perks.has(PerkType.Mage) && player.stats.int >= 60) {
                perkList.push(PerkFactory.create(PerkType.Channeling));
            }
            if (player.stats.int >= 60) {
                perkList.push(PerkFactory.create(PerkType.Medicine));
            }
        }
        // Tier 2 Intelligence perks
        if (player.stats.level >= 12) {
            if (player.perks.has(PerkType.Mage) && player.stats.int >= 75) {
                perkList.push(PerkFactory.create(PerkType.Archmage));
            }
        }
        // LIBIDO PERKZ
        // slot 5 - libido perks
        // Slot 5 - Fertile+ increases cum production and fertility (+15%)
        if (player.stats.lib >= 25) {
            perkList.push(PerkFactory.create(PerkType.FertilityPlus, 15, 1.75, 0, 0));
        }
        // Slot 5 - minimum libido
        if (player.stats.lib >= 50) {
            perkList.push(PerkFactory.create(PerkType.HotBlooded, 20, 0, 0, 0));
        }
        // Tier 1 Libido Perks
        if (player.stats.level >= 6) {
            // Slot 5 - minimum libido
            if (player.stats.lib >= 60) {
                perkList.push(PerkFactory.create(PerkType.WellAdjusted));
            }
            // Slot 5 - minimum libido
            if (player.stats.lib >= 60 && player.stats.cor >= 50) {
                perkList.push(PerkFactory.create(PerkType.Masochist));
            }
        }
        // Corruption Perks - slot 7
        // Slot 7 - Corrupted Libido - lust raises 10% slower.
        if (player.stats.cor >= 25) {
            perkList.push(PerkFactory.create(PerkType.CorruptedLibido, 20, 0, 0, 0));
        }
        // Slot 7 - Seduction (Must have seduced Jojo
        if (!player.perks.has(PerkType.Seduction) && player.stats.cor >= 50 && monk >= 5) {
            perkList.push(PerkFactory.create(PerkType.Seduction));
        }
        // Slot 7 - Nymphomania
        else if (player.perks.has(PerkType.CorruptedLibido) && player.stats.cor >= 75) {
            perkList.push(PerkFactory.create(PerkType.Nymphomania));
        }
        // Slot 7 - UNFINISHED :3
        if (player.stats.minLust() >= 20 && player.perks.has(PerkType.CorruptedLibido) && player.stats.cor >= 50) {
            perkList.push(PerkFactory.create(PerkType.Acclimation));
        }
        // Tier 1 Corruption Perks - acclimation over-rides
        if (player.stats.level >= 6) {
            if (player.stats.cor >= 60 && player.perks.has(PerkType.CorruptedLibido)) {
                perkList.push(PerkFactory.create(PerkType.Sadist));
            }
            if (player.perks.has(PerkType.CorruptedLibido) && player.stats.cor >= 70) {
                perkList.push(PerkFactory.create(PerkType.ArousingAura));
            }
        }
        // Tier 1 Misc Perks
        if (player.stats.level >= 6) {
            perkList.push(PerkFactory.create(PerkType.Resistance));
        }
        // FILTER PERKS
        perkList = perkList.filter((perk: Perk) => {
            if (!player.perks.has(perk.type)) {
                return perk;
            }
        });

        return perkList;
    }

    private applyPerk(player: Player) {
        DisplayText().clear();
        player.perkPoints--;
        // Apply perk here.
        DisplayText(this.selectedPerk.type).bold();
        DisplayText(" gained!");
        player.perks.add(this.selectedPerk.type, this.selectedPerk.value1, this.selectedPerk.value2, this.selectedPerk.value3, this.selectedPerk.value4);
        if (this.selectedPerk.type === PerkType.StrongBack2) player.inventory.items.unlock();
        if (this.selectedPerk.type === PerkType.StrongBack) player.inventory.items.unlock();
        if (this.selectedPerk.type === PerkType.Tank2) {
            player.stats.HP += player.stats.tou;
        }
        MainScreen.doNext(Menus.Player.display);
    }
}
