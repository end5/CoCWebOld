import IPregnancyEvent from './IPregnancyEvent';
import Pregnancy, { IncubationTime, PregnancyType } from './Pregnancy';
import PregnancyEventFactory from './PregnancyEventFactory';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import ISerializable from '../../Utilities/ISerializable';
import { Utils } from '../../Utilities/Utils';
import Creature from '../Creature';
import Tail from '../Tail';
import Vagina from '../Vagina';

export default class Womb implements ISerializable<Womb> {
    protected currentPregnancy: Pregnancy;
    protected pregEvent: IPregnancyEvent;
    protected body: Creature;
    public constructor(body: Creature) {
        this.body = body;
    }

    public get pregnancy(): Pregnancy {
        return this.currentPregnancy;
    }

    public isPregnant(): boolean {
        return this.pregnancy !== undefined;
    }

    public isPregnantWith(type: PregnancyType): boolean {
        return this.isPregnant() && this.pregnancy.type === type;
    }

    public canKnockUp(): boolean {
        return this.pregnancy === undefined && !this.body.statusAffects.has(StatusAffectType.Contraceptives);
    }

    private removeHeat() {
        DisplayText("\nYou calm down a bit and realize you no longer fantasize about getting fucked constantly.  It seems your heat has ended.\n");
        // Remove bonus libido from heat
        this.body.stats.lib -= this.body.statusAffects.get(StatusAffectType.Heat).value2;
        if (this.body.stats.lib < 10)
            this.body.stats.lib = 10;
        this.body.statusAffects.remove(StatusAffectType.Heat);
    }

    // fertility must be >= random(0-beat)
    // If guarantee then override any contraceptives and guarantee fertilization
    public knockUp(pregnancy: Pregnancy, virility: number = 100, guarantee: boolean = false): void {
        // Contraceptives cancel!
        if (this.canKnockUp()) {
            this.removeHeat();

            // If unpregnant and fertility wins out:
            if (guarantee || this.body.totalFertility() > Utils.rand(virility)) {
                this.currentPregnancy = pregnancy;
                this.pregEvent = PregnancyEventFactory.create(pregnancy.type);
            }

            // Chance for eggs fertilization - ovi elixir and imps excluded!
            if (pregnancy.type !== PregnancyType.IMP && pregnancy.type !== PregnancyType.OVIELIXIR_EGGS && pregnancy.type !== PregnancyType.ANEMONE &&
                (guarantee || this.body.totalFertility() > Utils.rand(virility)))
                this.body.pregnancy.ovipositor.fertilizeEggs();
        }
    }

    public canBirth(): boolean {
        return this.pregEvent.canBirth(this.body, this.currentPregnancy.incubation);
    }

    public birth() {
        if (this.body.torso.vaginas.count <= 0) {
            if (this.body instanceof Player)
                DisplayText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            this.body.torso.vaginas.add(new Vagina());
            this.body.updateGender();
        }
        this.pregEvent.birthScene(this.body);
        this.currentPregnancy = undefined;
    }

    public update() {
        if (this.currentPregnancy) {
            this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
            if (this.canBirth()) {
                this.birth();
            }
            else {
                this.pregEvent.incubationDisplay(this.body, this.currentPregnancy.incubation);
            }
        }
    }

    public serialize(): string {
        return JSON.stringify({
            currentPregnancy: this.currentPregnancy
        });
    }

    public deserialize(saveObject: Womb) {
        if (saveObject.pregnancy) {
            this.currentPregnancy = new Pregnancy();
            this.currentPregnancy.deserialize(saveObject.pregnancy);
        }
    }
}
