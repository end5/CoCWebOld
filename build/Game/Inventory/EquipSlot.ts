import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Character } from '../Character/Character';
import { EquipableItem } from '../Items/EquipableItem';
import { ItemFactory } from '../Items/ItemFactory';

export type EquipEffect = (item: EquipableItem, character: Character) => void;

export class EquipSlot<T extends EquipableItem> implements ISerializable<EquipSlot<T>> {
    private character: Character;
    private equippedItem: T;
    private onEquipEffects: EquipEffect[];
    private onUnequipEffects: EquipEffect[];

    public constructor(character: Character) {
        this.character = character;
        this.onEquipEffects = [];
        this.onUnequipEffects = [];
    }

    public get item(): T {
        return this.equippedItem;
    }

    public isEquipped(): boolean {
        return !!this.equippedItem;
    }

    public equip(item: T) {
        if (item) {
            if (this.isEquipped())
                this.unequip();
            this.equippedItem = item;
            item.onEquip(this.character);
            for (const effect of this.onEquipEffects) {
                effect(item, this.character);
            }
        }
    }

    public unequip() {
        if (this.equippedItem) {
            for (const effect of this.onEquipEffects) {
                effect(this.equippedItem, this.character);
            }
            this.equippedItem.onUnequip(this.character);
            this.equippedItem = undefined;
        }
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
        if (saveObject) {
            this.equip(ItemFactory.get(saveObject.equippedItem.type, saveObject.equippedItem.name) as T);
        }
    }
}
