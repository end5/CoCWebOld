import Encounter from './Encounter';
import Party from './Party';
import Character from '../Character/Character';
import MainScreen, { TopButton } from '../display/MainScreen';
import Menus from '../display/Menus/Menus';
import { CombatAbilityFlag } from '../Effects/CombatAbilityFlag';
import CombatEffectFactory from '../Effects/CombatEffectFactory';
import { CombatEffectType } from '../Effects/CombatEffectType';
import Game from '../Game/Game';
import Player from '../Player/Player';

export default class CombatManager {
    private static encounter: Encounter;
    public static beginBattle(player: Player, allyParty: Character[], enemyParty: Character[], combatCleanUp: boolean = true) {
        CombatManager.encounter = new Encounter(player, allyParty, enemyParty, combatCleanUp);
        CombatManager.startCombat();
    }

    private static startCombat(): void {
        if (CombatManager.encounter) {
            MainScreen.getTopButton(TopButton.Data).hide();
            MainScreen.getTopButton(TopButton.Appearance).hide();
            MainScreen.getTopButton(TopButton.PerkUp).hide();
            MainScreen.getTopButton(TopButton.Perks).hide();
            // Flag the game as being "in combat"
            Game.inCombat = true;
            /*
            if (monster.desc.short == "Ember") {
                monster.desc.subjectivePronoun = emberScene.emberMF("he", "she");
                monster.desc.objectivePronoun = emberScene.emberMF("him", "her");
                monster.desc.possessivePronoun = emberScene.emberMF("his", "her");
            }*/
            MainScreen.doNext(Menus.Combat.display);

            CombatManager.loadPartyCombatEffects(CombatManager.encounter.allyParty);
            CombatManager.loadPartyCombatEffects(CombatManager.encounter.enemyParty);
        }
    }

    private static loadPartyCombatEffects(party: Party) {
        for (const member of party.ableMembers) {
            CombatManager.loadCombatEffects(member);
        }
    }

    private static loadCombatEffects(character: Character) {
        for (const type of character.statusAffects.keys()) {
            if (CombatEffectType[type] !== undefined)
                character.combat.effects.add(CombatEffectType[type] as CombatEffectType);
        }
        for (const type of character.perks.keys()) {
            if (CombatEffectType[type] !== undefined)
                character.combat.effects.add(CombatEffectType[type] as CombatEffectType);
        }
    }

    private static isInParty(character: Character, party: Party): boolean {
        for (const member of party.allMembers) {
            if (member === character) {
                return true;
            }
        }
        return false;
    }

    public static getAllyParty(character: Character): Party {
        return CombatManager.isInParty(character, CombatManager.encounter.allyParty) ? CombatManager.encounter.allyParty : CombatManager.encounter.enemyParty;
    }

    public static getEnemyParty(character: Character): Party {
        return CombatManager.isInParty(character, CombatManager.encounter.allyParty) ? CombatManager.encounter.enemyParty : CombatManager.encounter.allyParty;
    }
}
