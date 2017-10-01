import CreatureBody from "./Body";
import Vagina from "./Vagina";
import Pregnancy, { PregnancyType } from "./Pregnancy";
import VaginaSpot from "./VaginaSpot";
import Butt from "./Butt";
import Utils from "../Utilities/Utils";
import UpdateInterface from "../UpdateInterface";

export default class PregnancyManager implements UpdateInterface {
    private body: CreatureBody;
    private vaginaSpot: VaginaSpot;
    private wombs: Pregnancy[];
    private buttWomb: Pregnancy;

    public constructor(body: CreatureBody) {
        this.body = body;
        this.vaginaSpot = body.lowerBody.vaginaSpot;
        this.wombs = [];
        this.buttWomb = null;
    }

    public update(hours: number) {
        if (this.buttWomb != null)
            this.buttWomb.pregnancyAdvance();
        for (let index: number = 0; index < this.wombs.length; index++)
            this.wombs[index].pregnancyAdvance();
    }

    public isPregnant(): boolean {
        return this.wombs.length > 0;
    }

    public isPregnantWith(pregType: PregnancyType): boolean {
        for (let index: number = 0; index < this.wombs.length; index++)
            if (this.wombs[index].type == pregType)
                return true;
        return false;
    }

    public isButtPregnant(): boolean {
        return this.buttWomb != null;
    }

    public isButtPregnantWith(pregType: PregnancyType): boolean {
        return this.isButtPregnant() && this.buttWomb.type == pregType;
    }

    public getPregVagina(): Vagina {
        for (let index: number = 0; index < this.vaginaSpot.count(); index++)
            if (this.wombs[index] != null)
                return this.vaginaSpot.get(index);
        return null;
    }

    public getNotPregVagina(): Vagina {
        for (let index: number = 0; index < this.vaginaSpot.count(); index++)
            if (!this.wombs[index] != null)
                return this.vaginaSpot.get(index);
        return null;
    }

    public getVaginaWithPregType(pregType: PregnancyType): Vagina {
        for (let index: number = 0; index < this.vaginaSpot.count(); index++)
            if (this.wombs[index] != null && this.wombs[index].type == pregType)
                return this.vaginaSpot.get(index);
        return null;
    }

    public canKnockUp(): boolean {
        return this.wombs.length < this.vaginaSpot.count();
    }

    //fertility must be >= random(0-beat)
    //If arg == 1 then override any contraceptives and guarantee fertilization
    public knockUp(vaginaNumber: number, pregnancy: Pregnancy, beat: number = 100, arg: number = 0): void {
        //Contraceptives cancel!
        if (this.body.statusAffects.has("Contraceptives") && arg < 1)
            return;
        if (this.canKnockUp() && vaginaNumber < this.vaginaSpot.count()) {
            // length check
            this.wombs.length = this.vaginaSpot.count();

            let bonus: number = 0;
            //If arg = 1 (always pregnant), bonus = 9000
            if (arg >= 1)
                bonus = 9000;
            if (arg <= -1)
                bonus = -9000;
            //If unpregnant and fertility wins out:
            if (this.wombs[vaginaNumber].incubation == 0 && this.body.totalFertility() + bonus > Utils.rand(beat)) {
                this.wombs[vaginaNumber] = pregnancy;
                console.trace("PC Knocked up with pregnancy type: " + pregnancy.type + " for " + pregnancy.incubation + " incubation.");
            }
            //Chance for eggs fertilization - ovi elixir and imps excluded!
            if (pregnancy.type != (PregnancyType.IMP && PregnancyType.OVIELIXIR_EGGS && PregnancyType.ANEMONE) && 
                (this.body.perks.has("SpiderOvipositor") || this.body.perks.has("BeeOvipositor")) &&
                (this.body.totalFertility() + bonus > Utils.rand(beat)))
                this.body.lowerBody.ovipositor.fertilizeEggs();
        }
        else {
            throw "Can knock up imaginary vagina.";
        }
    }

    //fertility must be >= random(0-beat)
    public buttKnockUp(pregnancy: Pregnancy, beat: number = 100, arg: number = 0): void {
        //Contraceptives cancel!
        if (this.body.statusAffects.has("Contraceptives") && arg < 1)
            return;
        let bonus: number = 0;
        //If arg = 1 (always pregnant), bonus = 9000
        if (arg >= 1)
            bonus = 9000;
        if (arg <= -1)
            bonus = -9000;
        //If unpregnant and fertility wins out:
        if (this.buttWomb.incubation == 0 && this.body.totalFertility() + bonus > Utils.rand(beat)) {
            this.buttWomb = pregnancy;
            console.trace("PC Butt Knocked up with pregnancy type: " + pregnancy.type + " for " + pregnancy.incubation + " incubation.");
        }
    }
}