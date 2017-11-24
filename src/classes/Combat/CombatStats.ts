import CharacterHolder from './CharacterHolder';
import { SkinType } from '../Body/Creature';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Utils from '../Utilities/Utils';

export default class CombatStats extends CharacterHolder {
	private defenseMod: number = 0;

	public constructor(character: Character, bonusHP: number = 0) {
		super(character);
		this.char.stats.HP += bonusHP;
		this.char.stats.bonusHP = bonusHP;
	}

	public HPRatio(): number {
		return this.char.stats.HP / this.char.stats.maxHP();
	}

	public gainHP(value: number, source: Character): number {
		//Increase by 20%!
		if (this.char.perks.has(PerkType.HistoryHealer))
			value *= 1.2;

		const oldHP = this.char.stats.HP;
		this.char.stats.HP += value;
		return oldHP - this.char.stats.HP;
	}

	public loseHP(value: number, source: Character): number {
		if (source) {
			//Isabella gets mad
			if (this.char.charType == CharacterType.Isabella && source.charType == CharacterType.Player) {
				Flags.list[FlagEnum.ISABELLA_AFFECTION]--;
				//Keep in bounds
				if (Flags.list[FlagEnum.ISABELLA_AFFECTION] < 0)
					Flags.list[FlagEnum.ISABELLA_AFFECTION] = 0;
			}
			if (source.perks.has(PerkType.Precision) && source.stats.int >= 25) {
				if (this.defense() <= 10) this.defenseMod = -this.defense();
				else this.defenseMod = -10;
			}
			value = this.reduceDamage(value);
		}
		if (this.char.charType == CharacterType.Player && Flags.list[FlagEnum.MINOTAUR_CUM_REALLY_ADDICTED_STATE] > 0) {
			this.char.stats.lust += value / 2;
		}
		//Interrupt gigaflare if necessary.
		if (this.char.statusAffects.has(StatusAffectType.Gigafire))
			this.char.statusAffects.get(StatusAffectType.Gigafire).value1 += value;
		const oldHP = this.char.stats.HP;
		this.char.stats.HP -= value;
		return oldHP - this.char.stats.HP;
	}

	private reduceDamage(damage: number): number {
		damage = damage - Utils.rand(this.char.stats.tou) - this.defense();
		//EZ MOAD half damage
		if (Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1)
			damage /= 2;
		if (this.char.statusAffects.has(StatusAffectType.Shielding)) {
			damage -= 30;
			if (damage < 1)
				damage = 1;
		}
		//Black cat beer = 25% reduction!
		if (this.char.statusAffects.get(StatusAffectType.BlackCatBeer).value1 > 0)
			damage = Math.round(damage * .75);

		//Take damage you masochist!
		if (this.char.perks.has(PerkType.Masochist) && this.char.stats.lib >= 60) {
			damage = Math.round(damage * .7);
			this.char.stats.lust += 2;
			//Dont let it round too far down!
			if (damage < 1)
				damage = 1;
		}
		if (this.char.perks.has(PerkType.ImmovableObject) && this.char.stats.tou >= 75) {
			damage = Math.round(damage * .8);
			if (damage < 1)
				damage = 1;
		}

		// Uma's Massage bonuses
		if (this.char.statusAffects.has(StatusAffectType.UmasMassage)) {
			if (this.char.statusAffects.get(StatusAffectType.UmasMassage).value1 == UmasShop.MASSAGE_RELAXATION) {
				damage = Math.round(damage * this.char.statusAffects.get(StatusAffectType.UmasMassage).value2);
			}
		}

		// Uma's Accupuncture Bonuses
		let modArmorDef: number = 0;
		if (this.char.perks.has(PerkType.ChiReflowDefense))
			modArmorDef = ((this.defense() * UmasShop.NEEDLEWORK_DEFENSE_DEFENSE_MULTI) - this.defense());
		if (this.char.perks.has(PerkType.ChiReflowAttack))
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
		let diff: number = this.char.stats.spe - enemy.stats.spe;
		let rnd: number = Utils.rand((diff / 4) + 80);
		if (rnd <= 80) return 0;
		else if (diff < 8) return 1;
		else if (diff < 20) return 2;
		else return 3;
	}

