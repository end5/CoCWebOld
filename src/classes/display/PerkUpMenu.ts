export default class PerkUpMenu {
    private perkBuyMenu(): void {
        MainScreen.clearText();
        let perkList: Array = buildPerkList();

        if (perkList.length == 0) {
            MainScreen.text("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + num2Text(player.perkPoints) + " perk point");
            if (player.perkPoints > 1) MainScreen.text("s");
            MainScreen.text(".");
            MainScreen.doNext(playerMenu);
            return;
        }
        if (testingBlockExiting) {
            MainScreen.hideButtons();
            MainScreen.addButton(0, "Next", perkSelect, perkList[Utils.rand(perkList.length)].perk);
        }
        else {
            MainScreen.text("Please select a perk from the drop-down list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.\n\n");
            mainView.aCb.x = 210;
            mainView.aCb.y = 112;

            if (mainView.aCb.parent == null) {
                mainView.addChild(mainView.aCb);
                mainView.aCb.visible = true;
            }

            mainView.hideMenuButton(MainView.MENU_NEW_MAIN);
            MainScreen.hideButtons();
            MainScreen.addButton(1, "Skip", perkSkip);
        }
    }

    private perkSelect(selected: PerkClass): void {
        stage.focus = null;
        if (mainView.aCb.parent != null) {
            mainView.removeChild(mainView.aCb);
            applyPerk(selected);
        }
    }

    private perkSkip(): void {
        stage.focus = null;
        if (mainView.aCb.parent != null) {
            mainView.removeChild(mainView.aCb);
            playerMenu();
        }
    }
    private changeHandler(event: Event): void {
        //Store perk name for later addition
        MainScreen.clearText();
        let selected: PerkClass = ComboBox(event.target).selectedItem.perk;
        mainView.aCb.move(210, 85);
        MainScreen.text("You have selected the following perk:\n\n");
        MainScreen.text("<b>" + selected.perkName + ":</b> " + selected.perkLongDesc + "\n\nIf you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
        MainScreen.hideButtons();
        MainScreen.addButton(0, "Okay", perkSelect, selected);
        MainScreen.addButton(1, "Skip", perkSkip);
    }

    public buildPerkList(): Array {
        let perkList: Array = [];
        function _add(p: PerkClass): void {
            perkList.push({ label: p.perkName, perk: p });
        }
        //STRENGTH PERKS
        if (player.str >= 25) {
            _add(new PerkClass(PerkLib.StrongBack));
        }
        if (player.perks.has("StrongBack") && player.str >= 50) {
            _add(new PerkClass(PerkLib.StrongBack2));
        }
        //Tier 1 Strength Perks
        if (player.level >= 6) {
            //Thunderous Strikes - +20% basic attack damage while str > 80.
            if (player.str >= 80) {
                _add(new PerkClass(PerkLib.ThunderousStrikes));
            }
            //Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
            if (player.str > 60) {
                _add(new PerkClass(PerkLib.WeaponMastery));
            }
            if (player.str >= 75)
                _add(new PerkClass(PerkLib.BrutalBlows));
        }
        //Tier 2 Strength Perks
        if (player.level >= 12) {
            if (player.str >= 75)
                _add(new PerkClass(PerkLib.Berzerker));
        }
        //slot 2 - toughness perk 1
        if (!player.perks.has("Tank") && player.tou >= 25) {
            _add(new PerkClass(PerkLib.Tank));
        }
        //slot 2 - regeneration perk
        if (player.perks.has("Tank") && player.tou >= 50) {
            _add(new PerkClass(PerkLib.Regeneration));
        }
        //Tier 1 Toughness Perks
        if (player.level >= 6) {
            if (player.perks.has("Tank") && player.tou >= 60) {
                _add(new PerkClass(PerkLib.Tank2));
            }
            if (player.perks.has("Regeneration") && player.tou >= 70) {
                _add(new PerkClass(PerkLib.Regeneration2));
            }
            if (player.tou >= 75) {
                _add(new PerkClass(PerkLib.ImmovableObject));
            }
        }
        //Tier 2 Toughness Perks
        if (player.level >= 12) {
            if (player.tou >= 75) {
                _add(new PerkClass(PerkLib.Resolute));
            }
            if (player.tou >= 60) {
                _add(new PerkClass(PerkLib.IronMan));
            }
        }
        //slot 3 - speed perk
        if (player.stats.spe >= 25) {
            _add(new PerkClass(PerkLib.Evade));
        }
        //slot 3 - run perk
        if (player.stats.spe >= 25) {
            _add(new PerkClass(PerkLib.Runner));
        }
        //slot 3 - Double Attack perk
        if (player.perks.has("Evade") && player.perks.has("Runner") && player.stats.spe >= 50) {
            _add(new PerkClass(PerkLib.DoubleAttack));
        }
        //Tier 1 Speed Perks
        if (player.level >= 6) {
            //Speedy Recovery - Regain Fatigue 50% faster speed.
            if (player.perks.has("Evade") && player.stats.spe >= 60) {
                _add(new PerkClass(PerkLib.SpeedyRecovery));
            }
            //Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
            if (player.stats.spe > 75 && player.perks.has("Runner") && (player.armorPerk == "Light" || player.armorPerk == "Medium")) {
                _add(new PerkClass(PerkLib.Agility));
            }
            if (player.stats.spe >= 60) {
                _add(new PerkClass(PerkLib.LightningStrikes));
            }
        }
        //Tier 2 Speed Perks
        if (player.level >= 12) {
            if (player.stats.spe >= 75) {
                _add(new PerkClass(PerkLib.LungingAttacks));
            }
        }
        //Slot 4 - precision - -10 enemy toughness for damage calc
        if (player.stats.int >= 25) {
            _add(new PerkClass(PerkLib.Precision));
        }
        //Spellpower - boosts spell power
        if (player.stats.int >= 50) {
            _add(new PerkClass(PerkLib.Spellpower));
        }
        if (player.perks.has("Spellpower") && player.stats.int >= 50) {
            _add(new PerkClass(PerkLib.Mage));
        }
        //Tier 1 Intelligence Perks
        if (player.level >= 6) {
            if (player.stats.int >= 50)
                _add(new PerkClass(PerkLib.Tactician));
            if (spellCount() > 0 && player.perks.has("Spellpower") && player.perks.has("Mage") && player.stats.int >= 60) {
                _add(new PerkClass(PerkLib.Channeling));
            }
            if (player.stats.int >= 60) {
                _add(new PerkClass(PerkLib.Medicine));
            }
        }
        //Tier 2 Intelligence perks
        if (player.level >= 12) {
            if (player.perks.has("Mage") && player.stats.int >= 75) {
                _add(new PerkClass(PerkLib.Archmage));
            }
        }
        //LIBIDO PERKZ
        //slot 5 - libido perks
        //Slot 5 - Fertile+ increases cum production and fertility (+15%)
        if (player.stats.lib >= 25) {
            _add(new PerkClass(PerkLib.FertilityPlus, 15, 1.75, 0, 0));
        }
        //Slot 5 - minimum libido
        if (player.stats.lib >= 50) {
            _add(new PerkClass(PerkLib.HotBlooded, 20, 0, 0, 0));
        }
        //Tier 1 Libido Perks
        if (player.level >= 6) {
            //Slot 5 - minimum libido
            if (player.stats.lib >= 60) {
                _add(new PerkClass(PerkLib.WellAdjusted));
            }
            //Slot 5 - minimum libido
            if (player.stats.lib >= 60 && player.stats.cor >= 50) {
                _add(new PerkClass(PerkLib.Masochist));
            }
        }
        //Corruption Perks - slot 7
        //Slot 7 - Corrupted Libido - lust raises 10% slower.
        if (player.stats.cor >= 25) {
            _add(new PerkClass(PerkLib.CorruptedLibido, 20, 0, 0, 0));
        }
        //Slot 7 - Seduction (Must have seduced Jojo
        if (!player.perks.has("Seduction") && player.stats.cor >= 50 && monk >= 5) {
            _add(new PerkClass(PerkLib.Seduction));
        }
        //Slot 7 - Nymphomania
        else if (player.perks.has("CorruptedLibido") && player.stats.cor >= 75) {
            _add(new PerkClass(PerkLib.Nymphomania));
        }
        //Slot 7 - UNFINISHED :3
        if (minLust() >= 20 && player.perks.has("CorruptedLibido") && player.stats.cor >= 50) {
            _add(new PerkClass(PerkLib.Acclimation));
        }
        //Tier 1 Corruption Perks - acclimation over-rides
        if (player.level >= 6) {
            if (player.stats.cor >= 60 && player.perks.has("CorruptedLibido")) {
                _add(new PerkClass(PerkLib.Sadist));
            }
            if (player.perks.has("CorruptedLibido") && player.stats.cor >= 70) {
                _add(new PerkClass(PerkLib.ArousingAura));
            }
        }
        //Tier 1 Misc Perks
        if (player.level >= 6) {
            _add(new PerkClass(PerkLib.Resistance));
        }
        // FILTER PERKS
        perkList = perkList.filter(
            function (perk:*,idx: number, array: Array): boolean {
                return player.findPerk(perk.perk.ptype) < 0;
            });
        mainView.aCb.dataProvider = new DataProvider(perkList);
        return perkList;
    }

    public applyPerk(perk: PerkClass): void {
        MainScreen.clearText();
        player.perkPoints--;
        //Apply perk here.
        MainScreen.text("<b>" + perk.perkName + "</b> gained!");
        player.createPerk(perk.ptype, perk.value1, perk.value2, perk.value3, perk.value4);
        if (perk.ptype == PerkLib.StrongBack2) player.itemSlot5.unlocked = true;
        if (perk.ptype == PerkLib.StrongBack) player.itemSlot4.unlocked = true;
        if (perk.ptype == PerkLib.Tank2) {
            HPChange(player.tou, false);
            statScreenRefresh();
        }
        MainScreen.doNext(playerMenu);
    }

    public levelUpGo(e: MouseEvent = null): void {
        MainScreen.clearText();
        hideMenus();
        mainView.hideMenuButton(MainView.MENU_NEW_MAIN);
        //Level up
        if (player.XP >= (player.level) * 100) {
            player.level++;
            player.perkPoints++;
            MainScreen.text("<b>You are now level " + player.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
            player.XP -= (player.level - 1) * 100;
            MainScreen.hideButtons();
            MainScreen.addButton(0, "Strength", levelUpStatStrength);
            MainScreen.addButton(1, "Toughness", levelUpStatToughness);
            MainScreen.addButton(2, "Speed", levelUpStatSpeed);
            MainScreen.addButton(3, "Intelligence", levelUpStatIntelligence);
        }
        //Spend perk points
        else if (player.perkPoints > 0) {
            perkBuyMenu();
        }
        else {
            MainScreen.text("<b>ERROR.  LEVEL UP PUSHED WHEN PC CANNOT LEVEL OR GAIN PERKS.  PLEASE REPORT THE STEPS TO REPRODUCE THIS BUG TO FENOXO@GMAIL.COM OR THE FENOXO.COM BUG REPORT FORUM.</b>");
            MainScreen.doNext(playerMenu);
        }
    }

    private levelUpStatStrength(): void {
        dynStats("str", 5); //Gain +5 Str due to level
        MainScreen.clearText();
        MainScreen.text("Your muscles feel significantly stronger from your time adventuring.");
        MainScreen.doNext(perkBuyMenu);
    }

    private levelUpStatToughness(): void {
        dynStats("tou", 5); //Gain +5 Toughness due to level
        trace("HP: " + player.HP + " MAX HP: " + maxHP());
        statScreenRefresh();
        MainScreen.clearText();
        MainScreen.text("You feel tougher from all the fights you have endured.");
        MainScreen.doNext(perkBuyMenu);
    }

    private levelUpStatSpeed(): void {
        dynStats("spe", 5); //Gain +5 speed due to level
        MainScreen.clearText();
        MainScreen.text("Your time in combat has driven you to move faster.");
        MainScreen.doNext(perkBuyMenu);
    }

    private levelUpStatIntelligence(): void {
        dynStats("int", 5); //Gain +5 Intelligence due to level
        MainScreen.clearText();
        MainScreen.text("Your time spent fighting the creatures of this realm has sharpened your wit.");
        MainScreen.doNext(perkBuyMenu);
    }


}