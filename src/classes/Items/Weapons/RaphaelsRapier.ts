import Weapon from "./Weapon";
import Flags, { FlagEnum } from "../../Game/Flags";

export default class RaphaelsRapier extends Weapon {
    public constructor() {
        super("RRapier", "RRapier", "vulpine rapier", "Raphael's vulpine rapier", "slash", 8, 1000, "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you.");
    }

    public get attack(): number {
        return 8 + Flags.get(FlagEnum.RAPHAEL_RAPIER_TRANING) * 2;
    }
}

