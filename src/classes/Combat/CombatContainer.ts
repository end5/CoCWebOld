import ActionPerform from './ActionPerform';
import ActionRespond from './ActionRespond';
import CombatRewards from './CombatRewards';
import CombatStats from './CombatStats';
import EndScenes from './EndScenes';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import DisplayText from '../display/DisplayText';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Player from '../Player/Player';
import ChainedDrop from '../Utilities/ChainedDrop';
import Utils from '../Utilities/Utils';

export default class CombatContainer {
    public readonly perform: ActionPerform;
    public readonly respond: ActionRespond;
    public readonly endScenes: EndScenes;

    public readonly stats: CombatStats;
    public readonly rewards: CombatRewards;
    
    public constructor(character: Character, perform: ActionPerform, respond: ActionRespond, end: EndScenes) {
        this.perform = perform;
        this.respond = respond;
        this.endScenes = end;
        this.stats = new CombatStats(character);
    }
}