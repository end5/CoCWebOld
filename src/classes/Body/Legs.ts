﻿import ISerializable from '../Utilities/ISerializable';

export enum LegType {
    HUMAN, HOOFED, DOG, NAGA, CENTAUR, DEMONIC_HIGH_HEELS, DEMONIC_CLAWS, BEE,
    GOO, CAT, LIZARD, PONY, BUNNY, HARPY, KANGAROO, CHITINOUS_SPIDER_LEGS,
    DRIDER_LOWER_BODY, FOX, DRAGON, RACCOON, FERRET
}

export default class Legs implements ISerializable<Legs> {
    public type: LegType = LegType.HUMAN;

    public isBiped(): boolean {
        // Naga/Centaur
        if (this.type === LegType.NAGA || this.type === LegType.CENTAUR)
            return false;
        if (this.type === LegType.GOO || this.type === LegType.PONY)
            return false;
        return true;
    }

    public isNaga(): boolean {
        if (this.type === LegType.NAGA)
            return true;
        return false;
    }

    public isTaur(): boolean {
        if (this.type === LegType.CENTAUR || this.type === LegType.PONY)
            return true;
        return false;
    }

    public isDrider(): boolean {
        return (this.type === LegType.DRIDER_LOWER_BODY);
    }

    public isGoo(): boolean {
        if (this.type === LegType.GOO)
            return true;
        return false;
    }

    public serialize(): string {
        return JSON.stringify({
            type: this.type
        });
    }

    public deserialize(saveObject: Legs) {
        this.type = saveObject.type;
    }
}
