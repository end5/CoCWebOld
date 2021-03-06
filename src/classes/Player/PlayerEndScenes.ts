import Character from '../Character/Character';
import { DefeatType } from '../Combat/DefeatEvent';
import EndScenes from '../Combat/EndScenes';
import DisplayText from '../display/DisplayText';
import MainScreen from '../display/MainScreen';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Game from '../Game/Game';
import { Utils } from '../Utilities/Utils';

class PlayerEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean {
        return false;
    }

    public hasDefeated(enemy: Character): boolean {
        return false;
    }

    public claimsVictory(howYouWon: DefeatType, enemy: Character): void {
        if (howYouWon === DefeatType.HP) {
            DisplayText().clear();
            DisplayText("You defeat " + enemy.desc.a + enemy.desc.short + ".\n");
        }
        else if (howYouWon === DefeatType.Lust) {
            DisplayText().clear();
            DisplayText("You smile as " + enemy.desc.a + enemy.desc.short + " collapses and begins masturbating feverishly.");
        }
    }

    public criesInDefeat(howYouLost: DefeatType, enemy: Character): void {
        if (howYouLost === DefeatType.HP) {
            DisplayText().clear();
            DisplayText("Your wounds are too great to bear, and you fall unconscious.");
        }
        else if (howYouLost === DefeatType.Lust) {
            DisplayText().clear();
            DisplayText("Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.");
        }
    }

    protected beforeEndingScene(howYouLost: DefeatType, enemy: Character): void {
        if (this.char.statusAffects.has(StatusAffectType.Infested) && Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] === 0) {
            Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] = 1;
            infestOrgasm();
        }
    }

    public readonly hasVictoryScene = false;
    protected victoryScene(howYouWon: DefeatType, enemy: Character): void { }

    public readonly hasDefeatScene = false;
    protected defeatScene(howYouLost: DefeatType, enemy: Character): void { }

    public defeatAftermath(howYouLost: DefeatType, enemy: Character): void {
        if (enemy.statusAffects.get(StatusAffectType.Sparring).value1 === 2) {
            DisplayText().clear();
            DisplayText("The cow-girl has defeated you in a practice fight!");
            DisplayText("\n\nYou have to lean on Isabella's shoulder while the two of your hike back to camp.  She clearly won.");
            Game.inCombat = false;
            this.char.stats.HP = 1;
            MainScreen.doNext(nextFunc);
            return;
        }
        else if (enemy.statusAffects.has(StatusAffectType.PeachLootLoss)) {
            Game.inCombat = false;
            this.char.stats.HP = 1;
            return;
        }
        else if (enemy.desc.short === "Ember") {
            Game.inCombat = false;
            this.char.stats.HP = 1;
            MainScreen.doNext(nextFunc);
            return;
        }
        else {
            let temp: number = Utils.rand(10) + 1;
            if (temp > this.char.inventory.gems) temp = this.char.inventory.gems;
            DisplayText("\n\nYou'll probably wake up in eight hours or so, missing " + temp + " gems.");
            this.char.inventory.gems -= temp;
        }

        let temp = Utils.rand(10) + 1 + Math.round(enemy.stats.level / 2);
        if (Game.inDungeon) temp += 20 + enemy.stats.level * 2;
        if (temp > this.char.inventory.gems) temp = this.char.inventory.gems;
        const timePasses: number = enemy.handleCombatLossText(inDungeon, temp); // Allows enemy's to customize the loss text and the amount of time lost

        if (!inDungeon) {
            DisplayText("\n\nYou'll probably come to your senses in eight hours or so");
            if (this.char.inventory.gems > 1)
                DisplayText(", missing " + gemsLost + " gems.");
            else if (this.char.inventory.gems === 1)
                DisplayText(", missing your only gem.");
            else DisplayText(".");
        }
        else {
            DisplayText("\n\nSomehow you came out of that alive");
            if (this.char.inventory.gems > 1)
                DisplayText(", but after checking your gem pouch, you realize you're missing " + gemsLost + " gems.");
            else if (this.char.inventory.gems === 1)
                DisplayText(", but after checking your gem pouch, you realize you're missing your only gem.");
            else DisplayText(".");
        }

        this.char.inventory.gems -= temp;
        inCombat = false;
        // BUNUS XPZ
        if (Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] > 0) {
            this.char.XP += Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE];
            DisplayText("  Somehow you managed to gain " + Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] + " XP from the situation.");
            Flags.list[FlagEnum.COMBAT_BONUS_XP_VALUE] = 0;
        }
        // Bonus lewts
        if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] !== "") {
            DisplayText("  Somehow you came away from the encounter with " + ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]).longName + ".\n\n");
            inventory.takeItem(ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]), createCallBackFunction(Game.camp.returnToCamp, timePasses));
        }
        else MainScreen.doNext(createCallBackFunction(Game.scenes.camp.returnToCamp, timePasses));

        MainScreen.doNext(Game.scenes.camp.returnToCampUseEightHours);
    }

    public victoryAftermath(howYouWon: DefeatType, enemy: Character): void {
        MainScreen.doNext(Game.scenes.camp.returnToCampUseOneHour);
    }
}
