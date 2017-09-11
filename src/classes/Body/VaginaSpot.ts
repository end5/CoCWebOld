﻿import Vagina, { VaginaLooseness, VaginaWetness } from "./Vagina";
import { SaveInterface } from "../SaveInterface";

export default class VaginaSpot implements SaveInterface {
    private _vaginas: Vagina[];

    public constructor() {
        this._vaginas = [];
    }

    public add(vagina: Vagina) {
        this._vaginas.push(vagina);
    }

    public remove(vagina: Vagina): void {
        let index: number = this._vaginas.indexOf(vagina);
        if (index >= 0)
            this._vaginas.splice(index);
    }

    public count(): number {
        return this._vaginas.length;
    }

    public get list(): Vagina[] {
        return this._vaginas.slice();
    }

    public hasVagina(): boolean {
        return this._vaginas.length > 0 ? true : false;
    }



    public get LoosenessMost(): Vagina[] {
        return this._vaginas.slice().sort((a: Vagina, b: Vagina) => {
            return a.vaginalLooseness - b.vaginalLooseness;
        });
    }

    public get LoosenessLeast(): Vagina[] {
        return this._vaginas.slice().sort((a: Vagina, b: Vagina) => {
            return b.vaginalLooseness - a.vaginalLooseness;
        });
    }

    public get WetnessMost(): Vagina[] {
        return this._vaginas.slice().sort((a: Vagina, b: Vagina) => {
            return a.vaginalWetness - b.vaginalWetness;
        });
    }

    public get WetnessLeast(): Vagina[] {
        return this._vaginas.slice().sort((a: Vagina, b: Vagina) => {
            return b.vaginalWetness - a.vaginalWetness;
        });
    }

    public get Virgin(): Vagina[] {
        return this._vaginas.filter((a: Vagina) => {
            if (a.virgin)
                return a;
        });
    }

    public get NotVirgin(): Vagina[] {
        return this._vaginas.filter((a: Vagina) => {
            if (!a.virgin)
                return a;
        });
    }

    public averageVaginalLooseness(): number {
        let average: number = 0;
        if (this._vaginas.length == 0)
            return VaginaLooseness.LOOSE;
        for (let index = 0; index < this._vaginas.length; index++)
            average += this._vaginas[index].vaginalLooseness;
        return average / this._vaginas.length;
    }

    public averageVaginalWetness(): number {
        let average: number = 0;
        if (this._vaginas.length == 0)
            return VaginaWetness.WET;
        for (let index = 0; index < this._vaginas.length; index++)
            average += this._vaginas[index].vaginalWetness;
        return average / this._vaginas.length;
    }

    saveKey: string = "VaginaSpot";
    save(): object {
        let saveObject: object;
        saveObject["length"] = this._vaginas.length;
        for (let index = 0; index < this._vaginas.length; index++) {
            saveObject[index] = this._vaginas[index].save();
        }
        return saveObject;
    }
    load(saveObject: object) {
        if (!saveObject["length"] || saveObject["length"] < 0) {
            console.error("Chest length non zero.");
            return;
        }
        this._vaginas = [];
        for (let index = 0; index < saveObject["length"]; index++) {
            this._vaginas.push(new Vagina());
            this._vaginas[index].load(saveObject[index]);
        }
    }

}