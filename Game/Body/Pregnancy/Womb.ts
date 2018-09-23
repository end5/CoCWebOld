import { IPregnancyEvent } from './IPregnancyEvent';
import { Pregnancy, PregnancyType } from './Pregnancy';
import { ISerializable } from '../../../Engine/Utilities/ISerializable';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Creature } from '../Creature';
import { Vagina } from '../Vagina';
import { CView } from '../../../Engine/Display/ContentView';

export class Womb implements ISerializable<Womb> {
    protected currentPregnancy: Pregnancy;
    protected pregEvent: IPregnancyEvent;
    protected creature: Creature;
    public constructor(creature: Creature) {
        this.creature = creature;
    }

    public get pregnancy(): Pregnancy {
        return this.currentPregnancy;
    }

    public isPregnant(): boolean {
        return !!this.pregnancy;
    }

    public isPregnantWith(type: PregnancyType): boolean {
        return this.isPregnant() && this.pregnancy.type === type;
    }

    public canKnockUp(): boolean {
        return !this.pregnancy && this.creature.body.vaginas.length > 0;
    }

    private removeHeat() {
        CView.text("\nYou calm down a bit and realize you no longer fantasize about getting fucked constantly.  It seems your heat has ended.\n");
    }

    // fertility must be >= random(0-beat)
    // If guarantee then override any contraceptives and guarantee fertilization
    public knockUp(pregnancy: Pregnancy, virility: number = 100, guarantee: boolean = false): void {
        // Contraceptives cancel!
        if (guarantee || this.canKnockUp()) {
            this.removeHeat();

            // If unpregnant and fertility wins out:
            if (guarantee || this.creature.totalFertility() > randInt(virility)) {
                this.currentPregnancy = pregnancy;
                // this.pregEvent = PregnancyEventFactory.create(pregnancy.type);
            }

            // Chance for eggs fertilization - ovi elixir and imps excluded!
            if (pregnancy.type !== PregnancyType.IMP && pregnancy.type !== PregnancyType.OVIELIXIR_EGGS && pregnancy.type !== PregnancyType.ANEMONE &&
                (guarantee || this.creature.totalFertility() > randInt(virility)))
                this.creature.pregnancy.ovipositor.fertilizeEggs();
        }
    }

    public canBirth(): boolean {
        return this.pregEvent.canBirth(this.creature, this.currentPregnancy.incubation);
    }

    public birth() {
        if (this.creature.body.vaginas.length <= 0) {
            // if (this.creature. instanceof Player)
            //     CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            this.creature.body.vaginas.add(new Vagina());
        }
        this.pregEvent.birthScene(this.creature);
        this.currentPregnancy = undefined;
    }

    public update() {
        if (this.currentPregnancy) {
            this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
            if (this.canBirth()) {
                this.birth();
            }
            else {
                this.pregEvent.incubationDisplay(this.creature, this.currentPregnancy.incubation);
            }
        }
    }

    public serialize(): object | undefined {
        if (this.currentPregnancy)
            return {
                currentPregnancy: this.currentPregnancy
            };
    }

    public deserialize(saveObject: Womb) {
        if (saveObject) {
            this.currentPregnancy = new Pregnancy();
            this.currentPregnancy.deserialize(saveObject.pregnancy);
        }
    }
}
