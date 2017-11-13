import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class BasiliskCompulsion extends StatusAffect {
    public update(character: Character): string {
        Basilisk.basiliskSpeed(character, 15);
        //Continuing effect text: 
        return "<b>You still feel the spell of those grey eyes, making your movements slow and difficult, the remembered words tempting you to look into its eyes again. You need to finish this fight as fast as your heavy limbs will allow.</b>\n\n";
    }
}
