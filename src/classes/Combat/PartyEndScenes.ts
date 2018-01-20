import CharacterHolder from './CharacterHolder';
import { DefeatType } from './DefeatEvent';
import Party from './Party';
import Character from '../Character/Character';

export default abstract class PartyEndScenes extends CharacterHolder {
    /**
     * The default number of hours that pass when losing a fight.
     */
    public static defaultLostFightHours = 8;

    /**
     * Called before the victorious party scene function call. Used for any logic that needs to be done before
     * victorious party scene. (ie. worm infest)
     * @param defeatedParty
     * @param victoriousParty
     */
    protected abstract beforeVictoriousPartyScene(defeatedParty: Party, victoriousParty: Party): void;

    /**
     * Calls after combat is over. Used for displaying victory text.
     * @param defeatedParty
     * @param victoriousParty
     */
    protected abstract victoryScene(defeatedParty: Party, victoriousParty: Party): void;

    public victory(defeatedParty: Party, victoriousParty: Party): void {
        this.beforeVictoriousPartyScene(defeatedParty, victoriousParty);
        this.victoryScene(defeatedParty, victoriousParty);
    }

    /**
     * Used if you want to describe something happening after victorious party scene.
     * @param loseType
     * @param enemy
     */
    public abstract defeatAftermath(defeatedParty: Party, victoriousParty: Party): void;

    public abstract victoryAftermath(defeatedParty: Party, victoriousParty: Party): void;
}
