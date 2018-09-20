import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { PerkType } from '../PerkType';
import { describeCock } from '../../Descriptors/CockDescriptor';
import { mf } from '../../Descriptors/GenderDescriptor';

export class LustStick extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType === CharacterType.Player) {
            if (character.body.cocks.length > 0 && (enemy.charType === CharacterType.Harpy || enemy.charType === CharacterType.Sophie)) {
                // Chance to cleanse!
                if (character.perks.has(PerkType.Medicine) && randInt(100) <= 14) {
                    character.combat.effects.remove(CombatEffectType.LustStick);
                    DisplayText("You manage to cleanse the harpy lip-gloss from your system with your knowledge of medicine!");
                    DisplayText("\n\n");
                }
                else if (randInt(5) === 0) {
                    character.stats.lust += 20;
                    if (randInt(2) === 0)
                        DisplayText("A fantasy springs up from nowhere, dominating your thoughts for a few moments.  In it, you're lying down in a soft nest.  Gold-rimmed lips are noisily slurping around your " + describeCock(character, character.body.cocks.get(0)) + ", smearing it with her messy aphrodisiac until you're completely coated in it.  She looks up at you knowingly as the two of you get ready to breed the night away...");
                    else
                        DisplayText("An idle daydream flutters into your mind.  In it, you're fucking a harpy's asshole, clutching tightly to her wide, feathery flanks as the tight ring of her pucker massages your " + describeCock(character, character.body.cocks.get(0)) + ".  She moans and turns around to kiss you on the lips, ensuring your hardness.  Before long her feverish grunts of pleasure intensify, and you feel the egg she's birthing squeezing against you through her internal walls...");
                    DisplayText("\n\n");
                }
            }
        }
        else if (enemy.charType === CharacterType.Player) { // Monster
            character.combat.effects.get(CombatEffectType.LustStick).value1 += 1;
            // Damage = 5 + bonus score minus
            // Reduced by lust vuln of course
            character.stats.lust += Math.round(character.stats.lustVuln * (5 + character.combat.effects.get(CombatEffectType.LustStick).value2));
            switch (character.combat.effects.get(CombatEffectType.LustStick).value1) {
                // First:
                case 1: {
                    if (character.desc.plural)
                        DisplayText("One of " + character.desc.a + character.desc.short + " pants and crosses " + mf(character, "his", "her") + " eyes for a moment.  " + mf(character, "His", "Her") + " dick flexes and bulges, twitching as " + mf(character, "he", "she") + " loses himself in a lipstick-fueled fantasy.  When " + mf(character, "he", "she") + " recovers, you lick your lips and watch " + mf(character, "his", "her") + " blush spread.");
                    else
                        DisplayText(character.desc.capitalA + character.desc.short + " pants and crosses " + character.desc.possessivePronoun + " eyes for a moment.  " + mf(character, "His", "Her") + " dick flexes and bulges, twitching as " + character.desc.subjectivePronoun + " loses " + mf(character, "himself", "herself") + " in a lipstick-fueled fantasy.  When " + character.desc.subjectivePronoun + " recovers, you lick your lips and watch " + mf(character, "his", "her") + " blush spread.");
                }
                // Second:
                case 2: {
                    if (character.desc.plural)
                        DisplayText(character.desc.capitalA + character.desc.short + " moan out loud, " + character.desc.possessivePronoun + " dicks leaking and dribbling while " + character.desc.subjectivePronoun + " struggle not to touch " + character.desc.objectivePronoun + ".");
                    else
                        DisplayText(character.desc.capitalA + character.desc.short + " moans out loud, " + character.desc.possessivePronoun + " dick leaking and dribbling while " + character.desc.subjectivePronoun + " struggles not to touch it.");
                }
                // Third:
                case 3: {
                    if (character.desc.plural)
                        DisplayText(character.desc.capitalA + character.desc.short + " pump " + character.desc.possessivePronoun + " hips futilely, air-humping non-existent partners.  Clearly your lipstick is getting to " + character.desc.objectivePronoun + ".");
                    else
                        DisplayText(character.desc.capitalA + character.desc.short + " pumps " + character.desc.possessivePronoun + " hips futilely, air-humping a non-existent partner.  Clearly your lipstick is getting to " + character.desc.objectivePronoun + ".");
                }
                // Fourth:
                case 4: {
                    if (character.desc.plural)
                        DisplayText(character.desc.capitalA + character.desc.short + " close " + character.desc.possessivePronoun + " eyes and grunt, " + character.desc.possessivePronoun + " cocks twitching, bouncing, and leaking pre-cum.");
                    else
                        DisplayText(character.desc.capitalA + character.desc.short + " closes " + character.desc.objectivePronoun + " eyes and grunts, " + character.desc.possessivePronoun + " cock twitching, bouncing, and leaking pre-cum.");
                }
                // Fifth and repeat:
                default: {
                    if (character.desc.plural)
                        DisplayText("Drops of pre-cum roll steadily out of their dicks.  It's a marvel " + character.desc.subjectivePronoun + " haven't given in to " + character.desc.possessivePronoun + " lusts yet.");
                    else
                        DisplayText("Drops of pre-cum roll steadily out of " + character.desc.a + character.desc.short + "'s dick.  It's a marvel " + character.desc.subjectivePronoun + " hasn't given in to " + character.desc.possessivePronoun + " lust yet.");
                }
            }
            DisplayText("\n\n");
        }
    }
}