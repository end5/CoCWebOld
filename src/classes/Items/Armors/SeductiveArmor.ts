import Armor from './Armor';
import ArmorName from './ArmorName';
import Character from '../../Character/Character';
import GenderDescriptor from '../../Descriptors/GenderDescriptor';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';
import ItemFactory from '../ItemFactory';
import ItemType from '../ItemType';
import Piercing from '../Misc/Piercing';

export default class SeductiveArmor extends Armor {
    public constructor() {
        super(ArmorName.SeductiveArmor, new ItemDesc("SeductA", "a set of scandalously seductive armor", "A complete suit of scalemail shaped to hug tightly against every curve, it has a solid steel chest-plate with obscenely large nipples molded into it.  The armor does nothing to cover the backside, exposing the wearer's cheeks to the world."), "scandalously seductive armor", 0, 1);
    }

    public hasNipplePiercing(player: Player): boolean {
        for (const breastRow of player.inventory.equipment.piercings.nipples)
            for (const nipple of breastRow) {
                if (nipple.isEquipped())
                    return true;
            }
        return false;
    }

    public useText(player: Player): void {
        if (!Game.sceneManager.ceraphFollowerScene.ceraphIsFollower()) {
            DisplayText("After struggling to get it on, you feel a sudden shift in your scandalous new armor.  To your horror, it begins folding into itself, revealing more and more of your " + player.skin.desc + " and the comfortable underclothes you had on underneath it.  The transforming armor gradually covers less and less of you until it's little more than a pair of huge nipple-coverings and a silver chain.  A loud KA-CHUNK startles you, and then you're screaming as you feel something stabbing through your nipples.  Goosebumps cover your flesh as you twist in unexpected agony.\n\n");
            DisplayText("After you've had a chance to recover, you inspect your abused nipples and discover that your armor has totally disappeared.  The only thing left behind is a pair of seamless black nipple-studs, embedded into your vulnerable flesh.  There doesn't appear to be any way to remove them either.  Thankfully, your comfortable underclothes have been unaffected by the sudden disappearance of your armor.  The thought of having to run around naked stays stubbornly locked in your mind, and you mentally curse the demon for what she's done to you.\n\n");
            DisplayText("As if summoned by your thoughts, you can hear her voice on the wind, taunting you again, \"<i>Enjoy your new bondage fetish, pet!  One more piercing and you'll be ready.  Don't have too much fun being tied down and fucked, ok?</i>\"\n\n");
            const hasNipplePiercing = this.hasNipplePiercing(player);
            if (hasNipplePiercing)
                DisplayText("You're left to wonder - where did the old piercings go?\n\n");
            for (const breastRow of player.inventory.equipment.piercings.nipples)
                for (const nipple of breastRow) {
                    nipple.equip(new Piercing("seamless black nipple-studs", "Seamless black nipple-studs"));
                }
            Flags.list[FlagEnum.PC_FETISH] = 2;
        }
        else {
            DisplayText("As you're trying to put on the armor, Ceraph appears from nowhere, apologizing profusely and stopping you before you can slide the last strap into place.  \"<i>Please don't put that on, " + GenderDescriptor.mf(player, "Master", "Mistress") + ".  I trapped that armor to pierce new fetishes the unwary so that I could add them to my harem.  I'd hate to garner your anger.</i>\"  She wrings her hands nervously.  \"<i>If you'll hand it here, I'll get rid of it for you. Noone would buy it anyway.</i>\"");
            DisplayText("\n\nYou shrug and toss her the armor, disappointed that you're down a potentially sexy outfit.");
            DisplayText("\n\nCeraph bows gratefully and swiftly backpedals, offering, \"<i>And if you ever want me to stuff you full of magic fetishes, just ask, okay?</i>\"");
            DisplayText("\n\nShe's gone before you can reply.  Sometimes she's more trouble than she's worth.");
        }
    }

    public onEquip(character: Character): void {
        // return Game.libraries.armor.get("COMFORTABLE_UNDERCLOTHES"); //After seductive armor magic the player is left in their underclothes
        super.onEquip(character);
    }
}
