import Character from './Character';
import GenderDescriptor from './Descriptors/GenderDescriptor';

export default class Description {
    private character: Character;
    private subjective: string;
    private objective: string;
    private possessive: string;
    private article: string;
    public readonly short: string;
    public readonly long: string;
    public readonly plural: boolean;

    public constructor(character: Character, short: string = "", long: string = "", plural: boolean = false, article: string = "a") {
        this.character = character;
        this.short = short;
        this.long = long;
        this.plural = plural;
        this.update();
    }

    public update() {
        this.subjective = this.plural ? "they" : GenderDescriptor.mfn(this.character.gender, "he", "she", "it");
        this.objective = this.plural ? "them" : GenderDescriptor.mfn(this.character.gender, "him", "her", "it");
        this.possessive = this.plural ? "their" : GenderDescriptor.mfn(this.character.gender, "his", "her", "its");
        if (this.article == ("a" || "the"))
            this.article = this.plural ? "the" : "a";
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
}