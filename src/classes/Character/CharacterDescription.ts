import Character from './Character';
import GenderDescriptor from '../Descriptors/GenderDescriptor';
import { SerializeInterface } from '../SerializeInterface';

export default class Description implements SerializeInterface {
    private character: Character;
    private subjective: string;
    private objective: string;
    private possessive: string;
    private article: string;
    private shortDesc: string;
    private longDesc: string;
    private isPlural: boolean;

    public constructor(character: Character, short: string = "", long: string = "", plural: boolean = false, article: string = "a") {
        this.character = character;
        this.shortDesc = short;
        this.longDesc = long;
        this.isPlural = plural;
        this.update();
    }

    public update() {
        this.subjective = this.plural ? "they" : GenderDescriptor.mfn(this.character.gender, "he", "she", "it");
        this.objective = this.plural ? "them" : GenderDescriptor.mfn(this.character.gender, "him", "her", "it");
        this.possessive = this.plural ? "their" : GenderDescriptor.mfn(this.character.gender, "his", "her", "its");
        if (this.article == ("a" || "the"))
            this.article = this.plural ? "the" : "a";
    }

    public get short(): string {
        return this.short;
    }

    public get long(): string {
        return this.long;
    }

    public get plural(): boolean {
        return this.plural;
    }

    /**
     * Returns subjective pronoun. (ie. he/she/it/they)
     */
    public get subjectivePronoun(): string {
        return this.subjective;
    }

    /**
     * Returns objective pronoun. (ie. him/her/it/them)
     */
    public get objectivePronoun(): string {
        return this.objective;
    }

    /**
     * Returns possessive pronoun. (ie. his/hers/its/theirs)
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
        if (this.article.length == 0) return "";
        return this.article.charAt(0).toUpperCase() + this.article.substr(1);
    }

    serialKey: string = "Description";
    serialize(): string {
        return JSON.stringify({
            "subjective": this.subjective,
            "objective": this.objective,
            "possessive": this.possessive,
            "article": this.article,
            "shortDesc": this.short,
            "longDesc": this.long,
            "isPlural": this.plural
        });
    }
    deserialize(saveObject: object) {
        this.subjective = saveObject["subjective"];
        this.objective = saveObject["objective"];
        this.possessive = saveObject["possessive"];
        this.article = saveObject["article"];
        this.shortDesc = saveObject["shortDesc"];
        this.longDesc = saveObject["longDesc"];
        this.isPlural = saveObject["isPlural"];
    }
}