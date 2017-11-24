import Encounter from './Encounter';
import Character from '../Character/Character';
import MainScreen, { TopButton } from '../display/MainScreen';
import Game from '../Game/Game';
import Player from '../Player/Player';

export default class CombatManager {
    private static encounter: Encounter;
    public static beginBattle(player: Player, allyParty: Character[], enemyParty: Character[], combatCleanUp: boolean = true) {
        CombatManager.encounter = new Encounter(player, allyParty, enemyParty, combatCleanUp);
        CombatManager.startCombat();
    }
    
    private static startCombat(): void {
        MainScreen.getTopButton(TopButton.Data).hide();
        MainScreen.getTopButton(TopButton.Appearance).hide();
        MainScreen.getTopButton(TopButton.Level).hide();
        MainScreen.getTopButton(TopButton.Perks).hide();
        //Flag the game as being "in combat"
        Game.inCombat = true;
        /*
        if (monster.desc.short == "Ember") {
            monster.desc.subjectivePronoun = emberScene.emberMF("he", "she");
            monster.desc.objectivePronoun = emberScene.emberMF("him", "her");
            monster.desc.possessivePronoun = emberScene.emberMF("his", "her");
        }*/
        MainScreen.doNext(playerMenu);
    }
}