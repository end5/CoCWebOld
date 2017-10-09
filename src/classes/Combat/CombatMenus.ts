private fireBreathMenu(): void {
    MainScreen.clearText();
    MainScreen.text("Which of your special fire-breath attacks would you like to use?");
    simpleChoices("Akbal's", fireballuuuuu, "Hellfire", hellFire, "Dragonfire", dragonBreath, "", null, "Back", playerMenu);
}

public magicMenu(): void {
    //Pass false to combatMenu instead:	menuLoc = 3;
    if(inCombat && player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 2) {
        MainScreen.clearText();
        MainScreen.text("You reach for your magic, but you just can't manage the focus necessary.  <b>Your ability to use magic was sealed, and now you've wasted a chance to attack!</b>\n\n");
        enemyAI();
        return;
    }
    menu();
    MainScreen.clearText();
    MainScreen.text("What spell will you use?\n\n");
    //WHITE SHITZ
    let whiteLustCap: number = 75;
    if(player.perks.has("Enlightened") && player.stats.cor < 10) whiteLustCap += 10;

    if(player.stats.lust >= whiteLustCap)
        MainScreen.text("You are far too aroused to focus on white magic.\n\n");
    else {
        if(player.statusAffects.has("KnowsCharge")) {
            if (!player.statusAffects.has("ChargeWeapon"))
                MainScreen.addButton(0, "Charge W.", spellChargeWeapon);
            else MainScreen.text("<b>Charge weapon is already active and cannot be cast again.</b>\n\n");
        }
        if (player.statusAffects.has("KnowsBlind")) {
            if (monster.findStatusAffect(StatusAffects.Blind) < 0)
                MainScreen.addButton(1, "Blind", spellBlind);
            else MainScreen.text("<b>" + monster.capitalA + monster.short + " is already affected by blind.</b>\n\n");
        }
        if (player.statusAffects.has("KnowsWhitefire")) MainScreen.addButton(2, "Whitefire", spellWhitefire);
    }
    //BLACK MAGICSKS
    if (player.stats.lust < 50)
        MainScreen.text("You aren't turned on enough to use any black magics.\n\n");
    else {
        if(player.statusAffects.has("KnowsArouse")) MainScreen.addButton(5, "Arouse", spellArouse);
        if(player.statusAffects.has("KnowsHeal")) MainScreen.addButton(6, "Heal", spellHeal);
        if(player.statusAffects.has("KnowsMight")) {
            if (!player.statusAffects.has("Might"))
                MainScreen.addButton(7, "Might", spellMight);
            else MainScreen.text("<b>You are already under the effects of Might and cannot cast it again.</b>\n\n");
        }
    }
    // JOJO ABILITIES -- kind makes sense to stuff it in here along side the white magic shit (also because it can't fit into M. Specials :|
    if (player.perks.has("CleansingPalm") && player.stats.cor < 10) {
        MainScreen.addButton(3, "C.Palm", spellCleansingPalm);
    }
    MainScreen.addButton(9, "Back", combatMenu, false);
}
