import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Utils from '../../Utilities/Utils';
import Player from '../Player';

export default class PlayerWait {
    public use(player: Player, monster: Character) {
        //Gain fatigue if not fighting sand tarps
        if (!monster.statusAffects.has(StatusAffectType.Level)) player.stats.fatigue += -5;
        Flags.list[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] = 1;
        if (monster.statusAffects.has(StatusAffectType.PCTailTangle)) {
            <Kistune>monster.kitsuneWait();
        }
        else if (monster.statusAffects.has(StatusAffectType.Level)) {
            <SandTrap>monster.sandTrapWait();
        }
        else if (monster.statusAffects.has(StatusAffectType.MinotaurEntangled)) {
            DisplayText.clear();
            DisplayText.text("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give.  His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs.  You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them.  Why did you ever try to struggle against this fate?\n\n");
            player.stats.lustNoResist += 30 + Utils.rand(5);
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.Whispered)) {
            DisplayText.clear();
            DisplayText.text("You shake off the mental compulsions and ready yourself to fight!\n\n");
            player.statusAffects.remove(StatusAffectType.Whispered);
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.HarpyBind)) {
            DisplayText.clear();
            let damageTaken = player.combat.loseHP(80 + Utils.rand(40), monster);
            DisplayText.text("The brood continues to hammer away at your defenseless self. (" + damageTaken + ")");
            return;
        }
        else if (monster.statusAffects.has(StatusAffectType.QueenBind)) {
            ropeStruggles(true);
        }
        else if (player.statusAffects.has(StatusAffectType.GooBind)) {
            DisplayText.clear();
            DisplayText.text("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
            let damageTaken = player.combat.loseHP(.35 * player.stats.maxHP(), monster);
            DisplayText.text(" (" + damageTaken + ")");
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.GooArmorBind)) {
            DisplayText.clear();
            DisplayText.text("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
            player.statusAffects.get(StatusAffectType.GooArmorBind).value1 = 1;
            if (player.statusAffects.get(StatusAffectType.GooArmorBind).value1 >= 5) {
                if (monster.statusAffects.has(StatusAffectType.Spar))
                    valeria.pcWinsValeriaSparDefeat();
                else gooArmorBeatsUpPC();
                return;
            }
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.NagaBind)) {
            DisplayText.clear();
            DisplayText.text("The naga's grip on you tightens as you relax into the stimulating pressure.");
            player.stats.lust += player.stats.sens / 5 + 5;
            player.combat.loseHP(5 + Utils.rand(5), monster);
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.HolliConstrict)) {
            <Holli>monster.waitForHolliConstrict(true);
        }
        else if (player.statusAffects.has(StatusAffectType.TentacleBind)) {
            DisplayText.clear();
            if (player.lowerBody.cockSpot.count() > 0)
                DisplayText.text("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
            else if (player.lowerBody.vaginaSpot.hasVagina())
                DisplayText.text("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
            else DisplayText.text("The creature continues probing at your asshole and has now latched " + Utils.numToCardinalText(player.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
            player.stats.lust += (8 + player.stats.sens / 10);
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.IsabellaStunned)) {
            DisplayText.clear();
            DisplayText.text("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.\n\n");
            player.statusAffects.remove(StatusAffectType.IsabellaStunned);
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.Stunned)) {
            DisplayText.clear();
            DisplayText.text("You wobble about, stunned for a moment.  After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.\n\n");
            player.statusAffects.remove(StatusAffectType.Stunned);
            return;
        }
        else if (player.statusAffects.has(StatusAffectType.Confusion)) {
            DisplayText.clear();
            DisplayText.text("You shake your head and file your memories in the past, where they belong.  It's time to fight!\n\n");
            player.statusAffects.remove(StatusAffectType.Confusion);
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