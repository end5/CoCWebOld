import EffectDescription from "./EffectDescription"

export default class PerkDesc extends EffectDescription {
    desc(params: any): string {
        throw new Error("Method not implemented.");
    }
    constructor(key: string, name: string, desc: string, longDesc: string = null, invis: boolean = false, permanent: boolean = false) {
        super(key, name, desc, longDesc);
    }
}