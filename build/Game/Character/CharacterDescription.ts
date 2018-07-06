import { Character } from './Character';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Desc } from '../Descriptors/Descriptors';

export class CharacterDescription implements ISerializable<CharacterDescription> {
    private character: Character;
    private subjective: string;
    private objective: string;
    private possessive: string;
    private article: string;
    private defaultShort: string;
    private otherShort: string;
    private longDesc: string;
    private isPlural: boolean;

    public constructor(character: Character, short: string = "", long: string = "", plural: boolean = false, article: string = "a") {
        this.character = character;
        this.article = article;
        this.defaultShort = short;
        this.otherShort = "";
        this.longDesc = long;
        this.isPlural = plural;
        this.update();
    }

    public update() {
        this.subjective = this.plural ? "they" : Desc.Gender.mfn(this.character.gender, "he", "she", "it");
        this.objective = this.plural ? "them" : Desc.Gender.mfn(this.character.gender, "him", "her", "it");
        this.possessive = this.plural ? "their" : Desc.Gender.mfn(this.character.gender, "his", "her", "its");
        if (this.article === ("a" || "the"))
            this.article = this.plural ? "the" : "a";
    }

    public get name(): string {
        return this.otherShort !== "" ? this.otherShort : this.defaultShort;
    }

    public set name(value: string) {
        this.otherShort = value;
    }

    public get short(): string {
        return this.otherShort !== "" ? this.otherShort : this.defaultShort;
    }

    public get long(): string {
        return this.longDesc;
    }

    public get plural(): boolean {
        return this.isPlural;
    }

    /**
     * Returns subjective pronoun. (ie. he/she/it/they) - pronoun1
     */
    public get subjectivePronoun(): string {
        return this.subjective;
    }

    /**
     * Returns objective pronoun. (ie. him/her/it/them) - pronoun2
     */
    public get objectivePronoun(): string {
        return this.objective;
    }

    /**
     * Returns possessive pronoun. (ie. his/her/its/their) - pronoun3
     */
    public get possessivePronoun(): string {
        return this.possessive;
    }

    /**
     * Returns "a" if singular, "the" if plural.
     */
    public get a(): string {
        return this.article;
    }

    /**
     * Returns "A" if singular, "The" if plural.
     */
    public get capitalA(): string {
        if (this.article.length === 0) return "";
        return this.article.charAt(0).toUpperCase() + this.article.substr(1);
    }

    public serialize(): object | undefined {
        return {
            // subjective: this.subjective,
            // objective: this.objective,
            // possessive: this.possessive,
            // article: this.article,
            defaultShort: this.short,
            // longDesc: this.long,
            // isPlural: this.plural
        };
    }

    public deserialize(saveObject: CharacterDescription) {
        // this.subjective = saveObject.subjective;
        // this.objective = saveObject.objective;
        // this.possessive = saveObject.possessive;
        // this.article = saveObject.article;
        this.defaultShort = saveObject.defaultShort;
        // this.longDesc = saveObject.longDesc;
        // this.isPlural = saveObject.isPlural;
    }
}
