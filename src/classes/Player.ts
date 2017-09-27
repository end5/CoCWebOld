import Character from "./Character"
import Utils from "./Utilities/Utils";
import { SkinType } from "./Body/Body";
import Item from "./Items/Item";
import Flags, { FlagEnum } from "./Game/Flags";
import { FaceType, TongueType } from "./Body/Face";
import { TailType } from "./Body/LowerBody";
import { ButtLooseness, ButtWetness } from "./Body/Butt";
import { HornType } from "./Body/Head";
import { WingType } from "./Body/UpperBody";
import KeyItem from "./Items/KeyItem";
import StatusAffect from "./Effects/StatusAffect";

export default class Player extends Character {
    level: number;
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
        this.stats.XP = Flags.get(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP);
        this.stats.level = 1;
        this.stats.HP = this.maxHP();
        this.stats.gems = Flags.get(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS);
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

    //Player pregnancy variables and functions
    public pregnancyUpdate(): boolean {
        return game.updatePregnancy(); //Returns true if we need to make sure pregnancy texts aren't hidden
    }

    // Inventory
    public keyItems: KeyItem[];

    public hasKeyItem(objectKey: string): boolean {
        for (let index = 0; index < this.keyItems.length; index++) {
            if (this.keyItems[index].objectKey == name)
                return true;
        }
        return false;
    }

    public reduceDamage(damage: number): number {
        damage = damage - Utils.rand(this.stats.tou) - this.armorDef;
        //EZ MOAD half damage
        if (Flags.get[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1)
            damage /= 2;
        if (this.statusAffects.has("Shielding")) {
            damage -= 30;
            if (damage < 1)
                damage = 1;
        }
        //Black cat beer = 25% reduction!
        if (this.statusAffects.get("BlackCatBeer").value1 > 0)
            damage = Math.round(damage * .75);

        //Take damage you masochist!
        if (this.perks.has("Masochist") && this.stats.lib >= 60) {
            damage = Math.round(damage * .7);
            this.stats.lust = 2;
            //Dont let it round too far down!
            if (damage < 1)
                damage = 1;
        }
        if (this.perks.has("ImmovableObject") && this.stats.tou >= 75) {
            damage = Math.round(damage * .8);
            if (damage < 1)
                damage = 1;
        }

        // Uma's Massage bonuses
        let statIndex: number = this.statusAffects.has(StatusAffects.UmasMassage);
        if (statIndex >= 0) {
            if (statusAffect(statIndex).value1 == UmasShop.MASSAGE_RELAXATION) {
                damage = Math.round(damage * statusAffect(statIndex).value2);
            }
        }

        // Uma's Accupuncture Bonuses
        let modArmorDef: number = 0;
        if (this.perks.has("ChiReflowDefense"))
            modArmorDef = ((this.armorDef * UmasShop.NEEDLEWORK_DEFENSE_DEFENSE_MULTI) - this.armorDef);
        if (this.perks.has("ChiReflowAttack"))
            modArmorDef = ((this.armorDef * UmasShop.NEEDLEWORK_ATTACK_DEFENSE_MULTI) - this.armorDef);
        damage -= modArmorDef;
        if (damage < 0) damage = 0;
        return damage;
    }

    public takeDamage(damage: number): number {
        //Round
        damage = Math.round(damage);
        // we return "1 damage received" if it is in (0..1) but deduce no HP
        let returnDamage: number = (damage > 0 && damage < 1) ? 1 : damage;
        if (damage > 0) {
            this.stats.HP -= damage;
            game.mainView.statsView.showStatDown('hp');
            if (Flags.get[FlagEnum.MINOTAUR_CUM_REALLY_ADDICTED_STATE] > 0) {
                this.stats.lus = damage / 2;
            }
            //Prevent negatives
            if (this.stats.HP <= 0) {
                this.stats.HP = 0;
                //This call did nothing. There is no event 5010: if (game.inCombat) game.doNext(5010);
            }
        }
        return returnDamage;
    }

	/**
		* @return 0: did not avoid; 1-3: avoid with varying difference between
		* speeds (1: narrowly avoid, 3: deftly avoid)
		*/
    public speedDodge(monster: Monster): number {
        let diff: number = this.stats.spe - monster.spe;
        let rnd: number = Utils.rand((diff / 4) + 80);
        if (rnd <= 80) return 0;
        else if (diff < 8) return 1;
        else if (diff < 20) return 2;
        else return 3;
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
            Flags.get[FlagEnum.UNKNOWN_FLAG_NUMBER_00228] += 3 + Utils.rand(33);
            Flags.get[FlagEnum.UNKNOWN_FLAG_NUMBER_00229] = 1;
        }

    }

    public minoCumAddiction(raw: number = 10): void {
        //Increment minotaur cum intake count
        Flags.get[FlagEnum.UNKNOWN_FLAG_NUMBER_00340]++;
        //Fix if variables go out of range.
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 0) Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] < 0) Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] = 0;
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 120) Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;

        //Turn off withdrawal
        //if(Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 1) Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] = 1;
        //Reset counter
        Flags.get[FlagEnum.TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM] = 0;
        //If highly addicted, rises slower
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 60) raw /= 2;
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 80) raw /= 2;
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 90) raw /= 2;
        //If in withdrawl, readdiction is potent!
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 3) raw += 10;
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 2) raw += 5;
        raw = Math.round(raw * 100) / 100;
        //PUT SOME CAPS ON DAT' SHIT
        if (raw > 50) raw = 50;
        if (raw < -50) raw = -50;
        Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] += raw;
        //Recheck to make sure shit didn't break
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 120) Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;
        if (Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 0) Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;

    }

    public hasSpells(): boolean {
        return spellCount() > 0;
    }

    public spellCount(): number {
        return ["KnowsArouse", "KnowsHeal", "KnowsMight", "KnowsCharge", "KnowsBlind", "KnowsWhitefire"]
            .filter((name: string) => {
                return this.statusAffects.has(name);
            })
            .length;
    }

    public minotaurAddicted(): boolean {
        return this.perks.has("MinotaurCumAddict") || Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] >= 1;
    }
    public minotaurNeed(): boolean {
        return Flags.get[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 1;
    }

    public modCumMultiplier(delta: number): number {
        console.trace("modCumMultiplier called with: " + delta);

        if (delta == 0) {
            console.trace("Whoops! modCumMuliplier called with 0... aborting...");
            return delta;
        }
        else if (delta > 0) {
            console.trace("and increasing");
            if (this.perks.has("MessyOrgasms")) {
                console.trace("and MessyOrgasms found");
                delta *= 1.5
            }
        }
        else if (delta < 0) {
            console.trace("and decreasing");
            if (this.perks.has("MessyOrgasms")) {
                console.trace("and MessyOrgasms found");
                delta *= 0.5
            }
        }

        console.trace("and modifying by " + delta);
        this.cumMultiplier += delta;
        return delta;
    }
}

