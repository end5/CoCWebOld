import ButtPregnancyEventLib from './ButtPregnancyEventLib';
import IPregnancyEvent from './IPregnancyEvent';
import { PregnancyType } from './Pregnancy';

export default class ButtPregnancyEventFactory {
    private static buttPregEventLib: ButtPregnancyEventLib;

    public constructor() {
        if (!ButtPregnancyEventFactory.buttPregEventLib)
            ButtPregnancyEventFactory.buttPregEventLib = new ButtPregnancyEventLib();
    }

    public static create(type: PregnancyType): IPregnancyEvent {
        return ButtPregnancyEventFactory.buttPregEventLib.get(type);
    }
}
