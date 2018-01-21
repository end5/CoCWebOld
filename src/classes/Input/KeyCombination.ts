import ISerializable from '../Utilities/ISerializable';

export default class KeyCombination implements ISerializable<KeyCombination> {
    public keyCode: number;
    public shiftKey: boolean = false;
    public altKey: boolean = false;
    public ctrlKey: boolean = false;
    public metaKey: boolean = false;

    public constructor(keyCode: number = 0) {
        this.keyCode = keyCode;
    }

    public toString(): string {
        return (this.shiftKey ? "Shift + " : "") +
            (this.ctrlKey ? "Ctrl + " : "") +
            (this.altKey ? "Alt + " : "") +
            (this.metaKey ? "Meta + " : "") +
            String.fromCharCode(this.keyCode);
    }

    public serialize(): string {
        return JSON.stringify({
            keyCode: this.keyCode,
            shiftKey: this.shiftKey,
            altKey: this.altKey,
            ctrlKey: this.ctrlKey,
            metaKey: this.metaKey
        });
    }

    public deserialize(saveObject: KeyCombination) {
        if (saveObject.keyCode !== undefined) {
            this.keyCode = saveObject.keyCode;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - keyCode incorrect");
            console.trace();
        }

        if (saveObject.shiftKey !== undefined) {
            this.shiftKey = saveObject.shiftKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - shiftKey incorrect");
            console.trace();
        }

        if (saveObject.altKey !== undefined) {
            this.altKey = saveObject.altKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - altKey incorrect");
            console.trace();
        }

        if (saveObject.ctrlKey !== undefined) {
            this.ctrlKey = saveObject.ctrlKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - ctrlKey incorrect");
            console.trace();
        }

        if (saveObject.metaKey !== undefined) {
            this.metaKey = saveObject.metaKey;
        }
        else {
            console.error("Error - Deserialize: KeyCombination - metaKey incorrect");
            console.trace();
        }
    }
}
