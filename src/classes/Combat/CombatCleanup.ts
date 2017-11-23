import Character from '../Character/Character';
import DisplayText from '../display/DisplayText';
import StatusAffect from '../Effects/StatusAffect';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import Player from '../Player/Player';



export default class CombatCleanup {
    private static clearCharacterStatusAffects(character: Character) {
        character.statusAffects.iterate(statusAffect => {
            statusAffect.combatEnd(character);
            if (statusAffect.removeOnCombatEnd())
                character.statusAffects.remove(statusAffect.type);
        });
    }

    public static performCleanup(player: Player, playerParty: Character[], monsterParty: Character[]) {
        CombatCleanup.clearCharacterStatusAffects(player);
        for (let index = 0; index < playerParty.length; index++) {
            CombatCleanup.clearCharacterStatusAffects(playerParty[index]);
        }
        for (let index = 0; index < monsterParty.length; index++) {
            CombatCleanup.clearCharacterStatusAffects(monsterParty[index]);
        }
        

        // Really annoying and dont know how to handle
        if (player.statusAffects.has(StatusAffectType.TwuWuv)) {
            player.stats.int += monsterParty[0].statusAffects.get(StatusAffectType.TwuWuv).value1;
            player.statusAffects.remove(StatusAffectType.TwuWuv);
        }


        CombatCleanup.clearStatuses(player);
        for (let index = 0; index < playerParty.length; index++)
            CombatCleanup.clearStatuses(playerParty[index]);
        for (let index = 0; index < monsterParty.length; index++)
            CombatCleanup.clearStatuses(monsterParty[index]);
    }

    public static clearStatuses(character: Character): void {
        if (character.statusAffects.has(StatusAffectType.Shielding)) character.statusAffects.remove(StatusAffectType.Shielding);
        if (character.statusAffects.has(StatusAffectType.Berzerking)) character.statusAffects.remove(StatusAffectType.Berzerking);
        if (character.statusAffects.has(StatusAffectType.TailWhip)) character.statusAffects.remove(StatusAffectType.TailWhip);
        if (character.statusAffects.has(StatusAffectType.GooArmorBind)) character.statusAffects.remove(StatusAffectType.GooArmorBind);
        if (character.statusAffects.has(StatusAffectType.Whispered)) character.statusAffects.remove(StatusAffectType.Whispered);
        if (character.statusAffects.has(StatusAffectType.SheilaOil)) character.statusAffects.remove(StatusAffectType.SheilaOil);
        character.statusAffects.remove(StatusAffectType.FirstAttack);
        if (character.statusAffects.has(StatusAffectType.NoFlee)) character.statusAffects.remove(StatusAffectType.NoFlee);
        if (character.statusAffects.has(StatusAffectType.IsabellaStunned)) character.statusAffects.remove(StatusAffectType.IsabellaStunned);
        if (character.statusAffects.has(StatusAffectType.Stunned)) character.statusAffects.remove(StatusAffectType.Stunned);
        if (character.statusAffects.has(StatusAffectType.Confusion)) character.statusAffects.remove(StatusAffectType.Confusion);
        if (character.statusAffects.has(StatusAffectType.lustvenom)) character.statusAffects.remove(StatusAffectType.lustvenom);
        if (character.statusAffects.has(StatusAffectType.InfestAttempted)) character.statusAffects.remove(StatusAffectType.InfestAttempted);
        if (character.statusAffects.has(StatusAffectType.ChargeWeapon)) character.statusAffects.remove(StatusAffectType.ChargeWeapon);
        if (character.statusAffects.has(StatusAffectType.KnockedBack)) character.statusAffects.remove(StatusAffectType.KnockedBack);
        if (character.statusAffects.has(StatusAffectType.RemovedArmor)) character.statusAffects.remove(StatusAffectType.KnockedBack);
        if (character.statusAffects.has(StatusAffectType.JCLustLevel)) character.statusAffects.remove(StatusAffectType.JCLustLevel);
        if (character.statusAffects.has(StatusAffectType.MirroredAttack)) character.statusAffects.remove(StatusAffectType.MirroredAttack);
        if (character.statusAffects.has(StatusAffectType.Tentagrappled)) character.statusAffects.remove(StatusAffectType.Tentagrappled);
        if (character.statusAffects.has(StatusAffectType.TentagrappleCooldown)) character.statusAffects.remove(StatusAffectType.TentagrappleCooldown);
        if (character.statusAffects.has(StatusAffectType.ShowerDotEffect)) character.statusAffects.remove(StatusAffectType.ShowerDotEffect);
        if (character.statusAffects.has(StatusAffectType.VineHealUsed)) character.statusAffects.remove(StatusAffectType.VineHealUsed);
    }

}