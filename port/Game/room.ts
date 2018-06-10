/**
 * ...
 * @author Gedan
 */
export class room {
    public RoomName: string; // Index name
    public RoomDisplayName: string; // Header text

    public NorthExit: string;
    public NorthExitCondition: Function;

    public EastExit: string;
    public EastExitCondition: Function;

    public SouthExit: string;
    public SouthExitCondition: Function;

    public WestExit: string;
    public WestExitCondition: Function;

    public RoomFunction: Function;
}
