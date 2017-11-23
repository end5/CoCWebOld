import ActionPerform from './ActionPerform';
import ActionRespond from './ActionRespond';
import CombatEndRespond from './CombatEndRespond';
import CombatHP from './CombatHP';
import CombatRewards from './CombatRewards';
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
    public readonly end: CombatEndRespond;

    public readonly hp: CombatHP;
    public readonly rewards: CombatRewards;
    
    public constructor(character: Character, perform: ActionPerform, respond: ActionRespond, end: CombatEndRespond) {
        this.perform = perform;
        this.respond = respond;
        this.end = end;
        this.hp = new CombatHP(character);
    }
}