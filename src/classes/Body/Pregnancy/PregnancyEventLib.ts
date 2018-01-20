import IPregnancyEvent from './IPregnancyEvent';
import { PregnancyType } from './Pregnancy';
import PregEvents from '../../Player/PregnancyEvents/index.d';
import Dictionary from '../../Utilities/Dictionary';

export default class PregnancyEventLib extends Dictionary<IPregnancyEvent> {
    public constructor() {
        super();
        this.set(PregnancyType.AMILY, new PregEvents.AmilyPreg());
        this.set(PregnancyType.ANEMONE, new PregEvents.AnemonePreg());
        this.set(PregnancyType.BASILISK, new PregEvents.BasiliskPreg());
        this.set(PregnancyType.BENOIT, new PregEvents.BenoitPreg());
        this.set(PregnancyType.BUNNY, new PregEvents.BunnyPreg());
        this.set(PregnancyType.CENTAUR, new PregEvents.CentaurPreg());
        this.set(PregnancyType.COTTON, new PregEvents.CottonPreg());
        this.set(PregnancyType.DRIDER_EGGS, new PregEvents.DriderPreg());
        this.set(PregnancyType.EMBER, new PregEvents.EmberPreg());
        this.set(PregnancyType.FAERIE, new PregEvents.FaeriePreg());
        this.set(PregnancyType.FROG_GIRL, new PregEvents.FrogGirlPreg());
        this.set(PregnancyType.GOO_GIRL, new PregEvents.GooGirlPreg());
        this.set(PregnancyType.HELL_HOUND, new PregEvents.HellhoundPreg());
        this.set(PregnancyType.IMP, new PregEvents.ImpPreg());
        this.set(PregnancyType.IZMA, new PregEvents.IzmaPreg());
        this.set(PregnancyType.MARBLE, new PregEvents.MarblePreg());
        this.set(PregnancyType.MINOTAUR, new PregEvents.MinotaurPreg());
        this.set(PregnancyType.MOUSE, new PregEvents.MousePreg());
        this.set(PregnancyType.OVIELIXIR_EGGS, new PregEvents.OvielixirEggsPreg());
        this.set(PregnancyType.SAND_WITCH, new PregEvents.SandWitchPreg());
        this.set(PregnancyType.SATYR, new PregEvents.SatyrPreg());
        this.set(PregnancyType.SPIDER, new PregEvents.SpiderPreg());
        this.set(PregnancyType.URTA, new PregEvents.UrtaPreg());
    }
}
