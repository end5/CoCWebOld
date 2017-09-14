export default class StatsMenu {
    public displayStats(e: MouseEvent = null): void {
        spriteSelect(-1);
        MainScreen.text("", true);

        // Begin Combat Stats
        let combatStats: string = "";
        if (player.hasKeyItem("Bow") >= 0)
            combatStats += "<b>Bow Skill:</b> " + Math.round(player.statusAffects.get("Kelt").value1) + "\n";

        combatStats += "<b>Lust Resistance:</b> " + (100 - Math.round(lustPercent())) + "% (Higher is better.)\n";

        combatStats += "<b>Spell Effect Multiplier:</b> " + (100 * spellMod()) + "%\n";

        combatStats += "<b>Spell Cost:</b> " + spellCost(100) + "%\n";

        if (flags[FlagEnum.RAPHAEL_RAPIER_TRANING] > 0)
            combatStats += "<b>Rapier Skill (Out of 4):</b> " + flags[FlagEnum.RAPHAEL_RAPIER_TRANING] + "\n";

        combatStats += "<b>Tease Skill (Out of 5):</b>  " + player.teaseLevel + "\n";

        if (combatStats != "")
            MainScreen.text("<b><u>Combat Stats</u></b>\n" + combatStats, false);
        // End Combat Stats

        // Begin Children Stats
        let childStats: string = "";

        if (player.statusAffects.get("Birthed").value1 > 0)
            childStats += "<b>Times Given Birth:</b> " + player.statusAffects.get("Birthed").value1 + "\n";

        if (flags[FlagEnum.AMILY_MET] > 0)
            childStats += "<b>Litters With Amily:</b> " + (flags[FlagEnum.AMILY_BIRTH_TOTAL] + flags[FlagEnum.PC_TIMES_BIRTHED_AMILYKIDS]) + "\n";

        if (flags[FlagEnum.BENOIT_EGGS] > 0)
            childStats += "<b>Benoit Eggs Laid:</b> " + flags[FlagEnum.BENOIT_EGGS] + "\n";

        if (flags[FlagEnum.COTTON_KID_COUNT] > 0)
            childStats += "<b>Children With Cotton:</b> " + flags[FlagEnum.COTTON_KID_COUNT] + "\n";

        if (flags[FlagEnum.EDRYN_NUMBER_OF_KIDS] > 0)
            childStats += "<b>Children With Edryn:</b> " + flags[FlagEnum.EDRYN_NUMBER_OF_KIDS] + "\n";

        if (flags[FlagEnum.EMBER_CHILDREN_MALES] > 0)
            childStats += "<b>Ember Offspring (Males):</b> " + flags[FlagEnum.EMBER_CHILDREN_MALES] + "\n";
        if (flags[FlagEnum.EMBER_CHILDREN_FEMALES] > 0)
            childStats += "<b>Ember Offspring (Females):</b> " + flags[FlagEnum.EMBER_CHILDREN_FEMALES] + "\n";
        if (flags[FlagEnum.EMBER_CHILDREN_HERMS] > 0)
            childStats += "<b>Ember Offspring (Herms):</b> " + flags[FlagEnum.EMBER_CHILDREN_HERMS] + "\n";

        if (flags[FlagEnum.EMBER_EGGS] > 0)
            childStats += "<b>Ember Eggs Produced:</b> " + flags[FlagEnum.EMBER_EGGS] + "\n";

        if (flags[FlagEnum.IZMA_CHILDREN_SHARKGIRLS] > 0)
            childStats += "<b>Children With Izma (Sharkgirls):</b> " + flags[FlagEnum.IZMA_CHILDREN_SHARKGIRLS] + "\n";

        if (flags[FlagEnum.IZMA_CHILDREN_TIGERSHARKS] > 0)
            childStats += "<b>Children With Izma (Tigersharks):</b> " + flags[FlagEnum.IZMA_CHILDREN_TIGERSHARKS] + "\n";

        if (flags[FlagEnum.KELLY_KIDS_MALE] > 0)
            childStats += "<b>Children With Kelly (Males):</b> " + flags[FlagEnum.KELLY_KIDS_MALE] + "\n";

        if (flags[FlagEnum.KELLY_KIDS] - flags[FlagEnum.KELLY_KIDS_MALE] > 0)
            childStats += "<b>Children With Kelly (Females):</b> " + (flags[FlagEnum.KELLY_KIDS] - flags[FlagEnum.KELLY_KIDS_MALE]) + "\n";

        if (mountain.salon.lynnetteApproval() != 0)
            childStats += "<b>Lynnette Children:</b> " + flags[FlagEnum.LYNNETTE_BABY_COUNT] + "\n";

        if (flags[FlagEnum.MARBLE_KIDS] > 0)
            childStats += "<b>Children With Marble:</b> " + flags[FlagEnum.MARBLE_KIDS] + "\n";

        if (flags[FlagEnum.ANT_KIDS] > 0)
            childStats += "<b>Ant Children With Phylla:</b> " + flags[FlagEnum.ANT_KIDS] + "\n";

        if (flags[FlagEnum.PHYLLA_DRIDER_BABIES_COUNT] > 0)
            childStats += "<b>Drider Children With Phylla:</b> " + flags[FlagEnum.PHYLLA_DRIDER_BABIES_COUNT] + "\n";

        if (flags[FlagEnum.SHEILA_JOEYS] > 0)
            childStats += "<b>Children With Sheila (Joeys):</b> " + flags[FlagEnum.SHEILA_JOEYS] + "\n";

        if (flags[FlagEnum.SHEILA_IMPS] > 0)
            childStats += "<b>Children With Sheila (Imps):</b> " + flags[FlagEnum.SHEILA_IMPS] + "\n";

        if (flags[FlagEnum.SOPHIE_ADULT_KID_COUNT] > 0 || flags[FlagEnum.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) {
            childStats += "<b>Children With Sophie:</b> ";
            let sophie: number = 0;
            if (flags[FlagEnum.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) sophie++;
            sophie += flags[FlagEnum.SOPHIE_ADULT_KID_COUNT];
            if (flags[FlagEnum.SOPHIE_CAMP_EGG_COUNTDOWN] > 0) sophie++;
            childStats += sophie + "\n";
        }

        if (flags[FlagEnum.SOPHIE_EGGS_LAID] > 0)
            childStats += "<b>Eggs Fertilized For Sophie:</b> " + (flags[FlagEnum.SOPHIE_EGGS_LAID] + sophie) + "\n";

        if (flags[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] > 0)
            childStats += "<b>Children With Tamani:</b> " + flags[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] + " (after all forms of natural selection)\n";

        if (urtaPregs.urtaKids() > 0)
            childStats += "<b>Children With Urta:</b> " + urtaPregs.urtaKids() + "\n";

        //Mino sons
        if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] > 0)
            childStats += "<b>Number of Adult Minotaur Offspring:</b> " + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] + "\n";

        if (childStats != "")
            MainScreen.text("\n<b><u>Children</u></b>\n" + childStats, false);
        // End Children Stats

        // Begin Body Stats
        let bodyStats: string = "";

        bodyStats += "<b>Anal Capacity:</b> " + Math.round(player.analCapacity()) + "\n";
        bodyStats += "<b>Anal Looseness:</b> " + Math.round(player.ass.analLooseness) + "\n";

        bodyStats += "<b>Fertility (Base) Rating:</b> " + Math.round(player.fertility) + "\n";
        bodyStats += "<b>Fertility (With Bonuses) Rating:</b> " + Math.round(player.totalFertility()) + "\n";

        if (player.cumQ() > 0)
            bodyStats += "<b>Cum Production:</b> " + Math.round(player.cumQ()) + "mL\n";
        if (player.lactationQ() > 0)
            bodyStats += "<b>Milk Production:</b> " + Math.round(player.lactationQ()) + "mL\n";

        if (player.statusAffects.has("Feeder")) {
            bodyStats += "<b>Hours Since Last Time Breastfed Someone:</b>  " + player.statusAffects.get("Feeder").value2;
            if (player.statusAffects.get("Feeder").value2 >= 72)
                bodyStats += " (Too long! Sensitivity Increasing!)";

            bodyStats += "\n";
        }

        bodyStats += "<b>Pregnancy Speed Multiplier:</b> ";
        let preg: number = 1;
        if (player.perks.has("Diapause"))
            bodyStats += "? (Variable due to Diapause)\n";
        else {
            if (player.perks.has("MaraesGiftFertility")) preg++;
            if (player.perks.has("BroodMother")) preg++;
            if (player.perks.has("FerasBoonBreedingBitch")) preg++;
            if (player.perks.has("MagicalFertility")) preg++;
            if (player.perks.has("FerasBoonWideOpen") || player.perks.has("FerasBoonMilkingTwat")) preg++;
            bodyStats += preg + "\n";
        }

        if (player.lowerBody.cockSpot.count() > 0) {
            bodyStats += "<b>Total Cocks:</b> " + player.lowerBody.cockSpot.count() + "\n";

            let totalCockLength: number = 0;
            let totalCockGirth: number = 0;

            for (let i: number = 0; i < player.lowerBody.cockSpot.count(); i++) {
                totalCockLength += player.lowerBody.cockSpot.list[i].cockLength;
                totalCockGirth += player.lowerBody.cockSpot.list[i].cockThickness
            }

            bodyStats += "<b>Total Cock Length:</b> " + Math.round(totalCockLength) + " inches\n";
            bodyStats += "<b>Total Cock Girth:</b> " + Math.round(totalCockGirth) + " inches\n";

        }

        if (player.lowerBody.vaginaSpot.count() > 0)
            bodyStats += "<b>Vaginal Capacity:</b> " + Math.round(player.vaginalCapacity()) + "\n" + "<b>Vaginal Looseness:</b> " + Math.round(player.looseness()) + "\n";

        if (player.perks.has("SpiderOvipositor") || player.perks.has("BeeOvipositor"))
            bodyStats += "<b>Ovipositor Total Egg Count: " + player.eggs() + "\nOvipositor Fertilized Egg Count: " + player.fertilizedEggs() + "</b>\n";

        if (player.statusAffects.has("SlimeCraving")) {
            if (player.statusAffects.get("SlimeCraving").value1 >= 18)
                bodyStats += "<b>Slime Craving:</b> Active! You are currently losing strength and speed.  You should find fluids.\n";
            else {
                if (player.perks.has("SlimeCore"))
                    bodyStats += "<b>Slime Stored:</b> " + ((17 - player.statusAffects.get("SlimeCraving").value1) * 2) + " hours until you start losing strength.\n";
                else
                    bodyStats += "<b>Slime Stored:</b> " + (17 - player.statusAffects.get("SlimeCraving").value1) + " hours until you start losing strength.\n";
            }
        }

        if (bodyStats != "")
            MainScreen.text("\n<b><u>Body Stats</u></b>\n" + bodyStats, false);
        // End Body Stats

        // Begin Misc Stats
        let miscStats: string = "";

        if (flags[FlagEnum.EGGS_BOUGHT] > 0)
            miscStats += "<b>Eggs Traded For:</b> " + flags[FlagEnum.EGGS_BOUGHT] + "\n";

        if (flags[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] > 0)
            miscStats += "<b>Times Had Fun with Feline Flexibility:</b> " + flags[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] + "\n";

        if (flags[FlagEnum.FAP_ARENA_SESSIONS] > 0)
            miscStats += "<b>Times Circle Jerked in the Arena:</b> " + flags[FlagEnum.FAP_ARENA_SESSIONS] + "\n<b>Victories in the Arena:</b> " + flags[FlagEnum.FAP_ARENA_VICTORIES] + "\n";

        if (flags[FlagEnum.SPELLS_CAST] > 0)
            miscStats += "<b>Spells Cast:</b> " + flags[FlagEnum.SPELLS_CAST] + "\n";

        if (miscStats != "")
            MainScreen.text("\n<b><u>Miscellaneous Stats</u></b>\n" + miscStats);
        // End Misc Stats

        // Begin Addition Stats
        let addictStats: string = "";
        //Marble Milk Addition
        if (player.statusAffects.get("$1").value3 > 0) {
            addictStats += "<b>Marble Milk:</b> ";
            if (!player.perks.has("MarbleResistant") && !player.perks.has("MarblesMilk"))
                addictStats += Math.round(player.statusAffects.get("Marble").value2) + "%\n";
            else if (player.perks.has("MarbleResistant"))
                addictStats += "0%\n";
            else
                addictStats += "100%\n";
        }

        // Mino Cum Addiction
        if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00340] > 0 || flags[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 0 || player.perks.has("MinotaurCumAddict")) {
            if (!player.perks.has("MinotaurCumAddict"))
                addictStats += "<b>Minotaur Cum:</b> " + Math.round(flags[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] * 10) / 10 + "%\n";
            else
                addictStats += "<b>Minotaur Cum:</b> 100+%\n";
        }

        if (addictStats != "")
            MainScreen.text("\n<b><u>Addictions</u></b>\n" + addictStats, false);
        // End Addition Stats

        // Begin Interpersonal Stats
        let interpersonStats: string = "";

        if (flags[FlagEnum.ARIAN_PARK] > 0)
            interpersonStats += "<b>Arian's Health:</b> " + Math.round(arianScene.arianHealth()) + "\n";

        if (flags[FlagEnum.ARIAN_VIRGIN] > 0)
            interpersonStats += "<b>Arian Sex Counter:</b> " + Math.round(flags[FlagEnum.ARIAN_VIRGIN]) + "\n";

        if (bazaar.benoit.benoitAffection() > 0)
            interpersonStats += "<b>" + bazaar.benoit.benoitMF("Benoit", "Benoite") + " Affection:</b> " + Math.round(bazaar.benoit.benoitAffection()) + "%\n";

        if (flags[FlagEnum.BROOKE_MET] > 0)
            interpersonStats += "<b>Brooke Affection:</b> " + Math.round(telAdre.brooke.brookeAffection()) + "\n";

        if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00218] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00219] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00220] > 0)
            interpersonStats += "<b>Body Parts Taken By Ceraph:</b> " + (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00218] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00219] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00220]) + "\n";

        if (emberScene.emberAffection() > 0)
            interpersonStats += "<b>Ember Affection:</b> " + Math.round(emberScene.emberAffection()) + "%\n";

        if (helFollower.helAffection() > 0)
            interpersonStats += "<b>Helia Affection:</b> " + Math.round(helFollower.helAffection()) + "%\n";
        if (helFollower.helAffection() >= 100)
            interpersonStats += "<b>Helia Bonus Points:</b> " + Math.round(flags[FlagEnum.HEL_BONUS_POINTS]) + "\n";

        if (flags[FlagEnum.ISABELLA_AFFECTION] > 0) {
            interpersonStats += "<b>Isabella Affection:</b> ";

            if (!isabellaFollowerScene.isabellaFollower())
                interpersonStats += Math.round(flags[FlagEnum.ISABELLA_AFFECTION]) + "%\n", false;
            else
                interpersonStats += "100%\n";
        }

        if (flags[FlagEnum.KATHERINE_UNLOCKED] >= 4) {
            interpersonStats += "<b>Katherine Submissiveness:</b> " + telAdre.katherine.submissiveness() + "\n";
        }

        if (player.statusAffects.has("Kelt") && flags[FlagEnum.KELT_BREAK_LEVEL] == 0) {
            if (player.statusAffects.get("Kelt").value2 >= 130)
                interpersonStats += "<b>Submissiveness To Kelt:</b> " + 100 + "%\n";
            else
                interpersonStats += "<b>Submissiveness To Kelt:</b> " + Math.round(player.statusAffects.get("Kelt").value2 / 130 * 100) + "%\n";
        }

        if (flags[FlagEnum.ANEMONE_KID] > 0)
            interpersonStats += "<b>Kid A's Confidence:</b> " + anemoneScene.kidAXP() + "%\n";

        if (flags[FlagEnum.KIHA_AFFECTION_LEVEL] == 2) {
            if (kihaFollower.followerKiha())
                interpersonStats += "<b>Kiha Affection:</b> " + 100 + "%\n";
            else
                interpersonStats += "<b>Kiha Affection:</b> " + Math.round(flags[FlagEnum.KIHA_AFFECTION]) + "%\n";
        }
        //Lottie stuff
        if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00281] > 0)
            interpersonStats += "<b>Lottie's Encouragement:</b> " + telAdre.lottie.lottieMorale() + " (higher is better)\n" + "<b>Lottie's Figure:</b> " + telAdre.lottie.lottieTone() + " (higher is better)\n";

        if (mountain.salon.lynnetteApproval() != 0)
            interpersonStats += "<b>Lynnette's Approval:</b> " + mountain.salon.lynnetteApproval() + "\n";

        if (flags[FlagEnum.OWCAS_ATTITUDE] > 0)
            interpersonStats += "<b>Owca's Attitude:</b> " + flags[FlagEnum.OWCAS_ATTITUDE] + "\n";

        if (telAdre.rubi.rubiAffection() > 0)
            interpersonStats += "<b>Rubi's Affection:</b> " + Math.round(telAdre.rubi.rubiAffection()) + "%\n" + "<b>Rubi's Orifice Capacity:</b> " + Math.round(telAdre.rubi.rubiCapacity()) + "%\n";

        if (flags[FlagEnum.SHEILA_XP] != 0) {
            interpersonStats += "<b>Sheila's Corruption:</b> " + sheilaScene.sheilaCorruption();
            if (sheilaScene.sheilaCorruption() > 100)
                interpersonStats += " (Yes, it can go above 100)";
            interpersonStats += "\n";
        }

        if (flags[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY] != 0) {
            if (urta.urtaLove())
                interpersonStats += "<b>Urta Status:</b> Lover\n";
            else if (flags[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY] == -1)
                interpersonStats += "<b>Urta Status:</b> Ashamed\n";
            else if (flags[FlagEnum.URTA_PC_AFFECTION_COUNTER] < 30)
                interpersonStats += "<b>Urta's Affection:</b> " + Math.round(flags[FlagEnum.URTA_PC_AFFECTION_COUNTER] * 3.3333) + "%\n";
            else
                interpersonStats += "<b>Urta Status:</b> Ready To Confess Love\n";
        }

        if (interpersonStats != "")
            MainScreen.text("\n<b><u>Interpersonal Stats</u></b>\n" + interpersonStats, false);
        // End Interpersonal Stats

        // Begin Ongoing Stat Effects
        let statEffects: string = "";

        if (player.inHeat)
            statEffects += "Heat - " + Math.round(player.statusAffects.get("$1").value3) + " hours remaining\n";

        if (player.inRut)
            statEffects += "Rut - " + Math.round(player.statusAffects.get("$1").value3) + " hours remaining\n";

        if (player.statusAffects.get("Luststick").value1 > 0)
            statEffects += "Luststick - " + Math.round(player.statusAffects.get("Luststick").value1) + " hours remaining\n";

        if (player.statusAffects.get("BlackCatBeer").value1 > 0)
            statEffects += "Black Cat Beer - " + player.statusAffects.get("BlackCatBeer").value1 + " hours remaining (Lust resistance 20% lower, physical resistance 25% higher.)\n";

        if (statEffects != "")
            MainScreen.text("\n<b><u>Ongoing Status Effects</u></b>\n" + statEffects, false);
        // End Ongoing Stat Effects

        doNext(playerMenu);
    }


}