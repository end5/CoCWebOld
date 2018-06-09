import {
    VAGINA_LOOSENESS_GAPING,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_LOOSENESS_TIGHT
    } from './appearanceDefs';
import { spellCount, spellMod, takeDamage } from './combat';
import { num2Text, vaginaDescript } from './descriptors';
import { playerMenu } from './eventParser';
import { CoC_Settings } from '../classes/classes/CoC_Settings';
import { kFLAGS } from '../classes/classes/GlobalFlags/kFLAGS';
import { kGAMECLASS } from '../classes/classes/GlobalFlags/kGAMECLASS';
import { ItemType } from '../classes/classes/ItemType';
import { PerkClass } from '../classes/classes/PerkClass';
import { PerkLib } from '../classes/classes/PerkLib';
import { UmasShop } from '../classes/classes/Scenes/Places/TelAdre/UmasShop';
import { StatusAffects } from '../classes/classes/StatusAffects';
import { rand } from '../Engine/Utilities/SMath';
import { trace } from '../wrappers/output';

export function maxHP(): number {
    return kGAMECLASS.player.maxHP();
}

export function silly(): boolean {
    return kGAMECLASS.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG] == 1;

}

export function HPChange(changeNum: number, display: boolean): void {
    if (changeNum == 0) return;
    if (changeNum > 0) {
        //Increase by 20%!
        if (kGAMECLASS.player.findPerk(PerkLib.HistoryHealer) >= 0) changeNum *= 1.2;
        if (kGAMECLASS.player.HP + Math.floor(changeNum) > maxHP()) {
            if (kGAMECLASS.player.HP >= maxHP()) {
                if (display) outputText("You're as healthy as you can be.\n", false);
                return;
            }
            if (display) outputText("Your HP maxes out at " + maxHP() + ".\n", false);
            kGAMECLASS.player.HP = maxHP();
        }
        else {
            if (display) outputText("You gain " + Math.floor(changeNum) + " HP.\n", false);
            kGAMECLASS.player.HP += Math.floor(changeNum);
            kGAMECLASS.mainView.statsView.showStatUp('hp');
            // hpUp.visible = true;
        }
    }
    //Negative HP
    else {
        if (kGAMECLASS.player.HP + changeNum <= 0) {
            if (display) outputText("You take " + Math.floor(changeNum * -1) + " damage, dropping your HP to 0.\n", false);
            kGAMECLASS.player.HP = 0;
        }
        else {
            if (display) outputText("You take " + Math.floor(changeNum * -1) + " damage.\n", false);
            kGAMECLASS.player.HP += changeNum;
        }
    }
    statScreenRefresh();
}

export function clearOutput(): void {
    kGAMECLASS.forceUpdate();
    kGAMECLASS.currentText = "";
    kGAMECLASS.mainView.clearOutputText();
    if (kGAMECLASS.gameState != 3) kGAMECLASS.mainView.hideMenuButton(MainView.MENU_DATA);
    kGAMECLASS.mainView.hideMenuButton(MainView.MENU_APPEARANCE);
    kGAMECLASS.mainView.hideMenuButton(MainView.MENU_LEVEL);
    kGAMECLASS.mainView.hideMenuButton(MainView.MENU_PERKS);
    kGAMECLASS.mainView.hideMenuButton(MainView.MENU_STATS);
}

export function rawOutputText(output: string, purgeText: boolean = false): void {

    //OUTPUT!
    if (purgeText) {
        //if(!debug) mainText.htmlText = output;
        //trace("Purging and writing Text", output);
        clearOutput();
        kGAMECLASS.currentText = output;
        kGAMECLASS.mainView.setOutputText(output);
        // mainText.htmlText = output;
    }
    else {
        //trace("Adding Text");
        kGAMECLASS.currentText += output;
        kGAMECLASS.mainView.appendOutputText(output);
        // mainText.htmlText += output;
    }
    // trace(getCurrentStackTrace())
    // scrollBar.update();

}

export function outputText(output: string,
    purgeText: boolean = false,
    parseAsMarkdown: boolean = false): void {
    // we have to purge the output text BEFORE calling parseText, because if there are scene commands in 
    // the parsed text, parseText() will write directly to the output


    // This is cleaup in case someone hits the Data or new-game button when the event-test window is shown. 
    // It's needed since those buttons are available even when in the event-tester
    kGAMECLASS.mainView.hideTestInputPanel();

    if (purgeText) {
        clearOutput();
    }

    output = this.parser.recursiveParser(output, parseAsMarkdown);

    //OUTPUT!
    if (purgeText) {
        //if(!debug) mainText.htmlText = output;
        kGAMECLASS.currentText = output;
    }
    else {
        kGAMECLASS.currentText += output;
        //if(!debug) mainText.htmlText = kGAMECLASS.currentText;
    }
    if (kGAMECLASS.debug) {
        kGAMECLASS.mainView.setOutputText(kGAMECLASS.currentText);
    }

}

export function flushOutputTextToGUI(): void {
    var fmt: TextFormat;
    if (kGAMECLASS.flags[kFLAGS.CUSTOM_FONT_SIZE] != 0) {
        fmt = kGAMECLASS.mainView.mainText.getTextFormat();
        fmt.size = kGAMECLASS.flags[kFLAGS.CUSTOM_FONT_SIZE];
    }

    kGAMECLASS.mainView.setOutputText(kGAMECLASS.currentText);

    if (kGAMECLASS.flags[kFLAGS.CUSTOM_FONT_SIZE] != 0) {
        kGAMECLASS.mainView.mainText.setTextFormat(fmt);
    }
}

export function displayPerks(e: MouseEvent = null): void {
    var temp: number = 0;
    outputText("", true);
    while (temp < kGAMECLASS.player.perks.length) {
        outputText("<b>" + kGAMECLASS.player.perk(temp).perkName + "</b> - " + kGAMECLASS.player.perk(temp).perkDesc + "\n", false);
        temp++;
    }
    menu();
    if (kGAMECLASS.player.perkPoints > 0) {
        outputText("\n<b>You have " + num2Text(kGAMECLASS.player.perkPoints) + " perk point", false);
        if (kGAMECLASS.player.perkPoints > 1) outputText("s", false);
        outputText(" to spend.</b>", false);
        addButton(1, "Perk Up", perkBuyMenu);
    }
    if (kGAMECLASS.player.findPerk(PerkLib.DoubleAttack) >= 0) {
        outputText("\n<b>You can adjust your double attack settings.</b>");
        addButton(2, "Dbl Options", doubleAttackOptions);
    }
    addButton(0, "Next", playerMenu);
}

