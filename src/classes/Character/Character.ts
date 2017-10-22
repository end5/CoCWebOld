import CharacterDescription from './CharacterDescription';
import { CharacterType } from './CharacterType';
import Cock, { CockType } from '../Body/Cock';
import { Gender, SkinType } from '../Body/Creature';
import Creature from '../Body/Creature';
import { FaceType } from '../Body/Face';
import CockDescriptor from '../Descriptors/CockDescriptor';
import HeadDescriptor from '../Descriptors/HeadDescriptor';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import CharacterInventory from '../Inventory/CharacterInventory';
import { SaveInterface } from '../SaveInterface';
import UpdateInterface from '../UpdateInterface';
import Utils from '../Utilities/Utils';

export default abstract class Character extends Creature implements UpdateInterface, SaveInterface {

	public charType: CharacterType;
	public readonly inventory: CharacterInventory;
	public readonly desc: CharacterDescription;

	public constructor(type: CharacterType) {
		super();
		this.charType = type;
		this.inventory = new CharacterInventory();
		this.desc = new CharacterDescription(this);
	}

    saveKey: string = "Character";
    save(): object {
        let saveObject: object = {};
        saveObject["charType"] = this.charType;
        saveObject[this.inventory.saveKey] = this.inventory.save();
		saveObject[this.desc.saveKey] = this.desc.save();
		saveObject[super.saveKey] = super.save();
        return saveObject;
    }

    load(saveObject: object) {
        this.charType = saveObject["charType"];
        this.inventory.load(saveObject[this.inventory.saveKey]);
        this.desc.load(saveObject[this.desc.saveKey]);
        super.load(saveObject[super.saveKey]);
    }


	public update(hours: number) {
		this.pregnancy.update(hours);
		this.regeneration()
	}

	public get HP(): number {
		return this.stats.HP;
	}

	public gainHP(value: number, source: Character) {
		this.stats.HP += value;
	}

	public loseHP(value: number, source: Character) {
		if (source) {
			//Isabella gets mad
			if (this.charType == CharacterType.Isabella && source.charType == CharacterType.Player) {
				Flags.list[FlagEnum.ISABELLA_AFFECTION]--;
				//Keep in bounds
				if (Flags.list[FlagEnum.ISABELLA_AFFECTION] < 0)
					Flags.list[FlagEnum.ISABELLA_AFFECTION] = 0;
			}
		}
		//Interrupt gigaflare if necessary.
		if (this.statusAffects.has("Gigafire"))
			this.statusAffects.get("Gigafire").value1 += value;
		this.stats.HP -= value;
	}

	private regeneration() {
		let healingPercent = 0;
		if (this.perks.has("Regeneration")) healingPercent += 2;
		if (this.perks.has("Regeneration2")) healingPercent += 4;
		if (this.inventory.armor.displayName == "skimpy nurse's outfit") healingPercent += 2;
		if (this.inventory.armor.displayName == "goo armor") healingPercent += 3;
		if (this.perks.has("LustyRegeneration")) healingPercent += 2;
		if (healingPercent > 10) healingPercent = 10;
		this.stats.HP += Math.round(this.stats.maxHP() * healingPercent / 100);
	}

	public reduceDamage(damage: number): number {
		damage = damage - Utils.rand(this.stats.tou) - this.defense();
		//EZ MOAD half damage
		if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1)
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
			this.stats.lust += 2;
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
		if (this.statusAffects.has("UmasMassage")) {
			if (this.statusAffects.get("UmasMassage").value1 == UmasShop.MASSAGE_RELAXATION) {
				damage = Math.round(damage * this.statusAffects.get("UmasMassage").value2);
			}
		}

