import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { FilterOption } from '../../Engine/Utilities/List';
import { Character } from '../Character/Character';
import { EquipableItem } from '../Items/EquipableItem';
import { getItemFromName } from '../Items/ItemLookup';

export type EquipEffect = (item: EquipableItem, character: Character) => void;

export class EquipSlot<T extends EquipableItem> implements ISerializable<EquipSlot<T>> {
    public static FilterName<T extends EquipableItem>(name: string): FilterOption<EquipSlot<T>> {
        return (a: EquipSlot<T>) => {
            return !!a.item && a.item.name === name;
        };
    }

    private character: Character;
    private equippedItem?: T;
    private onEquipEffects: EquipEffect[];
    private onUnequipEffects: EquipEffect[];

    public constructor(character: Character) {
        this.character = character;
        this.onEquipEffects = [];
        this.onUnequipEffects = [];
    }

    public get item(): T | undefined {
        return this.equippedItem;
    }

    public isEquipped(): boolean {
        return !!this.equippedItem;
    }

    public equip(item: T): T | undefined {
        if (item) {
            let unequippedItem;
            if (this.isEquipped())
                unequippedItem = this.unequip();
            this.equippedItem = item;
            item.onEquip(this.character);
            for (const effect of this.onEquipEffects) {
                effect(item, this.character);
            }
            if (unequippedItem)
                return unequippedItem;
        }
        return;
    }

    public unequip(): T | undefined {
        if (!this.equippedItem) return;
        for (const effect of this.onEquipEffects) {
            effect(this.equippedItem, this.character);
        }
        this.equippedItem.onUnequip(this.character);
        const unequippedItem = this.equippedItem;
        this.equippedItem = undefined;
        return unequippedItem;
    }

    public addEquipEffect(equipEffect: EquipEffect) {
        this.onEquipEffects.push(equipEffect);
    }

    public addUnequipEffect(equipEffect: EquipEffect) {
        this.onUnequipEffects.push(equipEffect);
    }

    public serialize(): object | undefined {
        return this.equippedItem ? { equippedItem: this.equippedItem.serialize() } : undefined;
    }

    public deserialize(saveObject: EquipSlot<T>) {
        if (saveObject && saveObject.equippedItem) {
            this.equip(getItemFromName(saveObject.equippedItem.name) as T);
        }
    }
}
