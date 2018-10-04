import { IPregnancyEvent } from './IPregnancyEvent';
import { Pregnancy } from './Pregnancy';
import { ISerializable } from '../../../Engine/Utilities/ISerializable';

export class FlagWomb implements ISerializable<FlagWomb> {
    protected currentPregnancy: Pregnancy;
    protected pregEvent: IPregnancyEvent;

    public get pregnancy(): Pregnancy {
        return this.currentPregnancy;
    }

    public isPregnant(): boolean {
        return !!this.pregnancy;
    }

    public knockUp(pregnancy: Pregnancy): void {
        this.currentPregnancy = pregnancy;
    }

    public birth() {
        this.currentPregnancy = undefined;
    }

    public update() {
        if (this.currentPregnancy) {
            this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
            if (this.currentPregnancy.incubation === 0) {
                this.birth();
            }
        }
    }

    public serialize(): object | undefined {
        if (this.currentPregnancy)
            return {
                currentPregnancy: this.currentPregnancy
            };
    }

    public deserialize(saveObject: FlagWomb) {
        if (saveObject) {
            this.currentPregnancy = new Pregnancy();
            this.currentPregnancy.deserialize(saveObject.pregnancy);
        }
    }
}
