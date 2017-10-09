export default class CombatStart {
    public startCombat(monster_: Monster, plotFight_: boolean = false): void {
        plotFight = plotFight_;
        mainView.hideMenuButton(MainView.MENU_DATA);
        mainView.hideMenuButton(MainView.MENU_APPEARANCE);
        mainView.hideMenuButton(MainView.MENU_LEVEL);
        mainView.hideMenuButton(MainView.MENU_PERKS);
        //Flag the game as being "in combat"
        inCombat = true;
        monster = monster_;
        if (monster.short == "Ember") {
            monster.pronoun1 = emberScene.emberMF("he", "she");
            monster.pronoun2 = emberScene.emberMF("him", "her");
            monster.pronoun3 = emberScene.emberMF("his", "her");
        }
        //Reduce enemy def if player has precision!
        if (player.perks.has("Precision") && player.stats.int >= 25) {
            if (monster.armorDef <= 10) monster.armorDef = 0;
            else monster.armorDef -= 10;
        }
        doNext(playerMenu);
    }
    public startCombatImmediate(monster: Monster, _plotFight: boolean): void {
        startCombat(monster, _plotFight);
    }

}