import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class KeyCombination implements ISerializable<KeyCombination> {
    public keyCode: number;
    public shiftKey: boolean = false;
    public altKey: boolean = false;
    public ctrlKey: boolean = false;
    public metaKey: boolean = false;

    public constructor(keyCode: number = 0) {
        this.keyCode = keyCode;
    }

    public clone(): KeyCombination {
        const newKeyComb = new KeyCombination();
        newKeyComb.keyCode = this.keyCode;
        newKeyComb.shiftKey = this.shiftKey;
        newKeyComb.altKey = this.altKey;
        newKeyComb.ctrlKey = this.ctrlKey;
        newKeyComb.metaKey = this.metaKey;
        return newKeyComb;
    }

    public toString(): string {
        return (this.shiftKey ? "Shift + " : "") +
            (this.ctrlKey ? "Ctrl + " : "") +
            (this.altKey ? "Alt + " : "") +
            (this.metaKey ? "Meta + " : "") +
            String.fromCharCode(this.keyCode);
    }

    public serialize(): object | undefined {
        return {
            keyCode: this.keyCode,
            shiftKey: this.shiftKey,
            altKey: this.altKey,
            ctrlKey: this.ctrlKey,
            metaKey: this.metaKey
        };
    }

    public deserialize(saveObject: KeyCombination) {
        if (saveObject.keyCode) {
            this.keyCode = saveObject.keyCode;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - keyCode incorrect");
            console.trace();
        }

        if (saveObject.shiftKey) {
            this.shiftKey = saveObject.shiftKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - shiftKey incorrect");
            console.trace();
        }

        if (saveObject.altKey) {
            this.altKey = saveObject.altKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - altKey incorrect");
            console.trace();
        }

        if (saveObject.ctrlKey) {
            this.ctrlKey = saveObject.ctrlKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - ctrlKey incorrect");
            console.trace();
        }

        if (saveObject.metaKey) {
            this.metaKey = saveObject.metaKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - metaKey incorrect");
            console.trace();
        }
    }
}
