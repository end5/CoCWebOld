import Pregnancy, { PregnancyType } from './Pregnancy';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import UpdateInterface from '../../UpdateInterface';
import Utils from '../../Utilities/Utils';
import Butt from '../Butt';
import Creature from '../Creature';
import Vagina from '../Vagina';
import VaginaSpot from '../VaginaSpot';


export default class PregnancyManager implements UpdateInterface {
    protected body: Creature;
    protected vaginaSpot: VaginaSpot;
    protected wombs: Pregnancy[];
    protected buttWomb: Pregnancy;

    public constructor(body: Creature) {
        this.body = body;
        this.vaginaSpot = body.lowerBody.vaginaSpot;
        this.wombs = [];
        this.buttWomb = null;
    }

    public count(): number {
        return this.wombs.length;
    }

    public vaginaPregnancy(index: number): Pregnancy {
        if (index < this.wombs.length)
            return this.wombs[index];
        return null;
    }

    public get buttPregnancy(): Pregnancy {
        return this.buttWomb;
    }

    public update(hours: number) {
        for (let timeCountdown: number = 0; timeCountdown < hours; timeCountdown++) {
            if (this.buttWomb != null) {
                this.buttWomb.incubation -= this.buttWomb.incubation == 0 ? 0 : 1;
                if (this.buttWomb.canBirth(this.body)) {
                    this.buttWomb.birth(this.body);
                    this.buttWomb = null;
                }
                else {
                    this.buttWomb.incubationDisplay(this.body);
                }
            }
            for (let index: number = 0; index < this.wombs.length; index++) {
                if (this.wombs[index] != null) {
                    this.wombs[index].incubation -= this.wombs[index].incubation == 0 ? 0 : 1;
                    if (this.wombs[index].canBirth(this.body)) {
                        if (!this.body.lowerBody.vaginaSpot.hasVagina()) {
                            if (this.body instanceof Player)
                                DisplayText.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
                            this.body.lowerBody.vaginaSpot.add(new Vagina());
                            this.body.updateGender();
                        }
                        this.wombs[index].birth(this.body);
                        this.wombs.splice(index, 1);
                    }
                    else {
                        this.wombs[index].incubationDisplay(this.body);
                    }
                }
            }
        }
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

    public get listLargestIncubationTime(): Pregnancy[] {
        return this.wombs.slice().sort((first: Pregnancy, second: Pregnancy) => {
            return second.incubation - first.incubation;
        });
    }

    public canKnockUp(): boolean {
        return this.wombs.length < this.vaginaSpot.count();
    }

    //fertility must be >= random(0-beat)
    //If arg == 1 then override any contraceptives and guarantee fertilization
    public knockUp(vaginaNumber: number, pregnancy: Pregnancy, beat: number = 100, arg: number = 0): void {
        //Contraceptives cancel!
        if (this.body.statusAffects.has(StatusAffectType.Contraceptives) && arg < 1)
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
                (this.body.perks.has(PerkType.SpiderOvipositor) || this.body.perks.has(PerkType.BeeOvipositor)) &&
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
        if (this.body.statusAffects.has(StatusAffectType.Contraceptives) && arg < 1)
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