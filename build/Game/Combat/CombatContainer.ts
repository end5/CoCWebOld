import ActionPerform from './ActionPerform';
import ActionRespond from './ActionRespond';
import CombatRewards from './CombatRewards';
import CombatStats from './CombatStats';
import EndScenes from './EndScenes';
import Character from '../Character/Character';
import CombatEffectList from '../Effects/CombatEffectList';
import { StatusAffectType } from '../Effects/StatusAffectType';

export default class CombatContainer {
    private character: Character;
    public readonly perform: ActionPerform;
    public readonly respond: ActionRespond;
    public readonly endScenes: EndScenes;

    public readonly stats: CombatStats;
    public readonly rewards: CombatRewards;

    public readonly effects: CombatEffectList;

    public grappledEnemy: Character;

    public constructor(character: Character, perform: ActionPerform, respond: ActionRespond, end: EndScenes) {
        this.character = character;
        this.perform = perform;
        this.respond = respond;
        this.endScenes = end;
        this.stats = new CombatStats(character);
        this.effects = new CombatEffectList(character);
    }

    public hasSpells(): boolean {
        return this.spellCount() > 0;
    }

    public spellCount(): number {
        return [StatusAffectType.KnowsArouse,
        StatusAffectType.KnowsHeal,
        StatusAffectType.KnowsMight,
        StatusAffectType.KnowsCharge,
        StatusAffectType.KnowsBlind,
        StatusAffectType.KnowsWhitefire]
            .filter((name: StatusAffectType) => {
                return this.character.statusAffects.has(name);
            })
            .length;
    }
}
