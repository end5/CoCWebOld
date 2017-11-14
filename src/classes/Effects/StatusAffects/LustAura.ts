import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class LustAura extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            //[LUST GAINED PER ROUND] - Omnibus
            let out: string = "";
            if (enemy.stats.lust < 33) out += "Your groin tingles warmly.  The demon's aura is starting to get to you.\n\n";
            if (enemy.stats.lust >= 33 && enemy.stats.lust < 66) out += "You blush as the demon's aura seeps into you, arousing you more and more.\n\n";
            if (enemy.stats.lust >= 66) {
                out += "You flush bright red with desire as the lust in the air worms its way inside you.  ";
                let randomNumber = Utils.rand(4);
                if (randomNumber == 0) out += "You have a hard time not dropping to your knees to service her right now.\n\n";
                if (randomNumber == 2) out += "The urge to bury your face in her breasts and suckle her pink nipples nearly overwhelms you.\n\n";
                if (randomNumber == 1) out += "You swoon and lick your lips, tasting the scent of the demon's pussy in the air.\n\n";
                if (randomNumber == 3) out += "She winks at you and licks her lips, and you can't help but imagine her tongue sliding all over your body.  You regain composure moments before throwing yourself at her.  That was close.\n\n";
            }
            enemy.stats.lust += 3 + Math.floor(enemy.stats.lib / 20 + enemy.stats.cor / 30);
            return out;
        }
    }
}