export function doubleAttackOptions(): void {
    clearOutput();
    menu();
    if (kGAMECLASS.flags[kFLAGS.DOUBLE_ATTACK_STYLE] == 0) {
        outputText("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
        outputText("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
        outputText("\nYou can change it to always single attack.");
        addButton(1, "Dynamic", doubleAttackDynamic);
        addButton(2, "Single", doubleAttackOff);
    }
    else if (kGAMECLASS.flags[kFLAGS.DOUBLE_ATTACK_STYLE] == 1) {
        outputText("You will currently double attack until your strength exceeds sixty, and then single attack.");
        outputText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        outputText("\nYou can change it to always single attack.");
        addButton(0, "All Double", doubleAttackForce);
        addButton(2, "Single", doubleAttackOff);
    }
    else {
        outputText("You will always single attack your foes in combat.");
        outputText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        outputText("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
        addButton(0, "All Double", doubleAttackForce);
        addButton(1, "Dynamic", doubleAttackDynamic);
    }
    var e: MouseEvent;
    addButton(4, "Back", displayPerks);
}

export function doubleAttackForce(): void {
    kGAMECLASS.flags[kFLAGS.DOUBLE_ATTACK_STYLE] = 0;
    doubleAttackOptions();
}
export function doubleAttackDynamic(): void {
    kGAMECLASS.flags[kFLAGS.DOUBLE_ATTACK_STYLE] = 1;
    doubleAttackOptions();
}
export function doubleAttackOff(): void {
    kGAMECLASS.flags[kFLAGS.DOUBLE_ATTACK_STYLE] = 2;
    doubleAttackOptions();
}

export function levelUpGo(e: MouseEvent = null): void {
    clearOutput();
    hideMenus();
    kGAMECLASS.mainView.hideMenuButton(MainView.MENU_NEW_MAIN);
    //Level up
    if (kGAMECLASS.player.XP >= (kGAMECLASS.player.level) * 100) {
        kGAMECLASS.player.level++;
        kGAMECLASS.player.perkPoints++;
        outputText("<b>You are now level " + kGAMECLASS.player.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
        kGAMECLASS.player.XP -= (kGAMECLASS.player.level - 1) * 100;
        menu();
        addButton(0, "Strength", levelUpStatStrength);
        addButton(1, "Toughness", levelUpStatToughness);
        addButton(2, "Speed", levelUpStatSpeed);
        addButton(3, "Intelligence", levelUpStatIntelligence);
    }
    //Spend perk points
    else if (kGAMECLASS.player.perkPoints > 0) {
        perkBuyMenu();
    }
    else {
        outputText("<b>ERROR.  LEVEL UP PUSHED WHEN PC CANNOT LEVEL OR GAIN PERKS.  PLEASE REPORT THE STEPS TO REPRODUCE THIS BUG TO FENOXO@GMAIL.COM OR THE FENOXO.COM BUG REPORT FORUM.</b>");
        doNext(playerMenu);
    }
}

function levelUpStatStrength(): void {
    dynStats("str", 5); //Gain +5 Str due to level
    clearOutput();
    outputText("Your muscles feel significantly stronger from your time adventuring.");
    doNext(perkBuyMenu);
}

function levelUpStatToughness(): void {
    dynStats("tou", 5); //Gain +5 Toughness due to level
    trace("HP: " + kGAMECLASS.player.HP + " MAX HP: " + maxHP());
    statScreenRefresh();
    clearOutput();
    outputText("You feel tougher from all the fights you have endured.");
    doNext(perkBuyMenu);
}

function levelUpStatSpeed(): void {
    dynStats("spe", 5); //Gain +5 speed due to level
    clearOutput();
    outputText("Your time in combat has driven you to move faster.");
    doNext(perkBuyMenu);
}

function levelUpStatIntelligence(): void {
    dynStats("int", 5); //Gain +5 Intelligence due to level
    clearOutput();
    outputText("Your time spent fighting the creatures of this realm has sharpened your wit.");
    doNext(perkBuyMenu);
}

function perkBuyMenu(): void {
    clearOutput();
    var perkList: Array<any> = buildPerkList();

    if (perkList.length == 0) {
        outputText("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + num2Text(kGAMECLASS.player.perkPoints) + " perk point");
        if (kGAMECLASS.player.perkPoints > 1) outputText("s");
        outputText(".");
        doNext(playerMenu);
        return;
    }
    if (kGAMECLASS.testingBlockExiting) {
        menu();
        addButton(0, "Next", perkSelect, perkList[rand(perkList.length)].perk);
    }
    else {
        outputText("Please select a perk from the drop-down list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.\n\n");
        kGAMECLASS.mainView.aCb.x = 210;
        kGAMECLASS.mainView.aCb.y = 112;

        if (kGAMECLASS.mainView.aCb.parent == null) {
            kGAMECLASS.mainView.addChild(kGAMECLASS.mainView.aCb);
            kGAMECLASS.mainView.aCb.visible = true;
        }

        kGAMECLASS.mainView.hideMenuButton(MainView.MENU_NEW_MAIN);
        menu();
        addButton(1, "Skip", perkSkip);
    }
}

function perkSelect(selected: PerkClass): void {
    stage.focus = null;
    if (kGAMECLASS.mainView.aCb.parent != null) {
        kGAMECLASS.mainView.removeChild(kGAMECLASS.mainView.aCb);
        applyPerk(selected);
    }
}

function perkSkip(): void {
    stage.focus = null;
    if (kGAMECLASS.mainView.aCb.parent != null) {
        kGAMECLASS.mainView.removeChild(kGAMECLASS.mainView.aCb);
        playerMenu();
    }
}

function changeHandler(event: Event): void {
    //Store perk name for later addition
    clearOutput();
    var selected: PerkClass = ComboBox(event.target).selectedItem.perk;
    kGAMECLASS.mainView.aCb.move(210, 85);
    outputText("You have selected the following perk:\n\n");
    outputText("<b>" + selected.perkName + ":</b> " + selected.perkLongDesc + "\n\nIf you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
    menu();
    addButton(0, "Okay", perkSelect, selected);
    addButton(1, "Skip", perkSkip);
}

export function buildPerkList(): Array<any> {
    var perkList: Array<any> = [];
    function _add(p: PerkClass): void {
        perkList.push({ label: p.perkName, perk: p });
    }
    //STRENGTH PERKS
    if (kGAMECLASS.player.str >= 25) {
        _add(new PerkClass(PerkLib.StrongBack));
    }
    if (kGAMECLASS.player.findPerk(PerkLib.StrongBack) >= 0 && kGAMECLASS.player.str >= 50) {
        _add(new PerkClass(PerkLib.StrongBack2));
    }
    //Tier 1 Strength Perks
    if (kGAMECLASS.player.level >= 6) {
        //Thunderous Strikes - +20% basic attack damage while str > 80.
        if (kGAMECLASS.player.str >= 80) {
            _add(new PerkClass(PerkLib.ThunderousStrikes));
        }
        //Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
        if (kGAMECLASS.player.str > 60) {
            _add(new PerkClass(PerkLib.WeaponMastery));
        }
        if (kGAMECLASS.player.str >= 75)
            _add(new PerkClass(PerkLib.BrutalBlows));
    }
    //Tier 2 Strength Perks
    if (kGAMECLASS.player.level >= 12) {
        if (kGAMECLASS.player.str >= 75)
            _add(new PerkClass(PerkLib.Berzerker));
    }
    //slot 2 - toughness perk 1
    if (kGAMECLASS.player.findPerk(PerkLib.Tank) < 0 && kGAMECLASS.player.tou >= 25) {
        _add(new PerkClass(PerkLib.Tank));
    }
    //slot 2 - regeneration perk
    if (kGAMECLASS.player.findPerk(PerkLib.Tank) >= 0 && kGAMECLASS.player.tou >= 50) {
        _add(new PerkClass(PerkLib.Regeneration));
    }
    //Tier 1 Toughness Perks
    if (kGAMECLASS.player.level >= 6) {
        if (kGAMECLASS.player.findPerk(PerkLib.Tank) >= 0 && kGAMECLASS.player.tou >= 60) {
            _add(new PerkClass(PerkLib.Tank2));
        }
        if (kGAMECLASS.player.findPerk(PerkLib.Regeneration) >= 0 && kGAMECLASS.player.tou >= 70) {
            _add(new PerkClass(PerkLib.Regeneration2));
        }
        if (kGAMECLASS.player.tou >= 75) {
            _add(new PerkClass(PerkLib.ImmovableObject));
        }
    }
    //Tier 2 Toughness Perks
    if (kGAMECLASS.player.level >= 12) {
        if (kGAMECLASS.player.tou >= 75) {
            _add(new PerkClass(PerkLib.Resolute));
        }
        if (kGAMECLASS.player.tou >= 60) {
            _add(new PerkClass(PerkLib.IronMan));
        }
    }
    //slot 3 - speed perk
    if (kGAMECLASS.player.spe >= 25) {
        _add(new PerkClass(PerkLib.Evade));
    }
    //slot 3 - run perk
    if (kGAMECLASS.player.spe >= 25) {
        _add(new PerkClass(PerkLib.Runner));
    }
    //slot 3 - Double Attack perk
    if (kGAMECLASS.player.findPerk(PerkLib.Evade) >= 0 && kGAMECLASS.player.findPerk(PerkLib.Runner) >= 0 && kGAMECLASS.player.spe >= 50) {
        _add(new PerkClass(PerkLib.DoubleAttack));
    }
    //Tier 1 Speed Perks
    if (kGAMECLASS.player.level >= 6) {
        //Speedy Recovery - Regain Fatigue 50% faster speed.
        if (kGAMECLASS.player.findPerk(PerkLib.Evade) >= 0 && kGAMECLASS.player.spe >= 60) {
            _add(new PerkClass(PerkLib.SpeedyRecovery));
        }
        //Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
        if (kGAMECLASS.player.spe > 75 && kGAMECLASS.player.findPerk(PerkLib.Runner) >= 0 && (kGAMECLASS.player.armorPerk == "Light" || kGAMECLASS.player.armorPerk == "Medium")) {
            _add(new PerkClass(PerkLib.Agility));
        }
        if (kGAMECLASS.player.spe >= 60) {
            _add(new PerkClass(PerkLib.LightningStrikes));
        }
    }
    //Tier 2 Speed Perks
    if (kGAMECLASS.player.level >= 12) {
        if (kGAMECLASS.player.spe >= 75) {
            _add(new PerkClass(PerkLib.LungingAttacks));
        }
    }
    //Slot 4 - precision - -10 enemy toughness for damage calc
    if (kGAMECLASS.player.inte >= 25) {
        _add(new PerkClass(PerkLib.Precision));
    }
    //Spellpower - boosts spell power
    if (kGAMECLASS.player.inte >= 50) {
        _add(new PerkClass(PerkLib.Spellpower));
    }
    if (kGAMECLASS.player.findPerk(PerkLib.Spellpower) >= 0 && kGAMECLASS.player.inte >= 50) {
        _add(new PerkClass(PerkLib.Mage));
    }
    //Tier 1 Intelligence Perks
    if (kGAMECLASS.player.level >= 6) {
        if (kGAMECLASS.player.inte >= 50)
            _add(new PerkClass(PerkLib.Tactician));
        if (spellCount() > 0 && kGAMECLASS.player.findPerk(PerkLib.Spellpower) >= 0 && kGAMECLASS.player.findPerk(PerkLib.Mage) >= 0 && kGAMECLASS.player.inte >= 60) {
            _add(new PerkClass(PerkLib.Channeling));
        }
        if (kGAMECLASS.player.inte >= 60) {
            _add(new PerkClass(PerkLib.Medicine));
        }
    }
    //Tier 2 Intelligence perks
    if (kGAMECLASS.player.level >= 12) {
        if (kGAMECLASS.player.findPerk(PerkLib.Mage) >= 0 && kGAMECLASS.player.inte >= 75) {
            _add(new PerkClass(PerkLib.Archmage));
        }
    }
    //LIBIDO PERKZ
    //slot 5 - libido perks
    //Slot 5 - Fertile+ increases cum production and fertility (+15%)
    if (kGAMECLASS.player.lib >= 25) {
        _add(new PerkClass(PerkLib.FertilityPlus, 15, 1.75, 0, 0));
    }
    //Slot 5 - minimum libido
    if (kGAMECLASS.player.lib >= 50) {
        _add(new PerkClass(PerkLib.HotBlooded, 20, 0, 0, 0));
    }
    //Tier 1 Libido Perks
    if (kGAMECLASS.player.level >= 6) {
        //Slot 5 - minimum libido
        if (kGAMECLASS.player.lib >= 60) {
            _add(new PerkClass(PerkLib.WellAdjusted));
        }
        //Slot 5 - minimum libido
        if (kGAMECLASS.player.lib >= 60 && kGAMECLASS.player.cor >= 50) {
            _add(new PerkClass(PerkLib.Masochist));
        }
    }
    //Corruption Perks - slot 7
    //Slot 7 - Corrupted Libido - lust raises 10% slower.
    if (kGAMECLASS.player.cor >= 25) {
        _add(new PerkClass(PerkLib.CorruptedLibido, 20, 0, 0, 0));
    }
    //Slot 7 - Seduction (Must have seduced Jojo
    if (kGAMECLASS.player.findPerk(PerkLib.Seduction) < 0 && kGAMECLASS.player.cor >= 50 && kGAMECLASS.monk >= 5) {
        _add(new PerkClass(PerkLib.Seduction));
    }
    //Slot 7 - Nymphomania
    else if (kGAMECLASS.player.findPerk(PerkLib.CorruptedLibido) >= 0 && kGAMECLASS.player.cor >= 75) {
        _add(new PerkClass(PerkLib.Nymphomania));
    }
    //Slot 7 - UNFINISHED :3
    if (minLust() >= 20 && kGAMECLASS.player.findPerk(PerkLib.CorruptedLibido) >= 0 && kGAMECLASS.player.cor >= 50) {
        _add(new PerkClass(PerkLib.Acclimation));
    }
    //Tier 1 Corruption Perks - acclimation over-rides
    if (kGAMECLASS.player.level >= 6) {
        if (kGAMECLASS.player.cor >= 60 && kGAMECLASS.player.findPerk(PerkLib.CorruptedLibido) >= 0) {
            _add(new PerkClass(PerkLib.Sadist));
        }
        if (kGAMECLASS.player.findPerk(PerkLib.CorruptedLibido) >= 0 && kGAMECLASS.player.cor >= 70) {
            _add(new PerkClass(PerkLib.ArousingAura));
        }
    }
    //Tier 1 Misc Perks
    if (kGAMECLASS.player.level >= 6) {
        _add(new PerkClass(PerkLib.Resistance));
    }
    // FILTER PERKS
    perkList = perkList.filter(
        function (perk: any, idx: number, array: Array<any>): boolean {
            return kGAMECLASS.player.findPerk(perk.perk.ptype) < 0;
        });
    kGAMECLASS.mainView.aCb.dataProvider = new DataProvider(perkList);
    return perkList;
}

export function applyPerk(perk: PerkClass): void {
    clearOutput();
    kGAMECLASS.player.perkPoints--;
    //Apply perk here.
    outputText("<b>" + perk.perkName + "</b> gained!");
    kGAMECLASS.player.createPerk(perk.ptype, perk.value1, perk.value2, perk.value3, perk.value4);
    if (perk.ptype == PerkLib.StrongBack2) kGAMECLASS.player.itemSlot5.unlocked = true;
    if (perk.ptype == PerkLib.StrongBack) kGAMECLASS.player.itemSlot4.unlocked = true;
    if (perk.ptype == PerkLib.Tank2) {
        HPChange(kGAMECLASS.player.tou, false);
        statScreenRefresh();
    }
    doNext(playerMenu);
}

export function buttonText(buttonName: string): string {
    var matches: any,
        buttonIndex: number;

    if (typeof buttonName === "string") {
        if (/^buttons\[[0-9]\]/.test(buttonName)) {
            matches = /^buttons\[([0-9])\]/.exec(buttonName);
            buttonIndex = parseInt(matches[1], 10);
        }
        else if (/^b[0-9]Text$/.test(buttonName)) {
            matches = /^b([0-9])Text$/.exec(buttonName);
            buttonIndex = parseInt(matches[1], 10);

            buttonIndex = buttonIndex === 0 ? 9 : buttonIndex - 1;
        }
    }

    return (kGAMECLASS.mainView.getButtonText(buttonIndex) || "NULL");
}


// Returns a string or undefined.
export function getButtonToolTipText(buttonText: string): string {
    var toolTipText: string;

    buttonText = buttonText || '';

    //Items
    //if (/^....... x\d+$/.test(buttonText)){
    //	buttonText = buttonText.substring(0,7);
    //}

    // Fuck your regex
    if (buttonText.indexOf(" x") != -1) {
        buttonText = buttonText.split(" x")[0];
    }

    var itype: ItemType = ItemType.lookupItem(buttonText);
    if (itype != null) toolTipText = itype.description;
    itype = ItemType.lookupItemByShort(buttonText);
    if (itype != null) toolTipText = itype.description;
    if (buttonText.indexOf("Tail Whip") != -1) {
        toolTipText = "Whip your foe with your tail to enrage them and lower their defense!";
    }
    if (buttonText.indexOf("Dual Belt") != -1) {
        toolTipText = "This is a strange masturbation device, meant to work every available avenue of stimulation.";
    }
    if (buttonText.indexOf("C. Pole") != -1) {
        toolTipText = "This 'centaur pole' as it's called appears to be a sex-toy designed for females of the equine persuasion.  Oddly, it's been sculpted to look like a giant imp, with an even bigger horse-cock.";
    }
    if (buttonText.indexOf("Fake Mare") != -1) {
        toolTipText = "This fake mare is made of metal and wood, but the anatomically correct vagina looks as soft and wet as any female centaur's.";
    }
    //Combat
    //COMBAT
    //combat
    //wombat
    if (buttonText == "Attack") {
        if (!kGAMECLASS.inCombat) toolTipText = "";
        else toolTipText = "Attempt to attack the enemy with your " + kGAMECLASS.player.weaponName + ".  Damage done is determined by your strength and weapon.";
    }
    if (buttonText == "Kiss") {
        toolTipText = "Attempt to kiss your foe on the lips with drugged lipstick.  It has no effect on those without a penis.";
    }
    if (buttonText == "Tease") {
        if (!kGAMECLASS.inCombat) toolTipText = "";
        else toolTipText = "Attempt to make an enemy more aroused by striking a seductive pose and exposing parts of your body.";
    }
    if (buttonText == "Kick") {
        toolTipText = "Attempt to kick an enemy using your powerful lower body.";
    }
    if (buttonText == "Combo") {
        toolTipText = "Make a three-hit combo.  Each attack has an extra 33% chance to miss, unless the target is blind. (25 Fatigue)";
    }
    if (buttonText == "Vault") {
        toolTipText = "Make a vaulting attack for an extra 25% damage.  Automatically crits stunned foes.  (20 Fatigue)";
    }
    if (buttonText == "Sidewinder") {
        toolTipText = "An attack that hits for reduced damage but has a high chance of stunning. (10 Fatigue)";
    }
    if (buttonText == "Dirt Kick") {
        toolTipText = "Attempt to blind your foe with a spray of kicked dirt. (5 Fatigue)";
    }
    if (buttonText == "Metabolize") {
        toolTipText = "Convert 10% of your maximum HP into fatigue.";
    }
    if (buttonText == "SecondWind") {
        toolTipText = "Regain 50% of your HP, 50 fatigue, and reduce lust by 50 once per fight.";
    }
    if (buttonText.indexOf("AnemoneSting") != -1) {
        toolTipText = "Attempt to strike an opponent with the stinging tentacles growing from your scalp.  Reduces enemy speed and increases enemy lust.";
    }
    if (buttonText.indexOf("P. Specials") != -1) {
        toolTipText = "Physical special attack menu.";
    }
    if (buttonText.indexOf("M. Specials") != -1) {
        toolTipText = "Mental and supernatural special attack menu.";
    }
    if (buttonText == "Berzerk") {
        toolTipText = "Throw yourself into a rage!  Greatly increases the strength of your weapon and increases lust resistance, but your armor defense is reduced to zero!";
    }
    if (buttonText.indexOf("Possess") != -1) {
        toolTipText = "Attempt to temporarily possess a foe and force them to raise their own lusts.";
    }
    if (buttonText.indexOf("Constrict") != -1) {
        toolTipText = "Attempt to bind an enemy in your long snake-tail.";
    }
    if (buttonText.indexOf("Gore") != -1) {
        toolTipText = "Lower your head and charge your opponent, attempting to gore them on your horns.  This attack is stronger and easier to land with large horns.";
    }
    if (buttonText.indexOf("Fantasize") != -1) {
        toolTipText = "Fantasize about your opponent in a sexual way.  It's probably a pretty bad idea to do this unless you want to end up getting raped.";
    }
    if (buttonText.indexOf("Charge W.") != -1) {
        toolTipText = "The Charge Weapon spell will surround your weapon in electrical energy, causing it to do even more damage.  The effect lasts for the entire combat.  (Fatigue Cost: " + spellCost(15) + ")";
    }
    if (buttonText.indexOf("Blind") != -1) {
        toolTipText = "Blind is a fairly self-explanatory spell.  It will create a bright flash just in front of the victim's eyes, blinding them for a time.  However if they blink it will be wasted.  (Fatigue Cost: " + spellCost(20) + ")";
    }
    if (buttonText.indexOf("Whitefire") != -1) {
        toolTipText = "Whitefire is a potent fire based attack that will burn your foe with flickering white flames, ignoring their physical toughness and most armors.  (Fatigue Cost: " + spellCost(30) + ")";
    }
    if (buttonText.indexOf("Aroused") != -1) {
    }
    if (buttonText.indexOf("Arouse") != -1) {
        if (!kGAMECLASS.inCombat) toolTipText = "";
        else toolTipText = "The arouse spell draws on your own inner lust in order to enflame the enemy's passions.  (Fatigue Cost: " + spellCost(15) + ")";
    }
    if (buttonText == "Heal") {
        toolTipText = "Heal will attempt to use black magic to close your wounds and restore your body, however like all black magic used on yourself, it has a chance of backfiring and greatly arousing you.  (Fatigue Cost: " + spellCost(20) + ")";
    }
    if (buttonText.indexOf("Might") != -1) {
        toolTipText = "The Might spell draws upon your lust and uses it to fuel a temporary increase in muscle size and power.  It does carry the risk of backfiring and raising lust, like all black magic used on oneself.  (Fatigue Cost: " + spellCost(25) + ")";
    }
    //Wait
    if (buttonText.indexOf("Wait") != -1 && kGAMECLASS.inCombat) {
        toolTipText = "Take no action for this round.  Why would you do this?  This is a terrible idea.";
    }
    //Sting
    if (buttonText.length == 5 && buttonText.indexOf("Sting") != -1) {
        toolTipText = "Attempt to use your venomous bee stinger on an enemy.  Be aware it takes quite a while for your venom to build up, so depending on your abdomen's refractory period, you may have to wait quite a while between stings.  Venom: " + Math.floor(kGAMECLASS.player.tailVenom) + "/100";
    }
    //Web
    if (buttonText.indexOf("Web") != -1) {
        toolTipText = "Attempt to use your abdomen to spray sticky webs at an enemy and greatly slow them down.  Be aware it takes a while for your webbing to build up.  Web Amount: " + Math.floor(kGAMECLASS.player.tailVenom) + "/100";
    }
    if (buttonText.indexOf("Infest") != -1) {
        toolTipText = "The infest attack allows you to cum at will, launching a stream of semen and worms at your opponent in order to infest them.  Unless your foe is very aroused they are likely to simply avoid it.  Only works on males or herms.";
    }
    if (buttonText.indexOf("Spells") != -1) {
        toolTipText = "Opens your spells menu, where you can cast any spells you have learned.  Beware, casting spells increases your fatigue, and if you become exhausted you will be easier to defeat.";
    }
    if (buttonText.indexOf("Defend") != -1) {
        toolTipText = "Selecting defend will reduce the damage you take by 66 percent, but will not affect any lust incurred by your enemy's actions.";
    }
    if (buttonText == "Run") {
        toolTipText = "Choosing to run will let you try to escape from your enemy. However, it will be hard to escape enemies that are faster than you and if you fail, your enemy will get a free attack.";
    }
    if (buttonText.indexOf("Inventory") != -1) {
        toolTipText = "The inventory allows you to use an item.  Be careful as this leaves you open to a counterattack when in combat.";
    }
    if (buttonText.indexOf("AutoSav") != -1) {
        toolTipText = "When autosave is on the game will automatically save your character each night at midnight to the last slot it was saved in.";
        if (buttonText.indexOf("ON") != -1) toolTipText += " Autosave is currently enabled.  Your game will be saved at midnight.";
        if (buttonText.indexOf("OFF") != -1) toolTipText += " Autosave is currently off.  Your game will NOT be saved.";
    }
    if (buttonText.indexOf("Retrieve") != -1) {
        toolTipText = "Retrieve allows you to take an item from one of the reserve stacks in your camp's additional storage.";
    }
    if (buttonText.indexOf("Storage") != -1) {
        toolTipText = "Storage will allow you to dump a stack of items from your inventory into your storage chest.";
    }
    if (buttonText.indexOf("Sand Facial") != -1) {
        toolTipText = "The goblins promise this facial will give you a rough, handsome look thanks to their special, timeless sands.";
    }
    if (buttonText.indexOf("Mud Facial") != -1) {
        toolTipText = "This facial is supposed to enhance the softness of your face and enhance its femininity greatly.";
    }
    //Masturbation Toys
    if (buttonText == "Masturbate") {
        toolTipText = "Selecting this option will make you attempt to manually masturbate in order to relieve your lust buildup.";
    }
    if (buttonText == "Meditate") {
        toolTipText = "Selecting this option will make you attempt to meditate in order to reduce lust and corruption.";
    }
    if (buttonText.indexOf("AN Stim-Belt") != -1) {
        toolTipText = "This is an all-natural self-stimulation belt.  The methods used to create such a pleasure device are unknown.  It seems to be organic in nature.";
    }
    if (buttonText.indexOf("Stim-Belt") != -1) {
        toolTipText = "This is a self-stimulation belt.  Commonly referred to as stim-belts, these are clockwork devices designed to pleasure the female anatomy.";
    }
    if (buttonText.indexOf("AN Onahole") != -1) {
        toolTipText = "An all-natural onahole, this device looks more like a bulbous creature than a sex-toy.  Nevertheless, the slick orifice it presents looks very inviting.";
    }
    if (buttonText.indexOf("D Onahole") != -1) {
        toolTipText = "This is a deluxe onahole, made of exceptional materials and with the finest craftsmanship in order to bring its user to the height of pleasure.";
    }
    if (buttonText.indexOf("Onahole") != -1) {
        toolTipText = "This is what is called an 'onahole'.  This device is a simple textured sleeve designed to fit around the male anatomy in a pleasurable way.";
    }
    if (buttonText == "Jojo") {
        if (kGAMECLASS.monk >= 5) toolTipText = "Call your corrupted pet into camp in order to relieve your desires in a variety of sexual positions?  He's ever so willing after your last encounter with him.";
        else toolTipText = "Go find Jojo around the edges of your camp and meditate with him or talk about watch duty.";
    }
    if (buttonText == "Marble") {
        toolTipText = "Go to Marble the cowgirl for talk and companionship.";
    }
    //Books
    if (buttonText.indexOf("Dangerous Plants") != -1) {
        toolTipText = "This is a book titled 'Dangerous Plants'.  As explained by the title, this tome is filled with information on all manner of dangerous plants from this realm.";
    }
    if (buttonText.indexOf("Traveler's Guide") != -1) {
        toolTipText = "This traveler's guide is more of a pamphlet than an actual book, but it still contains some useful information on avoiding local pitfalls.";
    }
    if (buttonText.indexOf("Yoga Guide") != -1) {
        toolTipText = "This leather-bound book is titled 'Yoga for Non-Humanoids.' It contains numerous illustrations of centaurs, nagas and various other oddly-shaped beings in a variety of poses.";
    }
    if (buttonText.indexOf("Hentai Comic") != -1) {
        toolTipText = "This oddly drawn comic book is filled with images of fornication, sex, and overly large eyeballs.";
    }
    //CAMP STUFF
    if (buttonText.indexOf("Followers") != -1) {
        toolTipText = "Check up on any followers or companions who are joining you in or around your camp.  You'll probably just end up sleeping with them.";
    }
    //Marble
    if (buttonText.indexOf("Marble (Sex)") != -1) {
        toolTipText = "Get with Marble for a quick cuddle and some sex.";
    }
    //Rathazul
    if (buttonText.indexOf("Rathazul") != -1) {
        toolTipText = "Visit with Rathazul to see what alchemical supplies and services he has available at the moment.";
    }
    //Title screen
    if (buttonText.indexOf("Toggle Debug") != -1) {
        toolTipText = "Turn on debug mode.  Debug mode is intended for testing purposes but can be thought of as a cheat mode.  Items are infinite and combat is easy to escape from.  Weirdness and bugs are to be expected.";
    }
    if (buttonText.indexOf("Credits") != -1) {
        toolTipText = "See a list of all the cool people who have contributed to content for this game!";
    }
    if (buttonText.indexOf("Instructions") != -1) {
        toolTipText = "How to play.  Starting tips.  And hotkeys for easy left-handed play...";
    }
    if (buttonText.indexOf("Settings") != -1) {
        toolTipText = "Configure game settings and enable cheats.";
    }
    if (buttonText.indexOf("ASPLODE") != -1) {
        toolTipText = "MAKE SHIT ASPLODE";
    }
    return toolTipText;
}

export function addButton(pos: number, text: string = "", func1: Function = null, arg1?: any): void {
    if (func1 == null) return;
    var callback: Function;
    var toolTipText: string;
    callback = () => { func1(arg1) };


    toolTipText = getButtonToolTipText(text);
    kGAMECLASS.mainView.showBottomButton(pos, text, callback, toolTipText);
    flushOutputTextToGUI();
}

export function hasButton(arg: any): boolean {
    if (typeof arg === "string")
        return kGAMECLASS.mainView.hasButton(arg as string);
    else
        return false;
}

export function removeButton(arg: any): void {
    function _removeButtonAction(index: number): void	// Uh... should this function be empty?
    {
        // funcs[ index ] = null;
        // args[ index ] = -9000;
    }

    var buttonToRemove: number = 0;
    if (typeof arg === "string") {
        buttonToRemove = kGAMECLASS.mainView.indexOfButtonWithLabel(arg as string);
    }
    if (typeof arg === "number") {
        if (arg < 0 || arg > 9) return;
        buttonToRemove = Math.round(arg);
    }

    // _removeButtonAction( buttonToRemove );
    kGAMECLASS.mainView.hideBottomButton(buttonToRemove);
}

export function menu(): void { //The newer, simpler menu - blanks all buttons so addButton can be used
    kGAMECLASS.mainView.hideBottomButton(0);
    kGAMECLASS.mainView.hideBottomButton(1);
    kGAMECLASS.mainView.hideBottomButton(2);
    kGAMECLASS.mainView.hideBottomButton(3);
    kGAMECLASS.mainView.hideBottomButton(4);
    kGAMECLASS.mainView.hideBottomButton(5);
    kGAMECLASS.mainView.hideBottomButton(6);
    kGAMECLASS.mainView.hideBottomButton(7);
    kGAMECLASS.mainView.hideBottomButton(8);
    kGAMECLASS.mainView.hideBottomButton(9);
    flushOutputTextToGUI();
}



export function choices(text1: string, butt1: Function,
    text2: string, butt2: Function,
    text3: string, butt3: Function,
    text4: string, butt4: Function,
    text5: string, butt5: Function,
    text6: string, butt6: Function,
    text7: string, butt7: Function,
    text8: string, butt8: Function,
    text9: string, butt9: Function,
    text0: string, butt0: Function): void { //New typesafe version

    menu();
    addButton(0, text1, butt1);
    addButton(1, text2, butt2);
    addButton(2, text3, butt3);
    addButton(3, text4, butt4);
    addButton(4, text5, butt5);
    addButton(5, text6, butt6);
    addButton(6, text7, butt7);
    addButton(7, text8, butt8);
    addButton(8, text9, butt9);
    addButton(9, text0, butt0);
}

/****
	This function is made for multipage menus of unpredictable length,
	say a collection of items or places or people that can change
	depending on certain events, past choices, the time of day, or whatever.

	This is not the best for general menu use.  Use choices() for that.

	This is a bit confusing, so here's usage instructions.
	Pay attention to all the braces.

	This is made to be used with an array that you create before calling it,
	so that you can push as many items on to that array as you like
	before passing that array off to this function.

	So you can do something like this:
		var itemsInStorage : Array<any> = new Array();

		// The extra square braces are important.
		itemsInStorage.push( [ "Doohicky", useDoohickyFunc ] );
		itemsInStorage.push( [ "Whatsit", useWhatsitFunc ] );
		itemsInStorage.push( [ "BagOfDicks", eatBagOfDicks ] );
		...

		// see notes about cancelFunc
		multipageChoices( cancelFunc, itemsInStorage );

	cancelfunc is a function (A button event function, specifically)
	that exits the menu.  Provide this if you want a Back button to appear
	in the bottom right.

	If you do not need a cancel function, perhaps because some or all
	of the choices will exit the menu, then you can
	pass null or 0 for the cancelFunction.

		// This menu shows no Back button.
		multipageChoices( null, itemsInStorage );

	You can call it directly if you want, but that's ridiculous.
		multipageChoices( justGoToCamp, [
			[ "Do this", doThisEvent ],
			[ "Do that", doThatEvent ],
			[ "Do something", doSomethingEvent ],
			[ "Fap", goFapEvent ],
			[ "Rape Jojo", jojoRape ],
			// ... more items here...
			[ "What", goWhat ],
			[ "Margle", gurgleFluidsInMouthEvent ] // no comma on last item.
		]);
****/
export function multipageChoices(cancelFunction: any, menuItems: Array<any>): void {
    const itemsPerPage: number = 8;

    var currentPageIndex: number;
    var pageCount: number;

    function getPageOfItems(pageIndex: number): Array<any> {
        var startItemIndex: number = pageIndex * itemsPerPage;

        return menuItems.slice(startItemIndex, startItemIndex + itemsPerPage);
    }

    function flatten(pageItems: Array<any>): Array<any> {
        var i: number, l: number;
        var flattenedItems: Array<any> = [];

        for (i = 0, l = pageItems.length; i < l; ++i) {
            flattenedItems = flattenedItems.concat(pageItems[i]);
        }

        return flattenedItems;
    }

    function showNextPage(): void {
        showPage((currentPageIndex + 1) % pageCount);
    }

    function showPage(pageIndex: number): void {
        var currentPageItems: Array<any>; // holds the current page of items.

        if (pageIndex < 0)
            pageIndex = 0;
        if (pageIndex >= pageCount)
            pageIndex = pageCount - 1;

        currentPageIndex = pageIndex;
        currentPageItems = getPageOfItems(pageIndex);

        // I did it this way so as to use only one actual menu setting function.
        // I figured it was safer until the menu functions stabilize.

        // insert page functions.
        // First pad out the items so it's always in a predictable state.
        while (currentPageItems.length < 8) {
            currentPageItems.push(["", 0]);
        }

        // Insert next button.
        currentPageItems.splice(4, 0, [
            "See page " +
            (((currentPageIndex + 1) % pageCount) + 1) + // A compelling argument for 1-indexing?
            '/' +
            (pageCount),
            pageCount > 1 ? showNextPage : 0
            // "Next Page", pageCount > 1 ? showNextPage : 0
        ]);

        // Cancel/Back button always appears in bottom right, like in the inventory.
        currentPageItems.push([
            "Back", cancelFunction || 0
        ]);

        choices.apply(null, flatten(currentPageItems));
    }

    pageCount = Math.ceil(menuItems.length / itemsPerPage);

    if (typeof cancelFunction != 'function')
        cancelFunction = 0;

    showPage(0);
}

// simpleChoices and doYesNo are convenience functions. They shouldn't re-implement code from choices()
export function simpleChoices(text1: string, butt1: Function,
    text2: string, butt2: Function,
    text3: string, butt3: Function,
    text4: string, butt4: Function,
    text5: string, butt5: Function): void { //New typesafe version

    //trace("SimpleChoices");
    /*	choices(text1,butt1,
                text2,butt2,
                text3,butt3,
                text4,butt4,
                text5,butt5,
                "",0,
                "",0,
                "",0,
                "",0,
                "",0);*/
    menu();
    addButton(0, text1, butt1);
    addButton(1, text2, butt2);
    addButton(2, text3, butt3);
    addButton(3, text4, butt4);
    addButton(4, text5, butt5);
}

export function doYesNo(eventYes: Function, eventNo: Function): void { //New typesafe version
    menu();
    addButton(0, "Yes", eventYes);
    addButton(1, "No", eventNo);
    /*
        //Make buttons 1-2 visible and hide the rest.
    
        //trace("doYesNo");
        choices("Yes",eventYes,
                "No",eventNo,
                "",0,
                "",0,
                "",0,
                "",0,
                "",0,
                "",0,
                "",0,
                "",0);
    
    }
    */
}

export function doNext(event: Function): void { //Now typesafe
    //Prevent new events in combat from automatically overwriting a game over. 
    if (kGAMECLASS.mainView.getButtonText(0).indexOf("Game Over") != -1) {
        trace("Do next setup cancelled by game over");
        return;
    }

    //trace("DoNext have item:", eventNo);
    //choices("Next", event, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0); 
    menu();
    addButton(0, "Next", event);
}

/* Was never called
export function doNextClear(eventNo: any):void 
{
	outputText("", true, true);
	//trace("DoNext Clearing display");
	//trace("DoNext have item:", eventNo);
	choices("Next", eventNo, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0);
}
*/

export function invertGo(): void {
    kGAMECLASS.mainView.invert();
}

//Used to update the display of statistics
export function statScreenRefresh(): void {
    kGAMECLASS.mainView.statsView.show(); // show() method refreshes.
}

export function showStats(): void {
    kGAMECLASS.mainView.statsView.show();
}

export function hideStats(): void {
    kGAMECLASS.mainView.statsView.hide();
}

export function hideMenus(): void {
    kGAMECLASS.mainView.hideAllMenuButtons();
}

//Hide the up/down indicators
export function hideUpDown(): void {
    kGAMECLASS.mainView.statsView.hideUpDown();

    //Clear storage values so up/down arrows can be properly displayed
    kGAMECLASS.oldStats.oldStr = 0;
    kGAMECLASS.oldStats.oldTou = 0;
    kGAMECLASS.oldStats.oldSpe = 0;
    kGAMECLASS.oldStats.oldInte = 0;
    kGAMECLASS.oldStats.oldLib = 0;
    kGAMECLASS.oldStats.oldSens = 0;
    kGAMECLASS.oldStats.oldLust = 0;
    kGAMECLASS.oldStats.oldCor = 0;
}

export function physicalCost(mod: number): number {
    var costPercent: number = 100;
    if (kGAMECLASS.player.findPerk(PerkLib.IronMan) >= 0) costPercent -= 50;
    mod *= costPercent / 100;
    return mod;
}

export function spellCost(mod: number): number {
    //Addiditive mods
    var costPercent: number = 100;
    if (kGAMECLASS.player.findPerk(PerkLib.SpellcastingAffinity) >= 0) costPercent -= kGAMECLASS.player.perkv1(PerkLib.SpellcastingAffinity);
    if (kGAMECLASS.player.findPerk(PerkLib.WizardsEndurance) >= 0) costPercent -= kGAMECLASS.player.perkv1(PerkLib.WizardsEndurance);

    //Limiting it and multiplicative mods
    if (kGAMECLASS.player.findPerk(PerkLib.BloodMage) >= 0 && costPercent < 50) costPercent = 50;

    mod *= costPercent / 100;

    if (kGAMECLASS.player.findPerk(PerkLib.HistoryScholar) >= 0) {
        if (mod > 2) mod *= .8;
    }
    if (kGAMECLASS.player.findPerk(PerkLib.BloodMage) >= 0 && mod < 5) mod = 5;
    else if (mod < 2) mod = 2;

    mod = Math.round(mod * 100) / 100;
    return mod;
}

//Modify fatigue
//types:
//        0 - normal
//        1 - magic
export function fatigue(mod: number, type: number = 0): void {
    //Spell reductions
    if (type == 1) {
        mod = spellCost(mod);

        //Blood mages use HP for spells
        if (kGAMECLASS.player.findPerk(PerkLib.BloodMage) >= 0) {
            takeDamage(mod);
            statScreenRefresh();
            return;
        }
    }
    //Physical special reductions
    if (type == 2) {
        mod = physicalCost(mod);
    }
    if (kGAMECLASS.player.fatigue >= 100 && mod > 0) return;
    if (kGAMECLASS.player.fatigue <= 0 && mod < 0) return;
    //Fatigue restoration buffs!
    if (mod < 0) {
        var multi: number = 1;

        if (kGAMECLASS.player.findPerk(PerkLib.HistorySlacker) >= 0) multi += 0.2;
        if (kGAMECLASS.player.findPerk(PerkLib.ControlledBreath) >= 0 && kGAMECLASS.player.cor < 30) multi += 0.1;

        mod *= multi;
    }
    kGAMECLASS.player.fatigue += mod;
    if (mod > 0) {
        kGAMECLASS.mainView.statsView.showStatUp('fatigue');
        // fatigueUp.visible = true;
        // fatigueDown.visible = false;
    }
    if (mod < 0) {
        kGAMECLASS.mainView.statsView.showStatDown('fatigue');
        // fatigueDown.visible = true;
        // fatigueUp.visible = false;
    }
    if (kGAMECLASS.player.fatigue > 100) kGAMECLASS.player.fatigue = 100;
    if (kGAMECLASS.player.fatigue < 0) kGAMECLASS.player.fatigue = 0;
    statScreenRefresh();
}
//function changeFatigue
export function changeFatigue(changeF: number): void {
    fatigue(changeF);
}
export function minLust(): number {
    return kGAMECLASS.player.minLust();
}

export function displayStats(e: MouseEvent = null): void {
    spriteSelect(-1);
    outputText("", true);

    // Begin Combat Stats
    var combatStats: string = "";
    if (kGAMECLASS.player.hasKeyItem("Bow") >= 0)
        combatStats += "<b>Bow Skill:</b> " + Math.round(kGAMECLASS.player.statusAffectv1(StatusAffects.Kelt)) + "\n";

    combatStats += "<b>Lust Resistance:</b> " + (100 - Math.round(lustPercent())) + "% (Higher is better.)\n";

    combatStats += "<b>Spell Effect Multiplier:</b> " + (100 * spellMod()) + "%\n";

    combatStats += "<b>Spell Cost:</b> " + spellCost(100) + "%\n";

    if (kGAMECLASS.flags[kFLAGS.RAPHAEL_RAPIER_TRANING] > 0)
        combatStats += "<b>Rapier Skill (Out of 4):</b> " + kGAMECLASS.flags[kFLAGS.RAPHAEL_RAPIER_TRANING] + "\n";

    combatStats += "<b>Tease Skill (Out of 5):</b>  " + kGAMECLASS.player.teaseLevel + "\n";

    if (combatStats != "")
        outputText("<b><u>Combat Stats</u></b>\n" + combatStats, false);
    // End Combat Stats

    // Begin Children Stats
    var childStats: string = "";

    if (kGAMECLASS.player.statusAffectv1(StatusAffects.Birthed) > 0)
        childStats += "<b>Times Given Birth:</b> " + kGAMECLASS.player.statusAffectv1(StatusAffects.Birthed) + "\n";

    if (kGAMECLASS.flags[kFLAGS.AMILY_MET] > 0)
        childStats += "<b>Litters With Amily:</b> " + (kGAMECLASS.flags[kFLAGS.AMILY_BIRTH_TOTAL] + kGAMECLASS.flags[kFLAGS.PC_TIMES_BIRTHED_AMILYKIDS]) + "\n";

    if (kGAMECLASS.flags[kFLAGS.BENOIT_EGGS] > 0)
        childStats += "<b>Benoit Eggs Laid:</b> " + kGAMECLASS.flags[kFLAGS.BENOIT_EGGS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.COTTON_KID_COUNT] > 0)
        childStats += "<b>Children With Cotton:</b> " + kGAMECLASS.flags[kFLAGS.COTTON_KID_COUNT] + "\n";

    if (kGAMECLASS.flags[kFLAGS.EDRYN_NUMBER_OF_KIDS] > 0)
        childStats += "<b>Children With Edryn:</b> " + kGAMECLASS.flags[kFLAGS.EDRYN_NUMBER_OF_KIDS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.EMBER_CHILDREN_MALES] > 0)
        childStats += "<b>Ember Offspring (Males):</b> " + kGAMECLASS.flags[kFLAGS.EMBER_CHILDREN_MALES] + "\n";
    if (kGAMECLASS.flags[kFLAGS.EMBER_CHILDREN_FEMALES] > 0)
        childStats += "<b>Ember Offspring (Females):</b> " + kGAMECLASS.flags[kFLAGS.EMBER_CHILDREN_FEMALES] + "\n";
    if (kGAMECLASS.flags[kFLAGS.EMBER_CHILDREN_HERMS] > 0)
        childStats += "<b>Ember Offspring (Herms):</b> " + kGAMECLASS.flags[kFLAGS.EMBER_CHILDREN_HERMS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.EMBER_EGGS] > 0)
        childStats += "<b>Ember Eggs Produced:</b> " + kGAMECLASS.flags[kFLAGS.EMBER_EGGS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] > 0)
        childStats += "<b>Children With Izma (Sharkgirls):</b> " + kGAMECLASS.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0)
        childStats += "<b>Children With Izma (Tigersharks):</b> " + kGAMECLASS.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.KELLY_KIDS_MALE] > 0)
        childStats += "<b>Children With Kelly (Males):</b> " + kGAMECLASS.flags[kFLAGS.KELLY_KIDS_MALE] + "\n";

    if (kGAMECLASS.flags[kFLAGS.KELLY_KIDS] - kGAMECLASS.flags[kFLAGS.KELLY_KIDS_MALE] > 0)
        childStats += "<b>Children With Kelly (Females):</b> " + (kGAMECLASS.flags[kFLAGS.KELLY_KIDS] - kGAMECLASS.flags[kFLAGS.KELLY_KIDS_MALE]) + "\n";

    if (kGAMECLASS.mountain.salon.lynnetteApproval() != 0)
        childStats += "<b>Lynnette Children:</b> " + kGAMECLASS.flags[kFLAGS.LYNNETTE_BABY_COUNT] + "\n";

    if (kGAMECLASS.flags[kFLAGS.MARBLE_KIDS] > 0)
        childStats += "<b>Children With Marble:</b> " + kGAMECLASS.flags[kFLAGS.MARBLE_KIDS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.ANT_KIDS] > 0)
        childStats += "<b>Ant Children With Phylla:</b> " + kGAMECLASS.flags[kFLAGS.ANT_KIDS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.PHYLLA_DRIDER_BABIES_COUNT] > 0)
        childStats += "<b>Drider Children With Phylla:</b> " + kGAMECLASS.flags[kFLAGS.PHYLLA_DRIDER_BABIES_COUNT] + "\n";

    if (kGAMECLASS.flags[kFLAGS.SHEILA_JOEYS] > 0)
        childStats += "<b>Children With Sheila (Joeys):</b> " + kGAMECLASS.flags[kFLAGS.SHEILA_JOEYS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.SHEILA_IMPS] > 0)
        childStats += "<b>Children With Sheila (Imps):</b> " + kGAMECLASS.flags[kFLAGS.SHEILA_IMPS] + "\n";

    if (kGAMECLASS.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 0 || kGAMECLASS.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) {
        childStats += "<b>Children With Sophie:</b> ";
        var sophie: number = 0;
        if (kGAMECLASS.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) sophie++;
        sophie += kGAMECLASS.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT];
        if (kGAMECLASS.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] > 0) sophie++;
        childStats += sophie + "\n";
    }

    if (kGAMECLASS.flags[kFLAGS.SOPHIE_EGGS_LAID] > 0)
        childStats += "<b>Eggs Fertilized For Sophie:</b> " + (kGAMECLASS.flags[kFLAGS.SOPHIE_EGGS_LAID] + sophie) + "\n";

    if (kGAMECLASS.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] > 0)
        childStats += "<b>Children With Tamani:</b> " + kGAMECLASS.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] + " (after all forms of natural selection)\n";

    if (kGAMECLASS.urtaPregs.urtaKids() > 0)
        childStats += "<b>Children With Urta:</b> " + kGAMECLASS.urtaPregs.urtaKids() + "\n";

    //Mino sons
    if (kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 0)
        childStats += "<b>Number of Adult Minotaur Offspring:</b> " + kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] + "\n";

    if (childStats != "")
        outputText("\n<b><u>Children</u></b>\n" + childStats, false);
    // End Children Stats

    // Begin Body Stats
    var bodyStats: string = "";

    bodyStats += "<b>Anal Capacity:</b> " + Math.round(kGAMECLASS.player.analCapacity()) + "\n";
    bodyStats += "<b>Anal Looseness:</b> " + Math.round(kGAMECLASS.player.ass.analLooseness) + "\n";

    bodyStats += "<b>Fertility (Base) Rating:</b> " + Math.round(kGAMECLASS.player.fertility) + "\n";
    bodyStats += "<b>Fertility (With Bonuses) Rating:</b> " + Math.round(kGAMECLASS.player.totalFertility()) + "\n";

    if (kGAMECLASS.player.cumQ() > 0)
        bodyStats += "<b>Cum Production:</b> " + Math.round(kGAMECLASS.player.cumQ()) + "mL\n";
    if (kGAMECLASS.player.lactationQ() > 0)
        bodyStats += "<b>Milk Production:</b> " + Math.round(kGAMECLASS.player.lactationQ()) + "mL\n";

    if (kGAMECLASS.player.findStatusAffect(StatusAffects.Feeder) >= 0) {
        bodyStats += "<b>Hours Since Last Time Breastfed Someone:</b>  " + kGAMECLASS.player.statusAffectv2(StatusAffects.Feeder);
        if (kGAMECLASS.player.statusAffectv2(StatusAffects.Feeder) >= 72)
            bodyStats += " (Too long! Sensitivity Increasing!)";

        bodyStats += "\n";
    }

    bodyStats += "<b>Pregnancy Speed Multiplier:</b> ";
    var preg: number = 1;
    if (kGAMECLASS.player.findPerk(PerkLib.Diapause) >= 0)
        bodyStats += "? (Variable due to Diapause)\n";
    else {
        if (kGAMECLASS.player.findPerk(PerkLib.MaraesGiftFertility) >= 0) preg++;
        if (kGAMECLASS.player.findPerk(PerkLib.BroodMother) >= 0) preg++;
        if (kGAMECLASS.player.findPerk(PerkLib.FerasBoonBreedingBitch) >= 0) preg++;
        if (kGAMECLASS.player.findPerk(PerkLib.MagicalFertility) >= 0) preg++;
        if (kGAMECLASS.player.findPerk(PerkLib.FerasBoonWideOpen) >= 0 || kGAMECLASS.player.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0) preg++;
        bodyStats += preg + "\n";
    }

    if (kGAMECLASS.player.cocks.length > 0) {
        bodyStats += "<b>Total Cocks:</b> " + kGAMECLASS.player.cocks.length + "\n";

        var totalCockLength: number = 0;
        var totalCockGirth: number = 0;

        for (var i: number = 0; i < kGAMECLASS.player.cocks.length; i++) {
            totalCockLength += kGAMECLASS.player.cocks[i].cockLength;
            totalCockGirth += kGAMECLASS.player.cocks[i].cockThickness
        }

        bodyStats += "<b>Total Cock Length:</b> " + Math.round(totalCockLength) + " inches\n";
        bodyStats += "<b>Total Cock Girth:</b> " + Math.round(totalCockGirth) + " inches\n";

    }

    if (kGAMECLASS.player.vaginas.length > 0)
        bodyStats += "<b>Vaginal Capacity:</b> " + Math.round(kGAMECLASS.player.vaginalCapacity()) + "\n" + "<b>Vaginal Looseness:</b> " + Math.round(kGAMECLASS.player.looseness()) + "\n";

    if (kGAMECLASS.player.findPerk(PerkLib.SpiderOvipositor) >= 0 || kGAMECLASS.player.findPerk(PerkLib.BeeOvipositor) >= 0)
        bodyStats += "<b>Ovipositor Total Egg Count: " + kGAMECLASS.player.eggs() + "\nOvipositor Fertilized Egg Count: " + kGAMECLASS.player.fertilizedEggs() + "</b>\n";

    if (kGAMECLASS.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0) {
        if (kGAMECLASS.player.statusAffectv1(StatusAffects.SlimeCraving) >= 18)
            bodyStats += "<b>Slime Craving:</b> Active! You are currently losing strength and speed.  You should find fluids.\n";
        else {
            if (kGAMECLASS.player.findPerk(PerkLib.SlimeCore) >= 0)
                bodyStats += "<b>Slime Stored:</b> " + ((17 - kGAMECLASS.player.statusAffectv1(StatusAffects.SlimeCraving)) * 2) + " hours until you start losing strength.\n";
            else
                bodyStats += "<b>Slime Stored:</b> " + (17 - kGAMECLASS.player.statusAffectv1(StatusAffects.SlimeCraving)) + " hours until you start losing strength.\n";
        }
    }

    if (bodyStats != "")
        outputText("\n<b><u>Body Stats</u></b>\n" + bodyStats, false);
    // End Body Stats

    // Begin Misc Stats
    var miscStats: string = "";

    if (kGAMECLASS.flags[kFLAGS.EGGS_BOUGHT] > 0)
        miscStats += "<b>Eggs Traded For:</b> " + kGAMECLASS.flags[kFLAGS.EGGS_BOUGHT] + "\n";

    if (kGAMECLASS.flags[kFLAGS.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] > 0)
        miscStats += "<b>Times Had Fun with Feline Flexibility:</b> " + kGAMECLASS.flags[kFLAGS.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] + "\n";

    if (kGAMECLASS.flags[kFLAGS.FAP_ARENA_SESSIONS] > 0)
        miscStats += "<b>Times Circle Jerked in the Arena:</b> " + kGAMECLASS.flags[kFLAGS.FAP_ARENA_SESSIONS] + "\n<b>Victories in the Arena:</b> " + kGAMECLASS.flags[kFLAGS.FAP_ARENA_VICTORIES] + "\n";

    if (kGAMECLASS.flags[kFLAGS.SPELLS_CAST] > 0)
        miscStats += "<b>Spells Cast:</b> " + kGAMECLASS.flags[kFLAGS.SPELLS_CAST] + "\n";

    if (miscStats != "")
        outputText("\n<b><u>Miscellaneous Stats</u></b>\n" + miscStats);
    // End Misc Stats

    // Begin Addition Stats
    var addictStats: string = "";
    //Marble Milk Addition
    if (kGAMECLASS.player.statusAffectv3(StatusAffects.Marble) > 0) {
        addictStats += "<b>Marble Milk:</b> ";
        if (kGAMECLASS.player.findPerk(PerkLib.MarbleResistant) < 0 && kGAMECLASS.player.findPerk(PerkLib.MarblesMilk) < 0)
            addictStats += Math.round(kGAMECLASS.player.statusAffectv2(StatusAffects.Marble)) + "%\n";
        else if (kGAMECLASS.player.findPerk(PerkLib.MarbleResistant) >= 0)
            addictStats += "0%\n";
        else
            addictStats += "100%\n";
    }

    // Mino Cum Addiction
    if (kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00340] > 0 || kGAMECLASS.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] > 0 || kGAMECLASS.player.findPerk(PerkLib.MinotaurCumAddict) >= 0) {
        if (kGAMECLASS.player.findPerk(PerkLib.MinotaurCumAddict) < 0)
            addictStats += "<b>Minotaur Cum:</b> " + Math.round(kGAMECLASS.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] * 10) / 10 + "%\n";
        else
            addictStats += "<b>Minotaur Cum:</b> 100+%\n";
    }

    if (addictStats != "")
        outputText("\n<b><u>Addictions</u></b>\n" + addictStats, false);
    // End Addition Stats

    // Begin Interpersonal Stats
    var interpersonStats: string = "";

    if (kGAMECLASS.flags[kFLAGS.ARIAN_PARK] > 0)
        interpersonStats += "<b>Arian's Health:</b> " + Math.round(kGAMECLASS.arianScene.arianHealth()) + "\n";

    if (kGAMECLASS.flags[kFLAGS.ARIAN_VIRGIN] > 0)
        interpersonStats += "<b>Arian Sex Counter:</b> " + Math.round(kGAMECLASS.flags[kFLAGS.ARIAN_VIRGIN]) + "\n";

    if (kGAMECLASS.bazaar.benoit.benoitAffection() > 0)
        interpersonStats += "<b>" + kGAMECLASS.bazaar.benoit.benoitMF("Benoit", "Benoite") + " Affection:</b> " + Math.round(kGAMECLASS.bazaar.benoit.benoitAffection()) + "%\n";

    if (kGAMECLASS.flags[kFLAGS.BROOKE_MET] > 0)
        interpersonStats += "<b>Brooke Affection:</b> " + Math.round(kGAMECLASS.telAdre.brooke.brookeAffection()) + "\n";

    if (kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00218] + kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00219] + kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00220] > 0)
        interpersonStats += "<b>Body Parts Taken By Ceraph:</b> " + (kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00218] + kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00219] + kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00220]) + "\n";

    if (kGAMECLASS.emberScene.emberAffection() > 0)
        interpersonStats += "<b>Ember Affection:</b> " + Math.round(kGAMECLASS.emberScene.emberAffection()) + "%\n";

    if (kGAMECLASS.helFollower.helAffection() > 0)
        interpersonStats += "<b>Helia Affection:</b> " + Math.round(kGAMECLASS.helFollower.helAffection()) + "%\n";
    if (kGAMECLASS.helFollower.helAffection() >= 100)
        interpersonStats += "<b>Helia Bonus Points:</b> " + Math.round(kGAMECLASS.flags[kFLAGS.HEL_BONUS_POINTS]) + "\n";

    if (kGAMECLASS.flags[kFLAGS.ISABELLA_AFFECTION] > 0) {
        interpersonStats += "<b>Isabella Affection:</b> ";

        if (!kGAMECLASS.isabellaFollowerScene.isabellaFollower())
            interpersonStats += Math.round(kGAMECLASS.flags[kFLAGS.ISABELLA_AFFECTION]) + "%\n", false;
        else
            interpersonStats += "100%\n";
    }

    if (kGAMECLASS.flags[kFLAGS.KATHERINE_UNLOCKED] >= 4) {
        interpersonStats += "<b>Katherine Submissiveness:</b> " + kGAMECLASS.telAdre.katherine.submissiveness() + "\n";
    }

    if (kGAMECLASS.player.findStatusAffect(StatusAffects.Kelt) >= 0 && kGAMECLASS.flags[kFLAGS.KELT_BREAK_LEVEL] == 0) {
        if (kGAMECLASS.player.statusAffectv2(StatusAffects.Kelt) >= 130)
            interpersonStats += "<b>Submissiveness To Kelt:</b> " + 100 + "%\n";
        else
            interpersonStats += "<b>Submissiveness To Kelt:</b> " + Math.round(kGAMECLASS.player.statusAffectv2(StatusAffects.Kelt) / 130 * 100) + "%\n";
    }

    if (kGAMECLASS.flags[kFLAGS.ANEMONE_KID] > 0)
        interpersonStats += "<b>Kid A's Confidence:</b> " + kGAMECLASS.anemoneScene.kidAXP() + "%\n";

    if (kGAMECLASS.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 2) {
        if (kGAMECLASS.kihaFollower.followerKiha())
            interpersonStats += "<b>Kiha Affection:</b> " + 100 + "%\n";
        else
            interpersonStats += "<b>Kiha Affection:</b> " + Math.round(kGAMECLASS.flags[kFLAGS.KIHA_AFFECTION]) + "%\n";
    }
    //Lottie stuff
    if (kGAMECLASS.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00281] > 0)
        interpersonStats += "<b>Lottie's Encouragement:</b> " + kGAMECLASS.telAdre.lottie.lottieMorale() + " (higher is better)\n" + "<b>Lottie's Figure:</b> " + kGAMECLASS.telAdre.lottie.lottieTone() + " (higher is better)\n";

    if (kGAMECLASS.mountain.salon.lynnetteApproval() != 0)
        interpersonStats += "<b>Lynnette's Approval:</b> " + kGAMECLASS.mountain.salon.lynnetteApproval() + "\n";

    if (kGAMECLASS.flags[kFLAGS.OWCAS_ATTITUDE] > 0)
        interpersonStats += "<b>Owca's Attitude:</b> " + kGAMECLASS.flags[kFLAGS.OWCAS_ATTITUDE] + "\n";

    if (kGAMECLASS.telAdre.rubi.rubiAffection() > 0)
        interpersonStats += "<b>Rubi's Affection:</b> " + Math.round(kGAMECLASS.telAdre.rubi.rubiAffection()) + "%\n" + "<b>Rubi's Orifice Capacity:</b> " + Math.round(kGAMECLASS.telAdre.rubi.rubiCapacity()) + "%\n";

    if (kGAMECLASS.flags[kFLAGS.SHEILA_XP] != 0) {
        interpersonStats += "<b>Sheila's Corruption:</b> " + kGAMECLASS.sheilaScene.sheilaCorruption();
        if (kGAMECLASS.sheilaScene.sheilaCorruption() > 100)
            interpersonStats += " (Yes, it can go above 100)";
        interpersonStats += "\n";
    }

    if (kGAMECLASS.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] != 0) {
        if (kGAMECLASS.urta.urtaLove())
            interpersonStats += "<b>Urta Status:</b> Lover\n";
        else if (kGAMECLASS.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] == -1)
            interpersonStats += "<b>Urta Status:</b> Ashamed\n";
        else if (kGAMECLASS.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] < 30)
            interpersonStats += "<b>Urta's Affection:</b> " + Math.round(kGAMECLASS.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] * 3.3333) + "%\n";
        else
            interpersonStats += "<b>Urta Status:</b> Ready To Confess Love\n";
    }

    if (interpersonStats != "")
        outputText("\n<b><u>Interpersonal Stats</u></b>\n" + interpersonStats, false);
    // End Interpersonal Stats

    // Begin Ongoing Stat Effects
    var statEffects: string = "";

    if (kGAMECLASS.player.inHeat)
        statEffects += "Heat - " + Math.round(kGAMECLASS.player.statusAffectv3(StatusAffects.Heat)) + " hours remaining\n";

    if (kGAMECLASS.player.inRut)
        statEffects += "Rut - " + Math.round(kGAMECLASS.player.statusAffectv3(StatusAffects.Rut)) + " hours remaining\n";

    if (kGAMECLASS.player.statusAffectv1(StatusAffects.Luststick) > 0)
        statEffects += "Luststick - " + Math.round(kGAMECLASS.player.statusAffectv1(StatusAffects.Luststick)) + " hours remaining\n";

    if (kGAMECLASS.player.statusAffectv1(StatusAffects.BlackCatBeer) > 0)
        statEffects += "Black Cat Beer - " + kGAMECLASS.player.statusAffectv1(StatusAffects.BlackCatBeer) + " hours remaining (Lust resistance 20% lower, physical resistance 25% higher.)\n";

    if (statEffects != "")
        outputText("\n<b><u>Ongoing Status Effects</u></b>\n" + statEffects, false);
    // End Ongoing Stat Effects

    doNext(playerMenu);
}

