export default class stupidweponarmor {

    private _armor: Armor = ArmorLib.COMFORTABLE_UNDERCLOTHES;
    private _modArmorName: string = "";

    public get modArmorName(): string {
        if (this._modArmorName == null)
            this._modArmorName = "";
        return this._modArmorName;
    }

    public set modArmorName(value: string): void {
        if (value == null)
            value = "";
        this._modArmorName = value;
    }

    public get armorName(): string {
        if (this._modArmorName.length > 0)
            return this.modArmorName;
        return this._armor.name;
    }
    public get armorDef(): number {
        let armorDef: number = this._armor.def;
        //Blacksmith thistory!
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
            if (this.armorPerk == "Light") armorDef += Math.round(this.stats.spe / 8);
            else if (this.armorPerk == "Medium") armorDef += Math.round(this.stats.spe / 13);
        }
        //Berzerking removes armor
        if (this.statusAffects.has("Berzerking")) {
            armorDef = 0;
        }
        if (kGAMECLASS.monster.this.statusAffects.has("TailWhip")) {
            armorDef -= kGAMECLASS.monster.this.statusAffects.get("TailWhip").value1;
            if (armorDef < 0) armorDef = 0;
        }
        return armorDef;
    }
    public get armorBaseDef(): number {
        return this._armor.def;
    }
    public get armorPerk(): string {
        return this._armor.perk;
    }
    public get armorValue(): number {
        return this._armor.value;
    }
    private _weapon: Weapon = WeaponLib["Fists"];
    public get weaponName(): string {
        return this._weapon.name;
    }
    public get weaponVerb(): string {
        return this._weapon.verb;
    }
    public get weaponAttack(): number {
        let attack: number = this._weapon.attack;
        if (this.perks.has("WeaponMastery") && this.weaponPerk == "Large" && this.stats.str > 60)
            attack *= 2;
        if (this.perks.has("LightningStrikes") && this.stats.spe >= 60 && this.weaponPerk != "Large") {
            attack += Math.round((this.stats.spe - 50) / 3);
        }
        if (this.statusAffects.has("Berzerking")) attack += 30;
        attack += this.statusAffects.get("ChargeWeapon").value1;
        return attack;
    }
    public get weaponBaseAttack(): number {
        return this._weapon.attack;
    }
    public get weaponPerk(): string {
        return this._weapon.perk || "";
    }
    public get weaponValue(): number {
        return this._weapon.value;
    }

    public get armor(): Armor {
        return this._armor;
    }

    public setArmor(newArmor: Armor): Armor {
        //Returns the old armor, allowing the caller to discard it, store it or try to place it in the player's inventory
        //Can return null, in which case caller should discard.
        let oldArmor: Armor = this._armor.playerRemove(); //The armor is responsible for removing any bonuses, perks, etc.
        if (newArmor == null) {
            newArmor = ArmorLib.COMFORTABLE_UNDERCLOTHES;
        }
        this._armor = newArmor.playerEquip(); //The armor can also choose to equip something else - useful for Ceraph's trap armor
        return oldArmor;
    }

    // in case you don't want to call the value.equip
    public setArmorHiddenField(value: Armor): void {
        this._armor = value;
    }

    public get weapon(): Weapon {
        return this._weapon;
    }

    public setWeapon(newWeapon: Weapon): Weapon {
        //Returns the old weapon, allowing the caller to discard it, store it or try to place it in the player's inventory
        //Can return null, in which case caller should discard.
        let oldWeapon: Weapon = this._weapon.playerRemove(); //The weapon is responsible for removing any bonuses, perks, etc.
        if (newWeapon == null) {
            newWeapon = WeaponLib["Fists"];
        }
        this._weapon = newWeapon.playerEquip(); //The weapon can also choose to equip something else
        return oldWeapon;
    }

	/*
	public set weapon(value:Weapon):void
	{
		if (value == null){
			CoC_Settings.error(short+".weapon is set to null");
			value = WeaponLib.FISTS;
		}
		value.equip(this, false, false);
	}
	*/

    // in case you don't want to call the value.equip
    public setWeaponHiddenField(value: Weapon): void {
        this._weapon = value;
    }

}