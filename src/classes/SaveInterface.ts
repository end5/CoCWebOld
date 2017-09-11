export interface SaveInterface {
    saveKey: string;
    save(): object;
    load(saveObject: object);
}