export function lustPercent(): number {
    var lust: number = 100;
    //2.5% lust resistance per level - max 75.
    if (kGAMECLASS.player.level < 21) lust -= (kGAMECLASS.player.level - 1) * 3;
    else lust = 40;

    //++++++++++++++++++++++++++++++++++++++++++++++++++
    //ADDITIVE REDUCTIONS
    //THESE ARE FLAT BONUSES WITH LITTLE TO NO DOWNSIDE
    //TOTAL IS LIMITED TO 75%!
    //++++++++++++++++++++++++++++++++++++++++++++++++++
    //Corrupted Libido reduces lust gain by 10%!
    if (kGAMECLASS.player.findPerk(PerkLib.CorruptedLibido) >= 0) lust -= 10;
    //Acclimation reduces by 15%
    if (kGAMECLASS.player.findPerk(PerkLib.Acclimation) >= 0) lust -= 15;
    //Purity blessing reduces lust gain
    if (kGAMECLASS.player.findPerk(PerkLib.PurityBlessing) >= 0) lust -= 5;
    //Resistance = 10%
    if (kGAMECLASS.player.findPerk(PerkLib.Resistance) >= 0) lust -= 10;
    if (kGAMECLASS.player.findPerk(PerkLib.ChiReflowLust) >= 0) lust -= UmasShop.NEEDLEWORK_LUST_LUST_RESIST;

    if (lust < 25) lust = 25;
    if (kGAMECLASS.player.statusAffectv1(StatusAffects.BlackCatBeer) > 0) {
        if (lust >= 80) lust = 100;
        else lust += 20;
    }
    lust += Math.round(kGAMECLASS.player.perkv1(PerkLib.PentUp) / 2);
    //++++++++++++++++++++++++++++++++++++++++++++++++++
    //MULTIPLICATIVE REDUCTIONS
    //THESE PERKS ALSO RAISE MINIMUM LUST OR HAVE OTHER
    //DRAWBACKS TO JUSTIFY IT.
    //++++++++++++++++++++++++++++++++++++++++++++++++++
    //Bimbo body slows lust gains!
    if ((kGAMECLASS.player.findStatusAffect(StatusAffects.BimboChampagne) >= 0 || kGAMECLASS.player.findPerk(PerkLib.BimboBody) >= 0) && lust > 0) lust *= .75;
    if (kGAMECLASS.player.findPerk(PerkLib.BroBody) >= 0 && lust > 0) lust *= .75;
    if (kGAMECLASS.player.findPerk(PerkLib.FutaForm) >= 0 && lust > 0) lust *= .75;
    //Omnibus' Gift reduces lust gain by 15%
    if (kGAMECLASS.player.findPerk(PerkLib.OmnibusGift) >= 0) lust *= .85;
    //Luststick reduces lust gain by 10% to match increased min lust
    if (kGAMECLASS.player.findPerk(PerkLib.LuststickAdapted) >= 0) lust *= 0.9;
    if (kGAMECLASS.player.findStatusAffect(StatusAffects.Berzerking) >= 0) lust *= .6;
    if (kGAMECLASS.player.findPerk(PerkLib.PureAndLoving) >= 0) lust *= 0.95;

    // Lust mods from Uma's content -- Given the short duration and the gem cost, I think them being multiplicative is justified.
    // Changing them to an additive bonus should be pretty simple (check the static values in UmasShop.as)
    var statIndex: number = kGAMECLASS.player.findStatusAffect(StatusAffects.UmasMassage);
    if (statIndex >= 0) {
        if (kGAMECLASS.player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_RELIEF || kGAMECLASS.player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_LUST) {
            lust *= kGAMECLASS.player.statusAffect(statIndex).value2;
        }
    }

    lust = Math.round(lust);
    return lust;
}

