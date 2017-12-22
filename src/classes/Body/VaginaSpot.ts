import Vagina, { VaginaLooseness, VaginaWetness } from './Vagina';
import SerializableList from '../Utilities/SerializableList';

export default class VaginaSpot extends SerializableList<Vagina> {
    public hasVagina(): boolean {
        return this.list.length > 0 ? true : false;
    }

    public isVirgin(): boolean {
        return this.list.length > 0 && this.list.filter(Vagina.NotVirgin).length == 0;
    }

    public averageVaginalLooseness(): number {
        let average: number = 0;
        if (this.list.length == 0)
            return VaginaLooseness.LOOSE;
        for (let index = 0; index < this.list.length; index++)
            average += this.list[index].looseness;
        return average / this.list.length;
    }

    public averageVaginalWetness(): number {
        let average: number = 0;
        if (this.list.length == 0)
            return VaginaWetness.WET;
        for (let index = 0; index < this.list.length; index++)
            average += this.list[index].wetness;
        return average / this.list.length;
    }
}