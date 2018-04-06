import CombatAction from '../../../../Combat/Actions/CombatAction';
import CombatActionLib from '../../../../Combat/CombatActionLib';
import * as PhysicalAttack from '../PhysicalAttacks';

export default class PhysicalActionLib extends CombatActionLib<CombatAction> {
    public constructor() {
        super();
        this.list.push(new PhysicalAttack.AnemoneSting());
        this.list.push(new PhysicalAttack.Bite());
        this.list.push(new PhysicalAttack.NagaBite());
        this.list.push(new PhysicalAttack.SpiderBite());
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
