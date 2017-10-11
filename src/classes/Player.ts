﻿import { ButtLooseness, ButtWetness } from './Body/Butt';
import { SkinType } from './Body/Creature';
import { FaceType, TongueType } from './Body/Face';
import { HornType } from './Body/Head';
import { TailType } from './Body/LowerBody';
import { WingType } from './Body/UpperBody';
import Character from './Character';
import StatusAffect from './Effects/StatusAffect';
import Flags, { FlagEnum } from './Game/Flags';
import Item from './Items/Item';
import KeyItem from './Items/KeyItem';
import Utils from './Utilities/Utils';

export default class Player extends Character {
    public keyItems: KeyItem[];

    public constructor() {
        super();
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
        this.stats.gems = Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS];
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

