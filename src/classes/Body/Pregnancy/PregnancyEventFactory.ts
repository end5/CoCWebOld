import IPregnancyEvent from './IPregnancyEvent';
import { PregnancyType } from './Pregnancy';
import PregnancyEventLib from './PregnancyEventLib';

export default class PregnancyEventFactory {
    private static pregEventLib: PregnancyEventLib;

    public constructor() {
        if (!PregnancyEventFactory.pregEventLib)
            PregnancyEventFactory.pregEventLib = new PregnancyEventLib();
    }

    public static create(type: PregnancyType): IPregnancyEvent {
            return PregnancyEventFactory.pregEventLib.get(type);
    }
}
