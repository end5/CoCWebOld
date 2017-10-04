import Player from "./Player";
import MainScreen from "./display/MainScreen";
import Utils from "./Utilities/Utils";

//17 == EMBER
//18 == PROPER BASILISKS (BENOIT ONLY)
//19 == SATYR
//20 == COTTON
//21 == URTA
//22 == SAND WITCH
//23 == FROG BUTT EGG

export default class PregnancyEvent {
    public updatePregnancy(player: Player): boolean {
        let displayedUpdate: boolean = false;
        let pregText: string = "";
        if ((player.pregnancyIncubation <= 0 && player.buttPregnancyIncubation <= 0) ||
            (player.pregnancyType == 0 && player.buttPregnancyType == 0)) {
            return false;
        }
        //Cancel Heat
        if (player.inHeat) {
            MainScreen.text("\nYou calm down a bit and realize you no longer fantasize about getting fucked constantly.  It seems your heat has ended.\n", false);
            //Remove bonus libido from heat
            dynStats("lib", -player.statusAffects.get("Heat").value2);
            if (player.stats.lib < 10) player.stats.lib = 10;
            statScreenRefresh();
            player.statusAffects.remove("Heat");
        }
        if (player.pregnancyIncubation == 1) {
            if (player.fertility < 15) player.fertility++;
            if (player.fertility < 25) player.fertility++;
            if (player.fertility < 40) player.fertility++;
            if (!player.statusAffects.has("Birthed")) player.statusAffects.add(new StatusAffect("Birthed", 1, 0, 0, 0)));
		else {
                player.addStatusValue(StatusAffects.Birthed, 1, 1);
                if (!player.perks.has("BroodMother") && player.statusAffects.get("Birthed").value1 >= 10) {
                    MainScreen.text("\n<b>You have gained the Brood Mother perk</b> (Pregnancies progress twice as fast as a normal woman's).\n", false);
                    player.perks.add(new Perk("BroodMother", 0, 0, 0, 0));
                }
            }
        }
        if (player.pregnancyIncubation > 0 && player.pregnancyIncubation < 2) player.knockUpForce(player.pregnancyType, 1);
        //IF INCUBATION IS VAGINAL
        if (player.pregnancyIncubation > 1) {
            if (player.pregnancyType == PregnancyType.FAERIE) {
                displayedUpdate = bog.phoukaScene.phoukaPregUpdate();
            }
            if (player.pregnancyType == PregnancyType.SAND_WITCH) {
                displayedUpdate = sandPregUpdate();
            }
            if (player.pregnancyType == PregnancyType.URTA) {
                displayedUpdate = urtaPregs.urtaPregooUpdates();
            }
            //Cotton Pregnancy! - 350 days long
            if (player.pregnancyType == PregnancyType.COTTON) {
            }
            //Imp Pregnancy!
            if (player.pregnancyType == PregnancyType.IMP) {
            }
            //Minotaur Pregnancy!
            if (player.pregnancyType == PregnancyType.MINOTAUR) {
            }
            //Centaur Pregnancy!
            if (player.pregnancyType == PregnancyType.CENTAUR || player.pregnancyType == PregnancyType.KELT) {
            }
            //Bunny tf preggoz
            if (player.pregnancyType == PregnancyType.BUNNY) {
            }
            //Marblz Pregnancy!
            if (player.pregnancyType == PregnancyType.MARBLE) {
            }
            //Jojo Pregnancy!
            if (player.pregnancyType == PregnancyType.MOUSE || player.pregnancyType == PregnancyType.JOJO) {
            }
            //Amily Pregnancy!
            if (player.pregnancyType == PregnancyType.AMILY) {
            }
            //Shark Pregnancy!
            if (player.pregnancyType == PregnancyType.IZMA) {
            }
            //SPOIDAH Pregnancy!
            if (player.pregnancyType == PregnancyType.SPIDER || player.pregnancyType == PregnancyType.DRIDER_EGGS) {
            }
            //Goo Pregnancy!
            if (player.pregnancyType == PregnancyType.GOO_GIRL) {
            }
            if (player.pregnancyType == PregnancyType.EMBER) {
            }
            //Pregnancy 4 Satyrs
            if (player.pregnancyType == PregnancyType.SATYR) {
            }
            //BASILISK Pregnancy!
            if (player.pregnancyType == PregnancyType.BASILISK || player.pregnancyType == PregnancyType.BENOIT) {
            }
            //Anemone Pregnancy
            if (player.pregnancyType == PregnancyType.ANEMONE) {
            }
            //Hellhound Pregnancy!
            if (player.pregnancyType == PregnancyType.HELL_HOUND) {
            }
            //Frog Eggs
            else if (player.pregnancyType == PregnancyType.FROG_GIRL) {
            }
        }
        //IF INCUBATION IS ANAL
        if (player.buttPregnancyIncubation > 1) {
            if (player.buttPregnancyType == PregnancyType.FROG_GIRL) {
            }
            //Pregnancy 4 Satyrs
            if (player.buttPregnancyType == PregnancyType.SATYR) {
            }
            //DRIDAH BUTT Pregnancy!
            if (player.buttPregnancyType == PregnancyType.DRIDER_EGGS) {
            }
            //Bee Egg's in butt pregnancy
            if (player.buttPregnancyType == PregnancyType.BEE_EGGS) {
            }
            //Sand Tarps in butt pregnancy
            if (player.buttPregnancyType == PregnancyType.SANDTRAP || player.buttPregnancyType == PregnancyType.SANDTRAP_FERTILE) {
            }
            //Bunny TF buttpreggoz
            if (player.buttPregnancyType == PregnancyType.BUNNY) {
            }
        }
        //Give birth to either a faerie or a phouka
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.FAERIE) {
        }
        //Give birf if its time... to ANAL EGGS
        if (player.buttPregnancyIncubation == 1 && player.buttPregnancyType == PregnancyType.FROG_GIRL) {
        }
        //Give birf if its time... to ANAL EGGS
        if (player.buttPregnancyIncubation == 1 && player.buttPregnancyType == PregnancyType.DRIDER_EGGS) {
        }
        //Bive birf to dragons
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.EMBER) {
        }
        //GIVE BIRF TO TRAPS
        if (player.buttPregnancyIncubation == 1 && player.buttPregnancyType == PregnancyType.SANDTRAP_FERTILE) {
        }
        //Give birth (if it's time) to beeeeeeez
        if (player.buttPregnancyIncubation == 1 && player.buttPregnancyType == PregnancyType.BEE_EGGS) {
        }
        if (player.pregnancyType == PregnancyType.URTA && player.pregnancyIncubation == 1) {
        }
        if (player.pregnancyType == PregnancyType.SAND_WITCH && player.pregnancyIncubation == 1) {
        }
        if (player.pregnancyType == PregnancyType.IZMA && player.pregnancyIncubation == 1) {
            //Located in izma.as!
        }
        //SPOIDAH BIRF
        if (player.pregnancyType == PregnancyType.SPIDER && player.pregnancyIncubation == 1) {
        }
        //DRIDER BIRF
        if (player.pregnancyType == PregnancyType.DRIDER_EGGS && player.pregnancyIncubation == 1) {
        }
        if (player.pregnancyType == PregnancyType.COTTON && player.pregnancyIncubation == 1) {
        }
        //GOO BIRF
        if (player.pregnancyType == PregnancyType.GOO_GIRL && player.pregnancyIncubation == 1) {
        }
        if (player.pregnancyType == PregnancyType.BASILISK && player.pregnancyIncubation == 1) {
        }
        //Satyr vag preg
        if (player.pregnancyType == PregnancyType.SATYR && player.pregnancyIncubation == 1) {
        }
        //Satyr butt preg
        if (player.buttPregnancyType == PregnancyType.SATYR && player.buttPregnancyIncubation == 1) {
        }
        if (player.pregnancyType == PregnancyType.BENOIT && player.pregnancyIncubation <= 2) {
        }
        //Give birf if its time... to FROG EGGS
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.FROG_GIRL) {
        }
        //BASILISK BIRF
        //Bunbun birfs
        if (player.pregnancyType == PregnancyType.BUNNY && player.pregnancyIncubation == 1) {
        }
        //Anemone birfs
        //Anemone Pregnancy
        if (player.pregnancyType == PregnancyType.ANEMONE && player.pregnancyIncubation == 1) {
        }
        //Give birth if it's time (to an imp!)
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.IMP) {
        }
        //Give birth if it's time (to a cowgirl!)
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.MARBLE) {
        }
        //Give birth if it's time (to a minotaur!)
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.MINOTAUR) {
        }
        //Amily failsafe - converts PC with pure babies to mouse babies if Amily is corrupted
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.AMILY) {
            if (flags[FlagEnum.AMILY_FOLLOWER] == 2 || flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00170] > 0) player.knockUpForce(PregnancyType.MOUSE, player.pregnancyIncubation);
        }
        //Amily failsafe - converts PC with pure babies to mouse babies if Amily is with Urta
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.AMILY) {
            if (flags[FlagEnum.AMILY_VISITING_URTA] == 1 || flags[FlagEnum.AMILY_VISITING_URTA] == 2) player.knockUpForce(PregnancyType.MOUSE, player.pregnancyIncubation);
        }
        //Give birth if it's time (to an AMILY BITCH mouse!)
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.AMILY) {
        }
        //Give birth if it's time (to a mouse!)
        if (player.pregnancyIncubation == 1 && (player.pregnancyType == PregnancyType.MOUSE || player.pregnancyType == PregnancyType.JOJO)) {
        }
        //Centaur Baby!
        if (player.pregnancyIncubation == 1 && (player.pregnancyType == PregnancyType.CENTAUR || player.pregnancyType == PregnancyType.KELT)) {
        }
        //Give birth if it's time (to a hellhound!)
        if (player.pregnancyIncubation == 1 && player.pregnancyType == PregnancyType.HELL_HOUND) {
        }
        //Egg status messages
        if (player.pregnancyType == PregnancyType.OVIELIXIR_EGGS && player.pregnancyIncubation > 0) {
        }
        return displayedUpdate;
    }

    public eggDescript(plural: boolean = true): string {
        let descript: string = "";
        if (player.statusAffects.has("Eggs")) {
            descript += Utils.numToCardinalText(player.statusAffects.get("Eggs").value3) + " ";
            //size descriptor
            if (player.statusAffects.get("Eggs").value2 == 1) descript += "large ";
            /*color descriptor
            0 - brown - ass expansion
            1 - purple - hip expansion
            2 - blue - vaginal removal and/or growth of existing maleness
            3 - pink - dick removal and/or fertility increase.
            4 - white - breast growth.  If lactating increases lactation.
            5 - rubbery black - 
            */
            if (player.statusAffects.get("Eggs").value1 == 0) descript += "brown ";
            if (player.statusAffects.get("Eggs").value1 == 1) descript += "purple ";
            if (player.statusAffects.get("Eggs").value1 == 2) descript += "blue ";
            if (player.statusAffects.get("Eggs").value1 == 3) descript += "pink ";
            if (player.statusAffects.get("Eggs").value1 == 4) descript += "white ";
            if (player.statusAffects.get("Eggs").value1 == 5) descript += "rubbery black ";
            //EGGS
            if (plural) descript += "eggs";
            else descript += "egg";
            return descript;
        }
        return "EGG ERRORZ";
    }
}