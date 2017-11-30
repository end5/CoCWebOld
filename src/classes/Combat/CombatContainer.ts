import ActionPerform from './ActionPerform';
import ActionRespond from './ActionRespond';
import CombatRewards from './CombatRewards';
import CombatStats from './CombatStats';
import EndScenes from './EndScenes';
import Character from '../Character/Character';
import CombatEffectList from '../Effects/CombatEffectList';

export default class CombatContainer {
    public readonly perform: ActionPerform;
    public readonly respond: ActionRespond;
    public readonly endScenes: EndScenes;

    public readonly stats: CombatStats;
    public readonly rewards: CombatRewards;

    public readonly effects: CombatEffectList;
    
    public grappledEnemy: Character;

    public constructor(character: Character, perform: ActionPerform, respond: ActionRespond, end: EndScenes) {
        this.perform = perform;
        this.respond = respond;
        this.endScenes = end;
        this.stats = new CombatStats(character);
        this.effects = new CombatEffectList(character);
    }
}