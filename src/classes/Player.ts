import { ButtLooseness, ButtWetness } from './Body/Butt';
import { SkinType } from './Body/Creature';
import { FaceType, TongueType } from './Body/Face';
import { HornType } from './Body/Head';
import { TailType } from './Body/LowerBody';
import { WingType } from './Body/UpperBody';
import Character from './Character/Character';
import { CharacterType } from './Character/CharacterType';
import CombatContainer from './Combat/CombatContainer';
import { CombatEndType } from './Combat/CombatEnd';
import MainScreen from './display/MainScreen';
import StatusAffect from './Effects/StatusAffect';
import Flags, { FlagEnum } from './Game/Flags';
import Item from './Items/Item';
import KeyItem from './Items/KeyItem';
import Utils from './Utilities/Utils';

class PlayerCombatContainer extends CombatContainer {
    public hasDefeated(enemy: Character): boolean {
        return false;
    }

    public claimsVictory(winType: CombatEndType, enemy: Character): void {
        if (winType == CombatEndType.HP) {
            MainScreen.text("You defeat " + enemy.desc.a + enemy.desc.short + ".\n", true);
        }
        else if (winType == CombatEndType.Lust) {
            MainScreen.text("You smile as " + enemy.desc.a + enemy.desc.short + " collapses and begins masturbating feverishly.", true);
        }
    }

    protected onEnemyVictory(winType: CombatEndType, enemy: Character): void {
        if (this.char.statusAffects.has("Infested") && Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] == 0) {
            Flags.list[FlagEnum.CAME_WORMS_AFTER_COMBAT] = 1;
            infestOrgasm();
        }
    }

    protected onVictory(loseType: CombatEndType, enemy: Character): void {
        if (loseType == CombatEndType.HP) {
            MainScreen.text("Your wounds are too great to bear, and you fall unconscious.", true);
        }
        else if (loseType == CombatEndType.Lust) {
            MainScreen.text("Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.", true);
        }
    }

    public defeatAftermath(loseType: CombatEndType, enemy: Character): void {
        if (monster.statusAffects.get("Sparring").value1 == 2) {
            MainScreen.text("The cow-girl has defeated you in a practice fight!", true);
            MainScreen.text("\n\nYou have to lean on Isabella's shoulder while the two of your hike back to camp.  She clearly won.", false);
            Game.inCombat = false;
            player.HP = 1;
            statScreenRefresh();
            doNext(nextFunc);
            return;
        }
        else if (monster.statusAffects.has("PeachLootLoss")) {
            inCombat = false;
            player.HP = 1;
            statScreenRefresh();
            return;
        }
        else if (monster.desc.short == "Ember") {
            inCombat = false;
            player.HP = 1;
            statScreenRefresh();
            doNext(nextFunc);
            return;
        }
        else {
            let temp: number = Utils.rand(10) + 1;
            if (temp > this.char.inventory.gems) temp = this.char.inventory.gems;
            MainScreen.text("\n\nYou'll probably wake up in eight hours or so, missing " + temp + " gems.", false);
            this.char.inventory.gems -= temp;
        }

        let temp = rand(10) + 1 + Math.round(monster.level / 2);
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

        MainScreen.doNext(Game.camp.returnToCampUseEightHours);
    }

    public victoryAftermath(loseType: CombatEndType, enemy: Character): void {
        MainScreen.doNext(Game.camp.returnToCampUseOneHour);
    }

}

export default class Player extends Character {
    public keyItems: KeyItem[];

    public constructor() {
        super(CharacterType.Player);
        // Reset all standard stats
        this.stats.str = 15;
        this.stats.tou = 15;
        this.stats.spe = 15;
        this.stats.int = 15;
        this.stats.sens = 15;
        this.stats.lib = 15;
        this.stats.cor = 0;
        this.stats.lust = 15;

        //kGAMECLASS.notes = "No Notes Available.";
        this.stats.XP = Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP];
        this.stats.level = 1;
        this.stats.HP = this.stats.maxHP();
        this.inventory.gems = Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS];
        this.skinType = SkinType.PLAIN;
        this.upperBody.head.face.faceType = FaceType.HUMAN;
        this.lowerBody.tailType = TailType.NONE;
        this.upperBody.head.face.tongueType = TongueType.HUMAN;
        this.skinDesc = "skin";
        this.cumMultiplier = 1;
        this.hoursSinceCum = 0;
        this.lowerBody.butt.analLooseness = ButtLooseness.VIRGIN;
        this.lowerBody.butt.analWetness = ButtWetness.DRY;
        this.lowerBody.butt.fullness = 0;
        this.stats.fatigue = 0;
        this.upperBody.head.horns = HornType.NONE;
        this.lowerBody.tailVenom = 0;
        this.lowerBody.tailRecharge = 0;
        this.upperBody.wingType = WingType.NONE;
        this.upperBody.wingDesc = "non-existant";

        // Inventory
        this.inventory.items.unlock(6);
        this.keyItems = [];

        // Combat
        this.combatContainer = new PlayerCombatContainer(this);
    }


    //Lust vulnerability
    //TODO: Kept for backwards compatibility reasons but should be phased out.
    public lustVuln: number = 1;

    //Teasing attributes
    public teaseLevel: number = 0;
    public teaseXP: number = 0;

    //Perks used to store 'queued' perk buys
    public perkPoints: number = 0;

    //Number of times explored for new areas
    public explored: number = 0;
    public exploredForest: number = 0;
    public exploredDesert: number = 0;
    public exploredMountain: number = 0;
    public exploredLake: number = 0;

    // Inventory

    public hasKeyItem(objectKey: string): boolean {
        for (let index = 0; index < this.keyItems.length; index++) {
            if (this.keyItems[index].objectKey == name)
                return true;
        }
        return false;
    }

    public slimeFeed(): void {
        if (this.statusAffects.has("SlimeCraving")) {
            //Reset craving value
            this.statusAffects.get("SlimeCraving").value1 = 0;
            //Flag to display feed update and restore stats in event parser
            if (!this.statusAffects.has("SlimeCravingFeed")) {
                this.statusAffects.add(new StatusAffect("SlimeCravingFeed", 0, 0, 0, 0));
            }
        }
        if (this.perks.has("Diapause")) {
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00228] += 3 + Utils.rand(33);
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00229] = 1;
        }

    }

    public minoCumAddiction(raw: number = 10): void {
        //Increment minotaur cum intake count
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00340]++;
        //Fix if variables go out of range.
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 0) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] < 0) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] = 0;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 120) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;

        //Turn off withdrawal
        //if(Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 1) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] = 1;
        //Reset counter
        Flags.list[FlagEnum.TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM] = 0;
        //If highly addicted, rises slower
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 60) raw /= 2;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 80) raw /= 2;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 90) raw /= 2;
        //If in withdrawl, readdiction is potent!
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 3) raw += 10;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 2) raw += 5;
        raw = Math.round(raw * 100) / 100;
        //PUT SOME CAPS ON DAT' SHIT
        if (raw > 50) raw = 50;
        if (raw < -50) raw = -50;
        Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] += raw;
        //Recheck to make sure shit didn't break
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 120) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 0) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;

    }

    public minotaurAddicted(): boolean {
        return this.perks.has("MinotaurCumAddict") || Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] >= 1;
    }
    public minotaurNeed(): boolean {
        return Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 1;
    }
}