		// Uma's Accupuncture Bonuses
		let modArmorDef: number = 0;
		if (this.perks.has("ChiReflowDefense"))
			modArmorDef = ((this.defense() * UmasShop.NEEDLEWORK_DEFENSE_DEFENSE_MULTI) - this.defense());
		if (this.perks.has("ChiReflowAttack"))
			modArmorDef = ((this.defense() * UmasShop.NEEDLEWORK_ATTACK_DEFENSE_MULTI) - this.defense());
		damage -= modArmorDef;
		if (damage < 0) damage = 0;
		return damage;
	}

	/**
		* @return 0: did not avoid; 1-3: avoid with varying difference between
		* speeds (1: narrowly avoid, 3: deftly avoid)
		*/
	public speedDodge(enemy: Character): number {
		let diff: number = this.stats.spe - enemy.stats.spe;
		let rnd: number = Utils.rand((diff / 4) + 80);
		if (rnd <= 80) return 0;
		else if (diff < 8) return 1;
		else if (diff < 20) return 2;
		else return 3;
	}

	public defense(): number {
		let armorDef: number = this.inventory.armor.defense;
		//Blacksmith history!
		if (armorDef > 0 && this.perks.has("HistorySmith")) {
			armorDef = Math.round(armorDef * 1.1);
			armorDef += 1;
		}
		//Skin armor perk
		if (this.perks.has("ThickSkin")) {
			armorDef += 2;
			if (this.skinType > SkinType.PLAIN) armorDef += 1;
		}
		//If no skin armor perk scales rock
		else {
			if (this.skinType == SkinType.FUR) armorDef += 1;
			if (this.skinType == SkinType.SCALES) armorDef += 3;
		}
		//'Thick' dermis descriptor adds 1!
		if (this.skinAdj == "smooth") armorDef += 1;
		//Agility boosts armor ratings!
		if (this.perks.has("Agility")) {
			if (this.inventory.armor.armorClass == "Light")
				armorDef += Math.round(this.stats.spe / 8);
			else if (this.inventory.armor.armorClass == "Medium")
				armorDef += Math.round(this.stats.spe / 13);
		}
		//Berzerking removes armor
		if (this.statusAffects.has("Berzerking")) {
			armorDef = 0;
		}
		if (this.statusAffects.has("CoonWhip")) {
			armorDef -= this.statusAffects.get("CoonWhip").value1;
			if (armorDef < 0)
				armorDef = 0;
		}
		if (this.statusAffects.has("TailWhip")) {
			armorDef -= this.statusAffects.get("TailWhip").value1;
			if (armorDef < 0)
				armorDef = 0;
		}
		return armorDef;
	}

	public weaponAttack(): number {
		let attack: number = this.inventory.weapon.attack;
		if (this.perks.has("WeaponMastery") && this.inventory.weapon.perk == "Large" && this.stats.str > 60)
			attack *= 2;
		if (this.perks.has("LightningStrikes") && this.stats.spe >= 60 && this.inventory.weapon.perk != "Large") {
			attack += Math.round((this.stats.spe - 50) / 3);
		}
		if (this.statusAffects.has("Berzerking"))
			attack += 30;

		attack += this.statusAffects.get("ChargeWeapon").value1;


		return attack;
	}

	public regularAttackMod(): number {
		let value = this.physicalAttackMod();
		if (this.perks.has("ChiReflowAttack")) {
			value += 1 - UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;
		}
		if (this.perks.has("ChiReflowMagic")) {
			value += 1 - UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
		}
		// Uma's Massage Bonuses
		if (this.statusAffects.has("UmasMassage")) {
			if (this.statusAffects.get("UmasMassage").value1 == UmasShop.MASSAGE_POWER) {
				value += 1 - this.statusAffects.get("UmasMassage").value2;
			}
		}
		return value;
	}

	public physicalAttackMod(): number {
		let value = 1;
		if (this.perks.has("HistoryFighter"))
			value += 0.1;
		if (this.perks.has("Sadist")) {
			value += 0.2;
			// Add 3 before resistances
			this.stats.lustChange(this.stats.lust + 3, false);
		}
		return value;
	}

	public magicalAttackMod(): number {
		let mod = this.spellMod();
		if (this.perks.has("ChiReflowMagic"))
			mod += 1 - UmasShop.NEEDLEWORK_MAGIC_SPELL_MULTI;
		return mod;
	}

	public spellMod(): number {
		let mod: number = 1;
		if (this.perks.has("Archmage") && this.stats.int >= 75) mod += .5;
		if (this.perks.has("Channeling") && this.stats.int >= 60) mod += .5;
		if (this.perks.has("Mage") && this.stats.int >= 50) mod += .5;
		if (this.perks.has("Spellpower") && this.stats.int >= 50) mod += .5;
		if (this.perks.has("WizardsFocus")) {
			mod += this.perks.get("WizardsFocus").value1;
		}
		return mod;
	}

	public modCumMultiplier(delta: number): number {
		if (delta == 0) {
			return delta;
		}
		else if (delta > 0) {
			if (this.perks.has("MessyOrgasms")) {
				delta *= 1.5
			}
		}
		else if (delta < 0) {
			if (this.perks.has("MessyOrgasms")) {
				delta *= 0.5
			}
		}

		this.cumMultiplier += delta;
		return delta;
	}

	//Modify this.femininity!
	public modFem(goal: number, strength: number = 1): string {
		let output: string = "";
		let old: string = HeadDescriptor.describeFaceOther(this);
		let oldN: number = this.femininity;
		let Changed: boolean = false;
		//If already perfect!
		if (goal == this.femininity)
			return "";
		//If turning MANLYMAN
		if (goal < this.femininity && goal <= 50) {
			this.femininity -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.femininity < goal)
				this.femininity = goal;
			Changed = true;
		}
		//if turning GIRLGIRLY, like duh!
		if (goal > this.femininity && goal >= 50) {
			this.femininity += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.femininity > goal)
				this.femininity = goal;
			Changed = true;
		}
		//Fix if it went out of bounds!
		if (!this.perks.has("Androgyny"))
			this.fixFemininity();
		//Abort if nothing changed!
		if (!Changed)
			return "";
		//See if a change happened!
		if (old != HeadDescriptor.describeFaceOther(this)) {
			//Gain fem?
			if (goal > oldN)
				output = "\n\n<b>Your facial features soften as your body becomes more feminine. (+" + strength + ")</b>";
			if (goal < oldN)
				output = "\n\n<b>Your facial features harden as your body becomes more masculine. (+" + strength + ")</b>";
		}
		//Barely noticable change!
		else {
			if (goal > oldN)
				output = "\n\nThere's a tingling in your " + HeadDescriptor.nounFace(this.upperBody.head.face) + " as it changes imperceptibly towards being more feminine. (+" + strength + ")";
			else if (goal < oldN)
				output = "\n\nThere's a tingling in your " + HeadDescriptor.nounFace(this.upperBody.head.face) + " as it changes imperciptibly towards being more masculine. (+" + strength + ")";
		}
		return output;
	}

	public modThickness(goal: number, strength: number = 1): string {
		if (goal == this.thickness)
			return "";
		//Lose weight fatty!
		if (goal < this.thickness && goal < 50) {
			this.thickness -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.thickness < goal)
				this.thickness = goal;
		}
		//Sup tubby!
		if (goal > this.thickness && goal > 50) {
			this.thickness += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.thickness > goal)
				this.thickness = goal;
		}

		//DIsplay 'U GOT FAT'
		if (goal >= this.thickness && goal >= 50)
			return "\n\nYour center of balance changes a little bit as your body noticeably widens. (+" + strength + " body thickness)";
		//GET THIN BITCH
		else if (goal <= this.thickness && goal <= 50)
			return "\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+" + strength + " thin)";
		return "";
	}

	public modTone(goal: number, strength: number = 1): string {
		if (goal == this.tone)
			return "";
		//Lose muscle visibility!
		if (goal < this.tone && goal < 50) {
			this.tone -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.tone < goal) {
				this.tone = goal;
				return "\n\nYou've lost some tone, but can't lose any more this way. (-" + strength + " muscle tone)";
			}
		}
		//MOAR hulkness
		if (goal > this.tone && goal > 50) {
			this.tone += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.tone > goal) {
				this.tone = goal;
				return "\n\nYou've gained some muscle tone, but can't gain any more this way. (+" + strength + " muscle tone)";
			}
		}
		//DIsplay BITCH I WORK OUT
		if (goal >= this.tone && goal > 50)
			return "\n\nYour body feels a little more solid as you move, and your muscles look slightly more visible. (+" + strength + " muscle tone)";
		//Display DERP I HAVE GIRL MUSCLES
		else if (goal <= this.tone && goal < 50)
			return "\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-" + strength + " muscle tone)";
		return "";
	}

	//Run this every hour to 'fix' this.femininity.
	public fixFemininity(): string {
		let output: string = "";
		//Genderless/herms share the same bounds
		if (this.gender == Gender.NONE || this.gender == Gender.HERM) {
			if (this.femininity < 20) {
				output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
				if (this.hasBeard()) {
					output += "  As if that wasn't bad enough, your " + this.beard() + " falls out too!";
					this.beardLength = 0;
					this.beardStyle = 0;
				}
				output += "</b>\n";
				this.femininity = 20;
			}
			else if (this.femininity > 85) {
				output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
				this.femininity = 85;
			}
		}
		//GURLS!
		else if (this.gender == 2) {
			if (this.femininity < 30) {
				output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
				if (this.hasBeard()) {
					output += "  As if that wasn't bad enough, your " + this.beard() + " falls out too!";
					this.beardLength = 0;
					this.beardStyle = 0;
				}
				output += "</b>\n";
				this.femininity = 30;
			}
		}
		//BOIZ!
		else if (this.gender == 1) {
			if (this.femininity > 70) {
				output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
				this.femininity = 70;
			}
			if (this.femininity > 40 && this.hasBeard()) {
				output += "\n<b>Your beard falls out, leaving you with " + HeadDescriptor.describeFace(this) + ".</b>\n";
				this.beardLength = 0;
				this.beardStyle = 0;
			}
		}
		if (this.gender != 1 && this.hasBeard()) {
			output += "\n<b>Your beard falls out, leaving you with " + HeadDescriptor.describeFace(this) + ".</b>\n";
			this.beardLength = 0;
			this.beardStyle = 0;
		}
		return output;
	}

	public hasBeard(): boolean {
		return this.beardLength > 0;
	}

	public beard(): string {
		if (this.hasBeard())
			return "beard";
		else {
			//CoC_Settings.error("");
			return "ERROR: NO BEARD! <b>YOU ARE NOT A VIKING AND SHOULD TELL FEN IMMEDIATELY.</b>";
		}
	}

	public viridianChange(): boolean {
		let cockSpot = this.lowerBody.cockSpot;
		for (let index = 0; index < cockSpot.count(); index++)
			if (cockSpot.get(index).sock == "amaranthine" && cockSpot.get(index).cockType != CockType.DISPLACER)
				return true;
		return false;
	}

	public orgasm(): void {
        this.stats.lustChange(0, false);
        this.hoursSinceCum = 0;
        let gildedCockSocks: number = this.lowerBody.cockSpot.cockSocks("gilded").length;
        if (gildedCockSocks > 0) {
            let randomCock: Cock = Utils.randomChoice(this.lowerBody.cockSpot.listLargestCockArea);
            let bonusGems: number = Utils.rand(randomCock.cockThickness) + gildedCockSocks;
            MainScreen.text("\n\nFeeling some minor discomfort in your " + CockDescriptor.describeCock(this, randomCock) + " you slip it out of your [armor] and examine it. <b>With a little exploratory rubbing and massaging, you manage to squeeze out " + bonusGems + " gems from its cum slit.</b>\n\n");
            this.inventory.gems += bonusGems;
        }
	}
	
	public milked(): void {
        this.statusAffects.has("LactationReduction")
        if (this.statusAffects.has("LactationReduction"))
            this.statusAffects.get("LactationReduction").value1 = 0;
        if (this.statusAffects.has("LactationReduc0"))
            this.statusAffects.remove("LactationReduc0");
        if (this.statusAffects.has("LactationReduc1"))
            this.statusAffects.remove("LactationReduc1");
        if (this.statusAffects.has("LactationReduc2"))
            this.statusAffects.remove("LactationReduc2");
        if (this.statusAffects.has("LactationReduc3"))
            this.statusAffects.remove("LactationReduc3");
        if (this.statusAffects.has("Feeder")) {
            //You've now been milked, reset the timer for that
            this.statusAffects.get("Feeder").value1 = 1;
            this.statusAffects.get("Feeder").value2 = 0;
        }
	}
	

}
