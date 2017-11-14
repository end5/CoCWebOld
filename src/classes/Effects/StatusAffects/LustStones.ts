import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class LustStones extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        character.stats.lust += character.statusAffects.get("LustStones").value1 + 4;
        //[When witches activate the stones for goo bodies]
        if (character.lowerBody.isGoo()) {
            return "<b>The stones start vibrating again, making your liquid body ripple with pleasure.  The witches snicker at the odd sight you are right now.\n\n</b>";
        }
        //[When witches activate the stones for solid bodies]
        else {
            return "<b>The smooth stones start vibrating again, sending another wave of teasing bliss throughout your body.  The witches snicker at you as you try to withstand their attack.\n\n</b>";
        }
    }
}
