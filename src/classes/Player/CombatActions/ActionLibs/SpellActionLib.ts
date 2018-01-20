import CombatActionLib from '../../../Combat/CombatActionLib';
import LearnedSpellAction from '../LearnedSpellAction';
import Spells from '../Spells';

export default class SpellActionLib extends CombatActionLib<LearnedSpellAction> {
    public constructor() {
        super();
        this.list.push(new Spells.Arouse());
        this.list.push(new Spells.Blind());
        this.list.push(new Spells.ChargeWeapon());
        this.list.push(new Spells.CleansingPalm());
        this.list.push(new Spells.Heal());
        this.list.push(new Spells.Might());
        this.list.push(new Spells.Whitefire());
    }
}
