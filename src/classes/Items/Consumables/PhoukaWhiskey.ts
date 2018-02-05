import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class PhoukaWhiskey extends Consumable {
    public constructor() {
        super(ConsumableName.PhoukaWhiskey, new ItemDesc("Ph. Whiskey", "a small bottle of whiskey", "A small, corked glass bottle with a dark amber liquid inside.  The whiskey smells strongly of peat."), 20);
    }

    public canUse(player: Player): boolean {
        switch (this.phoukaWhiskeyAcceptable(player)) {
            case -4:
                DisplayText("You stare at the bottle for a moment, but decide not to risk harming one of the children growing inside you.\n\n");
                return false;
            case -3:
                DisplayText("You stare at the bottle for a moment, but decide not to risk harming either of the children growing inside you.\n\n");
                return false;
            case -2:
                DisplayText("You stare at the bottle for a moment, but decide not to risk harming the child growing inside your colon.\n\n");
                return false;
            case -1:
                DisplayText("You stare at the bottle for a moment, but decide not to risk harming the child growing inside your womb.\n\n");
                return false;
            default:
        }
        return true; // Zero and up will return true
    }

    public use(player: Player) {
        player.slimeFeed();
        switch (this.phoukaWhiskeyDrink(player)) {
            case 0: // Player isn't pregnant
                DisplayText("You uncork the bottle and drink some whiskey, hoping it will let you relax for a while.\n\nIt's strong stuff and afterwards you worry a bit less about the future.  Surely things will right themselves in the end.");
                player.stats.cor += Utils.rand(2) + 1; // These gains are permanent
                player.stats.lust += Utils.rand(8) + 1;
                break;
            case 1: // Child is a phouka or satyr, loves alcohol
                DisplayText("You uncork the bottle and drink some whiskey, hoping it will help with the gnawing hunger for alcohol you've had since this baby started growing inside you.\n\nYou down the booze in one shot and a wave of contentment washes over you.  It seems your passenger enjoyed the meal.");
                break;
            case 2: // Child is a faerie but will become a phouka with this drink
                DisplayText("At first you feel your baby struggle against the whiskey, then it seems to grow content and enjoy it.");
                break;
            case 3: // Child is a faerie, hates phouka whiskey
                DisplayText("You feel queasy and want to throw up.  There's a pain in your belly and you realize the baby you're carrying didn't like that at all.");
        }
        Flags.list[FlagEnum.PREGNANCY_CORRUPTION]++; // Faerie or phouka babies become more corrupted, no effect if the player is not pregnant or on other types of babies
        this.phoukaWhiskeyAddStatus(player);
    }

    public phoukaWhiskeyAcceptable(player: Player): number {
        // This function provides a single common test that can be used both by this class and the PhoukaScene class
        // Returns:	0 = canUse (not pregnant), 1 = canUse (single pregnancy, womb), 2 = canUse (single pregnancy, colon), 3 = canUse (double pregnancy, both OK),
        // 			-1 = No (single pregnancy, womb), -2 = No (single pregnancy, colon), -3 = No (double pregnancy, both not OK), -4 = No (double pregnancy, one OK, one not)
        if (!player.pregnancy.womb.isPregnant()) {
            if (!player.pregnancy.buttWomb.isPregnant()) return 0; // No baby. Simplest, most common case
            else if (player.pregnancy.buttWomb.isPregnantWith(PregnancyType.SATYR)) return 2;
            return -2;
        }
        if (!player.torso.butt) { // Single pregnancy, carried in the womb
            if (player.pregnancy.womb.isPregnantWith(PregnancyType.SATYR)) return 1;
            if (player.pregnancy.womb.isPregnantWith(PregnancyType.FAERIE)) return 1;
            return -1;
        }
        // Double pregnancy
        const wombBabyLikesAlcohol = (player.pregnancy.womb.isPregnantWith(PregnancyType.SATYR) || player.pregnancy.womb.isPregnantWith(PregnancyType.FAERIE));
        const colonBabyLikesAlcohol = player.pregnancy.buttWomb.isPregnantWith(PregnancyType.SATYR);
        if (wombBabyLikesAlcohol && colonBabyLikesAlcohol) return 3;
        if (!wombBabyLikesAlcohol && !colonBabyLikesAlcohol) return -3;
        return -4;
    }

    public phoukaWhiskeyDrink(player: Player): number {
        // This function provides a single common test that can be used both by this class and the PhoukaScene class
        // Returns:	0 = Player is not pregnant, 1 = Player is pregnant with a satyr or phouka, 2 = Player is pregnant with a faerie that will become a phouka with this drink,
        // 			3 = Player is pregnant with a faerie that will remain a faerie after this drink
        if (!player.pregnancy.womb.isPregnant() && !player.pregnancy.buttWomb.isPregnant()) return 0;
        if (player.pregnancy.womb.isPregnantWith(PregnancyType.FAERIE)) {
            if (Flags.list[FlagEnum.PREGNANCY_CORRUPTION] === 0) return 2;
            if (Flags.list[FlagEnum.PREGNANCY_CORRUPTION] < 0) return 3;
        }
        return 1; // Pregnancy has to be either a satyr or a phouka
    }

    public phoukaWhiskeyAddStatus(player: Player) {
        const libidoChange: number = (player.stats.lib + 25 > 100 ? 100 - player.stats.lib : 25);
        const sensChange: number = (player.stats.sens < 10 ? player.stats.sens : 10);
        const speedChange: number = (player.stats.spe < 20 ? player.stats.spe : 20);
        const intChange: number = (player.stats.int < 20 ? player.stats.int : 20);
        if (player.statusAffects.has(StatusAffectType.PhoukaWhiskeyAffect)) {
            const drinksSoFar: number = player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value2;
            if (drinksSoFar < 4)
                player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value1 = 8 - (2 * drinksSoFar);
            else
                player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value1 = 1; // Always get at least one more hour of drunkenness
            player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value2 = 1;
            player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value3 = 256 * libidoChange + sensChange;
            player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value4 = 256 * speedChange + intChange;
            DisplayText("\n\nOh, it tastes so good.  This stuff just slides down your throat.");
            player.stats.lib += libidoChange;
            player.stats.sens -= sensChange;
            player.stats.spe -= speedChange;
            player.stats.int -= intChange;
        }
        else { // First time
            player.statusAffects.add(StatusAffectType.PhoukaWhiskeyAffect, 8, 1, 256 * libidoChange + sensChange, 256 * speedChange + intChange);
            // The four stats we’re affecting get paired together to save space. This way we don’t need a second StatusAffect to store more info.
            player.stats.lib += libidoChange;
            player.stats.sens -= sensChange;
            player.stats.spe -= speedChange;
            player.stats.int -= intChange;
        }
    }

    public phoukaWhiskeyExpires(player: Player) {
        const numDrunk: number = player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value2;
        const libidoSensCombined: number = player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value3;
        const intSpeedCombined: number = player.statusAffects.get(StatusAffectType.PhoukaWhiskeyAffect).value4;

        const sensChange: number = libidoSensCombined & 255;
        const libidoChange: number = (libidoSensCombined - sensChange) / 256;
        const intChange: number = intSpeedCombined & 255;
        const speedChange: number = (intSpeedCombined - intChange) / 256;
        // Get back all the stats you lost
        player.stats.lib -= libidoChange;
        player.stats.sens += sensChange;
        player.stats.spe += speedChange;
        player.stats.int += intChange;
        player.statusAffects.remove(StatusAffectType.PhoukaWhiskeyAffect);
        if (numDrunk > 3)
            DisplayText("\n<b>The dizzy sensation dies away and is replaced by a throbbing pain that starts in your skull and then seems to run all through your body, seizing up your joints and making your stomach turn.  The world feels like it’s off kilter and you aren’t in any shape to face it.  You suppose you could down another whiskey, but right now that doesn’t seem like such a good idea.</b>\n");
        else if (numDrunk > 1)
            DisplayText("\n<b>The fuzzy, happy feeling ebbs away.  With it goes the warmth and carefree feelings.  Your head aches and you wonder if you should have another whiskey, just to tide you over</b>\n");
        else
            DisplayText("\n<b>The fuzzy, happy feeling ebbs away.  The weight of the world’s problems seems to settle on you once more.  It was nice while it lasted and you wouldn’t mind having another whiskey.</b>\n");
    }
}
