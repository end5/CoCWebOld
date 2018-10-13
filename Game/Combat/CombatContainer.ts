import { IActionRespond } from './IActionRespond';
import { CombatRewards } from './CombatRewards';
import { CombatStats } from './CombatStats';
import { DefaultRespond } from './Default/DefaultRespond';
import { EndScenes } from './EndScenes';
import { Character } from '../Character/Character';
import { CombatEffectList } from '../Effects/CombatEffectList';
import { StatusEffectType } from '../Effects/StatusEffectType';
import { ICombatAction } from './Actions/ICombatAction';

export class CombatContainer {
    private character: Character;
    public readonly action: ICombatAction;
    public readonly respond: IActionRespond;
    public readonly endScenes: EndScenes;

    public readonly stats: CombatStats;
    public readonly rewards: CombatRewards;

    public readonly effects: CombatEffectList;

    public grappledEnemy: Character;

    public constructor(character: Character, action: ICombatAction, respond: IActionRespond = new DefaultRespond(), end: EndScenes) {
        this.character = character;
        this.action = action;
        this.respond = respond;
        this.endScenes = end;
        this.stats = new CombatStats(character);
        this.effects = new CombatEffectList(character);
    }

    public hasSpells(): boolean {
        return this.spellCount() > 0;
    }

    public spellCount(): number {
        return [StatusEffectType.KnowsArouse,
        StatusEffectType.KnowsHeal,
        StatusEffectType.KnowsMight,
        StatusEffectType.KnowsCharge,
        StatusEffectType.KnowsBlind,
        StatusEffectType.KnowsWhitefire]
            .filter((name: StatusEffectType) => {
                return this.character.effects.has(name);
            })
            .length;
    }
}
