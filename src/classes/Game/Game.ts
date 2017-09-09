import Libraries from "./Libraries";
import Flags from "./Flags";

export default class Game {
    private static instance: object;
    public static libraries: Libraries;
    public static flags: Flags;

    public constructor() {
        let components: object = {};

        Game.libraries = new Libraries();
        Game.flags = new Flags();

        Game.instance = components;
    }
}