import Character from '../Character/Character';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import Player from '../Player';

export enum CombatEndType {
    Special,
    HP,
    Lust,
    Escape
}

export interface CombatEndEventFunction {
    (combatEndType: CombatEndType, target: Character);

}

export default class CombatEnd {
    private static clearCharacterStatusAffects(character: Character) {
        character.statusAffects.iterate(statusAffect => {
            statusAffect.combatEnd(character);
            if (statusAffect.removeOnCombatEnd())
                character.statusAffects.remove(statusAffect.type);
        });
    }

    public static combatCleanup(player: Player, playerParty: Character[], monsterParty: Character[]) {
        CombatEnd.clearCharacterStatusAffects(player);
        for (let index = 0; index < playerParty.length; index++) {
            CombatEnd.clearCharacterStatusAffects(playerParty[index]);
        }
        for (let index = 0; index < monsterParty.length; index++) {
            CombatEnd.clearCharacterStatusAffects(monsterParty[index]);
        }
        

        // Really annoying and dont know how to handle
        if (player.statusAffects.has(StatusAffectType.TwuWuv)) {
            player.stats.int += monsterParty[0].statusAffects.get(StatusAffectType.TwuWuv).value1;
            player.statusAffects.remove(StatusAffectType.TwuWuv);
        }


        CombatEnd.clearStatuses(player);
        for (let index = 0; index < playerParty.length; index++)
            CombatEnd.clearStatuses(playerParty[index]);
        for (let index = 0; index < monsterParty.length; index++)
            CombatEnd.clearStatuses(monsterParty[index]);
    }

    public static clearStatuses(character: Character): void {
        if (character.statusAffects.has("Shielding")) character.statusAffects.remove("Shielding");
        if (character.statusAffects.has("Berzerking")) character.statusAffects.remove("Berzerking");
        if (character.statusAffects.has("TailWhip")) character.statusAffects.remove("TailWhip");
        if (character.statusAffects.has("GooArmorBind")) character.statusAffects.remove("GooArmorBind");
        if (character.statusAffects.has("Whispered")) character.statusAffects.remove("Whispered");
        if (character.statusAffects.has("SheilaOil")) character.statusAffects.remove("SheilaOil");
        character.statusAffects.remove("FirstAttack");
        if (character.statusAffects.has("NoFlee")) character.statusAffects.remove("NoFlee");
        if (character.statusAffects.has("IsabellaStunned")) character.statusAffects.remove("IsabellaStunned");
        if (character.statusAffects.has("Stunned")) character.statusAffects.remove("Stunned");
        if (character.statusAffects.has("Confusion")) character.statusAffects.remove("Confusion");
        if (character.statusAffects.has("lustvenom")) character.statusAffects.remove("lustvenom");
        if (character.statusAffects.has("InfestAttempted")) character.statusAffects.remove("InfestAttempted");
        if (character.statusAffects.has("ChargeWeapon")) character.statusAffects.remove("ChargeWeapon");
        if (character.statusAffects.has("KnockedBack")) character.statusAffects.remove("KnockedBack");
        if (character.statusAffects.has("RemovedArmor")) character.statusAffects.remove("KnockedBack");
        if (character.statusAffects.has("JCLustLevel")) character.statusAffects.remove("JCLustLevel");
        if (character.statusAffects.has("MirroredAttack")) character.statusAffects.remove("MirroredAttack");
        if (character.statusAffects.has("Tentagrappled")) character.statusAffects.remove("Tentagrappled");
        if (character.statusAffects.has("TentagrappleCooldown")) character.statusAffects.remove("TentagrappleCooldown");
        if (character.statusAffects.has("ShowerDotEffect")) character.statusAffects.remove("ShowerDotEffect");
        if (character.statusAffects.has("VineHealUsed")) character.statusAffects.remove("VineHealUsed");
    }

}