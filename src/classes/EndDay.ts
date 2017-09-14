export default class EndDay {
    //Argument is time passed.  Pass to event parser if nothing happens.
    // The time argument is never actually used atm, everything is done with timeQ instead...
    public goNext(time: number, needNext: boolean): boolean {
        //Update system time
        //date = new Date();
        //trace ("MONTH: " + date.month + " DATE: " + date.date + " MINUTES: " + date.minutes);
        //MainScreen.text("", true);
        if (timeAwareLargeLastEntry >= 0) { //Finish calling timeChangeLarge before advancing the hour again
            for (; timeAwareLargeLastEntry < _timeAwareClassList.length; timeAwareLargeLastEntry++) {
                if (_timeAwareClassList[timeAwareLargeLastEntry].timeChangeLarge()) return true;
            }
            timeAwareLargeLastEntry = -1;
        }
        while (timeQ > 0) {
            timeQ--;
            model.time.hours++;
            genderCheck();
            regeneration(false);
            //Inform all time aware classes that a new hour has arrived
            for (let tac: number = 0; tac < _timeAwareClassList.length; tac++) if (_timeAwareClassList[tac].timeChange()) needNext = true;
            if (model.time.hours > 23) {
                model.time.hours = 0;
                model.time.days++;
            }
            else if (model.time.hours == 21) {
                MainScreen.text("\nThe sky darkens as a starless night falls.  The blood-red moon slowly rises up over the horizon.\n");
                needNext = true;
            }
            else if (model.time.hours == 6) {
                MainScreen.text("\nThe sky begins to grow brighter as the moon descends over distant mountains, casting a few last ominous shadows before they burn away in the light.\n");
                needNext = true;
            }
            //BIG EVENTS GO IN HERE
            //BIG EVENTS GO IN HERE
            //BIG EVENTS GO IN HERE
            //BIG EVENTS GO IN HERE

            /* Inform all time aware classes that it's time for large events to trigger. Note that timeChangeLarge could be called multiple times in a single tick
               of the clock, so any updates should happen in timeChange and any timeChangeLarge events need to make sure they cannot repeat within the same hour.
               In effect these are the same rules the existing code acted under. */
            for (timeAwareLargeLastEntry = 0; timeAwareLargeLastEntry < _timeAwareClassList.length; timeAwareLargeLastEntry++) {
                if (_timeAwareClassList[timeAwareLargeLastEntry].timeChangeLarge()) return true;
            }
            timeAwareLargeLastEntry = -1; //If this let is -1 then this function has called timeChangeLarge for all entries in the _timeAwareClassList

            //IMP GANGBAAAAANGA
            //The more imps you create, the more often you get gangraped.
            temp = player.statusAffects.get("BirthedImps").value1 * 2;
            if (temp > 7) temp = 7;
            if (player.perks.has("PiercedLethite")) temp += 4;
            if (player.inHeat) temp += 2;
            if (vapula.vapulaSlave()) temp += 7;
            if (model.time.hours == 2) {
                if (model.time.days % 30 == 0 && flags[FlagEnum.ANEMONE_KID] > 0 && player.lowerBody.cockSpot.hasCock() && flags[FlagEnum.ANEMONE_WATCH] > 0 && flags[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] >= 40) {
                    anemoneScene.goblinNightAnemone();
                    needNext = true;
                }
                else if (temp > rand(100) && player.findStatusAffect(StatusAffects.DefenseCanopy) < 0) {
                    if (player.gender > 0 && (player.findStatusAffect(StatusAffects.JojoNightWatch) < 0 || player.findStatusAffect(StatusAffects.PureCampJojo) < 0) && (flags[FlagEnum.HEL_GUARDING] == 0 || !helFollower.followerHel()) && flags[FlagEnum.ANEMONE_WATCH] == 0 && (flags[FlagEnum.HOLLI_DEFENSE_ON] == 0 || flags[FlagEnum.FUCK_FLOWER_KILLED] > 0) && (flags[FlagEnum.KIHA_CAMP_WATCH] == 0 || !kihaFollower.followerKiha())) {
                        impScene.impGangabangaEXPLOSIONS();
                        doNext(playerMenu);
                        return true;
                    }
                    else if (flags[FlagEnum.KIHA_CAMP_WATCH] > 0 && kihaFollower.followerKiha()) {
                        MainScreen.text("\n<b>You find charred imp carcasses all around the camp once you wake.  It looks like Kiha repelled a swarm of the little bastards.</b>\n");
                        needNext = true;
                    }
                    else if (flags[FlagEnum.HEL_GUARDING] > 0 && helFollower.followerHel()) {
                        MainScreen.text("\n<b>Helia informs you over a mug of beer that she whupped some major imp asshole last night.  She wiggles her tail for emphasis.</b>\n");
                        needNext = true;
                    }
                    else if (player.gender > 0 && player.statusAffects.has("JojoNightWatch") && player.statusAffects.has("PureCampJojo")) {
                        MainScreen.text("\n<b>Jojo informs you that he dispatched a crowd of imps as they tried to sneak into camp in the night.</b>\n");
                        needNext = true;
                    }
                    else if (flags[FlagEnum.HOLLI_DEFENSE_ON] > 0) {
                        MainScreen.text("\n<b>During the night, you hear distant screeches of surprise, followed by orgasmic moans.  It seems some imps found their way into Holli's canopy...</b>\n");
                        needNext = true;
                    }
                    else if (flags[FlagEnum.ANEMONE_WATCH] > 0) {
                        MainScreen.text("\n<b>Your sleep is momentarily disturbed by the sound of tiny clawed feet skittering away in all directions.  When you sit up, you can make out Kid A holding a struggling, concussed imp in a headlock and wearing a famished expression.  You catch her eye and she sheepishly retreats to a more urbane distance before beginning her noisy meal.</b>\n");
                        needNext = true;
                    }
                }
                //wormgasms
                else if (flags[FlagEnum.EVER_INFESTED] == 1 && rand(100) <= 4 && player.lowerBody.cockSpot.hasCock() && player.findStatusAffect(StatusAffects.Infested) < 0) {
                    if (player.lowerBody.cockSpot.hasCock() && (player.findStatusAffect(StatusAffects.JojoNightWatch) < 0 || player.findStatusAffect(StatusAffects.PureCampJojo) < 0) && (flags[FlagEnum.HEL_GUARDING] == 0 || !helFollower.followerHel()) && flags[FlagEnum.ANEMONE_WATCH] == 0) {
                        nightTimeInfestation();
                        return true;
                    }
                    else if (flags[FlagEnum.HEL_GUARDING] > 0 && helFollower.followerHel()) {
                        MainScreen.text("\n<b>Helia informs you over a mug of beer that she stomped a horde of gross worms into paste.  She shudders after at the memory.</b>\n");
                        needNext = true;
                    }
                    else if (player.gender > 0 && player.statusAffects.has("JojoNightWatch") && player.statusAffects.has("PureCampJojo")) {
                        MainScreen.text("\n<b>Jojo informs you that he dispatched a horde of tiny, white worms as they tried to sneak into camp in the night.</b>\n");
                        needNext = true;
                    }
                    else if (flags[FlagEnum.ANEMONE_WATCH] > 0) {
                        MainScreen.text("\n<b>Kid A seems fairly well fed in the morning, and you note a trail of slime leading off in the direction of the lake.</b>\n"); // Yeah, blah blah travel weirdness. Quickfix so it seems logically correct.
                        needNext = true;
                    }
                }
            }
            //No diapause?  Normal!
            if (!player.perks.has("Diapause")) {
                if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (player.perks.has("MaraesGiftFertility")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                //DOUBLE PREGGERS SPEED
                if (player.perks.has("MagicalFertility")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (player.perks.has("FerasBoonBreedingBitch")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (player.perks.has("FerasBoonWideOpen") || player.perks.has("FerasBoonMilkingTwat")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (player.perks.has("BroodMother")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
            }
            //Diapause!
            else if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00228] > 0 && (player.pregnancyIncubation > 0 || player.buttPregnancyIncubation > 0)) {
                if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00229] == 1) {
                    flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00229] = 0;
                    MainScreen.text("\n\nYour body reacts to the influx of nutrition, accelerating your pregnancy. Your belly bulges outward slightly.", false);
                    needNext = true;
                }
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00228]--;
                if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (player.perks.has("MaraesGiftFertility")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                //DOUBLE PREGGERS SPEED
                if (player.perks.has("MagicalFertility")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (player.perks.has("FerasBoonBreedingBitch")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (player.perks.has("FerasBoonWideOpen") || player.perks.has("FerasBoonMilkingTwat")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (player.perks.has("BroodMother")) {
                    if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (flags[FlagEnum.EVENT_PARSER_ESCAPE] == 1) {
                    flags[FlagEnum.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
            }
            //Egg loot!
            if (player.statusAffects.has("LootEgg")) {
                trace("EGG LOOT HAS");
                //default
                let itype: ItemType =
                    [
                        [consumables.BROWNEG, consumables.PURPLEG, consumables.BLUEEGG, consumables.PINKEGG, consumables.WHITEEG, consumables.BLACKEG],
                        [consumables.L_BRNEG, consumables.L_PRPEG, consumables.L_BLUEG, consumables.L_PNKEG, consumables.L_WHTEG, consumables.L_BLKEG]]
                    [player.statusAffect(player.findStatusAffect(StatusAffects.Eggs)).value2 || 0][player.statusAffect(player.findStatusAffect(StatusAffects.Eggs)).value1 || 0] ||
                    consumables.BROWNEG;
                player.statusAffects.remove("LootEgg");
                player.statusAffects.remove("Eggs");
                trace("TAKEY NAU");
                inventory.takeItem(itype, playerMenu);
                return true;
            }
            // Benoit preggers update
            if (flags[FlagEnum.FEMOIT_EGGS] > 0) flags[FlagEnum.FEMOIT_INCUBATION]--; // We're not capping it, we're going to use negative values to figure out diff events
        }

        // Hanging the Uma massage update here, I think it should work...
        telAdre.umasShop.updateBonusDuration(time);
        if (player.statusAffects.has("UmasMassage")) {
            trace("Uma's massage bonus time remaining: " + player.statusAffects.get("$1").value3);
        }

        highMountains.izumiScenes.updateSmokeDuration(time);
        if (player.statusAffects.has("IzumisPipeSmoke")) {
            trace("Izumis pipe smoke time remaining: " + player.statusAffects.get("IzumisPipeSmoke").value1);
        }

        //Drop axe if too short!
        if (player.tallness < 78 && player.weapon == weapons.L__AXE) {
            MainScreen.text("<b>\nThis axe is too large for someone of your stature to use, though you can keep it in your inventory until you are big enough.</b>\n");
            inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
            return true;
        }
        if (player.weapon == weapons.L_HAMMR && player.tallness < 60) {
            MainScreen.text("<b>\nYou've become too short to use this hammer anymore.  You can still keep it in your inventory, but you'll need to be taller to effectively wield it.</b>\n");
            inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
            return true;
        }
        if (player.weapon == weapons.CLAYMOR && player.str < 40) {
            MainScreen.text("\n<b>You aren't strong enough to handle the weight of your weapon any longer, and you're forced to stop using it.</b>\n");
            inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
            return true;
        }
        if (player.weapon == weapons.WARHAMR && player.str < 80) {
            MainScreen.text("\n<b>You aren't strong enough to handle the weight of your weapon any longer!</b>\n");
            inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
            return true;
        }
        //Drop beautiful sword if corrupted!
        if (player.weaponPerk == "holySword" && player.stats.cor >= 35) {
            MainScreen.text("<b>\nThe <u>" + player.weaponName + "</u> grows hot in your hand, until you are forced to drop it.  Whatever power inhabits this blade appears to be unhappy with you.  Touching it gingerly, you realize it is no longer hot, but as soon as you go to grab the hilt, it nearly burns you.\n\nYou realize you won't be able to use it right now, but you could probably keep it in your inventory.</b>\n\n");
            inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
            return true;
        }
        //Unequip Lusty maiden armor
        if (player.armorName == "lusty maiden's armor") {
            //Removal due to no longer fitting:
            //Grew Cock or Balls
            if (player.lowerBody.cockSpot.hasCock() || player.lowerBody.balls > 0) {
                MainScreen.text("\nYou fidget uncomfortably in the g-string of your lewd bikini - there simply isn't enough room for your ");
                if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("maleness");
                else MainScreen.text("bulgy balls");
                MainScreen.text(" within the imprisoning leather, and it actually hurts to wear it.  <b>You'll have to find some other form of protection!</b>\n\n");
                inventory.takeItem(player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), playerMenu);
                return true;
            }
            //Lost pussy
            else if (!player.lowerBody.vaginaSpot.hasVagina()) {
                MainScreen.text("\nYou fidget uncomfortably as the crease in the gusset of your lewd bikini digs into your sensitive, featureless loins.  There's simply no way you can continue to wear this outfit in comfort - it was expressly designed to press in on the female mons, and without a vagina, <b>you simply can't wear this exotic armor.</b>\n\n");
                inventory.takeItem(player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), playerMenu);
                return true;
            }
            //Tits gone or too small
            else if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 4) {
                MainScreen.text("\nThe fine chain that makes up your lewd bikini-top is dangling slack against your flattened chest.  Every movement and step sends it jangling noisily, slapping up against your [nipples], uncomfortably cold after being separated from your " + player.skinFurScales() + " for so long.  <b>There's no two ways about it - you'll need to find something else to wear.</b>\n\n");
                inventory.takeItem(player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), playerMenu);
                return true;
            }
        }
        // update cock type as dog/fox depending on whether the player resembles one more than the other.
        // Previously used to be computed directly in cockNoun, but refactoring prevents access to the Player class when in cockNoun now.
        if (player.totalCocks() != 0) {
            let counter: number = player.totalCocks() - 1;
            while (counter >= 0) {
                if (player.lowerBody.cockSpot.list[counter].cockType == CockType.DOG || player.lowerBody.cockSpot.list[counter].cockType == CockType.FOX) {
                    if (player.dogScore() >= player.foxScore())
                        player.lowerBody.cockSpot.list[counter].cockType = CockType.DOG;
                    else
                        player.lowerBody.cockSpot.list[counter].cockType = CockType.FOX;
                }
                counter--;
                // trace("IMA LOOPIN", counter);
            }

        }
        statScreenRefresh();
        if (needNext) {
            doNext(playerMenu);
            return true;
        }
        playerMenu();
        return false;
    }

    public cheatTime(time: number): void {
        while (time > 0) {
            time--;
            model.time.hours++;
            if (model.time.hours > 23) {
                model.time.days++;
                model.time.hours = 0;
            }
        }
        statScreenRefresh();
    }


}