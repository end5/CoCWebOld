import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import StatusAffect from '../StatusAffect';

export class TentacleBind extends StatusAffect {
    public update(character: Character): string {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            character.stats.lust += 3;
            return "Wrapped tightly in the tentacles, you find it hard to resist becoming more and more aroused...\n\n";
        }
        return "You are firmly trapped in the tentacle's coils.  <b>The only thing you can try to do is struggle free!</b>\n\n";
    }
}
