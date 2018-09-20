import { Creature } from './Creature';

export enum Gender {
    NONE, MALE, FEMALE, HERM
}

export class GenderIdentity {
    private sex: Gender;
    private forced: boolean;
    private preferredGender: Gender;
    private creature: Creature;
    public constructor(creature: Creature) {
        this.creature = creature;
    }

    private update() {
        if (this.creature.body.cocks.length > 0 && this.creature.body.vaginas.length > 0)
            this.sex = Gender.HERM;
        else if (this.creature.body.cocks.length > 0)
            this.sex = Gender.MALE;
        else if (this.creature.body.vaginas.length > 0)
            this.sex = Gender.FEMALE;
        else
            this.sex = Gender.NONE;
    }

    public get preference(): Gender {
        if (this.forced)
            return this.preferredGender;
        else {
            this.update();
            return this.preferredGender;
        }
    }

    public set preference(gender: Gender) {
        this.forced = gender === undefined ? false : true;
        this.preferredGender = gender;
    }

    public get gender(): Gender {
        this.update();
        return this.sex;
    }

    public reset() {
        this.forced = false;
    }
}
