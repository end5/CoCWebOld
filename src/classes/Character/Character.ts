import CharacterDescription from './CharacterDescription';
import { CharacterType } from './CharacterType';
import Cock, { CockType } from '../Body/Cock';
import { Gender, SkinType } from '../Body/Creature';
import Creature from '../Body/Creature';
import { FaceType } from '../Body/Face';
import CombatContainer from '../Combat/CombatContainer';
import CockDescriptor from '../Descriptors/CockDescriptor';
import FaceDescriptor from '../Descriptors/FaceDescriptor';
import HeadDescriptor from '../Descriptors/HeadDescriptor';
import DisplayText from '../display/DisplayText';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import CharacterInventory from '../Inventory/CharacterInventory';
import Armor from '../Items/Armors/Armor';
import Weapon from '../Items/Weapons/Weapon';
import { SerializeInterface } from '../SerializeInterface';
import UpdateInterface from '../UpdateInterface';
import Utils from '../Utilities/Utils';

export default abstract class Character extends Creature implements UpdateInterface, SerializeInterface {
	public charType: CharacterType;
	public readonly inventory: CharacterInventory;
	public readonly desc: CharacterDescription;
	protected combatContainer: CombatContainer;
	public get combat(): CombatContainer {
		return this.combatContainer;
	}

	public constructor(type: CharacterType, defaultWeapon: Weapon, defaultArmor: Armor) {
		super();
		this.charType = type;
		this.inventory = new CharacterInventory(defaultWeapon, defaultArmor);
		this.desc = new CharacterDescription(this);
	}

    serialize(): string {
        let saveObject: object = {};
        saveObject["charType"] = this.charType;
        saveObject["inventory"] = this.inventory.serialize();
		saveObject["desc"] = this.desc.serialize();
		saveObject["Creature"] = super.serialize();
        return JSON.stringify(saveObject);
    }

    deserialize(saveObject: object) {
        this.charType = saveObject["charType"];
        this.inventory.deserialize(saveObject["inventory"]);
        this.desc.deserialize(saveObject["desc"]);
        super.deserialize(saveObject["Creature"]);
    }


	public update(hours: number) {
		this.pregnancy.update(hours);
		this.regeneration();
	}


	private regeneration() {
		let healingPercent = 0;
		if (this.perks.has(PerkType.Regeneration)) healingPercent += 2;
		if (this.perks.has(PerkType.Regeneration2)) healingPercent += 4;
		if (this.inventory.armorSlot.equipment.displayName == "skimpy nurse's outfit") healingPercent += 2;
		if (this.inventory.armorSlot.equipment.displayName == "goo armor") healingPercent += 3;
		if (this.perks.has(PerkType.LustyRegeneration)) healingPercent += 2;
		if (healingPercent > 10) healingPercent = 10;
		this.stats.HP += Math.round(this.stats.maxHP() * healingPercent / 100);
	}

	public reduceDamage(damage: number): number {
		damage = damage - Utils.rand(this.stats.tou) - this.defense();
		//EZ MOAD half damage
		if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1)
			damage /= 2;
		if (this.statusAffects.has(StatusAffectType.Shielding)) {
			damage -= 30;
			if (damage < 1)
				damage = 1;
		}
		//Black cat beer = 25% reduction!
		if (this.statusAffects.get(StatusAffectType.BlackCatBeer).value1 > 0)
			damage = Math.round(damage * .75);

		//Take damage you masochist!
		if (this.perks.has(PerkType.Masochist) && this.stats.lib >= 60) {
			damage = Math.round(damage * .7);
			this.stats.lust += 2;
			//Dont let it round too far down!
			if (damage < 1)
				damage = 1;
		}
		if (this.perks.has(PerkType.ImmovableObject) && this.stats.tou >= 75) {
			damage = Math.round(damage * .8);
			if (damage < 1)
				damage = 1;
		}

		// Uma's Massage bonuses
		if (this.statusAffects.has(StatusAffectType.UmasMassage)) {
			if (this.statusAffects.get(StatusAffectType.UmasMassage).value1 == UmasShop.MASSAGE_RELAXATION) {
				damage = Math.round(damage * this.statusAffects.get(StatusAffectType.UmasMassage).value2);
			}
		}

		// Uma's Accupuncture Bonuses
		let modArmorDef: number = 0;
		if (this.perks.has(PerkType.ChiReflowDefense))
			modArmorDef = ((this.defense() * UmasShop.NEEDLEWORK_DEFENSE_DEFENSE_MULTI) - this.defense());
		if (this.perks.has(PerkType.ChiReflowAttack))
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
		let armorDef: number = this.inventory.armorSlot.equipment.defense;
		//Blacksmith history!
		if (armorDef > 0 && this.perks.has(PerkType.HistorySmith)) {
			armorDef = Math.round(armorDef * 1.1);
			armorDef += 1;
		}
		//Skin armor perk
		if (this.perks.has(PerkType.ThickSkin)) {
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
		if (this.perks.has(PerkType.Agility)) {
			if (this.inventory.armorSlot.equipment.armorClass == "Light")
				armorDef += Math.round(this.stats.spe / 8);
			else if (this.inventory.armorSlot.equipment.armorClass == "Medium")
				armorDef += Math.round(this.stats.spe / 13);
		}
		//Berzerking removes armor
		if (this.statusAffects.has(StatusAffectType.Berzerking)) {
			armorDef = 0;
		}
		if (this.statusAffects.has(StatusAffectType.CoonWhip)) {
			armorDef -= this.statusAffects.get(StatusAffectType.CoonWhip).value1;
			if (armorDef < 0)
				armorDef = 0;
		}
		if (this.statusAffects.has(StatusAffectType.TailWhip)) {
			armorDef -= this.statusAffects.get(StatusAffectType.TailWhip).value1;
			if (armorDef < 0)
				armorDef = 0;
		}
		return armorDef;
	}

