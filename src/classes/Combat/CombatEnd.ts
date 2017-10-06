export default class CombatEnd {
    public endHpVictory(): void {
        monster.defeated_(true);
    }

    public endLustVictory(): void {
        monster.defeated_(false);
    }

    public endHpLoss(): void {
        monster.won_(true, false);
    }

    public endLustLoss(): void {
        if (player.statusAffects.has("Infested") && Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] == 0) {
            Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] = 1;
            infestOrgasm();
            monster.won_(false, true);
        } else {
            monster.won_(false, false);
        }
    }

    //combat is over. Clear shit out and go to main
    public cleanupAfterCombat(nextFunc: Function = null): void {
        if (nextFunc == null) nextFunc = camp.returnToCampUseOneHour;
        if (inCombat) {
            //clear status
            clearStatuses(false);
            //Clear itemswapping in case it hung somehow
            //No longer used:		itemSwapping = false;
            //Player won
            if (monster.HP < 1 || monster.lust > 99) {
                awardPlayer();
            }
            //Player lost
            else {
                if (monster.statusAffects.get("Sparring").value1 == 2) {
                    MainScreen.text("The cow-girl has defeated you in a practice fight!", true);
                    MainScreen.text("\n\nYou have to lean on Isabella's shoulder while the two of your hike back to camp.  She clearly won.", false);
                    inCombat = false;
                    player.HP = 1;
                    statScreenRefresh();
                    doNext(nextFunc);
                    return;
                }
                //Next button is handled within the minerva loss function
                if (monster.statusAffects.has("PeachLootLoss")) {
                    inCombat = false;
                    player.HP = 1;
                    statScreenRefresh();
                    return;
                }
                if (monster.short == "Ember") {
                    inCombat = false;
                    player.HP = 1;
                    statScreenRefresh();
                    doNext(nextFunc);
                    return;
                }
                temp = rand(10) + 1 + Math.round(monster.level / 2);
                if (inDungeon) temp += 20 + monster.level * 2;
                if (temp > player.stats.gems) temp = player.stats.gems;
                let timePasses: number = monster.handleCombatLossText(inDungeon, temp); //Allows monsters to customize the loss text and the amount of time lost
                player.stats.gems -= temp;
                inCombat = false;
                //BUNUS XPZ
                if (Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] > 0) {
                    player.XP += Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE];
                    MainScreen.text("  Somehow you managed to gain " + Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] + " XP from the situation.");
                    Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] = 0;
                }
                //Bonus lewts
                if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] != "") {
                    MainScreen.text("  Somehow you came away from the encounter with " + ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]).longName + ".\n\n");
                    inventory.takeItem(ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]), createCallBackFunction(camp.returnToCamp, timePasses));
                }
                else doNext(createCallBackFunction(camp.returnToCamp, timePasses));
            }
        }
        //Not actually in combat
        else doNext(nextFunc);
    }

}