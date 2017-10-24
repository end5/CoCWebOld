import Character from '../Character/Character';
import MainScreen from '../display/MainScreen';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import Player from '../Player';

export enum CombatEndType {
    Special,
    HP,
    Lust
}

export interface CombatEndEventFunction  {
    (combatEndType: CombatEndType, target: Character);

}

export default class CombatEnd {
    public static combatCleanup(player: Player, playerParty: Character[], monsterParty: Character[]) {
        CombatEnd.clearStatuses(player);
        for (let index = 0; index < playerParty.length; index++)
            CombatEnd.clearStatuses(playerParty[index]);
        for (let index = 0; index < monsterParty.length; index++)
            CombatEnd.clearStatuses(monsterParty[index]);
    }

    public static clearStatuses(character: Character): void {
        while (character.statusAffects.has("Web")) {
            character.stats.spe += character.statusAffects.get("Web").value1;
            character.statusAffects.remove("Web");
        }
        if (character.statusAffects.has("Shielding")) character.statusAffects.remove("Shielding");
        if (character.statusAffects.has("HolliConstrict")) character.statusAffects.remove("HolliConstrict");
        if (character.statusAffects.has("LustStones")) character.statusAffects.remove("LustStones");
        //if (monster.character.statusAffects.has("Sandstorm")) kGAMECLASS.monster.character.statusAffects.remove("Sandstorm");
        if (character.statusAffects.has("Sandstorm")) character.statusAffects.remove("Sandstorm");
        if (character.statusAffects.has("Sealed")) {
            character.statusAffects.remove("Sealed");
        }
        if (character.statusAffects.has("Berzerking")) {
            character.statusAffects.remove("Berzerking");
        }
        /*if (kGAMECLASS.monster.character.statusAffects.has("TailWhip")) {
            kGAMECLASS.monster.character.statusAffects.remove("TailWhip");
        }*/
        if (character.statusAffects.has("TailWhip")) {
            character.statusAffects.remove("TailWhip");
        }
        if (character.statusAffects.has("UBERWEB")) character.statusAffects.remove("UBERWEB");
        if (character.statusAffects.has("DriderKiss")) character.statusAffects.remove("DriderKiss");
        if (character.statusAffects.has("WebSilence")) character.statusAffects.remove("WebSilence");
        if (character.statusAffects.has("GooArmorSilence")) character.statusAffects.remove("GooArmorSilence");
        if (character.statusAffects.has("Bound")) character.statusAffects.remove("Bound");
        if (character.statusAffects.has("GooArmorBind")) character.statusAffects.remove("GooArmorBind");
        if (character.statusAffects.has("Whispered")) character.statusAffects.remove("Whispered");
        if (character.statusAffects.has("AkbalSpeed")) {
            character.stats.spe += character.statusAffects.get("AkbalSpeed").value1 * -1;
            character.statusAffects.remove("AkbalSpeed");
        }
        if (character.statusAffects.has("AmilyVenom")) {
            character.stats.str += character.statusAffects.get("AmilyVenom").value1;
            character.stats.spe += character.statusAffects.get("AmilyVenom").value2;
            character.statusAffects.remove("AmilyVenom");
        }
        while (character.statusAffects.has("Blind")) {
            character.statusAffects.remove("Blind");
        }
        if (character.statusAffects.has("SheilaOil")) {
            character.statusAffects.remove("SheilaOil");
        }
        /*if (kGAMECLASS.monster.character.statusAffects.has("TwuWuv")) {
            character.stats.int += kGAMECLASS.monster.character.statusAffects.get("TwuWuv").value1;
            kGAMECLASS.statScreenRefresh();
            kGAMECLASS.mainView.statsView.showStatUp('inte');
        }*/
        if (character.statusAffects.has("TwuWuv")) {
            //character.stats.int += kGAMECLASS.monster.character.statusAffects.get("TwuWuv").value1;
            character.stats.int += kGAMECLASS.monster.character.statusAffects.get("TwuWuv").value1;
        }
        if (character.statusAffects.has("NagaVenom")) {
            character.stats.spe += character.statusAffects.get("NagaVenom").value1;
            character.statusAffects.remove("NagaVenom");
        }
        if (character.statusAffects.has("TentacleBind"))
            character.statusAffects.remove("TentacleBind");
        if (character.statusAffects.has("NagaBind"))
            character.statusAffects.remove("NagaBind");
        if (character.statusAffects.has("StoneLust")) {
            character.statusAffects.remove("StoneLust");
        }
        character.statusAffects.remove("FirstAttack");
        if (character.statusAffects.has("TemporaryHeat"))
            character.statusAffects.remove("TemporaryHeat");
        if (character.statusAffects.has("NoFlee"))
            character.statusAffects.remove("NoFlee");
        if (character.statusAffects.has("Poison"))
            character.statusAffects.remove("Poison");
        if (character.statusAffects.has("IsabellaStunned"))
            character.statusAffects.remove("IsabellaStunned");
        if (character.statusAffects.has("Stunned"))
            character.statusAffects.remove("Stunned");
        if (character.statusAffects.has("Confusion"))
            character.statusAffects.remove("Confusion");
        if (character.statusAffects.has("ThroatPunch"))
            character.statusAffects.remove("ThroatPunch");
        if (character.statusAffects.has("KissOfDeath"))
            character.statusAffects.remove("KissOfDeath");
        if (character.statusAffects.has("AcidSlap"))
            character.statusAffects.remove("AcidSlap");
        if (character.statusAffects.has("GooBind"))
            character.statusAffects.remove("GooBind");
        if (character.statusAffects.has("HarpyBind"))
            character.statusAffects.remove("HarpyBind");
        if (character.statusAffects.has("CalledShot")) {
            character.stats.spe += character.statusAffects.get("CalledShot").value1;
            character.statusAffects.remove("CalledShot");
        }
        if (character.statusAffects.has("DemonSeed")) {
            character.statusAffects.remove("DemonSeed");
        }
        if (character.statusAffects.has("ParalyzeVenom")) {
            character.stats.str += character.statusAffects.get("ParalyzeVenom").value1;
            character.stats.spe += character.statusAffects.get("ParalyzeVenom").value2;
            character.statusAffects.remove("ParalyzeVenom");
        }
        if (character.statusAffects.has("lustvenom")) {
            character.statusAffects.remove("lustvenom");
        }
        if (character.statusAffects.has("InfestAttempted")) {
            character.statusAffects.remove("InfestAttempted");
        }
        if (character.statusAffects.has("Might")) {
            character.stats.str += -character.statusAffects.get("Might").value1;
            character.stats.tou += -character.statusAffects.get("Might").value2;
            character.statusAffects.remove("Might");
        }
        if (character.statusAffects.has("ChargeWeapon")) {
            character.statusAffects.remove("ChargeWeapon");
        }
        if (character.statusAffects.has("Disarmed")) {
            character.statusAffects.remove("Disarmed");
            if (character.inventory.weapon == Game.libraries.weapons.get("Fists")) {
                character.inventory.weapon = Game.libraries.weapons.get(Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ID]);
            }
            else {
                Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] = Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ID];
            }
        }
        if (character.statusAffects.has("AnemoneVenom")) {
            character.stats.str += character.statusAffects.get("AnemoneVenom").value1;
            character.stats.spe += character.statusAffects.get("AnemoneVenom").value2;
            character.statusAffects.remove("AnemoneVenom");
        }
        if (character.statusAffects.has("GnollSpear")) {
            character.stats.spe += character.statusAffects.get("GnollSpear").value1;
            character.statusAffects.remove("GnollSpear");
        }
        if (character.statusAffects.has("BasiliskCompulsion")) character.statusAffects.remove("BasiliskCompulsion");
        if (character.statusAffects.has("BasiliskSlow")) {
            character.stats.spe += character.statusAffects.get("BasiliskSlow").value1;
            character.statusAffects.remove("BasiliskSlow");
        }
        while (character.statusAffects.has("IzmaBleed")) character.statusAffects.remove("IzmaBleed");
        if (character.statusAffects.has("GardenerSapSpeed")) {
            character.stats.spe += character.statusAffects.get("GardenerSapSpeed").value1;
            character.statusAffects.remove("GardenerSapSpeed");
        }
        if (character.statusAffects.has("KnockedBack")) character.statusAffects.remove("KnockedBack");
        if (character.statusAffects.has("RemovedArmor")) character.statusAffects.remove("KnockedBack");
        if (character.statusAffects.has("JCLustLevel")) character.statusAffects.remove("JCLustLevel");
        if (character.statusAffects.has("MirroredAttack")) character.statusAffects.remove("MirroredAttack");
        if (character.statusAffects.has("Tentagrappled")) character.statusAffects.remove("Tentagrappled");
        if (character.statusAffects.has("TentagrappleCooldown")) character.statusAffects.remove("TentagrappleCooldown");
        if (character.statusAffects.has("ShowerDotEffect")) character.statusAffects.remove("ShowerDotEffect");
        if (character.statusAffects.has("GardenerSapSpeed")) {
            character.stats.spe += character.statusAffects.get("GardenerSapSpeed").value1;
            character.statusAffects.remove("GardenerSapSpeed");
        }
        if (character.statusAffects.has("VineHealUsed")) character.statusAffects.remove("VineHealUsed");
    }

}