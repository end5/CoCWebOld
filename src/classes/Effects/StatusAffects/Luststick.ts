import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import GenderDescriptor from '../../Descriptors/GenderDescriptor';
import Utils from '../../Utilities/Utils';
import StatusAffect from '../StatusAffect';

export class LustStick extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
            if (character.lowerBody.cockSpot.hasCock() && enemy.charType == (CharacterType.Harpy | CharacterType.Sophie)) {
                //Chance to cleanse!
                if (character.perks.has(PerkType.Medicine) && Utils.rand(100) <= 14) {
                    character.statusAffects.remove(StatusAffectType.Luststick);
                    return "You manage to cleanse the harpy lip-gloss from your system with your knowledge of medicine!\n\n";
                }
                else if (Utils.rand(5) == 0) {
                    character.stats.lust += 20;
                    if (Utils.rand(2) == 0) return "A fantasy springs up from nowhere, dominating your thoughts for a few moments.  In it, you're lying down in a soft nest.  Gold-rimmed lips are noisily slurping around your " + CockDescriptor.describeCock(character, character.lowerBody.cockSpot.get(0)) + ", smearing it with her messy aphrodisiac until you're completely coated in it.  She looks up at you knowingly as the two of you get ready to breed the night away...\n\n";
                    else return "An idle daydream flutters into your mind.  In it, you're fucking a harpy's asshole, clutching tightly to her wide, feathery flanks as the tight ring of her pucker massages your " + CockDescriptor.describeCock(character, character.lowerBody.cockSpot.get(0)) + ".  She moans and turns around to kiss you on the lips, ensuring your hardness.  Before long her feverish grunts of pleasure intensify, and you feel the egg she's birthing squeezing against you through her internal walls...\n\n";
                }
            }
        }
        else { // Monster
            character.statusAffects.get(StatusAffectType.LustStick).value1 += 1;
            //Damage = 5 + bonus score minus
            //Reduced by lust vuln of course
            character.stats.lust += Math.round(character.stats.lustVuln * (5 + character.statusAffects.get(StatusAffectType.LustStick).value2));
            switch (character.statusAffects.get(StatusAffectType.LustStick).value1) {
                //First:
                case 1:
                    if (character.desc.plural) return "One of " + character.desc.a + character.desc.short + " pants and crosses " + GenderDescriptor.mf(character, "his", "her") + " eyes for a moment.  " + GenderDescriptor.mf(character, "His", "Her") + " dick flexes and bulges, twitching as " + GenderDescriptor.mf(character, "he", "she") + " loses himself in a lipstick-fueled fantasy.  When " + GenderDescriptor.mf(character, "he", "she") + " recovers, you lick your lips and watch " + GenderDescriptor.mf(character, "his", "her") + " blush spread.\n\n";
                    else return character.desc.capitalA + character.desc.short + " pants and crosses " + character.desc.possessivePronoun + " eyes for a moment.  " + GenderDescriptor.mf(character, "His", "Her") + " dick flexes and bulges, twitching as " + character.desc.subjectivePronoun + " loses " + GenderDescriptor.mf(character, "himself", "herself") + " in a lipstick-fueled fantasy.  When " + character.desc.subjectivePronoun + " recovers, you lick your lips and watch " + GenderDescriptor.mf(character, "his", "her") + " blush spread.\n\n";
                //Second:
                case 2:
                    if (character.desc.plural) return character.desc.capitalA + character.desc.short + " moan out loud, " + character.desc.possessivePronoun + " dicks leaking and dribbling while " + character.desc.subjectivePronoun + " struggle not to touch " + character.desc.objectivePronoun + ".\n\n";
                    else return character.desc.capitalA + character.desc.short + " moans out loud, " + character.desc.possessivePronoun + " dick leaking and dribbling while " + character.desc.subjectivePronoun + " struggles not to touch it.\n\n";
                //Third:
                case 3:
                    if (character.desc.plural) return character.desc.capitalA + character.desc.short + " pump " + character.desc.possessivePronoun + " hips futilely, air-humping non-existent partners.  Clearly your lipstick is getting to " + character.desc.objectivePronoun + ".\n\n";
                    else return character.desc.capitalA + character.desc.short + " pumps " + character.desc.possessivePronoun + " hips futilely, air-humping a non-existent partner.  Clearly your lipstick is getting to " + character.desc.objectivePronoun + ".\n\n";
                    break;
                //Fourth:
                case 4:
                    if (character.desc.plural) return character.desc.capitalA + character.desc.short + " close " + character.desc.possessivePronoun + " eyes and grunt, " + character.desc.possessivePronoun + " cocks twitching, bouncing, and leaking pre-cum.\n\n";
                    else return character.desc.capitalA + character.desc.short + " closes " + character.desc.objectivePronoun + " eyes and grunts, " + character.desc.possessivePronoun + " cock twitching, bouncing, and leaking pre-cum.\n\n";
                //Fifth and repeat:
                default:
                    if (character.desc.plural) return "Drops of pre-cum roll steadily out of their dicks.  It's a marvel " + character.desc.subjectivePronoun + " haven't given in to " + character.desc.possessivePronoun + " lusts yet.\n\n";
                    else return "Drops of pre-cum roll steadily out of " + character.desc.a + character.desc.short + "'s dick.  It's a marvel " + character.desc.subjectivePronoun + " hasn't given in to " + character.desc.possessivePronoun + " lust yet.\n\n";
            }
        }
    }
}
