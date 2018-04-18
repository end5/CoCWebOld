import CombatParty from './CombatParty';
import Encounter from './Encounter';
import MainScreen, { TopButton } from '../../Engine/Display/MainScreen';
import List from '../../Engine/Utilities/List';
import Character from '../Character/Character';
import { CombatEffectType } from '../Effects/CombatEffectType';
import Item from '../Items/Item';

class CombatManager {
    public readonly itemsOnFloor: List<Item> = new List();
    public encounter: Encounter;
    public beginBattle(mainCharacter: Character, allyParty: Character[], enemyParty: Character[]) {
        this.encounter = new Encounter(mainCharacter, allyParty, enemyParty);
        this.startCombat();
    }

    private startCombat(): void {
        MainScreen.getTopButton(TopButton.Data).hide();
        MainScreen.getTopButton(TopButton.Appearance).hide();
        MainScreen.getTopButton(TopButton.PerkUp).hide();
        MainScreen.getTopButton(TopButton.Perks).hide();
        // Flag the game as being "in combat"
        // Game.inCombat = true;
        /*
        if (monster.desc.short == "Ember") {
            monster.desc.subjectivePronoun = emberScene.emberMF("he", "she");
            monster.desc.objectivePronoun = emberScene.emberMF("him", "her");
            monster.desc.possessivePronoun = emberScene.emberMF("his", "her");
        }*/

        this.loadPartyCombatEffects(this.encounter.allyParty);
        this.loadPartyCombatEffects(this.encounter.enemyParty);

        this.encounter.performRound();
    }

    private loadPartyCombatEffects(party: CombatParty) {
        for (const member of party.ableMembers) {
            this.loadCombatEffects(member);
        }
    }

    private loadCombatEffects(character: Character) {
        for (const type of character.statusAffects.keys()) {
            if (CombatEffectType[type] !== undefined)
                character.combat.effects.add(CombatEffectType[type] as CombatEffectType);
        }
        for (const type of character.perks.keys()) {
            if (CombatEffectType[type] !== undefined)
                character.combat.effects.add(CombatEffectType[type] as CombatEffectType);
        }
    }

    private isInParty(character: Character, party: CombatParty): boolean {
        for (const member of party.allMembers) {
            if (member === character) {
                return true;
            }
        }
        return false;
    }

    public getAllyParty(character: Character): CombatParty {
        return this.isInParty(character, this.encounter.allyParty) ? this.encounter.allyParty : this.encounter.enemyParty;
    }

    public getEnemyParty(character: Character): CombatParty {
        return this.isInParty(character, this.encounter.allyParty) ? this.encounter.enemyParty : this.encounter.allyParty;
    }
}

const combatManager = new CombatManager();
export default combatManager as CombatManager;