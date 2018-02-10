import Character from '../../Character/Character';

export default interface CombatAction {
    /**
     * The name of the Combat Action.
     */
    name: string;

    /**
     * The reason the Combat Action cannot be used.
     */
    reasonCannotUse: string;

    /**
     * Can the character use the action. Invisible otherwise.
     */
    isPossible(character: Character): boolean;

    /**
     * Can the character use the action on the other character. Disabled otherwise.
     */
    canUse(character: Character, enemy?: Character): boolean;

    /**
     * Call for using the Combat Action.
     */
    use(character: Character, enemy?: Character);
}
