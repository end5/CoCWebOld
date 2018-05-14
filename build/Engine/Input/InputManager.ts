import { BindableAction } from './BindableAction';
import { DefaultKeyBinds } from './DefaultKeyBinds';
import { KeyPair } from './KeyPair';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { List } from '../Utilities/List';
import { ListSerializer } from '../Utilities/ListSerializer';

class InputManager implements ISerializable<InputManager> {
    private keyBinds: List<KeyPair>;

    public reset(bindableAction: BindableAction) {
        if (DefaultKeyBinds[bindableAction].primaryKey)
            this.get(bindableAction).primaryKey = DefaultKeyBinds[bindableAction].primaryKey.clone();
        else
            this.get(bindableAction).primaryKey = undefined;
        if (DefaultKeyBinds[bindableAction].secondaryKey)
            this.get(bindableAction).secondaryKey = DefaultKeyBinds[bindableAction].secondaryKey.clone();
        else
            this.get(bindableAction).secondaryKey = undefined;
    }

    public resetAll() {
        for (let index = 0; index < this.keyBinds.count; index++) {
            this.reset(index);
        }
    }

    public clear(bindableAction: BindableAction) {
        this.get(bindableAction).primaryKey = undefined;
        this.get(bindableAction).secondaryKey = undefined;
    }

    public clearAll() {
        for (let index = 0; index < this.keyBinds.count; index++) {
            this.clear(index);
        }
    }

    public get(bindableAction: BindableAction): KeyPair {
        return this.keyBinds.get(bindableAction);
    }

    public constructor() {
        this.keyBinds = new List();
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
        const secondaryKey = keyPair.secondaryKey ? keyPair.secondaryKey.clone() : undefined;
        this.keyBinds.add(new KeyPair(primaryKey, secondaryKey));
    }

    public serialize(): string {
        return JSON.stringify({ keyBinds: ListSerializer.serialize(this.keyBinds) });
    }

    public deserialize(saveObject: InputManager) {
        // tslint:disable-next-line:no-string-literal
        ListSerializer.deserialize(saveObject["keyBinds"], this.keyBinds, KeyPair);
    }
}

const inputManager = new InputManager();
export { inputManager as InputManager };
