import Armor from './Armor';
import ArmorName from './ArmorName';
import DisplayText from '../../../Engine/display/DisplayText';
import BreastRow, { BreastCup } from '../../Body/BreastRow';
import Vagina from '../../Body/Vagina';
import Character from '../../Character/Character';
import * as CockDescriptor from '../../Descriptors/CockDescriptor';
import { PerkType } from '../../Effects/PerkType';
import ItemDesc from '../ItemDesc';

export default class LustyMaidensArmor extends Armor {
    public constructor() {
        super(ArmorName.LustyMaidensArmor, new ItemDesc("LMArmor", "a bikini-like set of armor that could only belong to a lusty maiden", "This skimpy chain bikini barely qualifies as armor.  Indeed, the chain is made from links much finer and lighter than normal, so fine that it feels almost silken under your fingertips.  A simple seal in the g-string-like undergarment states, \"Virgins only.\""), "lusty maiden's armor", 6, 400, "Light");
    }

    public get defense(): number {
        // if (User.char.torso.vaginas.filter(Vagina.Virgin).length > 0)
        //     return 9 + Flags.list[FlagEnum.BIKINI_ARMOR_BONUS];
        return 6; // + Flags.list[FlagEnum.BIKINI_ARMOR_BONUS];
    }

    public canUse(character: Character): boolean {
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < BreastCup.A) { // {No titties}
            DisplayText("You slide the bikini top over your chest and buckle it into place, but the material hangs almost comically across your flat chest.  The cold chain dangles away from you, swaying around ridiculously before smacking, cold and hard into your [nipples].  This simply won't do - it doesn't fit you, and you switch back to your old armor.\n\n");
            return false;
        }
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < BreastCup.D) { // {Too small titties}
            DisplayText("You slide the bikini top over your chest, shivering when the cold chains catch on your nipples, stiffening them nicely. The material nicely accentuates your chest, but there's a definite problem.  Your [chest] aren't big enough!  Sure, they look nice done up in glittering silver and gold trim.  If only the metal wasn't hanging loosely around your underbust, flopping around whenever you move.  It doesn't even look that sexy on you!  You'll need a bigger chest to truly make use of this armor.  For now, you switch back to your old equipment.\n\n");
            return false;
        }
        DisplayText("You slide the bikini top over your more than ample chest, shivering at the touch of the cold metal on your sensitive nipples.  It stretches taut around each of your globes, and by the time you're snapping the narrow leather strap behind your back, the exotic metal bra has grown warm enough to make your chest tingle pleasantly.  Your hands find their way to your jiggling, gilded mounds and grab hold, fingers sinking into the shimmering flesh without meaning to.  Your nipples scrape along a diaphanous inner lining so pleasantly that a moan slips out of your mouth as you admire how your cleavage bulges out above the glittery cups.  A narrow band of steel with a shiny black leather thong underneath connects the two halfs of the top, padded for comfort but pulled away from you by the sheer size of your straining bosoms.");
        DisplayText("\n\nAs you examine the material, you realize that leather band isn't just padding.  It's as slippery as butter on grease and has a subtle indentation, one that would let it perfectly cushion something round, thick... and throbbing.  Your cheeks color when you catch yourself thinking of titfucking some beast while dressed in this outfit, taking a thick load of monster or dick-girl seed right over your cleavage, face, and hair.  You could even line it up with your mouth and drink down a few swallows if you wanted to.");
        DisplayText("\n\nYou shake your head and smile ruefully - maybe once you finish getting dressed!  There's still a bottom to put on, after all.  Regardless, one of your hands keeps coming to rest on your boob, idly groping and fondling your heavy tit whenever you have a free moment.  This sure is some fun armor!");
        character.stats.lustNoResist += 25;
        DisplayText("\n\nNow, the bottom is a leather thong and skirt combination.  The thong itself is leather dyed radiant white, with intricate gold filigree covering the front triangle.  On the back triangle, there's a similar pattern, though you could swear that from a distance the pattern looks a bit like arrows pointing towards where your [asshole] will be with golden sperm surrounding them. No, that has to be your imagination.  All this time in this strange land must really be getting to you!  Both pieces are molded to accentuate the female form, with a crease in the gusset that will rest over your vagina, ensuring ");
        if (character.torso.cocks.count > 0 || character.torso.balls.quantity > 0) {
            DisplayText("that it won't fit you ");
            if (character.torso.cocks.count > 0)
                DisplayText("or your " + CockDescriptor.describeMultiCockShort(character));
            else
                DisplayText("or your [balls]");
            DisplayText(" at all!  <b>You put your old gear back on with a sigh</b>.");
            return false;
        }
        else if (character.torso.vaginas.count <= 0) {
            DisplayText("that it will dig uncomfortably into your featureless groin.  <b>You put your old gear back on with a sigh</b>.");
            return false;
        }
        DisplayText("your [vagina] is prominently displaying your camel-toe for all to see.");
        DisplayText("\n\nYou don't give it a second thought, sliding the white thong snugly into place.  Snug warmth slides right up against your mound, the perfectly formed crease slipping right into your labia, where it belongs, ");
        if (character.torso.vaginas.filter(Vagina.Virgin).length > 0) {
            DisplayText("a tight seal over your chastity, displaying your womanly status while guarding your maidenhead at the same time.  A smug, smile tugs at the corners of your mouth - who would take your virginity when they can tit-fuck your tits or fuck your butt?");
            if (character.stats.cor < 33)
                DisplayText("  Wait, that isn't right...");
        }
        else {
            DisplayText("a tight seal over your previously-claimed cunt.  Regret fills you when you realize you could have kept your chastity intact simply by servicing the lusty studs and monsters with your ass and tits.");
        }
        if (character.torso.vaginas.get(0).wetness >= 3)
            DisplayText("  The moisture you normally drip seems to soak right into the gusset instead of running down your [legs] like normal, giving you a much more chaste appearance in spite of the lewd garments that even now seem to shape your femininity and [butt] into perfectly arousing shapes.");

        DisplayText("\n\nLast is the chain skirt - perhaps the easiest part to put on.  It's barely three inches long, such that it exposes your [butt] almost entirely, and when you bend over, fully.  The bottom of your vaginal crease can be spied as well, and should you desire to show yourself off, a simple stretch or tug would put you completely on display.  You wiggle about, watching the reflective material ripple almost hypnotically, one hand still on your boobs, mauling at your own tits with passion.  THIS is how a chaste champion should dress - perfectly modest but full of erotic energy to overwhelm her enemies with!\n\n");
        return true;
    }

    public onEquip(character: Character): void {
        // new perks for stats checks
        if (!character.perks.has(PerkType.LustyMaidensArmor))
            character.perks.add(PerkType.LustyMaidensArmor, 0, 0, 0, 0);

        while (character.perks.has(PerkType.SluttySeduction))
            character.perks.remove(PerkType.SluttySeduction);
        if (character.torso.vaginas.filter(Vagina.NotVirgin).length > 0) {
            character.perks.add(PerkType.SluttySeduction, 10); // + Flags.list[FlagEnum.BIKINI_ARMOR_BONUS], 0, 0, 0);
        }
        else {
            character.perks.add(PerkType.SluttySeduction, 6); // + Flags.list[FlagEnum.BIKINI_ARMOR_BONUS], 0, 0, 0);
        }
        super.onEquip(character);
    }

    public onUnequip(character: Character): void {
        if (character.perks.has(PerkType.LustyMaidensArmor))
            character.perks.remove(PerkType.LustyMaidensArmor);
        while (character.perks.has(PerkType.SluttySeduction))
            character.perks.remove(PerkType.SluttySeduction);
        super.onUnequip(character);
    }
}
