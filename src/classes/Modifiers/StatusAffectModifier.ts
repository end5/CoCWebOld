export default class StatusAffectModifier {

    public clearStatuses(visibility: boolean): void {
        while (this.statusAffects.has("Web")) {
            this.stats.spe += this.statusAffects.get("Web").value1;
            kGAMECLASS.mainView.statsView.showStatUp('spe');
            // speUp.visible = true;
            // speDown.visible = false;
            this.statusAffects.remove("Web");
        }
        if (this.statusAffects.has("Shielding")) this.statusAffects.remove("Shielding");
        if (this.statusAffects.has("HolliConstrict")) this.statusAffects.remove("HolliConstrict");
        if (this.statusAffects.has("LustStones")) this.statusAffects.remove("LustStones");
        if (kGAMECLASS.monster.this.statusAffects.has("Sandstorm")) kGAMECLASS.monster.this.statusAffects.remove("Sandstorm");
        if (this.statusAffects.has("Sealed")) {
            this.statusAffects.remove("Sealed");
        }
        if (this.statusAffects.has("Berzerking")) {
            this.statusAffects.remove("Berzerking");
        }
        if (kGAMECLASS.monster.this.statusAffects.has("TailWhip")) {
            kGAMECLASS.monster.this.statusAffects.remove("TailWhip");
        }
        if (this.statusAffects.has("UBERWEB")) this.statusAffects.remove("UBERWEB");
        if (this.statusAffects.has("DriderKiss")) this.statusAffects.remove("DriderKiss");
        if (this.statusAffects.has("WebSilence")) this.statusAffects.remove("WebSilence");
        if (this.statusAffects.has("GooArmorSilence")) this.statusAffects.remove("GooArmorSilence");
        if (this.statusAffects.has("Bound")) this.statusAffects.remove("Bound");
        if (this.statusAffects.has("GooArmorBind")) this.statusAffects.remove("GooArmorBind");
        if (this.statusAffects.has("Whispered")) this.statusAffects.remove("Whispered");
        if (this.statusAffects.has("AkbalSpeed")) {
            kGAMECLASS.dynStats("spe", this.statusAffects.get("AkbalSpeed").value1 * -1);
            this.statusAffects.remove("AkbalSpeed");
        }
        if (this.statusAffects.has("AmilyVenom")) {
            kGAMECLASS.dynStats("str", this.statusAffects.get("AmilyVenom").value1, "spe", this.statusAffects.get("AmilyVenom").value2);
            this.statusAffects.remove("AmilyVenom");
        }
        while (this.statusAffects.has("Blind")) {
            this.statusAffects.remove("Blind");
        }
        if (this.statusAffects.has("SheilaOil")) {
            this.statusAffects.remove("SheilaOil");
        }
        if (kGAMECLASS.monster.this.statusAffects.has("TwuWuv")) {
            this.stats.int += kGAMECLASS.monster.this.statusAffects.get("TwuWuv").value1;
            kGAMECLASS.statScreenRefresh();
            kGAMECLASS.mainView.statsView.showStatUp('inte');
        }
        if (this.statusAffects.has("NagaVenom")) {
            this.stats.spe += this.statusAffects.get("NagaVenom").value1;
            kGAMECLASS.mainView.statsView.showStatUp('spe');
            //stats(0,0,this.statusAffects.get("NagaVenom").value1,0,0,0,0,0);
            this.statusAffects.remove("NagaVenom");
        }
        if (this.statusAffects.has("TentacleBind"))
            this.statusAffects.remove("TentacleBind");
        if (this.statusAffects.has("NagaBind"))
            this.statusAffects.remove("NagaBind");
        if (this.statusAffects.has("StoneLust")) {
            this.statusAffects.remove("StoneLust");
        }
        this.statusAffects.remove("FirstAttack");
        if (this.statusAffects.has("TemporaryHeat"))
            this.statusAffects.remove("TemporaryHeat");
        if (this.statusAffects.has("NoFlee"))
            this.statusAffects.remove("NoFlee");
        if (this.statusAffects.has("Poison"))
            this.statusAffects.remove("Poison");
        if (this.statusAffects.has("IsabellaStunned"))
            this.statusAffects.remove("IsabellaStunned");
        if (this.statusAffects.has("Stunned"))
            this.statusAffects.remove("Stunned");
        if (this.statusAffects.has("Confusion"))
            this.statusAffects.remove("Confusion");
        if (this.statusAffects.has("ThroatPunch"))
            this.statusAffects.remove("ThroatPunch");
        if (this.statusAffects.has("KissOfDeath"))
            this.statusAffects.remove("KissOfDeath");
        if (this.statusAffects.has("AcidSlap"))
            this.statusAffects.remove("AcidSlap");
        if (this.statusAffects.has("GooBind"))
            this.statusAffects.remove("GooBind");
        if (this.statusAffects.has("HarpyBind"))
            this.statusAffects.remove("HarpyBind");
        if (this.statusAffects.has("CalledShot")) {
            this.stats.spe += this.statusAffects.get("CalledShot").value1;
            kGAMECLASS.mainView.statsView.showStatUp('spe');
            // speDown.visible = false;
            // speUp.visible = true;
            this.statusAffects.remove("CalledShot");
        }
        if (this.statusAffects.has("DemonSeed")) {
            this.statusAffects.remove("DemonSeed");
        }
        if (this.statusAffects.has("ParalyzeVenom")) {
            str += this.statusAffects.get("ParalyzeVenom").value1;
            this.stats.spe += this.statusAffects.get("ParalyzeVenom").value2;
            this.statusAffects.remove("ParalyzeVenom");
        }
        if (this.statusAffects.has("lustvenom")) {
            this.statusAffects.remove("lustvenom");
        }
        if (this.statusAffects.has("InfestAttempted")) {
            this.statusAffects.remove("InfestAttempted");
        }
        if (this.statusAffects.has("Might")) {
            kGAMECLASS.dynStats("str", -this.statusAffects.get("Might").value1, "this.stats.tou", -this.statusAffects.get("Might").value2);
            this.statusAffects.remove("Might");
        }
        if (this.statusAffects.has("ChargeWeapon")) {
            this.statusAffects.remove("ChargeWeapon");
        }
        if (this.statusAffects.has("Disarmed")) {
            this.statusAffects.remove("Disarmed");
            if (this.weapon == WeaponLib.FISTS) {
                //					weapon = ItemType.lookupItem(Flags.get[FlagEnum.PLAYER_DISARMED_WEAPON_ID]) as Weapon;
                //					(ItemType.lookupItem(Flags.get[FlagEnum.PLAYER_DISARMED_WEAPON_ID]) as Weapon).doEffect(this, false);
                setWeapon(ItemType.lookupItem(Flags.get[FlagEnum.PLAYER_DISARMED_WEAPON_ID]) as Weapon);
            }
            else {
                Flags.get[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] = Flags.get[FlagEnum.PLAYER_DISARMED_WEAPON_ID];
            }
        }
        if (this.statusAffects.has("AnemoneVenom")) {
            str += this.statusAffects.get("AnemoneVenom").value1;
            this.stats.spe += this.statusAffects.get("AnemoneVenom").value2;
            //Make sure nothing got out of bounds
            kGAMECLASS.dynStats("cor", 0);

            kGAMECLASS.mainView.statsView.showStatUp('spe');
            kGAMECLASS.mainView.statsView.showStatUp('str');
            // speUp.visible = true;
            // strUp.visible = true;
            this.statusAffects.remove("AnemoneVenom");
        }
        if (this.statusAffects.has("GnollSpear")) {
            this.stats.spe += this.statusAffects.get("GnollSpear").value1;
            //Make sure nothing got out of bounds
            kGAMECLASS.dynStats("cor", 0);
            kGAMECLASS.mainView.statsView.showStatUp('spe');
            // speUp.visible = true;
            // speDown.visible = false;
            this.statusAffects.remove("GnollSpear");
        }
        if (this.statusAffects.has("BasiliskCompulsion")) this.statusAffects.remove("BasiliskCompulsion");
        if (this.statusAffects.has("BasiliskSlow")) {
            this.stats.spe += this.statusAffects.get("BasiliskSlow").value1;
            kGAMECLASS.mainView.statsView.showStatUp('spe');
            // speUp.visible = true;
            // speDown.visible = false;
            this.statusAffects.remove("BasiliskSlow");
        }
        while (this.statusAffects.has("IzmaBleed")) this.statusAffects.remove("IzmaBleed");
        if (this.statusAffects.has("GardenerSapSpeed")) {
            this.stats.spe += this.statusAffects.get("GardenerSapSpeed").value1;
            kGAMECLASS.mainView.statsView.showStatUp('spe');
            this.statusAffects.remove("GardenerSapSpeed");
        }
        if (this.statusAffects.has("KnockedBack")) this.statusAffects.remove("KnockedBack");
        if (this.statusAffects.has("RemovedArmor")) this.statusAffects.remove("KnockedBack");
        if (this.statusAffects.has("JCLustLevel")) this.statusAffects.remove("JCLustLevel");
        if (this.statusAffects.has("MirroredAttack")) this.statusAffects.remove("MirroredAttack");
        if (this.statusAffects.has("Tentagrappled")) this.statusAffects.remove("Tentagrappled");
        if (this.statusAffects.has("TentagrappleCooldown")) this.statusAffects.remove("TentagrappleCooldown");
        if (this.statusAffects.has("ShowerDotEffect")) this.statusAffects.remove("ShowerDotEffect");
        if (this.statusAffects.has("GardenerSapSpeed")) {
            this.stats.spe += this.statusAffects.get("GardenerSapSpeed").value1;
            kGAMECLASS.mainView.statsView.showStatUp('spe');
            this.statusAffects.remove("GardenerSapSpeed");
        }
        if (this.statusAffects.has("VineHealUsed")) this.statusAffects.remove("VineHealUsed");
    }

}