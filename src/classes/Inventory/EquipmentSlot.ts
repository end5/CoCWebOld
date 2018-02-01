import Character from '../Character/Character';
import EquipableItem from '../Items/EquipableItem';
import ItemFactory from '../Items/ItemFactory';
import ISerializable from '../Utilities/ISerializable';

export type EquipEffect = (item: EquipableItem, character: Character) => void;

export default class EquipmentSlot<T extends EquipableItem> implements ISerializable<EquipmentSlot<T>> {
    private character: Character;
    private equippedItem: T;
    private onEquipEffects: EquipEffect[];
    private onUnequipEffects: EquipEffect[];

    public constructor(character: Character) {
        this.character = character;
    }

    public get item(): T {
        return this.equippedItem;
    }

    public isEquipped(): boolean {
        return this.equippedItem !== undefined;
    }

    public equip(item: T) {
        if (this.isEquipped())
            this.unequip();
        this.equippedItem = item;
        item.onEquip(this.character);
        for (const effect of this.onEquipEffects) {
            effect(item, this.character);
        }
    }

    public unequip() {
        for (const effect of this.onEquipEffects) {
            effect(this.equippedItem, this.character);
        }
        this.equippedItem.onUnequip(this.character);
        this.equippedItem = null;
    }

    public addEquipEffect(equipEffect: EquipEffect) {
        this.onEquipEffects.push(equipEffect);
    }

    public addUnequipEffect(equipEffect: EquipEffect) {
        this.onUnequipEffects.push(equipEffect);
    }

    public serialize(): string {
        return JSON.stringify({
            item: this.equippedItem.serialize()
        });
    }

    public deserialize(saveObject: EquipmentSlot<T>) {
        if (saveObject.item) {
            this.equip(ItemFactory.get(saveObject.equippedItem.type, saveObject.equippedItem.name) as T);
        }
    }
}