	public defense(): number {
		let armorDef: number = this.char.inventory.armorSlot.equipment.defense;
		//Blacksmith history!
		if (armorDef > 0 && this.char.perks.has(PerkType.HistorySmith)) {
			armorDef = Math.round(armorDef * 1.1);
			armorDef += 1;
		}
		//Skin armor perk
		if (this.char.perks.has(PerkType.ThickSkin)) {
			armorDef += 2;
			if (this.char.skinType > SkinType.PLAIN) armorDef += 1;
		}
		//If no skin armor perk scales rock
		else {
			if (this.char.skinType == SkinType.FUR) armorDef += 1;
			if (this.char.skinType == SkinType.SCALES) armorDef += 3;
		}
		//'Thick' dermis descriptor adds 1!
		if (this.char.skinAdj == "smooth") armorDef += 1;
		//Agility boosts armor ratings!
		if (this.char.perks.has(PerkType.Agility)) {
			if (this.char.inventory.armorSlot.equipment.armorClass == "Light")
				armorDef += Math.round(this.char.stats.spe / 8);
			else if (this.char.inventory.armorSlot.equipment.armorClass == "Medium")
				armorDef += Math.round(this.char.stats.spe / 13);
		}
		//Berzerking removes armor
		if (this.char.statusAffects.has(StatusAffectType.Berzerking)) {
			armorDef = 0;
		}
		if (this.char.statusAffects.has(StatusAffectType.CoonWhip)) {
			armorDef -= this.char.statusAffects.get(StatusAffectType.CoonWhip).value1;
			if (armorDef < 0)
				armorDef = 0;
		}
		if (this.char.statusAffects.has(StatusAffectType.TailWhip)) {
			armorDef -= this.char.statusAffects.get(StatusAffectType.TailWhip).value1;
			if (armorDef < 0)
				armorDef = 0;
		}
		return armorDef + this.defenseMod;
	}

	public weaponAttack(): number {
		let attack: number = this.char.inventory.weaponSlot.equipment.attack;
		if (this.char.perks.has(PerkType.WeaponMastery) && this.char.inventory.weaponSlot.equipment.perk == "Large" && this.char.stats.str > 60)
			attack *= 2;
		if (this.char.perks.has(PerkType.LightningStrikes) && this.char.stats.spe >= 60 && this.char.inventory.weaponSlot.equipment.perk != "Large") {
			attack += Math.round((this.char.stats.spe - 50) / 3);
		}
		if (this.char.statusAffects.has(StatusAffectType.Berzerking))
			attack += 30;

		attack += this.char.statusAffects.get(StatusAffectType.ChargeWeapon).value1;
		return attack;
	}

	public regularAttackMod(): number {
		let value = this.physicalAttackMod();
		if (this.char.perks.has(PerkType.ChiReflowAttack)) {
			value += 1 - UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;
		}
		if (this.char.perks.has(PerkType.ChiReflowMagic)) {
			value += 1 - UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
		}
		// Uma's Massage Bonuses
		if (this.char.statusAffects.has(StatusAffectType.UmasMassage)) {
			if (this.char.statusAffects.get(StatusAffectType.UmasMassage).value1 == UmasShop.MASSAGE_POWER) {
				value += 1 - this.char.statusAffects.get(StatusAffectType.UmasMassage).value2;
			}
		}
		return value;
	}

	public physicalAttackMod(): number {
		let value = 1;
		if (this.char.perks.has(PerkType.HistoryFighter))
			value += 0.1;
		if (this.char.perks.has(PerkType.Sadist)) {
			value += 0.2;
			// Add 3 before resistances
			this.char.stats.lustNoResist += 3;
		}
		return value;
	}

	public magicalAttackMod(): number {
		let mod = this.spellMod();
		if (this.char.perks.has(PerkType.ChiReflowMagic))
			mod += 1 - UmasShop.NEEDLEWORK_MAGIC_SPELL_MULTI;
		return mod;
	}

	public spellMod(): number {
		let mod: number = 1;
		if (this.char.perks.has(PerkType.Archmage) && this.char.stats.int >= 75) mod += .5;
		if (this.char.perks.has(PerkType.Channeling) && this.char.stats.int >= 60) mod += .5;
		if (this.char.perks.has(PerkType.Mage) && this.char.stats.int >= 50) mod += .5;
		if (this.char.perks.has(PerkType.Spellpower) && this.char.stats.int >= 50) mod += .5;
		if (this.char.perks.has(PerkType.WizardsFocus)) {
			mod += this.char.perks.get(PerkType.WizardsFocus).value1;
		}
		return mod;
	}
}