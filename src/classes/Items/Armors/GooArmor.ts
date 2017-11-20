import AbstractArmor from './Armor';
import Character from '../../Character/Character';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class GooArmor extends AbstractArmor {
    public constructor() {
        super("GooArmr", new ItemDesc("GooArmr", "Valeria, the goo-girl armor", "This shining suit of platemail is more than just platemail - it houses the goo-girl, Valeria!  Together, they provide one tough defense, but you had better be okay with having goo handling your junk while you fight if you wear this!"), "goo armor", 22, 1);
    }

    use(player: Player) { }

    public useText(player: Player): void { //Produces any text seen when equipping the armor normally
        DisplayText.text("With an ecstatic smile, the goo-armor jumps to her feet and throws her arms around your shoulders.  \"<i>Oh, this is going to be so much fun!  Thank you thank you thank you!  I promise I'll keep you nice and snug and safe, don't you worry.  Oooh, a real adventure again!  WHEEE!</i>\"");
        DisplayText.text("\n\nBefore she can get too excited, you remind the goo that she's supposed to be your armor right about now.  Clasping her hands over her mouth in embarrassment, she utters a muted apology and urges you to just \"<i>put me on!</i>\"  Awkwardly, you strip out of your gear and open up the platemail armor and clamber in.  It's wet and squishy, making you shudder and squirm as you squash your new friend flat against the metal armor.");
        DisplayText.text("\n\nEventually, the two of you get situated. The goo-girl slips around your body inside the heavy armor, maneuvering so that your face is unobstructed and your joints, not protected by the armor, are soundly clad in squishy goo.  She even forms a gooey beaver on your new helm, allowing you to open and close her like a visor in battle.  Eventually, her goo settles around your ");
        if (player.lowerBody.vaginaSpot.hasVagina())
            DisplayText.text("[vagina]");
        if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.cockSpot.hasCock())
            DisplayText.text(" and ");
        if (player.lowerBody.cockSpot.hasCock())
            DisplayText.text(CockDescriptor.describeMultiCockShort(player));
        if (player.gender == 0)
            DisplayText.text("groin");
        DisplayText.text(", encasing your loins in case you need a little mid-battle release, she says.");
        DisplayText.text("\n\nAfter a few minutes, you and your armor-friend are settled and ready to go.");
        if (Flags.list[FlagEnum.MET_VALERIA]) {
            DisplayText.text("  As you ready yourself for the dungeon ahead, the goo giggles into your ear.  \"<i>Oh shit, silly me.  I forgot, my name's Valeria.  Ser Valeria, if you're feeling fancy.</i>\"  You introduce yourself, awkwardly shaking your own hand by way of pleasantries.");
            Flags.list[FlagEnum.MET_VALERIA]++;
        }
        DisplayText.text("\n\n\"<i>Well alright then, [name]!</i>\" Valeria says excitedly, \"<i>Let's go!</i>\"\n\n");
    }

    equipText(): void { }
    unequipText(): void { //Produces any text seen when removing the armor normally
        DisplayText.text("Valeria picks herself up and huffs, \"<i>Maybe we can adventure some more later on?</i>\" before undulating off towards your camp.\n\n(<b>Valeria now available in the followers tab!</b>)");
    }

    onEquip(character: Character): void {
        Flags.list[FlagEnum.VALARIA_AT_CAMP] = 0;
    }

    onUnequip(character: Character): void {
        Flags.list[FlagEnum.VALARIA_AT_CAMP] = 1;
        // return null; //Can't put Valaria in your inventory
    }
}