// returns OLD OP VAL
export function applyOperator(old: number, op: string, val: number): number {
    switch (op) {
        case "=":
            return val;
        case "+":
            return old + val;
        case "-":
            return old - val;
        case "*":
            return old * val;
        case "/":
            return old / val;
        default:
            trace("applyOperator(" + old + ",'" + op + "'," + val + ") unknown op");
            return old;
    }
}

export function testDynStatsEvent(): void {
    outputText("Old: " + kGAMECLASS.player.str + " " + kGAMECLASS.player.tou + " " + kGAMECLASS.player.spe + " " + kGAMECLASS.player.inte + " " + kGAMECLASS.player.lib + " " + kGAMECLASS.player.sens + " " + kGAMECLASS.player.lust + "\n", true);
    dynStats("tou", 1, "spe+", 2, "int-", 3, "lib*", 2, "sen=", 25, "lust/", 2);
    outputText("Mod: 0 1 +2 -3 *2 =25 /2\n");
    outputText("New: " + kGAMECLASS.player.str + " " + kGAMECLASS.player.tou + " " + kGAMECLASS.player.spe + " " + kGAMECLASS.player.inte + " " + kGAMECLASS.player.lib + " " + kGAMECLASS.player.sens + " " + kGAMECLASS.player.lust + "\n");
    doNext(playerMenu);
}

