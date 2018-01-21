import BreastRow from '../Body/BreastRow';
import { Gender } from '../Body/Creature';
import Character from '../Character/Character';

export default class GenderDescriptor {
    public static genderText(gender: Gender, male: string = "man", female: string = "woman", futa: string = "herm", eunuch: string = "eunuch"): string {
        if (gender === Gender.HERM)
            return futa;
        else if (gender === Gender.MALE)
            return male;
        else if (gender === Gender.FEMALE)
            return female;
        else if (gender === Gender.NONE)
            return eunuch;
    }

    public static mfn(gender: Gender, male: string, female: string, neuter: string): string {
        if (gender === Gender.NONE)
            return neuter;
        else if (gender === Gender.FEMALE)
            return female;
        else if (gender === Gender.MALE)
            return male;
    }

    public static mf(character: Character, male: string, female: string) {
        if (character.torso.cocks.count > 0) {
            if (character.torso.vaginas.count > 0)
                return female;
            else
                return male;
        }
        else {
            if (character.torso.vaginas.count > 0)
                return female;
            else {
                if (character.torso.chest.filter(BreastRow.FemaleBreasts).length > 0)
                    return female;
                else
                    return male;
            }
        }
    }

    public static manWomanFutaEunuch(gender: Gender, caps: boolean = false): string {
        if (gender === Gender.HERM) {
            if (caps)
                return "Futa";
            else
                return "futa";
        }
        else if (gender === Gender.MALE) {
            if (caps)
                return "Man";
            else
                return "man";
        }
        else if (gender === Gender.FEMALE) {
            if (caps)
                return "Woman";
            else
                return "woman";
        }
        else if (gender === Gender.NONE) {
            if (caps)
                return "Eunuch";
            else
                return "eunuch";
        }
    }

    public static guyGirl(gender: Gender, caps: boolean = false): string {
        if (gender === Gender.HERM || gender === Gender.FEMALE) {
            if (caps)
                return "Girl";
            else
                return "girl";
        }
        else if (gender === Gender.MALE || gender === Gender.NONE) {
            if (caps)
                return "Guy";
            else
                return "guy";
        }
    }

    public static boyGirl(gender: Gender, caps: boolean = false): string {
        if (gender === Gender.HERM || gender === Gender.FEMALE) {
            if (caps)
                return "Girl";
            else
                return "girl";
        }
        else if (gender === Gender.MALE || gender === Gender.NONE) {
            if (caps)
                return "Boy";
            else
                return "boy";
        }
    }

    public static maleFemale(gender: Gender, caps: boolean = false): string {
        if (gender === Gender.HERM || gender === Gender.FEMALE) {
            if (caps)
                return "Female";
            else
                return "female";
        }
        else if (gender === Gender.MALE || gender === Gender.NONE) {
            if (caps)
                return "Male";
            else
                return "male";
        }
    }

    public static sirMadam(gender: Gender, caps: boolean = false): string {
        if (gender === Gender.HERM || gender === Gender.FEMALE) {
            if (caps)
                return "Madam";
            else
                return "madam";
        }
        else if (gender === Gender.MALE || gender === Gender.NONE) {
            if (caps)
                return "Sir";
            else
                return "Sir";
        }
    }
}
