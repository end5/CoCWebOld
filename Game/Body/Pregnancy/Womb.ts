import { IPregnancyEvent } from './IPregnancyEvent';
import { Pregnancy, PregnancyType } from './Pregnancy';
import { ISerializable } from '../../../Engine/Utilities/ISerializable';
import { randInt } from '../../../Engine/Utilities/SMath';
import { CView } from '../../../Engine/Display/ContentView';
import { Body } from '../Body';
import { FilterOption, SortOption } from '../../../Engine/Utilities/List';

export class Womb implements ISerializable<Womb> {
    public static readonly LargestPregnancy: SortOption<Womb> = (a: Womb, b: Womb) => {
        return (a.pregnancy ? a.pregnancy.incubation : 0) - (b.pregnancy ? b.pregnancy.incubation : 0);
    }

    public static readonly SmallestPregnancy: SortOption<Womb> = (a: Womb, b: Womb) => {
        return (b.pregnancy ? b.pregnancy.incubation : 0) - (a.pregnancy ? a.pregnancy.incubation : 0);
    }

    public static readonly Pregnant: FilterOption<Womb> = (a: Womb) => {
        return a.isPregnant();
    }

    public static readonly NotPregnant: FilterOption<Womb> = (a: Womb) => {
        return !a.isPregnant();
    }

    public static PregnantWithType(type: PregnancyType): FilterOption<Womb> {
        return (a: Womb) => {
            return !!a.pregnancy && a.pregnancy.type === type;
        };
    }

    protected currentPregnancy: Pregnancy | undefined;
    protected pregEvent: IPregnancyEvent | undefined;
    protected body: Body;
    public constructor(body: Body) {
        this.body = body;
    }

    public get pregnancy(): Pregnancy | undefined {
        return this.currentPregnancy;
    }

    public isPregnant(): boolean {
        return !!this.pregnancy;
    }

    public canKnockUp(): boolean {
        return !this.pregnancy && this.body.vaginas.length > 0;
    }

    private removeHeat() {
        CView.text("\nYou calm down a bit and realize you no longer fantasize about getting fucked constantly.  It seems your heat has ended.\n");
    }

    public knockUp(pregnancy: Pregnancy, event: IPregnancyEvent, virility: number = 100, guarantee?: boolean): void {
        if (guarantee || this.canKnockUp()) {
            this.removeHeat();

            if (guarantee || this.body.fertility > randInt(virility)) {
                this.currentPregnancy = pregnancy;
                this.pregEvent = event;
            }

            if (pregnancy.type !== PregnancyType.IMP && pregnancy.type !== PregnancyType.OVIELIXIR_EGGS && pregnancy.type !== PregnancyType.ANEMONE &&
                (guarantee || this.body.fertility > randInt(virility)))
                this.body.ovipositor.fertilizeEggs();
        }
    }

    public clear() {
        this.currentPregnancy = undefined;
    }

    public update() {
        if (this.currentPregnancy) {
            this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
        }
    }

    public serialize(): object | void {
        if (this.currentPregnancy)
            return {
                currentPregnancy: this.currentPregnancy
            };
    }

    public deserialize(saveObject: Womb | undefined) {
        if (saveObject && saveObject.pregnancy) {
            this.currentPregnancy = new Pregnancy();
            this.currentPregnancy.deserialize(saveObject.pregnancy);
        }
    }
}
