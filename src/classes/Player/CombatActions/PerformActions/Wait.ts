import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import CombatAction from '../../../Combat/Actions/CombatAction';
import DisplayText from '../../../display/DisplayText';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';
import { CombatEffectType } from '../../../Effects/CombatEffectType';
import Flags, { FlagEnum } from '../../../Game/Flags';
import Utils from '../../../Utilities/Utils';

export default class Wait implements CombatAction {
    public name: string = "Wait";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Wait ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        //Gain fatigue if not fighting sand tarps
        if (!monster.combat.effects.has(CombatEffectType.Level))
            character.stats.fatigue += -5;
        Flags.list[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] = 1;
        if (monster.combat.effects.has(CombatEffectType.MinotaurEntangled)) {
            DisplayText.clear();
            DisplayText.text("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give.  His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs.  You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them.  Why did you ever try to struggle against this fate?\n\n");
            character.stats.lustNoResist += 30 + Utils.rand(5);
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.Whispered)) {
            DisplayText.clear();
            DisplayText.text("You shake off the mental compulsions and ready yourself to fight!\n\n");
            character.combat.effects.remove(CombatEffectType.Whispered);
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.HarpyBind)) {
            DisplayText.clear();
            let damageTaken = character.combat.stats.loseHP(80 + Utils.rand(40), monster);
            DisplayText.text("The brood continues to hammer away at your defenseless self. (" + damageTaken + ")");
            return;
        }
        else if (monster.combat.effects.has(CombatEffectType.QueenBind)) {
            ropeStruggles(true);
        }
        else if (character.combat.effects.has(CombatEffectType.GooBind)) {
            DisplayText.clear();
            DisplayText.text("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
            let damageTaken = character.combat.stats.loseHP(.35 * character.stats.maxHP(), monster);
            DisplayText.text(" (" + damageTaken + ")");
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.GooArmorBind)) {
            DisplayText.clear();
            DisplayText.text("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
            character.combat.effects.get(CombatEffectType.GooArmorBind).value1 = 1;
            if (character.combat.effects.get(CombatEffectType.GooArmorBind).value1 >= 5) {
                if (monster.combat.effects.has(CombatEffectType.Spar))
                    valeria.pcWinsValeriaSparDefeat();
                else gooArmorBeatsUpPC();
                return;
            }
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.NagaBind)) {
            DisplayText.clear();
            DisplayText.text("The naga's grip on you tightens as you relax into the stimulating pressure.");
            character.stats.lust += character.stats.sens / 5 + 5;
            character.combat.stats.loseHP(5 + Utils.rand(5), monster);
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.HolliConstrict)) {
            <Holli>monster.waitForHolliConstrict(true);
        }
        else if (character.combat.effects.has(CombatEffectType.TentacleBind)) {
            DisplayText.clear();
            if (character.lowerBody.cockSpot.count() > 0)
                DisplayText.text("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
            else if (character.lowerBody.vaginaSpot.hasVagina())
                DisplayText.text("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
            else
                DisplayText.text("The creature continues probing at your asshole and has now latched " + Utils.numToCardinalText(character.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
            character.stats.lust += (8 + character.stats.sens / 10);
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.IsabellaStunned)) {
            DisplayText.clear();
            DisplayText.text("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.\n\n");
            character.combat.effects.remove(CombatEffectType.IsabellaStunned);
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.Stunned)) {
            DisplayText.clear();
            DisplayText.text("You wobble about, stunned for a moment.  After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.\n\n");
            character.combat.effects.remove(CombatEffectType.Stunned);
            return;
        }
        else if (character.combat.effects.has(CombatEffectType.Confusion)) {
            DisplayText.clear();
            DisplayText.text("You shake your head and file your memories in the past, where they belong.  It's time to fight!\n\n");
            character.combat.effects.remove(CombatEffectType.Confusion);
            return;
        }
        else if (monster.charType == CharacterType.Doppleganger) {
            DisplayText.clear();
            DisplayText.text("You decide not to take any action this round.\n\n");
            <Doppleganger>monster.handlePlayerWait();
            return;
        }
        else {
            DisplayText.clear();
            DisplayText.text("You decide not to take any action this round.\n\n");
            return;
        }
    }
}