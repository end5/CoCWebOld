import { Creature } from './Creature';

export enum Gender {
    NONE, MALE, FEMALE, HERM
}

export class GenderIdentity {
    private creatureGender: Gender;
    public forced: boolean;
    private creature: Creature;
    public constructor(creature: Creature) {
        this.creature = creature;
    }

    private update() {
        if (this.creature.torso.cocks.count > 0 && this.creature.torso.vaginas.count > 0)
            this.creatureGender = Gender.HERM;
        else if (this.creature.torso.cocks.count > 0)
            this.creatureGender = Gender.MALE;
        else if (this.creature.torso.vaginas.count > 0)
            this.creatureGender = Gender.FEMALE;
        else
            this.creatureGender = Gender.NONE;
    }

    public get gender(): Gender {
        if (this.forced)
            return this.creatureGender;
        else {
            this.update();
            return this.creatureGender;
        }
    }

    public set gender(gender: Gender) {
        this.forced = true;
        this.creatureGender = gender;
    }

    public reset() {
        this.forced = false;
    }
}
