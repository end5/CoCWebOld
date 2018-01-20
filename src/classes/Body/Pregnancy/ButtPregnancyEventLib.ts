import IPregnancyEvent from './IPregnancyEvent';
import { PregnancyType } from './Pregnancy';
import PregEvents from '../../Player/PregnancyEvents/index.d';
import Dictionary from '../../Utilities/Dictionary';

export default class ButtPregnancyEventLib extends Dictionary<IPregnancyEvent> {
    public constructor() {
        super();
        this.set(PregnancyType.BEE_EGGS, new PregEvents.BeeButtPreg());
        this.set(PregnancyType.BUNNY, new PregEvents.BunnyButtPreg());
        this.set(PregnancyType.DRIDER_EGGS, new PregEvents.DriderButtPreg());
        this.set(PregnancyType.FROG_GIRL, new PregEvents.FrogGirlButtPreg());
        this.set(PregnancyType.SANDTRAP, new PregEvents.SandTrapButtPreg());
        this.set(PregnancyType.SATYR, new PregEvents.SatyrButtPreg());
        this.set(PregnancyType.SPIDER, new PregEvents.SpiderButtPreg());
    }
}
