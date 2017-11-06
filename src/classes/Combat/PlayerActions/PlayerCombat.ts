import LearnedSpellAction from './LearnedSpellAction';
import { PlayerMagicalActionLib, PlayerPhysicalActionLib, PlayerSpellActionLib } from './PlayerActionLib';
import PlayerAttack from './PlayerAttack';
import PlayerCombatAction from './PlayerCombatAction';
import PlayerCombatInterface from './PlayerCombatInterface';
import PlayerFantasize from './PlayerFantasize';
import PlayerRun from './PlayerRun';
import PlayerStruggle from './PlayerStruggle';
import PlayerTease from './PlayerTease';
import PlayerWait from './PlayerWait';
import { EarType } from '../../Body/Head';
import { TailType } from '../../Body/LowerBody';
import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

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
    
    public attack(player: Player, monster: Character): void {
        this.attackAction.use(player, monster);
    }

    public struggle(player: Player, monster: Character): void {
        this.struggleAction.use(player, monster);
    }

    public approach(player: Player, monster: Character): void {
        MainScreen.clearText();
        MainScreen.text("You close the distance between you and " + monster.desc.a + monster.desc.short + " as quickly as possible.\n\n");
        player.statusAffects.remove("KnockedBack");
    }

    public tease(player: Player, monster: Character) {
        this.teaseAction.use(player, monster, true);
    }
    
    public spells(player: Player, monster: Character): LearnedSpellAction[] {
        return this.spellsLib.getPossibleActions(player);
    }
    
    public useItem(player: Player, monster: Character): void {
        throw new Error("Method not implemented.");
    }

    public run(player: Player, monster: Character, success: boolean): void {
        this.runAction.use(player, monster, success);
    }

    public physicalAttacks(player: Player): PlayerCombatAction[] {
        return this.physicalLib.getPossibleActions(player);
    }

    public magicAttacks(player: Player): PlayerCombatAction[] {
        return this.magicalLib.getPossibleActions(player);
    }

    public wait(player: Player, monster: Character): void {
        this.waitAction.use(player, monster);
    }

    public fantasize(player: Player, monster: Character): void {
        this.fantasizeAction.use(player, monster);
    }
}