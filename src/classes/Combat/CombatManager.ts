import Encounter from './Encounter';
import Party from './Party';
import Character from '../Character/Character';
import MainScreen, { TopButton } from '../display/MainScreen';
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
            //Flag the game as being "in combat"
            Game.inCombat = true;
            /*
            if (monster.desc.short == "Ember") {
                monster.desc.subjectivePronoun = emberScene.emberMF("he", "she");
                monster.desc.objectivePronoun = emberScene.emberMF("him", "her");
                monster.desc.possessivePronoun = emberScene.emberMF("his", "her");
            }*/
            MainScreen.doNext(playerMenu);

            CombatManager.loadPartyCombatEffects(CombatManager.encounter.allyParty);
            CombatManager.loadPartyCombatEffects(CombatManager.encounter.enemyParty);
        }
    }

    private static loadPartyCombatEffects(party: Party) {
        for (let index = 0; index < party.ableMembers.length; index++) {
            CombatManager.loadCombatEffects(party.ableMembers[index]);
        }
    }

    private static loadCombatEffects(character: Character) {
        for (let index = 0; index < character.statusAffects.count(); index++) {
            let type = character.statusAffects.at(index).type;
            if (CombatEffectType[type] !== undefined)
                character.combat.effects.add(CombatEffectFactory.create(CombatEffectType[type]));
        }
        for (let index = 0; index < character.perks.count(); index++) {
            let type = character.perks.at(index).type;
            if (CombatEffectType[type] !== undefined)
                character.combat.effects.add(CombatEffectFactory.create(CombatEffectType[type]));
        }
    }

    private static isInParty(character: Character, party: Party): boolean {
        for (let index = 0; index < party.allMembers.length; index++) {
            if (party.allMembers[index] == character) {
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