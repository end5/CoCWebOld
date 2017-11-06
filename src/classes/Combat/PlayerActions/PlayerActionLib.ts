import LearnedSpellAction from './LearnedSpellAction';
import PlayerCombatAction from './PlayerCombatAction';
import * as MagicalAttack from './PlayerMagicalAttacks';
import * as PhysicalAttack from './PlayerPhysicalAttacks';
import * as Spells from './PlayerSpells';
import Player from '../../Player';
import Library from '../../Utilities/Library';

class PlayerActionLib<ActionType extends PlayerCombatAction> {
    protected list: ActionType[];
    public getPossibleActions(player: Player): ActionType[] {
        let list = [];
        for (let index: number = 0; index < this.list.length; index++) {
            list.push(this.list[index].isPossible(player));
        }
        return list;
    }
}

export class PlayerPhysicalActionLib extends PlayerActionLib<PlayerCombatAction> {
    public constructor() {
        super();
        this.list.push(new PhysicalAttack.AnemoneSting());
        this.list.push(new PhysicalAttack.Bite());
        this.list.push(new PhysicalAttack.NagaBiteAttack());
        this.list.push(new PhysicalAttack.SpiderBiteAttack());
        this.list.push(new PhysicalAttack.FireBow());
        this.list.push(new PhysicalAttack.Constrict());
        this.list.push(new PhysicalAttack.Kick());
        this.list.push(new PhysicalAttack.Gore());
        this.list.push(new PhysicalAttack.Infest());
        this.list.push(new PhysicalAttack.Kiss());
        this.list.push(new PhysicalAttack.Sting());
        this.list.push(new PhysicalAttack.Web());
        this.list.push(new PhysicalAttack.TailWhip());
    }
}

export class PlayerMagicalActionLib extends PlayerActionLib<PlayerCombatAction> {
    public constructor() {
        super();
        this.list.push(new MagicalAttack.Berserk());
        this.list.push(new MagicalAttack.DragonBreath());
        this.list.push(new MagicalAttack.Fireball());
        this.list.push(new MagicalAttack.Hellfire());
        this.list.push(new MagicalAttack.Possess());
        this.list.push(new MagicalAttack.SuperWhisperAttack());
        this.list.push(new MagicalAttack.CorruptedFoxFire());
        this.list.push(new MagicalAttack.KitsuneTerror());
        this.list.push(new MagicalAttack.FoxFire());
        this.list.push(new MagicalAttack.KitsuneTerror());
        this.list.push(new MagicalAttack.ShieldingSpell());
        this.list.push(new MagicalAttack.ImmolationSpell());
    }
}

export class PlayerSpellActionLib extends PlayerActionLib<LearnedSpellAction> {
    public constructor() {
        super();
        this.list.push(new Spells.SpellArouse());
        this.list.push(new Spells.SpellBlind());
        this.list.push(new Spells.SpellChargeWeapon());
        this.list.push(new Spells.SpellCleansingPalm());
        this.list.push(new Spells.SpellHeal());
        this.list.push(new Spells.SpellMight());
        this.list.push(new Spells.SpellWhitefire());
    }
}