/**
 * Modify stats.
 *
 * Arguments should come in pairs nameOp: string, value: number/Boolean <br/>
 * where nameOp is ( stat_name + [operator] ) and value is operator argument<br/>
 * valid operators are "=" (set), "+", "-", "*", "/", add is default.<br/>
 * valid stat_names are "str", "tou", "spe", "int", "lib", "sen", "lus", "cor" or their full names; also "resisted"/"res" (apply lust resistance, default true) and "noBimbo"/"bim" (do not apply bimbo int gain reduction, default false)
 */
export function dynStats(...args): void {
    // Check num of args, we should have a multiple of 2
    if ((args.length % 2) != 0) {
        trace("dynStats aborted. Keys->Arguments could not be matched");
        return;
    }

    var argNamesFull: Array<any> = ["strength", "toughness", "speed", "intellect", "libido", "sensitivity", "lust", "corruption", "resisted", "noBimbo"]; // In case somebody uses full arg names etc
    var argNamesShort: Array<any> = ["str", "tou", "spe", "int", "lib", "sen", "lus", "cor", "res", "bim"]; // Arg names
    var argVals: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, true, false]; // Default arg values
    var argOps: Array<any> = ["+", "+", "+", "+", "+", "+", "+", "+", "=", "="];   // Default operators

    for (var i: number = 0; i < args.length; i += 2) {
        if (typeof (args[i]) == "string") {
            // Make sure the next arg has the POSSIBILITY of being correct
            if ((typeof (args[i + 1]) != "number") && (typeof (args[i + 1]) != "boolean")) {
                trace("dynStats aborted. Next argument after argName is invalid! arg is type " + typeof (args[i + 1]));
                continue;
            }

            var argIndex: number = -1;

            // Figure out which array to search
            var argsi: string = (args[i] as string);
            if (argsi == "lust") argsi = "lus";
            if (argsi == "sens") argsi = "sen";
            if (argsi.length <= 4) // Short
            {
                argIndex = argNamesShort.indexOf(argsi.slice(0, 3));
                if (argsi.length == 4 && argIndex != -1) argOps[argIndex] = argsi.charAt(3);
            }
            else // Full
            {
                if ("+-*/=".indexOf(argsi.charAt(argsi.length - 1)) != -1) {
                    argIndex = argNamesFull.indexOf(argsi.slice(0, argsi.length - 1));
                    if (argIndex != -1) argOps[argIndex] = argsi.charAt(argsi.length - 1);
                } else {
                    argIndex = argNamesFull.indexOf(argsi);
                }
            }

            if (argIndex == -1) // Shit fucked up, welp
            {
                trace("Couldn't find the arg name " + argsi + " in the index arrays. Welp!");
                continue;
            }
            else // Stuff the value into our "values" array
            {
                argVals[argIndex] = args[i + 1];
            }
        }
        else {
            trace("dynStats aborted. Expected a key and got SHIT");
            return;
        }
    }
    // Got this far, we have values to statsify
    var newStr: number = applyOperator(kGAMECLASS.player.str, argOps[0], argVals[0]);
    var newTou: number = applyOperator(kGAMECLASS.player.tou, argOps[1], argVals[1]);
    var newSpe: number = applyOperator(kGAMECLASS.player.spe, argOps[2], argVals[2]);
    var newInte: number = applyOperator(kGAMECLASS.player.inte, argOps[3], argVals[3]);
    var newLib: number = applyOperator(kGAMECLASS.player.lib, argOps[4], argVals[4]);
    var newSens: number = applyOperator(kGAMECLASS.player.sens, argOps[5], argVals[5]);
    var newLust: number = applyOperator(kGAMECLASS.player.lust, argOps[6], argVals[6]);
    var newCor: number = applyOperator(kGAMECLASS.player.cor, argOps[7], argVals[7]);
    // Because lots of checks and mods are made in the stats(), calculate deltas and pass them. However, this means that the '=' operator could be resisted
    // In future (as I believe) stats() should be replaced with dynStats(), and checks and mods should be made here
    stats(newStr - kGAMECLASS.player.str,
        newTou - kGAMECLASS.player.tou,
        newSpe - kGAMECLASS.player.spe,
        newInte - kGAMECLASS.player.inte,
        newLib - kGAMECLASS.player.lib,
        newSens - kGAMECLASS.player.sens,
        newLust - kGAMECLASS.player.lust,
        newCor - kGAMECLASS.player.cor,
        argVals[8], argVals[9]);

}