	public weaponAttack(): number {
		let attack: number = this.inventory.weaponSlot.equipment.attack;
		if (this.perks.has(PerkType.WeaponMastery) && this.inventory.weaponSlot.equipment.perk == "Large" && this.stats.str > 60)
			attack *= 2;
		if (this.perks.has(PerkType.LightningStrikes) && this.stats.spe >= 60 && this.inventory.weaponSlot.equipment.perk != "Large") {
			attack += Math.round((this.stats.spe - 50) / 3);
		}
		if (this.statusAffects.has(StatusAffectType.Berzerking))
			attack += 30;

		attack += this.statusAffects.get(StatusAffectType.ChargeWeapon).value1;


		return attack;
	}

	public regularAttackMod(): number {
		let value = this.physicalAttackMod();
		if (this.perks.has(PerkType.ChiReflowAttack)) {
			value += 1 - UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;
		}
		if (this.perks.has(PerkType.ChiReflowMagic)) {
			value += 1 - UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
		}
		// Uma's Massage Bonuses
		if (this.statusAffects.has(StatusAffectType.UmasMassage)) {
			if (this.statusAffects.get(StatusAffectType.UmasMassage).value1 == UmasShop.MASSAGE_POWER) {
				value += 1 - this.statusAffects.get(StatusAffectType.UmasMassage).value2;
			}
		}
		return value;
	}

	public physicalAttackMod(): number {
		let value = 1;
		if (this.perks.has(PerkType.HistoryFighter))
			value += 0.1;
		if (this.perks.has(PerkType.Sadist)) {
			value += 0.2;
			// Add 3 before resistances
			this.stats.lustNoResist += 3;
		}
		return value;
	}

	public magicalAttackMod(): number {
		let mod = this.spellMod();
		if (this.perks.has(PerkType.ChiReflowMagic))
			mod += 1 - UmasShop.NEEDLEWORK_MAGIC_SPELL_MULTI;
		return mod;
	}

	public spellMod(): number {
		let mod: number = 1;
		if (this.perks.has(PerkType.Archmage) && this.stats.int >= 75) mod += .5;
		if (this.perks.has(PerkType.Channeling) && this.stats.int >= 60) mod += .5;
		if (this.perks.has(PerkType.Mage) && this.stats.int >= 50) mod += .5;
		if (this.perks.has(PerkType.Spellpower) && this.stats.int >= 50) mod += .5;
		if (this.perks.has(PerkType.WizardsFocus)) {
			mod += this.perks.get(PerkType.WizardsFocus).value1;
		}
		return mod;
	}

	public modCumMultiplier(delta: number): number {
		if (delta == 0) {
			return delta;
		}
		else if (delta > 0) {
			if (this.perks.has(PerkType.MessyOrgasms)) {
				delta *= 1.5
			}
		}
		else if (delta < 0) {
			if (this.perks.has(PerkType.MessyOrgasms)) {
				delta *= 0.5
			}
		}

		this.cumMultiplier += delta;
		return delta;
	}




	public viridianChange(): boolean {
		let cockSpot = this.lowerBody.cockSpot;
		for (let index = 0; index < cockSpot.count(); index++)
			if (cockSpot.get(index).sock == "amaranthine" && cockSpot.get(index).cockType != CockType.DISPLACER)
				return true;
		return false;
	}

	public orgasm(): void {
        this.stats.lustNoResist = 0;
        this.hoursSinceCum = 0;
        let gildedCockSocks: number = this.lowerBody.cockSpot.cockSocks("gilded").length;
        if (gildedCockSocks > 0) {
            let randomCock: Cock = Utils.randomChoice(this.lowerBody.cockSpot.listLargestCockArea);
            let bonusGems: number = Utils.rand(randomCock.cockThickness) + gildedCockSocks;
            DisplayText.text("\n\nFeeling some minor discomfort in your " + CockDescriptor.describeCock(this, randomCock) + " you slip it out of your [armor] and examine it. <b>With a little exploratory rubbing and massaging, you manage to squeeze out " + bonusGems + " gems from its cum slit.</b>\n\n");
            this.inventory.gems += bonusGems;
        }
	}
	
	public milked(): void {
        this.statusAffects.has(StatusAffectType.LactationReduction)
        if (this.statusAffects.has(StatusAffectType.LactationReduction))
            this.statusAffects.get(StatusAffectType.LactationReduction).value1 = 0;
        if (this.statusAffects.has(StatusAffectType.LactationReduc0))
            this.statusAffects.remove(StatusAffectType.LactationReduc0);
        if (this.statusAffects.has(StatusAffectType.LactationReduc1))
            this.statusAffects.remove(StatusAffectType.LactationReduc1);
        if (this.statusAffects.has(StatusAffectType.LactationReduc2))
            this.statusAffects.remove(StatusAffectType.LactationReduc2);
        if (this.statusAffects.has(StatusAffectType.LactationReduc3))
            this.statusAffects.remove(StatusAffectType.LactationReduc3);
        if (this.statusAffects.has(StatusAffectType.Feeder)) {
            //You've now been milked, reset the timer for that
            this.statusAffects.get(StatusAffectType.Feeder).value1 = 1;
            this.statusAffects.get(StatusAffectType.Feeder).value2 = 0;
        }
	}
	

}
