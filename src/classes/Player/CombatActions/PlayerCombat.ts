import LearnedSpellAction from './LearnedSpellAction';
import { PlayerMagicalActionLib, PlayerPhysicalActionLib, PlayerSpellActionLib } from './PlayerActionLib';
import PlayerActionPerform from './PlayerActionPerform';
import PlayerAttack from './PlayerAttack';
import PlayerCombatAction from './PlayerCombatAction';
import PlayerFantasize from './PlayerFantasize';
import PlayerRun from './PlayerRun';
import PlayerStruggle from './PlayerStruggle';
import PlayerTease from './PlayerTease';
import PlayerWait from './PlayerWait';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../Player';

export function hasSpells(player: Player): boolean {
    return spellCount(player) > 0;
}

export function spellCount(player: Player): number {
    return [StatusAffectType.KnowsArouse,
        StatusAffectType.KnowsHeal,
        StatusAffectType.KnowsMight,
        StatusAffectType.KnowsCharge,
        StatusAffectType.KnowsBlind,
        StatusAffectType.KnowsWhitefire]
        .filter((name: StatusAffectType) => {
            return player.statusAffects.has(name);
        })
        .length;
}

export default class PlayerCombat implements PlayerActionPerform {
    private magicalLib = new PlayerMagicalActionLib();
    private physicalLib = new PlayerPhysicalActionLib();
    private spellsLib = new PlayerSpellActionLib();
    
    private attackAction = new PlayerAttack();
    private struggleAction = new PlayerStruggle();
    private teaseAction = new PlayerTease();
    private runAction = new PlayerRun();
    private waitAction = new PlayerWait();
    private fantasizeAction = new PlayerFantasize();
    
    public attack(): PlayerCombatAction {
        return this.attackAction;
    }

    public struggle(): PlayerCombatAction {
        return this.struggleAction;
    }

    public approach(): PlayerCombatAction {
        DisplayText.clear();
        DisplayText.text("You close the distance between you and " + monster.desc.a + monster.desc.short + " as quickly as possible.\n\n");
        player.statusAffects.remove(StatusAffectType.KnockedBack);
    }

    public tease(): PlayerCombatAction {
        return this.teaseAction;
    }
    
    public spells(): PlayerCombatAction[] {
        return this.spellsLib.getPossibleActions(player);
    }
    
    public useItem(): PlayerCombatAction {
        throw new Error("Method not implemented.");
    }

    public run(): PlayerCombatAction {
        this.runAction;
    }

    public physicalAttacks(): PlayerCombatAction[] {
        return this.physicalLib.getPossibleActions(player);
    }

    public magicAttacks(): PlayerCombatAction[] {
        return this.magicalLib.getPossibleActions(player);
    }

    public wait(): PlayerCombatAction {
        return this.waitAction;
    }

    public fantasize(): PlayerCombatAction {
        return this.fantasizeAction;
    }
}