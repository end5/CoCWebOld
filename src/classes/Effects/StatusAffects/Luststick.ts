import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class Luststick extends StatusAffect {
    public update(character: Character, enemy: Character): string {
        if (character.lowerBody.cockSpot.hasCock() && enemy.charType == (CharacterType.Harpy | CharacterType.Sophie)) {
            //Chance to cleanse!
            if (character.perks.has("Medicine") && Utils.rand(100) <= 14) {
                character.statusAffects.remove("Luststick");
                return "You manage to cleanse the harpy lip-gloss from your system with your knowledge of medicine!\n\n";
            }
            else if (Utils.rand(5) == 0) {
                character.stats.lust += 20;
                if (Utils.rand(2) == 0) return "A fantasy springs up from nowhere, dominating your thoughts for a few moments.  In it, you're lying down in a soft nest.  Gold-rimmed lips are noisily slurping around your " + CockDescriptor.describeCock(character, character.lowerBody.cockSpot.get(0)) + ", smearing it with her messy aphrodisiac until you're completely coated in it.  She looks up at you knowingly as the two of you get ready to breed the night away...\n\n";
                else return "An idle daydream flutters into your mind.  In it, you're fucking a harpy's asshole, clutching tightly to her wide, feathery flanks as the tight ring of her pucker massages your " + CockDescriptor.describeCock(character, character.lowerBody.cockSpot.get(0)) + ".  She moans and turns around to kiss you on the lips, ensuring your hardness.  Before long her feverish grunts of pleasure intensify, and you feel the egg she's birthing squeezing against you through her internal walls...\n\n";
            }
        }
    }
}
