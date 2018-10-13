import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Wait implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.Wait;
    public name: string = "Wait";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        // Gain fatigue if not fighting sand tarps
        if (!target.combat.effects.has(CombatEffectType.Level))
            character.stats.fatigue += -5;
        // Flags.list[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] = 1;
        // if (monster.combat.effects.has(CombatEffectType.MinotaurEntangled)) {
        //     DisplayText().clear();
        //     DisplayText("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give.  His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs.  You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them.  Why did you ever try to struggle against this fate?\n\n");
        //     character.stats.lustNoResist += 30 + randInt(5);
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.Whispered)) {
        //     DisplayText().clear();
        //     DisplayText("You shake off the mental compulsions and ready yourself to fight!\n\n");
        //     character.combat.effects.remove(CombatEffectType.Whispered);
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.HarpyBind)) {
        //     DisplayText().clear();
        //     const damageTaken = character.combat.stats.loseHP(80 + randInt(40), monster);
        //     DisplayText("The brood continues to hammer away at your defenseless self. (" + damageTaken + ")");
        //     return;
        // }
        // else if (monster.combat.effects.has(CombatEffectType.QueenBind)) {
        //     ropeStruggles(true);
        // }
        // else if (character.combat.effects.has(CombatEffectType.GooBind)) {
        //     DisplayText().clear();
        //     DisplayText("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
        //     const damageTaken = character.combat.stats.loseHP(.35 * character.stats.maxHP(), monster);
        //     DisplayText(" (" + damageTaken + ")");
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.GooArmorBind)) {
        //     DisplayText().clear();
        //     DisplayText("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
        //     character.combat.effects.get(CombatEffectType.GooArmorBind).value1 = 1;
        //     if (character.combat.effects.get(CombatEffectType.GooArmorBind).value1 >= 5) {
        //         if (monster.combat.effects.has(CombatEffectType.Spar))
        //             valeria.pcWinsValeriaSparDefeat();
        //         else gooArmorBeatsUpPC();
        //         return;
        //     }
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.NagaBind)) {
        //     DisplayText().clear();
        //     DisplayText("The naga's grip on you tightens as you relax into the stimulating pressure.");
        //     character.stats.lust += character.stats.sens / 5 + 5;
        //     character.combat.stats.loseHP(5 + randInt(5), monster);
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.HolliConstrict)) {
        //     (monster as Holli).waitForHolliConstrict(true);
        // }
        // else if (character.combat.effects.has(CombatEffectType.TentacleBind)) {
        //     DisplayText().clear();
        //     if (character.torso.cocks.count > 0)
        //         DisplayText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
        //     else if (character.torso.vaginas.count > 0)
        //         DisplayText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
        //     else
        //         DisplayText("The creature continues probing at your asshole and has now latched " + NumToText.numToCardinalText(character.torso.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
        //     character.stats.lust += (8 + character.stats.sens / 10);
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.IsabellaStunned)) {
        //     DisplayText().clear();
        //     DisplayText("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.\n\n");
        //     character.combat.effects.remove(CombatEffectType.IsabellaStunned);
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.Stunned)) {
        //     DisplayText().clear();
        //     DisplayText("You wobble about, stunned for a moment.  After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.\n\n");
        //     character.combat.effects.remove(CombatEffectType.Stunned);
        //     return;
        // }
        // else if (character.combat.effects.has(CombatEffectType.Confusion)) {
        //     DisplayText().clear();
        //     DisplayText("You shake your head and file your memories in the past, where they belong.  It's time to fight!\n\n");
        //     character.combat.effects.remove(CombatEffectType.Confusion);
        //     return;
        // }
        // else if (monster.charType === CharacterType.Doppleganger) {
        //     DisplayText().clear();
        //     DisplayText("You decide not to take any action this round.\n\n");
        //     (monster as Doppleganger).handlePlayerWait();
        //     return;
        // }
        // else {
        CView.clear();
        CView.text("You decide not to take any action this round.\n\n");
        // }
    }
}
