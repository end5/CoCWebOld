import CharacterDescription from './CharacterDescription';
import { CharacterType } from './CharacterType';
import Cock, { CockType } from '../Body/Cock';
import { Gender } from '../Body/Creature';
import Creature from '../Body/Creature';
import { FaceType } from '../Body/Face';
import CombatContainer from '../Combat/CombatContainer';
import CockDescriptor from '../Descriptors/CockDescriptor';
import FaceDescriptor from '../Descriptors/FaceDescriptor';
import HeadDescriptor from '../Descriptors/HeadDescriptor';
import DisplayText from '../display/DisplayText';
import { PerkType } from '../Effects/PerkType';
import StatusAffect from '../Effects/StatusAffect';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Game from '../Game/Game';
import CharacterInventory from '../Inventory/CharacterInventory';
import Armor from '../Items/Armors/Armor';
import CockSockName from '../Items/Misc/CockSockName';
import Weapon from '../Items/Weapons/Weapon';
import UpdateInterface from '../UpdateInterface';
import ISerializable from '../Utilities/ISerializable';
import { Utils } from '../Utilities/Utils';

export default abstract class Character extends Creature implements UpdateInterface, ISerializable<Character> {
    public charType: CharacterType;
    public readonly inventory: CharacterInventory;

    protected description: CharacterDescription;
    public get desc(): CharacterDescription {
        return this.description;
    }

    protected combatContainer: CombatContainer;
    public get combat(): CombatContainer {
        return this.combatContainer;
    }

    public constructor(type: CharacterType) {
        super();
        this.charType = type;
        this.inventory = new CharacterInventory(this);
        this.desc = new CharacterDescription(this);
        if (type !== CharacterType.Player) {
            this.stats.XP = this.totalXP();
        }
    }

    public serialize(): string {
        return JSON.stringify({
            charType: this.charType,
            inventory: this.inventory.serialize(),
            desc: this.desc.serialize()
        });
    }

    public deserialize(saveObject: Character) {
        this.charType = saveObject.charType;
        this.inventory.deserialize(saveObject.inventory);
        this.desc.deserialize(saveObject.desc);
        super.deserialize(saveObject);
    }

    public update(hours: number) {
        this.pregnancy.update(hours);
        this.regeneration();
    }

    private totalXP(): number {
        const playerLevel = Game.player.stats.level;
        // 1) Nerf xp gains by 20% per level after first two level difference
        // 2) No bonuses for underlevel!
        // 3) Super high level folks (over 10 levels) only get 1 xp!
        let difference: number = playerLevel - this.stats.level;
        if (difference <= 2) difference = 0;
        else difference -= 2;
        if (difference > 4) difference = 4;
        difference = (5 - difference) * 20.0 / 100.0;
        if (playerLevel - this.stats.level > 10) return 1;
        return Math.round(this.stats.additionalXP + (this.baseXP() + this.bonusXP()) * difference);
    }

    private baseXP(): number {
        return [200, 10, 20, 30, 40, 50, 55, 60, 66, 75, // 0-9
            83, 85, 92, 100, 107, 115, 118, 121, 128, 135, // 10-19
            145][Math.round(this.stats.level)] || 200;
    }

    private bonusXP(): number {
        return Utils.rand([200, 10, 20, 30, 40, 50, 55, 58, 66, 75,
            83, 85, 85, 86, 92, 94, 96, 98, 99, 101,
            107][Math.round(this.stats.level)] || 130);
    }

    private regeneration() {
        let healingPercent = 0;
        if (this.perks.has(PerkType.Regeneration)) healingPercent += 2;
        if (this.perks.has(PerkType.Regeneration2)) healingPercent += 4;
        if (this.inventory.equipment.armor.displayName === "skimpy nurse's outfit") healingPercent += 2;
        if (this.inventory.equipment.armor.displayName === "goo armor") healingPercent += 3;
        if (this.perks.has(PerkType.LustyRegeneration)) healingPercent += 2;
        if (healingPercent > 10) healingPercent = 10;
        this.stats.HP += Math.round(this.stats.maxHP() * healingPercent / 100);
    }

    public modCumMultiplier(delta: number): number {
        if (delta === 0) {
            return delta;
        }
        else if (delta > 0) {
            if (this.perks.has(PerkType.MessyOrgasms)) {
                delta *= 1.5;
            }
        }
        else if (delta < 0) {
            if (this.perks.has(PerkType.MessyOrgasms)) {
                delta *= 0.5;
            }
        }

        this.cumMultiplier += delta;
        return delta;
    }

    public viridianChange(): boolean {
        const cockSocks = this.inventory.equipment.cockSocks;
        for (let index = 0; index < this.torso.cocks.count; index++)
            if (cockSocks.get(index).isEquipped() && cockSocks.get(index).item.name === CockSockName.Purple && this.torso.cocks.get(index).type !== CockType.DISPLACER)
                return true;
        return false;
    }

    private gildedCockSockCount(): number {
        let count = 0;
        const cockSocks = this.inventory.equipment.cockSocks;
        for (let index = 0; index < this.torso.cocks.count; index++)
            if (cockSocks.get(index).isEquipped() && cockSocks.get(index).item.name === CockSockName.Gilded)
                count++;
        return count;
    }

    public orgasm(): void {
        this.stats.lustNoResist = 0;
        this.hoursSinceCum = 0;
        const gildedCockSockCount = this.gildedCockSockCount();
        if (gildedCockSockCount > 0) {
            const randomCock = Utils.randomChoice(this.torso.cocks);
            const bonusGems = Math.floor(Utils.rand(randomCock.cockThickness) + gildedCockSockCount);
            DisplayText("\n\nFeeling some minor discomfort in your " + CockDescriptor.describeCock(this, randomCock) + " you slip it out of your [armor] and examine it. <b>With a little exploratory rubbing and massaging, you manage to squeeze out " + bonusGems + " gems from its cum slit.</b>\n\n");
            this.inventory.gems += bonusGems;
        }
    }

    public milked(): void {
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
            // You've now been milked, reset the timer for that
            this.statusAffects.get(StatusAffectType.Feeder).value1 = 1;
            this.statusAffects.get(StatusAffectType.Feeder).value2 = 0;
        }
    }
}
