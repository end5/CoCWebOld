import { SaveInterface } from "../SaveInterface";

export default class Ovipositor implements SaveInterface {
    private _eggs: number;
    private _fertilizedEggs: number;

    public constructor() {
        this._eggs = 0;
        this._fertilizedEggs = 0;
    }

    public get eggs(): number {
        return this._eggs;
    }

    public set eggs(value: number) {
        this._eggs = this._eggs > 50 ? 50 : value;
    }

    public get fertilizedEggs(): number {
        return this._fertilizedEggs;
    }

    public set fertilizedEggs(value: number) {
        this._fertilizedEggs = this._fertilizedEggs > 50 ? 50 : value;
    }

    public canOviposit(): boolean {
        return this._eggs >= 10 ? true : false;
    }

    public dumpEggs(): void {
        this._eggs = 0;
        this.fertilizeEggs();
    }

    public fertilizeEggs(): number {
        this._fertilizedEggs = this._eggs;
        return this._fertilizedEggs;
    }

    saveKey: string = "Ovipositor";
    save(): object {
        return {
            "_eggs": this._eggs,
            "_fertilizedEggs": this._fertilizedEggs
        };
    }
    load(saveObject: object) {
        this._eggs = saveObject["_eggs"];
        this._fertilizedEggs = saveObject["_fertilizedEggs"];
    }

}