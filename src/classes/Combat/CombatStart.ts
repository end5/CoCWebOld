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
        if (monster.desc.short == "Ember") {
            monster.desc.subjectivePronoun = emberScene.emberMF("he", "she");
            monster.desc.objectivePronoun = emberScene.emberMF("him", "her");
            monster.desc.possessivePronoun = emberScene.emberMF("his", "her");
        }
        //Reduce enemy def if player has precision!
        if (player.perks.has(PerkType.Precision) && player.stats.int >= 25) {
            if (monster.armorDef <= 10) monster.armorDef = 0;
            else monster.armorDef -= 10;
        }
        doNext(playerMenu);
    }
    public startCombatImmediate(monster: Monster, _plotFight: boolean): void {
        startCombat(monster, _plotFight);
    }

}