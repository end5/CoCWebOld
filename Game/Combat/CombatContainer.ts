import { IActionRespond } from './IActionRespond';
import { CombatRewards } from './CombatRewards';
import { CombatStats } from './CombatStats';
import { EndScenes } from './EndScenes';
import { Character } from '../Character/Character';
import { CombatEffectList } from '../Effects/CombatEffectList';
import { StatusEffectType } from '../Effects/StatusEffectType';
import { ICombatAction } from './Actions/ICombatAction';

export abstract class CombatContainer {
    private character: Character;
    public abstract readonly action: ICombatAction;
    public abstract readonly respond: IActionRespond;
    public abstract readonly endScenes: EndScenes;
    public abstract readonly rewards: CombatRewards;

    public readonly stats: CombatStats;
    public readonly effects: CombatEffectList;

    public grappledEnemy?: Character;

    public constructor(character: Character) {
        this.character = character;
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
