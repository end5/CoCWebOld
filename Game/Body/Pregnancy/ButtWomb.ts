import { Pregnancy } from './Pregnancy';
import { Womb } from './Womb';
import { randInt } from '../../../Engine/Utilities/SMath';

export class ButtWomb extends Womb {
    public canKnockUp(): boolean {
        return !this.pregnancy;
    }

    // fertility must be >= random(0-beat)
    // If arg == 1 then override any contraceptives and guarantee fertilization
    public knockUp(pregnancy: Pregnancy, virility: number = 100, guarantee: boolean = false): void {
        // Contraceptives cancel!
        if (guarantee || this.canKnockUp()) {
            // If unpregnant and fertility wins out:
            if (guarantee || this.body.fertility > randInt(virility)) {
                this.currentPregnancy = pregnancy;
                // this.pregEvent = ButtPregnancyEventFactory.create(pregnancy.type);
            }
        }
    }

    public birth() {
        this.pregEvent.birthScene(this.body);
        this.currentPregnancy = undefined;
    }
}
