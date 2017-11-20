import Character from '../Character/Character';
import CombatContainer from '../Combat/CombatContainer';
import { CombatEndType } from '../Combat/CombatEnd';
import DisplayText from '../display/DisplayText';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Utils from '../Utilities/Utils';

class PlayerCombatContainer extends CombatContainer {
    public hasEscaped(enemy: Character): boolean {
        throw new Error("Method not implemented.");
    }
    protected victoryScene(loseType: CombatEndType, enemy: Character): void {
        throw new Error("Method not implemented.");
    }
    public hasDefeated(enemy: Character): boolean {
        return false;
    }

    public claimsVictory(winType: CombatEndType, enemy: Character): void {
        if (winType == CombatEndType.HP) {
            DisplayText.text("You defeat " + enemy.desc.a + enemy.desc.short + ".\n", true);
        }
        else if (winType == CombatEndType.Lust) {
            DisplayText.text("You smile as " + enemy.desc.a + enemy.desc.short + " collapses and begins masturbating feverishly.", true);
        }
    }

    protected beforeEnemyVictoryScene(winType: CombatEndType, enemy: Character): void {
        if (this.char.statusAffects.has(StatusAffectType.Infested) && Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] == 0) {
            Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] = 1;
            infestOrgasm();
        }
    }

    protected onVictory(loseType: CombatEndType, enemy: Character): void {
        DisplayText.clear();
        if (loseType == CombatEndType.HP) {
            DisplayText.text("Your wounds are too great to bear, and you fall unconscious.");
        }
        else if (loseType == CombatEndType.Lust) {
            DisplayText.text("Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.");
        }
    }

    public defeatAftermath(loseType: CombatEndType, enemy: Character): void {
        if (monster.statusAffects.get(StatusAffectType.Sparring).value1 == 2) {
            DisplayText.clear();
            DisplayText.text("The cow-girl has defeated you in a practice fight!");
            DisplayText.text("\n\nYou have to lean on Isabella's shoulder while the two of your hike back to camp.  She clearly won.");
            Game.inCombat = false;
            player.HP = 1;
            doNext(nextFunc);
            return;
        }
        else if (monster.statusAffects.has(StatusAffectType.PeachLootLoss)) {
            inCombat = false;
            player.HP = 1;
            return;
        }
        else if (monster.desc.short == "Ember") {
            inCombat = false;
            player.HP = 1;
            doNext(nextFunc);
            return;
        }
        else {
            let temp: number = Utils.rand(10) + 1;
            if (temp > this.char.inventory.gems) temp = this.char.inventory.gems;
            DisplayText.text("\n\nYou'll probably wake up in eight hours or so, missing " + temp + " gems.");
            this.char.inventory.gems -= temp;
        }

        let temp = rand(10) + 1 + Math.round(monster.level / 2);
        if (inDungeon) temp += 20 + monster.level * 2;
        if (temp > player.stats.gems) temp = player.stats.gems;
        let timePasses: number = monster.handleCombatLossText(inDungeon, temp); //Allows monsters to customize the loss text and the amount of time lost


        
        if (!inDungeon) {
            DisplayText.text("\n\nYou'll probably come to your senses in eight hours or so");
            if (player.stats.gems > 1)
                DisplayText.text(", missing " + gemsLost + " gems.");
            else if (player.stats.gems == 1)
                DisplayText.text(", missing your only gem.");
            else DisplayText.text(".");
        }
        else {
            DisplayText.text("\n\nSomehow you came out of that alive");
            if (player.stats.gems > 1)
                DisplayText.text(", but after checking your gem pouch, you realize you're missing " + gemsLost + " gems.");
            else if (player.stats.gems == 1)
                DisplayText.text(", but after checking your gem pouch, you realize you're missing your only gem.");
            else DisplayText.text(".");
        }



        player.stats.gems -= temp;
        inCombat = false;
        //BUNUS XPZ
        if (Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] > 0) {
            player.XP += Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE];
            DisplayText.text("  Somehow you managed to gain " + Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] + " XP from the situation.");
            Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] = 0;
        }
        //Bonus lewts
        if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] != "") {
            DisplayText.text("  Somehow you came away from the encounter with " + ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]).longName + ".\n\n");
            inventory.takeItem(ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]), createCallBackFunction(camp.returnToCamp, timePasses));
        }
        else doNext(createCallBackFunction(camp.returnToCamp, timePasses));

        DisplayText.doNext(Game.camp.returnToCampUseEightHours);
    }

    public victoryAftermath(loseType: CombatEndType, enemy: Character): void {
        DisplayText.doNext(Game.camp.returnToCampUseOneHour);
    }

}
