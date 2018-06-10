﻿import { CoC_Settings } from './CoC_Settings';

export class ItemSlotClass {
    //data
    private _quantity: number = 0;
    private _itype: ItemType = ItemType.NOTHING;
    private _unlocked: boolean = false;


    public setItemAndQty(itype: ItemType, quant: number): void {
        if (itype == null) itype = ItemType.NOTHING;
        if (quant == 0 && itype == ItemType.NOTHING) {
            this.emptySlot();
            return;
        }
        if (quant < 0 || quant == 0 && itype != ItemType.NOTHING || quant > 0 && itype == ItemType.NOTHING) {
            CoC_Settings.error("Inconsistent setItemAndQty call: " + quant + " " + itype);
            quant = 0;
            itype = ItemType.NOTHING;
        }
        this._quantity = quant;
        this._itype = itype;
    }


    public emptySlot(): void {
        this._quantity = 0;
        this._itype = ItemType.NOTHING;
    }

    public removeOneItem(): void {
        if (this._quantity == 0)
            CoC_Settings.error("Tried to remove item from empty slot!");
        if (this._quantity > 0)
            this._quantity -= 1;

        if (this._quantity == 0)
            this._itype = ItemType.NOTHING;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(value: number): void {
        if (value > 0 && this._itype == null) CoC_Settings.error("ItemSlotClass.quantity set with no item; use setItemAndQty instead!");
        if (value == 0) this._itype = ItemType.NOTHING;
        this._quantity = value;
    }

    public get itype(): ItemType {
        return this._itype;
    }

    public get unlocked(): boolean {
        return this._unlocked;
    }

    public set unlocked(value: boolean): void {
        if (this._unlocked != value) {
            this.emptySlot();
        }
        this._unlocked = value;
    }

    public isEmpty(): boolean {
        return this._quantity <= 0;
    }
}
}