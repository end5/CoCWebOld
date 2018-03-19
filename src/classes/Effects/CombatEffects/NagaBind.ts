import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import CombatEffect from '../CombatEffect';

export class NagaBind extends CombatEffect {
    public update(character: Character) {
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            character.stats.lust += 5;
            DisplayText("Coiled tightly by the naga and utterly immobilized, you can't help but become aroused thanks to your bondage fetish.");
            DisplayText("\n\n");
        }
    }
}
