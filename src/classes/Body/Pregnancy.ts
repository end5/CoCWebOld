//Pregancy types. Both butt and normal. Each type represents the father of this baby.
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

export enum PregnancyStatus {
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
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_BEE:number              =   2;
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_DRIDER:number           =   3;
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_SANDTRAP_FERTILE:number =   4;
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_SANDTRAP:number         =   5; //Sandtrap did not have fertilized eggs
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

class PregnancyEvent {
    private _pregnancyStages: number[];
    private _pregnancyType: PregnancyType;
    public constructor(pregType: PregnancyType, pregStages: number[]) {
        this._pregnancyType = pregType;
        this._pregnancyStages = pregStages;
    }

    public get pregnancyType(): PregnancyType {
        return this._pregnancyType;
    }

    public get pregnancyStages(): number[] {
        return this._pregnancyStages;
    }
}

export default class Pregnancy {
    private _pregnancyType: PregnancyType;
    private _pregnancyIncubation: IncubationTime;
    private _pregnancyEventList: PregnancyEvent[];

    //All the flags are passed through the constructor so that they can be different in every class that uses PregnancyType but the pregnancy code remains the same
    public constructor() {
        this._pregnancyType = 0;
        this._pregnancyIncubation = 0;
        this._pregnancyEventList = [];
    }

    public get pregType(): PregnancyType {
        return this._pregnancyType;
    }

    public get incubation(): IncubationTime {
        return this._pregnancyIncubation;
    }

    public get isPregnant(): boolean {
        return this.pregType != 0;
    } //At birth the incubation can be zero so a check vs. type is safer

	/* Using this adds a series of events which happen during the pregnancy. They must be added in descending order (ex. 500, 450, 350, 225, 100, 25)
		to work properly. For NPCs who have multiple pregnancy types each type has its own set of events. Events can be used to see how far along the NPC
		is in her pregnancy with the event property. They can also be checked using the eventTriggered() function. This checks to see which was the latest event
		the player noticed. The eventTriggered() only triggers once per event per pregnancy. */

    public addPregnancyEvent(pregEvent: PregnancyEvent) {
        this._pregnancyEventList.push(pregEvent);
    }

    public knockUp(newPregType: PregnancyType, newPregIncubation: IncubationTime = 0): void {
        if (!this.isPregnant)
            this.knockUpForce(newPregType, newPregIncubation);
    }

    public knockUpForce(newPregType: PregnancyType, newPregIncubation: IncubationTime = 0): void {
        if (newPregType != 0)
            newPregType = (kGAMECLASS.flags[this._pregnancyType] & PREG_NOTICE_MASK) + newPregType;
        //If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
        kGAMECLASS.flags[this._pregnancyType] = newPregType;
        kGAMECLASS.flags[this._pregnancyIncubation] = (newPregType == 0 ? 0 : newPregIncubation); //Won't allow incubation time without pregnancy type
    }

    //The containing class is responsible for calling pregnancyAdvance, usually once per timeChange()
    public pregnancyAdvance(): void //Separate so it can be called more often than timeChange if neccessary
    {
        if (this.incubation != 0) {
            kGAMECLASS.flags[this._pregnancyIncubation]--;
            if (kGAMECLASS.flags[this._pregnancyIncubation] < 0)
                kGAMECLASS.flags[this._pregnancyIncubation] = 0;
        }
    }

	/* Many NPCs go through several events during their pregnancies. This returns the latest event the NPC qualifies for.
		When the NPC is not pregnant this always returns 0, when pregnant it will return at least 1. The further along the NPC is the larger the value. Each NPC
		is free to have as many event as desired. They must be added using the addPregnancyEventSet and are unique to each pregnancy type. */
    public get event(): number {
        let pregType: number = this.pregType;
        if (pregType == 0)
            return 0; //Not pregnant
        let incubationValue: number = this.incubation;
        for (let pregEvent of this._pregnancyEventList) {
            if (pregEvent.pregnancyType == pregType) {
                for (let index: number = 0; index < pregEvent.pregnancyStages.length; index++) {
                    if (incubationValue > pregEvent.pregnancyStages[index])
                        return index; //Will always find a value that is < incubationValue as last value is -1
                }
            }
        }
        return 1; //If there are no pregnancy events for this type of pregnancy then return 1
    }

    //Returns either zero - for no change - or the value of the new pregnancy event which the player has not yet noticed
    //This updates the noticed pregnancy event, so it only triggers once per event per pregnancy.
    public eventTriggered(): number {
        let currentStage: number = this.event;
        let lastNoticed: number = kGAMECLASS.flags[this._pregnancyType] & PREG_NOTICE_MASK;
        if (currentStage * 65536 == lastNoticed)
            return 0; //Player has already noticed this stage
        kGAMECLASS.flags[this._pregnancyType] = (kGAMECLASS.flags[this._pregnancyType] & PREG_TYPE_MASK) + (currentStage * 65536);
        //Strip off the old noticed value by ANDing with PREG_TYPE_MASK
        return currentStage;
    }

    public get size(): number {
        //This exists to provide consistency across different NPC's pregnancies. This is most useful when trying to write descriptions of different belly sizes
        //in threesomes, where the author might not be familiar with how the different pregnancy events relate to belly size.
        return PREG_NOT_PREGNANT;
    }
}
