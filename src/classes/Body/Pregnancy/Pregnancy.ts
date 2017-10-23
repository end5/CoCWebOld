import IPregnancyEvent from './IPregnancyEvent';
import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import { SaveInterface } from '../../SaveInterface';
import Creature from '../Creature';
import Vagina from '../Vagina';

export enum PregnancyType {
    IMP,
    MINOTAUR,
    MOUSE,
    OVIELIXIR_EGGS, //Also caused by Phoenixes apparently
    HELL_HOUND,
    CENTAUR,
    MARBLE,
    BUNNY,
    ANEMONE,
    AMILY,
    IZMA,
    SPIDER,
    BASILISK,
    DRIDER_EGGS,
    GOO_GIRL,
    EMBER,
    BENOIT,
    SATYR,
    COTTON,
    URTA,
    SAND_WITCH,
    FROG_GIRL,
    FAERIE, //Indicates you are carrying either a phouka or faerie baby. Which one is determined by the PREGNANCY_CORRUPTION flag
    PLAYER, //The player is the father. Will be used when an NPC is able to have children from multiple different fathers.
    BEE_EGGS,
    SANDTRAP_FERTILE,
    SANDTRAP,
    JOJO, //So we can track them separately from other mouse pregnancies
    KELT, //So we can track them separately from other centaur pregnancies
    TAOTH,
    GOO_STUFFED, //Used to fill the player's ass and/or vagina when Valeria has a goo girl take up residence. This prevents any other
    //form of pregnancy from taking hold. Does not respond to ovielixirs.
    WORM_STUFFED //Used to fill the player's vagina when the worms take up residence. This prevents any other form of
    //pregnancy from taking hold. Does not respond to ovielixirs.
}

export enum PregnancySize {
    NOT_PREGANT,        //The PREG_* consts are returned by the size function
    NO_SIGNS_UNKNOWN,   //NPC has conceived but doesn’t know she’s pregnant, no visible signs
    NO_SIGNS_KNOWN,     //NPC is in the first trimester, knows she’s pregnant
    START_BULGE,        //NPC is in the first trimester, belly is just starting to bulge
    SWOLLEN,            //NPC is in the second trimester, belly is small but definitely swollen
    SIZEABLE,           //NPC is in the second trimester, belly is now sizable
    BLATANT,            //NPC is in the third trimester, belly is blatantly bulging
    FULL_TERM,          //NPC is in the third trimester, belly is big as it will get for a normal pregnancy
    OVERDUE,            //NPC is overdue. Usually means a centaur baby, twins or some similar condition. Effectively looks 10 months pregnant
    VERY_OVERDUE        //NPC is very overdue. Probably triplets or more. Effectively looks 11 months pregnant
}

export enum IncubationTime {
    IMP = 432, //Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies
    MINOTAUR = 432,
    MOUSE = 350,
    OVIELIXIR_EGGS = 50,
    HELL_HOUND = 352,
    CENTAUR = 420,
    MARBLE = 368,
    BUNNY_BABY = 200,
    BUNNY_EGGS = 808, //High time indicates neon egg pregnancy
    ANEMONE = 256,
    IZMA = 300,
    SPIDER = 400,
    BASILISK = 250,
    DRIDER = 400,
    GOO_GIRL = 85,
    EMBER = 336,
    SATYR = 160,
    COTTON = 350,
    URTA = 515,
    SAND_WITCH = 360,
    FROG_GIRL = 30,
    FAERIE = 200,
    BEE = 48,
    SANDTRAP = 42,
    HARPY = 168,
    SHIELA = 72,
    SALAMANDER = 336
}

export default class Pregnancy implements SaveInterface {
    public type: PregnancyType;
    public incubation: IncubationTime;
    protected event: IPregnancyEvent;

    public constructor(pregType: PregnancyType, incubation: number, pregnancyEvent: IPregnancyEvent) {
        this.type = pregType;
        this.incubation = incubation;
        this.event = pregnancyEvent;
    }

    public incubationDisplay(creature: Creature) {
        this.event.incubationDisplay(creature, this.incubation);
    }

    public canBirth(creature: Creature) {
        this.event.canBirth(creature, this.incubation);
    }

    public birth(creature: Creature) {
        this.event.birth(creature);
    }

    public saveKey: string = "Pregnancy";
    public save(): object {
        return {
            "type": this.type,
            "incubation": this.incubation,
            "event": this.event
        };
    }
    public load(saveObject: object) {
        this.type = saveObject["type"];
        this.incubation = saveObject["incubation"];
        this.event = saveObject["event"];
    }
}
