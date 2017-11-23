import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { VaginaLooseness } from '../../Body/Vagina';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import VaginaModifier from '../../Modifiers/VaginaModifier';
import Utils from '../../Utilities/Utils';
import Player from '../Player';

export default class OvielixirEggsPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        if (player.lowerBody.vaginaSpot.count() == 0) {
            player.statusAffects.remove(StatusAffectType.Eggs);
            DisplayText.text("\n<b>Your pregnant belly suddenly begins shrinking, until it disappears.</b>\n");
        }
        DisplayText.text("\n");
        //Small egg scenes
        if (player.statusAffects.get(StatusAffectType.Eggs).value2 == 0) {
            //light quantity
            if (player.statusAffects.get(StatusAffectType.Eggs).value3 < 10) {
                DisplayText.text("You are interrupted as you find yourself overtaken by an uncontrollable urge to undress and squat.   You berate yourself for giving in to the urge for a moment before feeling something shift.  You hear the splash of fluid on the ground and look down to see a thick greenish fluid puddling underneath you.  There is no time to ponder this development as a rounded object passes down your birth canal, spreading your feminine lips apart and forcing a blush to your cheeks.  It plops into the puddle with a splash, and you find yourself feeling visibly delighted to be laying such healthy eggs.   Another egg works its way down and you realize the process is turning you on more and more.   In total you lay ");
                DisplayText.text(this.eggDescript(player));
                DisplayText.text(", driving yourself to the very edge of orgasm.");
                player.stats.lustNoResist = 100;
                //dynStats("lus=", 100, "resisted", false);
            }
            //High quantity
            else {
                DisplayText.text("A strange desire overwhelms your sensibilities, forcing you to shed your " + player.inventory.armorSlot.equipment.displayName + " and drop to your hands and knees.   You manage to roll over and prop yourself up against a smooth rock, looking down over your pregnant-looking belly as green fluids leak from you, soaking into the ground.   A powerful contraction rips through you and your legs spread instinctively, opening your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " to better deposit your precious cargo.   You see the rounded surface of an egg peek through your lips, mottled with strange colors.   You push hard and it drops free with an abrupt violent motion.  The friction and slimy fluids begin to arouse you, flooding your groin with heat as you feel the second egg pushing down.  It slips free with greater ease than the first, arousing you further as you bleat out a moan from the unexpected pleasure.  Before it stops rolling on the ground, you feel the next egg sliding down your slime-slicked passage, rubbing you perfectly as it slides free.  You lose count of the eggs and begin to masturbate, ");
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 5) DisplayText.text("jerking on your huge clitty as if it were a cock, moaning and panting as each egg slides free of your diminishing belly.  You lubricate it with a mix of your juices and the slime until ");
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 2 && player.lowerBody.vaginaSpot.get(0).clitLength <= 5) DisplayText.text("playing with your over-large clit as if it were a small cock, moaning and panting as the eggs slide free of your diminishing belly.  You spread the slime and cunt juice over it as you tease and stroke until ");
                if (player.lowerBody.vaginaSpot.get(0).clitLength <= 2) DisplayText.text("pulling your folds wide and playing with your clit as another egg pops free from your diminishing belly.  You make wet 'schlick'ing sounds as you spread the slime around, vigorously frigging yourself until ");
                DisplayText.text("you quiver in orgasm, popping out the last of your eggs as your body twitches nervelessly on the ground.   In total you lay " + this.eggDescript(player) + ".");
                player.orgasm();
                //dynStats("resisted", false);
            }
        }
        //Large egg scene
        else {
            DisplayText.text("A sudden shift in the weight of your pregnant belly staggers you, dropping you to your knees.  You realize something is about to be birthed, and you shed your " + player.inventory.armorSlot.equipment.displayName + " before it can be ruined by what's coming.  A contraction pushes violently through your midsection, ");
            if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness < VaginaLooseness.LOOSE)
                DisplayText.text("stretching your tight cunt painfully, the lips opening wide ");
            if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= VaginaLooseness.LOOSE && player.lowerBody.vaginaSpot.get(0).vaginalLooseness <= VaginaLooseness.GAPING_WIDE)
                DisplayText.text("temporarily stretching your cunt-lips wide-open ");
            if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness > VaginaLooseness.GAPING_WIDE)
                DisplayText.text("parting your already gaping lips wide ");
            DisplayText.text("as something begins sliding down your passage.  A burst of green slime soaks the ground below as the birthing begins in earnest, and the rounded surface of a strangely colored egg peaks between your lips.  You push hard and the large egg pops free at last, making you sigh with relief as it drops into the pool of slime.  The experience definitely turns you on, and you feel your clit growing free of its hood as another big egg starts working its way down your birth canal, rubbing your sensitive vaginal walls pleasurably.   You pant and moan as the contractions stretch you tightly around the next, slowly forcing it out between your nether-lips.  The sound of a gasp startles you as it pops free, until you realize it was your own voice responding to the sudden pressure and pleasure.  Aroused beyond reasonable measure, you begin to masturbate ");
            if (player.lowerBody.vaginaSpot.get(0).clitLength > 5) DisplayText.text("your massive cock-like clit, jacking it off with the slimy birthing fluids as lube.   It pulses and twitches in time with your heartbeats, its sensitive surface overloading your fragile mind with pleasure.  ");
            if (player.lowerBody.vaginaSpot.get(0).clitLength > 2 && player.lowerBody.vaginaSpot.get(0).clitLength <= 5) DisplayText.text("your large clit like a tiny cock, stroking it up and down between your slime-lubed thumb and fore-finger.  It twitches and pulses with your heartbeats, the incredible sensitivity of it overloading your fragile mind with waves of pleasure.  ");
            if (player.lowerBody.vaginaSpot.get(0).clitLength <= 2) DisplayText.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " by pulling your folds wide and playing with your clit.  Another egg pops free from your diminishing belly, accompanied by an audible burst of relief.  You make wet 'schlick'ing sounds as you spread the slime around, vigorously frigging yourself.  ");
            DisplayText.text("You cum hard, the big eggs each making your cunt gape wide just before popping free.  You slump down, exhausted and barely conscious from the force of the orgasm.  ");
            if (player.statusAffects.get(StatusAffectType.Eggs).value3 >= 11) DisplayText.text("Your swollen belly doesn't seem to be done with you, as yet another egg pushes its way to freedom.   The stimulation so soon after orgasm pushes you into a pleasure-stupor.  If anyone or anything discovered you now, they would see you collapsed next to a pile of eggs, your fingers tracing the outline of your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " as more and more eggs pop free.  In time your wits return, leaving you with the realization that you are no longer pregnant.  ");
            DisplayText.text("\n\nYou gaze down at the mess, counting " + this.eggDescript(player) + ".");
            player.orgasm();
            //dynStats("resisted", false);
        }
        DisplayText.text("\n\n<b>You feel compelled to leave the eggs behind, ");
        if (player.statusAffects.has(StatusAffectType.AteEgg)) DisplayText.text("but you remember the effects of the last one you ate.\n</b>");
        else DisplayText.text("but your body's intuition reminds you they shouldn't be fertile, and your belly rumbles with barely contained hunger.\n</b>");
        VaginaModifier.displayStretchVagina(player, 20, true);
        player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LootEgg, 0, 0, 0, 0));
    }

    private eggDescript(player: Player, plural: boolean = true): string {
        let descript: string = "";
        if (player.statusAffects.has(StatusAffectType.Eggs)) {
            descript += Utils.numToCardinalText(player.statusAffects.get(StatusAffectType.Eggs).value3) + " ";
            //size descriptor
            if (player.statusAffects.get(StatusAffectType.Eggs).value2 == 1) descript += "large ";
            /*color descriptor
            0 - brown - ass expansion
            1 - purple - hip expansion
            2 - blue - vaginal removal and/or growth of existing maleness
            3 - pink - dick removal and/or fertility increase.
            4 - white - breast growth.  If lactating increases lactation.
            5 - rubbery black - 
            */
            if (player.statusAffects.get(StatusAffectType.Eggs).value1 == 0) descript += "brown ";
            if (player.statusAffects.get(StatusAffectType.Eggs).value1 == 1) descript += "purple ";
            if (player.statusAffects.get(StatusAffectType.Eggs).value1 == 2) descript += "blue ";
            if (player.statusAffects.get(StatusAffectType.Eggs).value1 == 3) descript += "pink ";
            if (player.statusAffects.get(StatusAffectType.Eggs).value1 == 4) descript += "white ";
            if (player.statusAffects.get(StatusAffectType.Eggs).value1 == 5) descript += "rubbery black ";
            //EGGS
            if (plural) descript += "eggs";
            else descript += "egg";
            return descript;
        }
        return "EGG ERRORZ";
    }
}