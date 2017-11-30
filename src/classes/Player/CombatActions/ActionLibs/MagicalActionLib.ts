import CombatAction from '../../../Combat/Actions/CombatAction';
import CombatActionLib from '../../../Combat/CombatActionLib';
import MagicalAttack from '../MagicalAttacks';

export default class MagicalActionLib extends CombatActionLib<CombatAction> {
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