export function stats(stre: number, toug: number, spee: number, intel: number, libi: number, sens: number, lust2: number, corr: number, resisted: boolean = true, noBimbo: boolean = false): void {
    //Easy mode cuts lust gains!
    if (kGAMECLASS.flags[kFLAGS.EASY_MODE_ENABLE_FLAG] == 1 && lust2 > 0 && resisted) lust2 /= 2;

    //Set original values to begin tracking for up/down values if
    //they aren't set yet.
    //These are reset when up/down arrows are hidden with 
    //hideUpDown();
    //Just check str because they are either all 0 or real values
    if (kGAMECLASS.oldStats.oldStr == 0) {
        kGAMECLASS.oldStats.oldStr = kGAMECLASS.player.str;
        kGAMECLASS.oldStats.oldTou = kGAMECLASS.player.tou;
        kGAMECLASS.oldStats.oldSpe = kGAMECLASS.player.spe;
        kGAMECLASS.oldStats.oldInte = kGAMECLASS.player.inte;
        kGAMECLASS.oldStats.oldLib = kGAMECLASS.player.lib;
        kGAMECLASS.oldStats.oldSens = kGAMECLASS.player.sens;
        kGAMECLASS.oldStats.oldLust = kGAMECLASS.player.lust;
        kGAMECLASS.oldStats.oldCor = kGAMECLASS.player.cor;
    }
    //MOD CHANGES FOR PERKS
    //Bimbos learn slower
    if (!noBimbo) {
        if (kGAMECLASS.player.findPerk(PerkLib.FutaFaculties) >= 0 || kGAMECLASS.player.findPerk(PerkLib.BimboBrains) >= 0 || kGAMECLASS.player.findPerk(PerkLib.BroBrains) >= 0) {
            if (intel > 0) intel /= 2;
            if (intel < 0) intel *= 2;
        }
        if (kGAMECLASS.player.findPerk(PerkLib.FutaForm) >= 0 || kGAMECLASS.player.findPerk(PerkLib.BimboBody) >= 0 || kGAMECLASS.player.findPerk(PerkLib.BroBody) >= 0) {
            if (libi > 0) libi *= 2;
            if (libi < 0) libi /= 2;
        }
    }

    // Uma's Perkshit
    if (kGAMECLASS.player.findPerk(PerkLib.ChiReflowSpeed) >= 0 && spee < 0) spee *= UmasShop.NEEDLEWORK_SPEED_SPEED_MULTI;
    if (kGAMECLASS.player.findPerk(PerkLib.ChiReflowLust) >= 0 && libi > 0) libi *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;
    if (kGAMECLASS.player.findPerk(PerkLib.ChiReflowLust) >= 0 && sens > 0) sens *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;

    //lust resistance
    if (lust2 > 0 && resisted) lust2 *= lustPercent() / 100;
    if (libi > 0 && kGAMECLASS.player.findPerk(PerkLib.PurityBlessing) >= 0) libi *= 0.75;
    if (corr > 0 && kGAMECLASS.player.findPerk(PerkLib.PurityBlessing) >= 0) corr *= 0.5;
    if (corr > 0 && kGAMECLASS.player.findPerk(PerkLib.PureAndLoving) >= 0) corr *= 0.75;
    //Change original stats
    kGAMECLASS.player.str += stre;
    kGAMECLASS.player.tou += toug;
    kGAMECLASS.player.spe += spee;
    kGAMECLASS.player.inte += intel;
    kGAMECLASS.player.lib += libi;

    if (kGAMECLASS.player.sens > 50 && sens > 0) sens /= 2;
    if (kGAMECLASS.player.sens > 75 && sens > 0) sens /= 2;
    if (kGAMECLASS.player.sens > 90 && sens > 0) sens /= 2;
    if (kGAMECLASS.player.sens > 50 && sens < 0) sens *= 2;
    if (kGAMECLASS.player.sens > 75 && sens < 0) sens *= 2;
    if (kGAMECLASS.player.sens > 90 && sens < 0) sens *= 2;

    kGAMECLASS.player.sens += sens;
    kGAMECLASS.player.lust += lust2;
    kGAMECLASS.player.cor += corr;

    //Bonus gain for perks!
    if (kGAMECLASS.player.findPerk(PerkLib.Strong) >= 0 && stre >= 0) kGAMECLASS.player.str += stre * kGAMECLASS.player.perk(kGAMECLASS.player.findPerk(PerkLib.Strong)).value1;
    if (kGAMECLASS.player.findPerk(PerkLib.Tough) >= 0 && toug >= 0) kGAMECLASS.player.tou += toug * kGAMECLASS.player.perk(kGAMECLASS.player.findPerk(PerkLib.Tough)).value1;
    if (kGAMECLASS.player.findPerk(PerkLib.Fast) >= 0 && spee >= 0) kGAMECLASS.player.spe += spee * kGAMECLASS.player.perk(kGAMECLASS.player.findPerk(PerkLib.Fast)).value1;
    if (kGAMECLASS.player.findPerk(PerkLib.Smart) >= 0 && intel >= 0) kGAMECLASS.player.inte += intel * kGAMECLASS.player.perk(kGAMECLASS.player.findPerk(PerkLib.Smart)).value1;
    if (kGAMECLASS.player.findPerk(PerkLib.Lusty) >= 0 && libi >= 0) kGAMECLASS.player.lib += libi * kGAMECLASS.player.perk(kGAMECLASS.player.findPerk(PerkLib.Lusty)).value1;
    if (kGAMECLASS.player.findPerk(PerkLib.Sensitive) >= 0 && sens >= 0) kGAMECLASS.player.sens += sens * kGAMECLASS.player.perk(kGAMECLASS.player.findPerk(PerkLib.Sensitive)).value1;

    // Uma's Str Cap from Perks
    if (kGAMECLASS.player.findPerk(PerkLib.ChiReflowSpeed) >= 0) {
        if (kGAMECLASS.player.str > UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP) {
            kGAMECLASS.player.str = UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP;
        }
    }
    if (kGAMECLASS.player.findPerk(PerkLib.ChiReflowDefense) >= 0) {
        if (kGAMECLASS.player.spe > UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP) {
            kGAMECLASS.player.spe = UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP;
        }
    }

    //Keep stats in bounds
    if (kGAMECLASS.player.cor < 0) kGAMECLASS.player.cor = 0;
    if (kGAMECLASS.player.cor > 100) kGAMECLASS.player.cor = 100;
    if (kGAMECLASS.player.str > 100) kGAMECLASS.player.str = 100;
    if (kGAMECLASS.player.str < 1) kGAMECLASS.player.str = 1;
    if (kGAMECLASS.player.tou > 100) kGAMECLASS.player.tou = 100;
    if (kGAMECLASS.player.tou < 1) kGAMECLASS.player.tou = 1;
    if (kGAMECLASS.player.spe > 100) kGAMECLASS.player.spe = 100;
    if (kGAMECLASS.player.spe < 1) kGAMECLASS.player.spe = 1;
    if (kGAMECLASS.player.inte > 100) kGAMECLASS.player.inte = 100;
    if (kGAMECLASS.player.inte < 1) kGAMECLASS.player.inte = 1;
    if (kGAMECLASS.player.lib > 100) kGAMECLASS.player.lib = 100;
    //Minimum libido = 15.
    if (kGAMECLASS.player.lib < 50 && kGAMECLASS.player.armorName == "lusty maiden's armor") kGAMECLASS.player.lib = 50;
    else if (kGAMECLASS.player.lib < 15 && kGAMECLASS.player.gender > 0) kGAMECLASS.player.lib = 15;
    else if (kGAMECLASS.player.lib < 10 && kGAMECLASS.player.gender == 0) kGAMECLASS.player.lib = 10;
    if (kGAMECLASS.player.lib < minLust() * 2 / 3) kGAMECLASS.player.lib = minLust() * 2 / 3;

    //Minimum sensitivity.
    if (kGAMECLASS.player.sens > 100) kGAMECLASS.player.sens = 100;
    if (kGAMECLASS.player.sens < 10) kGAMECLASS.player.sens = 10;

    //Add HP for toughness change.
    HPChange(toug * 2, false);
    //Reduce hp if over max
    if (kGAMECLASS.player.HP > maxHP()) kGAMECLASS.player.HP = maxHP();

    //Combat bounds
    if (kGAMECLASS.player.lust > 99) kGAMECLASS.player.lust = 100;
    //if(kGAMECLASS.player.lust < kGAMECLASS.player.lib) {
    //        kGAMECLASS.player.lust=kGAMECLASS.player.lib;
    //
    //Update to minimum lust if lust falls below it.
    if (kGAMECLASS.player.lust < minLust()) kGAMECLASS.player.lust = minLust();
    //worms raise min lust!
    if (kGAMECLASS.player.findStatusAffect(StatusAffects.Infested) >= 0) {
        if (kGAMECLASS.player.lust < 50) kGAMECLASS.player.lust = 50;
    }
    if (kGAMECLASS.player.lust > 100) kGAMECLASS.player.lust = 100;
    if (kGAMECLASS.player.lust < 0) kGAMECLASS.player.lust = 0;

    //Refresh the stat pane with updated values
    kGAMECLASS.mainView.statsView.showUpDown();
    statScreenRefresh();
}
export function range(min: number, max: number, round: boolean = false): number {
    var num: number = (min + Math.random() * (max - min));

    if (round) return Math.round(num);
    return num;
}

