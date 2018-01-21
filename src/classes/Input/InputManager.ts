import BindableAction from './BindableAction';
import DefaultKeyBinds from './DefaultKeyBinds';
import KeyCombination from './KeyCombination';
import KeyPair from './KeyPair';
import InputFileElement from '../display/Elements/InputFileElement';
import Dictionary from '../Utilities/Dictionary';
import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export default class InputManager implements ISerializable<InputManager> {
    private static keyBinds: SerializableList<KeyPair>;

    public static reset(bindableAction: BindableAction) {
        InputManager.get(bindableAction).primaryKey.deserialize(DefaultKeyBinds[bindableAction].primaryKey.serialize());
        InputManager.get(bindableAction).secondaryKey.deserialize(DefaultKeyBinds[bindableAction].secondaryKey.serialize());
    }

    public static resetAll() {
        for (let index = 0; index < InputManager.keyBinds.count; index++) {
            InputManager.reset(index);
        }
    }

    public static clear(bindableAction: BindableAction) {
        InputManager.get(bindableAction).primaryKey = null;
        InputManager.get(bindableAction).secondaryKey = null;
    }

    public static clearAll() {
        for (let index = 0; index < InputManager.keyBinds.count; index++) {
            InputManager.clear(index);
        }
    }

    public static get(bindableAction: BindableAction): KeyPair {
        return InputManager.keyBinds[bindableAction];
    }

    private constructor() {
        InputManager.keyBinds = new SerializableList(KeyPair);
        this.initDefaultKeyBind(BindableAction.Stats);
        this.initDefaultKeyBind(BindableAction.LevelUp);
        this.initDefaultKeyBind(BindableAction.Quicksave1);
        this.initDefaultKeyBind(BindableAction.Quicksave2);
        this.initDefaultKeyBind(BindableAction.Quicksave3);
        this.initDefaultKeyBind(BindableAction.Quicksave4);
        this.initDefaultKeyBind(BindableAction.Quicksave5);
        this.initDefaultKeyBind(BindableAction.Quickload1);
        this.initDefaultKeyBind(BindableAction.Quickload2);
        this.initDefaultKeyBind(BindableAction.Quickload3);
        this.initDefaultKeyBind(BindableAction.Quickload4);
        this.initDefaultKeyBind(BindableAction.Quickload5);
        this.initDefaultKeyBind(BindableAction.MainMenu);
        this.initDefaultKeyBind(BindableAction.SaveLoad);
        this.initDefaultKeyBind(BindableAction.Appearance);
        this.initDefaultKeyBind(BindableAction.No);
        this.initDefaultKeyBind(BindableAction.Yes);
        this.initDefaultKeyBind(BindableAction.Perks);
        this.initDefaultKeyBind(BindableAction.Back);
        this.initDefaultKeyBind(BindableAction.CycleBackground);
        this.initDefaultKeyBind(BindableAction.Button0);
        this.initDefaultKeyBind(BindableAction.Button1);
        this.initDefaultKeyBind(BindableAction.Button2);
        this.initDefaultKeyBind(BindableAction.Button3);
        this.initDefaultKeyBind(BindableAction.Button4);
        this.initDefaultKeyBind(BindableAction.Button5);
        this.initDefaultKeyBind(BindableAction.Button6);
        this.initDefaultKeyBind(BindableAction.Button7);
        this.initDefaultKeyBind(BindableAction.Button8);
        this.initDefaultKeyBind(BindableAction.Button9);
    }

    private initDefaultKeyBind(bindableAction: BindableAction) {
        const keyPair = DefaultKeyBinds[bindableAction];
        const primaryKey = keyPair.primaryKey.clone();
        const secondaryKey = keyPair.secondaryKey ? keyPair.secondaryKey.clone() : null;
        InputManager.keyBinds[bindableAction] = new KeyPair(primaryKey, secondaryKey);
    }

    public serialize(): string {
        return JSON.stringify({ keyBinds: InputManager.keyBinds.serialize() });
    }

    public deserialize(saveObject: InputManager) {
        InputManager.keyBinds.deserialize(saveObject["keyBinds"]);
    }
}
