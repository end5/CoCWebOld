import Character from "./Character"
import Utils from "./Utilities/Utils";
import StatusAffect from "./StatusAffect";
import { SkinType } from "./Creature";
import ItemType from "./Items/ItemType";
import InventoryManager from "./Items/InventoryManager";

export default class Player extends Character {

    public constructor() {
        super();
    }

    //Autosave
    public slotName: string = "VOID";
    public autoSave: boolean = false;

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

    public inventoryManager: InventoryManager;


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
            this.stats.lus = 2;
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
        cumMultiplier += delta;
        return delta;
    }

    // Attempts to put the player in heat (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if she is already pregnant or is a he.
    // 
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the 
    // duration and intensity. Defaults to 1.
    public goIntoHeat(output: boolean, intensity: number = 1): boolean {
        if (!this.lowerBody.vaginaSpot.hasVagina() || pregnancyIncubation != 0) {
            // No vagina or already pregnant, can't go into heat.
            return false;
        }

        //Already in heat, intensify further.
        if (this.inHeat) {
            if (output) {
                MainScreen.text("\n\nYour mind clouds as your " + vaginaDescript(0) + " moistens.  Despite already being in heat, the desire to copulate constantly grows even larger.", false);
            }
            let temp: number = this.statusAffects.has(StatusAffects.Heat);
            statusAffect(temp).value1 += 5 * intensity;
            statusAffect(temp).value2 += 5 * intensity;
            statusAffect(temp).value3 += 48 * intensity;
            game.dynStats("this.stats.lib", 5 * intensity, "resisted", false, "noBimbo", true);
        }
        //Go into heat.  Heats v1 is bonus fertility, v2 is bonus this.stats.libido, v3 is hours till it's gone
        else {
            if (output) {
                MainScreen.text("\n\nYour mind clouds as your " + vaginaDescript(0) + " moistens.  Your hands begin stroking your body from top to bottom, your sensitive skin burning with desire.  Fantasies about bending over and presenting your needy pussy to a male overwhelm you as <b>you realize you have gone into heat!</b>", false);
            }
            this.statusAffects.add(new StatusAffect("Heat", 10 * intensity, 15 * intensity, 48 * intensity, 0));
            game.dynStats("this.stats.lib", 15 * intensity, "resisted", false, "noBimbo", true);
        }
        return true;
    }

    // Attempts to put the player in rut (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if he is a she.
    // 
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the 
    // duration and intensity. Defaults to 1.
    public goIntoRut(output: boolean, intensity: number = 1): boolean {
        if (!hasCock()) {
            // No cocks, can't go into rut.
            return false;
        }

        //Has rut, intensify it!
        if (this.inRut) {
            if (output) {
                MainScreen.text("\n\nYour " + cockDescript(0) + " throbs and dribbles as your desire to mate intensifies.  You know that <b>you've sunken deeper into rut</b>, but all that really matters is unloading into a cum-hungry cunt.", false);
            }

            statusAffects.get("Rut").value1 = 100 * intensity;
            statusAffects.get("Rut").value2 = 5 * intensity;
            statusAffects.get("Rut").value3 = 48 * intensity;
            game.dynStats("this.stats.lib", 5 * intensity, "resisted", false, "noBimbo", true);
        }
        else {
            if (output) {
                MainScreen.text("\n\nYou stand up a bit straighter and look around, sniffing the air and searching for a mate.  Wait, what!?  It's hard to shake the thought from your head - you really could use a nice fertile hole to impregnate.  You slap your forehead and realize <b>you've gone into rut</b>!", false);
            }

            //v1 - bonus cum production
            //v2 - bonus this.stats.libido
            //v3 - time remaining!
            this.statusAffects.add(new StatusAffect("Rut", 150 * intensity, 5 * intensity, 100 * intensity, 0));
            game.dynStats("this.stats.lib", 5 * intensity, "resisted", false, "noBimbo", true);
        }

        return true;
    }
}

