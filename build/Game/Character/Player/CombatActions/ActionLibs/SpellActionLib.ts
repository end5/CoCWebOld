import CombatActionLib from '../../../../Combat/CombatActionLib';
import LearnedSpellAction from '../LearnedSpellAction';
import * as Spells from '../Spells';

class SpellActionLib extends CombatActionLib<LearnedSpellAction> {
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

const spellActionLib = new SpellActionLib();
export default spellActionLib as SpellActionLib;
