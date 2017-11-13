import Character from '../../Character/Character';
import Flags, { FlagEnum } from '../../Game/Flags';
import StatusAffect from '../StatusAffect';

export class NagaBind extends StatusAffect {
    public update(character: Character): string {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            character.stats.lust += 5;
            return "Coiled tightly by the naga and utterly immobilized, you can't help but become aroused thanks to your bondage fetish.\n\n";
        }
    }
}