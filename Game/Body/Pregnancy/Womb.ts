import { IPregnancyEvent } from './IPregnancyEvent';
import { Pregnancy, PregnancyType } from './Pregnancy';
import { ISerializable } from '../../../Engine/Utilities/ISerializable';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Vagina } from '../Vagina';
import { CView } from '../../../Engine/Display/ContentView';
import { Body } from '../Body';
import { FilterOption, SortOption } from '../../../Engine/Utilities/List';

export class Womb implements ISerializable<Womb> {
    public static readonly LargestPregnancy: SortOption<Womb> = (a: Womb, b: Womb) => {
        return (a.isPregnant() ? a.pregnancy.incubation : 0) - (b.isPregnant() ? b.pregnancy.incubation : 0);
    }

    public static readonly SmallestPregnancy: SortOption<Womb> = (a: Womb, b: Womb) => {
        return (b.isPregnant() ? b.pregnancy.incubation : 0) - (a.isPregnant() ? a.pregnancy.incubation : 0);
    }

    public static readonly Pregnant: FilterOption<Womb> = (a: Womb) => {
        return a.isPregnant();
    }

    public static readonly NotPregnant: FilterOption<Womb> = (a: Womb) => {
        return !a.isPregnant();
    }

    public static PregnantWithType(type: PregnancyType): FilterOption<Womb> {
        return (a: Womb) => {
            return a.isPregnant() && a.pregnancy.type === type;
        };
    }

    protected currentPregnancy: Pregnancy;
    protected pregEvent: IPregnancyEvent;
    protected body: Body;
    public constructor(body: Body) {
        this.body = body;
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
        return !this.pregnancy && this.body.vaginas.length > 0;
    }

    private removeHeat() {
        CView.text("\nYou calm down a bit and realize you no longer fantasize about getting fucked constantly.  It seems your heat has ended.\n");
    }

    // fertility must be >= random(0-beat)
    // If guarantee then override any contraceptives and guarantee fertilization
    public knockUp(pregnancy: Pregnancy, virility: number = 100, guarantee?: boolean): void {
        // Contraceptives cancel!
        if (guarantee || this.canKnockUp()) {
            this.removeHeat();

            // If unpregnant and fertility wins out:
            if (guarantee || this.body.fertility > randInt(virility)) {
                this.currentPregnancy = pregnancy;
                // this.pregEvent = PregnancyEventFactory.create(pregnancy.type);
            }

            // Chance for eggs fertilization - ovi elixir and imps excluded!
            if (pregnancy.type !== PregnancyType.IMP && pregnancy.type !== PregnancyType.OVIELIXIR_EGGS && pregnancy.type !== PregnancyType.ANEMONE &&
                (guarantee || this.body.fertility > randInt(virility)))
                this.body.ovipositor.fertilizeEggs();
        }
    }

    public canBirth(): boolean {
        return this.pregEvent.canBirth(this.body, this.currentPregnancy.incubation);
    }

    public birth() {
        if (this.body.vaginas.length <= 0) {
            // if (this.creature. instanceof Player)
            //     CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            this.body.vaginas.add(new Vagina());
        }
        this.pregEvent.birthScene(this.body);
        this.currentPregnancy = undefined;
    }

    public clear() {
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

    public serialize(): object | void {
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
