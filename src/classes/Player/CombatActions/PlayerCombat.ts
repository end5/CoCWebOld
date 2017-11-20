import LearnedSpellAction from './LearnedSpellAction';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import { PlayerMagicalActionLib, PlayerPhysicalActionLib, PlayerSpellActionLib } from ../Player/PlayerActionLib';
import PlayerAttack from ../Player/PlayerAttack';
import PlayerCombatAction from ../Player/PlayerCombatAction';
import PlayerCombatInterface from ../Player/PlayerCombatInterface';
import PlayerFantasize from ../Player/PlayerFantasize';
import PlayerRun from ../Player/PlayerRun';
import PlayerStruggle from ../Player/PlayerStruggle';
import PlayerTease from ../Player/PlayerTease';
import PlayerWait from ../Player/PlayerWait';

export function hasSpells(player: Player): boolean {
    return spellCount(player) > 0;
}

export function spellCount(player: Player): number {
    return ["KnowsArouse", "KnowsHeal", "KnowsMight", "KnowsCharge", "KnowsBlind", "KnowsWhitefire"]
        .filter((name: string) => {
            return player.statusAffects.has(name);
        })
        .length;
}

export default class PlayerCombat implements PlayerCombatInterface {
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
        player.statusAffects.remove("KnockedBack");
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