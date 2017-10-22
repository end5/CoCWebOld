import Consumable from './Consumable';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export enum HairDyeType {
    Auburn,
    Black,
	Blonde,
	DarkBlue,
	Brown,
	Gray,
	Green,
	BrightOrange,
	NeonPink,
	Purple,
	Red,
	White
}

export default class HairDye extends Consumable {
    private type: HairDyeType;
    public constructor(type: HairDyeType) {
        switch (type) {
            case HairDyeType.Auburn:
                super("AuburnD", "AuburnD", "a vial of auburn hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.Black:
                super("Black D", "Black D", "a vial of black hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.Blonde:
                super("Blond D", "Blond D", "a vial of blonde hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.DarkBlue:
                super("BlueDye", "BlueDye", "a vial of blue hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.Brown:
                super("Brown D", "Brown D", "a vial of brown hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.Gray:
                super("GrayDye", "GrayDye", "a vial of gray hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.Green:
                super("Green D", "Green D", "a vial of green hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.BrightOrange:
                super("OrangDy", "OrangDy", "a vial of brilliant orange hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.NeonPink:
                super("PinkDye", "PinkDye", "a vial of bright pink hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.Purple:
                super("PurpDye", "PurpDye", "a vial of purple hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            case HairDyeType.Red:
                super("Red Dye", "Red Dye", "a vial of red hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
            default:
            case HairDyeType.White:
                super("WhiteDy", "WhiteDy", "a vial of white hair dye", HairDye.DefaultValue, "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
                break;
        }
        this.type = type;
    }

    private getColor(type: HairDyeType): string {
        switch (type) {
            case HairDyeType.Auburn:
                return "auburn";
            case HairDyeType.Black:
                return "black";
            case HairDyeType.Blonde:
                return "blonde";
            case HairDyeType.DarkBlue:
                return "dark blue";
            case HairDyeType.Brown:
                return "brown";
            case HairDyeType.Gray:
                return "gray";
            case HairDyeType.Green:
                return "green";
            case HairDyeType.BrightOrange:
                return "bright orange";
            case HairDyeType.NeonPink:
                return "neon pink";
            case HairDyeType.Purple:
                return "purple";
            case HairDyeType.Red:
                return "red";
            default:
            case HairDyeType.White:
                return "white";
        }
    }

    public use(player: Player) {
        if (player.upperBody.head.hairColor.indexOf("rubbery") != -1 || player.upperBody.head.hairColor.indexOf("latex-textured") != -1) {
            MainScreen.text("You massage the dye into your " + HeadDescriptor.describeHair(player) + " but the dye cannot penetrate the impermeable material your hair is composed of.", true);
            return;
        }
        if (player.upperBody.head.hairLength == 0) {
            MainScreen.text("You rub the dye into your bald head, but it has no effect.", true);
            return;
        }
        MainScreen.text("You rub the dye into your " + HeadDescriptor.describeHair(player) + ", then use a bucket of cool lakewater to rinse clean a few minutes later.  ", true);
        player.upperBody.head.hairColor = this.getColor(this.type);
        MainScreen.text("You now have " + HeadDescriptor.describeHair(player) + ".", false);
        if (player.stats.lust > 50) {
            MainScreen.text("\n\nThe cool water calms your urges somewhat, letting you think more clearly.", false);
            player.stats.lust += -15;
        }
    }
}