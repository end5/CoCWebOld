private fireBreathMenu(): void {
    DisplayText.clear();
    DisplayText.text("Which of your special fire-breath attacks would you like to use?");
    simpleChoices("Akbal's", fireballuuuuu, "Hellfire", hellFire, "Dragonfire", dragonBreath, "", null, "Back", playerMenu);
}

private canUseMagic(): boolean {
    if (player.statusAffects.has(StatusAffectType.ThroatPunch)) return false;
    if (player.statusAffects.has(StatusAffectType.WebSilence)) return false;
    if (player.statusAffects.has(StatusAffectType.GooArmorSilence)) return false;
    return true;
}


public magicMenu(): void {
    //Pass false to combatMenu instead:	menuLoc = 3;
    if(inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value2 == 2) {
        DisplayText.clear();
        DisplayText.text("You reach for your magic, but you just can't manage the focus necessary.  <b>Your ability to use magic was sealed, and now you've wasted a chance to attack!</b>\n\n");
        enemyAI();
        return;
    }
    menu();
    DisplayText.clear();
    DisplayText.text("What spell will you use?\n\n");
    //WHITE SHITZ
    let whiteLustCap: number = 75;
    if(player.perks.has(PerkType.Enlightened) && player.stats.cor < 10) whiteLustCap += 10;

    if(player.stats.lust >= whiteLustCap)
        DisplayText.text("You are far too aroused to focus on white magic.\n\n");
    else {
        if(player.statusAffects.has(StatusAffectType.KnowsCharge)) {
            if (!player.statusAffects.has(StatusAffectType.ChargeWeapon))
                DisplayText.addButton(0, "Charge W.", spellChargeWeapon);
            else DisplayText.text("<b>Charge weapon is already active and cannot be cast again.</b>\n\n");
        }
        if (player.statusAffects.has(StatusAffectType.KnowsBlind)) {
            if (monster.findStatusAffect(StatusAffects.Blind) < 0)
                DisplayText.addButton(1, "Blind", spellBlind);
            else DisplayText.text("<b>" + monster.desc.capitalA + monster.desc.short + " is already affected by blind.</b>\n\n");
        }
        if (player.statusAffects.has(StatusAffectType.KnowsWhitefire)) DisplayText.addButton(2, "Whitefire", spellWhitefire);
    }
    //BLACK MAGICSKS
    if (player.stats.lust < 50)
        DisplayText.text("You aren't turned on enough to use any black magics.\n\n");
    else {
        if(player.statusAffects.has(StatusAffectType.KnowsArouse)) DisplayText.addButton(5, "Arouse", spellArouse);
        if(player.statusAffects.has(StatusAffectType.KnowsHeal)) DisplayText.addButton(6, "Heal", spellHeal);
        if(player.statusAffects.has(StatusAffectType.KnowsMight)) {
            if (!player.statusAffects.has(StatusAffectType.Might))
                DisplayText.addButton(7, "Might", spellMight);
            else DisplayText.text("<b>You are already under the effects of Might and cannot cast it again.</b>\n\n");
        }
    }
    // JOJO ABILITIES -- kind makes sense to stuff it in here along side the white magic shit (also because it can't fit into M. Specials :|
    if (player.perks.has(PerkType.CleansingPalm) && player.stats.cor < 10) {
        DisplayText.addButton(3, "C.Palm", spellCleansingPalm);
    }
    DisplayText.addButton(9, "Back", combatMenu);
}