export function cuntChangeOld(cIndex: number, vIndex: number, display: boolean): void {
    //Virginity check
    if (kGAMECLASS.player.vaginas[vIndex].virgin) {
        if (display) outputText("\nYour " + vaginaDescript(vIndex) + " loses its virginity!", false);
        kGAMECLASS.player.vaginas[vIndex].virgin = false;
    }
    //If cock is bigger than unmodified vagina can hold - 100% stretch!
    if (kGAMECLASS.player.vaginas[vIndex].capacity() <= kGAMECLASS.monster.cocks[cIndex].cArea()) {
        if (kGAMECLASS.player.vaginas[vIndex] < 5) {
            trace("CUNT STRETCHED: By cock larger than it's total capacity.");
            if (display) {
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_GAPING_WIDE) outputText("<b>Your " + vaginaDescript(0) + " is stretched even further, capable of taking even the largest of demons and beasts.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_GAPING) outputText("<b>Your " + vaginaDescript(0) + " painfully stretches, gaping wide-open.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_LOOSE) outputText("<b>Your " + vaginaDescript(0) + " is now very loose.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_NORMAL) outputText("<b>Your " + vaginaDescript(0) + " is now loose.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_TIGHT) outputText("<b>Your " + vaginaDescript(0) + " loses its virgin-like tightness.</b>  ", false);
            }
            kGAMECLASS.player.vaginas[vIndex].vaginalLooseness++;
        }
    }
    //If cock is within 75% of max, streeeeetch 33% of the time
    if (kGAMECLASS.player.vaginas[vIndex].capacity() * .75 <= kGAMECLASS.monster.cocks[cIndex].cArea()) {
        if (kGAMECLASS.player.vaginas[vIndex] < 5) {
            trace("CUNT STRETCHED: By cock @ 75% of capacity.");
            if (display) {
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_GAPING_WIDE) outputText("<b>Your " + vaginaDescript(0) + " is stretched even further, capable of taking even the largest of demons and beasts.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_GAPING) outputText("<b>Your " + vaginaDescript(0) + " painfully stretches, gaping wide-open.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_LOOSE) outputText("<b>Your " + vaginaDescript(0) + " is now very loose.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_NORMAL) outputText("<b>Your " + vaginaDescript(0) + " is now loose.</b>  ", false);
                if (kGAMECLASS.player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS_TIGHT) outputText("<b>Your " + vaginaDescript(0) + " loses its virgin-like tightness.</b>  ", false);
            }
            kGAMECLASS.player.vaginas[vIndex].vaginalLooseness++;
        }
    }
}

export function spriteSelect(choice: number = 0): void {
    if (kGAMECLASS.flags[kFLAGS.SHOW_SPRITES_FLAG] == 0) {
        kGAMECLASS.mainView.selectSprite(choice);
    }
    else {
        if (choice >= 0) {
            trace("hiding sprite because kGAMECLASS.flags");
            kGAMECLASS.mainView.selectSprite(-1);
        }
    }
}